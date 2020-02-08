import { Component, OnInit, OnDestroy, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

import { KontorolClient } from 'kontorol-ngx-client';
import { KontorolFilterPager } from 'kontorol-ngx-client';
import { SuggestionsProviderData } from '@kontorol-ng/kontorol-primeng-ui';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { BrowserService } from 'app-shared/kmc-shell';
import { AreaBlockerMessage } from '@kontorol-ng/kontorol-ui';
import { PopupWidgetComponent, PopupWidgetStates } from '@kontorol-ng/kontorol-ui';
import { KontorolUser } from 'kontorol-ngx-client';
import { KontorolUserFilter } from 'kontorol-ngx-client';
import { UserListAction } from 'kontorol-ngx-client';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';

@Component({
  selector: 'kCategoriesBulkChangeOwner',
  templateUrl: './bulk-change-owner.component.html',
  styleUrls: ['./bulk-change-owner.component.scss']
})
export class CategoriesBulkChangeOwner implements OnInit, OnDestroy, AfterViewInit {

  @Input() parentPopupWidget: PopupWidgetComponent;
  @Output() ownerChanged = new EventEmitter<KontorolUser>();

  public _loading = false;
  public _sectionBlockerMessage: AreaBlockerMessage;

  public _usersProvider = new Subject<SuggestionsProviderData>();
  public _owner: KontorolUser = null;

  private _searchUsersSubscription : ISubscription;
  private _parentPopupStateChangeSubscribe : ISubscription;
  private _confirmClose: boolean = true;

  constructor(private _kontorolServerClient: KontorolClient,
              private _appLocalization: AppLocalization,
              private _browserService: BrowserService) {
    this._convertUserInputToValidValue = this._convertUserInputToValidValue.bind(this);
  }

  ngOnInit() {

  }

  ngAfterViewInit(){
    if (this.parentPopupWidget) {
      this._parentPopupStateChangeSubscribe = this.parentPopupWidget.state$
        .subscribe(event => {
          if (event.state === PopupWidgetStates.Open) {
            this._confirmClose = true;
          }
          if (event.state === PopupWidgetStates.BeforeClose) {
            if (event.context && event.context.allowClose){
              if (this._owner && this._confirmClose){
                event.context.allowClose = false;
                this._browserService.confirm(
                  {
                    header: this._appLocalization.get('applications.content.entryDetails.captions.cancelEdit'),
                    message: this._appLocalization.get('applications.content.entryDetails.captions.discard'),
                    accept: () => {
                      this._confirmClose = false;
                      this.parentPopupWidget.close();
                    }
                  }
                );
              }
            }
          }
        });
    }
  }

  ngOnDestroy(){
    this._parentPopupStateChangeSubscribe.unsubscribe();
  }

  public _searchUsers(event) : void {
    this._usersProvider.next({ suggestions : [], isLoading : true});

    if (this._searchUsersSubscription)
    {
      // abort previous request
      this._searchUsersSubscription.unsubscribe();
      this._searchUsersSubscription = null;
    }

    this._searchUsersSubscription = this._kontorolServerClient.request(
      new UserListAction(
        {
          filter: new KontorolUserFilter({
            idOrScreenNameStartsWith : event.query
          }),
          pager: new KontorolFilterPager({
            pageIndex : 0,
            pageSize : 30
          })
        }
      )
    )
      .pipe(cancelOnDestroy(this))
      .subscribe(
        data =>
        {
          const suggestions = [];
          (data.objects || []).forEach((suggestedUser: KontorolUser) => {
              suggestedUser['__tooltip'] = suggestedUser.id;
            suggestions.push({
              name: `${suggestedUser.screenName} (${suggestedUser.id})`,
              item: suggestedUser,
              isSelectable: true
            });
          });
          this._usersProvider.next({suggestions: suggestions, isLoading: false});
        },
        err =>
        {
          this._usersProvider.next({ suggestions : [], isLoading : false, errorMessage : <any>(err.message || err)});
        }
      );
  }

  public _convertUserInputToValidValue(value: string): KontorolUser {
    let result = null;
    const tooltip = this._appLocalization.get('applications.content.entryDetails.users.tooltip', [value]);

    if (value) {
      result = {
        id: value,
        screenName: value,
        __tooltip: tooltip,
        __class: 'userAdded'
      };
    }
    return result;
  }

  public _apply(){
    this.ownerChanged.emit(this._owner);
    this._confirmClose = false;
    this.parentPopupWidget.close();
  }
}

