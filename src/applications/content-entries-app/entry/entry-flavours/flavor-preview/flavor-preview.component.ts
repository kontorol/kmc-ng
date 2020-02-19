import { Component, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { PopupWidgetComponent, PopupWidgetStates } from '@kontorol-ng/kontorol-ui';
import { KontorolClient } from 'kontorol-ngx-client';
import { KontorolMediaEntry } from 'kontorol-ngx-client';
import { FlavorAssetGetUrlAction } from 'kontorol-ngx-client';
import { Flavor } from '../flavor';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';

@Component({
	selector: 'kFlavorPreview',
	templateUrl: './flavor-preview.component.html',
	styleUrls: ['./flavor-preview.component.scss']
})
export class FlavorPreview implements AfterViewInit, OnDestroy {

	@Input() currentFlavor: Flavor;
	@Input() currentEntry: KontorolMediaEntry;
	@Input() parentPopupWidget: PopupWidgetComponent;

	private _parentPopupStateChangeSubscribe: ISubscription;
	public _previewSource = "";
	public _loadingError = "";

	constructor(private _kontorolServerClient: KontorolClient) {

	}

	ngAfterViewInit() {
		this._previewSource = "";
		this._loadingError = "";
		if (this.parentPopupWidget) {
			this._parentPopupStateChangeSubscribe = this.parentPopupWidget.state$
				.subscribe(event => {
					if (event.state === PopupWidgetStates.Open) {
						this._kontorolServerClient.request(new FlavorAssetGetUrlAction({
							id: this.currentFlavor.id
						}))
							.pipe(cancelOnDestroy(this))
							.subscribe(
								url => {
									this._previewSource = url;},
								error => {
									this._loadingError = error.message;
								}
							);
					}
					if (event.state === PopupWidgetStates.Close) {
						this._previewSource = "";
					}
				});
		}
	}

	ngOnDestroy() {
		this._parentPopupStateChangeSubscribe.unsubscribe();
	}

}

