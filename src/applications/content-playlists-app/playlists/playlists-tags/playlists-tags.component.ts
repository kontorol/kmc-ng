import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {PlaylistsFilters, PlaylistsStore} from '../playlists-store/playlists-store.service';
import {AppLocalization} from '@kontorol-ng/mc-shared';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';
import { DatePipe } from 'app-shared/kmc-shared/date-format/date.pipe';
import { BrowserService } from 'app-shared/kmc-shell';
export interface TagItem {
  type: string,
  value: any,
  label: string,
  tooltip: string
}

@Component({
  selector: 'k-playlists-tags',
  templateUrl: './playlists-tags.component.html',
  styleUrls: ['./playlists-tags.component.scss']

})
export class PlaylistsTagsComponent implements OnInit, OnDestroy {
  @Output() onTagsChange = new EventEmitter<void>();

  public _filterTags: TagItem[] = [];

  constructor(private _store: PlaylistsStore,
              private _browserService: BrowserService,
              private _appLocalization: AppLocalization) {
  }

  ngOnInit() {
    this._restoreFiltersState();
    this._registerToFilterStoreDataChanges();
  }

  ngOnDestroy() {
  }

  private _restoreFiltersState(): void {
    this._updateComponentState(this._store.cloneFilters(['freeText']));
  }

  private _updateComponentState(updates: Partial<PlaylistsFilters>): void {
    if (typeof updates.createdAt !== 'undefined') {
      this._syncTagOfCreatedAt();
    }

    if (typeof updates.freeText !== 'undefined') {
      this._syncTagOfFreetext();
    }
  }

  private _registerToFilterStoreDataChanges(): void {
    this._store.filtersChange$
      .pipe(cancelOnDestroy(this))
      .subscribe(({ changes }) => {
        this._updateComponentState(changes);
      });
  }

  private _syncTagOfCreatedAt(): void {
    const previousItem = this._filterTags.findIndex(item => item.type === 'createdAt');
    if (previousItem !== -1) {
      this._filterTags.splice(previousItem, 1);
    }

    const {fromDate, toDate} = this._store.cloneFilter('createdAt', {fromDate: null, toDate: null});
    if (fromDate || toDate) {
      let tooltip = '';
      if (fromDate && toDate) {
        tooltip = `${(new DatePipe(this._browserService)).transform(fromDate.getTime(), 'longDateOnly')} - ${(new DatePipe(this._browserService)).transform(toDate.getTime(), 'longDateOnly')}`;
      } else if (fromDate) {
        tooltip = `From ${(new DatePipe(this._browserService)).transform(fromDate.getTime(), 'longDateOnly')}`;
      } else if (toDate) {
        tooltip = `Until ${(new DatePipe(this._browserService)).transform(toDate.getTime(), 'longDateOnly')}`;
      }
      this._filterTags.push({type: 'createdAt', value: null, label: 'Dates', tooltip});
    }
  }

  private _syncTagOfFreetext(): void {
    const previousItem = this._filterTags.findIndex(item => item.type === 'freetext');
    if (previousItem !== -1) {
      this._filterTags.splice(
        previousItem,
        1);
    }

    const currentFreetextValue = this._store.cloneFilter('freeText', null);

    if (currentFreetextValue) {
      this._filterTags.push({
        type: 'freetext',
        value: currentFreetextValue,
        label: currentFreetextValue,
        tooltip: this._appLocalization.get(`applications.content.filters.freeText`)
      });
    }
  }

  public removeTag(tag: any): void {
    if (tag.type === 'createdAt') {
      this._store.filter({ createdAt: { fromDate: null, toDate: null } });
    } else if (tag.type === 'freetext') {
      this._store.filter({ freeText: null })
    }
  }

  public removeAllTags(): void {
    this._store.resetFilters();
  }
}

