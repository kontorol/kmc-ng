import { AppEvent } from 'app-shared/kmc-shared/app-events/app-event';
import { KontorolMediaEntry } from 'kontorol-ngx-client';
import { KontorolPlaylist } from 'kontorol-ngx-client';

export class PreviewAndEmbedEvent extends AppEvent {

    constructor(public media: KontorolPlaylist | KontorolMediaEntry)
    {
        super('PreviewAndEmbedEvent');
    }
}
