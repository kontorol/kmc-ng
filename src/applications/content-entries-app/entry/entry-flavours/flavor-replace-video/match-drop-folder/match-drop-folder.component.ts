import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PopupWidgetComponent } from '@kontorol-ng/kontorol-ui';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';
import { AreaBlockerMessage } from '@kontorol-ng/kontorol-ui';
import { KontorolMediaEntry } from 'kontorol-ngx-client';
import { KontorolClient, KontorolRequestOptions } from 'kontorol-ngx-client';
import { TranscodingProfileManagement } from 'app-shared/kmc-shared/transcoding-profile-management';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { DropFolderListAction } from 'kontorol-ngx-client';
import { KontorolDropFolderFilter } from 'kontorol-ngx-client';
import { KontorolDropFolderOrderBy } from 'kontorol-ngx-client';
import { KontorolDropFolderStatus } from 'kontorol-ngx-client';
import { KontorolDropFolderContentFileHandlerConfig } from 'kontorol-ngx-client';
import { KontorolDropFolder } from 'kontorol-ngx-client';
import { KontorolDropFolderContentFileHandlerMatchPolicy } from 'kontorol-ngx-client';
import { KontorolDropFolderFileHandlerType } from 'kontorol-ngx-client';
import { Observable } from 'rxjs';
import { SelectItem } from 'primeng/api';
import { DropFolderFileListAction } from 'kontorol-ngx-client';
import { KontorolDropFolderFileFilter } from 'kontorol-ngx-client';
import { KontorolDropFolderFileOrderBy } from 'kontorol-ngx-client';
import { KontorolDropFolderFileStatus } from 'kontorol-ngx-client';
import { KontorolDropFolderFile } from 'kontorol-ngx-client';
import { KMCPermissions, KMCPermissionsService } from 'app-shared/kmc-shared/kmc-permissions';
import { BaseEntryUpdateAction } from 'kontorol-ngx-client';
import { KontorolBaseEntry } from 'kontorol-ngx-client';
import { KontorolAssetsParamsResourceContainers } from 'kontorol-ngx-client';
import { KontorolDropFolderFileResource } from 'kontorol-ngx-client';
import { KontorolAssetParamsResourceContainer } from 'kontorol-ngx-client';
import { KontorolConversionProfileAssetParamsFilter } from 'kontorol-ngx-client';
import { ConversionProfileAssetParamsListAction } from 'kontorol-ngx-client';
import { KontorolConversionProfileFilter } from 'kontorol-ngx-client';
import { KontorolFilterPager } from 'kontorol-ngx-client';
import { KontorolConversionProfileAssetParams } from 'kontorol-ngx-client';
import { KontorolConversionProfileType } from 'kontorol-ngx-client';
import { KontorolConversionProfileOrderBy } from 'kontorol-ngx-client';
import { KontorolDetachedResponseProfile } from 'kontorol-ngx-client';
import { KontorolResponseProfileType } from 'kontorol-ngx-client';
import { MediaUpdateContentAction } from 'kontorol-ngx-client';
import { EntryFlavoursWidget } from '../../entry-flavours-widget.service';
import { KontorolDropFolderFileListResponse } from 'kontorol-ngx-client';
import { Flavor } from '../../flavor';
import { FlavorAssetSetContentAction } from 'kontorol-ngx-client';
import { FlavorAssetAddAction } from 'kontorol-ngx-client';
import { KontorolFlavorAsset } from 'kontorol-ngx-client';
import { map, switchMap } from 'rxjs/operators';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';
import { of as ObservableOf} from 'rxjs';


export interface ConversionProfileWithAssets {
    id: number;
    assets: KontorolConversionProfileAssetParams[];
}

export interface KontorolDropFolderFileGroup extends KontorolDropFolderFile {
    files?: KontorolDropFolderFile[];
    name?: string;
    displayName?: string;
    error?: boolean;
}

@Component({
    selector: 'kReplaceMatchDropFolder',
    templateUrl: './match-drop-folder.component.html',
    styleUrls: ['./match-drop-folder.component.scss'],
    providers: [KontorolLogger.createLogger('MatchDropFolderComponent')]
})
export class MatchDropFolderComponent implements OnInit, OnDestroy {
    @Input() parentPopupWidget: PopupWidgetComponent;
    @Input() entry: KontorolMediaEntry;
    @Input() flavor: Flavor;

