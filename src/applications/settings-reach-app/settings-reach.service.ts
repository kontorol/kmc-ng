import { Injectable } from '@angular/core';
import { KontorolClient } from 'kontorol-ngx-client';

@Injectable()
export class SettingsReachService {

  constructor(private _kontorolServerClient: KontorolClient) {
  }
}
