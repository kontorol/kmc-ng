import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {KontorolLogger} from '@kontorol-ng/kontorol-logger';
import {PopupWidgetComponent} from '@kontorol-ng/kontorol-ui';

@Component({
  selector: 'kLiveDashboard',
  templateUrl: './live-dashboard.component.html',
  styleUrls: ['./live-dashboard.component.scss']
})
export class LiveDashboardComponent implements OnInit, OnDestroy {

  @Input()
  entryId: string = null;

  @Input() parentPopupWidget: PopupWidgetComponent;


  constructor(private _logger: KontorolLogger) {
  }

  ngOnInit() {
    if (!this.entryId) {
      this._logger.warn(`error occurred while trying to initialize LiveDashboardComponent, Please provide entry ID`);
      return undefined;
    }
  }

  ngOnDestroy() {
  }

  public _close(): void {
    if (this.parentPopupWidget) {
      this.parentPopupWidget.close();
    }
  }
}
