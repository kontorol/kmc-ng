import { Pipe, PipeTransform } from '@angular/core';
import { KontorolDistributionProviderType } from 'kontorol-ngx-client';

@Pipe({ name: 'kEntriesDistributionProviderTypeIcon' })
export class DistributionProviderTypeIconPipe implements PipeTransform {

  transform(providerType: KontorolDistributionProviderType): string {
    let className;

    switch (true) {
      case KontorolDistributionProviderType.comcastMrss === providerType:
        className = 'comcast';
        break;

      case KontorolDistributionProviderType.dailymotion === providerType:
        className = 'dailymotion';
        break;

      case KontorolDistributionProviderType.doubleclick === providerType:
        className = 'doubleclick';
        break;

      case KontorolDistributionProviderType.facebook === providerType:
        className = 'facebook';
        break;

      case KontorolDistributionProviderType.freewheel === providerType:
      case KontorolDistributionProviderType.freewheelGeneric === providerType:
        className = 'freewheel';
        break;

      case KontorolDistributionProviderType.hulu === providerType:
        className = 'hulu';
        break;

      case KontorolDistributionProviderType.crossKontorol === providerType:
        className = 'kontorol';
        break;

      case KontorolDistributionProviderType.quickplay === providerType:
        className = 'quickplay';
        break;

      case KontorolDistributionProviderType.uverse === providerType:
      case KontorolDistributionProviderType.uverseClickToOrder === providerType:
      case KontorolDistributionProviderType.attUverse === providerType:
        className = 'uverse';
        break;

      case KontorolDistributionProviderType.yahoo === providerType:
        className = 'yahoo';
        break;

      case KontorolDistributionProviderType.youtube === providerType:
      case KontorolDistributionProviderType.youtubeApi === providerType:
        className = 'youtube';
        break;

      default:
        className = 'distribution';
        break;
    }

    return className;
  }
}
