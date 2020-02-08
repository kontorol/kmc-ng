import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TagsModule } from '@kontorol-ng/kontorol-ui';
import {
  AccordionModule,
  ButtonModule,
  CalendarModule,
  CheckboxModule,
  ConfirmDialogModule,
  DropdownModule, InputSwitchModule,
  InputTextareaModule,
  InputTextModule,
  MenuModule,
  PaginatorModule,
  RadioButtonModule,
  SharedModule,
  SpinnerModule,
  TieredMenuModule,
  TreeModule
} from 'primeng/primeng';
import { KMCShellModule } from 'app-shared/kmc-shell';

import { routing } from './administration-multi-account-app.routes';
import { AdministrationMultiAccountComponent } from './administration-multi-account.component';

import { DynamicMetadataFormModule } from 'app-shared/kmc-shared';

import {LocalizationModule} from '@kontorol-ng/mc-shared';
import { KontorolPrimeNgUIModule } from '@kontorol-ng/kontorol-primeng-ui';
import { AreaBlockerModule, KontorolUIModule, StickyModule, TooltipModule } from '@kontorol-ng/kontorol-ui';
import { AutoCompleteModule } from '@kontorol-ng/kontorol-primeng-ui';
import { PopupWidgetModule } from '@kontorol-ng/kontorol-ui';
import { DynamicFormModule } from '@kontorol-ng/kontorol-ui';
import { DynamicFormModule as PrimeDynamicFormModule } from '@kontorol-ng/kontorol-primeng-ui';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from '@kontorol-ng/kontorol-primeng-ui';
import { AccountsListComponent } from './accounts-list/accounts-list.component';
import { AccountsTableComponent } from './accounts-table/accounts-table.component';
import { AccountsRefineFiltersComponent } from './accounts-refine-filters/accounts-refine-filters.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { StatusPipe } from './pipes/status.pipe';
import { AccountsTagsComponent } from './accounts-tags/accounts-tags.component';
import { KMCPermissionsModule } from 'app-shared/kmc-shared/kmc-permissions';
import { DateFormatModule } from 'app-shared/kmc-shared/date-format/date-format.module';
import { FiltersModule } from '@kontorol-ng/mc-shared';

@NgModule({
  imports: [
    AccordionModule,
    AreaBlockerModule,
    AutoCompleteModule,
    ButtonModule,
    CalendarModule,
    CheckboxModule,
    CommonModule,
    ConfirmDialogModule,
    DropdownModule,
    DynamicFormModule,
    FormsModule,
    InputTextareaModule,
    InputTextModule,
    LocalizationModule,
    DynamicMetadataFormModule,
    KontorolPrimeNgUIModule,
    KontorolUIModule,
    KMCShellModule,
    MenuModule,
    MultiSelectModule,
    PaginatorModule,
    PopupWidgetModule,
    PrimeDynamicFormModule,
    RadioButtonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routing),
    SharedModule,
    SpinnerModule,
    TagsModule,
    TieredMenuModule,
    TooltipModule,
    TreeModule,
    StickyModule,
    KMCPermissionsModule,
    TableModule,
    InputSwitchModule,
      DateFormatModule,
      FiltersModule
  ],
  declarations: [
    AdministrationMultiAccountComponent,
    AccountsListComponent,
    AccountsTableComponent,
    StatusPipe,
    AccountsRefineFiltersComponent,
    AccountsTagsComponent,
    NewAccountComponent
  ],
  exports: [],
  providers: [],
})
export class AdministrationMultiAccountAppModule {
}
