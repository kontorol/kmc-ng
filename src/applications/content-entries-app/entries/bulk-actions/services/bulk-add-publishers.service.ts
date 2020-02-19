import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {KontorolClient} from 'kontorol-ngx-client';

import {KontorolMediaEntry} from 'kontorol-ngx-client';
import {KontorolBaseEntry} from 'kontorol-ngx-client';
import {BaseEntryUpdateAction} from 'kontorol-ngx-client';
import {BulkActionBaseService} from './bulk-action-base.service';

@Injectable()
export class BulkAddPublishersService extends BulkActionBaseService<string[]> {

  constructor(_kontorolServerClient: KontorolClient) {
    super(_kontorolServerClient);
  }

  public execute(selectedEntries: KontorolMediaEntry[], publishersIds: string[]): Observable<{}> {
    return Observable.create(observer => {

      const requests: BaseEntryUpdateAction[] = [];

      selectedEntries.forEach(entry => {
        const updatedEntry: KontorolBaseEntry = new KontorolBaseEntry();

        // update entry publishers. trim publishers due to legacy KMC bugs
        let entryPublishers = [];
        if (entry.entitledUsersPublish && entry.entitledUsersPublish.length) {
          entryPublishers = entry.entitledUsersPublish.split(',').map(publisher => {
            return publisher.trim();
          });
        }
        // add selected publishers only if unique
        publishersIds.forEach(publisher => {
          if (entryPublishers.indexOf(publisher) === -1) {
            entryPublishers.push(publisher);
          }
        });
        updatedEntry.entitledUsersPublish = entryPublishers.join(',');
        requests.push(new BaseEntryUpdateAction({
          entryId: entry.id,
          baseEntry: updatedEntry
        }));
      });

      this.transmit(requests, true).subscribe(
        result => {
          observer.next({});
          observer.complete();
        },
        error => {
          observer.error(error);
        }
      );
    });


  }

}
