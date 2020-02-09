/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DatePickerControl, DynamicDropdownControl, DynamicFormControlBase, ListControl } from '@kaltura-ng/kaltura-ui';
import { cancelOnDestroy } from '@kaltura-ng/kaltura-common';
export class PrimeControl {
    constructor() {
        this.errorMsg = '';
    }
    /**
     * @return {?}
     */
    get isValid() {
        return this.form.controls[this.control.key].valid;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.isValid) {
            this.errorMsg = this.getErrorMsg();
        }
        else {
            this.errorMsg = '';
        }
        this.onFormStatusChanges();
    }
    /**
     * @param {?} control
     * @return {?}
     */
    asDatePickerControl(control) {
        return (control instanceof DatePickerControl) ? control : null;
    }
    /**
     * @param {?} control
     * @return {?}
     */
    asDynamicDropdownControl(control) {
        return (control instanceof DynamicDropdownControl) ? control : null;
    }
    /**
     * @param {?} control
     * @return {?}
     */
    asListControl(control) {
        return (control instanceof ListControl) ? control : null;
    }
    /**
     * @private
     * @return {?}
     */
    onFormStatusChanges() {
        this.form.statusChanges
            .pipe(cancelOnDestroy(this))
            .subscribe(() => {
            if (!this.isValid) {
                this.errorMsg = this.getErrorMsg();
            }
            else {
                this.errorMsg = '';
            }
        });
    }
    /**
     * @private
     * @return {?}
     */
    getErrorMsg() {
        /** @type {?} */
        let result = "";
        /** @type {?} */
        const formControl = this.form.controls[this.control.key];
        if (this.control.errors && !formControl.valid) {
            /** @type {?} */
            const firstErrorKey = Object.keys(this.control.errors).find(errorKey => formControl.hasError(errorKey));
            if (firstErrorKey) {
                result = this.control.errors[firstErrorKey];
            }
        }
        return result;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
    }
}
PrimeControl.decorators = [
    { type: Component, args: [{
                selector: 'k-prime-control',
                template: `<div [formGroup]="form" [ngSwitch]="control.controlType">
    <textarea  *ngSwitchCase="'TextArea'" [formControlName]="control.key"   [class.hasError]="errorMsg && form.controls[control.key].touched" pInputTextarea ></textarea>

    <input *ngSwitchCase="'Textbox'" [formControlName]="control.key"  [class.hasError]="errorMsg && form.controls[control.key].touched" pInputText/>

    <input *ngSwitchCase="'Number'"  type="number" [formControlName]="control.key"  [class.hasError]="errorMsg && form.controls[control.key].touched" pInputText />

    <p-dropdown *ngSwitchCase="'Dropdown'" [filter]="true" [formControlName]="control.key"  [options]="asDynamicDropdownControl(control).values | kPrimeListOptions: true"></p-dropdown>

    <kMultiSelect *ngSwitchCase="'List'" [resetFilterOnHide]="true" [formControlName]="control.key"  [options]="asListControl(control).values | kPrimeListOptions : false"></kMultiSelect>

    <p-calendar *ngSwitchCase="'DatePicker'" [formControlName]="control.key"   icon="kIconcalendar" [showIcon]="true" [monthNavigator]="true" [yearNavigator]="true" [showTime]="asDatePickerControl(control).showTime" yearRange="2005:2050" [dateFormat]="asDatePickerControl(control).dateFormat"></p-calendar>

    <p-inputSwitch  *ngSwitchCase="'Switch'" [formControlName]="control.key"> </p-inputSwitch>

    <span *ngSwitchDefault="">Missing control for {{control.controlType}}</span>

    <p *ngIf="errorMsg && form.controls[control.key].touched"
       class="kFormError">{{errorMsg}}
    </p>
</div>
`,
                styles: [``]
            },] },
];
PrimeControl.propDecorators = {
    control: [{ type: Input }],
    form: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    PrimeControl.prototype.control;
    /** @type {?} */
    PrimeControl.prototype.form;
    /** @type {?} */
    PrimeControl.prototype.errorMsg;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbWUtY29udHJvbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2FsdHVyYS1uZy9rYWx0dXJhLXByaW1lbmctdWkvIiwic291cmNlcyI6WyJsaWIvZHluYW1pYy1mb3JtL3ByaW1lLWNvbnRyb2wuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBb0IsTUFBTSxlQUFlLENBQUM7QUFDbEUsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxzQkFBc0IsRUFBRSxzQkFBc0IsRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN4SCxPQUFPLEVBQUUsZUFBZSxFQUFPLE1BQU0sNEJBQTRCLENBQUM7QUE0QmxFLE1BQU0sT0FBTyxZQUFZO0lBMUJ6QjtRQThCVyxhQUFRLEdBQUcsRUFBRSxDQUFDO0lBNER6QixDQUFDOzs7O0lBMURHLElBQUksT0FBTztRQUNQLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDdEQsQ0FBQzs7OztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNmLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3RDO2FBQ0k7WUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztTQUN0QjtRQUVELElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBRS9CLENBQUM7Ozs7O0lBRUgsbUJBQW1CLENBQUUsT0FBWTtRQUMvQixPQUFPLENBQUMsT0FBTyxZQUFZLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ2pFLENBQUM7Ozs7O0lBRUQsd0JBQXdCLENBQUUsT0FBWTtRQUNwQyxPQUFPLENBQUMsT0FBTyxZQUFZLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3RFLENBQUM7Ozs7O0lBRUQsYUFBYSxDQUFFLE9BQVk7UUFDekIsT0FBTyxDQUFDLE9BQU8sWUFBWSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDM0QsQ0FBQzs7Ozs7SUFFUyxtQkFBbUI7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhO2FBQ2xCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDM0IsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNmLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3RDO2lCQUNJO2dCQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO2FBQ3RCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDOzs7OztJQUVPLFdBQVc7O1lBQ1gsTUFBTSxHQUFHLEVBQUU7O2NBQ1QsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQ3hELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFOztrQkFDckMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FDbkUsV0FBVyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUVuQyxJQUFJLGFBQWEsRUFBRTtnQkFDZixNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDL0M7U0FDSjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7Ozs7SUFFRCxXQUFXO0lBRVgsQ0FBQzs7O1lBekZKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXFCYjtnQkFDRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDZjs7O3NCQUVJLEtBQUs7bUJBQ0wsS0FBSzs7OztJQUROLCtCQUE4Qzs7SUFDOUMsNEJBQXlCOztJQUV6QixnQ0FBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT25EZXN0cm95fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Rm9ybUdyb3VwfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEYXRlUGlja2VyQ29udHJvbCwgRHluYW1pY0Ryb3Bkb3duQ29udHJvbCwgRHluYW1pY0Zvcm1Db250cm9sQmFzZSwgTGlzdENvbnRyb2wgfSBmcm9tICdAa2FsdHVyYS1uZy9rYWx0dXJhLXVpJztcbmltcG9ydCB7IGNhbmNlbE9uRGVzdHJveSwgdGFnIH0gZnJvbSAnQGthbHR1cmEtbmcva2FsdHVyYS1jb21tb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2stcHJpbWUtY29udHJvbCcsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IFtmb3JtR3JvdXBdPVwiZm9ybVwiIFtuZ1N3aXRjaF09XCJjb250cm9sLmNvbnRyb2xUeXBlXCI+XG4gICAgPHRleHRhcmVhICAqbmdTd2l0Y2hDYXNlPVwiJ1RleHRBcmVhJ1wiIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5rZXlcIiAgIFtjbGFzcy5oYXNFcnJvcl09XCJlcnJvck1zZyAmJiBmb3JtLmNvbnRyb2xzW2NvbnRyb2wua2V5XS50b3VjaGVkXCIgcElucHV0VGV4dGFyZWEgPjwvdGV4dGFyZWE+XG5cbiAgICA8aW5wdXQgKm5nU3dpdGNoQ2FzZT1cIidUZXh0Ym94J1wiIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5rZXlcIiAgW2NsYXNzLmhhc0Vycm9yXT1cImVycm9yTXNnICYmIGZvcm0uY29udHJvbHNbY29udHJvbC5rZXldLnRvdWNoZWRcIiBwSW5wdXRUZXh0Lz5cblxuICAgIDxpbnB1dCAqbmdTd2l0Y2hDYXNlPVwiJ051bWJlcidcIiAgdHlwZT1cIm51bWJlclwiIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5rZXlcIiAgW2NsYXNzLmhhc0Vycm9yXT1cImVycm9yTXNnICYmIGZvcm0uY29udHJvbHNbY29udHJvbC5rZXldLnRvdWNoZWRcIiBwSW5wdXRUZXh0IC8+XG5cbiAgICA8cC1kcm9wZG93biAqbmdTd2l0Y2hDYXNlPVwiJ0Ryb3Bkb3duJ1wiIFtmaWx0ZXJdPVwidHJ1ZVwiIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5rZXlcIiAgW29wdGlvbnNdPVwiYXNEeW5hbWljRHJvcGRvd25Db250cm9sKGNvbnRyb2wpLnZhbHVlcyB8IGtQcmltZUxpc3RPcHRpb25zOiB0cnVlXCI+PC9wLWRyb3Bkb3duPlxuXG4gICAgPGtNdWx0aVNlbGVjdCAqbmdTd2l0Y2hDYXNlPVwiJ0xpc3QnXCIgW3Jlc2V0RmlsdGVyT25IaWRlXT1cInRydWVcIiBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wua2V5XCIgIFtvcHRpb25zXT1cImFzTGlzdENvbnRyb2woY29udHJvbCkudmFsdWVzIHwga1ByaW1lTGlzdE9wdGlvbnMgOiBmYWxzZVwiPjwva011bHRpU2VsZWN0PlxuXG4gICAgPHAtY2FsZW5kYXIgKm5nU3dpdGNoQ2FzZT1cIidEYXRlUGlja2VyJ1wiIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5rZXlcIiAgIGljb249XCJrSWNvbmNhbGVuZGFyXCIgW3Nob3dJY29uXT1cInRydWVcIiBbbW9udGhOYXZpZ2F0b3JdPVwidHJ1ZVwiIFt5ZWFyTmF2aWdhdG9yXT1cInRydWVcIiBbc2hvd1RpbWVdPVwiYXNEYXRlUGlja2VyQ29udHJvbChjb250cm9sKS5zaG93VGltZVwiIHllYXJSYW5nZT1cIjIwMDU6MjA1MFwiIFtkYXRlRm9ybWF0XT1cImFzRGF0ZVBpY2tlckNvbnRyb2woY29udHJvbCkuZGF0ZUZvcm1hdFwiPjwvcC1jYWxlbmRhcj5cblxuICAgIDxwLWlucHV0U3dpdGNoICAqbmdTd2l0Y2hDYXNlPVwiJ1N3aXRjaCdcIiBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wua2V5XCI+IDwvcC1pbnB1dFN3aXRjaD5cblxuICAgIDxzcGFuICpuZ1N3aXRjaERlZmF1bHQ9XCJcIj5NaXNzaW5nIGNvbnRyb2wgZm9yIHt7Y29udHJvbC5jb250cm9sVHlwZX19PC9zcGFuPlxuXG4gICAgPHAgKm5nSWY9XCJlcnJvck1zZyAmJiBmb3JtLmNvbnRyb2xzW2NvbnRyb2wua2V5XS50b3VjaGVkXCJcbiAgICAgICBjbGFzcz1cImtGb3JtRXJyb3JcIj57e2Vycm9yTXNnfX1cbiAgICA8L3A+XG48L2Rpdj5cbmAsXG4gICAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIFByaW1lQ29udHJvbCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBASW5wdXQoKSBjb250cm9sOiBEeW5hbWljRm9ybUNvbnRyb2xCYXNlPGFueT47XG4gICAgQElucHV0KCkgZm9ybTogRm9ybUdyb3VwO1xuXG4gICAgcHVibGljIGVycm9yTXNnID0gJyc7XG5cbiAgICBnZXQgaXNWYWxpZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmNvbnRyb2wua2V5XS52YWxpZDtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSB0aGlzLmdldEVycm9yTXNnKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yTXNnID0gJyc7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uRm9ybVN0YXR1c0NoYW5nZXMoKTtcblxuICAgIH1cblxuICBhc0RhdGVQaWNrZXJDb250cm9sIChjb250cm9sOiBhbnkpOiBEYXRlUGlja2VyQ29udHJvbCB7XG4gICAgcmV0dXJuIChjb250cm9sIGluc3RhbmNlb2YgRGF0ZVBpY2tlckNvbnRyb2wpID8gY29udHJvbCA6IG51bGw7XG4gIH1cblxuICBhc0R5bmFtaWNEcm9wZG93bkNvbnRyb2wgKGNvbnRyb2w6IGFueSk6IER5bmFtaWNEcm9wZG93bkNvbnRyb2wge1xuICAgIHJldHVybiAoY29udHJvbCBpbnN0YW5jZW9mIER5bmFtaWNEcm9wZG93bkNvbnRyb2wpID8gY29udHJvbCA6IG51bGw7XG4gIH1cblxuICBhc0xpc3RDb250cm9sIChjb250cm9sOiBhbnkpOiBMaXN0Q29udHJvbCB7XG4gICAgcmV0dXJuIChjb250cm9sIGluc3RhbmNlb2YgTGlzdENvbnRyb2wpID8gY29udHJvbCA6IG51bGw7XG4gIH1cblxuICAgIHByaXZhdGUgb25Gb3JtU3RhdHVzQ2hhbmdlcygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mb3JtLnN0YXR1c0NoYW5nZXNcbiAgICAgICAgICAgIC5waXBlKGNhbmNlbE9uRGVzdHJveSh0aGlzKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSB0aGlzLmdldEVycm9yTXNnKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yTXNnID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRFcnJvck1zZygpOiBzdHJpbmcge1xuICAgICAgICBsZXQgcmVzdWx0ID0gXCJcIjtcbiAgICAgICAgY29uc3QgZm9ybUNvbnRyb2wgPSB0aGlzLmZvcm0uY29udHJvbHNbdGhpcy5jb250cm9sLmtleV07XG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2wuZXJyb3JzICYmICFmb3JtQ29udHJvbC52YWxpZCkge1xuICAgICAgICAgICAgY29uc3QgZmlyc3RFcnJvcktleSA9IE9iamVjdC5rZXlzKHRoaXMuY29udHJvbC5lcnJvcnMpLmZpbmQoZXJyb3JLZXkgPT5cbiAgICAgICAgICAgICAgICBmb3JtQ29udHJvbC5oYXNFcnJvcihlcnJvcktleSkpO1xuXG4gICAgICAgICAgICBpZiAoZmlyc3RFcnJvcktleSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuY29udHJvbC5lcnJvcnNbZmlyc3RFcnJvcktleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcblxuICAgIH1cbn1cbiJdfQ==