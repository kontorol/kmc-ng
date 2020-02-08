import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PopupWidgetComponent } from '@kontorol-ng/kontorol-ui';
import { AreaBlockerMessage } from '@kontorol-ng/kontorol-ui';
import { subApplicationsConfig } from 'config/sub-applications';
import { BrowserService } from 'app-shared/kmc-shell';

@Component({
  selector: 'kPlaylistsAdditionalFilter',
  templateUrl: './playlists-additional-filters.component.html',
  styleUrls: ['./playlists-additional-filters.component.scss']
})
export class PlaylistsAdditionalFiltersComponent {
  @Input() parentPopupWidget: PopupWidgetComponent;
  @Input() createdAfter: Date;
  @Input() createdBefore: Date;
  public _showLoader = false;
  public _blockerMessage: AreaBlockerMessage = null;
  @Output() createdChanged = new EventEmitter<any>();
  public _createdAtDateRange: string = subApplicationsConfig.shared.datesRange;
    public _calendarFormat = this._browserService.getCurrentDateFormat(true);

  constructor(private _browserService: BrowserService) {
  }

  public _onCreatedChanged(): void {
    if (this.createdAfter || this.createdBefore) {
      this._updateDates();
    }
  }

  public _clearCreatedComponents(): void {
    if (this.createdAfter || this.createdBefore) {
      this.createdAfter = null;
      this.createdBefore = null;
      this._updateDates();
    }
  }

  public _close() {
    if (this.parentPopupWidget) {
      this.parentPopupWidget.close();
    }
  }

  // emitting the createdAfter and createdBefore values
  public _updateDates(): void {
    this.createdChanged.emit({
      'createdAfter': this.createdAfter,
      'createdBefore': this.createdBefore
    });
  }
}
