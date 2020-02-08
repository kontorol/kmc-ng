import {Injectable, OnDestroy} from '@angular/core';
import { Observable } from 'rxjs';
import {PartnerProfileStore} from '../partner-profile';
import 'rxjs/add/observable/throw';
import {KontorolClient} from 'kontorol-ngx-client';
import {FlavorParamsListAction} from 'kontorol-ngx-client';
import {KontorolFlavorParams} from 'kontorol-ngx-client';
import {KontorolFilterPager} from 'kontorol-ngx-client';
import {KontorolFlavorParamsListResponse} from 'kontorol-ngx-client';
import {KontorolDetachedResponseProfile} from 'kontorol-ngx-client';
import {KontorolResponseProfileType} from 'kontorol-ngx-client';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';

@Injectable()
export class FlavoursStore extends PartnerProfileStore implements OnDestroy {

  private _getFlavorsFilters$: Observable<{ items: KontorolFlavorParams[] }>;

  constructor(private _kontorolServerClient: KontorolClient) {
    super();
  }

  public get(): Observable<{ items: KontorolFlavorParams[] }> {
    if (!this._getFlavorsFilters$) {
      // execute the request
      this._getFlavorsFilters$ = this._buildGetRequest()
        .pipe(cancelOnDestroy(this))
        .map(
          response => {
            return ({items: response ? response.objects : []});
          })
        .catch(error => {
            // re-throw the provided error
            this._getFlavorsFilters$ = null;
            return Observable.throw(new Error('failed to retrieve flavors list'));
        })
        .publishReplay(1)
        .refCount();
    }

    return this._getFlavorsFilters$;
  }

  ngOnDestroy()
  {
  }

  private _buildGetRequest(): Observable<KontorolFlavorParamsListResponse> {

    const responseProfile: KontorolDetachedResponseProfile = new KontorolDetachedResponseProfile(
      {
        fields: 'id,format,name,width,height,videoCodec,audioBitrate,videoBitrate,tags',
        type: KontorolResponseProfileType.includeFields
      }
    );

    const favourParamsPager = new KontorolFilterPager();
    favourParamsPager.pageSize = 500;

    return this._kontorolServerClient.request(new FlavorParamsListAction({pager: favourParamsPager})
        .setRequestOptions({
            responseProfile
        }));
  }
}
