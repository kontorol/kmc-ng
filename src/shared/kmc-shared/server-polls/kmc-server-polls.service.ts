import {
    KontorolAPIException, KontorolClient, KontorolMultiRequest, KontorolRequest, KontorolRequestBase
} from 'kontorol-ngx-client';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, throwError as ObservableThrowError} from 'rxjs';
import { ServerPolls } from '@kontorol-ng/kontorol-common';
import { Subject } from 'rxjs/Subject';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';
import { AppEventsService } from 'app-shared/kmc-shared/app-events';
import { UserLoginStatusEvent } from 'app-shared/kmc-shared/events';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class KmcServerPolls extends ServerPolls<KontorolRequestBase, KontorolAPIException> implements OnDestroy {
  private _onDestory = new Subject<void>();
  private _isLogged = false;
  private _isKSValid = true;
  protected _getOnDestroy$(): Observable<void> {
      return this._onDestory.asObservable();
  }

  constructor(private _kontorolClient: KontorolClient, private _kontorolLogger: KontorolLogger, private _appEvents: AppEventsService) {
      super(null); // _kontorolLogger.subLogger('KmcServerPolls')

      _appEvents.event(UserLoginStatusEvent).subscribe(
          event => {
              this._isLogged = event.isLogged;
              if (this._isLogged) {
                  this._isKSValid = true;
              }
          }
      );
  }

  protected _createGlobalError(error?: Error): KontorolAPIException {
      return new KontorolAPIException( error ? error.message : '', 'kmc-server_polls_global_error', null);
  }

  protected _canExecute(): boolean {
    return this._isLogged && this._isKSValid;
  }

  /*
   *   Before execution of the request function will flatten request array
   *   to perform correct multi-request and aggregate responses to according requests
   *   Example:
   *   input: [a,b, [c1,c2,c3], [d1,d2], e] - where a,b,e - requests, c and d - multi-requests
   *   actual: [a, b, c1, c2, c3, d1, d2, e] - flattened array before execution
   *   [1,1,3,2,1] - mapping by count of requests in multi-requests, needed to restore original structure of requests
   *   response: [a,b, [c1,c2,c3], [d1,d2],e] - response mapped to according requests
   */
  protected _executeRequests(requests: KontorolRequestBase[]): Observable<{ error: KontorolAPIException, result: any }[]> {
    const multiRequest = new KontorolMultiRequest();
    const requestsMapping: number[] = [];
    requests.forEach(request => {
      if (request instanceof KontorolRequest) {
        multiRequest.requests.push(request);
        requestsMapping.push(1);
      } else if (request instanceof KontorolMultiRequest) {
        multiRequest.requests.push(...request.requests);
        requestsMapping.push(request.requests.length);
      } else {
        throw new Error(`unsupported type of request provided '${typeof request}'`);
      }
    });
      return this._kontorolClient.multiRequest(multiRequest.setNetworkTag('pr'))
          .pipe(
              map(responses => {
                  if (responses.hasErrors()) {
                      throw responses.getFirstError();
                  }

                  return requestsMapping.reduce((aggregatedResponses, requestSize) => {
                      const response = responses.splice(0, requestSize);
                      const unwrappedResponse = response.length === 1 ? response[0] : response;
                      return [...aggregatedResponses, unwrappedResponse];
                  }, []);
              }),
              catchError(error => {
                  if (error.code === 'INVALID_KS') {
                      this._isKSValid = false;
                  }
                  return ObservableThrowError(error);
              }),
          );
  }

  ngOnDestroy(): void {
    this._onDestory.next();
    this._onDestory.complete();
  }
}
