import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { KontorolAuthentication, KontorolClient, KontorolMultiRequest, KontorolRequestOptions, SsoLoginAction } from 'kontorol-ngx-client';
import { UserLoginByLoginIdAction } from 'kontorol-ngx-client';
import { UserGetByLoginIdAction } from 'kontorol-ngx-client';
import { UserGetAction } from 'kontorol-ngx-client';
import { PartnerGetInfoAction } from 'kontorol-ngx-client';
import { PermissionListAction } from 'kontorol-ngx-client';
import { KontorolResponseProfileType } from 'kontorol-ngx-client';
import { KontorolDetachedResponseProfile } from 'kontorol-ngx-client';
import { KontorolPermissionFilter } from 'kontorol-ngx-client';
import { KontorolPermissionListResponse } from 'kontorol-ngx-client';
import { KontorolUserRole } from 'kontorol-ngx-client';
import { KontorolFilterPager } from 'kontorol-ngx-client';
import { KontorolPermissionStatus } from 'kontorol-ngx-client';
import { UserRoleGetAction } from 'kontorol-ngx-client';
import * as Immutable from 'seamless-immutable';
import { AppUser } from './app-user';
import { UserResetPasswordAction } from 'kontorol-ngx-client';
import { AdminUserUpdatePasswordAction } from 'kontorol-ngx-client';
import { PageExitVerificationService } from 'app-shared/kmc-shell/page-exit-verification/page-exit-verification.service';
import { UserLoginStatusEvent } from 'app-shared/kmc-shared/events';
import { KontorolPartner } from 'kontorol-ngx-client';
import { KontorolUser } from 'kontorol-ngx-client';
import { AppEventsService } from 'app-shared/kmc-shared/app-events';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';
import { KMCPermissionsService } from 'app-shared/kmc-shared/kmc-permissions';
import { serverConfig } from 'config/server';
import { BrowserService } from 'app-shared/kmc-shell/providers/browser.service';
import { UserLoginByKsAction } from 'kontorol-ngx-client';
import { KmcServerPolls } from '../../kmc-shared/server-polls';
import { HttpClient } from '@angular/common/http';
import { buildBaseUri } from 'config/server';
import { KmcMainViewsService } from 'app-shared/kmc-shared/kmc-views/kmc-main-views.service';
import { kmcAppConfig } from '../../../kmc-app/kmc-app-config';



const ksSessionStorageKey = 'auth.login.ks';
import { AdminUserSetInitialPasswordAction } from 'kontorol-ngx-client';
import { RestorePasswordViewService } from 'app-shared/kmc-shared/kmc-views/details-views/restore-password-view.service';
import { switchMap, map } from 'rxjs/operators';
import { of as ObservableOf } from 'rxjs';
import {AuthenticatorViewService} from "app-shared/kmc-shared/kmc-views/details-views";

export interface UpdatePasswordPayload {
    email: string;
    password: string;
    newEmail: string;
    newPassword: string;
}

export interface LoginError {
    message: string;
    custom: boolean;
    passwordExpired?: boolean;
    closedForBeta?: boolean;
    code?: string;
}

export interface LoginResponse {
    success: boolean;
    error: LoginError;
}

export interface AppAuthenticationEvents {
    onUserLoggedIn: (appUser: Immutable.ImmutableObject<AppUser>) => Observable<void>;
    onUserLoggedOut: () => void;
}
export enum AutomaticLoginErrorReasons {
    closedForBeta
};

@Injectable()
export class AppAuthentication {

    private _automaticLoginErrorReason: AutomaticLoginErrorReasons = null;

    public get automaticLoginErrorReason(): AutomaticLoginErrorReasons {
        return this._automaticLoginErrorReason;
    }

    private _defaultUrl: string;
    private _automaticLogin: {  ks: string, persistCredentials: boolean } = { ks: null, persistCredentials: false };
    private _logger: KontorolLogger;
    private _appUser: Immutable.ImmutableObject<AppUser> = null;
    private _autoLoginAttempted = false;

    public get defaultUrl(): string {
        return this._defaultUrl;
    }

