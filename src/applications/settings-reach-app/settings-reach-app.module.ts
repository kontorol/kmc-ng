import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsReachComponent } from './settings-reach.component';
import { routing } from './settings-reach-app.routes';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AreaBlockerModule } from '@kontorol-ng/kontorol-ui';
import { TagsModule } from '@kontorol-ng/kontorol-ui';
import { TranslateModule } from '@ngx-translate/core';
import { ReachProfilesComponentsList } from './reach-profiles/components-list';
import { KontorolUIModule, TooltipModule, StickyModule } from '@kontorol-ng/kontorol-ui';
import { MenuModule } from 'primeng/menu';
import { LocalizationModule } from '@kontorol-ng/mc-shared';
import { FiltersModule } from '@kontorol-ng/mc-shared';
import { DetailsBarModule } from '@kontorol-ng/kontorol-ui';
import { PopupWidgetModule } from '@kontorol-ng/kontorol-ui';
import { KMCPermissionsModule } from 'app-shared/kmc-shared/kmc-permissions';
import { TableModule } from 'primeng/table';
import { DateFormatModule } from 'app-shared/kmc-shared/date-format/date-format.module';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { ReachProfileComponentsList } from "./reach-profile/components-list";
import { ReachProfileCanDeactivate } from "./reach-profile/reach-profile-can-deactivate.service";
import { InputSwitchModule } from 'primeng/inputswitch';
import { ChipsModule } from 'primeng/chips';
import { TreeModule } from 'primeng/tree';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routing),
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    AreaBlockerModule,
    TagsModule,
    TranslateModule,
    TooltipModule,
    TreeModule,
    MultiSelectModule,
    LocalizationModule,
    FiltersModule,
    KontorolUIModule,
    PaginatorModule,
    StickyModule,
    MenuModule,
    DetailsBarModule,
    TooltipModule,
    PopupWidgetModule,
    DropdownModule,
    InputSwitchModule,
    KMCPermissionsModule,
    TableModule,
    DateFormatModule,
    ChipsModule
  ],
  declarations: [
    SettingsReachComponent,
    ...ReachProfilesComponentsList,
    ...ReachProfileComponentsList
  ],
  providers: [
      ReachProfileCanDeactivate
  ]
})
export class SettingsReachAppModule {
}
