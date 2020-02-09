import { OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DatePickerControl, DynamicDropdownControl, DynamicFormControlBase, ListControl } from '@kaltura-ng/kaltura-ui';
export declare class PrimeControl implements OnInit, OnDestroy {
    control: DynamicFormControlBase<any>;
    form: FormGroup;
    errorMsg: string;
    readonly isValid: boolean;
    ngOnInit(): void;
    asDatePickerControl(control: any): DatePickerControl;
    asDynamicDropdownControl(control: any): DynamicDropdownControl;
    asListControl(control: any): ListControl;
    private onFormStatusChanges;
    private getErrorMsg;
    ngOnDestroy(): void;
}
