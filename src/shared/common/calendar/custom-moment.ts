import * as momentj from 'jalali-moment';
import {LocaleSettings} from "primeng/calendar";

const m = (momentj as any);


export class DateUtil extends m {

    constructor(iYear?: number, iMonth?: number, iDay?: number) {
        if (iYear && (iMonth || iMonth === 0)) {
            if (!isJalali(iYear)) {
                super(new Date(iYear, iMonth, iDay));
            } else {
                const moment = momentj().jYear(iYear).jMonth(iMonth).jDate(iDay).hours(0).minute(0).second(0);
                super(moment.toDate());
                m.jalali = true;
            }

        } else if (iYear) {
            super(new Date(iYear * 1000));
        } else {
            super(new Date());
        }
    }
}

function isJalali(year: number) {
    return year < 1500;
}

m.fn.setD = function (year: number, month: number, date: number): momentj.Moment {
    return this.setFullYear(year).setMonth(month).setDate(date);
}

m.fn.setJalali = function (isJalali: boolean): LocaleSettings {
    m.jalali = isJalali;
    const newLocale = {
        firstDayOfWeek: 0,
        dayNames: ['شنبه', 'یکشنبه', 'دوشنبه ', 'سه شنبه', 'چهارشنبه', 'پنج شنبه', 'جمعه'],
        dayNamesShort: ['شنبه', 'یکشنبه', 'دوشنبه ', 'سه شنبه', 'چهارشنبه', 'پنج شنبه', 'جمعه'],
        dayNamesMin: ['شنبه', 'یکشنبه', 'دوشنبه ', 'سه شنبه', 'چهارشنبه', 'پنج شنبه', 'جمعه'],
        monthNames: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
        monthNamesShort: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
        today: 'امروز',
        clear: 'پاک کردن',
        dateFormat: 'yy/mm/dd'

    };
    return isJalali ? newLocale : null;
};

m.fn.setHours = function (hour: number): momentj.Moment {
    return this.hour(hour);
};

m.fn.getHours = function (): number {
    return this.hour();
};

m.fn.setMinutes = function (minute: number): momentj.Moment {
    return this.minute(minute);
};

m.fn.getMinutes = function (): number {
    return this.minute();
};

m.fn.setSeconds = function (s: number): momentj.Moment {
    return this.second(s);
};

m.fn.getSeconds = function (): number {
    return this.second();
};

m.fn.setDate = function (d: number): momentj.Moment {
    if (m.jalali) {
        return this.jDate(d);
    } else {
        return this.date(d);
    }
};

m.fn.getDate = function (): number {
    if (m.jalali) {
        return this.jDate();
    } else {
        return this.date();
    }
};

m.fn.setDay = function (d: number): momentj.Moment {
    if (m.jalali) {
        return this.jDay(d);
    } else {
        return this.day(d);
    }
};

m.fn.getDay = function (): number {
    if (m.jalali) {
        return this.jDay();
    } else {
        return this.day();
    }
};
m.fn.setMonth = function (d: number): momentj.Moment {
    if (m.jalali) {
        return this.jMonth(d);
    } else {
        return this.month(d);
    }
};

m.fn.getMonth = function (): number {
    if (m.jalali) {
        return this.jMonth();
    } else {
        return this.month();
    }
};

m.fn.getFullYear = function (): number {
    if (m.jalali) {
        return this.jYear();
    } else {
        return this.year();
    }

};
m.fn.setFullYear = function (y: number): momentj.Moment {
    if (m.jalali) {
        return this.jYear(y);
    } else {
        return this.year(y);
    }

};
m.fn.getTime = function (): number {
    return this.unix();
};
m.fn.toDateString = function (): number {
    return this.toString();
};

