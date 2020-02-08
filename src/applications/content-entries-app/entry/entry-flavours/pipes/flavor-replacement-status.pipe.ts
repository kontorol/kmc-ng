import { Pipe, PipeTransform } from '@angular/core';
import { KontorolEntryReplacementStatus } from 'kontorol-ngx-client';
import { AppLocalization } from '@kontorol-ng/mc-shared';

@Pipe({ name: 'kFlavorReplacementStatus' })
export class FlavorReplacementStatusPipe implements PipeTransform {
    constructor(private _appLocalization: AppLocalization) {

    }

    transform(replacementStatus: KontorolEntryReplacementStatus, type: 'icon' | 'label'): string {
        const result = {
            icon: '',
            label: ''
        };

        if (!replacementStatus) {
            return '';
        }

        switch (replacementStatus) {
            case KontorolEntryReplacementStatus.approvedButNotReady:
            case KontorolEntryReplacementStatus.notReadyAndNotApproved:
                result.label = this._appLocalization.get('applications.content.entryDetails.flavours.replaceVideo.replacementStatus.replacementInProcess');
                result.icon = 'kIconsync';
                break;
            case KontorolEntryReplacementStatus.readyButNotApproved:
                result.label = this._appLocalization.get('applications.content.entryDetails.flavours.replaceVideo.replacementStatus.readyForReplacement');
                result.icon = 'kIconcomplete';
                break;
            case KontorolEntryReplacementStatus.failed:
                result.label = this._appLocalization.get('applications.content.entryDetails.flavours.replaceVideo.replacementStatus.replacementFailed');
                result.icon = 'kIconerror';
                break;
            default:
                break;
        }

        return type === 'icon' ? result.icon : result.label;
    }
}
