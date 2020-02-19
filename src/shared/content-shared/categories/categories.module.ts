import { ModuleWithProviders, NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {AreaBlockerModule, KontorolUIModule, StickyModule, TooltipModule} from '@kontorol-ng/kontorol-ui';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LocalizationModule} from '@kontorol-ng/mc-shared';
import {AutoCompleteModule, KontorolPrimeNgUIModule} from '@kontorol-ng/kontorol-primeng-ui';
import {PopupWidgetModule} from '@kontorol-ng/kontorol-ui';

import { CategoriesTreeComponent } from './categories-tree/categories-tree.component';
import { CategoriesFilterPrefsComponent } from './categories-filter-preferences/categories-filter-preferences.component';
import { CategoriesFilterComponent } from './categories-filter/categories-filter.component';
import { TagsModule } from '@kontorol-ng/kontorol-ui';
import { FiltersModule } from '@kontorol-ng/mc-shared';
import { CategoriesTreePropagationDirective } from './categories-tree/categories-tree-propagation.directive';
import { CategoriesSearchService } from './categories-search.service';
import { CategorySelectorComponent } from './category-selector/category-selector.component';
import { CategoryTooltipPipe } from 'app-shared/content-shared/categories/category-tooltip.pipe';
import { TreeModule } from 'primeng/tree';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { MenuModule } from 'primeng/menu';
import { PaginatorModule } from 'primeng/paginator';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [
    AreaBlockerModule,
    TooltipModule,
    AutoCompleteModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TreeModule,
    LocalizationModule,
    KontorolPrimeNgUIModule,
    KontorolUIModule,
    ButtonModule,
    CalendarModule,
    RadioButtonModule,
    CheckboxModule,
    PopupWidgetModule,
    MenuModule,
    TagsModule,
    PaginatorModule,
    TieredMenuModule,
    InputTextModule,
    StickyModule,
    FiltersModule
  ],
  declarations: [
      CategorySelectorComponent,
    CategoriesTreeComponent,
    CategoriesFilterPrefsComponent,
    CategoriesFilterComponent,
      CategoryTooltipPipe,
    CategoriesTreePropagationDirective
  ],
  exports: [
      CategorySelectorComponent,
    CategoriesTreeComponent,
    CategoriesFilterPrefsComponent,
    CategoriesFilterComponent,
      CategoryTooltipPipe
  ]
})
export class CategoriesModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CategoriesModule,
            providers: <any[]>[
                CategoriesSearchService // singleton by design: this service sync inner state when needed thus can be shareable/provided by the module
            ]
        };
    }
}
