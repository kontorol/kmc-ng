import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DetailsBarModule} from '@kontorol-ng/kontorol-ui';

import {routing} from './content-playlists-app.routes';

import {AreaBlockerModule, KontorolUIModule, StickyModule, TooltipModule} from '@kontorol-ng/kontorol-ui';
import {TableModule} from 'primeng/table';
import {LocalizationModule} from '@kontorol-ng/mc-shared';
import {KontorolPrimeNgUIModule} from '@kontorol-ng/kontorol-primeng-ui';
import {AutoCompleteModule} from '@kontorol-ng/kontorol-primeng-ui';
import {TagsModule} from '@kontorol-ng/kontorol-ui';
import {PopupWidgetModule} from '@kontorol-ng/kontorol-ui';

import {ContentPlaylistsComponent} from './content-playlists.component';
import {PlaylistsComponentsList} from './playlists/playlists-components-list';
import {PlaylistComponentsList} from './playlist/playlist-components-list';
import {PlaylistCanDeactivate} from './playlist/playlist-can-deactivate.service';
import {EntriesModule} from 'app-shared/content-shared/entries/entries.module';
import {FiltersModule} from '@kontorol-ng/mc-shared';
import {SliderModule} from '@kontorol-ng/kontorol-primeng-ui';
import {KMCPermissionsModule} from 'app-shared/kmc-shared/kmc-permissions';
import {KPTableModule} from '@kontorol-ng/kontorol-primeng-ui';
import {DateFormatModule} from 'app-shared/kmc-shared/date-format/date-format.module';
import {PaginatorModule} from 'primeng/paginator';
import {ButtonModule} from 'primeng/button';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {CheckboxModule} from 'primeng/checkbox';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
//import { CalendarModule } from 'primeng/calendar';
import {MenuModule} from 'primeng/menu';
import {RadioButtonModule} from 'primeng/radiobutton';
import {SharedModule} from 'primeng/shared';
import {DropdownModule} from 'primeng/dropdown';
import {PlaylistsUtilsService} from './playlists-utils.service';
import {KCommonModule} from "app-shared/common/k-common.module";

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
        InputTextareaModule,
        PopupWidgetModule,
        // CalendarModule,
        KCommonModule,
        MenuModule,
        RadioButtonModule,
        TagsModule,
        KontorolPrimeNgUIModule,
        AutoCompleteModule,
        SharedModule,
        DetailsBarModule,
        RouterModule.forChild(routing),
        StickyModule,
        EntriesModule,
        FiltersModule,
        DropdownModule,
        SliderModule,
        TableModule,
        KMCPermissionsModule,
        KPTableModule,
        DateFormatModule,
    ], declarations: [
        ContentPlaylistsComponent,
        PlaylistsComponentsList,
        PlaylistComponentsList
    ],
    exports: [],
    providers: [
        PlaylistCanDeactivate,
        PlaylistsUtilsService
    ]
})
export class ContentPlaylistsAppModule {
}
