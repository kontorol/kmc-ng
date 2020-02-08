import { Component } from '@angular/core';
import { DropFoldersStoreService } from './drop-folders-store/drop-folders-store.service';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';
import { KontorolLoggerName } from '@kontorol-ng/kontorol-logger';


@Component({
  selector: 'kDropFolders',
  templateUrl: './content-drop-folders.component.html',
  styleUrls: ['./content-drop-folders.component.scss'],
  providers: [
    DropFoldersStoreService,
      KontorolLogger,
    {
      provide: KontorolLoggerName, useValue: 'drop-folders-store.service'
    }
  ]
})
export class ContentDropFoldersComponent {
}

