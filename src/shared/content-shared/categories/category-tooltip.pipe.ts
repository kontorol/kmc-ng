import { Pipe, PipeTransform } from '@angular/core';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { CategoryData } from 'app-shared/content-shared/categories/categories-search.service';
import { KontorolPrivacyType } from 'kontorol-ngx-client';
import { KontorolAppearInListType } from 'kontorol-ngx-client';
import { KontorolContributionPolicyType } from 'kontorol-ngx-client';

@Pipe({ name: 'kCategoryTooltip' })
export class CategoryTooltipPipe implements PipeTransform {
    constructor(private _appLocalization: AppLocalization) {
    }

    transform(category: CategoryData): string {
        if (!category.privacyContexts) {
            return category.fullName;
        }

        let result = `${category.fullName}\n`;

        if (category.privacyContext) {
            const title = this._appLocalization.get('applications.entries.entryMetadata.categoryTooltip.privacyContext');
            result += `${title}: ${category.privacyContext}\n`;
        }

        if (category.privacy) {
            const title = this._appLocalization.get('applications.entries.entryMetadata.categoryTooltip.contentPrivacy');
            let value = '';
            switch (category.privacy) {
                case KontorolPrivacyType.all:
                    value = this._appLocalization.get('applications.entries.entryMetadata.categoryTooltip.noRestriction');
                    break;
                case KontorolPrivacyType.authenticatedUsers:
                    value = this._appLocalization.get('applications.entries.entryMetadata.categoryTooltip.requiresAuth');
                    break;
                case KontorolPrivacyType.membersOnly:
                    value = this._appLocalization.get('applications.entries.entryMetadata.categoryTooltip.noMembers');
                    break;
                default:
                    break;
            }

            if (!!value) {
                result += `${title}: ${value}\n`;
            }
        }

        if (category.appearInList) {
            let value = '';
            let title = this._appLocalization.get('applications.entries.entryMetadata.categoryTooltip.categoryListing');
            switch (category.appearInList) {
                case KontorolAppearInListType.categoryMembersOnly:
                    value = this._appLocalization.get('applications.entries.entryMetadata.categoryTooltip.private');
                    break;
                case KontorolAppearInListType.partnerOnly:
                    value = this._appLocalization.get('applications.entries.entryMetadata.categoryTooltip.noRestriction');
                    break;
                default:
                    break
            }

            if (!!value) {
                result += `${title}: ${value}\n`;
            }

            value = '';
            title = this._appLocalization.get('applications.entries.entryMetadata.categoryTooltip.contributionPolicy');

            switch (category.contributionPolicy) {
                case KontorolContributionPolicyType.all:
                    value = this._appLocalization.get('applications.entries.entryMetadata.categoryTooltip.noRestriction');
                    break;
                case KontorolContributionPolicyType.membersWithContributionPermission:
                    value = this._appLocalization.get('applications.entries.entryMetadata.categoryTooltip.private');
                    break;
                default:
                    break;
            }

            if (!!value) {
                result += `${title}: ${value}\n`;
            }

            if (category.membersCount > 0) {
                result += this._appLocalization.get('applications.entries.entryMetadata.categoryTooltip.specificEndUserPermissions');
            }
        }

        return result;
    }
}
