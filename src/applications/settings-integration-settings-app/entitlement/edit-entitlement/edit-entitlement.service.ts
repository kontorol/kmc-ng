import {Injectable} from '@angular/core';
import {KontorolClient} from 'kontorol-ngx-client';
import {KontorolCategory} from 'kontorol-ngx-client';
import { Observable } from 'rxjs';
import {CategoryUpdateAction} from 'kontorol-ngx-client';

export interface Entitlement {
  categories: KontorolCategory[];
  partnerDefaultEntitlementEnforcement: boolean
}

@Injectable()
export class EditEntitlementService {


  constructor(private _kontorolServerClient: KontorolClient) {
  }


  public updateEntitlementPrivacyContext(id: number, privacyContextLabel: string): Observable<void> {

    return this._kontorolServerClient.request(new CategoryUpdateAction({
      id,
      category: new KontorolCategory({
        privacyContext: privacyContextLabel
      })
    }))
      .map(_ => (undefined));
  }
}
