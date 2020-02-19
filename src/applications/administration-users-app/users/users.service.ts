import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AppAuthentication, BrowserService } from 'app-shared/kmc-shell';
import { Observable } from 'rxjs';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { IsUserExistsStatuses } from './user-exists-statuses';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';
import { KontorolUser } from 'kontorol-ngx-client';
import { KontorolUserRole } from 'kontorol-ngx-client';
import { KontorolClient, KontorolMultiRequest } from 'kontorol-ngx-client';
import { UserRoleListAction } from 'kontorol-ngx-client';
import { KontorolUserRoleFilter } from 'kontorol-ngx-client';
import { KontorolUserRoleStatus } from 'kontorol-ngx-client';
import { KontorolUserRoleOrderBy } from 'kontorol-ngx-client';
import { UserListAction } from 'kontorol-ngx-client';
import { KontorolUserFilter } from 'kontorol-ngx-client';
import { KontorolNullableBoolean } from 'kontorol-ngx-client';
import { KontorolUserStatus } from 'kontorol-ngx-client';
import { KontorolUserOrderBy } from 'kontorol-ngx-client';
import { KontorolFilterPager } from 'kontorol-ngx-client';
import { PartnerGetInfoAction } from 'kontorol-ngx-client';
import { UserUpdateAction } from 'kontorol-ngx-client';
import { UserDeleteAction } from 'kontorol-ngx-client';
import { UserGetByLoginIdAction } from 'kontorol-ngx-client';
import { UserGetAction } from 'kontorol-ngx-client';
import { UserEnableLoginAction } from 'kontorol-ngx-client';
import { UserAddAction } from 'kontorol-ngx-client';
import { AdminUsersMainViewService } from 'app-shared/kmc-shared/kmc-views';

export interface QueryData {
  pageIndex: number;
  pageSize: number;
}

export interface ExtendedKontorolUser extends KontorolUser {
    roleName: string;
}

interface UsersData {
  users: { items: ExtendedKontorolUser[], totalCount: number };
  roles: { items: KontorolUserRole[], totalCount: number };
  partnerInfo: { adminLoginUsersQuota: number, adminUserId: string };
}

@Injectable()
export class UsersStore implements OnDestroy {
  private _users = {
    data: new BehaviorSubject<UsersData>({
      users: { items: [], totalCount: 0 },
      roles: { items: [], totalCount: 0 },
      partnerInfo: { adminLoginUsersQuota: 0, adminUserId: null }
    }),
    state: new BehaviorSubject<{ loading?: boolean, error?: string }>({})
  };
  private _querySource = new BehaviorSubject<QueryData>({
    pageIndex: 1,
    pageSize: 25
  });

  private get _usersDataValue(): UsersData {
    return this._users.data.value;
  }

  public query$ = this._querySource;
  public readonly users = { data$: this._users.data.asObservable(), state$: this._users.state.asObservable() };

  constructor(private _kontorolServerClient: KontorolClient,
              private _browserService: BrowserService,
              private _appLocalization: AppLocalization,
              private _appAuthentication: AppAuthentication,
              adminUsersMainViewService: AdminUsersMainViewService) {
    if (adminUsersMainViewService.isAvailable()) {
        const defaultPageSize = this._browserService.getFromLocalStorage('users.list.pageSize');
        if (defaultPageSize !== null) {
            this._updateQueryData({
                pageSize: defaultPageSize
            });
        }
        this._loadData();
    }
  }

  ngOnDestroy() {
    this._users.data.complete();
    this._users.state.complete();
    this._querySource.complete();
  }

  private _updateQueryData(partialData: Partial<QueryData>): void {
    const newQueryData = Object.assign({}, this._querySource.getValue(), partialData);
    this._querySource.next(newQueryData);

    if (partialData.pageSize) {
      this._browserService.setInLocalStorage('users.list.pageSize', partialData.pageSize);
    }
  }

  private _loadData(): void {
    this._users.state.next({ loading: true, error: null });
    this._kontorolServerClient
      .multiRequest([
        new UserRoleListAction({
          filter: new KontorolUserRoleFilter({
            statusEqual: KontorolUserRoleStatus.active,
            orderBy: KontorolUserRoleOrderBy.idAsc.toString(),
            tagsMultiLikeOr: 'kmc'
          })
        }),
        new UserListAction({
          filter: new KontorolUserFilter({
            isAdminEqual: KontorolNullableBoolean.trueValue,
            loginEnabledEqual: KontorolNullableBoolean.trueValue,
            statusIn: KontorolUserStatus.active + ',' + KontorolUserStatus.blocked,
            orderBy: KontorolUserOrderBy.createdAtAsc.toString()
          }),
          pager: new KontorolFilterPager(this._querySource.value)
        }),
        new PartnerGetInfoAction()
      ])
      .pipe(cancelOnDestroy(this))
      .subscribe(
        response => {
          if (!response.hasErrors()) {
            const [roles, users, partnerInfo] = response;
              const usersItems = users.result.objects.map(user => {
                  const relevantRole = roles.result.objects.find(role => String(role.id) === user.roleIds);
                  user.roleName = relevantRole ? relevantRole.name : '';
                  return user;
              });
            this._users.data.next({
              users: {
                items: usersItems,
                totalCount: users.result.totalCount
              },
              roles: {
                items: roles.result.objects,
                totalCount: roles.result.totalCount
              },
              partnerInfo: {
                adminLoginUsersQuota: partnerInfo.result.adminLoginUsersQuota,
                adminUserId: partnerInfo.result.adminUserId
              }
            });
            this._users.state.next({ loading: false, error: null });
          } else {
            this._users.state.next({ loading: false, error: this._appLocalization.get('applications.administration.users.failedLoading') });
          }
        },
        () => {
          this._users.state.next({ loading: false, error: this._appLocalization.get('applications.administration.users.failedLoading') });
        }
      );
  }

