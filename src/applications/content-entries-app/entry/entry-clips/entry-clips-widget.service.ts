import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';

import {KontorolClient} from 'kontorol-ngx-client';
import {KontorolMediaEntryFilter} from 'kontorol-ngx-client';
import {KontorolFilterPager} from 'kontorol-ngx-client';
import {KontorolDetachedResponseProfile} from 'kontorol-ngx-client';
import {KontorolResponseProfileType} from 'kontorol-ngx-client';
import {KontorolMediaEntry} from 'kontorol-ngx-client';
import {KontorolClipAttributes} from 'kontorol-ngx-client';
import {KontorolOperationAttributes} from 'kontorol-ngx-client';
import {BaseEntryListAction} from 'kontorol-ngx-client';
import {KontorolUtils} from '@kontorol-ng/kontorol-common';
import {AppLocalization} from '@kontorol-ng/mc-shared';
import {AreaBlockerMessage} from '@kontorol-ng/kontorol-ui';


import {EntryStore} from '../entry-store.service';
import {BrowserService} from "app-shared/kmc-shell/providers/browser.service";
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';

import {EntryWidget} from '../entry-widget';
import {KontorolLogger} from '@kontorol-ng/kontorol-logger';
import { ContentEntryViewSections } from 'app-shared/kmc-shared/kmc-views/details-views/content-entry-view.service';
import { AppEventsService } from 'app-shared/kmc-shared';
import { UpdateClipsEvent } from 'app-shared/kmc-shared/events/update-clips-event';

export interface ClipsData
{
    items : any[];
    totalItems : number;
}

@Injectable()
export class EntryClipsWidget extends EntryWidget implements OnDestroy {
  private _clips = new BehaviorSubject<ClipsData>({items: null, totalItems: 0});
  public entries$ = this._clips.asObservable();
  public sortBy: string = 'createdAt';
  public sortOrder = 1;

  private _pageSize: number = 50;
  public set pageSize(value: number) {
    this._pageSize = value;
    this.browserService.setInLocalStorage("clipsPageSize", value);
  }

  public get pageSize() {
    return this._pageSize;
  }

  public pageIndex = 0;
  public pageSizesAvailable = [25, 50, 75, 100];

  constructor(private _store: EntryStore,
              private _kontorolServerClient: KontorolClient,
              private browserService: BrowserService,
              private _appLocalization: AppLocalization,
              private _appEvents: AppEventsService,
              logger: KontorolLogger) {
    super(ContentEntryViewSections.Clips, logger);

      this._appEvents.event(UpdateClipsEvent)
          .pipe(cancelOnDestroy(this))
          .subscribe(() => {
              this.updateClips();
              this._store.setRefreshEntriesListUponLeave();
          });

  }

  /**
   * Do some cleanups if needed once the section is removed
   */
  protected onReset(): void {
    this.sortBy = 'createdAt';
    this.sortOrder = 1;
    this.pageIndex = 0;

    const defaultPageSize = this.browserService.getFromLocalStorage("clipsPageSize");
    if (defaultPageSize !== null) {
      this.pageSize = defaultPageSize;
    }

    this._clips.next({items: [], totalItems: 0});
  }

  /**
   * Updates list of clips
   */
  public updateClips(): void {

    if (this.data) {
      this._getEntryClips('reload').subscribe(() => {
        // do nothing
      });
    }
  }

  public navigateToEntry(entry: KontorolMediaEntry): void {
    this._store.openEntry(entry);
  }

  private _updateClipProperties(clips: any[]): any[] {
    clips.forEach((clip: any) => {
      clip['offset'] = this._getClipOffset(clip);
      clip['duration'] = this._getClipDuration(clip);
    });
    return clips;
  }

  private _getClipOffset(entry: KontorolMediaEntry): string {
    let offset: number = -1;
    if (entry.operationAttributes && entry.operationAttributes.length) {
      entry.operationAttributes.forEach((attr: KontorolOperationAttributes) => {
        if (attr instanceof KontorolClipAttributes) {
          if (attr.offset && offset === -1) { // take the first offset we find as in legacy KMC
            offset = attr.offset / 1000;
          }
        }
      });
    }
    return offset !== -1 ? KontorolUtils.formatTime(offset) : this._appLocalization.get('applications.content.entryDetails.clips.n_a');
  }

  private _getClipDuration(entry: KontorolMediaEntry): string {
    return entry.duration ? KontorolUtils.formatTime(entry.duration) : this._appLocalization.get('applications.content.entryDetails.clips.n_a');
  }

  private _getEntryClips(origin: 'activation' | 'reload'): Observable<{ failed: boolean, error?: Error }> {
    return Observable.create(observer => {
      const entry: KontorolMediaEntry = this.data;

      super._showLoader();

      // build the request
      let requestSubscription = this._kontorolServerClient.request(new BaseEntryListAction({
        filter: new KontorolMediaEntryFilter(
          {
            rootEntryIdEqual: entry.id,
            orderBy: `${this.sortOrder === 1 ? '+' : '-'}${this.sortBy}`
          }
        ),
        pager: new KontorolFilterPager(
          {
            pageSize: this.pageSize,
            pageIndex: this.pageIndex + 1
          }
        )
      }).setRequestOptions({
        responseProfile: new KontorolDetachedResponseProfile({
          type: KontorolResponseProfileType.includeFields,
          fields: 'id,name,plays,createdAt,duration,status,offset,operationAttributes,moderationStatus'
        })
      }))
        .pipe(cancelOnDestroy(this, this.widgetReset$))
        .subscribe(
          response => {
            super._hideLoader();
            this._clips.next({items: this._updateClipProperties(response.objects), totalItems: response.totalCount});
            observer.next({failed: false});
            observer.complete();
          },
          error => {
            this._clips.next({items: [], totalItems: 0});
            super._hideLoader();
            if (origin === 'activation') {
              super._showActivationError();
            } else {
              this._showBlockerMessage(new AreaBlockerMessage(
                {
                  message: this._appLocalization.get('applications.content.entryDetails.errors.clipsLoadError'),
                  buttons: [
                    {
                      label: this._appLocalization.get('applications.content.entryDetails.errors.retry'),
                      action: () => {
                        this._getEntryClips('reload').subscribe(() => {
                          // do nothing
                        });
                      }
                    }
                  ]
                }
              ), true);
            }
            observer.error({failed: true, error: error});

          });

      return () => {
        if (requestSubscription) {
          requestSubscription.unsubscribe();
          requestSubscription = null;
        }
      };

    });

  }

  protected onActivate(firstTimeActivating: boolean) {
    const entry: KontorolMediaEntry = this.data ? this.data as KontorolMediaEntry : null;
    return this._getEntryClips('activation');
  }

  ngOnDestroy() {

  }
}
