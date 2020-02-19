import { Injectable } from '@angular/core';
import { BrowserService } from 'shared/kmc-shell/providers/browser.service';
import { KontorolConversionProfileType } from 'kontorol-ngx-client';
import { BaseTranscodingProfilesStore } from './base-transcoding-profiles-store.service';
import { KontorolClient } from 'kontorol-ngx-client';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';
import { SettingsTranscodingMainViewService } from 'app-shared/kmc-shared/kmc-views';

@Injectable()
export class LiveTranscodingProfilesStore extends BaseTranscodingProfilesStore {
  protected localStoragePageSizeKey = 'live.transcodingProfiles.list.pageSize';
  protected transcodingProfilesListType = KontorolConversionProfileType.liveStream;

  constructor(_kontorolServerClient: KontorolClient,
              _browserService: BrowserService,
              settingsTranscodingMainView: SettingsTranscodingMainViewService,
              _logger: KontorolLogger) {
    super(_kontorolServerClient, _browserService, settingsTranscodingMainView, _logger.subLogger('LiveTranscodingProfilesStore'));
  }
}

