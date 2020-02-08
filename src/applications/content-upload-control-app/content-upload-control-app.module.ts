import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { routing } from './content-upload-control-app.routes';

import { AreaBlockerModule, StickyModule } from '@kontorol-ng/kontorol-ui';
import {
  PaginatorModule,
  ButtonModule,
  TieredMenuModule,
  CheckboxModule,
  InputTextModule,
  CalendarModule,
  MenuModule,
  SharedModule,
  ProgressBarModule,
} from 'primeng/primeng';
import {LocalizationModule} from '@kontorol-ng/mc-shared';
import { KontorolPrimeNgUIModule } from '@kontorol-ng/kontorol-primeng-ui';
import {
  KontorolUIModule,
  TooltipModule
} from '@kontorol-ng/kontorol-ui';
import { AutoCompleteModule } from '@kontorol-ng/kontorol-primeng-ui';
import { TagsModule } from '@kontorol-ng/kontorol-ui';
import { PopupWidgetModule } from '@kontorol-ng/kontorol-ui';

import { ContentUploadControlComponent } from './content-upload-control.component';
import { UploadListComponent } from './upload-list/upload-list.component';
import { UploadListTableComponent } from './upload-list/upload-list-table.component';
import { UploadProgressComponent } from './upload-list/upload-progress/upload-progress.component';
import { KMCShellModule } from 'app-shared/kmc-shell';
import { UploadStatusPipe } from './upload-list/pipes/upload-status.pipe';
import { TableModule } from 'primeng/table';
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
    ProgressBarModule,
    KMCShellModule,
    StickyModule,
    RouterModule.forChild(routing),
      TableModule,
      DateFormatModule,
  ],
  declarations: [
    ContentUploadControlComponent,
    UploadListComponent,
    UploadListTableComponent,
    UploadProgressComponent,
    UploadStatusPipe
  ],
  exports: [],
  providers: []
})
export class ContentUploadControlAppModule {
}
