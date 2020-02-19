import {
  Injectable,
  IterableChangeRecord,
  IterableDiffer,
  IterableDiffers,
  KeyValueChangeRecord,
  KeyValueDiffer,
  KeyValueDiffers,
  OnDestroy
} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';
import { TrackedFileStatuses, UploadManagement } from '@kontorol-ng/kontorol-common';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { KontorolClient } from 'kontorol-ngx-client';
import { KontorolMultiRequest } from 'kontorol-ngx-client';
import { CaptionAssetListAction } from 'kontorol-ngx-client';
import { CaptionAssetDeleteAction } from 'kontorol-ngx-client';
import { CaptionAssetSetAsDefaultAction } from 'kontorol-ngx-client';
import { CaptionAssetUpdateAction } from 'kontorol-ngx-client';
import { CaptionAssetSetContentAction } from 'kontorol-ngx-client';
import { CaptionAssetAddAction } from 'kontorol-ngx-client';
import { KontorolUrlResource } from 'kontorol-ngx-client';
import { KontorolUploadedFileTokenResource } from 'kontorol-ngx-client';
import { KontorolCaptionAsset } from 'kontorol-ngx-client';
import { KontorolAssetFilter } from 'kontorol-ngx-client';
import { KontorolCaptionType } from 'kontorol-ngx-client';
import { KontorolCaptionAssetStatus } from 'kontorol-ngx-client';
import { KontorolLanguage } from 'kontorol-ngx-client';
import { KontorolMediaEntry } from 'kontorol-ngx-client';
import { CaptionAssetServeAction } from 'kontorol-ngx-client';
import { NewEntryCaptionFile } from './new-entry-caption-file';
import { EntryWidget } from '../entry-widget';
import { FriendlyHashId } from '@kontorol-ng/kontorol-common';
import { ContentEntryViewSections } from 'app-shared/kmc-shared/kmc-views/details-views/content-entry-view.service';
import {KontorolLogger} from '@kontorol-ng/kontorol-logger';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';

export interface CaptionRow {
    uploading: boolean;
    uploadFileId?: string;
    serverUploadToken?: string;
    uploadFailure?: boolean;
    progress?: string;
    uploadUrl: string;
    id: string;
    isDefault: number;
    format: KontorolCaptionType;
    language: KontorolLanguage;
    label: string;
    fileExt: string;
    status?: KontorolCaptionAssetStatus;
    displayOnPlayer?: boolean;
}

@Injectable()
export class EntryCaptionsWidget extends EntryWidget  implements OnDestroy {
    private _idGenerator = new FriendlyHashId();

    captionsListDiffer: IterableDiffer<CaptionRow>;
    captionDiffer: { [key: string]: KeyValueDiffer<string, any> } = {};

    private _captions = new BehaviorSubject<{ items: CaptionRow[] }>(
        {items: []}
    );

    public _captions$ = this._captions.asObservable();
    public currentCaption: CaptionRow;

    private _entryId: string = '';

    constructor(private _objectDiffers: KeyValueDiffers, private _listDiffers: IterableDiffers,
                private _kontorolServerClient: KontorolClient, private _appLocalization: AppLocalization, private _uploadManagement: UploadManagement,
                logger: KontorolLogger) {
        super(ContentEntryViewSections.Captions, logger);
    }

  private _syncBusyState(): void {
    // find intersection of tracked files and captions to avoid checking serverUploadToken on already uploaded assets
    const relevantFiles = this._captions.getValue().items
      .filter(({ uploadFileId }) => !!this._uploadManagement.getTrackedFile(uploadFileId));
    const isBusy = relevantFiles.some(file => !file.serverUploadToken);
    this.updateState({ isBusy });
  }

