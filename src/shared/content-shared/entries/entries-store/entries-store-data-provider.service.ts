import { Injectable, OnDestroy } from '@angular/core';
import { EntriesDataProvider, EntriesFilters, MetadataProfileData, SortDirection } from './entries-store.service';
import {
    BaseEntryListAction,
    KontorolBaseEntry,
    KontorolClient,
    KontorolContentDistributionSearchItem,
    KontorolDetachedResponseProfile,
    KontorolExternalMediaEntry,
    KontorolFilterPager,
    KontorolLiveStreamAdminEntry,
    KontorolLiveStreamEntry,
    KontorolMediaEntryFilter,
    KontorolMetadataSearchItem,
    KontorolNullableBoolean,
    KontorolQuizAdvancedFilter,
    KontorolResponseProfileType,
    KontorolSearchCondition,
    KontorolSearchOperator,
    KontorolSearchOperatorType,
    KontorolExternalMediaSourceType,
    KontorolExternalMediaEntryFilter,
    KontorolEntryCaptionAdvancedFilter
} from 'kontorol-ngx-client';
import { Observable } from 'rxjs';
import { cancelOnDestroy, KontorolUtils } from '@kontorol-ng/kontorol-common';
import { CategoriesModes } from 'app-shared/content-shared/categories/categories-mode-type';
import { MetadataProfileCreateModes, MetadataProfileStore, MetadataProfileTypes } from 'app-shared/kmc-shared';
import { KMCPermissions, KMCPermissionsService } from 'app-shared/kmc-shared/kmc-permissions';

@Injectable()
export class EntriesStoreDataProvider implements EntriesDataProvider, OnDestroy {
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

