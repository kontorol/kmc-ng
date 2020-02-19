import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {routing} from './analytics-kava-app.routes';
import {AnalyticsKavaComponent} from './analytics-kava.component';
import {KontorolUIModule} from '@kontorol-ng/kontorol-ui';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routing),
        KontorolUIModule
    ],
    declarations: [
        AnalyticsKavaComponent
    ],
    exports: [],
    providers: [
    ],
})
export class AnalyticsKavaAppModule {
}
