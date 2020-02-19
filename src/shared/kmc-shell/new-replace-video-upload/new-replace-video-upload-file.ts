import { KontorolUploadFile } from 'app-shared/kmc-shared/upload-management/kontorol-upload-file';
import { ISubscription } from 'rxjs/Subscription';

export class NewReplaceVideoUploadFile extends KontorolUploadFile {
    public createMediaEntrySubscription: ISubscription;

    constructor(file: File,
                public assetParamsId: number,
                public transcodingProfileId: number,
                public entryId: string) {
        super(file);
    }
}
