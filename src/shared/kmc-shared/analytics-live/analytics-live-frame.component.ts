import { Component, Input, OnDestroy, OnInit, OnChanges } from '@angular/core';
import { AppAuthentication, BrowserService } from 'shared/kmc-shell/index';
import { buildCDNUrl, getKontorolServerUri, serverConfig } from 'config/server';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';
import { LiveAnalyticsMainViewService } from '../kmc-views/main-views/live-analytics-main-view.service';

@Component({
    selector: 'kAnalyticsLiveFrame',
    template: '<iframe frameborder="0px" [src]="_url | safe"></iframe>',
    styles: [
        ':host { display: block; width: 100%; height: 100%; }',
        'iframe { width: 100%; height: 100% }'
    ],
    providers: [KontorolLogger.createLogger('AnalyticsLiveFrameComponent')]
})
export class AnalyticsLiveFrameComponent implements OnInit, OnDestroy, OnChanges {
    @Input() entryId: string;

    public _url = null;

    constructor(private appAuthentication: AppAuthentication,
                private logger: KontorolLogger,
                private browserService: BrowserService,
                private _liveAnalyticsView: LiveAnalyticsMainViewService
    ) {
    }

    ngOnChanges(changes) {
        if (changes.entryId) {
            this._updateUrl();
        }
    }

    private _updateUrl(): void {
        if (this.entryId) {
            this._url = serverConfig.externalApps.liveAnalytics.uri + `#/entry/${this.entryId}/nonav`;
        } else {
            this._url = serverConfig.externalApps.liveAnalytics.uri + '#/dashboard/nonav';
        }
    }

    ngOnInit() {
        try {
            if (!this._liveAnalyticsView.isAvailable()) {
                this.browserService.handleUnpermittedAction(true);
                return undefined;
            }

            this._updateUrl();

            let cdn_host = buildCDNUrl('');
            cdn_host = cdn_host.substr(cdn_host.indexOf('://')+3); // remove protocol as Live Analytivs app adds it itself
            window['kmc'] = {
                'vars': {
                    'ks': this.appAuthentication.appUser.ks,
                    'partner_id': this.appAuthentication.appUser.partnerId,
                    'cdn_host':  cdn_host,
                    'service_url': getKontorolServerUri(),
                    'liveanalytics': {
                        'player_id': +serverConfig.externalApps.liveAnalytics.uiConfId || '',
                        map_urls: serverConfig.externalApps.liveAnalytics.mapUrls || [],
                        map_zoom_levels: serverConfig.externalApps.liveAnalytics.mapZoomLevels || ''
                    }
                },
                'functions': {
                    expired: () => {
                        this.appAuthentication.logout();
                    }
                }
            };
        } catch (ex) {
            this.logger.warn(`Could not load live real-time dashboard, please check that liveAnalytics configurations are loaded correctly\n error: ${ex}`);
            this._url = null;
            window['kmc'] = null;
        }
    }

    ngOnDestroy() {
        this._url = null;
        window['kmc'] = null;
    }
}
