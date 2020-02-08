import {Pipe, PipeTransform} from '@angular/core';
import {KontorolSyndicationFeedType} from 'kontorol-ngx-client';
import { AppLocalization } from '@kontorol-ng/mc-shared';

@Pipe({name: 'kDestinationLabel'})
export class DestinationLabelPipe implements PipeTransform {
  constructor(private appLocalization: AppLocalization) {
  }

  transform(value: KontorolSyndicationFeedType): string {
    if (value === KontorolSyndicationFeedType.kontorolXslt) {
      return this.appLocalization.get('applications.content.syndication.table.flexibleFormatFeed');
    }
    return null;
  }
}
