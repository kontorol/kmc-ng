import { Component } from '@angular/core';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';
import { BulkLogRefineFiltersService } from './bulk-log-store/bulk-log-refine-filters.service';

@Component({
  selector: 'kBulkLog',
  template: '<router-outlet></router-outlet>',
  providers: [
    BulkLogRefineFiltersService,
    KontorolLogger.createLogger('ContentBulkLogApp')
  ]
})
export class ContentBulkLogAppComponent {
}

