import { Component, OnDestroy, ViewChild } from '@angular/core';
import {KontorolMediaType} from 'kontorol-ngx-client';
import {PopupWidgetComponent} from '@kontorol-ng/kontorol-ui';
import {DraftEntry, PrepareEntryService} from './prepare-entry.service';
import {BrowserService} from 'app-shared/kmc-shell';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';
import { KMCPermissionsService } from 'app-shared/kmc-shared/kmc-permissions/kmc-permissions.service';
import { KMCPermissions } from 'app-shared/kmc-shared/kmc-permissions';
import { ContentEntryViewSections, ContentEntryViewService } from 'app-shared/kmc-shared/kmc-views/details-views';
import {AppLocalization} from '@kontorol-ng/mc-shared';

@Component({
  selector: 'kPrepareEntry',
  templateUrl: './prepare-entry.component.html',
  styleUrls: ['./prepare-entry.component.scss'],
  providers: [PrepareEntryService]
})
export class PrepareEntryComponent implements OnDestroy {
  public _selectedMediaType: KontorolMediaType;
  @ViewChild('transcodingProfileSelectMenu', { static: true }) transcodingProfileSelectMenu: PopupWidgetComponent;

  constructor(private _prepareEntryService: PrepareEntryService,
              private _permissionsService: KMCPermissionsService,
              private _contentEntryViewService: ContentEntryViewService,
              private _browserService: BrowserService,
              private _appLocalization: AppLocalization) {
  }

  ngOnDestroy() {
  }

  public prepareEntry(kontorolMediaType: KontorolMediaType) {
    this._selectedMediaType = kontorolMediaType;
    const transcodingProfileSettingPermission = this._permissionsService.hasPermission(KMCPermissions.FEATURE_DRAFT_ENTRY_CONV_PROF_SELECTION);
    if (transcodingProfileSettingPermission) {
      this.transcodingProfileSelectMenu.open();
    } else {
        this._loadEntry({profileId: null});
    }
  }


  public _loadEntry(selectedProfile: { profileId?: number }) {

    /// passing profileId null will cause to create with default profileId
    this._prepareEntryService.createDraftEntry(this._selectedMediaType, selectedProfile.profileId)
        .pipe(tag('block-shell'))
      .subscribe((draftEntry: DraftEntry) => {
            this._contentEntryViewService.openById(draftEntry.id, ContentEntryViewSections.Metadata, true, true);
        },
        error => {
          this._browserService.alert({
              header: this._appLocalization.get('app.common.error'),
            message: error.message
          });
        });
  }
}
