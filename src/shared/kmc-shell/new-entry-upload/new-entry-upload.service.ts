import { Injectable, OnDestroy } from '@angular/core';
import { KontorolClient } from 'kontorol-ngx-client';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { KontorolMediaType } from 'kontorol-ngx-client';
import { TrackedFileStatuses, UploadManagement } from '@kontorol-ng/kontorol-common';
import { NewEntryUploadFile } from './new-entry-upload-file';
import { MediaAddAction } from 'kontorol-ngx-client';
import { KontorolMediaEntry } from 'kontorol-ngx-client';
import { KontorolUploadedFileTokenResource } from 'kontorol-ngx-client';
import { KontorolAssetParamsResourceContainer } from 'kontorol-ngx-client';
import { KontorolAssetsParamsResourceContainers } from 'kontorol-ngx-client';
import { MediaUpdateContentAction } from 'kontorol-ngx-client';
import { UploadTokenDeleteAction } from 'kontorol-ngx-client';
import { TrackedFileData } from '@kontorol-ng/kontorol-common';
import { Subject } from 'rxjs/Subject';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';

export interface KmcNewEntryUpload {
  file: File;
  mediaType: KontorolMediaType;
  entryName: string;
}

@Injectable()
export class NewEntryUploadService implements OnDestroy {
  public _mediaCreated = new Subject<{ id?: string, entryId?: string }>();
  public onMediaCreated$ = this._mediaCreated.asObservable();

  constructor(private _kontorolServerClient: KontorolClient,
              private _uploadManagement: UploadManagement) {
    this._monitorTrackedFilesChanges();
  }

  ngOnDestroy() {

  }

  private _monitorTrackedFilesChanges(): void {
    this._uploadManagement.onTrackedFileChanged$
      .pipe(cancelOnDestroy(this))
      .filter(trackedFile => trackedFile.data instanceof NewEntryUploadFile)
      .subscribe(
        trackedFile => {
          // NOTE: this service handles only 'purged' and 'waitingUpload' statuses by design.
          switch (trackedFile.status) {
            case TrackedFileStatuses.purged:
              this._cleanupUpload(trackedFile);
              break;
            case TrackedFileStatuses.prepared:
              this._linkEntryWithFile(trackedFile);
              break;
            default:
              break;
          }
        }
      );
  }

  private _cleanupUpload(trackedFile: TrackedFileData): void {
    const trackedFileData = <NewEntryUploadFile>trackedFile.data;

    if (trackedFileData.createMediaEntrySubscription instanceof Subscription) {
      trackedFileData.createMediaEntrySubscription.unsubscribe();
      trackedFileData.createMediaEntrySubscription = null;
    }

    if (trackedFileData.serverUploadToken) {
      this._removeUploadToken(trackedFileData.serverUploadToken)
        .subscribe(
          () => {
          },
          (error) => {
            console.warn(this._formatError('Failed to remove upload token', error));
          }
        );
    }
  }

  private _linkEntryWithFile(trackedFile: TrackedFileData): void {
    (<NewEntryUploadFile>trackedFile.data).createMediaEntrySubscription = this._createMediaEntry(<NewEntryUploadFile>trackedFile.data)
      .do(entry => {
        (<NewEntryUploadFile>trackedFile.data).entryId = entry.id;
        this._mediaCreated.next({ id: trackedFile.id, entryId: entry.id });
      })
      .switchMap((entry: KontorolMediaEntry) => this._updateMediaContent(entry, <NewEntryUploadFile>trackedFile.data))
      .subscribe(
        () => {
        },
        (error) => {
          this._uploadManagement.cancelUploadWithError(trackedFile.id, this._formatError('Failed to create entry', error));
        }
      );
  }

  private _updateMediaContent(entry: KontorolMediaEntry, file: NewEntryUploadFile): Observable<KontorolMediaEntry> {
    const entryId = entry.id;
    const conversionProfileId = file.transcodingProfileId;
    const subSubResource = new KontorolUploadedFileTokenResource({ token: file.serverUploadToken });
    let resource = null;

    if (file.mediaType === KontorolMediaType.image) {
      resource = subSubResource;
    } else {
      const subResource = new KontorolAssetParamsResourceContainer({ resource: subSubResource, assetParamsId: 0 });
      resource = new KontorolAssetsParamsResourceContainers({ resources: [subResource] });
    }

    return this._kontorolServerClient.request(new MediaUpdateContentAction({ entryId, resource, conversionProfileId }));
  }

  private _createMediaEntry(file: NewEntryUploadFile): Observable<KontorolMediaEntry> {
    return this._kontorolServerClient.request(new MediaAddAction({
      entry: new KontorolMediaEntry({
        mediaType: file.mediaType,
        name: file.entryName,
        conversionProfileId: file.transcodingProfileId
      })
    }));
  }

  private _removeUploadToken(uploadTokenId: string): Observable<void> {
    return this._kontorolServerClient.request(new UploadTokenDeleteAction({ uploadTokenId }))
  }

  private _formatError(message: string, error: string | { message: string }): string {
    const errorMessage = typeof error === 'string' ? error : error && error.message ? error.message : 'unknown reason';
    return `${message}: ${errorMessage}`;
  }

  public upload(files: KmcNewEntryUpload[], trancodingProfileId: number): void {
    this._uploadManagement.addFiles(
      files.map(file => new NewEntryUploadFile(file.file, file.mediaType, trancodingProfileId, file.entryName))
    );
  }
}
