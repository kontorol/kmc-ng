import { Injectable, OnDestroy } from '@angular/core';
import {
    KontorolAssetParamsResourceContainer,
    KontorolAssetsParamsResourceContainers,
    KontorolClient,
    KontorolMediaEntry,
    KontorolMediaType,
    KontorolMultiRequest,
    KontorolUrlResource,
    MediaAddAction,
    MediaUpdateContentAction,
} from 'kontorol-ngx-client';
import { Observable } from 'rxjs';
import { AppLocalization } from '@kontorol-ng/mc-shared';


export interface KmcNewEntryUpload {
    fileUrl: string;
    assetParamsId?: number;
}

@Injectable()
export class NewEntryCreateFromUrlService implements OnDestroy {
    constructor(private _kontorolServerClient: KontorolClient,
                private _appLocalization: AppLocalization) {
    }

    ngOnDestroy() {

    }

    private _getMediaTypeFromExtension(extension: string): KontorolMediaType {

         const imageFiles = ['jpg', 'jpeg', 'gif', 'png'];
         const audioFiles = [
         'flv', 'asf', 'qt', 'mov', 'mpg',
         'avi', 'wmv', 'mp3', 'wav', 'ra',
         'rm', 'wma', 'aif', 'm4a'
         ];
         const videoFiles = [
         'flv', 'asf', 'qt', 'mov', 'mpg',
         'avi', 'wmv', 'mp4', '3gp', 'f4v',
         'm4v', 'mpeg', 'mxf', 'rm', 'rv',
         'rmvb', 'ts', 'ogg', 'ogv', 'vob',
         'webm', 'mts', 'arf', 'mkv'
         ];

        switch (true) {
            case videoFiles.indexOf(extension) !== -1:
                return KontorolMediaType.video;
            case audioFiles.indexOf(extension) !== -1:
                return KontorolMediaType.audio;
            case imageFiles.indexOf(extension) !== -1:
                return KontorolMediaType.image;
            default:
                return KontorolMediaType.video;
        }

    }

    private _getUpdateMediaContentAction(file: KmcNewEntryUpload): MediaUpdateContentAction {
        const resource = new KontorolUrlResource({ url: file.fileUrl });
        return new MediaUpdateContentAction({ entryId: '0', resource });
    }

    private _getMediaEntryAction(conversionProfileId: number, file: KmcNewEntryUpload): MediaAddAction {
        const url = file.fileUrl;
        const extension = url.substr(url.lastIndexOf(".")+1).toLowerCase();
        let name = url.substr(url.lastIndexOf("/")+1);
        name = name.lastIndexOf(".") !== -1 ? name.substr(0, name.lastIndexOf(".")) : name;
        return new MediaAddAction({
            entry: new KontorolMediaEntry({ conversionProfileId, name, mediaType: this._getMediaTypeFromExtension(extension) })
        });
    }

    public import(files: KmcNewEntryUpload[], transcodingProfileId: number): Observable<void> {
        const createMediaEntryActions = files.map((file) => this._getMediaEntryAction(transcodingProfileId, file));
        const updateMediaContentActions = files.map((file, index) =>
            this._getUpdateMediaContentAction(file).setDependency(['entryId', index, 'id'])
        );
        return this._kontorolServerClient.multiRequest(new KontorolMultiRequest(
            ...createMediaEntryActions,
            ...updateMediaContentActions
        )).map(responses => {
            if (responses.hasErrors()) {
                const message = responses.every(response => !!response.error)
                    ? this._appLocalization.get('applications.upload.uploadSettings.createFromUrlError.all')
                    : this._appLocalization.get('applications.upload.uploadSettings.createFromUrlError.some');
                throw Error(message);
            }
        });
    }
}
