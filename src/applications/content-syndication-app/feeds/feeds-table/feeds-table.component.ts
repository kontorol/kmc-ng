import {
    AfterViewInit,
    ChangeDetectorRef,
    Component, ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { Menu } from 'primeng/menu';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import {KontorolBaseSyndicationFeed} from 'kontorol-ngx-client';
import {KontorolPlaylist} from 'kontorol-ngx-client';
import { globalConfig } from 'config/global';
import { KMCPermissionsService, KMCPermissions } from 'app-shared/kmc-shared/kmc-permissions';
import { ColumnsResizeManagerService, ResizableColumnsTableName } from 'app-shared/kmc-shared/columns-resize-manager';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'kFeedsTable',
  templateUrl: './feeds-table.component.html',
  styleUrls: ['./feeds-table.component.scss'],
    providers: [
        ColumnsResizeManagerService,
        { provide: ResizableColumnsTableName, useValue: 'syndication-table' }
    ]
})
export class FeedsTableComponent implements AfterViewInit, OnInit, OnDestroy {

  public _feeds: KontorolBaseSyndicationFeed[] = [];
  private _deferredFeeds: any[];
  public _deferredLoading = true;
  public _idToPlaylistMap: Map<string, KontorolPlaylist> = null; // map between KontorolPlaylist id to KontorolPlaylist.name object
  public _copyToClipboardTooltips: { success: string, failure: string, idle: string, notSupported: string } = null;

  @Input()
  set feeds(data: any[]) {
    if (!this._deferredLoading) {
      // the table uses 'rowTrackBy' to track changes by id. To be able to reflect changes of feeds
      // (ie when returning from feed page) - we should force detect changes on an empty list
      this._feeds = [];
      this._cdRef.detectChanges();
      this._feeds = data;
      this._cdRef.detectChanges();
    } else {
      this._deferredFeeds = data;
    }
  }

  @Input()
  set playlists(data: KontorolPlaylist[]) {
    if (data && data.length) {
      this._idToPlaylistMap = new Map<string, KontorolPlaylist>();
      data.forEach(playlist => {
        this._idToPlaylistMap.set(playlist.id, playlist);
      });
    }
  }

  @Input() sortField: string = null;
  @Input() sortOrder: number = null;
  @Input() selectedFeeds: KontorolBaseSyndicationFeed[] = [];

  @Output()
  sortChanged = new EventEmitter<{ field: string, order: number}>();
  @Output()
  actionSelected = new EventEmitter<{ action: string, feed: KontorolBaseSyndicationFeed }>();
  @Output()
  selectedFeedsChange = new EventEmitter<any>();

  @ViewChild('actionsmenu', { static: true }) private _actionsMenu: Menu;

  public _emptyMessage = '';

  public _items: MenuItem[];
  public _defaultSortOrder = globalConfig.client.views.tables.defaultSortOrder;

  constructor(public _columnsResizeManager: ColumnsResizeManagerService,
              private _appLocalization: AppLocalization,
              private _permissionsService: KMCPermissionsService,
              private _el: ElementRef<HTMLElement>,
              private _cdRef: ChangeDetectorRef) {
    this._fillCopyToClipboardTooltips();
  }

  ngOnInit() {
    this._emptyMessage = this._appLocalization.get('applications.content.table.noResults');
  }

  ngOnDestroy() {
  }

  ngAfterViewInit() {
    if (this._deferredLoading) {
      // use timeout to allow the DOM to render before setting the data to the datagrid.
      // This prevents the screen from hanging during datagrid rendering of the data.
      setTimeout(() => {
        this._deferredLoading = false;
        this._feeds = this._deferredFeeds;
        this._deferredFeeds = null;
      }, 0);
    }

      this._columnsResizeManager.updateColumns(this._el.nativeElement);
  }

  public rowTrackBy: Function = (index: number, item: any) => item.id;

  public _openActionsMenu(event: any, feed: KontorolBaseSyndicationFeed) {
    if (this._actionsMenu) {
      this._buildMenu(feed);
      this._actionsMenu.toggle(event);
    }
  }
  public _editFeed(feed: KontorolBaseSyndicationFeed) {
    this._onActionSelected('edit', feed);
  }

  public _onSelectionChange(event) {
    this.selectedFeedsChange.emit(event);
  }

  public _onSortChanged(event) {
    if (event.field && event.order) {
      // primeng workaround: must check that field and order was provided to prevent reset of sort value
      this.sortChanged.emit({field: event.field, order: event.order});
    }
  }

  private _onActionSelected(action: string, feed: KontorolBaseSyndicationFeed) {
    this.actionSelected.emit({'action': action, 'feed': feed});
  }

  private _buildMenu(feed: KontorolBaseSyndicationFeed): void {
    this._items = [
      {
        id: 'edit',
        label: this._appLocalization.get('applications.content.syndication.table.actions.edit'),
        command: () => this._onActionSelected('edit', feed)
      },
      {
        id: 'delete',
        label: this._appLocalization.get('applications.content.syndication.table.actions.delete'),
        styleClass: 'kDanger',
        command: () => this._onActionSelected('delete', feed)
      },
    ];

    this._permissionsService.filterList(<{ id: string }[]>this._items, { 'delete': KMCPermissions.SYNDICATION_DELETE });
  }

  private _fillCopyToClipboardTooltips(): void {
    this._copyToClipboardTooltips = {
      success: this._appLocalization.get('applications.content.syndication.table.copyToClipboardTooltip.success'),
      failure: this._appLocalization.get('applications.content.syndication.table.copyToClipboardTooltip.failure'),
      idle: this._appLocalization.get('applications.content.syndication.table.copyToClipboardTooltip.idle'),
      notSupported: this._appLocalization.get('applications.content.syndication.table.copyToClipboardTooltip.notSupported')
    };
  }

}

