import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {CategoryEntitlementsWidget} from './category-entitlements-widget.service';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import {KontorolCategoryUserPermissionLevel} from 'kontorol-ngx-client';
import {KontorolUser} from 'kontorol-ngx-client';
import {KontorolContributionPolicyType} from 'kontorol-ngx-client';
import {KontorolAppearInListType} from 'kontorol-ngx-client';
import {KontorolPrivacyType} from 'kontorol-ngx-client';
import { PopupWidgetComponent, PopupWidgetStates } from '@kontorol-ng/kontorol-ui';
import {BrowserService} from 'app-shared/kmc-shell';
import { KMCPermissions, KMCPermissionsService } from 'app-shared/kmc-shared/kmc-permissions';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';

@Component({
  selector: 'kCategoryEntitlements',
  templateUrl: './category-entitlements.component.html',
  styleUrls: ['./category-entitlements.component.scss'],
    providers: [KontorolLogger.createLogger('CategoryEntitlementsComponent')]
})
export class CategoryEntitlementsComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('manageUsersPopup') manageUsersPopup: PopupWidgetComponent;
  public _defaultPermissionLevelOptions: { value: number, label: string }[] = [];
  public _kmcPermissions = KMCPermissions;

  public _membersCount: { loading: boolean, value: number, hasError?: boolean } = { loading: true, value: 0, hasError : false };
  constructor(public _widgetService: CategoryEntitlementsWidget,
              private _appLocalization: AppLocalization,
              private _permissionsService: KMCPermissionsService,
              private _browserService: BrowserService,
              private _logger: KontorolLogger) {
  }

  ngOnInit() {
    this._widgetService.attachForm();

    this._widgetService.data$
        .pipe(cancelOnDestroy(this))
        .subscribe(data =>
        {
            this._membersCount = { loading: !data, value: data ? data.membersCount : 0, hasError: false };
        });

    this._defaultPermissionLevelOptions = [{
      value: KontorolCategoryUserPermissionLevel.member,
      label: this._appLocalization.get('applications.content.categoryDetails.entitlements.defaultPermissionLevel.member')
    }, {
      value: KontorolCategoryUserPermissionLevel.contributor,
      label: this._appLocalization.get('applications.content.categoryDetails.entitlements.defaultPermissionLevel.contributor')
    }, {
      value: KontorolCategoryUserPermissionLevel.moderator,
      label: this._appLocalization.get('applications.content.categoryDetails.entitlements.defaultPermissionLevel.moderator')
    }, {
      value: KontorolCategoryUserPermissionLevel.manager,
      label: this._appLocalization.get('applications.content.categoryDetails.entitlements.defaultPermissionLevel.manager')
    }];
  }

  ngAfterViewInit() {
      this.manageUsersPopup.state$
          .pipe(cancelOnDestroy(this))
          .skip(1)
          .subscribe(data => {
                  if (data.state === PopupWidgetStates.Close) {
                      this._membersCount.loading = true;
                      this._membersCount.hasError = false;
                      this._widgetService.fetchUpdatedMembersCount()
                          .pipe(cancelOnDestroy(this))
                          .subscribe(
                              value =>
                              {
                                  this._membersCount.loading = false;
                                  this._membersCount.value = value;
                              },
                              error =>
                              {
                                  this._membersCount.loading = false;
                                  this._membersCount.hasError = true;
                              }
                          )
                  }
              }
          );
  }

  ngOnDestroy() {
    this._widgetService.detachForm();
  }

  get _contentPrivacyOptions() {
    return KontorolPrivacyType;
  }

  get _categoryListingOptions() {
    return KontorolAppearInListType;
  }

  get _contentPublishPermissionsOptions() {
    return KontorolContributionPolicyType;
  }

  // owner changed
  onOwnerChanged(owner: KontorolUser): void {
    // reset the form to have the new user in the textbox
    this._widgetService.entitlementsForm.patchValue({ owner });
    this._widgetService.setDirty();
  }

  public _toggleInherit({originalEvent, checked}: { originalEvent: Event, checked: boolean }) {
      this._logger.info(`handle toggle inherit action by user`, { checked });
    const affectedControls =
      [this._widgetService.entitlementsForm.get('defaultPermissionLevel'),
       this._widgetService.entitlementsForm.get('owner')];

    affectedControls.forEach(ctrl => {
      if (checked === false) {
        ctrl.enable();
      } else {
        ctrl.disable();
      }
    });

    this._widgetService.setDirty();
  }


  public mananageUsersPermissions() {
      this._logger.info(`handle open manage users permission popup action by user`);
    if (this._widgetService.entitlementsForm.get('inheritUsersPermissions').value === this._widgetService.inheritUsersPermissionsOriginalValue) {
      this.manageUsersPopup.open();
    } else {
        this._logger.info(`user cannot manage users permissions, show alert, abort action`);
      this._browserService.alert(
        {
          header: this._appLocalization
            .get('applications.content.categoryDetails.entitlements.manageUsersPermissionsEditMessage.title'),
          message: this._appLocalization
            .get('applications.content.categoryDetails.entitlements.manageUsersPermissionsEditMessage.description'),
          accept: () => {
              this._logger.info(`user dismissed alert`);
          }
        });
    }
  }
}
