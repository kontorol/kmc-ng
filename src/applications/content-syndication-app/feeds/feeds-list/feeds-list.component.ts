import {AreaBlockerMessage} from '@kontorol-ng/kontorol-ui';
import {FeedsFilters, FeedsService, SortDirection} from '../feeds.service';
import {BrowserService} from 'app-shared/kmc-shell/providers/browser.service';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {KontorolBaseSyndicationFeed} from 'kontorol-ngx-client';
import {KontorolPlaylist} from 'kontorol-ngx-client';
import {PopupWidgetComponent} from '@kontorol-ng/kontorol-ui';
import { KMCPermissions } from 'app-shared/kmc-shared/kmc-permissions';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';
import { ContentSyndicationMainViewService } from 'app-shared/kmc-shared/kmc-views';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';
import { Unsubscribable } from 'rxjs';

@Component({
  selector: 'kFeedsList',
  templateUrl: './feeds-list.component.html',
  styleUrls: ['./feeds-list.component.scss'],
  providers : [
      FeedsService,
      KontorolLogger.createLogger('FeedsListComponent')
  ]
})

export class FeedsListComponent implements OnInit, OnDestroy {
    private _playlistSearchSubscription: Unsubscribable;

  public _kmcPermissions = KMCPermissions;
  public _isBusy = true;
  public _loadingPlaylists = false;
  public _blockerMessage: AreaBlockerMessage = null;
  public _isReady = false; // prevents from calling prepare function twice
  public _tableIsBusy = false;
  public _tableBlockerMessage: AreaBlockerMessage = null;
  public _selectedFeeds: KontorolBaseSyndicationFeed[] = [];
  public _feedsTotalCount: number = null;
  public _playlists: KontorolPlaylist[] = null;
  public _originalPlaylists: KontorolPlaylist[] = null;
  public _currentEditFeed: KontorolBaseSyndicationFeed = null;
  @ViewChild('feedDetails') feedDetailsPopup: PopupWidgetComponent;

  public _query = {
    pageIndex: 0,
    pageSize: 50,
    sortBy: null,
    sortDirection: null,
  };

  constructor(public _feedsService: FeedsService,
              private router: Router,
              private _browserService: BrowserService,
              private _appLocalization: AppLocalization,
              private _contentSyndicationMainViewService: ContentSyndicationMainViewService,
              private _logger: KontorolLogger) {
  }

  ngOnInit() {
      if (this._contentSyndicationMainViewService.viewEntered()) {
          this._restoreFiltersState();
          this._registerToFilterStoreDataChanges();
          this._feedsService.feeds.data$
              .pipe(cancelOnDestroy(this))
              .subscribe(response => {
                  this._feedsTotalCount = response.totalCount;
              });

          this._prepare();
      }
  }


  public _reload() {
      this._logger.info(`handle reload action by user`);
    this._clearSelection();
    this._feedsService.reload();
  }

  public _clearSelection() {
      this._logger.info(`handle clear selection action by user`);
    this._selectedFeeds = [];
  }

  public _onSortChanged(event): void {
    if (event.field !== this._query.sortBy || event.order !== this._query.sortDirection) {
      this._feedsService.filter({
        sortBy: event.field === 'feedUrl' ? 'createdAt' : event.field,
        sortDirection: event.order === 1 ? SortDirection.Asc : SortDirection.Desc
      });
    }
  }

  public _onPaginationChanged(state: any): void {
    if (state.page !== this._query.pageIndex || state.rows !== this._query.pageSize) {
      this._feedsService.filter({
        pageIndex: state.page,
        pageSize: state.rows
      });
    }
  }

  public _onActionSelected({action, feed}: { action: string, feed: KontorolBaseSyndicationFeed }) {
    switch (action) {
      case 'edit':
          this._logger.info(`handle edit feed action by user`, { feedId: feed.id, type: feed.type });
        this._currentEditFeed = feed;
        this.feedDetailsPopup.open();
        break;
      case 'delete':
        this._deleteFeed(feed);
        break;
      default:
        break;
    }
  }

