/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, forwardRef, Output, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomHandler } from 'primeng/primeng';
/** @type {?} */
export var SPINNER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return TimeSpinnerComponent; }),
    multi: true
};
var TimeSpinnerComponent = /** @class */ (function () {
    function TimeSpinnerComponent() {
        this.onChange = new EventEmitter();
        this.onFocus = new EventEmitter();
        this.onBlur = new EventEmitter();
        this._allowedKeys = [
            9,
            8,
            37,
            39,
            46 // deleteBtn
        ];
        this._spinKeys = {
            upArrow: 38,
            rightArrow: 39,
            downArrow: 40,
            leftArrow: 37
        };
        this._currentInput = 'minutes';
        this._keyPattern = /[0-9]/;
        this._minutesAsString = '00';
        this._secondsAsString = '00';
        this._minutes = 0;
        this._seconds = 0;
        this._disabled = false;
        this.onModelChange = function () {
        };
        this.onModelTouched = function () {
        };
    }
    /**
     * @private
     * @param {?} event
     * @param {?} dir
     * @return {?}
     */
    TimeSpinnerComponent.prototype._spin = /**
     * @private
     * @param {?} event
     * @param {?} dir
     * @return {?}
     */
    function (event, dir) {
        /** @type {?} */
        var currentValue = this._getCurrentInputValue();
        /** @type {?} */
        var nextValue = currentValue;
        if (currentValue === 0 && dir === -1) {
            nextValue = 59;
        }
        else if (currentValue === 59 && dir === 1) {
            nextValue = 0;
        }
        else {
            nextValue = currentValue + dir;
        }
        this._setCurrentInputValue(nextValue);
        this._formatValue();
        this.onModelChange((this._minutes * 60) + this._seconds);
        this.onChange.emit(event);
    };
    /**
     * @private
     * @return {?}
     */
    TimeSpinnerComponent.prototype._getCurrentInputValue = /**
     * @private
     * @return {?}
     */
    function () {
        if (this._currentInput === 'minutes') {
            return this._minutes;
        }
        else if (this._currentInput === 'seconds') {
            return this._seconds;
        }
        else {
            throw Error('Must not reach this part');
        }
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    TimeSpinnerComponent.prototype._setCurrentInputValue = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this._currentInput === 'minutes') {
            this._minutes = value;
        }
        else if (this._currentInput === 'seconds') {
            this._seconds = value;
        }
        else {
            throw Error('Must not reach this part');
        }
    };
    /**
     * @private
     * @param {?} input
     * @return {?}
     */
    TimeSpinnerComponent.prototype._setValue = /**
     * @private
     * @param {?} input
     * @return {?}
     */
    function (input) {
        /** @type {?} */
        var value = Number(input);
        value = isNaN(value) ? 0 : value;
        if (value > 59) {
            this._setCurrentInputValue(59);
        }
        else if (value < 0) {
            this._setCurrentInputValue(0);
        }
        else {
            this._setCurrentInputValue(value);
        }
    };
    /**
     * @private
     * @return {?}
     */
    TimeSpinnerComponent.prototype._highlightInput = /**
     * @private
     * @return {?}
     */
    function () {
        if (this._currentInput === 'minutes') {
            this.minutesInputField.nativeElement.focus();
            this.minutesInputField.nativeElement.select();
        }
        else if (this._currentInput === 'seconds') {
            this.secondsInputField.nativeElement.focus();
            this.secondsInputField.nativeElement.select();
        }
        else {
            throw Error('Must not reach this part');
        }
    };
    /**
     * @private
     * @return {?}
     */
    TimeSpinnerComponent.prototype._clearTimer = /**
     * @private
     * @return {?}
     */
    function () {
        if (this._timer) {
            clearInterval(this._timer);
        }
    };
    /**
     * @private
     * @param {?} event
     * @param {?} interval
     * @param {?} dir
     * @return {?}
     */
    TimeSpinnerComponent.prototype._repeat = /**
     * @private
     * @param {?} event
     * @param {?} interval
     * @param {?} dir
     * @return {?}
     */
    function (event, interval, dir) {
        var _this = this;
        /** @type {?} */
        var i = interval || 500;
        this._clearTimer();
        this._timer = setTimeout(function () {
            _this._repeat(event, 40, dir);
        }, i);
        this._spin(event, dir);
    };
    /**
     * @private
     * @return {?}
     */
    TimeSpinnerComponent.prototype._formatValue = /**
     * @private
     * @return {?}
     */
    function () {
        if (this._currentInput === 'minutes') {
            this._minutesAsString = this._minutes < 10 ? "0" + this._minutes : String(this._minutes);
            this.minutesInputField.nativeElement.value = this._minutesAsString;
        }
        else if (this._currentInput === 'seconds') {
            this._secondsAsString = this._seconds < 10 ? "0" + this._seconds : String(this._seconds);
            this.secondsInputField.nativeElement.value = this._secondsAsString;
        }
        else {
            throw Error('Must not reach this part');
        }
    };
    /**
     * @private
     * @return {?}
     */
    TimeSpinnerComponent.prototype._setDefaultValues = /**
     * @private
     * @return {?}
     */
    function () {
        this._minutes = 0;
        this._seconds = 0;
        this._secondsAsString = '00';
        this._minutesAsString = '00';
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    TimeSpinnerComponent.prototype._setInitialValues = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._minutes = Math.floor(value / 60);
        this._seconds = value % 60;
        this._minutesAsString = this._minutes < 10 ? "0" + this._minutes : String(this._minutes);
        this.minutesInputField.nativeElement.value = this._minutesAsString;
        this._secondsAsString = this._seconds < 10 ? "0" + this._seconds : String(this._seconds);
        this.secondsInputField.nativeElement.value = this._secondsAsString;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TimeSpinnerComponent.prototype._onInputKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.which === this._spinKeys.upArrow || event.which === this._spinKeys.rightArrow) {
            // increment
            this._spin(event, 1);
            event.preventDefault();
        }
        else if (event.which === this._spinKeys.downArrow || event.which === this._spinKeys.leftArrow) {
            // decrement
            this._spin(event, -1);
            event.preventDefault();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TimeSpinnerComponent.prototype._onInputKeyPress = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var inputChar = String.fromCharCode(event.charCode);
        /** @type {?} */
        var notANumber = !this._keyPattern.test(inputChar);
        /** @type {?} */
        var notAllowedKey = this._allowedKeys.indexOf(event.keyCode) === -1;
        if (notANumber && notAllowedKey) {
            event.preventDefault();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TimeSpinnerComponent.prototype._onInputKeyup = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var inputValue = ((/** @type {?} */ (event.target))).value;
        this._setValue(inputValue);
        this._formatValue();
        this.onModelChange((this._minutes * 60) + this._seconds);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TimeSpinnerComponent.prototype._handleChange = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.onChange.emit(event);
    };
    /**
     * @param {?} event
     * @param {?} input
     * @return {?}
     */
    TimeSpinnerComponent.prototype._onInputFocus = /**
     * @param {?} event
     * @param {?} input
     * @return {?}
     */
    function (event, input) {
        this._currentInput = input;
        this.onFocus.emit(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TimeSpinnerComponent.prototype._onInputBlur = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.onModelTouched();
        this.onBlur.emit(event);
    };
    /**
     * @param {?} event
     * @param {?} dir
     * @return {?}
     */
    TimeSpinnerComponent.prototype._onButtonMousedown = /**
     * @param {?} event
     * @param {?} dir
     * @return {?}
     */
    function (event, dir) {
        if (!this._disabled) {
            this._highlightInput();
            this._repeat(event, null, dir);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TimeSpinnerComponent.prototype._onButtonMouseup = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this._disabled) {
            this._clearTimer();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TimeSpinnerComponent.prototype._onButtonMouseleave = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this._disabled) {
            this._clearTimer();
        }
    };
    /**
     * @param {?} val
     * @return {?}
     */
    TimeSpinnerComponent.prototype.setDisabledState = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        this._disabled = val;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    TimeSpinnerComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (typeof value !== 'number') {
            this._setDefaultValues();
        }
        else {
            this._setInitialValues(value);
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    TimeSpinnerComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onModelChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    TimeSpinnerComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onModelTouched = fn;
    };
    TimeSpinnerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kTimeSpinner',
                    template: "<div class=\"kSpinnerContainer\" [class.ui-state-disabled]=\"_disabled\">\n    <input #minutes\n           class=\"kMinutes\"\n           type=\"text\"\n           maxlength=\"2\"\n           [disabled]=\"_disabled\"\n           [value]=\"_minutesAsString\"\n           (click)=\"minutes.select()\"\n           (keydown)=\"_onInputKeydown($event)\"\n           (keyup)=\"_onInputKeyup($event)\"\n           (keypress)=\"_onInputKeyPress($event)\"\n           (change)=\"_handleChange($event)\"\n           (focus)=\"_onInputFocus($event, 'minutes')\"\n           (blur)=\"_onInputBlur($event)\">\n    <span class=\"kDelimiter\">:</span>\n    <input #seconds class=\"kSeconds\" type=\"text\"\n           [value]=\"_secondsAsString\"\n           [disabled]=\"_disabled\"\n           (click)=\"seconds.select()\"\n           (keydown)=\"_onInputKeydown($event)\"\n           (keyup)=\"_onInputKeyup($event)\"\n           (keypress)=\"_onInputKeyPress($event)\"\n           (change)=\"_handleChange($event)\"\n           (focus)=\"_onInputFocus($event, 'seconds')\"\n           (blur)=\"_onInputBlur($event)\">\n    <button type=\"button\"\n            [ngClass]=\"{'ui-spinner-button ui-spinner-up ui-corner-tr ui-button ui-widget ui-state-default':true,'ui-state-disabled':_disabled}\"\n            [disabled]=\"_disabled\"\n            (mouseleave)=\"_onButtonMouseleave($event)\"\n            (mousedown)=\"_onButtonMousedown($event, 1)\"\n            (mouseup)=\"_onButtonMouseup($event)\">\n        <span class=\"kIcondropdown_arrow_top kSpinnerBtn\"></span>\n    </button>\n    <button type=\"button\"\n            class=\"kSpinDown\"\n            [ngClass]=\"{'ui-spinner-button ui-spinner-down ui-corner-br ui-button ui-widget ui-state-default':true,'ui-state-disabled':_disabled}\"\n            [disabled]=\"_disabled\"\n            (mouseleave)=\"_onButtonMouseleave($event)\"\n            (mousedown)=\"_onButtonMousedown($event, -1)\"\n            (mouseup)=\"_onButtonMouseup($event)\">\n        <span class=\"kIcondropdown_arrow_bottom kSpinnerBtn\"></span>\n    </button>\n</div>\n",
                    styles: [".kSpinnerContainer{background-color:#fff;width:78px;height:16px;display:inline-block;overflow:visible;position:relative;vertical-align:middle;border:1px solid #ccc;border-radius:3px;padding:5px 10px 11px 0}.kSpinnerContainer input{border:0;width:25px;height:18px;font-size:15px;color:#999;font-weight:100}.kSpinnerContainer input:focus{outline:0}.kSpinnerContainer .kDelimiter{color:#999;font-weight:100}.kSpinnerContainer .kMinutes{text-align:right}.kSpinnerContainer .kSpinnerBtn{font-size:10px;color:#333}.kSpinnerContainer .ui-state-disabled{opacity:.35;filter:Alpha(Opacity=35);background-image:none;cursor:default!important}.kSpinnerContainer .ui-spinner-button{border:0;margin-right:1px;height:14px;cursor:pointer}.kSpinnerContainer .ui-spinner-down{margin-bottom:5px}"],
                    providers: [DomHandler, SPINNER_VALUE_ACCESSOR],
                },] },
    ];
    TimeSpinnerComponent.propDecorators = {
        minutesInputField: [{ type: ViewChild, args: ['minutes',] }],
        secondsInputField: [{ type: ViewChild, args: ['seconds',] }],
        onChange: [{ type: Output }],
        onFocus: [{ type: Output }],
        onBlur: [{ type: Output }]
    };
    return TimeSpinnerComponent;
}());
export { TimeSpinnerComponent };
if (false) {
    /** @type {?} */
    TimeSpinnerComponent.prototype.minutesInputField;
    /** @type {?} */
    TimeSpinnerComponent.prototype.secondsInputField;
    /** @type {?} */
    TimeSpinnerComponent.prototype.onChange;
    /** @type {?} */
    TimeSpinnerComponent.prototype.onFocus;
    /** @type {?} */
    TimeSpinnerComponent.prototype.onBlur;
    /**
     * @type {?}
     * @private
     */
    TimeSpinnerComponent.prototype._allowedKeys;
    /**
     * @type {?}
     * @private
     */
    TimeSpinnerComponent.prototype._spinKeys;
    /**
     * @type {?}
     * @private
     */
    TimeSpinnerComponent.prototype._currentInput;
    /**
     * @type {?}
     * @private
     */
    TimeSpinnerComponent.prototype._keyPattern;
    /**
     * @type {?}
     * @private
     */
    TimeSpinnerComponent.prototype._timer;
    /** @type {?} */
    TimeSpinnerComponent.prototype._minutesAsString;
    /** @type {?} */
    TimeSpinnerComponent.prototype._secondsAsString;
    /** @type {?} */
    TimeSpinnerComponent.prototype._minutes;
    /** @type {?} */
    TimeSpinnerComponent.prototype._seconds;
    /** @type {?} */
    TimeSpinnerComponent.prototype._disabled;
    /** @type {?} */
    TimeSpinnerComponent.prototype.onModelChange;
    /** @type {?} */
    TimeSpinnerComponent.prototype.onModelTouched;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1zcGlubmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrYWx0dXJhLW5nL2thbHR1cmEtcHJpbWVuZy11aS8iLCJzb3VyY2VzIjpbImxpYi90aW1lLXNwaW5uZXIvdGltZS1zcGlubmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25HLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBSTdDLE1BQU0sS0FBTyxzQkFBc0IsR0FBUTtJQUN6QyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLG9CQUFvQixFQUFwQixDQUFvQixDQUFDO0lBQ25ELEtBQUssRUFBRSxJQUFJO0NBQ1o7QUFFRDtJQUFBO1FBcURZLGFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNqRCxZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDaEQsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWpELGlCQUFZLEdBQUc7WUFDckIsQ0FBQztZQUNELENBQUM7WUFDRCxFQUFFO1lBQ0YsRUFBRTtZQUNGLEVBQUUsQ0FBRSxZQUFZO1NBQ2pCLENBQUM7UUFDTSxjQUFTLEdBQUc7WUFDbEIsT0FBTyxFQUFFLEVBQUU7WUFDWCxVQUFVLEVBQUUsRUFBRTtZQUNkLFNBQVMsRUFBRSxFQUFFO1lBQ2IsU0FBUyxFQUFFLEVBQUU7U0FDZCxDQUFDO1FBQ00sa0JBQWEsR0FBYyxTQUFTLENBQUM7UUFDckMsZ0JBQVcsR0FBVyxPQUFPLENBQUM7UUFHL0IscUJBQWdCLEdBQUcsSUFBSSxDQUFDO1FB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QUFDO0NBQUEsQUFyUkQsSUFxUkM7U0FwT1ksb0JBQW9COzs7SUFDL0IsaURBQW9EOztJQUNwRCxpREFBb0Q7O0lBRXBELHdDQUEyRDs7SUFDM0QsdUNBQTBEOztJQUMxRCxzQ0FBeUQ7Ozs7O0lBRXpELDRDQU1FOzs7OztJQUNGLHlDQUtFOzs7OztJQUNGLDZDQUE2Qzs7Ozs7SUFDN0MsMkNBQXNDOzs7OztJQUN0QyxzQ0FBb0I7O0lBRXBCLGdEQUErQjs7SUFDL0IsZ0RBQStCOztJQUUvQix3Q0FBb0I7O0lBQ3BCLHdDQUFvQjs7SUFDcEIseUNBQXlCOztJQUV6Qiw2Q0FDRTs7SUFFRiw4Q0FDRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XG5cbmV4cG9ydCB0eXBlIElucHV0VHlwZSA9ICdtaW51dGVzJyB8ICdzZWNvbmRzJztcblxuZXhwb3J0IGNvbnN0IFNQSU5ORVJfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFRpbWVTcGlubmVyQ29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2tUaW1lU3Bpbm5lcicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImtTcGlubmVyQ29udGFpbmVyXCIgW2NsYXNzLnVpLXN0YXRlLWRpc2FibGVkXT1cIl9kaXNhYmxlZFwiPlxuICAgIDxpbnB1dCAjbWludXRlc1xuICAgICAgICAgICBjbGFzcz1cImtNaW51dGVzXCJcbiAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICBtYXhsZW5ndGg9XCIyXCJcbiAgICAgICAgICAgW2Rpc2FibGVkXT1cIl9kaXNhYmxlZFwiXG4gICAgICAgICAgIFt2YWx1ZV09XCJfbWludXRlc0FzU3RyaW5nXCJcbiAgICAgICAgICAgKGNsaWNrKT1cIm1pbnV0ZXMuc2VsZWN0KClcIlxuICAgICAgICAgICAoa2V5ZG93bik9XCJfb25JbnB1dEtleWRvd24oJGV2ZW50KVwiXG4gICAgICAgICAgIChrZXl1cCk9XCJfb25JbnB1dEtleXVwKCRldmVudClcIlxuICAgICAgICAgICAoa2V5cHJlc3MpPVwiX29uSW5wdXRLZXlQcmVzcygkZXZlbnQpXCJcbiAgICAgICAgICAgKGNoYW5nZSk9XCJfaGFuZGxlQ2hhbmdlKCRldmVudClcIlxuICAgICAgICAgICAoZm9jdXMpPVwiX29uSW5wdXRGb2N1cygkZXZlbnQsICdtaW51dGVzJylcIlxuICAgICAgICAgICAoYmx1cik9XCJfb25JbnB1dEJsdXIoJGV2ZW50KVwiPlxuICAgIDxzcGFuIGNsYXNzPVwia0RlbGltaXRlclwiPjo8L3NwYW4+XG4gICAgPGlucHV0ICNzZWNvbmRzIGNsYXNzPVwia1NlY29uZHNcIiB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgIFt2YWx1ZV09XCJfc2Vjb25kc0FzU3RyaW5nXCJcbiAgICAgICAgICAgW2Rpc2FibGVkXT1cIl9kaXNhYmxlZFwiXG4gICAgICAgICAgIChjbGljayk9XCJzZWNvbmRzLnNlbGVjdCgpXCJcbiAgICAgICAgICAgKGtleWRvd24pPVwiX29uSW5wdXRLZXlkb3duKCRldmVudClcIlxuICAgICAgICAgICAoa2V5dXApPVwiX29uSW5wdXRLZXl1cCgkZXZlbnQpXCJcbiAgICAgICAgICAgKGtleXByZXNzKT1cIl9vbklucHV0S2V5UHJlc3MoJGV2ZW50KVwiXG4gICAgICAgICAgIChjaGFuZ2UpPVwiX2hhbmRsZUNoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICAgKGZvY3VzKT1cIl9vbklucHV0Rm9jdXMoJGV2ZW50LCAnc2Vjb25kcycpXCJcbiAgICAgICAgICAgKGJsdXIpPVwiX29uSW5wdXRCbHVyKCRldmVudClcIj5cbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1zcGlubmVyLWJ1dHRvbiB1aS1zcGlubmVyLXVwIHVpLWNvcm5lci10ciB1aS1idXR0b24gdWktd2lkZ2V0IHVpLXN0YXRlLWRlZmF1bHQnOnRydWUsJ3VpLXN0YXRlLWRpc2FibGVkJzpfZGlzYWJsZWR9XCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJfZGlzYWJsZWRcIlxuICAgICAgICAgICAgKG1vdXNlbGVhdmUpPVwiX29uQnV0dG9uTW91c2VsZWF2ZSgkZXZlbnQpXCJcbiAgICAgICAgICAgIChtb3VzZWRvd24pPVwiX29uQnV0dG9uTW91c2Vkb3duKCRldmVudCwgMSlcIlxuICAgICAgICAgICAgKG1vdXNldXApPVwiX29uQnV0dG9uTW91c2V1cCgkZXZlbnQpXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwia0ljb25kcm9wZG93bl9hcnJvd190b3Aga1NwaW5uZXJCdG5cIj48L3NwYW4+XG4gICAgPC9idXR0b24+XG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIGNsYXNzPVwia1NwaW5Eb3duXCJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktc3Bpbm5lci1idXR0b24gdWktc3Bpbm5lci1kb3duIHVpLWNvcm5lci1iciB1aS1idXR0b24gdWktd2lkZ2V0IHVpLXN0YXRlLWRlZmF1bHQnOnRydWUsJ3VpLXN0YXRlLWRpc2FibGVkJzpfZGlzYWJsZWR9XCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJfZGlzYWJsZWRcIlxuICAgICAgICAgICAgKG1vdXNlbGVhdmUpPVwiX29uQnV0dG9uTW91c2VsZWF2ZSgkZXZlbnQpXCJcbiAgICAgICAgICAgIChtb3VzZWRvd24pPVwiX29uQnV0dG9uTW91c2Vkb3duKCRldmVudCwgLTEpXCJcbiAgICAgICAgICAgIChtb3VzZXVwKT1cIl9vbkJ1dHRvbk1vdXNldXAoJGV2ZW50KVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImtJY29uZHJvcGRvd25fYXJyb3dfYm90dG9tIGtTcGlubmVyQnRuXCI+PC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmtTcGlubmVyQ29udGFpbmVye2JhY2tncm91bmQtY29sb3I6I2ZmZjt3aWR0aDo3OHB4O2hlaWdodDoxNnB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrO292ZXJmbG93OnZpc2libGU7cG9zaXRpb246cmVsYXRpdmU7dmVydGljYWwtYWxpZ246bWlkZGxlO2JvcmRlcjoxcHggc29saWQgI2NjYztib3JkZXItcmFkaXVzOjNweDtwYWRkaW5nOjVweCAxMHB4IDExcHggMH0ua1NwaW5uZXJDb250YWluZXIgaW5wdXR7Ym9yZGVyOjA7d2lkdGg6MjVweDtoZWlnaHQ6MThweDtmb250LXNpemU6MTVweDtjb2xvcjojOTk5O2ZvbnQtd2VpZ2h0OjEwMH0ua1NwaW5uZXJDb250YWluZXIgaW5wdXQ6Zm9jdXN7b3V0bGluZTowfS5rU3Bpbm5lckNvbnRhaW5lciAua0RlbGltaXRlcntjb2xvcjojOTk5O2ZvbnQtd2VpZ2h0OjEwMH0ua1NwaW5uZXJDb250YWluZXIgLmtNaW51dGVze3RleHQtYWxpZ246cmlnaHR9LmtTcGlubmVyQ29udGFpbmVyIC5rU3Bpbm5lckJ0bntmb250LXNpemU6MTBweDtjb2xvcjojMzMzfS5rU3Bpbm5lckNvbnRhaW5lciAudWktc3RhdGUtZGlzYWJsZWR7b3BhY2l0eTouMzU7ZmlsdGVyOkFscGhhKE9wYWNpdHk9MzUpO2JhY2tncm91bmQtaW1hZ2U6bm9uZTtjdXJzb3I6ZGVmYXVsdCFpbXBvcnRhbnR9LmtTcGlubmVyQ29udGFpbmVyIC51aS1zcGlubmVyLWJ1dHRvbntib3JkZXI6MDttYXJnaW4tcmlnaHQ6MXB4O2hlaWdodDoxNHB4O2N1cnNvcjpwb2ludGVyfS5rU3Bpbm5lckNvbnRhaW5lciAudWktc3Bpbm5lci1kb3due21hcmdpbi1ib3R0b206NXB4fWBdLFxuICBwcm92aWRlcnM6IFtEb21IYW5kbGVyLCBTUElOTkVSX1ZBTFVFX0FDQ0VTU09SXSxcbn0pXG5leHBvcnQgY2xhc3MgVGltZVNwaW5uZXJDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIEBWaWV3Q2hpbGQoJ21pbnV0ZXMnKSBtaW51dGVzSW5wdXRGaWVsZDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnc2Vjb25kcycpIHNlY29uZHNJbnB1dEZpZWxkOiBFbGVtZW50UmVmO1xuICBcbiAgQE91dHB1dCgpIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uRm9jdXM6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25CbHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgXG4gIHByaXZhdGUgX2FsbG93ZWRLZXlzID0gW1xuICAgIDksICAvLyB0YWJcbiAgICA4LCAgLy8gYmFja3NwYWNlXG4gICAgMzcsIC8vIGxlZnRBcnJvd1xuICAgIDM5LCAvLyByaWdodEFycm93XG4gICAgNDYgIC8vIGRlbGV0ZUJ0blxuICBdO1xuICBwcml2YXRlIF9zcGluS2V5cyA9IHtcbiAgICB1cEFycm93OiAzOCxcbiAgICByaWdodEFycm93OiAzOSxcbiAgICBkb3duQXJyb3c6IDQwLFxuICAgIGxlZnRBcnJvdzogMzdcbiAgfTtcbiAgcHJpdmF0ZSBfY3VycmVudElucHV0OiBJbnB1dFR5cGUgPSAnbWludXRlcyc7XG4gIHByaXZhdGUgX2tleVBhdHRlcm46IFJlZ0V4cCA9IC9bMC05XS87XG4gIHByaXZhdGUgX3RpbWVyOiBhbnk7XG4gIFxuICBwdWJsaWMgX21pbnV0ZXNBc1N0cmluZyA9ICcwMCc7XG4gIHB1YmxpYyBfc2Vjb25kc0FzU3RyaW5nID0gJzAwJztcbiAgXG4gIHB1YmxpYyBfbWludXRlcyA9IDA7XG4gIHB1YmxpYyBfc2Vjb25kcyA9IDA7XG4gIHB1YmxpYyBfZGlzYWJsZWQgPSBmYWxzZTtcbiAgXG4gIHB1YmxpYyBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHtcbiAgfTtcbiAgXG4gIHB1YmxpYyBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7XG4gIH07XG4gIFxuICBwcml2YXRlIF9zcGluKGV2ZW50OiBFdmVudCwgZGlyOiBudW1iZXIpIHtcbiAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLl9nZXRDdXJyZW50SW5wdXRWYWx1ZSgpO1xuICAgIGxldCBuZXh0VmFsdWUgPSBjdXJyZW50VmFsdWU7XG4gICAgaWYgKGN1cnJlbnRWYWx1ZSA9PT0gMCAmJiBkaXIgPT09IC0xKSB7XG4gICAgICBuZXh0VmFsdWUgPSA1OTtcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRWYWx1ZSA9PT0gNTkgJiYgZGlyID09PSAxKSB7XG4gICAgICBuZXh0VmFsdWUgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXh0VmFsdWUgPSBjdXJyZW50VmFsdWUgKyBkaXI7XG4gICAgfVxuICAgIFxuICAgIHRoaXMuX3NldEN1cnJlbnRJbnB1dFZhbHVlKG5leHRWYWx1ZSk7XG4gICAgdGhpcy5fZm9ybWF0VmFsdWUoKTtcbiAgICBcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2UoKHRoaXMuX21pbnV0ZXMgKiA2MCkgKyB0aGlzLl9zZWNvbmRzKTtcbiAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoZXZlbnQpO1xuICB9XG4gIFxuICBwcml2YXRlIF9nZXRDdXJyZW50SW5wdXRWYWx1ZSgpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLl9jdXJyZW50SW5wdXQgPT09ICdtaW51dGVzJykge1xuICAgICAgcmV0dXJuIHRoaXMuX21pbnV0ZXM7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9jdXJyZW50SW5wdXQgPT09ICdzZWNvbmRzJykge1xuICAgICAgcmV0dXJuIHRoaXMuX3NlY29uZHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEVycm9yKCdNdXN0IG5vdCByZWFjaCB0aGlzIHBhcnQnKTtcbiAgICB9XG4gIH1cbiAgXG4gIHByaXZhdGUgX3NldEN1cnJlbnRJbnB1dFZhbHVlKHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fY3VycmVudElucHV0ID09PSAnbWludXRlcycpIHtcbiAgICAgIHRoaXMuX21pbnV0ZXMgPSB2YWx1ZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2N1cnJlbnRJbnB1dCA9PT0gJ3NlY29uZHMnKSB7XG4gICAgICB0aGlzLl9zZWNvbmRzID0gdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEVycm9yKCdNdXN0IG5vdCByZWFjaCB0aGlzIHBhcnQnKTtcbiAgICB9XG4gIH1cbiAgXG4gIHByaXZhdGUgX3NldFZhbHVlKGlucHV0OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBsZXQgdmFsdWUgPSBOdW1iZXIoaW5wdXQpO1xuICAgIHZhbHVlID0gaXNOYU4odmFsdWUpID8gMCA6IHZhbHVlO1xuICAgIFxuICAgIGlmICh2YWx1ZSA+IDU5KSB7XG4gICAgICB0aGlzLl9zZXRDdXJyZW50SW5wdXRWYWx1ZSg1OSk7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSA8IDApIHtcbiAgICAgIHRoaXMuX3NldEN1cnJlbnRJbnB1dFZhbHVlKDApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zZXRDdXJyZW50SW5wdXRWYWx1ZSh2YWx1ZSk7XG4gICAgfVxuICB9XG4gIFxuICBwcml2YXRlIF9oaWdobGlnaHRJbnB1dCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fY3VycmVudElucHV0ID09PSAnbWludXRlcycpIHtcbiAgICAgIHRoaXMubWludXRlc0lucHV0RmllbGQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgdGhpcy5taW51dGVzSW5wdXRGaWVsZC5uYXRpdmVFbGVtZW50LnNlbGVjdCgpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fY3VycmVudElucHV0ID09PSAnc2Vjb25kcycpIHtcbiAgICAgIHRoaXMuc2Vjb25kc0lucHV0RmllbGQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgdGhpcy5zZWNvbmRzSW5wdXRGaWVsZC5uYXRpdmVFbGVtZW50LnNlbGVjdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBFcnJvcignTXVzdCBub3QgcmVhY2ggdGhpcyBwYXJ0Jyk7XG4gICAgfVxuICB9XG4gIFxuICBwcml2YXRlIF9jbGVhclRpbWVyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl90aW1lcikge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl90aW1lcik7XG4gICAgfVxuICB9XG4gIFxuICBwcml2YXRlIF9yZXBlYXQoZXZlbnQ6IEV2ZW50LCBpbnRlcnZhbDogbnVtYmVyLCBkaXI6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGkgPSBpbnRlcnZhbCB8fCA1MDA7XG4gICAgXG4gICAgdGhpcy5fY2xlYXJUaW1lcigpO1xuICAgIHRoaXMuX3RpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLl9yZXBlYXQoZXZlbnQsIDQwLCBkaXIpO1xuICAgIH0sIGkpO1xuICAgIFxuICAgIHRoaXMuX3NwaW4oZXZlbnQsIGRpcik7XG4gIH1cbiAgXG4gIHByaXZhdGUgX2Zvcm1hdFZhbHVlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9jdXJyZW50SW5wdXQgPT09ICdtaW51dGVzJykge1xuICAgICAgdGhpcy5fbWludXRlc0FzU3RyaW5nID0gdGhpcy5fbWludXRlcyA8IDEwID8gYDAke3RoaXMuX21pbnV0ZXN9YCA6IFN0cmluZyh0aGlzLl9taW51dGVzKTtcbiAgICAgIHRoaXMubWludXRlc0lucHV0RmllbGQubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMuX21pbnV0ZXNBc1N0cmluZztcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2N1cnJlbnRJbnB1dCA9PT0gJ3NlY29uZHMnKSB7XG4gICAgICB0aGlzLl9zZWNvbmRzQXNTdHJpbmcgPSB0aGlzLl9zZWNvbmRzIDwgMTAgPyBgMCR7dGhpcy5fc2Vjb25kc31gIDogU3RyaW5nKHRoaXMuX3NlY29uZHMpO1xuICAgICAgdGhpcy5zZWNvbmRzSW5wdXRGaWVsZC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5fc2Vjb25kc0FzU3RyaW5nO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBFcnJvcignTXVzdCBub3QgcmVhY2ggdGhpcyBwYXJ0Jyk7XG4gICAgfVxuICB9XG4gIFxuICBwcml2YXRlIF9zZXREZWZhdWx0VmFsdWVzKCk6IHZvaWQge1xuICAgIHRoaXMuX21pbnV0ZXMgPSAwO1xuICAgIHRoaXMuX3NlY29uZHMgPSAwO1xuICAgIHRoaXMuX3NlY29uZHNBc1N0cmluZyA9ICcwMCc7XG4gICAgdGhpcy5fbWludXRlc0FzU3RyaW5nID0gJzAwJztcbiAgfVxuICBcbiAgcHJpdmF0ZSBfc2V0SW5pdGlhbFZhbHVlcyh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fbWludXRlcyA9IE1hdGguZmxvb3IodmFsdWUgLyA2MCk7XG4gICAgdGhpcy5fc2Vjb25kcyA9IHZhbHVlICUgNjA7XG4gICAgdGhpcy5fbWludXRlc0FzU3RyaW5nID0gdGhpcy5fbWludXRlcyA8IDEwID8gYDAke3RoaXMuX21pbnV0ZXN9YCA6IFN0cmluZyh0aGlzLl9taW51dGVzKTtcbiAgICB0aGlzLm1pbnV0ZXNJbnB1dEZpZWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLl9taW51dGVzQXNTdHJpbmc7XG4gICAgdGhpcy5fc2Vjb25kc0FzU3RyaW5nID0gdGhpcy5fc2Vjb25kcyA8IDEwID8gYDAke3RoaXMuX3NlY29uZHN9YCA6IFN0cmluZyh0aGlzLl9zZWNvbmRzKTtcbiAgICB0aGlzLnNlY29uZHNJbnB1dEZpZWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLl9zZWNvbmRzQXNTdHJpbmc7XG4gIH1cbiAgXG4gIHB1YmxpYyBfb25JbnB1dEtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQud2hpY2ggPT09IHRoaXMuX3NwaW5LZXlzLnVwQXJyb3cgfHwgZXZlbnQud2hpY2ggPT09IHRoaXMuX3NwaW5LZXlzLnJpZ2h0QXJyb3cpIHtcbiAgICAgIC8vIGluY3JlbWVudFxuICAgICAgdGhpcy5fc3BpbihldmVudCwgMSk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQud2hpY2ggPT09IHRoaXMuX3NwaW5LZXlzLmRvd25BcnJvdyB8fCBldmVudC53aGljaCA9PT0gdGhpcy5fc3BpbktleXMubGVmdEFycm93KSB7XG4gICAgICAvLyBkZWNyZW1lbnRcbiAgICAgIHRoaXMuX3NwaW4oZXZlbnQsIC0xKTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG4gIFxuICBwdWJsaWMgX29uSW5wdXRLZXlQcmVzcyhldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGlucHV0Q2hhciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZXZlbnQuY2hhckNvZGUpO1xuICAgIGNvbnN0IG5vdEFOdW1iZXIgPSAhdGhpcy5fa2V5UGF0dGVybi50ZXN0KGlucHV0Q2hhcik7XG4gICAgY29uc3Qgbm90QWxsb3dlZEtleSA9IHRoaXMuX2FsbG93ZWRLZXlzLmluZGV4T2YoZXZlbnQua2V5Q29kZSkgPT09IC0xO1xuICAgIGlmIChub3RBTnVtYmVyICYmIG5vdEFsbG93ZWRLZXkpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG4gIFxuICBwdWJsaWMgX29uSW5wdXRLZXl1cChldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGlucHV0VmFsdWUgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+IGV2ZW50LnRhcmdldCkudmFsdWU7XG4gICAgdGhpcy5fc2V0VmFsdWUoaW5wdXRWYWx1ZSk7XG4gICAgdGhpcy5fZm9ybWF0VmFsdWUoKTtcbiAgICBcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2UoKHRoaXMuX21pbnV0ZXMgKiA2MCkgKyB0aGlzLl9zZWNvbmRzKTtcbiAgfVxuICBcbiAgcHVibGljIF9oYW5kbGVDaGFuZ2UoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoZXZlbnQpO1xuICB9XG4gIFxuICBwdWJsaWMgX29uSW5wdXRGb2N1cyhldmVudDogS2V5Ym9hcmRFdmVudCwgaW5wdXQ6IElucHV0VHlwZSk6IHZvaWQge1xuICAgIHRoaXMuX2N1cnJlbnRJbnB1dCA9IGlucHV0O1xuICAgIHRoaXMub25Gb2N1cy5lbWl0KGV2ZW50KTtcbiAgfVxuICBcbiAgcHVibGljIF9vbklucHV0Qmx1cihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcbiAgICB0aGlzLm9uQmx1ci5lbWl0KGV2ZW50KTtcbiAgfVxuICBcbiAgcHVibGljIF9vbkJ1dHRvbk1vdXNlZG93bihldmVudDogRXZlbnQsIGRpcjogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9kaXNhYmxlZCkge1xuICAgICAgdGhpcy5faGlnaGxpZ2h0SW5wdXQoKTtcbiAgICAgIHRoaXMuX3JlcGVhdChldmVudCwgbnVsbCwgZGlyKTtcbiAgICB9XG4gIH1cbiAgXG4gIHB1YmxpYyBfb25CdXR0b25Nb3VzZXVwKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuX2NsZWFyVGltZXIoKTtcbiAgICB9XG4gIH1cbiAgXG4gIHB1YmxpYyBfb25CdXR0b25Nb3VzZWxlYXZlKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuX2NsZWFyVGltZXIoKTtcbiAgICB9XG4gIH1cbiAgXG4gIHB1YmxpYyBzZXREaXNhYmxlZFN0YXRlKHZhbDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gdmFsO1xuICB9XG4gIFxuICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMuX3NldERlZmF1bHRWYWx1ZXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2V0SW5pdGlhbFZhbHVlcyh2YWx1ZSk7XG4gICAgfVxuICB9XG4gIFxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcbiAgfVxuICBcbiAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcbiAgfVxuICBcbn1cbiJdfQ==