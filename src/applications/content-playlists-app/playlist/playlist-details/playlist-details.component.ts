import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { KontorolPlaylist } from 'kontorol-ngx-client';
import { PlaylistDetailsWidget } from './playlist-details-widget.service';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';
import { AppLocalization } from "@kontorol-ng/mc-shared";

@Component({
  selector: 'kPlaylistDetails',
  templateUrl: './playlist-details.component.html',
  styleUrls: ['./playlist-details.component.scss']
})
export class PlaylistDetailsComponent implements OnInit, OnDestroy {
  
  @Input() isRapt: boolean;
  
  public _currentPlaylist: KontorolPlaylist;
  public _isNew = false;

  constructor(
    public _widgetService: PlaylistDetailsWidget,
    public _appLocalization: AppLocalization) {
  }

  ngOnInit() {
    this._widgetService.attachForm();
    this._widgetService.data$
      .pipe(cancelOnDestroy(this))
      .filter(Boolean)
      .subscribe(data => {
        this._currentPlaylist = data;
        this._isNew = !this._currentPlaylist.id;
      });
  }

  ngOnDestroy() {
    this._widgetService.detachForm();
  }
}

