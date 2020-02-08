import { Injectable } from '@angular/core';
import { KontorolClient } from 'kontorol-ngx-client';
import { BulkUploadAddAction } from 'kontorol-ngx-client';
import { KontorolBulkUploadType } from 'kontorol-ngx-client';
import { KontorolBulkUploadCsvJobData } from 'kontorol-ngx-client';
import { CategoryAddFromBulkUploadAction } from 'kontorol-ngx-client';
import { KontorolBulkUploadCategoryData } from 'kontorol-ngx-client';
import { KontorolBulkUploadUserData } from 'kontorol-ngx-client';
import { KontorolBulkUploadCategoryUserData } from 'kontorol-ngx-client';
import { UserAddFromBulkUploadAction } from 'kontorol-ngx-client';
import { CategoryUserAddFromBulkUploadAction } from 'kontorol-ngx-client';
import { Observable } from 'rxjs';
import { KontorolBulkUpload } from 'kontorol-ngx-client';

export enum BulkUploadTypes {
  entries,
  categories,
  endUsers,
  endUsersEntitlement
}

@Injectable()
export class BulkUploadService {
  constructor(private _kontorolServerClient: KontorolClient) {
  }

  private _getKontorolBulkUploadType(file: File): KontorolBulkUploadType {
    const extension = /(?:\.([^.]+))?$/.exec(file.name)[1];
    return 'csv' === extension ? KontorolBulkUploadType.csv : KontorolBulkUploadType.xml;
  }

  private _getKontorolActionByType(fileData: File, type: BulkUploadTypes): BulkUploadAddAction
    | CategoryAddFromBulkUploadAction
    | UserAddFromBulkUploadAction
    | CategoryUserAddFromBulkUploadAction {

    const bulkUploadData = new KontorolBulkUploadCsvJobData();
    bulkUploadData.fileName = fileData.name;

    switch (type) {
      case BulkUploadTypes.entries:
        return new BulkUploadAddAction({
          conversionProfileId: -1,
          csvFileData: fileData,
          bulkUploadType: this._getKontorolBulkUploadType(fileData)
        });
      case BulkUploadTypes.categories:
        return new CategoryAddFromBulkUploadAction({
          fileData,
          bulkUploadData,
          bulkUploadCategoryData: new KontorolBulkUploadCategoryData()
        });
      case BulkUploadTypes.endUsers:
        return new UserAddFromBulkUploadAction({
          fileData,
          bulkUploadData,
          bulkUploadUserData: new KontorolBulkUploadUserData()
        });
      case BulkUploadTypes.endUsersEntitlement:
        return new CategoryUserAddFromBulkUploadAction({
          fileData,
          bulkUploadData,
          bulkUploadCategoryUserData: new KontorolBulkUploadCategoryUserData()
        });
      default:
        return null;
    }
  }

  private _getAction(files: File[], type: BulkUploadTypes): (BulkUploadAddAction
    | CategoryAddFromBulkUploadAction
    | UserAddFromBulkUploadAction
    | CategoryUserAddFromBulkUploadAction)[] {
    return files
      .map(file => this._getKontorolActionByType(file, type))
      .filter(Boolean);
  }

  public upload(files: FileList, type: BulkUploadTypes): Observable<KontorolBulkUpload> {
    const actions = this._getAction(Array.from(files), type);

    return Observable.from(actions)
      .flatMap(action => this._kontorolServerClient.request(action));
  }
}
