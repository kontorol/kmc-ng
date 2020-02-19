import {Pipe, PipeTransform} from '@angular/core';
import {KontorolVendorServiceTurnAroundTime} from 'kontorol-ngx-client';
import {AppLocalization} from '@kontorol-ng/mc-shared';

@Pipe({name: 'kReachServiceTat'})
export class ReachServiceTatPipe implements PipeTransform {
    constructor(private _appLocalization: AppLocalization) {
    }
    
    transform(value: number): string {
        let tat = '';
        switch(value){
            case KontorolVendorServiceTurnAroundTime.bestEffort:
                tat = this._appLocalization.get('applications.settings.reach.services.turnAroundTime.bestEffort');
                break;
            case KontorolVendorServiceTurnAroundTime.eightHours:
                tat = this._appLocalization.get('applications.settings.reach.services.turnAroundTime.eightHours');
                break;
            case KontorolVendorServiceTurnAroundTime.fiveDays:
                tat = this._appLocalization.get('applications.settings.reach.services.turnAroundTime.fiveDays');
                break;
            case KontorolVendorServiceTurnAroundTime.fortyEightHours:
                tat = this._appLocalization.get('applications.settings.reach.services.turnAroundTime.fortyEightHours');
                break;
            case KontorolVendorServiceTurnAroundTime.fourDays:
                tat = this._appLocalization.get('applications.settings.reach.services.turnAroundTime.fourDays');
                break;
            case KontorolVendorServiceTurnAroundTime.immediate:
                tat = this._appLocalization.get('applications.settings.reach.services.turnAroundTime.immediate');
                break;
            case KontorolVendorServiceTurnAroundTime.sixHours:
                tat = this._appLocalization.get('applications.settings.reach.services.turnAroundTime.sixHours');
                break;
            case KontorolVendorServiceTurnAroundTime.tenDays:
                tat = this._appLocalization.get('applications.settings.reach.services.turnAroundTime.tenDays');
                break;
            case KontorolVendorServiceTurnAroundTime.thirtyMinutes:
                tat = this._appLocalization.get('applications.settings.reach.services.turnAroundTime.thirtyMinutes');
                break;
            case KontorolVendorServiceTurnAroundTime.threeHours:
                tat = this._appLocalization.get('applications.settings.reach.services.turnAroundTime.threeHours');
                break;
            case KontorolVendorServiceTurnAroundTime.twelveHours:
                tat = this._appLocalization.get('applications.settings.reach.services.turnAroundTime.twelveHours');
                break;
            case KontorolVendorServiceTurnAroundTime.twentyFourHours:
                tat = this._appLocalization.get('applications.settings.reach.services.turnAroundTime.twentyFourHours');
                break;
            case KontorolVendorServiceTurnAroundTime.twoHours:
                tat = this._appLocalization.get('applications.settings.reach.services.turnAroundTime.twoHours');
                break;
            default:
                tat = '';
                break;
        }
        return tat;
    }
}
