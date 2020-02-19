import {Component, OnDestroy, OnInit} from '@angular/core';
import {KontorolCategory} from 'kontorol-ngx-client';
import {CategoryDetailsWidget} from './category-details-widget.service';
import {ActionTypes, CategoryService} from '../category.service';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';

@Component({
  selector: 'kCategoryDetails',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss'],
    providers: [KontorolLogger.createLogger('CategoryDetailsComponent')]
})
export class CategoryDetailsComponent implements OnInit, OnDestroy {
  public _currentCategory: KontorolCategory;
  public _parentCategoryId: number;

  constructor(private _categoryStore: CategoryService,
              private _logger: KontorolLogger,
              public _widgetService: CategoryDetailsWidget) {
  }

  ngOnInit() {
    this._categoryStore.state$
      .pipe(cancelOnDestroy(this))
      .subscribe(
      status => {

        if (status) {
          switch (status.action) {
            case ActionTypes.CategoryLoaded:
              this._currentCategory = this._categoryStore.category;
              this._parentCategoryId = this._currentCategory.parentId;
              break;
            default:
              break;
          }
        }
      },
      error => {
        // TODO [kmcng] navigate to error page
        throw error;
      });
  }


  ngOnDestroy() {
    this._widgetService.detachForm();
  }

  public _onParentClicked(event: any) {
      this._logger.info(`handle navigate to parent category action by user`, { parentCategoryId: this._parentCategoryId });
    this._categoryStore.openCategory(this._parentCategoryId);
  }
}
