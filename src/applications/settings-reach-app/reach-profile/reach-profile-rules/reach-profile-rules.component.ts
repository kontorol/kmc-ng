import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReachProfileStore } from '../reach-profile-store.service';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';
import { KontorolReachProfile } from "kontorol-ngx-client";
import { ReachProfileRulesWidget } from "./reach-profile-rules-widget.service";

@Component({
  selector: 'kReachProfileRules',
  templateUrl: './reach-profile-rules.component.html',
  styleUrls: ['./reach-profile-rules.component.scss']
})
export class ReachProfileRulesComponent implements OnInit, OnDestroy {
  public _currentProfile: KontorolReachProfile;

  constructor(public _widgetService: ReachProfileRulesWidget,
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
        });
  }

  ngOnDestroy() {
    this._widgetService.detachForm();
  }
}

