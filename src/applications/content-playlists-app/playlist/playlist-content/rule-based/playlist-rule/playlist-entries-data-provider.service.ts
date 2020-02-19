import { Injectable, OnDestroy } from '@angular/core';
import { KontorolBaseEntry } from 'kontorol-ngx-client';
import { Observable } from 'rxjs';
import { KontorolDetachedResponseProfile } from 'kontorol-ngx-client';
import { KontorolMetadataSearchItem } from 'kontorol-ngx-client';
import { KontorolNullableBoolean } from 'kontorol-ngx-client';
import { KontorolSearchOperatorType } from 'kontorol-ngx-client';
import { KontorolSearchOperator } from 'kontorol-ngx-client';
import { KontorolSearchCondition } from 'kontorol-ngx-client';
import { KontorolContentDistributionSearchItem } from 'kontorol-ngx-client';
import { KontorolFilterPager } from 'kontorol-ngx-client';
import { KontorolResponseProfileType } from 'kontorol-ngx-client';
import { KontorolMediaEntryFilter } from 'kontorol-ngx-client';
import { KontorolUtils } from '@kontorol-ng/kontorol-common';
import { KontorolClient } from 'kontorol-ngx-client';
import {
  EntriesDataProvider, EntriesFilters, MetadataProfileData,
  SortDirection
} from 'app-shared/content-shared/entries/entries-store/entries-store.service';
import { PlaylistExecuteFromFiltersAction } from 'kontorol-ngx-client';
import { KontorolMediaEntryFilterForPlaylist } from 'kontorol-ngx-client';
import { CategoriesModes } from 'app-shared/content-shared/categories/categories-mode-type';
import { subApplicationsConfig } from 'config/sub-applications';
import { MetadataProfileCreateModes, MetadataProfileStore, MetadataProfileTypes } from 'app-shared/kmc-shared';
import { KMCPermissions, KMCPermissionsService } from 'app-shared/kmc-shared/kmc-permissions';
import { cancelOnDestroy } from '@kontorol-ng/kontorol-common';
@Injectable()
export class PlaylistEntriesDataProvider implements EntriesDataProvider, OnDestroy {
  constructor(private _kontorolServerClient: KontorolClient,
              private _appPermissions: KMCPermissionsService,
              private _metadataProfileService: MetadataProfileStore) {
  }

  ngOnDestroy() {

  }

  private _updateFilterWithJoinedList(list: any[],
                                      requestFilter: KontorolMediaEntryFilter,
                                      requestFilterProperty: keyof KontorolMediaEntryFilter): void {
    const value = (list || []).map(item => item).join(',');

    if (value) {
      requestFilter[requestFilterProperty] = value;
    }
  }

  private _getMetadataProfiles(): Observable<MetadataProfileData[]> {
    return this._metadataProfileService.get({
      type: MetadataProfileTypes.Entry,
      ignoredCreateMode: MetadataProfileCreateModes.App
    })
      .pipe(cancelOnDestroy(this))
      .first()
      .map(metadataProfiles => {
        return metadataProfiles.items.map(metadataProfile => ({
          id: metadataProfile.id,
          name: metadataProfile.name,
          lists: (metadataProfile.items || []).map(item => ({ id: item.id, name: item.name }))
        }));
      });
  }

