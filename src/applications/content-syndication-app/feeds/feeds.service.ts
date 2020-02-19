import {BrowserService} from 'app-shared/kmc-shell/providers/browser.service';
import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';
import {ISubscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import {KontorolFilterPager, PlaylistGetAction} from 'kontorol-ngx-client';
import {KontorolClient, KontorolMultiRequest, KontorolMultiResponse, KontorolRequest} from 'kontorol-ngx-client';
import {KontorolLogger} from '@kontorol-ng/kontorol-logger';
import {
  FiltersStoreBase,
  NumberTypeAdapter,
  StringTypeAdapter,
  TypeAdaptersMapping
} from '@kontorol-ng/mc-shared';
import {KontorolSearchOperator} from 'kontorol-ngx-client';
import {KontorolSearchOperatorType} from 'kontorol-ngx-client';
import {SyndicationFeedListAction} from 'kontorol-ngx-client';
import {KontorolBaseSyndicationFeedFilter} from 'kontorol-ngx-client';
import {KontorolTubeMogulSyndicationFeedOrderBy} from 'kontorol-ngx-client';
import {KontorolBaseSyndicationFeed} from 'kontorol-ngx-client';
import {KontorolGenericSyndicationFeed} from 'kontorol-ngx-client';
import {KontorolGenericXsltSyndicationFeed} from 'kontorol-ngx-client';
import {KontorolBaseSyndicationFeedListResponse} from 'kontorol-ngx-client';
import {KontorolPlaylistFilter} from 'kontorol-ngx-client';
import {KontorolPlaylist} from 'kontorol-ngx-client';
import {PlaylistListAction} from 'kontorol-ngx-client';
import {KontorolPlaylistOrderBy} from 'kontorol-ngx-client';
import {KontorolPlaylistListResponse} from 'kontorol-ngx-client';
import {SyndicationFeedDeleteAction} from 'kontorol-ngx-client';
import {AppLocalization} from '@kontorol-ng/mc-shared';
import {KontorolSyndicationFeedEntryCount} from 'kontorol-ngx-client';
import {SyndicationFeedGetEntryCountAction} from 'kontorol-ngx-client';
import {SyndicationFeedAddAction} from 'kontorol-ngx-client';
import {SyndicationFeedUpdateAction} from 'kontorol-ngx-client';
import { subApplicationsConfig } from 'config/sub-applications';
import { ContentSyndicationMainViewService } from 'app-shared/kmc-shared/kmc-views';
import { globalConfig } from 'config/global';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';

export interface UpdateStatus {
  loading: boolean;
  errorMessage: string;
}

export interface Feeds {
  items: KontorolBaseSyndicationFeed[],
  totalCount: number
}

export enum SortDirection {
  Desc = -1,
  Asc = 1
}

export interface FeedsFilters {
  pageSize: number,
  pageIndex: number,
  sortBy: string,
  sortDirection: number,
}


@Injectable()
export class FeedsService extends FiltersStoreBase<FeedsFilters> implements OnDestroy {

  private _feeds = {
    data: new BehaviorSubject<Feeds>({items: [], totalCount: 0}),
    state: new BehaviorSubject<UpdateStatus>({loading: false, errorMessage: null})
  };

  public readonly feeds =
    {
      data$: this._feeds.data.asObservable(),
      state$: this._feeds.state.asObservable(),
      data: () => {
        return this._feeds.data.getValue().items;
      }
    };

  private _isReady = false;
  private _querySubscription: ISubscription;
  private readonly _pageSizeCacheKey = 'feeds.list.pageSize';


  constructor(private _kontorolClient: KontorolClient,
              contentSyndicationMainView: ContentSyndicationMainViewService,
              private _browserService: BrowserService,
              private _appLocalization: AppLocalization,
              _logger: KontorolLogger) {
    super(_logger);
    if (contentSyndicationMainView.isAvailable()) {
        this._prepare();
    }
  }

  private _prepare(): void {
      this._logger.trace(`handle prepare service action`);
    if (!this._isReady) {
      this._registerToFilterStoreDataChanges();
      this._isReady = true;
    }
  }

  private _registerToFilterStoreDataChanges(): void {
    this.filtersChange$
      .pipe(cancelOnDestroy(this))
      .subscribe(() => {
        this._executeQuery();
      });

  }

  ngOnDestroy() {
    this._feeds.state.complete();
    this._feeds.data.complete();
  }

  public reload(): void {
      this._logger.info(`handle reload request by user`);
    if (this._feeds.state.getValue().loading) {
        this._logger.debug(`loading in progress, skip duplicating request`);
      return;
    }

    if (this._isReady) {
      this._executeQuery();
    } else {
      this._prepare();
    }
  }

  private _executeQuery(): void {

    if (this._querySubscription) {
      this._querySubscription.unsubscribe();
      this._querySubscription = null;
    }

    this._feeds.state.next({loading: true, errorMessage: null});

    this._logger.debug(`handle loading of feeds data`);

    this._querySubscription = this.buildQueryRequest()
      .pipe(cancelOnDestroy(this))
      .subscribe((response: Feeds) => {
              this._logger.trace(`handle successful loading of feeds data`);

          this._querySubscription = null;

          this._feeds.state.next({loading: false, errorMessage: null});

          this._feeds.data.next({
            items: response.items,
            totalCount: response.totalCount
          });
        },
        error => {
          this._querySubscription = null;
          const errorMessage = error && error.message ? error.message : typeof error === 'string' ? error : 'invalid error';
            this._logger.warn(`notify failure during loading of feeds data`, { errorMessage });
          this._feeds.state.next({loading: false, errorMessage});
        });
  }

  private buildQueryRequest(): Observable<Feeds> {
    try {
      // create request items
      const filter: KontorolBaseSyndicationFeedFilter = new KontorolBaseSyndicationFeedFilter({
        orderBy: KontorolTubeMogulSyndicationFeedOrderBy.createdAtDesc.toString()
      });
      let pagination: KontorolFilterPager = null;

      const advancedSearch = filter.advancedSearch = new KontorolSearchOperator({});
      advancedSearch.type = KontorolSearchOperatorType.searchAnd;

      const data: FeedsFilters = this._getFiltersAsReadonly();


      // update the sort by args
      if (data.sortBy) {
        filter.orderBy = `${data.sortDirection === SortDirection.Desc ? '-' : '+'}${data.sortBy}`;
      }

      // update pagination args
      if (data.pageIndex || data.pageSize) {
        pagination = new KontorolFilterPager(
          {
            pageSize: data.pageSize,
            pageIndex: data.pageIndex + 1
          }
        );
      }

      // remove advanced search arg if it is empty
      if (advancedSearch.items && advancedSearch.items.length === 0) {
        delete filter.advancedSearch;
      }

      // build the request
      return this._kontorolClient.request(
        new SyndicationFeedListAction({
          filter,
          pager: pagination
        })
      ).map((response: KontorolBaseSyndicationFeedListResponse) => {
        const feedsArray: KontorolBaseSyndicationFeed[] = [];
        response.objects.forEach(feed => {
          if (feed instanceof KontorolBaseSyndicationFeed) {
            if (feed instanceof KontorolGenericSyndicationFeed && !(feed instanceof KontorolGenericXsltSyndicationFeed)) {
              this._logger.warn(
                `feed was removed from list since it's a generic syndication feed with XSLT type which is not generic.`, { id: feed.id });
              return undefined; // stop processing this iteration if it's a generic syndication feed with XSLT type which is not generic
            } else {
              feedsArray.push(feed);
            }
          }
        });
        return {items: feedsArray, totalCount: response.totalCount};
      })
        .filter(Boolean);
    } catch (err) {
      return Observable.throw(err);
    }

  }

  public getPlaylists(freeText = ''): Observable<KontorolPlaylist[]> {
    const filter = new KontorolPlaylistFilter({orderBy: KontorolPlaylistOrderBy.createdAtDesc.toString(), freeText: freeText || ''});
    const pager = new KontorolFilterPager({pageSize: 500});

    return this._kontorolClient.request(
      new PlaylistListAction({filter, pager})
    )
      .map((response: KontorolPlaylistListResponse) => {
        return response.objects.filter( (playlist: KontorolPlaylist) => !playlist.adminTags || (playlist.adminTags && playlist.adminTags.split(',').indexOf('raptentry') === -1));
      });

  }
  public getPlaylist(id: string): Observable<KontorolPlaylist> {
    return this._kontorolClient.request(
      new PlaylistGetAction({id})
    );
  }

  // bulk delete
  public deleteFeeds(ids: string[]): Observable<void> {
    if (!ids || !ids.length) {
      return Observable.throw(new Error('An error occurred while trying to delete feeds, please review your selection'));
    }

    return Observable.create(observer => {

      const requests: SyndicationFeedDeleteAction[] = [];

      ids.forEach(id => {
        requests.push(new SyndicationFeedDeleteAction({id}));
      });

      this._transmit(requests, true)
          .subscribe(
        result => {
          observer.next({});
          observer.complete();
        },
        error => {
          observer.error(error);
        }
      );
    })
      .do(result => {
        this.reload();
      });
  }

  private _transmit(requests: KontorolRequest<any>[], chunk: boolean): Observable<{}> {
    let maxRequestsPerMultiRequest = requests.length;
    if (chunk) {
      maxRequestsPerMultiRequest = subApplicationsConfig.shared.bulkActionsLimit;
    }

    const multiRequests: Observable<KontorolMultiResponse>[] = [];
    let mr: KontorolMultiRequest = new KontorolMultiRequest();

    let counter = 0;
    for (let i = 0; i < requests.length; i++) {
      if (counter === maxRequestsPerMultiRequest) {
        multiRequests.push(this._kontorolClient.multiRequest(mr));
        mr = new KontorolMultiRequest();
        counter = 0;
      }
      mr.requests.push(requests[i]);
      counter++;
    }
    multiRequests.push(this._kontorolClient.multiRequest(mr));

    return Observable.forkJoin(multiRequests)
      .map(responses => {
        const mergedResponses = [].concat.apply([], responses);
        const hasFailure = !!mergedResponses.find(function (response) {
          return response.error
        });
        if (hasFailure) {
          throw new Error('An error occurred while trying to delete feeds');
        } else {
          return {};
        }
      });
  }


  protected _preFilter(updates: Partial<FeedsFilters>): Partial<FeedsFilters> {
    if (typeof updates.pageIndex === 'undefined') {
      // reset page index to first page everytime filtering the list by any filter that is not page index
      updates.pageIndex = 0;
    }

    if (typeof updates.pageSize !== 'undefined') {
      this._browserService.setInLocalStorage(this._pageSizeCacheKey, updates.pageSize);
    }

    return updates;
  }

  protected _createDefaultFiltersValue(): FeedsFilters {
    const defaultPageSize = this._browserService.getFromLocalStorage(this._pageSizeCacheKey);

    return {
      pageSize: defaultPageSize || globalConfig.client.views.tables.defaultPageSize,
      pageIndex: 0,
      sortBy: 'createdAt',
      sortDirection: SortDirection.Desc
    };
  }

  protected _getTypeAdaptersMapping(): TypeAdaptersMapping<FeedsFilters> {
    return {
      pageSize: new NumberTypeAdapter(),
      pageIndex: new NumberTypeAdapter(),
      sortBy: new StringTypeAdapter(),
      sortDirection: new NumberTypeAdapter()
    };
  }

  public confirmDelete(feeds: KontorolBaseSyndicationFeed[]): Observable<{ confirmed: boolean, error?: Error }> {

    if (!feeds || !feeds.length) {
      return Observable.throw(new Error(this._appLocalization.get('applications.content.syndication.errors.deleteAttemptFailed')))
    }

    return Observable.create(observer => {

        this._logger.info(`confirm delete action`, { feeds: feeds.map(feed => feed.id) });

      const message: string = feeds.length < 5 ?
        (feeds.length === 1 ? this._appLocalization.get('applications.content.syndication.deleteConfirmation.singleFeed',
          {0: feeds[0].name}) :
          this._appLocalization.get('applications.content.syndication.deleteConfirmation.upTo5Feed',
            {0: feeds.map((feed, i) => `${i + 1}: ${feed.name}`).join('\n')})) :
        this._appLocalization.get('applications.content.syndication.deleteConfirmation.moreThan5');

      this._browserService.confirm({
          header: this._appLocalization.get('applications.content.syndication.deleteConfirmation.title'),
          message: this._appLocalization.get(message),
          accept: () => {
            observer.next({failed: false, confirmed: true});
            observer.complete();
          }, reject: () => {
            observer.next({failed: false, confirmed: false});
            observer.complete();
          }
        }
      );
      return () => {
      };
    });
  }

  public getFeedEntryCount(feedId: string): Observable<KontorolSyndicationFeedEntryCount> {
    if (!feedId) {
      return Observable.throw(new Error(this._appLocalization.get('applications.content.syndication.errors.getFeedEntryCount')))
    }

    return this._kontorolClient.request(
      new SyndicationFeedGetEntryCountAction({feedId})
    );
  }

  public update(id: string, syndicationFeed: KontorolBaseSyndicationFeed): Observable<void> {
    return this._kontorolClient.request(
      new SyndicationFeedUpdateAction({id, syndicationFeed})
    )
      .map(() => undefined);
  }

  public create(syndicationFeed: KontorolBaseSyndicationFeed): Observable<KontorolBaseSyndicationFeed> {
    if (syndicationFeed.id) {
      return Observable.throw(new Error('An error occurred while trying to Add Feed. \n Unable to add feed that already exists.'));
    }
    return this._kontorolClient.request(
      new SyndicationFeedAddAction({syndicationFeed})
    );
  }
}
