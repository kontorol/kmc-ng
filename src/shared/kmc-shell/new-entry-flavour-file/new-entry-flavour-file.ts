import { KontorolUploadFile } from 'app-shared/kmc-shared/upload-management';
import { KontorolMediaType } from 'kontorol-ngx-client';

export class NewEntryFlavourFile extends KontorolUploadFile {
  constructor(file: File, public entryId?: string, public mediaType?: KontorolMediaType) {
    super(file);
  }
}
