import {Component, OnDestroy, OnInit} from '@angular/core';
import {KontorolCategory} from 'kontorol-ngx-client';
import {CategorySubcategoriesWidget} from './category-subcategories-widget.service';
import {AppLocalization} from '@kontorol-ng/mc-shared';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';

@Component({
  selector: 'kCategorySubcategories',
  templateUrl: './category-subcategories.component.html',
  styleUrls: ['./category-subcategories.component.scss']
})
export class CategorySubcategoriesComponent implements OnInit, OnDestroy {

  public _emptyMessage: string = this._appLocalization.get('applications.content.table.noResults');
  public _selectedSubcategories: KontorolCategory[] = [];
  public _subcategories: KontorolCategory[] = [];
  public _subcategoriesCount: number;

  constructor(public _widgetService: CategorySubcategoriesWidget,
              public _appLocalization: AppLocalization) {
  }

  public rowTrackBy: Function = (index: number, item: any) => {
    return item.id
  };

  ngOnInit() {
    this._widgetService.attachForm();
    this._widgetService.subcategories$
      .pipe(cancelOnDestroy(this))
      .subscribe(subcategories => {
      this._clearSelection();
      this._subcategories = subcategories;
      this._subcategoriesCount = subcategories.length;
    })
  }

  ngOnDestroy() {
    this._widgetService.detachForm();
  }

  public _clearSelection() {
    this._selectedSubcategories = [];
  }

  public _onActionSelected(event: { action: 'delete' | 'moveUp' | 'moveDown', subcategory: KontorolCategory }): void {
    this._clearSelection();
    this._widgetService.onActionSelected(event);
  }

  public _deleteSelected(selectedSubcategories: KontorolCategory[]): void {
    // this._clearSelection();
    this._widgetService.deleteSelectedSubcategories(selectedSubcategories);
  }
}
