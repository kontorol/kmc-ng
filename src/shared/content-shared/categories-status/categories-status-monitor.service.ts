import { Injectable, OnDestroy } from '@angular/core';
import { KontorolFeatureStatusListResponse } from 'kontorol-ngx-client';
import { KontorolFeatureStatusType } from 'kontorol-ngx-client';
import { KmcServerPolls } from 'app-shared/kmc-shared/server-polls';
import { modulesConfig } from 'config/modules';
import { CategoriesStatusRequestFactory } from './categories-status-request-factory';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { KontorolFeatureStatus } from 'kontorol-ngx-client';
import { PollInterval } from '@kontorol-ng/kontorol-common';
import { KontorolClient } from 'kontorol-ngx-client';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';

export interface CategoriesStatus {
    lock: boolean;
    update: boolean;
}

@Injectable()
export class CategoriesStatusMonitorService implements OnDestroy {

    private _pollingState: null | 'running' = null;
    private _pollingInterval: PollInterval = <PollInterval>modulesConfig.contentShared.categories.categoriesStatusSampleInterval;
    private _currentStatus = { lock: null, update: null };

    private _status = new ReplaySubject<CategoriesStatus>(1);
    public readonly status$ = this._status.asObservable();
    private _logger: KontorolLogger;

    private _categoriesStatusRequestFactory = new CategoriesStatusRequestFactory();


    constructor( private _kmcServerPolls: KmcServerPolls, private _kontorolClient: KontorolClient, _logger: KontorolLogger ) {
        this._logger = _logger.subLogger('categoriesStatusMonitor');
        this._logger.debug('constructor()');
        this._startPolling();
    }


    ngOnDestroy() {
        this._logger.debug('ngOnDestroy()');
        this._status.complete();
    }

    private _startPolling(): void {
        if (this._pollingState !== 'running') {
            this._pollingState = 'running';
            this._logger.info(`start server polling every ${this._pollingInterval} seconds to get categories status`);

            this._kmcServerPolls.register<KontorolFeatureStatusListResponse>(this._pollingInterval , this._categoriesStatusRequestFactory)
                .pipe(cancelOnDestroy(this))
                .subscribe(response => {
                    this._handleResponse(response);
                });
        }
    }

    private _handleResponse(response): void{
        if (response.error) {
            this._logger.warn(`error occurred while trying to get categories status from server. server error: ${response.error.message}`);
            return;
        }
        let lockFlagFound = false;
        let updateFlagFound = false;

        const status: KontorolFeatureStatusListResponse = response.result;
        if (status && status.objects) {
            status.objects.forEach((kfs: KontorolFeatureStatus) => {
                switch (kfs.type) {
                    case KontorolFeatureStatusType.lockCategory:
                        lockFlagFound = true;
                        break;
                    case KontorolFeatureStatusType.category:
                        updateFlagFound = true;
                        break;
                }
            });
        }

        if (this._currentStatus.lock !== lockFlagFound || this._currentStatus.update !== updateFlagFound) {
            this._currentStatus =  { lock: lockFlagFound, update: updateFlagFound };
            this._status.next({lock: lockFlagFound, update: updateFlagFound});
            this._logger.info(`got new categories status: locked: ${lockFlagFound}, update: ${updateFlagFound}`);
        }
    }

    // API to invoke immediate categories status update
    public updateCategoriesStatus():void{
        this._kontorolClient.request(this._categoriesStatusRequestFactory.create()).pipe(cancelOnDestroy(this))
	        .subscribe(response => {
                this._handleResponse(response);
            });
    }
}
