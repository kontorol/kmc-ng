import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PopupWidgetComponent} from '@kontorol-ng/kontorol-ui';
import {KontorolContributionPolicyType} from 'kontorol-ngx-client';

@Component({
  selector: 'kCategoriesBulkChangeContributionPolicy',
  templateUrl: './bulk-change-contribution-policy.component.html',
  styleUrls: ['./bulk-change-contribution-policy.component.scss']
})

export class CategoriesBulkChangeContributionPolicy {

  @Input() parentPopupWidget: PopupWidgetComponent;
  @Output() changeContributionPolicyChanged = new EventEmitter<KontorolContributionPolicyType>();
  public _selectedPolicy: KontorolContributionPolicyType = null;
  public _availablePolicies = KontorolContributionPolicyType;

  constructor() {
  }

  public _apply() {
    this.changeContributionPolicyChanged.emit(this._selectedPolicy);
    this.parentPopupWidget.close();
  }
}

