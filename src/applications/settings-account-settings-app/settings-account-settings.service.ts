import {Injectable} from '@angular/core';
import {KontorolClient} from 'kontorol-ngx-client';
import { KontorolMultiRequest, KontorolRequest, KontorolRequestBase } from 'kontorol-ngx-client';
import {KontorolUserRoleFilter} from 'kontorol-ngx-client';
import {KontorolUserRoleStatus} from 'kontorol-ngx-client';
import {KontorolUserFilter} from 'kontorol-ngx-client';
import {KontorolNullableBoolean} from 'kontorol-ngx-client';
import {KontorolUserStatus} from 'kontorol-ngx-client';
import {UserRoleListAction} from 'kontorol-ngx-client';
import {UserListAction} from 'kontorol-ngx-client';
import { Observable } from 'rxjs';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';
import {KontorolPartner} from 'kontorol-ngx-client';
import {PartnerGetInfoAction} from 'kontorol-ngx-client';
import {PartnerUpdateAction} from 'kontorol-ngx-client';
import {KontorolUserListResponse} from 'kontorol-ngx-client';


export interface AccountSettings {
  website: string;
  name: string;
  adminUserId: string;
  phone: string;
  describeYourself: string;
  referenceId: string;
}

@Injectable()
export class SettingsAccountSettingsService {

  constructor(private _kontorolServerClient: KontorolClient) {
  }

  /** update the data for current partner */
  public updatePartnerData(data: AccountSettings): Observable<KontorolPartner> {
    const partner = new KontorolPartner({
      website: data.website,
      name: data.name,
      adminUserId: data.adminUserId,
      phone: data.phone,
      describeYourself: data.describeYourself,
      referenceId: data.referenceId
    });
    return this._kontorolServerClient.request(new PartnerUpdateAction({
      partner
    }));
  }


  /** Get the account owners list for current partner */
  public getPartnerAccountSettings(): Observable<any> {

    const userRoleFilter: KontorolUserRoleFilter = new KontorolUserRoleFilter({
      tagsMultiLikeOr: 'partner_admin',
      statusEqual: KontorolUserRoleStatus.active
    });

    const userFilter: KontorolUserFilter = new KontorolUserFilter({
      isAdminEqual: KontorolNullableBoolean.trueValue,
      loginEnabledEqual: KontorolNullableBoolean.trueValue,
      statusEqual: KontorolUserStatus.active,
      roleIdsEqual: '0'
    })
      .setDependency(['roleIdsEqual', 0, 'objects:0:id']);


    const multiRequest = new KontorolMultiRequest(
      new UserRoleListAction({filter: userRoleFilter}),
      new UserListAction({filter: userFilter}),
      new PartnerGetInfoAction()
    );

    return this._kontorolServerClient.multiRequest(multiRequest)
      .map(
        data => {
          if (data.hasErrors()) {
            throw new Error('error occurred in action \'getPartnerAccountSettings\'');
          }

          let accountOwners: {name: string, id: string }[] = [];
          let partnerData: KontorolPartner;
          data.forEach(response => {
            if (response.result instanceof KontorolUserListResponse) {
                const usersList = response.result.objects;
                accountOwners = usersList
                  .filter(({ fullName }) => fullName && fullName !== '')
                  .map(user => ({ name: user.fullName, id: user.id }));
                if (!accountOwners.length) {
                    throw new Error('error occurred in action \'getPartnerAccountSettings\'');
                }
            } else if (response.result instanceof KontorolPartner) {
              partnerData = response.result;
            }
          });
          return {accountOwners, partnerData};
        });
  }
}
