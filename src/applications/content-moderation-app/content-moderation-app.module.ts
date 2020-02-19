import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routing } from './content-moderation-app.routes';

import { ContentModerationComponent } from './content-moderation.component';
import { EntriesComponentsList } from './entries-components-list';
import { EntriesModule } from 'app-shared/content-shared/entries/entries.module';

import { AreaBlockerModule, KontorolUIModule, TooltipModule } from '@kontorol-ng/kontorol-ui';
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
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { SharedModule } from 'primeng/shared';
import { AccordionModule } from 'primeng/accordion';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SpinnerModule } from 'primeng/spinner';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TreeModule } from 'primeng/tree';

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
