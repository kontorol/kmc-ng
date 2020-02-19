import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/forkJoin';

import { KontorolClient } from 'kontorol-ngx-client';
import { KontorolMultiRequest, KontorolMultiResponse } from 'kontorol-ngx-client';
import { DistributionProfileListAction } from 'kontorol-ngx-client';
import { AccessControlListAction } from 'kontorol-ngx-client';
import {
    FlavoursStore,
    MetadataItemTypes,
    MetadataProfile,
    MetadataProfileCreateModes,
    MetadataProfileStore,
    MetadataProfileTypes
} from 'app-shared/kmc-shared';

import { KontorolAccessControlFilter } from 'kontorol-ngx-client';
import { KontorolDetachedResponseProfile } from 'kontorol-ngx-client';
import { KontorolFilterPager } from 'kontorol-ngx-client';
import { KontorolFlavorParams } from 'kontorol-ngx-client';
import { KontorolResponseProfileType } from 'kontorol-ngx-client';

import { DefaultFiltersList } from './default-filters-list';

import * as R from 'ramda';
import { KMCPermissions, KMCPermissionsService } from 'app-shared/kmc-shared/kmc-permissions';
import { KontorolAccessControlListResponse } from 'kontorol-ngx-client';
import { KontorolDistributionProfileListResponse } from 'kontorol-ngx-client';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';

export interface RefineGroupListItem {
    value: string;
    label: string;
    disabled?: boolean;
}

export class RefineGroupList {
    public items: RefineGroupListItem[] = [];

    constructor(public name: string,
                public label: string,
                public group?: string,
                public value?: any
    ) {
    }
}

export interface RefineGroup {
    label: string;
    lists: RefineGroupList[];
}

@Injectable()
export class EntriesRefineFiltersService {

    private _getRefineFilters$: Observable<RefineGroup[]>;

    constructor(private kontorolServerClient: KontorolClient,
                private _permissionsService: KMCPermissionsService,
                private _metadataProfileStore: MetadataProfileStore,
                private _flavoursStore: FlavoursStore,
                private _logger: KontorolLogger) {
        this._logger = _logger.subLogger('EntriesRefineFiltersService');
    }

    public getFilters(): Observable<RefineGroup[]> {
        this._logger.debug(`handle get entries refine filters request`);
        if (!this._getRefineFilters$) {
            // execute the request
            const metadataFilters$ = this._getMetadataFilters();
            const serverFilters$ = this._buildQueryRequest();
            const flavorsFilter$ = this._flavoursStore.get();
            this._getRefineFilters$ = Observable.forkJoin(metadataFilters$, serverFilters$, flavorsFilter$)
                .map(
                    ([metadataResponse, serverResponse, flavorsResponse]) => {
                        if (serverResponse.hasErrors()) {
                            throw new Error('failed to load refine filters');
                        } else {
                            this._logger.debug(`handle successful get entries refine filters request, mapping response`);
                            const defaultFilterGroup = this._buildDefaultFiltersGroup(serverResponse, flavorsResponse.items);
                            const result = [defaultFilterGroup];

                            if (metadataResponse) {
                                const metadataData = this._buildMetadataFiltersGroups(metadataResponse.items);
                                result.push(...metadataData.groups);
                            }

                            return result;
                        }
                    })
                .catch(err => {
                    this._logger.warn(`failed to create refine filters`, { errorMessage: err.message });
                    this._getRefineFilters$ = null;
                    return Observable.throw(err);
                })
                .publishReplay(1)
                .refCount();
        }

        return this._getRefineFilters$;
    }

    private _getMetadataFilters(): Observable<{ items: MetadataProfile[] }> {
        if (this._permissionsService.hasPermission(KMCPermissions.METADATA_PLUGIN_PERMISSION)) {
            return this._metadataProfileStore.get({
                type: MetadataProfileTypes.Entry,
                ignoredCreateMode: MetadataProfileCreateModes.App
            });
        }

        return Observable.of(null);
    }

