import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { KontorolFlavorParams } from 'kontorol-ngx-client';
import { TranscodingProfileFlavorsWidget } from './transcoding-profile-flavors-widget.service';
import { PopupWidgetComponent } from '@kontorol-ng/kontorol-ui';
import { KontorolConversionProfileType } from 'kontorol-ngx-client';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';

@Component({
  selector: 'kTranscodingProfilesFlavors',
  templateUrl: './transcoding-profile-flavors.component.html',
  styleUrls: ['./transcoding-profile-flavors.component.scss'],
  providers: [KontorolLogger.createLogger('TranscodingProfileFlavorsComponent')]
})
export class TranscodingProfileFlavorsComponent implements OnInit, OnDestroy {
  @ViewChild('editMediaProfileFlavor', { static: true }) _editMediaProfileFlavorPopup: PopupWidgetComponent;
  @ViewChild('editLiveProfileFlavor', { static: true }) _editLiveProfileFlavorPopup: PopupWidgetComponent;

  public _selectedFlavor: KontorolFlavorParams;

  constructor(public _widgetService: TranscodingProfileFlavorsWidget,
              private _logger: KontorolLogger) {
  }

  ngOnInit() {
    this._widgetService.attachForm();
  }

  ngOnDestroy() {
    this._widgetService.detachForm();
  }

  public _editFlavor(flavor: KontorolFlavorParams): void {
    this._logger.info(`handle edit flavor action by user`, { id: flavor.id, name: flavor.name });
    this._selectedFlavor = flavor;

    if (this._widgetService.data.type === KontorolConversionProfileType.media) {
      this._editMediaProfileFlavorPopup.open();
    } else if (this._widgetService.data.type === KontorolConversionProfileType.liveStream) {
      this._editLiveProfileFlavorPopup.open();
    }
  }
}
