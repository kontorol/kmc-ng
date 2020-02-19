import {Pipe, PipeTransform} from '@angular/core';
import {KontorolPlaylist, KontorolPlaylistType} from 'kontorol-ngx-client';
import {AppLocalization} from '@kontorol-ng/mc-shared';
import {PlaylistsUtilsService} from "../../playlists-utils.service";

@Pipe({name: 'playlistType'})

export class PlaylistTypePipe implements PipeTransform {
    
    constructor(
        private appLocalization: AppLocalization,
        private _playlistsUtilsService: PlaylistsUtilsService) {
    }
    
    transform(value: KontorolPlaylist, isIcon: boolean): string {
        let className = "",
            playlistType = "";
        if (typeof (value) !== 'undefined' && value !== null) {
            switch (value.playlistType) {
                case KontorolPlaylistType.dynamic:
                    className = 'kIconPlaylist_RuleBased';
                    playlistType = this.appLocalization.get("applications.content.playlistType.dynamic");
                    break;
                case KontorolPlaylistType.external:
                    className = 'kIconPlaylist_RuleBased';
                    playlistType = this.appLocalization.get("applications.content.playlistType.external");
                    break;
                case KontorolPlaylistType.staticList:
                    className = 'kIconPlaylist_Manual';
                    playlistType = this.appLocalization.get("applications.content.playlistType.staticList");
                    break;
                default:
                    className = 'kIconUnknown';
                    playlistType = this.appLocalization.get("applications.content.playlistType.unknown");
                    break;
            }
        }
        if (this._playlistsUtilsService.isRapt(value)){
            className = 'kIconplaylist_interactive_small';
            playlistType = this.appLocalization.get("applications.content.playlistType.interactive");
        }
        return isIcon ? className : playlistType;
    }
}
