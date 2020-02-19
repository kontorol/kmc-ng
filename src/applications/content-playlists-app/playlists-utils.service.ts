import { Injectable } from '@angular/core';
import { KontorolPlaylist } from 'kontorol-ngx-client';

@Injectable()
export class PlaylistsUtilsService {

  constructor() {
  }

  public isRapt(playlist: KontorolPlaylist): boolean {
      return playlist.adminTags && playlist.adminTags.split(',').indexOf('raptentry') > -1 ? true : false;
  }
}
