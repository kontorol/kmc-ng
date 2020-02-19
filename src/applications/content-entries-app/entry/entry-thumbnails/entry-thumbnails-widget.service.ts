import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/forkJoin';

import { ThumbAssetSetAsDefaultAction } from 'kontorol-ngx-client';
import { ThumbAssetGetByEntryIdAction } from 'kontorol-ngx-client';
import { KontorolThumbAsset } from 'kontorol-ngx-client';
import { DistributionProfileListAction } from 'kontorol-ngx-client';
import { KontorolDistributionProfileListResponse } from 'kontorol-ngx-client';
import { KontorolDistributionProfile } from 'kontorol-ngx-client';
import { KontorolThumbAssetStatus } from 'kontorol-ngx-client';
import { KontorolDistributionThumbDimensions } from 'kontorol-ngx-client';
import { ThumbAssetDeleteAction } from 'kontorol-ngx-client';
import { ThumbAssetAddFromImageAction } from 'kontorol-ngx-client';
import { AppAuthentication, BrowserService } from 'app-shared/kmc-shell';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { AreaBlockerMessage } from '@kontorol-ng/kontorol-ui';
import { KontorolClient } from 'kontorol-ngx-client';
import { PreviewMetadataChangedEvent } from '../../preview-metadata-changed-event';
import { AppEventsService } from 'app-shared/kmc-shared';
import { EntryWidget } from '../entry-widget';
import { KontorolThumbParams } from 'kontorol-ngx-client';
import { ThumbAssetGenerateAction } from 'kontorol-ngx-client';
import { KontorolEntryStatus } from 'kontorol-ngx-client';
import { KontorolMediaType } from 'kontorol-ngx-client';
import { globalConfig } from 'config/global';
import { serverConfig, getKontorolServerUri } from 'config/server';
import { KMCPermissions, KMCPermissionsService } from 'app-shared/kmc-shared/kmc-permissions';
import { ContentEntryViewSections } from 'app-shared/kmc-shared/kmc-views/details-views/content-entry-view.service';
import {KontorolLogger} from '@kontorol-ng/kontorol-logger';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';

export interface ThumbnailRow {
  id: string;
  width: number;
  height: number;
  size: number;
  distributors: string;
  isDefault: boolean;
  url: string;
  status: KontorolThumbAssetStatus;
  uploadStatus: boolean;
  fileExt: string;
  tags: string;
}

@Injectable()
export class EntryThumbnailsWidget extends EntryWidget {
    public allowGrabFromVideo = false;
    private _thumbnails = new BehaviorSubject<{ items: ThumbnailRow[] }>(
        {items: []}
    );

    public _thumbnails$ = this._thumbnails.asObservable();
    private _distributionProfiles: KontorolDistributionProfile[]; // used to save the response profiles array as it is loaded only once

    constructor(private _kontorolServerClient: KontorolClient, private _appAuthentication: AppAuthentication,
                private _permissionsService: KMCPermissionsService,
                private _appLocalization: AppLocalization, private _appEvents: AppEventsService, private _browserService: BrowserService,
                logger: KontorolLogger) {
        super(ContentEntryViewSections.Thumbnails, logger);
    }

    /**
     * Do some cleanups if needed once the section is removed
     */
    protected onReset() {
        this.allowGrabFromVideo = false;
    }

    protected onActivate(firstTimeActivating: boolean) {

        super._showLoader();

        this._thumbnails.next({items: []});

        const getThumbnails$ = this._kontorolServerClient.request(new ThumbAssetGetByEntryIdAction(
            {
                entryId: this.data.id
            }));

        const canLoadProfiles = this._permissionsService.hasPermission(KMCPermissions.CONTENTDISTRIBUTION_PLUGIN_PERMISSION);
        const getProfiles$ = canLoadProfiles
            ? this._kontorolServerClient.request(new DistributionProfileListAction({}))
            : Observable.of({});

        return Observable.forkJoin(getThumbnails$, getProfiles$)
            .pipe(cancelOnDestroy(this, this.widgetReset$))

            .catch((error, caught) => {
                super._hideLoader();
                super._showActivationError();
                this._thumbnails.next({items: []});
                return Observable.throw(error);
            })
            .map(responses => {
                const thumbnails = responses[0] || [];
                this._distributionProfiles = (responses[1] as KontorolDistributionProfileListResponse).objects || [];
                this.buildThumbnailsData(thumbnails);
                this.allowGrabFromVideo = (this.data.status
                    && [KontorolEntryStatus.ready.toString(), KontorolEntryStatus.moderate.toString()].indexOf(this.data.status.toString()) !== -1
                    && this.data.mediaType === KontorolMediaType.video);
                super._hideLoader();

                return {failed: false};
            });

    }


