import { Pipe, PipeTransform } from '@angular/core';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { KontorolBatchJobStatus } from 'kontorol-ngx-client';

@Pipe({ name: 'kBulkLogTableStatus' })

export class BulkLogStatusPipe implements PipeTransform {

  constructor(private _appLocalization: AppLocalization) {
  }

  transform(value: number): string {
    switch (value) {
      case KontorolBatchJobStatus.pending:
        return this._appLocalization.get('applications.content.bulkUpload.bulkStatus.pending');

      case KontorolBatchJobStatus.queued:
        return this._appLocalization.get('applications.content.bulkUpload.bulkStatus.queued');

      case KontorolBatchJobStatus.processing:
        return this._appLocalization.get('applications.content.bulkUpload.bulkStatus.processing');

      case KontorolBatchJobStatus.finished:
        return this._appLocalization.get('applications.content.bulkUpload.bulkStatus.finished');

      case KontorolBatchJobStatus.aborted:
        return this._appLocalization.get('applications.content.bulkUpload.bulkStatus.aborted');

      case KontorolBatchJobStatus.failed:
        return this._appLocalization.get('applications.content.bulkUpload.bulkStatus.failed');

      case KontorolBatchJobStatus.almostDone:
        return this._appLocalization.get('applications.content.bulkUpload.bulkStatus.almostDone');

      case KontorolBatchJobStatus.fatal:
        return this._appLocalization.get('applications.content.bulkUpload.bulkStatus.fatal');

      case KontorolBatchJobStatus.retry:
        return this._appLocalization.get('applications.content.bulkUpload.bulkStatus.retry');

      case KontorolBatchJobStatus.dontProcess:
        return this._appLocalization.get('applications.content.bulkUpload.bulkStatus.dontProcess');

      case KontorolBatchJobStatus.finishedPartially:
        return this._appLocalization.get('applications.content.bulkUpload.bulkStatus.finishedPartially');

      default:
        return '';
    }
  }
}
