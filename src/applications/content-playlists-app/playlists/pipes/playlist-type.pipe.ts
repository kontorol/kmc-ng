import { Pipe, PipeTransform } from '@angular/core';
import { KontorolPlaylistType } from 'kontorol-ngx-client';
import { AppLocalization } from '@kontorol-ng/mc-shared';

@Pipe({name: 'playlistType'})

export class PlaylistTypePipe implements PipeTransform {

	constructor(private appLocalization: AppLocalization) {
	}

	transform(value:number, isIcon:boolean): string {
	  let className = "",
		    playlistType = "";
		if (typeof(value) !== 'undefined' && value !== null) {
			switch (value) {
				case KontorolPlaylistType.dynamic:
				  className = 'kIconPlaylist_RuleBased'; /* TODO [kmc] should be the correct icons here and below */
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
		return isIcon ? className : playlistType;
	}
}
