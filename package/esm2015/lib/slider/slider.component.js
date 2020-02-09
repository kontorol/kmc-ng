/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, forwardRef, Input } from '@angular/core';
import { DomHandler } from "primeng/components/dom/domhandler";
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Slider } from "primeng/primeng";
/* tslint:disable */
/** @type {?} */
export const KALTURA_SLIDER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SliderComponent),
    multi: true
};
/* tslint:enable */
// [kmcng] upon upgrade: compare implemented interfaces in the original component (no need to include ControlValueAccessor)
export class SliderComponent extends Slider {
    constructor() {
        super(...arguments);
        this.tooltip = true;
    }
}
SliderComponent.decorators = [
    { type: Component, args: [{
                selector: 'kSlider',
                styles: [`:host /deep/ .ui-slider{background-color:#ccc;height:6px;border:none}:host /deep/ .ui-slider .ui-slider-range{background:#00a784;border:2px solid #00a784}:host /deep/ .ui-slider .ui-slider-handle{top:-.3em;margin-left:-.6em;border-radius:50%;border:2px solid #00a784;height:16px;width:16px;box-shadow:0 2px 8px 0 rgba(0,0,0,.24)}`],
                template: `<div [ngStyle]="style" [class]="styleClass"
     [ngClass]="{
         'ui-slider ui-widget ui-widget-content ui-corner-all':true,
         'ui-state-disabled':disabled,
         'ui-slider-horizontal':orientation == 'horizontal',
         'ui-slider-vertical':orientation == 'vertical',
         'ui-slider-animate':animate
     }"
     (click)="onBarClick($event)">

    <span *ngIf="range && orientation == 'horizontal'"
          class="ui-slider-range ui-widget-header ui-corner-all"
          [ngStyle]="{'left':handleValues[0] + '%',width: (handleValues[1] - handleValues[0] + '%')}"></span>

    <span *ngIf="range && orientation == 'vertical'"
          class="ui-slider-range ui-widget-header ui-corner-all"
          [ngStyle]="{'bottom':handleValues[0] + '%',height: (handleValues[1] - handleValues[0] + '%')}"></span>

    <span *ngIf="!range && orientation=='vertical'"
          class="ui-slider-range ui-slider-range-min ui-widget-header ui-corner-all"
          [ngStyle]="{'height': handleValue + '%'}"></span>

    <span *ngIf="!range && orientation=='horizontal'"
          class="ui-slider-range ui-slider-range-min ui-widget-header ui-corner-all"
          [ngStyle]="{'width': handleValue + '%'}"></span>

    <span *ngIf="!range"
          class="ui-slider-handle ui-state-default ui-corner-all ui-clickable"
          (mousedown)="onMouseDown($event)"
          (touchstart)="onTouchStart($event)"
          (touchmove)="onTouchMove($event)"
          (touchend)="dragging=false"
          [style.transition]="dragging ? 'none': null"
          [ngStyle]="{
            'left': orientation == 'horizontal' ? handleValue + '%' : null,
            'bottom': orientation == 'vertical' ? handleValue + '%' : null
          }"
          [kTooltip]="tooltip ? value : ''"
          [followTarget]="true"></span>

    <span *ngIf="range"
          (mousedown)="onMouseDown($event,0)"
          (touchstart)="onTouchStart($event,0)"
          (touchmove)="onTouchMove($event,0)"
          (touchend)="dragging=false"
          [style.transition]="dragging ? 'none': null"
          class="ui-slider-handle ui-state-default ui-corner-all ui-clickable"
          [ngStyle]="{'left': rangeStartLeft, 'bottom': rangeStartBottom}"
          [ngClass]="{'ui-slider-handle-active':handleIndex==0}"
          [kTooltip]="tooltip ? values[handleIndex] : ''"
          [followTarget]="true"></span>

    <span *ngIf="range"
          (mousedown)="onMouseDown($event,1)"
          (touchstart)="onTouchStart($event,1)"
          (touchmove)="onTouchMove($event,1)"
          (touchend)="dragging=false"
          [style.transition]="dragging ? 'none': null"
          class="ui-slider-handle ui-state-default ui-corner-all ui-clickable"
          [ngStyle]="{'left': rangeEndLeft, 'bottom': rangeEndBottom}"
          [ngClass]="{'ui-slider-handle-active':handleIndex==1}"
          [kTooltip]="tooltip ? values[handleIndex] : ''"
          [followTarget]="true"></span>
</div>`,
                providers: [DomHandler, KALTURA_SLIDER_VALUE_ACCESSOR]
                /* tslint:enable */
            },] },
];
SliderComponent.propDecorators = {
    tooltip: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    SliderComponent.prototype.tooltip;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrYWx0dXJhLW5nL2thbHR1cmEtcHJpbWVuZy11aS8iLCJzb3VyY2VzIjpbImxpYi9zbGlkZXIvc2xpZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUMvRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7OztBQUd6QyxNQUFNLE9BQU8sNkJBQTZCLEdBQVE7SUFDaEQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGVBQWUsQ0FBQztJQUM5QyxLQUFLLEVBQUUsSUFBSTtDQUNaOztBQTBFRCwySEFBMkg7QUFDM0gsTUFBTSxPQUFPLGVBQWdCLFNBQVEsTUFBTTtJQXZFM0M7O1FBd0VXLFlBQU8sR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQzs7O1lBekVBLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsU0FBUztnQkFDbkIsTUFBTSxFQUFFLENBQUMsMlVBQTJVLENBQUM7Z0JBQ3JWLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BK0RMO2dCQUNMLFNBQVMsRUFBRSxDQUFDLFVBQVUsRUFBRSw2QkFBNkIsQ0FBQztnQkFDdEQsbUJBQW1CO2FBQ3BCOzs7c0JBR0UsS0FBSzs7OztJQUFOLGtDQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgZm9yd2FyZFJlZiwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbUhhbmRsZXIgfSBmcm9tIFwicHJpbWVuZy9jb21wb25lbnRzL2RvbS9kb21oYW5kbGVyXCI7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFNsaWRlciB9IGZyb20gXCJwcmltZW5nL3ByaW1lbmdcIjtcblxuLyogdHNsaW50OmRpc2FibGUgKi9cbmV4cG9ydCBjb25zdCBLQUxUVVJBX1NMSURFUl9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gU2xpZGVyQ29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbi8qIHRzbGludDplbmFibGUgKi9cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAna1NsaWRlcicsXG4gIHN0eWxlczogW2A6aG9zdCAvZGVlcC8gLnVpLXNsaWRlcntiYWNrZ3JvdW5kLWNvbG9yOiNjY2M7aGVpZ2h0OjZweDtib3JkZXI6bm9uZX06aG9zdCAvZGVlcC8gLnVpLXNsaWRlciAudWktc2xpZGVyLXJhbmdle2JhY2tncm91bmQ6IzAwYTc4NDtib3JkZXI6MnB4IHNvbGlkICMwMGE3ODR9Omhvc3QgL2RlZXAvIC51aS1zbGlkZXIgLnVpLXNsaWRlci1oYW5kbGV7dG9wOi0uM2VtO21hcmdpbi1sZWZ0Oi0uNmVtO2JvcmRlci1yYWRpdXM6NTAlO2JvcmRlcjoycHggc29saWQgIzAwYTc4NDtoZWlnaHQ6MTZweDt3aWR0aDoxNnB4O2JveC1zaGFkb3c6MCAycHggOHB4IDAgcmdiYSgwLDAsMCwuMjQpfWBdLFxuICB0ZW1wbGF0ZTogYDxkaXYgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiXG4gICAgIFtuZ0NsYXNzXT1cIntcbiAgICAgICAgICd1aS1zbGlkZXIgdWktd2lkZ2V0IHVpLXdpZGdldC1jb250ZW50IHVpLWNvcm5lci1hbGwnOnRydWUsXG4gICAgICAgICAndWktc3RhdGUtZGlzYWJsZWQnOmRpc2FibGVkLFxuICAgICAgICAgJ3VpLXNsaWRlci1ob3Jpem9udGFsJzpvcmllbnRhdGlvbiA9PSAnaG9yaXpvbnRhbCcsXG4gICAgICAgICAndWktc2xpZGVyLXZlcnRpY2FsJzpvcmllbnRhdGlvbiA9PSAndmVydGljYWwnLFxuICAgICAgICAgJ3VpLXNsaWRlci1hbmltYXRlJzphbmltYXRlXG4gICAgIH1cIlxuICAgICAoY2xpY2spPVwib25CYXJDbGljaygkZXZlbnQpXCI+XG5cbiAgICA8c3BhbiAqbmdJZj1cInJhbmdlICYmIG9yaWVudGF0aW9uID09ICdob3Jpem9udGFsJ1wiXG4gICAgICAgICAgY2xhc3M9XCJ1aS1zbGlkZXItcmFuZ2UgdWktd2lkZ2V0LWhlYWRlciB1aS1jb3JuZXItYWxsXCJcbiAgICAgICAgICBbbmdTdHlsZV09XCJ7J2xlZnQnOmhhbmRsZVZhbHVlc1swXSArICclJyx3aWR0aDogKGhhbmRsZVZhbHVlc1sxXSAtIGhhbmRsZVZhbHVlc1swXSArICclJyl9XCI+PC9zcGFuPlxuXG4gICAgPHNwYW4gKm5nSWY9XCJyYW5nZSAmJiBvcmllbnRhdGlvbiA9PSAndmVydGljYWwnXCJcbiAgICAgICAgICBjbGFzcz1cInVpLXNsaWRlci1yYW5nZSB1aS13aWRnZXQtaGVhZGVyIHVpLWNvcm5lci1hbGxcIlxuICAgICAgICAgIFtuZ1N0eWxlXT1cInsnYm90dG9tJzpoYW5kbGVWYWx1ZXNbMF0gKyAnJScsaGVpZ2h0OiAoaGFuZGxlVmFsdWVzWzFdIC0gaGFuZGxlVmFsdWVzWzBdICsgJyUnKX1cIj48L3NwYW4+XG5cbiAgICA8c3BhbiAqbmdJZj1cIiFyYW5nZSAmJiBvcmllbnRhdGlvbj09J3ZlcnRpY2FsJ1wiXG4gICAgICAgICAgY2xhc3M9XCJ1aS1zbGlkZXItcmFuZ2UgdWktc2xpZGVyLXJhbmdlLW1pbiB1aS13aWRnZXQtaGVhZGVyIHVpLWNvcm5lci1hbGxcIlxuICAgICAgICAgIFtuZ1N0eWxlXT1cInsnaGVpZ2h0JzogaGFuZGxlVmFsdWUgKyAnJSd9XCI+PC9zcGFuPlxuXG4gICAgPHNwYW4gKm5nSWY9XCIhcmFuZ2UgJiYgb3JpZW50YXRpb249PSdob3Jpem9udGFsJ1wiXG4gICAgICAgICAgY2xhc3M9XCJ1aS1zbGlkZXItcmFuZ2UgdWktc2xpZGVyLXJhbmdlLW1pbiB1aS13aWRnZXQtaGVhZGVyIHVpLWNvcm5lci1hbGxcIlxuICAgICAgICAgIFtuZ1N0eWxlXT1cInsnd2lkdGgnOiBoYW5kbGVWYWx1ZSArICclJ31cIj48L3NwYW4+XG5cbiAgICA8c3BhbiAqbmdJZj1cIiFyYW5nZVwiXG4gICAgICAgICAgY2xhc3M9XCJ1aS1zbGlkZXItaGFuZGxlIHVpLXN0YXRlLWRlZmF1bHQgdWktY29ybmVyLWFsbCB1aS1jbGlja2FibGVcIlxuICAgICAgICAgIChtb3VzZWRvd24pPVwib25Nb3VzZURvd24oJGV2ZW50KVwiXG4gICAgICAgICAgKHRvdWNoc3RhcnQpPVwib25Ub3VjaFN0YXJ0KCRldmVudClcIlxuICAgICAgICAgICh0b3VjaG1vdmUpPVwib25Ub3VjaE1vdmUoJGV2ZW50KVwiXG4gICAgICAgICAgKHRvdWNoZW5kKT1cImRyYWdnaW5nPWZhbHNlXCJcbiAgICAgICAgICBbc3R5bGUudHJhbnNpdGlvbl09XCJkcmFnZ2luZyA/ICdub25lJzogbnVsbFwiXG4gICAgICAgICAgW25nU3R5bGVdPVwie1xuICAgICAgICAgICAgJ2xlZnQnOiBvcmllbnRhdGlvbiA9PSAnaG9yaXpvbnRhbCcgPyBoYW5kbGVWYWx1ZSArICclJyA6IG51bGwsXG4gICAgICAgICAgICAnYm90dG9tJzogb3JpZW50YXRpb24gPT0gJ3ZlcnRpY2FsJyA/IGhhbmRsZVZhbHVlICsgJyUnIDogbnVsbFxuICAgICAgICAgIH1cIlxuICAgICAgICAgIFtrVG9vbHRpcF09XCJ0b29sdGlwID8gdmFsdWUgOiAnJ1wiXG4gICAgICAgICAgW2ZvbGxvd1RhcmdldF09XCJ0cnVlXCI+PC9zcGFuPlxuXG4gICAgPHNwYW4gKm5nSWY9XCJyYW5nZVwiXG4gICAgICAgICAgKG1vdXNlZG93bik9XCJvbk1vdXNlRG93bigkZXZlbnQsMClcIlxuICAgICAgICAgICh0b3VjaHN0YXJ0KT1cIm9uVG91Y2hTdGFydCgkZXZlbnQsMClcIlxuICAgICAgICAgICh0b3VjaG1vdmUpPVwib25Ub3VjaE1vdmUoJGV2ZW50LDApXCJcbiAgICAgICAgICAodG91Y2hlbmQpPVwiZHJhZ2dpbmc9ZmFsc2VcIlxuICAgICAgICAgIFtzdHlsZS50cmFuc2l0aW9uXT1cImRyYWdnaW5nID8gJ25vbmUnOiBudWxsXCJcbiAgICAgICAgICBjbGFzcz1cInVpLXNsaWRlci1oYW5kbGUgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsIHVpLWNsaWNrYWJsZVwiXG4gICAgICAgICAgW25nU3R5bGVdPVwieydsZWZ0JzogcmFuZ2VTdGFydExlZnQsICdib3R0b20nOiByYW5nZVN0YXJ0Qm90dG9tfVwiXG4gICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1zbGlkZXItaGFuZGxlLWFjdGl2ZSc6aGFuZGxlSW5kZXg9PTB9XCJcbiAgICAgICAgICBba1Rvb2x0aXBdPVwidG9vbHRpcCA/IHZhbHVlc1toYW5kbGVJbmRleF0gOiAnJ1wiXG4gICAgICAgICAgW2ZvbGxvd1RhcmdldF09XCJ0cnVlXCI+PC9zcGFuPlxuXG4gICAgPHNwYW4gKm5nSWY9XCJyYW5nZVwiXG4gICAgICAgICAgKG1vdXNlZG93bik9XCJvbk1vdXNlRG93bigkZXZlbnQsMSlcIlxuICAgICAgICAgICh0b3VjaHN0YXJ0KT1cIm9uVG91Y2hTdGFydCgkZXZlbnQsMSlcIlxuICAgICAgICAgICh0b3VjaG1vdmUpPVwib25Ub3VjaE1vdmUoJGV2ZW50LDEpXCJcbiAgICAgICAgICAodG91Y2hlbmQpPVwiZHJhZ2dpbmc9ZmFsc2VcIlxuICAgICAgICAgIFtzdHlsZS50cmFuc2l0aW9uXT1cImRyYWdnaW5nID8gJ25vbmUnOiBudWxsXCJcbiAgICAgICAgICBjbGFzcz1cInVpLXNsaWRlci1oYW5kbGUgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsIHVpLWNsaWNrYWJsZVwiXG4gICAgICAgICAgW25nU3R5bGVdPVwieydsZWZ0JzogcmFuZ2VFbmRMZWZ0LCAnYm90dG9tJzogcmFuZ2VFbmRCb3R0b219XCJcbiAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXNsaWRlci1oYW5kbGUtYWN0aXZlJzpoYW5kbGVJbmRleD09MX1cIlxuICAgICAgICAgIFtrVG9vbHRpcF09XCJ0b29sdGlwID8gdmFsdWVzW2hhbmRsZUluZGV4XSA6ICcnXCJcbiAgICAgICAgICBbZm9sbG93VGFyZ2V0XT1cInRydWVcIj48L3NwYW4+XG48L2Rpdj5gLFxuICBwcm92aWRlcnM6IFtEb21IYW5kbGVyLCBLQUxUVVJBX1NMSURFUl9WQUxVRV9BQ0NFU1NPUl1cbiAgLyogdHNsaW50OmVuYWJsZSAqL1xufSlcbi8vIFtrbWNuZ10gdXBvbiB1cGdyYWRlOiBjb21wYXJlIGltcGxlbWVudGVkIGludGVyZmFjZXMgaW4gdGhlIG9yaWdpbmFsIGNvbXBvbmVudCAobm8gbmVlZCB0byBpbmNsdWRlIENvbnRyb2xWYWx1ZUFjY2Vzc29yKVxuZXhwb3J0IGNsYXNzIFNsaWRlckNvbXBvbmVudCBleHRlbmRzIFNsaWRlciB7XG4gIEBJbnB1dCgpIHRvb2x0aXAgPSB0cnVlO1xufVxuIl19