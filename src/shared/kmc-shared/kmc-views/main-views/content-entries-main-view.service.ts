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
export class ContentEntriesMainViewService extends KmcMainViewBaseService {

    constructor(
        logger: KontorolLogger,
        browserService: BrowserService,
        router: Router,
        private _appPermissions: KMCPermissionsService,
        private _appLocalization: AppLocalization,
        titleService: Title,
        contextualHelpService: ContextualHelpService
    ) {
        super(logger.subLogger('ContentEntriesMainViewService'), browserService, router, titleService, contextualHelpService);
    }

    isAvailable(): boolean {
        return this._appPermissions.hasAnyPermissions([
            KMCPermissions.CONTENT_MANAGE_BASE,
            KMCPermissions.CONTENT_MANAGE_METADATA,
            KMCPermissions.CONTENT_MANAGE_ASSIGN_CATEGORIES,
            KMCPermissions.CONTENT_MANAGE_THUMBNAIL,
            KMCPermissions.CONTENT_MANAGE_SCHEDULE,
            KMCPermissions.CONTENT_MANAGE_ACCESS_CONTROL,
            KMCPermissions.CONTENT_MANAGE_CUSTOM_DATA,
            KMCPermissions.CONTENT_MANAGE_EMBED_CODE,
            KMCPermissions.CONTENT_MANAGE_DELETE,
            KMCPermissions.CONTENT_MANAGE_RECONVERT
        ]);
    }

    getRoutePath(): string {
        return 'content/entries';
    }

    getViewMetadata(): ViewMetadata {
        return {
            viewKey: 'content-entries',
            title: this._appLocalization.get('app.titles.contentEntriesPageTitle'),
            menu: this._appLocalization.get('app.titles.contentEntriesMenuTitle')
        };
    }
}
