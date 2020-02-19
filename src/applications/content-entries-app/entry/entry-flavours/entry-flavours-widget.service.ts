import { Injectable, OnDestroy } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';
import { AppAuthentication, BrowserService } from 'app-shared/kmc-shell';
import { TrackedFileStatuses } from '@kontorol-ng/kontorol-common';
import { AreaBlockerMessage } from '@kontorol-ng/kontorol-ui';
import { KontorolAPIException, KontorolClient, KontorolMultiResponse, KontorolRequestOptions } from 'kontorol-ngx-client';
import { KontorolFlavorAsset } from 'kontorol-ngx-client';
import { KontorolFlavorAssetWithParams } from 'kontorol-ngx-client';
import { FlavorAssetGetFlavorAssetsWithParamsAction } from 'kontorol-ngx-client';
import { KontorolFlavorAssetStatus } from 'kontorol-ngx-client';
import { KontorolLiveParams } from 'kontorol-ngx-client';
import { KontorolEntryStatus } from 'kontorol-ngx-client';
import { KontorolWidevineFlavorAsset } from 'kontorol-ngx-client';
import { FlavorAssetDeleteAction } from 'kontorol-ngx-client';
import { FlavorAssetConvertAction } from 'kontorol-ngx-client';
import { FlavorAssetReconvertAction } from 'kontorol-ngx-client';
import { FlavorAssetSetContentAction } from 'kontorol-ngx-client';
import { FlavorAssetAddAction } from 'kontorol-ngx-client';
import { KontorolUrlResource } from 'kontorol-ngx-client';
import { KontorolContentResource } from 'kontorol-ngx-client';
import { UploadManagement } from '@kontorol-ng/kontorol-common';
import { Flavor } from './flavor';
import { FlavorAssetGetUrlAction } from 'kontorol-ngx-client';
import { KontorolUploadedFileTokenResource } from 'kontorol-ngx-client';
import { EntryWidget } from '../entry-widget';
import { NewEntryFlavourFile } from 'app-shared/kmc-shell/new-entry-flavour-file';
import { AppEventsService } from 'app-shared/kmc-shared';
import { PreviewMetadataChangedEvent } from '../../preview-metadata-changed-event';
import { ContentEntryViewSections } from 'app-shared/kmc-shared/kmc-views/details-views/content-entry-view.service';
import { MediaCancelReplaceAction } from 'kontorol-ngx-client';
import { MediaApproveReplaceAction } from 'kontorol-ngx-client';
import { KontorolResponseProfileType } from 'kontorol-ngx-client';
import { KontorolDetachedResponseProfile } from 'kontorol-ngx-client';
import { KontorolEntryReplacementStatus } from 'kontorol-ngx-client';
import { KmcServerPolls } from 'app-shared/kmc-shared/server-polls';
import { FlavorsDataRequestFactory } from './flavors-data-request-factory';
import { ISubscription } from 'rxjs/Subscription';
import { KontorolMediaEntry } from 'kontorol-ngx-client';
import { EntryStore } from '../entry-store.service';
import { KontorolStorageProfile } from 'kontorol-ngx-client';
import { ConversionProfileAssetParamsListAction } from 'kontorol-ngx-client';
import { ConversionProfileGetAction } from 'kontorol-ngx-client';
import { StorageProfileListAction } from 'kontorol-ngx-client';
import { KontorolStorageProfileFilter } from 'kontorol-ngx-client';
import { KontorolConversionProfileType } from 'kontorol-ngx-client';
import { KontorolConversionProfileFilter } from 'kontorol-ngx-client';
import { KontorolConversionProfileAssetParamsFilter } from 'kontorol-ngx-client';
import { KontorolFilterPager } from 'kontorol-ngx-client';
import { KontorolConversionProfileOrderBy } from 'kontorol-ngx-client';
import { KontorolConversionProfileAssetParams } from 'kontorol-ngx-client';
import { KontorolAssetParamsOrigin } from 'kontorol-ngx-client';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { KMCPermissions, KMCPermissionsService } from 'app-shared/kmc-shared/kmc-permissions';
import { of as ObservableOf} from 'rxjs';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';
import { KontorolConversionProfileAssetParamsListResponse, ConversionProfileListAction, KontorolNullableBoolean } from 'kontorol-ngx-client';
import { map, switchMap } from 'rxjs/operators';

