import { Component, OnDestroy, ViewChild } from '@angular/core';
import { PopupWidgetComponent } from '@kontorol-ng/kontorol-ui';
import { AppEventsService } from 'app-shared/kmc-shared';
import { cancelOnDestroy } from '@kontorol-ng/kontorol-common';
import { CaptionRequestEvent } from 'app-shared/kmc-shared/events';
import { ReachData } from 'app-shared/kmc-shared/reach-frame';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';
import { ReachPages } from 'app-shared/kmc-shared/kmc-views/details-views';

@Component({
    selector: 'kCaptionRequest',
    templateUrl: './caption-request-app.component.html',
    styleUrls: ['./caption-request-app.component.scss'],
    providers: [KontorolLogger.createLogger('CaptionRequestAppComponent')]
})
export class CaptionRequestAppComponent implements OnDestroy {
    @ViewChild('captionRequest') captionRequest: PopupWidgetComponent;

    public _data: ReachData;
    public _page: ReachPages;

    constructor(private _logger: KontorolLogger,
                appEvents: AppEventsService) {
        appEvents.event(CaptionRequestEvent)
            .pipe(cancelOnDestroy(this))
            .subscribe(({ data, page }) => {
                this._logger.info(`handle open caption request window event`, { data, page });
                this._data = data;
                this._page = page;
                if (!this.captionRequest.isShow) {
                    this.captionRequest.open();
                } else {
                    this._logger.warn('Cannot open caption request (window already open?)');
                }
            });
    }

    ngOnDestroy() {

    }
}