    constructor(private kontorolServerClient: KontorolClient,
                private _browserService: BrowserService,
                private _pageExitVerificationService: PageExitVerificationService,
                logger: KontorolLogger,
                private _serverPolls: KmcServerPolls,
                private _permissionsService: KMCPermissionsService,
                private _http: HttpClient,
                private _appEvents: AppEventsService,
                private _location: Location,
                private _kmcViewsManager: KmcMainViewsService,
                private _restorePasswordView: RestorePasswordViewService,
                private _authenticatorView: AuthenticatorViewService) {
        this._logger = logger.subLogger('AppAuthentication');
    }

    private _getLoginErrorMessage({error}): LoginError {
        const message = (error ? error.message : null) || 'Failed to load partner information';
        const code = error ? error.code : null;
        const custom = true;
        const errors = {
            'USER_NOT_FOUND': 'app.login.error.badCredentials',
            'USER_WRONG_PASSWORD': 'app.login.error.badCredentials',
            'ADMIN_KUSER_NOT_FOUND': 'app.login.error.userNotFound',
            'PASSWORD_STRUCTURE_INVALID': 'app.login.error.invalidStructure',
            'PASSWORD_ALREADY_USED': 'app.login.error.alreadyUsed',
            'NEW_PASSWORD_HASH_KEY_INVALID': 'app.login.error.newPasswordHashKeyInvalid',
            'NEW_PASSWORD_HASH_KEY_EXPIRED': 'app.login.error.newPasswordHashKeyExpired',
            'ADMIN_KUSER_WRONG_OLD_PASSWORD': 'app.login.error.wrongOldPassword',
            'WRONG_OLD_PASSWORD': 'app.login.error.wrongOldPassword',
            'INVALID_FIELD_VALUE': 'app.login.error.invalidField',
            'USER_FORBIDDEN_FOR_BETA': 'app.login.error.userForbiddenForBeta',
            'MISSING_OTP': 'app.login.error.missingOtp',
            'INVALID_OTP': 'app.login.error.invalidOtp',
            'FEATURE_FORBIDDEN': 'app.login.error.ssoForbidden',
            'SSO_NOT_FOUND': 'app.login.error.ssoNotFound'
        };

        if (code === 'PASSWORD_EXPIRED') {
            return {
                message: '',
                custom: false,
                passwordExpired: true,
                code
            };
        }

        if (code in errors) {
            return {
                message: errors[code],
                custom: false,
                code
            };
        }

        return {message, custom, code};
    }

    get appUser(): Immutable.ImmutableObject<AppUser> {
        return this._appUser;
    }

    validateResetPasswordHash(hash: string): Observable<string> {
        if (!serverConfig.kontorolServer.resetPasswordUri) {
            this._logger.warn(`resetPasswordUri was not provided by configuration, abort request`);
            return Observable.of('RESET_URI_NOT_DEFINED');
        }

        const url = serverConfig.kontorolServer.resetPasswordUri.replace('{hash}', hash);

        this._logger.debug(`check if provided hash is valid`, { hash, url });

        return this._http.get(url, { responseType: 'json' })
            .map(res => res['errorCode'])
            .catch((e) => {
                this._logger.error('Failed to check if provided hash is valid', e);
                throw Error('Failed to check if provided hash is valid');
            });
    }

    resetPassword(email: string): Observable<void> {
        if (!this.isLogged()) {
            return this.kontorolServerClient.request(new UserResetPasswordAction({email}));
        } else {
            return Observable.throw(new Error('cannot reset password, user is logged'));
        }
    }

    updatePassword(payload: UpdatePasswordPayload): Observable<{ email: string, password: string }> {
        return this.kontorolServerClient.request(new AdminUserUpdatePasswordAction(payload))
            .catch(error => Observable.throw(this._getLoginErrorMessage({error})));
    }

    setInitalPassword(payload: { newPassword: string, hashKey: string }): Observable<KontorolAuthentication> {
        return this.kontorolServerClient.request(new AdminUserSetInitialPasswordAction(payload))
            .catch(error => Observable.throw(this._getLoginErrorMessage({error})));
    }

