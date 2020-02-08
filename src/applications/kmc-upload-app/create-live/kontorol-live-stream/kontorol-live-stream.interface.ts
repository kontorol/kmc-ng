import {KontorolRecordStatus} from 'kontorol-ngx-client';

export interface KontorolLive {
  name: string
  description: string,
  transcodingProfile: number,
  liveDVR: boolean,
  enableRecording: boolean,
  enableRecordingSelectedOption: KontorolRecordStatus,
  previewMode: boolean
}
