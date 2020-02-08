import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routing } from './content-moderation-app.routes';

import { ContentModerationComponent } from './content-moderation.component';
import { EntriesComponentsList } from './entries-components-list';
import { EntriesModule } from 'app-shared/content-shared/entries/entries.module';

import { AreaBlockerModule, KontorolUIModule, TooltipModule } from '@kontorol-ng/kontorol-ui';
import {
  AccordionModule,
  ButtonModule,
  CalendarModule,
  CheckboxModule,
  ConfirmDialogModule,
  DropdownModule,
  InputTextareaModule,
  InputTextModule,
  MenuModule,
  MultiSelectModule,
  PaginatorModule,
  RadioButtonModule,
  SharedModule,
  SpinnerModule,
  TieredMenuModule,
  TreeModule
} from 'primeng/primeng';
import {LocalizationModule} from '@kontorol-ng/mc-shared';
import { KontorolPrimeNgUIModule } from '@kontorol-ng/kontorol-primeng-ui';
import { PopupWidgetModule } from '@kontorol-ng/kontorol-ui';
import { AutoCompleteModule } from '@kontorol-ng/kontorol-primeng-ui';
import { DynamicFormModule } from '@kontorol-ng/kontorol-ui';
import { DynamicFormModule as PrimeDynamicFormModule } from '@kontorol-ng/kontorol-primeng-ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KMCShellModule } from 'app-shared/kmc-shell';
import { TagsModule } from '@kontorol-ng/kontorol-ui';
import { DynamicMetadataFormModule } from 'app-shared/kmc-shared';
import { KMCPermissionsModule } from 'app-shared/kmc-shared/kmc-permissions';
import { DateFormatModule } from 'app-shared/kmc-shared/date-format/date-format.module';

@NgModule({
  imports: [
    CommonModule,
    AreaBlockerModule,
    LocalizationModule,
    KontorolUIModule,
    TooltipModule,
    PaginatorModule,
    ButtonModule,
    PopupWidgetModule,
    MenuModule,
    KontorolPrimeNgUIModule,
    SharedModule,
      EntriesModule,
    AccordionModule,
    CalendarModule,
    CheckboxModule,
    ConfirmDialogModule,
    DropdownModule,
    InputTextareaModule,
    InputTextModule,
    MultiSelectModule,
    RadioButtonModule,
    SpinnerModule,
    TieredMenuModule,
    TreeModule,
    RouterModule.forChild(routing),
    AutoCompleteModule,
    DynamicFormModule,
    FormsModule,
    DynamicMetadataFormModule,
    KMCShellModule,
    PrimeDynamicFormModule,
    ReactiveFormsModule,
    TagsModule,
    KMCPermissionsModule,
      DateFormatModule,
  ],
  declarations: [
    ContentModerationComponent,
    EntriesComponentsList
  ],
  exports: [],
  providers: []
})
export class ContentModerationAppModule {
}