    private _dropFoldersList: KontorolDropFolder[] = [];
    private _conversionProfilesList: { id: number, assets: KontorolConversionProfileAssetParams[] }[] = [];

    public _isLoading = false;
    public _blockerMessage: AreaBlockerMessage;
    public _dropFoldersListOptions: SelectItem[] = [];
    public _selectedDropFolder: number = null;
    public _dropFolderFiles: KontorolDropFolderFileGroup[] = [];
    public _selectedFile: KontorolDropFolderFileGroup;

    public get _setReferenceIdEnabled(): boolean {
        return this._selectedFile
            && this._selectedFile.status !== KontorolDropFolderFileStatus.waiting
            && this._permissionsService.hasPermission(KMCPermissions.CONTENT_INGEST_REFERENCE_MODIFY)
            && !!this._dropFoldersListOptions.length;
    }

    public get _addFilesEnabled(): boolean {
        return this._selectedFile
            && this._selectedFile.status !== KontorolDropFolderFileStatus.waiting
            && !!this._dropFoldersListOptions.length;
    }

    public get _addFilesBtnLabel(): string {
        return this.flavor
            ? this._appLocalization.get('applications.content.entryDetails.flavours.replaceVideo.addFileBtn')
            : this._appLocalization.get('applications.content.entryDetails.flavours.replaceVideo.addFilesBtn');
    }

    constructor(private _kontorolClient: KontorolClient,
                private _transcodingProfileManagement: TranscodingProfileManagement,
                private _logger: KontorolLogger,
                private _permissionsService: KMCPermissionsService,
                private _widgetService: EntryFlavoursWidget,
                private _appLocalization: AppLocalization) {

    }

    ngOnInit() {
        this._prepare();
    }

    ngOnDestroy() {

    }

    private _getDisplayName(file: KontorolDropFolderFileGroup): string {
        let displayName: string;
        if (file.files) {
            displayName = `${file.parsedSlug} (${file.files.length}`;
            if (file.status === KontorolDropFolderFileStatus.waiting) {
                displayName += `, ${this._appLocalization.get('applications.content.entryDetails.flavours.replaceVideo.waiting')}`;
            }
            displayName += ')';
        } else if (file.name) {
            displayName = file.name;
        } else {
            displayName = file.fileName;
        }

        return displayName;
    }

    private _mapDropFolderFilesForFlavor(response: KontorolDropFolderFileListResponse): KontorolDropFolderFileGroup[] {
        const result = []; // results array
        const waiting = []; // waiting array

        response.objects.forEach(file => {
            if (file instanceof KontorolDropFolderFile) {
                (<KontorolDropFolderFileGroup>file).displayName = file.parsedSlug;
                (<KontorolDropFolderFileGroup>file).error = file.status === KontorolDropFolderFileStatus.errorHandling;
                // for files in status waiting, we only want files with a matching slug
                // selectedEntry is the currently selected entry
                if (file.status === KontorolDropFolderFileStatus.waiting) {
                    if (file.parsedSlug === this.entry.referenceId) {
                        waiting.push(file);
                    }
                } else {
                    result.push(file);
                }
            }
        });

        return [...waiting, ...result];
    }

