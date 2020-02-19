import { KontorolVendorServiceTurnAroundTime, KontorolVendorServiceType } from 'kontorol-ngx-client';

export const DefaultFiltersList: {
  name: string;
  label: string;
  items: { value: number | string, label: string }[]
}[] = [
  {
    name: 'service',
    label: 'service',
    items: [
      { value: KontorolVendorServiceType.human, label: 'human' },
      { value: KontorolVendorServiceType.machine, label: 'machine' }
    ]
  },
  {
    name: 'tat',
    label: 'tat',
    items: [
      { value: `${KontorolVendorServiceTurnAroundTime.bestEffort}`, label: 'turnAroundTime.bestEffort' },
      { value: `${KontorolVendorServiceTurnAroundTime.eightHours}`, label: 'turnAroundTime.eightHours' },
      { value: `${KontorolVendorServiceTurnAroundTime.fiveDays}`, label: 'turnAroundTime.fiveDays' },
      { value: `${KontorolVendorServiceTurnAroundTime.fortyEightHours}`, label: 'turnAroundTime.fortyEightHours' },
      { value: `${KontorolVendorServiceTurnAroundTime.fourDays}`, label: 'turnAroundTime.fourDays' },
      { value: `${KontorolVendorServiceTurnAroundTime.immediate}`, label: 'turnAroundTime.immediate' },
      { value: `${KontorolVendorServiceTurnAroundTime.sixHours}`, label: 'turnAroundTime.sixHours' },
      { value: `${KontorolVendorServiceTurnAroundTime.tenDays}`, label: 'turnAroundTime.tenDays' },
      { value: `${KontorolVendorServiceTurnAroundTime.thirtyMinutes}`, label: 'turnAroundTime.thirtyMinutes' },
      { value: `${KontorolVendorServiceTurnAroundTime.threeHours}`, label: 'turnAroundTime.threeHours' },
      { value: `${KontorolVendorServiceTurnAroundTime.twelveHours}`, label: 'turnAroundTime.twelveHours' },
      { value: `${KontorolVendorServiceTurnAroundTime.twentyFourHours}`, label: 'turnAroundTime.twentyFourHours' },
      { value: `${KontorolVendorServiceTurnAroundTime.twoHours}`, label: 'turnAroundTime.twoHours' }
    ]
  }
];
