import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import {KontorolRecordStatus} from 'kontorol-ngx-client';
import {KontorolLiveStreamService} from './kontorol-live-stream.service';
import {AreaBlockerMessage} from '@kontorol-ng/kontorol-ui';
import {BrowserService} from 'app-shared/kmc-shell';
import {KontorolLive} from './kontorol-live-stream.interface';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';

@Component({
  selector: 'kKontorolLiveStream',
  templateUrl: './kontorol-live-stream.component.html',
  styleUrls: ['./kontorol-live-stream.component.scss'],
  providers: [KontorolLiveStreamService]
})
export class KontorolLiveStreamComponent implements OnInit, OnDestroy {

  public _form: FormGroup;
  public _availableTranscodingProfiles: Array<{ value: number, label: string }>;
  public _enableRecordingOptions: Array<{ value: KontorolRecordStatus, label: string }>;
  public _blockerMessage: AreaBlockerMessage = null;
  public _isBusy = false;

  @Input()
  data: KontorolLive;

  @Output()
  dataChange = new EventEmitter<KontorolLive>();

  constructor(private _appLocalization: AppLocalization,
              private _fb: FormBuilder,
              private _kontorolLiveStreamService: KontorolLiveStreamService,
              private _browserService: BrowserService) {
  }

  ngOnInit(): void {
    this._createForm();
    this._fillEnableRecordingOptions();
    this._loadTranscodingProfiles()
  }

  ngOnDestroy(): void {
  }

  public validate(): boolean {
    if (!this._form.valid) {
      this.markFormFieldsAsTouched();
    }
    return this._form.valid;
  }

  public isFormDirty(): boolean {
    return this._form.dirty;
  }

  private _loadTranscodingProfiles(): void {
    this._updateAreaBlockerState(true, null);
    this._kontorolLiveStreamService.getKontorolConversionProfiles()
      .pipe(cancelOnDestroy(this))
      .subscribe(transcodingProfilesList => {
        this._availableTranscodingProfiles = transcodingProfilesList.map(transcodingProfile => ({
          value: transcodingProfile.id,
          label: transcodingProfile.name
        }));

        this.data.transcodingProfile = this._getSelectedTranscodingProfile(transcodingProfilesList);

        this._form.reset(this.data);
        this._toggleRecordingSelectedOption(this.data.enableRecording);
        this._updateAreaBlockerState(false, null);

      }, error => {
        this._updateAreaBlockerState(false,  error.message);
      });
  }

  private _getSelectedTranscodingProfile(transcodingProfilesList): number {
    if (!transcodingProfilesList || !transcodingProfilesList.length) {
      return null;
    }

    const profileIdFromCache = this._browserService.getFromLocalStorage('kontorolStreamType.selectedTranscodingProfile');
    const profileExistsInList = transcodingProfilesList
      .findIndex((profile) => (profile.id === profileIdFromCache)) > -1;

    // if selected profile id exists in the list return it ; else return first option
    if (profileIdFromCache && profileExistsInList) {
      return profileIdFromCache;
    } else {
      this._browserService.setInLocalStorage('kontorolStreamType.selectedTranscodingProfile', transcodingProfilesList[0].id);
      return transcodingProfilesList[0].id;
    }
  }

  private _fillEnableRecordingOptions() {
    this._enableRecordingOptions = [
      {
        value: KontorolRecordStatus.perSession,
        label: this._appLocalization.get('applications.upload.prepareLive.kontorolStreamType.enableRecordingOptions.perSession')
      },
      {
        value: KontorolRecordStatus.appended,
        label: this._appLocalization.get('applications.upload.prepareLive.kontorolStreamType.enableRecordingOptions.appended')
      },
    ];
  }

  // Create empty structured form on loading
  private _createForm(): void {
    this._form = this._fb.group({
      name: ['', Validators.required],
      description: [''],
      transcodingProfile: [''],
      liveDVR: false,
      enableRecording: false,
      enableRecordingSelectedOption: [{value: '', disabled: true}],
      previewMode: false
    });

    this._form
      .valueChanges
      .pipe(cancelOnDestroy(this))
      .subscribe(data => {
        this.dataChange.emit(data);
      });
  }

  public _toggleRecordingSelectedOption(enable: boolean) {
    enable ? this._form.get('enableRecordingSelectedOption').enable() : this._form.get('enableRecordingSelectedOption').disable();
  }

  private markFormFieldsAsTouched(): void {
    for (const inner in this._form.controls) {
      this._form.get(inner).markAsTouched();
      this._form.get(inner).updateValueAndValidity();
    }
  }

  private _updateAreaBlockerState(isBusy: boolean, message: AreaBlockerMessage): void {
    this._isBusy = isBusy;
    this._blockerMessage = message;
  }
}
