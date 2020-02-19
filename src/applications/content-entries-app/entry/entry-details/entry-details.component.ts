import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { EntryStore } from '../entry-store.service';
import { KontorolMediaEntry } from 'kontorol-ngx-client';
import { KontorolEntryStatus } from 'kontorol-ngx-client';
import { KontorolSourceType } from 'kontorol-ngx-client';
import { KontorolMediaType } from 'kontorol-ngx-client';
import { BrowserService } from 'app-shared/kmc-shell/providers';
import { EntryDetailsWidget } from './entry-details-widget.service';

export interface EntryDetailsKontorolMediaEntry extends KontorolMediaEntry {
  recordedEntryId?: string
}

@Component({
	selector: 'kEntryDetails',
	templateUrl: './entry-details.component.html',
	styleUrls: ['./entry-details.component.scss']
})
export class EntryDetails implements OnInit, OnDestroy {

	public _entryHasContent: boolean = false;
	public _entryReady: boolean = false;
	public _isLive: boolean = false;
	public _isRecordedLive: boolean = false;
	public _hasDuration: boolean = false;
	public _isClip: boolean = false;

	public _currentEntry: EntryDetailsKontorolMediaEntry;

	get currentEntry(): EntryDetailsKontorolMediaEntry {
		return this._currentEntry;
	}



	constructor(public _widgetService: EntryDetailsWidget,
				private browserService: BrowserService,

				public _entryStore: EntryStore) {
	}

	ngOnInit() {
        this._widgetService.attachForm();

		this._widgetService.data$.subscribe(
			data => {
				if (data) {
					this._currentEntry = data;
					this._entryHasContent = this._currentEntry.status.toString() !== KontorolEntryStatus.noContent.toString();
					this._entryReady = this._currentEntry.status.toString() === KontorolEntryStatus.ready.toString();
					const sourceType = this._currentEntry.sourceType.toString();
					this._isLive = (sourceType === KontorolSourceType.liveStream.toString() ||
					sourceType === KontorolSourceType.akamaiLive.toString() ||
					sourceType === KontorolSourceType.akamaiUniversalLive.toString() ||
					sourceType === KontorolSourceType.manualLiveStream.toString());
					this._isRecordedLive = (sourceType === KontorolSourceType.recordedLive.toString());
					this._hasDuration = (this._currentEntry.status !== KontorolEntryStatus.noContent && !this._isLive && this._currentEntry.mediaType.toString() !== KontorolMediaType.image.toString());
					this._isClip = !this._isRecordedLive && (this._currentEntry.id !== this._currentEntry.rootEntryId);
				}
			}
		);
	}

	openPreviewAndEmbed() {
		alert("Open Preview & Embed Window");
	}

	openLandingPage(landingPage: string) {
		this.browserService.openLink(landingPage);
	}

    navigateToEntry(entryId: string): void {
        this._entryStore.openEntry(entryId);
    }

	ngOnDestroy() {
        this._widgetService.detachForm();
	}
}

