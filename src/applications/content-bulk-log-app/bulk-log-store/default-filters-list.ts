import { KontorolBulkUploadObjectType } from 'kontorol-ngx-client';
import { KontorolBatchJobStatus } from 'kontorol-ngx-client';

export const DefaultFiltersList: {
  name: string;
  label: string;
  items: { value: string, label: string }[]
}[] = [
  {
    name: 'uploadedItem',
    label: 'uploadedItems',
    items: [
      { value: KontorolBulkUploadObjectType.entry, label: 'entries' },
      { value: KontorolBulkUploadObjectType.category, label: 'categories' },
      { value: KontorolBulkUploadObjectType.categoryUser, label: 'endUserEntitlements' },
      { value: KontorolBulkUploadObjectType.user, label: 'endUsers' }
    ]
  },
  {
    name: 'status',
    label: 'statuses',
    items: [
      { value: `${KontorolBatchJobStatus.finished}`, label: 'successFinish' },
      { value: `${KontorolBatchJobStatus.finishedPartially}`, label: 'errorFinish' },
      { value: [KontorolBatchJobStatus.failed, KontorolBatchJobStatus.fatal].join(','), label: 'failed' },
      {
        value: [
          KontorolBatchJobStatus.pending,
          KontorolBatchJobStatus.queued,
          KontorolBatchJobStatus.finished,
          KontorolBatchJobStatus.processed,
          KontorolBatchJobStatus.movefile,
          KontorolBatchJobStatus.aborted,
          KontorolBatchJobStatus.almostDone,
          KontorolBatchJobStatus.retry,
          KontorolBatchJobStatus.dontProcess
        ].join(','),
        label: 'otherStatuses'
      }
    ]
  }
];
