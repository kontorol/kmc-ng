import { AppEvent } from 'shared/kmc-shared/app-events/app-event';
import { KontorolConversionProfile } from 'kontorol-ngx-client';

export interface CreateNewTranscodingProfileEventArgs {
  profile: KontorolConversionProfile;
}

export class CreateNewTranscodingProfileEvent extends AppEvent {
  constructor(public data: CreateNewTranscodingProfileEventArgs) {
    super('CreateNewTranscodingProfile');
  }
}
