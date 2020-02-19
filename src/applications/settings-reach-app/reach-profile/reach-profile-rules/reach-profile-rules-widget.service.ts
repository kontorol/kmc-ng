import { Injectable } from '@angular/core';
import { ReachProfileWidget } from '../reach-profile-widget';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';
import { SettingsReachProfileViewSections } from "app-shared/kmc-shared/kmc-views/details-views";

@Injectable()
export class ReachProfileRulesWidget extends ReachProfileWidget {
  constructor(logger: KontorolLogger) {
    super(SettingsReachProfileViewSections.Rules, logger);
  }


  /**
   * Do some cleanups if needed once the section is removed
   */
  protected onReset(): void {

  }
}
