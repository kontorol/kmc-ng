import { KontorolDetachedResponseProfile } from 'kontorol-ngx-client';
import { KontorolResponseProfileType } from 'kontorol-ngx-client';
import { RequestFactory } from '@kontorol-ng/kontorol-common';
import { DropFolderFileListAction } from 'kontorol-ngx-client';
import { KontorolDropFolderFileListResponse } from 'kontorol-ngx-client';
import { KontorolDropFolderFileFilter } from 'kontorol-ngx-client';

export class DropFoldersRequestFactory implements RequestFactory<DropFolderFileListAction, KontorolDropFolderFileListResponse> {
  public uploadedOn: Date;
  public dropFolderIdIn: string;

  constructor() {
  }

  create(): DropFolderFileListAction {
    if (this.uploadedOn === null || this.dropFolderIdIn === null) {
      return null;
    }

    return new DropFolderFileListAction({
      filter: new KontorolDropFolderFileFilter({
        createdAtGreaterThanOrEqual: this.uploadedOn,
        dropFolderIdIn: this.dropFolderIdIn
      })
    }).setRequestOptions({
        responseProfile: new KontorolDetachedResponseProfile({
          type: KontorolResponseProfileType.includeFields,
          fields: 'id,status,createdAt'
      })
    });
  }
}
