import {Injectable} from '@angular/core';
import {KontorolClient} from 'kontorol-ngx-client';
import { Observable } from 'rxjs';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';
import {KontorolPartner} from 'kontorol-ngx-client';
import {PartnerGetInfoAction} from 'kontorol-ngx-client';

export interface AccountInfo {
  partnerId: number;
  subPartnerId: string;
  adminSecret: string;
  userSecret: string;
}

@Injectable()
export class AccountInfoService {

  constructor(private _kontorolServerClient: KontorolClient) {
  }

  /** Get the account owners list for current partner */
  public getAccountInfo(): Observable<AccountInfo> {


    return this._kontorolServerClient.request(new PartnerGetInfoAction())
      .map(
        (response: KontorolPartner) => {

          const accountInfo: AccountInfo = {
            partnerId: response.id,
            subPartnerId: response.id + '00',
            adminSecret: response.adminSecret,
            userSecret: response.secret
          };
          return accountInfo;
        });
  }
}
