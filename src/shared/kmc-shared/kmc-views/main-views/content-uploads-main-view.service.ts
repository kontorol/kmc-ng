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
export class ContentUploadsMainViewService extends KmcMainViewBaseService {

    constructor(
        logger: KontorolLogger,
        browserService: BrowserService,
        router: Router,
        private _appPermissions: KMCPermissionsService,
        private _appLocalization: AppLocalization,
        titleService: Title,
        contextualHelpService: ContextualHelpService
    ) {
        super(logger.subLogger('ContentUploadsMainViewService'), browserService, router, titleService, contextualHelpService);
    }

    isAvailable(): boolean {
        return this._appPermissions.hasAnyPermissions([
            KMCPermissions.CONTENT_INGEST_BASE,
            KMCPermissions.CONTENT_INGEST_UPLOAD,
            KMCPermissions.CONTENT_INGEST_BULK_UPLOAD
        ]);
    }

    getRoutePath(): string {
        return 'content/upload-control';
    }

    getViewMetadata(): ViewMetadata {
        return {
            viewKey: 'content-uploads',
            title: this._appLocalization.get('app.titles.contentUploadsPageTitle'),
            menu: this._appLocalization.get('app.titles.contentUploadsMenuTitle')
        };
    }
}