    private _mapDropFolderFiles(response: KontorolDropFolderFileListResponse): KontorolDropFolderFileGroup[] {
        const result = []; // results array
        const dict = {}; // slugs dictionary
        let group: KontorolDropFolderFile; // dffs group (by slug)
        const parseFailedStr = this._appLocalization.get('applications.content.entryDetails.flavours.replaceVideo.error');

        response.objects.forEach(file => {
            if (file instanceof KontorolDropFolderFile) {
                // for files in status waiting, we only want files with a matching slug
                if (file.status === KontorolDropFolderFileStatus.waiting && file.parsedSlug !== this.entry.referenceId) {
                    return;
                }

                // group all files where status == ERROR_HANDLING under same group
                if (file.status === KontorolDropFolderFileStatus.errorHandling) {
                    file.parsedSlug = parseFailedStr;
                }

                // get relevant group
                if (!dict[file.parsedSlug]) {
                    // create group
                    group = new KontorolDropFolderFile();
                    group.parsedSlug = file.parsedSlug;
                    (<any>group).createdAt = file.createdAt;
                    (<KontorolDropFolderFileGroup>group).files = [];
                    dict[group.parsedSlug] = group;
                } else {
                    group = dict[file.parsedSlug];
                    // update date if needed
                    if (group.createdAt > file.createdAt) {
                        (<any>group).createdAt = file.createdAt;
                    }
                }

                // add dff to files list
                (<KontorolDropFolderFileGroup>group).files.push(file);

                // if any file in the group is in waiting status, set the group to waiting:
                if (file.status === KontorolDropFolderFileStatus.waiting) {
                    (<any>group).status = KontorolDropFolderFileStatus.waiting;
                }
            }
        });

        let wait: KontorolDropFolderFile;
        for (const slug in dict) {
            if (dict.hasOwnProperty(slug) && slug !== parseFailedStr) {
                if (dict[slug].status === KontorolDropFolderFileStatus.waiting) {
                    // we assume there's only one...
                    wait = dict[slug];
                } else {
                    (<KontorolDropFolderFileGroup>dict[slug]).displayName = this._getDisplayName(dict[slug]);
                    result.push(dict[slug]);
                }
            }
        }
        // put the matched waiting file first
        if (wait) {
            result.unshift(wait);
        }

        // put the parseFailed last
        if (dict[parseFailedStr]) {
            (<KontorolDropFolderFileGroup>dict[parseFailedStr]).displayName = this._getDisplayName(dict[parseFailedStr]);
            (<KontorolDropFolderFileGroup>dict[parseFailedStr]).error = true;
            result.push(dict[parseFailedStr]);
        }

        return result;
    }

    private _loadDropFolder(searchTerm: string = null): Observable<KontorolDropFolderFileGroup[]> {
        const filter = new KontorolDropFolderFileFilter({
            orderBy: KontorolDropFolderFileOrderBy.createdAtDesc,
            dropFolderIdEqual: this._selectedDropFolder,
            statusIn: [
                KontorolDropFolderFileStatus.noMatch,
                KontorolDropFolderFileStatus.waiting,
                KontorolDropFolderFileStatus.errorHandling,
            ].join(',')
        });

        if (typeof searchTerm === 'string' && searchTerm.trim()) {
            filter.parsedSlugLike = searchTerm.trim();
        }

        const dropFolderFilesListAction = new DropFolderFileListAction({ filter });
        return this._kontorolClient
            .request(dropFolderFilesListAction)
            .map(response =>
                this.flavor ? this._mapDropFolderFilesForFlavor(response) : this._mapDropFolderFiles(response)
            );
    }

    private _loadDropFoldersList(): Observable<KontorolDropFolderFileGroup[]> {
        const dropFoldersListAction = new DropFolderListAction({
            filter: new KontorolDropFolderFilter({
                orderBy: KontorolDropFolderOrderBy.nameDesc,
                statusEqual: KontorolDropFolderStatus.enabled
            })
        });

        return this._kontorolClient.request(dropFoldersListAction)
            .pipe(cancelOnDestroy(this))
            .map(response => {
                if (response.objects.length) {
                    const dropFoldersList = [];
                    response.objects.forEach(dropFolder => {
                        if (dropFolder instanceof KontorolDropFolder) {
                            if (dropFolder.fileHandlerType === KontorolDropFolderFileHandlerType.content) {
                                const cfg: KontorolDropFolderContentFileHandlerConfig = dropFolder.fileHandlerConfig as KontorolDropFolderContentFileHandlerConfig;
                                if (cfg.contentMatchPolicy === KontorolDropFolderContentFileHandlerMatchPolicy.addAsNew) {
                                    dropFoldersList.push(dropFolder);
                                } else if (cfg.contentMatchPolicy === KontorolDropFolderContentFileHandlerMatchPolicy.matchExistingOrKeepInFolder) {
                                    dropFoldersList.push(dropFolder);
                                } else if (cfg.contentMatchPolicy === KontorolDropFolderContentFileHandlerMatchPolicy.matchExistingOrAddAsNew) {
                                    dropFoldersList.push(dropFolder);
                                }
                            }
                        } else {
                            throw new Error(`invalid type provided, expected KontorolDropFolder, got ${typeof dropFolder}`);
                        }
                    });

                    return dropFoldersList;
                } else {
                    return [];
                }
            })
            .do(dropFoldersList => {
                this._dropFoldersList = dropFoldersList;
                this._dropFoldersListOptions = dropFoldersList.map(folder => ({ label: folder.name, value: folder.id }));
                this._selectedDropFolder = dropFoldersList.length ? dropFoldersList[0].id : null;
            })
            .switchMap(() => {
                if (this._selectedDropFolder === null) {
                    return Observable.of([]);
                }

                return this._loadDropFolder();
            });
    }

