import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {KontorolClient} from 'kontorol-ngx-client';

import {KontorolMediaEntry} from 'kontorol-ngx-client';
import {KontorolBaseEntry} from 'kontorol-ngx-client';
import {BaseEntryUpdateAction} from 'kontorol-ngx-client';
import {BulkActionBaseService} from './bulk-action-base.service';

@Injectable()
export class BulkRemoveEditorsService extends BulkActionBaseService<string[]> {

  constructor(_kontorolServerClient: KontorolClient) {
    super(_kontorolServerClient);
  }

  public execute(selectedEntries: KontorolMediaEntry[], editors: string[]): Observable<{}> {
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
        // remove selected editors only if exist
        editors.forEach(editor => {
          const index = entryEditors.indexOf(editor.trim());
          if (index !== -1) {
            entryEditors.splice(index, 1);
          }
        });
        updatedEntry.entitledUsersEdit = entryEditors.toString();
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
