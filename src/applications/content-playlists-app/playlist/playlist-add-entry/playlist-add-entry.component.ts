import { Component, EventEmitter, Output } from '@angular/core';
import { KontorolMediaEntry } from 'kontorol-ngx-client';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { KontorolEntryStatus } from 'kontorol-ngx-client';
import { EntriesFilters } from 'app-shared/content-shared/entries/entries-store/entries-store.service';
import { ColumnsResizeManagerService, ResizableColumnsTableName } from 'app-shared/kmc-shared/columns-resize-manager';

@Component({
  selector: 'kAddEntry',
  templateUrl: './playlist-add-entry.component.html',
  styleUrls: ['./playlist-add-entry.component.scss'],
    providers: [
        ColumnsResizeManagerService,
        { provide: ResizableColumnsTableName, useValue: 'manual-playlist-add-entries-table' }
    ]
})
export class PlaylistAddEntryComponent {
  @Output() onClosePopupWidget = new EventEmitter<void>();
  @Output() onAddEntries = new EventEmitter<KontorolMediaEntry[]>();

  public _selectedEntries: KontorolMediaEntry[] = [];
  public _addButtonLabel = '';
  public _addButtonLabelTranslation = '';
  public _enforcedFilters: Partial<EntriesFilters> = {
    'ingestionStatuses': [
      KontorolEntryStatus.preconvert.toString(),
      KontorolEntryStatus.ready.toString(),
      KontorolEntryStatus.moderate.toString(),
      KontorolEntryStatus.blocked.toString()
    ]
  };

  constructor(private _appLocalization: AppLocalization) {
    this._addButtonLabelTranslation = this._addButtonLabel = this._appLocalization.get('applications.content.playlists.addToPlaylist');
  }

  public _selectionChanged(entries: KontorolMediaEntry[]): void {
    this._addButtonLabel = entries.length > 0
      ? `${this._addButtonLabelTranslation} ${entries.length}`
      : this._addButtonLabelTranslation;
  }

  public _addEntries(): void {
    this.onAddEntries.emit(this._selectedEntries);
    this.onClosePopupWidget.emit();
  }
}

