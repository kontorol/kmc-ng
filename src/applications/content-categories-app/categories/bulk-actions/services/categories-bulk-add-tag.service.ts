import { KontorolCategory } from 'kontorol-ngx-client';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KontorolClient } from 'kontorol-ngx-client';
import { CategoriesBulkActionBaseService } from "./categories-bulk-action-base.service";
import { CategoryUpdateAction } from 'kontorol-ngx-client';


@Injectable()
export class CategoriesBulkAddTagsService extends CategoriesBulkActionBaseService<string[]> {

  constructor(_kontorolServerClient: KontorolClient) {
    super(_kontorolServerClient);
  }

  public execute(selectedCategories: KontorolCategory[], tags : string[]) : Observable<{}>{
    return Observable.create(observer =>{

      let requests: CategoryUpdateAction[] = [];

      selectedCategories.forEach(category => {
        let updatedCategory: KontorolCategory = new KontorolCategory();

        // update category tags. trim tags due to legacy KMC bugs
        let categoryTags = [];
        if (category.tags && category.tags.length){
          categoryTags = category.tags.split(",").map(tag => {
            return tag.trim()
          });
        }
        // add selected tags only if unique
        tags.forEach(tag => {
          if (categoryTags.indexOf(tag) === -1){
            categoryTags.push(tag);
          }
        });
        updatedCategory.tags = categoryTags.toString();
        requests.push(new CategoryUpdateAction({
          id: category.id,
          category: updatedCategory
        }));
      });

      this.transmit(requests, true).subscribe(
        result => {
          observer.next({})
          observer.complete();
        },
        error => {
          observer.error({});
        }
      );
    });



  }

}