  private _trackUploadFiles(): void {
    this._uploadManagement.onTrackedFileChanged$
      .pipe(cancelOnDestroy(this))
      .map(uploadedFile => {
        let relevantCaption = null;
        if (uploadedFile.data instanceof NewEntryCaptionFile) {
          const captions = this._captions.getValue().items;
          relevantCaption = captions ? captions.find(captionFile => captionFile.uploadFileId === uploadedFile.id) : null;
        }
        return { relevantCaption, uploadedFile };
      })
      .filter(({ relevantCaption }) => !!relevantCaption)
      .subscribe(
        ({ relevantCaption, uploadedFile }) => {
          switch (uploadedFile.status) {
            case TrackedFileStatuses.prepared:
              relevantCaption.uploading = true;
              relevantCaption.serverUploadToken = (<NewEntryCaptionFile>uploadedFile.data).serverUploadToken;
              this._syncBusyState();
              break;
            case TrackedFileStatuses.uploadCompleted:
              relevantCaption.uploading = false;
              relevantCaption.uploadFailure = false;
              if (relevantCaption.partnerId) { // indicator that entry was saved
                relevantCaption.status = KontorolCaptionAssetStatus.ready;
              }
              break;
            case TrackedFileStatuses.failure:
              relevantCaption.uploading = false;
              relevantCaption.uploadFailure = true;
              this._syncBusyState();
              break;
            case TrackedFileStatuses.uploading:
              const progress = Number((uploadedFile.progress * 100).toFixed(0));
              relevantCaption.progress = progress > 100 ? 100 : progress;
              relevantCaption.uploading = true;
              relevantCaption.uploadFailure = false;
              break;
            default:
              break;
          }
        });
  }


    /**
     * Do some cleanups if needed once the section is removed
     */
    protected onReset() {
        this.captionsListDiffer = null;
        this.captionDiffer = {};
        this._entryId = '';
        this._captions.next({items: []});
    }

  protected onActivate(firstTimeActivating: boolean) {
    this._entryId = this.data.id;
    super._showLoader();
    if (firstTimeActivating) {
      this._trackUploadFiles();
    }
    this._captions.next({ items: [] });

    return this._kontorolServerClient.request(new CaptionAssetListAction({
      filter: new KontorolAssetFilter({ entryIdEqual: this._entryId })
    }))
      .pipe(cancelOnDestroy(this, this.widgetReset$))
      .map(response => {
        // Restore previous upload state
        this._updateCaptionsResponse(response);

        this._captions.next({ items: response.objects as any[] });
        this.captionsListDiffer = this._listDiffers.find([]).create();
        this.captionsListDiffer.diff(this._captions.getValue().items);

        this.captionDiffer = {};
        this._captions.getValue().items.forEach((caption) => {
          this.captionDiffer[caption.id] = this._objectDiffers.find([]).create();
          this.captionDiffer[caption.id].diff(caption);
        });
        super._hideLoader();

          return {failed: false};
      })
      .catch(error => {
          super._hideLoader();
          super._showActivationError();
          this._captions.next({ items: [] });
          return Observable.throw(error);
        }
      );
  }

  private _updateCaptionsResponse(response): void {
    response.objects.forEach((caption: CaptionRow) => {
      const relevantFile = this._uploadManagement.getTrackedFiles().find(file =>
        file.data instanceof NewEntryCaptionFile && file.data.captionId === caption.id
      );

      if (relevantFile) {
          caption.uploadFileId = relevantFile.id;
          caption.progress = (relevantFile.progress * 100).toFixed(0);
          caption.uploading = relevantFile.progress < 1;
          caption.uploadFailure = !!relevantFile.failureReason;
          caption.serverUploadToken = (<NewEntryCaptionFile>relevantFile.data).serverUploadToken;
        }

      // update missing labels created in legacy system
      if (typeof caption.label === "undefined") {
          caption.label = "";
      }
      // update missing isDefault created in legacy system
      if (typeof caption.isDefault === "undefined") {
          caption.isDefault = 0; // set as not default
      }
    });
  }

