import { Injectable } from '@angular/core';
import { KMCPermissions, KMCPermissionsService } from '../../kmc-permissions';
import { KmcMainViewBaseService, ViewMetadata } from '../kmc-main-view-base.service';
import { Router } from '@angular/router';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';
import { BrowserService } from 'app-shared/kmc-shell/providers/browser.service';
import { Title } from '@angular/platform-browser';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { ContextualHelpService } from 'app-shared/kmc-shared/contextual-help/contextual-help.service';

@Injectable()
export class SettingsAccountSettingsMainViewService extends KmcMainViewBaseService {

    constructor(
        logger: KontorolLogger,
        browserService: BrowserService,
        router: Router,
        private _appPermissions: KMCPermissionsService,
        private _appLocalization: AppLocalization,
        titleService: Title,
        contextualHelpService: ContextualHelpService
    ) {
        super(logger.subLogger('SettingsAccountSettingsMainViewService'), browserService, router, titleService, contextualHelpService);
    }

    isAvailable(): boolean {
        return this._appPermissions.hasAnyPermissions([
            KMCPermissions.ACCOUNT_BASE,
            KMCPermissions.ACCOUNT_UPDATE_SETTINGS
        ]);
    }

    getRoutePath(): string {
        return 'settings/accountSettings';
    }

    getViewMetadata(): ViewMetadata {
        return {
            viewKey: 'settings-account',
            title: this._appLocalization.get('app.titles.settingsAccountSettingsPageTitle'),
            menu: this._appLocalization.get('app.titles.settingsAccountSettingsMenuTitle')
        };
    }
}
