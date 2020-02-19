import { KontorolUploadFile } from 'app-shared/kmc-shared';

export class NewEntryRelatedFile extends KontorolUploadFile {
  public assetId?: string;
  constructor(file: File) {
    super(file);
  }
}
