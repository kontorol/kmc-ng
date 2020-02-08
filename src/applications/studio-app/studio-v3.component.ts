import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {AppAuthentication, BrowserService } from 'app-shared/kmc-shell';
import {AppEventsService} from 'app-shared/kmc-shared';
import { buildCDNUrl, getKontorolServerUri, serverConfig } from 'config/server';
import {KontorolLogger} from '@kontorol-ng/kontorol-logger';
import { PlayersUpdatedEvent } from 'app-shared/kmc-shared/events';
import { KMCPermissionsService } from 'app-shared/kmc-shared/kmc-permissions';
import { StudioV3MainViewService } from 'app-shared/kmc-shared/kmc-views';

@Component({
  selector: 'kStudioV3',
  templateUrl: './studio-v3.component.html',
  styleUrls: ['./studio-v3.component.scss']
})
export class StudioV3Component implements OnInit, AfterViewInit, OnDestroy {

  public studioUrl = '';

  constructor(
        private _cdr: ChangeDetectorRef,
        private appAuthentication: AppAuthentication,
        private _appEvents: AppEventsService, private logger: KontorolLogger,
        private browserService: BrowserService,
        private _permissionsService: KMCPermissionsService,
        private _studioV3MainView: StudioV3MainViewService) {
  }

  ngOnInit() {
       if (this._studioV3MainView.viewEntered()) {
           window['kmc'] = {
               'preview_embed': {
                   'updateList': (isPlaylist: boolean) => {
                       this._updatePlayers(isPlaylist);
                   }
               },
               'vars': {
                   'ks': this.appAuthentication.appUser.ks,
                   'api_url': getKontorolServerUri(),
                   'host': serverConfig.kontorolServer.uri,
                   'studioV3': {
                       'config': {
                           'name': 'Video Studio V3',
                           'tags': 'studio_v3',
                           'html5_version': serverConfig.externalApps.studioV3.html5_version,
                           'html5lib': buildCDNUrl(serverConfig.externalApps.studioV3.html5lib)
                       },
                       'publisherEnvType': this.appAuthentication.appUser.partnerInfo.publisherEnvironmentType,
                       'html5_version': serverConfig.externalApps.studioV3.html5_version,
                       'showFlashStudio': false,
                       'showHTMLStudio': false,
                       'playerVersionsMap': serverConfig.externalApps.studioV3.playerVersionsMap
                   }
               },
               'functions': {}
           };
           this.studioUrl = serverConfig.externalApps.studioV3.uri;
       }
  }

  ngAfterViewInit() {
  }

  _updatePlayers(isPlaylist): void {
    this._appEvents.publish(new PlayersUpdatedEvent(isPlaylist));
  }

  ngOnDestroy() {
    this.studioUrl = '';
    window['kmc'] = null;
  }
}
