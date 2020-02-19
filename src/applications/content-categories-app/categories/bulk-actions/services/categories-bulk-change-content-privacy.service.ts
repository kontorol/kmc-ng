import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KontorolClient } from 'kontorol-ngx-client';
import { KontorolUser } from 'kontorol-ngx-client';
import { CategoriesBulkActionBaseService } from "./categories-bulk-action-base.service";
import { CategoryUpdateAction } from 'kontorol-ngx-client';
import { KontorolCategory } from 'kontorol-ngx-client';
import { KontorolPrivacyType } from 'kontorol-ngx-client';

@Injectable()
export class CategoriesBulkChangeContentPrivacyService extends CategoriesBulkActionBaseService<KontorolPrivacyType> {

  constructor(_kontorolServerClient: KontorolClient) {
    super(_kontorolServerClient);
  }

  public execute(selectedCategories: KontorolCategory[], privacyType : KontorolPrivacyType) : Observable<{}>{
    return Observable.create(observer =>{
            let requests: CategoryUpdateAction[] = [];

      selectedCategories.forEach(category => {
        let updatedCategory: KontorolCategory = new KontorolCategory();
        updatedCategory.privacy = privacyType;
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
