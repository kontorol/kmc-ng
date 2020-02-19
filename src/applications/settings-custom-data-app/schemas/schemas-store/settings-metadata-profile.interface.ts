import { KontorolMetadataProfile } from 'kontorol-ngx-client';
import { MetadataProfile } from 'app-shared/kmc-shared';
import { KontorolMetadataObjectType } from 'kontorol-ngx-client';

export interface SettingsMetadataProfile extends KontorolMetadataProfile {
  profileDisabled: boolean;
  parsedProfile?: MetadataProfile;
  defaultLabel?: string;
  applyTo?: KontorolMetadataObjectType;
  downloadUrl?: string;
  isNew?: boolean;
}
