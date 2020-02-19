import { PartnerListFeatureStatusAction } from 'kontorol-ngx-client';
import { KontorolFeatureStatusListResponse } from 'kontorol-ngx-client';
import { RequestFactory } from '@kontorol-ng/kontorol-common';

export class CategoriesStatusRequestFactory implements RequestFactory<PartnerListFeatureStatusAction, KontorolFeatureStatusListResponse> {

  constructor() {
  }

  create(): PartnerListFeatureStatusAction {
    return new PartnerListFeatureStatusAction({});
  }
}
