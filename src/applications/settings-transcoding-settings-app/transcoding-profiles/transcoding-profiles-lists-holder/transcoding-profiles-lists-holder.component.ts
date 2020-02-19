import { Component, ViewChild } from '@angular/core';
import { KontorolConversionProfileType } from 'kontorol-ngx-client';
import { PopupWidgetComponent } from '@kontorol-ng/kontorol-ui';
import { AreaBlockerMessage } from '@kontorol-ng/kontorol-ui';
import { KMCPermissions } from 'app-shared/kmc-shared/kmc-permissions';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';
import { SettingsTranscodingMainViewService } from 'app-shared/kmc-shared/kmc-views';
import { BrowserService } from 'shared/kmc-shell/providers/browser.service';

@Component({
  selector: 'k-transcoding-profiles-lists-holder',
  templateUrl: './transcoding-profiles-lists-holder.component.html',
  styleUrls: ['./transcoding-profiles-lists-holder.component.scss'],
  providers: [KontorolLogger.createLogger('TranscodingProfilesListsHolderComponent')]
})
export class TranscodingProfilesListsHolderComponent {
  @ViewChild('addNewProfile', { static: true }) _addNewProfilePopup: PopupWidgetComponent;

  public _kontorolConversionProfileType = KontorolConversionProfileType;
  public _blockerMessage: AreaBlockerMessage;
  public _newProfileType: KontorolConversionProfileType;
  public _kmcPermissions = KMCPermissions;

  constructor(private _logger: KontorolLogger, browserService: BrowserService, settingsTranscodingMainView: SettingsTranscodingMainViewService) {
        settingsTranscodingMainView.viewEntered();
  }

  public _setBlockerMessage(message: AreaBlockerMessage): void {
    this._blockerMessage = message;
  }

  public _addProfile(profileType: KontorolConversionProfileType): void {
    this._logger.info(`handle 'add' profile action by the user`, { profileType });
    this._newProfileType = profileType;
    this._addNewProfilePopup.open();
  }
}
