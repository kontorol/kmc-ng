/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectorRef, Component, ElementRef, forwardRef, Input, Renderer2, } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MultiSelect } from 'primeng/primeng';
/* tslint:disable */
/** @type {?} */
export var KALTURA_MULTISELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MultiSelectComponent; }),
    multi: true
};
/* tslint:enable */
var MultiSelectComponent = /** @class */ (function (_super) {
    tslib_1.__extends(MultiSelectComponent, _super);
    function MultiSelectComponent(el, renderer, _cd) {
        var _this = _super.call(this, el, renderer, _cd) || this;
        _this.el = el;
        _this.renderer = renderer;
        _this._cd = _cd;
        _this.selectAllLabel = 'Select All';
        _this.menuItemDisplayStyle = 'block';
        return _this;
    }
    /**
     * @return {?}
     */
    MultiSelectComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnDestroy.call(this);
        this._removeHideOnScrollHandler();
    };
    /**
     * @private
     * @return {?}
     */
    MultiSelectComponent.prototype._addHideOnScrollHandler = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.hideOnScroll) {
            /** @type {?} */
            var listenElement = typeof this.hideOnScroll === 'string'
                ? document.querySelector(this.hideOnScroll)
                : this.hideOnScroll;
            if (listenElement instanceof Element) {
                this._hideOnScrollListener = this.renderer.listen(listenElement, 'scroll', function () { return _this.hide(); });
            }
        }
    };
    /**
     * @private
     * @return {?}
     */
    MultiSelectComponent.prototype._removeHideOnScrollHandler = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.hideOnScroll && this._hideOnScrollListener) {
            this._hideOnScrollListener();
        }
    };
    /**
     * @return {?}
     */
    MultiSelectComponent.prototype.show = /**
     * @return {?}
     */
    function () {
        _super.prototype.show.call(this);
        this._addHideOnScrollHandler();
    };
    /**
     * @return {?}
     */
    MultiSelectComponent.prototype.hide = /**
     * @return {?}
     */
    function () {
        _super.prototype.hide.call(this);
        this._removeHideOnScrollHandler();
    };
    /**
     * @return {?}
     */
    MultiSelectComponent.prototype.isPartiallyChecked = /**
     * @return {?}
     */
    function () {
        return !this.isAllChecked() && (this.value || []).length > 0;
    };
    MultiSelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kMultiSelect',
                    styles: [":host /deep/ .ui-multiselect-panel .pi-minus{background-color:#00a784;border:1px solid #00a784;color:#fff;width:16px;height:16px;border-radius:3px;top:-1px;position:relative;left:-1px}"],
                    template: "<div #container [ngClass]=\"{'ui-multiselect ui-widget ui-state-default ui-corner-all':true,'ui-multiselect-open':overlayVisible,'ui-state-focus':focus,'ui-state-disabled': disabled}\" [ngStyle]=\"style\" [class]=\"styleClass\"\n     (click)=\"onMouseclick($event,in)\">\n  <div class=\"ui-helper-hidden-accessible\">\n    <input #in type=\"text\" readonly=\"readonly\" [attr.id]=\"inputId\" [attr.name]=\"name\" (focus)=\"onInputFocus($event)\" (blur)=\"onInputBlur($event)\"\n           [disabled]=\"disabled\" [attr.tabindex]=\"tabindex\" (keydown)=\"onKeydown($event)\">\n  </div>\n  <div class=\"ui-multiselect-label-container\" [title]=\"valuesAsString\">\n    <label class=\"ui-multiselect-label ui-corner-all\">\n      <ng-container *ngIf=\"!selectedItemsTemplate\">{{isAllChecked() ? (allSelectedLabel || valuesAsString) : valuesAsString}}</ng-container>\n      <ng-container *ngTemplateOutlet=\"selectedItemsTemplate; context: {$implicit: value}\"></ng-container>\n    </label>\n  </div>\n  <div [ngClass]=\"{'ui-multiselect-trigger ui-state-default ui-corner-right':true}\">\n    <span class=\"ui-multiselect-trigger-icon ui-clickable\" [ngClass]=\"dropdownIcon\"></span>\n  </div>\n  <div *ngIf=\"overlayVisible\" [ngClass]=\"['ui-multiselect-panel ui-widget ui-widget-content ui-corner-all ui-shadow']\" [@overlayAnimation]=\"{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\" (@overlayAnimation.start)=\"onOverlayAnimationStart($event)\"\n       [ngStyle]=\"panelStyle\" [class]=\"panelStyleClass\" (click)=\"panelClick=true\">\n    <div class=\"ui-widget-header ui-corner-all ui-multiselect-header ui-helper-clearfix\" [ngClass]=\"{'ui-multiselect-header-no-toggleall': !showToggleAll}\" *ngIf=\"showHeader\">\n      <div class=\"ui-chkbox ui-widget\" *ngIf=\"showToggleAll && !selectionLimit\">\n        <div class=\"ui-helper-hidden-accessible\">\n          <input type=\"checkbox\" readonly=\"readonly\" [checked]=\"isAllChecked()\" (focus)=\"onHeaderCheckboxFocus()\" (blur)=\"onHeaderCheckboxBlur()\" (keydown.space)=\"toggleAll($event)\">\n        </div>\n        <div class=\"ui-chkbox-box ui-widget ui-corner-all ui-state-default\" [ngClass]=\"{'ui-state-active':isAllChecked(), 'ui-state-focus': headerCheckboxFocus}\" (click)=\"toggleAll($event)\">\n          <span class=\"ui-chkbox-icon ui-clickable pi\"\n                [ngClass]=\"{'pi-check':isAllChecked(), 'pi-minus':isPartiallyChecked()}\"></span>\n        </div>\n      </div>\n      <div class=\"ui-multiselect-filter-container\" *ngIf=\"filter\">\n        <input #filterInput type=\"text\" role=\"textbox\" [value]=\"filterValue||''\" (input)=\"onFilter()\" class=\"ui-inputtext ui-widget ui-state-default ui-corner-all\" [attr.placeholder]=\"filterPlaceHolder\">\n        <span class=\"ui-multiselect-filter-icon pi pi-search\"></span>\n      </div>\n      <a class=\"ui-multiselect-close ui-corner-all\" tabindex=\"0\" (click)=\"close($event)\" (keydown.enter)=\"close($event)\">\n        <span class=\"pi pi-times\"></span>\n      </a>\n      <ng-content select=\"p-header\"></ng-content>\n    </div>\n    <div class=\"ui-multiselect-items-wrapper\" [style.max-height]=\"virtualScroll ? 'auto' : (scrollHeight||'auto')\">\n      <ul class=\"ui-multiselect-items ui-multiselect-list ui-widget-content ui-widget ui-corner-all ui-helper-reset\">\n        <ng-container *ngIf=\"!virtualScroll; else virtualScrollList\">\n          <ng-template ngFor let-option let-i=\"index\" [ngForOf]=\"options\">\n            <p-multiSelectItem [option]=\"option\" [selected]=\"isSelected(option.value)\" (onClick)=\"onOptionClick($event)\" (onKeydown)=\"onOptionKeydown($event)\"\n                               [maxSelectionLimitReached]=\"maxSelectionLimitReached\" [visible]=\"isItemVisible(option)\" [template]=\"itemTemplate\"></p-multiSelectItem>\n          </ng-template>\n        </ng-container>\n        <ng-template #virtualScrollList>\n          <cdk-virtual-scroll-viewport #viewport [ngStyle]=\"{'height': scrollHeight}\" [itemSize]=\"itemSize\" *ngIf=\"virtualScroll\">\n            <ng-container *cdkVirtualFor=\"let option of options; let i = index; let c = count; let f = first; let l = last; let e = even; let o = odd\">\n              <p-multiSelectItem [option]=\"option\" [selected]=\"isSelected(option.value)\" (onClick)=\"onOptionClick($event)\" (onKeydown)=\"onOptionKeydown($event)\"\n                                 [maxSelectionLimitReached]=\"maxSelectionLimitReached\" [visible]=\"isItemVisible(option)\" [template]=\"itemTemplate\" [itemSize]=\"itemSize\"></p-multiSelectItem>\n            </ng-container>\n          </cdk-virtual-scroll-viewport>\n        </ng-template>\n      </ul>\n    </div>\n    <div class=\"ui-multiselect-footer ui-widget-content\" *ngIf=\"footerFacet\">\n      <ng-content select=\"p-footer\"></ng-content>\n    </div>\n  </div>\n</div>\n",
                    animations: [
                        trigger('overlayAnimation', [
                            state('void', style({
                                transform: 'translateY(5%)',
                                opacity: 0
                            })),
                            state('visible', style({
                                transform: 'translateY(0)',
                                opacity: 1
                            })),
                            transition('void => visible', animate('{{showTransitionParams}}')),
                            transition('visible => void', animate('{{hideTransitionParams}}'))
                        ])
                    ],
                    host: {
                        '[class.ui-inputwrapper-filled]': 'filled',
                        '[class.ui-inputwrapper-focus]': 'focus'
                    },
                    providers: [KALTURA_MULTISELECT_VALUE_ACCESSOR]
                    /* tslint:enable */
                },] },
    ];
    /** @nocollapse */
    MultiSelectComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: ChangeDetectorRef }
    ]; };
    MultiSelectComponent.propDecorators = {
        disabledLabel: [{ type: Input }],
        allSelectedLabel: [{ type: Input }],
        selectAllLabel: [{ type: Input }],
        menuItemDisplayStyle: [{ type: Input }],
        hideOnScroll: [{ type: Input }]
    };
    return MultiSelectComponent;
}(MultiSelect));
export { MultiSelectComponent };
if (false) {
    /** @type {?} */
    MultiSelectComponent.prototype.disabledLabel;
    /** @type {?} */
    MultiSelectComponent.prototype.allSelectedLabel;
    /** @type {?} */
    MultiSelectComponent.prototype.selectAllLabel;
    /** @type {?} */
    MultiSelectComponent.prototype.menuItemDisplayStyle;
    /** @type {?} */
    MultiSelectComponent.prototype.hideOnScroll;
    /**
     * @type {?}
     * @private
     */
    MultiSelectComponent.prototype._hideOnScrollListener;
    /** @type {?} */
    MultiSelectComponent.prototype.el;
    /** @type {?} */
    MultiSelectComponent.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    MultiSelectComponent.prototype._cd;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktc2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrYWx0dXJhLW5nL2thbHR1cmEtcHJpbWVuZy11aS8iLCJzb3VyY2VzIjpbImxpYi9tdWx0aS1zZWxlY3QvbXVsdGktc2VsZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixVQUFVLEVBQ1YsS0FBSyxFQUVMLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBRzlDLE1BQU0sS0FBTyxrQ0FBa0MsR0FBUTtJQUNyRCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLG9CQUFvQixFQUFwQixDQUFvQixDQUFDO0lBQ25ELEtBQUssRUFBRSxJQUFJO0NBQ1o7O0FBSUQ7SUFvRjBDLGdEQUFXO0lBU25ELDhCQUFtQixFQUFjLEVBQ2QsUUFBbUIsRUFDbEIsR0FBc0I7UUFGMUMsWUFHRSxrQkFBTSxFQUFFLEVBQUUsUUFBUSxFQUFFLEdBQUcsQ0FBQyxTQUN6QjtRQUprQixRQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ2QsY0FBUSxHQUFSLFFBQVEsQ0FBVztRQUNsQixTQUFHLEdBQUgsR0FBRyxDQUFtQjtRQVJqQyxvQkFBYyxHQUFHLFlBQVksQ0FBQztRQUM5QiwwQkFBb0IsR0FBRyxPQUFPLENBQUM7O0lBU3hDLENBQUM7Ozs7SUFFRCwwQ0FBVzs7O0lBQVg7UUFDRSxpQkFBTSxXQUFXLFdBQUUsQ0FBQztRQUNwQixJ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LFxuICBFbGVtZW50UmVmLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBSZW5kZXJlcjIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgYW5pbWF0ZSwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE11bHRpU2VsZWN0IH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcblxuLyogdHNsaW50OmRpc2FibGUgKi9cbmV4cG9ydCBjb25zdCBLQUxUVVJBX01VTFRJU0VMRUNUX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNdWx0aVNlbGVjdENvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG4vKiB0c2xpbnQ6ZW5hYmxlICovXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2tNdWx0aVNlbGVjdCcsXG4gIHN0eWxlczogW2A6aG9zdCAvZGVlcC8gLnVpLW11bHRpc2VsZWN0LXBhbmVsIC5waS1taW51c3tiYWNrZ3JvdW5kLWNvbG9yOiMwMGE3ODQ7Ym9yZGVyOjFweCBzb2xpZCAjMDBhNzg0O2NvbG9yOiNmZmY7d2lkdGg6MTZweDtoZWlnaHQ6MTZweDtib3JkZXItcmFkaXVzOjNweDt0b3A6LTFweDtwb3NpdGlvbjpyZWxhdGl2ZTtsZWZ0Oi0xcHh9YF0sXG4gIHRlbXBsYXRlOiBgPGRpdiAjY29udGFpbmVyIFtuZ0NsYXNzXT1cInsndWktbXVsdGlzZWxlY3QgdWktd2lkZ2V0IHVpLXN0YXRlLWRlZmF1bHQgdWktY29ybmVyLWFsbCc6dHJ1ZSwndWktbXVsdGlzZWxlY3Qtb3Blbic6b3ZlcmxheVZpc2libGUsJ3VpLXN0YXRlLWZvY3VzJzpmb2N1cywndWktc3RhdGUtZGlzYWJsZWQnOiBkaXNhYmxlZH1cIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCJcbiAgICAgKGNsaWNrKT1cIm9uTW91c2VjbGljaygkZXZlbnQsaW4pXCI+XG4gIDxkaXYgY2xhc3M9XCJ1aS1oZWxwZXItaGlkZGVuLWFjY2Vzc2libGVcIj5cbiAgICA8aW5wdXQgI2luIHR5cGU9XCJ0ZXh0XCIgcmVhZG9ubHk9XCJyZWFkb25seVwiIFthdHRyLmlkXT1cImlucHV0SWRcIiBbYXR0ci5uYW1lXT1cIm5hbWVcIiAoZm9jdXMpPVwib25JbnB1dEZvY3VzKCRldmVudClcIiAoYmx1cik9XCJvbklucHV0Qmx1cigkZXZlbnQpXCJcbiAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgW2F0dHIudGFiaW5kZXhdPVwidGFiaW5kZXhcIiAoa2V5ZG93bik9XCJvbktleWRvd24oJGV2ZW50KVwiPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInVpLW11bHRpc2VsZWN0LWxhYmVsLWNvbnRhaW5lclwiIFt0aXRsZV09XCJ2YWx1ZXNBc1N0cmluZ1wiPlxuICAgIDxsYWJlbCBjbGFzcz1cInVpLW11bHRpc2VsZWN0LWxhYmVsIHVpLWNvcm5lci1hbGxcIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhc2VsZWN0ZWRJdGVtc1RlbXBsYXRlXCI+e3tpc0FsbENoZWNrZWQoKSA/IChhbGxTZWxlY3RlZExhYmVsIHx8IHZhbHVlc0FzU3RyaW5nKSA6IHZhbHVlc0FzU3RyaW5nfX08L25nLWNvbnRhaW5lcj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJzZWxlY3RlZEl0ZW1zVGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IHZhbHVlfVwiPjwvbmctY29udGFpbmVyPlxuICAgIDwvbGFiZWw+XG4gIDwvZGl2PlxuICA8ZGl2IFtuZ0NsYXNzXT1cInsndWktbXVsdGlzZWxlY3QtdHJpZ2dlciB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1yaWdodCc6dHJ1ZX1cIj5cbiAgICA8c3BhbiBjbGFzcz1cInVpLW11bHRpc2VsZWN0LXRyaWdnZXItaWNvbiB1aS1jbGlja2FibGVcIiBbbmdDbGFzc109XCJkcm9wZG93bkljb25cIj48L3NwYW4+XG4gIDwvZGl2PlxuICA8ZGl2ICpuZ0lmPVwib3ZlcmxheVZpc2libGVcIiBbbmdDbGFzc109XCJbJ3VpLW11bHRpc2VsZWN0LXBhbmVsIHVpLXdpZGdldCB1aS13aWRnZXQtY29udGVudCB1aS1jb3JuZXItYWxsIHVpLXNoYWRvdyddXCIgW0BvdmVybGF5QW5pbWF0aW9uXT1cInt2YWx1ZTogJ3Zpc2libGUnLCBwYXJhbXM6IHtzaG93VHJhbnNpdGlvblBhcmFtczogc2hvd1RyYW5zaXRpb25PcHRpb25zLCBoaWRlVHJhbnNpdGlvblBhcmFtczogaGlkZVRyYW5zaXRpb25PcHRpb25zfX1cIiAoQG92ZXJsYXlBbmltYXRpb24uc3RhcnQpPVwib25PdmVybGF5QW5pbWF0aW9uU3RhcnQoJGV2ZW50KVwiXG4gICAgICAgW25nU3R5bGVdPVwicGFuZWxTdHlsZVwiIFtjbGFzc109XCJwYW5lbFN0eWxlQ2xhc3NcIiAoY2xpY2spPVwicGFuZWxDbGljaz10cnVlXCI+XG4gICAgPGRpdiBjbGFzcz1cInVpLXdpZGdldC1oZWFkZXIgdWktY29ybmVyLWFsbCB1aS1tdWx0aXNlbGVjdC1oZWFkZXIgdWktaGVscGVyLWNsZWFyZml4XCIgW25nQ2xhc3NdPVwieyd1aS1tdWx0aXNlbGVjdC1oZWFkZXItbm8tdG9nZ2xlYWxsJzogIXNob3dUb2dnbGVBbGx9XCIgKm5nSWY9XCJzaG93SGVhZGVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwidWktY2hrYm94IHVpLXdpZGdldFwiICpuZ0lmPVwic2hvd1RvZ2dsZUFsbCAmJiAhc2VsZWN0aW9uTGltaXRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInVpLWhlbHBlci1oaWRkZW4tYWNjZXNzaWJsZVwiPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiByZWFkb25seT1cInJlYWRvbmx5XCIgW2NoZWNrZWRdPVwiaXNBbGxDaGVja2VkKClcIiAoZm9jdXMpPVwib25IZWFkZXJDaGVja2JveEZvY3VzKClcIiAoYmx1cik9XCJvbkhlYWRlckNoZWNrYm94Qmx1cigpXCIgKGtleWRvd24uc3BhY2UpPVwidG9nZ2xlQWxsKCRldmVudClcIj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1jaGtib3gtYm94IHVpLXdpZGdldCB1aS1jb3JuZXItYWxsIHVpLXN0YXRlLWRlZmF1bHRcIiBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWFjdGl2ZSc6aXNBbGxDaGVja2VkKCksICd1aS1zdGF0ZS1mb2N1cyc6IGhlYWRlckNoZWNrYm94Rm9jdXN9XCIgKGNsaWNrKT1cInRvZ2dsZUFsbCgkZXZlbnQpXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1jaGtib3gtaWNvbiB1aS1jbGlja2FibGUgcGlcIlxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsncGktY2hlY2snOmlzQWxsQ2hlY2tlZCgpLCAncGktbWludXMnOmlzUGFydGlhbGx5Q2hlY2tlZCgpfVwiPjwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ1aS1tdWx0aXNlbGVjdC1maWx0ZXItY29udGFpbmVyXCIgKm5nSWY9XCJmaWx0ZXJcIj5cbiAgICAgICAgPGlucHV0ICNmaWx0ZXJJbnB1dCB0eXBlPVwidGV4dFwiIHJvbGU9XCJ0ZXh0Ym94XCIgW3ZhbHVlXT1cImZpbHRlclZhbHVlfHwnJ1wiIChpbnB1dCk9XCJvbkZpbHRlcigpXCIgY2xhc3M9XCJ1aS1pbnB1dHRleHQgdWktd2lkZ2V0IHVpLXN0YXRlLWRlZmF1bHQgdWktY29ybmVyLWFsbFwiIFthdHRyLnBsYWNlaG9sZGVyXT1cImZpbHRlclBsYWNlSG9sZGVyXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwidWktbXVsdGlzZWxlY3QtZmlsdGVyLWljb24gcGkgcGktc2VhcmNoXCI+PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8YSBjbGFzcz1cInVpLW11bHRpc2VsZWN0LWNsb3NlIHVpLWNvcm5lci1hbGxcIiB0YWJpbmRleD1cIjBcIiAoY2xpY2spPVwiY2xvc2UoJGV2ZW50KVwiIChrZXlkb3duLmVudGVyKT1cImNsb3NlKCRldmVudClcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJwaSBwaS10aW1lc1wiPjwvc3Bhbj5cbiAgICAgIDwvYT5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInAtaGVhZGVyXCI+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJ1aS1tdWx0aXNlbGVjdC1pdGVtcy13cmFwcGVyXCIgW3N0eWxlLm1heC1oZWlnaHRdPVwidmlydHVhbFNjcm9sbCA/ICdhdXRvJyA6IChzY3JvbGxIZWlnaHR8fCdhdXRvJylcIj5cbiAgICAgIDx1bCBjbGFzcz1cInVpLW11bHRpc2VsZWN0LWl0ZW1zIHVpLW11bHRpc2VsZWN0LWxpc3QgdWktd2lkZ2V0LWNvbnRlbnQgdWktd2lkZ2V0IHVpLWNvcm5lci1hbGwgdWktaGVscGVyLXJlc2V0XCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhdmlydHVhbFNjcm9sbDsgZWxzZSB2aXJ0dWFsU2Nyb2xsTGlzdFwiPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtb3B0aW9uIGxldC1pPVwiaW5kZXhcIiBbbmdGb3JPZl09XCJvcHRpb25zXCI+XG4gICAgICAgICAgICA8cC1tdWx0aVNlbGVjdEl0ZW0gW29wdGlvbl09XCJvcHRpb25cIiBbc2VsZWN0ZWRdPVwiaXNTZWxlY3RlZChvcHRpb24udmFsdWUpXCIgKG9uQ2xpY2spPVwib25PcHRpb25DbGljaygkZXZlbnQpXCIgKG9uS2V5ZG93bik9XCJvbk9wdGlvbktleWRvd24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW21heFNlbGVjdGlvbkxpbWl0UmVhY2hlZF09XCJtYXhTZWxlY3Rpb25MaW1pdFJlYWNoZWRcIiBbdmlzaWJsZV09XCJpc0l0ZW1WaXNpYmxlKG9wdGlvbilcIiBbdGVtcGxhdGVdPVwiaXRlbVRlbXBsYXRlXCI+PC9wLW11bHRpU2VsZWN0SXRlbT5cbiAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLXRlbXBsYXRlICN2aXJ0dWFsU2Nyb2xsTGlzdD5cbiAgICAgICAgICA8Y2RrLXZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0ICN2aWV3cG9ydCBbbmdTdHlsZV09XCJ7J2hlaWdodCc6IHNjcm9sbEhlaWdodH1cIiBbaXRlbVNpemVdPVwiaXRlbVNpemVcIiAqbmdJZj1cInZpcnR1YWxTY3JvbGxcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKmNka1ZpcnR1YWxGb3I9XCJsZXQgb3B0aW9uIG9mIG9wdGlvbnM7IGxldCBpID0gaW5kZXg7IGxldCBjID0gY291bnQ7IGxldCBmID0gZmlyc3Q7IGxldCBsID0gbGFzdDsgbGV0IGUgPSBldmVuOyBsZXQgbyA9IG9kZFwiPlxuICAgICAgICAgICAgICA8cC1tdWx0aVNlbGVjdEl0ZW0gW29wdGlvbl09XCJvcHRpb25cIiBbc2VsZWN0ZWRdPVwiaXNTZWxlY3RlZChvcHRpb24udmFsdWUpXCIgKG9uQ2xpY2spPVwib25PcHRpb25DbGljaygkZXZlbnQpXCIgKG9uS2V5ZG93bik9XCJvbk9wdGlvbktleWRvd24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbWF4U2VsZWN0aW9uTGltaXRSZWFjaGVkXT1cIm1heFNlbGVjdGlvbkxpbWl0UmVhY2hlZFwiIFt2aXNpYmxlXT1cImlzSXRlbVZpc2libGUob3B0aW9uKVwiIFt0ZW1wbGF0ZV09XCJpdGVtVGVtcGxhdGVcIiBbaXRlbVNpemVdPVwiaXRlbVNpemVcIj48L3AtbXVsdGlTZWxlY3RJdGVtPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPC9jZGstdmlydHVhbC1zY3JvbGwtdmlld3BvcnQ+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8L3VsPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJ1aS1tdWx0aXNlbGVjdC1mb290ZXIgdWktd2lkZ2V0LWNvbnRlbnRcIiAqbmdJZj1cImZvb3RlckZhY2V0XCI+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJwLWZvb3RlclwiPjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdvdmVybGF5QW5pbWF0aW9uJywgW1xuICAgICAgc3RhdGUoJ3ZvaWQnLCBzdHlsZSh7XG4gICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoNSUpJyxcbiAgICAgICAgb3BhY2l0eTogMFxuICAgICAgfSkpLFxuICAgICAgc3RhdGUoJ3Zpc2libGUnLCBzdHlsZSh7XG4gICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMCknLFxuICAgICAgICBvcGFjaXR5OiAxXG4gICAgICB9KSksXG4gICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IHZpc2libGUnLCBhbmltYXRlKCd7e3Nob3dUcmFuc2l0aW9uUGFyYW1zfX0nKSksXG4gICAgICB0cmFuc2l0aW9uKCd2aXNpYmxlID0+IHZvaWQnLCBhbmltYXRlKCd7e2hpZGVUcmFuc2l0aW9uUGFyYW1zfX0nKSlcbiAgICBdKVxuICBdLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy51aS1pbnB1dHdyYXBwZXItZmlsbGVkXSc6ICdmaWxsZWQnLFxuICAgICdbY2xhc3MudWktaW5wdXR3cmFwcGVyLWZvY3VzXSc6ICdmb2N1cydcbiAgfSxcbiAgcHJvdmlkZXJzOiBbS0FMVFVSQV9NVUxUSVNFTEVDVF9WQUxVRV9BQ0NFU1NPUl1cbiAgLyogdHNsaW50OmVuYWJsZSAqL1xufSlcbmV4cG9ydCBjbGFzcyBNdWx0aVNlbGVjdENvbXBvbmVudCBleHRlbmRzIE11bHRpU2VsZWN0IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgQElucHV0KCkgZGlzYWJsZWRMYWJlbDogc3RyaW5nO1xuICBASW5wdXQoKSBhbGxTZWxlY3RlZExhYmVsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNlbGVjdEFsbExhYmVsID0gJ1NlbGVjdCBBbGwnO1xuICBASW5wdXQoKSBtZW51SXRlbURpc3BsYXlTdHlsZSA9ICdibG9jayc7XG4gIEBJbnB1dCgpIGhpZGVPblNjcm9sbDogc3RyaW5nIHwgRWxlbWVudDtcblxuICBwcml2YXRlIF9oaWRlT25TY3JvbGxMaXN0ZW5lcjogKCkgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgIHB1YmxpYyByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICAgICAgICBwcml2YXRlIF9jZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICBzdXBlcihlbCwgcmVuZGVyZXIsIF9jZCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuICAgIHRoaXMuX3JlbW92ZUhpZGVPblNjcm9sbEhhbmRsZXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZEhpZGVPblNjcm9sbEhhbmRsZXIoKSB7XG4gICAgaWYgKHRoaXMuaGlkZU9uU2Nyb2xsKSB7XG4gICAgICBjb25zdCBsaXN0ZW5FbGVtZW50ID0gdHlwZW9mIHRoaXMuaGlkZU9uU2Nyb2xsID09PSAnc3RyaW5nJ1xuICAgICAgICA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5oaWRlT25TY3JvbGwpXG4gICAgICAgIDogdGhpcy5oaWRlT25TY3JvbGw7XG5cbiAgICAgIGlmIChsaXN0ZW5FbGVtZW50IGluc3RhbmNlb2YgRWxlbWVudCkge1xuICAgICAgICB0aGlzLl9oaWRlT25TY3JvbGxMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGxpc3RlbkVsZW1lbnQsICdzY3JvbGwnLCAoKSA9PiB0aGlzLmhpZGUoKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlSGlkZU9uU2Nyb2xsSGFuZGxlcigpIHtcbiAgICBpZiAodGhpcy5oaWRlT25TY3JvbGwgJiYgdGhpcy5faGlkZU9uU2Nyb2xsTGlzdGVuZXIpIHtcbiAgICAgIHRoaXMuX2hpZGVPblNjcm9sbExpc3RlbmVyKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNob3coKTogdm9pZCB7XG4gICAgc3VwZXIuc2hvdygpO1xuICAgIHRoaXMuX2FkZEhpZGVPblNjcm9sbEhhbmRsZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBoaWRlKCk6IHZvaWQge1xuICAgIHN1cGVyLmhpZGUoKTtcbiAgICB0aGlzLl9yZW1vdmVIaWRlT25TY3JvbGxIYW5kbGVyKCk7XG4gIH1cblxuICBwdWJsaWMgaXNQYXJ0aWFsbHlDaGVja2VkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5pc0FsbENoZWNrZWQoKSAmJiAodGhpcy52YWx1ZSB8fCBbXSkubGVuZ3RoID4gMDtcbiAgfVxufVxuIl19