export interface ReplacementData {
    status: KontorolEntryReplacementStatus;
    tempEntryId: string;
    flavors: Flavor[];
}

@Injectable()
export class EntryFlavoursWidget extends EntryWidget implements OnDestroy {
    private _flavors = new BehaviorSubject<Flavor[]>([]);
    private _replacementData = new BehaviorSubject<ReplacementData>({ status: null, tempEntryId: null, flavors: [] });
    private _poolingState: null | 'running' = null;
    private _flavorsDataPollingSubscription: ISubscription;
    private _flavorsDataRequestFactory: FlavorsDataRequestFactory;

    public flavors$ = this._flavors.asObservable();
    public replacementData$ = this._replacementData.asObservable();
    public selectedFlavors: Flavor[] = [];
    public entryStatus = '';
    public entryStatusClassName = '';
    public sourceAvailable = false;
    public showFlavorActions = true;
    public currentEntryId: string;
    public storageProfile: KontorolStorageProfile;
    public conversionProfileAsset: KontorolConversionProfileAssetParams;

    constructor(private _kontorolServerClient: KontorolClient,
                private _appLocalization: AppLocalization,
                private _appAuthentication: AppAuthentication,
                private _browserService: BrowserService,
                private _uploadManagement: UploadManagement,
                private _appEvents: AppEventsService,
                private _kmcServerPolls: KmcServerPolls,
                private _permissionsService: KMCPermissionsService,
                private _entryStore: EntryStore,
                logger: KontorolLogger) {
        super(ContentEntryViewSections.Flavours, logger);
    }

    /**
     * Do some cleanups if needed once the section is removed
     */
    protected onReset() {
        this.sourceAvailable = false;
        this.showFlavorActions = true;
        this.currentEntryId = null;
        this.storageProfile = null;
        this.conversionProfileAsset = null;
        this._stopPolling();
        this._flavors.next([]);
        this._replacementData.next({ status: null, tempEntryId: null, flavors: [] });
    }

    protected onActivate(firstTimeActivating: boolean) {
        if (firstTimeActivating) {
            this._trackUploadFiles();
        }

        this.currentEntryId = this.data ? this.data.id : null;
        this._flavorsDataRequestFactory = new FlavorsDataRequestFactory(this.currentEntryId);

        this._setEntryStatus();

        super._showLoader();

        return this._loadFlavorsSectionData()
            .pipe(cancelOnDestroy(this, this.widgetReset$))
            .map(() => {
                super._hideLoader();
                return { failed: false };
            })
            .catch(error => {
                super._hideLoader();
                super._showActivationError();
                return Observable.of({ failed: true, error });
            });
    }

    private _getLinkData(): Observable<{storageProfile: KontorolStorageProfile, conversionProfileAsset: KontorolConversionProfileAssetParams}> {
        if (!this._permissionsService.hasPermission(KMCPermissions.CONTENT_INGEST_REMOTE_STORAGE)) {
            return Observable.of({ storageProfile: null, conversionProfileAsset: null });
        }

        let conversionProfileAssetRequest;

        if (!Number.isInteger(this.data.conversionProfileId)) {
            conversionProfileAssetRequest = Observable.of(null);
        } else {
            const filter = new KontorolConversionProfileFilter({
                orderBy: KontorolConversionProfileOrderBy.createdAtDesc.toString(),
                typeEqual: KontorolConversionProfileType.media,
                idEqual: this.data.conversionProfileId
            });

            const conversionProfileAssetAction = new ConversionProfileAssetParamsListAction({
                filter: new KontorolConversionProfileAssetParamsFilter({ conversionProfileIdFilter: filter }),
                pager: new KontorolFilterPager({ pageSize: 1 })
            }).setRequestOptions(
                new KontorolRequestOptions({
                    responseProfile: new KontorolDetachedResponseProfile({
                        type: KontorolResponseProfileType.includeFields,
                        fields: 'readyBehavior,origin,assetParamsId,id'
                    })
                })
            );

            conversionProfileAssetRequest = this._kontorolServerClient.request(conversionProfileAssetAction);
        }
        return conversionProfileAssetRequest
            .pipe(
                map((response: KontorolConversionProfileAssetParamsListResponse) => {
                    const relevantAsset = response && Array.isArray(response.objects) && response.objects.length ? response.objects[0] : null;
                    return relevantAsset && relevantAsset.origin !== KontorolAssetParamsOrigin.convert
                        ? relevantAsset
                        : null;
                }),
                switchMap(conversionProfileAsset => {
                    return this._getStorageProfile()
                        .pipe(map(storageProfile => ({ storageProfile, conversionProfileAsset })));
                })
            );
    }

