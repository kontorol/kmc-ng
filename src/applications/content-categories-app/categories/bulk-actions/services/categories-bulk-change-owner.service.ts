import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {KontorolClient} from 'kontorol-ngx-client';
import {KontorolUser} from 'kontorol-ngx-client';
import {CategoriesBulkActionBaseService} from './categories-bulk-action-base.service';
import {CategoryUpdateAction} from 'kontorol-ngx-client';
import {KontorolCategory} from 'kontorol-ngx-client';

@Injectable()
export class CategoriesBulkChangeOwnerService extends CategoriesBulkActionBaseService<KontorolUser> {

  constructor(_kontorolServerClient: KontorolClient) {
    super(_kontorolServerClient);
  }

  public execute(selectedCategories: KontorolCategory[], owner: KontorolUser): Observable<{}>{
    return Observable.create(observer => {

      const requests: CategoryUpdateAction[] = [];

      selectedCategories.forEach(category => {
        const updatedCategory: KontorolCategory = new KontorolCategory();
        updatedCategory.owner = owner.id;
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
