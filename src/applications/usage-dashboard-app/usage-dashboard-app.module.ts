import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsageDashboardComponent} from './usage-dashboard.component';
import {KontorolUIModule} from '@kontorol-ng/kontorol-ui';
import {routing} from './usage-dashboard-app.routes';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routing),
    KontorolUIModule
  ],
  declarations: [
    UsageDashboardComponent
  ],
  exports: [],
  providers: [],
})
export class UsageDashboardAppModule {
}
