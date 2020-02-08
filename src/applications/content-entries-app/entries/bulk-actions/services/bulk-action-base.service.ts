import { Observable } from 'rxjs';
import { subApplicationsConfig } from 'config/sub-applications';

import { KontorolMediaEntry } from 'kontorol-ngx-client';
import { KontorolClient } from 'kontorol-ngx-client';
import { KontorolRequest, KontorolMultiRequest, KontorolMultiResponse } from 'kontorol-ngx-client';


export abstract class BulkActionBaseService<T> {

  constructor(public _kontorolServerClient: KontorolClient) {
  }

  public abstract execute(selectedEntries: KontorolMediaEntry[] , params : T) : Observable<any>;

  transmit(requests : KontorolRequest<any>[], chunk : boolean) : Observable<{}>
  {
    let maxRequestsPerMultiRequest = requests.length;
    if (chunk){
      maxRequestsPerMultiRequest = subApplicationsConfig.shared.bulkActionsLimit;
    }

    let multiRequests: Observable<KontorolMultiResponse>[] = [];
    let mr :KontorolMultiRequest = new KontorolMultiRequest();

    let counter = 0;
    for (let i = 0; i < requests.length; i++){
      if (counter === maxRequestsPerMultiRequest){
        multiRequests.push(this._kontorolServerClient.multiRequest(mr));
        mr = new KontorolMultiRequest();
        counter = 0;
      }
      mr.requests.push(requests[i]);
      counter++;
    }
    multiRequests.push(this._kontorolServerClient.multiRequest(mr));

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
      });
  }

}