    private _getStorageProfile(): Observable<KontorolStorageProfile> {
        return this._kontorolServerClient.request(new ConversionProfileListAction())
            .pipe(
                map(response => response && Array.isArray(response.objects) ? response.objects : []),
                switchMap(profiles => {
                    const defaultProfile = profiles.find(profile => profile.isDefault === KontorolNullableBoolean.trueValue);
                    const relevantProfile = profiles.find(profile => profile.id === this.data.conversionProfileId) || defaultProfile;

                    if (!relevantProfile || !Number.isInteger(relevantProfile.storageProfileId)) {
                        return Observable.of(null);
                    }

                    const action = new StorageProfileListAction({
                        filter: new KontorolStorageProfileFilter({ idEqual: relevantProfile.storageProfileId })
                    }).setRequestOptions(
                        new KontorolRequestOptions({
                            responseProfile: new KontorolDetachedResponseProfile({
                                type: KontorolResponseProfileType.includeFields,
                                fields: 'id,name,storageUrl,storageBaseDir'
                            })
                        })
                    );
                    return this._kontorolServerClient.request(action).pipe(map(({ objects }) => {
                        return Array.isArray(objects) && objects.length ? objects[0] : null;
                    }));
                })
            );
    }

    private _stopPolling(): void {
        if (this._flavorsDataPollingSubscription) {
            this._flavorsDataPollingSubscription.unsubscribe();
            this._poolingState = null;
        }
    }


    private _mapFlavorsData(flavorsData$: any) : Observable<{
        currentEntryFlavors: Flavor[],
        replacingEntryFlavors: Flavor[],
        replacementData: Partial<KontorolMediaEntry>
    }> {
        return flavorsData$
            .pipe(
                map((response: { error: KontorolAPIException, result: KontorolMultiResponse }) => {
                    if (response.error) {
                        throw new Error(response.error.message);
                    }

                    if (response.result.hasErrors()) {
                        throw new Error(response.result.reduce((acc, val) => `${acc}\n${val.error ? val.error.message : ''}`, ''));
                    }

                    return response.result;
                }),
                switchMap(([replacementDataResponse, currentEntryFlavorsDataResponse]) => {
                    let result: Observable<any>;
                    if (replacementDataResponse.result && replacementDataResponse.result.replacingEntryId) {
                        result = this._kontorolServerClient
                            .request(this._getFlavorsDataAction(replacementDataResponse.result.replacingEntryId));
                    } else {
                        result = ObservableOf(null);
                    }

                    return result.pipe(
                        map((replacingEntryFlavorsData) => {
                                return {
                                    replacementData: replacementDataResponse.result,
                                    currentEntryFlavorsData: currentEntryFlavorsDataResponse.result,
                                    replacingEntryFlavorsData
                                };
                            }
                        ));
                }),
                map(({replacementData, currentEntryFlavorsData, replacingEntryFlavorsData}) => {
                    const currentEntryFlavors = this._mapFlavorsResponse(currentEntryFlavorsData);
                    const replacingEntryFlavors = this._mapFlavorsResponse(replacingEntryFlavorsData);

                    return {currentEntryFlavors, replacingEntryFlavors, replacementData};
                })
            );
    }

