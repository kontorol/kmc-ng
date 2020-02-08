import { Injectable, OnDestroy } from '@angular/core';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { Observable } from 'rxjs';
import { subApplicationsConfig } from 'config/sub-applications';
import { KontorolClient, KontorolRequest } from 'kontorol-ngx-client';
import { BaseEntryApproveAction } from 'kontorol-ngx-client';
import { BaseEntryRejectAction } from 'kontorol-ngx-client';

@Injectable()
export class BulkService implements OnDestroy {
  constructor(private _kontorolServerClient: KontorolClient,
              private _appLocalization: AppLocalization) {
  }

  ngOnDestroy() {
  }

  private _transmit(requests: KontorolRequest<any>[], chunk: boolean): Observable<{}> {
    let maxRequestsPerMultiRequest = requests.length;
    if (chunk) {
      maxRequestsPerMultiRequest = subApplicationsConfig.shared.bulkActionsLimit;
    }

    // split request on chunks => [[], [], ...], each of inner arrays has length of maxRequestsPerMultiRequest
    const splittedRequests = [];
    let start = 0;
    while (start < requests.length) {
      const end = start + maxRequestsPerMultiRequest;
      splittedRequests.push(requests.slice(start, end));
      start = end;
    }
    const multiRequests = splittedRequests
      .map(reqChunk => this._kontorolServerClient.multiRequest(reqChunk));

    return Observable.forkJoin(multiRequests)
      .map(responses => {
        const errorMessage = [].concat.apply([], responses)
          .filter(response => !!response.error)
          .reduce((acc, { error }) => `${acc}\n${error.message}`, '')
          .trim();

        if (!!errorMessage) {
          throw new Error(errorMessage);
        } else {
          return {};
        }
      }).catch(error => {
        const message = error && error.message
          ? error.message
          : typeof error === 'string'
            ? error
            : this._appLocalization.get('applications.content.moderation.errorConnecting');
        throw new Error(message)
      });
  }

  public approveEntry(entryIds: string[]): Observable<{}> {
    if (!entryIds || entryIds.length <= 0) {
      return Observable.throw(new Error(this._appLocalization.get('applications.content.moderation.missingIds')));
    }

    return this._transmit(entryIds.map(entryId => new BaseEntryApproveAction({ entryId })), true);
  }

  public rejectEntry(entryIds: string[]): Observable<{}> {
    if (!entryIds || entryIds.length <= 0) {
      return Observable.throw(new Error(this._appLocalization.get('applications.content.moderation.missingIds')));
    }

    return this._transmit(entryIds.map(entryId => new BaseEntryRejectAction({ entryId })), true);
  }
}

