import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { KontorolFlavorParams } from 'kontorol-ngx-client';
import { KMCPermissions, KMCPermissionsService } from 'app-shared/kmc-shared/kmc-permissions';

@Component({
  selector: 'kTranscodingProfileFalvorsTable',
  templateUrl: './transcoding-profile-flavors-table.component.html',
  styleUrls: ['./transcoding-profile-flavors-table.component.scss']
})
export class TranscodingProfileFlavorsTableComponent implements AfterViewInit, OnInit, OnDestroy {
  @Input() isNewProfile: boolean;
  @Input() selectedFlavors: KontorolFlavorParams[] = [];

  @Input()
  set flavors(data: any[]) {
    if (!this._deferredLoading) {
      this._flavors = [];
      this._cdRef.detectChanges();
      this._flavors = data;
      this._cdRef.detectChanges();
    } else {
      this._deferredFlavors = data;
    }
  }

  @Output() selectedFlavorsChange = new EventEmitter<KontorolFlavorParams[]>();
  @Output() editFlavor = new EventEmitter<KontorolFlavorParams>();

  private _deferredFlavors: KontorolFlavorParams[];
  public _flavors: KontorolFlavorParams[] = [];
  public _emptyMessage: string;
  public _deferredLoading = true;

  public get _isEditAllowed(): boolean {
    return this.isNewProfile || this._permissionsService.hasPermission(KMCPermissions.TRANSCODING_UPDATE);
  }

  constructor(private _appLocalization: AppLocalization,
              private _permissionsService: KMCPermissionsService,
              private _cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.assignEmptyMessage();
  }

  ngAfterViewInit() {
    if (this._deferredLoading) {
      /* Use timeout to allow the DOM to render before setting the data to the datagrid.
         This prevents the screen from hanging during datagrid rendering of the data.*/
      setTimeout(() => {
        this._deferredLoading = false;
        this._flavors = this._deferredFlavors;
        this._deferredFlavors = null;
      }, 0);
    }
  }

  ngOnDestroy() {
  }

  public _onSelectionChange(event: KontorolFlavorParams[]): void {
    this.selectedFlavorsChange.emit(event);
  }

  public assignEmptyMessage(): void {
    this._emptyMessage = this._appLocalization.get('applications.content.playlistDetails.errors.addAtLeastOneMedia');
  }

  public _editFlavor(flavor: KontorolFlavorParams): void {
    const isSelected = this.selectedFlavors.indexOf(flavor) !== -1;
    if (isSelected && this._isEditAllowed) {
      this.editFlavor.emit(flavor);
    }
  }
}

