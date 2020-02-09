import { ElementRef, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare type InputType = 'minutes' | 'seconds';
export declare const SPINNER_VALUE_ACCESSOR: any;
export declare class TimeSpinnerComponent implements ControlValueAccessor {
    minutesInputField: ElementRef;
    secondsInputField: ElementRef;
    onChange: EventEmitter<any>;
    onFocus: EventEmitter<any>;
    onBlur: EventEmitter<any>;
    private _allowedKeys;
    private _spinKeys;
    private _currentInput;
    private _keyPattern;
    private _timer;
    _minutesAsString: string;
    _secondsAsString: string;
    _minutes: number;
    _seconds: number;
    _disabled: boolean;
    onModelChange: Function;
    onModelTouched: Function;
    private _spin;
    private _getCurrentInputValue;
    private _setCurrentInputValue;
    private _setValue;
    private _highlightInput;
    private _clearTimer;
    private _repeat;
    private _formatValue;
    private _setDefaultValues;
    private _setInitialValues;
    _onInputKeydown(event: KeyboardEvent): void;
    _onInputKeyPress(event: KeyboardEvent): void;
    _onInputKeyup(event: KeyboardEvent): void;
    _handleChange(event: KeyboardEvent): void;
    _onInputFocus(event: KeyboardEvent, input: InputType): void;
    _onInputBlur(event: KeyboardEvent): void;
    _onButtonMousedown(event: Event, dir: number): void;
    _onButtonMouseup(event: Event): void;
    _onButtonMouseleave(event: Event): void;
    setDisabledState(val: boolean): void;
    writeValue(value: number): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
}
