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
export class ContentDropFoldersMainViewService extends KmcMainViewBaseService {

    constructor(
        logger: KontorolLogger,
        browserService: BrowserService,
        router: Router,
        private _appPermissions: KMCPermissionsService,
        private _appLocalization: AppLocalization,
        titleService: Title,
        contextualHelpService: ContextualHelpService
    ) {
        super(logger.subLogger('ContentDropFoldersMainViewService'), browserService, router, titleService, contextualHelpService);
    }

    isAvailable(): boolean {
        return this._appPermissions.hasAnyPermissions([
            KMCPermissions.DROPFOLDER_CONTENT_INGEST_DROP_FOLDER_BASE
        ]);
    }

    getRoutePath(): string {
        return 'content/drop-folders';
    }

    getViewMetadata(): ViewMetadata {
        return {
            viewKey: 'content-drop-folders',
            title: this._appLocalization.get('app.titles.contentDropFoldersPageTitle'),
            menu: this._appLocalization.get('app.titles.contentDropFoldersMenuTitle')
        };
    }
}
