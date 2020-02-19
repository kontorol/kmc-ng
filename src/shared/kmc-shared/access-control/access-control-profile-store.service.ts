import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { PartnerProfileStore } from '../partner-profile';

import { KontorolClient } from 'kontorol-ngx-client';
import { AccessControlListAction } from 'kontorol-ngx-client';

import { KontorolAccessControlFilter } from 'kontorol-ngx-client';
import { KontorolAccessControl } from 'kontorol-ngx-client';
import { KontorolFilterPager } from 'kontorol-ngx-client';
import { KontorolAccessControlListResponse } from 'kontorol-ngx-client';
import { AppEventsService } from '../app-events';
import { AccessControlProfileUpdatedEvent } from '../events/access-control-profile-updated.event';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';

@Injectable()
export class AccessControlProfileStore extends PartnerProfileStore implements OnDestroy {
  private _cachedProfiles$: Observable<{ items: KontorolAccessControl[] }>;

  constructor(private _kontorolServerClient: KontorolClient, _appEvents: AppEventsService) {
    super();

    _appEvents.event(AccessControlProfileUpdatedEvent)
      .pipe(cancelOnDestroy(this))
      .subscribe(() => {
        this._clearCache();
      });
  }

  ngOnDestroy() {
  }

  private _clearCache(): void {
    this._cachedProfiles$ = null;
  }

  public get(): Observable<{ items: KontorolAccessControl[] }> {
    if (!this._cachedProfiles$) {
      // execute the request
      this._cachedProfiles$ = this._buildGetRequest()
        .pipe(cancelOnDestroy(this))
        .map(
          response => {
            return ({items: response ? response.objects : []});
          })
        .catch(error => {
          // re-throw the provided error
          this._cachedProfiles$ = null;
          return Observable.throw(new Error('failed to retrieve access control profiles list'));
        })
        .publishReplay(1)
        .refCount();
    }

    return this._cachedProfiles$;
  }

  private _buildGetRequest(): Observable<KontorolAccessControlListResponse> {
    const filter = new KontorolAccessControlFilter({ orderBy: '-createdAt' });
    const pager = new KontorolFilterPager({ pageSize: 1000 });
    return <any>this._kontorolServerClient.request(new AccessControlListAction({ filter, pager }));
  }
}
