import { Component, ViewChild } from '@angular/core';
import { KontorolConversionProfileType } from 'kontorol-ngx-client';
import { PopupWidgetComponent } from '@kontorol-ng/kontorol-ui';
import { AreaBlockerMessage } from '@kontorol-ng/kontorol-ui';
import { KMCPermissions } from 'app-shared/kmc-shared/kmc-permissions';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';
import { SettingsReachMainViewService } from 'app-shared/kmc-shared/kmc-views';
import { BrowserService } from 'shared/kmc-shell/providers/browser.service';

@Component({
  selector: 'k-reach-profiles-lists-holder',
  templateUrl: './reach-profiles-lists-holder.component.html',
  styleUrls: ['./reach-profiles-lists-holder.component.scss'],
  providers: [KontorolLogger.createLogger('ReachProfilesListsHolderComponent')]
})
export class ReachProfilesListsHolderComponent {
  
  public _blockerMessage: AreaBlockerMessage;
  public _kmcPermissions = KMCPermissions;

  constructor(private _logger: KontorolLogger, browserService: BrowserService, settingsReachgMainView: SettingsReachMainViewService) {
        settingsReachgMainView.viewEntered();
  }

  public _setBlockerMessage(message: AreaBlockerMessage): void {
    this._blockerMessage = message;
  }
  
}
