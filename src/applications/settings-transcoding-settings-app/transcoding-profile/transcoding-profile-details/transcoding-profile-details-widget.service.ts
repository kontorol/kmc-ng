import { Injectable } from '@angular/core';
import { TranscodingProfileWidget } from '../transcoding-profile-widget';
import {KontorolLogger} from '@kontorol-ng/kontorol-logger';

@Injectable()
export class TranscodingProfileDetailsWidget extends TranscodingProfileWidget {
  constructor(logger: KontorolLogger) {
    super('profileDetails', logger);
  }


  /**
   * Do some cleanups if needed once the section is removed
   */
  protected onReset(): void {

  }
}
