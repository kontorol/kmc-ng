import { Pipe, PipeTransform } from '@angular/core';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { KontorolPlayableEntryOrderBy } from 'kontorol-ngx-client';
import { PlaylistRule } from '../playlist-rule/playlist-rule.interface';

@Pipe({ name: 'playlistRuleOrderBy' })
export class PlaylistOrderByPipe implements PipeTransform {
  constructor(private _appLocalization: AppLocalization) {
  }

  transform(rule: PlaylistRule = null): string {
    switch (true) {
      case KontorolPlayableEntryOrderBy.playsDesc === rule.orderBy:
        return this._appLocalization.get('applications.content.playlistDetails.content.orderBy.mostPlayed');

      case KontorolPlayableEntryOrderBy.recentDesc === rule.orderBy:
        return this._appLocalization.get('applications.content.playlistDetails.content.orderBy.mostRecent');

      case KontorolPlayableEntryOrderBy.rankDesc === rule.orderBy:
        return this._appLocalization.get('applications.content.playlistDetails.content.orderBy.highestRated');

      case KontorolPlayableEntryOrderBy.nameAsc === rule.orderBy:
        return this._appLocalization.get('applications.content.playlistDetails.content.orderBy.entryName');

      default:
        return '';
    }
  }
}
