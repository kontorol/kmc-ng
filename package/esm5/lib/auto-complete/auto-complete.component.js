/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
export var KALTURA_AUTOCOMPLETE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return AutoComplete; }),
    multi: true
};
/* tslint:enable */
var AutoComplete = /** @class */ (function (_super) {
    tslib_1.__extends(AutoComplete, _super);
    /**
     * Consume the arguments needed to construct 'AutoComplete' and pass them to self (the 'AutoComplete' constructor).
     *
     * This is a workaround since according to NG2 documentation the parent constructor should be called even if
     * this component doesn't need a constructor.
     * @param el
     * @param differs
     * @param renderer
     * @param cd
     */
    function AutoComplete(el, renderer, cd, differs) {
        var _this = _super.call(this, el, renderer, cd, differs) || this;
        _this.el = el;
        _this.renderer = renderer;
        _this.cd = cd;
        _this.differs = differs;
        _this._suggestionsProvider$ = null;
        _this._loading = false;
        _this._showNoItems = false;
        _this._errorMessage = '';
        _this._allowMultiple = false;
        _this._placeholder = '';
        _this.ObjectUtils = ObjectUtils;
        _this.overlayHovered = false;
        _this.limitToSuggestions = true;
        _this.suggestionSelectableField = '';
        _this.suggestionItemField = '';
        _this.tooltipResolver = null;
        _this.classField = null;
        _this.suggestionLabelField = '';
        _this.addOnPaste = true;
        _this.itemClick = new EventEmitter();
        return _this;
    }
    Object.defineProperty(AutoComplete.prototype, "multiple", {
        get: /**
         * @return {?}
         */
        function () {
            // always return true to affect component ui of selected item.
            // internally you should use _allowMultiple
            return true;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._allowMultiple = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoComplete.prototype, "suggestions", {
        get: /**
         * @return {?}
         */
        function () {
            return this._suggestions;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
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
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    AutoComplete.prototype.onPaste = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (!this.addOnPaste) {
            return;
        }
        /** @type {?} */
        var content = event.clipboardData.getData('text/plain');
        if (content && content.indexOf(',') !== -1) {
            event.preventDefault();
            content.split(',')
                .map(function (item) { return item.trim(); })
                .forEach(function (tag) { return _this._addValueFromInput(tag); });
            if (!this.overlayVisible) {
                // primng fix: if the panel is not visible (!overlayVisible) and we currently leaving the input field clear input content
                this._clearInputValue();
            }
            this.onModelTouched();
        }
    };
    Object.defineProperty(AutoComplete.prototype, "placeholder", {
        get: /**
         * @return {?}
         */
        function () {
            return this._placeholder;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            // IE11 bug causing output event to fire upon input field blur event when there is a placeholder. Thus, we remove the placeholder attribute for IE11, single selection mode.
            // Additional details: https://connect.microsoft.com/IE/feedback/details/810538/ie-11-fires-input-event-on-focus
            /** @type {?} */
            var isIE11 = KalturaBrowserUtils.detectBrowser() === BrowserNames.IE11;
            this._placeholder = isIE11 && !this._allowMultiple ? '' : value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoComplete.prototype, "suggestionsProvider", {
        set: /**
         * @param {?} provider$
         * @return {?}
         */
        function (provider$) {
            var _this = this;
            if (this._suggestionsProvider$) {
                this._suggestionsProvider$.unsubscribe();
                this._suggestionsProvider$ = null;
            }
            if (provider$) {
                this._suggestionsProvider$ = provider$.subscribe(function (data) {
                    /** @type {?} */
                    var valueLengthValid = _this.input && (_this.input.value || '').trim().length >= _this.minLength;
                    if (!valueLengthValid) {
                        // primeng fix: if user use backspace to delete search text, should abort the last query.
                        return;
                    }
                    if (data.isLoading) {
                        _this._loading = true;
                        _this._showNoItems = false;
                        _this.suggestions = [];
                        _this._errorMessage = '';
                        _this.suggestionsUpdated = true; // make sure the suggestions panel is aligned to the height of the component
                        _this.show();
                    }
                    else {
                        if (data.suggestions && data.suggestions.length) {
                            _this._loading = false;
                            _this.suggestions = data.suggestions;
                        }
                        else {
                            _this.suggestions = [];
                            if (_this._loading = true) {
                                _this._showNoItems = !data.errorMessage; // show no items notification only if result is valid
                                _this._loading = false;
                                _this.suggestionsUpdated = true; // make sure the suggestions panel is aligned to the height of the component
                                _this.show();
                            }
                            if (data.errorMessage) {
                                _this._errorMessage = data.errorMessage;
                                _this.suggestionsUpdated = true; // make sure the suggestions panel is aligned to the height of the component
                                _this.show();
                            }
                        }
                    }
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AutoComplete.prototype.getValue = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    AutoComplete.prototype.clearValue = /**
     * @return {?}
     */
    function () {
        this.value = null;
        this._clearInputValue();
    };
    Object.defineProperty(AutoComplete.prototype, "searchText", {
        get: /**
         * @return {?}
         */
        function () {
            return this.input ? this.input.value : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoComplete.prototype, "input", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            // [kmcng] we override multi mode to always be multiple so the input should always huse the multiInputEl
            return this.multiInputEL.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     * @param item
     * returns {any|boolean}
     * private
     */
    /**
     *
     * @private
     * @param {?} item
     * returns {any|boolean}
     * private
     * @return {?}
     */
    AutoComplete.prototype._isItemSelected = /**
     *
     * @private
     * @param {?} item
     * returns {any|boolean}
     * private
     * @return {?}
     */
    function (item) {
        if (this.multiple) {
            return this.value && this.value instanceof Array && this.value.indexOf(item) !== -1;
        }
        else {
            return this.value && this.value === item;
        }
    };
    /**
     * add value provided by user if the following conditions are confirmed:
     * - input component is in focus and its' content length is valid.
     * - no suggestion is currently highlighted
     * returns { {status} } status 'added' if valid value, 'invalid' if cannot add the value or 'not relevant' if the request should be ignored
     * private
     */
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
    AutoComplete.prototype._addValueFromInput = /**
     * add value provided by user if the following conditions are confirmed:
     * - input component is in focus and its' content length is valid.
     * - no suggestion is currently highlighted
     * returns { {status} } status 'added' if valid value, 'invalid' if cannot add the value or 'not relevant' if the request should be ignored
     * private
     * @private
     * @param {?=} value
     * @return {?}
     */
    function (value) {
        if (value === void 0) { value = null; }
        /** @type {?} */
        var rawInputValue = (value || this.searchText || '').trim();
        // 1. if !`this.value` -> form is valid (assuming that we add value for the first time)
        // 2. if each value is string and there's no same value in the `this.value` array -> form is valid
        /** @type {?} */
        var isDuplicated = this.value && this.value.some(function (value) {
            return typeof value === 'string' && value.toLowerCase() === rawInputValue.toLowerCase();
        });
        if (isDuplicated) {
            return { status: 'duplicated' };
        }
        if (!this.limitToSuggestions && rawInputValue && !this.highlightOption && !this.overlayHovered && this.focus) {
            if (rawInputValue.length >= 1 && !this._isItemSelected(rawInputValue)) {
                /** @type {?} */
                var newValue = this.onItemAdding ? this.onItemAdding.call(null, rawInputValue) : rawInputValue;
                if (newValue) {
                    if (typeof newValue === 'string' && this.field) {
                        console.warn("The auto-complete component 'field' attribute is set to value '" + this.field + "' which indicates that the auto-complete value type is an object (did you forget to assign the 'onItemAdding' attribute to convert the user input which is of type type 'string' to a valid value?)");
                    }
                    _super.prototype.selectItem.call(this, newValue);
                }
                else {
                    if (typeof newValue === 'undefined' || newValue === null) {
                        console.warn("the function provided by attribute 'onItemAdding' resulted with null value, abort adding user input to aut-complete value");
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
    };
    /**
     * @param {?} event
     * @return {?}
     */
    AutoComplete.prototype.onInputBlur = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._addValueFromInput();
        if (!this.overlayVisible) {
            // primng fix: if the panel is not visible (!overlayVisible) and we currently leaving the input field clear input content
            this._clearInputValue();
        }
        _super.prototype.onInputBlur.call(this, event);
    };
    /**
     * @return {?}
     */
    AutoComplete.prototype.hide = /**
     * @return {?}
     */
    function () {
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
        _super.prototype.hide.call(this);
    };
    /**
     * @private
     * @return {?}
     */
    AutoComplete.prototype._clearInputValue = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.input && this.input.value) {
            this.input.value = ''; // clear existing value
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    AutoComplete.prototype.onInput = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        if (!this._allowMultiple) {
            this.value = null;
        }
        // primng fix: hide panel once the value length is less the minLength, primeng handles only situation where input value length == 0
        if (this.input.value.length < this.minLength) {
            this.hide();
        }
        _super.prototype.onInput.call(this, $event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    AutoComplete.prototype.onKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var preventKeydown = false;
        if ((event.which === 9 || event.which === 13 || event.key === ',')) {
            /** @type {?} */
            var status_1 = this._addValueFromInput().status;
            if (status_1 !== 'not relevant') {
                preventKeydown = true;
                if (status_1 === 'duplicated') {
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
                    var highlightItemDisabled = this.highlightOption && this.suggestionSelectableField ?
                        (typeof this.highlightOption[this.suggestionSelectableField] !== undefined && !this.highlightOption[this.suggestionSelectableField])
                        : false;
                    if (highlightItemDisabled) {
                        preventKeydown = true;
                    }
                    break;
            }
        }
        if (!preventKeydown) {
            _super.prototype.onKeydown.call(this, event);
        }
        else {
            event.preventDefault();
            event.stopPropagation();
        }
    };
    /**
     * @return {?}
     */
    AutoComplete.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._suggestionsProvider$) {
            this._suggestionsProvider$.unsubscribe();
            this._suggestionsProvider$ = null;
        }
    };
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    AutoComplete.prototype.onUserSelectItem = /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    function (event, item) {
        if (!this._canSelectSuggestion(item)) {
            // prevent selection of disabled suggestions.
            event.stopPropagation();
            event.preventDefault();
            this.input.focus(); // move the focus back to the input box otherwise the compmonent will stop working
            return;
        }
        this.selectItem(item);
    };
    /**
     * @param {?} suggestion
     * @return {?}
     */
    AutoComplete.prototype._getSuggestionText = /**
     * @param {?} suggestion
     * @return {?}
     */
    function (suggestion) {
        /** @type {?} */
        var result = suggestion;
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
    };
    /**
     * @private
     * @param {?} item
     * @return {?}
     */
    AutoComplete.prototype._canSelectSuggestion = /**
     * @private
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (this.suggestionSelectableField) {
            if (typeof item[this.suggestionSelectableField] !== undefined && !item[this.suggestionSelectableField]) {
                return false;
            }
        }
        return true;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    AutoComplete.prototype.selectItem = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.highlightOption = null; // primeng fix:  the last selected item when using keyboard is not being removed and will be used later to do a random selection
        if (this._canSelectSuggestion(item)) {
            /** @type {?} */
            var selectedItemValue = item;
            if (this.suggestionItemField) {
                selectedItemValue = item[this.suggestionItemField];
            }
            if (selectedItemValue === null || typeof selectedItemValue === 'undefined') {
                console.warn("[kaltura] -> trying to select a value that is either null or undefined. action ignored"); // keep warning
            }
            else {
                _super.prototype.selectItem.call(this, selectedItemValue);
            }
        }
    };
    /**
     * @return {?}
     */
    AutoComplete.prototype.focusInput = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout(function () {
            if (_this.input && _this.input.focus && !_this.input.disabled) {
                _this.input.focus();
            }
        }, 0);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    AutoComplete.prototype.onItemClick = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.itemClick.emit(item);
    };
    AutoComplete.decorators = [
        { type: Component, args: [{
                    selector: 'kAutoComplete',
                    /* tslint:disable */
                    // [kmcng] upon upgrade: sync with original component
                    styles: [":host /deep/ .ui-autocomplete-token-label{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:14px}@media screen and (max-width:991px){:host /deep/ .ui-autocomplete-token-label{max-width:270px}}@media screen and (min-width:992px){:host /deep/ .ui-autocomplete-token-label{max-width:270px}}@media screen and (min-width:1280px){:host /deep/ .ui-autocomplete-token-label{max-width:500px}}@media screen and (min-width:1600px){:host /deep/ .ui-autocomplete-token-label{max-width:800px}}:host /deep/ .kHighlightedText{text-decoration:underline}"],
                    template: "<span [ngClass]=\"{'ui-autocomplete ui-widget kOverrideFAIcons':true,'ui-autocomplete-dd':dropdown,'ui-autocomplete-multiple':multiple}\"\n      [ngStyle]=\"style\" [class]=\"styleClass\">\n            <input *ngIf=\"!multiple\" #in [attr.type]=\"type\" [attr.id]=\"inputId\" [ngStyle]=\"inputStyle\"\n                   [class]=\"inputStyleClass\" autocomplete=\"off\" [attr.required]=\"required\"\n                   [ngClass]=\"'ui-inputtext ui-widget ui-state-default ui-corner-all ui-autocomplete-input'\"\n                   [value]=\"inputFieldValue ? (field ? ObjectUtils.resolveFieldData(inputFieldValue, field) || inputFieldValue : value) : null\"\n                   (click)=\"onInputClick($event)\" (input)=\"onInput($event)\" (keydown)=\"onKeydown($event)\"\n                   (keyup)=\"onKeyup($event)\" (focus)=\"onInputFocus($event)\" (blur)=\"onInputBlur($event)\"\n                   (change)=\"onInputChange($event)\"\n                   [attr.placeholder]=\"_placeholder\" [attr.size]=\"size\" [attr.maxlength]=\"maxlength\"\n                   [attr.tabindex]=\"tabindex\" [readonly]=\"readonly\" [disabled]=\"disabled\"\n            ><ul *ngIf=\"multiple\" #multiContainer\n                 class=\"ui-autocomplete-multiple-container ui-widget ui-inputtext ui-state-default ui-corner-all\"\n                 [ngClass]=\"{'ui-state-disabled':disabled,'ui-state-focus':focus}\" (click)=\"multiIn.focus()\">\n                <li #token *ngFor=\"let val of value\" [class]=\"'ui-autocomplete-token ui-state-highlight ui-corner-all ' + (classField && val ? val[classField] : '')\"\n                    [kTooltip]=\"val\" [tooltipResolver]=\"tooltipResolver\">\n                    <span class=\"ui-autocomplete-token-icon pi pi-fw pi-times\" (click)=\"removeItem(token)\"\n                          *ngIf=\"!disabled\"></span>\n                    <span *ngIf=\"!selectedItemTemplate\" class=\"ui-autocomplete-token-label\" (click)=\"onItemClick(val)\">{{field ? ObjectUtils.resolveFieldData(val, field): val}}</span>\n                    <ng-container *ngTemplateOutlet=\"selectedItemTemplate; context: {$implicit: val}\"></ng-container>\n                </li>\n                <li class=\"ui-autocomplete-input-token\">\n                    <input #multiIn [attr.type]=\"type\" [attr.id]=\"inputId\" [disabled]=\"disabled\"\n                           [attr.placeholder]=\"(value&&value.length ? null : _placeholder)\" [attr.tabindex]=\"tabindex\"\n                           (input)=\"onInput($event)\" (click)=\"onInputClick($event)\"\n                           (keydown)=\"onKeydown($event)\" [readonly]=\"readonly\" (keyup)=\"onKeyup($event)\"\n                           (focus)=\"onInputFocus($event)\" (blur)=\"onInputBlur($event)\" (change)=\"onInputChange($event)\"\n                           autocomplete=\"off\" [ngStyle]=\"inputStyle\" [class]=\"inputStyleClass\">\n                </li>\n            </ul\n            ><i *ngIf=\"loading\" class=\"ui-autocomplete-loader pi pi-spinner pi-spin\"></i><button #ddBtn type=\"button\"\n                                                                                                 pButton\n                                                                                                 icon=\"pi pi-fw pi-caret-down\"\n                                                                                                 class=\"ui-autocomplete-dropdown\"\n                                                                                                 [disabled]=\"disabled\"\n                                                                                                 (click)=\"handleDropdownClick($event)\"\n                                                                                                 *ngIf=\"dropdown\"></button>\n            <div #panel class=\"ui-autocomplete-panel ui-widget-content ui-corner-all ui-shadow\"\n                 [style.display]=\"overlayVisible ? 'block' : 'none'\" [style.width]=\"appendTo ? 'auto' : '100%'\"\n                 [style.max-height]=\"scrollHeight\" [@overlayAnimation]=\"'visible'\" (@overlayAnimation.start)=\"onOverlayAnimationStart($event)\" (@overlayAnimation.done)=\"onOverlayAnimationDone($event)\"\n                 (mouseenter)=\"overlayHovered=true\" (mouseleave)=\"overlayHovered=false\">\n                <ul\n                  class=\"ui-autocomplete-items ui-autocomplete-list ui-widget-content ui-widget ui-corner-all ui-helper-reset\"\n                  *ngIf=\"overlayVisible\">\n                <li *ngIf=\"_loading\" class=\"ui-autocomplete-notification-item\">\n                Searching...\n            </li>\n            <li *ngIf=\"_showNoItems\" class=\"ui-autocomplete-notification-item\">\n                No Items Found...\n            </li>\n            <li *ngIf=\"_errorMessage\" class=\"ui-autocomplete-notification-item\">\n                {{ _errorMessage }}\n            </li>\n                    <li *ngFor=\"let option of suggestions; let idx = index\"\n                        [ngClass]=\"{'ui-autocomplete-list-item ui-corner-all':true,'ui-state-highlight':(highlightOption==option)}\"\n                    [class.kIsItemDisabled]=\"option | kIsSuggestionDisabled : suggestionSelectableField\"\n                        (mouseenter)=\"highlightOption=option\" (mouseleave)=\"highlightOption=null\"\n                        (click)=\"selectItem(option)\">\n                        <span *ngIf=\"!itemTemplate\"\n                              [innerHTML]=\"_getSuggestionText(option) | kHighlight : searchText\"></span>\n                        <ng-container\n                          *ngTemplateOutlet=\"itemTemplate; context: {$implicit: option, index: idx}\"></ng-container>\n                    </li>\n                    <li *ngIf=\"noResults && emptyMessage\" class=\"ui-autocomplete-list-item ui-corner-all\">{{emptyMessage}}</li>\n                </ul>\n            </div>\n        </span>\n",
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
    AutoComplete.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: ChangeDetectorRef },
        { type: IterableDiffers }
    ]; };
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
    return AutoComplete;
}(PrimeAutoComplete));
export { AutoComplete };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by1jb21wbGV0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2FsdHVyYS1uZy9rYWx0dXJhLXByaW1lbmctdWkvIiwic291cmNlcyI6WyJsaWIvYXV0by1jb21wbGV0ZS9hdXRvLWNvbXBsZXRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBRVQsVUFBVSxFQUNWLGlCQUFpQixFQUVqQixLQUFLLEVBQ0wsVUFBVSxFQUVWLFNBQVMsRUFDVCxlQUFlLEVBQ2YsTUFBTSxFQUNOLFlBQVksRUFDWixTQUFTLEVBQ1QsWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFnQixNQUFNLHFCQUFxQixDQUFDO0FBQzFGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUU3QyxPQUFPLEVBQUUsWUFBWSxJQUFJLGlCQUFpQixFQUErQixNQUFNLDhDQUE4QyxDQUFDO0FBQzlILE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUUzRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDbkUsT0FBTyxFQUFDLGlCQUFpQixFQUF1QixNQUFNLGdCQUFnQixDQUFDOzs7O0FBSXZFLDZDQUlDOzs7SUFIRyw4Q0FBb0I7O0lBQ3BCLDRDQUFvQjs7SUFDcEIsK0NBQXVCOzs7O0FBSTNCLE1BQU0sS0FBTyxtQ0FBbUMsR0FBUTtJQUNwRCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLFlBQVksRUFBWixDQUFZLENBQUM7SUFDM0MsS0FBSyxFQUFFLElBQUk7Q0FDZDs7QUFJRDtJQWdHa0Msd0NBQWlCO0lBdVIvQzs7Ozs7Ozs7O09BU0c7SUFDSCxzQkFB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RSxDQUFDLFFBQVEsQ0FBQzs4QkEwQ2hDLEtBQUs7MkJBV0wsS0FBSztzQ0FLTCxLQUFLOztJQTZXVixtQkFBQztDQUFBLEFBeGpCRCxDQWdHa0MsaUJBQWlCLEdBd2RsRDtTQXhkWSxZQUFZOzs7Ozs7SUFDckIsNkNBQXFEOztJQUNyRCxnQ0FBd0I7O0lBQ3hCLG9DQUE0Qjs7SUFDNUIscUNBQTBCOzs7OztJQUMxQixzQ0FBK0I7O0lBQy9CLG9DQUF5Qjs7SUFDekIsbUNBQWlDOztJQUNqQyxzQ0FBOEI7O0lBRTlCLG9DQUNvQzs7SUFFcEMsMENBQ29DOztJQUVwQyxpREFDd0M7O0lBRXhDLDJDQUNrQzs7SUFFbEMsdUNBQWlFOztJQUVqRSxrQ0FDMEI7O0lBRTFCLDRDQUNtQzs7SUFFbkMsa0NBQ2tCOztJQWFsQixpQ0FDb0M7O0lBRXBDLCtCQUF3Qzs7SUFrUDVCLDBCQUFxQjs7SUFBRSxnQ0FBMEI7O0lBQUUsMEJBQTRCOztJQUFFLCtCQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgZm9yd2FyZFJlZixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIEFmdGVyVmlld0NoZWNrZWQsXG4gIElucHV0LFxuICBFbGVtZW50UmVmLFxuICBPbkRlc3Ryb3ksXG4gIFJlbmRlcmVyMixcbiAgSXRlcmFibGVEaWZmZXJzLFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgVmlld0NoaWxkLFxuICBIb3N0TGlzdGVuZXIsIEFmdGVyQ29udGVudEluaXQsIERvQ2hlY2tcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge3RyaWdnZXIsc3RhdGUsc3R5bGUsdHJhbnNpdGlvbixhbmltYXRlLEFuaW1hdGlvbkV2ZW50fSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgSVN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IEF1dG9Db21wbGV0ZSBhcyBQcmltZUF1dG9Db21wbGV0ZSwgQVVUT0NPTVBMRVRFX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSBcInByaW1lbmcvY29tcG9uZW50cy9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlXCI7XG5pbXBvcnQgeyBLYWx0dXJhQnJvd3NlclV0aWxzLCBCcm93c2VyTmFtZXMgfSBmcm9tICdAa2FsdHVyYS1uZy9rYWx0dXJhLXVpJztcbmltcG9ydCB7IERvbUhhbmRsZXIgfSBmcm9tIFwicHJpbWVuZy9jb21wb25lbnRzL2RvbS9kb21oYW5kbGVyXCI7XG5pbXBvcnQgeyBPYmplY3RVdGlscyB9IGZyb20gJ3ByaW1lbmcvY29tcG9uZW50cy91dGlscy9vYmplY3R1dGlscyc7XG5pbXBvcnQge05HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG4vLyBba21jbmddIHVwb24gdXBncmFkZTogQmUgcGF0aWVudCBhbmQgYnJpbmcgYSBiaWcgY3VwIG9mIGNvZmZlZS4uLi4gZ29vZCBsdWNrIVxuXG5leHBvcnQgaW50ZXJmYWNlIFN1Z2dlc3Rpb25zUHJvdmlkZXJEYXRhe1xuICAgIHN1Z2dlc3Rpb25zIDogYW55W107XG4gICAgaXNMb2FkaW5nIDogYm9vbGVhbjtcbiAgICBlcnJvck1lc3NhZ2U/IDogc3RyaW5nO1xufVxuXG4vKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuZXhwb3J0IGNvbnN0IEtBTFRVUkFfQVVUT0NPTVBMRVRFX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQXV0b0NvbXBsZXRlKSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuLyogdHNsaW50OmVuYWJsZSAqL1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2tBdXRvQ29tcGxldGUnLFxuXG4gICAgLyogdHNsaW50OmRpc2FibGUgKi9cbiAgICAvLyBba21jbmddIHVwb24gdXBncmFkZTogc3luYyB3aXRoIG9yaWdpbmFsIGNvbXBvbmVudFxuICAgIHN0eWxlczogW2A6aG9zdCAvZGVlcC8gLnVpLWF1dG9jb21wbGV0ZS10b2tlbi1sYWJlbHt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7Zm9udC1zaXplOjE0cHh9QG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDo5OTFweCl7Omhvc3QgL2RlZXAvIC51aS1hdXRvY29tcGxldGUtdG9rZW4tbGFiZWx7bWF4LXdpZHRoOjI3MHB4fX1AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOjk5MnB4KXs6aG9zdCAvZGVlcC8gLnVpLWF1dG9jb21wbGV0ZS10b2tlbi1sYWJlbHttYXgtd2lkdGg6MjcwcHh9fUBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6MTI4MHB4KXs6aG9zdCAvZGVlcC8gLnVpLWF1dG9jb21wbGV0ZS10b2tlbi1sYWJlbHttYXgtd2lkdGg6NTAwcHh9fUBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6MTYwMHB4KXs6aG9zdCAvZGVlcC8gLnVpLWF1dG9jb21wbGV0ZS10b2tlbi1sYWJlbHttYXgtd2lkdGg6ODAwcHh9fTpob3N0IC9kZWVwLyAua0hpZ2hsaWdodGVkVGV4dHt0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lfWBdLFxuICAgIHRlbXBsYXRlOiBgPHNwYW4gW25nQ2xhc3NdPVwieyd1aS1hdXRvY29tcGxldGUgdWktd2lkZ2V0IGtPdmVycmlkZUZBSWNvbnMnOnRydWUsJ3VpLWF1dG9jb21wbGV0ZS1kZCc6ZHJvcGRvd24sJ3VpLWF1dG9jb21wbGV0ZS1tdWx0aXBsZSc6bXVsdGlwbGV9XCJcbiAgICAgIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cbiAgICAgICAgICAgIDxpbnB1dCAqbmdJZj1cIiFtdWx0aXBsZVwiICNpbiBbYXR0ci50eXBlXT1cInR5cGVcIiBbYXR0ci5pZF09XCJpbnB1dElkXCIgW25nU3R5bGVdPVwiaW5wdXRTdHlsZVwiXG4gICAgICAgICAgICAgICAgICAgW2NsYXNzXT1cImlucHV0U3R5bGVDbGFzc1wiIGF1dG9jb21wbGV0ZT1cIm9mZlwiIFthdHRyLnJlcXVpcmVkXT1cInJlcXVpcmVkXCJcbiAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCIndWktaW5wdXR0ZXh0IHVpLXdpZGdldCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGwgdWktYXV0b2NvbXBsZXRlLWlucHV0J1wiXG4gICAgICAgICAgICAgICAgICAgW3ZhbHVlXT1cImlucHV0RmllbGRWYWx1ZSA/IChmaWVsZCA/IE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEoaW5wdXRGaWVsZFZhbHVlLCBmaWVsZCkgfHwgaW5wdXRGaWVsZFZhbHVlIDogdmFsdWUpIDogbnVsbFwiXG4gICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uSW5wdXRDbGljaygkZXZlbnQpXCIgKGlucHV0KT1cIm9uSW5wdXQoJGV2ZW50KVwiIChrZXlkb3duKT1cIm9uS2V5ZG93bigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAoa2V5dXApPVwib25LZXl1cCgkZXZlbnQpXCIgKGZvY3VzKT1cIm9uSW5wdXRGb2N1cygkZXZlbnQpXCIgKGJsdXIpPVwib25JbnB1dEJsdXIoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgKGNoYW5nZSk9XCJvbklucHV0Q2hhbmdlKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgIFthdHRyLnBsYWNlaG9sZGVyXT1cIl9wbGFjZWhvbGRlclwiIFthdHRyLnNpemVdPVwic2l6ZVwiIFthdHRyLm1heGxlbmd0aF09XCJtYXhsZW5ndGhcIlxuICAgICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cInRhYmluZGV4XCIgW3JlYWRvbmx5XT1cInJlYWRvbmx5XCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgID48dWwgKm5nSWY9XCJtdWx0aXBsZVwiICNtdWx0aUNvbnRhaW5lclxuICAgICAgICAgICAgICAgICBjbGFzcz1cInVpLWF1dG9jb21wbGV0ZS1tdWx0aXBsZS1jb250YWluZXIgdWktd2lkZ2V0IHVpLWlucHV0dGV4dCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGxcIlxuICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWRpc2FibGVkJzpkaXNhYmxlZCwndWktc3RhdGUtZm9jdXMnOmZvY3VzfVwiIChjbGljayk9XCJtdWx0aUluLmZvY3VzKClcIj5cbiAgICAgICAgICAgICAgICA8bGkgI3Rva2VuICpuZ0Zvcj1cImxldCB2YWwgb2YgdmFsdWVcIiBbY2xhc3NdPVwiJ3VpLWF1dG9jb21wbGV0ZS10b2tlbiB1aS1zdGF0ZS1oaWdobGlnaHQgdWktY29ybmVyLWFsbCAnICsgKGNsYXNzRmllbGQgJiYgdmFsID8gdmFsW2NsYXNzRmllbGRdIDogJycpXCJcbiAgICAgICAgICAgICAgICAgICAgW2tUb29sdGlwXT1cInZhbFwiIFt0b29sdGlwUmVzb2x2ZXJdPVwidG9vbHRpcFJlc29sdmVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktYXV0b2NvbXBsZXRlLXRva2VuLWljb24gcGkgcGktZncgcGktdGltZXNcIiAoY2xpY2spPVwicmVtb3ZlSXRlbSh0b2tlbilcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cIiFkaXNhYmxlZFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCIhc2VsZWN0ZWRJdGVtVGVtcGxhdGVcIiBjbGFzcz1cInVpLWF1dG9jb21wbGV0ZS10b2tlbi1sYWJlbFwiIChjbGljayk9XCJvbkl0ZW1DbGljayh2YWwpXCI+e3tmaWVsZCA/IE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEodmFsLCBmaWVsZCk6IHZhbH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwic2VsZWN0ZWRJdGVtVGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IHZhbH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInVpLWF1dG9jb21wbGV0ZS1pbnB1dC10b2tlblwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgI211bHRpSW4gW2F0dHIudHlwZV09XCJ0eXBlXCIgW2F0dHIuaWRdPVwiaW5wdXRJZFwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5wbGFjZWhvbGRlcl09XCIodmFsdWUmJnZhbHVlLmxlbmd0aCA/IG51bGwgOiBfcGxhY2Vob2xkZXIpXCIgW2F0dHIudGFiaW5kZXhdPVwidGFiaW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKGlucHV0KT1cIm9uSW5wdXQoJGV2ZW50KVwiIChjbGljayk9XCJvbklucHV0Q2xpY2soJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bik9XCJvbktleWRvd24oJGV2ZW50KVwiIFtyZWFkb25seV09XCJyZWFkb25seVwiIChrZXl1cCk9XCJvbktleXVwKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKGZvY3VzKT1cIm9uSW5wdXRGb2N1cygkZXZlbnQpXCIgKGJsdXIpPVwib25JbnB1dEJsdXIoJGV2ZW50KVwiIChjaGFuZ2UpPVwib25JbnB1dENoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9jb21wbGV0ZT1cIm9mZlwiIFtuZ1N0eWxlXT1cImlucHV0U3R5bGVcIiBbY2xhc3NdPVwiaW5wdXRTdHlsZUNsYXNzXCI+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDwvdWxcbiAgICAgICAgICAgID48aSAqbmdJZj1cImxvYWRpbmdcIiBjbGFzcz1cInVpLWF1dG9jb21wbGV0ZS1sb2FkZXIgcGkgcGktc3Bpbm5lciBwaS1zcGluXCI+PC9pPjxidXR0b24gI2RkQnRuIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uPVwicGkgcGktZncgcGktY2FyZXQtZG93blwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ1aS1hdXRvY29tcGxldGUtZHJvcGRvd25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImhhbmRsZURyb3Bkb3duQ2xpY2soJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJkcm9wZG93blwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgPGRpdiAjcGFuZWwgY2xhc3M9XCJ1aS1hdXRvY29tcGxldGUtcGFuZWwgdWktd2lkZ2V0LWNvbnRlbnQgdWktY29ybmVyLWFsbCB1aS1zaGFkb3dcIlxuICAgICAgICAgICAgICAgICBbc3R5bGUuZGlzcGxheV09XCJvdmVybGF5VmlzaWJsZSA/ICdibG9jaycgOiAnbm9uZSdcIiBbc3R5bGUud2lkdGhdPVwiYXBwZW5kVG8gPyAnYXV0bycgOiAnMTAwJSdcIlxuICAgICAgICAgICAgICAgICBbc3R5bGUubWF4LWhlaWdodF09XCJzY3JvbGxIZWlnaHRcIiBbQG92ZXJsYXlBbmltYXRpb25dPVwiJ3Zpc2libGUnXCIgKEBvdmVybGF5QW5pbWF0aW9uLnN0YXJ0KT1cIm9uT3ZlcmxheUFuaW1hdGlvblN0YXJ0KCRldmVudClcIiAoQG92ZXJsYXlBbmltYXRpb24uZG9uZSk9XCJvbk92ZXJsYXlBbmltYXRpb25Eb25lKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAobW91c2VlbnRlcik9XCJvdmVybGF5SG92ZXJlZD10cnVlXCIgKG1vdXNlbGVhdmUpPVwib3ZlcmxheUhvdmVyZWQ9ZmFsc2VcIj5cbiAgICAgICAgICAgICAgICA8dWxcbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwidWktYXV0b2NvbXBsZXRlLWl0ZW1zIHVpLWF1dG9jb21wbGV0ZS1saXN0IHVpLXdpZGdldC1jb250ZW50IHVpLXdpZGdldCB1aS1jb3JuZXItYWxsIHVpLWhlbHBlci1yZXNldFwiXG4gICAgICAgICAgICAgICAgICAqbmdJZj1cIm92ZXJsYXlWaXNpYmxlXCI+XG4gICAgICAgICAgICAgICAgPGxpICpuZ0lmPVwiX2xvYWRpbmdcIiBjbGFzcz1cInVpLWF1dG9jb21wbGV0ZS1ub3RpZmljYXRpb24taXRlbVwiPlxuICAgICAgICAgICAgICAgIFNlYXJjaGluZy4uLlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDxsaSAqbmdJZj1cIl9zaG93Tm9JdGVtc1wiIGNsYXNzPVwidWktYXV0b2NvbXBsZXRlLW5vdGlmaWNhdGlvbi1pdGVtXCI+XG4gICAgICAgICAgICAgICAgTm8gSXRlbXMgRm91bmQuLi5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8bGkgKm5nSWY9XCJfZXJyb3JNZXNzYWdlXCIgY2xhc3M9XCJ1aS1hdXRvY29tcGxldGUtbm90aWZpY2F0aW9uLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICB7eyBfZXJyb3JNZXNzYWdlIH19XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGkgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBzdWdnZXN0aW9uczsgbGV0IGlkeCA9IGluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktYXV0b2NvbXBsZXRlLWxpc3QtaXRlbSB1aS1jb3JuZXItYWxsJzp0cnVlLCd1aS1zdGF0ZS1oaWdobGlnaHQnOihoaWdobGlnaHRPcHRpb249PW9wdGlvbil9XCJcbiAgICAgICAgICAgICAgICAgICAgW2NsYXNzLmtJc0l0ZW1EaXNhYmxlZF09XCJvcHRpb24gfCBrSXNTdWdnZXN0aW9uRGlzYWJsZWQgOiBzdWdnZXN0aW9uU2VsZWN0YWJsZUZpZWxkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChtb3VzZWVudGVyKT1cImhpZ2hsaWdodE9wdGlvbj1vcHRpb25cIiAobW91c2VsZWF2ZSk9XCJoaWdobGlnaHRPcHRpb249bnVsbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwic2VsZWN0SXRlbShvcHRpb24pXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIiFpdGVtVGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lubmVySFRNTF09XCJfZ2V0U3VnZ2VzdGlvblRleHQob3B0aW9uKSB8IGtIaWdobGlnaHQgOiBzZWFyY2hUZXh0XCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdUZW1wbGF0ZU91dGxldD1cIml0ZW1UZW1wbGF0ZTsgY29udGV4dDogeyRpbXBsaWNpdDogb3B0aW9uLCBpbmRleDogaWR4fVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGkgKm5nSWY9XCJub1Jlc3VsdHMgJiYgZW1wdHlNZXNzYWdlXCIgY2xhc3M9XCJ1aS1hdXRvY29tcGxldGUtbGlzdC1pdGVtIHVpLWNvcm5lci1hbGxcIj57e2VtcHR5TWVzc2FnZX19PC9saT5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvc3Bhbj5cbmAsXG4gICAgcHJvdmlkZXJzOiBbS0FMVFVSQV9BVVRPQ09NUExFVEVfVkFMVUVfQUNDRVNTT1JdLFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgIHRyaWdnZXIoJ292ZXJsYXlBbmltYXRpb24nLCBbXG4gICAgICAgIHN0YXRlKCd2b2lkJywgc3R5bGUoe1xuICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoNSUpJyxcbiAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgIH0pKSxcbiAgICAgICAgc3RhdGUoJ3Zpc2libGUnLCBzdHlsZSh7XG4gICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwKScsXG4gICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICB9KSksXG4gICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gdmlzaWJsZScsIGFuaW1hdGUoJzIyNW1zIGVhc2Utb3V0JykpLFxuICAgICAgICB0cmFuc2l0aW9uKCd2aXNpYmxlID0+IHZvaWQnLCBhbmltYXRlKCcxOTVtcyBlYXNlLWluJykpXG4gICAgICBdKVxuICAgIF0sXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLnVpLWlucHV0d3JhcHBlci1maWxsZWRdJzogJ2ZpbGxlZCcsXG4gICAgICAgICdbY2xhc3MudWktaW5wdXR3cmFwcGVyLWZvY3VzXSc6ICdmb2N1cydcbiAgICB9LFxuICAgIC8qIHRzbGludDplbmFibGUgKi9cbn0pXG4vLyBba21jbmddIHVwb24gdXBncmFkZTogY29tcGFyZSBpbXBsZW1lbnRlZCBpbnRlcmZhY2VzIGluIHRoZSBvcmlnaW5hbCBjb21wb25lbnQgKG5vIG5lZWQgdG8gaW5jbHVkZSBDb250cm9sVmFsdWVBY2Nlc3NvcilcbmV4cG9ydCBjbGFzcyBBdXRvQ29tcGxldGUgZXh0ZW5kcyBQcmltZUF1dG9Db21wbGV0ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQWZ0ZXJWaWV3Q2hlY2tlZCwgQWZ0ZXJDb250ZW50SW5pdCxEb0NoZWNrICB7XG4gICAgcHJpdmF0ZSBfc3VnZ2VzdGlvbnNQcm92aWRlciQgOiBJU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICBwdWJsaWMgX2xvYWRpbmcgPSBmYWxzZTtcbiAgICBwdWJsaWMgX3Nob3dOb0l0ZW1zID0gZmFsc2U7XG4gICAgcHVibGljIF9lcnJvck1lc3NhZ2UgPSAnJztcbiAgICBwcml2YXRlIF9hbGxvd011bHRpcGxlID0gZmFsc2U7XG4gICAgcHVibGljIF9wbGFjZWhvbGRlciA9ICcnO1xuICAgIHB1YmxpYyBPYmplY3RVdGlscyA9IE9iamVjdFV0aWxzO1xuICAgIHB1YmxpYyBvdmVybGF5SG92ZXJlZCA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBvbkl0ZW1BZGRpbmcgOiAodmFsdWUgOiBhbnkpID0+IGFueTtcblxuICAgIEBJbnB1dCgpXG4gICAgbGltaXRUb1N1Z2dlc3Rpb25zIDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKVxuICAgIHN1Z2dlc3Rpb25TZWxlY3RhYmxlRmllbGQgOiBzdHJpbmcgPSAnJztcblxuICAgIEBJbnB1dCgpXG4gICAgc3VnZ2VzdGlvbkl0ZW1GaWVsZCA6IHN0cmluZyA9ICcnO1xuXG4gICAgQElucHV0KCkgdG9vbHRpcFJlc29sdmVyOiBzdHJpbmcgfCAoKHZhbDogYW55KSA9PiBzdHJpbmcpID0gbnVsbDtcblxuICAgIEBJbnB1dCgpXG4gICAgY2xhc3NGaWVsZDogc3RyaW5nID0gbnVsbDtcblxuICAgIEBJbnB1dCgpXG4gICAgc3VnZ2VzdGlvbkxhYmVsRmllbGQgOiBzdHJpbmcgPSAnJztcblxuICAgIEBJbnB1dCgpXG4gICAgYWRkT25QYXN0ZSA9IHRydWU7XG5cbiAgICBnZXQgbXVsdGlwbGUoKSA6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIC8vIGFsd2F5cyByZXR1cm4gdHJ1ZSB0byBhZmZlY3QgY29tcG9uZW50IHVpIG9mIHNlbGVjdGVkIGl0ZW0uXG4gICAgICAgIC8vIGludGVybmFsbHkgeW91IHNob3VsZCB1c2UgX2FsbG93TXVsdGlwbGVcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgQElucHV0KCkgZ2V0IHN1Z2dlc3Rpb25zKCk6IGFueVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N1Z2dlc3Rpb25zO1xuICAgIH1cblxuICAgIEBPdXRwdXQoKVxuICAgIGl0ZW1DbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgQFZpZXdDaGlsZCgncGFuZWwnKSBwYW5lbEVMOiBFbGVtZW50UmVmO1xuXG4gICAgQEhvc3RMaXN0ZW5lcigncGFzdGUnLCBbJyRldmVudCddKSBvblBhc3RlKGV2ZW50OiBDbGlwYm9hcmRFdmVudCkge1xuICAgICAgaWYgKCF0aGlzLmFkZE9uUGFzdGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjb250ZW50ID0gZXZlbnQuY2xpcGJvYXJkRGF0YS5nZXREYXRhKCd0ZXh0L3BsYWluJyk7XG5cbiAgICAgIGlmIChjb250ZW50ICYmIGNvbnRlbnQuaW5kZXhPZignLCcpICE9PSAtMSkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb250ZW50LnNwbGl0KCcsJylcbiAgICAgICAgICAubWFwKGl0ZW0gPT4gaXRlbS50cmltKCkpXG4gICAgICAgICAgLmZvckVhY2godGFnID0+IHRoaXMuX2FkZFZhbHVlRnJvbUlucHV0KHRhZykpO1xuXG4gICAgICAgIGlmICghdGhpcy5vdmVybGF5VmlzaWJsZSkge1xuICAgICAgICAgIC8vIHByaW1uZyBmaXg6IGlmIHRoZSBwYW5lbCBpcyBub3QgdmlzaWJsZSAoIW92ZXJsYXlWaXNpYmxlKSBhbmQgd2UgY3VycmVudGx5IGxlYXZpbmcgdGhlIGlucHV0IGZpZWxkIGNsZWFyIGlucHV0IGNvbnRlbnRcbiAgICAgICAgICB0aGlzLl9jbGVhcklucHV0VmFsdWUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcbiAgICAgIH1cbiAgICB9XG5cblxuICAgIHNldCBzdWdnZXN0aW9ucyh2YWw6YW55W10pIHtcbiAgICAgICAgdGhpcy5fc3VnZ2VzdGlvbnMgPSB2YWw7XG5cbiAgICAgICAgaWYodGhpcy5wYW5lbEVMICYmIHRoaXMucGFuZWxFTC5uYXRpdmVFbGVtZW50KSB7XG5cbiAgICAgICAgICAgIC8vIHByaW1lbmcgZml4OiBwcmltZW5nIHVzZXMgZnVuY3Rpb24gdG8gc2hvdyAnbm9SZXN1bHRzJyBtZXNzYWdlIGlmIGV4aXN0cyBvciBoaWRlIHRoZSBzdWdnZXN0ZWQgb3RoZXJ3aXNlLlxuICAgICAgICAgICAgLy8gd2UgcmVtb3ZlZCB0aGlzIGxvZ2ljIHNpbmNlIGl0IGNvbmZsaWN0IHdpdGggb3VyIGltcHJvdmVkIGxvZ2ljXG4gICAgICAgICAgICBpZih0aGlzLl9zdWdnZXN0aW9ucyAmJiB0aGlzLl9zdWdnZXN0aW9ucy5sZW5ndGgpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3VnZ2VzdGlvbnNVcGRhdGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIGlmKHRoaXMuYXV0b0hpZ2hsaWdodCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodE9wdGlvbiA9IHRoaXMuX3N1Z2dlc3Rpb25zWzBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dCgpIHNldCBwbGFjZWhvbGRlcih2YWx1ZSA6IHN0cmluZylcbiAgICB7XG4gICAgICAgIC8vIElFMTEgYnVnIGNhdXNpbmcgb3V0cHV0IGV2ZW50IHRvIGZpcmUgdXBvbiBpbnB1dCBmaWVsZCBibHVyIGV2ZW50IHdoZW4gdGhlcmUgaXMgYSBwbGFjZWhvbGRlci4gVGh1cywgd2UgcmVtb3ZlIHRoZSBwbGFjZWhvbGRlciBhdHRyaWJ1dGUgZm9yIElFMTEsIHNpbmdsZSBzZWxlY3Rpb24gbW9kZS5cbiAgICAgICAgLy8gQWRkaXRpb25hbCBkZXRhaWxzOiBodHRwczovL2Nvbm5lY3QubWljcm9zb2Z0LmNvbS9JRS9mZWVkYmFjay9kZXRhaWxzLzgxMDUzOC9pZS0xMS1maXJlcy1pbnB1dC1ldmVudC1vbi1mb2N1c1xuICAgICAgICBjb25zdCBpc0lFMTEgPSBLYWx0dXJhQnJvd3NlclV0aWxzLmRldGVjdEJyb3dzZXIoKSA9PT0gQnJvd3Nlck5hbWVzLklFMTE7XG4gICAgICAgIHRoaXMuX3BsYWNlaG9sZGVyID0gaXNJRTExICYmICF0aGlzLl9hbGxvd011bHRpcGxlID8gJycgOiB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IHBsYWNlaG9sZGVyKCk6IHN0cmluZ3tcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BsYWNlaG9sZGVyO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIHNldCBtdWx0aXBsZSh2YWx1ZSA6IGJvb2xlYW4pXG4gICAge1xuICAgICAgICB0aGlzLl9hbGxvd011bHRpcGxlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgc3VnZ2VzdGlvbnNQcm92aWRlcihwcm92aWRlciQgOiBPYnNlcnZhYmxlPFN1Z2dlc3Rpb25zUHJvdmlkZXJEYXRhPilcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLl9zdWdnZXN0aW9uc1Byb3ZpZGVyJClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fc3VnZ2VzdGlvbnNQcm92aWRlciQudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMuX3N1Z2dlc3Rpb25zUHJvdmlkZXIkID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm92aWRlciQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX3N1Z2dlc3Rpb25zUHJvdmlkZXIkID0gcHJvdmlkZXIkLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICBkYXRhID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZUxlbmd0aFZhbGlkID0gdGhpcy5pbnB1dCAmJiAodGhpcy5pbnB1dC52YWx1ZSB8fCAnJykudHJpbSgpLmxlbmd0aCA+PSB0aGlzLm1pbkxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF2YWx1ZUxlbmd0aFZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwcmltZW5nIGZpeDogaWYgdXNlciB1c2UgYmFja3NwYWNlIHRvIGRlbGV0ZSBzZWFyY2ggdGV4dCwgc2hvdWxkIGFib3J0IHRoZSBsYXN0IHF1ZXJ5LlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuaXNMb2FkaW5nKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dOb0l0ZW1zID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN1Z2dlc3Rpb25zID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9lcnJvck1lc3NhZ2UgPSAnJztcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWdnZXN0aW9uc1VwZGF0ZWQgPSB0cnVlOyAvLyBtYWtlIHN1cmUgdGhlIHN1Z2dlc3Rpb25zIHBhbmVsIGlzIGFsaWduZWQgdG8gdGhlIGhlaWdodCBvZiB0aGUgY29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2VcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuc3VnZ2VzdGlvbnMgJiYgZGF0YS5zdWdnZXN0aW9ucy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3VnZ2VzdGlvbnMgPSBkYXRhLnN1Z2dlc3Rpb25zO1xuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN1Z2dlc3Rpb25zID0gW107XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbG9hZGluZyA9IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2hvd05vSXRlbXMgPSAhZGF0YS5lcnJvck1lc3NhZ2U7IC8vIHNob3cgbm8gaXRlbXMgbm90aWZpY2F0aW9uIG9ubHkgaWYgcmVzdWx0IGlzIHZhbGlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWdnZXN0aW9uc1VwZGF0ZWQgPSB0cnVlOyAvLyBtYWtlIHN1cmUgdGhlIHN1Z2dlc3Rpb25zIHBhbmVsIGlzIGFsaWduZWQgdG8gdGhlIGhlaWdodCBvZiB0aGUgY29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmVycm9yTWVzc2FnZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Vycm9yTWVzc2FnZSA9IGRhdGEuZXJyb3JNZXNzYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN1Z2dlc3Rpb25zVXBkYXRlZCA9IHRydWU7IC8vIG1ha2Ugc3VyZSB0aGUgc3VnZ2VzdGlvbnMgcGFuZWwgaXMgYWxpZ25lZCB0byB0aGUgaGVpZ2h0IG9mIHRoZSBjb21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAgcHVibGljIGdldFZhbHVlKCkgOiBhbnkge1xuICAgICAgICAgaWYgKHRoaXMuX2FsbG93TXVsdGlwbGUpIHtcbiAgICAgICAgICAgICBpZiAodGhpcy52YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlID8gW3RoaXMudmFsdWVdIDogW107XG4gICAgICAgICAgICAgfVxuICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICBpZiAodGhpcy52YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlLmxlbmd0aCA+IDAgPyB0aGlzLnZhbHVlWzBdIDogbnVsbDtcbiAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICB9XG4gICAgIH1cblxuICAgICBwdWJsaWMgY2xlYXJWYWx1ZSgpIDogdm9pZHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2NsZWFySW5wdXRWYWx1ZSgpXG4gICAgIH1cblxuICAgICBwdWJsaWMgZ2V0IHNlYXJjaFRleHQoKSA6IHN0cmluZ1xuICAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmlucHV0ID8gdGhpcy5pbnB1dC52YWx1ZSA6IG51bGw7XG4gICAgIH1cblxuICAgICBwcml2YXRlIGdldCBpbnB1dCgpIDogSFRNTElucHV0RWxlbWVudFxuICAgICB7XG4gICAgICAgICAvLyBba21jbmddIHdlIG92ZXJyaWRlIG11bHRpIG1vZGUgdG8gYWx3YXlzIGJlIG11bHRpcGxlIHNvIHRoZSBpbnB1dCBzaG91bGQgYWx3YXlzIGh1c2UgdGhlIG11bHRpSW5wdXRFbFxuICAgICAgICAgcmV0dXJuIHRoaXMubXVsdGlJbnB1dEVMLm5hdGl2ZUVsZW1lbnQ7XG4gICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGl0ZW1cbiAgICAgKiByZXR1cm5zIHthbnl8Ym9vbGVhbn1cbiAgICAgKiBwcml2YXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSBfaXNJdGVtU2VsZWN0ZWQoaXRlbSA6IGFueSkgOiBib29sZWFuXG4gICAge1xuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUgJiYgdGhpcy52YWx1ZSBpbnN0YW5jZW9mIEFycmF5ICYmIHRoaXMudmFsdWUuaW5kZXhPZihpdGVtKSAhPT0gLTE7XG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlICYmIHRoaXMudmFsdWUgPT09IGl0ZW07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBhZGQgdmFsdWUgcHJvdmlkZWQgYnkgdXNlciBpZiB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIGNvbmZpcm1lZDpcbiAgICAgKiAtIGlucHV0IGNvbXBvbmVudCBpcyBpbiBmb2N1cyBhbmQgaXRzJyBjb250ZW50IGxlbmd0aCBpcyB2YWxpZC5cbiAgICAgKiAtIG5vIHN1Z2dlc3Rpb24gaXMgY3VycmVudGx5IGhpZ2hsaWdodGVkXG4gICAgICogcmV0dXJucyB7IHtzdGF0dXN9IH0gc3RhdHVzICdhZGRlZCcgaWYgdmFsaWQgdmFsdWUsICdpbnZhbGlkJyBpZiBjYW5ub3QgYWRkIHRoZSB2YWx1ZSBvciAnbm90IHJlbGV2YW50JyBpZiB0aGUgcmVxdWVzdCBzaG91bGQgYmUgaWdub3JlZFxuICAgICAqIHByaXZhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIF9hZGRWYWx1ZUZyb21JbnB1dCh2YWx1ZSA9IG51bGwpIDogeyBzdGF0dXMgOiAnYWRkZWQnIHwgJ2ludmFsaWQnIHwgJ25vdCByZWxldmFudCcgfCAnZHVwbGljYXRlZCd9XG4gICAge1xuICAgICAgICBjb25zdCByYXdJbnB1dFZhbHVlID0gKHZhbHVlIHx8IHRoaXMuc2VhcmNoVGV4dCB8fCAnJykudHJpbSgpO1xuXG4gICAgICAgIC8vIDEuIGlmICFgdGhpcy52YWx1ZWAgLT4gZm9ybSBpcyB2YWxpZCAoYXNzdW1pbmcgdGhhdCB3ZSBhZGQgdmFsdWUgZm9yIHRoZSBmaXJzdCB0aW1lKVxuICAgICAgICAvLyAyLiBpZiBlYWNoIHZhbHVlIGlzIHN0cmluZyBhbmQgdGhlcmUncyBubyBzYW1lIHZhbHVlIGluIHRoZSBgdGhpcy52YWx1ZWAgYXJyYXkgLT4gZm9ybSBpcyB2YWxpZFxuICAgICAgICBjb25zdCBpc0R1cGxpY2F0ZWQgPSB0aGlzLnZhbHVlICYmIHRoaXMudmFsdWUuc29tZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUudG9Mb3dlckNhc2UoKSA9PT0gcmF3SW5wdXRWYWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoaXNEdXBsaWNhdGVkKSB7XG4gICAgICAgICAgcmV0dXJuIHsgc3RhdHVzIDogJ2R1cGxpY2F0ZWQnfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5saW1pdFRvU3VnZ2VzdGlvbnMgJiYgcmF3SW5wdXRWYWx1ZSAmJiAhdGhpcy5oaWdobGlnaHRPcHRpb24gJiYgIXRoaXMub3ZlcmxheUhvdmVyZWQgJiYgdGhpcy5mb2N1cylcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCByYXdJbnB1dFZhbHVlLmxlbmd0aCA+PSAxICYmICF0aGlzLl9pc0l0ZW1TZWxlY3RlZChyYXdJbnB1dFZhbHVlKSkge1xuXG4gICAgICAgICAgICAgICAgbGV0IG5ld1ZhbHVlID0gdGhpcy5vbkl0ZW1BZGRpbmcgPyB0aGlzLm9uSXRlbUFkZGluZy5jYWxsKG51bGwscmF3SW5wdXRWYWx1ZSkgOiByYXdJbnB1dFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbmV3VmFsdWUgPT09ICdzdHJpbmcnICYmIHRoaXMuZmllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgVGhlIGF1dG8tY29tcGxldGUgY29tcG9uZW50ICdmaWVsZCcgYXR0cmlidXRlIGlzIHNldCB0byB2YWx1ZSAnJHt0aGlzLmZpZWxkfScgd2hpY2ggaW5kaWNhdGVzIHRoYXQgdGhlIGF1dG8tY29tcGxldGUgdmFsdWUgdHlwZSBpcyBhbiBvYmplY3QgKGRpZCB5b3UgZm9yZ2V0IHRvIGFzc2lnbiB0aGUgJ29uSXRlbUFkZGluZycgYXR0cmlidXRlIHRvIGNvbnZlcnQgdGhlIHVzZXIgaW5wdXQgd2hpY2ggaXMgb2YgdHlwZSB0eXBlICdzdHJpbmcnIHRvIGEgdmFsaWQgdmFsdWU/KWApO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgc3VwZXIuc2VsZWN0SXRlbShuZXdWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG5ld1ZhbHVlID09PSAndW5kZWZpbmVkJyB8fCBuZXdWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGB0aGUgZnVuY3Rpb24gcHJvdmlkZWQgYnkgYXR0cmlidXRlICdvbkl0ZW1BZGRpbmcnIHJlc3VsdGVkIHdpdGggbnVsbCB2YWx1ZSwgYWJvcnQgYWRkaW5nIHVzZXIgaW5wdXQgdG8gYXV0LWNvbXBsZXRlIHZhbHVlYCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB7IHN0YXR1cyA6ICdhZGRlZCd9O1xuICAgICAgICAgICAgfWVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBzdGF0dXMgOiAnaW52YWxpZCd9O1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3RhdHVzIDogJ25vdCByZWxldmFudCd9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25JbnB1dEJsdXIoZXZlbnQpIHtcblxuICAgICAgICB0aGlzLl9hZGRWYWx1ZUZyb21JbnB1dCgpO1xuXG4gICAgICAgIGlmICghdGhpcy5vdmVybGF5VmlzaWJsZSkge1xuICAgICAgICAgICAgLy8gcHJpbW5nIGZpeDogaWYgdGhlIHBhbmVsIGlzIG5vdCB2aXNpYmxlICghb3ZlcmxheVZpc2libGUpIGFuZCB3ZSBjdXJyZW50bHkgbGVhdmluZyB0aGUgaW5wdXQgZmllbGQgY2xlYXIgaW5wdXQgY29udGVudFxuICAgICAgICAgICAgdGhpcy5fY2xlYXJJbnB1dFZhbHVlKCk7XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIub25JbnB1dEJsdXIoZXZlbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnN1bWUgdGhlIGFyZ3VtZW50cyBuZWVkZWQgdG8gY29uc3RydWN0ICdBdXRvQ29tcGxldGUnIGFuZCBwYXNzIHRoZW0gdG8gc2VsZiAodGhlICdBdXRvQ29tcGxldGUnIGNvbnN0cnVjdG9yKS5cbiAgICAgKlxuICAgICAqIFRoaXMgaXMgYSB3b3JrYXJvdW5kIHNpbmNlIGFjY29yZGluZyB0byBORzIgZG9jdW1lbnRhdGlvbiB0aGUgcGFyZW50IGNvbnN0cnVjdG9yIHNob3VsZCBiZSBjYWxsZWQgZXZlbiBpZlxuICAgICAqIHRoaXMgY29tcG9uZW50IGRvZXNuJ3QgbmVlZCBhIGNvbnN0cnVjdG9yLlxuICAgICAqIEBwYXJhbSBlbFxuICAgICAqIEBwYXJhbSBkaWZmZXJzXG4gICAgICogQHBhcmFtIHJlbmRlcmVyXG4gICAgICogQHBhcmFtIGNkXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHVibGljIGRpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycylcbiAgICB7XG4gICAgICAgIHN1cGVyKGVsLCByZW5kZXJlciwgY2QsIGRpZmZlcnMpO1xuICAgIH1cblxuXG4gICAgaGlkZSgpXG4gICAge1xuICAgICAgICBpZiAodGhpcy5vdmVybGF5VmlzaWJsZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5wYW5lbEVMLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID0gMDsgLy8gcHJpbWVuZyBmaXg6IHNjcm9sbCBzdWdnZXN0aW9ucyBsaXN0IHRvIHRvcCAob3RoZXJ3aXNlIHRoZSBzY3JvbGwgd2lsbCBiZSBwZXJzaXN0KVxuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRPcHRpb24gPSBudWxsOyAvLyBwcmltZW5nIGZpeDogdGhlIGxhc3Qgc2VsZWN0aW9uIHVzaW5nIGtleWJvYXJkIGlzIG5vdCBiZWluZyBjbGVhcmVkIHdoZW4gc2VsZWN0aW5nIHVzaW5nICdlbnRlcidcblxuICAgICAgICAgICAgLy8gY2xlYXIgdXNlciBub3RpZmljYXRpb25zXG4gICAgICAgICAgICB0aGlzLl9sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9zaG93Tm9JdGVtcyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fZXJyb3JNZXNzYWdlID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5mb2N1cykge1xuICAgICAgICAgICAgLy8gcHJpbW5nIGZpeDogaWYgdXNlciBub3QgaW4gdGhlIGlucHV0ICghZm9jdXMpIGFuZCB3ZSBjdXJyZW50bHkgY2xvc2luZyB0aGUgdmlzaWJsZSBwYW5lbCAtIGNsZWFyIGlucHV0IGNvbnRlbnQgKHJlbGV2YW50IG9ubHkgZm9yIGNvbXBvbmVudHMgd2hvc2UgJ2xpbWl0VG9TdWdnZXN0aW9ucycgcHJvcGVydHkgaXMgc2V0IHRvIHRydWVcbiAgICAgICAgICAgIHRoaXMuX2NsZWFySW5wdXRWYWx1ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3VwZXIuaGlkZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NsZWFySW5wdXRWYWx1ZSgpIDogdm9pZHtcbiAgICAgICAgaWYgKHRoaXMuaW5wdXQgJiYgdGhpcy5pbnB1dC52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5pbnB1dC52YWx1ZSA9ICcnOyAvLyBjbGVhciBleGlzdGluZyB2YWx1ZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uSW5wdXQoJGV2ZW50KSA6IHZvaWR7XG4gICAgICAgIGlmICghdGhpcy5fYWxsb3dNdWx0aXBsZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBwcmltbmcgZml4OiBoaWRlIHBhbmVsIG9uY2UgdGhlIHZhbHVlIGxlbmd0aCBpcyBsZXNzIHRoZSBtaW5MZW5ndGgsIHByaW1lbmcgaGFuZGxlcyBvbmx5IHNpdHVhdGlvbiB3aGVyZSBpbnB1dCB2YWx1ZSBsZW5ndGggPT0gMFxuICAgICAgICBpZih0aGlzLmlucHV0LnZhbHVlLmxlbmd0aCA8IHRoaXMubWluTGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN1cGVyLm9uSW5wdXQoJGV2ZW50KTtcbiAgICB9XG5cbiAgICBvbktleWRvd24oZXZlbnQpICB7XG4gICAgICAgIGxldCBwcmV2ZW50S2V5ZG93biA9IGZhbHNlO1xuXG4gICAgICAgIGlmICgoZXZlbnQud2hpY2ggPT09IDkgfHwgZXZlbnQud2hpY2ggPT09IDEzIHx8IGV2ZW50LmtleSA9PT0gJywnKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXR1cyA9IHRoaXMuX2FkZFZhbHVlRnJvbUlucHV0KCkuc3RhdHVzO1xuXG4gICAgICAgICAgICBpZiAoc3RhdHVzICE9PSAnbm90IHJlbGV2YW50Jykge1xuICAgICAgICAgICAgICAgIHByZXZlbnRLZXlkb3duID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdkdXBsaWNhdGVkJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vdmVybGF5VmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2xlYXJJbnB1dFZhbHVlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoIXByZXZlbnRLZXlkb3duICYmIHRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDk6ICAvL3RhYlxuICAgICAgICAgICAgICAgICAgICAvLyBwcmltZW5nIGZpeDogcHJlc3NpbmcgJ3RhYicgbW92ZSB0aGUgZm9jdXMgZnJvbSB0aGUgY29tcG9uZW50IGJ1dCBkb2Vzbid0IGhpZGUgdGhlIHN1Z2dlc3Rpb25zLlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDEzOiAvL2VudGVyXG4gICAgICAgICAgICAgICAgICAgIC8vIHByZXZlbnQgc2VsZWN0aW5nIG9mIGRpc2FibGVkIGl0ZW0gdXNpbmcga2V5Ym9hcmQgKHRoZSBtb3VzZSBzZWxlY3Rpb24gaXMgaGFuZGxlZCBzZXBhcmF0ZWx5KVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBoaWdobGlnaHRJdGVtRGlzYWJsZWQgPSB0aGlzLmhpZ2hsaWdodE9wdGlvbiAmJiB0aGlzLnN1Z2dlc3Rpb25TZWxlY3RhYmxlRmllbGQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiB0aGlzLmhpZ2hsaWdodE9wdGlvblt0aGlzLnN1Z2dlc3Rpb25TZWxlY3RhYmxlRmllbGRdICE9PSB1bmRlZmluZWQgJiYgIXRoaXMuaGlnaGxpZ2h0T3B0aW9uW3RoaXMuc3VnZ2VzdGlvblNlbGVjdGFibGVGaWVsZF0pXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChoaWdobGlnaHRJdGVtRGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZlbnRLZXlkb3duID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcHJldmVudEtleWRvd24pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN1cGVyLm9uS2V5ZG93bihldmVudCk7XG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbiAgICBuZ09uRGVzdHJveSgpXG4gICAge1xuICAgICAgICBpZiAodGhpcy5fc3VnZ2VzdGlvbnNQcm92aWRlciQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX3N1Z2dlc3Rpb25zUHJvdmlkZXIkLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLl9zdWdnZXN0aW9uc1Byb3ZpZGVyJCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblVzZXJTZWxlY3RJdGVtKGV2ZW50IDogYW55LCBpdGVtIDogYW55KSA6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuX2NhblNlbGVjdFN1Z2dlc3Rpb24oaXRlbSkpIHtcbiAgICAgICAgICAgIC8vIHByZXZlbnQgc2VsZWN0aW9uIG9mIGRpc2FibGVkIHN1Z2dlc3Rpb25zLlxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5pbnB1dC5mb2N1cygpOyAvLyBtb3ZlIHRoZSBmb2N1cyBiYWNrIHRvIHRoZSBpbnB1dCBib3ggb3RoZXJ3aXNlIHRoZSBjb21wbW9uZW50IHdpbGwgc3RvcCB3b3JraW5nXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNlbGVjdEl0ZW0oaXRlbSk7XG4gICAgfVxuXG4gICAgcHVibGljIF9nZXRTdWdnZXN0aW9uVGV4dChzdWdnZXN0aW9uOiBhbnkpXG4gICAge1xuICAgICAgICBsZXQgcmVzdWx0ID0gc3VnZ2VzdGlvbjtcbiAgICAgICAgaWYgKHN1Z2dlc3Rpb24pXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN1Z2dlc3Rpb25MYWJlbEZpZWxkKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHN1Z2dlc3Rpb25bdGhpcy5zdWdnZXN0aW9uTGFiZWxGaWVsZF07XG4gICAgICAgICAgICB9ZWxzZSBpZiAodGhpcy5zdWdnZXN0aW9uSXRlbUZpZWxkICYmIHRoaXMuZmllbGQpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gc3VnZ2VzdGlvblt0aGlzLnN1Z2dlc3Rpb25JdGVtRmllbGRdO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdCA/IHJlc3VsdFt0aGlzLmZpZWxkXSA6ICcnO1xuICAgICAgICAgICAgfWVsc2UgaWYgKHRoaXMuc3VnZ2VzdGlvbkl0ZW1GaWVsZClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBzdWdnZXN0aW9uW3RoaXMuc3VnZ2VzdGlvbkl0ZW1GaWVsZF07XG4gICAgICAgICAgICB9ZWxzZSBpZiAodGhpcy5maWVsZClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBzdWdnZXN0aW9uW3RoaXMuZmllbGRdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jYW5TZWxlY3RTdWdnZXN0aW9uKGl0ZW0gOiBhbnkpIDogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLnN1Z2dlc3Rpb25TZWxlY3RhYmxlRmllbGQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbVt0aGlzLnN1Z2dlc3Rpb25TZWxlY3RhYmxlRmllbGRdICE9PSB1bmRlZmluZWQgJiYgIWl0ZW1bdGhpcy5zdWdnZXN0aW9uU2VsZWN0YWJsZUZpZWxkXSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBzZWxlY3RJdGVtKGl0ZW0gOiBhbnkpIHtcbiAgICAgICAgdGhpcy5oaWdobGlnaHRPcHRpb24gPSBudWxsOyAvLyBwcmltZW5nIGZpeDogIHRoZSBsYXN0IHNlbGVjdGVkIGl0ZW0gd2hlbiB1c2luZyBrZXlib2FyZCBpcyBub3QgYmVpbmcgcmVtb3ZlZCBhbmQgd2lsbCBiZSB1c2VkIGxhdGVyIHRvIGRvIGEgcmFuZG9tIHNlbGVjdGlvblxuXG4gICAgICAgIGlmICh0aGlzLl9jYW5TZWxlY3RTdWdnZXN0aW9uKGl0ZW0pKSB7XG5cbiAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW1WYWx1ZSA9IGl0ZW07XG4gICAgICAgICAgICBpZiAodGhpcy5zdWdnZXN0aW9uSXRlbUZpZWxkKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkSXRlbVZhbHVlID0gaXRlbVt0aGlzLnN1Z2dlc3Rpb25JdGVtRmllbGRdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRJdGVtVmFsdWUgPT09IG51bGwgfHwgdHlwZW9mIHNlbGVjdGVkSXRlbVZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIltrYWx0dXJhXSAtPiB0cnlpbmcgdG8gc2VsZWN0IGEgdmFsdWUgdGhhdCBpcyBlaXRoZXIgbnVsbCBvciB1bmRlZmluZWQuIGFjdGlvbiBpZ25vcmVkXCIpOyAvLyBrZWVwIHdhcm5pbmdcbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICBzdXBlci5zZWxlY3RJdGVtKHNlbGVjdGVkSXRlbVZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBmb2N1c0lucHV0KCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pbnB1dCAmJiB0aGlzLmlucHV0LmZvY3VzICYmICF0aGlzLmlucHV0LmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIH0sIDApO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkl0ZW1DbGljayhpdGVtOiBhbnkpe1xuICAgICAgICB0aGlzLml0ZW1DbGljay5lbWl0KGl0ZW0pO1xuICAgIH1cbn1cbiJdfQ==