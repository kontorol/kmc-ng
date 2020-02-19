import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PlaylistStore } from '../../playlist-store.service';
import { ManualContentWidget } from './manual-content-widget.service';
import { KontorolMediaEntry } from 'kontorol-ngx-client';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';

@Component({
  selector: 'kPlaylistContentManual',
  templateUrl: './manual-content.component.html',
  styleUrls: ['./manual-content.component.scss'],
})
export class ManualContentComponent implements OnInit, OnDestroy {
  public _selectedEntries: KontorolMediaEntry[] = [];

  constructor(public _playlistStore: PlaylistStore,
              public _widgetService: ManualContentWidget) {
  }

  ngOnInit() {
    this._widgetService.attachForm();
    this._widgetService.data$
      .filter(Boolean)
      .pipe(cancelOnDestroy(this))
      .subscribe(() => {
        this._clearSelection();
      });
  };

  ngOnDestroy() {
    this._widgetService.detachForm();
  }

  public _clearSelection() {
    this._selectedEntries = [];
  }

  public _onActionSelected(event: { action: string, entry: KontorolMediaEntry }): void {
    this._clearSelection();
    this._widgetService.onActionSelected(event);
  }

  public _onSortChanged(event: { field: string, order: -1 | 1, multisortmeta: any }): void {
    this._clearSelection();
    this._widgetService.onSortChanged(event);
  }

  public _deleteSelected(selectedEntries: KontorolMediaEntry[]): void {
    this._clearSelection();
    this._widgetService.deleteSelectedEntries(selectedEntries);
  }
}

