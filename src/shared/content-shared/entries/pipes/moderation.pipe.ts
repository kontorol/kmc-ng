import { Pipe, PipeTransform } from '@angular/core';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { KontorolEntryModerationStatus } from 'kontorol-ngx-client';

@Pipe({name: 'kModerationStatus'})
export class ModerationPipe implements PipeTransform {
	constructor(private appLocalization: AppLocalization) {
	}

	transform(value: string): string {
		let moderationStatus: string = "";
		if (value) {
			switch (value.toString()) {
				case KontorolEntryModerationStatus.autoApproved.toString():
					moderationStatus = this.appLocalization.get("applications.content.entryStatus.autoApprovedStatus");
          break;
				case KontorolEntryModerationStatus.flaggedForReview.toString():
					moderationStatus = this.appLocalization.get("applications.content.entryStatus.flaggedStatus");
					break;
				case KontorolEntryModerationStatus.approved.toString():
					moderationStatus = this.appLocalization.get("applications.content.entryStatus.approvedStatus");
					break;
				case KontorolEntryModerationStatus.pendingModeration.toString():
					moderationStatus = this.appLocalization.get("applications.content.entryStatus.pendingStatus");
					break;
				case KontorolEntryModerationStatus.rejected.toString():
					moderationStatus = this.appLocalization.get("applications.content.entryStatus.rejectedStatus");
					break;
			}
		}
		return moderationStatus;
	}
}