    private _handleFlavorsDataResponse(response: {
        currentEntryFlavors: Flavor[],
        replacingEntryFlavors: Flavor[],
        replacementData: Partial<KontorolMediaEntry>
    }): void {
        const { currentEntryFlavors, replacingEntryFlavors, replacementData } = response;
        const hasSource = !!currentEntryFlavors.find(flavor => flavor.isSource);
        this._entryStore.updateHasSourceStatus(hasSource);
        this._flavors.next(currentEntryFlavors);
        this.loadFlavorsByEntryId(this.currentEntryId);

        if (replacementData.replacingEntryId) {
            this._replacementData.next({
                status: replacementData.replacementStatus,
                tempEntryId: replacementData.replacingEntryId,
                flavors: replacingEntryFlavors
            });
            const shouldStopPolling = [
                KontorolEntryReplacementStatus.readyButNotApproved,
                KontorolEntryReplacementStatus.failed
            ].indexOf(replacementData.replacementStatus) !== -1;
            if (shouldStopPolling) {
                this._stopPolling();
            } else {
                this._startPolling();
            }
        } else {
            this.currentEntryId = this.data.id;
            this._replacementData.next({ status: replacementData.replacementStatus, tempEntryId: null, flavors: [] });
        }
    }

    private _startPolling(): void {
        if (this._poolingState !== 'running') {
            this._poolingState = 'running';
            this._logger.info(`start server polling every 10 seconds to sync entry's flavors data`, { entryId: this.data.id });

            this._flavorsDataPollingSubscription = this._kmcServerPolls.register<KontorolMultiResponse>(10, this._flavorsDataRequestFactory)
                .let(flavorsData$ => this._mapFlavorsData(flavorsData$))
                .pipe(cancelOnDestroy(this, this.widgetReset$))
                .subscribe(
                    (response) => {
                        this._handleFlavorsDataResponse(response);
                    },
                    error => {
                        this._logger.warn(`error occurred while trying to sync bulk upload status from server. server error: ${error.message}`);
                    });
        }
    }

    private _loadFlavorsSectionData(): Observable<void> {
        this.sourceAvailable = false;

        return this._kontorolServerClient
            .multiRequest(this._flavorsDataRequestFactory.create())
            .let(flavorsData$ => this._mapFlavorsData(flavorsData$.map(result => ({ result, error: null }))))
            .map((response) => {
                this._handleFlavorsDataResponse(response);
            })
            .switchMap(() => this._getLinkData())
            .map(({ storageProfile, conversionProfileAsset }) => {
                this.storageProfile = storageProfile;
                this.conversionProfileAsset = conversionProfileAsset;
                return undefined;
            });
    }

    private _getFlavorsDataAction(entryId: string): FlavorAssetGetFlavorAssetsWithParamsAction {
        return new FlavorAssetGetFlavorAssetsWithParamsAction({ entryId });
    }

    private _mapFlavorsResponse(response: KontorolFlavorAssetWithParams[]): Flavor[] {
        let flavors: Flavor[] = [];
        if (response && response.length) {
            const flavorsWithAssets: Flavor[] = [];
            const flavorsWithoutAssets: Flavor[] = [];
            response.forEach((flavor: KontorolFlavorAssetWithParams) => {
                if (flavor.flavorAsset && flavor.flavorAsset.isOriginal) {
                    flavors.push(this._createFlavor(flavor, response)); // this is the source. put it first in the array
                    this.sourceAvailable = true;
                } else if (flavor.flavorAsset && (!flavor.flavorAsset.status ||
                    (flavor.flavorAsset.status && flavor.flavorAsset.status.toString() !== KontorolFlavorAssetStatus.temp.toString()))) {
                    flavorsWithAssets.push(this._createFlavor(flavor, response)); // flavors with assets that is not in temp status
                } else if (!flavor.flavorAsset && flavor.flavorParams && !(flavor.flavorParams instanceof KontorolLiveParams)) {
                    flavorsWithoutAssets.push(this._createFlavor(flavor, response)); // flavors without assets
                }
            });
            // source first, then flavors with assets, then flavors without assets
            flavors = flavors.concat(flavorsWithAssets).concat(flavorsWithoutAssets);
        }

        return flavors;
    }

