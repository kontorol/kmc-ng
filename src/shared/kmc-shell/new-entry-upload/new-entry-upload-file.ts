import { KontorolUploadFile } from 'app-shared/kmc-shared/upload-management/kontorol-upload-file';
import { KontorolMediaType } from 'kontorol-ngx-client';
import { ISubscription } from 'rxjs/Subscription';

export class NewEntryUploadFile extends KontorolUploadFile {
  public entryId: string;
  public createMediaEntrySubscription: ISubscription;
  constructor(file: File,
              public mediaType: KontorolMediaType,
              public transcodingProfileId: number,
              public entryName: string = file.name) {
    super(file);
  }
}
