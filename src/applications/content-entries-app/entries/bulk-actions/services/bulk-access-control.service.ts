import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KontorolClient } from 'kontorol-ngx-client';

import { KontorolMediaEntry } from 'kontorol-ngx-client';
import { KontorolBaseEntry } from 'kontorol-ngx-client';
import { BaseEntryUpdateAction } from 'kontorol-ngx-client';
import { BulkActionBaseService } from './bulk-action-base.service';
import { KontorolAccessControl } from 'kontorol-ngx-client';

@Injectable()
export class BulkAccessControlService extends BulkActionBaseService<KontorolAccessControl> {

  constructor(_kontorolServerClient: KontorolClient) {
    super(_kontorolServerClient);
  }

  public execute(selectedEntries: KontorolMediaEntry[], profile : KontorolAccessControl) : Observable<{}>{
    return Observable.create(observer =>{

      let requests: BaseEntryUpdateAction[] = [];

      selectedEntries.forEach(entry => {
        let updatedEntry: KontorolBaseEntry = new KontorolBaseEntry();
        updatedEntry.accessControlId = profile.id;
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
