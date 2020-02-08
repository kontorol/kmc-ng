import { KontorolMediaEntry } from 'kontorol-ngx-client';
import { WidgetBase } from '@kontorol-ng/kontorol-ui';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';
import { AreaBlockerMessage, AreaBlockerMessageButton } from '@kontorol-ng/kontorol-ui';
import { EntryWidgetsManager } from './entry-widgets-manager';
import { KontorolMultiRequest } from 'kontorol-ngx-client';
import {KontorolLogger} from '@kontorol-ng/kontorol-logger';

export abstract class EntryWidget extends WidgetBase<EntryWidgetsManager, KontorolMediaEntry, KontorolMultiRequest>
{
    public sectionBlockerMessage: AreaBlockerMessage;
    public showSectionLoader: boolean;

    constructor(private _widgetKey: string, logger: KontorolLogger)
    {
        super(_widgetKey, logger);
    }

    protected _showLoader() {
	    this._removeBlockerMessage();
        this.showSectionLoader = true;
    }

    protected _hideLoader() {
        this.showSectionLoader = false;
    }

    protected _removeBlockerMessage() : void{
        this.sectionBlockerMessage = null;
    }

    protected _showBlockerMessage(message: AreaBlockerMessage, addBackToEntriesButton: boolean) {
        let messageToShow = message;
        if (addBackToEntriesButton) {
            messageToShow = new AreaBlockerMessage({
                message: message.message,
                buttons: [
                    ...this._createBackToEntriesButton(),
                    ... message.buttons
                ]
            })
        }
        ;

        this.showSectionLoader = false;
        this.sectionBlockerMessage = messageToShow;
    }

    protected _createBackToEntriesButton(): AreaBlockerMessageButton[] {
        if (this.form) {
            return [{
                label: 'Back To Entries',
                action: () => {
                    this.form.returnToEntries();
                }
            }];
        }else
        {
            return [{
                label: 'dismiss',
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
