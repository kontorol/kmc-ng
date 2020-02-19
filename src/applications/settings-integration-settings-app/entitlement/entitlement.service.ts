import {Injectable, OnDestroy} from '@angular/core';
import {KontorolClient, KontorolMultiRequest} from 'kontorol-ngx-client';
import {KontorolCategory} from 'kontorol-ngx-client';
import { Observable } from 'rxjs';
import {CategoryListAction} from 'kontorol-ngx-client';
import {KontorolCategoryFilter} from 'kontorol-ngx-client';
import {PartnerGetInfoAction} from 'kontorol-ngx-client';
import {KontorolPrivacyType} from 'kontorol-ngx-client';
import {KontorolContributionPolicyType} from 'kontorol-ngx-client';
import {KontorolAppearInListType} from 'kontorol-ngx-client';
import {CategoryUpdateAction} from 'kontorol-ngx-client';
import { CategoryGetAction } from 'kontorol-ngx-client';
import { CategoriesSearchService } from 'app-shared/content-shared/categories/categories-search.service';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { CategoriesGraphUpdatedEvent } from 'app-shared/kmc-shared/app-events/categories-graph-updated/categories-graph-updated';
import { AppEventsService } from 'app-shared/kmc-shared';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';

export interface EntitlementSectionData {
  categories: KontorolCategory[];
  partnerDefaultEntitlementEnforcement: boolean
}

@Injectable()
export class EntitlementService implements OnDestroy{

  constructor(private _kontorolServerClient: KontorolClient, private _appEvents: AppEventsService, private _categoriesSearch: CategoriesSearchService, private _appLocalization: AppLocalization) {
  }

  public getEntitlementsSectionData(): Observable<EntitlementSectionData> {

    const request = new KontorolMultiRequest(
      new PartnerGetInfoAction(),
      new CategoryListAction({
        filter: new KontorolCategoryFilter({
          privacyContextEqual: '*'
        })
      })
    );

    return this._kontorolServerClient.multiRequest(request).pipe(cancelOnDestroy(this)).map(
      response => {
        if (response.hasErrors()) {
          throw new Error('error occurred in action \'getEntitlementsSectionData\'');
        }

        const partnerDefaultEntitlementEnforcement: boolean = response[0].result.defaultEntitlementEnforcement;
        const categories: KontorolCategory[] = response[1].result.objects;
        return {categories, partnerDefaultEntitlementEnforcement};
      }
    );
  }

  public deleteEntitlement({id, privacyContextData}: { id: number, privacyContextData?: { privacyContext: string, privacyContexts: string } }): Observable<void> {
      if (!id) {
          return Observable.throw(new Error('Error occurred while trying to delete entitlement'));
      }

      const category = new KontorolCategory();
      category.privacyContext = null;

      if (privacyContextData !== null && typeof privacyContextData !== "undefined") {
          const context = (privacyContextData && privacyContextData.privacyContext.split(',')) || [];
          const contexts = (privacyContextData && privacyContextData.privacyContexts.split(',')) || [];

          // Subtract privacyContext from privacyContexts and if no contexts left so set the following properties
          if (contexts.length && contexts.filter(c => (context.indexOf(c) < 0)).length) {
              category.privacy = KontorolPrivacyType.all;
              category.appearInList = KontorolAppearInListType.partnerOnly;
              category.contributionPolicy = KontorolContributionPolicyType.all;
          }
      }

      return this._kontorolServerClient.request(new CategoryUpdateAction({
          id,
          category
      }))
          .do(() => {
              this._notifyCategoriesGraphChanges();
          })
          .map(_ => (undefined));
  }

  public addEntitlement({id, privacyContext}: { id: number, privacyContext: string }): Observable<void> {
    if (!id || !privacyContext) {
      return Observable.throw(new Error('Error occurred while trying to add entitlement, invalid entitlement\'s data'));
    }

    return this._categoriesSearch.getCategory(id)
        .switchMap(category =>
        {
            if (category.privacyContext && category.privacyContext.length)
            {
                return Observable.throw(new Error(this._appLocalization.get('applications.settings.integrationSettings.entitlement.editEntitlement.errors.privacyContextLabelExists')));
            }else {

                return this._kontorolServerClient.request(new CategoryUpdateAction({
                    id,
                    category: new KontorolCategory({
                        privacyContext
                    })
                }))
                    .do(() => {
                        this._notifyCategoriesGraphChanges();
                    })
                    .map(_ => (undefined));
            }
        });
  }

  private _notifyCategoriesGraphChanges(): void{
      this._appEvents.publish(new CategoriesGraphUpdatedEvent());
  }

  ngOnDestroy() {
  }

}