    public _setAsDefault(caption: KontorolCaptionAsset): void {
        const captionId = caption.id;
        let captions = Array.from(this._captions.getValue().items); // create a copy of the captions array withour a reference to the original array
        captions.forEach((caption) => {
            caption.isDefault = caption.id === captionId ? 1 : 0;
        });
        this._captions.next({items: captions});
        this.setDirty();
    }

    public _getCaptionType(captionFormat: KontorolCaptionType): string {
        let type = this._appLocalization.get('app.common.n_a');
        switch (captionFormat.toString()) {
            case KontorolCaptionType.srt.toString():
                type = "SRT";
                break;
            case KontorolCaptionType.dfxp.toString():
                type = "DFXP";
                break;
            case KontorolCaptionType.webvtt.toString():
                type = "WEBVTT";
                break;
            case KontorolCaptionType.scc.toString():
                type = "SCC";
                break;
        }
        return type;
    }

    public _getCaptionStatus(caption: CaptionRow): string {
      let status = '';
      if (caption.status !== null) {
        switch (caption.status) {
          case KontorolCaptionAssetStatus.error:
            status = this._appLocalization.get('applications.content.entryDetails.captions.error');
            break;
          case KontorolCaptionAssetStatus.ready:
            status = this._appLocalization.get('applications.content.entryDetails.captions.saved');
            break;
          default:
            status = this._appLocalization.get('applications.content.entryDetails.captions.processing');
            break;
        }
      } else {
        if (caption.uploading) {
          status = this._appLocalization.get('applications.content.entryDetails.captions.processing');
        } else if (caption.serverUploadToken || caption.uploadUrl) {
          status = this._appLocalization.get('applications.content.entryDetails.captions.ready');
        }
      }
      return status;
    }

  public _addCaption(): any {

    const newCaption: CaptionRow = {
      uploading: false,
      uploadFileId: '',
      serverUploadToken: '',
      uploadUrl: '',
      id: null,
      format: KontorolCaptionType.srt,
      language: KontorolLanguage.en,
      label: 'English',
      isDefault: 0,
      fileExt: '',
      status: null,
      displayOnPlayer: true,
    };

    // create a copy of the captions array without a reference to the original array
    const captions = Array.from(this._captions.getValue().items);
    captions.push(newCaption);
    this._captions.next({ items: captions });
    this.currentCaption = newCaption;
  }

    public upload(captionFile: File): void {
        this.currentCaption.id = this._idGenerator.generateUnique(this._captions.getValue().items.map(({ id }) => id));
        this.currentCaption.uploading = true;
        this.updateState({ isBusy: true });

        Observable.of(this._uploadManagement.addFile(new NewEntryCaptionFile(captionFile)))
            .subscribe((response) => {
                    this.currentCaption.uploadFileId = response.id;
                    this.currentCaption.uploading = false;
                },
                (error) => {
                    this.currentCaption.uploading = false;
                    (<any>this.currentCaption).uploadFailure = true;
                });
    }

    public removeCaption(captionId?: string): void {
        // update the list by filtering the assets array.
        this._captions.next({
            items: this._captions.getValue().items.filter((item: CaptionRow) => {
                return item.id !== (captionId || this.currentCaption.id)
            })
        });

        // stop tracking changes on this asset
        if (this.currentCaption.id && this.captionDiffer[this.currentCaption.id]) {
            delete this.captionDiffer[this.currentCaption.id];
        }
        this.setDirty();
    }

    // cleanup of added captions that don't have assets (url or uploaded file)
    public removeEmptyCaptions() {
        if (this.currentCaption) {
            if (this.currentCaption.id === null && this.currentCaption.uploadUrl === "" && this.currentCaption.uploadFileId === "" && !this.currentCaption.uploading) {
                let captions = Array.from(this._captions.getValue().items); // create a copy of the captions array without a reference to the original array
                captions.pop(); // remove last caption
                this._captions.next({items: captions});
            }
        }
    }

    // animate uploading caption row
    public _getRowStyle(rowData, rowIndex): string {
        return rowData.uploading ? "uploading" : rowData.uploadFailure ? "uploadFailure" : '';
    }

