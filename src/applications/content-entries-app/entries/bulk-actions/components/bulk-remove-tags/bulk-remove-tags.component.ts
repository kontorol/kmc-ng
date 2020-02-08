import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ISubscription} from 'rxjs/Subscription';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import {BrowserService} from 'app-shared/kmc-shell';
import {PopupWidgetComponent, PopupWidgetStates} from '@kontorol-ng/kontorol-ui';
import {KontorolMediaEntry} from 'kontorol-ngx-client';

@Component({
  selector: 'kBulkRemoveTags',
  templateUrl: './bulk-remove-tags.component.html',
  styleUrls: ['./bulk-remove-tags.component.scss']
})
export class BulkRemoveTags implements OnInit, OnDestroy, AfterViewInit {

  @Input() selectedEntries: KontorolMediaEntry[];
  @Input() parentPopupWidget: PopupWidgetComponent;
  @Output() removeTagsChanged = new EventEmitter<string[]>();

  public _loading = false;

  public tags: any[] = [];
  public tagsToRemove: string[] = [];

  private _parentPopupStateChangeSubscribe : ISubscription;
  private _confirmClose: boolean = true;

  constructor(private _appLocalization: AppLocalization, private _browserService: BrowserService) {
  }

  ngOnInit() {
    const tags = [];
    // create unique tags array from all selected entries tags
    this.selectedEntries.forEach(entry => {
      if (entry.tags && entry.tags.length){
        const entryTags = entry.tags.split(',').map(tag => {
          return tag.trim();
        });
        entryTags.forEach(tag => {
          if (tags.indexOf(tag) === -1){
            tags.push(tag);
          }
        });
      }
    });

    this.tags = tags.sort();
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
              if (this.tagsToRemove.length && this._confirmClose){
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

  public _removeTag(user: string) {
    this.tagsToRemove.push(user);
  }

  public _apply(){
    this.removeTagsChanged.emit(this.tagsToRemove);
    this._confirmClose = false;
    this.parentPopupWidget.close();
  }
}