  public getServerFilter(data: EntriesFilters, mediaTypesDefault = true): Observable<KontorolMediaEntryFilterForPlaylist> {
    try {
      return this._getMetadataProfiles()
        .map(metadataProfiles => {
          // create request items
          const filter = new KontorolMediaEntryFilterForPlaylist({});

          const advancedSearch = filter.advancedSearch = new KontorolSearchOperator({});
          advancedSearch.type = KontorolSearchOperatorType.searchAnd;

          if (data.videoQuiz || data.videoCaptions) {
              // not supported by rulebased playlists, ignore it
          }

          // filter 'freeText'
          if (data.freetext) {
            filter.freeText = data.freetext;
          }

          // filter 'createdAt'
          if (data.createdAt) {
            if (data.createdAt.fromDate) {
              filter.createdAtGreaterThanOrEqual = KontorolUtils.getStartDateValue(data.createdAt.fromDate);
            }

            if (data.createdAt.toDate) {
              filter.createdAtLessThanOrEqual = KontorolUtils.getEndDateValue(data.createdAt.toDate);
            }
          }

          // filters of joined list
          this._updateFilterWithJoinedList(data.mediaTypes, filter, 'mediaTypeIn');
          this._updateFilterWithJoinedList(data.durations, filter, 'durationTypeMatchOr');
          this._updateFilterWithJoinedList(data.replacementStatuses, filter, 'replacementStatusIn');
          this._updateFilterWithJoinedList(data.flavors, filter, 'flavorParamsIdsMatchOr');

          // filter 'distribution'
          if (data.distributions && data.distributions.length > 0) {
            const distributionItem = new KontorolSearchOperator({
              type: KontorolSearchOperatorType.searchOr
            });

            advancedSearch.items.push(distributionItem);

            data.distributions.forEach(item => {
              // very complex way to make sure the value is number (an also bypass both typescript and tslink checks)
              if (isFinite(+item) && parseInt(item) == <any>item) { // tslint:disable-line
                const newItem = new KontorolContentDistributionSearchItem(
                  {
                    distributionProfileId: +item,
                    hasEntryDistributionValidationErrors: false,
                    noDistributionProfiles: false
                  }
                );

                distributionItem.items.push(newItem);
              } else {
                // this._logger.warn(`cannot convert distribution value '${item}' into number. ignoring value`);
              }
            });
          }

          // filter 'originalClippedEntries'
          if (data.originalClippedEntries && data.originalClippedEntries.length > 0) {
            let originalClippedEntriesValue: KontorolNullableBoolean = null;

            data.originalClippedEntries.forEach(item => {
              switch (item) {
                case '0':
                  if (originalClippedEntriesValue == null) {
                    originalClippedEntriesValue = KontorolNullableBoolean.falseValue;
                  } else if (originalClippedEntriesValue === KontorolNullableBoolean.trueValue) {
                    originalClippedEntriesValue = KontorolNullableBoolean.nullValue;
                  }
                  break;
                case '1':
                  if (originalClippedEntriesValue == null) {
                    originalClippedEntriesValue = KontorolNullableBoolean.trueValue;
                  } else if (originalClippedEntriesValue === KontorolNullableBoolean.falseValue) {
                    originalClippedEntriesValue = KontorolNullableBoolean.nullValue;
                  }
                  break;
              }
            });

            if (originalClippedEntriesValue !== null) {
              filter.isRoot = originalClippedEntriesValue;
            }
          }

          // filters of custom metadata lists
          if (metadataProfiles && metadataProfiles.length > 0) {

            metadataProfiles.forEach(metadataProfile => {
              // create advanced item for all metadata profiles regardless if the user filtered by them or not.
              // this is needed so freetext will include all metadata profiles while searching.
              const metadataItem: KontorolMetadataSearchItem = new KontorolMetadataSearchItem({
                metadataProfileId: metadataProfile.id,
                type: KontorolSearchOperatorType.searchAnd,
                items: []
              });
              advancedSearch.items.push(metadataItem);

              metadataProfile.lists.forEach(list => {
                const metadataProfileFilters = data.customMetadata[list.id];
                if (metadataProfileFilters && metadataProfileFilters.length > 0) {
                  const innerMetadataItem: KontorolMetadataSearchItem = new KontorolMetadataSearchItem({
                    metadataProfileId: metadataProfile.id,
                    type: KontorolSearchOperatorType.searchOr,
                    items: []
                  });
                  metadataItem.items.push(innerMetadataItem);

                  metadataProfileFilters.forEach(filterItem => {
                    const searchItem = new KontorolSearchCondition({
                      field: `/*[local-name()='metadata']/*[local-name()='${list.name}']`,
                      value: filterItem
                    });

                    innerMetadataItem.items.push(searchItem);
                  });
                }
              });
            });
          }

          if (data.categories && data.categories.length) {
            const categoriesValue = data.categories.map(item => item).join(',');
            if (data.categoriesMode === CategoriesModes.SelfAndChildren) {
              filter.categoryAncestorIdIn = categoriesValue;
            } else {
              filter.categoriesIdsMatchOr = categoriesValue;
            }
          }

          // remove advanced search arg if it is empty
          if (advancedSearch.items && advancedSearch.items.length === 0) {
            delete filter.advancedSearch;
          }

          // handle default value for media types
          if (!filter.mediaTypeIn && mediaTypesDefault) {
            filter.mediaTypeIn = '1,2,5,6';
            if (this._appPermissions.hasPermission(KMCPermissions.FEATURE_LIVE_STREAM)) {
              filter.mediaTypeIn += ',201';
            }
          }

          // update the sort by args
          if (data.sortBy) {
            filter.orderBy = `${data.sortDirection === SortDirection.Desc ? '-' : '+'}${data.sortBy}`;
          }

          if (data.youtubeVideo) {
              // not supported by rulebased playlists, ignore it
          }

          filter.limit = data.limits && data.limits > 0 && data.limits <= subApplicationsConfig.contentPlaylistsApp.ruleBasedTotalResults
            ? data.limits
            : subApplicationsConfig.contentPlaylistsApp.ruleBasedTotalResults;

          // readonly filters for rule-based playlist
          filter.statusIn = '1,2';
          filter.typeIn = '1,7';
          filter.moderationStatusIn = '1,2,5,6';

          return filter;
        });
    } catch (err) {
      return Observable.throw(err);
    }
  }