  // save data
  protected onDataSaving(data: KontorolMediaEntry, request: KontorolMultiRequest) {
    if (this._captions.getValue().items) {
      // check for added and removed captions
      if (this.captionsListDiffer) {
        const changes = this.captionsListDiffer.diff(this._captions.getValue().items);
        if (changes) {
          changes.forEachAddedItem((record: IterableChangeRecord<CaptionRow>) => {
            // added captions
            const newCaption = record.item as CaptionRow;
            const captionAsset = new KontorolCaptionAsset({
              language: record.item.language,
              format: record.item.format,
              label: record.item.label,
              displayOnPlayer: record.item.displayOnPlayer,
              isDefault: 0
            });
            const addCaptionRequest = new CaptionAssetAddAction({ entryId: this.data.id, captionAsset: captionAsset });
            request.requests.push(addCaptionRequest);

            let resource = null;
            if ((record.item).uploadUrl) { // add new caption from URL
              resource = new KontorolUrlResource({ url: (record.item).uploadUrl });
            }
            if ((record.item).serverUploadToken) { // add new caption from upload token
              resource = new KontorolUploadedFileTokenResource({ token: (record.item).serverUploadToken });
            }
            if (resource) {
              const setContentRequest = new CaptionAssetSetContentAction({ id: '0', contentResource: resource })
                .setDependency(['id', (request.requests.length - 1), 'id'])
                .setCompletion(response => {
                  if (response.error) {
                    this._uploadManagement.cancelUpload(newCaption.uploadFileId, true);
                  } else {
                    const relevantUploadFile = this._uploadManagement.getTrackedFile(newCaption.uploadFileId);
                    if (relevantUploadFile) {
                      (<NewEntryCaptionFile>relevantUploadFile.data).captionId = response.result.id;
                    }
                  }
                });

              request.requests.push(setContentRequest);
            }
          });
          changes.forEachRemovedItem((record: IterableChangeRecord<CaptionRow>) => {
            // remove deleted captions
            const deleteCaptionRequest: CaptionAssetDeleteAction = new CaptionAssetDeleteAction({ captionAssetId: (record.item).id });
            request.requests.push(deleteCaptionRequest);
          });
        }
      }

      // update changed captions and setting default caption
      this._captions.getValue().items.forEach((caption: any) => {
        const captionDiffer = this.captionDiffer[caption.id];
        if (captionDiffer) {
          const objChanges = captionDiffer.diff(caption);
          if (objChanges) {
            const updatedCaptionIDs = []; // array holding changed caption IDs.
                                          // Used to verify we update each caption only once even if more than one fields was updated
            objChanges.forEachChangedItem((record: KeyValueChangeRecord<string, any>) => {
              // update default caption if changed
              if (record.key === 'isDefault' && record.currentValue === 1) {
                const setAsDefaultRequest = new CaptionAssetSetAsDefaultAction({ captionAssetId: caption.id });
                request.requests.push(setAsDefaultRequest);
              } else {
                // update other fields
                // make sure we update each caption only once as we update all changed fields at once
                if (updatedCaptionIDs.indexOf(caption.id) === -1) {
                  updatedCaptionIDs.push(caption.id);
                  const updateCaptionRequest = new CaptionAssetUpdateAction({
                    id: caption.id,
                    captionAsset: caption
                  });
                  request.requests.push(updateCaptionRequest);
                }
              }
            });
          }
        }
      });
    }
  }

    getCaptionPreviewUrl(): Observable<{ url: string }> {
        if (this.currentCaption.id) {
            return this._kontorolServerClient.request(new CaptionAssetServeAction({captionAssetId: this.currentCaption.id}));
        } else {
            return Observable.throw(new Error('cannot generate caption preview url. missing caption id'));
        }
    }

    public setDirty() {
        super.updateState({isDirty: true});
    }

    ngOnDestroy()
    {

    }

}
