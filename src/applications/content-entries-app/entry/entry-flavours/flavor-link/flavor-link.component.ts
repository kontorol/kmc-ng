import { Component, Input, OnDestroy } from '@angular/core';
import { PopupWidgetComponent } from '@kontorol-ng/kontorol-ui';
import { Flavor } from '../flavor';
import { KontorolStorageProfile } from 'kontorol-ngx-client';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';
import { KontorolClient, KontorolMultiRequest } from 'kontorol-ngx-client';
import { KontorolRemoteStorageResource } from 'kontorol-ngx-client';
import { FlavorAssetSetContentAction } from 'kontorol-ngx-client';
import { EntryFlavoursWidget } from '../entry-flavours-widget.service';
import { BrowserService } from 'app-shared/kmc-shell';
import { Observable } from 'rxjs';
import { KontorolFlavorAsset } from 'kontorol-ngx-client';
import { FlavorAssetAddAction } from 'kontorol-ngx-client';
import { KontorolConversionProfileAssetParams } from 'kontorol-ngx-client';
import { KontorolFlavorReadyBehaviorType } from 'kontorol-ngx-client';
import { KontorolAssetParamsOrigin } from 'kontorol-ngx-client';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';

@Component({
    selector: 'kFlavorLink',
    templateUrl: './flavor-link.component.html',
    styleUrls: ['./flavor-link.component.scss'],
    providers: [KontorolLogger.createLogger('FlavorLinkComponent')]
})
export class FlavorLinkComponent implements OnDestroy {
    @Input() flavor: Flavor;
    @Input() storageProfile: KontorolStorageProfile;
    @Input() conversionProfileAsset: KontorolConversionProfileAssetParams;
    @Input() parentPopupWidget: PopupWidgetComponent;

    public _form: FormGroup;
    public _filePathField: AbstractControl;

    constructor(private _appLocalization: AppLocalization,
                private _logger: KontorolLogger,
                private _widgetService: EntryFlavoursWidget,
                private _kontorolClient: KontorolClient,
                private _browserService: BrowserService,
                private _fb: FormBuilder) {
        this._buildForm();
    }

    ngOnDestroy() {
    }

    private _buildForm(): void {
        this._form = this._fb.group({
            filePath: ['', Validators.required]
        });

        this._filePathField = this._form.controls['filePath'];
    }

    private _updateFlavorAction(): Observable<void> {
        this._logger.info(`handle update flavor request`, {
            fileUrl: this._form.value.filePath,
            flavorAssetId: this.flavor.flavorAsset.id
        });
        return this._kontorolClient
            .request(new FlavorAssetSetContentAction({
                id: this.flavor.flavorAsset.id,
                contentResource: new KontorolRemoteStorageResource({
                    url: this._form.value.filePath,
                    storageProfileId: this.storageProfile.id
                })
            }))
            .map(() => {
            });
    }

    private _uploadFlavorAction(): Observable<void> {
        this._logger.info(`handle upload flavor request, create asset and set its content`, {
            fileUrl: this._form.value.filePath,
        });
        const entryId = this._widgetService.data.id;
        const flavorAsset = new KontorolFlavorAsset({ flavorParamsId: this.flavor.flavorParams.id });
        const flavorAssetAddAction = new FlavorAssetAddAction({ entryId, flavorAsset });
        const flavorAssetSetContentAction = new FlavorAssetSetContentAction({
            id: '0',
            contentResource: new KontorolRemoteStorageResource({
                storageProfileId: this.storageProfile.id,
                url: this._form.value.filePath
            })
        }).setDependency(['id', 0, 'id']);

        return this._kontorolClient
            .multiRequest(new KontorolMultiRequest(flavorAssetAddAction, flavorAssetSetContentAction))
            .map(responses => {
                if (responses.hasErrors()) {
                    throw new Error(responses.reduce((acc, val) => `${acc}\n${val.error ? val.error.message : ''}`, ''));
                }
                return undefined;
            });
    }

    private _validate(): boolean {
        const asset = this.conversionProfileAsset;
        if (!asset || asset.readyBehavior !== KontorolFlavorReadyBehaviorType.required || asset.origin !== KontorolAssetParamsOrigin.ingest) {
            return true;
        }

        return asset.assetParamsId === this.flavor.flavorParams.id;
    }

    private _performAction(): void {
        const linkAction = this.flavor.flavorAsset && this.flavor.flavorAsset.id ? this._updateFlavorAction() : this._uploadFlavorAction();
        linkAction
            .pipe(tag('block-shell'))
            .pipe(cancelOnDestroy(this))
            .subscribe(
                () => {
                    this._logger.info(`handle successful link action, reload flavors data`);
                    this.parentPopupWidget.close();
                    this._widgetService.refresh();
                },
                error => {
                    this._logger.warn(`handle failed link action, show alert`, { errorMessage: error.message });
                    this._browserService.alert({
                        header: this._appLocalization.get('app.common.error'),
                        message: error.message,
                        accept: () => {
                            this._logger.info(`user dismissed alert, reload flavors data`);
                            this.parentPopupWidget.close();
                            this._widgetService.refresh();
                        }
                    });
                });
    }

    public _link(): void {
        this._logger.info(`handle link action by user`);
        if (this._form.valid) {
            this._logger.info(`validate asset params`, { asset: this.conversionProfileAsset });
            if (this._validate()) {
                this._performAction();
            } else {
                this._logger.info(`asset params is not valid, show confirmation`);
                this._browserService.confirm({
                    header: this._appLocalization.get('app.common.attention'),
                    message: this._appLocalization.get('applications.content.entryDetails.flavours.link.requiredFlavorsMissing'),
                    accept: () => {
                        this._logger.info(`user confirmed proceed action`);
                        this._performAction();
                    },
                    reject: () => {
                        this._logger.info(`user didn't confirm abort action`);
                    }
                });
            }
        } else {
            this._logger.info(`form is not valid, abort action`);
        }
    }
}

