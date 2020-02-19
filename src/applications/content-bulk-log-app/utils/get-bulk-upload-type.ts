import { KontorolBulkUploadType } from 'kontorol-ngx-client';

export function getBulkUploadType(type: KontorolBulkUploadType): string {
  switch (true) {
    case KontorolBulkUploadType.csv === type:
      return 'csv';

    case KontorolBulkUploadType.xml === type:
    case KontorolBulkUploadType.dropFolderXml === type:
      return 'xml';

    case KontorolBulkUploadType.ical === type:
    case KontorolBulkUploadType.dropFolderIcal === type:
      return 'ics';

    default:
      return 'txt';
  }
}
