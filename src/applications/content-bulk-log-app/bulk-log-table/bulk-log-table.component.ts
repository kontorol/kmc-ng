import {
    AfterViewInit,
    ChangeDetectorRef,
    Component, ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { Menu, MenuItem } from 'primeng/primeng';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { KontorolBulkUpload } from 'kontorol-ngx-client';
import { globalConfig } from 'config/global';
import { KMCPermissions, KMCPermissionsService } from 'app-shared/kmc-shared/kmc-permissions';
import { ColumnsResizeManagerService, ResizableColumnsTableName } from 'app-shared/kmc-shared/columns-resize-manager';

@Component({
  selector: 'kBulkLogTable',
  templateUrl: './bulk-log-table.component.html',
  styleUrls: ['./bulk-log-table.component.scss'],
    providers: [
        ColumnsResizeManagerService,
        { provide: ResizableColumnsTableName, useValue: 'bulkuploads-table' }
    ]
})
export class BulkLogTableComponent implements AfterViewInit, OnInit, OnDestroy {
  @Input()
  set list(data: any[]) {
    if (!this._deferredLoading) {
      // the table uses 'rowTrackBy' to track changes by id. To be able to reflect changes of entries
      // (ie when returning from bulk log page) - we should force detect changes on an empty list
      this._bulkLog = [];
      this._cdRef.detectChanges();
      this._bulkLog = data;
      this._cdRef.detectChanges();
    } else {
      this._deferredEntries = data;
    }
  }

  @Input() filter: any = {};
  @Input() selectedBulkLogItems: any[] = [];

  @Output()
  actionSelected = new EventEmitter<{ action: string, bulkLogItem: KontorolBulkUpload }>();
  @Output()
  selectedBulkLogItemsChange = new EventEmitter<any>();

  @ViewChild('actionsmenu') private actionsMenu: Menu;

  private _deferredEntries: any[];

  public _bulkLog: any[] = [];
  public _deferredLoading = true;
  public _emptyMessage = '';
  public _items: MenuItem[];
  public _defaultSortOrder = globalConfig.client.views.tables.defaultSortOrder;
  public _actionsAllowed = true;

  public rowTrackBy: Function = (index: number, item: any) => item.id;

  constructor(public _columnsResizeManager: ColumnsResizeManagerService,
              private _appLocalization: AppLocalization,
              private _permissionsService: KMCPermissionsService,
              private _el: ElementRef<HTMLElement>,
              private _cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this._emptyMessage = this._appLocalization.get('applications.content.table.noResults');
    this._actionsAllowed = this._permissionsService.hasAnyPermissions([
      KMCPermissions.BULK_LOG_DELETE,
      KMCPermissions.BULK_LOG_DOWNLOAD
    ]);
  }

  ngAfterViewInit() {
    if (this._deferredLoading) {
      // use timeout to allow the DOM to render before setting the data to the datagrid.
      // This prevents the screen from hanging during datagrid rendering of the data.
      setTimeout(() => {
        this._deferredLoading = false;
        this._bulkLog = this._deferredEntries;
        this._deferredEntries = null;
      }, 0);
    }

    this._columnsResizeManager.updateColumns(this._el.nativeElement);
  }

  ngOnDestroy() {
    this.actionsMenu.hide();
  }

  private _buildMenu(bulkLogItem: KontorolBulkUpload): void {
    this._items = [
      {
        id: 'downloadLog',
        label: this._appLocalization.get('applications.content.bulkUpload.table.actions.downloadLog'),
        command: () => this._onActionSelected('downloadLog', bulkLogItem)
      },
      {
        id: 'downloadFile',
        label: this._appLocalization.get('applications.content.bulkUpload.table.actions.downloadFile'),
        command: () => this._onActionSelected('downloadFile', bulkLogItem)
      },
      {
        id: 'delete',
        label: this._appLocalization.get('applications.content.bulkUpload.table.actions.delete'),
        styleClass: 'kDanger',
        command: () => this._onActionSelected('delete', bulkLogItem)
      }
    ];

    this._permissionsService.filterList(
      <{ id: string }[]>this._items,
      {
        'delete': KMCPermissions.BULK_LOG_DELETE,
        'downloadLog': KMCPermissions.BULK_LOG_DOWNLOAD,
        'downloadFile': KMCPermissions.BULK_LOG_DOWNLOAD,
      }
    );
  }

  private _onActionSelected(action: string, bulkLogItem: KontorolBulkUpload): void {
    this.actionSelected.emit({ action, bulkLogItem });
  }

  public _openActionsMenu(event: any, bulkLogItem: KontorolBulkUpload): void {
    if (this.actionsMenu) {
      this._buildMenu(bulkLogItem);
      this.actionsMenu.toggle(event);
    }
  }

  public _onSelectionChange(event): void {
    this.selectedBulkLogItemsChange.emit(event);
  }
}

