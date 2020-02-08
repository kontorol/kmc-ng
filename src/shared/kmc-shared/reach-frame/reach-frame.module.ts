import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReachFrameComponent } from './reach-frame.component';
import { KontorolUIModule } from '@kontorol-ng/kontorol-ui';
import { LocalizationModule } from '@kontorol-ng/mc-shared';

@NgModule({
    imports: [
        CommonModule,
        KontorolUIModule,
        LocalizationModule
    ],
    declarations: [
        ReachFrameComponent,
    ],
    exports: [
        ReachFrameComponent,
    ]
})
export class ReachFrameModule {
}
