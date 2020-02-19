import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EntryDistributionWidget, ExtendedKontorolEntryDistribution } from '../entry-distribution-widget.service';
import { KontorolEntryDistributionFlag } from 'kontorol-ngx-client';
import { KontorolEntryDistributionStatus } from 'kontorol-ngx-client';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { KontorolDistributionProviderType } from 'kontorol-ngx-client';
import { subApplicationsConfig } from 'config/sub-applications';
import { KMCPermissions, KMCPermissionsService } from 'app-shared/kmc-shared/kmc-permissions';

@Component({
  selector: 'kEntryDistributedProfile',
  templateUrl: './distributed-profile.component.html',
  styleUrls: ['./distributed-profile.component.scss']
})
export class DistributedProfileComponent implements OnInit {
  @Input() profile: ExtendedKontorolEntryDistribution | null;

  @Output() onActionSelected = new EventEmitter<{ action: string, payload: any }>();

  public _profile: ExtendedKontorolEntryDistribution;
  public _isModified = false;
  public _actionButtonLabel = '';
  public _actionButtonDisabled = true;
  public _actionButtonHidden = true;
  public _deleteButtonHidden = true;
  public _providerType: KontorolDistributionProviderType = null;
  public _distributorPageLink = '';
  public _kmcPermissions = KMCPermissions;

  constructor(private _appLocalization: AppLocalization,
              private _permissionsService: KMCPermissionsService,
              private _widgetService: EntryDistributionWidget) {

  }

  ngOnInit() {
    this._prepare();
  }

  private _prepare(): void {
    if (this.profile) {
      this._profile = this.profile;
      this._isModified = this._profile.dirtyStatus === KontorolEntryDistributionFlag.updateRequired;
      this._setupActionButton();
      this._setupDeleteButton();
      this._setupDistributorPageLink();
    }
  }

  private _setupDistributorPageLink(): void {
    const distributionProfile = this._widgetService.getPartnerProfileById(this.profile.distributionProfileId);

    if (distributionProfile) {
      this._providerType = distributionProfile ? distributionProfile.providerType : null;

      const youtubeDistributorPageLink = this._providerType === KontorolDistributionProviderType.youtube
        || this._providerType === KontorolDistributionProviderType.youtubeApi;
      const facebookDistributorPageLink = this._providerType === KontorolDistributionProviderType.facebook;
      const isReady = this.profile.status === KontorolEntryDistributionStatus.ready;
      const showLink = isReady && (youtubeDistributorPageLink || facebookDistributorPageLink) && this._profile.remoteId;

      if (showLink) {
        const link = youtubeDistributorPageLink
          ? subApplicationsConfig.contentEntriesApp.distribution.youtubeExternal
          : subApplicationsConfig.contentEntriesApp.distribution.facebookExternal;
        this._distributorPageLink = `${link}${this._profile.remoteId}`;
      }
    }
  }

  private _setupActionButton(): void {
    const { status, dirtyStatus } = this._profile;
    this._actionButtonHidden = false;
    this._actionButtonDisabled = false;

    switch (status) {
      case KontorolEntryDistributionStatus.ready:
        if (dirtyStatus === KontorolEntryDistributionFlag.updateRequired) {
          this._actionButtonLabel = this._appLocalization.get('applications.content.entryDetails.distribution.export');
          this._actionButtonDisabled = false;
        } else {
          this._actionButtonLabel = this._appLocalization.get('applications.content.entryDetails.distribution.upToDate');
          this._actionButtonDisabled = true;
        }
        break;
      case KontorolEntryDistributionStatus.errorDeleting:
      case KontorolEntryDistributionStatus.errorSubmitting:
      case KontorolEntryDistributionStatus.errorUpdating:
        this._actionButtonLabel = this._appLocalization.get('applications.content.entryDetails.distribution.retry');
        this._actionButtonDisabled = false;
        break;
      case KontorolEntryDistributionStatus.submitting:
      case KontorolEntryDistributionStatus.importSubmitting:
      case KontorolEntryDistributionStatus.updating:
      case KontorolEntryDistributionStatus.importUpdating:
      case KontorolEntryDistributionStatus.deleting:
        this._actionButtonLabel = this._appLocalization.get('applications.content.entryDetails.distribution.processing');
        this._actionButtonDisabled = true;
        break;
      case KontorolEntryDistributionStatus.queued:
      case KontorolEntryDistributionStatus.pending:
      case KontorolEntryDistributionStatus.removed:
        this._actionButtonLabel = this._appLocalization.get('applications.content.entryDetails.distribution.export');
        break;
      default:
        this._actionButtonHidden = true;
        break;
    }
  }

  private _setupDeleteButton(): void {
    const enabledStatuses = [
      KontorolEntryDistributionStatus.ready,
      KontorolEntryDistributionStatus.errorUpdating,
      KontorolEntryDistributionStatus.queued,
      KontorolEntryDistributionStatus.pending,
      KontorolEntryDistributionStatus.errorSubmitting
    ];

    this._deleteButtonHidden = enabledStatuses.indexOf(this._profile.status) === -1;
  }

  public _performAction(profile: ExtendedKontorolEntryDistribution): void {
    switch (profile.status) {
      case KontorolEntryDistributionStatus.errorDeleting:
      case KontorolEntryDistributionStatus.errorSubmitting:
      case KontorolEntryDistributionStatus.errorUpdating:
        this.onActionSelected.emit({ action: 'retry', payload: profile.id });
        break;

      case KontorolEntryDistributionStatus.pending:
      case KontorolEntryDistributionStatus.removed:
      case KontorolEntryDistributionStatus.deleted:
      case KontorolEntryDistributionStatus.queued:
        this.onActionSelected.emit({ action: 'distribute', payload: profile.id });
        break;

      case KontorolEntryDistributionStatus.ready:
        if (profile.dirtyStatus === KontorolEntryDistributionFlag.updateRequired) {
          this.onActionSelected.emit({ action: 'sendUpdate', payload: profile.id });
        }
        break;

      default:
        break;

    }
  }

  public _openProfile(profile: ExtendedKontorolEntryDistribution): void {
    this.onActionSelected.emit({ action: 'open', payload: profile });
  }

  public _deleteDistribution(profile: ExtendedKontorolEntryDistribution): void {
    this.onActionSelected.emit({ action: 'deleteDistribution', payload: profile });
  }
}

