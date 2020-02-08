import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {KontorolUiConf} from 'kontorol-ngx-client';
import {KontorolFlavorParams} from 'kontorol-ngx-client';
import {KontorolGoogleVideoSyndicationFeed} from 'kontorol-ngx-client';
import {AppAuthentication} from 'app-shared/kmc-shell';
import {KontorolGoogleSyndicationFeedAdultValues} from 'kontorol-ngx-client';
import { DestinationComponentBase, FeedFormMode } from '../../feed-details.component';
import {KontorolValidators} from '@kontorol-ng/kontorol-ui';
import { KMCPermissions, KMCPermissionsService } from 'app-shared/kmc-shared/kmc-permissions';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';

@Component({
  selector: 'kGoogleDestinationForm',
  templateUrl: './google-destination-form.component.html',
  styleUrls: ['./google-destination-form.component.scss'],
  providers: [
      {provide: DestinationComponentBase, useExisting: GoogleDestinationFormComponent},
      KontorolLogger.createLogger('GoogleDestinationFormComponent')
  ]
})
export class GoogleDestinationFormComponent extends DestinationComponentBase implements OnInit, OnDestroy {
  @Input() mode: FeedFormMode;

  @Output()
  onFormStateChanged = new EventEmitter<{ isValid: boolean, isDirty: boolean }>();

  @Input()
  feed: KontorolGoogleVideoSyndicationFeed = null;

  @Input()
  public players: KontorolUiConf[] = null;

  @Input()
  public contentFlavors: KontorolFlavorParams[] = null;

  public _form: FormGroup;
  public _availableContentFlavors: Array<{ value: number, label: string }> = [];
  public _availablePlayers: Array<{ value: number, label: string, version: string }> = [];

  constructor(private _fb: FormBuilder,
              private _logger: KontorolLogger,
              private _permissionsService: KMCPermissionsService,
              private _appAuthentication: AppAuthentication) {
    super();
    // prepare form
    this._createForm();
  }

  ngOnInit() {
    this._fillAvailableContentFlavors();
    this._fillAvailablePlayers();
    this._resetFormData();

    if (this.mode === 'edit' && !this._permissionsService.hasPermission(KMCPermissions.SYNDICATION_UPDATE)) {
        this._logger.debug(`user doesn't have SYNDICATION_UPDATE permission, disable form for editing`);
      this._form.disable({ emitEvent: false });
    } else {
      this.onFormStateChanged.emit({
        isValid: this._form.status !== 'INVALID',
        isDirty: this._form.dirty
      });

      this._form.valueChanges
        .pipe(cancelOnDestroy(this))
        .subscribe(
          () => {
            this.onFormStateChanged.emit({
              isValid: this._form.status !== 'INVALID',
              isDirty: this._form.dirty
            });
          }
        );
    }
  }

  ngOnDestroy() {
  }

  public getData(): KontorolGoogleVideoSyndicationFeed {
      this._logger.info(`handle get feed data action`);
    if (!this._form.valid) {
        this._logger.info(`form is not valid, abort action`);
      this.markFormFieldsAsTouched();
      return null;
    }

    const data = new KontorolGoogleVideoSyndicationFeed({
      flavorParamId: this._form.get('contentFlavor').value,
      addToDefaultConversionProfile: this._form.get('addToDefaultTranscodingProfile').value,
      landingPage: this._form.get('landingPage').value,
    });

    if (this._form.get('playback').value === 'fromGoogle') {
      data.allowEmbed = true;
      data.playerUiconfId = this._form.get('selectedPlayer').value;
    } else {
      data.allowEmbed = false
    }

    data.adultContent = this._form.get('adultContent').value ?
      KontorolGoogleSyndicationFeedAdultValues.yes :
      KontorolGoogleSyndicationFeedAdultValues.no;


    return data;
  }

  // Create empty structured form on loading
  private _createForm(): void {
      this._logger.debug(`create form`);
    this._form = this._fb.group({
      contentFlavor: [null],
      addToDefaultTranscodingProfile: [true],
      landingPage: [null, [KontorolValidators.urlHttp, Validators.required] ],
      playback: ['fromGoogle'],
      selectedPlayer: [null],
      adultContent: [false]
    });
  }

  private _resetFormData(): void {
    this._form.reset({
      contentFlavor: this.feed ? this.feed.flavorParamId : this.contentFlavors && this.contentFlavors.length && this.contentFlavors[0].id,
      addToDefaultTranscodingProfile: this.feed ? this.feed.addToDefaultConversionProfile : true,
      landingPage: this.feed ? this.feed.landingPage : '',
      playback: this.feed ? (this.feed.allowEmbed ? 'fromGoogle' : 'linkback') : 'fromGoogle',
      selectedPlayer: this.feed ? this.feed.playerUiconfId : this.players && this.players.length && this.players[0].id,
      adultContent: this.feed ?
        this.feed.adultContent === KontorolGoogleSyndicationFeedAdultValues.yes :
        this._appAuthentication.appUser.partnerInfo.adultContent
    });

  }

  private _fillAvailableContentFlavors() {
    if (this.contentFlavors && this.contentFlavors.length) {
      this._availableContentFlavors = this.contentFlavors.map(cv => ({
        value: cv.id,
        label: cv.name || cv.id.toString()
      }));
    }
  }

  private _fillAvailablePlayers() {
    if (this.players && this.players.length) {
      this._availablePlayers = this.players.map(player => ({
        value: player.id,
        label: player.name || player.id.toString(),
        version: player.version
      }));
    }
  }

  public _clearPlayer(): void {
      this._logger.info(`handle clear player action by user`);
    this._form.patchValue({selectedPlayer: null});
  }

  private markFormFieldsAsTouched() {
      this._logger.debug(`mark form fields as touched`);
    for (const control in this._form.controls) {
      this._form.get(control).markAsTouched();
      this._form.get(control).updateValueAndValidity();
    }
  }


}
