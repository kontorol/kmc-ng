import { Injectable, OnDestroy } from '@angular/core';
import { KontorolClient } from 'kontorol-ngx-client';
import { BulkListAction } from 'kontorol-ngx-client';
import { KontorolBatchJobStatus } from 'kontorol-ngx-client';
import { KontorolBulkUploadFilter } from 'kontorol-ngx-client';
import { Observable } from 'rxjs';
import { KontorolBulkUploadListResponse } from 'kontorol-ngx-client';
import { KmcServerPolls } from 'app-shared/kmc-shared/server-polls';
import { BulkLogUploadingStartedEvent } from 'app-shared/kmc-shared/events';
import { AppEventsService } from 'app-shared/kmc-shared';
import { BrowserService } from 'app-shared/kmc-shell/providers';
import { KontorolDetachedResponseProfile } from 'kontorol-ngx-client';
import { KontorolResponseProfileType } from 'kontorol-ngx-client';
import { KontorolBulkUpload } from 'kontorol-ngx-client';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UploadMonitorStatuses } from './upload-monitor.component';
import { KontorolBulkUploadObjectType } from 'kontorol-ngx-client';
import { BulkUploadRequestFactory } from './bulk-upload-request-factory';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';

interface BulkUploadFile
{
  status: KontorolBatchJobStatus;
  uploadedOn: Date;
  id: number;
}

interface TrackedBulkUploadFile extends BulkUploadFile
{
    allowPurging: boolean;
}

@Injectable()
export class BulkUploadMonitorService implements OnDestroy {
    private _bulkUploadFiles: { [key: string]: TrackedBulkUploadFile } = {};

    private _initializeState: null | 'busy' | 'succeeded' | 'failed' = null;
    private _poolingState: null | 'running' = null;

    private _totals = {
        data: new BehaviorSubject<UploadMonitorStatuses>({uploading: 0, queued: 0, completed: 0, errors: 0}),
        state: new BehaviorSubject<{ loading: boolean, error: boolean, isErrorRecoverable?: boolean }>({
            loading: false,
            error: false,
            isErrorRecoverable: false
        })
    };
    public readonly totals = {data$: this._totals.data.asObservable(), state$: this._totals.state.asObservable()};

    private _bulkUploadChangesFactory = new BulkUploadRequestFactory();
    private _bulkUploadObjectTypeIn = [
        KontorolBulkUploadObjectType.entry,
        KontorolBulkUploadObjectType.category,
        KontorolBulkUploadObjectType.user,
        KontorolBulkUploadObjectType.categoryUser
    ];
    private _activeStatuses = [
        KontorolBatchJobStatus.dontProcess,
        KontorolBatchJobStatus.pending,
        KontorolBatchJobStatus.queued,
        KontorolBatchJobStatus.processing,
        KontorolBatchJobStatus.almostDone,
        KontorolBatchJobStatus.retry
    ];

    constructor(private _kontorolClient: KontorolClient,
                private _kmcServerPolls: KmcServerPolls,
                private _appEvents: AppEventsService,
                private _browserService: BrowserService,
                private _logger: KontorolLogger) {
        this._logger.debug('constructor()');
        this._logger.debug(`registering to app event 'BulkLogUploadingStartedEvent'`);
        this._appEvents
            .event(BulkLogUploadingStartedEvent)
            .pipe(cancelOnDestroy(this))
            .subscribe(({id, status, uploadedOn}) => {
                this._logger.debug(`handling app event 'BulkLogUploadingStartedEvent. { id: '${id}' }`);
                this._trackNewFile({id, status, uploadedOn});
                this._totals.data.next(this._calculateTotalsFromState());
            });

        this._initTracking();
    }

    private _trackNewFile(file: BulkUploadFile) {
        this._logger.debug(`tracking new file with id: '${file.id}'`);
        if (this._bulkUploadFiles[file.id]) {
            this._logger.warn(`cannot track new file with id: '${file.id}'. a file with such id already exists`);
        } else {
            this._bulkUploadFiles[file.id] = {id: file.id, status: file.status, uploadedOn: file.uploadedOn, allowPurging: false};
        }
    }

    private _getTrackedFiles(): TrackedBulkUploadFile[] {
        return Object.keys(this._bulkUploadFiles).map(key => this._bulkUploadFiles[key]);
    }

    ngOnDestroy() {
        this._logger.debug('ngOnDestroy()');
        this._totals.data.complete();
        this._totals.state.complete();
    }

    private _calculateTotalsFromState(): UploadMonitorStatuses {

        if (this._initializeState !== 'succeeded') {
            return {uploading: 0, queued: 0, completed: 0, errors: 0};
        } else {
            return this._getTrackedFiles().reduce((totals, upload) => {
                switch (upload.status) {
                    case KontorolBatchJobStatus.pending:
                    case KontorolBatchJobStatus.queued:
                    case KontorolBatchJobStatus.dontProcess:
                        totals.queued += 1;
                        break;
                    case KontorolBatchJobStatus.processing:
                    case KontorolBatchJobStatus.almostDone:
                    case KontorolBatchJobStatus.retry:
                        totals.uploading += 1;
                        break;
                    case KontorolBatchJobStatus.finished:
                    case KontorolBatchJobStatus.finishedPartially:
                    case KontorolBatchJobStatus.processed:
                        totals.completed += 1;
                        break;
                    case KontorolBatchJobStatus.failed:
                    case KontorolBatchJobStatus.fatal:
                    case KontorolBatchJobStatus.aborted:
                    case KontorolBatchJobStatus.movefile:
                        totals.errors += 1;
                        break;
                    default:
                        break;
                }

                return totals;
            }, {uploading: 0, queued: 0, completed: 0, errors: 0});
        }
    }

