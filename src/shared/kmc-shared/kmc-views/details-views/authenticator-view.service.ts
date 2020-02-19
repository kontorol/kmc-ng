import { Injectable } from '@angular/core';
import { KMCPermissionsService } from '../../kmc-permissions';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/fromPromise';
import { ActivatedRoute, Router } from '@angular/router';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import {
    DetailsViewMetadata,
    KmcDetailsViewBaseService
} from 'app-shared/kmc-shared/kmc-views/kmc-details-view-base.service';
import { BrowserService } from 'app-shared/kmc-shell/providers/browser.service';
import { Title } from '@angular/platform-browser';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';
import { ContextualHelpService } from 'app-shared/kmc-shared/contextual-help/contextual-help.service';

export interface AuthenticatorViewArgs {
    hash: string;
}


@Injectable()
export class AuthenticatorViewService extends KmcDetailsViewBaseService<AuthenticatorViewArgs> {

    constructor(private _appPermissions: KMCPermissionsService,
                private _appLocalization: AppLocalization,
                private _router: Router,
                _browserService: BrowserService,
                _logger: KontorolLogger,
                _titleService: Title,
                _contextualHelpService: ContextualHelpService) {
        super(_logger.subLogger('AuthenticatorViewService'), _browserService,
            _titleService, _contextualHelpService);
    }

    getViewMetadata(args: AuthenticatorViewArgs): DetailsViewMetadata {
        const title = this._appLocalization.get('app.titles.authenticatorPageTitle');
        return {
            title,
            viewKey: 'authenication'
        };
    }
    isAvailable(args: AuthenticatorViewArgs): boolean {
        const hasHash = args && !!args.hash;
        this._logger.info(`handle isAvailable action by user`, { hasHash });
        return hasHash;
    }

    protected _open(args: AuthenticatorViewArgs): Observable<boolean> {
        this._logger.info('handle open view request by the user', {hash: args.hash});
        return this._browserService.navigateToLoginWithStatus();
    }
}
