import { Pipe, PipeTransform } from '@angular/core';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { KontorolModerationFlagType } from 'kontorol-ngx-client';

@Pipe({ name: 'kFlagType' })
export class FlagTypePipe implements PipeTransform {
  constructor(private appLocalization: AppLocalization) {
  }

  transform(value: string): string {
    let flagType = '';
    if (value) {
      switch (value.toString()) {
        case KontorolModerationFlagType.sexualContent.toString():
          flagType = this.appLocalization.get('applications.content.moderation.sexualContent');
          break;
        case KontorolModerationFlagType.harmfulDangerous.toString():
          flagType = this.appLocalization.get('applications.content.moderation.harmfulOrDangerousAct');
          break;
        case KontorolModerationFlagType.spamCommercials.toString():
          flagType = this.appLocalization.get('applications.content.moderation.spamOrCommercials');
          break;
        case KontorolModerationFlagType.violentRepulsive.toString():
          flagType = this.appLocalization.get('applications.content.moderation.violentOrRepulsive');
          break;
      }
    }
    return flagType;
  }
}
