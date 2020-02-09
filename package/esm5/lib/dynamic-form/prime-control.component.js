/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DatePickerControl, DynamicDropdownControl, DynamicFormControlBase, ListControl } from '@kaltura-ng/kaltura-ui';
import { cancelOnDestroy } from '@kaltura-ng/kaltura-common';
var PrimeControl = /** @class */ (function () {
    function PrimeControl() {
        this.errorMsg = '';
    }
    Object.defineProperty(PrimeControl.prototype, "isValid", {
        get: /**
         * @return {?}
         */
        function () {
            return this.form.controls[this.control.key].valid;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PrimeControl.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!this.isValid) {
            this.errorMsg = this.getErrorMsg();
        }
        else {
            this.errorMsg = '';
        }
        this.onFormStatusChanges();
    };
    /**
     * @param {?} control
     * @return {?}
     */
    PrimeControl.prototype.asDatePickerControl = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        return (control instanceof DatePickerControl) ? control : null;
    };
    /**
     * @param {?} control
     * @return {?}
     */
    PrimeControl.prototype.asDynamicDropdownControl = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        return (control instanceof DynamicDropdownControl) ? control : null;
    };
    /**
     * @param {?} control
     * @return {?}
     */
    PrimeControl.prototype.asListControl = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        return (control instanceof ListControl) ? control : null;
    };
    /**
     * @private
     * @return {?}
     */
    PrimeControl.prototype.onFormStatusChanges = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.form.statusChanges
            .pipe(cancelOnDestroy(this))
            .subscribe(function () {
            if (!_this.isValid) {
                _this.errorMsg = _this.getErrorMsg();
            }
            else {
                _this.errorMsg = '';
            }
        });
    };
    /**
     * @private
     * @return {?}
     */
    PrimeControl.prototype.getErrorMsg = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var result = "";
        /** @type {?} */
        var formControl = this.form.controls[this.control.key];
        if (this.control.errors && !formControl.valid) {
            /** @type {?} */
            var firstErrorKey = Object.keys(this.control.errors).find(function (errorKey) {
                return formControl.hasError(errorKey);
            });
            if (firstErrorKey) {
                result = this.control.errors[firstErrorKey];
            }
        }
        return result;
    };
    /**
     * @return {?}
     */
    PrimeControl.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
    };
    PrimeControl.decorators = [
        { type: Component, args: [{
                    selector: 'k-prime-control',
                    template: "<div [formGroup]=\"form\" [ngSwitch]=\"control.controlType\">\n    <textarea  *ngSwitchCase=\"'TextArea'\" [formControlName]=\"control.key\"   [class.hasError]=\"errorMsg && form.controls[control.key].touched\" pInputTextarea ></textarea>\n\n    <input *ngSwitchCase=\"'Textbox'\" [formControlName]=\"control.key\"  [class.hasError]=\"errorMsg && form.controls[control.key].touched\" pInputText/>\n\n    <input *ngSwitchCase=\"'Number'\"  type=\"number\" [formControlName]=\"control.key\"  [class.hasError]=\"errorMsg && form.controls[control.key].touched\" pInputText />\n\n    <p-dropdown *ngSwitchCase=\"'Dropdown'\" [filter]=\"true\" [formControlName]=\"control.key\"  [options]=\"asDynamicDropdownControl(control).values | kPrimeListOptions: true\"></p-dropdown>\n\n    <kMultiSelect *ngSwitchCase=\"'List'\" [resetFilterOnHide]=\"true\" [formControlName]=\"control.key\"  [options]=\"asListControl(control).values | kPrimeListOptions : false\"></kMultiSelect>\n\n    <p-calendar *ngSwitchCase=\"'DatePicker'\" [formControlName]=\"control.key\"   icon=\"kIconcalendar\" [showIcon]=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" [showTime]=\"asDatePickerControl(control).showTime\" yearRange=\"2005:2050\" [dateFormat]=\"asDatePickerControl(control).dateFormat\"></p-calendar>\n\n    <p-inputSwitch  *ngSwitchCase=\"'Switch'\" [formControlName]=\"control.key\"> </p-inputSwitch>\n\n    <span *ngSwitchDefault=\"\">Missing control for {{control.controlType}}</span>\n\n    <p *ngIf=\"errorMsg && form.controls[control.key].touched\"\n       class=\"kFormError\">{{errorMsg}}\n    </p>\n</div>\n",
                    styles: [""]
                },] },
    ];
    PrimeControl.propDecorators = {
        control: [{ type: Input }],
        form: [{ type: Input }]
    };
    return PrimeControl;
}());
export { PrimeControl };
if (false) {
    /** @type {?} */
    PrimeControl.prototype.control;
    /** @type {?} */
    PrimeControl.prototype.form;
    /** @type {?} */
    PrimeControl.prototype.errorMsg;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbWUtY29udHJvbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2FsdHVyYS1uZy9rYWx0dXJhLXByaW1lbmctdWkvIiwic291cmNlcyI6WyJsaWIvZHluYW1pYy1mb3JtL3ByaW1lLWNvbnRyb2wuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBb0IsTUFBTSxlQUFlLENBQUM7QUFDbEUsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxzQkFBc0IsRUFBRSxzQkFBc0IsRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN4SCxPQUFPLEVBQUUsZUFBZSxFQUFPLE1BQU0sNEJBQTRCLENBQUM7QUFFbEU7SUFBQTtRQThCVyxhQUFRLEdBQUcsRUFBRSxDQUFDO0lBNER6QixDQUFDO0lBMURHLHNCQUFJLGlDQUFPOzs7O1FBQVg7WUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3RELENBQUM7OztPQUFBOzs7O0lBRUQsK0JBQVE7OztJQUFSO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QzthQUNJO1lBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7U0FDdEI7UUFFRCxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUUvQixDQUFDOzs7OztJQUVILDBDQUFtQjs7OztJQUFuQixVQUFxQixPQUFZO1FBQy9CLE9BQU8sQ0FBQyxPQUFPLFlBQVksaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDakUsQ0FBQzs7Ozs7SUFFRCwrQ0FBd0I7Ozs7SUFBeEIsVUFBMEIsT0FBWTtRQUNwQyxPQUFPLENBQUMsT0FBTyxZQUFZLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3RFLENBQUM7Ozs7O0lBRUQsb0NBQWE7Ozs7SUFBYixVQUFlLE9BQVk7UUFDekIsT0FBTyxDQUFDLE9BQU8sWUFBWSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDM0QsQ0FBQzs7Ozs7SUFFUywwQ0FBbUI7Ozs7SUFBM0I7UUFBQSxpQkFXQztRQVZHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYTthQUNsQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzNCLFNBQVMsQ0FBQztZQUNQLElBQUksQ0FBQyxLQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNmLEtBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3RDO2lCQUNJO2dCQUNELEtBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO2FBQ3RCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDOzs7OztJQUVPLGtDQUFXOzs7O0lBQW5COztZQUNRLE1BQU0sR0FBRyxFQUFFOztZQUNULFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUN4RCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRTs7Z0JBQ3JDLGFBQWEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsUUFBUTtnQkFDaEUsT0FBQSxXQUFXLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztZQUE5QixDQUE4QixDQUFDO1lBRW5DLElBQUksYUFBYSxFQUFFO2dCQUNmLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUMvQztTQUNKO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQzs7OztJQUVELGtDQUFXOzs7SUFBWDtJQUVBLENBQUM7O2dCQXpGSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsUUFBUSxFQUFFLDRrREFxQmI7b0JBQ0csTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO2lCQUNmOzs7MEJBRUksS0FBSzt1QkFDTCxLQUFLOztJQThEVixtQkFBQztDQUFBLEFBMUZELElBMEZDO1NBaEVZLFlBQVk7OztJQUNyQiwrQkFBOEM7O0lBQzlDLDRCQUF5Qjs7SUFFekIsZ0NBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE9uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Zvcm1Hcm91cH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGF0ZVBpY2tlckNvbnRyb2wsIER5bmFtaWNEcm9wZG93bkNvbnRyb2wsIER5bmFtaWNGb3JtQ29udHJvbEJhc2UsIExpc3RDb250cm9sIH0gZnJvbSAnQGthbHR1cmEtbmcva2FsdHVyYS11aSc7XG5pbXBvcnQgeyBjYW5jZWxPbkRlc3Ryb3ksIHRhZyB9IGZyb20gJ0BrYWx0dXJhLW5nL2thbHR1cmEtY29tbW9uJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdrLXByaW1lLWNvbnRyb2wnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBbZm9ybUdyb3VwXT1cImZvcm1cIiBbbmdTd2l0Y2hdPVwiY29udHJvbC5jb250cm9sVHlwZVwiPlxuICAgIDx0ZXh0YXJlYSAgKm5nU3dpdGNoQ2FzZT1cIidUZXh0QXJlYSdcIiBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wua2V5XCIgICBbY2xhc3MuaGFzRXJyb3JdPVwiZXJyb3JNc2cgJiYgZm9ybS5jb250cm9sc1tjb250cm9sLmtleV0udG91Y2hlZFwiIHBJbnB1dFRleHRhcmVhID48L3RleHRhcmVhPlxuXG4gICAgPGlucHV0ICpuZ1N3aXRjaENhc2U9XCInVGV4dGJveCdcIiBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wua2V5XCIgIFtjbGFzcy5oYXNFcnJvcl09XCJlcnJvck1zZyAmJiBmb3JtLmNvbnRyb2xzW2NvbnRyb2wua2V5XS50b3VjaGVkXCIgcElucHV0VGV4dC8+XG5cbiAgICA8aW5wdXQgKm5nU3dpdGNoQ2FzZT1cIidOdW1iZXInXCIgIHR5cGU9XCJudW1iZXJcIiBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wua2V5XCIgIFtjbGFzcy5oYXNFcnJvcl09XCJlcnJvck1zZyAmJiBmb3JtLmNvbnRyb2xzW2NvbnRyb2wua2V5XS50b3VjaGVkXCIgcElucHV0VGV4dCAvPlxuXG4gICAgPHAtZHJvcGRvd24gKm5nU3dpdGNoQ2FzZT1cIidEcm9wZG93bidcIiBbZmlsdGVyXT1cInRydWVcIiBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wua2V5XCIgIFtvcHRpb25zXT1cImFzRHluYW1pY0Ryb3Bkb3duQ29udHJvbChjb250cm9sKS52YWx1ZXMgfCBrUHJpbWVMaXN0T3B0aW9uczogdHJ1ZVwiPjwvcC1kcm9wZG93bj5cblxuICAgIDxrTXVsdGlTZWxlY3QgKm5nU3dpdGNoQ2FzZT1cIidMaXN0J1wiIFtyZXNldEZpbHRlck9uSGlkZV09XCJ0cnVlXCIgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLmtleVwiICBbb3B0aW9uc109XCJhc0xpc3RDb250cm9sKGNvbnRyb2wpLnZhbHVlcyB8IGtQcmltZUxpc3RPcHRpb25zIDogZmFsc2VcIj48L2tNdWx0aVNlbGVjdD5cblxuICAgIDxwLWNhbGVuZGFyICpuZ1N3aXRjaENhc2U9XCInRGF0ZVBpY2tlcidcIiBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wua2V5XCIgICBpY29uPVwia0ljb25jYWxlbmRhclwiIFtzaG93SWNvbl09XCJ0cnVlXCIgW21vbnRoTmF2aWdhdG9yXT1cInRydWVcIiBbeWVhck5hdmlnYXRvcl09XCJ0cnVlXCIgW3Nob3dUaW1lXT1cImFzRGF0ZVBpY2tlckNvbnRyb2woY29udHJvbCkuc2hvd1RpbWVcIiB5ZWFyUmFuZ2U9XCIyMDA1OjIwNTBcIiBbZGF0ZUZvcm1hdF09XCJhc0RhdGVQaWNrZXJDb250cm9sKGNvbnRyb2wpLmRhdGVGb3JtYXRcIj48L3AtY2FsZW5kYXI+XG5cbiAgICA8cC1pbnB1dFN3aXRjaCAgKm5nU3dpdGNoQ2FzZT1cIidTd2l0Y2gnXCIgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLmtleVwiPiA8L3AtaW5wdXRTd2l0Y2g+XG5cbiAgICA8c3BhbiAqbmdTd2l0Y2hEZWZhdWx0PVwiXCI+TWlzc2luZyBjb250cm9sIGZvciB7e2NvbnRyb2wuY29udHJvbFR5cGV9fTwvc3Bhbj5cblxuICAgIDxwICpuZ0lmPVwiZXJyb3JNc2cgJiYgZm9ybS5jb250cm9sc1tjb250cm9sLmtleV0udG91Y2hlZFwiXG4gICAgICAgY2xhc3M9XCJrRm9ybUVycm9yXCI+e3tlcnJvck1zZ319XG4gICAgPC9wPlxuPC9kaXY+XG5gLFxuICAgIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBQcmltZUNvbnRyb2wgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KCkgY29udHJvbDogRHluYW1pY0Zvcm1Db250cm9sQmFzZTxhbnk+O1xuICAgIEBJbnB1dCgpIGZvcm06IEZvcm1Hcm91cDtcblxuICAgIHB1YmxpYyBlcnJvck1zZyA9ICcnO1xuXG4gICAgZ2V0IGlzVmFsaWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcm0uY29udHJvbHNbdGhpcy5jb250cm9sLmtleV0udmFsaWQ7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yTXNnID0gdGhpcy5nZXRFcnJvck1zZygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lcnJvck1zZyA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vbkZvcm1TdGF0dXNDaGFuZ2VzKCk7XG5cbiAgICB9XG5cbiAgYXNEYXRlUGlja2VyQ29udHJvbCAoY29udHJvbDogYW55KTogRGF0ZVBpY2tlckNvbnRyb2wge1xuICAgIHJldHVybiAoY29udHJvbCBpbnN0YW5jZW9mIERhdGVQaWNrZXJDb250cm9sKSA/IGNvbnRyb2wgOiBudWxsO1xuICB9XG5cbiAgYXNEeW5hbWljRHJvcGRvd25Db250cm9sIChjb250cm9sOiBhbnkpOiBEeW5hbWljRHJvcGRvd25Db250cm9sIHtcbiAgICByZXR1cm4gKGNvbnRyb2wgaW5zdGFuY2VvZiBEeW5hbWljRHJvcGRvd25Db250cm9sKSA/IGNvbnRyb2wgOiBudWxsO1xuICB9XG5cbiAgYXNMaXN0Q29udHJvbCAoY29udHJvbDogYW55KTogTGlzdENvbnRyb2wge1xuICAgIHJldHVybiAoY29udHJvbCBpbnN0YW5jZW9mIExpc3RDb250cm9sKSA/IGNvbnRyb2wgOiBudWxsO1xuICB9XG5cbiAgICBwcml2YXRlIG9uRm9ybVN0YXR1c0NoYW5nZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZm9ybS5zdGF0dXNDaGFuZ2VzXG4gICAgICAgICAgICAucGlwZShjYW5jZWxPbkRlc3Ryb3kodGhpcykpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yTXNnID0gdGhpcy5nZXRFcnJvck1zZygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvck1zZyA9ICcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RXJyb3JNc2coKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFwiXCI7XG4gICAgICAgIGNvbnN0IGZvcm1Db250cm9sID0gdGhpcy5mb3JtLmNvbnRyb2xzW3RoaXMuY29udHJvbC5rZXldO1xuICAgICAgICBpZiAodGhpcy5jb250cm9sLmVycm9ycyAmJiAhZm9ybUNvbnRyb2wudmFsaWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0RXJyb3JLZXkgPSBPYmplY3Qua2V5cyh0aGlzLmNvbnRyb2wuZXJyb3JzKS5maW5kKGVycm9yS2V5ID0+XG4gICAgICAgICAgICAgICAgZm9ybUNvbnRyb2wuaGFzRXJyb3IoZXJyb3JLZXkpKTtcblxuICAgICAgICAgICAgaWYgKGZpcnN0RXJyb3JLZXkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLmNvbnRyb2wuZXJyb3JzW2ZpcnN0RXJyb3JLZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG5cbiAgICB9XG59XG4iXX0=