import { AppEvent } from 'app-shared/kmc-shared/app-events/app-event';
import { KontorolBatchJobStatus } from 'kontorol-ngx-client';

export class BulkLogUploadingStartedEvent extends AppEvent {
  constructor(public id: number, public status: KontorolBatchJobStatus, public uploadedOn: Date) {
    super('BulkLogUploadingStarted');
  }
}
