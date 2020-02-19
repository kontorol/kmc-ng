import {Injectable, OnDestroy} from '@angular/core';
import {AppAuthentication} from 'app-shared/kmc-shell';
import {KontorolSourceType} from 'kontorol-ngx-client';
import {PreviewMetadataChangedEvent} from '../../preview-metadata-changed-event';
import {AppEventsService} from 'app-shared/kmc-shared';
import {EntryWidget} from '../entry-widget';
import {serverConfig, getKontorolServerUri} from 'config/server';
import {KMCPermissions, KMCPermissionsService} from 'app-shared/kmc-shared/kmc-permissions';
import { EntryStore } from '../entry-store.service';
import {KontorolLogger} from '@kontorol-ng/kontorol-logger';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';

@Injectable()
export class EntryPreviewWidget extends EntryWidget implements OnDestroy {
    public _iframeSrc: string;
    private _urlHash: number = 0;

    constructor(private appAuthentication: AppAuthentication,
                private _store: EntryStore,
                private _permissionsService: KMCPermissionsService,
                appEvents: AppEventsService,
                logger: KontorolLogger) {
        super('entryPreview', logger);


        appEvents.event(PreviewMetadataChangedEvent)
            .pipe(cancelOnDestroy(this))
            .subscribe(({entryId}) => {
                if (this.data && this.data.id === entryId) {
                    this._iframeSrc = this._createUrl();
                }
            });
    }

    /**
     * Do some cleanups if needed once the section is removed
     */
    protected onReset() {
        // DEVELOPER NOTICE: don't reset _urlHash to support refresh after saving
    }

    ngOnDestroy() {
    }

    private _createUrl(): string {

        let result = "";

        // create preview embed code
        if (this.data) {
            const entryId = this.data.id;
            const sourceType = this.data.sourceType.toString();
            const isLive = (sourceType === KontorolSourceType.liveStream.toString() ||
                sourceType === KontorolSourceType.akamaiLive.toString() ||
                sourceType === KontorolSourceType.akamaiUniversalLive.toString() ||
                sourceType === KontorolSourceType.manualLiveStream.toString());

            const UIConfID = serverConfig.kontorolServer.previewUIConf;
            const partnerID = this.appAuthentication.appUser.partnerId;
            const ks = this.appAuthentication.appUser.ks || "";
            const serverUri = getKontorolServerUri();

            let flashVars = `flashvars[kAnalony.plugin]=false&flashvars[closedCaptions.plugin]=true&flashvars[closedCaptions.hideWhenEmpty]=true&flashvars[ks]=${ks}`;
            if (isLive) {
                flashVars += '&flashvars[disableEntryRedirect]=true&flashvars[SkipKSOnIsLiveRequest]=false';
            }
            const shouldDisableAlerts = this._permissionsService.hasPermission(KMCPermissions.FEATURE_DISABLE_KMC_KDP_ALERTS);
            if (shouldDisableAlerts) {
                flashVars += '&flashvars[disableAlerts]=true';
            }

            this._urlHash = this._urlHash + 1;

            result = `${serverUri}/p/${partnerID}/sp/${partnerID}00/embedIframeJs/uiconf_id/${UIConfID}/partner_id/${partnerID}?iframeembed=true&${flashVars}&entry_id=${entryId}&hash=${this._urlHash}`;
        }

        return result;
    }

    protected onActivate(firstTimeActivating: boolean) {
        this._iframeSrc = this._createUrl();
    }


}
