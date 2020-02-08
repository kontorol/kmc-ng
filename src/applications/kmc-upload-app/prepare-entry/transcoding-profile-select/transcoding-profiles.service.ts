import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';
import {KontorolNullableBoolean} from 'kontorol-ngx-client';
import {TranscodingProfileManagement} from 'app-shared/kmc-shared/transcoding-profile-management';


export interface TranscodingProfile {
  name: string;
  id: number;
}

@Injectable()
export class TranscodingProfilesService {

  constructor(private _transcodingProfileManagement: TranscodingProfileManagement) {
  }

  /** update the data for current partner */
  public getTranscodingProfiles(): Observable<TranscodingProfile[]> {
    return this._transcodingProfileManagement.get()
      .map(profiles => {
        const defaultProfileIndex = profiles.findIndex(x => (x.isDefault === KontorolNullableBoolean.trueValue));
        // Set default profile as first in array (if not already first)
        if (defaultProfileIndex > 0) {
          const defaultProfile = profiles[defaultProfileIndex];
          profiles.splice(defaultProfileIndex, 1);
          profiles.unshift(defaultProfile);
        }
        return profiles;
      })
  }
}