    private _loadConversionProfiles(): Observable<KontorolConversionProfileAssetParams[]> {
        const filter = new KontorolConversionProfileFilter({
            orderBy: KontorolConversionProfileOrderBy.createdAtDesc,
            typeEqual: KontorolConversionProfileType.media
        });
        const conversionProfileAssetParamsListAction = new ConversionProfileAssetParamsListAction({
            filter: new KontorolConversionProfileAssetParamsFilter({ conversionProfileIdFilter: filter }),
            pager: new KontorolFilterPager({ pageSize: 1000 })
        }).setRequestOptions(
            new KontorolRequestOptions({
                responseProfile: new KontorolDetachedResponseProfile({
                    type: KontorolResponseProfileType.includeFields,
                    fields: 'conversionProfileId,systemName,assetParamsId'
                })
            })
        );

        return this._kontorolClient
            .request(conversionProfileAssetParamsListAction)
            .map(res => res.objects);
    }

    private _loadConversionProfilesWithAssets(): Observable<ConversionProfileWithAssets[]> {
        return this._transcodingProfileManagement.get()
            .pipe(switchMap(transcodingProfiles => {
                return this._loadConversionProfiles().pipe(
                    map((assets) => {
                        return transcodingProfiles.map(profile => {
                            return {
                                id: profile.id,
                                assets: assets.filter(item => item.conversionProfileId === profile.id)
                            };
                        });
                    })
                );
            }));
    }

    private _getAssetParamsId(conversionProfileId: number, flavorName: string): number {
        const relevantProfile = this._conversionProfilesList.find(({ id }) => id === conversionProfileId);
        if (relevantProfile) {
            const relevantAssetParam = relevantProfile.assets.find(({ systemName }) => systemName === flavorName);
            if (relevantAssetParam) {
                return relevantAssetParam.assetParamsId;
            }
        }
        return -1;
    }

    private _updateContent(): void {
        this._logger.info(`handle update content request`);
        const selectedFolder = this._dropFoldersList.find(({ id }) => id === this._selectedDropFolder);
        const mediaResource = new KontorolAssetsParamsResourceContainers({
            resources: this._selectedFile.files.map(file => {
                return new KontorolAssetParamsResourceContainer({
                    resource: new KontorolDropFolderFileResource({ dropFolderFileId: file.id }),
                    assetParamsId: this._getAssetParamsId(selectedFolder.conversionProfileId, file.parsedFlavor)
                });
            })
        });

        this._kontorolClient
            .request(new MediaUpdateContentAction({
                entryId: this.entry.id,
                resource: mediaResource,
                conversionProfileId: selectedFolder.conversionProfileId
            }))
            .pipe(cancelOnDestroy(this))
            .pipe(tag('block-shell'))
            .subscribe(
                () => {
                    this._logger.info(`handle successful update content request, close popup`);
                    this.parentPopupWidget.close();
                    this._widgetService.refresh();
                },
                error => {
                    this._logger.warn(`handle failed update content request, show alert`, { errorMessage: error.message });
                    this._blockerMessage = new AreaBlockerMessage({
                        title: this._appLocalization.get('app.common.error'),
                        message: error.message,
                        buttons: [{
                            label: this._appLocalization.get('app.common.ok'),
                            action: () => {
                                this._logger.info(`user dismissed alert`);
                                this._blockerMessage = null;
                                this.parentPopupWidget.close();
                            }
                        }]
                    });
                });
    }

