import { UploadFileData } from '@kontorol-ng/kontorol-common';
import 'rxjs/add/observable/throw';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';

export class KontorolUploadFile implements UploadFileData {
  serverUploadToken: string;


  constructor(public file: File) {
  }

  getFileName(): string {
    return (this.file.name || '').trim();
  }

  getFileSize(): number {
    return this.file.size;
  }
}


