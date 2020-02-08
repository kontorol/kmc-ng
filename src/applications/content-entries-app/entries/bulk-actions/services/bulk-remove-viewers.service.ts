import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseEntryUpdateAction, KontorolBaseEntry, KontorolClient, KontorolMediaEntry } from 'kontorol-ngx-client';
import { BulkActionBaseService } from './bulk-action-base.service';

@Injectable()
export class BulkRemoveViewersService extends BulkActionBaseService<string[]> {

    constructor(_kontorolServerClient: KontorolClient) {
        super(_kontorolServerClient);
    }

    public execute(selectedEntries: KontorolMediaEntry[], viewers: string[]): Observable<{}> {
        return Observable.create(observer => {

            const requests: BaseEntryUpdateAction[] = [];

            selectedEntries.forEach(entry => {
                const updatedEntry: KontorolBaseEntry = new KontorolBaseEntry();

                // update entry publishers. trim publishers due to legacy KMC bugs
                let entryViewers = [];
                if (entry.entitledUsersView && entry.entitledUsersView.length) {
                    entryViewers = entry.entitledUsersView.split(',').map(viewer => viewer.trim());
                }
                // remove selected publishers only if exist
                viewers.forEach(publisher => {
                    const index = entryViewers.indexOf(publisher.trim());
                    if (index !== -1) {
                        entryViewers.splice(index, 1);
                    }
                });
                updatedEntry.entitledUsersView = entryViewers.toString();
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
