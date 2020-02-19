import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReachProfileStore } from '../reach-profile-store.service';
import { cancelOnDestroy } from '@kontorol-ng/kontorol-common';
import { KontorolBaseVendorCreditArgs, KontorolReachProfile, KontorolReoccurringVendorCredit, KontorolTimeRangeVendorCredit, KontorolUnlimitedVendorCredit, KontorolVendorCredit } from "kontorol-ngx-client";
import { ReachProfileCreditWidget } from "./reach-profile-credit-widget.service";
import { AppLocalization } from "@kontorol-ng/mc-shared";

@Component({
  selector: 'kReachProfileCredit',
  templateUrl: './reach-profile-credit.component.html',
  styleUrls: ['./reach-profile-credit.component.scss']
})
export class ReachProfileCreditComponent implements OnInit, OnDestroy {
  public _currentProfile: KontorolReachProfile;
  public _creditType = '';
  public _totalCredit = '';
  public _consumption = '';
  
  constructor(public _widgetService: ReachProfileCreditWidget,
              private _appLocalization: AppLocalization,
              public _profileStore: ReachProfileStore) {
  }

  ngOnInit() {
    this._widgetService.attachForm();

    this._widgetService.data$
      .pipe(cancelOnDestroy(this))
      .filter(Boolean)
      .subscribe(
        data => {
          this._currentProfile = data;
          this._creditType = this.setCreditType(this._currentProfile.credit);
          if (this._currentProfile.credit['credit'] !== -9999){
              const totalCredit = this._currentProfile.credit['credit'] + this._currentProfile.credit['addOn'];
              this._totalCredit = parseFloat(totalCredit.toFixed(2)).toString();
              this._consumption = parseFloat((this._currentProfile.usedCredit / totalCredit).toFixed(2)).toString();
          } else {
              this._totalCredit = this._appLocalization.get('applications.settings.reach.unlimited');
              this._consumption = '0';
          }
        });
  }
  
  private setCreditType(credit: KontorolBaseVendorCreditArgs): string {
      if (credit instanceof KontorolUnlimitedVendorCredit){
          return this._appLocalization.get('applications.settings.reach.credit.unlimited');
      }
      if (credit instanceof KontorolReoccurringVendorCredit){
          return this._appLocalization.get('applications.settings.reach.credit.reoccurring');
      }
      if (credit instanceof KontorolTimeRangeVendorCredit){
          return this._appLocalization.get('applications.settings.reach.credit.range');
      }
      if (credit instanceof KontorolVendorCredit){
          return this._appLocalization.get('applications.settings.reach.credit.generic');
      }
      return '';
  }

  ngOnDestroy() {
    this._widgetService.detachForm();
  }
}