    private _prepare(): void {
        this._logger.info(`handle prepare action, load dropfolders list and conversion profiles with assets request`);
        this._isLoading = true;
        this._loadDropFoldersList()
            .pipe(switchMap(dropFolderFiles => {
                let result: Observable<ConversionProfileWithAssets[]> = null;
                if (dropFolderFiles.length) {
                    result = this._loadConversionProfilesWithAssets();
                } else {
                    result = ObservableOf([]);
                }

                return result.pipe(
                    map((conversionProfilesWithAsset) => ({ dropFolderFiles, conversionProfilesWithAsset })
                ));
            }))
            .subscribe(
                ({ dropFolderFiles, conversionProfilesWithAsset }) => {
                    this._logger.info(`handle successful data loading`);
                    this._isLoading = false;
                    this._dropFolderFiles = dropFolderFiles;
                    this._conversionProfilesList = conversionProfilesWithAsset;

                    if (!this._dropFoldersList.length) {
                        this._blockerMessage = new AreaBlockerMessage({
                            title: this._appLocalization.get('app.common.attention'),
                            message: this._appLocalization.get('applications.content.entryDetails.flavours.replaceVideo.noDropFoldersWarning'),
                            buttons: [{
                                label: this._appLocalization.get('app.common.ok'),
                                action: () => {
                                    this._blockerMessage = null;
                                }
                            }]
                        });
                    }
                },
                error => {
                    this._isLoading = false;
                    this._logger.warn(`handle failed data loading, show confirmation`);
                    this._blockerMessage = new AreaBlockerMessage({
                        title: this._appLocalization.get('app.common.error'),
                        message: error.message,
                        buttons: [
                            {
                                label: this._appLocalization.get('app.common.retry'),
                                action: () => {
                                    this._logger.info(`user confirmed, retry action`);
                                    this._blockerMessage = null;
                                    this._prepare();
                                }
                            },
                            {
                                label: this._appLocalization.get('app.common.ok'),
                                action: () => {
                                    this._logger.info(`user didn't confirm, abort action, close popup`);
                                    this._blockerMessage = null;
                                    this.parentPopupWidget.close();
                                }
                            }
                        ]
                    });
                });
    }

    private _updateFlavor(): void {
        this._logger.info(`handle update flavor action by user`);
        if (!this.flavor) {
            this._logger.info(`flavor was not provided, abort action`);
        }

        const contentResource = new KontorolDropFolderFileResource({ dropFolderFileId: this._selectedFile.id });
        let request$;

        if (this.flavor.flavorAsset && this.flavor.flavorAsset.id) {
            this._logger.info(`flavor asset exist, update flavor`);
            request$ = this._kontorolClient.request(
                new FlavorAssetSetContentAction({
                    id: this.flavor.flavorAsset.id,
                    contentResource: contentResource
                })
            );
        } else {
            this._logger.info(`flavor asset does not exist, create flavor and update content`);
            const flavorAssetAddAction = new FlavorAssetAddAction({
                entryId: this.entry.id,
                flavorAsset: new KontorolFlavorAsset({ flavorParamsId: this.flavor.flavorParams.id })
            });

            request$ = this._kontorolClient
                .request(flavorAssetAddAction)
                .pipe(switchMap(({ id }) =>
                    this._kontorolClient.request(new FlavorAssetSetContentAction({ id, contentResource })))
                );
        }

        request$
            .pipe(tag('block-shell'))
            .pipe(cancelOnDestroy(this))
            .subscribe(
                () => {
                    this._logger.info(`handle successful update flavor action, close popup`);
                    this._widgetService.refresh();
                    this.parentPopupWidget.close();
                },
                error => {
                    this._logger.warn(`handle failed update flavor action, show alert`);
                    this._blockerMessage = new AreaBlockerMessage({
                        title: this._appLocalization.get('app.common.error'),
                        message: error.message,
                        buttons: [{
                            label: this._appLocalization.get('app.common.cancel'),
                            action: () => {
                                this._logger.info(`user dismissed alert, close popup`);
                                this._blockerMessage = null;
                                this._widgetService.refresh();
                                this.parentPopupWidget.close();
                            }
                        }]
                    });
                });
    }

