import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable, of as ObservableOf } from 'rxjs';

import {KontorolClient, KontorolMultiRequest} from 'kontorol-ngx-client';
import {KontorolSourceType} from 'kontorol-ngx-client';
import {KontorolLiveStreamBitrate} from 'kontorol-ngx-client';
import {KontorolRecordStatus} from 'kontorol-ngx-client';
import {KontorolLiveStreamEntry} from 'kontorol-ngx-client';
import {KontorolDVRStatus} from 'kontorol-ngx-client';
import {KontorolMediaEntry} from 'kontorol-ngx-client';
import {LiveStreamRegenerateStreamTokenAction} from 'kontorol-ngx-client';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import {AppAuthentication, BrowserService} from 'app-shared/kmc-shell';
import {LiveXMLExporter} from './live-xml-exporter';
import {AVAIL_BITRATES} from './bitrates';
import {EntryWidget} from '../entry-widget';
import {ConversionProfileListAction} from 'kontorol-ngx-client';
import {KontorolConversionProfileFilter} from 'kontorol-ngx-client';
import {KontorolFilterPager} from 'kontorol-ngx-client';
import {KontorolConversionProfileType} from 'kontorol-ngx-client';
import {KontorolNullableBoolean} from 'kontorol-ngx-client';
import {AreaBlockerMessage} from '@kontorol-ng/kontorol-ui';
import {BaseEntryGetAction} from 'kontorol-ngx-client';
import { KMCPermissions, KMCPermissionsService } from 'app-shared/kmc-shared/kmc-permissions';
import { ContentEntryViewSections } from 'app-shared/kmc-shared/kmc-views/details-views/content-entry-view.service';
import { LiveDashboardAppViewService } from 'app-shared/kmc-shared/kmc-views/component-views';
import {KontorolLogger} from '@kontorol-ng/kontorol-logger';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';

export interface bitrate {
	enabled: boolean,
	bitrate: number,
	width: number,
	height: number,
	errors: string
}

@Injectable()
export class EntryLiveWidget extends EntryWidget implements OnDestroy {

	public _liveType: string = "";
	private dirty: boolean;

	private _conversionProfiles: BehaviorSubject<{ items: any[]}> = new BehaviorSubject<{ items: any[]}>({items: []});
	public _conversionProfiles$ = this._conversionProfiles.asObservable();

	public _recordStatus: string = "";
	public _DVRStatus: string = "";
	public _showDVRWindow: boolean = false;
	public _dvrWindowAvailable: boolean = false;
	public _explicitLive: boolean = true;
	public _liveDashboardEnabled: boolean = false;

	public _selectedConversionProfile: number;
	public _manualStreamsConfiguration = [];
	public _bitrates: bitrate[] = [];
	public _availableBitrates = AVAIL_BITRATES;

	public _autoStartOptions = [
		{label: this._appLocalization.get('applications.content.entryDetails.live.disabled'), value: true},
		{label: this._appLocalization.get('applications.content.entryDetails.live.enabled'), value: false}
	];

	constructor(private _kontorolServerClient: KontorolClient,
              private _appLocalization: AppLocalization,
              private _permissionsService: KMCPermissionsService,
              private _browserService: BrowserService,
                private _liveDasboardAppViewService: LiveDashboardAppViewService,
                logger: KontorolLogger) {
		super(ContentEntryViewSections.Live, logger);
	}

	protected onReset() {
		this._DVRStatus = "";
		this._showDVRWindow = false;
		this._dvrWindowAvailable = false;
		this._selectedConversionProfile = null;
		this._explicitLive = true;
		this._manualStreamsConfiguration = [];
		this._bitrates = [];
		this.dirty = false;
	}

	protected onDataSaving(data: KontorolMediaEntry, request: KontorolMultiRequest) {
		if (this._liveType === "universal") {
			// create bitrate array for saving
			let bitrates: KontorolLiveStreamBitrate[] = [];
			this._bitrates.forEach((br: bitrate) => {
				if (br.enabled) {
					bitrates.push(new KontorolLiveStreamBitrate({
						bitrate: br.bitrate,
						width: br.width,
						height: br.height
					}));
				}
			});
			(data as KontorolLiveStreamEntry).bitrates = bitrates;
		}
		if (this._liveType === "kontorol") {
			(data as KontorolLiveStreamEntry).explicitLive = this._explicitLive ? KontorolNullableBoolean.trueValue : KontorolNullableBoolean.falseValue;
			(data as KontorolLiveStreamEntry).conversionProfileId = this._selectedConversionProfile;
		}
	}

