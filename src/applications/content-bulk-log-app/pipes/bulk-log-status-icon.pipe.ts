import { Pipe, PipeTransform } from '@angular/core';
import { KontorolBatchJobStatus } from 'kontorol-ngx-client';

@Pipe({ name: 'kBulkLogTableStatusIcon' })
export class BulkLogStatusIconPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case KontorolBatchJobStatus.pending:
      case KontorolBatchJobStatus.queued:
      case KontorolBatchJobStatus.dontProcess:
        return 'kIconUpload2 kBulkLogTablePending';

      case KontorolBatchJobStatus.processing:
      case KontorolBatchJobStatus.almostDone:
        return 'kIconSync kBulkLogTableProgress';

      case KontorolBatchJobStatus.finished:
      case KontorolBatchJobStatus.finishedPartially: // waiting for icon
        return 'kIconComplete kBulkLogTableSuccess';

      case KontorolBatchJobStatus.failed:
      case KontorolBatchJobStatus.fatal:
      case KontorolBatchJobStatus.aborted: // waiting for icon
      case KontorolBatchJobStatus.retry: // waiting for icon
        return 'kIconError kBulkLogTableFailed';

      default:
        return '';
    }
  }
}