  private _deleteFeed(feed: KontorolBaseSyndicationFeed): void {
      this._logger.info(`handle delete feed action by user`, { feedId: feed.id, type: feed.type });
    const executeDelete = () => {
      this._blockerMessage = null;
      this._feedsService.deleteFeeds([feed.id])
        .pipe(cancelOnDestroy(this))
        .pipe(tag('block-shell'))
        .subscribe(
          result => {
              this._logger.info(`handle successful action`);
          }, // reload is handled by service
          error => {
              this._logger.warn(`handle failed action, show confirmation`, { errorMessage: error.message });
            this._blockerMessage = new AreaBlockerMessage({
              title: this._appLocalization.get('applications.content.syndication.errors.deleteError.header'),
              message: this._appLocalization.get('applications.content.syndication.errors.deleteError.message'),
              buttons: [
                {
                  label: this._appLocalization.get('app.common.retry'),
                  action: () => {
                      this._logger.info(`user confirmed, retry action`);
                    this._blockerMessage = null;
                    executeDelete();
                  }
                }, {
                  label: this._appLocalization.get('app.common.cancel'),
                  action: () => {
                      this._logger.info(`user didn't confirm, abort action`);
                    this._blockerMessage = null;
                  }
                }
              ]
            });
          }
        );
    };

    this._feedsService.confirmDelete([feed])
      .pipe(cancelOnDestroy(this))
      .subscribe(result => {
        if (result.confirmed) {
          executeDelete();
        }
      }, error => {
        this._blockerMessage = new AreaBlockerMessage({
          message: error.message,
          buttons: [
            {
              label: this._appLocalization.get('app.common.ok'),
              action: () => {
                this._blockerMessage = null;
              }
            }
          ]
        });
      });
  }

  public _deleteSelectedFeeds(): void {
      this._logger.info(`handle delete selected feeds action by user`);
    const executeDelete = () => {
      this._blockerMessage = null;
      this._feedsService.deleteFeeds(this._selectedFeeds.map(feed => feed.id))
        .pipe(cancelOnDestroy(this))
        .pipe(tag('block-shell'))
        .subscribe(
          result => {
              this._logger.info(`handle successful action`);
            this._clearSelection();
          }, // reload is handled by service
          error => {
              this._logger.warn(`handle failed action, show confirmation`, { errorMessage: error.message });
            this._blockerMessage = new AreaBlockerMessage({
              title: this._appLocalization.get('applications.content.syndication.errors.deleteErrorMultiple.header'),
              message: this._appLocalization.get('applications.content.syndication.errors.deleteErrorMultiple.message'),
              buttons: [
                {
                  label: this._appLocalization.get('app.common.retry'),
                  action: () => {
                      this._logger.info(`user confirmed, retry action`);
                    this._blockerMessage = null;
                    executeDelete();
                  }
                }, {
                  label: this._appLocalization.get('app.common.cancel'),
                  action: () => {
                      this._logger.info(`user didn't confirm, abort action`);
                    this._blockerMessage = null;
                  }
                }
              ]
            });
          }
        );
    };

    this._feedsService.confirmDelete(this._selectedFeeds)
      .pipe(cancelOnDestroy(this))
      .subscribe(result => {
        if (result.confirmed) {
          executeDelete();
        }
      }, error => {
        this._blockerMessage = new AreaBlockerMessage({
          message: error.message,
          buttons: [
            {
              label: this._appLocalization.get('app.common.ok'),
              action: () => {
                this._blockerMessage = null;
              }
            }
          ]
        });
      });
  }

