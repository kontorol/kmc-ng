import { Component } from '@angular/core';
import { MultiAccountStoreService } from './multi-account-store/multi-account-store.service';
import { KontorolLogger, KontorolLoggerName } from '@kontorol-ng/kontorol-logger';

@Component({
  selector: 'kMultiAccount',
  templateUrl: './administration-multi-account.component.html',
  styleUrls: ['./administration-multi-account.component.scss'],
  providers: [
      MultiAccountStoreService,
    KontorolLogger.createLogger('AdministrationMultiAccount')
  ]
})

export class AdministrationMultiAccountComponent {
}
