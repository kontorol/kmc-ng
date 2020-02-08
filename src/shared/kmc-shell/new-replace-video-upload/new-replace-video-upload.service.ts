import { Injectable, OnDestroy } from '@angular/core';
import { KontorolClient } from 'kontorol-ngx-client';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { TrackedFileStatuses, UploadManagement } from '@kontorol-ng/kontorol-common';
import { NewReplaceVideoUploadFile } from './new-replace-video-upload-file';
import { KontorolUploadedFileTokenResource } from 'kontorol-ngx-client';
import { KontorolAssetParamsResourceContainer } from 'kontorol-ngx-client';
import { KontorolAssetsParamsResourceContainers } from 'kontorol-ngx-client';
import { MediaUpdateContentAction } from 'kontorol-ngx-client';
import { UploadTokenDeleteAction } from 'kontorol-ngx-client';
import { TrackedFileData } from '@kontorol-ng/kontorol-common';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';
import { KontorolUrlResource } from 'kontorol-ngx-client';
import { Subject } from 'rxjs/Subject';
import { MediaCancelReplaceAction } from 'kontorol-ngx-client';
import { BrowserService } from 'app-shared/kmc-shell';
import { KontorolRemoteStorageResource } from 'kontorol-ngx-client';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';

export interface KmcNewReplaceEntryLink {
    url: string;
    assetParamsId: number;
}

export interface KmcNewReplaceEntryUpload {
    file: File;
    assetParamsId: number;
}

export interface KmcNewReplaceEntryImport {
    url: string;
    assetParamsId: number;
}

@Injectable()
export class NewReplaceVideoUploadService implements OnDestroy {
    private _mediaUpdated = new Subject<string>();

    private _preparedFilesList: {
        [entryId: string]: {
            files: TrackedFileData[],
            count: number
        }
    } = {};

    constructor(private _kontorolServerClient: KontorolClient,
                private _uploadManagement: UploadManagement,
                private _browserService: BrowserService,
                private _appLocalization: AppLocalization,
                private _logger: KontorolLogger) {
        this._logger = _logger.subLogger('NewReplaceVideoUploadService');
        this._monitorTrackedFilesChanges();
    }

    ngOnDestroy() {
        this._mediaUpdated.complete();
    }

    private _monitorTrackedFilesChanges(): void {
        this._uploadManagement.onTrackedFileChanged$
            .pipe(cancelOnDestroy(this))
            .filter(trackedFile => trackedFile.data instanceof NewReplaceVideoUploadFile)
            .subscribe(
                trackedFile => {
                    switch (trackedFile.status) {
                        case TrackedFileStatuses.cancelled:
                            this._cancelReplacement(trackedFile);
                            break;
                        case TrackedFileStatuses.purged:
                            this._cleanupUpload(trackedFile);
                            break;
                        case TrackedFileStatuses.prepared:
                            this._updatePreparedFilesList(trackedFile);
                            break;
                        default:
                            break;
                    }
                }
            );
    }

    private _cancelReplacement(trackedFile: TrackedFileData): void {
        const entryId = (<NewReplaceVideoUploadFile>trackedFile.data).entryId;

        this._uploadManagement.getTrackedFiles()
            .filter(file => file.data instanceof NewReplaceVideoUploadFile && file.data.entryId === entryId)
            .forEach(file => this._cancelUpload(file));

        this._kontorolServerClient.request(new MediaCancelReplaceAction({ entryId }))
            .pipe(cancelOnDestroy(this))
            .pipe(tag('block-shell'))
            .subscribe(
                () => {
                },
                error => {
                    this._browserService.alert({
                        header: this._appLocalization.get('app.common.error'),
                        message: error.message
                    });
                }
            );
    }

    private _updatePreparedFilesList(trackedFileData: TrackedFileData): void {
        const file = <NewReplaceVideoUploadFile>trackedFileData.data;
        const filesList = this._preparedFilesList[file.entryId];

        if (!filesList) {
            return;
        }

        filesList.files.push(trackedFileData);

        if (filesList.count === filesList.files.length) {
            this._updateMediaContent(file.entryId, filesList.files);
        }
    }

