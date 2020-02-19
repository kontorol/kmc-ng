import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { routing } from './content-bulk-log-app.routes';

import { AreaBlockerModule, KontorolUIModule, TooltipModule, StickyModule } from '@kontorol-ng/kontorol-ui';
import { TableModule } from 'primeng/table';
import {LocalizationModule} from '@kontorol-ng/mc-shared';
import { KontorolPrimeNgUIModule } from '@kontorol-ng/kontorol-primeng-ui';
import { AutoCompleteModule } from '@kontorol-ng/kontorol-primeng-ui';
import { TagsModule } from '@kontorol-ng/kontorol-ui';
import { PopupWidgetModule } from '@kontorol-ng/kontorol-ui';
import { ContentBulkLogAppComponent } from './content-bulk-log-app.component';
import { BulkLogTableComponent } from './bulk-log-table/bulk-log-table.component';
import { BulkLogListComponent } from './bulk-log-list/bulk-log-list.component';
import { BulkLogObjectTypePipe } from './pipes/bulk-log-object-type.pipe';
import { BulkLogStatusPipe } from './pipes/bulk-log-status.pipe';
import { BulkLogRefineFiltersComponent } from './bulk-log-refine-filters/bulk-log-refine-filters.component';
import { BulkLogStatusIconPipe } from './pipes/bulk-log-status-icon.pipe';
import { BulkLogTagsComponent } from './bulk-log-tags/bulk-log-tags.component';
import { FiltersModule } from '@kontorol-ng/mc-shared';
import { KMCPermissionsModule } from 'app-shared/kmc-shared/kmc-permissions';
import { DateFormatModule } from 'app-shared/kmc-shared/date-format/date-format.module';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { MenuModule } from 'primeng/menu';
import { SharedModule } from 'primeng/shared';
import { TreeModule } from 'primeng/tree';

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
    TagsModule,
    KontorolPrimeNgUIModule,
    AutoCompleteModule,
    SharedModule,
    RouterModule.forChild(routing),
    TreeModule,
    StickyModule,
      FiltersModule,
    TableModule,
    KMCPermissionsModule,
      DateFormatModule,
  ],
  declarations: [
    ContentBulkLogAppComponent,
    BulkLogTableComponent,
    BulkLogListComponent,
    BulkLogObjectTypePipe,
    BulkLogStatusPipe,
    BulkLogStatusIconPipe,
    BulkLogRefineFiltersComponent,
    BulkLogTagsComponent
  ],
  exports: []
})
export class ContentBulkLogAppModule {
}
