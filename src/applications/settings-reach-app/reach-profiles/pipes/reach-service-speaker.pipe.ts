import {Pipe, PipeTransform} from '@angular/core';
import {KontorolNullableBoolean} from 'kontorol-ngx-client';
import {AppLocalization} from '@kontorol-ng/mc-shared';

@Pipe({name: 'kReachServiceSpeaker'})
export class ReachServiceSpeakerPipe implements PipeTransform {
    constructor(private _appLocalization: AppLocalization) {
    }
    
    transform(value: KontorolNullableBoolean): string {
        let speaker = '';
        switch(value){
            case KontorolNullableBoolean.trueValue:
                speaker = this._appLocalization.get('app.common.yes');
                break;
            case KontorolNullableBoolean.falseValue:
            case KontorolNullableBoolean.nullValue:
                speaker = this._appLocalization.get('app.common.no');
                break;
            default:
                speaker = '';
                break;
        }
        return speaker;
    }
}
