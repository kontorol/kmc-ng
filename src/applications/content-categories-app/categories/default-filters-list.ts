import {KontorolPrivacyType} from 'kontorol-ngx-client';
import {KontorolAppearInListType} from 'kontorol-ngx-client';
import {KontorolContributionPolicyType} from 'kontorol-ngx-client';

export interface DefaultFilterList {
  label: string;
  name: string;
  items: { value: string, label: string }[]
}

export const EntitlementsFiltersList: DefaultFilterList[] = [
  {
    name: 'privacyTypes', label: 'All Content Privacy Options',
    items: [
      {value: KontorolPrivacyType.all.toString(), label: 'No Restriction'},
      {value: KontorolPrivacyType.authenticatedUsers.toString(), label: 'Requires Authentication'},
      {value: KontorolPrivacyType.membersOnly.toString(), label: 'Private'}
    ]
  },
  {
    name: 'categoryListing', label: 'All Category Listing Options',
    items: [
      {value: KontorolAppearInListType.partnerOnly.toString(), label: 'No Restriction'},
      {value: KontorolAppearInListType.categoryMembersOnly.toString(), label: 'Private'}
    ]
  },
  {
    name: 'contributionPolicy', label: 'All Contribution Policy Options',
    items: [
      {value: KontorolContributionPolicyType.all.toString(), label: 'No Restriction'},
      {value: KontorolContributionPolicyType.membersWithContributionPermission.toString(), label: 'Private'}
    ]
  },
  {
    name: 'endUserPermissions', label: 'Specific End-User Permissions',
    items: [
      {value: 'has', label: 'Has Specific End-User Permissions'},
      {value: 'no', label: 'No Specific End-User Permissions'}
    ]
  }
];
