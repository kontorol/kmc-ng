import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReachProfileStore } from '../reach-profile-store.service';
import { cancelOnDestroy } from '@kontorol-ng/kontorol-common';
import { KontorolReachProfile } from "kontorol-ngx-client";
import { ReachProfileDictionaryWidget } from "./reach-profile-dictionary-widget.service";

@Component({
    selector: 'kReachProfileDictionary',
    templateUrl: './reach-profile-dictionary.component.html',
    styleUrls: ['./reach-profile-dictionary.component.scss']
})
export class ReachProfileDictionaryComponent implements OnInit, OnDestroy {
    public _currentProfile: KontorolReachProfile;
    
    constructor(public _widgetService: ReachProfileDictionaryWidget,
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

