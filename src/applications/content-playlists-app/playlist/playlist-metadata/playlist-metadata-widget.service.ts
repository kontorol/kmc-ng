import { Injectable, OnDestroy } from '@angular/core';
import { KontorolMultiRequest } from 'kontorol-ngx-client';
import { PlaylistWidget } from '../playlist-widget';
import { KontorolPlaylist } from 'kontorol-ngx-client';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TagSearchAction } from 'kontorol-ngx-client';
import { KontorolTagFilter } from 'kontorol-ngx-client';
import { KontorolTaggedObjectType } from 'kontorol-ngx-client';
import { KontorolFilterPager } from 'kontorol-ngx-client';
import { KontorolClient } from 'kontorol-ngx-client';
import { async } from 'rxjs/scheduler/async';
import { KMCPermissions, KMCPermissionsService } from 'app-shared/kmc-shared/kmc-permissions';
import { ContentPlaylistViewSections } from 'app-shared/kmc-shared/kmc-views/details-views';
import {KontorolLogger} from '@kontorol-ng/kontorol-logger';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';

@Injectable()
export class PlaylistMetadataWidget extends PlaylistWidget implements OnDestroy {
  public metadataForm: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private _permissionsService: KMCPermissionsService,
              private _kontorolServerClient: KontorolClient,
              logger: KontorolLogger) {
    super(ContentPlaylistViewSections.Metadata, logger);
    this._buildForm();
  }

  ngOnDestroy() {

  }

  private _buildForm(): void {
    this.metadataForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: '',
      tags: null
    });
  }

  private _monitorFormChanges(): void {
    Observable.merge(this.metadataForm.valueChanges, this.metadataForm.statusChanges)
      .pipe(cancelOnDestroy(this))
        .observeOn(async) // using async scheduler so the form group status/dirty mode will be synchornized
      .subscribe(() => {
          super.updateState({
            isValid: this.metadataForm.status !== 'INVALID',
            isDirty: this.metadataForm.dirty
          });
        }
      );
  }

  protected onValidate(wasActivated: boolean): Observable<{ isValid: boolean }> {
      const name = wasActivated ? this.metadataForm.value.name : this.data.name;
      const hasValue = (name || '').trim() !== '';
      return Observable.of({
          isValid: hasValue
      });
  }

  protected onDataSaving(newData: KontorolPlaylist, request: KontorolMultiRequest): void {
    if (this.wasActivated) {
      const metadataFormValue = this.metadataForm.value;
      newData.name = metadataFormValue.name;
      newData.description = metadataFormValue.description;
      newData.tags = (metadataFormValue.tags || []).join(',');
    } else {
      newData.name = this.data.name;
      newData.description = this.data.description;
      newData.tags = this.data.tags;
    }
  }

  /**
   * Do some cleanups if needed once the section is removed
   */
  protected onReset(): void {
    this.metadataForm.reset();
  }

  protected onActivate(firstTimeActivating: boolean): void {
    this.metadataForm.reset({
      name: this.data.name,
      description: this.data.description,
      tags: this.data.tags ? this.data.tags.split(', ') : null
    });

    if (firstTimeActivating) {
      this._monitorFormChanges();
    }

    if (!this.isNewData && !this._permissionsService.hasPermission(KMCPermissions.PLAYLIST_UPDATE)) {
      this.metadataForm.disable({ emitEvent: false, onlySelf: true });
    }
  }

  public searchTags(text: string): Observable<string[]> {
    return Observable.create(
      observer => {
        const requestSubscription = this._kontorolServerClient.request(
          new TagSearchAction(
            {
              tagFilter: new KontorolTagFilter(
                {
                  tagStartsWith: text,
                  objectTypeEqual: KontorolTaggedObjectType.entry
                }
              ),
              pager: new KontorolFilterPager({
                pageIndex: 0,
                pageSize: 30
              })
            }
          )
        )
          .pipe(cancelOnDestroy(this))
          .subscribe(
            result => {
              const tags = result.objects.map(item => item.tag);
              observer.next(tags);
              observer.complete();
            },
            err => {
              observer.error(err);
            }
          );

        return () => {
          console.log('entryMetadataHandler.searchTags(): cancelled');
          requestSubscription.unsubscribe();
        }
      });
  }

}
