import { Injectable, OnDestroy } from '@angular/core';
import {
    KontorolClient,
    KontorolEntryServerNode,
    KontorolEntryServerNodeListResponse,
    KontorolEntryServerNodeStatus,
    KontorolEntryServerNodeType,
    KontorolLiveStreamEntry,
    KontorolRecordingStatus,
    KontorolViewMode,
    LiveStreamUpdateAction
} from 'kontorol-ngx-client';
import { LiveDataRequestFactory } from './live-data-request-factory';
import { cancelOnDestroy } from '@kontorol-ng/kontorol-common';
import { map } from 'rxjs/operators';
import { KmcServerPolls } from 'app-shared/kmc-shared';
import { BehaviorSubject } from 'rxjs';
import { BrowserService } from 'app-shared/kmc-shell/providers';
import { AppLocalization } from '@kontorol-ng/mc-shared';


export interface KontorolExtendedLiveEntry extends KontorolLiveStreamEntry {
    redundancy: boolean;
    streamStatus: KontorolStreamStatus;
    serverType: KontorolEntryServerNodeType;
}

export enum KontorolStreamStatus {
    live = 'Live',
    initializing = 'Initializing',
    offline = 'Offline',
    preview = 'Preview'
}

@Injectable()
export class ToggleLiveService implements OnDestroy {
    private _isPolling = false;
    private _entry: KontorolExtendedLiveEntry;
    private _canToggle = new BehaviorSubject<boolean>(false);
    private _isPreview = new BehaviorSubject<boolean>(false);

    public readonly canToggle$ = this._canToggle.asObservable();
    public readonly isPreview$ = this._isPreview.asObservable();

    constructor(private _kmcServerPolls: KmcServerPolls,
                private _browserService: BrowserService,
                private _kontorolClient: KontorolClient,
                private _appLocalization: AppLocalization) {
    }

    ngOnDestroy(): void {
        this._canToggle.complete();
        this._isPreview.complete();
    }

    private _getStreamStatus(entryServerNodeStatus: KontorolEntryServerNodeStatus,
                             viewMode = KontorolViewMode.allowAll): KontorolStreamStatus {
        switch (entryServerNodeStatus) {
            case KontorolEntryServerNodeStatus.authenticated:
            case KontorolEntryServerNodeStatus.broadcasting:
                return KontorolStreamStatus.initializing;

            case KontorolEntryServerNodeStatus.playable:
                return (viewMode === KontorolViewMode.preview) ? KontorolStreamStatus.preview : KontorolStreamStatus.live;

            case KontorolEntryServerNodeStatus.stopped:
            default:
                return KontorolStreamStatus.offline;
        }
    }

    private _getRedundancyStatus(serverNodeList: KontorolEntryServerNode[]): boolean {
        if (serverNodeList.length > 1) {
            return serverNodeList.every(sn => sn.status !== KontorolEntryServerNodeStatus.markedForDeletion);
        }
        return false;
    }

    // Possible scenarios for streamStatus:
    // (1) If only primary -> StreamStatus equals primary status
    // (2) If only secondary -> StreamStatus equals secondary status
    // (3) If both -> StreamStatus equals the same as recent active
    private _setStreamStatus(liveEntry: KontorolExtendedLiveEntry, serverNodeList: KontorolEntryServerNode[]): void {
        const viewMode = liveEntry.explicitLive ? liveEntry.viewMode : null;
        let result: { status: KontorolStreamStatus, serverType: KontorolEntryServerNodeType } = {
            status: this._getStreamStatus(KontorolEntryServerNodeStatus.stopped),
            serverType: null,
        };

        if (liveEntry.redundancy) {
            if (!liveEntry.serverType || (KontorolEntryServerNodeType.livePrimary === liveEntry.serverType)) {
                result = {
                    status: this._getStreamStatus(serverNodeList[0].status, viewMode),
                    serverType: KontorolEntryServerNodeType.livePrimary,
                };
            } else if (KontorolEntryServerNodeType.liveBackup === liveEntry.serverType) {
                result = {
                    status: this._getStreamStatus(serverNodeList[1].status, viewMode),
                    serverType: KontorolEntryServerNodeType.liveBackup,
                };
            }
        } else {
            if (serverNodeList.length) {
                const sn = serverNodeList.find(esn => esn.status !== KontorolEntryServerNodeStatus.markedForDeletion);
                if (sn) {
                    result = {
                        status: this._getStreamStatus(sn.status, viewMode),
                        serverType: sn.serverType,
                    };
                }
            }
        }

        liveEntry.streamStatus = result.status;
        liveEntry.serverType = result.serverType;
    }

