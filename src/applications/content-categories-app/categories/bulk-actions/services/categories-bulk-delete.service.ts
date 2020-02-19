import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoriesBulkActionBaseService } from './categories-bulk-action-base.service';
import { KontorolClient, KontorolCategory, CategoryDeleteAction} from 'kontorol-ngx-client';
import { CategoriesGraphUpdatedEvent } from 'app-shared/kmc-shared/app-events/categories-graph-updated/categories-graph-updated';
import { AppEventsService } from 'app-shared/kmc-shared';

@Injectable()
export class CategoriesBulkDeleteService extends CategoriesBulkActionBaseService<void> {

  constructor(_kontorolServerClient: KontorolClient, private _appEvents: AppEventsService) {
    super(_kontorolServerClient);
  }

  public execute(selectedCategories: KontorolCategory[]): Observable<void> {
      const requests = selectedCategories.map(category => new CategoryDeleteAction({ id: category.id }));
      return this.transmit(requests, true)
          .pipe(map(() => {
              this._appEvents.publish(new CategoriesGraphUpdatedEvent());
          }));
  }
}
