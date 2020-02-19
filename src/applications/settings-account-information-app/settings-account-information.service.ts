import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KontorolClient } from 'kontorol-ngx-client';
import { KontorolPartnerStatistics } from 'kontorol-ngx-client';
import { PartnerGetStatisticsAction } from 'kontorol-ngx-client';
import { serverConfig } from 'config/server';

@Injectable()
export class SettingsAccountInformationService {

    constructor(private _http: HttpClient, private _kontorolServerClient: KontorolClient) {
    }

    public canContactSalesForceInformation(): boolean {
        try {
            return !!serverConfig.externalLinks.kontorol && !!serverConfig.externalLinks.kontorol.contactSalesforce;
        } catch (ex) {
            return false;
        }
    }

    public sendContactSalesForceInformation(data: string): Observable<void> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
        try {
            return this._http
                .post(serverConfig.externalLinks.kontorol.contactSalesforce, data, httpOptions)
                .map(() => undefined);
        } catch (ex) {
            return Observable.throw(new Error('An error occurred while trying to contact SalesForce'));
        }
    }

    public getStatistics(): Observable<KontorolPartnerStatistics> {
        return this._kontorolServerClient.request(new PartnerGetStatisticsAction());
    }
}