  public isCurrentUser(user: KontorolUser): boolean {
      return this._appAuthentication.appUser.id === user.id;
  }

  public toggleUserStatus(user: KontorolUser): Observable<void> {
    const isCurrentUser = this.isCurrentUser(user);
    const isAdminUser = this._usersDataValue && this._usersDataValue.partnerInfo.adminUserId === user.id;

    if (isCurrentUser || isAdminUser) {
      return Observable.throw(new Error(this._appLocalization.get('applications.administration.users.cantPerform')));
    }

    const relevantUser = this._usersDataValue.users.items.find(item => user.id === item.id);
    const newStatus = Number(relevantUser && !relevantUser.status);

    return this._kontorolServerClient
      .request(
        new UserUpdateAction({
          userId: user.id,
          user: new KontorolUser({ status: newStatus })
        })
      ).map(() => {
        return;
      });
  }

  public deleteUser(user: KontorolUser): Observable<void> {
    const isCurrentUser = this.isCurrentUser(user);
    const isAdminUser = this._usersDataValue && this._usersDataValue.partnerInfo.adminUserId === user.id;

    if (isCurrentUser || isAdminUser) {
      return Observable.throw(new Error(this._appLocalization.get('applications.administration.users.cantPerform')));
    }

    return this._kontorolServerClient
      .request(new UserDeleteAction({ userId: user.id }))
      .map(() => {
        return;
      });
  }

  public isUserAlreadyExists(email: string): Observable<IsUserExistsStatuses | null> {
    return this._kontorolServerClient
      .request(new UserGetByLoginIdAction({ loginId: email }))
      .map(() => {
        return IsUserExistsStatuses.kmcUser;
      })
      .catch(error => {
        const status = error.code === 'LOGIN_DATA_NOT_FOUND'
          ? IsUserExistsStatuses.unknownUser :
          (error.code === 'USER_NOT_FOUND' ? IsUserExistsStatuses.otherKMCUser : null);
        return Observable.of(status);
      });
  }

  public getUserById(userId: string): Observable<KontorolUser> {
    return this._kontorolServerClient.request(new UserGetAction({ userId }));
  }

  public addUser(userData: { roleIds: string, id: string, email: string, firstName: string, lastName: string }): Observable<void> {
    const { roleIds, id, email, firstName, lastName } = userData;

    if (!email || !firstName || !lastName || !roleIds) {
      return Observable.throw(new Error(this._appLocalization.get('applications.administration.users.addUserError')));
    }

    const user = new KontorolUser({
      email,
      firstName,
      lastName,
      roleIds: roleIds,
      id: id || email,
      isAdmin: true,
      loginEnabled: true
    });

    return this._kontorolServerClient
        .request(new UserAddAction({ user }))
        .map(() => {});
  }

  public updateUser(userData: { roleIds: string, id: string, email: string}, userId: string): Observable<void> {
    const { roleIds, id, email } = userData;

    if ((!id && !email) || !userId || !roleIds) {
      return Observable.throw(new Error(this._appLocalization.get('applications.administration.users.invalidUserId')));
    }

    const user = new KontorolUser({
      roleIds,
      id: id || email,
        email: email
    });
    return this._kontorolServerClient
      .request(new UserUpdateAction({ userId, user }))
      .map(() => {
        return;
      });
  }

  public associateUserToAccount(userProvidedEmail: string, user: KontorolUser, roleIds: string): Observable<void> {

      if (!user || !roleIds) {
          return Observable.throw(new Error('cannot associate user to account'));
      }
    const updatedUser = new KontorolUser({
      roleIds: roleIds,
      isAdmin: true
    });
    const request = new KontorolMultiRequest(
      new UserUpdateAction({ userId: user.id, user: updatedUser }),
      new UserEnableLoginAction({ userId: user.id, loginId: userProvidedEmail })
    );
    return this._kontorolServerClient
      .multiRequest(request)
      .map((responses) => {
        if (responses.hasErrors()) {
          const errorMessage = responses.map(response => {
            if (response.error) {
              return response.error.message + '\n';
            }
          }).join('');
          throw Error(errorMessage);
        }
      });
  }

  public reload(force: boolean): void;
  public reload(query: Partial<QueryData>): void;
  public reload(query: boolean | Partial<QueryData>): void {
    const forceReload = (typeof query === 'object' || (typeof query === 'boolean' && query));
    if (forceReload || this._usersDataValue.users.totalCount === 0) {
      if (typeof query === 'object') {
        this._updateQueryData(query);
      }
      this._loadData();
    }
  }
}

