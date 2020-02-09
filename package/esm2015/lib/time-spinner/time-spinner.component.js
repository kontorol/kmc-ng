/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, forwardRef, Output, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomHandler } from 'primeng/primeng';
/** @type {?} */
export const SPINNER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TimeSpinnerComponent),
    multi: true
};
export class TimeSpinnerComponent {
    constructor() {
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
        this.onModelChange = () => {
        };
        this.onModelTouched = () => {
        };
    }
    /**
     * @private
     * @param {?} event
     * @param {?} dir
     * @return {?}
     */
    _spin(event, dir) {
        /** @type {?} */
        const currentValue = this._getCurrentInputValue();
        /** @type {?} */
        let nextValue = currentValue;
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
    }
    /**
     * @private
     * @return {?}
     */
    _getCurrentInputValue() {
        if (this._currentInput === 'minutes') {
            return this._minutes;
        }
        else if (this._currentInput === 'seconds') {
            return this._seconds;
        }
        else {
            throw Error('Must not reach this part');
        }
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    _setCurrentInputValue(value) {
        if (this._currentInput === 'minutes') {
            this._minutes = value;
        }
        else if (this._currentInput === 'seconds') {
            this._seconds = value;
        }
        else {
            throw Error('Must not reach this part');
        }
    }
    /**
     * @private
     * @param {?} input
     * @return {?}
     */
    _setValue(input) {
        /** @type {?} */
        let value = Number(input);
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
    }
    /**
     * @private
     * @return {?}
     */
    _highlightInput() {
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
    }
    /**
     * @private
     * @return {?}
     */
    _clearTimer() {
        if (this._timer) {
            clearInterval(this._timer);
        }
    }
    /**
     * @private
     * @param {?} event
     * @param {?} interval
     * @param {?} dir
     * @return {?}
     */
    _repeat(event, interval, dir) {
        /** @type {?} */
        const i = interval || 500;
        this._clearTimer();
        this._timer = setTimeout(() => {
            this._repeat(event, 40, dir);
        }, i);
        this._spin(event, dir);
    }
    /**
     * @private
     * @return {?}
     */
    _formatValue() {
        if (this._currentInput === 'minutes') {
            this._minutesAsString = this._minutes < 10 ? `0${this._minutes}` : String(this._minutes);
            this.minutesInputField.nativeElement.value = this._minutesAsString;
        }
        else if (this._currentInput === 'seconds') {
            this._secondsAsString = this._seconds < 10 ? `0${this._seconds}` : String(this._seconds);
            this.secondsInputField.nativeElement.value = this._secondsAsString;
        }
        else {
            throw Error('Must not reach this part');
        }
    }
    /**
     * @private
     * @return {?}
     */
    _setDefaultValues() {
        this._minutes = 0;
        this._seconds = 0;
        this._secondsAsString = '00';
        this._minutesAsString = '00';
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    _setInitialValues(value) {
        this._minutes = Math.floor(value / 60);
        this._seconds = value % 60;
        this._minutesAsString = this._minutes < 10 ? `0${this._minutes}` : String(this._minutes);
        this.minutesInputField.nativeElement.value = this._minutesAsString;
        this._secondsAsString = this._seconds < 10 ? `0${this._seconds}` : String(this._seconds);
        this.secondsInputField.nativeElement.value = this._secondsAsString;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _onInputKeydown(event) {
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
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _onInputKeyPress(event) {
        /** @type {?} */
        const inputChar = String.fromCharCode(event.charCode);
        /** @type {?} */
        const notANumber = !this._keyPattern.test(inputChar);
        /** @type {?} */
        const notAllowedKey = this._allowedKeys.indexOf(event.keyCode) === -1;
        if (notANumber && notAllowedKey) {
            event.preventDefault();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _onInputKeyup(event) {
        /** @type {?} */
        const inputValue = ((/** @type {?} */ (event.target))).value;
        this._setValue(inputValue);
        this._formatValue();
        this.onModelChange((this._minutes * 60) + this._seconds);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _handleChange(event) {
        this.onChange.emit(event);
    }
    /**
     * @param {?} event
     * @param {?} input
     * @return {?}
     */
    _onInputFocus(event, input) {
        this._currentInput = input;
        this.onFocus.emit(event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _onInputBlur(event) {
        this.onModelTouched();
        this.onBlur.emit(event);
    }
    /**
     * @param {?} event
     * @param {?} dir
     * @return {?}
     */
    _onButtonMousedown(event, dir) {
        if (!this._disabled) {
            this._highlightInput();
            this._repeat(event, null, dir);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _onButtonMouseup(event) {
        if (!this._disabled) {
            this._clearTimer();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _onButtonMouseleave(event) {
        if (!this._disabled) {
            this._clearTimer();
        }
    }
    /**
     * @param {?} val
     * @return {?}
     */
    setDisabledState(val) {
        this._disabled = val;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (typeof value !== 'number') {
            this._setDefaultValues();
        }
        else {
            this._setInitialValues(value);
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
}
TimeSpinnerComponent.decorators = [
    { type: Component, args: [{
                selector: 'kTimeSpinner',
                template: `<div class="kSpinnerContainer" [class.ui-state-disabled]="_disabled">
    <input #minutes
           class="kMinutes"
           type="text"
           maxlength="2"
           [disabled]="_disabled"
           [value]="_minutesAsString"
           (click)="minutes.select()"
           (keydown)="_onInputKeydown($event)"
           (keyup)="_onInputKeyup($event)"
           (keypress)="_onInputKeyPress($event)"
           (change)="_handleChange($event)"
           (focus)="_onInputFocus($event, 'minutes')"
           (blur)="_onInputBlur($event)">
    <span class="kDelimiter">:</span>
    <input #seconds class="kSeconds" type="text"
           [value]="_secondsAsString"
           [disabled]="_disabled"
           (click)="seconds.select()"
           (keydown)="_onInputKeydown($event)"
           (keyup)="_onInputKeyup($event)"
           (keypress)="_onInputKeyPress($event)"
           (change)="_handleChange($event)"
           (focus)="_onInputFocus($event, 'seconds')"
           (blur)="_onInputBlur($event)">
    <button type="button"
            [ngClass]="{'ui-spinner-button ui-spinner-up ui-corner-tr ui-button ui-widget ui-state-default':true,'ui-state-disabled':_disabled}"
            [disabled]="_disabled"
            (mouseleave)="_onButtonMouseleave($event)"
            (mousedown)="_onButtonMousedown($event, 1)"
            (mouseup)="_onButtonMouseup($event)">
        <span class="kIcondropdown_arrow_top kSpinnerBtn"></span>
    </button>
    <button type="button"
            class="kSpinDown"
            [ngClass]="{'ui-spinner-button ui-spinner-down ui-corner-br ui-button ui-widget ui-state-default':true,'ui-state-disabled':_disabled}"
            [disabled]="_disabled"
            (mouseleave)="_onButtonMouseleave($event)"
            (mousedown)="_onButtonMousedown($event, -1)"
            (mouseup)="_onButtonMouseup($event)">
        <span class="kIcondropdown_arrow_bottom kSpinnerBtn"></span>
    </button>
</div>
`,
                styles: [`.kSpinnerContainer{background-color:#fff;width:78px;height:16px;display:inline-block;overflow:visible;position:relative;vertical-align:middle;border:1px solid #ccc;border-radius:3px;padding:5px 10px 11px 0}.kSpinnerContainer input{border:0;width:25px;height:18px;font-size:15px;color:#999;font-weight:100}.kSpinnerContainer input:focus{outline:0}.kSpinnerContainer .kDelimiter{color:#999;font-weight:100}.kSpinnerContainer .kMinutes{text-align:right}.kSpinnerContainer .kSpinnerBtn{font-size:10px;color:#333}.kSpinnerContainer .ui-state-disabled{opacity:.35;filter:Alpha(Opacity=35);background-image:none;cursor:default!important}.kSpinnerContainer .ui-spinner-button{border:0;margin-right:1px;height:14px;cursor:pointer}.kSpinnerContainer .ui-spinner-down{margin-bottom:5px}`],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1zcGlubmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrYWx0dXJhLW5nL2thbHR1cmEtcHJpbWVuZy11aS8iLCJzb3VyY2VzIjpbImxpYi90aW1lLXNwaW5uZXIvdGltZS1zcGlubmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25HLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBSTdDLE1BQU0sT0FBTyxzQkFBc0IsR0FBUTtJQUN6QyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsb0JBQW9CLENBQUM7SUFDbkQsS0FBSyxFQUFFLElBQUk7Q0FDWjtBQW1ERCxNQUFNLE9BQU8sb0JBQW9CO0lBakRqQztRQXFEWSxhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDakQsWUFBTyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2hELFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVqRCxpQkFBWSxHQUFHO1lBQ3JCLENBQUM7WUFDRCxDQUFDO1lBQ0QsRUFBRTtZQUNGLEVBQUU7WUFDRixFQUFFLENBQUUsWUFBWTtTQUNqQixDQUFDO1FBQ00sY0FBUyxHQUFHO1lBQ2xCLE9BQU8sRUFBRSxFQUFFO1lBQ1gsVUFBVSxFQUFFLEVBQUU7WUFDZCxTQUFTLEVBQUUsRUFBRTtZQUNiLFNBQVMsRUFBRSxFQUFFO1NBQ2QsQ0FBQztRQUNNLGtCQUFhLEdBQWMsU0FBUyxDQUFDO1FBQ3JDLGdCQUFXLEdBQVcsT0FBTyxDQUFDO1FBRy9CLHFCQUFnQixHQUFH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QixnREFBK0I7O0lBQy9CLGdEQUErQjs7SUFFL0Isd0NBQW9COztJQUNwQix3Q0FBb0I7O0lBQ3BCLHlDQUF5Qjs7SUFFekIsNkNBQ0U7O0lBRUYsOENBQ0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgT3V0cHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERvbUhhbmRsZXIgfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xuXG5leHBvcnQgdHlwZSBJbnB1dFR5cGUgPSAnbWludXRlcycgfCAnc2Vjb25kcyc7XG5cbmV4cG9ydCBjb25zdCBTUElOTkVSX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBUaW1lU3Bpbm5lckNvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdrVGltZVNwaW5uZXInLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJrU3Bpbm5lckNvbnRhaW5lclwiIFtjbGFzcy51aS1zdGF0ZS1kaXNhYmxlZF09XCJfZGlzYWJsZWRcIj5cbiAgICA8aW5wdXQgI21pbnV0ZXNcbiAgICAgICAgICAgY2xhc3M9XCJrTWludXRlc1wiXG4gICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgbWF4bGVuZ3RoPVwiMlwiXG4gICAgICAgICAgIFtkaXNhYmxlZF09XCJfZGlzYWJsZWRcIlxuICAgICAgICAgICBbdmFsdWVdPVwiX21pbnV0ZXNBc1N0cmluZ1wiXG4gICAgICAgICAgIChjbGljayk9XCJtaW51dGVzLnNlbGVjdCgpXCJcbiAgICAgICAgICAgKGtleWRvd24pPVwiX29uSW5wdXRLZXlkb3duKCRldmVudClcIlxuICAgICAgICAgICAoa2V5dXApPVwiX29uSW5wdXRLZXl1cCgkZXZlbnQpXCJcbiAgICAgICAgICAgKGtleXByZXNzKT1cIl9vbklucHV0S2V5UHJlc3MoJGV2ZW50KVwiXG4gICAgICAgICAgIChjaGFuZ2UpPVwiX2hhbmRsZUNoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICAgKGZvY3VzKT1cIl9vbklucHV0Rm9jdXMoJGV2ZW50LCAnbWludXRlcycpXCJcbiAgICAgICAgICAgKGJsdXIpPVwiX29uSW5wdXRCbHVyKCRldmVudClcIj5cbiAgICA8c3BhbiBjbGFzcz1cImtEZWxpbWl0ZXJcIj46PC9zcGFuPlxuICAgIDxpbnB1dCAjc2Vjb25kcyBjbGFzcz1cImtTZWNvbmRzXCIgdHlwZT1cInRleHRcIlxuICAgICAgICAgICBbdmFsdWVdPVwiX3NlY29uZHNBc1N0cmluZ1wiXG4gICAgICAgICAgIFtkaXNhYmxlZF09XCJfZGlzYWJsZWRcIlxuICAgICAgICAgICAoY2xpY2spPVwic2Vjb25kcy5zZWxlY3QoKVwiXG4gICAgICAgICAgIChrZXlkb3duKT1cIl9vbklucHV0S2V5ZG93bigkZXZlbnQpXCJcbiAgICAgICAgICAgKGtleXVwKT1cIl9vbklucHV0S2V5dXAoJGV2ZW50KVwiXG4gICAgICAgICAgIChrZXlwcmVzcyk9XCJfb25JbnB1dEtleVByZXNzKCRldmVudClcIlxuICAgICAgICAgICAoY2hhbmdlKT1cIl9oYW5kbGVDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgIChmb2N1cyk9XCJfb25JbnB1dEZvY3VzKCRldmVudCwgJ3NlY29uZHMnKVwiXG4gICAgICAgICAgIChibHVyKT1cIl9vbklucHV0Qmx1cigkZXZlbnQpXCI+XG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktc3Bpbm5lci1idXR0b24gdWktc3Bpbm5lci11cCB1aS1jb3JuZXItdHIgdWktYnV0dG9uIHVpLXdpZGdldCB1aS1zdGF0ZS1kZWZhdWx0Jzp0cnVlLCd1aS1zdGF0ZS1kaXNhYmxlZCc6X2Rpc2FibGVkfVwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiX2Rpc2FibGVkXCJcbiAgICAgICAgICAgIChtb3VzZWxlYXZlKT1cIl9vbkJ1dHRvbk1vdXNlbGVhdmUoJGV2ZW50KVwiXG4gICAgICAgICAgICAobW91c2Vkb3duKT1cIl9vbkJ1dHRvbk1vdXNlZG93bigkZXZlbnQsIDEpXCJcbiAgICAgICAgICAgIChtb3VzZXVwKT1cIl9vbkJ1dHRvbk1vdXNldXAoJGV2ZW50KVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImtJY29uZHJvcGRvd25fYXJyb3dfdG9wIGtTcGlubmVyQnRuXCI+PC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBjbGFzcz1cImtTcGluRG93blwiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXNwaW5uZXItYnV0dG9uIHVpLXNwaW5uZXItZG93biB1aS1jb3JuZXItYnIgdWktYnV0dG9uIHVpLXdpZGdldCB1aS1zdGF0ZS1kZWZhdWx0Jzp0cnVlLCd1aS1zdGF0ZS1kaXNhYmxlZCc6X2Rpc2FibGVkfVwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiX2Rpc2FibGVkXCJcbiAgICAgICAgICAgIChtb3VzZWxlYXZlKT1cIl9vbkJ1dHRvbk1vdXNlbGVhdmUoJGV2ZW50KVwiXG4gICAgICAgICAgICAobW91c2Vkb3duKT1cIl9vbkJ1dHRvbk1vdXNlZG93bigkZXZlbnQsIC0xKVwiXG4gICAgICAgICAgICAobW91c2V1cCk9XCJfb25CdXR0b25Nb3VzZXVwKCRldmVudClcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJrSWNvbmRyb3Bkb3duX2Fycm93X2JvdHRvbSBrU3Bpbm5lckJ0blwiPjwvc3Bhbj5cbiAgICA8L2J1dHRvbj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5rU3Bpbm5lckNvbnRhaW5lcntiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7d2lkdGg6NzhweDtoZWlnaHQ6MTZweDtkaXNwbGF5OmlubGluZS1ibG9jaztvdmVyZmxvdzp2aXNpYmxlO3Bvc2l0aW9uOnJlbGF0aXZlO3ZlcnRpY2FsLWFsaWduOm1pZGRsZTtib3JkZXI6MXB4IHNvbGlkICNjY2M7Ym9yZGVyLXJhZGl1czozcHg7cGFkZGluZzo1cHggMTBweCAxMXB4IDB9LmtTcGlubmVyQ29udGFpbmVyIGlucHV0e2JvcmRlcjowO3dpZHRoOjI1cHg7aGVpZ2h0OjE4cHg7Zm9udC1zaXplOjE1cHg7Y29sb3I6Izk5OTtmb250LXdlaWdodDoxMDB9LmtTcGlubmVyQ29udGFpbmVyIGlucHV0OmZvY3Vze291dGxpbmU6MH0ua1NwaW5uZXJDb250YWluZXIgLmtEZWxpbWl0ZXJ7Y29sb3I6Izk5OTtmb250LXdlaWdodDoxMDB9LmtTcGlubmVyQ29udGFpbmVyIC5rTWludXRlc3t0ZXh0LWFsaWduOnJpZ2h0fS5rU3Bpbm5lckNvbnRhaW5lciAua1NwaW5uZXJCdG57Zm9udC1zaXplOjEwcHg7Y29sb3I6IzMzM30ua1NwaW5uZXJDb250YWluZXIgLnVpLXN0YXRlLWRpc2FibGVke29wYWNpdHk6LjM1O2ZpbHRlcjpBbHBoYShPcGFjaXR5PTM1KTtiYWNrZ3JvdW5kLWltYWdlOm5vbmU7Y3Vyc29yOmRlZmF1bHQhaW1wb3J0YW50fS5rU3Bpbm5lckNvbnRhaW5lciAudWktc3Bpbm5lci1idXR0b257Ym9yZGVyOjA7bWFyZ2luLXJpZ2h0OjFweDtoZWlnaHQ6MTRweDtjdXJzb3I6cG9pbnRlcn0ua1NwaW5uZXJDb250YWluZXIgLnVpLXNwaW5uZXItZG93bnttYXJnaW4tYm90dG9tOjVweH1gXSxcbiAgcHJvdmlkZXJzOiBbRG9tSGFuZGxlciwgU1BJTk5FUl9WQUxVRV9BQ0NFU1NPUl0sXG59KVxuZXhwb3J0IGNsYXNzIFRpbWVTcGlubmVyQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBAVmlld0NoaWxkKCdtaW51dGVzJykgbWludXRlc0lucHV0RmllbGQ6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ3NlY29uZHMnKSBzZWNvbmRzSW5wdXRGaWVsZDogRWxlbWVudFJlZjtcbiAgXG4gIEBPdXRwdXQoKSBvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvbkZvY3VzOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uQmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIFxuICBwcml2YXRlIF9hbGxvd2VkS2V5cyA9IFtcbiAgICA5LCAgLy8gdGFiXG4gICAgOCwgIC8vIGJhY2tzcGFjZVxuICAgIDM3LCAvLyBsZWZ0QXJyb3dcbiAgICAzOSwgLy8gcmlnaHRBcnJvd1xuICAgIDQ2ICAvLyBkZWxldGVCdG5cbiAgXTtcbiAgcHJpdmF0ZSBfc3BpbktleXMgPSB7XG4gICAgdXBBcnJvdzogMzgsXG4gICAgcmlnaHRBcnJvdzogMzksXG4gICAgZG93bkFycm93OiA0MCxcbiAgICBsZWZ0QXJyb3c6IDM3XG4gIH07XG4gIHByaXZhdGUgX2N1cnJlbnRJbnB1dDogSW5wdXRUeXBlID0gJ21pbnV0ZXMnO1xuICBwcml2YXRlIF9rZXlQYXR0ZXJuOiBSZWdFeHAgPSAvWzAtOV0vO1xuICBwcml2YXRlIF90aW1lcjogYW55O1xuICBcbiAgcHVibGljIF9taW51dGVzQXNTdHJpbmcgPSAnMDAnO1xuICBwdWJsaWMgX3NlY29uZHNBc1N0cmluZyA9ICcwMCc7XG4gIFxuICBwdWJsaWMgX21pbnV0ZXMgPSAwO1xuICBwdWJsaWMgX3NlY29uZHMgPSAwO1xuICBwdWJsaWMgX2Rpc2FibGVkID0gZmFsc2U7XG4gIFxuICBwdWJsaWMgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7XG4gIH07XG4gIFxuICBwdWJsaWMgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge1xuICB9O1xuICBcbiAgcHJpdmF0ZSBfc3BpbihldmVudDogRXZlbnQsIGRpcjogbnVtYmVyKSB7XG4gICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy5fZ2V0Q3VycmVudElucHV0VmFsdWUoKTtcbiAgICBsZXQgbmV4dFZhbHVlID0gY3VycmVudFZhbHVlO1xuICAgIGlmIChjdXJyZW50VmFsdWUgPT09IDAgJiYgZGlyID09PSAtMSkge1xuICAgICAgbmV4dFZhbHVlID0gNTk7XG4gICAgfSBlbHNlIGlmIChjdXJyZW50VmFsdWUgPT09IDU5ICYmIGRpciA9PT0gMSkge1xuICAgICAgbmV4dFZhbHVlID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV4dFZhbHVlID0gY3VycmVudFZhbHVlICsgZGlyO1xuICAgIH1cbiAgICBcbiAgICB0aGlzLl9zZXRDdXJyZW50SW5wdXRWYWx1ZShuZXh0VmFsdWUpO1xuICAgIHRoaXMuX2Zvcm1hdFZhbHVlKCk7XG4gICAgXG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlKCh0aGlzLl9taW51dGVzICogNjApICsgdGhpcy5fc2Vjb25kcyk7XG4gICAgdGhpcy5vbkNoYW5nZS5lbWl0KGV2ZW50KTtcbiAgfVxuICBcbiAgcHJpdmF0ZSBfZ2V0Q3VycmVudElucHV0VmFsdWUoKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5fY3VycmVudElucHV0ID09PSAnbWludXRlcycpIHtcbiAgICAgIHJldHVybiB0aGlzLl9taW51dGVzO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fY3VycmVudElucHV0ID09PSAnc2Vjb25kcycpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zZWNvbmRzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBFcnJvcignTXVzdCBub3QgcmVhY2ggdGhpcyBwYXJ0Jyk7XG4gICAgfVxuICB9XG4gIFxuICBwcml2YXRlIF9zZXRDdXJyZW50SW5wdXRWYWx1ZSh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRJbnB1dCA9PT0gJ21pbnV0ZXMnKSB7XG4gICAgICB0aGlzLl9taW51dGVzID0gdmFsdWU7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9jdXJyZW50SW5wdXQgPT09ICdzZWNvbmRzJykge1xuICAgICAgdGhpcy5fc2Vjb25kcyA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBFcnJvcignTXVzdCBub3QgcmVhY2ggdGhpcyBwYXJ0Jyk7XG4gICAgfVxuICB9XG4gIFxuICBwcml2YXRlIF9zZXRWYWx1ZShpbnB1dDogc3RyaW5nKTogdm9pZCB7XG4gICAgbGV0IHZhbHVlID0gTnVtYmVyKGlucHV0KTtcbiAgICB2YWx1ZSA9IGlzTmFOKHZhbHVlKSA/IDAgOiB2YWx1ZTtcbiAgICBcbiAgICBpZiAodmFsdWUgPiA1OSkge1xuICAgICAgdGhpcy5fc2V0Q3VycmVudElucHV0VmFsdWUoNTkpO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgPCAwKSB7XG4gICAgICB0aGlzLl9zZXRDdXJyZW50SW5wdXRWYWx1ZSgwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2V0Q3VycmVudElucHV0VmFsdWUodmFsdWUpO1xuICAgIH1cbiAgfVxuICBcbiAgcHJpdmF0ZSBfaGlnaGxpZ2h0SW5wdXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRJbnB1dCA9PT0gJ21pbnV0ZXMnKSB7XG4gICAgICB0aGlzLm1pbnV0ZXNJbnB1dEZpZWxkLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIHRoaXMubWludXRlc0lucHV0RmllbGQubmF0aXZlRWxlbWVudC5zZWxlY3QoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2N1cnJlbnRJbnB1dCA9PT0gJ3NlY29uZHMnKSB7XG4gICAgICB0aGlzLnNlY29uZHNJbnB1dEZpZWxkLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIHRoaXMuc2Vjb25kc0lucHV0RmllbGQubmF0aXZlRWxlbWVudC5zZWxlY3QoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoJ011c3Qgbm90IHJlYWNoIHRoaXMgcGFydCcpO1xuICAgIH1cbiAgfVxuICBcbiAgcHJpdmF0ZSBfY2xlYXJUaW1lcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fdGltZXIpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5fdGltZXIpO1xuICAgIH1cbiAgfVxuICBcbiAgcHJpdmF0ZSBfcmVwZWF0KGV2ZW50OiBFdmVudCwgaW50ZXJ2YWw6IG51bWJlciwgZGlyOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBpID0gaW50ZXJ2YWwgfHwgNTAwO1xuICAgIFxuICAgIHRoaXMuX2NsZWFyVGltZXIoKTtcbiAgICB0aGlzLl90aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5fcmVwZWF0KGV2ZW50LCA0MCwgZGlyKTtcbiAgICB9LCBpKTtcbiAgICBcbiAgICB0aGlzLl9zcGluKGV2ZW50LCBkaXIpO1xuICB9XG4gIFxuICBwcml2YXRlIF9mb3JtYXRWYWx1ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fY3VycmVudElucHV0ID09PSAnbWludXRlcycpIHtcbiAgICAgIHRoaXMuX21pbnV0ZXNBc1N0cmluZyA9IHRoaXMuX21pbnV0ZXMgPCAxMCA/IGAwJHt0aGlzLl9taW51dGVzfWAgOiBTdHJpbmcodGhpcy5fbWludXRlcyk7XG4gICAgICB0aGlzLm1pbnV0ZXNJbnB1dEZpZWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLl9taW51dGVzQXNTdHJpbmc7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9jdXJyZW50SW5wdXQgPT09ICdzZWNvbmRzJykge1xuICAgICAgdGhpcy5fc2Vjb25kc0FzU3RyaW5nID0gdGhpcy5fc2Vjb25kcyA8IDEwID8gYDAke3RoaXMuX3NlY29uZHN9YCA6IFN0cmluZyh0aGlzLl9zZWNvbmRzKTtcbiAgICAgIHRoaXMuc2Vjb25kc0lucHV0RmllbGQubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMuX3NlY29uZHNBc1N0cmluZztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoJ011c3Qgbm90IHJlYWNoIHRoaXMgcGFydCcpO1xuICAgIH1cbiAgfVxuICBcbiAgcHJpdmF0ZSBfc2V0RGVmYXVsdFZhbHVlcygpOiB2b2lkIHtcbiAgICB0aGlzLl9taW51dGVzID0gMDtcbiAgICB0aGlzLl9zZWNvbmRzID0gMDtcbiAgICB0aGlzLl9zZWNvbmRzQXNTdHJpbmcgPSAnMDAnO1xuICAgIHRoaXMuX21pbnV0ZXNBc1N0cmluZyA9ICcwMCc7XG4gIH1cbiAgXG4gIHByaXZhdGUgX3NldEluaXRpYWxWYWx1ZXModmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX21pbnV0ZXMgPSBNYXRoLmZsb29yKHZhbHVlIC8gNjApO1xuICAgIHRoaXMuX3NlY29uZHMgPSB2YWx1ZSAlIDYwO1xuICAgIHRoaXMuX21pbnV0ZXNBc1N0cmluZyA9IHRoaXMuX21pbnV0ZXMgPCAxMCA/IGAwJHt0aGlzLl9taW51dGVzfWAgOiBTdHJpbmcodGhpcy5fbWludXRlcyk7XG4gICAgdGhpcy5taW51dGVzSW5wdXRGaWVsZC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5fbWludXRlc0FzU3RyaW5nO1xuICAgIHRoaXMuX3NlY29uZHNBc1N0cmluZyA9IHRoaXMuX3NlY29uZHMgPCAxMCA/IGAwJHt0aGlzLl9zZWNvbmRzfWAgOiBTdHJpbmcodGhpcy5fc2Vjb25kcyk7XG4gICAgdGhpcy5zZWNvbmRzSW5wdXRGaWVsZC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5fc2Vjb25kc0FzU3RyaW5nO1xuICB9XG4gIFxuICBwdWJsaWMgX29uSW5wdXRLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2ZW50LndoaWNoID09PSB0aGlzLl9zcGluS2V5cy51cEFycm93IHx8IGV2ZW50LndoaWNoID09PSB0aGlzLl9zcGluS2V5cy5yaWdodEFycm93KSB7XG4gICAgICAvLyBpbmNyZW1lbnRcbiAgICAgIHRoaXMuX3NwaW4oZXZlbnQsIDEpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50LndoaWNoID09PSB0aGlzLl9zcGluS2V5cy5kb3duQXJyb3cgfHwgZXZlbnQud2hpY2ggPT09IHRoaXMuX3NwaW5LZXlzLmxlZnRBcnJvdykge1xuICAgICAgLy8gZGVjcmVtZW50XG4gICAgICB0aGlzLl9zcGluKGV2ZW50LCAtMSk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuICBcbiAgcHVibGljIF9vbklucHV0S2V5UHJlc3MoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBpbnB1dENoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGV2ZW50LmNoYXJDb2RlKTtcbiAgICBjb25zdCBub3RBTnVtYmVyID0gIXRoaXMuX2tleVBhdHRlcm4udGVzdChpbnB1dENoYXIpO1xuICAgIGNvbnN0IG5vdEFsbG93ZWRLZXkgPSB0aGlzLl9hbGxvd2VkS2V5cy5pbmRleE9mKGV2ZW50LmtleUNvZGUpID09PSAtMTtcbiAgICBpZiAobm90QU51bWJlciAmJiBub3RBbGxvd2VkS2V5KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuICBcbiAgcHVibGljIF9vbklucHV0S2V5dXAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBpbnB1dFZhbHVlID0gKDxIVE1MSW5wdXRFbGVtZW50PiBldmVudC50YXJnZXQpLnZhbHVlO1xuICAgIHRoaXMuX3NldFZhbHVlKGlucHV0VmFsdWUpO1xuICAgIHRoaXMuX2Zvcm1hdFZhbHVlKCk7XG4gICAgXG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlKCh0aGlzLl9taW51dGVzICogNjApICsgdGhpcy5fc2Vjb25kcyk7XG4gIH1cbiAgXG4gIHB1YmxpYyBfaGFuZGxlQ2hhbmdlKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZS5lbWl0KGV2ZW50KTtcbiAgfVxuICBcbiAgcHVibGljIF9vbklucHV0Rm9jdXMoZXZlbnQ6IEtleWJvYXJkRXZlbnQsIGlucHV0OiBJbnB1dFR5cGUpOiB2b2lkIHtcbiAgICB0aGlzLl9jdXJyZW50SW5wdXQgPSBpbnB1dDtcbiAgICB0aGlzLm9uRm9jdXMuZW1pdChldmVudCk7XG4gIH1cbiAgXG4gIHB1YmxpYyBfb25JbnB1dEJsdXIoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XG4gICAgdGhpcy5vbkJsdXIuZW1pdChldmVudCk7XG4gIH1cbiAgXG4gIHB1YmxpYyBfb25CdXR0b25Nb3VzZWRvd24oZXZlbnQ6IEV2ZW50LCBkaXI6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICghdGhpcy5fZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuX2hpZ2hsaWdodElucHV0KCk7XG4gICAgICB0aGlzLl9yZXBlYXQoZXZlbnQsIG51bGwsIGRpcik7XG4gICAgfVxuICB9XG4gIFxuICBwdWJsaWMgX29uQnV0dG9uTW91c2V1cChldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2Rpc2FibGVkKSB7XG4gICAgICB0aGlzLl9jbGVhclRpbWVyKCk7XG4gICAgfVxuICB9XG4gIFxuICBwdWJsaWMgX29uQnV0dG9uTW91c2VsZWF2ZShldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2Rpc2FibGVkKSB7XG4gICAgICB0aGlzLl9jbGVhclRpbWVyKCk7XG4gICAgfVxuICB9XG4gIFxuICBwdWJsaWMgc2V0RGlzYWJsZWRTdGF0ZSh2YWw6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IHZhbDtcbiAgfVxuICBcbiAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLl9zZXREZWZhdWx0VmFsdWVzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3NldEluaXRpYWxWYWx1ZXModmFsdWUpO1xuICAgIH1cbiAgfVxuICBcbiAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XG4gIH1cbiAgXG4gIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gIH1cbiAgXG59XG4iXX0=