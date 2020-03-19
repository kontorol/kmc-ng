import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
import {BrowserService} from 'app-shared/kmc-shell/providers';
import {DateUtil} from "app-shared/common/calendar/custom-moment";

@Pipe({
    name: 'kmcDate'
})
export class DatePipe implements PipeTransform {
    constructor(private _browserService: BrowserService) {

    }

    transform(date: number, format?: string): any {
        if (date) {
            if (!format) {
                format = 'dateAndTime';
            }
            switch (format) {
                case 'dateOnly':
                    format = this._browserService.getCurrentDateFormat(false,true);
                    break;
                case 'timeOnly':
                    format = 'HH:mm';
                    break;
                case 'dateAndTime':
                    format = `${this._browserService.getCurrentDateFormat(false,true)} HH:mm`;
                    break;
                case 'longDateOnly':
                    format = 'MMMM D, YYYY';
                    break;
                default:
                    break;
            }


            let dateUtil = new DateUtil(date / 1000);
          //  dateUtil.setJalali(this._browserService.getFromLocalStorage('kmc_lang') === 'fa');
            return dateUtil.format(format);
        } else {
            return '';
        }
    }
}
