import { Component } from '@angular/core';
import { AccessControlProfilesStore } from './profiles/profiles-store/profiles-store.service';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';

@Component({
  selector: 'kmc-settings-access-control',
  template: '<kAccessControlProfilesList></kAccessControlProfilesList>',
  providers: [
    AccessControlProfilesStore,
    KontorolLogger.createLogger('SettingsAccessControl')
  ]
})
export class SettingsAccessControlComponent {
}
