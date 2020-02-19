import {Component, OnDestroy, OnInit} from '@angular/core';
import {KontorolLogger} from '@kontorol-ng/kontorol-logger';
import {EntryAdvertisementsWidget} from './entry-advertisements-widget.service';
import { AdvertisementsAppViewService } from 'app-shared/kmc-shared/kmc-views/component-views';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';
import { EntryStore } from '../entry-store.service';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/merge';

@Component({
    selector: 'kEntryAdvertisements',
    templateUrl: './entry-advertisements.component.html',
    styleUrls: ['./entry-advertisements.component.scss']
})
export class EntryAdvertisementsComponent implements OnInit, OnDestroy {

    public _advertisementsEnabled = false;

    constructor(public _widgetService: EntryAdvertisementsWidget,
                public _store: EntryStore,
                private _advertisementsAppViewService: AdvertisementsAppViewService,
                logger: KontorolLogger) {
    }

    ngOnInit() {
        this._widgetService.attachForm();

        Observable.merge(
            this._widgetService.data$,
            this._store.hasSource.value$
        )
            .pipe(cancelOnDestroy(this))
            .subscribe(
                () => {
                    if (this._widgetService.data) {
                        this._advertisementsEnabled = this._advertisementsAppViewService.isAvailable({
                            entry: this._widgetService.data,
                            hasSource: this._store.hasSource.value()
                        });
                    } else {
                        this._advertisementsEnabled = false;
                    }

                }
            );
    }

    ngOnDestroy() {
        this._widgetService.detachForm();
    }
}

