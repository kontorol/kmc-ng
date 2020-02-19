import { Injectable, OnDestroy } from '@angular/core';
import { TrackedFileStatuses, UploadManagement } from '@kontorol-ng/kontorol-common';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { PageExitVerificationService } from 'app-shared/kmc-shell/page-exit-verification/page-exit-verification.service';
import { NewEntryUploadFile } from 'app-shared/kmc-shell/new-entry-upload';
import { NewEntryFlavourFile } from 'app-shared/kmc-shell/new-entry-flavour-file';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';

@Injectable()
export class UploadPageExitVerificationService implements OnDestroy {
  private _trackedFilesIds: string[] = [];
  private _pageExitVerificationToken: string;

  constructor(private _appLocalizations: AppLocalization,
              private _pageExitVerificationService: PageExitVerificationService,
              private _uploadManagement: UploadManagement) {
  }

  ngOnDestroy() {

  }

  private _syncPageExitVerificationState(): void {
    if (this._trackedFilesIds.length) {
      if (!this._pageExitVerificationToken) {
        this._pageExitVerificationToken = this._pageExitVerificationService.add();
      }
    } else {
        if (this._pageExitVerificationToken) {
            this._pageExitVerificationService.remove(this._pageExitVerificationToken);
        }
      this._pageExitVerificationToken = null;
    }
  }

  public init(): void {
    this._uploadManagement.onTrackedFileChanged$
      .pipe(cancelOnDestroy(this))
      .filter(({ data }) => data instanceof NewEntryUploadFile || data instanceof NewEntryFlavourFile)
      .filter(({ status, progress }) => !(status === TrackedFileStatuses.uploading && progress > 0))
      .subscribe(({ id, status }) => {
        if (status === TrackedFileStatuses.added) {
          if (this._trackedFilesIds.indexOf(id) === -1) {
              this._trackedFilesIds.push(id);
          }
        }

        const uploadCompleted = [TrackedFileStatuses.purged, TrackedFileStatuses.uploadCompleted].indexOf(status) !== -1;
        if (uploadCompleted) {
          const relevantFileIndex = this._trackedFilesIds.indexOf(id);
          if (relevantFileIndex !== -1) {
            this._trackedFilesIds.splice(relevantFileIndex, 1);
          }
        }

        this._syncPageExitVerificationState();
      });
  }
}
