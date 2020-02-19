import { Pipe, PipeTransform } from '@angular/core';
import { KontorolMetadataObjectType } from 'kontorol-ngx-client';
import { AppLocalization } from '@kontorol-ng/mc-shared';

@Pipe({ name: 'kReachProfileCredit' })
export class ReachProfileCreditPipe implements PipeTransform {
  constructor(private _appLocalization: AppLocalization) {
  }

  transform(value: number): string {
    if (value) {
      if (value === -9999) {
        return this._appLocalization.get('applications.settings.reach.unlimited');
      } else {
          return value.toString();
      }
    }
    return '';
  }
}
