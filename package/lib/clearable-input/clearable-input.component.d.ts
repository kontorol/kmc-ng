import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const CLEARABLE_INPUT_VALUE_ACCESSOR: any;
export declare class ClearableInputComponent implements ControlValueAccessor {
    disabled: boolean;
    placeholder: string;
    onChange: EventEmitter<any>;
    onFocus: EventEmitter<any>;
    onBlur: EventEmitter<any>;
    onEnterKeyup: EventEmitter<string>;
    onClear: EventEmitter<void>;
    _disabled: boolean;
    _value: string;
    _showClearBtn: boolean;
    _clearInput(): void;
    onModelChange: Function;
    onModelTouched: Function;
    setDisabledState(val: boolean): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    writeValue(value: any): void;
    clearValue(): void;
    _enterPressed(): void;
}