    private _buildMetadataFiltersGroups(metadataProfiles: MetadataProfile[]): { metadataProfiles: number[], groups: RefineGroup[] } {
        const result: { metadataProfiles: number[], groups: RefineGroup[] } = { metadataProfiles: [], groups: [] };

        metadataProfiles.forEach(metadataProfile => {
            result.metadataProfiles.push(metadataProfile.id);

            // get only fields that are list, searchable and has values
            const profileLists = R.filter(field => {
                return (field.type === MetadataItemTypes.List && field.isSearchable && field.optionalValues.length > 0);
            }, metadataProfile.items);

            // if found relevant lists, create a group for that profile
            if (profileLists && profileLists.length > 0) {
                const filterGroup = { label: metadataProfile.name, lists: [] };
                result.groups.push(filterGroup);


                profileLists.forEach(list => {
                    const group = new RefineGroupList(
                        list.id,
                        list.label,
                        'customMetadata');

                    filterGroup.lists.push(group);

                    list.optionalValues.forEach(item => {
                      group.items.push({
                        value: item.value,
                        label: item.text
                      })

                    });
                });
            }
        });

        return result;
    }

    private _buildDefaultFiltersGroup(responses: KontorolMultiResponse, flavours: KontorolFlavorParams[]): RefineGroup {
        const result: RefineGroup = { label: '', lists: [] };

        // build constant filters
        DefaultFiltersList.forEach((defaultFilterList) => {
            const newRefineFilter = new RefineGroupList(
                defaultFilterList.name,
                defaultFilterList.label,
                null,
                defaultFilterList.value
            );
            result.lists.push(newRefineFilter);
            defaultFilterList.items.forEach((item: any) => {
              if (item.value !== '201' || this._permissionsService.hasPermission(KMCPermissions.FEATURE_LIVE_STREAM)) {
                newRefineFilter.items.push({ value: item.value, label: item.label });
              }
            });

        });

        // build flavors filters
        if (flavours.length > 0) {
          const group = new RefineGroupList(
            'flavors',
            'Flavors');
          result.lists.push(group);
          flavours.forEach((flavor: KontorolFlavorParams) => {
            group.items.push({ value: flavor.id + '', label: flavor.name });
          });
        }

        responses.forEach(response => {
          if (!response.result.objects.length) {
            return;
          }

          if (response.result instanceof KontorolAccessControlListResponse) { // build access control profile filters
            const group = new RefineGroupList(
              'accessControlProfiles',
              'Access Control Profiles'
            );
            result.lists.push(group);
            response.result.objects.forEach((accessControlProfile) => {
              group.items.push({
                value: accessControlProfile.id + '',
                label: accessControlProfile.name
              });
            });
          } else if (response.result instanceof KontorolDistributionProfileListResponse) { // build distributions filters
            const group = new RefineGroupList(
              'distributions',
              'Destinations');
            result.lists.push(group);
            response.result.objects.forEach((distributionProfile) => {
              group.items.push({ value: distributionProfile.id + '', label: distributionProfile.name });
            });
          }
        });

        return result;
    }


    private _buildQueryRequest(): Observable<KontorolMultiResponse> {

        try {
            const accessControlFilter = new KontorolAccessControlFilter({});
            accessControlFilter.orderBy = '-createdAt';

            const accessControlPager = new KontorolFilterPager({});
            accessControlPager.pageSize = 1000;

            const responseProfile: KontorolDetachedResponseProfile = new KontorolDetachedResponseProfile({
                fields: 'id,name',
                type: KontorolResponseProfileType.includeFields
            });

            const request = new KontorolMultiRequest(
                new AccessControlListAction({
                    pager: accessControlPager,
                    filter: accessControlFilter
                }).setRequestOptions({
                    responseProfile
                }),
            );

            if (this._permissionsService.hasPermission(KMCPermissions.CONTENTDISTRIBUTION_PLUGIN_PERMISSION)) {
              const distributionProfilePager = new KontorolFilterPager({});
              distributionProfilePager.pageSize = 500;
              const distributionProfileListAction = new DistributionProfileListAction({ pager: distributionProfilePager });

              request.requests.push(distributionProfileListAction);
            }

            return <any>this.kontorolServerClient.multiRequest(request);
        } catch (error) {
            return Observable.throw(error);
        }
    }
}
