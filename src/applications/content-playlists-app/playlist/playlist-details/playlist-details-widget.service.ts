import { Injectable } from '@angular/core';
import { PlaylistWidget } from '../playlist-widget';
import {KontorolLogger} from '@kontorol-ng/kontorol-logger';
@Injectable()
export class PlaylistDetailsWidget extends PlaylistWidget {
  constructor(logger: KontorolLogger) {
    super('playlistDetails', logger);
  }

  /**
   * Do some cleanups if needed once the section is removed
   */
  protected onReset(): void {
  }
}
