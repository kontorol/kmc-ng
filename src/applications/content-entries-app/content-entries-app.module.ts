import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DetailsBarModule} from '@kontorol-ng/kontorol-ui';
import {TagsModule} from '@kontorol-ng/kontorol-ui';
import {
    AccordionModule,
    ButtonModule,
    CalendarModule,
    CheckboxModule,
    ConfirmationService,
    ConfirmDialogModule,
    DropdownModule,
    InputSwitchModule,
    InputTextareaModule,
    InputTextModule,
    MenuModule,
    MultiSelectModule,
    OverlayPanelModule,
    PaginatorModule,
    RadioButtonModule,
    SharedModule,
    SpinnerModule,
    TieredMenuModule,
    TreeModule
} from 'primeng/primeng';
import {KMCShellModule} from 'app-shared/kmc-shell';

import {routing} from './content-entries-app.routes';
import {ContentEntriesComponent} from './content-entries.component';

import {DynamicMetadataFormModule} from 'app-shared/kmc-shared';

import {LocalizationModule} from '@kontorol-ng/mc-shared';
import {KontorolPrimeNgUIModule} from '@kontorol-ng/kontorol-primeng-ui';
import {AreaBlockerModule, KontorolUIModule, StickyModule, TooltipModule} from '@kontorol-ng/kontorol-ui';
import {AutoCompleteModule} from '@kontorol-ng/kontorol-primeng-ui';
import {PopupWidgetModule} from '@kontorol-ng/kontorol-ui';
import {DynamicFormModule} from '@kontorol-ng/kontorol-ui';
import {DynamicFormModule as PrimeDynamicFormModule} from '@kontorol-ng/kontorol-primeng-ui';
import {EntryComponentsList} from './entry/entry-components-list';
import {EntriesComponentsList} from './entries/entries-components-list';

import {EntryCanDeactivate} from './entry/entry-can-deactivate.service';
import {EntriesModule} from 'app-shared/content-shared/entries/entries.module';
import {ContentEntriesAppService} from './content-entries-app.service';
import {CategoriesModule} from 'app-shared/content-shared/categories/categories.module';
import {CopyToClipboardModule} from '@kontorol-ng/mc-shared';
import {KEditHosterModule} from 'app-shared/kmc-shared/kedit-hoster/kedit-hoster.module';
import { KMCPermissionsModule } from 'app-shared/kmc-shared/kmc-permissions';
import { TableModule } from 'primeng/table';
import { EntriesListService } from './entries/entries-list.service';
import { InputHelperModule } from '@kontorol-ng/kontorol-ui';
import { AnalyticsLiveModule } from 'app-shared/kmc-shared/analytics-live/analytics-live.module';
import { KPTableModule } from '@kontorol-ng/kontorol-primeng-ui';
import { ClearableInputModule } from '@kontorol-ng/kontorol-primeng-ui';
import { DateFormatModule } from 'app-shared/kmc-shared/date-format/date-format.module';
import { ToggleLiveComponent } from './entry/components/toggle-live/toggle-live.component';

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
      CategoriesModule,
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
    DetailsBarModule,
      EntriesModule,
    StickyModule,
    CopyToClipboardModule,
    OverlayPanelModule,
    KEditHosterModule,
    StickyModule,
    KMCPermissionsModule,
    TableModule,
    InputSwitchModule,
    InputHelperModule,
    AnalyticsLiveModule,
    KPTableModule,
      ClearableInputModule,
      DateFormatModule,
  ],
  declarations: [
    ContentEntriesComponent,
    EntryComponentsList,
    EntriesComponentsList,
    ToggleLiveComponent,
  ],
  exports: [],
  providers: [
    ConfirmationService,
    EntryCanDeactivate,
    EntriesListService,
    ContentEntriesAppService
  ],
})
export class ContentEntriesAppModule {
}
