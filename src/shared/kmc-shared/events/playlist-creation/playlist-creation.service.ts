import { Injectable, OnDestroy } from '@angular/core';
import { AppEventsService } from 'shared/kmc-shared/app-events';
import { CreateNewPlaylistEvent, CreateNewPlaylistEventArgs } from './create-new-playlist.event';
import { ISubscription } from 'rxjs/Subscription';
import { ContentPlaylistViewSections, ContentPlaylistViewService } from 'app-shared/kmc-shared/kmc-views/details-views';
import { KontorolPlaylist } from 'kontorol-ngx-client';
import { KontorolPlaylistType } from 'kontorol-ngx-client';

@Injectable()
export class PlaylistCreationService implements OnDestroy {
  private _creationSubscription: ISubscription;
  private _newPlaylistData: CreateNewPlaylistEventArgs;

  constructor(private _appEvents: AppEventsService,
              private _contentPlaylistViewService: ContentPlaylistViewService) {
  }

  ngOnDestroy() {
    if (this._creationSubscription) {
      this._creationSubscription.unsubscribe();
      this._creationSubscription = null;
    }
  }

  public init(): void {
    if (!this._creationSubscription) {
      this._creationSubscription = this._appEvents.event(CreateNewPlaylistEvent)
        .subscribe(({ data, section }) => {
          this._newPlaylistData = data;
            const playlist = new KontorolPlaylist({ playlistType: data.type });
            (<any>playlist).id = 'new';
            if (!section) {
              section = playlist.playlistType === KontorolPlaylistType.staticList
                  ? ContentPlaylistViewSections.Content
                  : ContentPlaylistViewSections.ContentRuleBased;
            }
            this._contentPlaylistViewService.open({ playlist, section });
        });
    } else {
      console.warn('Service was already initialized!');
    }
  }

  public popNewPlaylistData(): CreateNewPlaylistEventArgs {
    const newPlaylistData = this._newPlaylistData;
    this._newPlaylistData = null;
    return newPlaylistData;
  }
}
