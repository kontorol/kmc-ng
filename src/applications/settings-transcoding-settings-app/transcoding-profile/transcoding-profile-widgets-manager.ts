import { Injectable } from '@angular/core';
import { WidgetsManagerBase } from '@kontorol-ng/kontorol-ui';
import { TranscodingProfileStore } from './transcoding-profile-store.service';
import { KontorolMultiRequest } from 'kontorol-ngx-client';
import { KontorolConversionProfileWithAsset } from '../transcoding-profiles/transcoding-profiles-store/base-transcoding-profiles-store.service';

import {KontorolLogger} from '@kontorol-ng/kontorol-logger';

@Injectable()
export class TranscodingProfileWidgetsManager extends WidgetsManagerBase<KontorolConversionProfileWithAsset, KontorolMultiRequest> {
  private _profileStore: TranscodingProfileStore;

  constructor(logger: KontorolLogger) {
    super(logger.subLogger('TranscodingProfileWidgetsManager'));
  }

  set profileStore(value: TranscodingProfileStore) {
    this._profileStore = value;
  }

  public returnToProfiles(): void {
    if (this._profileStore) {
      this._profileStore.returnToProfiles();
    }
  }
}
