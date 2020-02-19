import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {routing} from './analytics-live-app.routes';
import {AnalyticsLiveComponent} from './analytics-live.component';
import {KontorolUIModule} from '@kontorol-ng/kontorol-ui';
import { AnalyticsLiveModule } from 'app-shared/kmc-shared/analytics-live/analytics-live.module';
import { LocalizationModule } from '@kontorol-ng/mc-shared';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routing),
        KontorolUIModule,
        AnalyticsLiveModule,
        LocalizationModule
    ],
    declarations: [
        AnalyticsLiveComponent
    ],
    exports: [],
    providers: [
    ],
})
export class AnalyticsLiveAppModule {
}
