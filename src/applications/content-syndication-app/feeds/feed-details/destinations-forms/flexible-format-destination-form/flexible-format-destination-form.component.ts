import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { DestinationComponentBase, FeedFormMode } from '../../feed-details.component';
import {KontorolGenericXsltSyndicationFeed} from 'kontorol-ngx-client';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { KMCPermissions, KMCPermissionsService } from 'app-shared/kmc-shared/kmc-permissions';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';

@Component({
  selector: 'kFlexibleFormatDestinationForm',
  templateUrl: './flexible-format-destination-form.component.html',
  styleUrls: ['./flexible-format-destination-form.component.scss'],
  providers: [
      {provide: DestinationComponentBase, useExisting: FlexibleFormatDestinationFormComponent},
      KontorolLogger.createLogger('FlexibleFormatDestinationFormComponent')
  ]
})
export class FlexibleFormatDestinationFormComponent extends DestinationComponentBase implements OnInit, OnDestroy {

  @Output()
  onFormStateChanged = new EventEmitter<{ isValid: boolean, isDirty: boolean }>();

  @Input()
  feed: KontorolGenericXsltSyndicationFeed = null;

  @Input() mode: FeedFormMode;

  public _error: string = null;
  public _xslCode: string = null;
  public _loading = false;
  private _fileReader: FileReader = new FileReader();

  public get _disableFileSelection(): boolean {
    return this.mode === 'edit' && !this._permissionsService.hasPermission(KMCPermissions.SYNDICATION_UPDATE);
  }

  constructor(private _appLocalization: AppLocalization,
              private _permissionsService: KMCPermissionsService,
              private _logger: KontorolLogger) {
    super();
  }

  ngOnInit() {
      this._logger.debug(`prepare component`, { mode: this.mode });
    if (this.mode !== 'edit' || this._permissionsService.hasPermission(KMCPermissions.SYNDICATION_UPDATE)) {
        this._logger.debug(`user has entered new mode or has SYNDICATION_UPDATE permission`);
      this.onFormStateChanged.emit({
        isValid: false,
        isDirty: false
      });
    }

    if (this.feed) {
      this._xslCode = this.feed.xslt;
    }
  }

  ngOnDestroy() {
  }

  public _onFileSelected(selectedFiles: FileList) {
      this._logger.info(`handle file selected action`, { files: (selectedFiles || []).length });
    const showLoadError = () => {
        this._logger.info(`handle load file error`);
      this._loading = false;
      this.onFormStateChanged.emit({isValid: false, isDirty: true});
      this._xslCode = null;
      this._error = this._appLocalization
        .get('applications.content.syndication.details.destinationsForms.flexibleFormat.xslCode.errors.loadingFile',
          {'0': fileData.name});
    };

    let fileData: File = null;
    if (selectedFiles && selectedFiles.length) {
      fileData = selectedFiles[0];

      try {
        this._loading = true;
        this._fileReader.readAsText(fileData);

        this._fileReader.onloadend = (e) => {
          this._loading = false;
          if (!this._fileReader.result) {
            showLoadError();
          } else {
            this.onFormStateChanged.emit({isValid: true, isDirty: true});
            this._xslCode = <string>this._fileReader.result;
            this._error = null;
          }
        };

        this._fileReader.onerror = (e) => {
          this._loading = false;
          showLoadError();
        };

      } catch (ex) {
        showLoadError();
      }
    }
  }

  public getData(): KontorolGenericXsltSyndicationFeed {
      this._logger.debug(`handle get data action`);
    const data = new KontorolGenericXsltSyndicationFeed({
      xslt: this._xslCode
    });

    this._logger.debug(`feed data`, { data });

    return data;
  }
}
