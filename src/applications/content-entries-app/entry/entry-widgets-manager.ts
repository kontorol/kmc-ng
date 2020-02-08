import {  Injectable } from '@angular/core';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';
import { KontorolMediaEntry } from 'kontorol-ngx-client';
import { WidgetsManagerBase } from '@kontorol-ng/kontorol-ui'
import { EntryStore } from './entry-store.service';
import { KontorolMultiRequest } from 'kontorol-ngx-client';
import {KontorolLogger} from '@kontorol-ng/kontorol-logger';

@Injectable()
export class EntryWidgetsManager extends WidgetsManagerBase<KontorolMediaEntry, KontorolMultiRequest>
{
    private _entryStore : EntryStore;

    constructor(logger: KontorolLogger)
    {
        super(logger.subLogger('EntryWidgetsManager'));
    }

    set entryStore(value : EntryStore)
    {
       this._entryStore = value;
    }

    public returnToEntries() : void{
        if (this._entryStore) {
            this._entryStore.returnToEntries();
        }
    }
}
