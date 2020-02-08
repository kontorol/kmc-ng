import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AreaBlockerMessage, FileDialogComponent } from '@kontorol-ng/kontorol-ui';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { AppAuthentication } from 'app-shared/kmc-shell';
import { KontorolAPIException } from 'kontorol-ngx-client';
import { PopupWidgetComponent } from '@kontorol-ng/kontorol-ui';
import { BulkUploadService, BulkUploadTypes } from 'app-shared/kmc-shell/bulk-upload';
import { AppEventsService } from 'app-shared/kmc-shared';
import { BulkLogUploadingStartedEvent } from 'app-shared/kmc-shared/events';
import { KontorolBulkUpload } from 'kontorol-ngx-client';
import { KMCPermissions } from 'app-shared/kmc-shared/kmc-permissions';
import { ContentBulkUploadsMainViewService } from 'app-shared/kmc-shared/kmc-views';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';
@Component({
  selector: 'kKMCBulkUploadMenu',
  templateUrl: './bulk-upload-menu.component.html',
  styleUrls: ['./bulk-upload-menu.component.scss'],
})
export class BulkUploadMenuComponent {
  @Output() onClose = new EventEmitter<void>();
  @ViewChild('fileDialog') fileDialog: FileDialogComponent;
  @ViewChild('uploadSucceed') uploadSucceed: PopupWidgetComponent;

  private _selectedType: BulkUploadTypes;
  private _extensions = {
    [BulkUploadTypes.entries]: '.xml,.csv',
    [BulkUploadTypes.categories]: '.csv',
    [BulkUploadTypes.endUsers]: '.csv',
    [BulkUploadTypes.endUsersEntitlement]: '.csv'
  };

  public _selectedFiles: FileList;
  public _bulkUploadTypes = BulkUploadTypes;
  public _allowedExtensions = '';
  public _showFileDialog = true;
  public _blockerMessage: AreaBlockerMessage;
  public _kmcPermissions = KMCPermissions;

  constructor(private _bulkUploadService: BulkUploadService,
              private _appLocalization: AppLocalization,
              private _userAuthentication: AppAuthentication,
              private _router: Router,
              private _contentBulkViewService: ContentBulkUploadsMainViewService,
              private _appEvents: AppEventsService) {
  }

  // force reload fileDialog component to apply dynamically added filter
  private _openFileDialog(): void {
    this._showFileDialog = false;
    this._showFileDialog = true;
    setTimeout(() => this.fileDialog.open(), 0);
  }

  private _handleUploadSuccess(response: KontorolBulkUpload): void {
    this._selectedFiles = null;
    this.uploadSucceed.open();
    this._appEvents.publish(new BulkLogUploadingStartedEvent(response.id, response.status, response.uploadedOn));
  }

  private _handleUploadError(error: KontorolAPIException): void {
    if (error.code === 'SERVICE_FORBIDDEN') {
      this._showErrorAlert(this._appLocalization.get(
        'applications.content.bulkUpload.menu.messages.uploadError.message',
        { value: error.message }
      ));
    } else if (error.code === 'INVALID_KS') {
        // todo kmcng
    } else {
      this._showErrorAlert(error.message);
    }
  }

  private _showErrorAlert(message: string): void {
    this._blockerMessage = new AreaBlockerMessage({
      message: message,
      buttons: [
        {
          label: this._appLocalization.get('app.common.retry'),
          action: () => {
            this._invokeUpload();
            this._blockerMessage = null;
          }
        },
        {
          label: this._appLocalization.get('app.common.cancel'),
          action: () => {
            this._selectedFiles = null;
            this._blockerMessage = null;
          }
        }
      ]
    });
  }

  private _invokeUpload(): void {
    if (this._selectedFiles) {
      this._bulkUploadService.upload(this._selectedFiles, this._selectedType)
        .pipe(tag('block-shell'))
        .subscribe(
          (response) => this._handleUploadSuccess(response),
          (error) => this._handleUploadError(error)
        );
    } else {
      console.warn('There are no selected files');
    }
  }

  private _getAllowedExtension(type: BulkUploadTypes): string {
    if (type in this._extensions) {
      return this._extensions[type];
    }

    throw Error('Bulk upload type is not supported');
  }

  public _selectFiles(files: FileList): void {
    this._selectedFiles = files;
    this._invokeUpload();
  }

  public _invokeFileSelection(type: BulkUploadTypes): void {
    this._selectedType = type;
    this._allowedExtensions = this._getAllowedExtension(type);
    this._openFileDialog();
  }

  public _goToBulkUploadLog(): void {
      this._contentBulkViewService.open();
    this.uploadSucceed.close();
    this.onClose.emit();
  }
}