    login(loginId: string, password: string, otp: string): Observable<LoginResponse> {

        const expiry = kmcAppConfig.kontorolServer.expiry;
        let privileges = kmcAppConfig.kontorolServer.privileges || '';

        if (serverConfig.kontorolServer.defaultPrivileges) {
            privileges += `${privileges ? ',' : ''}${serverConfig.kontorolServer.defaultPrivileges}`;
        }

        this._automaticLoginErrorReason = null;
        this._browserService.removeFromSessionStorage(ksSessionStorageKey);  // clear session storage

        const requestedPartnerId = this._browserService.getFromLocalStorage('loginPartnerId');

        const request = new KontorolMultiRequest(
            new UserLoginByLoginIdAction(
                {
                    loginId,
                    password,
                    otp,
                    expiry: expiry,
                    privileges: privileges,
                    partnerId: requestedPartnerId ? requestedPartnerId : null
                }),
            new UserGetByLoginIdAction({loginId})
                .setRequestOptions(
                    new KontorolRequestOptions({})
                        .setDependency(['ks', 0])
                ),
            new PartnerGetInfoAction({}).setRequestOptions(
                new KontorolRequestOptions({})
                    .setDependency(['ks', 0])
                    .setDependency(['id', 1, 'partnerId'])
            ),
            new UserRoleGetAction({userRoleId: 0})
                .setRequestOptions(
                    new KontorolRequestOptions({})
                        .setDependency(['ks', 0])
                )
                .setDependency(['userRoleId', 1, 'roleIds']),
            new PermissionListAction({
                filter: new KontorolPermissionFilter({
                    statusEqual: KontorolPermissionStatus.active,
                    typeIn: '2,3'
                }),
                pager: new KontorolFilterPager({
                    pageSize: 500
                })
            })
                .setRequestOptions(
                    new KontorolRequestOptions({
                        responseProfile: new KontorolDetachedResponseProfile({
                            type: KontorolResponseProfileType.includeFields,
                            fields: 'name'
                        })
                    })
                        .setDependency(['ks', 0])
                )
        );

        return <any>(this.kontorolServerClient.multiRequest(request)
                .pipe(
                    switchMap(response => {
                        if (!response.hasErrors()) {
                            return this._checkIfPartnerCanAccess(response[2].result)
                                .pipe(map(isPartnerAllowed => ({ response, isPartnerAllowed })));
                        } else {
                            return ObservableOf(true) // errors will be handled by the map function
                                .pipe(map(isPartnerAllowed => ({ response, isPartnerAllowed })));
                        }
                    }),
                    map(
                        ({ response, isPartnerAllowed }) => {
                            if (!response.hasErrors()) {
                                if (isPartnerAllowed) {
                                    this._afterLogin(response[0].result, true, response[1].result, response[2].result, response[3].result, response[4].result);
                                    return { success: true, error: null };
                                } else {
                                    return {
                                        success: false, error: {
                                            message: 'app.login.error.userForbiddenForBeta',
                                            custom: false,
                                            closedForBeta: true
                                        }
                                    };
                                }
                            }

                            return { success: false, error: this._getLoginErrorMessage(response[0]) };
                        }
                    )
                )
        );
    }

    private _checkIfPartnerCanAccess(partner: KontorolPartner): Observable<boolean> {
        if (!serverConfig.kontorolServer.limitAccess){
            return Observable.of(true);
        }
        const serviceUrl = serverConfig.kontorolServer.limitAccess.serviceUrl;

        const url = buildBaseUri(serviceUrl + partner.id);
        this._logger.debug(`check if partner can access the KMC`, {partnerId: partner.id, limitAccess: true, url});

        return this._http.get(url, { responseType: 'json' })
            .map(res => {
                const {isPartnerPartOfBeta: canPartnerAccess} = <any>res;

                this._automaticLoginErrorReason = canPartnerAccess ? null : AutomaticLoginErrorReasons.closedForBeta;
                this._logger.info(`query service to check if partner can access the KMC`, {
                    partnerId: partner.id,
                    canPartnerAccess
                });
                return canPartnerAccess;
            })
            .catch((e) => {
                this._logger.error('Failed to check if partner can access the KMC', e);
                throw Error('Failed to check if partner can access the KMC');
            });
    }

