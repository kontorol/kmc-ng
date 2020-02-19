import {Pipe, PipeTransform} from '@angular/core';
import {KontorolVendorServiceType} from 'kontorol-ngx-client';
import {AppLocalization} from '@kontorol-ng/mc-shared';

@Pipe({name: 'kReachServiceType'})
export class ReachServiceTypePipe implements PipeTransform {
    constructor(private _appLocalization: AppLocalization) {
    }
    
    transform(value: number): string {
        let type = '';
        switch(value){
            case KontorolVendorServiceType.human:
                type = this._appLocalization.get('applications.settings.reach.services.human');
                break;
            case KontorolVendorServiceType.machine:
                type = this._appLocalization.get('applications.settings.reach.services.machine');
                break;
            default:
                type = '';
                break;
        }
        return type;
    }
}
