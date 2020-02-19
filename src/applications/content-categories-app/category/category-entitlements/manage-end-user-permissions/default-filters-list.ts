import {KontorolCategoryUserPermissionLevel} from 'kontorol-ngx-client';
import {KontorolUpdateMethodType} from 'kontorol-ngx-client';
import {KontorolCategoryUserStatus} from 'kontorol-ngx-client';

export interface DefaultFilterList {
  label: string;
  name: string;
  items: { value: string, label: string }[]
}

// TODO [kmcng] - add translations to labels
export const DefaultFiltersList: DefaultFilterList[] = [
  {
    name: 'permissionLevels', label: 'Permission Levels',
    items: [
      {
        value: KontorolCategoryUserPermissionLevel.contributor.toString(),
        label: 'Contributor'
      }, {
        value: KontorolCategoryUserPermissionLevel.moderator.toString(),
        label: 'Moderator'
      }, {
        value: KontorolCategoryUserPermissionLevel.member.toString(),
        label: 'Member'
      }, {
        value: KontorolCategoryUserPermissionLevel.manager.toString(),
        label: 'Manager'
      }
    ]
  },
  {
    name: 'status', label: 'Status',
    items: [
      {value: KontorolCategoryUserStatus.active.toString(), label: 'Active'},
      {value: KontorolCategoryUserStatus.notActive.toString(), label: 'Deactivated'}
    ]
  },
  {
    name: 'updateMethod', label: 'Update Method',
    items: [
      {
        value: KontorolUpdateMethodType.manual.toString(),
        label: 'Manual'
      },
      {
        value: KontorolUpdateMethodType.automatic.toString(),
        label: 'Automatic'
      }
    ]
  },
];