    private _getActiveUploadsList(): Observable<KontorolBulkUploadListResponse> {
        const activeUploads = new BulkListAction({
            bulkUploadFilter: new KontorolBulkUploadFilter({
                statusIn: this._activeStatuses.join(','),
                bulkUploadObjectTypeIn: this._bulkUploadObjectTypeIn.join(','),
            })
        }).setRequestOptions({
            responseProfile: new KontorolDetachedResponseProfile({
                type: KontorolResponseProfileType.includeFields,
                fields: 'id,status,uploadedOn'
            })
        });

        return this._kontorolClient.request(activeUploads);
    }

    private _cleanDeletedUploads(uploads: KontorolBulkUpload[]): void {
        const uploadIds = uploads.map(({id}) => id);
        this._getTrackedFiles().forEach(file => {
            const trackedUploadIsNotInResponse = uploadIds.indexOf(Number(file.id)) === -1;
            if (file.allowPurging && trackedUploadIsNotInResponse) {
                this._logger.info(`server poll returned without upload with id '${file.id}'. removing file from tracking list`);
                delete this._bulkUploadFiles[file.id];
            }
        })
    }

    private _initTracking(): void {

        if (this._initializeState === 'failed' || this._initializeState === null) {
            this._logger.info(`getting active uploads status from server`);
            this._initializeState = 'busy';
            this._totals.state.next({loading: true, error: false});

            this._getActiveUploadsList()
                .subscribe(
                    response => {
                        this._logger.debug(`syncing tracking file list from server. got ${response.objects.length} files to track`);
                        response.objects.forEach(upload => {
                            this._trackNewFile(upload);
                        });

                        this._updateServerQueryUploadedOnFilter();

                        this._totals.state.next({loading: false, error: false});
                        this._initializeState = 'succeeded';
                        this._startPolling();
                    },
                    () => {
                        this._totals.state.next({loading: false, error: true, isErrorRecoverable: true});
                        this._initializeState = 'failed';
                    }
                );
        } else {
            this._logger.info( `everything is operating normally, no need to re-initialize`);
        }
    }

    private _updateServerQueryUploadedOnFilter(): void{
        const oldestUploadedOnFile = this._getTrackedFiles().reduce((acc, item) => !acc || item.uploadedOn < acc.uploadedOn ?  item : acc, null);
        const uploadedOnFrom = oldestUploadedOnFile ? oldestUploadedOnFile.uploadedOn : this._browserService.sessionStartedAt;
        if (this._bulkUploadChangesFactory.uploadedOn !== uploadedOnFrom) {
            this._logger.debug(`updating poll server query request with uploadedOn from ${uploadedOnFrom && uploadedOnFrom.toString()}`);
            this._bulkUploadChangesFactory.uploadedOn = uploadedOnFrom;
        }
    }

    private _startPolling(): void {

        if (this._poolingState !== 'running') {
            this._poolingState = 'running';
            this._logger.info(`start server polling every 30 seconds to sync bulk upload status`);


            this._kmcServerPolls.register<KontorolBulkUploadListResponse>(30, this._bulkUploadChangesFactory)
                .pipe(cancelOnDestroy(this))
                .subscribe((response) => {
                    if (response.error) {
                        this._logger.warn(`error occurred while trying to sync bulk upload status from server. server error: ${response.error.message}`);
                        this._totals.state.next({loading: false, error: true, isErrorRecoverable: false});
                        return;
                    }

                    const serverFiles = response.result.objects;



                    if (serverFiles.length > 0) {
                        this._cleanDeletedUploads(serverFiles);
                        this._updateTrackedFilesFromServer(serverFiles);
                        this._updateServerQueryUploadedOnFilter();
                        this._updateAllowPurgingMode();
                        this._totals.data.next(this._calculateTotalsFromState());
                    }else {
                        this._cleanDeletedUploads(serverFiles);
                        this._updateAllowPurgingMode();
                        this._totals.data.next(this._calculateTotalsFromState());
                    }

                    if (this._totals.state.getValue().error) {
                        this._totals.state.next({loading: false, error: false});
                    }
                });
        }
    }

    private _updateAllowPurgingMode(): void{
        this._getTrackedFiles().filter(item => !item.allowPurging).forEach(file => {
            this._logger.debug(`update file '${file.id} to allow purging next time syncing from the server`);
            file.allowPurging = true;
        });
    }

    private _updateTrackedFilesFromServer(serverFiles: BulkUploadFile[]): void{
        serverFiles.forEach(upload => {
            const currentUploadIsActive = this._activeStatuses.indexOf(upload.status) !== -1;
            const relevantUpload = this._bulkUploadFiles[upload.id];

            if (relevantUpload) { // update status for existing upload
                if (relevantUpload.status !== upload.status) {
                    this._logger.info(`sync upload file '${upload.id} with status '${upload.status}'`);
                    relevantUpload.status = upload.status;
                }
            } else if (currentUploadIsActive) { // track new active upload
                this._trackNewFile({
                    id: upload.id,
                    status: upload.status,
                    uploadedOn: upload.uploadedOn
                });
            }
        });

    }

    public retryTracking(): void {
        this._logger.debug(`retryTracking()`);

        this._initTracking();
    }
}
