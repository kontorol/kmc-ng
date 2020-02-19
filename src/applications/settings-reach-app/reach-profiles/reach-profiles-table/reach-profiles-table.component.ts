import {
    AfterViewInit,
    ChangeDetectorRef, Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import {Menu} from 'primeng/menu';
import {AppLocalization} from '@kontorol-ng/mc-shared';
import { KMCPermissionsService} from 'app-shared/kmc-shared/kmc-permissions';
import {MenuItem} from 'primeng/api';
import {KontorolReachProfileWithCredit} from "../reach-profiles-store/reach-profiles-store.service";
import {globalConfig} from "config/global";

@Component({
    selector: 'k-reach-profiles-table',
    templateUrl: './reach-profiles-table.component.html',
    styleUrls: ['./reach-profiles-table.component.scss'],
    providers: []
})

export class ReachProfilesTableComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() set profiles(data: KontorolReachProfileWithCredit[]) {
        if (!this._deferredLoading) {
            this._profiles = [];
            this._cdRef.detectChanges();
            this._profiles = data;
            this._cdRef.detectChanges();
        } else {
            this._deferredProfiles = data;
        }
    }
    
    @Output() actionSelected = new EventEmitter<{ action: string, profile: KontorolReachProfileWithCredit }>();
    @Output() sortChanged = new EventEmitter<any>();
    
    @ViewChild('actionsmenu', { static: true }) private _actionsMenu: Menu;
    
    public _profiles = [];
    public _emptyMessage = '';
    public _items: MenuItem[];
    public _deferredLoading = true;
    public _deferredProfiles = [];
    public _defaultSortOrder = globalConfig.client.views.tables.defaultSortOrder;
    
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
    
    private _buildMenu(profile: KontorolReachProfileWithCredit): void {
        
        this._items = [
            {
                id: 'edit',
                label: this._appLocalization.get('applications.settings.reach.edit'),
                command: () => this._onActionSelected('edit', profile)
            }//,
            // {
            //     id: 'duplicate',
            //     label: this._appLocalization.get('applications.settings.reach.duplicate'),
            //     command: () => this._onActionSelected('duplicate', profile)
            // }
        ];
    }
    
    public _openActionsMenu(event: any, profile: KontorolReachProfileWithCredit): void {
        if (this._actionsMenu) {
            this._buildMenu(profile);
            this._actionsMenu.toggle(event);
        }
    }
    
    public _onActionSelected(action: string, profile: KontorolReachProfileWithCredit): void {
        this.actionSelected.emit({action, profile});
    }
    
    public _onSortChanged(event) {
        if (event.field && event.order) {
            // primeng workaround: must check that field and order was provided to prevent reset of sort value
            this.sortChanged.emit({field: event.field, order: event.order});
        }
    }
}
