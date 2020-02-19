import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KontorolDistributionProfile } from 'kontorol-ngx-client';
import { KMCPermissions, KMCPermissionsService } from 'app-shared/kmc-shared/kmc-permissions';

@Component({
  selector: 'kEntryUndistributedProfile',
  templateUrl: './undistributed-profile.component.html',
  styleUrls: ['./undistributed-profile.component.scss']
})
export class UndistributedProfileComponent {
  @Input() profile: KontorolDistributionProfile;

  @Output() onExport = new EventEmitter<KontorolDistributionProfile>();

  public _kmcPermissions = KMCPermissions;

  constructor(private _permissionsService: KMCPermissionsService) {

  }

  public _exportProfile(profile: KontorolDistributionProfile): void {
    if (this._permissionsService.hasPermission(KMCPermissions.CONTENT_MANAGE_DISTRIBUTION_WHERE)) {
      this.onExport.emit(profile);
    }
  }
}

