import { Pipe, PipeTransform } from '@angular/core';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { KontorolPartnerStatus } from 'kontorol-ngx-client';

@Pipe({ name: 'status' })
export class StatusPipe implements PipeTransform {
  constructor(private appLocalization: AppLocalization) {
  }

  transform(value: string): string {
    let userStatus: string = '';

    if (typeof value !== 'undefined' && value !== null) {
      switch (value.toString()) {
        case KontorolPartnerStatus.active.toString():
          userStatus = this.appLocalization.get('applications.content.userStatus.active');
          break;
        case KontorolPartnerStatus.blocked.toString():
          userStatus = this.appLocalization.get('applications.content.userStatus.blocked');
          break;
        case KontorolPartnerStatus.fullBlock.toString():
          userStatus = this.appLocalization.get('applications.content.userStatus.removed');
          break;
      }
    }
    return userStatus;
  }
}
