import { Pipe, PipeTransform } from '@angular/core';
import { TrackedFileStatuses } from '@kontorol-ng/kontorol-common';
import { AppLocalization } from '@kontorol-ng/mc-shared';

@Pipe({ name: 'kUploadStatus' })
export class UploadStatusPipe implements PipeTransform {

  constructor(private _appLocalization: AppLocalization) {
  }

  transform(value: TrackedFileStatuses): string {
    let translateToken = '';
    switch (value) {
      case TrackedFileStatuses.uploading:
        translateToken = 'uploading';
        break;

      case TrackedFileStatuses.uploadCompleted:
        translateToken = 'uploaded';
        break;

      case TrackedFileStatuses.added:
      case TrackedFileStatuses.preparing:
      case TrackedFileStatuses.prepared:
      case TrackedFileStatuses.pendingPrepare:
        translateToken = 'queued';
        break;

      case TrackedFileStatuses.failure:
        translateToken = 'uploadFailure';
        break;

      default:
        break;
    }

    return translateToken ? this._appLocalization.get(`applications.content.uploadControl.table.status.${translateToken}`) : '';
  }
}
