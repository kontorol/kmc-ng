import { Component, Input } from '@angular/core';
import { KontorolLiveEntry } from 'kontorol-ngx-client';
import { PopupWidgetComponent } from '@kontorol-ng/kontorol-ui';

@Component({
    selector: 'kAnalyticsLive',
    templateUrl: './analytics-live.component.html',
    styleUrls: ['./analytics-live.component.scss']
})
export class AnalyticsLiveComponent {
    @Input() entry: KontorolLiveEntry;
    @Input() parentPopup: PopupWidgetComponent;
}
