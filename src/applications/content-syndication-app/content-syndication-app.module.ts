import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {routing} from './content-syndication-app.routes';
import {AreaBlockerModule, KontorolUIModule, StickyModule, TooltipModule} from '@kontorol-ng/kontorol-ui';
import {
  CheckboxModule,
  ConfirmDialogModule,
  DropdownModule,
  InputTextModule,
  MenuModule,
  MultiSelectModule,
  PaginatorModule,
  RadioButtonModule,
  SpinnerModule,
  TieredMenuModule
} from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import {LocalizationModule} from '@kontorol-ng/mc-shared';
import {KMCShellModule} from 'app-shared/kmc-shell';
import {PopupWidgetModule} from '@kontorol-ng/kontorol-ui';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ButtonModule} from 'primeng/components/button/button';
import {KontorolPrimeNgUIModule} from '@kontorol-ng/kontorol-primeng-ui';
import {FeedsListComponent} from './feeds/feeds-list/feeds-list.component';
import {FeedsTableComponent} from './feeds/feeds-table/feeds-table.component';
import {ContentSyndicationComponent} from './content-syndication.component';
import {DestinationLabelPipe} from './pipes/destination-label.pipe';
import {PlaylistNamePipe} from './pipes/playlist-name.pipe';
import {PlaylistIconPipe} from './pipes/playlist-icon.pipe';
import {DestinationIconPipe} from './pipes/destination-icon.pipe';
import {FeedDetailsComponentsList} from './feeds/feed-details/feed-details-components-list';
import {CopyToClipboardModule} from '@kontorol-ng/mc-shared';
import { KMCPermissionsModule } from 'app-shared/kmc-shared/kmc-permissions';
import { InputHelperModule } from '@kontorol-ng/kontorol-ui';
import { SearchableDropdownModule } from 'app-shared/kmc-shared/searchable-dropdown';

@NgModule({
  imports: [
    AreaBlockerModule,
    ButtonModule,
    CheckboxModule,
    CommonModule,
    ConfirmDialogModule,
    DropdownModule,
    InputTextModule,
    RadioButtonModule,
    LocalizationModule,
    KontorolPrimeNgUIModule,
    KontorolUIModule,
    KMCShellModule,
    MenuModule,
    PaginatorModule,
    PopupWidgetModule,
    ReactiveFormsModule,
    RouterModule.forChild(routing),
    SpinnerModule,
    TieredMenuModule,
    TooltipModule,
    MultiSelectModule,
    StickyModule,
    FormsModule,
    CopyToClipboardModule,
    TableModule,
    KMCPermissionsModule,
    InputHelperModule,
      SearchableDropdownModule,
  ],
  declarations: [
    DestinationIconPipe,
    DestinationLabelPipe,
    ContentSyndicationComponent,
    PlaylistNamePipe,
    PlaylistIconPipe,
    FeedsListComponent,
    FeedsTableComponent,
    FeedDetailsComponentsList]
})
export class ContentSyndicationAppModule {
}
