import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PlaylistStore } from '../playlist-store.service';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { StickyComponent } from '@kontorol-ng/kontorol-ui';
import { PlaylistSectionsListWidget, SectionWidgetItem } from './playlist-sections-list-widget.service';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';

@Component({
  selector: 'kPlaylistSectionsList',
  templateUrl: './playlist-sections-list.component.html',
  styleUrls: ['./playlist-sections-list.component.scss']
})
export class PlaylistSectionsList implements OnInit, OnDestroy {
  public _loading = false;
  public _showList = false;
  public _sections: SectionWidgetItem[] = [];

  @ViewChild('playlistSections') private playlistSections: StickyComponent;

  constructor(public _appLocalization: AppLocalization,
              public _playlistStore: PlaylistStore,
              public _widgetService: PlaylistSectionsListWidget) {
  }

  ngOnInit() {
    this._loading = true;
    this._widgetService.attachForm();

    this._widgetService.sections$
      .pipe(cancelOnDestroy(this))
      .subscribe(sections => {
        this._loading = false;
        this._sections = sections;
        this._showList = sections && sections.length > 0;
        this.playlistSections.updateLayout();
      });
  }

  ngOnDestroy() {
    this._widgetService.detachForm();
  }

  public _navigateToSection(widget: SectionWidgetItem): void {
    this._playlistStore.openSection(widget.key);
  }

}
