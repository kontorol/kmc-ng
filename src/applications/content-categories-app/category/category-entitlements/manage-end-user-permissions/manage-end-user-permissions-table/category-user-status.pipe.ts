import {Pipe, PipeTransform} from '@angular/core';
import {KontorolCategoryUserStatus} from 'kontorol-ngx-client';
import {AppLocalization} from '@kontorol-ng/mc-shared';

@Pipe({ name: 'kCategoryUserStatus' })
export class CategoryUserStatusPipe implements PipeTransform {
  constructor(private appLocalization: AppLocalization) {
  }

  transform(value: KontorolCategoryUserStatus): string {
    switch (value) {
      case KontorolCategoryUserStatus.active:
        return this.appLocalization.get('app.common.yes');
        case KontorolCategoryUserStatus.notActive:
        return this.appLocalization.get('app.common.no');
      case KontorolCategoryUserStatus.pending:
        return this.appLocalization.get('applications.content.categoryDetails.entitlements.usersPermissions.table.pendingApproval');
      default:
        return '';
    }
  }
}
