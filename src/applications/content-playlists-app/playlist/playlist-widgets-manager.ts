import { Injectable } from '@angular/core';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';
import { WidgetsManagerBase } from '@kontorol-ng/kontorol-ui'
import { KontorolMultiRequest } from 'kontorol-ngx-client';
import { KontorolPlaylist } from 'kontorol-ngx-client';
import { PlaylistStore } from './playlist-store.service';
import {KontorolLogger} from '@kontorol-ng/kontorol-logger';

@Injectable()
export class PlaylistWidgetsManager extends WidgetsManagerBase<KontorolPlaylist, KontorolMultiRequest> {
  private _playlistStore: PlaylistStore;

  constructor(logger: KontorolLogger) {
    super(logger.subLogger('PlaylistWidgetsManager'));
  }

  set playlistStore(value: PlaylistStore) {
    this._playlistStore = value;
  }

  public returnToPlaylists(): void {
    if (this._playlistStore) {
      this._playlistStore.returnToPlaylists();
    }
  }
}
