import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EntryDistributionWidget, ExtendedKontorolEntryDistribution } from './entry-distribution-widget.service';
import { PopupWidgetComponent } from '@kontorol-ng/kontorol-ui';
import { KontorolDistributionProfile } from 'kontorol-ngx-client';


@Component({
  selector: 'kEntryDistribution',
  templateUrl: './entry-distribution.component.html',
  styleUrls: ['./entry-distribution.component.scss']
})
export class EntryDistributionComponent implements OnInit, OnDestroy {
  @ViewChild('editProfile') _editProfilePopup: PopupWidgetComponent;

  public _loading = false;
  public _loadingError = null;
  public _selectedDistributedProfile: ExtendedKontorolEntryDistribution;
  public _selectedUndistributedProfile: KontorolDistributionProfile;

  constructor(public _widgetService: EntryDistributionWidget) {
  }


  ngOnInit() {
    this._widgetService.attachForm();
  }

  ngOnDestroy() {
    this._widgetService.detachForm();
  }

  private _openDistributedProfile(profile: ExtendedKontorolEntryDistribution): void {
    this._selectedDistributedProfile = profile;
    this._selectedUndistributedProfile = this._widgetService.getPartnerProfileById(profile.distributionProfileId);
    this._editProfilePopup.open();
  }

  private _distributeSelectedProfile(payload: { entryId: string, profileId: number, submitWhenReady: boolean }): void {
    this._widgetService.distributeProfile(payload, () => {
      this._editProfilePopup.close();
    });
  }

  private _updateSelectedProfile(profile: ExtendedKontorolEntryDistribution): void {
    this._widgetService.updateProfile(profile, () => {
      this._editProfilePopup.close();
    });
  }

  public _openUndistributedProfile(profile: KontorolDistributionProfile): void {
    this._selectedUndistributedProfile = profile;
    this._selectedDistributedProfile = null;
    this._editProfilePopup.open();
  }

  public _onDistributedProfileActionSelected(event: { action: string, payload: any }): void {
    switch (event.action) {
      case 'retry':
        this._widgetService.retryDistribution(event.payload);
        break;

      case 'distribute':
        this._widgetService.submitDistribution(event.payload);
        break;

      case 'sendUpdate':
        this._widgetService.submitProfileUpdate(event.payload);
        break;

      case 'open':
        this._openDistributedProfile(event.payload);
        break;

      case 'deleteDistribution':
        this._widgetService.deleteDistributionProfile(event.payload);
        break;

      default:
        break;
    }
  }

  public _onEditProfileActionSelected(event: { action: string, payload: any }): void {
    switch (event.action) {
      case 'distribute':
        this._distributeSelectedProfile(event.payload);
        break;

      case 'update':
        this._updateSelectedProfile(event.payload);
        break;

      case 'delete':
        this._widgetService.deleteDistributionProfile(event.payload, () => this._editProfilePopup.close());
        break;

      default:
        break;
    }
  }
}

