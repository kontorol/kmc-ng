import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsLiveFrameComponent } from './analytics-live-frame.component';
import { AnalyticsLiveComponent } from './analytics-live.component';
import { KontorolUIModule } from '@kontorol-ng/kontorol-ui';


@NgModule({
    imports: [
        CommonModule,
        KontorolUIModule
    ],
    declarations: [
        AnalyticsLiveFrameComponent,
        AnalyticsLiveComponent
    ],
    providers: [],
    exports: [
        AnalyticsLiveFrameComponent,
        AnalyticsLiveComponent
    ]
})
export class AnalyticsLiveModule {
}
