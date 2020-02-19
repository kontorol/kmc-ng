import { Injectable } from '@angular/core';
import { KMCPermissionsService, KMCPermissions } from '../../kmc-permissions';
import { Router } from '@angular/router';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { BrowserService } from 'app-shared/kmc-shell/providers/browser.service';
import { KontorolClient } from 'kontorol-ngx-client';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';
import { KmcComponentViewBaseService } from 'app-shared/kmc-shared/kmc-views/kmc-component-view-base.service';
import { serverConfig } from 'config/server';
import { KontorolMediaEntry } from 'kontorol-ngx-client';
import {KontorolEntryStatus} from 'kontorol-ngx-client';
import {KontorolEntryReplacementStatus} from 'kontorol-ngx-client';
import {KontorolExternalMediaEntry} from 'kontorol-ngx-client';
import {KontorolMediaType} from 'kontorol-ngx-client';
import { KontorolLiveEntry } from 'kontorol-ngx-client';

export interface HotspotsAppViewArgs {
    entry: KontorolMediaEntry | KontorolLiveEntry;
    hasSource: boolean;
}

@Injectable()
export class HotspotsAppViewService extends KmcComponentViewBaseService<HotspotsAppViewArgs> {

    constructor(private _appPermissions: KMCPermissionsService,
                private _appLocalization: AppLocalization,
                private _kontorolClient: KontorolClient,
                private _router: Router,
                _browserService: BrowserService,
                _logger: KontorolLogger) {
        super(_logger.subLogger('HotspotsAppViewService'));
    }

    isAvailable(args: HotspotsAppViewArgs): boolean {
        const availableByConfiguration = !!serverConfig.externalApps.editor;
        const availableByPermissions = this._isAvailableByPermission();
        const availableByData = this._isAvailableByData(args);
        const result = availableByConfiguration && availableByData && availableByPermissions;
        this._logger.info(
            `handle isAvailable action`,
            {
                availableByConfiguration,
                availableByPermissions,
                availableByData,
                result
            }
        );
        return result;
    }

    private _isAvailableByPermission(): boolean {
        return true;
    }

    private _isAvailableByData(args: HotspotsAppViewArgs): boolean {
        const { entry, hasSource} = args;
        const entryReady = entry.status === KontorolEntryStatus.ready;
        const isEntryReplacing = entry.replacementStatus !== KontorolEntryReplacementStatus.none;
        const isExternalMedia = entry instanceof KontorolExternalMediaEntry;
        const isEntryRelevant = [KontorolMediaType.video].indexOf(entry.mediaType) !== -1 && !isExternalMedia;
        const isLiveEntry = [
            KontorolMediaType.liveStreamFlash,
            KontorolMediaType.liveStreamWindowsMedia,
            KontorolMediaType.liveStreamRealMedia,
            KontorolMediaType.liveStreamQuicktime
        ].indexOf(entry.mediaType) !== -1;
        const isAvailableForMedia = !isLiveEntry && isEntryRelevant && hasSource && entryReady && !isEntryReplacing;
        const result = isAvailableForMedia;

        this._logger.trace(`conditions used to check availability status by data`, () => (
            {
                result,
                entryReady,
                hasSource,
                isLiveEntry,
                isEntryReplacing,
                isExternalMedia,
                entryMediaType: entry.mediaType,
                isEntryRelevant,
                isAvailableForMedia
            }
        ));

        return result;
    }


}
