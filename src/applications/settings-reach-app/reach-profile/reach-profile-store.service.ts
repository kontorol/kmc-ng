import { Host, Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { ISubscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs';
import { KontorolClient, KontorolMultiRequest, KontorolObjectBaseFactory, ReachProfileGetAction, ReachProfileUpdateAction } from 'kontorol-ngx-client';
import { ReachProfileWidgetsManager } from './reach-profile-widgets-manager';
import { BrowserService } from 'app-shared/kmc-shell/providers/browser.service';
import { PageExitVerificationService } from 'app-shared/kmc-shell/page-exit-verification';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';
import { KontorolReachProfile } from 'kontorol-ngx-client';
import { OnDataSavingReasons } from '@kontorol-ng/kontorol-ui';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';
import { AppEventsService } from 'app-shared/kmc-shared';
import { ReachProfilesStore } from "../reach-profiles/reach-profiles-store/reach-profiles-store.service";
import { SettingsReachProfileViewSections, SettingsReachProfileViewService } from "app-shared/kmc-shared/kmc-views/details-views/settings-reach-profile-view.service";
import { SettingsReachMainViewService } from "app-shared/kmc-shared/kmc-views";

export enum ActionTypes {
  ProfileLoading,
  ProfileLoaded,
  ProfileLoadingFailed,
  ProfileSaving,
  ProfilePrepareSavingFailed,
  ProfileSavingFailed,
  ProfileDataIsInvalid,
  ActiveSectionBusy
}
export enum NotificationTypes {
    ViewEntered
}
export interface StatusArgs {
  action: ActionTypes;
  error?: Error;
}

@Injectable()
export class ReachProfileStore implements OnDestroy {
    private _notifications = new Subject<{ type: NotificationTypes, error?: Error }>();
    public notifications$ = this._notifications.asObservable();
  private _loadProfileSubscription: ISubscription;
  private _pageExitVerificationToken: string;
  private _saveProfileInvoked = false;
  private _profile = {
    data: new BehaviorSubject<KontorolReachProfile>(null),
    state: new BehaviorSubject<StatusArgs>({ action: ActionTypes.ProfileLoading, error: null })
  };
  private _profileId: string;
  private _profileIsDirty: boolean;

  public get profileIsDirty(): boolean {
    return this._profileIsDirty;
  }

  public get profileId(): string {
    return String(this._profileId);
  }

  public readonly profile = {
    data$: this._profile.data.asObservable(),
    state$: this._profile.state.asObservable(),
    data: () => this._profile.data.value
  };

  constructor(@Host() private _widgetsManager: ReachProfileWidgetsManager,
              private _kontorolServerClient: KontorolClient,
              private _router: Router,
              private _appEvents: AppEventsService,
              private _browserService: BrowserService,
              private _profileRoute: ActivatedRoute,
              private _pageExitVerificationService: PageExitVerificationService,
              private _appLocalization: AppLocalization,
              private _profilesStore: ReachProfilesStore,
              private _settingsReachProfileViewService: SettingsReachProfileViewService,
              private _settingsReachMainViewService: SettingsReachMainViewService,
              private _logger: KontorolLogger) {


    this._widgetsManager.profileStore = this;
    this._onSectionsStateChanges();
    this._onRouterEvents();
  }

  private _onSectionsStateChanges(): void {
    this._widgetsManager.widgetsState$
      .pipe(cancelOnDestroy(this))
      .debounce(() => Observable.timer(500))
      .subscribe(
        sectionsState => {
          const newDirtyState = Object
            .keys(sectionsState)
            .reduce((result, sectionName) => result || sectionsState[sectionName].isDirty, false);

          if (this._profileIsDirty !== newDirtyState) {
            this._logger.info(`update profile is dirty state to ${newDirtyState}`);
            this._profileIsDirty = newDirtyState;

            this._updatePageExitVerification();

          }
        }
      );
  }

  private _updatePageExitVerification(): void {
    if (this._profileIsDirty) {
      this._pageExitVerificationToken = this._pageExitVerificationService.add();
    } else {
      if (this._pageExitVerificationToken) {
        this._pageExitVerificationService.remove(this._pageExitVerificationToken);
      }
      this._pageExitVerificationToken = null;
    }
  }

  ngOnDestroy() {
    if (this._loadProfileSubscription) {
      this._loadProfileSubscription.unsubscribe();
    }

    this._profile.data.complete();
    this._profile.state.complete();

    if (this._pageExitVerificationToken) {
      this._pageExitVerificationService.remove(this._pageExitVerificationToken);
    }

    if (this._saveProfileInvoked && this._profilesStore) {
      this._profilesStore.reload();
    }
  }

  private _onRouterEvents(): void {
    this._router.events
      .pipe(cancelOnDestroy(this))
      .subscribe(
        event => {
          if (event instanceof NavigationEnd) {
            const currentProfileId = this._profileRoute.snapshot.params.id;
            if (currentProfileId !== this._profileId) {
                // we must defer the loadProfile to the next event cycle loop to allow components
                // to init them-selves when entering this module directly.
                setTimeout(() => {
                    const profile = this.profile.data();
                    if (!profile || (profile && profile.id !== currentProfileId)) {
                        this._loadProfile(currentProfileId);
                    }
                });
            } else {
                this._notifications.next({ type: NotificationTypes.ViewEntered });
            }
          }
        }
      );
  }

  private _transmitSaveRequest(newProfile: KontorolReachProfile): void {
    this._profile.state.next({ action: ActionTypes.ProfileSaving });

    const id = this.profileId;
    const action =  new ReachProfileUpdateAction({ id: Number(id), reachProfile: newProfile });
    const request = new KontorolMultiRequest(action);

    this._widgetsManager.notifyDataSaving(newProfile, request, this.profile.data())
      .pipe(cancelOnDestroy(this))
      .pipe(tag('block-shell'))
      .flatMap(prepareResponse => {
        if (prepareResponse.ready) {
          return this._kontorolServerClient.multiRequest(request)
            .pipe(tag('block-shell'))
            .map(multiResponse => {
              if (multiResponse.hasErrors()) {
                const errorMessage = multiResponse.map(response => {
                  if (response.error) {
                    return response.error.message + '\n';
                  }
                }).join('');
                this._profile.state.next({ action: ActionTypes.ProfileSavingFailed, error: new Error(errorMessage) });
              } else {
                const [profileResponse] = multiResponse;

                this._saveProfileInvoked = true;
                this._loadProfile(profileResponse.result.id);
              }
              return Observable.empty();
            });
        } else {
          switch (prepareResponse.reason) {
            case OnDataSavingReasons.validationErrors:
              this._profile.state.next({ action: ActionTypes.ProfileDataIsInvalid });
              break;
            case OnDataSavingReasons.attachedWidgetBusy:
              this._profile.state.next({ action: ActionTypes.ActiveSectionBusy });
              break;
            case OnDataSavingReasons.buildRequestFailure:
              this._profile.state.next({ action: ActionTypes.ProfilePrepareSavingFailed });
              break;
          }

          return Observable.empty();
        }
      })
      .subscribe(
        response => {
          // do nothing - the service state is modified inside the map functions.
        },
        error => {
          // should not reach here, this is a fallback plan.
          this._profile.state.next({ action: ActionTypes.ProfileSavingFailed, error });
        }
      );
  }

  public saveProfile(): void {
      const profile = this.profile.data();
      const newProfile = <KontorolReachProfile>KontorolObjectBaseFactory.createObject(profile);
      if (newProfile && newProfile instanceof KontorolReachProfile) {
          this._transmitSaveRequest(newProfile);
      } else {
          console.error(new Error(`Failed to create a new instance of the profile type '${this.profile ? typeof this.profile : 'n/a'}`));
          this._profile.state.next({action: ActionTypes.ProfilePrepareSavingFailed});
      }
  }

  public reloadProfile(): void {
    if (this.profileId) {
      this._loadProfile(this.profileId);
    }
  }

  private _loadProfile(profileId: string): void {
    if (this._loadProfileSubscription) {
      this._loadProfileSubscription.unsubscribe();
      this._loadProfileSubscription = null;
    }

    this._profileId = profileId;
    this._profileIsDirty = false;
    this._updatePageExitVerification();

    this._profile.state.next({ action: ActionTypes.ProfileLoading });
    this._widgetsManager.notifyDataLoading(profileId);

    this._loadProfileSubscription = this._getProfile(profileId)
      .pipe(cancelOnDestroy(this))
      .subscribe(
        response => {
            this._profile.data.next(response);
            this._profileId = String(response.id);
            this._notifications.next({ type: NotificationTypes.ViewEntered });

            if (this._settingsReachProfileViewService.isAvailable({
                profile: response,
                activatedRoute: this._profileRoute,
                section: SettingsReachProfileViewSections.ResolveFromActivatedRoute
            })) {
                const dataLoadedResult = this._widgetsManager.notifyDataLoaded(response, { isNewData: false });
                if (dataLoadedResult.errors.length) {
                    this._profile.state.next({
                        action: ActionTypes.ProfileLoadingFailed,
                        error: new Error(`one of the widgets failed while handling data loaded event`)
                    });
                } else {
                    this._profile.state.next({ action: ActionTypes.ProfileLoaded });
                }
            }
        },
        error => {
          this._profile.state.next({ action: ActionTypes.ProfileLoadingFailed, error });

        }
      );
  }

  public openSection(sectionKey: SettingsReachProfileViewSections): void {
     this._settingsReachProfileViewService.open({ section: sectionKey, profile: this.profile.data() });
  }

  private _getProfile(profileId: string): Observable<KontorolReachProfile> {
    if (profileId) {
      const id = Number(profileId);
      const reachProfileAction = new ReachProfileGetAction({ id });

      // build the request
      return this._kontorolServerClient
        .request(reachProfileAction);
    } else {
      return Observable.throw(new Error('missing profileId'));
    }
  }

  public openProfile(profile: KontorolReachProfile): void {
    this.canLeave()
        .filter(({ allowed }) => allowed)
        .pipe(cancelOnDestroy(this))
        .subscribe(() => {
            this._settingsReachProfileViewService.open({ profile, section: SettingsReachProfileViewSections.Settings });
        });
  }

  public canLeave(): Observable<{ allowed: boolean }> {
    return Observable.create(observer => {
      if (this._profileIsDirty) {
        this._browserService.confirm(
          {
            header: this._appLocalization.get('applications.settings.reach.cancelEdit'),
            message: this._appLocalization.get('applications.settings.reach.discard'),
            accept: () => {
              this._profileIsDirty = false;
              observer.next({ allowed: true });
              observer.complete();
            },
            reject: () => {
              observer.next({ allowed: false });
              observer.complete();
            }
          }
        );
      } else {
        observer.next({ allowed: true });
        observer.complete();
      }
    });
  }

  public returnToProfiles(): void {
      this._settingsReachMainViewService.open();
  }
}