    public _loadFolderData(searchTerm: string = null): void {
        this._isLoading = true;
        this._loadDropFolder(searchTerm)
            .pipe(cancelOnDestroy(this))
            .subscribe(
                files => {
                    this._isLoading = false;
                    this._dropFolderFiles = files;
                    this._selectedFile = null;
                }, error => {
                    this._isLoading = false;
                    this._blockerMessage = new AreaBlockerMessage({
                        title: this._appLocalization.get('app.common.error'),
                        message: error.message,
                        buttons: [{
                            label: this._appLocalization.get('app.common.ok'),
                            action: () => {
                                this._blockerMessage = null;
                            }
                        }]
                    });
                });
    }

    public _setReferenceId(): void {
        this._logger.info(`handle set reference id action by user`, { referenceId: this._selectedFile ? this._selectedFile.parsedSlug : null });
        if (!this._selectedFile) {
            this._logger.info(`file was not selected, abort action`);
            return;
        }

        const updateEntryAction = new BaseEntryUpdateAction({
            entryId: this.entry.id,
            baseEntry: new KontorolBaseEntry({ referenceId: this._selectedFile.parsedSlug })
        });

        this._kontorolClient.request(updateEntryAction)
            .pipe(tag('block-shell'))
            .pipe(cancelOnDestroy(this))
            .subscribe(
                () => {
                    this._logger.info(`handle successful set reference id action, show alert`);
                    this._blockerMessage = new AreaBlockerMessage({
                        title: this._appLocalization.get('app.common.attention'),
                        message: this._appLocalization.get('applications.content.entryDetails.flavours.replaceVideo.setReferenceIdWarning'),
                        buttons: [{
                            label: this._appLocalization.get('app.common.ok'),
                            action: () => {
                                this._logger.info(`user dismissed alert, close popup`);
                                this._blockerMessage = null;
                                this.parentPopupWidget.close();
                            }
                        }]
                    });
                },
                error => {
                    this._logger.warn(`handle failed set reference id action, show alert`);
                    this._blockerMessage = new AreaBlockerMessage({
                        title: this._appLocalization.get('app.common.error'),
                        message: error.message,
                        buttons: [{
                            label: this._appLocalization.get('app.common.cancel'),
                            action: () => {
                                this._logger.info(`user dismissed alert, close popup`);
                                this._blockerMessage = null;
                                this.parentPopupWidget.close();
                            }
                        }]
                    });
                });
    }

    public _addFiles(): void {
        this._logger.info(`handle add file/s action by user, show confirmation`, { selectedFilesGroup: this._selectedFile ? this._selectedFile.id : null });
        if (!this._selectedFile) {
            this._logger.info(`file was not selected abort action`);
            return;
        }

        this._blockerMessage = new AreaBlockerMessage({
            title: this._appLocalization.get('app.common.attention'),
            message: this._appLocalization.get('applications.content.entryDetails.flavours.replaceVideo.addFilesWarning'),
            buttons: [
                {
                    label: this._appLocalization.get('app.common.ok'),
                    action: () => {
                        this._logger.info(`user confirmed, proceed action`);
                        this._blockerMessage = null;
                        if (this.flavor) {
                            this._updateFlavor();
                        } else {
                            this._updateContent();
                        }

                    }
                },
                {
                    label: this._appLocalization.get('app.common.cancel'),
                    action: () => {
                        this._logger.info(`user didn't confirm, abort action`);
                        this._blockerMessage = null;
                    }
                }
            ]
        });
    }

    public _searchFolder(searchTerm: string): void {
        this._logger.info(`handle search drop folder action by user`, { searchTerm });
        this._loadFolderData(searchTerm);
    }

    public _clearFolderSearch(): void {
        this._logger.info(`handle clear search drop folder action by user`);
        this._loadFolderData();
    }
}
