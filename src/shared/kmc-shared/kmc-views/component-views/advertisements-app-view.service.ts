import { Injectable } from '@angular/core';
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

export interface AdvertisementsAppViewArgs {
    entry: KontorolMediaEntry;
    hasSource: boolean;
}

@Injectable()
export class AdvertisementsAppViewService extends KmcComponentViewBaseService<AdvertisementsAppViewArgs> {

    constructor(private _appLocalization: AppLocalization,
                private _kontorolClient: KontorolClient,
                private _router: Router,
                _browserService: BrowserService,
                _logger: KontorolLogger) {
        super(_logger.subLogger('AdvertisementsAppViewService'));
    }

    isAvailable(args: AdvertisementsAppViewArgs): boolean {
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

    private _isAvailableByData(args: AdvertisementsAppViewArgs): boolean {
        const { entry, hasSource} = args;
        const entryReady = entry.status === KontorolEntryStatus.ready;
        const isEntryReplacing = entry.replacementStatus !== KontorolEntryReplacementStatus.none;
        const isLiveEntry = entry.mediaType === KontorolMediaType.liveStreamFlash ||
            entry.mediaType === KontorolMediaType.liveStreamWindowsMedia ||
            entry.mediaType === KontorolMediaType.liveStreamRealMedia ||
            entry.mediaType === KontorolMediaType.liveStreamQuicktime;
        const isExternalMedia = entry instanceof KontorolExternalMediaEntry;
        const isEntryRelevant = [KontorolMediaType.video, KontorolMediaType.audio].indexOf(entry.mediaType) !== -1 && !isExternalMedia;

        const result = entryReady && !isEntryReplacing && isEntryRelevant && !isLiveEntry;

        this._logger.debug(`conditions used to check availability status by data`, () => (
            {
                result,
                hasSource,
                entryReady,
                isLiveEntry,
                isEntryReplacing,
                isExternalMedia,
                entryMediaType: entry.mediaType,
                isEntryRelevant
            }
        ));

        return result;
    }
}
