import {Injectable, OnDestroy} from '@angular/core';
import { Observable } from 'rxjs';
import {ISubscription} from 'rxjs/Subscription';
import 'rxjs/add/observable/throw';
import {KontorolClient} from 'kontorol-ngx-client';
import {KontorolFilterPager} from 'kontorol-ngx-client';
import {UiConfListAction} from 'kontorol-ngx-client';
import {KontorolUiConfListResponse} from 'kontorol-ngx-client';
import {KontorolUiConfFilter} from 'kontorol-ngx-client';
import {KontorolUiConfObjType} from 'kontorol-ngx-client';
import {KontorolUiConf} from 'kontorol-ngx-client';
import {KontorolLogger} from '@kontorol-ng/kontorol-logger';
import {KontorolDetachedResponseProfile} from 'kontorol-ngx-client';
import {KontorolResponseProfileType} from 'kontorol-ngx-client';
import {AppEventsService} from "app-shared/kmc-shared";
import {PlayersUpdatedEvent} from "app-shared/kmc-shared/events";
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';
import { KMCPermissions, KMCPermissionsService } from 'app-shared/kmc-shared/kmc-permissions';

export enum PlayerTypes {
  Entry = 1,
  Playlist = 2
}

export interface GetFilters {
  type: PlayerTypes;
}


@Injectable()
export class PlayersStore implements OnDestroy {
  private _cachedPlayers: { [key: string]: Observable<KontorolUiConf[]> } = {};
  private _logger: KontorolLogger;

  constructor(private _kontorolServerClient: KontorolClient, logger: KontorolLogger, private _appEvents: AppEventsService, private _permissionsService: KMCPermissionsService) {
    this._logger = logger.subLogger('PlayersStore');

    this._appEvents.event(PlayersUpdatedEvent)
      .pipe(cancelOnDestroy(this))
      .subscribe((event) => {
        this._logger.info(`clear players cache (triggered by PlayersUpdatedEvent)`);
        const cacheKeyToDelete = this._createCacheKey({type: event.isPlaylist ? PlayerTypes.Playlist : PlayerTypes.Entry});
        delete this._cachedPlayers[cacheKeyToDelete];
      });
  }

  ngOnDestroy() {

  }

  public get(filters: GetFilters): Observable<KontorolUiConf[]> {
    const cacheToken = this._createCacheKey(filters);
    let cachedResponse = this._cachedPlayers[cacheToken];

    // // no request found in queue - get from cache if already queried those categories
    // let cachedResponse = this._cachedPlayers[cacheToken];

    if (!cachedResponse) {
      this._logger.info(`caching players for token '${cacheToken}'`);
      this._cachedPlayers[cacheToken] = cachedResponse =
        Observable.create(observer => {
          let sub: ISubscription;
          let currentPageIndex = 0;
          let playersResults = [];
          const loadPlayers = () => {
            sub = this._buildRequest(filters, ++currentPageIndex).subscribe(
              response => {
                sub = null;
                  response.objects.filter( (uiConf) => {
                      let showPlayer = true;
                      if (uiConf.html5Url){
                          showPlayer = uiConf.html5Url.indexOf('html5lib/v1') === -1; // filter out V1 players
                      } else {
                          showPlayer = uiConf.tags.indexOf('kontorolPlayerJs') > -1 && this._permissionsService.hasPermission(KMCPermissions.FEATURE_V3_STUDIO_PERMISSION); // show V3 players if user has permissions
                      }
                      // filter out by tags
                      if (uiConf.tags && uiConf.tags.length){
                          const tags = uiConf.tags.split(',');
                          if (tags.indexOf('ott') > -1) {
                              showPlayer = false;
                          }
                      }
                      return showPlayer;
                  }).forEach(uiConf => {
                      playersResults.push(uiConf);
                  });

                  observer.next({items: playersResults});
                  observer.complete();
              },
              error => {
                sub = null;
                this._cachedPlayers[cacheToken] = null;
                observer.error(error);
              }
            );
          };

          loadPlayers();

          return () => {
          }
        })
          .publishReplay(1)
          .refCount();
    }

    return cachedResponse;
  }


  private _createCacheKey(filters: GetFilters) {
    if (filters) {
      return `_${filters.type ? filters.type : ''}_`;
    } else {
      throw new Error('filter argument missing')
    }
  }

  private _buildRequest(filters: GetFilters, pageIndex: number): Observable<KontorolUiConfListResponse> {
    const tags = filters && filters.type === PlayerTypes.Playlist ? 'playlist' : 'player';

    const filter: KontorolUiConfFilter = new KontorolUiConfFilter({
      objTypeEqual: KontorolUiConfObjType.player,
      tagsMultiLikeAnd: tags,
      'orderBy': '-updatedAt',
      'objTypeIn': '1,8',
      'creationModeEqual': 2
    });

    const responseProfile: KontorolDetachedResponseProfile = new KontorolDetachedResponseProfile({
      type: KontorolResponseProfileType.includeFields,
      fields: 'id,name,html5Url,createdAt,updatedAt,width,height,tags'
    });

    const pager = new KontorolFilterPager({pageSize: 500, pageIndex});

    return this._kontorolServerClient.request(new UiConfListAction({filter, pager}).setRequestOptions({
        responseProfile
    }));
  }
}
