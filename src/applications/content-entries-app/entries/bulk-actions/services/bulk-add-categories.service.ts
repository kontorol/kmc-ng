import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KontorolClient } from 'kontorol-ngx-client';

import { KontorolMediaEntry } from 'kontorol-ngx-client';
import { KontorolCategoryEntry } from 'kontorol-ngx-client';
import { BulkActionBaseService } from './bulk-action-base.service';
import { CategoryEntryAddAction } from 'kontorol-ngx-client';
import { CategoryEntryListAction } from 'kontorol-ngx-client';
import { KontorolCategoryEntryFilter } from 'kontorol-ngx-client';
import { CategoryData } from 'app-shared/content-shared/categories/categories-search.service';
import { BrowserService } from 'app-shared/kmc-shell/providers';
import { AppLocalization } from '@kontorol-ng/mc-shared';

@Injectable()
export class BulkAddCategoriesService extends BulkActionBaseService<CategoryData[]> {

  constructor(_kontorolServerClient: KontorolClient,
              private _appLocalization: AppLocalization,
              private _browserService: BrowserService) {
    super(_kontorolServerClient);
  }

  public execute(entries: KontorolMediaEntry[], categories: CategoryData[]): Observable<void> {
    return Observable.create(observer => {
      if (!entries || !entries.length || !categories || !categories.length) {
        observer.error(new Error(this._appLocalization.get('applications.content.bulkActions.noCategoriesOrEntries')));
      }

      // load all category entries so we can check if an entry category already exists and prevent sending it
      const filter = new KontorolCategoryEntryFilter({
        entryIdIn: entries.map(({ id }) => id).join(',')
      });
      this._kontorolServerClient
        .request(new CategoryEntryListAction({ filter }))
        .subscribe(
          response => {
            // got all entry categoriesId - continue with execution
            const entryCategories: KontorolCategoryEntry[] = response.objects;
            const requests: CategoryEntryAddAction[] = [];
            const alreadyAdded: { entryName: string, categoryName: string }[] = [];
            entries.forEach(entry => {
              // add selected categories
              categories.forEach(category => {
                // add the request only if the category entry doesn't exist yet
                if (!this.categoryEntryExists(entry.id, category.id, entryCategories)) {
                  requests.push(new CategoryEntryAddAction({
                    categoryEntry: new KontorolCategoryEntry({
                      entryId: entry.id,
                      categoryId: category.id
                    })
                  }));
                } else {
                  alreadyAdded.push({ entryName: entry.name, categoryName: category.name });
                }
              });
            });

            const notifyAlreadyAdded = () =>
            {
                if (alreadyAdded.length) {
                    const message = alreadyAdded.map(({ entryName, categoryName }) =>
                        this._appLocalization.get(
                            'applications.content.bulkActions.entryAlreadyAssignedToCategory',
                            [entryName, categoryName]
                        )
                    ).join('\n');
                    this._browserService.alert({ header: this._appLocalization.get('app.common.attention'), message });
                }
            };

            if (requests && requests.length) {
              this.transmit(requests, true).subscribe(
                () => {
                  observer.next();
                  observer.complete();
                    notifyAlreadyAdded();
                },
                error => {
                  observer.error(error);
                }
              );
            } else {
              observer.next();
              observer.complete();
                notifyAlreadyAdded();
            }
          },
          error => {
            observer.error(error);
          }
        );
    });
  }

  private categoryEntryExists(entryId: string, categoryId: number, entryCategories: KontorolCategoryEntry[]): boolean {
    return !!entryCategories.find(entryCategory => {
      return entryCategory.categoryId === categoryId && entryCategory.entryId === entryId;
    });
  }

}
