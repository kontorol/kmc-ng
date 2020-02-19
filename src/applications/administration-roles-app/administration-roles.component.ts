import { Component } from '@angular/core';
import { RolesStoreService } from './roles-store/roles-store.service';
import { KontorolLogger, KontorolLoggerName } from '@kontorol-ng/kontorol-logger';

@Component({
  selector: 'kRoles',
  templateUrl: './administration-roles.component.html',
  styleUrls: ['./administration-roles.component.scss'],
  providers: [
    RolesStoreService,
    KontorolLogger.createLogger('AdministrationRoles')
  ]
})

export class AdministrationRolesComponent {
}
