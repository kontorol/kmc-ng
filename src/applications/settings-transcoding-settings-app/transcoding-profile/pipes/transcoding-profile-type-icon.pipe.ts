import { Pipe, PipeTransform } from '@angular/core';
import { KontorolConversionProfileType } from 'kontorol-ngx-client';
import { AppLocalization } from '@kontorol-ng/mc-shared';

@Pipe({
  name: 'kTranscodingProfileType'
})
export class TranscodingProfileTypePipe implements PipeTransform {
  constructor(private _appLocalization: AppLocalization) {
  }

  transform(value: KontorolConversionProfileType, icon: boolean): string {
    if (!value) {
      return '';
    }

    let result = {
      icon: '',
      label: ''
    };

    switch (true) {
      case value === KontorolConversionProfileType.media:
        result = {
          icon: 'kIcontranscoding',
          label: this._appLocalization.get('applications.settings.transcoding.type.media')
        };
        break;

      case value === KontorolConversionProfileType.liveStream:
        result = {
          icon: 'kIconlive_transcoding',
          label: this._appLocalization.get('applications.settings.transcoding.type.live')
        };
        break;

      default:
        break;
    }

    return icon ? result.icon : result.label;
  }

}
