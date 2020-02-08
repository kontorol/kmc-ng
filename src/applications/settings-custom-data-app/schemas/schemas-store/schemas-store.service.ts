import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';
import { ISubscription } from 'rxjs/Subscription';
import { KontorolClient, KontorolMultiRequest } from 'kontorol-ngx-client';
import { KontorolFilterPager } from 'kontorol-ngx-client';
import { BrowserService } from 'app-shared/kmc-shell/providers/browser.service';
import { FiltersStoreBase, TypeAdaptersMapping } from '@kontorol-ng/mc-shared';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';
import { NumberTypeAdapter } from '@kontorol-ng/mc-shared';
import { MetadataProfileListAction } from 'kontorol-ngx-client';
import { KontorolMetadataProfileFilter } from 'kontorol-ngx-client';
import { KontorolMetadataOrderBy } from 'kontorol-ngx-client';
import { KontorolMetadataProfileCreateMode } from 'kontorol-ngx-client';
import { KontorolMetadataObjectType } from 'kontorol-ngx-client';
import { KontorolMetadataProfileListResponse } from 'kontorol-ngx-client';
import { MetadataProfileParser } from 'app-shared/kmc-shared';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { AppAuthentication } from 'app-shared/kmc-shell';
import { MetadataProfileDeleteAction } from 'kontorol-ngx-client';
import { SettingsMetadataProfile } from './settings-metadata-profile.interface';
import { KontorolRequest } from 'kontorol-ngx-client';
import { KontorolMetadataProfile } from 'kontorol-ngx-client';
import { MetadataProfileUpdateAction } from 'kontorol-ngx-client';
import { MetadataProfileAddAction } from 'kontorol-ngx-client';
import { getKontorolServerUri } from 'config/server';
import { SettingsMetadataMainViewService } from 'app-shared/kmc-shared/kmc-views';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';
export interface SchemasFilters {
  pageSize: number;
  pageIndex: number;
}

const localStoragePageSizeKey = 'schemas.list.pageSize';

@Injectable()
export class SchemasStore extends FiltersStoreBase<SchemasFilters> implements OnDestroy {
  private _schemas = {
    data: new BehaviorSubject<{ items: SettingsMetadataProfile[], totalCount: number }>({ items: [], totalCount: 0 }),
    state: new BehaviorSubject<{ loading: boolean, errorMessage: string }>({ loading: false, errorMessage: null })
  };
  private _isReady = false;
  private _querySubscription: ISubscription;
  private _metadataProfileParser = new MetadataProfileParser();

  public readonly schemas = {
    data$: this._schemas.data.asObservable(),
    state$: this._schemas.state.asObservable(),
    data: () => this._schemas.data.value
  };

  constructor(private _kontorolServerClient: KontorolClient,
              private _appLocalization: AppLocalization,
              private _appAuth: AppAuthentication,
              private _browserService: BrowserService,
              settingsMetadataMainView: SettingsMetadataMainViewService,
              _logger: KontorolLogger) {
    super(_logger.subLogger('SchemasStore'));
    if (settingsMetadataMainView.isAvailable()) {
        this._prepare();
    }
  }

  ngOnDestroy() {
    this._schemas.data.complete();
    this._schemas.state.complete();
  }

  private _prepare(): void {
    if (!this._isReady) {
      this._logger.info(`initiate service`);
      this._isReady = true;

      const defaultPageSize = this._browserService.getFromLocalStorage(localStoragePageSizeKey);
      if (defaultPageSize !== null && (defaultPageSize !== this.cloneFilter('pageSize', null))) {
        this.filter({
          pageSize: defaultPageSize
        });
      }

      this._registerToFilterStoreDataChanges();
      this._executeQuery();
    }
  }

  private _registerToFilterStoreDataChanges(): void {
    this.filtersChange$
      .pipe(cancelOnDestroy(this))
      .subscribe(() => {
        this._executeQuery();
      });
  }

