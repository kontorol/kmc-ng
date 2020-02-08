import { Injectable, OnDestroy } from '@angular/core';
import { PlaylistWidget } from '../../playlist-widget';
import { Observable } from 'rxjs';
import { FriendlyHashId } from '@kontorol-ng/kontorol-common';
import { KontorolUtils } from '@kontorol-ng/kontorol-common';
import { KontorolClient } from 'kontorol-ngx-client';
import { KontorolPlaylist } from 'kontorol-ngx-client';
import { PlaylistExecuteFromFiltersAction } from 'kontorol-ngx-client';
import { KontorolDetachedResponseProfile } from 'kontorol-ngx-client';
import { KontorolResponseProfileType } from 'kontorol-ngx-client';
import { KontorolPlaylistType } from 'kontorol-ngx-client';
import { KontorolPlayableEntryOrderBy } from 'kontorol-ngx-client';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { PlaylistRule } from './playlist-rule/playlist-rule.interface';
import { ContentPlaylistViewSections } from 'app-shared/kmc-shared/kmc-views/details-views';
import {KontorolLogger} from '@kontorol-ng/kontorol-logger';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';

@Injectable()
export class RuleBasedContentWidget extends PlaylistWidget implements OnDestroy {
  private _selectionIdGenerator = new FriendlyHashId();

  public rules: PlaylistRule[] = [];
  public rulesTotalCount = 0;
  public entriesDuration = 0;
  public entriesTotalCount = 0;

  constructor(private _kontorolClient: KontorolClient, private _appLocalization: AppLocalization, logger: KontorolLogger) {
    super(ContentPlaylistViewSections.ContentRuleBased, logger);
  }

  ngOnDestroy() {
  }

  protected onValidate(wasActivated?: boolean): Observable<{ isValid: boolean }> {
    if (this.data.playlistType === KontorolPlaylistType.dynamic) { // validate only rule-based playlist
      if (this.wasActivated) {
        return Observable.of({ isValid: !!this.rules.length });
      }

      if (this.isNewData && Array.isArray(this.data.filters)) {
        return Observable.of({ isValid: !!this.data.filters.length })
      }

      return Observable.of({ isValid: false });
    }

    return Observable.of({ isValid: true });
  }

  protected onDataSaving(data: KontorolPlaylist): void {
    if (data.playlistType === KontorolPlaylistType.dynamic) { // handle only rule-based playlist
      data.filters = this.rules.map(({ originalFilter }) => originalFilter);
    }
  }

  /**
   * Do some cleanups if needed once the section is removed
   */
  protected onReset(): void {
  }

  protected onActivate(): Observable<{ failed: boolean, error?: Error }> {
    super._showLoader();
    this.rules = [];
    this.rulesTotalCount = 0;
    this.entriesTotalCount = 0;

    const rules = this.data.filters.map(filter => {
      return new PlaylistExecuteFromFiltersAction({
        totalResults: filter.limit,
        filters: [filter]
      }).setRequestOptions({
          responseProfile: new KontorolDetachedResponseProfile({
              type: KontorolResponseProfileType.includeFields,
              fields: 'duration'
          })
      });
    });

    return this._kontorolClient.multiRequest(rules)
      .pipe(cancelOnDestroy(this, this.widgetReset$))
      .map(responses => {
        const responseIncomplete = !Array.isArray(responses)
          || responses.some(response => !!response.error || !Array.isArray(response.result));
        if (responseIncomplete) {
            return {
                failed: true,
                error: new Error(this._appLocalization.get('applications.content.playlistDetails.errors.loadError'))
            }
        }

        responses.forEach(({ result }, index) => {
          const filter = this.data.filters[index];
          const entriesDuration = result.reduce((duration, entry) => duration + entry.duration, 0);

          this.rules.push({
            name: (<any>filter).name,
            orderBy: <KontorolPlayableEntryOrderBy>filter.orderBy,
            limit: filter.limit,
            entriesCount: result.length,
            selectionId: this._selectionIdGenerator.generateUnique(this.rules.map(item => item.selectionId)),
            originalFilter: filter,
            entriesDuration
          });
        });
        this._updateDurationAndCount();
        super._hideLoader();
        return { failed: false };
      })
      .catch(error => {
        super._hideLoader();
        super._showActivationError(error.message);
        return Observable.of({ failed: true, error });
      });
  }

  private _setDirty(): void {
    this.updateState({ isDirty: true });
  }

  private _updateDurationAndCount(): void {
    const { duration, count } = this.rules.reduce((acc, val) => {
      return {
        duration: acc.duration + val.entriesDuration,
        count: acc.count + val.entriesCount
      };
    }, { duration: 0, count: 0 });
    this.entriesDuration = duration;
    this.entriesTotalCount = count;
    this.rulesTotalCount = this.rules.length;
  }

  private _deleteRuleFromPlaylist(rule: PlaylistRule): void {
    const ruleIndex = this.rules.indexOf(rule);

    if (ruleIndex !== -1) {
      this.rules.splice(ruleIndex, 1);
      this._updateDurationAndCount();

      this._setDirty();
    }
  }

  private _moveUpRules(selectedRules: PlaylistRule[]): void {
    if (KontorolUtils.moveUpItems(this.rules, selectedRules)) {
      this._setDirty();
    }
  }

  private _moveDownRules(selectedRules: PlaylistRule[]): void {
    if (KontorolUtils.moveDownItems(this.rules, selectedRules)) {
      this._setDirty();
    }
  }

  public deleteSelectedRules(rules: PlaylistRule[]): void {
    rules.forEach(rule => this._deleteRuleFromPlaylist(rule));
  }

  public onActionSelected({ action, rule }: { action: string, rule: PlaylistRule }): void {
    switch (action) {
      case 'remove':
        this._deleteRuleFromPlaylist(rule);
        break;
      case 'moveUp':
        this._moveUpRules([rule]);
        break;
      case 'moveDown':
        this._moveDownRules([rule]);
        break;
      default:
        break;
    }
  }

  public moveRules({ rules, direction }: { rules: PlaylistRule[], direction: 'up' | 'down' }): void {
    if (direction === 'up') {
      this._moveUpRules(rules);
    } else {
      this._moveDownRules(rules);
    }
  }

  public updateRules(rule: PlaylistRule): void {
    const relevantRuleIndex = this.rules.findIndex(item => item.selectionId === rule.selectionId);
    const isNewRule = relevantRuleIndex === -1;
    if (isNewRule) {
      rule.selectionId = this._selectionIdGenerator.generateUnique(this.rules.map(item => item.selectionId));
      this.rules.push(rule);
    } else {
      this.rules[relevantRuleIndex] = rule;
    }

    this._updateDurationAndCount();
    this._setDirty();
  }
}