    private _extendEntry(entry: KontorolExtendedLiveEntry, updatedEntry: KontorolLiveStreamEntry, nodes: KontorolEntryServerNode[]): void {
        const liveEntry = Object.assign(entry, {
            redundancy: this._getRedundancyStatus(nodes),
            streamStatus: entry.streamStatus || KontorolStreamStatus.offline,
            serverType: entry.serverType || null,
        });
        this._setStreamStatus(liveEntry, nodes);

        entry.recordStatus = updatedEntry.hasOwnProperty('recordStatus') ? updatedEntry.recordStatus : entry.recordStatus;
        entry.viewMode = updatedEntry.hasOwnProperty('viewMode') ? updatedEntry.viewMode : entry.viewMode;
    }

    private _updateIsPreview(entry: KontorolLiveStreamEntry): void {
        this._isPreview.next(entry.viewMode === KontorolViewMode.preview);
    }

    private _updatePreviewMode(viewMode: KontorolViewMode, recordingStatus: KontorolRecordingStatus): void {
        this._canToggle.next(false);

        this._kontorolClient.request(
            new LiveStreamUpdateAction({
                entryId: this._entry.id,
                liveStreamEntry: new KontorolLiveStreamEntry({ viewMode, recordingStatus })
            })
        )
            .subscribe(
                (entry: KontorolLiveStreamEntry) => {
                    this._entry.viewMode = entry.viewMode;
                    this._entry.recordingStatus = entry.recordingStatus;

                    this._updateIsPreview(entry);

                    this._canToggle.next(true);
                },
                error => {
                    this._browserService.alert({ message: error.message });

                    this._canToggle.next(true);
                });
    }

    public startPolling(liveEntry: KontorolLiveStreamEntry): void {
        if (liveEntry && !this._isPolling) {
            this._isPolling = true;
            this._entry = liveEntry as KontorolExtendedLiveEntry;

            this._updateIsPreview(liveEntry);

            this._kmcServerPolls.register<KontorolEntryServerNodeListResponse>(10, new LiveDataRequestFactory(liveEntry.id))
                .pipe(
                    cancelOnDestroy(this),
                    map(responses => {
                        if (responses.error) {
                            return { entry: {}, nodes: [] };
                        }
                        const entryResponse = responses.result[0];
                        const nodesResponse = responses.result[1];

                        return {
                            entry: entryResponse.result || {},
                            nodes: nodesResponse.result ? nodesResponse.result.objects : [],
                        };
                    })
                )
                .subscribe(({ entry, nodes }) => {
                    this._extendEntry(this._entry, entry, nodes);
                    this._updateIsPreview(this._entry);

                    const isBroadcasting = [KontorolStreamStatus.live, KontorolStreamStatus.preview].indexOf(this._entry.streamStatus) !== -1;
                    this._canToggle.next(isBroadcasting);
                });
        }
    }

    public toggle() {
        if (this._entry.viewMode === KontorolViewMode.preview) {
            this._updatePreviewMode(KontorolViewMode.allowAll, KontorolRecordingStatus.active);
        } else {
            this._browserService.confirm(
                {
                    header: this._appLocalization.get('applications.content.entryDetails.live.endLiveHeader'),
                    message: this._appLocalization.get('applications.content.entryDetails.live.endLiveMessage'),
                    acceptLabel: this._appLocalization.get('applications.content.entryDetails.live.endLive'),
                    accept: () => {
                        this._updatePreviewMode(KontorolViewMode.preview, KontorolRecordingStatus.stopped);
                    }
                });
        }
    }
}
