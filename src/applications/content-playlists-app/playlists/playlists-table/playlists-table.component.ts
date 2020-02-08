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
import { Menu, MenuItem } from 'primeng/primeng';
import { KontorolPlaylist } from 'kontorol-ngx-client';
import { KontorolEntryStatus } from 'kontorol-ngx-client';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { globalConfig } from 'config/global';
import { KMCPermissionsService } from 'app-shared/kmc-shared/kmc-permissions';
import { KMCPermissions } from 'app-shared/kmc-shared/kmc-permissions';
import { ColumnsResizeManagerService, ResizableColumnsTableName } from 'app-shared/kmc-shared/columns-resize-manager';

@Component({
  selector: 'kPlaylistsTable',
  templateUrl: './playlists-table.component.html',
  styleUrls: ['./playlists-table.component.scss'],
    providers: [
        ColumnsResizeManagerService,
        { provide: ResizableColumnsTableName, useValue: 'playlists-table' }
    ]
})
export class PlaylistsTableComponent implements AfterViewInit, OnInit, OnDestroy {
  @Input() set playlists(data: KontorolPlaylist[]) {
    if (!this._deferredLoading) {
      this._playlists = [];
      this._cdRef.detectChanges();
      this._playlists = data;
      this._cdRef.detectChanges();
    } else {
      this._deferredPlaylists = data;
    }
  }

  @Input() sortField: string = null;
  @Input() sortOrder: number = null;
  @Input() selectedPlaylists: any[] = [];

  @Output() sortChanged = new EventEmitter<{ field: string, order: number }>();
  @Output() selectedPlaylistsChange = new EventEmitter<any>();
  @Output() actionSelected = new EventEmitter<any>();

  @ViewChild('actionsmenu') private actionsMenu: Menu;

  private _deferredPlaylists: KontorolPlaylist[];

  public _deferredLoading = true;
  public _emptyMessage = '';
  public _playlists: KontorolPlaylist[] = [];
  public _items: MenuItem[];
  public _defaultSortOrder = globalConfig.client.views.tables.defaultSortOrder;

  public rowTrackBy: Function = (index: number, item: any) => item.id;

  constructor(public _columnsResizeManager: ColumnsResizeManagerService,
              private _appLocalization: AppLocalization,
              private _permissionsService: KMCPermissionsService,
              private _cdRef: ChangeDetectorRef,
              private _el: ElementRef<HTMLElement>) {
  }

  ngOnInit() {
    this._emptyMessage = this._appLocalization.get('applications.content.table.noResults');
  }

  ngAfterViewInit() {
    if (this._deferredLoading) {
      // use timeout to allow the DOM to render before setting the data to the datagrid.
      // This prevents the screen from hanging during datagrid rendering of the data.
      setTimeout(() => {
        this._deferredLoading = false;
        this._playlists = this._deferredPlaylists;
        this._deferredPlaylists = null;
      }, 0);
    }

      this._columnsResizeManager.updateColumns(this._el.nativeElement);
  }

  openActionsMenu(event: any, playlist: KontorolPlaylist) {
    if (this.actionsMenu) {
      this.buildMenu(playlist);
      this.actionsMenu.toggle(event);
    }
  }

  ngOnDestroy() {
    this.actionsMenu.hide();
  }

  buildMenu(playlist: KontorolPlaylist): void {
    this._items = [
      {
        id: 'previewAndEmbed',
        label: this._appLocalization.get('applications.content.table.previewAndEmbed'),
        command: () => this.onActionSelected('preview', playlist)
      },
      {
        id: 'view',
        label: this._appLocalization.get('applications.content.table.view'),
        command: () => this.onActionSelected('view', playlist)
      },
      {
        id: 'delete',
        label: this._appLocalization.get('applications.content.table.delete'),
        styleClass: 'kDanger',
        command: () => this.onActionSelected('delete', playlist)
      }
    ];

    if (playlist.status !== KontorolEntryStatus.ready) {
      this._items.shift();
    }else
    {
      const hasEmbedPermission = this._permissionsService.hasPermission(KMCPermissions.PLAYLIST_EMBED_CODE);
      if (!hasEmbedPermission) {
        this._items[0].label = this._appLocalization.get('applications.content.table.previewInPlayer');
      }
    }

    this._permissionsService.filterList(
      <{id: string}[]>this._items,
      {
        'delete': KMCPermissions.PLAYLIST_DELETE
      }
    );
  }


  onSelectionChange(event) {
    this.selectedPlaylistsChange.emit(event);
  }

  onActionSelected(action: string, playlist: KontorolPlaylist) {
    this.actionSelected.emit({ 'action': action, 'playlist': playlist });
  }

  onSortChanged(event) {
    if (event.field && event.order) {
      // primeng workaround: must check that field and order was provided to prevent reset of sort value
      this.sortChanged.emit({ field: event.field, order: event.order });
    }
  }
}

