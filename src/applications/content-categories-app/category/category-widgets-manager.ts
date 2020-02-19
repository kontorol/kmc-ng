import { KontorolCategory } from 'kontorol-ngx-client';
import { Injectable } from '@angular/core';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';
import { WidgetsManagerBase } from '@kontorol-ng/kontorol-ui'
import { CategoryService } from './category.service';
import { KontorolMultiRequest } from 'kontorol-ngx-client';
import {KontorolLogger} from '@kontorol-ng/kontorol-logger';

@Injectable()
export class CategoryWidgetsManager extends WidgetsManagerBase<KontorolCategory, KontorolMultiRequest>
{
    private _categoryStore: CategoryService;

    constructor(logger: KontorolLogger) {
        super(logger.subLogger('CategoryWidgetsManager'));
    }

    set categoryStore(value: CategoryService) {
        this._categoryStore = value;
    }

    public returnToCategories(): void {
        if (this._categoryStore) {
            this._categoryStore.returnToCategories();
        }
    }
}