    private _afterLogin(ks: string, storeCredentialsInSessionStorage: boolean, user: KontorolUser, partner: KontorolPartner, userRole: KontorolUserRole, permissionList: KontorolPermissionListResponse): void {

        if (storeCredentialsInSessionStorage) {
            this._browserService.setInSessionStorage(ksSessionStorageKey, ks);  // save ks in session storage
        }

        this._browserService.removeFromLocalStorage('loginPartnerId');

        const partnerPermissionList = permissionList.objects.map(item => item.name);
        const userRolePermissionList = userRole.permissionNames.split(',');
        this._permissionsService.load(userRolePermissionList, partnerPermissionList);

        const appUser: Immutable.ImmutableObject<AppUser> = Immutable({
            ks,
            id: user.id,
            partnerId: user.partnerId,
            fullName: user.fullName,
            firstName: user.firstName,
            lastName: user.lastName,
            isAccountOwner: user.isAccountOwner,
            createdAt: user.createdAt,
            partnerInfo: {
                partnerId: user.partnerId,
                name: partner.name,
                partnerPackage: partner.partnerPackage,
                landingPage: partner.landingPage,
                adultContent: partner.adultContent,
                publisherEnvironmentType: partner.publisherEnvironmentType,
                publishersQuota: partner.publishersQuota,
                authenticationType: partner.authenticationType
            }
        });

        this._kmcViewsManager.rebuildMenu();
        this.kontorolServerClient.setDefaultRequestOptions({
            ks: appUser.ks
        });
        window['kmcng'] = {ks};

        this._appUser = appUser;
        this._appEvents.publish(new UserLoginStatusEvent(true));

        this._serverPolls.forcePolling();
    }

    isLogged() {
        return !!this._appUser;
    }


    private _clearSessionCredentials(): void {
        this._logger.debug(`clear previous stored credentials in session storage if found`);
        this._browserService.removeFromSessionStorage(ksSessionStorageKey);
    }

    logout() {
        this._logger.info('handle logout request by the user');
        this._clearSessionCredentials();
        this._logout();
    }

    private _loginByKS(loginToken: string, storeCredentialsInSessionStorage): Observable<boolean> {
        return Observable.create((observer: any) => {
            if (!this.isLogged()) {
                if (loginToken) {
                    const requests = [
                        new UserGetAction({})
                            .setRequestOptions({
                                ks: loginToken
                            }),
                        new PartnerGetInfoAction({})
                            .setRequestOptions({
                                ks: loginToken
                            })
                            .setDependency(['id', 0, 'partnerId']),
                        new UserRoleGetAction({ userRoleId: 0})
                            .setRequestOptions({
                                ks: loginToken
                            })
                            .setDependency(['userRoleId', 0, 'roleIds']),
                        new PermissionListAction({
                            filter: new KontorolPermissionFilter({
                                statusEqual: KontorolPermissionStatus.active,
                                typeIn: '2,3'
                            }),
                            pager: new KontorolFilterPager({
                                pageSize: 500
                            })
                        })
                            .setRequestOptions({
                                ks: loginToken,
                                responseProfile: new KontorolDetachedResponseProfile({
                                    type: KontorolResponseProfileType.includeFields,
                                    fields: 'name'
                                })
                            })
                    ];

                    this.kontorolServerClient.multiRequest(requests)
                        .pipe(
                            switchMap(
                                response => {
                                    const result = !response.hasErrors()
                                        ? this._checkIfPartnerCanAccess(response[1].result)
                                        : ObservableOf(true);

                                    return result.pipe(map(isPartnerAllowed => ({ response, isPartnerAllowed })));
                                })
                        )
                        .subscribe(
                            ({ response, isPartnerAllowed }) => {
                                if (!response.hasErrors() && isPartnerAllowed) {
                                    this._afterLogin(loginToken, storeCredentialsInSessionStorage, response[0].result, response[1].result, response[2].result, response[3].result);
                                    observer.next(true);
                                    observer.complete();
                                    return;
                                }

                                observer.next(false);
                                observer.complete();
                            },
                            () => {
                                observer.next(false);
                                observer.complete();
                            }
                        );
                } else {
                    observer.next(false);


                    observer.complete();
                }
            }
        });
    }

    public setAutomaticLoginCredentials(ks: string, persistCredentials = false) {
        this._automaticLogin.ks = ks;
        this._automaticLogin.persistCredentials = persistCredentials;
    }


