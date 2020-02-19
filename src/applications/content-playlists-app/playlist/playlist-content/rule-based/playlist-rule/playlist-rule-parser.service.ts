import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { EntriesFilters, EntriesStore, SortDirection } from 'app-shared/content-shared/entries/entries-store/entries-store.service';
import { KontorolPlayableEntryOrderBy } from 'kontorol-ngx-client';
import { KontorolSearchOperator } from 'kontorol-ngx-client';
import { GroupedListType } from '@kontorol-ng/mc-shared';
import { KontorolMetadataSearchItem } from 'kontorol-ngx-client';
import { MetadataProfileCreateModes, MetadataProfileStore, MetadataProfileTypes } from 'app-shared/kmc-shared';
import { MetadataProfile } from 'app-shared/kmc-shared/custom-metadata/metadata-profile';
import { PlaylistRule } from './playlist-rule.interface';
import { KontorolMediaEntryFilterForPlaylist } from 'kontorol-ngx-client';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';

@Injectable()
export class PlaylistRuleParserService implements OnDestroy {
  constructor(private _metadataProfileService: MetadataProfileStore,
              private _logger: KontorolLogger,
              public _entriesStore: EntriesStore) {
  }

  ngOnDestroy() {

  }

  private _getMetadataProfiles(): Observable<{ items: MetadataProfile[] }> {
    return this._metadataProfileService
      .get({
        type: MetadataProfileTypes.Entry,
        ignoredCreateMode: MetadataProfileCreateModes.App
      })
      .pipe(cancelOnDestroy(this));
  }

  private _mapCustomMetadata(advancedSearch: KontorolSearchOperator): Observable<GroupedListType<string>> {
    if (!advancedSearch) {
      return Observable.of(null);
    }

    try {
      // Step 1
      // Get rid of items nesting:
      // [{items: [{items: [{items: [searchCondition]}, ...] }] }] => [[[searchCondition], ...]]
      // And assign metadataProfileId for each search condition
      const assignMetadataProfileId = (obj, metadataProfileId = null) => {
        if (obj && obj.items) {
          return obj.items.map(subItem => assignMetadataProfileId(subItem, obj.metadataProfileId));
        }
        return Object.assign(obj, { metadataProfileId });
      };

      // Step2
      // Flatten array from step 1:
      // [[[searchCondition], ...]] => [searchCondition, searchCondition, searchCondition]
      const deepFlatten = (arr) => [].concat(...arr.map(x => Array.isArray(x) ? deepFlatten(x) : x));

      // Step3
      // Parse search condition's field to get localName then find parentMetadataId for this condition and create GroupedListItem.
      // Item also contains parentId to create valid customMetadata structure on step 5.
      // parentId === metadataProfileId.id from MetadataProfile[] array
      // if there's no matching items from metadataProfiles array or can't get localName return null for current item
      // [searchCondition, searchCondition, searchCondition] x MetadataProfile[] => [{value, listName}, null, ...]
      const createGroupedListItem = (metadata, item) => {
        const localNameMatch = item.field && item.field.match(/\/\*\[local-name\(\)='([\w]*)'\]$/);
        const relevantMetadata = metadata.items.find(({ id }) => id === item.metadataProfileId);
        if (relevantMetadata && localNameMatch && localNameMatch[1]) {
          const localName = localNameMatch[1];
          const relevantMetadataItem = relevantMetadata.items.find(({ name }) => name === localName);
          if (relevantMetadataItem) {
            return {
              value: item.value,
              listName: relevantMetadataItem.id
            };
          }
        }

        return null;
      };

      // Step 4
      // Create customMetadata: GroupedListType
      // [{value, listName}, ...] => {parentId: [value], ...}
      const createGroupedList = (acc, item) => {
        const itemList = acc[item.listName];
        if (!itemList) {
          acc[item.listName] = [item.value];
        } else {
          itemList.push(item.value);
        }

        return acc;
      };

      return this._getMetadataProfiles()
        .map(metadata => {
          const relevantItems = advancedSearch.items.filter((searchItem: KontorolMetadataSearchItem) => !!searchItem.items.length);
          const assignedItems = relevantItems.map(item => assignMetadataProfileId(item)); // Step 1
          return deepFlatten(assignedItems) // Step 2
            .map(item => createGroupedListItem(metadata, item)) // Step 3
            .filter(Boolean) // Step 4
            // Exclude null values from array created on step 3
            // [{value, listName}, null, ...] => [{value, listName}, ...]
            .reduce(createGroupedList, {}); // Step 5
        });
    } catch (error) {
      return Observable.throw(error);
    }
  }