    private _createFlavor(flavor: KontorolFlavorAssetWithParams, allFlavors: KontorolFlavorAssetWithParams[]): Flavor {
        let newFlavor: Flavor = <Flavor>flavor;
        newFlavor.name = flavor.flavorParams ? flavor.flavorParams.name : '';
        newFlavor.id = flavor.flavorAsset ? flavor.flavorAsset.id : '';
        newFlavor.paramsId = flavor.flavorParams ? flavor.flavorParams.id : null;
        newFlavor.isSource = flavor.flavorAsset ? flavor.flavorAsset.isOriginal : false;
        newFlavor.isWidevine = flavor.flavorAsset ? flavor.flavorAsset instanceof KontorolWidevineFlavorAsset : false;
        newFlavor.isWeb = flavor.flavorAsset ? flavor.flavorAsset.isWeb : false;
        newFlavor.format = flavor.flavorAsset ? flavor.flavorAsset.fileExt : '';
        newFlavor.codec = flavor.flavorAsset ? flavor.flavorAsset.videoCodecId : '';
        newFlavor.bitrate = (flavor.flavorAsset && flavor.flavorAsset.bitrate && flavor.flavorAsset.bitrate > 0) ? flavor.flavorAsset.bitrate.toString() : '';
        newFlavor.size = flavor.flavorAsset ? (flavor.flavorAsset.status.toString() === KontorolFlavorAssetStatus.ready.toString() ? flavor.flavorAsset.size.toString() : '0') : '';
        newFlavor.status = flavor.flavorAsset ? flavor.flavorAsset.status.toString() : '';
        newFlavor.statusLabel = "";
        newFlavor.statusTooltip = "";
        newFlavor.tags = flavor.flavorAsset ? flavor.flavorAsset.tags : '-';
        newFlavor.drm = {};

        // set dimensions
        const width: number = flavor.flavorAsset ? flavor.flavorAsset.width : flavor.flavorParams.width;
        const height: number = flavor.flavorAsset ? flavor.flavorAsset.height : flavor.flavorParams.height;
        const w: string = width === 0 ? "[auto]" : width.toString();
        const h: string = height === 0 ? "[auto]" : height.toString();
        newFlavor.dimensions = w + " x " + h;

        // set status
        if (flavor.flavorAsset) {
            newFlavor.statusLabel = this._appLocalization.get('applications.content.entryDetails.flavours.status.' + KontorolFlavorAssetStatus[flavor.flavorAsset.status]);
            if (flavor.flavorAsset.status.toString() === KontorolFlavorAssetStatus.notApplicable.toString()) {
                newFlavor.statusTooltip = this._appLocalization.get('applications.content.entryDetails.flavours.status.naTooltip');
            }
        }

        // add DRM details
        if (newFlavor.isWidevine) {
            // get source flavors for DRM
            const sourceIDs = (flavor.flavorAsset as KontorolWidevineFlavorAsset).actualSourceAssetParamsIds ? (flavor.flavorAsset as KontorolWidevineFlavorAsset).actualSourceAssetParamsIds.split(",") : [];
            let sources = [];
            sourceIDs.forEach(sourceId => {
                allFlavors.forEach(flavor => {
                    if (flavor.flavorParams.id.toString() === sourceId) {
                        sources.push(flavor.flavorParams.name);
                    }
                });
            });
            // set start and end date
            let startDate = (flavor.flavorAsset as KontorolWidevineFlavorAsset).widevineDistributionStartDate;
            if (startDate == -2147483648 || startDate == 18001 || startDate == 2000001600) {
                startDate = null;
            }
            let endDate = (flavor.flavorAsset as KontorolWidevineFlavorAsset).widevineDistributionEndDate;
            if (endDate == -2147483648 || endDate == 18001 || endDate == 2000001600) {
                endDate = null;
            }
            newFlavor.drm = {
                name: flavor.flavorParams.name,
                id: (flavor.flavorAsset as KontorolWidevineFlavorAsset).widevineAssetId,
                flavorSources: sources,
                startTime: startDate,
                endTime: endDate
            };
        }
        return newFlavor;
    }

