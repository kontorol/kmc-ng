/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomHandler } from 'primeng/primeng';
/** @type {?} */
export const CLEARABLE_INPUT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ClearableInputComponent),
    multi: true
};
export class ClearableInputComponent {
    constructor() {
        this.onChange = new EventEmitter();
        this.onFocus = new EventEmitter();
        this.onBlur = new EventEmitter();
        this.onEnterKeyup = new EventEmitter();
        this.onClear = new EventEmitter();
        this._disabled = false;
        this._value = '';
        this._showClearBtn = false;
        this.onModelChange = () => {
        };
        this.onModelTouched = () => {
        };
    }
    /**
     * @return {?}
     */
    _clearInput() {
        this._value = '';
        this._showClearBtn = false;
        this.onModelChange(this._value);
        this.onChange.emit(this._value);
        this.onClear.emit();
    }
    /**
     * @param {?} val
     * @return {?}
     */
    setDisabledState(val) {
        this._disabled = val;
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
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this._value = String(value || '');
        if (!this._value.trim()) {
            this._showClearBtn = false;
        }
    }
    /**
     * @return {?}
     */
    clearValue() {
        this._value = '';
        this._showClearBtn = false;
        this.onModelChange(this._value);
        this.onChange.emit(this._value);
    }
    /**
     * @return {?}
     */
    _enterPressed() {
        this.onEnterKeyup.emit(this._value);
        this._showClearBtn = !!this._value;
    }
}
ClearableInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'kClearableInput',
                template: `<span class="k-clearable-input-wrapper">
    <input pInputText
           class="k-clearable-input-input"
           [disabled]="disabled || _disabled"
           [placeholder]="placeholder"
           (change)="onChange.emit($event)"
           (focus)="onFocus.emit($event)"
           (blur)="onBlur.emit($event)"
           (keyup.enter)="_enterPressed()"
           [(ngModel)]="_value">
    <i *ngIf="_showClearBtn" class="k-clearable-input-clear-btn" title="Clear" (click)="_clearInput()">&times;</i>
</span>`,
                styles: [`.k-clearable-input-wrapper{position:relative}.k-clearable-input-wrapper .k-clearable-input-clear-btn{cursor:pointer;position:absolute;right:5px;top:-6px;font-weight:700;font-size:1.2em;color:#999;font-style:normal}`],
                providers: [DomHandler, CLEARABLE_INPUT_VALUE_ACCESSOR],
            },] },
];
ClearableInputComponent.propDecorators = {
    disabled: [{ type: Input }],
    placeholder: [{ type: Input }],
    onChange: [{ type: Output }],
    onFocus: [{ type: Output }],
    onBlur: [{ type: Output }],
    onEnterKeyup: [{ type: Output }],
    onClear: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    ClearableInputComponent.prototype.disabled;
    /** @type {?} */
    ClearableInputComponent.prototype.placeholder;
    /** @type {?} */
    ClearableInputComponent.prototype.onChange;
    /** @type {?} */
    ClearableInputComponent.prototype.onFocus;
    /** @type {?} */
    ClearableInputComponent.prototype.onBlur;
    /** @type {?} */
    ClearableInputComponent.prototype.onEnterKeyup;
    /** @type {?} */
    ClearableInputComponent.prototype.onClear;
    /** @type {?} */
    ClearableInputComponent.prototype._disabled;
    /** @type {?} */
    ClearableInputComponent.prototype._value;
    /** @type {?} */
    ClearableInputComponent.prototype._showClearBtn;
    /** @type {?} */
    ClearableInputComponent.prototype.onModelChange;
    /** @type {?} */
    ClearableInputComponent.prototype.onModelTouched;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xlYXJhYmxlLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrYWx0dXJhLW5nL2thbHR1cmEtcHJpbWVuZy11aS8iLCJzb3VyY2VzIjpbImxpYi9jbGVhcmFibGUtaW5wdXQvY2xlYXJhYmxlLWlucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFFN0MsTUFBTSxPQUFPLDhCQUE4QixHQUFRO0lBQ2pELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztJQUN0RCxLQUFLLEVBQUUsSUFBSTtDQUNaO0FBbUJELE1BQU0sT0FBTyx1QkFBdUI7SUFqQnBDO1FBcUJZLGFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNqRCxZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDaEQsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQy9DLGlCQUFZLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7UUFDaEUsWUFBTyxHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBRTFELGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUNaLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBVXRCLGtCQUFhLEdBQWEsR0FBRyxFQUFFO1FBQ3RDLENBQUMsQ0FBQztRQUVLLG1CQUFjLEdBQWEsR0FBRyxFQUFFO1FBQ3ZDLENBQUMsQ0FBQztJQWlDSixDQUFDOzs7O0lBN0NRLFdBQVc7UUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7Ozs7SUFRTSxnQkFBZ0IsQ0FBQyxHQUFZO1FBQ2xDLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO0lBQ3ZCLENBQUM7Ozs7O0lBRU0sZ0JBQWdCLENBQUMsRUFBWTtRQUNsQyxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztJQUMxQixDQUFDOzs7OztJQUVNLGlCQUFpQixDQUFDLEVBQVk7UUFDbkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7Ozs7SUFFTSxVQUFVLENBQUMsS0FBVTtRQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUM7UUFFbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7U0FDNUI7SUFDSCxDQUFDOzs7O0lBRU0sVUFBVTtRQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsQyxDQUFDOzs7O0lBRU0sYUFBYTtRQUNsQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQyxDQUFDOzs7WUEzRUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7UUFXSjtnQkFDTixNQUFNLEVBQUUsQ0FBQyx3TkFBd04sQ0FBQztnQkFDbE8sU0FBUyxFQUFFLENBQUMsVUFBVSxFQUFFLDhCQUE4QixDQUFDO2FBQ3hEOzs7dUJBRUUsS0FBSzswQkFDTCxLQUFLO3VCQUVMLE1BQU07c0JBQ04sTUFBTTtxQkFDTixNQUFNOzJCQUNOLE1BQU07c0JBQ04sTUFBTTs7OztJQVBQLDJDQUEyQjs7SUFDM0IsOENBQTZCOztJQUU3QiwyQ0FBMkQ7O0lBQzNELDBDQUEwRDs7SUFDMUQseUNBQXlEOztJQUN6RCwrQ0FBMEU7O0lBQzFFLDBDQUFpRTs7SUFFakUsNENBQXlCOztJQUN6Qix5Q0FBbUI7O0lBQ25CLGdEQUE2Qjs7SUFVN0IsZ0RBQ0U7O0lBRUYsaURBQ0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XG5cbmV4cG9ydCBjb25zdCBDTEVBUkFCTEVfSU5QVVRfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IENsZWFyYWJsZUlucHV0Q29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2tDbGVhcmFibGVJbnB1dCcsXG4gIHRlbXBsYXRlOiBgPHNwYW4gY2xhc3M9XCJrLWNsZWFyYWJsZS1pbnB1dC13cmFwcGVyXCI+XG4gICAgPGlucHV0IHBJbnB1dFRleHRcbiAgICAgICAgICAgY2xhc3M9XCJrLWNsZWFyYWJsZS1pbnB1dC1pbnB1dFwiXG4gICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZCB8fCBfZGlzYWJsZWRcIlxuICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICAgICAgICAgICAoY2hhbmdlKT1cIm9uQ2hhbmdlLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgICAgIChmb2N1cyk9XCJvbkZvY3VzLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgICAgIChibHVyKT1cIm9uQmx1ci5lbWl0KCRldmVudClcIlxuICAgICAgICAgICAoa2V5dXAuZW50ZXIpPVwiX2VudGVyUHJlc3NlZCgpXCJcbiAgICAgICAgICAgWyhuZ01vZGVsKV09XCJfdmFsdWVcIj5cbiAgICA8aSAqbmdJZj1cIl9zaG93Q2xlYXJCdG5cIiBjbGFzcz1cImstY2xlYXJhYmxlLWlucHV0LWNsZWFyLWJ0blwiIHRpdGxlPVwiQ2xlYXJcIiAoY2xpY2spPVwiX2NsZWFySW5wdXQoKVwiPiZ0aW1lczs8L2k+XG48L3NwYW4+YCxcbiAgc3R5bGVzOiBbYC5rLWNsZWFyYWJsZS1pbnB1dC13cmFwcGVye3Bvc2l0aW9uOnJlbGF0aXZlfS5rLWNsZWFyYWJsZS1pbnB1dC13cmFwcGVyIC5rLWNsZWFyYWJsZS1pbnB1dC1jbGVhci1idG57Y3Vyc29yOnBvaW50ZXI7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6NXB4O3RvcDotNnB4O2ZvbnQtd2VpZ2h0OjcwMDtmb250LXNpemU6MS4yZW07Y29sb3I6Izk5OTtmb250LXN0eWxlOm5vcm1hbH1gXSxcbiAgcHJvdmlkZXJzOiBbRG9tSGFuZGxlciwgQ0xFQVJBQkxFX0lOUFVUX1ZBTFVFX0FDQ0VTU09SXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xlYXJhYmxlSW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICBcbiAgQE91dHB1dCgpIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uRm9jdXM6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25CbHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uRW50ZXJLZXl1cDogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgQE91dHB1dCgpIG9uQ2xlYXI6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgXG4gIHB1YmxpYyBfZGlzYWJsZWQgPSBmYWxzZTtcbiAgcHVibGljIF92YWx1ZSA9ICcnO1xuICBwdWJsaWMgX3Nob3dDbGVhckJ0biA9IGZhbHNlO1xuICBcbiAgcHVibGljIF9jbGVhcklucHV0KCk6IHZvaWQge1xuICAgIHRoaXMuX3ZhbHVlID0gJyc7XG4gICAgdGhpcy5fc2hvd0NsZWFyQnRuID0gZmFsc2U7XG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMuX3ZhbHVlKTtcbiAgICB0aGlzLm9uQ2hhbmdlLmVtaXQodGhpcy5fdmFsdWUpO1xuICAgIHRoaXMub25DbGVhci5lbWl0KCk7XG4gIH1cbiAgXG4gIHB1YmxpYyBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHtcbiAgfTtcbiAgXG4gIHB1YmxpYyBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7XG4gIH07XG4gIFxuICBwdWJsaWMgc2V0RGlzYWJsZWRTdGF0ZSh2YWw6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IHZhbDtcbiAgfVxuICBcbiAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XG4gIH1cbiAgXG4gIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gIH1cbiAgXG4gIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl92YWx1ZSA9IFN0cmluZyh2YWx1ZSB8fCAnJyk7XG4gICAgXG4gICAgaWYgKCF0aGlzLl92YWx1ZS50cmltKCkpIHtcbiAgICAgIHRoaXMuX3Nob3dDbGVhckJ0biA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBcbiAgcHVibGljIGNsZWFyVmFsdWUoKTogdm9pZCB7XG4gICAgdGhpcy5fdmFsdWUgPSAnJztcbiAgICB0aGlzLl9zaG93Q2xlYXJCdG4gPSBmYWxzZTtcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy5fdmFsdWUpO1xuICAgIHRoaXMub25DaGFuZ2UuZW1pdCh0aGlzLl92YWx1ZSk7XG4gIH1cbiAgXG4gIHB1YmxpYyBfZW50ZXJQcmVzc2VkKCk6IHZvaWQge1xuICAgIHRoaXMub25FbnRlcktleXVwLmVtaXQodGhpcy5fdmFsdWUpO1xuICAgIHRoaXMuX3Nob3dDbGVhckJ0biA9ICEhdGhpcy5fdmFsdWU7XG4gIH1cbn1cbiJdfQ==