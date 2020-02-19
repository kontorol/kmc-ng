import {Injectable} from '@angular/core';
import {KontorolClient} from 'kontorol-ngx-client';
import { Observable } from 'rxjs';
import {ConversionProfileListAction} from 'kontorol-ngx-client';
import {KontorolConversionProfileFilter} from 'kontorol-ngx-client';
import {KontorolConversionProfileType} from 'kontorol-ngx-client';
import {KontorolFilterPager} from 'kontorol-ngx-client';
import {KontorolConversionProfile} from 'kontorol-ngx-client';

@Injectable()
export class KontorolLiveStreamService {

  constructor(private _kontorolServerClient: KontorolClient) {
  }

  public getKontorolConversionProfiles(): Observable<KontorolConversionProfile[]> {
    // filter
    const kontorolConversionProfileFilter = new KontorolConversionProfileFilter({
      typeEqual: KontorolConversionProfileType.liveStream
    });

    // pager
    const kontorolFilterPager = new KontorolFilterPager({pageSize: 500, pageIndex: 1});

    return this._kontorolServerClient
      .request(new ConversionProfileListAction({filter: kontorolConversionProfileFilter, pager: kontorolFilterPager}))
      .map(response => (<KontorolConversionProfile[]>response.objects))
  }
}
