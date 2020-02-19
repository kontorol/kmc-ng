import { OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';
import { ISubscription } from 'rxjs/Subscription';
import { KontorolClient, KontorolMultiRequest, KontorolRequest } from 'kontorol-ngx-client';
import { KontorolFilterPager } from 'kontorol-ngx-client';
import { BrowserService } from 'shared/kmc-shell/providers/browser.service';
import { KontorolConversionProfileType } from 'kontorol-ngx-client';
import { KontorolConversionProfileFilter } from 'kontorol-ngx-client';
import { KontorolConversionProfileOrderBy } from 'kontorol-ngx-client';
import { ConversionProfileListAction } from 'kontorol-ngx-client';
import { ConversionProfileAssetParamsListAction } from 'kontorol-ngx-client';
import { KontorolConversionProfileAssetParamsFilter } from 'kontorol-ngx-client';
import { KontorolConversionProfileAssetParams } from 'kontorol-ngx-client';
import { KontorolConversionProfile } from 'kontorol-ngx-client';
import { ConversionProfileSetAsDefaultAction } from 'kontorol-ngx-client';
import { subApplicationsConfig } from 'config/sub-applications';
import { ConversionProfileDeleteAction } from 'kontorol-ngx-client';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';
import { FiltersStoreBase, TypeAdaptersMapping } from '@kontorol-ng/mc-shared';
import { NumberTypeAdapter } from '@kontorol-ng/mc-shared';
import { SettingsTranscodingMainViewService } from 'app-shared/kmc-shared/kmc-views';
import { globalConfig } from 'config/global';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';

export interface ExtendedKontorolConversionProfileAssetParams extends KontorolConversionProfileAssetParams {
  updated?: boolean;
}

export interface KontorolConversionProfileWithAsset extends KontorolConversionProfile {
  assets?: ExtendedKontorolConversionProfileAssetParams[];
  flavors?: number; // number of flavors in flavorParamsIds
}

export interface TranscodingProfilesFilters {
  pageSize: number;
  pageIndex: number;
}

export abstract class BaseTranscodingProfilesStore extends FiltersStoreBase<TranscodingProfilesFilters> implements OnDestroy {
  private _profiles = {
    data: new BehaviorSubject<{ items: KontorolConversionProfileWithAsset[], totalCount: number }>({ items: [], totalCount: 0 }),
    state: new BehaviorSubject<{ loading: boolean, errorMessage: string }>({ loading: false, errorMessage: null })
  };
  private _isReady = false;
  private _querySubscription: ISubscription;

  protected abstract localStoragePageSizeKey: string;
  protected abstract transcodingProfilesListType: KontorolConversionProfileType;

  public readonly profiles = {
    data$: this._profiles.data.asObservable(),
    state$: this._profiles.state.asObservable(),
    data: () => this._profiles.data.value
  };

  protected constructor(private _kontorolServerClient: KontorolClient,
                        private _browserService: BrowserService,
                        settingsTranscodingMainView: SettingsTranscodingMainViewService,
                        _logger: KontorolLogger) {
    super(_logger);
    if (settingsTranscodingMainView.isAvailable()) {
        setTimeout(() => {
            this._prepare();
        });
    }
  }

  ngOnDestroy() {
    this._profiles.data.complete();
    this._profiles.state.complete();
  }

  private _registerToFilterStoreDataChanges(): void {
    this.filtersChange$
      .pipe(cancelOnDestroy(this))
      .subscribe(() => {
        this._executeQuery();
      });
  }

  private _executeQuery(): void {
    if (this._querySubscription) {
      this._querySubscription.unsubscribe();
      this._querySubscription = null;
    }

    const pageSize = this.cloneFilter('pageSize', null);
    if (pageSize) {
      this._browserService.setInLocalStorage(this.localStoragePageSizeKey, pageSize);
    }

    this._logger.info(`loading data from the server`);
    this._profiles.state.next({ loading: true, errorMessage: null });
    this._querySubscription = this._buildQueryRequest()
      .pipe(cancelOnDestroy(this))
      .subscribe(
        response => {
          this._logger.info(`handle success loading data from the server`);
          this._querySubscription = null;

          this._profiles.state.next({ loading: false, errorMessage: null });

          this._profiles.data.next({
            items: response.objects,
            totalCount: response.totalCount
          });
        },
        error => {
          this._querySubscription = null;
          const errorMessage = error && error.message ? error.message : typeof error === 'string' ? error : 'invalid error';
          this._logger.warn(`handle failed loading data from the server`, { errorMessage });
          this._profiles.state.next({ loading: false, errorMessage });
        });
  }

  private _buildQueryRequest(): Observable<{ objects: KontorolConversionProfileWithAsset[], totalCount: number }> {
    try {
      // create request items
      const filter = new KontorolConversionProfileFilter({
        orderBy: KontorolConversionProfileOrderBy.createdAtDesc.toString(),
        typeEqual: this.transcodingProfilesListType
      });
      let pager: KontorolFilterPager = null;

      const data: TranscodingProfilesFilters = this._getFiltersAsReadonly();

      // update pagination args
      if (data.pageIndex || data.pageSize) {
        pager = new KontorolFilterPager(
          {
            pageSize: data.pageSize,
            pageIndex: data.pageIndex + 1
          }
        );
      }

      const conversionProfileAction = new ConversionProfileListAction({ filter, pager });
      const conversionProfileAssetParamsAction = new ConversionProfileAssetParamsListAction({
        filter: new KontorolConversionProfileAssetParamsFilter({ conversionProfileIdFilter: filter }),
        pager: new KontorolFilterPager({ pageSize: 1000 })
      });

      // build the request
      return this._kontorolServerClient
        .multiRequest(new KontorolMultiRequest(conversionProfileAction, conversionProfileAssetParamsAction))
        .map(([profilesResponse, assetsResponse]) => {
          if (profilesResponse.error) {
            throw Error(profilesResponse.error.message);
          }

          if (assetsResponse.error) {
            throw Error(assetsResponse.error.message);
          }

          const profiles = profilesResponse.result.objects;
          const assets = assetsResponse.result.objects;
          const totalCount = profilesResponse.result.totalCount;

          const objects = profiles.map(profile => {
            const relevantAssets = assets.filter(({ conversionProfileId }) => conversionProfileId === profile.id);
            const flavorsCount = profile.flavorParamsIds ? (profile.flavorParamsIds || '').split(',').length : 0;
            return Object.assign(profile, { assets: relevantAssets, flavors: flavorsCount });
          });

          // put default profile on top of the table if there's default profile in the response
          const defaultProfileIndex = objects.findIndex(profile => profile.isDefault);
          if (defaultProfileIndex !== -1) {
            const defaultProfile = objects.splice(defaultProfileIndex, 1);
            objects.unshift(...defaultProfile);
          }

          return { objects, totalCount };
        });
    } catch (err) {
      return Observable.throw(err);
    }
  }

  private _transmitChunkRequest(requests: KontorolRequest<any>[]): Observable<void> {
    const maxRequestsPerMultiRequest = subApplicationsConfig.shared.bulkActionsLimit || requests.length;

    // split request on chunks => [[], [], ...], each of inner arrays has length of maxRequestsPerMultiRequest
    const splitRequests = [];
    let start = 0;
    while (start < requests.length) {
      const end = start + maxRequestsPerMultiRequest;
      splitRequests.push(requests.slice(start, end));
      start = end;
    }
    const multiRequests = splitRequests
      .map(reqChunk => this._kontorolServerClient.multiRequest(reqChunk));

    return Observable.forkJoin(multiRequests)
      .map(responses => {
        const errorMessage = [].concat.apply([], responses)
          .filter(response => !!response.error)
          .reduce((acc, { error }) => `${acc}\n${error.message}`, '')
          .trim();

        if (!!errorMessage) {
          throw new Error(errorMessage);
        }
      });
  }

  private _prepare(): void {
    // NOTICE: do not execute here any logic that should run only once.
    // this function will re-run if preparation failed. execute your logic
    // only after the line where we set isReady to true

    if (!this._isReady) {
      this._logger.info(`initiate service`);
      this._isReady = true;

      this._registerToFilterStoreDataChanges();
      this._executeQuery();
    }
  }

  protected _preFilter(updates: Partial<TranscodingProfilesFilters>): Partial<TranscodingProfilesFilters> {
    if (typeof updates.pageIndex === 'undefined') {
      // reset page index to first page everytime filtering the list by any filter that is not page index
      updates.pageIndex = 0;
    }

    return updates;
  }

  protected _createDefaultFiltersValue(): TranscodingProfilesFilters {
    const pageSize = this._browserService.getFromLocalStorage(this.localStoragePageSizeKey) || globalConfig.client.views.tables.defaultPageSize;
    return {
      pageSize: pageSize,
      pageIndex: 0,
    };
  }

  protected _getTypeAdaptersMapping(): TypeAdaptersMapping<TranscodingProfilesFilters> {
    return {
      pageSize: new NumberTypeAdapter(),
      pageIndex: new NumberTypeAdapter(),
    };
  }

  public reload(): void {
    this._logger.info(`reload profiles list`);
    if (this._profiles.state.getValue().loading) {
      this._logger.info(`reloading already in progress skip duplicating request`);
      return;
    }

    if (this._isReady) {
      this._executeQuery();
    } else {
      this._prepare();
    }
  }

  public setAsDefault(profile: KontorolConversionProfileWithAsset): Observable<void> {
    return this._kontorolServerClient
      .request(new ConversionProfileSetAsDefaultAction({ id: profile.id }))
      .map(() => {
      });
  }

  public deleteProfiles(profiles: KontorolConversionProfileWithAsset[]): Observable<void> {
    return this._transmitChunkRequest(
      profiles.map(profile => new ConversionProfileDeleteAction({ id: profile.id }))
    );
  }
}