    private _setEntryStatus() {
        const status = this.data.status.toString();
        switch (status) {
            case KontorolEntryStatus.noContent.toString():
                this.entryStatusClassName = "kStatusNoContent kIconwarning";
                break;
            case KontorolEntryStatus.ready.toString():
                this.entryStatusClassName = "kStatusReady kIconcomplete";
                break;
            case KontorolEntryStatus.errorConverting.toString():
            case KontorolEntryStatus.errorImporting.toString():
                this.entryStatusClassName = "kStatusError kIconerror";
                break;
            default:
                this.entryStatusClassName = "kStatusErrorProcessing kIconerror";
                break;
        }
        this.entryStatus = this._appLocalization.get('applications.content.entryDetails.flavours.' + this.entryStatusClassName.split(" ")[0]);
    }

    public deleteFlavor(flavor: Flavor): void {
        this._browserService.confirm(
            {
                header: this._appLocalization.get('applications.content.entryDetails.flavours.deleteConfirmTitle'),
                message: this._appLocalization.get('applications.content.entryDetails.flavours.deleteConfirm', {"0": flavor.id}),
                accept: () => {
                    this._kontorolServerClient.request(new FlavorAssetDeleteAction({
                        id: flavor.id
                    }))
                        .pipe(cancelOnDestroy(this, this.widgetReset$))
                        .pipe(tag('block-shell'))
                        .subscribe(
                            response => {
                                if (flavor.isSource) {
                                    this._entryStore.updateHasSourceStatus(false);
                                }
                                this.refresh();
                                this._browserService.scrollToTop();
                            },
                            error => {
                                this._showBlockerMessage(new AreaBlockerMessage({
                                    message: this._appLocalization.get('applications.content.entryDetails.flavours.deleteFailure'),
                                    buttons: [{
                                        label: this._appLocalization.get('app.common.ok'),
                                        action: () => this._removeBlockerMessage()
                                    }]
                                }), false);
                            }
                        );
                }
            });
    }

    public downloadFlavor(flavor: Flavor): void {
        const id = flavor.flavorAsset.id;
        this._kontorolServerClient.request(new FlavorAssetGetUrlAction({
            id: id
        }))
            .pipe(cancelOnDestroy(this, this.widgetReset$))
            .subscribe(
                dowmloadUrl => {
                    this._browserService.openLink(dowmloadUrl);
                },
                error => {
                    this._browserService.showGrowlMessage({
                        severity: 'error',
                        detail: this._appLocalization.get('applications.content.entryDetails.flavours.downloadFailure')
                    });
                }
            );
    }

    public convertFlavor(flavor: Flavor): void {
        this._convert(flavor, flavor.paramsId.toString(), new FlavorAssetConvertAction({
            flavorParamsId: flavor.paramsId,
            entryId: this.data.id
        }));
    }

    public reconvertFlavor(flavor: Flavor): void {
        this._convert(flavor, flavor.id, new FlavorAssetReconvertAction({
            id: flavor.id
        }));
    }

    private _convert(flavor: Flavor, id: any, request: any): void {
        flavor.status = KontorolFlavorAssetStatus.waitForConvert.toString();
        flavor.statusLabel = this._appLocalization.get('applications.content.entryDetails.flavours.status.converting');
        this._kontorolServerClient.request(request)
            .pipe(cancelOnDestroy(this, this.widgetReset$))
            .pipe(tag('block-shell'))
            .subscribe(
                () => {
                    const flavors = Array.from(this._flavors.getValue());
                    flavors.forEach((fl: Flavor) => {
                        if (parseInt(fl.id, 10) === id) {
                            fl.status = KontorolFlavorAssetStatus.converting.toString();
                        }
                    });
                    this._flavors.next(flavors);
                },
                error => {
                    const message = error.code === 'ORIGINAL_FLAVOR_ASSET_IS_MISSING'
                      ? this._appLocalization.get('applications.content.entryDetails.flavours.missingOriginalFlavor')
                      : this._appLocalization.get('applications.content.entryDetails.flavours.convertFailure');
                    this._showBlockerMessage(new AreaBlockerMessage({
                        message,
                        buttons: [{
                            label: this._appLocalization.get('app.common.ok'),
                            action: () => {
                                this.refresh();
                                this._removeBlockerMessage();
                            }
                        }]
                    }), false);
                }
            );
    }

