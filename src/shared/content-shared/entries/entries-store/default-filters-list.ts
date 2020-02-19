import {KontorolEntryStatus } from 'kontorol-ngx-client';

export interface DefaultFilterList {
    label: string;
    name: string;
    items: { value: string, label: string }[];
    value?: any;
}

export const DefaultFiltersList: DefaultFilterList[] = [
  {
    name: 'mediaTypes', label: 'Media Types',
    items: [
      { value: '1', label: 'Video' },
      { value: '2', label: 'Image' },
      { value: '5', label: 'Audio' },
      { value: '201', label: 'Live Stream' }
    ]
  },
    {
        name: 'youtubeVideo',
        label: 'Youtube Video',
        value: true,
        items: []
    },
    {
        name: 'videoQuiz',
        label: 'Video with Quiz',
        value: true,
        items: []
    },
    {
        name: 'ingestionStatuses', label: 'Ingestion Statuses',
        items: [
            { value: KontorolEntryStatus.ready.toString(), label: 'Ready' },
            { value: KontorolEntryStatus.noContent.toString(), label: 'No Media' },
            { value: KontorolEntryStatus.pending.toString(), label: 'Pending' },
            { value: KontorolEntryStatus.import.toString(), label: 'Uploading' },
            { value: KontorolEntryStatus.preconvert.toString(), label: 'Transcoding' },
            { value: [KontorolEntryStatus.errorConverting.toString(), KontorolEntryStatus.errorImporting.toString()].join(','), label: 'Error' }
        ]
    },
    {
        name: 'durations', label: 'Durations',
        items: [
            { value: 'short', label: 'Short (0-4 min.)' },
            { value: 'medium', label: 'Medium (4-20 min.)' },
            { value: 'long', label: 'Long (20+ min.)' }
        ]
    },
    {
        name: 'originalClippedEntries', label: 'Original & Clipped Entries',
        items: [
            { value: '1', label: 'Original Entries' },
            { value: '0', label: 'Clipped Entries' }
        ]
    },
    {
        name: 'timeScheduling', label: 'Time Scheduling',
        items: [
            { value: 'past', label: 'Past Scheduling' },
            { value: 'live', label: 'Live' },
            { value: 'future', label: 'Future Scheduling' },
            { value: 'scheduled', label: 'Scheduled' }
        ]
    },
    {
        name: 'moderationStatuses', label: 'Moderation Statuses',
        items: [
            {value: '2', label: 'Approved'},
            {value: '5', label: 'Flagged for review'},
            {value: '3', label: 'Rejected'},
            {value: '6', label: 'Auto approved'},
            {value: '1', label: 'Pending moderation'}
        ]
    },
    {
        name: 'replacementStatuses', label: 'Replacement Statuses',
        items: [
            {value: '3,1', label: 'Processing new files'},
            {value: '2', label: 'Ready for review'}
        ]
    }
];
