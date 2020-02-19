import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { KontorolClient } from 'kontorol-ngx-client';
import { ConversionProfileListAction } from 'kontorol-ngx-client';
import { KontorolConversionProfileFilter } from 'kontorol-ngx-client';
import { KontorolConversionProfileType } from 'kontorol-ngx-client';
import { KontorolFilterPager } from 'kontorol-ngx-client';
import { KontorolConversionProfileListResponse } from 'kontorol-ngx-client';
import { KontorolConversionProfile } from 'kontorol-ngx-client';
import { AppEventsService } from 'app-shared/kmc-shared';
import { cancelOnDestroy } from '@kontorol-ng/kontorol-common';
import { TranscodingProfilesUpdatedEvent } from 'app-shared/kmc-shared/events';

@Injectable()
export class TranscodingProfileManagement implements OnDestroy {
  private _transcodingProfileCache$;

  constructor(private _serverClient: KontorolClient,
              _appEvents: AppEventsService) {
      _appEvents.event(TranscodingProfilesUpdatedEvent)
          .pipe(cancelOnDestroy(this))
          .subscribe(() => {
              this._clearCache();
          });
  }

    ngOnDestroy() {
    }

    private _clearCache(): void {
        this._transcodingProfileCache$ = null;
    }

  private _loadTranscodingProfiles(): Observable<KontorolConversionProfile[]> {
    return this._serverClient
      .request(
          new ConversionProfileListAction({
              filter: new KontorolConversionProfileFilter({ typeEqual: KontorolConversionProfileType.media }),
              pager: new KontorolFilterPager({ pageSize: 500 })
          })
      )
      .map((res: KontorolConversionProfileListResponse) => res.objects);
  }

  public get(): Observable<KontorolConversionProfile[]> {
    if (!this._transcodingProfileCache$) {
      this._transcodingProfileCache$ = this._loadTranscodingProfiles()
        .catch(err => {
          console.log(`log: [warn] [transcodingProfile-management] Error during load transcoding profiles: ${err}`);
          this._transcodingProfileCache$ = null;
          return Observable.throw(err);
        })
        .publishReplay(1)
        .refCount();
    }

    return this._transcodingProfileCache$;
  }
}