    private buildThumbnailsData(thumbnails: KontorolThumbAsset[]): void {
        let thumbs: ThumbnailRow[] = [];
        // create a ThumbnailRow data for each of the loaded thumbnails
        thumbnails.forEach((thumbnail: KontorolThumbAsset) => {
            if (thumbnail.status.toString() === KontorolThumbAssetStatus.ready.toString()) {
                let thumb: ThumbnailRow = {
                    id: thumbnail.id,
                    status: thumbnail.status,
                    width: thumbnail.width,
                    height: thumbnail.height,
                    size: thumbnail.size,
                    tags: thumbnail.tags,
                    isDefault: false,
                    distributors: "",
                    url: "",
                    uploadStatus: false,
                    fileExt: thumbnail.fileExt
                };
                thumb.isDefault = thumbnail.tags.indexOf("default_thumb") > -1;
                thumb.url = getKontorolServerUri(`/api_v3/index.php/service/thumbasset/action/serve/ks/${this._appAuthentication.appUser.ks}/thumbAssetId/${thumb.id}`);
                thumbs.push(thumb);
            }
        });
        // create an empty ThumbnailRow data for each missing thumbnail dimension specified in any response profile
        this._distributionProfiles.forEach((profile: KontorolDistributionProfile) => {
            const requiredThumbDimensions: KontorolDistributionThumbDimensions[] = profile.requiredThumbDimensions;
            requiredThumbDimensions.forEach((dimensions: KontorolDistributionThumbDimensions) => {
                const requiredWidth = dimensions.width;
                const requiredHeight = dimensions.height;
                let foundCorrespondingThumbnail = false;
                thumbs.forEach((thumbnail: ThumbnailRow) => {
                    // found thumbnail with the required dimensions - add the distrubution name to the thumbnail distributors
                    if (thumbnail.width === requiredWidth && thumbnail.height === requiredHeight) {
                        foundCorrespondingThumbnail = true;
                        thumbnail.distributors = thumbnail.distributors.length > 0 ? thumbnail.distributors + ", " + profile.name : profile.name;
                    }
                });
                if (!foundCorrespondingThumbnail) {
                    // create a new missing thumb placeholder and append it to the thumbnails array
                    let missingThumb: ThumbnailRow = {
                        id: "",
                        status: KontorolThumbAssetStatus.error,
                        width: requiredWidth,
                        height: requiredHeight,
                        size: NaN,
                        isDefault: false,
                        distributors: profile.name,
                        url: '',
                        uploadStatus: false,
                        fileExt: '',
                        tags: ''
                    };
                    thumbs.push(missingThumb);
                }
            });
        });
        this._thumbnails.next({items: thumbs});
    }

    private reloadThumbnails() {
        super._showLoader();
        const thumbs = Array.from(this._thumbnails.getValue().items);
        this._kontorolServerClient.request(new ThumbAssetGetByEntryIdAction(
            {
                entryId: this.data.id
            }))
            .pipe(cancelOnDestroy(this, this.widgetReset$))
            .subscribe(
                (responses) => {
                    const thumbnails = responses || [];
                    this.buildThumbnailsData(thumbnails);
                    super._hideLoader();
                },
                (error) => {
                    super._hideLoader();
                    this._showBlockerMessage(new AreaBlockerMessage(
                        {
                            message: this._appLocalization.get('applications.content.entryDetails.errors.thumbnailsError'),
                            buttons: [
                                {
                                    label: this._appLocalization.get('applications.content.entryDetails.errors.reload'),
                                    action: () => {
                                        this.reloadThumbnails();
                                    }
                                }
                            ]
                        }
                    ), true);
                }
            );
    }

    // animate uploading thumbnail row
    public getRowStyle(rowData): string {
        return rowData.uploadStatus ? 'uploading' : '';
    }

