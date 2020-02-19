import { Injectable } from '@angular/core';
import { KMCPermissions, KMCPermissionsService } from '../../kmc-permissions';
import { KmcMainViewBaseService, ViewMetadata } from '../kmc-main-view-base.service';
import { Router } from '@angular/router';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';
import { BrowserService } from 'app-shared/kmc-shell/providers/browser.service';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { Title } from '@angular/platform-browser';
import { ContextualHelpService } from 'app-shared/kmc-shared/contextual-help/contextual-help.service';

@Injectable()
export class ContentCategoriesMainViewService extends KmcMainViewBaseService {

    constructor(
        logger: KontorolLogger,
        browserService: BrowserService,
        router: Router,
        private _appPermissions: KMCPermissionsService,
        private _appLocalization: AppLocalization,
        titleService: Title,
        contextualHelpService: ContextualHelpService
    ) {
        super(logger.subLogger('ContentCategoriesMainViewService'), browserService, router, titleService, contextualHelpService);
    }

    isAvailable(): boolean {
        return this._appPermissions.hasAnyPermissions([
            KMCPermissions.CONTENT_MANAGE_BASE,
            KMCPermissions.CONTENT_MANAGE_EDIT_CATEGORIES
            ]);
    }

    getRoutePath(): string {
        return 'content/categories';
    }

    getViewMetadata(): ViewMetadata {
        return {
            viewKey: 'content-categories',
            title: this._appLocalization.get('app.titles.contentCategoriesPageTitle'),
            menu: this._appLocalization.get('app.titles.contentCategoriesMenuTitle')
        };
    }
}
