/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, forwardRef, ChangeDetectorRef, Input, ElementRef, Renderer2, IterableDiffers, Output, EventEmitter, ViewChild, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Observable } from 'rxjs/Observable';
import { AutoComplete as PrimeAutoComplete } from "primeng/components/autocomplete/autocomplete";
import { KalturaBrowserUtils, BrowserNames } from '@kaltura-ng/kaltura-ui';
import { ObjectUtils } from 'primeng/components/utils/objectutils';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
/**
 * @record
 */
export function SuggestionsProviderData() { }
if (false) {
    /** @type {?} */
    SuggestionsProviderData.prototype.suggestions;
    /** @type {?} */
    SuggestionsProviderData.prototype.isLoading;
    /** @type {?|undefined} */
    SuggestionsProviderData.prototype.errorMessage;
}
/* tslint:disable */
/** @type {?} */
export const KALTURA_AUTOCOMPLETE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AutoComplete),
    multi: true
};
/* tslint:enable */
// [kmcng] upon upgrade: compare implemented interfaces in the original component (no need to include ControlValueAccessor)
export class AutoComplete extends PrimeAutoComplete {
    /**
     * Consume the arguments needed to construct 'AutoComplete' and pass them to self (the 'AutoComplete' constructor).
     *
     * This is a workaround since according to NG2 documentation the parent constructor should be called even if
     * this component doesn't need a constructor.
     * @param {?} el
     * @param {?} renderer
     * @param {?} cd
     * @param {?} differs
     */
    constructor(el, renderer, cd, differs) {
        super(el, renderer, cd, differs);
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.differs = differs;
        this._suggestionsProvider$ = null;
        this._loading = false;
        this._showNoItems = false;
        this._errorMessage = '';
        this._allowMultiple = false;
        this._placeholder = '';
        this.ObjectUtils = ObjectUtils;
        this.overlayHovered = false;
        this.limitToSuggestions = true;
        this.suggestionSelectableField = '';
        this.suggestionItemField = '';
        this.tooltipResolver = null;
        this.classField = null;
        this.suggestionLabelField = '';
        this.addOnPaste = true;
        this.itemClick = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get multiple() {
        // always return true to affect component ui of selected item.
        // internally you should use _allowMultiple
        return true;
    }
    /**
     * @return {?}
     */
    get suggestions() {
        return this._suggestions;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onPaste(event) {
        if (!this.addOnPaste) {
            return;
        }
        /** @type {?} */
        const content = event.clipboardData.getData('text/plain');
        if (content && content.indexOf(',') !== -1) {
            event.preventDefault();
            content.split(',')
                .map(item => item.trim())
                .forEach(tag => this._addValueFromInput(tag));
            if (!this.overlayVisible) {
                // primng fix: if the panel is not visible (!overlayVisible) and we currently leaving the input field clear input content
                this._clearInputValue();
            }
            this.onModelTouched();
        }
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set suggestions(val) {
        this._suggestions = val;
        if (this.panelEL && this.panelEL.nativeElement) {
            // primeng fix: primeng uses function to show 'noResults' message if exists or hide the suggested otherwise.
            // we removed this logic since it conflict with our improved logic
            if (this._suggestions && this._suggestions.length) {
                this.show();
                this.suggestionsUpdated = true;
                if (this.autoHighlight) {
                    this.highlightOption = this._suggestions[0];
                }
            }
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set placeholder(value) {
        // IE11 bug causing output event to fire upon input field blur event when there is a placeholder. Thus, we remove the placeholder attribute for IE11, single selection mode.
        // Additional details: https://connect.microsoft.com/IE/feedback/details/810538/ie-11-fires-input-event-on-focus
        /** @type {?} */
        const isIE11 = KalturaBrowserUtils.detectBrowser() === BrowserNames.IE11;
        this._placeholder = isIE11 && !this._allowMultiple ? '' : value;
    }
    /**
     * @return {?}
     */
    get placeholder() {
        return this._placeholder;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set multiple(value) {
        this._allowMultiple = value;
    }
    /**
     * @param {?} provider$
     * @return {?}
     */
    set suggestionsProvider(provider$) {
        if (this._suggestionsProvider$) {
            this._suggestionsProvider$.unsubscribe();
            this._suggestionsProvider$ = null;
        }
        if (provider$) {
            this._suggestionsProvider$ = provider$.subscribe(data => {
                /** @type {?} */
                const valueLengthValid = this.input && (this.input.value || '').trim().length >= this.minLength;
                if (!valueLengthValid) {
                    // primeng fix: if user use backspace to delete search text, should abort the last query.
                    return;
                }
                if (data.isLoading) {
                    this._loading = true;
                    this._showNoItems = false;
                    this.suggestions = [];
                    this._errorMessage = '';
                    this.suggestionsUpdated = true; // make sure the suggestions panel is aligned to the height of the component
                    this.show();
                }
                else {
                    if (data.suggestions && data.suggestions.length) {
                        this._loading = false;
                        this.suggestions = data.suggestions;
                    }
                    else {
                        this.suggestions = [];
                        if (this._loading = true) {
                            this._showNoItems = !data.errorMessage; // show no items notification only if result is valid
                            this._loading = false;
                            this.suggestionsUpdated = true; // make sure the suggestions panel is aligned to the height of the component
                            this.show();
                        }
                        if (data.errorMessage) {
                            this._errorMessage = data.errorMessage;
                            this.suggestionsUpdated = true; // make sure the suggestions panel is aligned to the height of the component
                            this.show();
                        }
                    }
                }
            });
        }
    }
    /**
     * @return {?}
     */
    getValue() {
        if (this._allowMultiple) {
            if (this.value instanceof Array) {
                return this.value;
            }
            else {
                return this.value ? [this.value] : [];
            }
        }
        else {
            if (this.value instanceof Array) {
                return this.value.length > 0 ? this.value[0] : null;
            }
            else {
                return this.value;
            }
        }
    }
    /**
     * @return {?}
     */
    clearValue() {
        this.value = null;
        this._clearInputValue();
    }
    /**
     * @return {?}
     */
    get searchText() {
        return this.input ? this.input.value : null;
    }
    /**
     * @private
     * @return {?}
     */
    get input() {
        // [kmcng] we override multi mode to always be multiple so the input should always huse the multiInputEl
        return this.multiInputEL.nativeElement;
    }
    /**
     *
     * @private
     * @param {?} item
     * returns {any|boolean}
     * private
     * @return {?}
     */
    _isItemSelected(item) {
        if (this.multiple) {
            return this.value && this.value instanceof Array && this.value.indexOf(item) !== -1;
        }
        else {
            return this.value && this.value === item;
        }
    }
    /**
     * add value provided by user if the following conditions are confirmed:
     * - input component is in focus and its' content length is valid.
     * - no suggestion is currently highlighted
     * returns { {status} } status 'added' if valid value, 'invalid' if cannot add the value or 'not relevant' if the request should be ignored
     * private
     * @private
     * @param {?=} value
     * @return {?}
     */
    _addValueFromInput(value = null) {
        /** @type {?} */
        const rawInputValue = (value || this.searchText || '').trim();
        // 1. if !`this.value` -> form is valid (assuming that we add value for the first time)
        // 2. if each value is string and there's no same value in the `this.value` array -> form is valid
        /** @type {?} */
        const isDuplicated = this.value && this.value.some(value => {
            return typeof value === 'string' && value.toLowerCase() === rawInputValue.toLowerCase();
        });
        if (isDuplicated) {
            return { status: 'duplicated' };
        }
        if (!this.limitToSuggestions && rawInputValue && !this.highlightOption && !this.overlayHovered && this.focus) {
            if (rawInputValue.length >= 1 && !this._isItemSelected(rawInputValue)) {
                /** @type {?} */
                let newValue = this.onItemAdding ? this.onItemAdding.call(null, rawInputValue) : rawInputValue;
                if (newValue) {
                    if (typeof newValue === 'string' && this.field) {
                        console.warn(`The auto-complete component 'field' attribute is set to value '${this.field}' which indicates that the auto-complete value type is an object (did you forget to assign the 'onItemAdding' attribute to convert the user input which is of type type 'string' to a valid value?)`);
                    }
                    super.selectItem(newValue);
                }
                else {
                    if (typeof newValue === 'undefined' || newValue === null) {
                        console.warn(`the function provided by attribute 'onItemAdding' resulted with null value, abort adding user input to aut-complete value`);
                    }
                }
                this.hide();
                return { status: 'added' };
            }
            else {
                return { status: 'invalid' };
            }
        }
        else {
            return { status: 'not relevant' };
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onInputBlur(event) {
        this._addValueFromInput();
        if (!this.overlayVisible) {
            // primng fix: if the panel is not visible (!overlayVisible) and we currently leaving the input field clear input content
            this._clearInputValue();
        }
        super.onInputBlur(event);
    }
    /**
     * @return {?}
     */
    hide() {
        if (this.overlayVisible) {
            this.panelEL.nativeElement.scrollTop = 0; // primeng fix: scroll suggestions list to top (otherwise the scroll will be persist)
            this.highlightOption = null; // primeng fix: the last selection using keyboard is not being cleared when selecting using 'enter'
            // clear user notifications
            this._loading = false;
            this._showNoItems = false;
            this._errorMessage = null;
        }
        if (!this.focus) {
            // primng fix: if user not in the input (!focus) and we currently closing the visible panel - clear input content (relevant only for components whose 'limitToSuggestions' property is set to true
            this._clearInputValue();
        }
        super.hide();
    }
    /**
     * @private
     * @return {?}
     */
    _clearInputValue() {
        if (this.input && this.input.value) {
            this.input.value = ''; // clear existing value
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onInput($event) {
        if (!this._allowMultiple) {
            this.value = null;
        }
        // primng fix: hide panel once the value length is less the minLength, primeng handles only situation where input value length == 0
        if (this.input.value.length < this.minLength) {
            this.hide();
        }
        super.onInput($event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeydown(event) {
        /** @type {?} */
        let preventKeydown = false;
        if ((event.which === 9 || event.which === 13 || event.key === ',')) {
            /** @type {?} */
            const status = this._addValueFromInput().status;
            if (status !== 'not relevant') {
                preventKeydown = true;
                if (status === 'duplicated') {
                    if (this.overlayVisible) {
                        this.hide();
                    }
                    this._clearInputValue();
                }
            }
        }
        if (!preventKeydown && this.overlayVisible) {
            switch (event.which) {
                case 9: //tab
                    // primeng fix: pressing 'tab' move the focus from the component but doesn't hide the suggestions.
                    this.hide();
                    break;
                case 13: //enter
                    //enter
                    // prevent selecting of disabled item using keyboard (the mouse selection is handled separately)
                    /** @type {?} */
                    const highlightItemDisabled = this.highlightOption && this.suggestionSelectableField ?
                        (typeof this.highlightOption[this.suggestionSelectableField] !== undefined && !this.highlightOption[this.suggestionSelectableField])
                        : false;
                    if (highlightItemDisabled) {
                        preventKeydown = true;
                    }
                    break;
            }
        }
        if (!preventKeydown) {
            super.onKeydown(event);
        }
        else {
            event.preventDefault();
            event.stopPropagation();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._suggestionsProvider$) {
            this._suggestionsProvider$.unsubscribe();
            this._suggestionsProvider$ = null;
        }
    }
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    onUserSelectItem(event, item) {
        if (!this._canSelectSuggestion(item)) {
            // prevent selection of disabled suggestions.
            event.stopPropagation();
            event.preventDefault();
            this.input.focus(); // move the focus back to the input box otherwise the compmonent will stop working
            return;
        }
        this.selectItem(item);
    }
    /**
     * @param {?} suggestion
     * @return {?}
     */
    _getSuggestionText(suggestion) {
        /** @type {?} */
        let result = suggestion;
        if (suggestion) {
            if (this.suggestionLabelField) {
                result = suggestion[this.suggestionLabelField];
            }
            else if (this.suggestionItemField && this.field) {
                result = suggestion[this.suggestionItemField];
                result = result ? result[this.field] : '';
            }
            else if (this.suggestionItemField) {
                result = suggestion[this.suggestionItemField];
            }
            else if (this.field) {
                result = suggestion[this.field];
            }
        }
        return result;
    }
    /**
     * @private
     * @param {?} item
     * @return {?}
     */
    _canSelectSuggestion(item) {
        if (this.suggestionSelectableField) {
            if (typeof item[this.suggestionSelectableField] !== undefined && !item[this.suggestionSelectableField]) {
                return false;
            }
        }
        return true;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    selectItem(item) {
        this.highlightOption = null; // primeng fix:  the last selected item when using keyboard is not being removed and will be used later to do a random selection
        if (this._canSelectSuggestion(item)) {
            /** @type {?} */
            let selectedItemValue = item;
            if (this.suggestionItemField) {
                selectedItemValue = item[this.suggestionItemField];
            }
            if (selectedItemValue === null || typeof selectedItemValue === 'undefined') {
                console.warn("[kaltura] -> trying to select a value that is either null or undefined. action ignored"); // keep warning
            }
            else {
                super.selectItem(selectedItemValue);
            }
        }
    }
    /**
     * @return {?}
     */
    focusInput() {
        setTimeout(() => {
            if (this.input && this.input.focus && !this.input.disabled) {
                this.input.focus();
            }
        }, 0);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    onItemClick(item) {
        this.itemClick.emit(item);
    }
}
AutoComplete.decorators = [
    { type: Component, args: [{
                selector: 'kAutoComplete',
                /* tslint:disable */
                // [kmcng] upon upgrade: sync with original component
                styles: [`:host /deep/ .ui-autocomplete-token-label{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:14px}@media screen and (max-width:991px){:host /deep/ .ui-autocomplete-token-label{max-width:270px}}@media screen and (min-width:992px){:host /deep/ .ui-autocomplete-token-label{max-width:270px}}@media screen and (min-width:1280px){:host /deep/ .ui-autocomplete-token-label{max-width:500px}}@media screen and (min-width:1600px){:host /deep/ .ui-autocomplete-token-label{max-width:800px}}:host /deep/ .kHighlightedText{text-decoration:underline}`],
                template: `<span [ngClass]="{'ui-autocomplete ui-widget kOverrideFAIcons':true,'ui-autocomplete-dd':dropdown,'ui-autocomplete-multiple':multiple}"
      [ngStyle]="style" [class]="styleClass">
            <input *ngIf="!multiple" #in [attr.type]="type" [attr.id]="inputId" [ngStyle]="inputStyle"
                   [class]="inputStyleClass" autocomplete="off" [attr.required]="required"
                   [ngClass]="'ui-inputtext ui-widget ui-state-default ui-corner-all ui-autocomplete-input'"
                   [value]="inputFieldValue ? (field ? ObjectUtils.resolveFieldData(inputFieldValue, field) || inputFieldValue : value) : null"
                   (click)="onInputClick($event)" (input)="onInput($event)" (keydown)="onKeydown($event)"
                   (keyup)="onKeyup($event)" (focus)="onInputFocus($event)" (blur)="onInputBlur($event)"
                   (change)="onInputChange($event)"
                   [attr.placeholder]="_placeholder" [attr.size]="size" [attr.maxlength]="maxlength"
                   [attr.tabindex]="tabindex" [readonly]="readonly" [disabled]="disabled"
            ><ul *ngIf="multiple" #multiContainer
                 class="ui-autocomplete-multiple-container ui-widget ui-inputtext ui-state-default ui-corner-all"
                 [ngClass]="{'ui-state-disabled':disabled,'ui-state-focus':focus}" (click)="multiIn.focus()">
                <li #token *ngFor="let val of value" [class]="'ui-autocomplete-token ui-state-highlight ui-corner-all ' + (classField && val ? val[classField] : '')"
                    [kTooltip]="val" [tooltipResolver]="tooltipResolver">
                    <span class="ui-autocomplete-token-icon pi pi-fw pi-times" (click)="removeItem(token)"
                          *ngIf="!disabled"></span>
                    <span *ngIf="!selectedItemTemplate" class="ui-autocomplete-token-label" (click)="onItemClick(val)">{{field ? ObjectUtils.resolveFieldData(val, field): val}}</span>
                    <ng-container *ngTemplateOutlet="selectedItemTemplate; context: {$implicit: val}"></ng-container>
                </li>
                <li class="ui-autocomplete-input-token">
                    <input #multiIn [attr.type]="type" [attr.id]="inputId" [disabled]="disabled"
                           [attr.placeholder]="(value&&value.length ? null : _placeholder)" [attr.tabindex]="tabindex"
                           (input)="onInput($event)" (click)="onInputClick($event)"
                           (keydown)="onKeydown($event)" [readonly]="readonly" (keyup)="onKeyup($event)"
                           (focus)="onInputFocus($event)" (blur)="onInputBlur($event)" (change)="onInputChange($event)"
                           autocomplete="off" [ngStyle]="inputStyle" [class]="inputStyleClass">
                </li>
            </ul
            ><i *ngIf="loading" class="ui-autocomplete-loader pi pi-spinner pi-spin"></i><button #ddBtn type="button"
                                                                                                 pButton
                                                                                                 icon="pi pi-fw pi-caret-down"
                                                                                                 class="ui-autocomplete-dropdown"
                                                                                                 [disabled]="disabled"
                                                                                                 (click)="handleDropdownClick($event)"
                                                                                                 *ngIf="dropdown"></button>
            <div #panel class="ui-autocomplete-panel ui-widget-content ui-corner-all ui-shadow"
                 [style.display]="overlayVisible ? 'block' : 'none'" [style.width]="appendTo ? 'auto' : '100%'"
                 [style.max-height]="scrollHeight" [@overlayAnimation]="'visible'" (@overlayAnimation.start)="onOverlayAnimationStart($event)" (@overlayAnimation.done)="onOverlayAnimationDone($event)"
                 (mouseenter)="overlayHovered=true" (mouseleave)="overlayHovered=false">
                <ul
                  class="ui-autocomplete-items ui-autocomplete-list ui-widget-content ui-widget ui-corner-all ui-helper-reset"
                  *ngIf="overlayVisible">
                <li *ngIf="_loading" class="ui-autocomplete-notification-item">
                Searching...
            </li>
            <li *ngIf="_showNoItems" class="ui-autocomplete-notification-item">
                No Items Found...
            </li>
            <li *ngIf="_errorMessage" class="ui-autocomplete-notification-item">
                {{ _errorMessage }}
            </li>
                    <li *ngFor="let option of suggestions; let idx = index"
                        [ngClass]="{'ui-autocomplete-list-item ui-corner-all':true,'ui-state-highlight':(highlightOption==option)}"
                    [class.kIsItemDisabled]="option | kIsSuggestionDisabled : suggestionSelectableField"
                        (mouseenter)="highlightOption=option" (mouseleave)="highlightOption=null"
                        (click)="selectItem(option)">
                        <span *ngIf="!itemTemplate"
                              [innerHTML]="_getSuggestionText(option) | kHighlight : searchText"></span>
                        <ng-container
                          *ngTemplateOutlet="itemTemplate; context: {$implicit: option, index: idx}"></ng-container>
                    </li>
                    <li *ngIf="noResults && emptyMessage" class="ui-autocomplete-list-item ui-corner-all">{{emptyMessage}}</li>
                </ul>
            </div>
        </span>
`,
                providers: [KALTURA_AUTOCOMPLETE_VALUE_ACCESSOR],
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
                        transition('void => visible', animate('225ms ease-out')),
                        transition('visible => void', animate('195ms ease-in'))
                    ])
                ],
                host: {
                    '[class.ui-inputwrapper-filled]': 'filled',
                    '[class.ui-inputwrapper-focus]': 'focus'
                },
            },] },
];
/** @nocollapse */
AutoComplete.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef },
    { type: IterableDiffers }
];
AutoComplete.propDecorators = {
    onItemAdding: [{ type: Input }],
    limitToSuggestions: [{ type: Input }],
    suggestionSelectableField: [{ type: Input }],
    suggestionItemField: [{ type: Input }],
    tooltipResolver: [{ type: Input }],
    classField: [{ type: Input }],
    suggestionLabelField: [{ type: Input }],
    addOnPaste: [{ type: Input }],
    suggestions: [{ type: Input }],
    itemClick: [{ type: Output }],
    panelEL: [{ type: ViewChild, args: ['panel',] }],
    onPaste: [{ type: HostListener, args: ['paste', ['$event'],] }],
    placeholder: [{ type: Input }],
    multiple: [{ type: Input }],
    suggestionsProvider: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    AutoComplete.prototype._suggestionsProvider$;
    /** @type {?} */
    AutoComplete.prototype._loading;
    /** @type {?} */
    AutoComplete.prototype._showNoItems;
    /** @type {?} */
    AutoComplete.prototype._errorMessage;
    /**
     * @type {?}
     * @private
     */
    AutoComplete.prototype._allowMultiple;
    /** @type {?} */
    AutoComplete.prototype._placeholder;
    /** @type {?} */
    AutoComplete.prototype.ObjectUtils;
    /** @type {?} */
    AutoComplete.prototype.overlayHovered;
    /** @type {?} */
    AutoComplete.prototype.onItemAdding;
    /** @type {?} */
    AutoComplete.prototype.limitToSuggestions;
    /** @type {?} */
    AutoComplete.prototype.suggestionSelectableField;
    /** @type {?} */
    AutoComplete.prototype.suggestionItemField;
    /** @type {?} */
    AutoComplete.prototype.tooltipResolver;
    /** @type {?} */
    AutoComplete.prototype.classField;
    /** @type {?} */
    AutoComplete.prototype.suggestionLabelField;
    /** @type {?} */
    AutoComplete.prototype.addOnPaste;
    /** @type {?} */
    AutoComplete.prototype.itemClick;
    /** @type {?} */
    AutoComplete.prototype.panelEL;
    /** @type {?} */
    AutoComplete.prototype.el;
    /** @type {?} */
    AutoComplete.prototype.renderer;
    /** @type {?} */
    AutoComplete.prototype.cd;
    /** @type {?} */
    AutoComplete.prototype.differs;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by1jb21wbGV0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2FsdHVyYS1uZy9rYWx0dXJhLXByaW1lbmctdWkvIiwic291cmNlcyI6WyJsaWIvYXV0by1jb21wbGV0ZS9hdXRvLWNvbXBsZXRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxVQUFVLEVBQ1YsaUJBQWlCLEVBRWpCLEtBQUssRUFDTCxVQUFVLEVBRVYsU0FBUyxFQUNULGVBQWUsRUFDZixNQUFNLEVBQ04sWUFBWSxFQUNaLFNBQVMsRUFDVCxZQUFZLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQWdCLE1BQU0scUJBQXFCLENBQUM7QUFDMUYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxZQUFZLElBQUksaUJBQWlCLEVBQStCLE1BQU0sOENBQThDLENBQUM7QUFDOUgsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFlBQVksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTNFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNuRSxPQUFPLEVBQUMsaUJBQWlCLEVBQXVCLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFJdkUsNkNBSUM7OztJQUhHLDhDQUFvQjs7SUFDcEIsNENBQW9COztJQUNwQiwrQ0FBdUI7Ozs7QUFJM0IsTUFBTSxPQUFPLG1DQUFtQyxHQUFRO0lBQ3BELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUM7SUFDM0MsS0FBSyxFQUFFLElBQUk7Q0FDZDs7QUFtR0QsMkhBQTJIO0FBQzNILE1BQU0sT0FBTyxZQUFhLFNBQVEsaUJBQWlCOzs7Ozs7Ozs7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LHVDQUFpRTs7SUFFakUsa0NBQzBCOztJQUUxQiw0Q0FDbUM7O0lBRW5DLGtDQUNrQjs7SUFhbEIsaUNBQ29DOztJQUVwQywrQkFBd0M7O0lBa1A1QiwwQkFBcUI7O0lBQUUsZ0NBQTBCOztJQUFFLDBCQUE0Qjs7SUFBRSwrQkFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEFmdGVyVmlld0luaXQsXG4gIGZvcndhcmRSZWYsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBBZnRlclZpZXdDaGVja2VkLFxuICBJbnB1dCxcbiAgRWxlbWVudFJlZixcbiAgT25EZXN0cm95LFxuICBSZW5kZXJlcjIsXG4gIEl0ZXJhYmxlRGlmZmVycyxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIFZpZXdDaGlsZCxcbiAgSG9zdExpc3RlbmVyLCBBZnRlckNvbnRlbnRJbml0LCBEb0NoZWNrXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHt0cmlnZ2VyLHN0YXRlLHN0eWxlLHRyYW5zaXRpb24sYW5pbWF0ZSxBbmltYXRpb25FdmVudH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IElTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBBdXRvQ29tcGxldGUgYXMgUHJpbWVBdXRvQ29tcGxldGUsIEFVVE9DT01QTEVURV9WQUxVRV9BQ0NFU1NPUiB9IGZyb20gXCJwcmltZW5nL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZVwiO1xuaW1wb3J0IHsgS2FsdHVyYUJyb3dzZXJVdGlscywgQnJvd3Nlck5hbWVzIH0gZnJvbSAnQGthbHR1cmEtbmcva2FsdHVyYS11aSc7XG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSBcInByaW1lbmcvY29tcG9uZW50cy9kb20vZG9taGFuZGxlclwiO1xuaW1wb3J0IHsgT2JqZWN0VXRpbHMgfSBmcm9tICdwcmltZW5nL2NvbXBvbmVudHMvdXRpbHMvb2JqZWN0dXRpbHMnO1xuaW1wb3J0IHtOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuLy8gW2ttY25nXSB1cG9uIHVwZ3JhZGU6IEJlIHBhdGllbnQgYW5kIGJyaW5nIGEgYmlnIGN1cCBvZiBjb2ZmZWUuLi4uIGdvb2QgbHVjayFcblxuZXhwb3J0IGludGVyZmFjZSBTdWdnZXN0aW9uc1Byb3ZpZGVyRGF0YXtcbiAgICBzdWdnZXN0aW9ucyA6IGFueVtdO1xuICAgIGlzTG9hZGluZyA6IGJvb2xlYW47XG4gICAgZXJyb3JNZXNzYWdlPyA6IHN0cmluZztcbn1cblxuLyogdHNsaW50OmRpc2FibGUgKi9cbmV4cG9ydCBjb25zdCBLQUxUVVJBX0FVVE9DT01QTEVURV9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEF1dG9Db21wbGV0ZSksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbi8qIHRzbGludDplbmFibGUgKi9cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdrQXV0b0NvbXBsZXRlJyxcblxuICAgIC8qIHRzbGludDpkaXNhYmxlICovXG4gICAgLy8gW2ttY25nXSB1cG9uIHVwZ3JhZGU6IHN5bmMgd2l0aCBvcmlnaW5hbCBjb21wb25lbnRcbiAgICBzdHlsZXM6IFtgOmhvc3QgL2RlZXAvIC51aS1hdXRvY29tcGxldGUtdG9rZW4tbGFiZWx7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2ZvbnQtc2l6ZToxNHB4fUBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6OTkxcHgpezpob3N0IC9kZWVwLyAudWktYXV0b2NvbXBsZXRlLXRva2VuLWxhYmVse21heC13aWR0aDoyNzBweH19QG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDo5OTJweCl7Omhvc3QgL2RlZXAvIC51aS1hdXRvY29tcGxldGUtdG9rZW4tbGFiZWx7bWF4LXdpZHRoOjI3MHB4fX1AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOjEyODBweCl7Omhvc3QgL2RlZXAvIC51aS1hdXRvY29tcGxldGUtdG9rZW4tbGFiZWx7bWF4LXdpZHRoOjUwMHB4fX1AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOjE2MDBweCl7Omhvc3QgL2RlZXAvIC51aS1hdXRvY29tcGxldGUtdG9rZW4tbGFiZWx7bWF4LXdpZHRoOjgwMHB4fX06aG9zdCAvZGVlcC8gLmtIaWdobGlnaHRlZFRleHR7dGV4dC1kZWNvcmF0aW9uOnVuZGVybGluZX1gXSxcbiAgICB0ZW1wbGF0ZTogYDxzcGFuIFtuZ0NsYXNzXT1cInsndWktYXV0b2NvbXBsZXRlIHVpLXdpZGdldCBrT3ZlcnJpZGVGQUljb25zJzp0cnVlLCd1aS1hdXRvY29tcGxldGUtZGQnOmRyb3Bkb3duLCd1aS1hdXRvY29tcGxldGUtbXVsdGlwbGUnOm11bHRpcGxlfVwiXG4gICAgICBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCI+XG4gICAgICAgICAgICA8aW5wdXQgKm5nSWY9XCIhbXVsdGlwbGVcIiAjaW4gW2F0dHIudHlwZV09XCJ0eXBlXCIgW2F0dHIuaWRdPVwiaW5wdXRJZFwiIFtuZ1N0eWxlXT1cImlucHV0U3R5bGVcIlxuICAgICAgICAgICAgICAgICAgIFtjbGFzc109XCJpbnB1dFN0eWxlQ2xhc3NcIiBhdXRvY29tcGxldGU9XCJvZmZcIiBbYXR0ci5yZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiJ3VpLWlucHV0dGV4dCB1aS13aWRnZXQgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsIHVpLWF1dG9jb21wbGV0ZS1pbnB1dCdcIlxuICAgICAgICAgICAgICAgICAgIFt2YWx1ZV09XCJpbnB1dEZpZWxkVmFsdWUgPyAoZmllbGQgPyBPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKGlucHV0RmllbGRWYWx1ZSwgZmllbGQpIHx8IGlucHV0RmllbGRWYWx1ZSA6IHZhbHVlKSA6IG51bGxcIlxuICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbklucHV0Q2xpY2soJGV2ZW50KVwiIChpbnB1dCk9XCJvbklucHV0KCRldmVudClcIiAoa2V5ZG93bik9XCJvbktleWRvd24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgKGtleXVwKT1cIm9uS2V5dXAoJGV2ZW50KVwiIChmb2N1cyk9XCJvbklucHV0Rm9jdXMoJGV2ZW50KVwiIChibHVyKT1cIm9uSW5wdXRCbHVyKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgIChjaGFuZ2UpPVwib25JbnB1dENoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICBbYXR0ci5wbGFjZWhvbGRlcl09XCJfcGxhY2Vob2xkZXJcIiBbYXR0ci5zaXplXT1cInNpemVcIiBbYXR0ci5tYXhsZW5ndGhdPVwibWF4bGVuZ3RoXCJcbiAgICAgICAgICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCJ0YWJpbmRleFwiIFtyZWFkb25seV09XCJyZWFkb25seVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICA+PHVsICpuZ0lmPVwibXVsdGlwbGVcIiAjbXVsdGlDb250YWluZXJcbiAgICAgICAgICAgICAgICAgY2xhc3M9XCJ1aS1hdXRvY29tcGxldGUtbXVsdGlwbGUtY29udGFpbmVyIHVpLXdpZGdldCB1aS1pbnB1dHRleHQgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsXCJcbiAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1kaXNhYmxlZCc6ZGlzYWJsZWQsJ3VpLXN0YXRlLWZvY3VzJzpmb2N1c31cIiAoY2xpY2spPVwibXVsdGlJbi5mb2N1cygpXCI+XG4gICAgICAgICAgICAgICAgPGxpICN0b2tlbiAqbmdGb3I9XCJsZXQgdmFsIG9mIHZhbHVlXCIgW2NsYXNzXT1cIid1aS1hdXRvY29tcGxldGUtdG9rZW4gdWktc3RhdGUtaGlnaGxpZ2h0IHVpLWNvcm5lci1hbGwgJyArIChjbGFzc0ZpZWxkICYmIHZhbCA/IHZhbFtjbGFzc0ZpZWxkXSA6ICcnKVwiXG4gICAgICAgICAgICAgICAgICAgIFtrVG9vbHRpcF09XCJ2YWxcIiBbdG9vbHRpcFJlc29sdmVyXT1cInRvb2x0aXBSZXNvbHZlclwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLWF1dG9jb21wbGV0ZS10b2tlbi1pY29uIHBpIHBpLWZ3IHBpLXRpbWVzXCIgKGNsaWNrKT1cInJlbW92ZUl0ZW0odG9rZW4pXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCIhZGlzYWJsZWRcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIXNlbGVjdGVkSXRlbVRlbXBsYXRlXCIgY2xhc3M9XCJ1aS1hdXRvY29tcGxldGUtdG9rZW4tbGFiZWxcIiAoY2xpY2spPVwib25JdGVtQ2xpY2sodmFsKVwiPnt7ZmllbGQgPyBPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKHZhbCwgZmllbGQpOiB2YWx9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInNlbGVjdGVkSXRlbVRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiB2YWx9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJ1aS1hdXRvY29tcGxldGUtaW5wdXQtdG9rZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0ICNtdWx0aUluIFthdHRyLnR5cGVdPVwidHlwZVwiIFthdHRyLmlkXT1cImlucHV0SWRcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIucGxhY2Vob2xkZXJdPVwiKHZhbHVlJiZ2YWx1ZS5sZW5ndGggPyBudWxsIDogX3BsYWNlaG9sZGVyKVwiIFthdHRyLnRhYmluZGV4XT1cInRhYmluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIChpbnB1dCk9XCJvbklucHV0KCRldmVudClcIiAoY2xpY2spPVwib25JbnB1dENsaWNrKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25LZXlkb3duKCRldmVudClcIiBbcmVhZG9ubHldPVwicmVhZG9ubHlcIiAoa2V5dXApPVwib25LZXl1cCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIChmb2N1cyk9XCJvbklucHV0Rm9jdXMoJGV2ZW50KVwiIChibHVyKT1cIm9uSW5wdXRCbHVyKCRldmVudClcIiAoY2hhbmdlKT1cIm9uSW5wdXRDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvY29tcGxldGU9XCJvZmZcIiBbbmdTdHlsZV09XCJpbnB1dFN0eWxlXCIgW2NsYXNzXT1cImlucHV0U3R5bGVDbGFzc1wiPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8L3VsXG4gICAgICAgICAgICA+PGkgKm5nSWY9XCJsb2FkaW5nXCIgY2xhc3M9XCJ1aS1hdXRvY29tcGxldGUtbG9hZGVyIHBpIHBpLXNwaW5uZXIgcGktc3BpblwiPjwvaT48YnV0dG9uICNkZEJ0biB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbj1cInBpIHBpLWZ3IHBpLWNhcmV0LWRvd25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwidWktYXV0b2NvbXBsZXRlLWRyb3Bkb3duXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJoYW5kbGVEcm9wZG93bkNsaWNrKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiZHJvcGRvd25cIj48L2J1dHRvbj5cbiAgICAgICAgICAgIDxkaXYgI3BhbmVsIGNsYXNzPVwidWktYXV0b2NvbXBsZXRlLXBhbmVsIHVpLXdpZGdldC1jb250ZW50IHVpLWNvcm5lci1hbGwgdWktc2hhZG93XCJcbiAgICAgICAgICAgICAgICAgW3N0eWxlLmRpc3BsYXldPVwib3ZlcmxheVZpc2libGUgPyAnYmxvY2snIDogJ25vbmUnXCIgW3N0eWxlLndpZHRoXT1cImFwcGVuZFRvID8gJ2F1dG8nIDogJzEwMCUnXCJcbiAgICAgICAgICAgICAgICAgW3N0eWxlLm1heC1oZWlnaHRdPVwic2Nyb2xsSGVpZ2h0XCIgW0BvdmVybGF5QW5pbWF0aW9uXT1cIid2aXNpYmxlJ1wiIChAb3ZlcmxheUFuaW1hdGlvbi5zdGFydCk9XCJvbk92ZXJsYXlBbmltYXRpb25TdGFydCgkZXZlbnQpXCIgKEBvdmVybGF5QW5pbWF0aW9uLmRvbmUpPVwib25PdmVybGF5QW5pbWF0aW9uRG9uZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgKG1vdXNlZW50ZXIpPVwib3ZlcmxheUhvdmVyZWQ9dHJ1ZVwiIChtb3VzZWxlYXZlKT1cIm92ZXJsYXlIb3ZlcmVkPWZhbHNlXCI+XG4gICAgICAgICAgICAgICAgPHVsXG4gICAgICAgICAgICAgICAgICBjbGFzcz1cInVpLWF1dG9jb21wbGV0ZS1pdGVtcyB1aS1hdXRvY29tcGxldGUtbGlzdCB1aS13aWRnZXQtY29udGVudCB1aS13aWRnZXQgdWktY29ybmVyLWFsbCB1aS1oZWxwZXItcmVzZXRcIlxuICAgICAgICAgICAgICAgICAgKm5nSWY9XCJvdmVybGF5VmlzaWJsZVwiPlxuICAgICAgICAgICAgICAgIDxsaSAqbmdJZj1cIl9sb2FkaW5nXCIgY2xhc3M9XCJ1aS1hdXRvY29tcGxldGUtbm90aWZpY2F0aW9uLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICBTZWFyY2hpbmcuLi5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8bGkgKm5nSWY9XCJfc2hvd05vSXRlbXNcIiBjbGFzcz1cInVpLWF1dG9jb21wbGV0ZS1ub3RpZmljYXRpb24taXRlbVwiPlxuICAgICAgICAgICAgICAgIE5vIEl0ZW1zIEZvdW5kLi4uXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPGxpICpuZ0lmPVwiX2Vycm9yTWVzc2FnZVwiIGNsYXNzPVwidWktYXV0b2NvbXBsZXRlLW5vdGlmaWNhdGlvbi1pdGVtXCI+XG4gICAgICAgICAgICAgICAge3sgX2Vycm9yTWVzc2FnZSB9fVxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBvcHRpb24gb2Ygc3VnZ2VzdGlvbnM7IGxldCBpZHggPSBpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLWF1dG9jb21wbGV0ZS1saXN0LWl0ZW0gdWktY29ybmVyLWFsbCc6dHJ1ZSwndWktc3RhdGUtaGlnaGxpZ2h0JzooaGlnaGxpZ2h0T3B0aW9uPT1vcHRpb24pfVwiXG4gICAgICAgICAgICAgICAgICAgIFtjbGFzcy5rSXNJdGVtRGlzYWJsZWRdPVwib3B0aW9uIHwga0lzU3VnZ2VzdGlvbkRpc2FibGVkIDogc3VnZ2VzdGlvblNlbGVjdGFibGVGaWVsZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAobW91c2VlbnRlcik9XCJoaWdobGlnaHRPcHRpb249b3B0aW9uXCIgKG1vdXNlbGVhdmUpPVwiaGlnaGxpZ2h0T3B0aW9uPW51bGxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdEl0ZW0ob3B0aW9uKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCIhaXRlbVRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpbm5lckhUTUxdPVwiX2dldFN1Z2dlc3Rpb25UZXh0KG9wdGlvbikgfCBrSGlnaGxpZ2h0IDogc2VhcmNoVGV4dFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpdGVtVGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IG9wdGlvbiwgaW5kZXg6IGlkeH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpICpuZ0lmPVwibm9SZXN1bHRzICYmIGVtcHR5TWVzc2FnZVwiIGNsYXNzPVwidWktYXV0b2NvbXBsZXRlLWxpc3QtaXRlbSB1aS1jb3JuZXItYWxsXCI+e3tlbXB0eU1lc3NhZ2V9fTwvbGk+XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3NwYW4+XG5gLFxuICAgIHByb3ZpZGVyczogW0tBTFRVUkFfQVVUT0NPTVBMRVRFX1ZBTFVFX0FDQ0VTU09SXSxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICB0cmlnZ2VyKCdvdmVybGF5QW5pbWF0aW9uJywgW1xuICAgICAgICBzdGF0ZSgndm9pZCcsIHN0eWxlKHtcbiAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDUlKScsXG4gICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICB9KSksXG4gICAgICAgIHN0YXRlKCd2aXNpYmxlJywgc3R5bGUoe1xuICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMCknLFxuICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgfSkpLFxuICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IHZpc2libGUnLCBhbmltYXRlKCcyMjVtcyBlYXNlLW91dCcpKSxcbiAgICAgICAgdHJhbnNpdGlvbigndmlzaWJsZSA9PiB2b2lkJywgYW5pbWF0ZSgnMTk1bXMgZWFzZS1pbicpKVxuICAgICAgXSlcbiAgICBdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy51aS1pbnB1dHdyYXBwZXItZmlsbGVkXSc6ICdmaWxsZWQnLFxuICAgICAgICAnW2NsYXNzLnVpLWlucHV0d3JhcHBlci1mb2N1c10nOiAnZm9jdXMnXG4gICAgfSxcbiAgICAvKiB0c2xpbnQ6ZW5hYmxlICovXG59KVxuLy8gW2ttY25nXSB1cG9uIHVwZ3JhZGU6IGNvbXBhcmUgaW1wbGVtZW50ZWQgaW50ZXJmYWNlcyBpbiB0aGUgb3JpZ2luYWwgY29tcG9uZW50IChubyBuZWVkIHRvIGluY2x1ZGUgQ29udHJvbFZhbHVlQWNjZXNzb3IpXG5leHBvcnQgY2xhc3MgQXV0b0NvbXBsZXRlIGV4dGVuZHMgUHJpbWVBdXRvQ29tcGxldGUgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIEFmdGVyVmlld0NoZWNrZWQsIEFmdGVyQ29udGVudEluaXQsRG9DaGVjayAge1xuICAgIHByaXZhdGUgX3N1Z2dlc3Rpb25zUHJvdmlkZXIkIDogSVN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgcHVibGljIF9sb2FkaW5nID0gZmFsc2U7XG4gICAgcHVibGljIF9zaG93Tm9JdGVtcyA9IGZhbHNlO1xuICAgIHB1YmxpYyBfZXJyb3JNZXNzYWdlID0gJyc7XG4gICAgcHJpdmF0ZSBfYWxsb3dNdWx0aXBsZSA9IGZhbHNlO1xuICAgIHB1YmxpYyBfcGxhY2Vob2xkZXIgPSAnJztcbiAgICBwdWJsaWMgT2JqZWN0VXRpbHMgPSBPYmplY3RVdGlscztcbiAgICBwdWJsaWMgb3ZlcmxheUhvdmVyZWQgPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgb25JdGVtQWRkaW5nIDogKHZhbHVlIDogYW55KSA9PiBhbnk7XG5cbiAgICBASW5wdXQoKVxuICAgIGxpbWl0VG9TdWdnZXN0aW9ucyA6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KClcbiAgICBzdWdnZXN0aW9uU2VsZWN0YWJsZUZpZWxkIDogc3RyaW5nID0gJyc7XG5cbiAgICBASW5wdXQoKVxuICAgIHN1Z2dlc3Rpb25JdGVtRmllbGQgOiBzdHJpbmcgPSAnJztcblxuICAgIEBJbnB1dCgpIHRvb2x0aXBSZXNvbHZlcjogc3RyaW5nIHwgKCh2YWw6IGFueSkgPT4gc3RyaW5nKSA9IG51bGw7XG5cbiAgICBASW5wdXQoKVxuICAgIGNsYXNzRmllbGQ6IHN0cmluZyA9IG51bGw7XG5cbiAgICBASW5wdXQoKVxuICAgIHN1Z2dlc3Rpb25MYWJlbEZpZWxkIDogc3RyaW5nID0gJyc7XG5cbiAgICBASW5wdXQoKVxuICAgIGFkZE9uUGFzdGUgPSB0cnVlO1xuXG4gICAgZ2V0IG11bHRpcGxlKCkgOiBib29sZWFuXG4gICAge1xuICAgICAgICAvLyBhbHdheXMgcmV0dXJuIHRydWUgdG8gYWZmZWN0IGNvbXBvbmVudCB1aSBvZiBzZWxlY3RlZCBpdGVtLlxuICAgICAgICAvLyBpbnRlcm5hbGx5IHlvdSBzaG91bGQgdXNlIF9hbGxvd011bHRpcGxlXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCBzdWdnZXN0aW9ucygpOiBhbnlbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdWdnZXN0aW9ucztcbiAgICB9XG5cbiAgICBAT3V0cHV0KClcbiAgICBpdGVtQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIEBWaWV3Q2hpbGQoJ3BhbmVsJykgcGFuZWxFTDogRWxlbWVudFJlZjtcblxuICAgIEBIb3N0TGlzdGVuZXIoJ3Bhc3RlJywgWyckZXZlbnQnXSkgb25QYXN0ZShldmVudDogQ2xpcGJvYXJkRXZlbnQpIHtcbiAgICAgIGlmICghdGhpcy5hZGRPblBhc3RlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29udGVudCA9IGV2ZW50LmNsaXBib2FyZERhdGEuZ2V0RGF0YSgndGV4dC9wbGFpbicpO1xuXG4gICAgICBpZiAoY29udGVudCAmJiBjb250ZW50LmluZGV4T2YoJywnKSAhPT0gLTEpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29udGVudC5zcGxpdCgnLCcpXG4gICAgICAgICAgLm1hcChpdGVtID0+IGl0ZW0udHJpbSgpKVxuICAgICAgICAgIC5mb3JFYWNoKHRhZyA9PiB0aGlzLl9hZGRWYWx1ZUZyb21JbnB1dCh0YWcpKTtcblxuICAgICAgICBpZiAoIXRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAvLyBwcmltbmcgZml4OiBpZiB0aGUgcGFuZWwgaXMgbm90IHZpc2libGUgKCFvdmVybGF5VmlzaWJsZSkgYW5kIHdlIGN1cnJlbnRseSBsZWF2aW5nIHRoZSBpbnB1dCBmaWVsZCBjbGVhciBpbnB1dCBjb250ZW50XG4gICAgICAgICAgdGhpcy5fY2xlYXJJbnB1dFZhbHVlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XG4gICAgICB9XG4gICAgfVxuXG5cbiAgICBzZXQgc3VnZ2VzdGlvbnModmFsOmFueVtdKSB7XG4gICAgICAgIHRoaXMuX3N1Z2dlc3Rpb25zID0gdmFsO1xuXG4gICAgICAgIGlmKHRoaXMucGFuZWxFTCAmJiB0aGlzLnBhbmVsRUwubmF0aXZlRWxlbWVudCkge1xuXG4gICAgICAgICAgICAvLyBwcmltZW5nIGZpeDogcHJpbWVuZyB1c2VzIGZ1bmN0aW9uIHRvIHNob3cgJ25vUmVzdWx0cycgbWVzc2FnZSBpZiBleGlzdHMgb3IgaGlkZSB0aGUgc3VnZ2VzdGVkIG90aGVyd2lzZS5cbiAgICAgICAgICAgIC8vIHdlIHJlbW92ZWQgdGhpcyBsb2dpYyBzaW5jZSBpdCBjb25mbGljdCB3aXRoIG91ciBpbXByb3ZlZCBsb2dpY1xuICAgICAgICAgICAgaWYodGhpcy5fc3VnZ2VzdGlvbnMgJiYgdGhpcy5fc3VnZ2VzdGlvbnMubGVuZ3RoKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN1Z2dlc3Rpb25zVXBkYXRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICBpZih0aGlzLmF1dG9IaWdobGlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRPcHRpb24gPSB0aGlzLl9zdWdnZXN0aW9uc1swXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoKSBzZXQgcGxhY2Vob2xkZXIodmFsdWUgOiBzdHJpbmcpXG4gICAge1xuICAgICAgICAvLyBJRTExIGJ1ZyBjYXVzaW5nIG91dHB1dCBldmVudCB0byBmaXJlIHVwb24gaW5wdXQgZmllbGQgYmx1ciBldmVudCB3aGVuIHRoZXJlIGlzIGEgcGxhY2Vob2xkZXIuIFRodXMsIHdlIHJlbW92ZSB0aGUgcGxhY2Vob2xkZXIgYXR0cmlidXRlIGZvciBJRTExLCBzaW5nbGUgc2VsZWN0aW9uIG1vZGUuXG4gICAgICAgIC8vIEFkZGl0aW9uYWwgZGV0YWlsczogaHR0cHM6Ly9jb25uZWN0Lm1pY3Jvc29mdC5jb20vSUUvZmVlZGJhY2svZGV0YWlscy84MTA1MzgvaWUtMTEtZmlyZXMtaW5wdXQtZXZlbnQtb24tZm9jdXNcbiAgICAgICAgY29uc3QgaXNJRTExID0gS2FsdHVyYUJyb3dzZXJVdGlscy5kZXRlY3RCcm93c2VyKCkgPT09IEJyb3dzZXJOYW1lcy5JRTExO1xuICAgICAgICB0aGlzLl9wbGFjZWhvbGRlciA9IGlzSUUxMSAmJiAhdGhpcy5fYWxsb3dNdWx0aXBsZSA/ICcnIDogdmFsdWU7XG4gICAgfVxuICAgIGdldCBwbGFjZWhvbGRlcigpOiBzdHJpbmd7XG4gICAgICAgIHJldHVybiB0aGlzLl9wbGFjZWhvbGRlcjtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBzZXQgbXVsdGlwbGUodmFsdWUgOiBib29sZWFuKVxuICAgIHtcbiAgICAgICAgdGhpcy5fYWxsb3dNdWx0aXBsZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHN1Z2dlc3Rpb25zUHJvdmlkZXIocHJvdmlkZXIkIDogT2JzZXJ2YWJsZTxTdWdnZXN0aW9uc1Byb3ZpZGVyRGF0YT4pXG4gICAge1xuICAgICAgICBpZiAodGhpcy5fc3VnZ2VzdGlvbnNQcm92aWRlciQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX3N1Z2dlc3Rpb25zUHJvdmlkZXIkLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLl9zdWdnZXN0aW9uc1Byb3ZpZGVyJCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvdmlkZXIkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9zdWdnZXN0aW9uc1Byb3ZpZGVyJCA9IHByb3ZpZGVyJC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgZGF0YSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWVMZW5ndGhWYWxpZCA9IHRoaXMuaW5wdXQgJiYgKHRoaXMuaW5wdXQudmFsdWUgfHwgJycpLnRyaW0oKS5sZW5ndGggPj0gdGhpcy5taW5MZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdmFsdWVMZW5ndGhWYWxpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHJpbWVuZyBmaXg6IGlmIHVzZXIgdXNlIGJhY2tzcGFjZSB0byBkZWxldGUgc2VhcmNoIHRleHQsIHNob3VsZCBhYm9ydCB0aGUgbGFzdCBxdWVyeS5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmlzTG9hZGluZylcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaG93Tm9JdGVtcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWdnZXN0aW9ucyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXJyb3JNZXNzYWdlID0gJyc7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3VnZ2VzdGlvbnNVcGRhdGVkID0gdHJ1ZTsgLy8gbWFrZSBzdXJlIHRoZSBzdWdnZXN0aW9ucyBwYW5lbCBpcyBhbGlnbmVkIHRvIHRoZSBoZWlnaHQgb2YgdGhlIGNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnN1Z2dlc3Rpb25zICYmIGRhdGEuc3VnZ2VzdGlvbnMubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN1Z2dlc3Rpb25zID0gZGF0YS5zdWdnZXN0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWdnZXN0aW9ucyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xvYWRpbmcgPSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dOb0l0ZW1zID0gIWRhdGEuZXJyb3JNZXNzYWdlOyAvLyBzaG93IG5vIGl0ZW1zIG5vdGlmaWNhdGlvbiBvbmx5IGlmIHJlc3VsdCBpcyB2YWxpZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3VnZ2VzdGlvbnNVcGRhdGVkID0gdHJ1ZTsgLy8gbWFrZSBzdXJlIHRoZSBzdWdnZXN0aW9ucyBwYW5lbCBpcyBhbGlnbmVkIHRvIHRoZSBoZWlnaHQgb2YgdGhlIGNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5lcnJvck1lc3NhZ2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9lcnJvck1lc3NhZ2UgPSBkYXRhLmVycm9yTWVzc2FnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWdnZXN0aW9uc1VwZGF0ZWQgPSB0cnVlOyAvLyBtYWtlIHN1cmUgdGhlIHN1Z2dlc3Rpb25zIHBhbmVsIGlzIGFsaWduZWQgdG8gdGhlIGhlaWdodCBvZiB0aGUgY29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgIHB1YmxpYyBnZXRWYWx1ZSgpIDogYW55IHtcbiAgICAgICAgIGlmICh0aGlzLl9hbGxvd011bHRpcGxlKSB7XG4gICAgICAgICAgICAgaWYgKHRoaXMudmFsdWUgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZSA/IFt0aGlzLnZhbHVlXSA6IFtdO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgaWYgKHRoaXMudmFsdWUgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZS5sZW5ndGggPiAwID8gdGhpcy52YWx1ZVswXSA6IG51bGw7XG4gICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgfVxuICAgICB9XG5cbiAgICAgcHVibGljIGNsZWFyVmFsdWUoKSA6IHZvaWR7XG4gICAgICAgIHRoaXMudmFsdWUgPSBudWxsO1xuICAgICAgICB0aGlzLl9jbGVhcklucHV0VmFsdWUoKVxuICAgICB9XG5cbiAgICAgcHVibGljIGdldCBzZWFyY2hUZXh0KCkgOiBzdHJpbmdcbiAgICAge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnB1dCA/IHRoaXMuaW5wdXQudmFsdWUgOiBudWxsO1xuICAgICB9XG5cbiAgICAgcHJpdmF0ZSBnZXQgaW5wdXQoKSA6IEhUTUxJbnB1dEVsZW1lbnRcbiAgICAge1xuICAgICAgICAgLy8gW2ttY25nXSB3ZSBvdmVycmlkZSBtdWx0aSBtb2RlIHRvIGFsd2F5cyBiZSBtdWx0aXBsZSBzbyB0aGUgaW5wdXQgc2hvdWxkIGFsd2F5cyBodXNlIHRoZSBtdWx0aUlucHV0RWxcbiAgICAgICAgIHJldHVybiB0aGlzLm11bHRpSW5wdXRFTC5uYXRpdmVFbGVtZW50O1xuICAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBpdGVtXG4gICAgICogcmV0dXJucyB7YW55fGJvb2xlYW59XG4gICAgICogcHJpdmF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgX2lzSXRlbVNlbGVjdGVkKGl0ZW0gOiBhbnkpIDogYm9vbGVhblxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlICYmIHRoaXMudmFsdWUgaW5zdGFuY2VvZiBBcnJheSAmJiB0aGlzLnZhbHVlLmluZGV4T2YoaXRlbSkgIT09IC0xO1xuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZSAmJiB0aGlzLnZhbHVlID09PSBpdGVtO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYWRkIHZhbHVlIHByb3ZpZGVkIGJ5IHVzZXIgaWYgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBjb25maXJtZWQ6XG4gICAgICogLSBpbnB1dCBjb21wb25lbnQgaXMgaW4gZm9jdXMgYW5kIGl0cycgY29udGVudCBsZW5ndGggaXMgdmFsaWQuXG4gICAgICogLSBubyBzdWdnZXN0aW9uIGlzIGN1cnJlbnRseSBoaWdobGlnaHRlZFxuICAgICAqIHJldHVybnMgeyB7c3RhdHVzfSB9IHN0YXR1cyAnYWRkZWQnIGlmIHZhbGlkIHZhbHVlLCAnaW52YWxpZCcgaWYgY2Fubm90IGFkZCB0aGUgdmFsdWUgb3IgJ25vdCByZWxldmFudCcgaWYgdGhlIHJlcXVlc3Qgc2hvdWxkIGJlIGlnbm9yZWRcbiAgICAgKiBwcml2YXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSBfYWRkVmFsdWVGcm9tSW5wdXQodmFsdWUgPSBudWxsKSA6IHsgc3RhdHVzIDogJ2FkZGVkJyB8ICdpbnZhbGlkJyB8ICdub3QgcmVsZXZhbnQnIHwgJ2R1cGxpY2F0ZWQnfVxuICAgIHtcbiAgICAgICAgY29uc3QgcmF3SW5wdXRWYWx1ZSA9ICh2YWx1ZSB8fCB0aGlzLnNlYXJjaFRleHQgfHwgJycpLnRyaW0oKTtcblxuICAgICAgICAvLyAxLiBpZiAhYHRoaXMudmFsdWVgIC0+IGZvcm0gaXMgdmFsaWQgKGFzc3VtaW5nIHRoYXQgd2UgYWRkIHZhbHVlIGZvciB0aGUgZmlyc3QgdGltZSlcbiAgICAgICAgLy8gMi4gaWYgZWFjaCB2YWx1ZSBpcyBzdHJpbmcgYW5kIHRoZXJlJ3Mgbm8gc2FtZSB2YWx1ZSBpbiB0aGUgYHRoaXMudmFsdWVgIGFycmF5IC0+IGZvcm0gaXMgdmFsaWRcbiAgICAgICAgY29uc3QgaXNEdXBsaWNhdGVkID0gdGhpcy52YWx1ZSAmJiB0aGlzLnZhbHVlLnNvbWUodmFsdWUgPT4ge1xuICAgICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlLnRvTG93ZXJDYXNlKCkgPT09IHJhd0lucHV0VmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGlzRHVwbGljYXRlZCkge1xuICAgICAgICAgIHJldHVybiB7IHN0YXR1cyA6ICdkdXBsaWNhdGVkJ307XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMubGltaXRUb1N1Z2dlc3Rpb25zICYmIHJhd0lucHV0VmFsdWUgJiYgIXRoaXMuaGlnaGxpZ2h0T3B0aW9uICYmICF0aGlzLm92ZXJsYXlIb3ZlcmVkICYmIHRoaXMuZm9jdXMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICggcmF3SW5wdXRWYWx1ZS5sZW5ndGggPj0gMSAmJiAhdGhpcy5faXNJdGVtU2VsZWN0ZWQocmF3SW5wdXRWYWx1ZSkpIHtcblxuICAgICAgICAgICAgICAgIGxldCBuZXdWYWx1ZSA9IHRoaXMub25JdGVtQWRkaW5nID8gdGhpcy5vbkl0ZW1BZGRpbmcuY2FsbChudWxsLHJhd0lucHV0VmFsdWUpIDogcmF3SW5wdXRWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGlmIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG5ld1ZhbHVlID09PSAnc3RyaW5nJyAmJiB0aGlzLmZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFRoZSBhdXRvLWNvbXBsZXRlIGNvbXBvbmVudCAnZmllbGQnIGF0dHJpYnV0ZSBpcyBzZXQgdG8gdmFsdWUgJyR7dGhpcy5maWVsZH0nIHdoaWNoIGluZGljYXRlcyB0aGF0IHRoZSBhdXRvLWNvbXBsZXRlIHZhbHVlIHR5cGUgaXMgYW4gb2JqZWN0IChkaWQgeW91IGZvcmdldCB0byBhc3NpZ24gdGhlICdvbkl0ZW1BZGRpbmcnIGF0dHJpYnV0ZSB0byBjb252ZXJ0IHRoZSB1c2VyIGlucHV0IHdoaWNoIGlzIG9mIHR5cGUgdHlwZSAnc3RyaW5nJyB0byBhIHZhbGlkIHZhbHVlPylgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHN1cGVyLnNlbGVjdEl0ZW0obmV3VmFsdWUpO1xuICAgICAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXdWYWx1ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmV3VmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgdGhlIGZ1bmN0aW9uIHByb3ZpZGVkIGJ5IGF0dHJpYnV0ZSAnb25JdGVtQWRkaW5nJyByZXN1bHRlZCB3aXRoIG51bGwgdmFsdWUsIGFib3J0IGFkZGluZyB1c2VyIGlucHV0IHRvIGF1dC1jb21wbGV0ZSB2YWx1ZWApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4geyBzdGF0dXMgOiAnYWRkZWQnfTtcbiAgICAgICAgICAgIH1lbHNlXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgc3RhdHVzIDogJ2ludmFsaWQnfTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN0YXR1cyA6ICdub3QgcmVsZXZhbnQnfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSW5wdXRCbHVyKGV2ZW50KSB7XG5cbiAgICAgICAgdGhpcy5fYWRkVmFsdWVGcm9tSW5wdXQoKTtcblxuICAgICAgICBpZiAoIXRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgIC8vIHByaW1uZyBmaXg6IGlmIHRoZSBwYW5lbCBpcyBub3QgdmlzaWJsZSAoIW92ZXJsYXlWaXNpYmxlKSBhbmQgd2UgY3VycmVudGx5IGxlYXZpbmcgdGhlIGlucHV0IGZpZWxkIGNsZWFyIGlucHV0IGNvbnRlbnRcbiAgICAgICAgICAgIHRoaXMuX2NsZWFySW5wdXRWYWx1ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyLm9uSW5wdXRCbHVyKGV2ZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb25zdW1lIHRoZSBhcmd1bWVudHMgbmVlZGVkIHRvIGNvbnN0cnVjdCAnQXV0b0NvbXBsZXRlJyBhbmQgcGFzcyB0aGVtIHRvIHNlbGYgKHRoZSAnQXV0b0NvbXBsZXRlJyBjb25zdHJ1Y3RvcikuXG4gICAgICpcbiAgICAgKiBUaGlzIGlzIGEgd29ya2Fyb3VuZCBzaW5jZSBhY2NvcmRpbmcgdG8gTkcyIGRvY3VtZW50YXRpb24gdGhlIHBhcmVudCBjb25zdHJ1Y3RvciBzaG91bGQgYmUgY2FsbGVkIGV2ZW4gaWZcbiAgICAgKiB0aGlzIGNvbXBvbmVudCBkb2Vzbid0IG5lZWQgYSBjb25zdHJ1Y3Rvci5cbiAgICAgKiBAcGFyYW0gZWxcbiAgICAgKiBAcGFyYW0gZGlmZmVyc1xuICAgICAqIEBwYXJhbSByZW5kZXJlclxuICAgICAqIEBwYXJhbSBjZFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHB1YmxpYyBkaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMpXG4gICAge1xuICAgICAgICBzdXBlcihlbCwgcmVuZGVyZXIsIGNkLCBkaWZmZXJzKTtcbiAgICB9XG5cblxuICAgIGhpZGUoKVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheVZpc2libGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMucGFuZWxFTC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IDA7IC8vIHByaW1lbmcgZml4OiBzY3JvbGwgc3VnZ2VzdGlvbnMgbGlzdCB0byB0b3AgKG90aGVyd2lzZSB0aGUgc2Nyb2xsIHdpbGwgYmUgcGVyc2lzdClcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0T3B0aW9uID0gbnVsbDsgLy8gcHJpbWVuZyBmaXg6IHRoZSBsYXN0IHNlbGVjdGlvbiB1c2luZyBrZXlib2FyZCBpcyBub3QgYmVpbmcgY2xlYXJlZCB3aGVuIHNlbGVjdGluZyB1c2luZyAnZW50ZXInXG5cbiAgICAgICAgICAgIC8vIGNsZWFyIHVzZXIgbm90aWZpY2F0aW9uc1xuICAgICAgICAgICAgdGhpcy5fbG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fc2hvd05vSXRlbXMgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX2Vycm9yTWVzc2FnZSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuZm9jdXMpIHtcbiAgICAgICAgICAgIC8vIHByaW1uZyBmaXg6IGlmIHVzZXIgbm90IGluIHRoZSBpbnB1dCAoIWZvY3VzKSBhbmQgd2UgY3VycmVudGx5IGNsb3NpbmcgdGhlIHZpc2libGUgcGFuZWwgLSBjbGVhciBpbnB1dCBjb250ZW50IChyZWxldmFudCBvbmx5IGZvciBjb21wb25lbnRzIHdob3NlICdsaW1pdFRvU3VnZ2VzdGlvbnMnIHByb3BlcnR5IGlzIHNldCB0byB0cnVlXG4gICAgICAgICAgICB0aGlzLl9jbGVhcklucHV0VmFsdWUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN1cGVyLmhpZGUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jbGVhcklucHV0VmFsdWUoKSA6IHZvaWR7XG4gICAgICAgIGlmICh0aGlzLmlucHV0ICYmIHRoaXMuaW5wdXQudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQudmFsdWUgPSAnJzsgLy8gY2xlYXIgZXhpc3RpbmcgdmFsdWVcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvbklucHV0KCRldmVudCkgOiB2b2lke1xuICAgICAgICBpZiAoIXRoaXMuX2FsbG93TXVsdGlwbGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcHJpbW5nIGZpeDogaGlkZSBwYW5lbCBvbmNlIHRoZSB2YWx1ZSBsZW5ndGggaXMgbGVzcyB0aGUgbWluTGVuZ3RoLCBwcmltZW5nIGhhbmRsZXMgb25seSBzaXR1YXRpb24gd2hlcmUgaW5wdXQgdmFsdWUgbGVuZ3RoID09IDBcbiAgICAgICAgaWYodGhpcy5pbnB1dC52YWx1ZS5sZW5ndGggPCB0aGlzLm1pbkxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBzdXBlci5vbklucHV0KCRldmVudCk7XG4gICAgfVxuXG4gICAgb25LZXlkb3duKGV2ZW50KSAge1xuICAgICAgICBsZXQgcHJldmVudEtleWRvd24gPSBmYWxzZTtcblxuICAgICAgICBpZiAoKGV2ZW50LndoaWNoID09PSA5IHx8IGV2ZW50LndoaWNoID09PSAxMyB8fCBldmVudC5rZXkgPT09ICcsJykgKVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zdCBzdGF0dXMgPSB0aGlzLl9hZGRWYWx1ZUZyb21JbnB1dCgpLnN0YXR1cztcblxuICAgICAgICAgICAgaWYgKHN0YXR1cyAhPT0gJ25vdCByZWxldmFudCcpIHtcbiAgICAgICAgICAgICAgICBwcmV2ZW50S2V5ZG93biA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnZHVwbGljYXRlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NsZWFySW5wdXRWYWx1ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFwcmV2ZW50S2V5ZG93biAmJiB0aGlzLm92ZXJsYXlWaXNpYmxlKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG4gICAgICAgICAgICAgICAgY2FzZSA5OiAgLy90YWJcbiAgICAgICAgICAgICAgICAgICAgLy8gcHJpbWVuZyBmaXg6IHByZXNzaW5nICd0YWInIG1vdmUgdGhlIGZvY3VzIGZyb20gdGhlIGNvbXBvbmVudCBidXQgZG9lc24ndCBoaWRlIHRoZSBzdWdnZXN0aW9ucy5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxMzogLy9lbnRlclxuICAgICAgICAgICAgICAgICAgICAvLyBwcmV2ZW50IHNlbGVjdGluZyBvZiBkaXNhYmxlZCBpdGVtIHVzaW5nIGtleWJvYXJkICh0aGUgbW91c2Ugc2VsZWN0aW9uIGlzIGhhbmRsZWQgc2VwYXJhdGVseSlcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGlnaGxpZ2h0SXRlbURpc2FibGVkID0gdGhpcy5oaWdobGlnaHRPcHRpb24gJiYgdGhpcy5zdWdnZXN0aW9uU2VsZWN0YWJsZUZpZWxkID9cbiAgICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YgdGhpcy5oaWdobGlnaHRPcHRpb25bdGhpcy5zdWdnZXN0aW9uU2VsZWN0YWJsZUZpZWxkXSAhPT0gdW5kZWZpbmVkICYmICF0aGlzLmhpZ2hsaWdodE9wdGlvblt0aGlzLnN1Z2dlc3Rpb25TZWxlY3RhYmxlRmllbGRdKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaGlnaGxpZ2h0SXRlbURpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2ZW50S2V5ZG93biA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXByZXZlbnRLZXlkb3duKVxuICAgICAgICB7XG4gICAgICAgICAgICBzdXBlci5vbktleWRvd24oZXZlbnQpO1xuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG4gICAgbmdPbkRlc3Ryb3koKVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuX3N1Z2dlc3Rpb25zUHJvdmlkZXIkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9zdWdnZXN0aW9uc1Byb3ZpZGVyJC51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5fc3VnZ2VzdGlvbnNQcm92aWRlciQgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Vc2VyU2VsZWN0SXRlbShldmVudCA6IGFueSwgaXRlbSA6IGFueSkgOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLl9jYW5TZWxlY3RTdWdnZXN0aW9uKGl0ZW0pKSB7XG4gICAgICAgICAgICAvLyBwcmV2ZW50IHNlbGVjdGlvbiBvZiBkaXNhYmxlZCBzdWdnZXN0aW9ucy5cbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQuZm9jdXMoKTsgLy8gbW92ZSB0aGUgZm9jdXMgYmFjayB0byB0aGUgaW5wdXQgYm94IG90aGVyd2lzZSB0aGUgY29tcG1vbmVudCB3aWxsIHN0b3Agd29ya2luZ1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZWxlY3RJdGVtKGl0ZW0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBfZ2V0U3VnZ2VzdGlvblRleHQoc3VnZ2VzdGlvbjogYW55KVxuICAgIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHN1Z2dlc3Rpb247XG4gICAgICAgIGlmIChzdWdnZXN0aW9uKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdWdnZXN0aW9uTGFiZWxGaWVsZClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBzdWdnZXN0aW9uW3RoaXMuc3VnZ2VzdGlvbkxhYmVsRmllbGRdO1xuICAgICAgICAgICAgfWVsc2UgaWYgKHRoaXMuc3VnZ2VzdGlvbkl0ZW1GaWVsZCAmJiB0aGlzLmZpZWxkKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHN1Z2dlc3Rpb25bdGhpcy5zdWdnZXN0aW9uSXRlbUZpZWxkXTtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQgPyByZXN1bHRbdGhpcy5maWVsZF0gOiAnJztcbiAgICAgICAgICAgIH1lbHNlIGlmICh0aGlzLnN1Z2dlc3Rpb25JdGVtRmllbGQpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gc3VnZ2VzdGlvblt0aGlzLnN1Z2dlc3Rpb25JdGVtRmllbGRdO1xuICAgICAgICAgICAgfWVsc2UgaWYgKHRoaXMuZmllbGQpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gc3VnZ2VzdGlvblt0aGlzLmZpZWxkXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY2FuU2VsZWN0U3VnZ2VzdGlvbihpdGVtIDogYW55KSA6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5zdWdnZXN0aW9uU2VsZWN0YWJsZUZpZWxkKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW1bdGhpcy5zdWdnZXN0aW9uU2VsZWN0YWJsZUZpZWxkXSAhPT0gdW5kZWZpbmVkICYmICFpdGVtW3RoaXMuc3VnZ2VzdGlvblNlbGVjdGFibGVGaWVsZF0pXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgc2VsZWN0SXRlbShpdGVtIDogYW55KSB7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0T3B0aW9uID0gbnVsbDsgLy8gcHJpbWVuZyBmaXg6ICB0aGUgbGFzdCBzZWxlY3RlZCBpdGVtIHdoZW4gdXNpbmcga2V5Ym9hcmQgaXMgbm90IGJlaW5nIHJlbW92ZWQgYW5kIHdpbGwgYmUgdXNlZCBsYXRlciB0byBkbyBhIHJhbmRvbSBzZWxlY3Rpb25cblxuICAgICAgICBpZiAodGhpcy5fY2FuU2VsZWN0U3VnZ2VzdGlvbihpdGVtKSkge1xuXG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtVmFsdWUgPSBpdGVtO1xuICAgICAgICAgICAgaWYgKHRoaXMuc3VnZ2VzdGlvbkl0ZW1GaWVsZClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEl0ZW1WYWx1ZSA9IGl0ZW1bdGhpcy5zdWdnZXN0aW9uSXRlbUZpZWxkXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkSXRlbVZhbHVlID09PSBudWxsIHx8IHR5cGVvZiBzZWxlY3RlZEl0ZW1WYWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJba2FsdHVyYV0gLT4gdHJ5aW5nIHRvIHNlbGVjdCBhIHZhbHVlIHRoYXQgaXMgZWl0aGVyIG51bGwgb3IgdW5kZWZpbmVkLiBhY3Rpb24gaWdub3JlZFwiKTsgLy8ga2VlcCB3YXJuaW5nXG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgc3VwZXIuc2VsZWN0SXRlbShzZWxlY3RlZEl0ZW1WYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZm9jdXNJbnB1dCgpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaW5wdXQgJiYgdGhpcy5pbnB1dC5mb2N1cyAmJiAhdGhpcy5pbnB1dC5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlucHV0LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICB9LCAwKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25JdGVtQ2xpY2soaXRlbTogYW55KXtcbiAgICAgICAgdGhpcy5pdGVtQ2xpY2suZW1pdChpdGVtKTtcbiAgICB9XG59XG4iXX0=