    private _cancelUpload(trackedFile: TrackedFileData): void {
        this._uploadManagement.cancelUpload(trackedFile.id, true);
    }

    private _cleanupUpload(trackedFile: TrackedFileData): void {
        const trackedFileData = <NewReplaceVideoUploadFile>trackedFile.data;

        if (trackedFileData.createMediaEntrySubscription instanceof Subscription) {
            trackedFileData.createMediaEntrySubscription.unsubscribe();
            trackedFileData.createMediaEntrySubscription = null;
        }

        if (trackedFileData.serverUploadToken) {
            this._removeUploadToken(trackedFileData.serverUploadToken)
                .subscribe(
                    () => {
                    },
                    (error) => {
                        this._logger.warn(this._formatError('Failed to remove upload token', error));
                    }
                );
        }
    }

    private _updateMediaContent(entryId: string, trackedFiles: TrackedFileData[]): void {
        const files = <NewReplaceVideoUploadFile[]>trackedFiles.map(({ data }) => data);
        const conversionProfileId = files[0].transcodingProfileId;
        const resource = new KontorolAssetsParamsResourceContainers({
            resources: files.map(file => {
                const subSubResource = new KontorolUploadedFileTokenResource({ token: file.serverUploadToken });
                return new KontorolAssetParamsResourceContainer({ resource: subSubResource, assetParamsId: file.assetParamsId || 0 });
            })
        });

        this._kontorolServerClient.request(new MediaUpdateContentAction({ entryId, resource, conversionProfileId }))
            .subscribe(
                () => {
                    this._mediaUpdated.next(entryId);
                    delete this._preparedFilesList[entryId];
                },
                (error) => {
                    this._mediaUpdated.error(error);

                    trackedFiles.forEach(trackedFile => {
                        this._uploadManagement.cancelUploadWithError(trackedFile.id, this._formatError('Failed to create entry', error));
                    });
                }
            );
    }

    private _removeUploadToken(uploadTokenId: string): Observable<void> {
        return this._kontorolServerClient.request(new UploadTokenDeleteAction({ uploadTokenId }));
    }

    private _formatError(message: string, error: string | { message: string }): string {
        const errorMessage = typeof error === 'string' ? error : error && error.message ? error.message : 'unknown reason';
        return `${message}: ${errorMessage}`;
    }

    public upload(files: KmcNewReplaceEntryUpload[], entryId: string, flavorParamsId: number): Observable<string> {
        this._preparedFilesList[entryId] = { count: files.length, files: [] };

        this._uploadManagement.addFiles(
            files.map(file =>
                new NewReplaceVideoUploadFile(file.file, file.assetParamsId, flavorParamsId, entryId)
            )
        );

        return this._mediaUpdated.asObservable();
    }

    public import(files: KmcNewReplaceEntryImport[], entryId: string, conversionProfileId: number): Observable<void> {
        const resources = files.map(file => {
            return new KontorolAssetParamsResourceContainer({
                resource: new KontorolUrlResource({ url: file.url }),
                assetParamsId: file.assetParamsId || 0
            });
        });
        const resource = new KontorolAssetsParamsResourceContainers({ resources });

        return this._kontorolServerClient
            .request(new MediaUpdateContentAction({ entryId, resource, conversionProfileId }))
            .map(() => {
            });
    }

    public cancelUploadByEntryId(entryId: string): void {
        this._uploadManagement.getTrackedFiles()
            .filter(file => file.data instanceof NewReplaceVideoUploadFile && file.data.entryId === entryId)
            .forEach(file => this._cancelUpload(file));
    }

    public link(files: KmcNewReplaceEntryLink[], entryId: string, conversionProfileId: number, storageProfileId: number): Observable<void> {
        const resources = files.map(file => {
            return new KontorolAssetParamsResourceContainer({
                resource: new KontorolRemoteStorageResource({ url: file.url, storageProfileId }),
                assetParamsId: file.assetParamsId || 0
            });
        });
        const resource = new KontorolAssetsParamsResourceContainers({ resources });

        return this._kontorolServerClient
            .request(new MediaUpdateContentAction({ entryId, resource, conversionProfileId }))
            .map(() => {
            });
    }
}
