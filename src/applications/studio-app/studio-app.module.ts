import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudioV2Component } from './studio-v2.component';
import { StudioV3Component } from './studio-v3.component';
import { KontorolUIModule } from '@kontorol-ng/kontorol-ui';
import { routing } from './studio-app.routes';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routing),
    KontorolUIModule
  ],
  declarations: [
    StudioV2Component,
    StudioV3Component
  ],
  exports: [],
  providers: [],
})
export class StudioAppModule {
}
