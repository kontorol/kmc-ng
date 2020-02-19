import {
    AfterViewInit,
    ChangeDetectorRef,
    Component, ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
    ViewChild
} from '@angular/core';
import { Menu } from 'primeng/menu';
import { AreaBlockerMessage } from '@kontorol-ng/kontorol-ui';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { SchemasStore } from '../schemas-store/schemas-store.service';
import { SettingsMetadataProfile } from '../schemas-store/settings-metadata-profile.interface';
import { KMCPermissions, KMCPermissionsService } from 'app-shared/kmc-shared/kmc-permissions';
import { ColumnsResizeManagerService, ResizableColumnsTableName } from 'app-shared/kmc-shared/columns-resize-manager';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'kSchemasTable',
  templateUrl: './schemas-table.component.html',
  styleUrls: ['./schemas-table.component.scss'],
    providers: [
        ColumnsResizeManagerService,
        { provide: ResizableColumnsTableName, useValue: 'customdata-table' }
    ]
})
export class SchemasTableComponent implements AfterViewInit, OnDestroy {
  @Input() set schemas(data: SettingsMetadataProfile[]) {
    if (!this._deferredLoading) {
      this._schemas = [];
      this._cdRef.detectChanges();
      this._schemas = data;
      this._cdRef.detectChanges();
    } else {
      this._deferredSchemas = data;
    }
  }

  @Input() selectedSchemas: SettingsMetadataProfile[] = [];

  @Output() selectedSchemasChange = new EventEmitter<any>();
  @Output() actionSelected = new EventEmitter<any>();

  @ViewChild('actionsmenu', { static: true }) private actionsMenu: Menu;

  private _deferredSchemas: SettingsMetadataProfile[];

  public _deferredLoading = true;
  public _emptyMessage = this._appLocalization.get('applications.content.table.noResults');
  public _blockerMessage: AreaBlockerMessage = null;
  public _items: MenuItem[];
  public _schemas: SettingsMetadataProfile[] = [];

  public rowTrackBy: Function = (index: number, item: any) => item.id;

  constructor(public _columnsResizeManager: ColumnsResizeManagerService,
              private _appLocalization: AppLocalization,
              private _permissionsService: KMCPermissionsService,
              public _schemasStore: SchemasStore,
              private _cdRef: ChangeDetectorRef,
              private _el: ElementRef<HTMLElement>) {
  }

  ngAfterViewInit() {
    if (this._deferredLoading) {
      // use timeout to allow the DOM to render before setting the data to the datagrid.
      // This prevents the screen from hanging during datagrid rendering of the data.
      setTimeout(() => {
        this._deferredLoading = false;
        this._schemas = this._deferredSchemas;
        this._deferredSchemas = null;
      }, 0);
    }

      this._columnsResizeManager.updateColumns(this._el.nativeElement);
  }

  ngOnDestroy() {
    this.actionsMenu.hide();
  }

  private _buildMenu(schema: SettingsMetadataProfile): void {
    const nonDisableSchemaActions = [
      {
        id: 'edit',
        label: this._appLocalization.get('applications.settings.metadata.table.actions.edit'),
        command: () => this._onActionSelected('edit', schema)
      },
      {
        id: 'download',
        label: this._appLocalization.get('applications.settings.metadata.table.actions.download'),
        command: () => this._onActionSelected('download', schema)
      },
    ];

    this._items = [
      {
        id: 'delete',
        label: this._appLocalization.get('applications.settings.metadata.table.actions.delete'),
        styleClass: 'kDanger',
        command: () => this._onActionSelected('delete', schema)
      }
    ];

    if (!schema.profileDisabled) {
      this._items = [...nonDisableSchemaActions, ...this._items];
    }

    this._permissionsService.filterList(<{ id: string }[]>this._items, { 'delete': KMCPermissions.CUSTOM_DATA_PROFILE_DELETE });
  }

  public _openActionsMenu(event: any, schema: SettingsMetadataProfile): void {
    if (this.actionsMenu) {
      this._buildMenu(schema);
      this.actionsMenu.toggle(event);
    }
  }
  public _onSelectionChange(event): void {
    this.selectedSchemasChange.emit(event);
  }

  public _onActionSelected(action: string, schema: SettingsMetadataProfile): void {
    this.actionSelected.emit({ action, schema });
  }

  public _schemaTableRowStyle(rowData: SettingsMetadataProfile): string {
    return rowData.profileDisabled ? 'kProfileDisabled' : '';
  }
}

