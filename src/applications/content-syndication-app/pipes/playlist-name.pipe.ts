import {Pipe, PipeTransform} from '@angular/core';
import {KontorolPlaylist} from 'kontorol-ngx-client';
import {AppLocalization} from '@kontorol-ng/mc-shared';

@Pipe({name: 'kToPlaylistName'})
export class PlaylistNamePipe implements PipeTransform {
  constructor(private _appLocalization: AppLocalization) {
  }

  transform(playlistId: string, playlistsIdToObjectMap: Map<string, KontorolPlaylist>): string {
    if (!playlistId) {
      return this._appLocalization.get('applications.content.syndication.table.allContent');
    }
    if (!playlistsIdToObjectMap) {
      return playlistId;
    }

    const playlist = playlistsIdToObjectMap.get(playlistId);
    return (playlist && playlist.name) || playlistId;
  }
}
