import { KontorolBulkUploadObjectType } from 'kontorol-ngx-client';
import { KontorolDetachedResponseProfile } from 'kontorol-ngx-client';
import { KontorolResponseProfileType } from 'kontorol-ngx-client';
import { KontorolBulkUploadFilter } from 'kontorol-ngx-client';
import { BulkListAction } from 'kontorol-ngx-client';
import { RequestFactory } from '@kontorol-ng/kontorol-common';
import { KontorolBulkUploadListResponse } from 'kontorol-ngx-client';

export class BulkUploadRequestFactory implements RequestFactory<BulkListAction, KontorolBulkUploadListResponse> {

  public uploadedOn: Date;

  constructor() {
  }

  create(): BulkListAction {
    const bulkUploadObjectTypeIn = [
      KontorolBulkUploadObjectType.entry,
      KontorolBulkUploadObjectType.category,
      KontorolBulkUploadObjectType.user,
      KontorolBulkUploadObjectType.categoryUser
    ];

    if (this.uploadedOn === null) {
      return null;
    } else {
      return new BulkListAction({
        bulkUploadFilter: new KontorolBulkUploadFilter({
          bulkUploadObjectTypeIn: bulkUploadObjectTypeIn.join(','),
          uploadedOnGreaterThanOrEqual: this.uploadedOn
        })
      }).setRequestOptions({
          responseProfile: new KontorolDetachedResponseProfile({
              type: KontorolResponseProfileType.includeFields,
              fields: 'id,status,uploadedOn'
          })
      });
    }
  }
}
