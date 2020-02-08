import {
    AfterViewInit,
    ChangeDetectorRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { Menu, MenuItem } from 'primeng/primeng';
import { KontorolConversionProfileWithAsset } from '../transcoding-profiles-store/base-transcoding-profiles-store.service';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { KMCPermissions, KMCPermissionsService } from 'app-shared/kmc-shared/kmc-permissions';
import { KontorolConversionProfileType } from 'kontorol-ngx-client';

export abstract class TranscodingProfilesTableComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() set profiles(data: KontorolConversionProfileWithAsset[]) {
    if (!this._deferredLoading) {
      this._profiles = [];
      this._cdRef.detectChanges();
      this._profiles = data;
      this._cdRef.detectChanges();
    } else {
      this._deferredProfiles = data;
    }
  }

    @Input() singleTableMode: boolean;
    @Input() profileType: KontorolConversionProfileType;
  @Input() selectedProfiles: KontorolConversionProfileWithAsset[] = [];

  @Output() selectedProfilesChange = new EventEmitter<KontorolConversionProfileWithAsset[]>();
  @Output() actionSelected = new EventEmitter<{ action: string, profile: KontorolConversionProfileWithAsset }>();

  @ViewChild('actionsmenu') private _actionsMenu: Menu;

  public _profiles = [];
  public _emptyMessage = '';
  public _items: MenuItem[];
  public _deferredLoading = true;
  public _deferredProfiles = [];

    public abstract _onColumnResize(event: { delta: number, element: HTMLTableHeaderCellElement }): void;

  public rowTrackBy: Function = (index: number, item: any) => item.id;

  constructor(protected _appLocalization: AppLocalization,
              protected _permissionsService: KMCPermissionsService,
              protected _cdRef: ChangeDetectorRef) {
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
        this._profiles = this._deferredProfiles;
        this._deferredProfiles = null;
      }, 0);
    }
  }

  ngOnDestroy() {
    this._actionsMenu.hide();
  }

  private _buildMenu(profile: KontorolConversionProfileWithAsset): void {
    if (profile.isDefault) {
      this._items = [
        {
          id: 'edit',
          label: this._appLocalization.get('applications.settings.transcoding.edit'),
          command: () => this._onActionSelected('edit', profile)
        }
      ];
    } else {
      this._items = [
        {
          id: 'setAsDefault',
          label: this._appLocalization.get('applications.settings.transcoding.setAsDefault'),
          command: () => this._onActionSelected('setAsDefault', profile)
        },
        {
          id: 'edit',
          label: this._appLocalization.get('applications.settings.transcoding.edit'),
          command: () => this._onActionSelected('edit', profile)
        },
        {
          id: 'delete',
          label: this._appLocalization.get('applications.settings.transcoding.delete'),
          styleClass: 'kDanger',
          command: () => this._onActionSelected('delete', profile)
        }
      ];
    }

    this._permissionsService.filterList(<{ id: string }[]>this._items, { 'delete': KMCPermissions.TRANSCODING_DELETE });
  }

  public _openActionsMenu(event: any, profile: KontorolConversionProfileWithAsset): void {
    if (this._actionsMenu) {
      this._buildMenu(profile);
      this._actionsMenu.toggle(event);
    }
  }
  public _onActionSelected(action: string, profile: KontorolConversionProfileWithAsset): void {
    this.actionSelected.emit({ action, profile });
  }

  public _onSelectionChange(event): void {
    this.selectedProfilesChange.emit(event);
  }

}
