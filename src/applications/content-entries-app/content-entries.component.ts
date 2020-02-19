import { Component } from '@angular/core';
import {
    EntriesManualExecutionModeToken, EntriesStore,
    EntriesStorePaginationCacheToken
} from 'app-shared/content-shared/entries/entries-store/entries-store.service';
import { KontorolLogger, KontorolLoggerName } from '@kontorol-ng/kontorol-logger';

@Component({
  selector: 'kEntries',
  templateUrl: './content-entries.component.html',
  styleUrls: ['./content-entries.component.scss'],
  providers: [
    EntriesStore,
      { provide: EntriesManualExecutionModeToken, useValue: true},
    KontorolLogger.createLogger('ContentEntriesComponent'),
    { provide: EntriesStorePaginationCacheToken, useValue: 'entries-list' }
  ]
})
export class ContentEntriesComponent {


}

