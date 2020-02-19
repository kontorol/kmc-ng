import { Pipe, PipeTransform } from '@angular/core';
import { KontorolDropFolderFileStatus } from 'kontorol-ngx-client';
import { AppLocalization } from '@kontorol-ng/mc-shared';

@Pipe({ name: 'kFolderFileStatus' })
export class FolderFileStatusPipe implements PipeTransform {
  constructor(private _appLocalization: AppLocalization) {
  }

  transform(value: string, isIcon: boolean, isTooltip: boolean): string {
    let className = '';
    let label = '';
    let tooltip = '';
    if (typeof(value) !== 'undefined' && value !== null) {
      switch (parseInt(value, 10)) {
        case KontorolDropFolderFileStatus.uploading:
          className = 'kIconsync kIconBlue';
          label = this._appLocalization.get('applications.content.dropFolders.dropFolderStatusLabels.uploading');
          tooltip = this._appLocalization.get('applications.content.dropFolders.dropFolderStatusTooltips.uploading');
          break;
        case KontorolDropFolderFileStatus.downloading:
          className = 'kIconsync kIconBlue';
          label = this._appLocalization.get('applications.content.dropFolders.dropFolderStatusLabels.downloading');
          tooltip = this._appLocalization.get('applications.content.dropFolders.dropFolderStatusTooltips.downloading');
          break;
        case KontorolDropFolderFileStatus.pending:
          className = 'kIconupload2 kIconOrange';
          label = this._appLocalization.get('applications.content.dropFolders.dropFolderStatusLabels.pending');
          tooltip = this._appLocalization.get('applications.content.dropFolders.dropFolderStatusTooltips.pending');
          break;
        case KontorolDropFolderFileStatus.processing:
          className = 'kIconsync kIconBlue';
          label = this._appLocalization.get('applications.content.dropFolders.dropFolderStatusLabels.processing');
          tooltip = this._appLocalization.get('applications.content.dropFolders.dropFolderStatusTooltips.processing');
          break;
        case KontorolDropFolderFileStatus.parsed:
          className = 'kIconupload2 kIconOrange';
          label = this._appLocalization.get('applications.content.dropFolders.dropFolderStatusLabels.parsedFromXml');
          tooltip = this._appLocalization.get('applications.content.dropFolders.dropFolderStatusTooltips.parsedFromXml');
          break;
        case KontorolDropFolderFileStatus.waiting:
          className = 'kIconupload2 kIconOrange';
          label = this._appLocalization.get('applications.content.dropFolders.dropFolderStatusLabels.waitingForRelatedFiles');
          tooltip = this._appLocalization.get('applications.content.dropFolders.dropFolderStatusTooltips.waitingForRelatedFiles');
          break;
        case KontorolDropFolderFileStatus.noMatch:
          className = 'kIconupload2 kIconOrange';
          label = this._appLocalization.get('applications.content.dropFolders.dropFolderStatusLabels.waitingForMatchedEntry');
          tooltip = this._appLocalization.get('applications.content.dropFolders.dropFolderStatusTooltips.waitingForMatchedEntry');
          break;
        case KontorolDropFolderFileStatus.errorHandling:
          className = 'kIconerror kIconRed';
          label = this._appLocalization.get('applications.content.dropFolders.dropFolderStatusLabels.error');
          tooltip = this._appLocalization.get('applications.content.dropFolders.dropFolderStatusTooltips.error');
          break;
        case KontorolDropFolderFileStatus.errorDeleting:
          className = 'kIconerror kIconRed';
          label = this._appLocalization.get('applications.content.dropFolders.dropFolderStatusLabels.deleteFailed');
          tooltip = this._appLocalization.get('applications.content.dropFolders.dropFolderStatusTooltips.deleteFailed');
          break;
        case KontorolDropFolderFileStatus.handled:
          className = 'kIconcomplete kIconGreen';
          label = this._appLocalization.get('applications.content.dropFolders.dropFolderStatusLabels.done');
          tooltip = this._appLocalization.get('applications.content.dropFolders.dropFolderStatusTooltips.done');
          break;
        case KontorolDropFolderFileStatus.errorDownloading:
          className = 'kIconerror kIconRed';
          label = this._appLocalization.get('applications.content.dropFolders.dropFolderStatusLabels.downloadFailed');
          tooltip = this._appLocalization.get('applications.content.dropFolders.dropFolderStatusTooltips.downloadFailed');
          break;
        default:
          className = 'kIconUnknown kIconRed';
          label = this._appLocalization.get('applications.content.dropFolders.table.unknown');
          tooltip = this._appLocalization.get('applications.content.dropFolders.table.unknown');
          break;
      }
    }
    if (isIcon) {
      return className;
    } else if (isTooltip) {
      return tooltip;
    } else {
      return label;
    }
  }
}
