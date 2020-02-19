import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {KontorolUIModule} from '@kontorol-ng/kontorol-ui';
import {KeditHosterComponent} from 'app-shared/kmc-shared/kedit-hoster/kedit-hoster.component';

@NgModule({
  imports: <any[]>[
      CommonModule,
      KontorolUIModule
  ],
  declarations: <any[]>[
      KeditHosterComponent
  ],
  exports: <any[]>[KeditHosterComponent],
  providers: <any[]>[
  ]
})
export class KEditHosterModule {
}
