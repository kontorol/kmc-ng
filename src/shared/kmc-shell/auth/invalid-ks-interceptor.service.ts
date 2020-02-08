import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppAuthentication } from './app-authentication.service';
import { BrowserService } from '../providers/browser.service';
import { AppLocalization } from '@kontorol-ng/mc-shared';

@Injectable()
export class InvalidKsInterceptorService implements HttpInterceptor {
    constructor(private _appAuth: AppAuthentication,
                private _appLocalization: AppLocalization,
                private _browserService: BrowserService) {

    }

    private _createAlert(): any {
        return Observable.create(observer => {
            this._browserService.alert({
                header: this._appLocalization.get('app.common.attention'),
                message: this._appLocalization.get('app.common.invalidKs'),
                accept: () => {
                    this._appAuth.logout();
                    // don't complete the 'observer' because we don't want the application to handle this error
                }
            });
        });
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .switchMap((event: HttpResponse<any>) => {

                if (event.body && event.body.objectType === "KontorolAPIException" && event.body.code === 'INVALID_KS') {
                    return this._createAlert();
                }

                return Observable.of(event);
            });
    }
}
