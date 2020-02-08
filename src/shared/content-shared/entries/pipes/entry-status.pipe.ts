import { Pipe, PipeTransform } from '@angular/core';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { KontorolEntryStatus } from 'kontorol-ngx-client';
import { KontorolEntryModerationStatus } from 'kontorol-ngx-client';
import { KontorolMediaType } from 'kontorol-ngx-client';
import { KontorolMediaEntry } from 'kontorol-ngx-client';

@Pipe({ name: 'entryStatus' })
export class EntryStatusPipe implements PipeTransform {

  constructor(private appLocalization: AppLocalization) {
  }

  transform(entry: KontorolMediaEntry): string {
    let ret = '';
    const isLive = entry.mediaType === KontorolMediaType.liveStreamFlash ||
      entry.mediaType === KontorolMediaType.liveStreamQuicktime ||
      entry.mediaType === KontorolMediaType.liveStreamRealMedia ||
      entry.mediaType === KontorolMediaType.liveStreamWindowsMedia;
    if (typeof(entry) !== 'undefined' && entry !== null) {
      switch (entry.status.toString()) {
        case KontorolEntryStatus.errorImporting.toString():
          ret = this.appLocalization.get('applications.content.entryStatus.errorImporting');
          break;
        case KontorolEntryStatus.errorConverting.toString():
          ret = this.appLocalization.get('applications.content.entryStatus.errorConverting');
          break;
        case KontorolEntryStatus.scanFailure.toString():
          ret = this.appLocalization.get('applications.content.entryStatus.scanFailure');
          break;
        case KontorolEntryStatus.import.toString():
          if (isLive) {
            ret = this.appLocalization.get('applications.content.entryStatus.provisioning');
          } else {
            ret = this.appLocalization.get('applications.content.entryStatus.import');
          }
          break;
        case KontorolEntryStatus.infected.toString():
          ret = this.appLocalization.get('applications.content.entryStatus.infected');
          break;
        case KontorolEntryStatus.preconvert.toString():
          ret = this.appLocalization.get('applications.content.entryStatus.preconvert');
          break;
        case KontorolEntryStatus.ready.toString():
          ret = this.getReadyState(entry);
          break;
        case KontorolEntryStatus.deleted.toString():
          ret = this.appLocalization.get('applications.content.entryStatus.deleted');
          break;
        case KontorolEntryStatus.pending.toString():
          ret = this.appLocalization.get('applications.content.entryStatus.pending');
          break;
        case KontorolEntryStatus.moderate.toString():
          ret = this.appLocalization.get('applications.content.entryStatus.moderate');
          break;
        case KontorolEntryStatus.blocked.toString():
          ret = this.appLocalization.get('applications.content.entryStatus.blocked');
          break;
        case KontorolEntryStatus.noContent.toString():
          ret = this.appLocalization.get('applications.content.entryStatus.noContent');
          break;
      }
    }
    return ret;
  }

  getReadyState(entry: KontorolMediaEntry) {
    const SCHEDULING_ALL_OR_IN_FRAME = 1;
    const SCHEDULING_BEFORE_FRAME = 2;
    const SCHEDULING_AFTER_FRAME = 3;

    let result = '';
    const time = new Date();
    let schedulingType = 0;

    const undefinedDate = (date) => typeof date === 'undefined' || date < 0;

    if (
      (undefinedDate(entry.startDate) && undefinedDate(entry.endDate)) ||
      (entry.startDate <= time && entry.endDate >= time) ||
      (entry.startDate < time && undefinedDate(entry.endDate)) ||
      (undefinedDate(entry.startDate) && entry.endDate > time)
    ) {
      schedulingType = SCHEDULING_ALL_OR_IN_FRAME;
    } else if (entry.startDate > time) {
      schedulingType = SCHEDULING_BEFORE_FRAME;
    } else if (entry.endDate < time) {
      schedulingType = SCHEDULING_AFTER_FRAME;
    }

    const moderationStatus: number = entry.moderationStatus;
    switch (moderationStatus) {
      case KontorolEntryModerationStatus.approved:
      case KontorolEntryModerationStatus.autoApproved:
      case KontorolEntryModerationStatus.flaggedForReview:
        if (schedulingType === SCHEDULING_ALL_OR_IN_FRAME) {
          result = this.appLocalization.get('applications.content.entryStatus.ready');
        } else if (schedulingType === SCHEDULING_BEFORE_FRAME) {
          result = this.appLocalization.get('applications.content.entryStatus.scheduledStatus');
        } else if (schedulingType === SCHEDULING_AFTER_FRAME) {
          result = this.appLocalization.get('applications.content.entryStatus.finishedStatus');
        }
        break;
      case KontorolEntryModerationStatus.pendingModeration:
        result = this.appLocalization.get('applications.content.entryStatus.pendingStatus');
        break;

      case KontorolEntryModerationStatus.rejected:
        result = this.appLocalization.get('applications.content.entryStatus.rejectedStatus');
        break;

    }
    return result;
  }
}
