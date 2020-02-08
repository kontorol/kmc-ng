import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {KontorolLogger} from '@kontorol-ng/kontorol-logger';
import {PopupWidgetComponent} from '@kontorol-ng/kontorol-ui';
import {BrowserService} from 'app-shared/kmc-shell';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { KontorolMediaEntry } from 'kontorol-ngx-client';

@Component({
  selector: 'kEntryEditor',
  templateUrl: './entry-editor.component.html',
  styleUrls: ['./entry-editor.component.scss']
})
export class EntryEditorComponent implements OnInit, OnDestroy {

    @Input()
    tab: string = null;

  @Input()
  entry: KontorolMediaEntry = null;

    @Input() entryHasSource = false;

  @Input() parentPopupWidget: PopupWidgetComponent;

  public _confirmClose = false;

  constructor(private _browserService: BrowserService,
              private _appLocalization: AppLocalization) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  public _close(): void {
    if (this._confirmClose) {
      this._browserService.confirm(
        {
          header: this._appLocalization.get('applications.content.entryDetails.entryEditor.cancelEdit'),
          message: this._appLocalization.get('applications.content.entryDetails.entryEditor.discard'),
          accept: () => {
            this._confirmClose = false;
            if (this.parentPopupWidget) {
              this.parentPopupWidget.close();
            }
          },
          reject: () => {
          }
        }
      );
    } else {
      if (this.parentPopupWidget) {
        this.parentPopupWidget.close();
      }
    }
  }
}
