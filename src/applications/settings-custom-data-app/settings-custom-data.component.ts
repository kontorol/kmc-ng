import { Component } from '@angular/core';
import { SchemasStore } from './schemas/schemas-store/schemas-store.service';
import { KontorolLogger, KontorolLoggerName } from '@kontorol-ng/kontorol-logger';

@Component({
  selector: 'kmc-settings-custom-data',
  templateUrl: './settings-custom-data.component.html',
  styleUrls: ['./settings-custom-data.component.scss'],
  providers: [
    SchemasStore,
    KontorolLogger,
    { provide: KontorolLoggerName, useValue: 'CustomData' }
  ]
})
export class SettingsCustomDataComponent {
}
