import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsCustomDataComponent } from './settings-custom-data.component';
import { routing } from './settings-custom-data-app.routes';
import { RouterModule } from '@angular/router';
import { AreaBlockerModule, KontorolUIModule } from '@kontorol-ng/kontorol-ui';
import { SchemasComponents } from './schemas/schemas-components-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ButtonModule, CalendarModule, CheckboxModule, DropdownModule, InputSwitchModule, InputTextModule, MenuModule,
  PaginatorModule,
  RadioButtonModule, SharedModule, TieredMenuModule
} from 'primeng/primeng';
import { EntriesModule } from 'app-shared/content-shared/entries/entries.module.ts';
import {LocalizationModule} from '@kontorol-ng/mc-shared';
import { TooltipModule } from '@kontorol-ng/kontorol-ui';
import { PopupWidgetModule } from '@kontorol-ng/kontorol-ui';
import { KontorolPrimeNgUIModule } from '@kontorol-ng/kontorol-primeng-ui';
import { StickyModule } from '@kontorol-ng/kontorol-ui';
import { KMCPermissionsModule } from 'app-shared/kmc-shared/kmc-permissions';
import { TableModule } from 'primeng/table';

@NgModule({
  imports: [
    CommonModule,
    AreaBlockerModule,
    LocalizationModule,
    KontorolUIModule,
    PaginatorModule,
    TooltipModule,
    ButtonModule,
    TieredMenuModule,
    CheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    PopupWidgetModule,
    CalendarModule,
    MenuModule,
    RadioButtonModule,
    KontorolPrimeNgUIModule,
    SharedModule,
    RouterModule.forChild(routing),
    StickyModule,
    EntriesModule,
    DropdownModule,
    InputSwitchModule,
    KMCPermissionsModule,
      TableModule
  ],
  declarations: [
    SettingsCustomDataComponent,
    SchemasComponents
  ]
})
export class SettingsCustomDataAppModule {
}
