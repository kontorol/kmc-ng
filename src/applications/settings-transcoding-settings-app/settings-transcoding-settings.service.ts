import { Injectable } from '@angular/core';
import { KontorolClient } from 'kontorol-ngx-client';

@Injectable()
export class SettingsTranscodingSettingsService {

  constructor(private _kontorolServerClient: KontorolClient) {
  }
}
