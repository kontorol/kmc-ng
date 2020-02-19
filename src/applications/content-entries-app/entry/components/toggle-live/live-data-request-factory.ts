import { RequestFactory } from '@kontorol-ng/kontorol-common';
import {
    EntryServerNodeListAction, KontorolDetachedResponseProfile,
    KontorolLiveEntryServerNodeFilter,
    KontorolMultiRequest,
    KontorolMultiResponse, KontorolRequestOptions, KontorolResponseProfileType,
    LiveStreamGetAction
} from 'kontorol-ngx-client';

export class LiveDataRequestFactory implements RequestFactory<KontorolMultiRequest, KontorolMultiResponse> {
    constructor(private _entryId: string) {

    }

    create(): KontorolMultiRequest {
        return new KontorolMultiRequest(
            new LiveStreamGetAction({ entryId: this._entryId })
                .setRequestOptions(
                    new KontorolRequestOptions({
                        responseProfile: new KontorolDetachedResponseProfile({
                            type: KontorolResponseProfileType.includeFields,
                            fields: 'id,recordStatus,explicitLive,viewMode'
                        })
                    })
                ),
            new EntryServerNodeListAction({ filter: new KontorolLiveEntryServerNodeFilter({ entryIdEqual: this._entryId }) })
        );
    }
}
