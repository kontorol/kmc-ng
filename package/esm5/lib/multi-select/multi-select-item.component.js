/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
var MultiSelectItem = /** @class */ (function () {
    function MultiSelectItem() {
        this.onClick = new EventEmitter();
        this.onKeydown = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    MultiSelectItem.prototype.onOptionClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.onClick.emit({
            originalEvent: event,
            option: this.option
        });
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MultiSelectItem.prototype.onOptionKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.onKeydown.emit({
            originalEvent: event,
            option: this.option
        });
    };
    MultiSelectItem.decorators = [
        { type: Component, args: [{
                    selector: 'p-multiSelectItem',
                    template: "\n    <li class=\"ui-multiselect-item ui-corner-all\" (click)=\"onOptionClick($event)\" (keydown)=\"onOptionKeydown($event)\"\n        [style.display]=\"visible ? 'block' : 'none'\" [attr.tabindex]=\"option.disabled ? null : '0'\" [ngStyle]=\"{'height': itemSize + 'px'}\"\n        [ngClass]=\"{'ui-state-highlight': selected, 'ui-state-disabled': (option.disabled || (maxSelectionLimitReached && !selected))}\">\n      <div class=\"ui-chkbox ui-widget\">\n        <div class=\"ui-chkbox-box ui-widget ui-corner-all ui-state-default\"\n             [ngClass]=\"{'ui-state-active': selected}\">\n          <span class=\"ui-chkbox-icon ui-clickable\" [ngClass]=\"{'pi pi-check': selected}\"></span>\n        </div>\n      </div>\n      <label *ngIf=\"!template\">{{option.label}}</label>\n      <ng-container *ngTemplateOutlet=\"template; context: {$implicit: option}\"></ng-container>\n    </li>\n  "
                },] },
    ];
    MultiSelectItem.propDecorators = {
        option: [{ type: Input }],
        selected: [{ type: Input }],
        disabled: [{ type: Input }],
        visible: [{ type: Input }],
        itemSize: [{ type: Input }],
        template: [{ type: Input }],
        maxSelectionLimitReached: [{ type: Input }],
        onClick: [{ type: Output }],
        onKeydown: [{ type: Output }]
    };
    return MultiSelectItem;
}());
export { MultiSelectItem };
if (false) {
    /** @type {?} */
    MultiSelectItem.prototype.option;
    /** @type {?} */
    MultiSelectItem.prototype.selected;
    /** @type {?} */
    MultiSelectItem.prototype.disabled;
    /** @type {?} */
    MultiSelectItem.prototype.visible;
    /** @type {?} */
    MultiSelectItem.prototype.itemSize;
    /** @type {?} */
    MultiSelectItem.prototype.template;
    /** @type {?} */
    MultiSelectItem.prototype.maxSelectionLimitReached;
    /** @type {?} */
    MultiSelectItem.prototype.onClick;
    /** @type {?} */
    MultiSelectItem.prototype.onKeydown;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktc2VsZWN0LWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGthbHR1cmEtbmcva2FsdHVyYS1wcmltZW5nLXVpLyIsInNvdXJjZXMiOlsibGliL211bHRpLXNlbGVjdC9tdWx0aS1zZWxlY3QtaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR3BGO0lBQUE7UUFpQ1ksWUFBTyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWhELGNBQVMsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQWU5RCxDQUFDOzs7OztJQWJDLHVDQUFhOzs7O0lBQWIsVUFBYyxLQUFZO1FBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ2hCLGFBQWEsRUFBRSxLQUFLO1lBQ3BCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtTQUNwQixDQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQUVELHlDQUFlOzs7O0lBQWYsVUFBZ0IsS0FBWTtRQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztZQUNsQixhQUFhLEVBQUUsS0FBSztZQUNwQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDcEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Z0JBakRGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixRQUFRLEVBQUUsbzRCQWFUO2lCQUNGOzs7eUJBR0UsS0FBSzsyQkFFTCxLQUFLOzJCQUVMLEtBQUs7MEJBRUwsS0FBSzsyQkFFTCxLQUFLOzJCQUVMLEtBQUs7MkNBRUwsS0FBSzswQkFFTCxNQUFNOzRCQUVOLE1BQU07O0lBZVQsc0JBQUM7Q0FBQSxBQWxERCxJQWtEQztTQWpDWSxlQUFlOzs7SUFFMUIsaUNBQTRCOztJQUU1QixtQ0FBMkI7O0lBRTNCLG1DQUEyQjs7SUFFM0Isa0NBQTBCOztJQUUxQixtQ0FBMEI7O0lBRTFCLG1DQUFvQzs7SUFFcEMsbURBQTJDOztJQUUzQyxrQ0FBMEQ7O0lBRTFELG9DQUE0RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2VsZWN0SXRlbSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncC1tdWx0aVNlbGVjdEl0ZW0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxsaSBjbGFzcz1cInVpLW11bHRpc2VsZWN0LWl0ZW0gdWktY29ybmVyLWFsbFwiIChjbGljayk9XCJvbk9wdGlvbkNsaWNrKCRldmVudClcIiAoa2V5ZG93bik9XCJvbk9wdGlvbktleWRvd24oJGV2ZW50KVwiXG4gICAgICAgIFtzdHlsZS5kaXNwbGF5XT1cInZpc2libGUgPyAnYmxvY2snIDogJ25vbmUnXCIgW2F0dHIudGFiaW5kZXhdPVwib3B0aW9uLmRpc2FibGVkID8gbnVsbCA6ICcwJ1wiIFtuZ1N0eWxlXT1cInsnaGVpZ2h0JzogaXRlbVNpemUgKyAncHgnfVwiXG4gICAgICAgIFtuZ0NsYXNzXT1cInsndWktc3RhdGUtaGlnaGxpZ2h0Jzogc2VsZWN0ZWQsICd1aS1zdGF0ZS1kaXNhYmxlZCc6IChvcHRpb24uZGlzYWJsZWQgfHwgKG1heFNlbGVjdGlvbkxpbWl0UmVhY2hlZCAmJiAhc2VsZWN0ZWQpKX1cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ1aS1jaGtib3ggdWktd2lkZ2V0XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1jaGtib3gtYm94IHVpLXdpZGdldCB1aS1jb3JuZXItYWxsIHVpLXN0YXRlLWRlZmF1bHRcIlxuICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktc3RhdGUtYWN0aXZlJzogc2VsZWN0ZWR9XCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1jaGtib3gtaWNvbiB1aS1jbGlja2FibGVcIiBbbmdDbGFzc109XCJ7J3BpIHBpLWNoZWNrJzogc2VsZWN0ZWR9XCI+PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGxhYmVsICpuZ0lmPVwiIXRlbXBsYXRlXCI+e3tvcHRpb24ubGFiZWx9fTwvbGFiZWw+XG4gICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IG9wdGlvbn1cIj48L25nLWNvbnRhaW5lcj5cbiAgICA8L2xpPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE11bHRpU2VsZWN0SXRlbSB7XG4gIFxuICBASW5wdXQoKSBvcHRpb246IFNlbGVjdEl0ZW07XG4gIFxuICBASW5wdXQoKSBzZWxlY3RlZDogYm9vbGVhbjtcbiAgXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuICBcbiAgQElucHV0KCkgdmlzaWJsZTogYm9vbGVhbjtcbiAgXG4gIEBJbnB1dCgpIGl0ZW1TaXplOiBudW1iZXI7XG4gIFxuICBASW5wdXQoKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgXG4gIEBJbnB1dCgpIG1heFNlbGVjdGlvbkxpbWl0UmVhY2hlZDogYm9vbGVhbjtcbiAgXG4gIEBPdXRwdXQoKSBvbkNsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgXG4gIEBPdXRwdXQoKSBvbktleWRvd246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBcbiAgb25PcHRpb25DbGljayhldmVudDogRXZlbnQpIHtcbiAgICB0aGlzLm9uQ2xpY2suZW1pdCh7XG4gICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgIG9wdGlvbjogdGhpcy5vcHRpb25cbiAgICB9KTtcbiAgfVxuICBcbiAgb25PcHRpb25LZXlkb3duKGV2ZW50OiBFdmVudCkge1xuICAgIHRoaXMub25LZXlkb3duLmVtaXQoe1xuICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICBvcHRpb246IHRoaXMub3B0aW9uXG4gICAgfSk7XG4gIH1cbn0iXX0=