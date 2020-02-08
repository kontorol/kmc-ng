import {Injectable} from '@angular/core';
import {KontorolClient, KontorolMultiRequest} from 'kontorol-ngx-client';
import {UserListAction} from 'kontorol-ngx-client';
import {KontorolUserFilter} from 'kontorol-ngx-client';
import {KontorolFilterPager} from 'kontorol-ngx-client';
import {KontorolCategoryUserPermissionLevel} from 'kontorol-ngx-client';
import { Observable } from 'rxjs';
import {KontorolUpdateMethodType} from 'kontorol-ngx-client';
import {CategoryUserAddAction} from 'kontorol-ngx-client';
import {KontorolCategoryUser} from 'kontorol-ngx-client';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import {CategoryUserCopyFromCategoryAction} from 'kontorol-ngx-client';
import 'rxjs/add/operator/delay';

@Injectable()
export class AddUsersService {

  constructor(private _kontorolServerClient: KontorolClient,
              private _appLocalization: AppLocalization) {
  }


  public addUsers({usersIds, categoryId, permissionLevel, updateMethod}: { usersIds: string[], categoryId: number, permissionLevel: KontorolCategoryUserPermissionLevel, updateMethod: KontorolUpdateMethodType}): Observable<void> {
    if (!usersIds || !usersIds.length) {
      return Observable.throw(
        new Error(this._appLocalization
          .get('applications.content.categoryDetails.entitlements.usersPermissions.addUsers.errors.missingUsers')));
    }

    const multiRequest = new KontorolMultiRequest();
    usersIds.forEach(userId => {
      const categoryUser = new KontorolCategoryUser({
        categoryId,
        userId,
        permissionLevel,
        updateMethod
      });
      multiRequest.requests.push(new CategoryUserAddAction({categoryUser}));
    });

    return this._kontorolServerClient.multiRequest(multiRequest)
      .map(response => {
          if (response.hasErrors()) {
            const errorMessage = (response.find(r => (r.error && r.error.code !== 'CATEGORY_USER_ALREADY_EXISTS'))) ?
                'applications.content.categoryDetails.entitlements.usersPermissions.addUsers.errors.addUsersFailed':
                'applications.content.categoryDetails.entitlements.usersPermissions.addUsers.errors.duplicateUsers';
            throw new Error(this._appLocalization.get(errorMessage));
          }
          return undefined;
        }
      )
      .catch(err => Observable.throw(err));
  }



  public copyUsersFromParent({categoryId}: {categoryId: number}): Observable<void> {
    return this._kontorolServerClient.request(
      new CategoryUserCopyFromCategoryAction({categoryId})
    ).delay(6000); // we delay the response for the server to be able to index the new users
  }


  public getUsersSuggestions(query: string) {
    return this._kontorolServerClient.request(
      new UserListAction(
        {
          filter: new KontorolUserFilter({
            idOrScreenNameStartsWith: query
          }),
          pager: new KontorolFilterPager({
            pageIndex: 0,
            pageSize: 30
          })
        }
      )
    );
  }
}
