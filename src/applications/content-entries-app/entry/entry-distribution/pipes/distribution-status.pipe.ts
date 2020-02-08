import { Pipe, PipeTransform } from '@angular/core';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { KontorolEntryDistribution } from 'kontorol-ngx-client';
import { KontorolEntryDistributionStatus } from 'kontorol-ngx-client';
import { KontorolEntryDistributionFlag } from 'kontorol-ngx-client';

@Pipe({ name: 'kEntriesDistributionStatus' })
export class DistributionStatusPipe implements PipeTransform {
  constructor(private _appLocalization: AppLocalization) {

  }

  transform(profile: KontorolEntryDistribution, type: 'icon' | 'label'): string {
    const result = {
      icon: '',
      label: ''
    };

    if (!profile) {
      return '';
    }

    switch (profile.status) {
      case KontorolEntryDistributionStatus.pending:
        if (!profile.validationErrors || profile.validationErrors.length === 0) {
          result.label = this._appLocalization.get('applications.content.entryDetails.distribution.status.readyForDistribution');
          result.icon = 'kIconinactive';
        } else if (profile.dirtyStatus === KontorolEntryDistributionFlag.submitRequired) {
          result.label = this._appLocalization.get('applications.content.entryDetails.distribution.status.scheduledForDistribution');
          result.icon = 'kIconscheduled';
        } else if (profile.validationErrors && profile.validationErrors.length) {
          result.label = this._appLocalization.get('applications.content.entryDetails.distribution.status.exportFailed');
          result.icon = 'kIconerror';
        }
        break;

      case KontorolEntryDistributionStatus.queued:
        result.label = this._appLocalization.get('applications.content.entryDetails.distribution.status.queued');
        result.icon = 'kIconupload2';
        break;

      case KontorolEntryDistributionStatus.ready:
        if (profile.dirtyStatus === KontorolEntryDistributionFlag.updateRequired) {
          result.label = this._appLocalization.get('applications.content.entryDetails.distribution.status.readyUpdateRequired');
        } else {
          result.label = this._appLocalization.get('applications.content.entryDetails.distribution.status.ready');
        }
        result.icon = 'kIconcomplete';
        break;

      case KontorolEntryDistributionStatus.deleted:
        result.label = this._appLocalization.get('applications.content.entryDetails.distribution.status.deleted');
        result.icon = 'kIconinactive';
        break;

      case KontorolEntryDistributionStatus.submitting:
      case KontorolEntryDistributionStatus.importSubmitting:
        result.label = this._appLocalization.get('applications.content.entryDetails.distribution.status.submitting');
        result.icon = 'kIconsync';
        break;

      case KontorolEntryDistributionStatus.updating:
      case KontorolEntryDistributionStatus.importUpdating:
        result.label = this._appLocalization.get('applications.content.entryDetails.distribution.status.updating');
        result.icon = 'kIconsync';
        break;

      case KontorolEntryDistributionStatus.deleting:
        result.label = this._appLocalization.get('applications.content.entryDetails.distribution.status.deleting');
        result.icon = 'kIconsync';
        break;

      case KontorolEntryDistributionStatus.errorSubmitting:
      case KontorolEntryDistributionStatus.errorUpdating:
        result.label = this._appLocalization.get('applications.content.entryDetails.distribution.status.errorSubmitting');
        result.icon = 'kIconerror';
        break;

      case KontorolEntryDistributionStatus.errorDeleting:
        result.label = this._appLocalization.get('applications.content.entryDetails.distribution.status.errorDeleting');
        result.icon = 'kIconerror';
        break;

      case KontorolEntryDistributionStatus.removed:
        result.label = this._appLocalization.get('applications.content.entryDetails.distribution.status.removed');
        result.icon = 'kIconinactive';
        break;

      default:
        break;
    }

    return type === 'icon' ? result.icon : result.label;
  }
}
