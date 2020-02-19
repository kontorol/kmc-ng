import { Injectable } from '@angular/core';
import {
    EntryWidget
} from '../entry-widget';
import { KontorolClient } from 'kontorol-ngx-client';
import { AppAuthentication } from 'app-shared/kmc-shell';
import { subApplicationsConfig } from 'config/sub-applications';
import { KontorolMediaEntry } from 'kontorol-ngx-client';
import { KontorolSourceType } from 'kontorol-ngx-client';
import {KontorolLogger} from '@kontorol-ng/kontorol-logger';

@Injectable()
export class EntryDetailsWidget extends EntryWidget
{
    public _landingPage : string;

    constructor(
                kontorolServerClient: KontorolClient,
                private appAuthentication: AppAuthentication,
                logger: KontorolLogger)

    {
        super('entryDetails', logger);
    }


    /**
     * Do some cleanups if needed once the section is removed
     */
    protected onReset()
    {

    }

    protected onActivate(firstTimeActivating: boolean) {
        const entry: KontorolMediaEntry = this.data;

	    this._landingPage = null;

        let landingPage = this.appAuthentication.appUser.partnerInfo.landingPage;
        if (landingPage) {
	        landingPage = landingPage.replace("{entryId}", entry.id);
	        if (landingPage.indexOf("http") !== 0){
	            landingPage = "http://" + landingPage;
            }
        }
        this._landingPage = landingPage;
    }
}
