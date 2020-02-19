import { Injectable } from '@angular/core';
import { ReachProfileWidget } from '../reach-profile-widget';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';

@Injectable()
export class ReachProfileDetailsWidget extends ReachProfileWidget {
  constructor(logger: KontorolLogger) {
    super('reachProfileDetails', logger);
  }


  /**
   * Do some cleanups if needed once the section is removed
   */
  protected onReset(): void {

  }
}
