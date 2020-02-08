import { Component, AfterViewInit, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { Menu, MenuItem } from 'primeng/primeng';
import { ISubscription } from 'rxjs/Subscription';

import { AppLocalization } from '@kontorol-ng/mc-shared';
import { AppAuthentication } from 'app-shared/kmc-shell';
import { BrowserService } from 'app-shared/kmc-shell';
import { KontorolCaptionAssetStatus } from 'kontorol-ngx-client';
import { PopupWidgetComponent, PopupWidgetStates } from '@kontorol-ng/kontorol-ui';

import { EntryCaptionsWidget } from './entry-captions-widget.service';

import { getKontorolServerUri, serverConfig } from 'config/server';
import { KMCPermissions } from 'app-shared/kmc-shared/kmc-permissions';
import { cancelOnDestroy } from '@kontorol-ng/kontorol-common';
import { ReachAppViewService, ReachPages } from 'app-shared/kmc-shared/kmc-views/details-views';


@Component({
    selector: 'kEntryCaptions',
    templateUrl: './entry-captions.component.html',
    styleUrls: ['./entry-captions.component.scss']
})
export class EntryCaptions implements AfterViewInit, OnInit, OnDestroy {
  public _kmcPermissions = KMCPermissions;

	public _actions: MenuItem[] = [];
    public _captionStatusReady = KontorolCaptionAssetStatus.ready;
    public _requestCaptionsAvailable = false;

	@ViewChild('actionsmenu') private actionsMenu: Menu;
	@ViewChild('editPopup') public editPopup: PopupWidgetComponent;


	private _popupStateChangeSubscribe: ISubscription;
	constructor(public _widgetService: EntryCaptionsWidget,
                private _appAuthentication: AppAuthentication,
                private _appLocalization: AppLocalization,
                private _browserService: BrowserService,
                private _reachAppViewService: ReachAppViewService) {
    }

	ngOnInit() {
        this._widgetService.attachForm();

		this._actions = [
			{label: this._appLocalization.get('applications.content.entryDetails.captions.edit'), command: (event) => {this.actionSelected("edit");}},
			{label: this._appLocalization.get('applications.content.entryDetails.captions.download'), command: (event) => {this.actionSelected("download");}},
			{label: this._appLocalization.get('applications.content.entryDetails.captions.preview'), command: (event) => {this.actionSelected("preview");}},
			{label: this._appLocalization.get('applications.content.entryDetails.captions.delete'), styleClass: 'kDanger', command: (event) => {this.actionSelected("delete");}}
		];

        this._widgetService.data$
            .pipe(cancelOnDestroy(this))
            .subscribe(entry => {
                this._requestCaptionsAvailable = this._reachAppViewService.isAvailable({ page: ReachPages.entry, entry });
            });
	}

	openActionsMenu(event: any, caption: any): void{
		if (this.actionsMenu){
			// save the selected caption for usage in the actions menu
			this._widgetService.currentCaption = caption;
			this.actionsMenu.toggle(event);
		}
	}

	ngAfterViewInit(){
		if (this.editPopup) {
			this._popupStateChangeSubscribe = this.editPopup.state$
				.subscribe(event => {
					if (event.state === PopupWidgetStates.Close) {
						if (event.context && event.context.newCaptionFile){
							this._widgetService.upload(event.context.newCaptionFile);
						}
						if (event.context && event.context.newCaptionUrl){
							this._widgetService.currentCaption.uploadUrl = event.context.newCaptionUrl;
						}
						if (event.context){
							this._widgetService.setDirty();
						}
						this._widgetService.removeEmptyCaptions(); // cleanup of captions that don't have assets (url or uploaded file)
					}
				});
		}
	}

	public _addCaption(){
		this._widgetService._addCaption();
		setTimeout( () => {this.editPopup.open(); }, 0); // use a timeout to allow data binding of the new caption to update before opening the popup widget
	}

	private actionSelected(action: string): void{
		switch (action){
			case "edit":
				this.editPopup.open();
				break;
			case "delete":
				this._widgetService.removeCaption();
				break;
			case "download":
				this._downloadFile();
				break;
			case "preview":
				this._widgetService.getCaptionPreviewUrl()
					.subscribe(({ url }) =>
					{
                        this._browserService.openLink(url);
					})

				break;
		}
	}

	private _downloadFile(): void {
		if (this._browserService.isIE11()) { // IE11 - use download API
			const baseUrl = serverConfig.cdnServers.serverUri;
			const protocol = 'http';
			const partnerId = this._appAuthentication.appUser.partnerId;
			const entryId = this._widgetService.data.id;
			let url = baseUrl + '/p/' + partnerId +'/sp/' + partnerId + '00/playManifest/entryId/' + entryId + '/flavorId/' + this._widgetService.currentCaption.id + '/format/download/protocol/' + protocol;
			this._browserService.openLink(url);
		}else {
            const url = getKontorolServerUri("/api_v3/service/caption_captionasset/action/serve/ks/" + this._appAuthentication.appUser.ks + "/captionAssetId/" + this._widgetService.currentCaption.id);

			this._browserService.download(url, this._widgetService.currentCaption.id + "." + this._widgetService.currentCaption.fileExt, this._widgetService.currentCaption.fileExt);
		}
	}

    ngOnDestroy() {
	    this.actionsMenu.hide();
	    this._popupStateChangeSubscribe.unsubscribe();

        this._widgetService.detachForm();

	}


    _onLoadingAction(actionKey: string) {
        if (actionKey === 'retry') {

        }
    }

    public _requestCaptions(): void {
        const entry = this._widgetService.data;
        this._reachAppViewService.open({ entry, page: ReachPages.entry });
    }
}

