import { Component, Input } from '@angular/core';
import { KontorolDistributionValidationError } from 'kontorol-ngx-client';
import { KontorolDistributionValidationErrorConditionNotMet } from 'kontorol-ngx-client';
import { KontorolDistributionValidationErrorMissingThumbnail } from 'kontorol-ngx-client';
import { KontorolDistributionValidationErrorMissingMetadata } from 'kontorol-ngx-client';
import { KontorolDistributionValidationErrorMissingFlavor } from 'kontorol-ngx-client';
import { KontorolDistributionValidationErrorInvalidData } from 'kontorol-ngx-client';
import { OverlayPanel } from 'primeng/overlaypanel';

export interface DistributedProfileErrorsGroup {
  [key: string]: KontorolDistributionValidationError[]
}

@Component({
  selector: 'kEntryDistributedProfileErrors',
  templateUrl: './distributed-profile-errors.component.html',
  styleUrls: ['./distributed-profile-errors.component.scss']
})
export class DistributedProfileErrorsComponent {
  @Input() set errors(value: KontorolDistributionValidationError[]) {
    if (value && value.length) {
      this._errors = this._mapErrors(value);
      this._errorsKeys = Object.keys(this._errors);
    }
  }

  public _errors: DistributedProfileErrorsGroup;
  public _errorsKeys: string[] = [];
  public _selectedErrorGroup: { type: string, errors: KontorolDistributionValidationError[] };

  private _mapErrors(errors: KontorolDistributionValidationError[]): DistributedProfileErrorsGroup {
    const updateErrorType = (acc, val, type) => {
      if (typeof acc === "undefined"){
          acc = {};
      }
      if (!acc[type]) {
        return Object.assign(acc, { [type]: [val] });
      }
      return Object.assign(acc, { [type]: [...acc[type], val] });
    };

    return errors.reduce((acc, val) => {
      switch (true) {
        case val instanceof KontorolDistributionValidationErrorInvalidData:
          return updateErrorType(acc, val, 'metadataError');

        case val instanceof KontorolDistributionValidationErrorMissingMetadata:
          return updateErrorType(acc, val, 'missingMetadata');

        case val instanceof KontorolDistributionValidationErrorMissingFlavor:
          return updateErrorType(acc, val, 'missingFlavor');

        case val instanceof KontorolDistributionValidationErrorMissingThumbnail:
          return updateErrorType(acc, val, 'missingThumbnail');

        case val instanceof KontorolDistributionValidationErrorConditionNotMet:
          return updateErrorType(acc, val, 'autoDistributionMetadataMissing');

        default:
          break;
      }
    }, {})
  }

  public _toggleErrorInfo($event: Event, errorGroup: KontorolDistributionValidationError[], type: string, panel: OverlayPanel): void {
    this._selectedErrorGroup = { type, errors: errorGroup };
    panel.toggle($event);
  }
}
