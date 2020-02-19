import { Component } from '@angular/core';
import { PlaylistStore } from '../playlist-store.service';
import { KontorolPlaylistType } from 'kontorol-ngx-client';

@Component({
  selector: 'kPlaylistContent',
  templateUrl: './playlist-content.component.html'
})
export class PlaylistContentComponent {
  public _playlistTypes = KontorolPlaylistType;
  constructor(public _playlistStore: PlaylistStore) {
  }
}
