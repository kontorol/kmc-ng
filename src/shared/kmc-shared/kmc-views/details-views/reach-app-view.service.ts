import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserService } from 'shared/kmc-shell/providers/browser.service';
import { KontorolCategory, KontorolEntryStatus, KontorolExternalMediaEntry, KontorolMediaEntry, KontorolMediaType } from 'kontorol-ngx-client';
import { serverConfig } from 'config/server';
import { KMCPermissions, KMCPermissionsService } from 'shared/kmc-shared/kmc-permissions/index';
import { DetailsViewMetadata, KmcDetailsViewBaseService } from 'app-shared/kmc-shared/kmc-views/kmc-details-view-base.service';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';
import { ContextualHelpService } from 'app-shared/kmc-shared/contextual-help/contextual-help.service';
import { Title } from '@angular/platform-browser';
import { AppEventsService } from 'app-shared/kmc-shared/app-events';
import { CaptionRequestEvent } from 'app-shared/kmc-shared/events';
import { Observable, of as ObservableOf } from 'rxjs';

export enum ReachPages {
    entry = 'entry',
    entries = 'entries',
    category = 'category',
    dashboard = 'dashboard'
}

export interface ReachAppViewArgs {
    entry?: KontorolMediaEntry;
    entries?: KontorolMediaEntry[];
    category?: KontorolCategory;
    page: ReachPages;
}

@Injectable()
export class ReachAppViewService extends KmcDetailsViewBaseService<ReachAppViewArgs> {

    constructor(private _appPermissions: KMCPermissionsService,
                private _appLocalization: AppLocalization,
                private _router: Router,
                private _appEvents: AppEventsService,
                _browserService: BrowserService,
                _logger: KontorolLogger,
                _titleService: Title,
                _contextualHelpService: ContextualHelpService) {
        super(_logger.subLogger('ReachAppViewService'), _browserService,
            _titleService, _contextualHelpService);
    }

    private _availableByPermission(args: ReachAppViewArgs): boolean {
        let _available: boolean = this._appPermissions.hasPermission(KMCPermissions.REACH_PLUGIN_PERMISSION);
        if (args.page === ReachPages.category) {
            _available = _available && this._appPermissions.hasPermission(KMCPermissions.CONTENT_MANAGE_EDIT_CATEGORIES);
        } else if (args.page === ReachPages.entry || args.page === ReachPages.entries){
            _available = _available && this._appPermissions.hasPermission(KMCPermissions.CAPTION_MODIFY);
        }
        return _available;
    }

    private _availableByData(args: ReachAppViewArgs): boolean {
        switch (args.page) {
            case ReachPages.entry:
                return this.isRelevantEntry(args.entry);
            case ReachPages.entries:
            case ReachPages.dashboard:
                return true; // since we build bulk actions menu before entries are selected, always allow by data
            case ReachPages.category:
                return args.category instanceof KontorolCategory;
            default:
                return false;
        }
    }

    public isRelevantEntry(entry: KontorolMediaEntry): boolean {
        if (entry) {
            const isVideoAudio = entry.mediaType === KontorolMediaType.video || entry.mediaType === KontorolMediaType.audio;
            const isReady = entry.status === KontorolEntryStatus.ready;
            return isReady && isVideoAudio;
        }
        return false;
    }

    protected _open(args: ReachAppViewArgs): Observable<boolean> {
        this._logger.info('handle open view request by the user', { page: args.page });
        const page = args.page;
        delete args.page;
        this._appEvents.publish(new CaptionRequestEvent(args, page));
        return ObservableOf(true);
    }

    public isAvailable(args: ReachAppViewArgs): boolean {
        const isAvailableByConfig = !!serverConfig.externalApps.reach;
        const isAvailableByPermission = this._availableByPermission(args);
        const isAvailableByData = this._availableByData(args);

        return isAvailableByConfig && isAvailableByData && isAvailableByPermission;
    }

    public getViewMetadata(args: ReachAppViewArgs): DetailsViewMetadata {
        return { title: '', viewKey: '' };
    }
}
