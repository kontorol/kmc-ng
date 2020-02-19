import { Component, Input, OnDestroy } from '@angular/core';
import { KontorolDistributionValidationError } from 'kontorol-ngx-client';
import { KontorolDistributionValidationErrorInvalidData } from 'kontorol-ngx-client';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { KontorolDistributionValidationErrorType } from 'kontorol-ngx-client';
import { KontorolDistributionValidationErrorMissingMetadata } from 'kontorol-ngx-client';
import { KontorolDistributionValidationErrorMissingFlavor } from 'kontorol-ngx-client';
import { KontorolDistributionValidationErrorMissingThumbnail } from 'kontorol-ngx-client';
import { KontorolDistributionValidationErrorConditionNotMet } from 'kontorol-ngx-client';
import { EntryDistributionWidget } from '../entry-distribution-widget.service';
import { EntryStore } from '../../entry-store.service';
import { ContentEntryViewSections } from 'app-shared/kmc-shared/kmc-views/details-views/content-entry-view.service';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';

@Component({
  selector: 'kEntryDistributedProfileErrorInfo',
  templateUrl: './distributed-profile-error-info.component.html',
  styleUrls: ['./distributed-profile-error-info.component.scss']
})
export class DistributedProfileErrorInfoComponent implements OnDestroy {
  @Input() set errors(value: { type: string, errors: KontorolDistributionValidationError[] }) {
    if (value) {
      this._parseError(value.type, value.errors);
    }
  }

  public _errorInfo = '';
  public _goToLabel = '';
  public _goToLink: ContentEntryViewSections = null;

  constructor(private _appLocalization: AppLocalization,
              private _widget: EntryDistributionWidget,
              private _entryStore: EntryStore) {

  }

  ngOnDestroy() {

  }

  private _parseError(type: string, errors: KontorolDistributionValidationError[]): void {
    switch (type) {
      case 'metadataError':
        this._handleMetadataError(<KontorolDistributionValidationErrorInvalidData[]>errors);
        break;

      case 'missingMetadata':
        this._handleMissingMetadata(<KontorolDistributionValidationErrorMissingMetadata[]>errors);
        break;

      case 'missingFlavor':
        this._handleMissingFlavor(<KontorolDistributionValidationErrorMissingFlavor[]>errors);
        break;

      case 'missingThumbnail':
        this._handleMissingThumbnail(<KontorolDistributionValidationErrorMissingThumbnail[]>errors);
        break;

      case 'autoDistributionMetadataMissing':
        this._handleAutoDistributionMetadataMissing(<KontorolDistributionValidationErrorConditionNotMet[]>errors);
        break;


      default:
        break;
    }
  }

  private _handleMetadataError(errors: KontorolDistributionValidationErrorInvalidData[]): void {
    let details = '';
    errors.forEach(error => {
      switch (error.validationErrorType) {
        case KontorolDistributionValidationErrorType.stringEmpty:
          details += this._appLocalization.get(
            'applications.content.entryDetails.distribution.errorTypes.stringEmpty',
            [error.fieldName]
          );
          break;

        case KontorolDistributionValidationErrorType.stringTooLong:
          details += this._appLocalization.get(
            'applications.content.entryDetails.distribution.errorTypes.stringTooLong',
            [error.fieldName, error.validationErrorParam]
          );
          break;

        case KontorolDistributionValidationErrorType.stringTooShort:
          details += this._appLocalization.get(
            'applications.content.entryDetails.distribution.errorTypes.stringTooShort',
            [error.fieldName, error.validationErrorParam]
          );
          break;

        case KontorolDistributionValidationErrorType.invalidFormat:
          details += this._appLocalization.get(
            'applications.content.entryDetails.distribution.errorTypes.stringEmpty',
            [error.fieldName, error.validationErrorParam]
          );
          break;

        case KontorolDistributionValidationErrorType.customError:
          details += `${error.fieldName} - ${error.validationErrorParam}\n`;
          break;

        default:
          break;
      }
    });

    this._errorInfo = this._appLocalization.get(
      'applications.content.entryDetails.distribution.errorsInfo.metadataError',
      [details]
    );
    this._goToLabel = this._appLocalization.get(
      'applications.content.entryDetails.distribution.errorsInfo.goToMetadataTab'
    );
    this._goToLink = ContentEntryViewSections.Metadata;
  }

  private _handleMissingMetadata(errors: KontorolDistributionValidationErrorMissingMetadata[]): void {
    const details = errors.map(({ fieldName }) => `${fieldName}`).join('\n');
    this._errorInfo = this._appLocalization.get(
      'applications.content.entryDetails.distribution.errorsInfo.missingMetadata',
      [details]
    );
    this._goToLabel = this._appLocalization.get(
      'applications.content.entryDetails.distribution.errorsInfo.goToMetadataTab'
    );
    this._goToLink = ContentEntryViewSections.Metadata;
  }

  private _handleMissingFlavor(errors: KontorolDistributionValidationErrorMissingFlavor[]): void {
    /* Go through the loaded flavors list and find the flavor in which
       Flavor.paramsId === KontorolDistributionValidationErrorMissingFlavor.flavorParamsId.
       Add this Flavor.name to the list of flavor names.
    */
    this._widget.flavors$
      .pipe(cancelOnDestroy(this))
      .subscribe(({ items }) => {
        const details = errors.map(error => {
          const relevantFlavor = items.find(flavor => String(flavor.paramsId) === error.flavorParamsId);
          if (relevantFlavor) {
            return `${relevantFlavor.name}`;
          }
        }).join('\n');

        this._errorInfo = this._appLocalization.get(
          'applications.content.entryDetails.distribution.errorsInfo.missingFlavor',
          [details]
        );
        this._goToLabel = this._appLocalization.get(
          'applications.content.entryDetails.distribution.errorsInfo.goToFlavorsTab'
        );
        this._goToLink = ContentEntryViewSections.Flavours;
      });
  }

  private _handleMissingThumbnail(errors: KontorolDistributionValidationErrorMissingThumbnail[]): void {
    const details = errors.map(({ dimensions }) => `${dimensions.width} X ${dimensions.height}`).join('\n');
    this._errorInfo = this._appLocalization.get(
      'applications.content.entryDetails.distribution.errorsInfo.missingThumbnail',
      [details]
    );
    this._goToLabel = this._appLocalization.get(
      'applications.content.entryDetails.distribution.errorsInfo.goToThumbnailsTab'
    );
    this._goToLink = ContentEntryViewSections.Thumbnails;
  }

  private _handleAutoDistributionMetadataMissing(errors: KontorolDistributionValidationErrorConditionNotMet[]): void {
    const details = errors.map(({ conditionName }) => `${conditionName}`).join('\n');
    this._errorInfo = this._appLocalization.get(
      'applications.content.entryDetails.distribution.errorsInfo.autoDistributionMetadataMissing',
      [details]
    );
    this._goToLabel = this._appLocalization.get(
      'applications.content.entryDetails.distribution.errorsInfo.goToMetadataTab'
    );
    this._goToLink = ContentEntryViewSections.Metadata;
  }

  public _openSection(): void {
    this._entryStore.openSection(this._goToLink);
  }
}