    private _trackUploadFiles(): void {
        this._uploadManagement.onTrackedFileChanged$
            .pipe(cancelOnDestroy(this))
            .map(uploadedFile => {
                let relevantFlavor = null;
                if (uploadedFile.data instanceof NewEntryFlavourFile) {
                    const flavors = this._flavors.getValue();
                    relevantFlavor = flavors ? flavors.find(flavorFile => flavorFile.uploadFileId === uploadedFile.id) : null;
                }
                return {relevantFlavor, uploadedFile};
            })
            .filter(({relevantFlavor}) => !!relevantFlavor)
            .subscribe(
                ({relevantFlavor, uploadedFile}) => {
                    switch (uploadedFile.status) {
                        case TrackedFileStatuses.prepared:
                            const token = (<NewEntryFlavourFile>uploadedFile.data).serverUploadToken;
                            const resource = new KontorolUploadedFileTokenResource({token});
                            if (!!relevantFlavor.id) {
                                this.updateFlavor(relevantFlavor, resource);
                            } else {
                                this.addNewFlavor(relevantFlavor, resource);
                            }
                            break;

                        case TrackedFileStatuses.uploadCompleted:
                            this.refresh();
                            break;

                        case TrackedFileStatuses.failure:
                            this._browserService.showGrowlMessage({
                                severity: 'error',
                                detail: this._appLocalization.get('applications.content.entryDetails.flavours.uploadFailure')
                            });
                            this.refresh();
                            break;

                        default:
                            break;
                    }
                });
    }

    public uploadFlavor(flavor: Flavor, fileData: File): void {
        Observable.of(this._uploadManagement.addFile(new NewEntryFlavourFile(fileData, this.data.id, this.data.mediaType)))
            .subscribe((response) => {
                    flavor.uploadFileId = response.id;
                    flavor.status = KontorolFlavorAssetStatus.importing.toString();
                    flavor.statusLabel = this._appLocalization.get('applications.content.entryDetails.flavours.status.importing');
                },
                () => {
                    this._browserService.showGrowlMessage({
                        severity: 'error',
                        detail: this._appLocalization.get('applications.content.entryDetails.flavours.uploadFailure')
                    });
                    this.refresh();
                });
    }

    private updateFlavor(flavor: Flavor, resource: KontorolContentResource): void {
        this._kontorolServerClient.request(new FlavorAssetSetContentAction({
            id: flavor.id,
            contentResource: resource
        }))
            .pipe(cancelOnDestroy(this, this.widgetReset$))
            .pipe(tag('block-shell'))
            .catch(error => {
                this._uploadManagement.cancelUploadWithError(flavor.uploadFileId, 'Cannot update flavor, cancel related file');
                return Observable.throw(error);
            })
            .subscribe(
                response => {
                    this.refresh();
                },
                error => {
                    this._showBlockerMessage(new AreaBlockerMessage({
                        message: this._appLocalization.get('applications.content.entryDetails.flavours.uploadFailure'),
                        buttons: [{
                            label: this._appLocalization.get('app.common.ok'),
                            action: () => {
                                this.refresh();
                                this._removeBlockerMessage()
                            }
                        }]
                    }), false);
                }
            );
    }