	protected onValidate(wasActivated: boolean): Observable<{ isValid: boolean}> {
		return Observable.create(observer => {
			const isValid = this._liveType === "universal" ? this._validateBitrates({updateDirtyMode: false}) : true;
			observer.next({isValid});
			observer.complete()
		});
	}

	protected onActivate(firstTimeActivating : boolean) {
		// set live type and load data accordingly
		switch (this.data.sourceType.toString()) {
      case KontorolSourceType.liveStream.toString():
				this._liveType = "kontorol";
        this._liveDashboardEnabled = this._liveDasboardAppViewService.isAvailable()
          && this._permissionsService.hasPermission(KMCPermissions.ANALYTICS_BASE);
				this._setRecordStatus();
				this._setDVRStatus();
				super._showLoader();
				this._conversionProfiles.next({items: []});

        if (this._permissionsService.hasPermission(KMCPermissions.FEATURE_KONTOROL_LIVE_STREAM)) {
          return this._kontorolServerClient.request(new ConversionProfileListAction({
            filter: new KontorolConversionProfileFilter({
              typeEqual: KontorolConversionProfileType.liveStream
            }),
            pager: new KontorolFilterPager({
              pageIndex: 1,
              pageSize: 500
            })
          }))
            .pipe(cancelOnDestroy(this, this.widgetReset$))
            .catch((error, caught) => {
              super._hideLoader();
              super._showActivationError();
              this._conversionProfiles.next({ items: [] });
              return Observable.throw(error);
            })
            .map(response => {
              if (response.objects && response.objects.length) {
                // set the default profile first in the array
                response.objects.sort((a, b) => {
                  if (a.isDefault > b.isDefault) {
                    return -1;
                  }
                  if (a.isDefault < b.isDefault) {
                    return 1;
                  }
                  return 0;
                });
                // create drop down options array
                const conversionProfiles = [];
                response.objects.forEach(profile => {
                  conversionProfiles.push({ label: profile.name, value: profile.id });
                  if (this.data.conversionProfileId === profile.id) {
                    this._selectedConversionProfile = profile.id; // preselect this profile in the profiles drop-down
                  }
                });
                this._conversionProfiles.next({ items: conversionProfiles });
                super._hideLoader();

                  return {failed: false};
              } else {
                  return {failed: true};
              }
            });
        } else {
          super._hideLoader();
          break;
        }
			case KontorolSourceType.akamaiUniversalLive.toString():
				this._liveType = "universal";
				this._showDVRWindow = true;
				this._setDVRStatus();
				this._setBitrates();
				break;
			case KontorolSourceType.manualLiveStream.toString():
				this._liveType = "manual";
				this._setManualStreams();
				break;
		}

        return ObservableOf({failed: false});
	}

	public _exportXML() {
		const entry = this.data as KontorolLiveStreamEntry;
		const xml: string = LiveXMLExporter.exportXML(entry, this._liveType, this._bitrates);
		this._browserService.download(xml, "export_" + entry.id + ".xml", "text/xml");
	}

	private _setDVRStatus(): void {
		let entry = this.data as KontorolLiveStreamEntry;
		if (!entry.dvrStatus || entry.dvrStatus.toString() === KontorolDVRStatus.disabled.toString()) {
			this._DVRStatus = this._appLocalization.get('app.common.off');
		} else if (entry.dvrStatus.toString() == KontorolDVRStatus.enabled.toString()) {
			this._DVRStatus = this._appLocalization.get('app.common.on');
			if (this._liveType === "kontorol") {
				this._showDVRWindow = true;
				this._dvrWindowAvailable = !isNaN(entry.dvrWindow);
			}
		}
		this._explicitLive = entry.explicitLive === KontorolNullableBoolean.trueValue;
	}

