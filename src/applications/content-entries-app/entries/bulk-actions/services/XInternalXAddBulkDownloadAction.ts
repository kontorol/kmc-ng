import { KontorolRequest } from 'kontorol-ngx-client';
import { KontorolRequestArgs } from 'kontorol-ngx-client';
import { KontorolObjectMetadata } from 'kontorol-ngx-client';

export interface XInternalXAddBulkDownloadActionArgs  extends KontorolRequestArgs {
    entryIds : string;
	flavorParamsId? : string;
}

/**
* Creates new download job for multiple entry ids (comma separated), an email will
* be sent when the job is done   This sevice support the following entries:    -
* MediaEntry   - Video will be converted using the flavor params id   - Audio will
* be downloaded as MP3   - Image will be downloaded as Jpeg   - MixEntry will be
* flattened using the flavor params id   - Other entry types are not supported
* Returns the admin email that the email message will be sent to
**/
export class XInternalXAddBulkDownloadAction extends KontorolRequest<string> {

    entryIds : string;
	flavorParamsId : string;

    constructor(data : XInternalXAddBulkDownloadActionArgs)
    {
        super(data, {responseType : 's', responseSubType : '', responseConstructor : null });
    }

    protected _getMetadata() : KontorolObjectMetadata
    {
        const result = super._getMetadata();
        Object.assign(
            result.properties,
            {
                service : { type : 'c', default : 'xinternal' },
				action : { type : 'c', default : 'xAddBulkDownload' },
				entryIds : { type : 's' },
				flavorParamsId : { type : 's' }
            }
        );
        return result;
    }
}