    public restorePassword(hash: string): void {
        this._clearSessionCredentials();

        if (this._restorePasswordView.isAvailable({hash})) {
            this._restorePasswordView.open({hash});
        } else {

            this._logger.warn(`restore password view is not available, redirect to default view`, {
                restorePasswordHash: hash
            });
            this._browserService.navigateToDefault();
        }
    }

    public authenticatorCode(hash: string): void {
        this._clearSessionCredentials();

        if (this._authenticatorView.isAvailable({hash})) {
            this._authenticatorView.open({hash});
        } else {

            this._logger.warn(`Authentication view is not available, redirect to default view`, {
                authenticatorHash: hash
            });
            this._browserService.navigateToDefault();
        }
    }

    public loginAutomatically(defaultUrl: string): Observable<boolean> {
        if (this._autoLoginAttempted || this.isLogged()) {
            return ObservableOf(this.isLogged());
        }

        this._autoLoginAttempted = true;
        const ksFromApp = this._automaticLogin.ks;
        if (ksFromApp) {
            this._logger.info(`try to login automatically with KS provided explicitly by the app`);
            this._clearSessionCredentials();
            return this._loginByKS(ksFromApp, this._automaticLogin.persistCredentials);
        }

        const forbiddenUrls = ['/error', '/actions', '/login'];
        const url = typeof defaultUrl === 'string' ? defaultUrl.trim() : '';
        const allowedUrl = url !== '/' && forbiddenUrls.filter(forbiddenUrl => url.indexOf(forbiddenUrl) !== -1).length === 0;
        if (allowedUrl) {
            this._defaultUrl = url;
            this._logger.info(`set default url to ${url}`);
        }

        const ksFromSession = this._browserService.getFromSessionStorage(ksSessionStorageKey);  // get ks from session storage;

        if (ksFromSession) {
            this._logger.info(`try to login automatically with KS stored in session storage`);
            return this._loginByKS(ksFromSession, true);
        }

        this._logger.debug(`ignore automatic login logic as no session ks found `);
        return Observable.of(false);
    }

    public switchPartnerId(partnerId: number): Observable<void> {
        return Observable.create((observer: any) => {
            return this.kontorolServerClient.request(new UserLoginByKsAction({requestedPartnerId: partnerId}))
                .subscribe(
                    result => {
                        this._logger.info(`switch partner account`, { partnerId });
                        this._browserService.setInSessionStorage(ksSessionStorageKey, result.ks);
                        this._forceReload();

                        // DEVELOPER NOTICE: observer next/complete not implemented by design
                        // (since we are breaking the stream by reloading the page)
                    },
                    error => {
                        observer.error(error);
                    }
                );
        });
    }

    public reload() {
        this._logger.info(` reload of browser`, { forceReload: false });
        document.location.reload(false);
    }

    private _forceReload() {
        const baseUrl = this._location.prepareExternalUrl('');

        if (baseUrl) {
            this._logger.info(`redirect the user to base url`, { url: baseUrl });
            this._logout(false);
            window.location.href = baseUrl;
        } else {
            this._logger.info(`reload browser page`, { url: baseUrl });
            document.location.reload(true);
        }
    }

    private _logout(reloadPage = true) {
        this._logger.info(`log out user from the application`, { forceReload: reloadPage });
        this.kontorolServerClient.setDefaultRequestOptions({});
        this._permissionsService.flushPermissions();
        delete window['kmcng'];
        this._appUser = null;
        this._appEvents.publish(new UserLoginStatusEvent(false));
        this._pageExitVerificationService.removeAll();
        if (reloadPage) {
            this._logger.info(`force reload of browser`);
            this._forceReload();
        }
    }

    public _updateNameManually(firstName: string, lastName: string, fullName: string): void {
        if (this._appUser) {
            this._appUser = this._appUser.merge(
                {
                    firstName: firstName,
                    lastName: lastName,
                    fullName: fullName
                });
        }
    }

    public _ssoLogin(userId: string): Observable<{}>{
        const applicationType = 'kmc';
        const requestedPartnerId = this._browserService.getFromLocalStorage('loginPartnerId');
        return this.kontorolServerClient.request(new SsoLoginAction({
            userId,
            applicationType,
            partnerId: requestedPartnerId ? requestedPartnerId : null
        }))
        .catch(error => Observable.throw(this._getLoginErrorMessage({error})));

    }
}
