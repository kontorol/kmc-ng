/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Dropdown } from 'primeng/components/dropdown/dropdown';
import { animate, state, style, transition, trigger } from '@angular/animations';
/** @type {?} */
export const DROPDOWN_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropdownComponent),
    multi: true
};
export class DropdownComponent extends Dropdown {
    /**
     * @param {?} event
     * @param {?} option
     * @return {?}
     */
    onItemClick(event, option) {
        if (!option['disabled']) {
            super.onItemClick(event, option);
        }
        else {
            event.stopPropagation();
        }
    }
    /**
     * @param {?} event
     * @param {?} option
     * @return {?}
     */
    selectItem(event, option) {
        if (!option['disabled']) {
            super.selectItem(event, option);
        }
        else {
            event.stopPropagation();
        }
    }
}
DropdownComponent.decorators = [
    { type: Component, args: [{
                selector: 'kDropdown',
                template: `<div #container [ngClass]="{'ui-dropdown ui-widget ui-state-default ui-corner-all ui-helper-clearfix':true,
            'ui-state-disabled':disabled,'ui-dropdown-open':overlayVisible,'ui-state-focus':focused, 'ui-dropdown-clearable': showClear && !disabled}"
     (click)="onMouseclick($event)" [ngStyle]="style" [class]="styleClass">
  <div class="ui-helper-hidden-accessible" *ngIf="autoWidth">
    <select [required]="required" [attr.name]="name" [attr.aria-label]="selectedOption ? selectedOption.label : ' '" tabindex="-1" aria-hidden="true">
      <option *ngIf="placeholder">{{placeholder}}</option>
      <ng-container *ngIf="group">
        <optgroup *ngFor="let option of options" [attr.label]="option.label">
          <option *ngFor="let option of option.items" [value]="option.value" [selected]="selectedOption == option">{{option.label}}</option>
          <optgroup>
      </ng-container>
      <ng-container *ngIf="!group">
        <option *ngFor="let option of options" [value]="option.value" [selected]="selectedOption == option">{{option.label}}</option>
      </ng-container>
    </select>
  </div>
  <div class="ui-helper-hidden-accessible">
    <input #in [attr.id]="inputId" type="text" [attr.aria-label]="selectedOption ? selectedOption.label : ' '" readonly (focus)="onInputFocus($event)" role="listbox"
           (blur)="onInputBlur($event)" (keydown)="onKeydown($event, true)" [disabled]="disabled" [attr.tabindex]="tabindex" [attr.autofocus]="autofocus">
  </div>
  <label [ngClass]="{'ui-dropdown-label ui-inputtext ui-corner-all':true,'ui-dropdown-label-empty':(label == null || label.length === 0)}" *ngIf="!editable && (label != null)">
    <ng-container *ngIf="!selectedItemTemplate">{{label||'empty'}}</ng-container>
    <ng-container *ngTemplateOutlet="selectedItemTemplate; context: {$implicit: selectedOption}"></ng-container>
  </label>
  <label [ngClass]="{'ui-dropdown-label ui-inputtext ui-corner-all ui-placeholder':true,'ui-dropdown-label-empty': (placeholder == null || placeholder.length === 0)}" *ngIf="!editable && (label == null)">{{placeholder||'empty'}}</label>
  <input #editableInput type="text" [attr.aria-label]="selectedOption ? selectedOption.label : ' '" class="ui-dropdown-label ui-inputtext ui-corner-all" *ngIf="editable" [disabled]="disabled" [attr.placeholder]="placeholder"
         (click)="onEditableInputClick($event)" (input)="onEditableInputChange($event)" (focus)="onEditableInputFocus($event)" (blur)="onInputBlur($event)">
  <i class="ui-dropdown-clear-icon pi pi-times" (click)="clear($event)" *ngIf="value != null && showClear && !disabled"></i>
  <div class="ui-dropdown-trigger ui-state-default ui-corner-right">
    <span class="ui-dropdown-trigger-icon ui-clickable" [ngClass]="dropdownIcon"></span>
  </div>
  <div #panel [ngClass]="'ui-dropdown-panel ui-widget-content ui-corner-all ui-shadow'" [@panelState]="overlayVisible ? 'visible' : 'hidden'"
       [style.display]="overlayVisible ? 'block' : 'none'" [ngStyle]="panelStyle" [class]="panelStyleClass">
    <div *ngIf="filter" class="ui-dropdown-filter-container" (input)="onFilter($event)" (click)="$event.stopPropagation()">
      <input #filter type="text" autocomplete="off" class="ui-dropdown-filter ui-inputtext ui-widget ui-state-default ui-corner-all" [attr.placeholder]="filterPlaceholder"
             (keydown.enter)="$event.preventDefault()" (keydown)="onKeydown($event, false)">
      <span class="ui-dropdown-filter-icon pi pi-search"></span>
    </div>
    <div #itemswrapper class="ui-dropdown-items-wrapper" [style.max-height]="scrollHeight||'auto'">
      <ul class="ui-dropdown-items ui-dropdown-list ui-widget-content ui-widget ui-corner-all ui-helper-reset">
        <ng-container *ngIf="group">
          <ng-template ngFor let-optgroup [ngForOf]="optionsToDisplay">
            <li class="ui-dropdown-item-group">
              <span *ngIf="!groupTemplate">{{optgroup.label||'empty'}}</span>
              <ng-container *ngTemplateOutlet="groupTemplate; context: {$implicit: optgroup}"></ng-container>
            </li>
            <ng-container *ngTemplateOutlet="itemslist; context: {$implicit: optgroup.items, selectedOption: selectedOption}"></ng-container>
          </ng-template>
        </ng-container>
        <ng-container *ngIf="!group">
          <ng-container *ngTemplateOutlet="itemslist; context: {$implicit: optionsToDisplay, selectedOption: selectedOption}"></ng-container>
        </ng-container>
        <ng-template #itemslist let-options let-selectedOption="selectedOption">
          <li *ngFor="let option of options;let i=index"
              [ngClass]="{
                'ui-dropdown-item ui-corner-all':true,
                'ui-state-highlight':(selectedOption == option),
                'ui-dropdown-item-empty':!option.label||option.label.length === 0,
                'ui-state-disabled': option.disabled
              }"
              (click)="onItemClick($event, option)">
            <span *ngIf="!itemTemplate">{{option.label||'empty'}}</span>
            <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: option}"></ng-container>
          </li>
        </ng-template>
        <li *ngIf="filter && optionsToDisplay && optionsToDisplay.length === 0">{{emptyFilterMessage}}</li>
      </ul>
    </div>
  </div>
</div>
`,
                styles: [`.ui-dropdown{display:inline-block;position:relative;cursor:pointer;vertical-align:middle}.ui-dropdown .ui-dropdown-clear-icon{position:absolute;top:50%;font-size:.75em;height:1em;margin-top:-.5em;right:2.5em}.ui-dropdown .ui-dropdown-trigger{border-right:none;border-top:none;border-bottom:none;cursor:pointer;width:1.5em;height:100%;position:absolute;right:0;top:0;padding:0 .25em}.ui-dropdown .ui-dropdown-trigger .ui-dropdown-trigger-icon{top:50%;left:50%;margin-top:-.5em;margin-left:-.5em;position:absolute}.ui-dropdown .ui-dropdown-label{display:block;border:none;white-space:nowrap;overflow:hidden;font-weight:400;width:100%;padding-right:2.5em}.ui-dropdown-item-empty,.ui-dropdown-label-empty{text-indent:-9999px;overflow:hidden}.ui-state-disabled{opacity:.6;cursor:default}.ui-dropdown.ui-state-disabled .ui-dropdown-label,.ui-dropdown.ui-state-disabled .ui-dropdown-trigger{cursor:default}.ui-dropdown label.ui-dropdown-label{cursor:pointer}.ui-dropdown input.ui-dropdown-label{cursor:default}.ui-dropdown .ui-dropdown-panel{min-width:100%}.ui-dropdown-panel{position:absolute;height:auto;display:none}.ui-dropdown-panel .ui-dropdown-items-wrapper{overflow:auto}.ui-dropdown-panel .ui-dropdown-item{font-weight:400;border:0;cursor:pointer;margin:1px 0;padding:.125em .25em;text-align:left}.ui-dropdown-panel .ui-dropdown-item-group{font-weight:700;cursor:default}.ui-dropdown-panel .ui-dropdown-list{padding:.4em;border:0}.ui-dropdown-panel .ui-dropdown-filter{width:100%;box-sizing:border-box;padding-right:1.5em}.ui-dropdown-panel .ui-dropdown-filter-container{position:relative;margin:0;padding:.4em;display:inline-block;width:100%}.ui-dropdown-panel .ui-dropdown-filter-container .ui-dropdown-filter-icon{position:absolute;top:.8em;right:1em}.ui-fluid .ui-dropdown{width:100%}`],
                animations: [
                    trigger('panelState', [
                        state('hidden', style({
                            opacity: 0
                        })),
                        state('visible', style({
                            opacity: 1
                        })),
                        transition('visible => hidden', animate('400ms ease-in')),
                        transition('hidden => visible', animate('400ms ease-out'))
                    ])
                ],
                host: {
                    '[class.ui-inputwrapper-filled]': 'filled',
                    '[class.ui-inputwrapper-focus]': 'focused'
                },
                providers: [DROPDOWN_VALUE_ACCESSOR]
            },] },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGthbHR1cmEtbmcva2FsdHVyYS1wcmltZW5nLXVpLyIsInNvdXJjZXMiOlsibGliL2Ryb3Bkb3duL2Ryb3Bkb3duLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7O0FBR2pGLE1BQU0sT0FBTyx1QkFBdUIsR0FBUTtJQUMxQyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsaUJBQWlCLENBQUM7SUFDaEQsS0FBSyxFQUFFLElBQUk7Q0FDWjtBQWdHRCxNQUFNLE9BQU8saUJBQWtCLFNBQVEsUUFBUTs7Ozs7O0lBQ3RDLFdBQVcsQ0FBQyxLQUFpQixFQUFFLE1BQWtCO1FBQ3RELElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdkIsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDbEM7YUFBTTtZQUNMLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUN6QjtJQUNILENBQUM7Ozs7OztJQUVNLFVBQVUsQ0FBQyxLQUFpQixFQUFFLE1BQWtCO1FBQ3JELElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdkIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDakM7YUFBTTtZQUNMLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUN6QjtJQUNILENBQUM7OztZQTVHRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXNFWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQyxnd0RBQWd3RCxDQUFDO2dCQUMxd0QsVUFBVSxFQUFFO29CQUNWLE9BQU8sQ0FBQyxZQUFZLEVBQUU7d0JBQ3BCLEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDOzRCQUNwQixPQUFPLEVBQUUsQ0FBQzt5QkFDWCxDQUFDLENBQUM7d0JBQ0gsS0FBSyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUM7NEJBQ3JCLE9BQU8sRUFBRSxDQUFDO3lCQUNYLENBQUMsQ0FBQzt3QkFDSCxVQUFVLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO3dCQUN6RCxVQUFVLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7cUJBQzNELENBQUM7aUJBQ0g7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLGdDQUFnQyxFQUFFLFFBQVE7b0JBQzFDLCtCQUErQixFQUFFLFNBQVM7aUJBQzNDO2dCQUNELFNBQVMsRUFBRSxDQUFDLHVCQUF1QixDQUFDO2FBQ3JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERyb3Bkb3duIH0gZnJvbSAncHJpbWVuZy9jb21wb25lbnRzL2Ryb3Bkb3duL2Ryb3Bkb3duJztcbmltcG9ydCB7IGFuaW1hdGUsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgU2VsZWN0SXRlbSB9IGZyb20gJ3ByaW1lbmcvY29tcG9uZW50cy9jb21tb24vc2VsZWN0aXRlbSc7XG5cbmV4cG9ydCBjb25zdCBEUk9QRE9XTl9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRHJvcGRvd25Db21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdrRHJvcGRvd24nLFxuICB0ZW1wbGF0ZTogYDxkaXYgI2NvbnRhaW5lciBbbmdDbGFzc109XCJ7J3VpLWRyb3Bkb3duIHVpLXdpZGdldCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGwgdWktaGVscGVyLWNsZWFyZml4Jzp0cnVlLFxuICAgICAgICAgICAgJ3VpLXN0YXRlLWRpc2FibGVkJzpkaXNhYmxlZCwndWktZHJvcGRvd24tb3Blbic6b3ZlcmxheVZpc2libGUsJ3VpLXN0YXRlLWZvY3VzJzpmb2N1c2VkLCAndWktZHJvcGRvd24tY2xlYXJhYmxlJzogc2hvd0NsZWFyICYmICFkaXNhYmxlZH1cIlxuICAgICAoY2xpY2spPVwib25Nb3VzZWNsaWNrKCRldmVudClcIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCI+XG4gIDxkaXYgY2xhc3M9XCJ1aS1oZWxwZXItaGlkZGVuLWFjY2Vzc2libGVcIiAqbmdJZj1cImF1dG9XaWR0aFwiPlxuICAgIDxzZWxlY3QgW3JlcXVpcmVkXT1cInJlcXVpcmVkXCIgW2F0dHIubmFtZV09XCJuYW1lXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJzZWxlY3RlZE9wdGlvbiA/IHNlbGVjdGVkT3B0aW9uLmxhYmVsIDogJyAnXCIgdGFiaW5kZXg9XCItMVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgPG9wdGlvbiAqbmdJZj1cInBsYWNlaG9sZGVyXCI+e3twbGFjZWhvbGRlcn19PC9vcHRpb24+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZ3JvdXBcIj5cbiAgICAgICAgPG9wdGdyb3VwICpuZ0Zvcj1cImxldCBvcHRpb24gb2Ygb3B0aW9uc1wiIFthdHRyLmxhYmVsXT1cIm9wdGlvbi5sYWJlbFwiPlxuICAgICAgICAgIDxvcHRpb24gKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBvcHRpb24uaXRlbXNcIiBbdmFsdWVdPVwib3B0aW9uLnZhbHVlXCIgW3NlbGVjdGVkXT1cInNlbGVjdGVkT3B0aW9uID09IG9wdGlvblwiPnt7b3B0aW9uLmxhYmVsfX08L29wdGlvbj5cbiAgICAgICAgICA8b3B0Z3JvdXA+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhZ3JvdXBcIj5cbiAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIG9wdGlvbnNcIiBbdmFsdWVdPVwib3B0aW9uLnZhbHVlXCIgW3NlbGVjdGVkXT1cInNlbGVjdGVkT3B0aW9uID09IG9wdGlvblwiPnt7b3B0aW9uLmxhYmVsfX08L29wdGlvbj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvc2VsZWN0PlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInVpLWhlbHBlci1oaWRkZW4tYWNjZXNzaWJsZVwiPlxuICAgIDxpbnB1dCAjaW4gW2F0dHIuaWRdPVwiaW5wdXRJZFwiIHR5cGU9XCJ0ZXh0XCIgW2F0dHIuYXJpYS1sYWJlbF09XCJzZWxlY3RlZE9wdGlvbiA/IHNlbGVjdGVkT3B0aW9uLmxhYmVsIDogJyAnXCIgcmVhZG9ubHkgKGZvY3VzKT1cIm9uSW5wdXRGb2N1cygkZXZlbnQpXCIgcm9sZT1cImxpc3Rib3hcIlxuICAgICAgICAgICAoYmx1cik9XCJvbklucHV0Qmx1cigkZXZlbnQpXCIgKGtleWRvd24pPVwib25LZXlkb3duKCRldmVudCwgdHJ1ZSlcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBbYXR0ci50YWJpbmRleF09XCJ0YWJpbmRleFwiIFthdHRyLmF1dG9mb2N1c109XCJhdXRvZm9jdXNcIj5cbiAgPC9kaXY+XG4gIDxsYWJlbCBbbmdDbGFzc109XCJ7J3VpLWRyb3Bkb3duLWxhYmVsIHVpLWlucHV0dGV4dCB1aS1jb3JuZXItYWxsJzp0cnVlLCd1aS1kcm9wZG93bi1sYWJlbC1lbXB0eSc6KGxhYmVsID09IG51bGwgfHwgbGFiZWwubGVuZ3RoID09PSAwKX1cIiAqbmdJZj1cIiFlZGl0YWJsZSAmJiAobGFiZWwgIT0gbnVsbClcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXNlbGVjdGVkSXRlbVRlbXBsYXRlXCI+e3tsYWJlbHx8J2VtcHR5J319PC9uZy1jb250YWluZXI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInNlbGVjdGVkSXRlbVRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiBzZWxlY3RlZE9wdGlvbn1cIj48L25nLWNvbnRhaW5lcj5cbiAgPC9sYWJlbD5cbiAgPGxhYmVsIFtuZ0NsYXNzXT1cInsndWktZHJvcGRvd24tbGFiZWwgdWktaW5wdXR0ZXh0IHVpLWNvcm5lci1hbGwgdWktcGxhY2Vob2xkZXInOnRydWUsJ3VpLWRyb3Bkb3duLWxhYmVsLWVtcHR5JzogKHBsYWNlaG9sZGVyID09IG51bGwgfHwgcGxhY2Vob2xkZXIubGVuZ3RoID09PSAwKX1cIiAqbmdJZj1cIiFlZGl0YWJsZSAmJiAobGFiZWwgPT0gbnVsbClcIj57e3BsYWNlaG9sZGVyfHwnZW1wdHknfX08L2xhYmVsPlxuICA8aW5wdXQgI2VkaXRhYmxlSW5wdXQgdHlwZT1cInRleHRcIiBbYXR0ci5hcmlhLWxhYmVsXT1cInNlbGVjdGVkT3B0aW9uID8gc2VsZWN0ZWRPcHRpb24ubGFiZWwgOiAnICdcIiBjbGFzcz1cInVpLWRyb3Bkb3duLWxhYmVsIHVpLWlucHV0dGV4dCB1aS1jb3JuZXItYWxsXCIgKm5nSWY9XCJlZGl0YWJsZVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIFthdHRyLnBsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICAgICAgIChjbGljayk9XCJvbkVkaXRhYmxlSW5wdXRDbGljaygkZXZlbnQpXCIgKGlucHV0KT1cIm9uRWRpdGFibGVJbnB1dENoYW5nZSgkZXZlbnQpXCIgKGZvY3VzKT1cIm9uRWRpdGFibGVJbnB1dEZvY3VzKCRldmVudClcIiAoYmx1cik9XCJvbklucHV0Qmx1cigkZXZlbnQpXCI+XG4gIDxpIGNsYXNzPVwidWktZHJvcGRvd24tY2xlYXItaWNvbiBwaSBwaS10aW1lc1wiIChjbGljayk9XCJjbGVhcigkZXZlbnQpXCIgKm5nSWY9XCJ2YWx1ZSAhPSBudWxsICYmIHNob3dDbGVhciAmJiAhZGlzYWJsZWRcIj48L2k+XG4gIDxkaXYgY2xhc3M9XCJ1aS1kcm9wZG93bi10cmlnZ2VyIHVpLXN0YXRlLWRlZmF1bHQgdWktY29ybmVyLXJpZ2h0XCI+XG4gICAgPHNwYW4gY2xhc3M9XCJ1aS1kcm9wZG93bi10cmlnZ2VyLWljb24gdWktY2xpY2thYmxlXCIgW25nQ2xhc3NdPVwiZHJvcGRvd25JY29uXCI+PC9zcGFuPlxuICA8L2Rpdj5cbiAgPGRpdiAjcGFuZWwgW25nQ2xhc3NdPVwiJ3VpLWRyb3Bkb3duLXBhbmVsIHVpLXdpZGdldC1jb250ZW50IHVpLWNvcm5lci1hbGwgdWktc2hhZG93J1wiIFtAcGFuZWxTdGF0ZV09XCJvdmVybGF5VmlzaWJsZSA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nXCJcbiAgICAgICBbc3R5bGUuZGlzcGxheV09XCJvdmVybGF5VmlzaWJsZSA/ICdibG9jaycgOiAnbm9uZSdcIiBbbmdTdHlsZV09XCJwYW5lbFN0eWxlXCIgW2NsYXNzXT1cInBhbmVsU3R5bGVDbGFzc1wiPlxuICAgIDxkaXYgKm5nSWY9XCJmaWx0ZXJcIiBjbGFzcz1cInVpLWRyb3Bkb3duLWZpbHRlci1jb250YWluZXJcIiAoaW5wdXQpPVwib25GaWx0ZXIoJGV2ZW50KVwiIChjbGljayk9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIj5cbiAgICAgIDxpbnB1dCAjZmlsdGVyIHR5cGU9XCJ0ZXh0XCIgYXV0b2NvbXBsZXRlPVwib2ZmXCIgY2xhc3M9XCJ1aS1kcm9wZG93bi1maWx0ZXIgdWktaW5wdXR0ZXh0IHVpLXdpZGdldCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGxcIiBbYXR0ci5wbGFjZWhvbGRlcl09XCJmaWx0ZXJQbGFjZWhvbGRlclwiXG4gICAgICAgICAgICAgKGtleWRvd24uZW50ZXIpPVwiJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIiAoa2V5ZG93bik9XCJvbktleWRvd24oJGV2ZW50LCBmYWxzZSlcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwidWktZHJvcGRvd24tZmlsdGVyLWljb24gcGkgcGktc2VhcmNoXCI+PC9zcGFuPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgI2l0ZW1zd3JhcHBlciBjbGFzcz1cInVpLWRyb3Bkb3duLWl0ZW1zLXdyYXBwZXJcIiBbc3R5bGUubWF4LWhlaWdodF09XCJzY3JvbGxIZWlnaHR8fCdhdXRvJ1wiPlxuICAgICAgPHVsIGNsYXNzPVwidWktZHJvcGRvd24taXRlbXMgdWktZHJvcGRvd24tbGlzdCB1aS13aWRnZXQtY29udGVudCB1aS13aWRnZXQgdWktY29ybmVyLWFsbCB1aS1oZWxwZXItcmVzZXRcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImdyb3VwXCI+XG4gICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1vcHRncm91cCBbbmdGb3JPZl09XCJvcHRpb25zVG9EaXNwbGF5XCI+XG4gICAgICAgICAgICA8bGkgY2xhc3M9XCJ1aS1kcm9wZG93bi1pdGVtLWdyb3VwXCI+XG4gICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIWdyb3VwVGVtcGxhdGVcIj57e29wdGdyb3VwLmxhYmVsfHwnZW1wdHknfX08L3NwYW4+XG4gICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJncm91cFRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiBvcHRncm91cH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbXNsaXN0OyBjb250ZXh0OiB7JGltcGxpY2l0OiBvcHRncm91cC5pdGVtcywgc2VsZWN0ZWRPcHRpb246IHNlbGVjdGVkT3B0aW9ufVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWdyb3VwXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIml0ZW1zbGlzdDsgY29udGV4dDogeyRpbXBsaWNpdDogb3B0aW9uc1RvRGlzcGxheSwgc2VsZWN0ZWRPcHRpb246IHNlbGVjdGVkT3B0aW9ufVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLXRlbXBsYXRlICNpdGVtc2xpc3QgbGV0LW9wdGlvbnMgbGV0LXNlbGVjdGVkT3B0aW9uPVwic2VsZWN0ZWRPcHRpb25cIj5cbiAgICAgICAgICA8bGkgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBvcHRpb25zO2xldCBpPWluZGV4XCJcbiAgICAgICAgICAgICAgW25nQ2xhc3NdPVwie1xuICAgICAgICAgICAgICAgICd1aS1kcm9wZG93bi1pdGVtIHVpLWNvcm5lci1hbGwnOnRydWUsXG4gICAgICAgICAgICAgICAgJ3VpLXN0YXRlLWhpZ2hsaWdodCc6KHNlbGVjdGVkT3B0aW9uID09IG9wdGlvbiksXG4gICAgICAgICAgICAgICAgJ3VpLWRyb3Bkb3duLWl0ZW0tZW1wdHknOiFvcHRpb24ubGFiZWx8fG9wdGlvbi5sYWJlbC5sZW5ndGggPT09IDAsXG4gICAgICAgICAgICAgICAgJ3VpLXN0YXRlLWRpc2FibGVkJzogb3B0aW9uLmRpc2FibGVkXG4gICAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAgICAoY2xpY2spPVwib25JdGVtQ2xpY2soJGV2ZW50LCBvcHRpb24pXCI+XG4gICAgICAgICAgICA8c3BhbiAqbmdJZj1cIiFpdGVtVGVtcGxhdGVcIj57e29wdGlvbi5sYWJlbHx8J2VtcHR5J319PC9zcGFuPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIml0ZW1UZW1wbGF0ZTsgY29udGV4dDogeyRpbXBsaWNpdDogb3B0aW9ufVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDxsaSAqbmdJZj1cImZpbHRlciAmJiBvcHRpb25zVG9EaXNwbGF5ICYmIG9wdGlvbnNUb0Rpc3BsYXkubGVuZ3RoID09PSAwXCI+e3tlbXB0eUZpbHRlck1lc3NhZ2V9fTwvbGk+XG4gICAgICA8L3VsPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC51aS1kcm9wZG93bntkaXNwbGF5OmlubGluZS1ibG9jaztwb3NpdGlvbjpyZWxhdGl2ZTtjdXJzb3I6cG9pbnRlcjt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9LnVpLWRyb3Bkb3duIC51aS1kcm9wZG93bi1jbGVhci1pY29ue3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7Zm9udC1zaXplOi43NWVtO2hlaWdodDoxZW07bWFyZ2luLXRvcDotLjVlbTtyaWdodDoyLjVlbX0udWktZHJvcGRvd24gLnVpLWRyb3Bkb3duLXRyaWdnZXJ7Ym9yZGVyLXJpZ2h0Om5vbmU7Ym9yZGVyLXRvcDpub25lO2JvcmRlci1ib3R0b206bm9uZTtjdXJzb3I6cG9pbnRlcjt3aWR0aDoxLjVlbTtoZWlnaHQ6MTAwJTtwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDowO3RvcDowO3BhZGRpbmc6MCAuMjVlbX0udWktZHJvcGRvd24gLnVpLWRyb3Bkb3duLXRyaWdnZXIgLnVpLWRyb3Bkb3duLXRyaWdnZXItaWNvbnt0b3A6NTAlO2xlZnQ6NTAlO21hcmdpbi10b3A6LS41ZW07bWFyZ2luLWxlZnQ6LS41ZW07cG9zaXRpb246YWJzb2x1dGV9LnVpLWRyb3Bkb3duIC51aS1kcm9wZG93bi1sYWJlbHtkaXNwbGF5OmJsb2NrO2JvcmRlcjpub25lO3doaXRlLXNwYWNlOm5vd3JhcDtvdmVyZmxvdzpoaWRkZW47Zm9udC13ZWlnaHQ6NDAwO3dpZHRoOjEwMCU7cGFkZGluZy1yaWdodDoyLjVlbX0udWktZHJvcGRvd24taXRlbS1lbXB0eSwudWktZHJvcGRvd24tbGFiZWwtZW1wdHl7dGV4dC1pbmRlbnQ6LTk5OTlweDtvdmVyZmxvdzpoaWRkZW59LnVpLXN0YXRlLWRpc2FibGVke29wYWNpdHk6LjY7Y3Vyc29yOmRlZmF1bHR9LnVpLWRyb3Bkb3duLnVpLXN0YXRlLWRpc2FibGVkIC51aS1kcm9wZG93bi1sYWJlbCwudWktZHJvcGRvd24udWktc3RhdGUtZGlzYWJsZWQgLnVpLWRyb3Bkb3duLXRyaWdnZXJ7Y3Vyc29yOmRlZmF1bHR9LnVpLWRyb3Bkb3duIGxhYmVsLnVpLWRyb3Bkb3duLWxhYmVse2N1cnNvcjpwb2ludGVyfS51aS1kcm9wZG93biBpbnB1dC51aS1kcm9wZG93bi1sYWJlbHtjdXJzb3I6ZGVmYXVsdH0udWktZHJvcGRvd24gLnVpLWRyb3Bkb3duLXBhbmVse21pbi13aWR0aDoxMDAlfS51aS1kcm9wZG93bi1wYW5lbHtwb3NpdGlvbjphYnNvbHV0ZTtoZWlnaHQ6YXV0bztkaXNwbGF5Om5vbmV9LnVpLWRyb3Bkb3duLXBhbmVsIC51aS1kcm9wZG93bi1pdGVtcy13cmFwcGVye292ZXJmbG93OmF1dG99LnVpLWRyb3Bkb3duLXBhbmVsIC51aS1kcm9wZG93bi1pdGVte2ZvbnQtd2VpZ2h0OjQwMDtib3JkZXI6MDtjdXJzb3I6cG9pbnRlcjttYXJnaW46MXB4IDA7cGFkZGluZzouMTI1ZW0gLjI1ZW07dGV4dC1hbGlnbjpsZWZ0fS51aS1kcm9wZG93bi1wYW5lbCAudWktZHJvcGRvd24taXRlbS1ncm91cHtmb250LXdlaWdodDo3MDA7Y3Vyc29yOmRlZmF1bHR9LnVpLWRyb3Bkb3duLXBhbmVsIC51aS1kcm9wZG93bi1saXN0e3BhZGRpbmc6LjRlbTtib3JkZXI6MH0udWktZHJvcGRvd24tcGFuZWwgLnVpLWRyb3Bkb3duLWZpbHRlcnt3aWR0aDoxMDAlO2JveC1zaXppbmc6Ym9yZGVyLWJveDtwYWRkaW5nLXJpZ2h0OjEuNWVtfS51aS1kcm9wZG93bi1wYW5lbCAudWktZHJvcGRvd24tZmlsdGVyLWNvbnRhaW5lcntwb3NpdGlvbjpyZWxhdGl2ZTttYXJnaW46MDtwYWRkaW5nOi40ZW07ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6MTAwJX0udWktZHJvcGRvd24tcGFuZWwgLnVpLWRyb3Bkb3duLWZpbHRlci1jb250YWluZXIgLnVpLWRyb3Bkb3duLWZpbHRlci1pY29ue3Bvc2l0aW9uOmFic29sdXRlO3RvcDouOGVtO3JpZ2h0OjFlbX0udWktZmx1aWQgLnVpLWRyb3Bkb3due3dpZHRoOjEwMCV9YF0sXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdwYW5lbFN0YXRlJywgW1xuICAgICAgc3RhdGUoJ2hpZGRlbicsIHN0eWxlKHtcbiAgICAgICAgb3BhY2l0eTogMFxuICAgICAgfSkpLFxuICAgICAgc3RhdGUoJ3Zpc2libGUnLCBzdHlsZSh7XG4gICAgICAgIG9wYWNpdHk6IDFcbiAgICAgIH0pKSxcbiAgICAgIHRyYW5zaXRpb24oJ3Zpc2libGUgPT4gaGlkZGVuJywgYW5pbWF0ZSgnNDAwbXMgZWFzZS1pbicpKSxcbiAgICAgIHRyYW5zaXRpb24oJ2hpZGRlbiA9PiB2aXNpYmxlJywgYW5pbWF0ZSgnNDAwbXMgZWFzZS1vdXQnKSlcbiAgICBdKVxuICBdLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy51aS1pbnB1dHdyYXBwZXItZmlsbGVkXSc6ICdmaWxsZWQnLFxuICAgICdbY2xhc3MudWktaW5wdXR3cmFwcGVyLWZvY3VzXSc6ICdmb2N1c2VkJ1xuICB9LFxuICBwcm92aWRlcnM6IFtEUk9QRE9XTl9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5cbmV4cG9ydCBjbGFzcyBEcm9wZG93bkNvbXBvbmVudCBleHRlbmRzIERyb3Bkb3duIHtcbiAgcHVibGljIG9uSXRlbUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50LCBvcHRpb246IFNlbGVjdEl0ZW0pOiB2b2lkIHtcbiAgICBpZiAoIW9wdGlvblsnZGlzYWJsZWQnXSkge1xuICAgICAgc3VwZXIub25JdGVtQ2xpY2soZXZlbnQsIG9wdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3RJdGVtKGV2ZW50OiBNb3VzZUV2ZW50LCBvcHRpb246IFNlbGVjdEl0ZW0pOiB2b2lkIHtcbiAgICBpZiAoIW9wdGlvblsnZGlzYWJsZWQnXSkge1xuICAgICAgc3VwZXIuc2VsZWN0SXRlbShldmVudCwgb3B0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9XG59XG4iXX0=