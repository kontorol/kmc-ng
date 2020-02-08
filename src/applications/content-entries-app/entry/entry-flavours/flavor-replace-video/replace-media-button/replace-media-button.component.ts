import { Component, Input, ViewChild } from '@angular/core';
import { KontorolMediaEntry } from 'kontorol-ngx-client';
import { KMCPermissions, KMCPermissionsService } from 'app-shared/kmc-shared/kmc-permissions';
import { PopupWidgetComponent } from '@kontorol-ng/kontorol-ui';
import { Flavor } from '../../flavor';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';
import { AppLocalization } from '@kontorol-ng/mc-shared';

export type UploadMenuType = 'upload' | 'import' | 'link' | 'match';

@Component({
    selector: 'kFlavorReplaceMediaBtn',
    templateUrl: './replace-media-button.component.html',
    styleUrls: ['./replace-media-button.component.scss'],
    providers: [KontorolLogger.createLogger('ReplaceMediaButtonComponent')]
})
export class ReplaceMediaButtonComponent {
    @Input() entry: KontorolMediaEntry;
    @Input() flavors: Flavor[] = [];
    @Input() replaceButtonsLabel: string;

    @ViewChild('uploadMenu') _uploadMenu: PopupWidgetComponent;

    public _replaceType: UploadMenuType;
    public _uploadEnabled = false;
    public _importEnabled = false;
    public _linkEnabled = false;
    public _matchEnabled = false;

    constructor(private _appLocalization: AppLocalization,
                private _logger: KontorolLogger,
                private _permissionsService: KMCPermissionsService) {
        this._uploadEnabled = this._permissionsService.hasPermission(KMCPermissions.CONTENT_INGEST_UPLOAD)
            && this._permissionsService.hasPermission(KMCPermissions.CONTENT_INGEST_BASE);
        this._importEnabled = this._permissionsService.hasPermission(KMCPermissions.CONTENT_INGEST_BULK_UPLOAD)
            && this._permissionsService.hasPermission(KMCPermissions.CONTENT_INGEST_BASE);
        this._linkEnabled = this._permissionsService.hasPermission(KMCPermissions.FEATURE_REMOTE_STORAGE_INGEST)
            && this._permissionsService.hasPermission(KMCPermissions.CONTENT_INGEST_REMOTE_STORAGE)
            && this._permissionsService.hasPermission(KMCPermissions.CONTENT_INGEST_BASE);
        this._matchEnabled = this._permissionsService.hasPermission(KMCPermissions.CONTENT_INGEST_DROP_FOLDER_MATCH)
            && this._permissionsService.hasPermission(KMCPermissions.CONTENT_INGEST_BASE)
            && this._permissionsService.hasPermission(KMCPermissions.DROPFOLDER_CONTENT_INGEST_DROP_FOLDER_DELETE);
    }

    public _openReplacementMenu(type: UploadMenuType): void {
        this._logger.info(`handle open replacement menu action by user`, { type });
        this._replaceType = type;
        this._uploadMenu.open();
    }
}

