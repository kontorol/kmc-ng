import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';
import { KontorolClient, KontorolMultiRequest, UserUpdateAction } from 'kontorol-ngx-client';
import { UserGetAction } from 'kontorol-ngx-client';
import { UserRoleGetAction } from 'kontorol-ngx-client';
import { UserUpdateLoginDataAction, UserUpdateLoginDataActionArgs } from 'kontorol-ngx-client';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { KontorolUser } from 'kontorol-ngx-client';
import { KontorolUserRole } from 'kontorol-ngx-client';
import { AppAuthentication } from 'app-shared/kmc-shell';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SettingsMyUserSettingsService {

  constructor(private _kontorolServerClient: KontorolClient,
              private _appAuth: AppAuthentication,
              private _appLocalization: AppLocalization) {
  }

  public getUserData(): Observable<{ user: KontorolUser, role: KontorolUserRole }> {
    const request = new KontorolMultiRequest(
      new UserGetAction(),
      new UserRoleGetAction({ userRoleId: 0 })
        .setDependency(['userRoleId', 0, 'roleIds'])
    );

    return this._kontorolServerClient
      .multiRequest(request)
      .map(([user, role]) => {
        if (user.error || role.error) {
          throw new Error((user.error || role.error).message);
        }

        return {
          user: user.result,
          role: role.result
        };
      })
      .catch(() => {
        return Observable.throw(new Error(this._appLocalization.get('applications.settings.myUserSettings.errors.getUserData')));
      });
  }

  public updateEmail(user: KontorolUser): Observable<void> {
      return this._kontorolServerClient
          .request(new UserUpdateAction({ userId: user.id, user }))
          .pipe(
              catchError(error =>
                  throwError(new Error(this._appLocalization.get('applications.settings.myUserSettings.errors.updateUser')))
              ),
              map(() => {}),
          );
  }

  public updateLoginData(userData: UserUpdateLoginDataActionArgs): Observable<void> {
    return this._kontorolServerClient
      .request(new UserUpdateLoginDataAction(userData))
      .catch(error => {
        let message = error && error.message
          ? error.code === 'PASSWORD_STRUCTURE_INVALID'
            ? this._appLocalization.get('applications.settings.myUserSettings.errors.passwordStructure')
            : this._appLocalization.get('applications.settings.myUserSettings.errors.passwordErr')
          : this._appLocalization.get('applications.settings.myUserSettings.errors.updateUser');
        if (error && error.code && error.code === "INVALID_OTP"){
            message = this._appLocalization.get('app.login.error.invalidOtp');
        }
        if (error && error.code && error.code === "MISSING_OTP"){
            message = this._appLocalization.get('app.login.error.missingOtp');
        }
        return Observable.throw(new Error(message));
      });
  }

  public updateUserNameManually(user: KontorolUser): void {
    if (user && user.firstName && user.lastName && user.fullName) {
      this._appAuth._updateNameManually(user.firstName, user.lastName, user.fullName);
    }
  }
}
