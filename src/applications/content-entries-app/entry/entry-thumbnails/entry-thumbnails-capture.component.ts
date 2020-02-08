import { Component, AfterContentInit, Input } from '@angular/core';
import { AppAuthentication } from 'app-shared/kmc-shell';
import { PopupWidgetComponent } from '@kontorol-ng/kontorol-ui';
import { serverConfig, getKontorolServerUri } from 'config/server';

@Component({
    selector: 'kThumbnailCapture',
    templateUrl: './entry-thumbnails-capture.component.html',
    styleUrls: ['./entry-thumbnails-capture.component.scss']
})
export class EntryThumbnailCapture implements AfterContentInit{

	@Input() entryId: string;
	@Input() parentPopupWidget: PopupWidgetComponent;

    serverUri = getKontorolServerUri();
    playerConfig: any;
    kdp: any;

    constructor(private _appAuthentication: AppAuthentication) {
    }

	ngAfterContentInit(){
		this.playerConfig = {
			uiconfid: serverConfig.kontorolServer.previewUIConf,
			pid: this._appAuthentication.appUser.partnerId,
			entryid: this.entryId,
            flashvars: {
			    ks: this._appAuthentication.appUser.ks
            }
		};

	}

	onPlayerReady(kdp){
		this.kdp = kdp;
	}

	_capture(){
		// pass current position
		const context = {
			currentPosition: this.kdp.evaluate('{video.player.currentTime}')
		};
		this.parentPopupWidget.close(context);
	}

}

