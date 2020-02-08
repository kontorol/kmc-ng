import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {routing} from './settings-integration-settings-app.routes';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {ButtonModule, DropdownModule, InputTextModule, MenuModule} from 'primeng/primeng';
import {AreaBlockerModule, InputHelperModule, StickyModule, TooltipModule} from '@kontorol-ng/kontorol-ui';
import {TranslateModule} from '@ngx-translate/core';
import {SettingsIntegrationSettingsComponent} from './settings-integration-settings.component';
import {AccountInfoComponent} from './account-info/account-info.component';
import {EntitlementComponent} from './entitlement/entitlement.component';
import {EntitlementTableComponent} from './entitlement/entitlement-table/entitlement-table.component';
import {PopupWidgetModule} from '@kontorol-ng/kontorol-ui';
import {NewEntitlementComponent} from './entitlement/new-entitlement/new-entitlement.component';
import {EditEntitlementComponent} from './entitlement/edit-entitlement/edit-entitlement.component';
import {CategoriesModule} from 'app-shared/content-shared/categories/categories.module';
import { KMCPermissionsModule } from 'app-shared/kmc-shared/kmc-permissions';
import { TableModule } from 'primeng/table';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routing),
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    AreaBlockerModule,
    TranslateModule,
    TooltipModule,
    MenuModule,
    PopupWidgetModule,
    StickyModule,
    CategoriesModule,
    KMCPermissionsModule,
    InputHelperModule,
    KMCPermissionsModule,
      TableModule
  ],
  declarations: [
    SettingsIntegrationSettingsComponent,
    AccountInfoComponent,
    EntitlementComponent,
    EntitlementTableComponent,
    NewEntitlementComponent,
    EditEntitlementComponent
  ]
})
export class SettingsIntegrationSettingsAppModule {
}