  public getServerFilter(data: EntriesFilters): Observable<KontorolMediaEntryFilter> {
    try {
      return this._getMetadataProfiles()
        .map(metadataProfiles => {
          // create request items
            const filter = data.youtubeVideo
                ? new KontorolExternalMediaEntryFilter({ externalSourceTypeEqual: KontorolExternalMediaSourceType.youtube })
                : new KontorolMediaEntryFilter({});

          const advancedSearch = filter.advancedSearch = new KontorolSearchOperator({});
          advancedSearch.type = KontorolSearchOperatorType.searchAnd;

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
          this._updateFilterWithJoinedList(data.ingestionStatuses, filter, 'statusIn');
          this._updateFilterWithJoinedList(data.durations, filter, 'durationTypeMatchOr');
          this._updateFilterWithJoinedList(data.moderationStatuses, filter, 'moderationStatusIn');
          this._updateFilterWithJoinedList(data.replacementStatuses, filter, 'replacementStatusIn');
          this._updateFilterWithJoinedList(data.accessControlProfiles, filter, 'accessControlIdIn');
          this._updateFilterWithJoinedList(data.flavors, filter, 'flavorParamsIdsMatchOr');

          // filter video quiz
            if (data.videoQuiz) {
                advancedSearch.items.push(new KontorolSearchOperator({
                    type: KontorolSearchOperatorType.searchOr,
                    items: [new KontorolQuizAdvancedFilter({ isQuiz: KontorolNullableBoolean.trueValue })]
                }));
            }
            
          // filter video captions
            if (data.videoCaptions) {
                advancedSearch.items.push(new KontorolSearchOperator({
                    type: KontorolSearchOperatorType.searchOr,
                    items: [new KontorolEntryCaptionAdvancedFilter({ hasCaption: KontorolNullableBoolean.trueValue })]
                }));
            }

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

                distributionItem.items.push(newItem)
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

          // filter 'timeScheduling'
          if (data.timeScheduling && data.timeScheduling.length > 0) {
            data.timeScheduling.forEach(item => {
              switch (item) {
                case 'past':
                  if (filter.endDateLessThanOrEqual === undefined || filter.endDateLessThanOrEqual < (new Date())) {
                    filter.endDateLessThanOrEqual = (new Date());
                  }
                  break;
                case 'live':
                  if (filter.startDateLessThanOrEqualOrNull === undefined || filter.startDateLessThanOrEqualOrNull > (new Date())) {
                    filter.startDateLessThanOrEqualOrNull = (new Date());
                  }
                  if (filter.endDateGreaterThanOrEqualOrNull === undefined || filter.endDateGreaterThanOrEqualOrNull < (new Date())) {
                    filter.endDateGreaterThanOrEqualOrNull = (new Date());
                  }
                  break;
                case 'future':
                  if (filter.startDateGreaterThanOrEqual === undefined || filter.startDateGreaterThanOrEqual > (new Date())) {
                    filter.startDateGreaterThanOrEqual = (new Date());
                  }
                  break;
                case 'scheduled':
                  if (data.scheduledAt.fromDate) {
                    if (filter.startDateGreaterThanOrEqual === undefined
                      || filter.startDateGreaterThanOrEqual > (KontorolUtils.getStartDateValue(data.scheduledAt.fromDate))
                    ) {
                      filter.startDateGreaterThanOrEqual = (KontorolUtils.getStartDateValue(data.scheduledAt.fromDate));
                    }
                  }

                  if (data.scheduledAt.toDate) {
                    if (filter.endDateLessThanOrEqual === undefined
                      || filter.endDateLessThanOrEqual < (KontorolUtils.getEndDateValue(data.scheduledAt.toDate))
                    ) {
                      filter.endDateLessThanOrEqual = (KontorolUtils.getEndDateValue(data.scheduledAt.toDate));
                    }
                  }

                  break;
                default:
                  break
              }
            });
          }

          // filters of custom metadata lists
          if (metadataProfiles && metadataProfiles.length > 0) {

            metadataProfiles.forEach(metadataProfile => {
              // create advanced item for all metadata profiles regardless if the user filtered by them or not.
              // this is needed so freetext will include all metadata profiles while searching.
              const metadataItem: KontorolMetadataSearchItem = new KontorolMetadataSearchItem(
                {
                  metadataProfileId: metadataProfile.id,
                  type: KontorolSearchOperatorType.searchAnd,
                  items: []
                }
              );
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
          if (!filter.mediaTypeIn) {
	          filter.mediaTypeIn = '1,2,5,6';
	          if (this._appPermissions.hasPermission(KMCPermissions.FEATURE_LIVE_STREAM)) {
		          filter.mediaTypeIn += ',201';
	          }
          }

          // handle default value for statuses
          if (!filter.statusIn) {
            filter.statusIn = '-1,-2,0,1,2,7,4';
          }


          // update the sort by args
          if (data.sortBy) {
            filter.orderBy = `${data.sortDirection === SortDirection.Desc ? '-' : '+'}${data.sortBy}`;
          }

          return filter;
        });
    } catch (err) {
      return Observable.throw(err);
    }
  }

  public executeQuery(data: EntriesFilters): Observable<{ entries: KontorolBaseEntry[], totalCount?: number }> {
    const responseProfile: KontorolDetachedResponseProfile = new KontorolDetachedResponseProfile({
      type: KontorolResponseProfileType.includeFields,
      fields: 'id,name,thumbnailUrl,mediaType,plays,createdAt,duration,status,startDate,endDate,moderationStatus,moderationCount,tags,categoriesIds,downloadUrl,sourceType,entitledUsersPublish,entitledUsersView,entitledUsersEdit,externalSourceType,capabilities'
    });
    let pagination: KontorolFilterPager = null;

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
          new BaseEntryListAction({
            filter,
            pager: pagination,
          }).setRequestOptions({
                  responseProfile,
                  acceptedTypes: [KontorolLiveStreamAdminEntry, KontorolLiveStreamEntry, KontorolExternalMediaEntry]
              })
        )).map(response => ({ entries: response.objects, totalCount: response.totalCount })
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
      sortBy: 'createdAt',
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
      limits: 200,
      youtubeVideo: false,
      videoQuiz: false,
      videoCaptions: false,
    };
  }
}