  private _prepare(): void {
    if (this._isReady) {
      return undefined;
    }

    this._isBusy = true;
    this._blockerMessage = null;

    this._logger.info(`prepare component, load playlists data`);

    // The add/edit floater needs the playlists, therefore we will load
    // first the list of playlists and afterwards the feed list
    // (while blocking the list to prevent the user from adding/editing feed without playlists provided)
    this._feedsService.getPlaylists()
      .pipe(cancelOnDestroy(this))
      .subscribe(response => {
          this._logger.info(`handle successful data loading`);
          this._playlists = response;
          this._originalPlaylists = response;
          this._feedsService.reload();
          this._registerToDataChanges();
          this._isBusy = false;
          this._isReady = true;
        },
        error => {
          this._logger.info(`handle failed data loading, show alert`, { errorMessage: error.message });
          this._isBusy = false;
          this._blockerMessage = new AreaBlockerMessage({
            message: this._appLocalization.get('applications.content.syndication.errors.loadFailed'),
            buttons: [
              {
                label: this._appLocalization.get('app.common.retry'),
                action: () => {
                    this._logger.info(`user selected retry, retry action`);
                  this._blockerMessage = null;
                  this._prepare();
                }
              }
            ]
          });
        });
  }

  private _registerToDataChanges(): void {
      this._logger.info(`register to data changes`);
    this._feedsService.feeds.state$
      .pipe(cancelOnDestroy(this))
      .subscribe(
        result => {

          this._tableIsBusy = result.loading;

          this._logger.info(`handle data changes event`, { result });
          if (result.errorMessage) {
              this._logger.info(`handle failed loading data, show alert`, { errorMessage: result.errorMessage });
            this._tableBlockerMessage = new AreaBlockerMessage({
              message: result.errorMessage || 'Error loading feeds',
              buttons: [{
                label: this._appLocalization.get('app.common.retry'),
                action: () => {
                    this._logger.info(`user selected retry, retry loading data`);
                  this._tableBlockerMessage = null;
                  this._feedsService.reload();
                }
              }
              ]
            });
          } else {
            this._tableBlockerMessage = null;
          }
        });
  }

  private _restoreFiltersState(): void {
    this._updateComponentState(this._feedsService.cloneFilters(
      [
        'pageSize',
        'pageIndex',
        'sortBy',
        'sortDirection',
      ]
    ));
  }

  private _updateComponentState(updates: Partial<FeedsFilters>): void {
    if (typeof updates.pageSize !== 'undefined') {
      this._query.pageSize = updates.pageSize;
    }

    if (typeof updates.pageIndex !== 'undefined') {
      this._query.pageIndex = updates.pageIndex;
    }

    if (typeof updates.sortBy !== 'undefined') {
      this._query.sortBy = updates.sortBy;
    }

    if (typeof updates.sortDirection !== 'undefined') {
      this._query.sortDirection = updates.sortDirection;
    }
  }

  private _registerToFilterStoreDataChanges(): void {
    this._feedsService.filtersChange$
      .pipe(cancelOnDestroy(this))
      .subscribe(({changes}) => {
        this._updateComponentState(changes);
        this._clearSelection();
        this._browserService.scrollToTop();
      });
  }

  ngOnDestroy() {
  }

  public _addNewFeed() {
      this._logger.info(`handle add new feed action by user`);
    this._currentEditFeed = null;
    this.feedDetailsPopup.open();
  }

    public _onSearchPlaylists(freeText: string): void {
        this._loadingPlaylists = true;
        if (this._playlistSearchSubscription) {
            this._playlistSearchSubscription.unsubscribe();
            this._playlistSearchSubscription = null;
        }

        this._playlistSearchSubscription = this._feedsService.getPlaylists(freeText)
            .pipe(cancelOnDestroy(this))
            .subscribe(response => {
                    this._playlists = response;
                    this._loadingPlaylists = false;
                },
                error => {
                    this._loadingPlaylists = false;
                    // TODO handle errors
                });
    }

    public _resetPlaylists(): void {
        this._playlists = [...this._originalPlaylists];
    }
}