    private addNewFlavor(flavor: Flavor, resource: KontorolContentResource): void {
        const flavorAsset: KontorolFlavorAsset = new KontorolFlavorAsset();
        flavorAsset.flavorParamsId = flavor.paramsId;
        this._kontorolServerClient.request(new FlavorAssetAddAction({
            entryId: this.data.id,
            flavorAsset: flavorAsset
        }))
            .pipe(cancelOnDestroy(this, this.widgetReset$))
            .pipe(tag('block-shell'))
            .catch(error => {
                this._uploadManagement.cancelUploadWithError(flavor.uploadFileId, 'Cannot update flavor, cancel related file');
                return Observable.throw(error);
            })
            .subscribe(
                response => {
                    flavor.id = response.id;
                    this.updateFlavor(flavor, resource);
                },
                error => {
                    this._showBlockerMessage(new AreaBlockerMessage({
                        message: this._appLocalization.get('applications.content.entryDetails.flavours.uploadFailure'),
                        buttons: [{
                            label: this._appLocalization.get('app.common.ok'),
                            action: () => {
                                this.refresh();
                                this._removeBlockerMessage();
                            }
                        }]
                    }), false);
                }
            );
    }

    public importFlavor(flavor: Flavor, url: string): void {
        flavor.status = KontorolFlavorAssetStatus.importing.toString();
        let resource: KontorolUrlResource = new KontorolUrlResource({
            url: url
        });
        if (flavor.id.length) {
            this.updateFlavor(flavor, resource);
        } else {
            this.addNewFlavor(flavor, resource);
        }
    }

    public refresh(): void {
        super._showLoader();

        this._loadFlavorsSectionData()
            .pipe(cancelOnDestroy(this, this.widgetReset$))
            .subscribe(() => {
                    super._hideLoader();
                    const entryId = this.data ? this.data.id : null;
                    if (entryId) {
                        this._appEvents.publish(new PreviewMetadataChangedEvent(entryId));
                    }
                },
                () => {
                    super._hideLoader();

                    this._showBlockerMessage(new AreaBlockerMessage(
                        {
                            message: this._appLocalization.get('applications.content.entryDetails.errors.flavorsLoadError'),
                            buttons: [
                                {
                                    label: this._appLocalization.get('applications.content.entryDetails.errors.retry'),
                                    action: () => {
                                        this.refresh();
                                    }
                                },
                                {
                                    label: this._appLocalization.get('app.common.cancel'),
                                    action: () => {
                                        this._removeBlockerMessage();
                                    }
                                }
                            ]
                        }
                    ), false);
                });
    }

    public loadFlavorsByEntryId(entryId: string): void {
        this.currentEntryId = entryId;
        this.showFlavorActions = entryId === this.data.id;
        this.selectedFlavors = this.showFlavorActions ? this._flavors.getValue() : this._replacementData.getValue().flavors;
    }

    public cancelReplacement(): void {
        this._kontorolServerClient.request(new MediaCancelReplaceAction({ entryId: this.data.id }))
            .pipe(cancelOnDestroy(this, this.widgetReset$))
            .pipe(tag('block-shell'))
            .subscribe(
                () => {
                    this.currentEntryId = this.data.id;
                    this.refresh();
                },
                error => {
                    this._showBlockerMessage(new AreaBlockerMessage(
                        {
                            message: error.message,
                            buttons: [{
                                label: this._appLocalization.get('app.common.ok'),
                                action: () => {
                                    this._removeBlockerMessage();
                                    this.refresh();
                                }
                            }]
                        }
                    ), false);
                }
            );
    }

    public approveReplacement(): void {
        this._kontorolServerClient.request(new MediaApproveReplaceAction({ entryId: this.data.id }))
            .pipe(cancelOnDestroy(this, this.widgetReset$))
            .pipe(tag('block-shell'))
            .subscribe(
                () => {
                    this.currentEntryId = this.data.id;
                    this.refresh();
                },
                error => {
                    this._showBlockerMessage(new AreaBlockerMessage(
                        {
                            message: error.message,
                            buttons: [{
                                label: this._appLocalization.get('app.common.ok'),
                                action: () => {
                                    this._removeBlockerMessage();
                                    this.refresh();
                                }
                            }]
                        }
                    ), false);
                }
            );
    }

    ngOnDestroy() {

    }
}
