import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReachProfileStore } from '../reach-profile-store.service';
import { ReachProfileServiceWidget } from './reach-profile-service-widget.service';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';
import { KontorolReachProfile } from "kontorol-ngx-client";

@Component({
  selector: 'kReachProfileService',
  templateUrl: './reach-profile-service.component.html',
  styleUrls: ['./reach-profile-service.component.scss']
})
export class ReachProfileServiceComponent implements OnInit, OnDestroy {
  public _currentProfile: KontorolReachProfile;

  constructor(public _widgetService: ReachProfileServiceWidget,
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

