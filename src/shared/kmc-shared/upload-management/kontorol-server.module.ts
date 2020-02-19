import { NgModule } from '@angular/core';
import { KontorolClientModule } from 'kontorol-ngx-client';
import { UploadFileAdapterToken, UploadManagementModule } from '@kontorol-ng/kontorol-common';
import { KontorolUploadAdapter } from './kontorol-upload-adapter.service';

@NgModule({
    imports: <any[]>[
        KontorolClientModule,
        UploadManagementModule
    ],
    declarations: <any[]>[
    ],
    exports: <any[]>[
    ],
    providers: <any[]>[
        {
            provide : UploadFileAdapterToken,
            useClass : KontorolUploadAdapter,
            multi : true
        }
    ]
})
export class KontorolServerModule {

}
