import { Observable } from 'rxjs';
import { subApplicationsConfig } from 'config/sub-applications';
import { KontorolClient, KontorolCategory, KontorolRequest, KontorolMultiRequest, KontorolMultiResponse } from 'kontorol-ngx-client';

export abstract class CategoriesBulkActionBaseService<T> {
  constructor(public _kontorolServerClient: KontorolClient) {
  }

  public abstract execute(selectedCategories: KontorolCategory[], params: T): Observable<any>;

  transmit(requests: KontorolRequest<any>[], chunk: boolean): Observable<void> {
    let maxRequestsPerMultiRequest = requests.length;
    if (chunk) {
      maxRequestsPerMultiRequest = subApplicationsConfig.shared.bulkActionsLimit;
    }

    const multiRequests: Observable<KontorolMultiResponse>[] = [];
    let mr: KontorolMultiRequest = new KontorolMultiRequest();

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
          const mergedResponses = [].concat.apply([], responses);
          const errorMessage = mergedResponses.reduce((acc, val) => `${acc}${val.error ? val.error.message : ''}\n`, '').trim();
          if (errorMessage) {
              throw new Error(errorMessage);
          }
      });
  }
}
