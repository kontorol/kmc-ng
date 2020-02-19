import { Injectable } from '@angular/core';
import { WidgetsManagerBase } from '@kontorol-ng/kontorol-ui';
import { ReachProfileStore } from './reach-profile-store.service';
import { KontorolMultiRequest, KontorolReachProfile } from 'kontorol-ngx-client';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';

@Injectable()
export class ReachProfileWidgetsManager extends WidgetsManagerBase<KontorolReachProfile, KontorolMultiRequest> {
  private _profileStore: ReachProfileStore;

  constructor(logger: KontorolLogger) {
    super(logger.subLogger('ReachProfileWidgetsManager'));
  }

  set profileStore(value: ReachProfileStore) {
    this._profileStore = value;
  }

  public returnToProfiles(): void {
    if (this._profileStore) {
      this._profileStore.returnToProfiles();
    }
  }
}
