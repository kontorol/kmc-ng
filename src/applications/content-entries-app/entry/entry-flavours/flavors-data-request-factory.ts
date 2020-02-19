import { RequestFactory } from '@kontorol-ng/kontorol-common';
import { KontorolMultiRequest, KontorolMultiResponse, KontorolRequestOptions } from 'kontorol-ngx-client';
import { BaseEntryGetAction } from 'kontorol-ngx-client';
import { KontorolResponseProfileType } from 'kontorol-ngx-client';
import { KontorolDetachedResponseProfile } from 'kontorol-ngx-client';
import { FlavorAssetGetFlavorAssetsWithParamsAction } from 'kontorol-ngx-client';

export class FlavorsDataRequestFactory implements RequestFactory<KontorolMultiRequest, KontorolMultiResponse> {
    constructor(private _entryId: string) {

    }

    create(): KontorolMultiRequest {
        const getReplacementDataAction = new BaseEntryGetAction({ entryId: this._entryId })
            .setRequestOptions(
                new KontorolRequestOptions({
                    responseProfile: new KontorolDetachedResponseProfile({
                        type: KontorolResponseProfileType.includeFields,
                        fields: 'replacementStatus,replacingEntryId'
                    })
                })
            );
        const getCurrentEntryFlavorsDataAction = new FlavorAssetGetFlavorAssetsWithParamsAction({ entryId: this._entryId });

        return new KontorolMultiRequest(getReplacementDataAction, getCurrentEntryFlavorsDataAction);
    }
}
