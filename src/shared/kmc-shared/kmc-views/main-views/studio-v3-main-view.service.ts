import { Injectable } from '@angular/core';
import { KMCPermissions, KMCPermissionsService } from '../../kmc-permissions';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';
import { KmcMainViewBaseService, ViewMetadata } from '../kmc-main-view-base.service';
import { Router } from '@angular/router';
import { serverConfig } from 'config/server';
import { BrowserService } from 'app-shared/kmc-shell/providers/browser.service';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { Title } from '@angular/platform-browser';
import { ContextualHelpService } from 'app-shared/kmc-shared/contextual-help/contextual-help.service';

@Injectable()
export class StudioV3MainViewService extends KmcMainViewBaseService {


    constructor(logger: KontorolLogger,
                browserService: BrowserService,
                router: Router,
                private _appPermissions: KMCPermissionsService,
                private _appLocalization: AppLocalization,
                titleService: Title,
                contextualHelpService: ContextualHelpService) {
        super(logger.subLogger('StudioV3MainViewService'), browserService, router, titleService, contextualHelpService);
    }

    isAvailable(): boolean {
        const isViewPermitted = this._appPermissions.hasAnyPermissions([
            KMCPermissions.STUDIO_BASE,
            KMCPermissions.STUDIO_ADD_UICONF,
            KMCPermissions.STUDIO_UPDATE_UICONF,
            KMCPermissions.STUDIO_DELETE_UICONF,
        ]);
        const studioHtmlIsAvailable = !!serverConfig.externalApps.studioV3;
        const studioHtmlIsPermitted = this._appPermissions.hasPermission(KMCPermissions.FEATURE_V3_STUDIO_PERMISSION);

        this._logger.info(`handle isAvailable action by user`,
            { isViewPermitted, studioHtmlIsAvailable, studioHtmlIsPermitted });

        return isViewPermitted && studioHtmlIsAvailable && studioHtmlIsPermitted;
    }

    getRoutePath(): string {
        return 'studio/v3';
    }

    getViewMetadata(): ViewMetadata {
        return {
            viewKey: 'studio-v3',
            title: this._appLocalization.get('app.titles.studioV3PageTitle'),
            menu: this._appLocalization.get('app.titles.studio3MenuTitle')
        };
    }
}


