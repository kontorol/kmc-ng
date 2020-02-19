import {Injectable, OnDestroy} from '@angular/core';
import {ReachProfileWidget} from '../reach-profile-widget';
import {KontorolLogger} from '@kontorol-ng/kontorol-logger';
import {SettingsReachProfileViewSections} from "app-shared/kmc-shared/kmc-views/details-views";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {KMCPermissions, KMCPermissionsService} from "app-shared/kmc-shared/kmc-permissions";
import {AppLocalization} from "@kontorol-ng/mc-shared";
import {Observable} from "rxjs";
import {cancelOnDestroy} from "@kontorol-ng/kontorol-common";
import {async} from "rxjs-compat/scheduler/async";
import {KontorolMultiRequest, KontorolReachProfile, KontorolVendorCatalogItemOutputFormat} from "kontorol-ngx-client";

@Injectable()
export class ReachProfileServiceWidget extends ReachProfileWidget implements OnDestroy {
    
    public formatOptions: { label: string, value: number }[] = [];
    
    public serviceForm: FormGroup;
    public formatField: AbstractControl;
    public maxField: AbstractControl;
    public machineField: AbstractControl;
    public humanField: AbstractControl;
    public metadataField: AbstractControl;
    public speakerField: AbstractControl;
    public audioField: AbstractControl;
    public removalField: AbstractControl;
    
    constructor(logger: KontorolLogger,
                private _permissionsService: KMCPermissionsService,
                private _appLocalization: AppLocalization,
                private _formBuilder: FormBuilder) {
        
        super(SettingsReachProfileViewSections.Service, logger);
        this._buildForm();
    }
    
    
    private _buildForm(): void {
        this.serviceForm = this._formBuilder.group({
            format: '',
            max: ['', Validators.required],
            machine: '',
            human: '',
            metadata: '',
            speaker: '',
            audio: '',
            removal: ''
        });
        
        this.formatField = this.serviceForm.controls['format'];
        this.maxField = this.serviceForm.controls['max'];
        this.machineField = this.serviceForm.controls['machine'];
        this.humanField = this.serviceForm.controls['human'];
        this.metadataField = this.serviceForm.controls['metadata'];
        this.speakerField = this.serviceForm.controls['speaker'];
        this.audioField = this.serviceForm.controls['audio'];
        this.removalField = this.serviceForm.controls['removal'];
    }
    
    private _monitorFormChanges(): void {
        Observable.merge(this.serviceForm.valueChanges, this.serviceForm.statusChanges)
            .pipe(cancelOnDestroy(this))
            .observeOn(async) // using async scheduler so the form group status/dirty mode will be synchornized
            .subscribe(() => {
                    super.updateState({
                        isValid: true,
                        isDirty: this.serviceForm.dirty
                    });
                }
            );
    }
    
    protected onValidate(wasActivated: boolean): Observable<{ isValid: boolean }> {
        const formData = wasActivated ? this.serviceForm.value : this.data;
        const max = (formData.max.toString() || '').trim();
        const hasValue = max !== '';
    
        return Observable.of({
            isValid: hasValue
        });
    }
    
    protected onDataSaving(newData: KontorolReachProfile, request: KontorolMultiRequest): void {
        const formData = this.wasActivated ? this.serviceForm.value : this.data;
        newData.defaultOutputFormat = formData.format;
        newData.maxCharactersPerCaptionLine = formData.max;
        newData.autoDisplayMachineCaptionsOnPlayer = formData.machine;
        newData.autoDisplayHumanCaptionsOnPlayer = formData.human;
        newData.enableMetadataExtraction = formData.metadata;
        newData.enableSpeakerChangeIndication = formData.speaker;
        newData.enableAudioTags = formData.audio;
        newData.enableProfanityRemoval = formData.removal;
    }
    
    /**
     * Do some cleanups if needed once the section is removed
     */
    protected onReset(): void {
        this.formatOptions = [];
        this.serviceForm.reset();
    }
    
    protected onActivate(firstTimeActivating: boolean): Observable<{ failed: boolean }> | void {
        
        if (firstTimeActivating && (this.isNewData || this._permissionsService.hasPermission(KMCPermissions.REACH_PLUGIN_PERMISSION))) {
            this._monitorFormChanges();
        }
        
        this.formatOptions = [
            {label: this._appLocalization.get('applications.settings.reach.service.formatOptions.dfxp'), value: KontorolVendorCatalogItemOutputFormat.dfxp},
            {label: this._appLocalization.get('applications.settings.reach.service.formatOptions.srt'), value: KontorolVendorCatalogItemOutputFormat.srt}
        ];
        
        this.serviceForm.reset({
            format: this.data.defaultOutputFormat,
            max: this.data.maxCharactersPerCaptionLine,
            machine: this.data.autoDisplayMachineCaptionsOnPlayer,
            human: this.data.autoDisplayHumanCaptionsOnPlayer,
            metadata: this.data.enableMetadataExtraction,
            speaker: this.data.enableSpeakerChangeIndication,
            audio: this.data.enableAudioTags,
            removal: this.data.enableProfanityRemoval
        });
    }
    
    ngOnDestroy() {}
}
