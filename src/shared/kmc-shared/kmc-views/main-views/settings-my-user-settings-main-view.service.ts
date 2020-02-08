import { Injectable } from '@angular/core';
import { KmcMainViewBaseService, ViewMetadata } from '../kmc-main-view-base.service';
import { Router } from '@angular/router';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';
import { BrowserService } from 'app-shared/kmc-shell/providers/browser.service';
import { Title } from '@angular/platform-browser';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { ContextualHelpService } from 'app-shared/kmc-shared/contextual-help/contextual-help.service';

@Injectable()
export class SettingsMyUserSettingsMainViewService extends KmcMainViewBaseService {

    constructor(
        logger: KontorolLogger,
        browserService: BrowserService,
        router: Router,
        private _appLocalization: AppLocalization,
        titleService: Title,
        contextualHelpService: ContextualHelpService
    ) {
        super(logger.subLogger('SettingsMyUserSettingsMainViewService'), browserService, router, titleService, contextualHelpService);
    }

    isAvailable(): boolean {
        return true;
    }

    getRoutePath(): string {
        return 'settings/myUserSettings';
    }

    getViewMetadata(): ViewMetadata {
        return {
            viewKey: 'settings-my-user-settings',
            title: this._appLocalization.get('app.titles.settingsMyUserSettingsPageTitle'),
            menu: this._appLocalization.get('app.titles.settingsMyUserSettingsMenuTitle')
        };
    }
}
