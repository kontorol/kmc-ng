import { AppEvent } from 'shared/kmc-shared/app-events/app-event';
import { KontorolPlaylistType } from 'kontorol-ngx-client';
import { ContentPlaylistViewSections } from 'app-shared/kmc-shared/kmc-views/details-views';

export interface CreateNewPlaylistEventArgs {
  name?: string;
  type: KontorolPlaylistType;
  description?: string;
  playlistContent?: string; // entry ids separated by comma
}

export class CreateNewPlaylistEvent extends AppEvent {
  constructor(public data: CreateNewPlaylistEventArgs, public section?: ContentPlaylistViewSections) {
    super('CreateNewPlaylist');
  }
}
