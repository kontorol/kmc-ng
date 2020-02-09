/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Component, ElementRef, forwardRef, Input, Renderer2, } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MultiSelect } from 'primeng/primeng';
/* tslint:disable */
/** @type {?} */
export const KALTURA_MULTISELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiSelectComponent),
    multi: true
};
/* tslint:enable */
export class MultiSelectComponent extends MultiSelect {
    /**
     * @param {?} el
     * @param {?} renderer
     * @param {?} _cd
     */
    constructor(el, renderer, _cd) {
        super(el, renderer, _cd);
        this.el = el;
        this.renderer = renderer;
        this._cd = _cd;
        this.selectAllLabel = 'Select All';
        this.menuItemDisplayStyle = 'block';
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        super.ngOnDestroy();
        this._removeHideOnScrollHandler();
    }
    /**
     * @private
     * @return {?}
     */
    _addHideOnScrollHandler() {
        if (this.hideOnScroll) {
            /** @type {?} */
            const listenElement = typeof this.hideOnScroll === 'string'
                ? document.querySelector(this.hideOnScroll)
                : this.hideOnScroll;
            if (listenElement instanceof Element) {
                this._hideOnScrollListener = this.renderer.listen(listenElement, 'scroll', () => this.hide());
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    _removeHideOnScrollHandler() {
        if (this.hideOnScroll && this._hideOnScrollListener) {
            this._hideOnScrollListener();
        }
    }
    /**
     * @return {?}
     */
    show() {
        super.show();
        this._addHideOnScrollHandler();
    }
    /**
     * @return {?}
     */
    hide() {
        super.hide();
        this._removeHideOnScrollHandler();
    }
    /**
     * @return {?}
     */
    isPartiallyChecked() {
        return !this.isAllChecked() && (this.value || []).length > 0;
    }
}
MultiSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'kMultiSelect',
                styles: [`:host /deep/ .ui-multiselect-panel .pi-minus{background-color:#00a784;border:1px solid #00a784;color:#fff;width:16px;height:16px;border-radius:3px;top:-1px;position:relative;left:-1px}`],
                template: `<div #container [ngClass]="{'ui-multiselect ui-widget ui-state-default ui-corner-all':true,'ui-multiselect-open':overlayVisible,'ui-state-focus':focus,'ui-state-disabled': disabled}" [ngStyle]="style" [class]="styleClass"
     (click)="onMouseclick($event,in)">
  <div class="ui-helper-hidden-accessible">
    <input #in type="text" readonly="readonly" [attr.id]="inputId" [attr.name]="name" (focus)="onInputFocus($event)" (blur)="onInputBlur($event)"
           [disabled]="disabled" [attr.tabindex]="tabindex" (keydown)="onKeydown($event)">
  </div>
  <div class="ui-multiselect-label-container" [title]="valuesAsString">
    <label class="ui-multiselect-label ui-corner-all">
      <ng-container *ngIf="!selectedItemsTemplate">{{isAllChecked() ? (allSelectedLabel || valuesAsString) : valuesAsString}}</ng-container>
      <ng-container *ngTemplateOutlet="selectedItemsTemplate; context: {$implicit: value}"></ng-container>
    </label>
  </div>
  <div [ngClass]="{'ui-multiselect-trigger ui-state-default ui-corner-right':true}">
    <span class="ui-multiselect-trigger-icon ui-clickable" [ngClass]="dropdownIcon"></span>
  </div>
  <div *ngIf="overlayVisible" [ngClass]="['ui-multiselect-panel ui-widget ui-widget-content ui-corner-all ui-shadow']" [@overlayAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" (@overlayAnimation.start)="onOverlayAnimationStart($event)"
       [ngStyle]="panelStyle" [class]="panelStyleClass" (click)="panelClick=true">
    <div class="ui-widget-header ui-corner-all ui-multiselect-header ui-helper-clearfix" [ngClass]="{'ui-multiselect-header-no-toggleall': !showToggleAll}" *ngIf="showHeader">
      <div class="ui-chkbox ui-widget" *ngIf="showToggleAll && !selectionLimit">
        <div class="ui-helper-hidden-accessible">
          <input type="checkbox" readonly="readonly" [checked]="isAllChecked()" (focus)="onHeaderCheckboxFocus()" (blur)="onHeaderCheckboxBlur()" (keydown.space)="toggleAll($event)">
        </div>
        <div class="ui-chkbox-box ui-widget ui-corner-all ui-state-default" [ngClass]="{'ui-state-active':isAllChecked(), 'ui-state-focus': headerCheckboxFocus}" (click)="toggleAll($event)">
          <span class="ui-chkbox-icon ui-clickable pi"
                [ngClass]="{'pi-check':isAllChecked(), 'pi-minus':isPartiallyChecked()}"></span>
        </div>
      </div>
      <div class="ui-multiselect-filter-container" *ngIf="filter">
        <input #filterInput type="text" role="textbox" [value]="filterValue||''" (input)="onFilter()" class="ui-inputtext ui-widget ui-state-default ui-corner-all" [attr.placeholder]="filterPlaceHolder">
        <span class="ui-multiselect-filter-icon pi pi-search"></span>
      </div>
      <a class="ui-multiselect-close ui-corner-all" tabindex="0" (click)="close($event)" (keydown.enter)="close($event)">
        <span class="pi pi-times"></span>
      </a>
      <ng-content select="p-header"></ng-content>
    </div>
    <div class="ui-multiselect-items-wrapper" [style.max-height]="virtualScroll ? 'auto' : (scrollHeight||'auto')">
      <ul class="ui-multiselect-items ui-multiselect-list ui-widget-content ui-widget ui-corner-all ui-helper-reset">
        <ng-container *ngIf="!virtualScroll; else virtualScrollList">
          <ng-template ngFor let-option let-i="index" [ngForOf]="options">
            <p-multiSelectItem [option]="option" [selected]="isSelected(option.value)" (onClick)="onOptionClick($event)" (onKeydown)="onOptionKeydown($event)"
                               [maxSelectionLimitReached]="maxSelectionLimitReached" [visible]="isItemVisible(option)" [template]="itemTemplate"></p-multiSelectItem>
          </ng-template>
        </ng-container>
        <ng-template #virtualScrollList>
          <cdk-virtual-scroll-viewport #viewport [ngStyle]="{'height': scrollHeight}" [itemSize]="itemSize" *ngIf="virtualScroll">
            <ng-container *cdkVirtualFor="let option of options; let i = index; let c = count; let f = first; let l = last; let e = even; let o = odd">
              <p-multiSelectItem [option]="option" [selected]="isSelected(option.value)" (onClick)="onOptionClick($event)" (onKeydown)="onOptionKeydown($event)"
                                 [maxSelectionLimitReached]="maxSelectionLimitReached" [visible]="isItemVisible(option)" [template]="itemTemplate" [itemSize]="itemSize"></p-multiSelectItem>
            </ng-container>
          </cdk-virtual-scroll-viewport>
        </ng-template>
      </ul>
    </div>
    <div class="ui-multiselect-footer ui-widget-content" *ngIf="footerFacet">
      <ng-content select="p-footer"></ng-content>
    </div>
  </div>
</div>
`,
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
MultiSelectComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef }
];
MultiSelectComponent.propDecorators = {
    disabledLabel: [{ type: Input }],
    allSelectedLabel: [{ type: Input }],
    selectAllLabel: [{ type: Input }],
    menuItemDisplayStyle: [{ type: Input }],
    hideOnScroll: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktc2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrYWx0dXJhLW5nL2thbHR1cmEtcHJpbWVuZy11aS8iLCJzb3VyY2VzIjpbImxpYi9tdWx0aS1zZWxlY3QvbXVsdGktc2VsZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFVBQVUsRUFDVixLQUFLLEVBRUwsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7QUFHOUMsTUFBTSxPQUFPLGtDQUFrQyxHQUFRO0lBQ3JELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztJQUNuRCxLQUFLLEVBQUUsSUFBSTtDQUNaOztBQXdGRCxNQUFNLE9BQU8sb0JBQXFCLFNBQVEsV0FBVzs7Ozs7O0lBU25ELFlBQW1CLEVBQWMsRUFDZCxRQUFtQixFQUNsQixHQUFzQjtRQUN4QyxLQUFLLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUhSLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ2xCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBUmpDLG1CQUFjLEdBQUcsWUFBWSxDQUFDO1FBQzlCLHlCQUFvQixHQUFHLE9BQU8sQ0FBQztJQVN4QyxDQUFDOzs7O0lBRUQsV0FBVztRQUNULEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztJQUNwQyxDQUFDOzs7OztJQUVPLHVCQUF1QjtRQUM3QixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7O2tCQUNmLGFBQWEsR0FBRyxPQUFPLElBQUksQ0FBQyxZQUFZLEtBQUssUUFBUTtnQkFDekQsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztnQkFDM0MsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZO1lBRXJCLElBQUksYUFBYSxZQUFZLE9BQU8sRUFBRTtnQkFDcEMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7YUFDL0Y7U0FDRjtJQUNILENBQUM7Ozs7O0lBRU8sMEJBQTBCO1FBQ2hDLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDbkQsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7U0FDOUI7SUFDSCxDQUFDOzs7O0lBRU0sSUFBSTtRQUNULEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0lBQ2pDLENBQUM7Ozs7SUFFTSxJQUFJO1FBQ1QsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7SUFDcEMsQ0FBQzs7OztJQUVNLGtCQUFrQjtRQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQy9ELENBQUM7OztZQXRJRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLE1BQU0sRUFBRSxDQUFDLDBMQUEwTCxDQUFDO2dCQUNwTSxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBMkRYO2dCQUNDLFVBQVUsRUFBRTtvQkFDVixPQUFPLENBQUMsa0JBQWtCLEVBQUU7d0JBQzFCLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDOzRCQUNsQixTQUFTLEVBQUUsZ0JBQWdCOzRCQUMzQixPQUFPLEVBQUUsQ0FBQzt5QkFDWCxDQUFDLENBQUM7d0JBQ0gsS0FBSyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUM7NEJBQ3JCLFNBQVMsRUFBRSxlQUFlOzRCQUMxQixPQUFPLEVBQUUsQ0FBQzt5QkFDWCxDQUFDLENBQUM7d0JBQ0gsVUFBVSxDQUFDLGlCQUFpQixFQUFFLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO3dCQUNsRSxVQUFVLENBQUMsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUM7cUJBQ25FLENBQUM7aUJBQ0g7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLGdDQUFnQyxFQUFFLFFBQVE7b0JBQzFDLCtCQUErQixFQUFFLE9BQU87aUJBQ3pDO2dCQUNELFNBQVMsRUFBRSxDQUFDLGtDQUFrQyxDQUFDO2dCQUMvQyxtQkFBbUI7YUFDcEI7Ozs7WUF0R0MsVUFBVTtZQUlWLFNBQVM7WUFOVCxpQkFBaUI7Ozs0QkEwR2hCLEtBQUs7K0JBQ0wsS0FBSzs2QkFDTCxLQUFLO21DQUNMLEtBQUs7MkJBQ0wsS0FBSzs7OztJQUpOLDZDQUErQjs7SUFDL0IsZ0RBQWtDOztJQUNsQyw4Q0FBdUM7O0lBQ3ZDLG9EQUF3Qzs7SUFDeEMsNENBQXdDOzs7OztJQUV4QyxxREFBMEM7O0lBRTlCLGtDQUFxQjs7SUFDckIsd0NBQTBCOzs7OztJQUMxQixtQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBSZW5kZXJlcjIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgYW5pbWF0ZSwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE11bHRpU2VsZWN0IH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcblxuLyogdHNsaW50OmRpc2FibGUgKi9cbmV4cG9ydCBjb25zdCBLQUxUVVJBX01VTFRJU0VMRUNUX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNdWx0aVNlbGVjdENvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG4vKiB0c2xpbnQ6ZW5hYmxlICovXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2tNdWx0aVNlbGVjdCcsXG4gIHN0eWxlczogW2A6aG9zdCAvZGVlcC8gLnVpLW11bHRpc2VsZWN0LXBhbmVsIC5waS1taW51c3tiYWNrZ3JvdW5kLWNvbG9yOiMwMGE3ODQ7Ym9yZGVyOjFweCBzb2xpZCAjMDBhNzg0O2NvbG9yOiNmZmY7d2lkdGg6MTZweDtoZWlnaHQ6MTZweDtib3JkZXItcmFkaXVzOjNweDt0b3A6LTFweDtwb3NpdGlvbjpyZWxhdGl2ZTtsZWZ0Oi0xcHh9YF0sXG4gIHRlbXBsYXRlOiBgPGRpdiAjY29udGFpbmVyIFtuZ0NsYXNzXT1cInsndWktbXVsdGlzZWxlY3QgdWktd2lkZ2V0IHVpLXN0YXRlLWRlZmF1bHQgdWktY29ybmVyLWFsbCc6dHJ1ZSwndWktbXVsdGlzZWxlY3Qtb3Blbic6b3ZlcmxheVZpc2libGUsJ3VpLXN0YXRlLWZvY3VzJzpmb2N1cywndWktc3RhdGUtZGlzYWJsZWQnOiBkaXNhYmxlZH1cIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCJcbiAgICAgKGNsaWNrKT1cIm9uTW91c2VjbGljaygkZXZlbnQsaW4pXCI+XG4gIDxkaXYgY2xhc3M9XCJ1aS1oZWxwZXItaGlkZGVuLWFjY2Vzc2libGVcIj5cbiAgICA8aW5wdXQgI2luIHR5cGU9XCJ0ZXh0XCIgcmVhZG9ubHk9XCJyZWFkb25seVwiIFthdHRyLmlkXT1cImlucHV0SWRcIiBbYXR0ci5uYW1lXT1cIm5hbWVcIiAoZm9jdXMpPVwib25JbnB1dEZvY3VzKCRldmVudClcIiAoYmx1cik9XCJvbklucHV0Qmx1cigkZXZlbnQpXCJcbiAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgW2F0dHIudGFiaW5kZXhdPVwidGFiaW5kZXhcIiAoa2V5ZG93bik9XCJvbktleWRvd24oJGV2ZW50KVwiPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInVpLW11bHRpc2VsZWN0LWxhYmVsLWNvbnRhaW5lclwiIFt0aXRsZV09XCJ2YWx1ZXNBc1N0cmluZ1wiPlxuICAgIDxsYWJlbCBjbGFzcz1cInVpLW11bHRpc2VsZWN0LWxhYmVsIHVpLWNvcm5lci1hbGxcIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhc2VsZWN0ZWRJdGVtc1RlbXBsYXRlXCI+e3tpc0FsbENoZWNrZWQoKSA/IChhbGxTZWxlY3RlZExhYmVsIHx8IHZhbHVlc0FzU3RyaW5nKSA6IHZhbHVlc0FzU3RyaW5nfX08L25nLWNvbnRhaW5lcj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJzZWxlY3RlZEl0ZW1zVGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IHZhbHVlfVwiPjwvbmctY29udGFpbmVyPlxuICAgIDwvbGFiZWw+XG4gIDwvZGl2PlxuICA8ZGl2IFtuZ0NsYXNzXT1cInsndWktbXVsdGlzZWxlY3QtdHJpZ2dlciB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1yaWdodCc6dHJ1ZX1cIj5cbiAgICA8c3BhbiBjbGFzcz1cInVpLW11bHRpc2VsZWN0LXRyaWdnZXItaWNvbiB1aS1jbGlja2FibGVcIiBbbmdDbGFzc109XCJkcm9wZG93bkljb25cIj48L3NwYW4+XG4gIDwvZGl2PlxuICA8ZGl2ICpuZ0lmPVwib3ZlcmxheVZpc2libGVcIiBbbmdDbGFzc109XCJbJ3VpLW11bHRpc2VsZWN0LXBhbmVsIHVpLXdpZGdldCB1aS13aWRnZXQtY29udGVudCB1aS1jb3JuZXItYWxsIHVpLXNoYWRvdyddXCIgW0BvdmVybGF5QW5pbWF0aW9uXT1cInt2YWx1ZTogJ3Zpc2libGUnLCBwYXJhbXM6IHtzaG93VHJhbnNpdGlvblBhcmFtczogc2hvd1RyYW5zaXRpb25PcHRpb25zLCBoaWRlVHJhbnNpdGlvblBhcmFtczogaGlkZVRyYW5zaXRpb25PcHRpb25zfX1cIiAoQG92ZXJsYXlBbmltYXRpb24uc3RhcnQpPVwib25PdmVybGF5QW5pbWF0aW9uU3RhcnQoJGV2ZW50KVwiXG4gICAgICAgW25nU3R5bGVdPVwicGFuZWxTdHlsZVwiIFtjbGFzc109XCJwYW5lbFN0eWxlQ2xhc3NcIiAoY2xpY2spPVwicGFuZWxDbGljaz10cnVlXCI+XG4gICAgPGRpdiBjbGFzcz1cInVpLXdpZGdldC1oZWFkZXIgdWktY29ybmVyLWFsbCB1aS1tdWx0aXNlbGVjdC1oZWFkZXIgdWktaGVscGVyLWNsZWFyZml4XCIgW25nQ2xhc3NdPVwieyd1aS1tdWx0aXNlbGVjdC1oZWFkZXItbm8tdG9nZ2xlYWxsJzogIXNob3dUb2dnbGVBbGx9XCIgKm5nSWY9XCJzaG93SGVhZGVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwidWktY2hrYm94IHVpLXdpZGdldFwiICpuZ0lmPVwic2hvd1RvZ2dsZUFsbCAmJiAhc2VsZWN0aW9uTGltaXRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInVpLWhlbHBlci1oaWRkZW4tYWNjZXNzaWJsZVwiPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiByZWFkb25seT1cInJlYWRvbmx5XCIgW2NoZWNrZWRdPVwiaXNBbGxDaGVja2VkKClcIiAoZm9jdXMpPVwib25IZWFkZXJDaGVja2JveEZvY3VzKClcIiAoYmx1cik9XCJvbkhlYWRlckNoZWNrYm94Qmx1cigpXCIgKGtleWRvd24uc3BhY2UpPVwidG9nZ2xlQWxsKCRldmVudClcIj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1jaGtib3gtYm94IHVpLXdpZGdldCB1aS1jb3JuZXItYWxsIHVpLXN0YXRlLWRlZmF1bHRcIiBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWFjdGl2ZSc6aXNBbGxDaGVja2VkKCksICd1aS1zdGF0ZS1mb2N1cyc6IGhlYWRlckNoZWNrYm94Rm9jdXN9XCIgKGNsaWNrKT1cInRvZ2dsZUFsbCgkZXZlbnQpXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1jaGtib3gtaWNvbiB1aS1jbGlja2FibGUgcGlcIlxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsncGktY2hlY2snOmlzQWxsQ2hlY2tlZCgpLCAncGktbWludXMnOmlzUGFydGlhbGx5Q2hlY2tlZCgpfVwiPjwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ1aS1tdWx0aXNlbGVjdC1maWx0ZXItY29udGFpbmVyXCIgKm5nSWY9XCJmaWx0ZXJcIj5cbiAgICAgICAgPGlucHV0ICNmaWx0ZXJJbnB1dCB0eXBlPVwidGV4dFwiIHJvbGU9XCJ0ZXh0Ym94XCIgW3ZhbHVlXT1cImZpbHRlclZhbHVlfHwnJ1wiIChpbnB1dCk9XCJvbkZpbHRlcigpXCIgY2xhc3M9XCJ1aS1pbnB1dHRleHQgdWktd2lkZ2V0IHVpLXN0YXRlLWRlZmF1bHQgdWktY29ybmVyLWFsbFwiIFthdHRyLnBsYWNlaG9sZGVyXT1cImZpbHRlclBsYWNlSG9sZGVyXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwidWktbXVsdGlzZWxlY3QtZmlsdGVyLWljb24gcGkgcGktc2VhcmNoXCI+PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8YSBjbGFzcz1cInVpLW11bHRpc2VsZWN0LWNsb3NlIHVpLWNvcm5lci1hbGxcIiB0YWJpbmRleD1cIjBcIiAoY2xpY2spPVwiY2xvc2UoJGV2ZW50KVwiIChrZXlkb3duLmVudGVyKT1cImNsb3NlKCRldmVudClcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJwaSBwaS10aW1lc1wiPjwvc3Bhbj5cbiAgICAgIDwvYT5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInAtaGVhZGVyXCI+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJ1aS1tdWx0aXNlbGVjdC1pdGVtcy13cmFwcGVyXCIgW3N0eWxlLm1heC1oZWlnaHRdPVwidmlydHVhbFNjcm9sbCA/ICdhdXRvJyA6IChzY3JvbGxIZWlnaHR8fCdhdXRvJylcIj5cbiAgICAgIDx1bCBjbGFzcz1cInVpLW11bHRpc2VsZWN0LWl0ZW1zIHVpLW11bHRpc2VsZWN0LWxpc3QgdWktd2lkZ2V0LWNvbnRlbnQgdWktd2lkZ2V0IHVpLWNvcm5lci1hbGwgdWktaGVscGVyLXJlc2V0XCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhdmlydHVhbFNjcm9sbDsgZWxzZSB2aXJ0dWFsU2Nyb2xsTGlzdFwiPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtb3B0aW9uIGxldC1pPVwiaW5kZXhcIiBbbmdGb3JPZl09XCJvcHRpb25zXCI+XG4gICAgICAgICAgICA8cC1tdWx0aVNlbGVjdEl0ZW0gW29wdGlvbl09XCJvcHRpb25cIiBbc2VsZWN0ZWRdPVwiaXNTZWxlY3RlZChvcHRpb24udmFsdWUpXCIgKG9uQ2xpY2spPVwib25PcHRpb25DbGljaygkZXZlbnQpXCIgKG9uS2V5ZG93bik9XCJvbk9wdGlvbktleWRvd24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW21heFNlbGVjdGlvbkxpbWl0UmVhY2hlZF09XCJtYXhTZWxlY3Rpb25MaW1pdFJlYWNoZWRcIiBbdmlzaWJsZV09XCJpc0l0ZW1WaXNpYmxlKG9wdGlvbilcIiBbdGVtcGxhdGVdPVwiaXRlbVRlbXBsYXRlXCI+PC9wLW11bHRpU2VsZWN0SXRlbT5cbiAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLXRlbXBsYXRlICN2aXJ0dWFsU2Nyb2xsTGlzdD5cbiAgICAgICAgICA8Y2RrLXZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0ICN2aWV3cG9ydCBbbmdTdHlsZV09XCJ7J2hlaWdodCc6IHNjcm9sbEhlaWdodH1cIiBbaXRlbVNpemVdPVwiaXRlbVNpemVcIiAqbmdJZj1cInZpcnR1YWxTY3JvbGxcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKmNka1ZpcnR1YWxGb3I9XCJsZXQgb3B0aW9uIG9mIG9wdGlvbnM7IGxldCBpID0gaW5kZXg7IGxldCBjID0gY291bnQ7IGxldCBmID0gZmlyc3Q7IGxldCBsID0gbGFzdDsgbGV0IGUgPSBldmVuOyBsZXQgbyA9IG9kZFwiPlxuICAgICAgICAgICAgICA8cC1tdWx0aVNlbGVjdEl0ZW0gW29wdGlvbl09XCJvcHRpb25cIiBbc2VsZWN0ZWRdPVwiaXNTZWxlY3RlZChvcHRpb24udmFsdWUpXCIgKG9uQ2xpY2spPVwib25PcHRpb25DbGljaygkZXZlbnQpXCIgKG9uS2V5ZG93bik9XCJvbk9wdGlvbktleWRvd24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbWF4U2VsZWN0aW9uTGltaXRSZWFjaGVkXT1cIm1heFNlbGVjdGlvbkxpbWl0UmVhY2hlZFwiIFt2aXNpYmxlXT1cImlzSXRlbVZpc2libGUob3B0aW9uKVwiIFt0ZW1wbGF0ZV09XCJpdGVtVGVtcGxhdGVcIiBbaXRlbVNpemVdPVwiaXRlbVNpemVcIj48L3AtbXVsdGlTZWxlY3RJdGVtPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPC9jZGstdmlydHVhbC1zY3JvbGwtdmlld3BvcnQ+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8L3VsPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJ1aS1tdWx0aXNlbGVjdC1mb290ZXIgdWktd2lkZ2V0LWNvbnRlbnRcIiAqbmdJZj1cImZvb3RlckZhY2V0XCI+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJwLWZvb3RlclwiPjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdvdmVybGF5QW5pbWF0aW9uJywgW1xuICAgICAgc3RhdGUoJ3ZvaWQnLCBzdHlsZSh7XG4gICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoNSUpJyxcbiAgICAgICAgb3BhY2l0eTogMFxuICAgICAgfSkpLFxuICAgICAgc3RhdGUoJ3Zpc2libGUnLCBzdHlsZSh7XG4gICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMCknLFxuICAgICAgICBvcGFjaXR5OiAxXG4gICAgICB9KSksXG4gICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IHZpc2libGUnLCBhbmltYXRlKCd7e3Nob3dUcmFuc2l0aW9uUGFyYW1zfX0nKSksXG4gICAgICB0cmFuc2l0aW9uKCd2aXNpYmxlID0+IHZvaWQnLCBhbmltYXRlKCd7e2hpZGVUcmFuc2l0aW9uUGFyYW1zfX0nKSlcbiAgICBdKVxuICBdLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy51aS1pbnB1dHdyYXBwZXItZmlsbGVkXSc6ICdmaWxsZWQnLFxuICAgICdbY2xhc3MudWktaW5wdXR3cmFwcGVyLWZvY3VzXSc6ICdmb2N1cydcbiAgfSxcbiAgcHJvdmlkZXJzOiBbS0FMVFVSQV9NVUxUSVNFTEVDVF9WQUxVRV9BQ0NFU1NPUl1cbiAgLyogdHNsaW50OmVuYWJsZSAqL1xufSlcbmV4cG9ydCBjbGFzcyBNdWx0aVNlbGVjdENvbXBvbmVudCBleHRlbmRzIE11bHRpU2VsZWN0IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgQElucHV0KCkgZGlzYWJsZWRMYWJlbDogc3RyaW5nO1xuICBASW5wdXQoKSBhbGxTZWxlY3RlZExhYmVsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNlbGVjdEFsbExhYmVsID0gJ1NlbGVjdCBBbGwnO1xuICBASW5wdXQoKSBtZW51SXRlbURpc3BsYXlTdHlsZSA9ICdibG9jayc7XG4gIEBJbnB1dCgpIGhpZGVPblNjcm9sbDogc3RyaW5nIHwgRWxlbWVudDtcblxuICBwcml2YXRlIF9oaWRlT25TY3JvbGxMaXN0ZW5lcjogKCkgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgIHB1YmxpYyByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICAgICAgICBwcml2YXRlIF9jZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICBzdXBlcihlbCwgcmVuZGVyZXIsIF9jZCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuICAgIHRoaXMuX3JlbW92ZUhpZGVPblNjcm9sbEhhbmRsZXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZEhpZGVPblNjcm9sbEhhbmRsZXIoKSB7XG4gICAgaWYgKHRoaXMuaGlkZU9uU2Nyb2xsKSB7XG4gICAgICBjb25zdCBsaXN0ZW5FbGVtZW50ID0gdHlwZW9mIHRoaXMuaGlkZU9uU2Nyb2xsID09PSAnc3RyaW5nJ1xuICAgICAgICA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5oaWRlT25TY3JvbGwpXG4gICAgICAgIDogdGhpcy5oaWRlT25TY3JvbGw7XG5cbiAgICAgIGlmIChsaXN0ZW5FbGVtZW50IGluc3RhbmNlb2YgRWxlbWVudCkge1xuICAgICAgICB0aGlzLl9oaWRlT25TY3JvbGxMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGxpc3RlbkVsZW1lbnQsICdzY3JvbGwnLCAoKSA9PiB0aGlzLmhpZGUoKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlSGlkZU9uU2Nyb2xsSGFuZGxlcigpIHtcbiAgICBpZiAodGhpcy5oaWRlT25TY3JvbGwgJiYgdGhpcy5faGlkZU9uU2Nyb2xsTGlzdGVuZXIpIHtcbiAgICAgIHRoaXMuX2hpZGVPblNjcm9sbExpc3RlbmVyKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNob3coKTogdm9pZCB7XG4gICAgc3VwZXIuc2hvdygpO1xuICAgIHRoaXMuX2FkZEhpZGVPblNjcm9sbEhhbmRsZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBoaWRlKCk6IHZvaWQge1xuICAgIHN1cGVyLmhpZGUoKTtcbiAgICB0aGlzLl9yZW1vdmVIaWRlT25TY3JvbGxIYW5kbGVyKCk7XG4gIH1cblxuICBwdWJsaWMgaXNQYXJ0aWFsbHlDaGVja2VkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5pc0FsbENoZWNrZWQoKSAmJiAodGhpcy52YWx1ZSB8fCBbXSkubGVuZ3RoID4gMDtcbiAgfVxufVxuIl19