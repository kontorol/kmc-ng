import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { KontorolLiveStreamEntry } from 'kontorol-ngx-client';
import { ToggleLiveService } from './toggle-live.service';
import { cancelOnDestroy } from '@kontorol-ng/kontorol-common';

@Component({
    selector: 'k-toggle-live-btn',
    templateUrl: './toggle-live.component.html',
    styleUrls: ['./toggle-live.component.scss'],
    providers: [ToggleLiveService],
})
export class ToggleLiveComponent implements OnInit, OnDestroy {
    @Input() entry: KontorolLiveStreamEntry;

    public _isPreview = false;
    public _canToggle$ = this._toggleLiveService.canToggle$;

    constructor(private _toggleLiveService: ToggleLiveService) {
    }

    ngOnInit() {
        if (this.entry) {
            this._toggleLiveService.startPolling(this.entry);

            this._toggleLiveService.isPreview$
                .pipe(cancelOnDestroy(this))
                .subscribe(isPreview => {
                    this._isPreview = isPreview;
                });
        }
    }

    ngOnDestroy(): void {
    }


    public _toggleViewMode(): void {
        this._toggleLiveService.toggle();
    }
}
