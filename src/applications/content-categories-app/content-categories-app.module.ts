import {
  CategoriesBulkAddTagsService,
  CategoriesBulkChangeCategoryListingService,
  CategoriesBulkChangeContentPrivacyService,
  CategoriesBulkChangeContributionPolicyService,
  CategoriesBulkChangeOwnerService,
  CategoriesBulkDeleteService,
  CategoriesBulkRemoveTagsService
} from './categories/bulk-actions/services';
import {CategoriesBulkActionsComponent} from './categories/bulk-actions/categories-bulk-actions.component';
import {CategoriesModule} from 'app-shared/content-shared/categories/categories.module';

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {TagsModule} from '@kontorol-ng/kontorol-ui';
import {TableModule} from 'primeng/table';
import {KMCShellModule} from 'app-shared/kmc-shell';

import {routing} from './content-categories-app.routes';
import {ContentCategoriesComponent} from './content-categories.component';

import {DynamicMetadataFormModule} from 'app-shared/kmc-shared';

import {LocalizationModule} from '@kontorol-ng/mc-shared';

import {KontorolPrimeNgUIModule} from '@kontorol-ng/kontorol-primeng-ui';
import {
  AreaBlockerModule,
  InputHelperModule,
  KontorolUIModule,
  StickyModule,
  TooltipModule
} from '@kontorol-ng/kontorol-ui';
import {AutoCompleteModule} from '@kontorol-ng/kontorol-primeng-ui';
import {PopupWidgetModule} from '@kontorol-ng/kontorol-ui';
import {DynamicFormModule} from '@kontorol-ng/kontorol-ui';
import {DynamicFormModule as PrimeDynamicFormModule} from '@kontorol-ng/kontorol-primeng-ui';
import {CategoryComponentsList} from './category/category-components-list';
import {CategoriesComponentsList} from './categories/categories-components-list';
import {CategoryCanDeactivate} from './category/category-can-deactivate.service';
import {DetailsBarModule} from '@kontorol-ng/kontorol-ui';
import {CategoriesUtilsService} from './categories-utils.service';
import {NewCategoryComponent} from './categories/new-category/new-category.component';
import {MoveCategoryComponent} from './categories/move-category/move-category.component';
import {CategoriesRefineFiltersService} from './categories/categories-refine-filters.service';
import { FiltersModule } from '@kontorol-ng/mc-shared';
import { KMCPermissionsModule } from 'app-shared/kmc-shared/kmc-permissions';
import { EntriesModule } from 'app-shared/content-shared/entries/entries.module';
import { DateFormatModule } from 'app-shared/kmc-shared/date-format/date-format.module';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SharedModule } from 'primeng/shared';
import { SpinnerModule } from 'primeng/spinner';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TreeModule } from 'primeng/tree';
import { InputSwitchModule } from 'primeng/inputswitch';

@NgModule({
    imports: [
        FiltersModule,
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
        StickyModule,
        InputHelperModule,
        InputSwitchModule,
        TableModule,
        KMCPermissionsModule,
	    EntriesModule,
        DateFormatModule,
    ],
    declarations: [
        ContentCategoriesComponent,
        CategoryComponentsList,
        CategoriesComponentsList,
        CategoriesBulkActionsComponent,
        MoveCategoryComponent,
        NewCategoryComponent
    ],
    exports: [],
    providers: [CategoryCanDeactivate,
        CategoriesBulkAddTagsService,
        CategoriesBulkRemoveTagsService,
        CategoriesBulkChangeOwnerService,
        CategoriesBulkDeleteService,
        CategoriesBulkChangeContentPrivacyService,
        CategoriesBulkChangeContributionPolicyService,
        CategoriesBulkChangeCategoryListingService,
        CategoriesUtilsService]
})
export class ContentCategoriesAppModule {
}
