import { Pipe, PipeTransform } from '@angular/core';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { KontorolBulkUploadObjectType } from 'kontorol-ngx-client';

@Pipe({ name: 'kBulkLogTableObjectType' })

export class BulkLogObjectTypePipe implements PipeTransform {

  constructor(private _appLocalization: AppLocalization) {
  }

  transform(value: KontorolBulkUploadObjectType): string {
    switch (true) {
      case KontorolBulkUploadObjectType.category === value:
        return this._appLocalization.get('applications.content.bulkUpload.objectType.category');

      case KontorolBulkUploadObjectType.categoryUser === value:
        return this._appLocalization.get('applications.content.bulkUpload.objectType.categoryUser');

      case KontorolBulkUploadObjectType.entry === value:
        return this._appLocalization.get('applications.content.bulkUpload.objectType.entry');

      case KontorolBulkUploadObjectType.user === value:
        return this._appLocalization.get('applications.content.bulkUpload.objectType.user');

      default:
        return this._appLocalization.get('applications.content.bulkUpload.objectType.other');
    }
  }
}
