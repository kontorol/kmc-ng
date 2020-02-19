import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReachProfileStore } from '../reach-profile-store.service';
import { ReachProfileDetailsWidget } from './reach-profile-details-widget.service';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';
import { KontorolReachProfile } from "kontorol-ngx-client";
import {KontorolReachProfileWithCredit} from "../../reach-profiles/reach-profiles-store/reach-profiles-store.service";

@Component({
  selector: 'kReachProfileDetails',
  templateUrl: './reach-profile-details.component.html',
  styleUrls: ['./reach-profile-details.component.scss']
})
export class ReachProfileDetailsComponent implements OnInit, OnDestroy {
  public _currentProfile: KontorolReachProfile;
  public _remainingCredit: number;

  constructor(public _widgetService: ReachProfileDetailsWidget,
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
          this._remainingCredit = this._currentProfile.credit['credit'] !== -9999 ? parseFloat((this._currentProfile.credit['credit'] - this._currentProfile.usedCredit).toFixed(2)) : -9999;
        });
  }

  ngOnDestroy() {
    this._widgetService.detachForm();
  }
}

