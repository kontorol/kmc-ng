import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule, DropdownModule, InputTextareaModule, InputSwitchModule, RadioButtonModule } from 'primeng/primeng';
import {LocalizationModule} from '@kontorol-ng/mc-shared';
import { AreaBlockerModule } from '@kontorol-ng/kontorol-ui';
import { PopupWidgetModule } from '@kontorol-ng/kontorol-ui';
import { PreviewEmbedComponent } from './preview-and-embed.component';
import { PreviewEmbedDetailsComponent } from './preview-embed.component';
import { QRCodeModule } from 'angularx-qrcode';


@NgModule({
  imports: [
    CommonModule,
    PopupWidgetModule,
    AreaBlockerModule,
    FormsModule,
    ReactiveFormsModule,
    LocalizationModule,
    ButtonModule,
    DropdownModule,
    InputTextareaModule,
    InputSwitchModule,
    RadioButtonModule,
      QRCodeModule
  ],
  declarations: [
    PreviewEmbedComponent,
    PreviewEmbedDetailsComponent
  ],
  providers: [
  ],
  exports: [
    PreviewEmbedComponent
  ]
})
export class PreviewAndEmbedModule {
}
