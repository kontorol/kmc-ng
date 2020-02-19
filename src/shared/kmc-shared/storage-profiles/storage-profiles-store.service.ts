import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { PartnerProfileStore } from '../partner-profile';
import { KontorolClient } from 'kontorol-ngx-client';
import { KontorolStorageProfileStatus } from 'kontorol-ngx-client';
import { KontorolStorageProfileFilter } from 'kontorol-ngx-client';
import { StorageProfileListAction } from 'kontorol-ngx-client';
import { KontorolStorageProfileListResponse } from 'kontorol-ngx-client';
import { KontorolStorageProfile } from 'kontorol-ngx-client';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';

@Injectable()
export class StorageProfilesStore extends PartnerProfileStore implements OnDestroy {

  private _getStorageProfiles$: Observable<{ items: KontorolStorageProfile[] }>;

  constructor(private _kontorolServerClient: KontorolClient) {
    super();
  }

  public get(): Observable<{ items: KontorolStorageProfile[] }> {
    if (!this._getStorageProfiles$) {
      // execute the request
      this._getStorageProfiles$ = this._buildGetRequest()
        .pipe(cancelOnDestroy(this))
        .map(response => ({ items: response ? response.objects : [] }))
        .catch(
          error => {
            // re-throw the provided error
            this._getStorageProfiles$ = null;
            return Observable.throw(error);
          }
        )
        .publishReplay(1)
        .refCount();
    }

    return this._getStorageProfiles$;
  }

  ngOnDestroy() {
  }

  private _buildGetRequest(): Observable<KontorolStorageProfileListResponse> {
    return this._kontorolServerClient.request(new StorageProfileListAction({
      filter: new KontorolStorageProfileFilter({
        statusIn: [KontorolStorageProfileStatus.automatic, KontorolStorageProfileStatus.manual].join(',')
      })
    }));
  }
}