	private _setRecordStatus(): void {
		let entry = this.data as KontorolLiveStreamEntry;
		if (!entry.recordStatus || entry.recordStatus.toString() === KontorolRecordStatus.disabled.toString()) {
			this._recordStatus = this._appLocalization.get('app.common.off');
		} else if (entry.recordStatus.toString() === KontorolRecordStatus.appended.toString() || entry.recordStatus.toString() === KontorolRecordStatus.perSession.toString()) {
			this._recordStatus = this._appLocalization.get('app.common.on');
		}
	}

	private _setManualStreams(): void {
		let entry: KontorolLiveStreamEntry = this.data as KontorolLiveStreamEntry;
		if (entry.liveStreamConfigurations) {
			entry.liveStreamConfigurations.forEach(streamConfig => {
				let protocol = streamConfig.protocol.toString();
				let postfix = this._appLocalization.get('applications.content.entryDetails.live.streamUrl');
				this._manualStreamsConfiguration.push({label: protocol + " " + postfix, url: streamConfig.url});
			});
		}
	}

	private _setBitrates(): void {
		this._bitrates = [];
		let entry: KontorolLiveStreamEntry = this.data as KontorolLiveStreamEntry;
		if (entry.bitrates) {
			entry.bitrates.forEach((br: KontorolLiveStreamBitrate) => {
				let bitRate: bitrate = {
					enabled: true,
					bitrate: br.bitrate,
					width: br.width,
					height: br.height,
					errors: ""
				};
				this._bitrates.push(bitRate);
			});
			// prepare empty bitrate slots for missing bitrates
			while (this._bitrates.length < 3) {
				this._bitrates.push({enabled: false, bitrate: 0, width: 0, height: 0, errors: ""});
			}
		}
	}
	public _validateBitrates({updateDirtyMode} : {updateDirtyMode: boolean}): boolean {
		let valid = true;
		this._bitrates.forEach((br: bitrate) => {
			br.errors = "";
			if (br.enabled) {
				if (br.bitrate > 0) {
					if (br.width === 0 || br.height === 0) {
						valid = false;
						br.errors = this._appLocalization.get('applications.content.entryDetails.live.dimensionsError');
					}
				} else {
					valid = false;
					br.errors = this._appLocalization.get('applications.content.entryDetails.live.bitrateError');
				}
			}
		});
		const newStatus: any = {isValid: valid};

		if (updateDirtyMode)
		{
			newStatus.isDirty = true;
		}

		super.updateState(newStatus);

		return valid;
	}

	public setDirty():void{
		super.updateState({isValid: true, isDirty: true});
	}

	public regenerateStreamToken(): void {
		this.sectionBlockerMessage = null;

		const multiRequest = new KontorolMultiRequest(
			new LiveStreamRegenerateStreamTokenAction({entryId: this.data.id}),
			new BaseEntryGetAction({entryId: this.data.id})
		);


		this._kontorolServerClient.multiRequest(multiRequest)
			.pipe(cancelOnDestroy(this, this.widgetReset$))
			.pipe(tag('block-shell'))
			.subscribe(
				response => {
					if (response.hasErrors()) {
						this._showBlockerMessage(new AreaBlockerMessage(
							{
								message: this._appLocalization.get('applications.content.entryDetails.live.regenerateFailure'),
								buttons: [
									{
										label: this._appLocalization.get('app.common.dismiss'),
										action: () => {
											this.sectionBlockerMessage = null;
										}
									},
									{
										label: this._appLocalization.get('app.common.retry'),
										action: () => {
											this.regenerateStreamToken();
										}
									}
								]
							}
						), false);
					}else {
						let entry: KontorolLiveStreamEntry = this.data as KontorolLiveStreamEntry;
						entry.primaryBroadcastingUrl = response[1].result.primaryBroadcastingUrl;
						entry.primaryRtspBroadcastingUrl =  response[1].result.primaryRtspBroadcastingUrl;
						entry.secondaryBroadcastingUrl =  response[1].result.secondaryBroadcastingUrl;
						entry.secondaryRtspBroadcastingUrl =  response[1].result.secondaryRtspBroadcastingUrl;
					}
				}
			);
	}

	ngOnDestroy()
    {

    }
}
