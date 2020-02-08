import { Component } from '@angular/core';
import { PlaylistsStore } from './playlists/playlists-store/playlists-store.service';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';
import { KontorolLoggerName } from '@kontorol-ng/kontorol-logger';

@Component({
    selector: 'kPlaylists',
    templateUrl: './content-playlists.component.html',
    styleUrls: ['./content-playlists.component.scss'],
    providers: [
      PlaylistsStore,
        KontorolLogger,
        {
            provide: KontorolLoggerName, useValue: 'playlists-store.service'
        }
    ]
})
export class ContentPlaylistsComponent  {}

