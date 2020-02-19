import {Pipe, PipeTransform} from '@angular/core';
import {KontorolPlaylist} from 'kontorol-ngx-client';
import {KontorolPlaylistType} from 'kontorol-ngx-client';

@Pipe({name: 'kToPlaylistIcon'})
export class PlaylistIconPipe implements PipeTransform {
  constructor() {
  }

  transform(playlistId: string, playlistsIdToNameMap: Map<string, KontorolPlaylist>): string {
    if (!playlistId) {
      return '';
    }
    if (!playlistsIdToNameMap) {
      return playlistId;
    }

    const playlist = playlistsIdToNameMap.get(playlistId);
    if (!playlist) {
        return '';
    }

    const playlistType = playlist.playlistType;

    if (typeof(playlistType) !== 'undefined' && playlistType !== null) {
      switch (playlistType) {
        case KontorolPlaylistType.dynamic:
        case KontorolPlaylistType.external:
          return 'kIconPlaylist_RuleBased';
        case KontorolPlaylistType.staticList:
          return 'kIconPlaylist_Manual';
        default:
          return 'kIconUnknown';
      }
    }
  }
}
