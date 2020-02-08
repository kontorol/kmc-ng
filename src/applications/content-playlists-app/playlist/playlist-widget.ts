import { AreaBlockerMessage, AreaBlockerMessageButton, WidgetBase } from '@kontorol-ng/kontorol-ui';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';
import { KontorolMultiRequest } from 'kontorol-ngx-client';
import { PlaylistWidgetsManager } from './playlist-widgets-manager';
import { KontorolPlaylist } from 'kontorol-ngx-client';
import {KontorolLogger} from '@kontorol-ng/kontorol-logger';


export abstract class PlaylistWidget extends WidgetBase<PlaylistWidgetsManager, KontorolPlaylist, KontorolMultiRequest> {
  public sectionBlockerMessage: AreaBlockerMessage;
  public showSectionLoader: boolean;

  constructor(private _widgetKey: string, logger: KontorolLogger) {
    super(_widgetKey, logger);
  }

  protected _showLoader() {
    this._removeBlockerMessage();
    this.showSectionLoader = true;
  }

  protected _hideLoader() {
    this.showSectionLoader = false;
  }

  protected _removeBlockerMessage(): void {
    this.sectionBlockerMessage = null;
  }

  protected _showBlockerMessage(message: AreaBlockerMessage, addBackToPlaylistsButton: boolean) {
    let messageToShow = message;
    if (addBackToPlaylistsButton) {
      messageToShow = new AreaBlockerMessage({
        message: message.message,
        buttons: [
          ...this._createBackToPlaylistsButton(),
          ...message.buttons
        ]
      })
    }

    this.showSectionLoader = false;
    this.sectionBlockerMessage = messageToShow;
  }

  protected _createBackToPlaylistsButton(): AreaBlockerMessageButton[] {
    if (this.form) {
      return [{
        label: 'Back To Playlists',
        action: () => {
          this.form.returnToPlaylists();
        }
      }];
    } else {
      return [{
        label: 'Dismiss',
        action: () => {
          this._removeBlockerMessage();
        }
      }];
    }
  }

  protected _showActivationError(message?: string) {
    this._showBlockerMessage(new AreaBlockerMessage(
      {
        message: message || 'An error occurred while loading data',
        buttons: [
          {
            label: 'Retry',
            action: () => {
              this.activate();
            }
          }
        ]
      }
    ), true);
  }
}
