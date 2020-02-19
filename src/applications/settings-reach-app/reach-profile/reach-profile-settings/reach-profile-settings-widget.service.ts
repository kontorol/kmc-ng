import { Injectable, OnDestroy } from '@angular/core';
import { ReachProfileWidget } from '../reach-profile-widget';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';
import { SettingsReachProfileViewSections } from "app-shared/kmc-shared/kmc-views/details-views";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { cancelOnDestroy } from "@kontorol-ng/kontorol-common";
import { async } from "rxjs-compat/scheduler/async";
import {
    KontorolMultiRequest,
    KontorolReachProfile,
    KontorolReachProfileContentDeletionPolicy,
    KontorolVendorTaskProcessingRegion
} from "kontorol-ngx-client";
import { KMCPermissions, KMCPermissionsService } from "app-shared/kmc-shared/kmc-permissions";
import { AppLocalization } from "@kontorol-ng/mc-shared";

@Injectable()
export class ReachProfileSettingsWidget extends ReachProfileWidget implements OnDestroy {
    
    public deleteOptions: { label: string, value: number }[] = [];
    public regionOptions: { label: string, value: number }[] = [];
    
    public settingsForm: FormGroup;
    public nameField: AbstractControl;
    public machineField: AbstractControl;
    public professionalField: AbstractControl;
    public deletionField: AbstractControl;
    public regionField: AbstractControl;
    
    constructor(logger: KontorolLogger,
                private _permissionsService: KMCPermissionsService,
                private _appLocalization: AppLocalization,
                private _formBuilder: FormBuilder) {
        
        super(SettingsReachProfileViewSections.Settings, logger);
        this._buildForm();
    }
    
    private _buildForm(): void {
        this.settingsForm = this._formBuilder.group({
            name: ['', Validators.required],
            machine: '',
            professional: '',
            deletion: '',
            region: ''
        });
        
        this.nameField = this.settingsForm.controls['name'];
        this.machineField = this.settingsForm.controls['machine'];
        this.professionalField = this.settingsForm.controls['professional'];
        this.deletionField = this.settingsForm.controls['deletion'];
        this.regionField = this.settingsForm.controls['region'];
    }
    
    private _monitorFormChanges(): void {
        Observable.merge(this.settingsForm.valueChanges, this.settingsForm.statusChanges)
            .pipe(cancelOnDestroy(this))
            .observeOn(async) // using async scheduler so the form group status/dirty mode will be synchornized
            .subscribe(() => {
                    super.updateState({
                        isValid: this.settingsForm.status !== 'INVALID',
                        isDirty: this.settingsForm.dirty
                    });
                }
            );
    }
    
    protected onValidate(wasActivated: boolean): Observable<{ isValid: boolean }> {
        const formData = wasActivated ? this.settingsForm.value : this.data;
        const name = (formData.name || '').trim();
        const hasValue = name !== '';
        
        return Observable.of({
            isValid: hasValue
        });
    }
    
    protected onDataSaving(newData: KontorolReachProfile, request: KontorolMultiRequest): void {
        const formData = this.wasActivated ? this.settingsForm.value : this.data;
        newData.name = formData.name;
        newData.enableMachineModeration = formData.machine;
        newData.enableHumanModeration = formData.professional;
        newData.contentDeletionPolicy = formData.deletion;
        newData.vendorTaskProcessingRegion = formData.region;
    }
    
    /**
     * Do some cleanups if needed once the section is removed
     */
    protected onReset(): void {
        this.deleteOptions = [];
        this.regionOptions = [];
        this.settingsForm.reset();
    }
    
    protected onActivate(firstTimeActivating: boolean): Observable<{ failed: boolean }> | void {
        
        if (firstTimeActivating && (this.isNewData || this._permissionsService.hasPermission(KMCPermissions.REACH_PLUGIN_PERMISSION))) {
            this._monitorFormChanges();
        }
        
        this.deleteOptions = [
            {label: this._appLocalization.get('applications.settings.reach.settings.deleteOptions.deleteAfterMonth'), value: KontorolReachProfileContentDeletionPolicy.deleteAfterMonth},
            {label: this._appLocalization.get('applications.settings.reach.settings.deleteOptions.deleteAfterThreeMonths'), value: KontorolReachProfileContentDeletionPolicy.deleteAfterThreeMonths},
            {label: this._appLocalization.get('applications.settings.reach.settings.deleteOptions.deleteAfterWeek'), value: KontorolReachProfileContentDeletionPolicy.deleteAfterWeek},
            {label: this._appLocalization.get('applications.settings.reach.settings.deleteOptions.deleteOnceProcessed'), value: KontorolReachProfileContentDeletionPolicy.deleteOnceProcessed},
            {label: this._appLocalization.get('applications.settings.reach.settings.deleteOptions.doNothing'), value: KontorolReachProfileContentDeletionPolicy.doNothing}
        ];
        this.regionOptions = [
            {label: this._appLocalization.get('applications.settings.reach.settings.regionOptions.us'), value: KontorolVendorTaskProcessingRegion.us},
            {label: this._appLocalization.get('applications.settings.reach.settings.regionOptions.eu'), value: KontorolVendorTaskProcessingRegion.eu}
        ];
        
        this.settingsForm.reset({
            name: this.data.name,
            machine: this.data.enableMachineModeration,
            professional: this.data.enableHumanModeration,
            deletion: this.data.contentDeletionPolicy,
            region: this.data.vendorTaskProcessingRegion
        });
    }
    
    ngOnDestroy() {}
}
