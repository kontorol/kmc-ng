import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KontorolClient } from 'kontorol-ngx-client';

import { KontorolMediaEntry } from 'kontorol-ngx-client';
import { KontorolBaseEntry } from 'kontorol-ngx-client';
import { BaseEntryUpdateAction } from 'kontorol-ngx-client';
import { BulkActionBaseService } from './bulk-action-base.service';

export type SchedulingParams = {
  scheduling: string,
  enableEndDate: boolean,
  startDate: Date,
  endDate: Date
}

@Injectable()
export class BulkSchedulingService extends BulkActionBaseService<SchedulingParams> {

  constructor(_kontorolServerClient: KontorolClient) {
    super(_kontorolServerClient);
  }

  public execute(selectedEntries: KontorolMediaEntry[], schedulingParams : SchedulingParams) : Observable<{}>{
    return Observable.create(observer =>{

      let requests: BaseEntryUpdateAction[] = [];

      selectedEntries.forEach(entry => {
        let updatedEntry: KontorolBaseEntry = new KontorolBaseEntry();
        if (schedulingParams.scheduling === "scheduled"){
          if (schedulingParams.startDate) {
            updatedEntry.startDate = schedulingParams.startDate;
          }
          if (schedulingParams.enableEndDate && schedulingParams.endDate){
            updatedEntry.endDate = schedulingParams.endDate;
          }else{
            updatedEntry.endDate = null;
          }
        }else{
          updatedEntry.startDate = null;
          updatedEntry.endDate = null;
        }

        requests.push(new BaseEntryUpdateAction({
          entryId: entry.id,
          baseEntry: updatedEntry
        }));
      });

      this.transmit(requests, true).subscribe(
        result => {
          observer.next({})
          observer.complete();
        },
        error => {
          observer.error(error);
        }
      );
    });



  }

}
