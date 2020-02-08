import { Injectable } from '@angular/core';
import { KontorolFilterPager } from 'kontorol-ngx-client';
import { KontorolClient } from 'kontorol-ngx-client';
import { Observable } from 'rxjs';
import { UiConfListAction } from 'kontorol-ngx-client';
import { KontorolUiConfFilter } from 'kontorol-ngx-client';
import { KontorolUiConfListResponse } from 'kontorol-ngx-client';
import { KontorolDetachedResponseProfile } from 'kontorol-ngx-client';
import { KontorolResponseProfileType } from 'kontorol-ngx-client';
import { ShortLinkAddAction } from 'kontorol-ngx-client';
import { KontorolShortLink } from 'kontorol-ngx-client';

export type EmbedConfig = {
    embedType: string;
    entryId: string;
    ks: string;
    uiConfId: string;
    width: number;
    height: number;
    pid: number;
    serverUri: string;
    playerConfig: string;
}

@Injectable()
export class PreviewEmbedService {

	constructor(private _kontorolClient: KontorolClient) {
	}

	listPlayers(isPlaylist: boolean = false): Observable<KontorolUiConfListResponse>{

		const tags = isPlaylist ? 'playlist' : 'player';

		const filter = new KontorolUiConfFilter({
			'tagsMultiLikeAnd': tags,
			'orderBy': '-updatedAt',
			'objTypeIn': '1,8',
			'creationModeEqual': 2
		});

		const pager = new KontorolFilterPager({
			'pageIndex': 1,
			'pageSize': 999
		});

		let responseProfile: KontorolDetachedResponseProfile = new KontorolDetachedResponseProfile({
			type: KontorolResponseProfileType.includeFields,
			fields: 'id,name,html5Url,createdAt,updatedAt,width,height,tags'
		});

		return this._kontorolClient.request(new UiConfListAction({filter, pager}).setRequestOptions({
            responseProfile
        }));
	}

	generateShortLink(url: string): Observable<KontorolShortLink>{

		let shortLink: KontorolShortLink = new KontorolShortLink();
		shortLink.systemName = "KMC-PREVIEW";
		shortLink.fullUrl = url;

		return this._kontorolClient.request(new ShortLinkAddAction({shortLink}));
	}

	generateV3EmbedCode(config: any): string {
	    let code = '';
        const rnd = Math.floor(Math.random() * 1000000000);

        switch (config.embedType) {
            case 'dynamic':
            case 'thumb':
                code = `<div id="kontorol_player_${rnd}" style="width: ${config.width}px;height: ${config.height}px"></div>
<script type="text/javascript" src="${config.serverUri}/p/${config.pid}/embedPakhshkitJs/uiconf_id/${config.uiConfId}"></script>
  <script type="text/javascript">
    try {
      var kontorolPlayer = KontorolPlayer.setup({
        targetId: "kontorol_player_${rnd}",
        provider: {
          ${config.playerConfig}
          partnerId: ${config.pid},
          uiConfId: ${config.uiConfId}
        }
      });
      kontorolPlayer.loadMedia({entryId: '${config.entryId}'});
    } catch (e) {
      console.error(e.message)
    }
  </script>`;
                break;
            case 'iframe':
                code = `<iframe type="text/javascript" src='${config.serverUri}/p/${config.pid}/embedPakhshkitJs/uiconf_id/${config.uiConfId}?iframeembed=true&entry_id=${config.entryId}${config.playerConfig}' style="width: ${config.width}px;height: ${config.height}px" allowfullscreen webkitallowfullscreen mozAllowFullScreen frameborder="0"></iframe>`;
                break;
            case 'auto':
                code = `<div id="kontorol_player_${rnd}" style="width: ${config.width}px;height: ${config.height}px"></div>
<script type="text/javascript" src='${config.serverUri}/p/${config.pid}/embedPakhshkitJs/uiconf_id/${config.uiConfId}?autoembed=true&targetId=kontorol_player_${rnd}&entry_id=${config.entryId}${config.playerConfig}'></script>`
                break;
            default:
                break;
        }
        return code;
    }

}

