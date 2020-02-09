/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
export class MultiSelectItem {
    constructor() {
        this.onClick = new EventEmitter();
        this.onKeydown = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onOptionClick(event) {
        this.onClick.emit({
            originalEvent: event,
            option: this.option
        });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onOptionKeydown(event) {
        this.onKeydown.emit({
            originalEvent: event,
            option: this.option
        });
    }
}
MultiSelectItem.decorators = [
    { type: Component, args: [{
                selector: 'p-multiSelectItem',
                template: `
    <li class="ui-multiselect-item ui-corner-all" (click)="onOptionClick($event)" (keydown)="onOptionKeydown($event)"
        [style.display]="visible ? 'block' : 'none'" [attr.tabindex]="option.disabled ? null : '0'" [ngStyle]="{'height': itemSize + 'px'}"
        [ngClass]="{'ui-state-highlight': selected, 'ui-state-disabled': (option.disabled || (maxSelectionLimitReached && !selected))}">
      <div class="ui-chkbox ui-widget">
        <div class="ui-chkbox-box ui-widget ui-corner-all ui-state-default"
             [ngClass]="{'ui-state-active': selected}">
          <span class="ui-chkbox-icon ui-clickable" [ngClass]="{'pi pi-check': selected}"></span>
        </div>
      </div>
      <label *ngIf="!template">{{option.label}}</label>
      <ng-container *ngTemplateOutlet="template; context: {$implicit: option}"></ng-container>
    </li>
  `
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktc2VsZWN0LWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGthbHR1cmEtbmcva2FsdHVyYS1wcmltZW5nLXVpLyIsInNvdXJjZXMiOlsibGliL211bHRpLXNlbGVjdC9tdWx0aS1zZWxlY3QtaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBb0JwRixNQUFNLE9BQU8sZUFBZTtJQWpCNUI7UUFpQ1ksWUFBTyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWhELGNBQVMsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQWU5RCxDQUFDOzs7OztJQWJDLGFBQWEsQ0FBQyxLQUFZO1FBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ2hCLGFBQWEsRUFBRSxLQUFLO1lBQ3BCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtTQUNwQixDQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQUVELGVBQWUsQ0FBQyxLQUFZO1FBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1lBQ2xCLGFBQWEsRUFBRSxLQUFLO1lBQ3BCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtTQUNwQixDQUFDLENBQUM7SUFDTCxDQUFDOzs7WUFqREYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7OztHQWFUO2FBQ0Y7OztxQkFHRSxLQUFLO3VCQUVMLEtBQUs7dUJBRUwsS0FBSztzQkFFTCxLQUFLO3VCQUVMLEtBQUs7dUJBRUwsS0FBSzt1Q0FFTCxLQUFLO3NCQUVMLE1BQU07d0JBRU4sTUFBTTs7OztJQWhCUCxpQ0FBNEI7O0lBRTVCLG1DQUEyQjs7SUFFM0IsbUNBQTJCOztJQUUzQixrQ0FBMEI7O0lBRTFCLG1DQUEwQjs7SUFFMUIsbUNBQW9DOztJQUVwQyxtREFBMkM7O0lBRTNDLGtDQUEwRDs7SUFFMUQsb0NBQTREIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTZWxlY3RJdGVtIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwLW11bHRpU2VsZWN0SXRlbScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGxpIGNsYXNzPVwidWktbXVsdGlzZWxlY3QtaXRlbSB1aS1jb3JuZXItYWxsXCIgKGNsaWNrKT1cIm9uT3B0aW9uQ2xpY2soJGV2ZW50KVwiIChrZXlkb3duKT1cIm9uT3B0aW9uS2V5ZG93bigkZXZlbnQpXCJcbiAgICAgICAgW3N0eWxlLmRpc3BsYXldPVwidmlzaWJsZSA/ICdibG9jaycgOiAnbm9uZSdcIiBbYXR0ci50YWJpbmRleF09XCJvcHRpb24uZGlzYWJsZWQgPyBudWxsIDogJzAnXCIgW25nU3R5bGVdPVwieydoZWlnaHQnOiBpdGVtU2l6ZSArICdweCd9XCJcbiAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1oaWdobGlnaHQnOiBzZWxlY3RlZCwgJ3VpLXN0YXRlLWRpc2FibGVkJzogKG9wdGlvbi5kaXNhYmxlZCB8fCAobWF4U2VsZWN0aW9uTGltaXRSZWFjaGVkICYmICFzZWxlY3RlZCkpfVwiPlxuICAgICAgPGRpdiBjbGFzcz1cInVpLWNoa2JveCB1aS13aWRnZXRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInVpLWNoa2JveC1ib3ggdWktd2lkZ2V0IHVpLWNvcm5lci1hbGwgdWktc3RhdGUtZGVmYXVsdFwiXG4gICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1hY3RpdmUnOiBzZWxlY3RlZH1cIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLWNoa2JveC1pY29uIHVpLWNsaWNrYWJsZVwiIFtuZ0NsYXNzXT1cInsncGkgcGktY2hlY2snOiBzZWxlY3RlZH1cIj48L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8bGFiZWwgKm5nSWY9XCIhdGVtcGxhdGVcIj57e29wdGlvbi5sYWJlbH19PC9sYWJlbD5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0ZW1wbGF0ZTsgY29udGV4dDogeyRpbXBsaWNpdDogb3B0aW9ufVwiPjwvbmctY29udGFpbmVyPlxuICAgIDwvbGk+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTXVsdGlTZWxlY3RJdGVtIHtcbiAgXG4gIEBJbnB1dCgpIG9wdGlvbjogU2VsZWN0SXRlbTtcbiAgXG4gIEBJbnB1dCgpIHNlbGVjdGVkOiBib29sZWFuO1xuICBcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG4gIFxuICBASW5wdXQoKSB2aXNpYmxlOiBib29sZWFuO1xuICBcbiAgQElucHV0KCkgaXRlbVNpemU6IG51bWJlcjtcbiAgXG4gIEBJbnB1dCgpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBcbiAgQElucHV0KCkgbWF4U2VsZWN0aW9uTGltaXRSZWFjaGVkOiBib29sZWFuO1xuICBcbiAgQE91dHB1dCgpIG9uQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBcbiAgQE91dHB1dCgpIG9uS2V5ZG93bjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIFxuICBvbk9wdGlvbkNsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgIHRoaXMub25DbGljay5lbWl0KHtcbiAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgb3B0aW9uOiB0aGlzLm9wdGlvblxuICAgIH0pO1xuICB9XG4gIFxuICBvbk9wdGlvbktleWRvd24oZXZlbnQ6IEV2ZW50KSB7XG4gICAgdGhpcy5vbktleWRvd24uZW1pdCh7XG4gICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgIG9wdGlvbjogdGhpcy5vcHRpb25cbiAgICB9KTtcbiAgfVxufSJdfQ==