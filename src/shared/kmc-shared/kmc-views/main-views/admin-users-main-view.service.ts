import { Injectable } from '@angular/core';
import { KMCPermissions, KMCPermissionsService } from '../../kmc-permissions';
import { KmcMainViewBaseService } from '../kmc-main-view-base.service';
import { Router } from '@angular/router';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';
import { BrowserService } from 'app-shared/kmc-shell/providers/browser.service';
import { ViewMetadata } from 'app-shared/kmc-shared/kmc-views/kmc-main-view-base.service';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { Title } from '@angular/platform-browser';
import { ContextualHelpService } from 'app-shared/kmc-shared/contextual-help/contextual-help.service';

@Injectable()
export class AdminUsersMainViewService extends KmcMainViewBaseService {

    constructor(
        logger: KontorolLogger,
        browserService: BrowserService,
        router: Router,
        private _appPermissions: KMCPermissionsService,
        private _appLocalization: AppLocalization,
        titleService: Title,
        contextualHelpService: ContextualHelpService
    ) {
        super(logger.subLogger('AdminUsersMainViewService'), browserService, router, titleService, contextualHelpService);
    }

    isAvailable(): boolean {
        return this._appPermissions.hasPermission(KMCPermissions.ADMIN_BASE) && this._appPermissions.hasAnyPermissions([
            KMCPermissions.ADMIN_USER_ADD,
            KMCPermissions.ADMIN_USER_UPDATE,
            KMCPermissions.ADMIN_USER_DELETE
        ]);
    }

    getRoutePath(): string {
        return 'administration/users/list';
    }

    getViewMetadata(): ViewMetadata {
        return {
            viewKey: 'admin-users',
            title: this._appLocalization.get('app.titles.administrationUsersPageTitle'),
            menu: this._appLocalization.get('app.titles.administrationUsersMenuTitle')
        };
    }
}
