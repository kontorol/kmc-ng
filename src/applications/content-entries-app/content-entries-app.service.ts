import { Injectable } from '@angular/core';
import { Observable, throwError as ObservableThrowError } from 'rxjs';
import { map } from 'rxjs/operators';
import { KontorolClient, BaseEntryDeleteAction } from 'kontorol-ngx-client';
import { XInternalXAddBulkDownloadAction } from './entries/bulk-actions/services/XInternalXAddBulkDownloadAction';

@Injectable()
export class ContentEntriesAppService {
  constructor(private _kontorolServerClient: KontorolClient) {

  }

  public deleteEntry(entryId: string): Observable<void> {
      if (!entryId) {
          return ObservableThrowError('missing entryId argument');
      }
      return this._kontorolServerClient
          .request(new BaseEntryDeleteAction({ entryId: entryId }))
          .pipe(map(() => {}));
  }

  public downloadEntry(entryIds: string, flavorParamsId: string): Observable<{ email: string }> {
      return this._kontorolServerClient
          .request(new XInternalXAddBulkDownloadAction({ entryIds, flavorParamsId }))
          .pipe(map(email => ({ email })));
  }
}
