import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routing } from './content-drop-folders-app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AreaBlockerModule, KontorolUIModule, StickyModule, TooltipModule } from '@kontorol-ng/kontorol-ui';
import {
  ButtonModule,
  CalendarModule,
  CheckboxModule,
  InputTextModule,
  MenuModule,
  PaginatorModule,
  SharedModule,
  TieredMenuModule,
  TreeModule
} from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import {LocalizationModule} from '@kontorol-ng/mc-shared';
import { KontorolPrimeNgUIModule } from '@kontorol-ng/kontorol-primeng-ui';
import { AutoCompleteModule } from '@kontorol-ng/kontorol-primeng-ui';
import { TagsModule } from '@kontorol-ng/kontorol-ui';
import { PopupWidgetModule } from '@kontorol-ng/kontorol-ui';
import { EntriesModule } from 'app-shared/content-shared/entries/entries.module';

import { ContentDropFoldersComponent } from './content-drop-folders.component';
import { DropFoldersComponentsList } from './drop-folders-components-list';
import { KMCShellModule } from 'app-shared/kmc-shell';
import { FiltersModule } from '@kontorol-ng/mc-shared';
import { KMCPermissionsModule } from 'app-shared/kmc-shared/kmc-permissions';
import { DateFormatModule } from 'app-shared/kmc-shared/date-format/date-format.module';

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
    InputTextModule,
    PopupWidgetModule,
    CalendarModule,
    MenuModule,
    TagsModule,
    KontorolPrimeNgUIModule,
    AutoCompleteModule,
    TreeModule,
    SharedModule,
    KMCShellModule,
    FormsModule,
    ReactiveFormsModule,
    StickyModule,
      EntriesModule,
    RouterModule.forChild(routing),
    FiltersModule,
    TableModule,
    KMCPermissionsModule,
      DateFormatModule,
  ],
  declarations: [
    ContentDropFoldersComponent,
    DropFoldersComponentsList
  ],
  exports: [],
  providers: []
})
export class ContentDropFoldersAppModule {
}
