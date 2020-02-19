import {Injectable} from '@angular/core';
import {KontorolClient} from 'kontorol-ngx-client';
import { Observable } from 'rxjs';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';
import {MediaAddAction} from 'kontorol-ngx-client';
import {KontorolMediaEntry} from 'kontorol-ngx-client';
import {KontorolMediaType} from 'kontorol-ngx-client';
import {AppLocalization} from '@kontorol-ng/mc-shared';


export interface DraftEntry {
  id: string;
}

@Injectable()
export class PrepareEntryService {

  constructor(private _kontorolServerClient: KontorolClient,
              private _appLocalization: AppLocalization) {
  }

  public createDraftEntry(mediaType: KontorolMediaType, conversionProfileId?: number): Observable<DraftEntry> {

    const entry: KontorolMediaEntry = new KontorolMediaEntry({
      name: this._appLocalization.get('applications.upload.uploadMenu.createDraft.draftEntry'),
      mediaType
    });

    if (conversionProfileId) {
      entry.conversionProfileId = conversionProfileId;
    }

    return this._kontorolServerClient
      .request(new MediaAddAction({entry}))
      .map(media => ({id: media.id}))
      .catch(error => {
        // re-throw the provided error
        return Observable.throw(new Error('Unable to create draft entry'));
      });
  }
}
