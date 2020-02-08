import { Injectable } from '@angular/core';
import { UploadFileAdapter, UploadFileData } from '@kontorol-ng/kontorol-common';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/throw';
import { KontorolClient } from 'kontorol-ngx-client';
import { UploadTokenAddAction } from 'kontorol-ngx-client';
import { UploadTokenUploadAction } from 'kontorol-ngx-client';
import { KontorolUploadToken } from 'kontorol-ngx-client';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';
import { KontorolUploadFile } from './kontorol-upload-file';
import { KontorolRequest } from 'kontorol-ngx-client';
import { UploadTokenListAction } from 'kontorol-ngx-client';
import { KontorolUploadTokenFilter } from 'kontorol-ngx-client';
import { KontorolUploadTokenListResponse } from 'kontorol-ngx-client';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';

@Injectable()
export class KontorolUploadAdapter extends UploadFileAdapter<KontorolUploadFile> {
    constructor(private _serverClient: KontorolClient,
                private _logger: KontorolLogger) {
        super();
        this._logger = _logger.subLogger('KontorolUploadAdapter');
    }

    get label(): string {
        return 'Kontorol OVP server';
    }

    private _getUploadToken(uploadFile: KontorolUploadFile): Observable<string> {

        return this._serverClient.request(
            new UploadTokenAddAction({
                uploadToken: new KontorolUploadToken()
            })
        )
            .map(
                (response) => {
                    return response.id;
                }
            );
    }

    supportChunkUpload(): boolean{
        return new UploadTokenUploadAction({
            uploadTokenId : 'uploadTokenId',
            fileData : <File>({})
        }).supportChunkUpload();
    }

    prepare(files: { id: string, data: KontorolUploadFile }[]): Observable<{ id: string, status: boolean }[]> {
        const multiRequest: KontorolRequest<any>[] = [];

        files.forEach(file => {
            multiRequest.push(
                new UploadTokenAddAction({
                    uploadToken: new KontorolUploadToken()
                })
            );
        });
        return this._serverClient.multiRequest(multiRequest)
            .map(responses => {
                return files.map((file, index) => {
                    const response = responses[index];
                    let status = !!response.result;

                    if (response.result) {
                        file.data.serverUploadToken = response.result.id;
                        this._logger.debug(`updated server upload token to '${response.result.id}' for file '${file.id}'`);
                    } else {
                        this._logger.warn(`failed to prepare file '${file.id}`);
                    }

                    return {id: file.id, status};
                });
            });
    }

    canHandle(uploadFile: UploadFileData): boolean {
        return uploadFile instanceof KontorolUploadFile;
    }

    resume(id: string, fileData: KontorolUploadFile): Observable<{ id: string, progress?: number }> {
      if (!fileData || !(fileData instanceof KontorolUploadFile) || !fileData.serverUploadToken) {
        return Observable.throw('missing upload token');
      }
    }

    upload(id: string, fileData: KontorolUploadFile): Observable<{ id: string, progress?: number }> {
        return Observable.create((observer) => {
            if (fileData && fileData instanceof KontorolUploadFile) {
                this._logger.info(`starting upload for file '${id}'`);

                let requestSubscription = Observable.of(fileData.serverUploadToken)
                    .switchMap(serverUploadToken =>
                    {
                        if (!serverUploadToken)
                        {
                            // start from the beginning
                            return Observable.of(0);
                        }else
                        {
                            return this._serverClient.request(
                                new UploadTokenListAction({
                                    filter: new KontorolUploadTokenFilter({ idIn: fileData.serverUploadToken })
                                })
                            ).map((response: KontorolUploadTokenListResponse) => {
                                const uploadedFileSize = response && response.objects && response.objects.length > 0 ? response.objects[0].uploadedFileSize : null;

                                if (typeof uploadedFileSize === 'number') {
                                    this._logger.info(`file '${id}': got from server 'uploadedFileSize' value ${uploadedFileSize} for '${fileData.serverUploadToken}'. resume upload. `);
                                    return uploadedFileSize*1;
                                }else
                                {
                                    this._logger.info(`file '${id}': server resulted without information about previous uploads '${fileData.serverUploadToken}'. (re)start new upload.`);
                                    return 0;
                                }
                            }).catch(caught =>
                            {
                                this._logger.warn(`file '${id}': failed to get 'uploadedFileSize' for '${fileData.serverUploadToken}'. re-start new upload. error: ${caught.message}`);
                                return Observable.of(0);
                            });
                        }
                    })
                    .switchMap(uploadedFileSize =>
                    {
                        const payload = {
                            uploadTokenId: fileData.serverUploadToken,
                            fileData: fileData.file,
                            uploadedFileSize: uploadedFileSize
                        };

                        return this._serverClient.request(
                            new UploadTokenUploadAction(payload).setProgress(
                                (uploaded, total) => {
                                    const progress = total && total !== 0 ? uploaded / total : null;
                                    observer.next({id: id, progress});
                                }
                            )
                        )
                    })
                    .subscribe(
                        () => {
                            requestSubscription = null;
                            this._logger.info(`file upload completed for file with upload token '${id}'`);
                            observer._complete();
                        },
                        (error) => {
                            requestSubscription = null;
                            this._logger.warn(`file upload failed for file with upload token '${id}' (reason: ${error.message})`);
                            observer.error(error);
                        }
                    );

                return () => {
                    if (requestSubscription) {
                        this._logger.info(`cancelling upload file to the server with upload token '${id}'`);
                        requestSubscription.unsubscribe();
                        requestSubscription = null;
                    }
                };
            } else {
                observer.error(new Error('missing upload token and content'));
            }

        });
    }
}