  public toEntriesFilters(rule: PlaylistRule): Observable<Partial<EntriesFilters>> {
    const { originalFilter } = rule;
    const getListTypeFilterFromRule = (ruleItem: string): any[] => {
      if (!ruleItem) {
        return null;
      }
      return ruleItem.split(',');
    };

    const getSortDirection = (value) => value === '+' ? SortDirection.Asc : SortDirection.Desc;
    const sortBy = rule.orderBy ? rule.orderBy.toString().substr(1) : null;
    const sortDirection = sortBy ? getSortDirection(rule.orderBy.toString().charAt(0)) : null;
    const categoriesIds = (originalFilter.categoryAncestorIdIn || '').split(',')
      .concat(...((originalFilter.categoriesIdsMatchOr || '').split(',')));
    const uniqueCategoriesIds = Array.from(new Set<number>(categoriesIds.filter(Number).map(Number)));

    return this._mapCustomMetadata(<KontorolSearchOperator>originalFilter.advancedSearch)
      .map(customMetadata => {
        const result = <EntriesFilters>{
          mediaTypes: getListTypeFilterFromRule(originalFilter.mediaTypeIn),
          durations: getListTypeFilterFromRule(originalFilter.durationTypeMatchOr),
          replacementStatuses: getListTypeFilterFromRule(originalFilter.replacementStatusIn),
          flavors: getListTypeFilterFromRule(originalFilter.flavorParamsIdsMatchOr),
          limits: rule.limit,
          categories: uniqueCategoriesIds,
          freetext: originalFilter.freeText,
          sortBy: sortBy,
          sortDirection: sortDirection,
          createdAt: {
            fromDate: originalFilter.createdAtGreaterThanOrEqual ? new Date(originalFilter.createdAtGreaterThanOrEqual) : null,
            toDate: originalFilter.createdAtLessThanOrEqual ? new Date(originalFilter.createdAtLessThanOrEqual) : null
          }
        };

        if (customMetadata) {
          result.customMetadata = customMetadata;
        }

        return result;
      });
  }

  public toPlaylistRule(payload: { name: string, orderBy: KontorolPlayableEntryOrderBy, limit: number, rule: PlaylistRule }): Observable<PlaylistRule> {
    const entries = this._entriesStore.entries.data() || [];
    const entriesDuration = entries.reduce((duration, entry) => duration + entry.duration, 0) || 0;
    const entriesCount = entries.length || 0;

    return this._entriesStore.convertFiltersToServerStruct()
      .map(originalFilter => {
        if (originalFilter instanceof KontorolMediaEntryFilterForPlaylist) {
            originalFilter.name = payload.name;

            return Object.assign({}, payload.rule, {
                name: payload.name,
                orderBy: payload.orderBy,
                limit: payload.limit,
                entriesDuration,
                entriesCount,
                originalFilter
            });
        } else {
          this._logger.error(`cannot build playlist rule. expected filter of type 'KontorolMediaEntryFilterForPlaylist'.`);
          throw new Error(`cannot build playlist rule. expected filter of type 'KontorolMediaEntryFilterForPlaylist'.`);
        }
      });
  }
}