  private _executeQuery(): void {

    if (this._querySubscription) {
      this._querySubscription.unsubscribe();
      this._querySubscription = null;
    }

    const pageSize = this.cloneFilter('pageSize', null);
    if (pageSize) {
      this._browserService.setInLocalStorage(localStoragePageSizeKey, pageSize);
    }

    this._logger.info(`loading data from the server`);
    this._schemas.state.next({ loading: true, errorMessage: null });
    this._querySubscription = this._buildQueryRequest()
      .pipe(cancelOnDestroy(this))
      .map(({ objects, totalCount }) => {
        objects.forEach((object: SettingsMetadataProfile) => {
          if (!object.createMode || object.createMode === KontorolMetadataProfileCreateMode.kmc) {
            const parsedProfile = this._metadataProfileParser.parse(object);
            object.profileDisabled = !!parsedProfile.error || !parsedProfile.profile; // disable profile if there's error during parsing
            object.parsedProfile = parsedProfile.profile;

            if (!object.profileDisabled) {
              object.defaultLabel = object.parsedProfile.items.map(({ key }) => key).join(', ');
              const ks = this._appAuth.appUser.ks;
              const id = object.id;
              object.downloadUrl = getKontorolServerUri(`/api_v3/index.php/service/metadata_metadataprofile/action/serve/ks/${ks}/id/${id}`);
            }
          } else {
            object.profileDisabled = true; // disabled
          }

          object.applyTo = object.metadataObjectType;
          object.isNew = false;
        });

        return { objects, totalCount };
      })
      .subscribe(
        response => {
          this._logger.info(`handle success data loading`);
          this._querySubscription = null;

          this._schemas.state.next({ loading: false, errorMessage: null });

          this._schemas.data.next({
            items: <any[]>response.objects,
            totalCount: <number>response.totalCount
          });
        },
        error => {
          this._querySubscription = null;
          const errorMessage = error && error.message ? error.message : typeof error === 'string' ? error : 'invalid error';
          this._logger.info(`handle failing data loading`, { errorMessage });
          this._schemas.state.next({ loading: false, errorMessage });
        });
  }

  private _buildQueryRequest(): Observable<KontorolMetadataProfileListResponse> {
    try {
      // default readonly filter
      const filter = new KontorolMetadataProfileFilter({
        orderBy: KontorolMetadataOrderBy.createdAtDesc.toString(),
        createModeNotEqual: KontorolMetadataProfileCreateMode.app,
        metadataObjectTypeIn: [KontorolMetadataObjectType.entry, KontorolMetadataObjectType.category].join(',')
      });
      let pager: KontorolFilterPager = null;

      const data: SchemasFilters = this._getFiltersAsReadonly();

      // update pagination args
      if (data.pageIndex || data.pageSize) {
        pager = new KontorolFilterPager(
          {
            pageSize: data.pageSize,
            pageIndex: data.pageIndex + 1
          }
        );
      }

      // build the request
      return <any>this._kontorolServerClient.request(
        new MetadataProfileListAction({ filter, pager })
      );
    } catch (err) {
      return Observable.throw(err);
    }
  }

  private _getUpdateSchemaAction(schema: SettingsMetadataProfile): KontorolRequest<KontorolMetadataProfile> {
    const updatedProfile = new KontorolMetadataProfile({
      name: schema.name,
      systemName: schema.systemName,
      description: schema.description,
      metadataObjectType: schema.applyTo
    });

    this._logger.debug(`create 'MetadataProfileUpdateAction'`);

    return new MetadataProfileUpdateAction({
      id: schema.id,
      metadataProfile: updatedProfile,
      xsdData: this._metadataProfileParser.generateSchema(schema.parsedProfile)
    });
  }

  private _getCreateSchemaAction(schema: SettingsMetadataProfile): KontorolRequest<KontorolMetadataProfile> {
    const newProfile = new KontorolMetadataProfile({
      createMode: KontorolMetadataProfileCreateMode.kmc,
      name: schema.name,
      systemName: schema.systemName,
      description: schema.description,
      metadataObjectType: schema.applyTo
    });

    this._logger.debug(`create 'MetadataProfileAddAction'`);

    return new MetadataProfileAddAction({
      metadataProfile: newProfile,
      xsdData: this._metadataProfileParser.generateSchema(schema.parsedProfile)
    });
  }

  protected _preFilter(updates: Partial<SchemasFilters>): Partial<SchemasFilters> {
    if (typeof updates.pageIndex === 'undefined') {
      // reset page index to first page everytime filtering the list by any filter that is not page index
      updates.pageIndex = 0;
    }

    return updates;
  }

  protected _createDefaultFiltersValue(): SchemasFilters {
    const pageSize = this._browserService.getFromLocalStorage(localStoragePageSizeKey) || 25;
    return {
      pageSize: pageSize,
      pageIndex: 0
    };
  }

  protected _getTypeAdaptersMapping(): TypeAdaptersMapping<SchemasFilters> {
    return {
      pageSize: new NumberTypeAdapter(),
      pageIndex: new NumberTypeAdapter()
    };
  }

  public reload(): void {
    this._logger.info(`reload schemas list`);
    if (this._schemas.state.getValue().loading) {
      this._logger.info(`reloading already in progress skipp duplicating request`);
      return;
    }

    if (this._isReady) {
      this._executeQuery();
    } else {
      this._prepare();
    }
  }

  public deleteProfiles(profiles: SettingsMetadataProfile[]): Observable<void> {
    const request = new KontorolMultiRequest(
      ...profiles.map(profile => new MetadataProfileDeleteAction({ id: profile.id }))
    );
    return this._kontorolServerClient.multiRequest(request)
      .map(() => {
      });
  }

  public saveSchema(schema: SettingsMetadataProfile): Observable<void> {
    const action = schema.isNew ? this._getCreateSchemaAction(schema) : this._getUpdateSchemaAction(schema);

    return this._kontorolServerClient.request(action)
      .map(() => {
      });
  }
}

