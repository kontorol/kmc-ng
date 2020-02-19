import {Pipe, PipeTransform} from '@angular/core';
import {KontorolSyndicationFeedType} from 'kontorol-ngx-client';

@Pipe({name: 'kDestinationIcon'})
export class DestinationIconPipe implements PipeTransform {
  constructor() {
  }

  transform(value: KontorolSyndicationFeedType): string {
    switch (value) {
      case KontorolSyndicationFeedType.googleVideo:
        return 'kIconGoogle';
      case KontorolSyndicationFeedType.yahoo:
        return 'kIconYahoo';
      case KontorolSyndicationFeedType.itunes:
        return 'kIconITunes';
      case KontorolSyndicationFeedType.rokuDirectPublisher:
        return 'kIconRoku';
      case KontorolSyndicationFeedType.operaTvSnap:
        return 'kIconOpera';
      case KontorolSyndicationFeedType.kontorolXslt:
        // handled by DestinationLabelPipe since we need to show text and not icon
        return '';
      default:
        return '';
    }
  }
}
