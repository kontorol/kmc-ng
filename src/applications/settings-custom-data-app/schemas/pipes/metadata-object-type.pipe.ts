import { Pipe, PipeTransform } from '@angular/core';
import { KontorolMetadataObjectType } from 'kontorol-ngx-client';
import { AppLocalization } from '@kontorol-ng/mc-shared';

@Pipe({ name: 'kMetadataObjectType' })
export class MetadataObjectTypePipe implements PipeTransform {
  constructor(private _appLocalization: AppLocalization) {

  }

  transform(value: KontorolMetadataObjectType): string {
    if (value) {
      if (value === KontorolMetadataObjectType.entry) {
        return this._appLocalization.get('applications.settings.metadata.applyTo.entries');
      }

      if (value === KontorolMetadataObjectType.category) {
        return this._appLocalization.get('applications.settings.metadata.applyTo.categories');
      }
      
      if (value === KontorolMetadataObjectType.userEntry) {
        return this._appLocalization.get('applications.settings.metadata.applyTo.userEntry');
      }
    }

    return '';
  }
}
