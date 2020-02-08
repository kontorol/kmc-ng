import { Component, OnDestroy, ViewChild } from '@angular/core';
import { PopupWidgetComponent } from '@kontorol-ng/kontorol-ui';
import { PreviewAndEmbedEvent } from 'app-shared/kmc-shared/events';
import { AppEventsService } from 'app-shared/kmc-shared';
import { KontorolPlaylist } from 'kontorol-ngx-client';
import { KontorolMediaEntry } from 'kontorol-ngx-client';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';

@Component({
  selector: 'kPreviewEmbed',
  templateUrl: './preview-and-embed.component.html',
  styleUrls: ['./preview-and-embed.component.scss'],
})
export class PreviewEmbedComponent implements OnDestroy {

  @ViewChild('previewEmbed') previewEmbedPopup: PopupWidgetComponent;

  public _media: KontorolPlaylist | KontorolMediaEntry;

  constructor(appEvents: AppEventsService) {
    appEvents.event(PreviewAndEmbedEvent)
	    .pipe(cancelOnDestroy(this))
	    .subscribe(({media}) =>
        {
          this._media = media;
          if ((media instanceof KontorolPlaylist || media instanceof KontorolMediaEntry) && !this.previewEmbedPopup.isShow) {
            this.previewEmbedPopup.open();
          }else{
            console.warn("Cannot open preview & embed (window already open?)");
          }
        });
  }

  public close(): void{
    this.previewEmbedPopup.close();
  }

  ngOnDestroy(){

  }
}

