import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routing } from './administration-users-app.routes';
import { AdministrationUsersComponent } from './administration-users.component';
import { UsersComponentsList } from './users/users-components-list';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AreaBlockerModule, KontorolUIModule, StickyModule, TooltipModule } from '@kontorol-ng/kontorol-ui';
import { KontorolPrimeNgUIModule } from '@kontorol-ng/kontorol-primeng-ui';
import { ButtonModule, DropdownModule, MenuModule, PaginatorModule } from 'primeng/primeng';
import {LocalizationModule} from '@kontorol-ng/mc-shared';
import { PopupWidgetModule } from '@kontorol-ng/kontorol-ui';
import { KMCPermissionsModule } from 'app-shared/kmc-shared/kmc-permissions';
import { TableModule } from 'primeng/table';
import { DateFormatModule } from 'app-shared/kmc-shared/date-format/date-format.module';

@NgModule({
  imports: [
    CommonModule,
    AreaBlockerModule,
    TableModule,
    LocalizationModule,
    PaginatorModule,
    MenuModule,
    ButtonModule,
    PopupWidgetModule,
    FormsModule,
    ReactiveFormsModule,
    KontorolPrimeNgUIModule,
    DropdownModule,
    KontorolUIModule,
    TooltipModule,
    StickyModule,
    RouterModule.forChild(routing),
    TooltipModule,
    KMCPermissionsModule,
      DateFormatModule,
  ],
  declarations: [
    AdministrationUsersComponent,
    UsersComponentsList,
    EditUserComponent
  ],
  exports: [],
  providers: []
})
export class AdministrationUsersAppModule {
}
