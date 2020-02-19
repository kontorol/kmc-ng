import { KontorolUploadFile } from 'app-shared/kmc-shared';

export class NewEntryCaptionFile extends KontorolUploadFile {
  public captionId?: string;
  constructor(file: File) {
    super(file);
  }
}
