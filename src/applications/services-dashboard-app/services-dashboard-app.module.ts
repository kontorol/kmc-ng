import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesDashboardComponent } from './services-dashboard.component';
import { KontorolUIModule } from '@kontorol-ng/kontorol-ui';
import { routing } from './services-dashboard-app.routes';
import { RouterModule } from '@angular/router';
import { ReachFrameModule } from 'app-shared/kmc-shared';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routing),
        KontorolUIModule,
        ReachFrameModule
    ],
    declarations: [
        ServicesDashboardComponent
    ],
    exports: [],
    providers: [],
})
export class ServicesDashboardAppModule {
}
