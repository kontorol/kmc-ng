import { Injectable } from '@angular/core';
import { KMCPermissionsService } from '../../kmc-permissions';
import { Router } from '@angular/router';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { BrowserService } from 'app-shared/kmc-shell/providers/browser.service';
import { KontorolClient } from 'kontorol-ngx-client';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';
import { KmcComponentViewBaseService } from 'app-shared/kmc-shared/kmc-views/kmc-component-view-base.service';
import { serverConfig } from 'config/server';

@Injectable()
export class LiveDashboardAppViewService extends KmcComponentViewBaseService<void> {

    constructor(private _appPermissions: KMCPermissionsService,
                private _appLocalization: AppLocalization,
                private _kontorolClient: KontorolClient,
                private _router: Router,
                _browserService: BrowserService,
                _logger: KontorolLogger) {
        super(_logger.subLogger('LiveDashboardAppViewService'));
    }

    isAvailable(): boolean {
        return !!serverConfig.externalApps.liveDashboard;
    }
}
