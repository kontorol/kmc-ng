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

export interface ClipAndTrimAppViewArgs {
    entry: KontorolMediaEntry | KontorolLiveEntry;
    hasSource: boolean;
}

@Injectable()
export class ClipAndTrimAppViewService extends KmcComponentViewBaseService<ClipAndTrimAppViewArgs> {

    constructor(private _appPermissions: KMCPermissionsService,
                private _appLocalization: AppLocalization,
                private _kontorolClient: KontorolClient,
                private _router: Router,
                _browserService: BrowserService,
                _logger: KontorolLogger) {
        super(_logger.subLogger('ClipAndTrimAppViewService'));
    }

    isAvailable(args: ClipAndTrimAppViewArgs): boolean {
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
        return this._appPermissions.hasAnyPermissions([
            KMCPermissions.CONTENT_INGEST_CLIP_MEDIA,
            KMCPermissions.CONTENT_INGEST_INTO_READY
        ]);
    }

    private _isAvailableByData(args: ClipAndTrimAppViewArgs): boolean {
        const { entry, hasSource} = args;
        const entryReady = entry.status === KontorolEntryStatus.ready;
        const isEntryReplacing = entry.replacementStatus !== KontorolEntryReplacementStatus.none;
        const isExternalMedia = entry instanceof KontorolExternalMediaEntry;
        const isEntryRelevant = [KontorolMediaType.video, KontorolMediaType.audio].indexOf(entry.mediaType) !== -1 && !isExternalMedia;
        const isLiveEntry = [
            KontorolMediaType.liveStreamFlash,
            KontorolMediaType.liveStreamWindowsMedia,
            KontorolMediaType.liveStreamRealMedia,
            KontorolMediaType.liveStreamQuicktime
        ].indexOf(entry.mediaType) !== -1;
        const isAvailableForLive = isLiveEntry && !!(<KontorolLiveEntry>entry).recordedEntryId;
        const isAvailableForMedia = !isLiveEntry && isEntryRelevant && hasSource && entryReady && !isEntryReplacing;
        const result = isAvailableForMedia || isAvailableForLive;

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
                isAvailableForLive,
                isAvailableForMedia
            }
        ));

        return result;
    }


}