    public _setAsDefault(thumb: ThumbnailRow): void {
        const thumbs = Array.from(this._thumbnails.getValue().items);

        const entryId = this.data ? this.data.id : null;

        this._kontorolServerClient.request(new ThumbAssetSetAsDefaultAction({thumbAssetId: thumb.id}))
            .pipe(cancelOnDestroy(this, this.widgetReset$))
            .pipe(tag('block-shell'))
            .subscribe(
                () => {
                    if (entryId) {
                        this._appEvents.publish(new PreviewMetadataChangedEvent(entryId));
                    }
                    this._browserService.scrollToTop();
                    this.reloadThumbnails();
                },
                error => {
                    this._showBlockerMessage(new AreaBlockerMessage(
                        {
                            message: 'Error setting default thumb',
                            buttons: [
                                {
                                    label: 'Retry',
                                    action: () => {
                                        this._setAsDefault(thumb);
                                    }
                                }
                            ]
                        }
                    ), true);
                }
            );
    }

    public deleteThumbnail(id: string): void {
        const thumbs = Array.from(this._thumbnails.getValue().items);

        this._kontorolServerClient.request(new ThumbAssetDeleteAction({thumbAssetId: id}))
            .pipe(cancelOnDestroy(this, this.widgetReset$))
            .pipe(tag('block-shell'))
            .subscribe(
                () => {
                    this._browserService.scrollToTop();
                    this.reloadThumbnails();
                },
                error => {
                    this._showBlockerMessage(new AreaBlockerMessage(
                        {
                            message: 'Error deleting thumbnail',
                            buttons: [
                                {
                                    label: 'Retry',
                                    action: () => {
                                        this.deleteThumbnail(id);
                                    }
                                }
                            ]
                        }
                    ), true);
                }
            );
    }

    public _onFileSelected(selectedFiles: FileList) {
        if (selectedFiles && selectedFiles.length) {
            const fileData: File = selectedFiles[0];
            const maxFileSize = globalConfig.kontorolServer.maxUploadFileSize;
            const fileSize = fileData.size / 1024 / 1024; // convert to Mb
            if (fileSize > maxFileSize) {
                this._browserService.alert({
                    header: this._appLocalization.get('app.common.attention'),
                    message: this._appLocalization.get('applications.upload.validation.fileSizeExceeded')
                });
            } else {
                this._kontorolServerClient.request(new ThumbAssetAddFromImageAction({
                    entryId: this.data.id,
                    fileData: fileData
                }))
                    .pipe(tag('block-shell'))
                    .pipe(cancelOnDestroy(this, this.widgetReset$))
                    .subscribe(
                        () => this.reloadThumbnails(),
                        () => {
                            this._showBlockerMessage(new AreaBlockerMessage({
                                message: this._appLocalization.get('applications.content.entryDetails.errors.thumbnailsUploadError'),
                                buttons: [{
                                    label: this._appLocalization.get('applications.content.entryDetails.errors.dismiss'),
                                    action: () => super._removeBlockerMessage()
                                }]
                            }), true);
                        }
                    );
            }
        }
    }


    public captureThumbnail(position: number): void {
        super._showLoader();
        let params: KontorolThumbParams = new KontorolThumbParams();
        params.videoOffset = position;
        params.quality = 75;
        params.stripProfiles = false;

        this._kontorolServerClient.request(new ThumbAssetGenerateAction({entryId: this.data.id, thumbParams: params}))
            .pipe(cancelOnDestroy(this, this.widgetReset$))
            .subscribe(
                () => {
                    super._hideLoader();
                    this.reloadThumbnails();
                },
                error => {
                    super._hideLoader();
                    this._showBlockerMessage(new AreaBlockerMessage(
                        {
                            message: 'Error capturing thumb',
                            buttons: [
                                {
                                    label: 'Dismiss',
                                    action: () => {
                                        this._removeBlockerMessage();
                                    }
                                },
                                {
                                    label: 'Retry',
                                    action: () => {
                                        this._removeBlockerMessage();
                                        this.captureThumbnail(position);
                                    }
                                }
                            ]
                        }
                    ), false);
                }
            );
    }


    ngOnDestroy() {
    }
}
