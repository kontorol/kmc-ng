import { Pipe, PipeTransform } from '@angular/core';
import { KontorolMediaType } from 'kontorol-ngx-client';
import { AppLocalization } from '@kontorol-ng/mc-shared';

@Pipe({name: 'entryType'})
export class EntryTypePipe implements PipeTransform {

    constructor(private appLocalization: AppLocalization) {
    }

    transform(value, isTooltip: boolean): string {
        let className = "";
        let tooltip = "";
        if (typeof(value) !== 'undefined' && value !== null) {
            switch (value) {
                case KontorolMediaType.video:
                    className = 'kIconvideo-small';
                    tooltip = this.appLocalization.get("applications.content.entryType.video");
                    break;
                case KontorolMediaType.image:
                    tooltip = this.appLocalization.get("applications.content.entryType.image");
                    className = 'kIconimage-small';
                    break;
                case KontorolMediaType.audio:
                    tooltip = this.appLocalization.get("applications.content.entryType.audio");
                    className = 'kIconsound-small';
                    break;
                case KontorolMediaType.liveStreamFlash:
                case KontorolMediaType.liveStreamQuicktime:
                case KontorolMediaType.liveStreamRealMedia:
                case KontorolMediaType.liveStreamWindowsMedia:
                    tooltip = this.appLocalization.get("applications.content.entryType.live");
                    className = 'kIconlive_transcoding';
                    break;
                default:
                    tooltip = this.appLocalization.get("applications.content.entryType.unknown");
                    className = 'kIconfile-small';
                    break;
            }
        }
        if (isTooltip) {
            return tooltip;
        } else {
            return className;
        }
    }
}