  public executeQuery(data: EntriesFilters): Observable<{ entries: KontorolBaseEntry[], totalCount?: number }> {
    let pagination: KontorolFilterPager = null;
    // update desired fields of entries
    const responseProfile = new KontorolDetachedResponseProfile({
      type: KontorolResponseProfileType.includeFields,
      fields: 'id,name,thumbnailUrl,mediaType,plays,createdAt,duration,status,startDate,endDate,moderationStatus,tags,categoriesIds,downloadUrl,sourceType,externalSourceType,capabilities'
    });

    // update pagination args
    if (data.pageIndex || data.pageSize) {
      pagination = new KontorolFilterPager(
        {
          pageSize: data.pageSize,
          pageIndex: data.pageIndex + 1
        }
      );
    }

    // build the request
    return <any>
      this.getServerFilter(data)
        .switchMap(filter => this._kontorolServerClient.request(
          new PlaylistExecuteFromFiltersAction({
            filters: [filter],
            totalResults: subApplicationsConfig.contentPlaylistsApp.ruleBasedTotalResults,
            pager: pagination
          }).setRequestOptions({
              responseProfile
          }))
        ).map(response => ({ entries: response, totalCount: response.length })
      );
  }

  public getDefaultFilterValues(savedAutoSelectChildren: CategoriesModes, pageSize: number): EntriesFilters {
    const categoriesMode = typeof savedAutoSelectChildren === 'number'
      ? savedAutoSelectChildren
      : CategoriesModes.SelfAndChildren;

    return {
      freetext: '',
      pageSize: pageSize,
      pageIndex: 0,
      sortBy: 'plays',
      sortDirection: SortDirection.Desc,
      createdAt: { fromDate: null, toDate: null },
      scheduledAt: { fromDate: null, toDate: null },
      mediaTypes: [],
      timeScheduling: [],
      ingestionStatuses: [],
      durations: [],
      originalClippedEntries: [],
      moderationStatuses: [],
      replacementStatuses: [],
      accessControlProfiles: [],
      flavors: [],
      distributions: [], categories: [],
      categoriesMode,
      customMetadata: {},
      limits: subApplicationsConfig.contentPlaylistsApp.ruleBasedTotalResults,
      youtubeVideo: false,
      videoQuiz: false,
      videoCaptions: false
    };
  }
}
