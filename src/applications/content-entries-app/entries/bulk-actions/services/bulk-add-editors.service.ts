import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {KontorolClient} from 'kontorol-ngx-client';

import {KontorolMediaEntry} from 'kontorol-ngx-client';
import {KontorolBaseEntry} from 'kontorol-ngx-client';
import {BaseEntryUpdateAction} from 'kontorol-ngx-client';
import {BulkActionBaseService} from './bulk-action-base.service';

@Injectable()
export class BulkAddEditorsService extends BulkActionBaseService<string[]> {

  constructor(_kontorolServerClient: KontorolClient) {
    super(_kontorolServerClient);
  }

  public execute(selectedEntries: KontorolMediaEntry[], editorsIds: string[]): Observable<{}> {
    return Observable.create(observer => {

      const requests: BaseEntryUpdateAction[] = [];

      selectedEntries.forEach(entry => {
        const updatedEntry: KontorolBaseEntry = new KontorolBaseEntry();

        // update entry editors. trim editors due to legacy KMC bugs
        let entryEditors = [];
        if (entry.entitledUsersEdit && entry.entitledUsersEdit.length) {
          entryEditors = entry.entitledUsersEdit.split(',').map(editor => {
            return editor.trim();
          });
        }
        // add selected editors only if unique
        editorsIds.forEach(editor => {
          if (entryEditors.indexOf(editor) === -1) {
            entryEditors.push(editor);
          }
        });
        updatedEntry.entitledUsersEdit = entryEditors.join(',');
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
