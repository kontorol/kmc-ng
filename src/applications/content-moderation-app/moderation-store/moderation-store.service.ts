import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { KontorolMediaEntry } from 'kontorol-ngx-client';
import { KontorolModerationFlagListResponse } from 'kontorol-ngx-client';
import { KontorolClient } from 'kontorol-ngx-client';
import { BaseEntryGetAction } from 'kontorol-ngx-client';
import { MediaListFlagsAction } from 'kontorol-ngx-client';
import { KontorolFilterPager } from 'kontorol-ngx-client';
import { UserNotifyBanAction } from 'kontorol-ngx-client';
import { AppLocalization } from '@kontorol-ng/mc-shared';

@Injectable()
export class ModerationStore implements OnDestroy {
  constructor(private _kontorolServerClient: KontorolClient, private _appLocalization: AppLocalization) {
  }

  ngOnDestroy() {
  }

  public loadEntryModerationDetails(entryId: string): Observable<{ entry: KontorolMediaEntry, flag: KontorolModerationFlagListResponse }> {
    return this._kontorolServerClient
      .multiRequest([
        new BaseEntryGetAction(
          {
            entryId: entryId,
          }
        ).setRequestOptions({
            acceptedTypes: [KontorolMediaEntry]
        }),
        new MediaListFlagsAction({
          entryId: entryId,
          pager: new KontorolFilterPager({
            pageSize: 500,
            pageIndex: 0
          })
        })
      ])
      .map(([entry, flag]) => ({
        entry: entry.result,
        flag: flag.result
      }))
      .catch(() => {
        return Observable.throw(new Error(this._appLocalization.get('applications.content.moderationDetails.errors.entryDetails')));
      });
  }

  public banCreator(userId: string): Observable<void> {
    return this._kontorolServerClient
      .request(new UserNotifyBanAction({ userId }))
      .catch(() => {
        return Observable.throw(new Error(this._appLocalization.get('applications.content.moderationDetails.errors.ban')));
      })
  }
}

