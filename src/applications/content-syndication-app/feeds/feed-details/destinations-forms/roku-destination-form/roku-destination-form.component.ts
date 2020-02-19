import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {KontorolRokuSyndicationFeed} from 'kontorol-ngx-client';
import { DestinationComponentBase, FeedFormMode } from '../../feed-details.component';
import { KMCPermissions, KMCPermissionsService } from 'app-shared/kmc-shared/kmc-permissions';

@Component({
  selector: 'kRokuDestinationForm',
  templateUrl: './roku-destination-form.component.html',
  styleUrls: ['./roku-destination-form.component.scss'],
  providers: [{provide: DestinationComponentBase, useExisting: RokuDestinationFormComponent}]
})
export class RokuDestinationFormComponent extends DestinationComponentBase implements OnInit, OnDestroy {
  @Input() mode: FeedFormMode;

  @Output()
  onFormStateChanged = new EventEmitter<{ isValid: boolean, isDirty: boolean }>();

  constructor(private _permissionsService: KMCPermissionsService) {
    super();
  }

  ngOnInit() {
    if (this.mode !== 'edit' || this._permissionsService.hasPermission(KMCPermissions.SYNDICATION_UPDATE)) {
      this.onFormStateChanged.emit({
        isValid: true,
        isDirty: false
      });
    }
  }

  ngOnDestroy() {
  }

  public getData(): KontorolRokuSyndicationFeed {
    return new KontorolRokuSyndicationFeed();
  }
}
