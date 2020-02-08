import {Injectable} from '@angular/core';
import {KontorolRecordStatus} from 'kontorol-ngx-client';
import {KontorolLiveStreamEntry} from 'kontorol-ngx-client';
import {KontorolMediaType} from 'kontorol-ngx-client';
import {KontorolDVRStatus} from 'kontorol-ngx-client';
import {KontorolClient} from 'kontorol-ngx-client';
import {LiveStreamAddAction} from 'kontorol-ngx-client';
import {KontorolSourceType} from 'kontorol-ngx-client';
import { Observable } from 'rxjs';
import {KontorolLiveStreamConfiguration} from 'kontorol-ngx-client';
import {KontorolPlaybackProtocol} from 'kontorol-ngx-client';
import {KontorolLive} from './kontorol-live-stream/kontorol-live-stream.interface';
import {ManualLive} from './manual-live/manual-live.interface';
import {UniversalLive} from './universal-live/universal-live.interface';
import { KontorolNullableBoolean } from 'kontorol-ngx-client';

@Injectable()
export class CreateLiveService {

  constructor(private _kontorolServerClient: KontorolClient) {
  }

  public createKontorolLiveStream(data: KontorolLive): Observable<KontorolLiveStreamEntry> {
    if (!data || !data.name) {
      throw Observable.throw(new Error('Missing required fields'));
    }

    const stream = new KontorolLiveStreamEntry({
      mediaType: KontorolMediaType.liveStreamFlash,
      name: data.name,
      description: data.description,
      recordStatus: data.enableRecording ? data.enableRecordingSelectedOption : KontorolRecordStatus.disabled,
      conversionProfileId: data.transcodingProfile,
      dvrStatus: data.liveDVR ? KontorolDVRStatus.enabled : KontorolDVRStatus.disabled,
      dvrWindow: data.liveDVR ? 120 : null,
        explicitLive: data.previewMode ? KontorolNullableBoolean.trueValue : KontorolNullableBoolean.falseValue
    });

    return this._kontorolServerClient
      .request(new LiveStreamAddAction({liveStreamEntry: stream, sourceType: KontorolSourceType.liveStream}))
  }

  public createManualLiveStream(data: ManualLive): Observable<KontorolLiveStreamEntry> {
    if (!data || !data.name) {
      throw Observable.throw(new Error('Missing required fields'));
    }
    const stream = new KontorolLiveStreamEntry({
      mediaType: KontorolMediaType.liveStreamFlash,
      name: data.name,
      description: data.description,
      liveStreamConfigurations: new Array(),
      hlsStreamUrl: data.hlsStreamUrl || ''
    });

    if (data.hlsStreamUrl) {
      const cfg = new KontorolLiveStreamConfiguration();
      cfg.protocol = KontorolPlaybackProtocol.appleHttp;
      cfg.url = stream.hlsStreamUrl;
      stream.liveStreamConfigurations.push(cfg);
    }

    if (data.flashHDSURL) {
      const cfg = new KontorolLiveStreamConfiguration();
      cfg.protocol = data.useAkamaiHdProtocol ? KontorolPlaybackProtocol.akamaiHds : KontorolPlaybackProtocol.hds;
      cfg.url = data.flashHDSURL;
      stream.liveStreamConfigurations.push(cfg);
    }

    return this._kontorolServerClient
      .request(new LiveStreamAddAction({liveStreamEntry: stream, sourceType: KontorolSourceType.manualLiveStream}))
  }

  public createUniversalLiveStream(data: UniversalLive): Observable<KontorolLiveStreamEntry> {
    if (!data || !data.name || !data.primaryEncoderIp || !data.secondaryEncoderIp) {
      throw Observable.throw(new Error('Missing required fields'));
    }

    const stream = new KontorolLiveStreamEntry({
      mediaType: KontorolMediaType.liveStreamFlash,
      name: data.name,
      description: data.description,
      encodingIP1: data.primaryEncoderIp,
      encodingIP2: data.secondaryEncoderIp,
      streamPassword: data.broadcastPassword || '',
      dvrStatus: data.liveDvr ? KontorolDVRStatus.enabled : KontorolDVRStatus.disabled,
      dvrWindow: data.liveDvr ? 30 : null
    });


    return this._kontorolServerClient
      .request(new LiveStreamAddAction({liveStreamEntry: stream, sourceType: KontorolSourceType.akamaiUniversalLive}))
  }
}
