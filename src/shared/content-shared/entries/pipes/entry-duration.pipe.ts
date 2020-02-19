import { Pipe, PipeTransform } from '@angular/core';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { KontorolMediaType } from 'kontorol-ngx-client';
import { KontorolMediaEntry } from 'kontorol-ngx-client';
import { KontorolExternalMediaEntry } from 'kontorol-ngx-client';

@Pipe({ name: 'entryDuration' })
export class EntryDurationPipe implements PipeTransform {
  constructor(private appLocalization: AppLocalization) {
  }

  transform(value: string, entry: KontorolMediaEntry = null): string {
    let duration = value;
    if (entry && entry instanceof KontorolExternalMediaEntry && !entry.duration) {
      duration = this.appLocalization.get('app.common.n_a');
    } else if (entry && entry instanceof KontorolMediaEntry && entry.mediaType) {
      const type = entry.mediaType.toString();
      if (type === KontorolMediaType.liveStreamFlash.toString() ||
        type === KontorolMediaType.liveStreamQuicktime.toString() ||
        type === KontorolMediaType.liveStreamRealMedia.toString() ||
        type === KontorolMediaType.liveStreamWindowsMedia.toString()
      ) {
        duration = this.appLocalization.get('app.common.n_a');
      }
    }
    return duration;
  }
}
