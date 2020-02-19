import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseEntryUpdateAction, KontorolBaseEntry, KontorolClient, KontorolMediaEntry } from 'kontorol-ngx-client';
import { BulkActionBaseService } from './bulk-action-base.service';

@Injectable()
export class BulkAddViewersService extends BulkActionBaseService<string[]> {

    constructor(_kontorolServerClient: KontorolClient) {
        super(_kontorolServerClient);
    }

    public execute(selectedEntries: KontorolMediaEntry[], viewersIds: string[]): Observable<{}> {
        return Observable.create(observer => {

            const requests: BaseEntryUpdateAction[] = [];

            selectedEntries.forEach(entry => {
                const updatedEntry: KontorolBaseEntry = new KontorolBaseEntry();

                // update entry publishers. trim publishers due to legacy KMC bugs
                let entryViewers = [];
                if (entry.entitledUsersView && entry.entitledUsersView.length) {
                    entryViewers = entry.entitledUsersView.split(',').map(publisher => publisher.trim());
                }
                // add selected publishers only if unique
                viewersIds.forEach(publisher => {
                    if (entryViewers.indexOf(publisher) === -1) {
                        entryViewers.push(publisher);
                    }
                });
                updatedEntry.entitledUsersView = entryViewers.join(',');
                requests.push(new BaseEntryUpdateAction({ entryId: entry.id, baseEntry: updatedEntry }));
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
