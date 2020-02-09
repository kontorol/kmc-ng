import { __extends, __spread } from 'tslib';
import { Directive, Renderer, ElementRef, ContentChild, Input, HostListener, Optional, NgModule, Component, forwardRef, ChangeDetectorRef, Renderer2, IterableDiffers, Output, EventEmitter, ViewChild, Pipe, TemplateRef, ContentChildren } from '@angular/core';
import { StickyScrollService, StickyDirective, KalturaBrowserUtils, BrowserNames, TooltipModule, DatePickerControl, DynamicDropdownControl, ListControl } from '@kaltura-ng/kaltura-ui';
import { Dropdown, Menu, TieredMenu, InputTextModule, MenuModule, DomHandler, MultiSelect, MultiSelectModule, InputTextareaModule, CalendarModule, DropdownModule, InputSwitchModule, Slider, SliderModule, CheckboxModule, PaginatorModule } from 'primeng/primeng';
import { CommonModule } from '@angular/common';
import { KalturaCommonModule, cancelOnDestroy } from '@kaltura-ng/kaltura-common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Observable } from 'rxjs/Observable';
import { AutoComplete } from 'primeng/components/autocomplete/autocomplete';
import { ObjectUtils } from 'primeng/components/utils/objectutils';
import { NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule as InputTextModule$1 } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { SharedModule } from 'primeng/components/common/shared';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DomHandler as DomHandler$1 } from 'primeng/components/dom/domhandler';
import { Table } from 'primeng/table';
import { DomHandler as DomHandler$2 } from 'primeng/api';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/fromEvent';
import { Dropdown as Dropdown$1 } from 'primeng/components/dropdown/dropdown';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var StickyDatatableHeaderDirective = /** @class */ (function (_super) {
    __extends(StickyDatatableHeaderDirective, _super);
    function StickyDatatableHeaderDirective(elementRef, renderer, _stickyScrollService) {
        var _this = _super.call(this, elementRef, renderer, _stickyScrollService) || this;
        _this._dataTableRef = elementRef;
        return _this;
    }
    /**
     * @protected
     * @param {?} elementRef
     * @return {?}
     */
    StickyDatatableHeaderDirective.prototype._getStickyElement = /**
     * @protected
     * @param {?} elementRef
     * @return {?}
     */
    function (elementRef) {
        /** @type {?} */
        var headers = elementRef.nativeElement.querySelectorAll('.ui-table-scrollable-header-box,.ui-datatable-scrollable-header-box');
        if (headers && headers.length > 0) {
            // console.log("got primeng table header!");
            return headers[0];
        }
        else {
            console.warn("failed to extract table header (did you set the prime table with header and set it to scrollable?)");
            return null;
        }
    };
    /**
     * @protected
     * @return {?}
     */
    StickyDatatableHeaderDirective.prototype._onSticky = /**
     * @protected
     * @return {?}
     */
    function () {
        this.updateHeaderSize();
    };
    /**
     * @protected
     * @return {?}
     */
    StickyDatatableHeaderDirective.prototype._onUnsetSticky = /**
     * @protected
     * @return {?}
     */
    function () {
        this._stickyElement.style.position = 'static';
        this._stickyElement.style.width = 'auto';
    };
    /**
     * @protected
     * @return {?}
     */
    StickyDatatableHeaderDirective.prototype.onResize = /**
     * @protected
     * @return {?}
     */
    function () {
        this.updateHeaderSize();
    };
    /**
     * @private
     * @return {?}
     */
    StickyDatatableHeaderDirective.prototype.updateHeaderSize = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.isSticky) {
            /** @type {?} */
            var boundingClientRect = this._dataTableRef.nativeElement.getBoundingClientRect();
            /** @type {?} */
            var tableWidth = boundingClientRect['right'] - boundingClientRect['left'];
            this._stickyElement.style.width = tableWidth + 'px';
        }
    };
    StickyDatatableHeaderDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kStickyHeader]'
                },] },
    ];
    /** @nocollapse */
    StickyDatatableHeaderDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer },
        { type: StickyScrollService }
    ]; };
    return StickyDatatableHeaderDirective;
}(StickyDirective));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DropdownCloseOnScroll = /** @class */ (function () {
    function DropdownCloseOnScroll() {
        this._registered = false;
        this._closeDropdownFunc = this.closeDropdown.bind(this);
        this._isDestroyed = false;
    }
    /**
     * @return {?}
     */
    DropdownCloseOnScroll.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.dropdown.el.nativeElement.addEventListener('click', function () {
            _this.handleScrollRegistration();
        });
        this._dropdownChangesSubscription = this.dropdown.onChange.subscribe(function (event) {
            _this.handleScrollRegistration();
        });
    };
    /**
     * @return {?}
     */
    DropdownCloseOnScroll.prototype.handleScrollRegistration = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.scrollTarget && this.dropdown) {
            setTimeout(function () {
                if (!_this._isDestroyed) {
                    if (_this.dropdown.overlayVisible && !_this._registered) {
                        _this.scrollTarget.addEventListener('scroll', _this._closeDropdownFunc);
                        _this._registered = true;
                    }
                    if (!_this.dropdown.overlayVisible && _this._registered) {
                        _this.scrollTarget.removeEventListener('scroll', _this._closeDropdownFunc);
                        _this._registered = false;
                    }
                }
            }, 0);
        }
    };
    /**
     * @return {?}
     */
    DropdownCloseOnScroll.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.scrollTarget && this._registered) {
            this.scrollTarget.removeEventListener('scroll', this._closeDropdownFunc);
        }
        if (this._dropdownChangesSubscription) {
            this._dropdownChangesSubscription.unsubscribe();
            this._dropdownChangesSubscription = null;
        }
        this._isDestroyed = true;
    };
    /**
     * @private
     * @return {?}
     */
    DropdownCloseOnScroll.prototype.closeDropdown = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.dropdown && typeof this.dropdown.hide !== "undefined") {
            this.dropdown.hide();
            this.scrollTarget.removeEventListener('scroll', this._closeDropdownFunc);
            this._registered = false;
        }
    };
    DropdownCloseOnScroll.decorators = [
        { type: Directive, args: [{
                    selector: '[kDropdownCloseOnScroll]',
                },] },
    ];
    /** @nocollapse */
    DropdownCloseOnScroll.ctorParameters = function () { return []; };
    DropdownCloseOnScroll.propDecorators = {
        scrollTarget: [{ type: Input }],
        dropdown: [{ type: ContentChild, args: [Dropdown,] }]
    };
    return DropdownCloseOnScroll;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MenuCloseOnScroll = /** @class */ (function () {
    function MenuCloseOnScroll(menu, tieredMenu) {
        this._menu = menu || tieredMenu;
    }
    /**
     * @return {?}
     */
    MenuCloseOnScroll.prototype.onWindowScroll = /**
     * @return {?}
     */
    function () {
        this.closeMenu();
    };
    /**
     * @private
     * @return {?}
     */
    MenuCloseOnScroll.prototype.closeMenu = /**
     * @private
     * @return {?}
     */
    function () {
        if (this._menu && typeof this._menu.hide !== "undefined") {
            this._menu.hide();
        }
    };
    MenuCloseOnScroll.decorators = [
        { type: Directive, args: [{
                    selector: '[kMenuCloseOnScroll]',
                },] },
    ];
    /** @nocollapse */
    MenuCloseOnScroll.ctorParameters = function () { return [
        { type: Menu, decorators: [{ type: Optional }] },
        { type: TieredMenu, decorators: [{ type: Optional }] }
    ]; };
    MenuCloseOnScroll.propDecorators = {
        onWindowScroll: [{ type: HostListener, args: ["window:scroll", [],] }]
    };
    return MenuCloseOnScroll;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @deprecated use separated module for each component
 */
var KalturaPrimeNgUIModule = /** @class */ (function () {
    function KalturaPrimeNgUIModule() {
    }
    KalturaPrimeNgUIModule.decorators = [
        { type: NgModule, args: [{
                    imports: (/** @type {?} */ ([
                        CommonModule, InputTextModule, MenuModule, KalturaCommonModule
                    ])),
                    declarations: (/** @type {?} */ ([
                        StickyDatatableHeaderDirective,
                        DropdownCloseOnScroll,
                        MenuCloseOnScroll
                    ])),
                    exports: (/** @type {?} */ ([
                        StickyDatatableHeaderDirective,
                        DropdownCloseOnScroll,
                        MenuCloseOnScroll
                    ])),
                    providers: (/** @type {?} */ ([]))
                },] },
    ];
    return KalturaPrimeNgUIModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/* tslint:disable */
/** @type {?} */
var KALTURA_AUTOCOMPLETE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return AutoComplete$1; }),
    multi: true
};
/* tslint:enable */
var AutoComplete$1 = /** @class */ (function (_super) {
    __extends(AutoComplete$$1, _super);
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
    function AutoComplete$$1(el, renderer, cd, differs) {
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
    Object.defineProperty(AutoComplete$$1.prototype, "multiple", {
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
    Object.defineProperty(AutoComplete$$1.prototype, "suggestions", {
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
    AutoComplete$$1.prototype.onPaste = /**
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
    Object.defineProperty(AutoComplete$$1.prototype, "placeholder", {
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
    Object.defineProperty(AutoComplete$$1.prototype, "suggestionsProvider", {
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
    AutoComplete$$1.prototype.getValue = /**
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
    AutoComplete$$1.prototype.clearValue = /**
     * @return {?}
     */
    function () {
        this.value = null;
        this._clearInputValue();
    };
    Object.defineProperty(AutoComplete$$1.prototype, "searchText", {
        get: /**
         * @return {?}
         */
        function () {
            return this.input ? this.input.value : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoComplete$$1.prototype, "input", {
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
    AutoComplete$$1.prototype._isItemSelected = /**
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
    AutoComplete$$1.prototype._addValueFromInput = /**
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
    AutoComplete$$1.prototype.onInputBlur = /**
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
    AutoComplete$$1.prototype.hide = /**
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
    AutoComplete$$1.prototype._clearInputValue = /**
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
    AutoComplete$$1.prototype.onInput = /**
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
    AutoComplete$$1.prototype.onKeydown = /**
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
    AutoComplete$$1.prototype.ngOnDestroy = /**
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
    AutoComplete$$1.prototype.onUserSelectItem = /**
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
    AutoComplete$$1.prototype._getSuggestionText = /**
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
    AutoComplete$$1.prototype._canSelectSuggestion = /**
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
    AutoComplete$$1.prototype.selectItem = /**
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
    AutoComplete$$1.prototype.focusInput = /**
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
    AutoComplete$$1.prototype.onItemClick = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.itemClick.emit(item);
    };
    AutoComplete$$1.decorators = [
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
    AutoComplete$$1.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: ChangeDetectorRef },
        { type: IterableDiffers }
    ]; };
    AutoComplete$$1.propDecorators = {
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
    return AutoComplete$$1;
}(AutoComplete));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var escape = function (s) { return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'); };
var HighlightPipe = /** @class */ (function () {
    function HighlightPipe() {
    }
    /**
     * @param {?} value
     * @param {?} arg
     * @return {?}
     */
    HighlightPipe.prototype.transform = /**
     * @param {?} value
     * @param {?} arg
     * @return {?}
     */
    function (value, arg) {
        if (!arg.trim()) {
            return value;
        }
        try {
            /** @type {?} */
            var regex = new RegExp("(" + escape(arg) + ")", 'i');
            return value.replace(regex, '<span class="kHighlightedText">$1</span>');
        }
        catch (e) {
            return value;
        }
    };
    HighlightPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'kHighlight'
                },] },
    ];
    return HighlightPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var IsSuggestionDisabledPipe = /** @class */ (function () {
    function IsSuggestionDisabledPipe() {
    }
    /**
     * @param {?} value
     * @param {?} arg
     * @return {?}
     */
    IsSuggestionDisabledPipe.prototype.transform = /**
     * @param {?} value
     * @param {?} arg
     * @return {?}
     */
    function (value, arg) {
        return (arg && typeof value[arg] === 'boolean' && value[arg] === false);
    };
    IsSuggestionDisabledPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'kIsSuggestionDisabled'
                },] },
    ];
    return IsSuggestionDisabledPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AutoCompleteModule = /** @class */ (function () {
    function AutoCompleteModule() {
    }
    AutoCompleteModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, InputTextModule$1, ButtonModule, SharedModule, TooltipModule],
                    declarations: [AutoComplete$1, HighlightPipe, IsSuggestionDisabledPipe],
                    exports: [AutoComplete$1, HighlightPipe],
                },] },
    ];
    return AutoCompleteModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var CLEARABLE_INPUT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return ClearableInputComponent; }),
    multi: true
};
var ClearableInputComponent = /** @class */ (function () {
    function ClearableInputComponent() {
        this.onChange = new EventEmitter();
        this.onFocus = new EventEmitter();
        this.onBlur = new EventEmitter();
        this.onEnterKeyup = new EventEmitter();
        this.onClear = new EventEmitter();
        this._disabled = false;
        this._value = '';
        this._showClearBtn = false;
        this.onModelChange = function () {
        };
        this.onModelTouched = function () {
        };
    }
    /**
     * @return {?}
     */
    ClearableInputComponent.prototype._clearInput = /**
     * @return {?}
     */
    function () {
        this._value = '';
        this._showClearBtn = false;
        this.onModelChange(this._value);
        this.onChange.emit(this._value);
        this.onClear.emit();
    };
    /**
     * @param {?} val
     * @return {?}
     */
    ClearableInputComponent.prototype.setDisabledState = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        this._disabled = val;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    ClearableInputComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onModelChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    ClearableInputComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onModelTouched = fn;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ClearableInputComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._value = String(value || '');
        if (!this._value.trim()) {
            this._showClearBtn = false;
        }
    };
    /**
     * @return {?}
     */
    ClearableInputComponent.prototype.clearValue = /**
     * @return {?}
     */
    function () {
        this._value = '';
        this._showClearBtn = false;
        this.onModelChange(this._value);
        this.onChange.emit(this._value);
    };
    /**
     * @return {?}
     */
    ClearableInputComponent.prototype._enterPressed = /**
     * @return {?}
     */
    function () {
        this.onEnterKeyup.emit(this._value);
        this._showClearBtn = !!this._value;
    };
    ClearableInputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kClearableInput',
                    template: "<span class=\"k-clearable-input-wrapper\">\n    <input pInputText\n           class=\"k-clearable-input-input\"\n           [disabled]=\"disabled || _disabled\"\n           [placeholder]=\"placeholder\"\n           (change)=\"onChange.emit($event)\"\n           (focus)=\"onFocus.emit($event)\"\n           (blur)=\"onBlur.emit($event)\"\n           (keyup.enter)=\"_enterPressed()\"\n           [(ngModel)]=\"_value\">\n    <i *ngIf=\"_showClearBtn\" class=\"k-clearable-input-clear-btn\" title=\"Clear\" (click)=\"_clearInput()\">&times;</i>\n</span>",
                    styles: [".k-clearable-input-wrapper{position:relative}.k-clearable-input-wrapper .k-clearable-input-clear-btn{cursor:pointer;position:absolute;right:5px;top:-6px;font-weight:700;font-size:1.2em;color:#999;font-style:normal}"],
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
    return ClearableInputComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ClearableInputModule = /** @class */ (function () {
    function ClearableInputModule() {
    }
    ClearableInputModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        SharedModule,
                        InputTextModule,
                        FormsModule
                    ],
                    declarations: [ClearableInputComponent],
                    exports: [ClearableInputComponent],
                },] },
    ];
    return ClearableInputModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PrimeControl = /** @class */ (function () {
    function PrimeControl() {
        this.errorMsg = '';
    }
    Object.defineProperty(PrimeControl.prototype, "isValid", {
        get: /**
         * @return {?}
         */
        function () {
            return this.form.controls[this.control.key].valid;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PrimeControl.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!this.isValid) {
            this.errorMsg = this.getErrorMsg();
        }
        else {
            this.errorMsg = '';
        }
        this.onFormStatusChanges();
    };
    /**
     * @param {?} control
     * @return {?}
     */
    PrimeControl.prototype.asDatePickerControl = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        return (control instanceof DatePickerControl) ? control : null;
    };
    /**
     * @param {?} control
     * @return {?}
     */
    PrimeControl.prototype.asDynamicDropdownControl = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        return (control instanceof DynamicDropdownControl) ? control : null;
    };
    /**
     * @param {?} control
     * @return {?}
     */
    PrimeControl.prototype.asListControl = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        return (control instanceof ListControl) ? control : null;
    };
    /**
     * @private
     * @return {?}
     */
    PrimeControl.prototype.onFormStatusChanges = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.form.statusChanges
            .pipe(cancelOnDestroy(this))
            .subscribe(function () {
            if (!_this.isValid) {
                _this.errorMsg = _this.getErrorMsg();
            }
            else {
                _this.errorMsg = '';
            }
        });
    };
    /**
     * @private
     * @return {?}
     */
    PrimeControl.prototype.getErrorMsg = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var result = "";
        /** @type {?} */
        var formControl = this.form.controls[this.control.key];
        if (this.control.errors && !formControl.valid) {
            /** @type {?} */
            var firstErrorKey = Object.keys(this.control.errors).find(function (errorKey) {
                return formControl.hasError(errorKey);
            });
            if (firstErrorKey) {
                result = this.control.errors[firstErrorKey];
            }
        }
        return result;
    };
    /**
     * @return {?}
     */
    PrimeControl.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
    };
    PrimeControl.decorators = [
        { type: Component, args: [{
                    selector: 'k-prime-control',
                    template: "<div [formGroup]=\"form\" [ngSwitch]=\"control.controlType\">\n    <textarea  *ngSwitchCase=\"'TextArea'\" [formControlName]=\"control.key\"   [class.hasError]=\"errorMsg && form.controls[control.key].touched\" pInputTextarea ></textarea>\n\n    <input *ngSwitchCase=\"'Textbox'\" [formControlName]=\"control.key\"  [class.hasError]=\"errorMsg && form.controls[control.key].touched\" pInputText/>\n\n    <input *ngSwitchCase=\"'Number'\"  type=\"number\" [formControlName]=\"control.key\"  [class.hasError]=\"errorMsg && form.controls[control.key].touched\" pInputText />\n\n    <p-dropdown *ngSwitchCase=\"'Dropdown'\" [filter]=\"true\" [formControlName]=\"control.key\"  [options]=\"asDynamicDropdownControl(control).values | kPrimeListOptions: true\"></p-dropdown>\n\n    <kMultiSelect *ngSwitchCase=\"'List'\" [resetFilterOnHide]=\"true\" [formControlName]=\"control.key\"  [options]=\"asListControl(control).values | kPrimeListOptions : false\"></kMultiSelect>\n\n    <p-calendar *ngSwitchCase=\"'DatePicker'\" [formControlName]=\"control.key\"   icon=\"kIconcalendar\" [showIcon]=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" [showTime]=\"asDatePickerControl(control).showTime\" yearRange=\"2005:2050\" [dateFormat]=\"asDatePickerControl(control).dateFormat\"></p-calendar>\n\n    <p-inputSwitch  *ngSwitchCase=\"'Switch'\" [formControlName]=\"control.key\"> </p-inputSwitch>\n\n    <span *ngSwitchDefault=\"\">Missing control for {{control.controlType}}</span>\n\n    <p *ngIf=\"errorMsg && form.controls[control.key].touched\"\n       class=\"kFormError\">{{errorMsg}}\n    </p>\n</div>\n",
                    styles: [""]
                },] },
    ];
    PrimeControl.propDecorators = {
        control: [{ type: Input }],
        form: [{ type: Input }]
    };
    return PrimeControl;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PrimeListOptionsPipe = /** @class */ (function () {
    function PrimeListOptionsPipe() {
    }
    /**
     * @param {?} values
     * @param {?} addDefaultButton
     * @return {?}
     */
    PrimeListOptionsPipe.prototype.transform = /**
     * @param {?} values
     * @param {?} addDefaultButton
     * @return {?}
     */
    function (values, addDefaultButton) {
        /** @type {?} */
        var result = (values || []).map(function (value) {
            return { label: value.text, value: value.value };
        });
        if (addDefaultButton) {
            result.unshift({ label: 'Select a value', value: null });
        }
        return result;
    };
    PrimeListOptionsPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'kPrimeListOptions'
                },] },
    ];
    /** @nocollapse */
    PrimeListOptionsPipe.ctorParameters = function () { return []; };
    return PrimeListOptionsPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/* tslint:disable */
/** @type {?} */
var KALTURA_MULTISELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MultiSelectComponent; }),
    multi: true
};
/* tslint:enable */
var MultiSelectComponent = /** @class */ (function (_super) {
    __extends(MultiSelectComponent, _super);
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MultiSelectModule$1 = /** @class */ (function () {
    function MultiSelectModule$$1() {
    }
    MultiSelectModule$$1.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        MultiSelectModule,
                        CommonModule,
                        SharedModule,
                        TooltipModule,
                        ScrollingModule
                    ],
                    declarations: [MultiSelectComponent, MultiSelectItem],
                    exports: [MultiSelectComponent],
                },] },
    ];
    return MultiSelectModule$$1;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DynamicFormModule = /** @class */ (function () {
    function DynamicFormModule() {
    }
    DynamicFormModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        ReactiveFormsModule,
                        CommonModule,
                        DropdownModule,
                        MultiSelectModule$1,
                        InputTextModule,
                        InputTextareaModule,
                        CalendarModule,
                        InputSwitchModule
                    ],
                    declarations: [
                        PrimeControl,
                        PrimeListOptionsPipe
                    ],
                    exports: [
                        PrimeControl
                    ]
                },] },
    ];
    return DynamicFormModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/* tslint:disable */
/** @type {?} */
var KALTURA_SLIDER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return SliderComponent; }),
    multi: true
};
/* tslint:enable */
var SliderComponent = /** @class */ (function (_super) {
    __extends(SliderComponent, _super);
    function SliderComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tooltip = true;
        return _this;
    }
    SliderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kSlider',
                    styles: [":host /deep/ .ui-slider{background-color:#ccc;height:6px;border:none}:host /deep/ .ui-slider .ui-slider-range{background:#00a784;border:2px solid #00a784}:host /deep/ .ui-slider .ui-slider-handle{top:-.3em;margin-left:-.6em;border-radius:50%;border:2px solid #00a784;height:16px;width:16px;box-shadow:0 2px 8px 0 rgba(0,0,0,.24)}"],
                    template: "<div [ngStyle]=\"style\" [class]=\"styleClass\"\n     [ngClass]=\"{\n         'ui-slider ui-widget ui-widget-content ui-corner-all':true,\n         'ui-state-disabled':disabled,\n         'ui-slider-horizontal':orientation == 'horizontal',\n         'ui-slider-vertical':orientation == 'vertical',\n         'ui-slider-animate':animate\n     }\"\n     (click)=\"onBarClick($event)\">\n\n    <span *ngIf=\"range && orientation == 'horizontal'\"\n          class=\"ui-slider-range ui-widget-header ui-corner-all\"\n          [ngStyle]=\"{'left':handleValues[0] + '%',width: (handleValues[1] - handleValues[0] + '%')}\"></span>\n\n    <span *ngIf=\"range && orientation == 'vertical'\"\n          class=\"ui-slider-range ui-widget-header ui-corner-all\"\n          [ngStyle]=\"{'bottom':handleValues[0] + '%',height: (handleValues[1] - handleValues[0] + '%')}\"></span>\n\n    <span *ngIf=\"!range && orientation=='vertical'\"\n          class=\"ui-slider-range ui-slider-range-min ui-widget-header ui-corner-all\"\n          [ngStyle]=\"{'height': handleValue + '%'}\"></span>\n\n    <span *ngIf=\"!range && orientation=='horizontal'\"\n          class=\"ui-slider-range ui-slider-range-min ui-widget-header ui-corner-all\"\n          [ngStyle]=\"{'width': handleValue + '%'}\"></span>\n\n    <span *ngIf=\"!range\"\n          class=\"ui-slider-handle ui-state-default ui-corner-all ui-clickable\"\n          (mousedown)=\"onMouseDown($event)\"\n          (touchstart)=\"onTouchStart($event)\"\n          (touchmove)=\"onTouchMove($event)\"\n          (touchend)=\"dragging=false\"\n          [style.transition]=\"dragging ? 'none': null\"\n          [ngStyle]=\"{\n            'left': orientation == 'horizontal' ? handleValue + '%' : null,\n            'bottom': orientation == 'vertical' ? handleValue + '%' : null\n          }\"\n          [kTooltip]=\"tooltip ? value : ''\"\n          [followTarget]=\"true\"></span>\n\n    <span *ngIf=\"range\"\n          (mousedown)=\"onMouseDown($event,0)\"\n          (touchstart)=\"onTouchStart($event,0)\"\n          (touchmove)=\"onTouchMove($event,0)\"\n          (touchend)=\"dragging=false\"\n          [style.transition]=\"dragging ? 'none': null\"\n          class=\"ui-slider-handle ui-state-default ui-corner-all ui-clickable\"\n          [ngStyle]=\"{'left': rangeStartLeft, 'bottom': rangeStartBottom}\"\n          [ngClass]=\"{'ui-slider-handle-active':handleIndex==0}\"\n          [kTooltip]=\"tooltip ? values[handleIndex] : ''\"\n          [followTarget]=\"true\"></span>\n\n    <span *ngIf=\"range\"\n          (mousedown)=\"onMouseDown($event,1)\"\n          (touchstart)=\"onTouchStart($event,1)\"\n          (touchmove)=\"onTouchMove($event,1)\"\n          (touchend)=\"dragging=false\"\n          [style.transition]=\"dragging ? 'none': null\"\n          class=\"ui-slider-handle ui-state-default ui-corner-all ui-clickable\"\n          [ngStyle]=\"{'left': rangeEndLeft, 'bottom': rangeEndBottom}\"\n          [ngClass]=\"{'ui-slider-handle-active':handleIndex==1}\"\n          [kTooltip]=\"tooltip ? values[handleIndex] : ''\"\n          [followTarget]=\"true\"></span>\n</div>",
                    providers: [DomHandler$1, KALTURA_SLIDER_VALUE_ACCESSOR]
                    /* tslint:enable */
                },] },
    ];
    SliderComponent.propDecorators = {
        tooltip: [{ type: Input }]
    };
    return SliderComponent;
}(Slider));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SliderModule$1 = /** @class */ (function () {
    function SliderModule$$1() {
    }
    SliderModule$$1.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        SliderModule,
                        CommonModule,
                        SharedModule,
                        TooltipModule
                    ],
                    declarations: [SliderComponent],
                    exports: [SliderComponent],
                },] },
    ];
    return SliderModule$$1;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var SPINNER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return TimeSpinnerComponent; }),
    multi: true
};
var TimeSpinnerComponent = /** @class */ (function () {
    function TimeSpinnerComponent() {
        this.onChange = new EventEmitter();
        this.onFocus = new EventEmitter();
        this.onBlur = new EventEmitter();
        this._allowedKeys = [
            9,
            8,
            37,
            39,
            46 // deleteBtn
        ];
        this._spinKeys = {
            upArrow: 38,
            rightArrow: 39,
            downArrow: 40,
            leftArrow: 37
        };
        this._currentInput = 'minutes';
        this._keyPattern = /[0-9]/;
        this._minutesAsString = '00';
        this._secondsAsString = '00';
        this._minutes = 0;
        this._seconds = 0;
        this._disabled = false;
        this.onModelChange = function () {
        };
        this.onModelTouched = function () {
        };
    }
    /**
     * @private
     * @param {?} event
     * @param {?} dir
     * @return {?}
     */
    TimeSpinnerComponent.prototype._spin = /**
     * @private
     * @param {?} event
     * @param {?} dir
     * @return {?}
     */
    function (event, dir) {
        /** @type {?} */
        var currentValue = this._getCurrentInputValue();
        /** @type {?} */
        var nextValue = currentValue;
        if (currentValue === 0 && dir === -1) {
            nextValue = 59;
        }
        else if (currentValue === 59 && dir === 1) {
            nextValue = 0;
        }
        else {
            nextValue = currentValue + dir;
        }
        this._setCurrentInputValue(nextValue);
        this._formatValue();
        this.onModelChange((this._minutes * 60) + this._seconds);
        this.onChange.emit(event);
    };
    /**
     * @private
     * @return {?}
     */
    TimeSpinnerComponent.prototype._getCurrentInputValue = /**
     * @private
     * @return {?}
     */
    function () {
        if (this._currentInput === 'minutes') {
            return this._minutes;
        }
        else if (this._currentInput === 'seconds') {
            return this._seconds;
        }
        else {
            throw Error('Must not reach this part');
        }
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    TimeSpinnerComponent.prototype._setCurrentInputValue = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this._currentInput === 'minutes') {
            this._minutes = value;
        }
        else if (this._currentInput === 'seconds') {
            this._seconds = value;
        }
        else {
            throw Error('Must not reach this part');
        }
    };
    /**
     * @private
     * @param {?} input
     * @return {?}
     */
    TimeSpinnerComponent.prototype._setValue = /**
     * @private
     * @param {?} input
     * @return {?}
     */
    function (input) {
        /** @type {?} */
        var value = Number(input);
        value = isNaN(value) ? 0 : value;
        if (value > 59) {
            this._setCurrentInputValue(59);
        }
        else if (value < 0) {
            this._setCurrentInputValue(0);
        }
        else {
            this._setCurrentInputValue(value);
        }
    };
    /**
     * @private
     * @return {?}
     */
    TimeSpinnerComponent.prototype._highlightInput = /**
     * @private
     * @return {?}
     */
    function () {
        if (this._currentInput === 'minutes') {
            this.minutesInputField.nativeElement.focus();
            this.minutesInputField.nativeElement.select();
        }
        else if (this._currentInput === 'seconds') {
            this.secondsInputField.nativeElement.focus();
            this.secondsInputField.nativeElement.select();
        }
        else {
            throw Error('Must not reach this part');
        }
    };
    /**
     * @private
     * @return {?}
     */
    TimeSpinnerComponent.prototype._clearTimer = /**
     * @private
     * @return {?}
     */
    function () {
        if (this._timer) {
            clearInterval(this._timer);
        }
    };
    /**
     * @private
     * @param {?} event
     * @param {?} interval
     * @param {?} dir
     * @return {?}
     */
    TimeSpinnerComponent.prototype._repeat = /**
     * @private
     * @param {?} event
     * @param {?} interval
     * @param {?} dir
     * @return {?}
     */
    function (event, interval, dir) {
        var _this = this;
        /** @type {?} */
        var i = interval || 500;
        this._clearTimer();
        this._timer = setTimeout(function () {
            _this._repeat(event, 40, dir);
        }, i);
        this._spin(event, dir);
    };
    /**
     * @private
     * @return {?}
     */
    TimeSpinnerComponent.prototype._formatValue = /**
     * @private
     * @return {?}
     */
    function () {
        if (this._currentInput === 'minutes') {
            this._minutesAsString = this._minutes < 10 ? "0" + this._minutes : String(this._minutes);
            this.minutesInputField.nativeElement.value = this._minutesAsString;
        }
        else if (this._currentInput === 'seconds') {
            this._secondsAsString = this._seconds < 10 ? "0" + this._seconds : String(this._seconds);
            this.secondsInputField.nativeElement.value = this._secondsAsString;
        }
        else {
            throw Error('Must not reach this part');
        }
    };
    /**
     * @private
     * @return {?}
     */
    TimeSpinnerComponent.prototype._setDefaultValues = /**
     * @private
     * @return {?}
     */
    function () {
        this._minutes = 0;
        this._seconds = 0;
        this._secondsAsString = '00';
        this._minutesAsString = '00';
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    TimeSpinnerComponent.prototype._setInitialValues = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._minutes = Math.floor(value / 60);
        this._seconds = value % 60;
        this._minutesAsString = this._minutes < 10 ? "0" + this._minutes : String(this._minutes);
        this.minutesInputField.nativeElement.value = this._minutesAsString;
        this._secondsAsString = this._seconds < 10 ? "0" + this._seconds : String(this._seconds);
        this.secondsInputField.nativeElement.value = this._secondsAsString;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TimeSpinnerComponent.prototype._onInputKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.which === this._spinKeys.upArrow || event.which === this._spinKeys.rightArrow) {
            // increment
            this._spin(event, 1);
            event.preventDefault();
        }
        else if (event.which === this._spinKeys.downArrow || event.which === this._spinKeys.leftArrow) {
            // decrement
            this._spin(event, -1);
            event.preventDefault();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TimeSpinnerComponent.prototype._onInputKeyPress = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var inputChar = String.fromCharCode(event.charCode);
        /** @type {?} */
        var notANumber = !this._keyPattern.test(inputChar);
        /** @type {?} */
        var notAllowedKey = this._allowedKeys.indexOf(event.keyCode) === -1;
        if (notANumber && notAllowedKey) {
            event.preventDefault();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TimeSpinnerComponent.prototype._onInputKeyup = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var inputValue = ((/** @type {?} */ (event.target))).value;
        this._setValue(inputValue);
        this._formatValue();
        this.onModelChange((this._minutes * 60) + this._seconds);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TimeSpinnerComponent.prototype._handleChange = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.onChange.emit(event);
    };
    /**
     * @param {?} event
     * @param {?} input
     * @return {?}
     */
    TimeSpinnerComponent.prototype._onInputFocus = /**
     * @param {?} event
     * @param {?} input
     * @return {?}
     */
    function (event, input) {
        this._currentInput = input;
        this.onFocus.emit(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TimeSpinnerComponent.prototype._onInputBlur = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.onModelTouched();
        this.onBlur.emit(event);
    };
    /**
     * @param {?} event
     * @param {?} dir
     * @return {?}
     */
    TimeSpinnerComponent.prototype._onButtonMousedown = /**
     * @param {?} event
     * @param {?} dir
     * @return {?}
     */
    function (event, dir) {
        if (!this._disabled) {
            this._highlightInput();
            this._repeat(event, null, dir);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TimeSpinnerComponent.prototype._onButtonMouseup = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this._disabled) {
            this._clearTimer();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TimeSpinnerComponent.prototype._onButtonMouseleave = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this._disabled) {
            this._clearTimer();
        }
    };
    /**
     * @param {?} val
     * @return {?}
     */
    TimeSpinnerComponent.prototype.setDisabledState = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        this._disabled = val;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    TimeSpinnerComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (typeof value !== 'number') {
            this._setDefaultValues();
        }
        else {
            this._setInitialValues(value);
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    TimeSpinnerComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onModelChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    TimeSpinnerComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onModelTouched = fn;
    };
    TimeSpinnerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kTimeSpinner',
                    template: "<div class=\"kSpinnerContainer\" [class.ui-state-disabled]=\"_disabled\">\n    <input #minutes\n           class=\"kMinutes\"\n           type=\"text\"\n           maxlength=\"2\"\n           [disabled]=\"_disabled\"\n           [value]=\"_minutesAsString\"\n           (click)=\"minutes.select()\"\n           (keydown)=\"_onInputKeydown($event)\"\n           (keyup)=\"_onInputKeyup($event)\"\n           (keypress)=\"_onInputKeyPress($event)\"\n           (change)=\"_handleChange($event)\"\n           (focus)=\"_onInputFocus($event, 'minutes')\"\n           (blur)=\"_onInputBlur($event)\">\n    <span class=\"kDelimiter\">:</span>\n    <input #seconds class=\"kSeconds\" type=\"text\"\n           [value]=\"_secondsAsString\"\n           [disabled]=\"_disabled\"\n           (click)=\"seconds.select()\"\n           (keydown)=\"_onInputKeydown($event)\"\n           (keyup)=\"_onInputKeyup($event)\"\n           (keypress)=\"_onInputKeyPress($event)\"\n           (change)=\"_handleChange($event)\"\n           (focus)=\"_onInputFocus($event, 'seconds')\"\n           (blur)=\"_onInputBlur($event)\">\n    <button type=\"button\"\n            [ngClass]=\"{'ui-spinner-button ui-spinner-up ui-corner-tr ui-button ui-widget ui-state-default':true,'ui-state-disabled':_disabled}\"\n            [disabled]=\"_disabled\"\n            (mouseleave)=\"_onButtonMouseleave($event)\"\n            (mousedown)=\"_onButtonMousedown($event, 1)\"\n            (mouseup)=\"_onButtonMouseup($event)\">\n        <span class=\"kIcondropdown_arrow_top kSpinnerBtn\"></span>\n    </button>\n    <button type=\"button\"\n            class=\"kSpinDown\"\n            [ngClass]=\"{'ui-spinner-button ui-spinner-down ui-corner-br ui-button ui-widget ui-state-default':true,'ui-state-disabled':_disabled}\"\n            [disabled]=\"_disabled\"\n            (mouseleave)=\"_onButtonMouseleave($event)\"\n            (mousedown)=\"_onButtonMousedown($event, -1)\"\n            (mouseup)=\"_onButtonMouseup($event)\">\n        <span class=\"kIcondropdown_arrow_bottom kSpinnerBtn\"></span>\n    </button>\n</div>\n",
                    styles: [".kSpinnerContainer{background-color:#fff;width:78px;height:16px;display:inline-block;overflow:visible;position:relative;vertical-align:middle;border:1px solid #ccc;border-radius:3px;padding:5px 10px 11px 0}.kSpinnerContainer input{border:0;width:25px;height:18px;font-size:15px;color:#999;font-weight:100}.kSpinnerContainer input:focus{outline:0}.kSpinnerContainer .kDelimiter{color:#999;font-weight:100}.kSpinnerContainer .kMinutes{text-align:right}.kSpinnerContainer .kSpinnerBtn{font-size:10px;color:#333}.kSpinnerContainer .ui-state-disabled{opacity:.35;filter:Alpha(Opacity=35);background-image:none;cursor:default!important}.kSpinnerContainer .ui-spinner-button{border:0;margin-right:1px;height:14px;cursor:pointer}.kSpinnerContainer .ui-spinner-down{margin-bottom:5px}"],
                    providers: [DomHandler, SPINNER_VALUE_ACCESSOR],
                },] },
    ];
    TimeSpinnerComponent.propDecorators = {
        minutesInputField: [{ type: ViewChild, args: ['minutes',] }],
        secondsInputField: [{ type: ViewChild, args: ['seconds',] }],
        onChange: [{ type: Output }],
        onFocus: [{ type: Output }],
        onBlur: [{ type: Output }]
    };
    return TimeSpinnerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TimeSpinnerModule = /** @class */ (function () {
    function TimeSpinnerModule() {
    }
    TimeSpinnerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        SharedModule,
                    ],
                    declarations: [TimeSpinnerComponent],
                    exports: [TimeSpinnerComponent],
                },] },
    ];
    return TimeSpinnerModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var KPSortableColumn = /** @class */ (function () {
    function KPSortableColumn(dt) {
        var _this = this;
        this.dt = dt;
        this.subscription = this.dt.tableService.sortSource$.subscribe(function (sortMeta) {
            _this.updateSortState();
        });
    }
    /**
     * @return {?}
     */
    KPSortableColumn.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.updateSortState();
        this.isEnabled = !!this.field;
    };
    /**
     * @return {?}
     */
    KPSortableColumn.prototype.updateSortState = /**
     * @return {?}
     */
    function () {
        if (this.isEnabled) {
            this.sorted = this.dt.isSorted(this.field);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    KPSortableColumn.prototype.onClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.isEnabled) {
            this.dt.sort({
                originalEvent: event,
                field: this.field
            });
            DomHandler$2.clearSelection();
        }
    };
    /**
     * @return {?}
     */
    KPSortableColumn.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    KPSortableColumn.decorators = [
        { type: Directive, args: [{
                    selector: '[kpSortableColumn]',
                    host: {
                        '[class.ui-sortable-column]': 'isEnabled',
                        '[class.ui-state-highlight]': 'sorted'
                    }
                },] },
    ];
    /** @nocollapse */
    KPSortableColumn.ctorParameters = function () { return [
        { type: Table }
    ]; };
    KPSortableColumn.propDecorators = {
        field: [{ type: Input, args: ["kpSortableColumn",] }],
        onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
    };
    return KPSortableColumn;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @deprecated use separated module for each component
 */
var KPTableModule = /** @class */ (function () {
    function KPTableModule() {
    }
    KPTableModule.decorators = [
        { type: NgModule, args: [{
                    imports: (/** @type {?} */ ([])),
                    declarations: (/** @type {?} */ ([
                        KPSortableColumn
                    ])),
                    exports: (/** @type {?} */ ([
                        KPSortableColumn
                    ])),
                    providers: (/** @type {?} */ ([]))
                },] },
    ];
    return KPTableModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ColumnComponent = /** @class */ (function () {
    function ColumnComponent() {
    }
    ColumnComponent.decorators = [
        { type: Component, args: [{
                    selector: 'k-column',
                    template: ''
                },] },
    ];
    ColumnComponent.propDecorators = {
        field: [{ type: Input }],
        style: [{ type: Input }],
        header: [{ type: Input }],
        template: [{ type: ContentChild, args: [TemplateRef,] }]
    };
    return ColumnComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var sortingFunction = function (a, b) {
    if (a === b)
        return 0;
    else if (a < b)
        return -1;
    else
        return 1;
};
/** @type {?} */
var Events = {
    MOUSE_UP: 'mouseup',
    MOUSE_MOVE: 'mousemove',
    MOUSE_DOWN: 'mousedown',
    MOUSE_OVER: 'mouseover',
    MOUSE_ENTER: 'mouseenter',
    MOUSE_LEAVE: 'mouseleave'
};
var DraggableDataTableComponent = /** @class */ (function () {
    function DraggableDataTableComponent(renderer) {
        this.renderer = renderer;
        this.valueChange = new EventEmitter();
        this.dragModeOff = true;
        this.selectedIndexes = [];
        this._currentPlaceHolderIndex = -1;
        this._dropAvailable = false;
        this.unDraggableFromTop = 0;
        this.unDraggableFromBottom = 0;
        this.rowTrackBy = function (index, item) { return item; };
        this.columnTrackBy = function (index, item) { return item; };
        this.paginator = false;
        this.showIndex = false;
        this.multipleDragAndDrop = false;
        this.selectable = false;
        this.selectionChange = new EventEmitter();
        this.pageChange = new EventEmitter();
    }
    Object.defineProperty(DraggableDataTableComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.dragModeOff) {
                return this._value;
            }
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            if (val) {
                this._value = __spread(val);
                this._orderItems();
            }
            else {
                this._value = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    // component lifecycle events
    // component lifecycle events
    /**
     * @return {?}
     */
    DraggableDataTableComponent.prototype.ngOnInit = 
    // component lifecycle events
    /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.paginator) {
            this.unDraggableFromBottom = this.rows;
        }
        this._orderItems();
        this.draggable = this.draggableElement.nativeElement;
        this.tableBodyElement = this.tableBody.nativeElement;
        this.mouseMove = Observable.fromEvent(document, Events.MOUSE_MOVE).delay(50);
        // cover non-permitted dragging/dropping:
        Observable.fromEvent(document, Events.MOUSE_UP).subscribe(function () { return _this.onMouseUp(); });
        Observable.fromEvent(this.tableBody.nativeElement, Events.MOUSE_LEAVE).subscribe(function () { return _this._onMouseLeave(); });
        Observable.fromEvent(this.tableBody.nativeElement, Events.MOUSE_ENTER).subscribe(function () { return _this._onMouseEnter(); });
    };
    /**
     * @return {?}
     */
    DraggableDataTableComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.columns = this.cols.toArray();
    };
    // public API methods
    // public API methods
    /**
     * @param {?} event
     * @return {?}
     */
    DraggableDataTableComponent.prototype.onMouseMove = 
    // public API methods
    /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._updateDraggable(event);
    };
    /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    DraggableDataTableComponent.prototype.onMouseOver = /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    function (event, index) {
        // only for D&D mode:
        if (!this.dragModeOff && index !== this._currentPlaceHolderIndex) {
            // get mouse location to recognize where to add the placeholder (from top or bottom):
            /** @type {?} */
            var middle = event.currentTarget.getBoundingClientRect().top + (event.currentTarget.getBoundingClientRect().height / 2);
            /** @type {?} */
            var hoveredRow = Object.create(Object.getPrototypeOf(this.draggableItems[index]));
            Object.assign(hoveredRow, this.draggableItems[index]);
            // delete previous:
            if (this._currentPlaceHolderIndex !== -1) {
                this.draggableItems.splice(this._currentPlaceHolderIndex, 1);
            }
            // add placeholder from the bottom:
            if (event.clientY > middle) {
                this._currentPlaceHolderIndex = index + 1;
                this.draggableItems.splice(this._currentPlaceHolderIndex, 0, hoveredRow);
                this.draggableItems[this._currentPlaceHolderIndex].class = 'hovered';
                this._updateView();
            }
            else { // add placeholder from the top:
                this._currentPlaceHolderIndex = index;
                this.draggableItems.splice(this._currentPlaceHolderIndex, 0, hoveredRow);
                this.draggableItems[this._currentPlaceHolderIndex].class = 'hovered';
                this._updateView();
            }
        }
    };
    /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    DraggableDataTableComponent.prototype.onMouseDown = /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    function (event, index) {
        var _this = this;
        // only left button mouse click
        if (event.which === 1) {
            if (this.multipleDragAndDrop) {
                // sign draggable item as 'checked' if it's not:
                /** @type {?} */
                var currentClickedIndex = this.getItemIndex(index);
                if (this.selectedIndexes.indexOf(currentClickedIndex) === -1) {
                    this.selectedIndexes = __spread([currentClickedIndex], this.selectedIndexes);
                }
                // edge-case when all items are selected - d&d should be disabled
                if (this.selectedIndexes.length === this._value.length) {
                    return;
                }
                this.selectedIndexes.forEach(function (index) { return _this._value[index].class = 'open'; });
                this._value = __spread(this._value);
            }
            event.preventDefault();
            this.currentDraggableItem = this.draggableItems[index];
            this._updateDraggable(event);
            this.dragModeOff = false;
            this._currentDraggedIndex = index;
            this._currentDraggedElement = event.currentTarget;
            this._currentDraggedElement['classList'].add('open');
            this.mouseMoveSubscription = this.mouseMove.subscribe(function (e) { return _this.onMouseMove(e); });
            this.renderer.addClass(this.draggable, 'fadeIn');
        }
    };
    /**
     * @return {?}
     */
    DraggableDataTableComponent.prototype.onMouseUp = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var _a;
        if (!this.dragModeOff) {
            this.dragModeOff = true;
            this._currentDraggedElement['classList'].remove('open');
            this._value.forEach(function (item) { return delete item['class']; });
            this.mouseMoveSubscription.unsubscribe();
            this.renderer.setStyle(document.body, 'cursor', 'default');
            if (this._dropAvailable) {
                if (this._currentPlaceHolderIndex !== -1) {
                    if (this.multipleDragAndDrop) {
                        // save item of this._currentPlaceHolderIndex - we'll need this item to find the entry-point:
                        /** @type {?} */
                        var insertIndexReference = this.draggableItems[this._currentPlaceHolderIndex];
                        // save all dragged items aside:
                        /** @type {?} */
                        var draggedItems = this.selectedIndexes.sort(sortingFunction).map(function (index) { return _this._value[index + ((index >= _this._currentPlaceHolderIndex) ? 1 : 0)]; });
                        // remove dragged (selected items) from the original data:
                        draggedItems.forEach(function (item) { return _this._value.splice(_this._value.indexOf(item), 1); });
                        // insert draggable items back to the original data but with new order:
                        (_a = this._value).splice.apply(_a, __spread([this._value.indexOf(insertIndexReference), 1], draggedItems));
                        // initiate state:
                        this._currentPlaceHolderIndex = -1;
                        this.selectedIndexes = [];
                        this._orderItems();
                        this._updateView();
                        this.onSelectionChange();
                    }
                    else {
                        /** @type {?} */
                        var buffer = (this._currentDraggedIndex >= this._currentPlaceHolderIndex) ? 1 : 0;
                        // insert dragged item to the new location:
                        this.draggableItems[this._currentPlaceHolderIndex] = this.draggableItems[this._currentDraggedIndex + buffer];
                        // remove dragged item previous location & update view:
                        this.draggableItems.splice(this._currentDraggedIndex + buffer, 1);
                        // initiate state:
                        this._currentPlaceHolderIndex = -1;
                        this._updateView();
                    }
                }
            }
            else {
                // undroppable area - initiate state:
                this.draggableItems.splice(this._currentPlaceHolderIndex, 1);
                this._currentPlaceHolderIndex = -1;
                this.selectedIndexes = [];
                this.onSelectionChange();
                this._updateView();
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DraggableDataTableComponent.prototype.paginate = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.unDraggableFromTop = event.first;
        this.unDraggableFromBottom = (event.first + event.rows);
        this.value = __spread(this.unDraggableItemsFromTop, this.draggableItems, this.unDraggableItemsFromBottom);
        this.pageChange.emit(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DraggableDataTableComponent.prototype.selectAll = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.selectedIndexes = (event) ? __spread(Array.from(Array(this._value.length), function (_, x) { return x; })) : [];
        this.onSelectionChange();
    };
    /**
     * @return {?}
     */
    DraggableDataTableComponent.prototype.onSelectionChange = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.selectionChange.emit(this.selectedIndexes.sort(sortingFunction).map(function (index) { return _this._value[index]; }));
    };
    /**
     * @param {?} index
     * @return {?}
     */
    DraggableDataTableComponent.prototype.getItemIndex = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        return this._value.indexOf(this.draggableItems[index]);
    };
    // private methods
    // private methods
    /**
     * @private
     * @return {?}
     */
    DraggableDataTableComponent.prototype._updateView = 
    // private methods
    /**
     * @private
     * @return {?}
     */
    function () {
        this.value = (this.paginator) ? __spread(this.unDraggableItemsFromTop, this.draggableItems, this.unDraggableItemsFromBottom) : __spread(this.draggableItems);
        if (this.dragModeOff) {
            this.valueChange.emit(this.value);
        }
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    DraggableDataTableComponent.prototype._updateDraggable = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.renderer.setStyle(this.draggable, 'position', 'fixed');
        this.renderer.setStyle(this.draggable, 'left', event.clientX + 20 + 'px');
        this.renderer.setStyle(this.draggable, 'top', event.clientY - 35 + 'px');
    };
    /**
     * @private
     * @return {?}
     */
    DraggableDataTableComponent.prototype._onMouseLeave = /**
     * @private
     * @return {?}
     */
    function () {
        this._dropAvailable = false;
        if (!this.dragModeOff) {
            this.renderer.setStyle(document.body, 'cursor', 'no-drop');
        }
    };
    /**
     * @private
     * @return {?}
     */
    DraggableDataTableComponent.prototype._onMouseEnter = /**
     * @private
     * @return {?}
     */
    function () {
        this._dropAvailable = true;
    };
    /**
     * @private
     * @return {?}
     */
    DraggableDataTableComponent.prototype._orderItems = /**
     * @private
     * @return {?}
     */
    function () {
        if (!!this.value) {
            if (this.paginator) {
                // once using d&d with pagination page-size has to be increased by 1 because of the added placeholder
                /** @type {?} */
                var buffer = (this._currentPlaceHolderIndex === -1) ? 0 : 1;
                this.unDraggableItemsFromTop = __spread(this.value.slice(0, this.unDraggableFromTop));
                this.unDraggableItemsFromBottom = __spread(this.value.slice(this.unDraggableFromBottom + buffer));
                this.draggableItems = __spread(this.value.slice(this.unDraggableFromTop, this.unDraggableFromBottom + buffer));
            }
            else {
                this.draggableItems = __spread(this.value);
            }
        }
    };
    DraggableDataTableComponent.decorators = [
        { type: Component, args: [{
                    selector: 'k-draggable-data-table',
                    template: "<table [ngClass]=\"{ 'onDragMode' : !dragModeOff }\">\n  <thead>\n  <tr>\n    <th class=\"draggable-row-icon-placeholder\"></th>\n    <th *ngIf=\"selectable\" class=\"draggable-row-check-box\">\n      <p-checkbox (onChange)=\"selectAll($event)\"></p-checkbox>\n    </th>\n    <td *ngIf=\"showIndex\" class=\"draggable-row-index\"></td>\n    <th *ngFor=\"let col of columns\" [ngStyle]=\"col.style\">{{col.header}}</th>\n  </tr>\n  </thead>\n  <tbody #tableBody>\n\n  <tr *ngFor=\"let row of draggableItems;index as i;\" [class]=\"row.class\" [ngClass]=\"{ 'draggable-row' : true }\"\n      (mouseover)=\"onMouseOver($event, i)\" (mouseup)=\"onMouseUp()\">\n\n    <td class=\"draggable-row-icon-placeholder\" (mousedown)=\"onMouseDown($event, i)\">\n      <span class=\"draggable-row-icon\"></span>\n      <span class=\"draggable-row-icon\"></span>\n      <span class=\"draggable-row-icon\"></span>\n      <span class=\"draggable-row-icon\"></span>\n    </td>\n    <td *ngIf=\"selectable\" class=\"draggable-row-check-box\">\n      <p-checkbox [value]=\"getItemIndex(i)\" [(ngModel)]=\"selectedIndexes\" (onChange)=\"onSelectionChange()\">\n      </p-checkbox>\n    </td>\n    <td *ngIf=\"showIndex\" class=\"draggable-row-index\" (mousedown)=\"onMouseDown($event, i)\">\n      <span>{{getItemIndex(i) + 1}}</span>\n    </td>\n    <td *ngFor=\"let col of columns\" [ngStyle]=\"col.style\" (mousedown)=\"onMouseDown($event, i)\">\n      <ng-container\n        *ngTemplateOutlet=\"col.template; context: { $implicit: col, rowData: row, rowIndex: getItemIndex(i)}\"></ng-container>\n    </td>\n  </tr>\n  </tbody>\n</table>\n\n<div *ngIf=\"(!!draggableItems && draggableItems.length === 0) || !draggableItems\"\n     class=\"empty-state-placeholder\">\n  <ng-container *ngTemplateOutlet=\"emptyStateTemplate\"></ng-container>\n</div>\n\n<p-paginator *ngIf=\"paginator\" [rows]=\"rows\" [totalRecords]=\"value ? value.length : 0\"\n             [rowsPerPageOptions]=\"rowsPerPageOptions\" (onPageChange)=\"paginate($event)\">\n</p-paginator>\n\n<div #draggable [hidden]=\"dragModeOff\"\n     [ngClass]=\"{ 'multiple-drag-and-drop' : (multipleDragAndDrop && selectedIndexes.length > 1) }\"\n     (mouseup)=\"onMouseUp()\" (mousemove)=\"onMouseMove($event)\">\n  <span *ngIf=\"multipleDragAndDrop && selectedIndexes.length > 1\" class=\"selected-items-counter\">{{selectedIndexes.length}}</span>\n  <ng-container *ngTemplateOutlet=\"draggableViewTemplate; context: {currentDraggableItem: currentDraggableItem}\">\n  </ng-container>\n</div>\n",
                    styles: ["table{width:100%;text-align:left;table-layout:fixed;border-collapse:collapse}table thead{border:1px solid #d9d9d9;border-left:none;border-right:none}table thead tr{height:32px;color:#999}table tbody{overflow:auto}table tbody tr{height:70px;background:#fff;color:#999}table tr{border:1px solid #d9d9d9;color:#333;border-left:none;border-right:none}.open{opacity:.5}.hovered{background-color:#ebebeb!important;text-indent:-9999px;border:none!important}.draggable-row-icon{display:none;width:4px;height:4px;border-radius:2px;background-color:#ccc;margin:4px 0 4px 7px}.draggable-row-check-box,.draggable-row-icon-placeholder,.draggable-row-index{width:15px}.draggable-row-check-box{width:44px}.draggable-row{cursor:-webkit-grab;cursor:grab}.onDragMode .draggable-row{cursor:-webkit-grabbing;cursor:grabbing}.draggable-row:hover .draggable-row-icon{display:block}.onDragMode .draggable-row:hover .draggable-row-icon{display:none}.fadeIn{-webkit-animation-name:fadeIn;animation-name:fadeIn;-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-fill-mode:both;animation-fill-mode:both}.multiple-drag-and-drop{box-shadow:5px 5px 0 0 #fff,7px 7px 8px 0 rgba(50,50,50,.38);border-radius:2px}.selected-items-counter{z-index:1;width:20px;height:20px;background:#00a784;display:block;border-radius:10px;color:#fff;text-align:center;position:absolute;top:-10px;right:-10px;font-size:small;line-height:150%;font-weight:700}.empty-state-placeholder{text-align:center}@-webkit-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@keyframes fadeIn{0%{opacity:0}100%{opacity:1}}"]
                },] },
    ];
    /** @nocollapse */
    DraggableDataTableComponent.ctorParameters = function () { return [
        { type: Renderer2 }
    ]; };
    DraggableDataTableComponent.propDecorators = {
        emptyStateTemplate: [{ type: Input }],
        draggableViewTemplate: [{ type: Input }],
        valueChange: [{ type: Output }],
        draggableElement: [{ type: ViewChild, args: ['draggable',] }],
        tableBody: [{ type: ViewChild, args: ['tableBody',] }],
        cols: [{ type: ContentChildren, args: [ColumnComponent,] }],
        value: [{ type: Input }],
        unDraggableFromTop: [{ type: Input }],
        unDraggableFromBottom: [{ type: Input }],
        rowTrackBy: [{ type: Input }],
        columnTrackBy: [{ type: Input }],
        paginator: [{ type: Input }],
        rows: [{ type: Input }],
        rowsPerPageOptions: [{ type: Input }],
        showIndex: [{ type: Input }],
        multipleDragAndDrop: [{ type: Input }],
        selectable: [{ type: Input }],
        selectionChange: [{ type: Output }],
        pageChange: [{ type: Output }]
    };
    return DraggableDataTableComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DraggableDataTableModule = /** @class */ (function () {
    function DraggableDataTableModule() {
    }
    DraggableDataTableModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        CheckboxModule,
                        PaginatorModule
                    ],
                    declarations: [
                        DraggableDataTableComponent,
                        ColumnComponent
                    ],
                    exports: [
                        DraggableDataTableComponent,
                        ColumnComponent
                    ],
                    providers: []
                },] },
    ];
    return DraggableDataTableModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var DROPDOWN_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return DropdownComponent; }),
    multi: true
};
var DropdownComponent = /** @class */ (function (_super) {
    __extends(DropdownComponent, _super);
    function DropdownComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} event
     * @param {?} option
     * @return {?}
     */
    DropdownComponent.prototype.onItemClick = /**
     * @param {?} event
     * @param {?} option
     * @return {?}
     */
    function (event, option) {
        if (!option['disabled']) {
            _super.prototype.onItemClick.call(this, event, option);
        }
        else {
            event.stopPropagation();
        }
    };
    /**
     * @param {?} event
     * @param {?} option
     * @return {?}
     */
    DropdownComponent.prototype.selectItem = /**
     * @param {?} event
     * @param {?} option
     * @return {?}
     */
    function (event, option) {
        if (!option['disabled']) {
            _super.prototype.selectItem.call(this, event, option);
        }
        else {
            event.stopPropagation();
        }
    };
    DropdownComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kDropdown',
                    template: "<div #container [ngClass]=\"{'ui-dropdown ui-widget ui-state-default ui-corner-all ui-helper-clearfix':true,\n            'ui-state-disabled':disabled,'ui-dropdown-open':overlayVisible,'ui-state-focus':focused, 'ui-dropdown-clearable': showClear && !disabled}\"\n     (click)=\"onMouseclick($event)\" [ngStyle]=\"style\" [class]=\"styleClass\">\n  <div class=\"ui-helper-hidden-accessible\" *ngIf=\"autoWidth\">\n    <select [required]=\"required\" [attr.name]=\"name\" [attr.aria-label]=\"selectedOption ? selectedOption.label : ' '\" tabindex=\"-1\" aria-hidden=\"true\">\n      <option *ngIf=\"placeholder\">{{placeholder}}</option>\n      <ng-container *ngIf=\"group\">\n        <optgroup *ngFor=\"let option of options\" [attr.label]=\"option.label\">\n          <option *ngFor=\"let option of option.items\" [value]=\"option.value\" [selected]=\"selectedOption == option\">{{option.label}}</option>\n          <optgroup>\n      </ng-container>\n      <ng-container *ngIf=\"!group\">\n        <option *ngFor=\"let option of options\" [value]=\"option.value\" [selected]=\"selectedOption == option\">{{option.label}}</option>\n      </ng-container>\n    </select>\n  </div>\n  <div class=\"ui-helper-hidden-accessible\">\n    <input #in [attr.id]=\"inputId\" type=\"text\" [attr.aria-label]=\"selectedOption ? selectedOption.label : ' '\" readonly (focus)=\"onInputFocus($event)\" role=\"listbox\"\n           (blur)=\"onInputBlur($event)\" (keydown)=\"onKeydown($event, true)\" [disabled]=\"disabled\" [attr.tabindex]=\"tabindex\" [attr.autofocus]=\"autofocus\">\n  </div>\n  <label [ngClass]=\"{'ui-dropdown-label ui-inputtext ui-corner-all':true,'ui-dropdown-label-empty':(label == null || label.length === 0)}\" *ngIf=\"!editable && (label != null)\">\n    <ng-container *ngIf=\"!selectedItemTemplate\">{{label||'empty'}}</ng-container>\n    <ng-container *ngTemplateOutlet=\"selectedItemTemplate; context: {$implicit: selectedOption}\"></ng-container>\n  </label>\n  <label [ngClass]=\"{'ui-dropdown-label ui-inputtext ui-corner-all ui-placeholder':true,'ui-dropdown-label-empty': (placeholder == null || placeholder.length === 0)}\" *ngIf=\"!editable && (label == null)\">{{placeholder||'empty'}}</label>\n  <input #editableInput type=\"text\" [attr.aria-label]=\"selectedOption ? selectedOption.label : ' '\" class=\"ui-dropdown-label ui-inputtext ui-corner-all\" *ngIf=\"editable\" [disabled]=\"disabled\" [attr.placeholder]=\"placeholder\"\n         (click)=\"onEditableInputClick($event)\" (input)=\"onEditableInputChange($event)\" (focus)=\"onEditableInputFocus($event)\" (blur)=\"onInputBlur($event)\">\n  <i class=\"ui-dropdown-clear-icon pi pi-times\" (click)=\"clear($event)\" *ngIf=\"value != null && showClear && !disabled\"></i>\n  <div class=\"ui-dropdown-trigger ui-state-default ui-corner-right\">\n    <span class=\"ui-dropdown-trigger-icon ui-clickable\" [ngClass]=\"dropdownIcon\"></span>\n  </div>\n  <div #panel [ngClass]=\"'ui-dropdown-panel ui-widget-content ui-corner-all ui-shadow'\" [@panelState]=\"overlayVisible ? 'visible' : 'hidden'\"\n       [style.display]=\"overlayVisible ? 'block' : 'none'\" [ngStyle]=\"panelStyle\" [class]=\"panelStyleClass\">\n    <div *ngIf=\"filter\" class=\"ui-dropdown-filter-container\" (input)=\"onFilter($event)\" (click)=\"$event.stopPropagation()\">\n      <input #filter type=\"text\" autocomplete=\"off\" class=\"ui-dropdown-filter ui-inputtext ui-widget ui-state-default ui-corner-all\" [attr.placeholder]=\"filterPlaceholder\"\n             (keydown.enter)=\"$event.preventDefault()\" (keydown)=\"onKeydown($event, false)\">\n      <span class=\"ui-dropdown-filter-icon pi pi-search\"></span>\n    </div>\n    <div #itemswrapper class=\"ui-dropdown-items-wrapper\" [style.max-height]=\"scrollHeight||'auto'\">\n      <ul class=\"ui-dropdown-items ui-dropdown-list ui-widget-content ui-widget ui-corner-all ui-helper-reset\">\n        <ng-container *ngIf=\"group\">\n          <ng-template ngFor let-optgroup [ngForOf]=\"optionsToDisplay\">\n            <li class=\"ui-dropdown-item-group\">\n              <span *ngIf=\"!groupTemplate\">{{optgroup.label||'empty'}}</span>\n              <ng-container *ngTemplateOutlet=\"groupTemplate; context: {$implicit: optgroup}\"></ng-container>\n            </li>\n            <ng-container *ngTemplateOutlet=\"itemslist; context: {$implicit: optgroup.items, selectedOption: selectedOption}\"></ng-container>\n          </ng-template>\n        </ng-container>\n        <ng-container *ngIf=\"!group\">\n          <ng-container *ngTemplateOutlet=\"itemslist; context: {$implicit: optionsToDisplay, selectedOption: selectedOption}\"></ng-container>\n        </ng-container>\n        <ng-template #itemslist let-options let-selectedOption=\"selectedOption\">\n          <li *ngFor=\"let option of options;let i=index\"\n              [ngClass]=\"{\n                'ui-dropdown-item ui-corner-all':true,\n                'ui-state-highlight':(selectedOption == option),\n                'ui-dropdown-item-empty':!option.label||option.label.length === 0,\n                'ui-state-disabled': option.disabled\n              }\"\n              (click)=\"onItemClick($event, option)\">\n            <span *ngIf=\"!itemTemplate\">{{option.label||'empty'}}</span>\n            <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: option}\"></ng-container>\n          </li>\n        </ng-template>\n        <li *ngIf=\"filter && optionsToDisplay && optionsToDisplay.length === 0\">{{emptyFilterMessage}}</li>\n      </ul>\n    </div>\n  </div>\n</div>\n",
                    styles: [".ui-dropdown{display:inline-block;position:relative;cursor:pointer;vertical-align:middle}.ui-dropdown .ui-dropdown-clear-icon{position:absolute;top:50%;font-size:.75em;height:1em;margin-top:-.5em;right:2.5em}.ui-dropdown .ui-dropdown-trigger{border-right:none;border-top:none;border-bottom:none;cursor:pointer;width:1.5em;height:100%;position:absolute;right:0;top:0;padding:0 .25em}.ui-dropdown .ui-dropdown-trigger .ui-dropdown-trigger-icon{top:50%;left:50%;margin-top:-.5em;margin-left:-.5em;position:absolute}.ui-dropdown .ui-dropdown-label{display:block;border:none;white-space:nowrap;overflow:hidden;font-weight:400;width:100%;padding-right:2.5em}.ui-dropdown-item-empty,.ui-dropdown-label-empty{text-indent:-9999px;overflow:hidden}.ui-state-disabled{opacity:.6;cursor:default}.ui-dropdown.ui-state-disabled .ui-dropdown-label,.ui-dropdown.ui-state-disabled .ui-dropdown-trigger{cursor:default}.ui-dropdown label.ui-dropdown-label{cursor:pointer}.ui-dropdown input.ui-dropdown-label{cursor:default}.ui-dropdown .ui-dropdown-panel{min-width:100%}.ui-dropdown-panel{position:absolute;height:auto;display:none}.ui-dropdown-panel .ui-dropdown-items-wrapper{overflow:auto}.ui-dropdown-panel .ui-dropdown-item{font-weight:400;border:0;cursor:pointer;margin:1px 0;padding:.125em .25em;text-align:left}.ui-dropdown-panel .ui-dropdown-item-group{font-weight:700;cursor:default}.ui-dropdown-panel .ui-dropdown-list{padding:.4em;border:0}.ui-dropdown-panel .ui-dropdown-filter{width:100%;box-sizing:border-box;padding-right:1.5em}.ui-dropdown-panel .ui-dropdown-filter-container{position:relative;margin:0;padding:.4em;display:inline-block;width:100%}.ui-dropdown-panel .ui-dropdown-filter-container .ui-dropdown-filter-icon{position:absolute;top:.8em;right:1em}.ui-fluid .ui-dropdown{width:100%}"],
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
    return DropdownComponent;
}(Dropdown$1));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DropdownModule$1 = /** @class */ (function () {
    function DropdownModule$$1() {
    }
    DropdownModule$$1.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        DropdownModule
                    ],
                    declarations: [
                        DropdownComponent
                    ],
                    exports: [
                        DropdownComponent
                    ],
                    providers: []
                },] },
    ];
    return DropdownModule$$1;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { KalturaPrimeNgUIModule, KALTURA_AUTOCOMPLETE_VALUE_ACCESSOR, AutoComplete$1 as AutoComplete, AutoCompleteModule, DropdownCloseOnScroll, MenuCloseOnScroll, StickyDatatableHeaderDirective, CLEARABLE_INPUT_VALUE_ACCESSOR, ClearableInputComponent, ClearableInputModule, DynamicFormModule, KALTURA_SLIDER_VALUE_ACCESSOR, SliderComponent, SliderModule$1 as SliderModule, SPINNER_VALUE_ACCESSOR, TimeSpinnerComponent, TimeSpinnerModule, KPSortableColumn, KPTableModule, KALTURA_MULTISELECT_VALUE_ACCESSOR, MultiSelectComponent, MultiSelectModule$1 as MultiSelectModule, DraggableDataTableComponent, DraggableDataTableModule, DropdownModule$1 as DropdownModule, HighlightPipe as ɵa, IsSuggestionDisabledPipe as ɵb, ColumnComponent as ɵf, DROPDOWN_VALUE_ACCESSOR as ɵg, DropdownComponent as ɵh, PrimeControl as ɵd, PrimeListOptionsPipe as ɵe, MultiSelectItem as ɵc };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2FsdHVyYS1uZy1rYWx0dXJhLXByaW1lbmctdWkuanMubWFwIiwic291cmNlcyI6WyJuZzovL0BrYWx0dXJhLW5nL2thbHR1cmEtcHJpbWVuZy11aS9saWIvZGlyZWN0aXZlcy9zdGlja3ktZGF0YXRhYmxlLWhlYWRlci5kaXJlY3RpdmUudHMiLCJuZzovL0BrYWx0dXJhLW5nL2thbHR1cmEtcHJpbWVuZy11aS9saWIvZGlyZWN0aXZlcy9kcm9wZG93bi1jbG9zZS1vbi1zY3JvbGwudHMiLCJuZzovL0BrYWx0dXJhLW5nL2thbHR1cmEtcHJpbWVuZy11aS9saWIvZGlyZWN0aXZlcy9tZW51LWNsb3NlLW9uLXNjcm9sbC50cyIsIm5nOi8vQGthbHR1cmEtbmcva2FsdHVyYS1wcmltZW5nLXVpL2xpYi9rYWx0dXJhLXByaW1lbmctdWkubW9kdWxlLnRzIiwibmc6Ly9Aa2FsdHVyYS1uZy9rYWx0dXJhLXByaW1lbmctdWkvbGliL2F1dG8tY29tcGxldGUvYXV0by1jb21wbGV0ZS5jb21wb25lbnQudHMiLCJuZzovL0BrYWx0dXJhLW5nL2thbHR1cmEtcHJpbWVuZy11aS9saWIvYXV0by1jb21wbGV0ZS9oaWdobGlnaHQucGlwZS50cyIsIm5nOi8vQGthbHR1cmEtbmcva2FsdHVyYS1wcmltZW5nLXVpL2xpYi9hdXRvLWNvbXBsZXRlL2lzLXN1Z2dlc3Rpb24tZGlzYWJsZWQucGlwZS50cyIsIm5nOi8vQGthbHR1cmEtbmcva2FsdHVyYS1wcmltZW5nLXVpL2xpYi9hdXRvLWNvbXBsZXRlL2F1dG8tY29tcGxldGUubW9kdWxlLnRzIiwibmc6Ly9Aa2FsdHVyYS1uZy9rYWx0dXJhLXByaW1lbmctdWkvbGliL2NsZWFyYWJsZS1pbnB1dC9jbGVhcmFibGUtaW5wdXQuY29tcG9uZW50LnRzIiwibmc6Ly9Aa2FsdHVyYS1uZy9rYWx0dXJhLXByaW1lbmctdWkvbGliL2NsZWFyYWJsZS1pbnB1dC9jbGVhcmFibGUtaW5wdXQubW9kdWxlLnRzIiwibmc6Ly9Aa2FsdHVyYS1uZy9rYWx0dXJhLXByaW1lbmctdWkvbGliL2R5bmFtaWMtZm9ybS9wcmltZS1jb250cm9sLmNvbXBvbmVudC50cyIsIm5nOi8vQGthbHR1cmEtbmcva2FsdHVyYS1wcmltZW5nLXVpL2xpYi9keW5hbWljLWZvcm0vcHJpbWUtbGlzdC1vcHRpb25zLnBpcGUudHMiLCJuZzovL0BrYWx0dXJhLW5nL2thbHR1cmEtcHJpbWVuZy11aS9saWIvbXVsdGktc2VsZWN0L211bHRpLXNlbGVjdC5jb21wb25lbnQudHMiLCJuZzovL0BrYWx0dXJhLW5nL2thbHR1cmEtcHJpbWVuZy11aS9saWIvbXVsdGktc2VsZWN0L211bHRpLXNlbGVjdC1pdGVtLmNvbXBvbmVudC50cyIsIm5nOi8vQGthbHR1cmEtbmcva2FsdHVyYS1wcmltZW5nLXVpL2xpYi9tdWx0aS1zZWxlY3QvbXVsdGktc2VsZWN0Lm1vZHVsZS50cyIsIm5nOi8vQGthbHR1cmEtbmcva2FsdHVyYS1wcmltZW5nLXVpL2xpYi9keW5hbWljLWZvcm0vZHluYW1pYy1mb3JtLm1vZHVsZS50cyIsIm5nOi8vQGthbHR1cmEtbmcva2FsdHVyYS1wcmltZW5nLXVpL2xpYi9zbGlkZXIvc2xpZGVyLmNvbXBvbmVudC50cyIsIm5nOi8vQGthbHR1cmEtbmcva2FsdHVyYS1wcmltZW5nLXVpL2xpYi9zbGlkZXIvc2xpZGVyLm1vZHVsZS50cyIsIm5nOi8vQGthbHR1cmEtbmcva2FsdHVyYS1wcmltZW5nLXVpL2xpYi90aW1lLXNwaW5uZXIvdGltZS1zcGlubmVyLmNvbXBvbmVudC50cyIsIm5nOi8vQGthbHR1cmEtbmcva2FsdHVyYS1wcmltZW5nLXVpL2xpYi90aW1lLXNwaW5uZXIvdGltZS1zcGlubmVyLm1vZHVsZS50cyIsIm5nOi8vQGthbHR1cmEtbmcva2FsdHVyYS1wcmltZW5nLXVpL2xpYi9rLXAtdGFibGUvay1wLXNvcnRhYmxlLWNvbHVtbi50cyIsIm5nOi8vQGthbHR1cmEtbmcva2FsdHVyYS1wcmltZW5nLXVpL2xpYi9rLXAtdGFibGUvay1wLXRhYmxlLm1vZHVsZS50cyIsIm5nOi8vQGthbHR1cmEtbmcva2FsdHVyYS1wcmltZW5nLXVpL2xpYi9kcmFnZ2FibGUtZGF0YS10YWJsZS9jb2x1bW4uY29tcG9uZW50LnRzIiwibmc6Ly9Aa2FsdHVyYS1uZy9rYWx0dXJhLXByaW1lbmctdWkvbGliL2RyYWdnYWJsZS1kYXRhLXRhYmxlL2RyYWdnYWJsZS1kYXRhLXRhYmxlLmNvbXBvbmVudC50cyIsIm5nOi8vQGthbHR1cmEtbmcva2FsdHVyYS1wcmltZW5nLXVpL2xpYi9kcmFnZ2FibGUtZGF0YS10YWJsZS9kcmFnZ2FibGUtZGF0YS10YWJsZS5tb2R1bGUudHMiLCJuZzovL0BrYWx0dXJhLW5nL2thbHR1cmEtcHJpbWVuZy11aS9saWIvZHJvcGRvd24vZHJvcGRvd24uY29tcG9uZW50LnRzIiwibmc6Ly9Aa2FsdHVyYS1uZy9rYWx0dXJhLXByaW1lbmctdWkvbGliL2Ryb3Bkb3duL2Ryb3Bkb3duLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFJlbmRlcmVyLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdGlja3lTY3JvbGxTZXJ2aWNlIH0gZnJvbSAnQGthbHR1cmEtbmcva2FsdHVyYS11aSc7XG5pbXBvcnQgeyBTdGlja3lEaXJlY3RpdmUgfSBmcm9tICdAa2FsdHVyYS1uZy9rYWx0dXJhLXVpJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdba1N0aWNreUhlYWRlcl0nXG59KVxuXG5leHBvcnQgY2xhc3MgU3RpY2t5RGF0YXRhYmxlSGVhZGVyRGlyZWN0aXZlIGV4dGVuZHMgU3RpY2t5RGlyZWN0aXZlIHtcblxuICAgIHByaXZhdGUgX2RhdGFUYWJsZVJlZjogRWxlbWVudFJlZjtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmLCByZW5kZXJlcjogUmVuZGVyZXIsIF9zdGlja3lTY3JvbGxTZXJ2aWNlOiBTdGlja3lTY3JvbGxTZXJ2aWNlKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYsIHJlbmRlcmVyLCBfc3RpY2t5U2Nyb2xsU2VydmljZSk7XG4gICAgICAgIHRoaXMuX2RhdGFUYWJsZVJlZiA9IGVsZW1lbnRSZWY7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9nZXRTdGlja3lFbGVtZW50KGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIDphbnl7XG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnVpLXRhYmxlLXNjcm9sbGFibGUtaGVhZGVyLWJveCwudWktZGF0YXRhYmxlLXNjcm9sbGFibGUtaGVhZGVyLWJveCcpO1xuXG4gICAgICAgIGlmIChoZWFkZXJzICYmIGhlYWRlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJnb3QgcHJpbWVuZyB0YWJsZSBoZWFkZXIhXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGhlYWRlcnNbMF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJmYWlsZWQgdG8gZXh0cmFjdCB0YWJsZSBoZWFkZXIgKGRpZCB5b3Ugc2V0IHRoZSBwcmltZSB0YWJsZSB3aXRoIGhlYWRlciBhbmQgc2V0IGl0IHRvIHNjcm9sbGFibGU/KVwiKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9vblN0aWNreSgpOnZvaWR7XG4gICAgICAgIHRoaXMudXBkYXRlSGVhZGVyU2l6ZSgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfb25VbnNldFN0aWNreSgpOnZvaWR7XG4gICAgICAgIHRoaXMuX3N0aWNreUVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnc3RhdGljJztcbiAgICAgICAgdGhpcy5fc3RpY2t5RWxlbWVudC5zdHlsZS53aWR0aCA9ICdhdXRvJztcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25SZXNpemUoKTp2b2lke1xuICAgICAgICB0aGlzLnVwZGF0ZUhlYWRlclNpemUoKTtcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSB1cGRhdGVIZWFkZXJTaXplKCl7XG4gICAgICAgIGlmICh0aGlzLmlzU3RpY2t5KSB7XG4gICAgICAgICAgICBjb25zdCBib3VuZGluZ0NsaWVudFJlY3Q6IGFueSA9IHRoaXMuX2RhdGFUYWJsZVJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgY29uc3QgdGFibGVXaWR0aCA9IGJvdW5kaW5nQ2xpZW50UmVjdFsncmlnaHQnXSAtIGJvdW5kaW5nQ2xpZW50UmVjdFsnbGVmdCddO1xuICAgICAgICAgICAgdGhpcy5fc3RpY2t5RWxlbWVudC5zdHlsZS53aWR0aCA9IHRhYmxlV2lkdGggKyAncHgnO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgQ29udGVudENoaWxkLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRHJvcGRvd24gfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xuaW1wb3J0IHsgSVN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcblxuQERpcmVjdGl2ZSh7XG5cdHNlbGVjdG9yOiAnW2tEcm9wZG93bkNsb3NlT25TY3JvbGxdJyxcbn0pXG5leHBvcnQgY2xhc3MgRHJvcGRvd25DbG9zZU9uU2Nyb2xsIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuXHRASW5wdXQoKSBzY3JvbGxUYXJnZXQ6IGFueTtcblx0QENvbnRlbnRDaGlsZChEcm9wZG93bikgcHVibGljIGRyb3Bkb3duOiBEcm9wZG93bjtcblxuXHRwcml2YXRlIF9yZWdpc3RlcmVkID0gZmFsc2U7XG5cdHByaXZhdGUgX2Ryb3Bkb3duQ2hhbmdlc1N1YnNjcmlwdGlvbjogSVN1YnNjcmlwdGlvbjtcblx0cHJpdmF0ZSBfY2xvc2VEcm9wZG93bkZ1bmMgPSB0aGlzLmNsb3NlRHJvcGRvd24uYmluZCh0aGlzKTtcblx0cHJpdmF0ZSBfaXNEZXN0cm95ZWQgPSBmYWxzZTtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0fVxuXG5cdG5nQWZ0ZXJWaWV3SW5pdCgpIHtcblx0XHR0aGlzLmRyb3Bkb3duLmVsLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xuXHRcdFx0dGhpcy5oYW5kbGVTY3JvbGxSZWdpc3RyYXRpb24oKTtcblx0XHR9KTtcblx0XHR0aGlzLl9kcm9wZG93bkNoYW5nZXNTdWJzY3JpcHRpb24gPSB0aGlzLmRyb3Bkb3duLm9uQ2hhbmdlLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcblx0XHRcdHRoaXMuaGFuZGxlU2Nyb2xsUmVnaXN0cmF0aW9uKCk7XG5cdFx0fSk7XG5cdH1cblxuXHRoYW5kbGVTY3JvbGxSZWdpc3RyYXRpb24oKTp2b2lke1xuXHRcdGlmICh0aGlzLnNjcm9sbFRhcmdldCAmJiB0aGlzLmRyb3Bkb3duKXtcblx0XHRcdHNldFRpbWVvdXQoKCk9Pntcblx0XHRcdFx0aWYgKCF0aGlzLl9pc0Rlc3Ryb3llZCkge1xuXHRcdFx0XHRcdGlmICh0aGlzLmRyb3Bkb3duLm92ZXJsYXlWaXNpYmxlICYmICF0aGlzLl9yZWdpc3RlcmVkKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnNjcm9sbFRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9jbG9zZURyb3Bkb3duRnVuYyk7XG5cdFx0XHRcdFx0XHR0aGlzLl9yZWdpc3RlcmVkID0gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKCF0aGlzLmRyb3Bkb3duLm92ZXJsYXlWaXNpYmxlICYmIHRoaXMuX3JlZ2lzdGVyZWQpIHtcblx0XHRcdFx0XHRcdHRoaXMuc2Nyb2xsVGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuX2Nsb3NlRHJvcGRvd25GdW5jKTtcblx0XHRcdFx0XHRcdHRoaXMuX3JlZ2lzdGVyZWQgPSBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sMCk7XG5cdFx0fVxuXHR9XG5cblx0bmdPbkRlc3Ryb3koKSB7XG5cdFx0aWYgKHRoaXMuc2Nyb2xsVGFyZ2V0ICYmIHRoaXMuX3JlZ2lzdGVyZWQpIHtcblx0XHRcdHRoaXMuc2Nyb2xsVGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuX2Nsb3NlRHJvcGRvd25GdW5jKTtcblx0XHR9XG5cdFx0aWYgKHRoaXMuX2Ryb3Bkb3duQ2hhbmdlc1N1YnNjcmlwdGlvbil7XG5cdFx0XHR0aGlzLl9kcm9wZG93bkNoYW5nZXNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcblx0XHRcdHRoaXMuX2Ryb3Bkb3duQ2hhbmdlc1N1YnNjcmlwdGlvbiA9IG51bGw7XG5cdFx0fVxuXHRcdHRoaXMuX2lzRGVzdHJveWVkID0gdHJ1ZTtcblx0fVxuXG5cdHByaXZhdGUgY2xvc2VEcm9wZG93bigpOnZvaWR7XG5cdFx0aWYgKHRoaXMuZHJvcGRvd24gJiYgdHlwZW9mIHRoaXMuZHJvcGRvd24uaGlkZSAhPT0gXCJ1bmRlZmluZWRcIil7XG5cdFx0XHR0aGlzLmRyb3Bkb3duLmhpZGUoKTtcblx0XHRcdHRoaXMuc2Nyb2xsVGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuX2Nsb3NlRHJvcGRvd25GdW5jKTtcblx0XHRcdHRoaXMuX3JlZ2lzdGVyZWQgPSBmYWxzZTtcblx0XHR9XG5cdH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgQ29udGVudENoaWxkLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWVudSwgVGllcmVkTWVudSB9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XG5cbkBEaXJlY3RpdmUoe1xuXHRzZWxlY3RvcjogJ1trTWVudUNsb3NlT25TY3JvbGxdJyxcbn0pXG5leHBvcnQgY2xhc3MgTWVudUNsb3NlT25TY3JvbGwge1xuXHRwcml2YXRlICBfbWVudTogTWVudSB8IFRpZXJlZE1lbnU7XG5cblx0Y29uc3RydWN0b3IoQE9wdGlvbmFsKCkgbWVudTogTWVudSwgQE9wdGlvbmFsKCkgdGllcmVkTWVudTogVGllcmVkTWVudSlcblx0e1xuICAgICAgICB0aGlzLl9tZW51ID0gbWVudSB8fCB0aWVyZWRNZW51O1xuXHR9XG5cblx0QEhvc3RMaXN0ZW5lcihcIndpbmRvdzpzY3JvbGxcIiwgW10pXG5cdG9uV2luZG93U2Nyb2xsKCkge1xuXHRcdHRoaXMuY2xvc2VNZW51KCk7XG5cdH1cblxuXHRwcml2YXRlIGNsb3NlTWVudSgpOnZvaWQge1xuICAgICAgICBpZiAodGhpcy5fbWVudSAmJiB0eXBlb2YgdGhpcy5fbWVudS5oaWRlICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB0aGlzLl9tZW51LmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSW5wdXRUZXh0TW9kdWxlLCBNZW51TW9kdWxlIH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcbmltcG9ydCB7IFN0aWNreURhdGF0YWJsZUhlYWRlckRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9zdGlja3ktZGF0YXRhYmxlLWhlYWRlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRHJvcGRvd25DbG9zZU9uU2Nyb2xsIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2Ryb3Bkb3duLWNsb3NlLW9uLXNjcm9sbCc7XG5pbXBvcnQgeyBNZW51Q2xvc2VPblNjcm9sbCB9IGZyb20gJy4vZGlyZWN0aXZlcy9tZW51LWNsb3NlLW9uLXNjcm9sbCc7XG5pbXBvcnQgeyBLYWx0dXJhQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGthbHR1cmEtbmcva2FsdHVyYS1jb21tb24nO1xuXG4vKipcbiAqIEBkZXByZWNhdGVkIHVzZSBzZXBhcmF0ZWQgbW9kdWxlIGZvciBlYWNoIGNvbXBvbmVudFxuICovXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IDxhbnlbXT5bXG4gICAgICAgIENvbW1vbk1vZHVsZSwgSW5wdXRUZXh0TW9kdWxlLCBNZW51TW9kdWxlLCBLYWx0dXJhQ29tbW9uTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IDxhbnlbXT5bXG5cdCAgICBTdGlja3lEYXRhdGFibGVIZWFkZXJEaXJlY3RpdmUsXG4gICAgICAgIERyb3Bkb3duQ2xvc2VPblNjcm9sbCxcbiAgICAgICAgTWVudUNsb3NlT25TY3JvbGxcbiAgICBdLFxuICAgIGV4cG9ydHM6IDxhbnlbXT5bXG5cdCAgICBTdGlja3lEYXRhdGFibGVIZWFkZXJEaXJlY3RpdmUsXG4gICAgICAgIERyb3Bkb3duQ2xvc2VPblNjcm9sbCxcbiAgICAgICAgTWVudUNsb3NlT25TY3JvbGxcbiAgICBdLFxuICAgIHByb3ZpZGVyczogPGFueVtdPltcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEthbHR1cmFQcmltZU5nVUlNb2R1bGUge31cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgZm9yd2FyZFJlZixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIEFmdGVyVmlld0NoZWNrZWQsXG4gIElucHV0LFxuICBFbGVtZW50UmVmLFxuICBPbkRlc3Ryb3ksXG4gIFJlbmRlcmVyMixcbiAgSXRlcmFibGVEaWZmZXJzLFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgVmlld0NoaWxkLFxuICBIb3N0TGlzdGVuZXIsIEFmdGVyQ29udGVudEluaXQsIERvQ2hlY2tcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge3RyaWdnZXIsc3RhdGUsc3R5bGUsdHJhbnNpdGlvbixhbmltYXRlLEFuaW1hdGlvbkV2ZW50fSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgSVN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IEF1dG9Db21wbGV0ZSBhcyBQcmltZUF1dG9Db21wbGV0ZSwgQVVUT0NPTVBMRVRFX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSBcInByaW1lbmcvY29tcG9uZW50cy9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlXCI7XG5pbXBvcnQgeyBLYWx0dXJhQnJvd3NlclV0aWxzLCBCcm93c2VyTmFtZXMgfSBmcm9tICdAa2FsdHVyYS1uZy9rYWx0dXJhLXVpJztcbmltcG9ydCB7IERvbUhhbmRsZXIgfSBmcm9tIFwicHJpbWVuZy9jb21wb25lbnRzL2RvbS9kb21oYW5kbGVyXCI7XG5pbXBvcnQgeyBPYmplY3RVdGlscyB9IGZyb20gJ3ByaW1lbmcvY29tcG9uZW50cy91dGlscy9vYmplY3R1dGlscyc7XG5pbXBvcnQge05HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG4vLyBba21jbmddIHVwb24gdXBncmFkZTogQmUgcGF0aWVudCBhbmQgYnJpbmcgYSBiaWcgY3VwIG9mIGNvZmZlZS4uLi4gZ29vZCBsdWNrIVxuXG5leHBvcnQgaW50ZXJmYWNlIFN1Z2dlc3Rpb25zUHJvdmlkZXJEYXRhe1xuICAgIHN1Z2dlc3Rpb25zIDogYW55W107XG4gICAgaXNMb2FkaW5nIDogYm9vbGVhbjtcbiAgICBlcnJvck1lc3NhZ2U/IDogc3RyaW5nO1xufVxuXG4vKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuZXhwb3J0IGNvbnN0IEtBTFRVUkFfQVVUT0NPTVBMRVRFX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQXV0b0NvbXBsZXRlKSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuLyogdHNsaW50OmVuYWJsZSAqL1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2tBdXRvQ29tcGxldGUnLFxuXG4gICAgLyogdHNsaW50OmRpc2FibGUgKi9cbiAgICAvLyBba21jbmddIHVwb24gdXBncmFkZTogc3luYyB3aXRoIG9yaWdpbmFsIGNvbXBvbmVudFxuICAgIHN0eWxlczogW2A6aG9zdCAvZGVlcC8gLnVpLWF1dG9jb21wbGV0ZS10b2tlbi1sYWJlbHt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7Zm9udC1zaXplOjE0cHh9QG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDo5OTFweCl7Omhvc3QgL2RlZXAvIC51aS1hdXRvY29tcGxldGUtdG9rZW4tbGFiZWx7bWF4LXdpZHRoOjI3MHB4fX1AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOjk5MnB4KXs6aG9zdCAvZGVlcC8gLnVpLWF1dG9jb21wbGV0ZS10b2tlbi1sYWJlbHttYXgtd2lkdGg6MjcwcHh9fUBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6MTI4MHB4KXs6aG9zdCAvZGVlcC8gLnVpLWF1dG9jb21wbGV0ZS10b2tlbi1sYWJlbHttYXgtd2lkdGg6NTAwcHh9fUBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6MTYwMHB4KXs6aG9zdCAvZGVlcC8gLnVpLWF1dG9jb21wbGV0ZS10b2tlbi1sYWJlbHttYXgtd2lkdGg6ODAwcHh9fTpob3N0IC9kZWVwLyAua0hpZ2hsaWdodGVkVGV4dHt0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lfWBdLFxuICAgIHRlbXBsYXRlOiBgPHNwYW4gW25nQ2xhc3NdPVwieyd1aS1hdXRvY29tcGxldGUgdWktd2lkZ2V0IGtPdmVycmlkZUZBSWNvbnMnOnRydWUsJ3VpLWF1dG9jb21wbGV0ZS1kZCc6ZHJvcGRvd24sJ3VpLWF1dG9jb21wbGV0ZS1tdWx0aXBsZSc6bXVsdGlwbGV9XCJcbiAgICAgIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cbiAgICAgICAgICAgIDxpbnB1dCAqbmdJZj1cIiFtdWx0aXBsZVwiICNpbiBbYXR0ci50eXBlXT1cInR5cGVcIiBbYXR0ci5pZF09XCJpbnB1dElkXCIgW25nU3R5bGVdPVwiaW5wdXRTdHlsZVwiXG4gICAgICAgICAgICAgICAgICAgW2NsYXNzXT1cImlucHV0U3R5bGVDbGFzc1wiIGF1dG9jb21wbGV0ZT1cIm9mZlwiIFthdHRyLnJlcXVpcmVkXT1cInJlcXVpcmVkXCJcbiAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCIndWktaW5wdXR0ZXh0IHVpLXdpZGdldCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGwgdWktYXV0b2NvbXBsZXRlLWlucHV0J1wiXG4gICAgICAgICAgICAgICAgICAgW3ZhbHVlXT1cImlucHV0RmllbGRWYWx1ZSA/IChmaWVsZCA/IE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEoaW5wdXRGaWVsZFZhbHVlLCBmaWVsZCkgfHwgaW5wdXRGaWVsZFZhbHVlIDogdmFsdWUpIDogbnVsbFwiXG4gICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uSW5wdXRDbGljaygkZXZlbnQpXCIgKGlucHV0KT1cIm9uSW5wdXQoJGV2ZW50KVwiIChrZXlkb3duKT1cIm9uS2V5ZG93bigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAoa2V5dXApPVwib25LZXl1cCgkZXZlbnQpXCIgKGZvY3VzKT1cIm9uSW5wdXRGb2N1cygkZXZlbnQpXCIgKGJsdXIpPVwib25JbnB1dEJsdXIoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgKGNoYW5nZSk9XCJvbklucHV0Q2hhbmdlKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgIFthdHRyLnBsYWNlaG9sZGVyXT1cIl9wbGFjZWhvbGRlclwiIFthdHRyLnNpemVdPVwic2l6ZVwiIFthdHRyLm1heGxlbmd0aF09XCJtYXhsZW5ndGhcIlxuICAgICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cInRhYmluZGV4XCIgW3JlYWRvbmx5XT1cInJlYWRvbmx5XCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgID48dWwgKm5nSWY9XCJtdWx0aXBsZVwiICNtdWx0aUNvbnRhaW5lclxuICAgICAgICAgICAgICAgICBjbGFzcz1cInVpLWF1dG9jb21wbGV0ZS1tdWx0aXBsZS1jb250YWluZXIgdWktd2lkZ2V0IHVpLWlucHV0dGV4dCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGxcIlxuICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWRpc2FibGVkJzpkaXNhYmxlZCwndWktc3RhdGUtZm9jdXMnOmZvY3VzfVwiIChjbGljayk9XCJtdWx0aUluLmZvY3VzKClcIj5cbiAgICAgICAgICAgICAgICA8bGkgI3Rva2VuICpuZ0Zvcj1cImxldCB2YWwgb2YgdmFsdWVcIiBbY2xhc3NdPVwiJ3VpLWF1dG9jb21wbGV0ZS10b2tlbiB1aS1zdGF0ZS1oaWdobGlnaHQgdWktY29ybmVyLWFsbCAnICsgKGNsYXNzRmllbGQgJiYgdmFsID8gdmFsW2NsYXNzRmllbGRdIDogJycpXCJcbiAgICAgICAgICAgICAgICAgICAgW2tUb29sdGlwXT1cInZhbFwiIFt0b29sdGlwUmVzb2x2ZXJdPVwidG9vbHRpcFJlc29sdmVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktYXV0b2NvbXBsZXRlLXRva2VuLWljb24gcGkgcGktZncgcGktdGltZXNcIiAoY2xpY2spPVwicmVtb3ZlSXRlbSh0b2tlbilcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cIiFkaXNhYmxlZFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCIhc2VsZWN0ZWRJdGVtVGVtcGxhdGVcIiBjbGFzcz1cInVpLWF1dG9jb21wbGV0ZS10b2tlbi1sYWJlbFwiIChjbGljayk9XCJvbkl0ZW1DbGljayh2YWwpXCI+e3tmaWVsZCA/IE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEodmFsLCBmaWVsZCk6IHZhbH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwic2VsZWN0ZWRJdGVtVGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IHZhbH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInVpLWF1dG9jb21wbGV0ZS1pbnB1dC10b2tlblwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgI211bHRpSW4gW2F0dHIudHlwZV09XCJ0eXBlXCIgW2F0dHIuaWRdPVwiaW5wdXRJZFwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5wbGFjZWhvbGRlcl09XCIodmFsdWUmJnZhbHVlLmxlbmd0aCA/IG51bGwgOiBfcGxhY2Vob2xkZXIpXCIgW2F0dHIudGFiaW5kZXhdPVwidGFiaW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKGlucHV0KT1cIm9uSW5wdXQoJGV2ZW50KVwiIChjbGljayk9XCJvbklucHV0Q2xpY2soJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bik9XCJvbktleWRvd24oJGV2ZW50KVwiIFtyZWFkb25seV09XCJyZWFkb25seVwiIChrZXl1cCk9XCJvbktleXVwKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKGZvY3VzKT1cIm9uSW5wdXRGb2N1cygkZXZlbnQpXCIgKGJsdXIpPVwib25JbnB1dEJsdXIoJGV2ZW50KVwiIChjaGFuZ2UpPVwib25JbnB1dENoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9jb21wbGV0ZT1cIm9mZlwiIFtuZ1N0eWxlXT1cImlucHV0U3R5bGVcIiBbY2xhc3NdPVwiaW5wdXRTdHlsZUNsYXNzXCI+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDwvdWxcbiAgICAgICAgICAgID48aSAqbmdJZj1cImxvYWRpbmdcIiBjbGFzcz1cInVpLWF1dG9jb21wbGV0ZS1sb2FkZXIgcGkgcGktc3Bpbm5lciBwaS1zcGluXCI+PC9pPjxidXR0b24gI2RkQnRuIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uPVwicGkgcGktZncgcGktY2FyZXQtZG93blwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ1aS1hdXRvY29tcGxldGUtZHJvcGRvd25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImhhbmRsZURyb3Bkb3duQ2xpY2soJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJkcm9wZG93blwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgPGRpdiAjcGFuZWwgY2xhc3M9XCJ1aS1hdXRvY29tcGxldGUtcGFuZWwgdWktd2lkZ2V0LWNvbnRlbnQgdWktY29ybmVyLWFsbCB1aS1zaGFkb3dcIlxuICAgICAgICAgICAgICAgICBbc3R5bGUuZGlzcGxheV09XCJvdmVybGF5VmlzaWJsZSA/ICdibG9jaycgOiAnbm9uZSdcIiBbc3R5bGUud2lkdGhdPVwiYXBwZW5kVG8gPyAnYXV0bycgOiAnMTAwJSdcIlxuICAgICAgICAgICAgICAgICBbc3R5bGUubWF4LWhlaWdodF09XCJzY3JvbGxIZWlnaHRcIiBbQG92ZXJsYXlBbmltYXRpb25dPVwiJ3Zpc2libGUnXCIgKEBvdmVybGF5QW5pbWF0aW9uLnN0YXJ0KT1cIm9uT3ZlcmxheUFuaW1hdGlvblN0YXJ0KCRldmVudClcIiAoQG92ZXJsYXlBbmltYXRpb24uZG9uZSk9XCJvbk92ZXJsYXlBbmltYXRpb25Eb25lKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAobW91c2VlbnRlcik9XCJvdmVybGF5SG92ZXJlZD10cnVlXCIgKG1vdXNlbGVhdmUpPVwib3ZlcmxheUhvdmVyZWQ9ZmFsc2VcIj5cbiAgICAgICAgICAgICAgICA8dWxcbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwidWktYXV0b2NvbXBsZXRlLWl0ZW1zIHVpLWF1dG9jb21wbGV0ZS1saXN0IHVpLXdpZGdldC1jb250ZW50IHVpLXdpZGdldCB1aS1jb3JuZXItYWxsIHVpLWhlbHBlci1yZXNldFwiXG4gICAgICAgICAgICAgICAgICAqbmdJZj1cIm92ZXJsYXlWaXNpYmxlXCI+XG4gICAgICAgICAgICAgICAgPGxpICpuZ0lmPVwiX2xvYWRpbmdcIiBjbGFzcz1cInVpLWF1dG9jb21wbGV0ZS1ub3RpZmljYXRpb24taXRlbVwiPlxuICAgICAgICAgICAgICAgIFNlYXJjaGluZy4uLlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDxsaSAqbmdJZj1cIl9zaG93Tm9JdGVtc1wiIGNsYXNzPVwidWktYXV0b2NvbXBsZXRlLW5vdGlmaWNhdGlvbi1pdGVtXCI+XG4gICAgICAgICAgICAgICAgTm8gSXRlbXMgRm91bmQuLi5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8bGkgKm5nSWY9XCJfZXJyb3JNZXNzYWdlXCIgY2xhc3M9XCJ1aS1hdXRvY29tcGxldGUtbm90aWZpY2F0aW9uLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICB7eyBfZXJyb3JNZXNzYWdlIH19XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGkgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBzdWdnZXN0aW9uczsgbGV0IGlkeCA9IGluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktYXV0b2NvbXBsZXRlLWxpc3QtaXRlbSB1aS1jb3JuZXItYWxsJzp0cnVlLCd1aS1zdGF0ZS1oaWdobGlnaHQnOihoaWdobGlnaHRPcHRpb249PW9wdGlvbil9XCJcbiAgICAgICAgICAgICAgICAgICAgW2NsYXNzLmtJc0l0ZW1EaXNhYmxlZF09XCJvcHRpb24gfCBrSXNTdWdnZXN0aW9uRGlzYWJsZWQgOiBzdWdnZXN0aW9uU2VsZWN0YWJsZUZpZWxkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChtb3VzZWVudGVyKT1cImhpZ2hsaWdodE9wdGlvbj1vcHRpb25cIiAobW91c2VsZWF2ZSk9XCJoaWdobGlnaHRPcHRpb249bnVsbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwic2VsZWN0SXRlbShvcHRpb24pXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIiFpdGVtVGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lubmVySFRNTF09XCJfZ2V0U3VnZ2VzdGlvblRleHQob3B0aW9uKSB8IGtIaWdobGlnaHQgOiBzZWFyY2hUZXh0XCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdUZW1wbGF0ZU91dGxldD1cIml0ZW1UZW1wbGF0ZTsgY29udGV4dDogeyRpbXBsaWNpdDogb3B0aW9uLCBpbmRleDogaWR4fVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGkgKm5nSWY9XCJub1Jlc3VsdHMgJiYgZW1wdHlNZXNzYWdlXCIgY2xhc3M9XCJ1aS1hdXRvY29tcGxldGUtbGlzdC1pdGVtIHVpLWNvcm5lci1hbGxcIj57e2VtcHR5TWVzc2FnZX19PC9saT5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvc3Bhbj5cbmAsXG4gICAgcHJvdmlkZXJzOiBbS0FMVFVSQV9BVVRPQ09NUExFVEVfVkFMVUVfQUNDRVNTT1JdLFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgIHRyaWdnZXIoJ292ZXJsYXlBbmltYXRpb24nLCBbXG4gICAgICAgIHN0YXRlKCd2b2lkJywgc3R5bGUoe1xuICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoNSUpJyxcbiAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgIH0pKSxcbiAgICAgICAgc3RhdGUoJ3Zpc2libGUnLCBzdHlsZSh7XG4gICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwKScsXG4gICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICB9KSksXG4gICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gdmlzaWJsZScsIGFuaW1hdGUoJzIyNW1zIGVhc2Utb3V0JykpLFxuICAgICAgICB0cmFuc2l0aW9uKCd2aXNpYmxlID0+IHZvaWQnLCBhbmltYXRlKCcxOTVtcyBlYXNlLWluJykpXG4gICAgICBdKVxuICAgIF0sXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLnVpLWlucHV0d3JhcHBlci1maWxsZWRdJzogJ2ZpbGxlZCcsXG4gICAgICAgICdbY2xhc3MudWktaW5wdXR3cmFwcGVyLWZvY3VzXSc6ICdmb2N1cydcbiAgICB9LFxuICAgIC8qIHRzbGludDplbmFibGUgKi9cbn0pXG4vLyBba21jbmddIHVwb24gdXBncmFkZTogY29tcGFyZSBpbXBsZW1lbnRlZCBpbnRlcmZhY2VzIGluIHRoZSBvcmlnaW5hbCBjb21wb25lbnQgKG5vIG5lZWQgdG8gaW5jbHVkZSBDb250cm9sVmFsdWVBY2Nlc3NvcilcbmV4cG9ydCBjbGFzcyBBdXRvQ29tcGxldGUgZXh0ZW5kcyBQcmltZUF1dG9Db21wbGV0ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQWZ0ZXJWaWV3Q2hlY2tlZCwgQWZ0ZXJDb250ZW50SW5pdCxEb0NoZWNrICB7XG4gICAgcHJpdmF0ZSBfc3VnZ2VzdGlvbnNQcm92aWRlciQgOiBJU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICBwdWJsaWMgX2xvYWRpbmcgPSBmYWxzZTtcbiAgICBwdWJsaWMgX3Nob3dOb0l0ZW1zID0gZmFsc2U7XG4gICAgcHVibGljIF9lcnJvck1lc3NhZ2UgPSAnJztcbiAgICBwcml2YXRlIF9hbGxvd011bHRpcGxlID0gZmFsc2U7XG4gICAgcHVibGljIF9wbGFjZWhvbGRlciA9ICcnO1xuICAgIHB1YmxpYyBPYmplY3RVdGlscyA9IE9iamVjdFV0aWxzO1xuICAgIHB1YmxpYyBvdmVybGF5SG92ZXJlZCA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBvbkl0ZW1BZGRpbmcgOiAodmFsdWUgOiBhbnkpID0+IGFueTtcblxuICAgIEBJbnB1dCgpXG4gICAgbGltaXRUb1N1Z2dlc3Rpb25zIDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKVxuICAgIHN1Z2dlc3Rpb25TZWxlY3RhYmxlRmllbGQgOiBzdHJpbmcgPSAnJztcblxuICAgIEBJbnB1dCgpXG4gICAgc3VnZ2VzdGlvbkl0ZW1GaWVsZCA6IHN0cmluZyA9ICcnO1xuXG4gICAgQElucHV0KCkgdG9vbHRpcFJlc29sdmVyOiBzdHJpbmcgfCAoKHZhbDogYW55KSA9PiBzdHJpbmcpID0gbnVsbDtcblxuICAgIEBJbnB1dCgpXG4gICAgY2xhc3NGaWVsZDogc3RyaW5nID0gbnVsbDtcblxuICAgIEBJbnB1dCgpXG4gICAgc3VnZ2VzdGlvbkxhYmVsRmllbGQgOiBzdHJpbmcgPSAnJztcblxuICAgIEBJbnB1dCgpXG4gICAgYWRkT25QYXN0ZSA9IHRydWU7XG5cbiAgICBnZXQgbXVsdGlwbGUoKSA6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIC8vIGFsd2F5cyByZXR1cm4gdHJ1ZSB0byBhZmZlY3QgY29tcG9uZW50IHVpIG9mIHNlbGVjdGVkIGl0ZW0uXG4gICAgICAgIC8vIGludGVybmFsbHkgeW91IHNob3VsZCB1c2UgX2FsbG93TXVsdGlwbGVcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgQElucHV0KCkgZ2V0IHN1Z2dlc3Rpb25zKCk6IGFueVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N1Z2dlc3Rpb25zO1xuICAgIH1cblxuICAgIEBPdXRwdXQoKVxuICAgIGl0ZW1DbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgQFZpZXdDaGlsZCgncGFuZWwnKSBwYW5lbEVMOiBFbGVtZW50UmVmO1xuXG4gICAgQEhvc3RMaXN0ZW5lcigncGFzdGUnLCBbJyRldmVudCddKSBvblBhc3RlKGV2ZW50OiBDbGlwYm9hcmRFdmVudCkge1xuICAgICAgaWYgKCF0aGlzLmFkZE9uUGFzdGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjb250ZW50ID0gZXZlbnQuY2xpcGJvYXJkRGF0YS5nZXREYXRhKCd0ZXh0L3BsYWluJyk7XG5cbiAgICAgIGlmIChjb250ZW50ICYmIGNvbnRlbnQuaW5kZXhPZignLCcpICE9PSAtMSkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb250ZW50LnNwbGl0KCcsJylcbiAgICAgICAgICAubWFwKGl0ZW0gPT4gaXRlbS50cmltKCkpXG4gICAgICAgICAgLmZvckVhY2godGFnID0+IHRoaXMuX2FkZFZhbHVlRnJvbUlucHV0KHRhZykpO1xuXG4gICAgICAgIGlmICghdGhpcy5vdmVybGF5VmlzaWJsZSkge1xuICAgICAgICAgIC8vIHByaW1uZyBmaXg6IGlmIHRoZSBwYW5lbCBpcyBub3QgdmlzaWJsZSAoIW92ZXJsYXlWaXNpYmxlKSBhbmQgd2UgY3VycmVudGx5IGxlYXZpbmcgdGhlIGlucHV0IGZpZWxkIGNsZWFyIGlucHV0IGNvbnRlbnRcbiAgICAgICAgICB0aGlzLl9jbGVhcklucHV0VmFsdWUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcbiAgICAgIH1cbiAgICB9XG5cblxuICAgIHNldCBzdWdnZXN0aW9ucyh2YWw6YW55W10pIHtcbiAgICAgICAgdGhpcy5fc3VnZ2VzdGlvbnMgPSB2YWw7XG5cbiAgICAgICAgaWYodGhpcy5wYW5lbEVMICYmIHRoaXMucGFuZWxFTC5uYXRpdmVFbGVtZW50KSB7XG5cbiAgICAgICAgICAgIC8vIHByaW1lbmcgZml4OiBwcmltZW5nIHVzZXMgZnVuY3Rpb24gdG8gc2hvdyAnbm9SZXN1bHRzJyBtZXNzYWdlIGlmIGV4aXN0cyBvciBoaWRlIHRoZSBzdWdnZXN0ZWQgb3RoZXJ3aXNlLlxuICAgICAgICAgICAgLy8gd2UgcmVtb3ZlZCB0aGlzIGxvZ2ljIHNpbmNlIGl0IGNvbmZsaWN0IHdpdGggb3VyIGltcHJvdmVkIGxvZ2ljXG4gICAgICAgICAgICBpZih0aGlzLl9zdWdnZXN0aW9ucyAmJiB0aGlzLl9zdWdnZXN0aW9ucy5sZW5ndGgpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3VnZ2VzdGlvbnNVcGRhdGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIGlmKHRoaXMuYXV0b0hpZ2hsaWdodCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodE9wdGlvbiA9IHRoaXMuX3N1Z2dlc3Rpb25zWzBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dCgpIHNldCBwbGFjZWhvbGRlcih2YWx1ZSA6IHN0cmluZylcbiAgICB7XG4gICAgICAgIC8vIElFMTEgYnVnIGNhdXNpbmcgb3V0cHV0IGV2ZW50IHRvIGZpcmUgdXBvbiBpbnB1dCBmaWVsZCBibHVyIGV2ZW50IHdoZW4gdGhlcmUgaXMgYSBwbGFjZWhvbGRlci4gVGh1cywgd2UgcmVtb3ZlIHRoZSBwbGFjZWhvbGRlciBhdHRyaWJ1dGUgZm9yIElFMTEsIHNpbmdsZSBzZWxlY3Rpb24gbW9kZS5cbiAgICAgICAgLy8gQWRkaXRpb25hbCBkZXRhaWxzOiBodHRwczovL2Nvbm5lY3QubWljcm9zb2Z0LmNvbS9JRS9mZWVkYmFjay9kZXRhaWxzLzgxMDUzOC9pZS0xMS1maXJlcy1pbnB1dC1ldmVudC1vbi1mb2N1c1xuICAgICAgICBjb25zdCBpc0lFMTEgPSBLYWx0dXJhQnJvd3NlclV0aWxzLmRldGVjdEJyb3dzZXIoKSA9PT0gQnJvd3Nlck5hbWVzLklFMTE7XG4gICAgICAgIHRoaXMuX3BsYWNlaG9sZGVyID0gaXNJRTExICYmICF0aGlzLl9hbGxvd011bHRpcGxlID8gJycgOiB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IHBsYWNlaG9sZGVyKCk6IHN0cmluZ3tcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BsYWNlaG9sZGVyO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIHNldCBtdWx0aXBsZSh2YWx1ZSA6IGJvb2xlYW4pXG4gICAge1xuICAgICAgICB0aGlzLl9hbGxvd011bHRpcGxlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgc3VnZ2VzdGlvbnNQcm92aWRlcihwcm92aWRlciQgOiBPYnNlcnZhYmxlPFN1Z2dlc3Rpb25zUHJvdmlkZXJEYXRhPilcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLl9zdWdnZXN0aW9uc1Byb3ZpZGVyJClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fc3VnZ2VzdGlvbnNQcm92aWRlciQudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMuX3N1Z2dlc3Rpb25zUHJvdmlkZXIkID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm92aWRlciQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX3N1Z2dlc3Rpb25zUHJvdmlkZXIkID0gcHJvdmlkZXIkLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICBkYXRhID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZUxlbmd0aFZhbGlkID0gdGhpcy5pbnB1dCAmJiAodGhpcy5pbnB1dC52YWx1ZSB8fCAnJykudHJpbSgpLmxlbmd0aCA+PSB0aGlzLm1pbkxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF2YWx1ZUxlbmd0aFZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwcmltZW5nIGZpeDogaWYgdXNlciB1c2UgYmFja3NwYWNlIHRvIGRlbGV0ZSBzZWFyY2ggdGV4dCwgc2hvdWxkIGFib3J0IHRoZSBsYXN0IHF1ZXJ5LlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuaXNMb2FkaW5nKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dOb0l0ZW1zID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN1Z2dlc3Rpb25zID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9lcnJvck1lc3NhZ2UgPSAnJztcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWdnZXN0aW9uc1VwZGF0ZWQgPSB0cnVlOyAvLyBtYWtlIHN1cmUgdGhlIHN1Z2dlc3Rpb25zIHBhbmVsIGlzIGFsaWduZWQgdG8gdGhlIGhlaWdodCBvZiB0aGUgY29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2VcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuc3VnZ2VzdGlvbnMgJiYgZGF0YS5zdWdnZXN0aW9ucy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3VnZ2VzdGlvbnMgPSBkYXRhLnN1Z2dlc3Rpb25zO1xuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN1Z2dlc3Rpb25zID0gW107XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbG9hZGluZyA9IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2hvd05vSXRlbXMgPSAhZGF0YS5lcnJvck1lc3NhZ2U7IC8vIHNob3cgbm8gaXRlbXMgbm90aWZpY2F0aW9uIG9ubHkgaWYgcmVzdWx0IGlzIHZhbGlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWdnZXN0aW9uc1VwZGF0ZWQgPSB0cnVlOyAvLyBtYWtlIHN1cmUgdGhlIHN1Z2dlc3Rpb25zIHBhbmVsIGlzIGFsaWduZWQgdG8gdGhlIGhlaWdodCBvZiB0aGUgY29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmVycm9yTWVzc2FnZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Vycm9yTWVzc2FnZSA9IGRhdGEuZXJyb3JNZXNzYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN1Z2dlc3Rpb25zVXBkYXRlZCA9IHRydWU7IC8vIG1ha2Ugc3VyZSB0aGUgc3VnZ2VzdGlvbnMgcGFuZWwgaXMgYWxpZ25lZCB0byB0aGUgaGVpZ2h0IG9mIHRoZSBjb21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAgcHVibGljIGdldFZhbHVlKCkgOiBhbnkge1xuICAgICAgICAgaWYgKHRoaXMuX2FsbG93TXVsdGlwbGUpIHtcbiAgICAgICAgICAgICBpZiAodGhpcy52YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlID8gW3RoaXMudmFsdWVdIDogW107XG4gICAgICAgICAgICAgfVxuICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICBpZiAodGhpcy52YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlLmxlbmd0aCA+IDAgPyB0aGlzLnZhbHVlWzBdIDogbnVsbDtcbiAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICB9XG4gICAgIH1cblxuICAgICBwdWJsaWMgY2xlYXJWYWx1ZSgpIDogdm9pZHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2NsZWFySW5wdXRWYWx1ZSgpXG4gICAgIH1cblxuICAgICBwdWJsaWMgZ2V0IHNlYXJjaFRleHQoKSA6IHN0cmluZ1xuICAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmlucHV0ID8gdGhpcy5pbnB1dC52YWx1ZSA6IG51bGw7XG4gICAgIH1cblxuICAgICBwcml2YXRlIGdldCBpbnB1dCgpIDogSFRNTElucHV0RWxlbWVudFxuICAgICB7XG4gICAgICAgICAvLyBba21jbmddIHdlIG92ZXJyaWRlIG11bHRpIG1vZGUgdG8gYWx3YXlzIGJlIG11bHRpcGxlIHNvIHRoZSBpbnB1dCBzaG91bGQgYWx3YXlzIGh1c2UgdGhlIG11bHRpSW5wdXRFbFxuICAgICAgICAgcmV0dXJuIHRoaXMubXVsdGlJbnB1dEVMLm5hdGl2ZUVsZW1lbnQ7XG4gICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGl0ZW1cbiAgICAgKiByZXR1cm5zIHthbnl8Ym9vbGVhbn1cbiAgICAgKiBwcml2YXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSBfaXNJdGVtU2VsZWN0ZWQoaXRlbSA6IGFueSkgOiBib29sZWFuXG4gICAge1xuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUgJiYgdGhpcy52YWx1ZSBpbnN0YW5jZW9mIEFycmF5ICYmIHRoaXMudmFsdWUuaW5kZXhPZihpdGVtKSAhPT0gLTE7XG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlICYmIHRoaXMudmFsdWUgPT09IGl0ZW07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBhZGQgdmFsdWUgcHJvdmlkZWQgYnkgdXNlciBpZiB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIGNvbmZpcm1lZDpcbiAgICAgKiAtIGlucHV0IGNvbXBvbmVudCBpcyBpbiBmb2N1cyBhbmQgaXRzJyBjb250ZW50IGxlbmd0aCBpcyB2YWxpZC5cbiAgICAgKiAtIG5vIHN1Z2dlc3Rpb24gaXMgY3VycmVudGx5IGhpZ2hsaWdodGVkXG4gICAgICogcmV0dXJucyB7IHtzdGF0dXN9IH0gc3RhdHVzICdhZGRlZCcgaWYgdmFsaWQgdmFsdWUsICdpbnZhbGlkJyBpZiBjYW5ub3QgYWRkIHRoZSB2YWx1ZSBvciAnbm90IHJlbGV2YW50JyBpZiB0aGUgcmVxdWVzdCBzaG91bGQgYmUgaWdub3JlZFxuICAgICAqIHByaXZhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIF9hZGRWYWx1ZUZyb21JbnB1dCh2YWx1ZSA9IG51bGwpIDogeyBzdGF0dXMgOiAnYWRkZWQnIHwgJ2ludmFsaWQnIHwgJ25vdCByZWxldmFudCcgfCAnZHVwbGljYXRlZCd9XG4gICAge1xuICAgICAgICBjb25zdCByYXdJbnB1dFZhbHVlID0gKHZhbHVlIHx8IHRoaXMuc2VhcmNoVGV4dCB8fCAnJykudHJpbSgpO1xuXG4gICAgICAgIC8vIDEuIGlmICFgdGhpcy52YWx1ZWAgLT4gZm9ybSBpcyB2YWxpZCAoYXNzdW1pbmcgdGhhdCB3ZSBhZGQgdmFsdWUgZm9yIHRoZSBmaXJzdCB0aW1lKVxuICAgICAgICAvLyAyLiBpZiBlYWNoIHZhbHVlIGlzIHN0cmluZyBhbmQgdGhlcmUncyBubyBzYW1lIHZhbHVlIGluIHRoZSBgdGhpcy52YWx1ZWAgYXJyYXkgLT4gZm9ybSBpcyB2YWxpZFxuICAgICAgICBjb25zdCBpc0R1cGxpY2F0ZWQgPSB0aGlzLnZhbHVlICYmIHRoaXMudmFsdWUuc29tZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUudG9Mb3dlckNhc2UoKSA9PT0gcmF3SW5wdXRWYWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoaXNEdXBsaWNhdGVkKSB7XG4gICAgICAgICAgcmV0dXJuIHsgc3RhdHVzIDogJ2R1cGxpY2F0ZWQnfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5saW1pdFRvU3VnZ2VzdGlvbnMgJiYgcmF3SW5wdXRWYWx1ZSAmJiAhdGhpcy5oaWdobGlnaHRPcHRpb24gJiYgIXRoaXMub3ZlcmxheUhvdmVyZWQgJiYgdGhpcy5mb2N1cylcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCByYXdJbnB1dFZhbHVlLmxlbmd0aCA+PSAxICYmICF0aGlzLl9pc0l0ZW1TZWxlY3RlZChyYXdJbnB1dFZhbHVlKSkge1xuXG4gICAgICAgICAgICAgICAgbGV0IG5ld1ZhbHVlID0gdGhpcy5vbkl0ZW1BZGRpbmcgPyB0aGlzLm9uSXRlbUFkZGluZy5jYWxsKG51bGwscmF3SW5wdXRWYWx1ZSkgOiByYXdJbnB1dFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbmV3VmFsdWUgPT09ICdzdHJpbmcnICYmIHRoaXMuZmllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgVGhlIGF1dG8tY29tcGxldGUgY29tcG9uZW50ICdmaWVsZCcgYXR0cmlidXRlIGlzIHNldCB0byB2YWx1ZSAnJHt0aGlzLmZpZWxkfScgd2hpY2ggaW5kaWNhdGVzIHRoYXQgdGhlIGF1dG8tY29tcGxldGUgdmFsdWUgdHlwZSBpcyBhbiBvYmplY3QgKGRpZCB5b3UgZm9yZ2V0IHRvIGFzc2lnbiB0aGUgJ29uSXRlbUFkZGluZycgYXR0cmlidXRlIHRvIGNvbnZlcnQgdGhlIHVzZXIgaW5wdXQgd2hpY2ggaXMgb2YgdHlwZSB0eXBlICdzdHJpbmcnIHRvIGEgdmFsaWQgdmFsdWU/KWApO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgc3VwZXIuc2VsZWN0SXRlbShuZXdWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG5ld1ZhbHVlID09PSAndW5kZWZpbmVkJyB8fCBuZXdWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGB0aGUgZnVuY3Rpb24gcHJvdmlkZWQgYnkgYXR0cmlidXRlICdvbkl0ZW1BZGRpbmcnIHJlc3VsdGVkIHdpdGggbnVsbCB2YWx1ZSwgYWJvcnQgYWRkaW5nIHVzZXIgaW5wdXQgdG8gYXV0LWNvbXBsZXRlIHZhbHVlYCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB7IHN0YXR1cyA6ICdhZGRlZCd9O1xuICAgICAgICAgICAgfWVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBzdGF0dXMgOiAnaW52YWxpZCd9O1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHsgc3RhdHVzIDogJ25vdCByZWxldmFudCd9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25JbnB1dEJsdXIoZXZlbnQpIHtcblxuICAgICAgICB0aGlzLl9hZGRWYWx1ZUZyb21JbnB1dCgpO1xuXG4gICAgICAgIGlmICghdGhpcy5vdmVybGF5VmlzaWJsZSkge1xuICAgICAgICAgICAgLy8gcHJpbW5nIGZpeDogaWYgdGhlIHBhbmVsIGlzIG5vdCB2aXNpYmxlICghb3ZlcmxheVZpc2libGUpIGFuZCB3ZSBjdXJyZW50bHkgbGVhdmluZyB0aGUgaW5wdXQgZmllbGQgY2xlYXIgaW5wdXQgY29udGVudFxuICAgICAgICAgICAgdGhpcy5fY2xlYXJJbnB1dFZhbHVlKCk7XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIub25JbnB1dEJsdXIoZXZlbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnN1bWUgdGhlIGFyZ3VtZW50cyBuZWVkZWQgdG8gY29uc3RydWN0ICdBdXRvQ29tcGxldGUnIGFuZCBwYXNzIHRoZW0gdG8gc2VsZiAodGhlICdBdXRvQ29tcGxldGUnIGNvbnN0cnVjdG9yKS5cbiAgICAgKlxuICAgICAqIFRoaXMgaXMgYSB3b3JrYXJvdW5kIHNpbmNlIGFjY29yZGluZyB0byBORzIgZG9jdW1lbnRhdGlvbiB0aGUgcGFyZW50IGNvbnN0cnVjdG9yIHNob3VsZCBiZSBjYWxsZWQgZXZlbiBpZlxuICAgICAqIHRoaXMgY29tcG9uZW50IGRvZXNuJ3QgbmVlZCBhIGNvbnN0cnVjdG9yLlxuICAgICAqIEBwYXJhbSBlbFxuICAgICAqIEBwYXJhbSBkaWZmZXJzXG4gICAgICogQHBhcmFtIHJlbmRlcmVyXG4gICAgICogQHBhcmFtIGNkXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHVibGljIGRpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycylcbiAgICB7XG4gICAgICAgIHN1cGVyKGVsLCByZW5kZXJlciwgY2QsIGRpZmZlcnMpO1xuICAgIH1cblxuXG4gICAgaGlkZSgpXG4gICAge1xuICAgICAgICBpZiAodGhpcy5vdmVybGF5VmlzaWJsZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5wYW5lbEVMLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID0gMDsgLy8gcHJpbWVuZyBmaXg6IHNjcm9sbCBzdWdnZXN0aW9ucyBsaXN0IHRvIHRvcCAob3RoZXJ3aXNlIHRoZSBzY3JvbGwgd2lsbCBiZSBwZXJzaXN0KVxuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRPcHRpb24gPSBudWxsOyAvLyBwcmltZW5nIGZpeDogdGhlIGxhc3Qgc2VsZWN0aW9uIHVzaW5nIGtleWJvYXJkIGlzIG5vdCBiZWluZyBjbGVhcmVkIHdoZW4gc2VsZWN0aW5nIHVzaW5nICdlbnRlcidcblxuICAgICAgICAgICAgLy8gY2xlYXIgdXNlciBub3RpZmljYXRpb25zXG4gICAgICAgICAgICB0aGlzLl9sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9zaG93Tm9JdGVtcyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fZXJyb3JNZXNzYWdlID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5mb2N1cykge1xuICAgICAgICAgICAgLy8gcHJpbW5nIGZpeDogaWYgdXNlciBub3QgaW4gdGhlIGlucHV0ICghZm9jdXMpIGFuZCB3ZSBjdXJyZW50bHkgY2xvc2luZyB0aGUgdmlzaWJsZSBwYW5lbCAtIGNsZWFyIGlucHV0IGNvbnRlbnQgKHJlbGV2YW50IG9ubHkgZm9yIGNvbXBvbmVudHMgd2hvc2UgJ2xpbWl0VG9TdWdnZXN0aW9ucycgcHJvcGVydHkgaXMgc2V0IHRvIHRydWVcbiAgICAgICAgICAgIHRoaXMuX2NsZWFySW5wdXRWYWx1ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3VwZXIuaGlkZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NsZWFySW5wdXRWYWx1ZSgpIDogdm9pZHtcbiAgICAgICAgaWYgKHRoaXMuaW5wdXQgJiYgdGhpcy5pbnB1dC52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5pbnB1dC52YWx1ZSA9ICcnOyAvLyBjbGVhciBleGlzdGluZyB2YWx1ZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uSW5wdXQoJGV2ZW50KSA6IHZvaWR7XG4gICAgICAgIGlmICghdGhpcy5fYWxsb3dNdWx0aXBsZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBwcmltbmcgZml4OiBoaWRlIHBhbmVsIG9uY2UgdGhlIHZhbHVlIGxlbmd0aCBpcyBsZXNzIHRoZSBtaW5MZW5ndGgsIHByaW1lbmcgaGFuZGxlcyBvbmx5IHNpdHVhdGlvbiB3aGVyZSBpbnB1dCB2YWx1ZSBsZW5ndGggPT0gMFxuICAgICAgICBpZih0aGlzLmlucHV0LnZhbHVlLmxlbmd0aCA8IHRoaXMubWluTGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN1cGVyLm9uSW5wdXQoJGV2ZW50KTtcbiAgICB9XG5cbiAgICBvbktleWRvd24oZXZlbnQpICB7XG4gICAgICAgIGxldCBwcmV2ZW50S2V5ZG93biA9IGZhbHNlO1xuXG4gICAgICAgIGlmICgoZXZlbnQud2hpY2ggPT09IDkgfHwgZXZlbnQud2hpY2ggPT09IDEzIHx8IGV2ZW50LmtleSA9PT0gJywnKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXR1cyA9IHRoaXMuX2FkZFZhbHVlRnJvbUlucHV0KCkuc3RhdHVzO1xuXG4gICAgICAgICAgICBpZiAoc3RhdHVzICE9PSAnbm90IHJlbGV2YW50Jykge1xuICAgICAgICAgICAgICAgIHByZXZlbnRLZXlkb3duID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdkdXBsaWNhdGVkJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vdmVybGF5VmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2xlYXJJbnB1dFZhbHVlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoIXByZXZlbnRLZXlkb3duICYmIHRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDk6ICAvL3RhYlxuICAgICAgICAgICAgICAgICAgICAvLyBwcmltZW5nIGZpeDogcHJlc3NpbmcgJ3RhYicgbW92ZSB0aGUgZm9jdXMgZnJvbSB0aGUgY29tcG9uZW50IGJ1dCBkb2Vzbid0IGhpZGUgdGhlIHN1Z2dlc3Rpb25zLlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDEzOiAvL2VudGVyXG4gICAgICAgICAgICAgICAgICAgIC8vIHByZXZlbnQgc2VsZWN0aW5nIG9mIGRpc2FibGVkIGl0ZW0gdXNpbmcga2V5Ym9hcmQgKHRoZSBtb3VzZSBzZWxlY3Rpb24gaXMgaGFuZGxlZCBzZXBhcmF0ZWx5KVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBoaWdobGlnaHRJdGVtRGlzYWJsZWQgPSB0aGlzLmhpZ2hsaWdodE9wdGlvbiAmJiB0aGlzLnN1Z2dlc3Rpb25TZWxlY3RhYmxlRmllbGQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiB0aGlzLmhpZ2hsaWdodE9wdGlvblt0aGlzLnN1Z2dlc3Rpb25TZWxlY3RhYmxlRmllbGRdICE9PSB1bmRlZmluZWQgJiYgIXRoaXMuaGlnaGxpZ2h0T3B0aW9uW3RoaXMuc3VnZ2VzdGlvblNlbGVjdGFibGVGaWVsZF0pXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChoaWdobGlnaHRJdGVtRGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZlbnRLZXlkb3duID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcHJldmVudEtleWRvd24pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN1cGVyLm9uS2V5ZG93bihldmVudCk7XG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbiAgICBuZ09uRGVzdHJveSgpXG4gICAge1xuICAgICAgICBpZiAodGhpcy5fc3VnZ2VzdGlvbnNQcm92aWRlciQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX3N1Z2dlc3Rpb25zUHJvdmlkZXIkLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLl9zdWdnZXN0aW9uc1Byb3ZpZGVyJCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblVzZXJTZWxlY3RJdGVtKGV2ZW50IDogYW55LCBpdGVtIDogYW55KSA6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuX2NhblNlbGVjdFN1Z2dlc3Rpb24oaXRlbSkpIHtcbiAgICAgICAgICAgIC8vIHByZXZlbnQgc2VsZWN0aW9uIG9mIGRpc2FibGVkIHN1Z2dlc3Rpb25zLlxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5pbnB1dC5mb2N1cygpOyAvLyBtb3ZlIHRoZSBmb2N1cyBiYWNrIHRvIHRoZSBpbnB1dCBib3ggb3RoZXJ3aXNlIHRoZSBjb21wbW9uZW50IHdpbGwgc3RvcCB3b3JraW5nXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNlbGVjdEl0ZW0oaXRlbSk7XG4gICAgfVxuXG4gICAgcHVibGljIF9nZXRTdWdnZXN0aW9uVGV4dChzdWdnZXN0aW9uOiBhbnkpXG4gICAge1xuICAgICAgICBsZXQgcmVzdWx0ID0gc3VnZ2VzdGlvbjtcbiAgICAgICAgaWYgKHN1Z2dlc3Rpb24pXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN1Z2dlc3Rpb25MYWJlbEZpZWxkKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHN1Z2dlc3Rpb25bdGhpcy5zdWdnZXN0aW9uTGFiZWxGaWVsZF07XG4gICAgICAgICAgICB9ZWxzZSBpZiAodGhpcy5zdWdnZXN0aW9uSXRlbUZpZWxkICYmIHRoaXMuZmllbGQpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gc3VnZ2VzdGlvblt0aGlzLnN1Z2dlc3Rpb25JdGVtRmllbGRdO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdCA/IHJlc3VsdFt0aGlzLmZpZWxkXSA6ICcnO1xuICAgICAgICAgICAgfWVsc2UgaWYgKHRoaXMuc3VnZ2VzdGlvbkl0ZW1GaWVsZClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBzdWdnZXN0aW9uW3RoaXMuc3VnZ2VzdGlvbkl0ZW1GaWVsZF07XG4gICAgICAgICAgICB9ZWxzZSBpZiAodGhpcy5maWVsZClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBzdWdnZXN0aW9uW3RoaXMuZmllbGRdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jYW5TZWxlY3RTdWdnZXN0aW9uKGl0ZW0gOiBhbnkpIDogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLnN1Z2dlc3Rpb25TZWxlY3RhYmxlRmllbGQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbVt0aGlzLnN1Z2dlc3Rpb25TZWxlY3RhYmxlRmllbGRdICE9PSB1bmRlZmluZWQgJiYgIWl0ZW1bdGhpcy5zdWdnZXN0aW9uU2VsZWN0YWJsZUZpZWxkXSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBzZWxlY3RJdGVtKGl0ZW0gOiBhbnkpIHtcbiAgICAgICAgdGhpcy5oaWdobGlnaHRPcHRpb24gPSBudWxsOyAvLyBwcmltZW5nIGZpeDogIHRoZSBsYXN0IHNlbGVjdGVkIGl0ZW0gd2hlbiB1c2luZyBrZXlib2FyZCBpcyBub3QgYmVpbmcgcmVtb3ZlZCBhbmQgd2lsbCBiZSB1c2VkIGxhdGVyIHRvIGRvIGEgcmFuZG9tIHNlbGVjdGlvblxuXG4gICAgICAgIGlmICh0aGlzLl9jYW5TZWxlY3RTdWdnZXN0aW9uKGl0ZW0pKSB7XG5cbiAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW1WYWx1ZSA9IGl0ZW07XG4gICAgICAgICAgICBpZiAodGhpcy5zdWdnZXN0aW9uSXRlbUZpZWxkKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkSXRlbVZhbHVlID0gaXRlbVt0aGlzLnN1Z2dlc3Rpb25JdGVtRmllbGRdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRJdGVtVmFsdWUgPT09IG51bGwgfHwgdHlwZW9mIHNlbGVjdGVkSXRlbVZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIltrYWx0dXJhXSAtPiB0cnlpbmcgdG8gc2VsZWN0IGEgdmFsdWUgdGhhdCBpcyBlaXRoZXIgbnVsbCBvciB1bmRlZmluZWQuIGFjdGlvbiBpZ25vcmVkXCIpOyAvLyBrZWVwIHdhcm5pbmdcbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICBzdXBlci5zZWxlY3RJdGVtKHNlbGVjdGVkSXRlbVZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBmb2N1c0lucHV0KCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pbnB1dCAmJiB0aGlzLmlucHV0LmZvY3VzICYmICF0aGlzLmlucHV0LmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIH0sIDApO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkl0ZW1DbGljayhpdGVtOiBhbnkpe1xuICAgICAgICB0aGlzLml0ZW1DbGljay5lbWl0KGl0ZW0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuY29uc3QgZXNjYXBlID0gcyA9PiBzLnJlcGxhY2UoL1stXFwvXFxcXF4kKis/LigpfFtcXF17fV0vZywgJ1xcXFwkJicpO1xuXG5AUGlwZSh7XG4gICAgbmFtZTogJ2tIaWdobGlnaHQnXG59KVxuZXhwb3J0IGNsYXNzIEhpZ2hsaWdodFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgICB0cmFuc2Zvcm0odmFsdWU6IHN0cmluZywgYXJnOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIWFyZy50cmltKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoYCgke2VzY2FwZShhcmcpfSlgLCAnaScpO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UocmVnZXgsICc8c3BhbiBjbGFzcz1cImtIaWdobGlnaHRlZFRleHRcIj4kMTwvc3Bhbj4nKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7XG4gICAgbmFtZTogJ2tJc1N1Z2dlc3Rpb25EaXNhYmxlZCdcbn0pXG5leHBvcnQgY2xhc3MgSXNTdWdnZXN0aW9uRGlzYWJsZWRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIGFyZzogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAgKGFyZyAmJiB0eXBlb2YgdmFsdWVbYXJnXSA9PT0gJ2Jvb2xlYW4nICYmIHZhbHVlW2FyZ10gPT09IGZhbHNlKTtcbiAgICB9XG59XG5cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgVG9vbHRpcE1vZHVsZSB9IGZyb20gJ0BrYWx0dXJhLW5nL2thbHR1cmEtdWknO1xuaW1wb3J0IHsgSW5wdXRUZXh0TW9kdWxlIH0gZnJvbSAncHJpbWVuZy9jb21wb25lbnRzL2lucHV0dGV4dC9pbnB1dHRleHQnO1xuaW1wb3J0IHsgQnV0dG9uTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9jb21wb25lbnRzL2J1dHRvbi9idXR0b24nO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9jb21wb25lbnRzL2NvbW1vbi9zaGFyZWQnO1xuaW1wb3J0IHsgQXV0b0NvbXBsZXRlIH0gZnJvbSBcIi4vYXV0by1jb21wbGV0ZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IEhpZ2hsaWdodFBpcGUgfSBmcm9tIFwiLi9oaWdobGlnaHQucGlwZVwiO1xuaW1wb3J0IHsgSXNTdWdnZXN0aW9uRGlzYWJsZWRQaXBlIH0gZnJvbSBcIi4vaXMtc3VnZ2VzdGlvbi1kaXNhYmxlZC5waXBlXCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgSW5wdXRUZXh0TW9kdWxlLCBCdXR0b25Nb2R1bGUsIFNoYXJlZE1vZHVsZSwgVG9vbHRpcE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbQXV0b0NvbXBsZXRlLCBIaWdobGlnaHRQaXBlLCBJc1N1Z2dlc3Rpb25EaXNhYmxlZFBpcGVdLFxuICAgIGV4cG9ydHM6IFtBdXRvQ29tcGxldGUsIEhpZ2hsaWdodFBpcGVdLFxuXG59KVxuZXhwb3J0IGNsYXNzIEF1dG9Db21wbGV0ZU1vZHVsZSB7XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XG5cbmV4cG9ydCBjb25zdCBDTEVBUkFCTEVfSU5QVVRfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IENsZWFyYWJsZUlucHV0Q29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2tDbGVhcmFibGVJbnB1dCcsXG4gIHRlbXBsYXRlOiBgPHNwYW4gY2xhc3M9XCJrLWNsZWFyYWJsZS1pbnB1dC13cmFwcGVyXCI+XG4gICAgPGlucHV0IHBJbnB1dFRleHRcbiAgICAgICAgICAgY2xhc3M9XCJrLWNsZWFyYWJsZS1pbnB1dC1pbnB1dFwiXG4gICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZCB8fCBfZGlzYWJsZWRcIlxuICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICAgICAgICAgICAoY2hhbmdlKT1cIm9uQ2hhbmdlLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgICAgIChmb2N1cyk9XCJvbkZvY3VzLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgICAgIChibHVyKT1cIm9uQmx1ci5lbWl0KCRldmVudClcIlxuICAgICAgICAgICAoa2V5dXAuZW50ZXIpPVwiX2VudGVyUHJlc3NlZCgpXCJcbiAgICAgICAgICAgWyhuZ01vZGVsKV09XCJfdmFsdWVcIj5cbiAgICA8aSAqbmdJZj1cIl9zaG93Q2xlYXJCdG5cIiBjbGFzcz1cImstY2xlYXJhYmxlLWlucHV0LWNsZWFyLWJ0blwiIHRpdGxlPVwiQ2xlYXJcIiAoY2xpY2spPVwiX2NsZWFySW5wdXQoKVwiPiZ0aW1lczs8L2k+XG48L3NwYW4+YCxcbiAgc3R5bGVzOiBbYC5rLWNsZWFyYWJsZS1pbnB1dC13cmFwcGVye3Bvc2l0aW9uOnJlbGF0aXZlfS5rLWNsZWFyYWJsZS1pbnB1dC13cmFwcGVyIC5rLWNsZWFyYWJsZS1pbnB1dC1jbGVhci1idG57Y3Vyc29yOnBvaW50ZXI7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6NXB4O3RvcDotNnB4O2ZvbnQtd2VpZ2h0OjcwMDtmb250LXNpemU6MS4yZW07Y29sb3I6Izk5OTtmb250LXN0eWxlOm5vcm1hbH1gXSxcbiAgcHJvdmlkZXJzOiBbRG9tSGFuZGxlciwgQ0xFQVJBQkxFX0lOUFVUX1ZBTFVFX0FDQ0VTU09SXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xlYXJhYmxlSW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICBcbiAgQE91dHB1dCgpIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uRm9jdXM6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25CbHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uRW50ZXJLZXl1cDogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgQE91dHB1dCgpIG9uQ2xlYXI6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgXG4gIHB1YmxpYyBfZGlzYWJsZWQgPSBmYWxzZTtcbiAgcHVibGljIF92YWx1ZSA9ICcnO1xuICBwdWJsaWMgX3Nob3dDbGVhckJ0biA9IGZhbHNlO1xuICBcbiAgcHVibGljIF9jbGVhcklucHV0KCk6IHZvaWQge1xuICAgIHRoaXMuX3ZhbHVlID0gJyc7XG4gICAgdGhpcy5fc2hvd0NsZWFyQnRuID0gZmFsc2U7XG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMuX3ZhbHVlKTtcbiAgICB0aGlzLm9uQ2hhbmdlLmVtaXQodGhpcy5fdmFsdWUpO1xuICAgIHRoaXMub25DbGVhci5lbWl0KCk7XG4gIH1cbiAgXG4gIHB1YmxpYyBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHtcbiAgfTtcbiAgXG4gIHB1YmxpYyBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7XG4gIH07XG4gIFxuICBwdWJsaWMgc2V0RGlzYWJsZWRTdGF0ZSh2YWw6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IHZhbDtcbiAgfVxuICBcbiAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XG4gIH1cbiAgXG4gIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gIH1cbiAgXG4gIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl92YWx1ZSA9IFN0cmluZyh2YWx1ZSB8fCAnJyk7XG4gICAgXG4gICAgaWYgKCF0aGlzLl92YWx1ZS50cmltKCkpIHtcbiAgICAgIHRoaXMuX3Nob3dDbGVhckJ0biA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBcbiAgcHVibGljIGNsZWFyVmFsdWUoKTogdm9pZCB7XG4gICAgdGhpcy5fdmFsdWUgPSAnJztcbiAgICB0aGlzLl9zaG93Q2xlYXJCdG4gPSBmYWxzZTtcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy5fdmFsdWUpO1xuICAgIHRoaXMub25DaGFuZ2UuZW1pdCh0aGlzLl92YWx1ZSk7XG4gIH1cbiAgXG4gIHB1YmxpYyBfZW50ZXJQcmVzc2VkKCk6IHZvaWQge1xuICAgIHRoaXMub25FbnRlcktleXVwLmVtaXQodGhpcy5fdmFsdWUpO1xuICAgIHRoaXMuX3Nob3dDbGVhckJ0biA9ICEhdGhpcy5fdmFsdWU7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9jb21wb25lbnRzL2NvbW1vbi9zaGFyZWQnO1xuaW1wb3J0IHsgQ2xlYXJhYmxlSW5wdXRDb21wb25lbnQgfSBmcm9tIFwiLi9jbGVhcmFibGUtaW5wdXQuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBJbnB1dFRleHRNb2R1bGUgfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgU2hhcmVkTW9kdWxlLFxuICAgIElucHV0VGV4dE1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtDbGVhcmFibGVJbnB1dENvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtDbGVhcmFibGVJbnB1dENvbXBvbmVudF0sXG4gIFxufSlcbmV4cG9ydCBjbGFzcyBDbGVhcmFibGVJbnB1dE1vZHVsZSB7XG59IiwiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE9uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Zvcm1Hcm91cH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGF0ZVBpY2tlckNvbnRyb2wsIER5bmFtaWNEcm9wZG93bkNvbnRyb2wsIER5bmFtaWNGb3JtQ29udHJvbEJhc2UsIExpc3RDb250cm9sIH0gZnJvbSAnQGthbHR1cmEtbmcva2FsdHVyYS11aSc7XG5pbXBvcnQgeyBjYW5jZWxPbkRlc3Ryb3ksIHRhZyB9IGZyb20gJ0BrYWx0dXJhLW5nL2thbHR1cmEtY29tbW9uJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdrLXByaW1lLWNvbnRyb2wnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBbZm9ybUdyb3VwXT1cImZvcm1cIiBbbmdTd2l0Y2hdPVwiY29udHJvbC5jb250cm9sVHlwZVwiPlxuICAgIDx0ZXh0YXJlYSAgKm5nU3dpdGNoQ2FzZT1cIidUZXh0QXJlYSdcIiBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wua2V5XCIgICBbY2xhc3MuaGFzRXJyb3JdPVwiZXJyb3JNc2cgJiYgZm9ybS5jb250cm9sc1tjb250cm9sLmtleV0udG91Y2hlZFwiIHBJbnB1dFRleHRhcmVhID48L3RleHRhcmVhPlxuXG4gICAgPGlucHV0ICpuZ1N3aXRjaENhc2U9XCInVGV4dGJveCdcIiBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wua2V5XCIgIFtjbGFzcy5oYXNFcnJvcl09XCJlcnJvck1zZyAmJiBmb3JtLmNvbnRyb2xzW2NvbnRyb2wua2V5XS50b3VjaGVkXCIgcElucHV0VGV4dC8+XG5cbiAgICA8aW5wdXQgKm5nU3dpdGNoQ2FzZT1cIidOdW1iZXInXCIgIHR5cGU9XCJudW1iZXJcIiBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wua2V5XCIgIFtjbGFzcy5oYXNFcnJvcl09XCJlcnJvck1zZyAmJiBmb3JtLmNvbnRyb2xzW2NvbnRyb2wua2V5XS50b3VjaGVkXCIgcElucHV0VGV4dCAvPlxuXG4gICAgPHAtZHJvcGRvd24gKm5nU3dpdGNoQ2FzZT1cIidEcm9wZG93bidcIiBbZmlsdGVyXT1cInRydWVcIiBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wua2V5XCIgIFtvcHRpb25zXT1cImFzRHluYW1pY0Ryb3Bkb3duQ29udHJvbChjb250cm9sKS52YWx1ZXMgfCBrUHJpbWVMaXN0T3B0aW9uczogdHJ1ZVwiPjwvcC1kcm9wZG93bj5cblxuICAgIDxrTXVsdGlTZWxlY3QgKm5nU3dpdGNoQ2FzZT1cIidMaXN0J1wiIFtyZXNldEZpbHRlck9uSGlkZV09XCJ0cnVlXCIgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLmtleVwiICBbb3B0aW9uc109XCJhc0xpc3RDb250cm9sKGNvbnRyb2wpLnZhbHVlcyB8IGtQcmltZUxpc3RPcHRpb25zIDogZmFsc2VcIj48L2tNdWx0aVNlbGVjdD5cblxuICAgIDxwLWNhbGVuZGFyICpuZ1N3aXRjaENhc2U9XCInRGF0ZVBpY2tlcidcIiBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wua2V5XCIgICBpY29uPVwia0ljb25jYWxlbmRhclwiIFtzaG93SWNvbl09XCJ0cnVlXCIgW21vbnRoTmF2aWdhdG9yXT1cInRydWVcIiBbeWVhck5hdmlnYXRvcl09XCJ0cnVlXCIgW3Nob3dUaW1lXT1cImFzRGF0ZVBpY2tlckNvbnRyb2woY29udHJvbCkuc2hvd1RpbWVcIiB5ZWFyUmFuZ2U9XCIyMDA1OjIwNTBcIiBbZGF0ZUZvcm1hdF09XCJhc0RhdGVQaWNrZXJDb250cm9sKGNvbnRyb2wpLmRhdGVGb3JtYXRcIj48L3AtY2FsZW5kYXI+XG5cbiAgICA8cC1pbnB1dFN3aXRjaCAgKm5nU3dpdGNoQ2FzZT1cIidTd2l0Y2gnXCIgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLmtleVwiPiA8L3AtaW5wdXRTd2l0Y2g+XG5cbiAgICA8c3BhbiAqbmdTd2l0Y2hEZWZhdWx0PVwiXCI+TWlzc2luZyBjb250cm9sIGZvciB7e2NvbnRyb2wuY29udHJvbFR5cGV9fTwvc3Bhbj5cblxuICAgIDxwICpuZ0lmPVwiZXJyb3JNc2cgJiYgZm9ybS5jb250cm9sc1tjb250cm9sLmtleV0udG91Y2hlZFwiXG4gICAgICAgY2xhc3M9XCJrRm9ybUVycm9yXCI+e3tlcnJvck1zZ319XG4gICAgPC9wPlxuPC9kaXY+XG5gLFxuICAgIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBQcmltZUNvbnRyb2wgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KCkgY29udHJvbDogRHluYW1pY0Zvcm1Db250cm9sQmFzZTxhbnk+O1xuICAgIEBJbnB1dCgpIGZvcm06IEZvcm1Hcm91cDtcblxuICAgIHB1YmxpYyBlcnJvck1zZyA9ICcnO1xuXG4gICAgZ2V0IGlzVmFsaWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcm0uY29udHJvbHNbdGhpcy5jb250cm9sLmtleV0udmFsaWQ7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yTXNnID0gdGhpcy5nZXRFcnJvck1zZygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lcnJvck1zZyA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vbkZvcm1TdGF0dXNDaGFuZ2VzKCk7XG5cbiAgICB9XG5cbiAgYXNEYXRlUGlja2VyQ29udHJvbCAoY29udHJvbDogYW55KTogRGF0ZVBpY2tlckNvbnRyb2wge1xuICAgIHJldHVybiAoY29udHJvbCBpbnN0YW5jZW9mIERhdGVQaWNrZXJDb250cm9sKSA/IGNvbnRyb2wgOiBudWxsO1xuICB9XG5cbiAgYXNEeW5hbWljRHJvcGRvd25Db250cm9sIChjb250cm9sOiBhbnkpOiBEeW5hbWljRHJvcGRvd25Db250cm9sIHtcbiAgICByZXR1cm4gKGNvbnRyb2wgaW5zdGFuY2VvZiBEeW5hbWljRHJvcGRvd25Db250cm9sKSA/IGNvbnRyb2wgOiBudWxsO1xuICB9XG5cbiAgYXNMaXN0Q29udHJvbCAoY29udHJvbDogYW55KTogTGlzdENvbnRyb2wge1xuICAgIHJldHVybiAoY29udHJvbCBpbnN0YW5jZW9mIExpc3RDb250cm9sKSA/IGNvbnRyb2wgOiBudWxsO1xuICB9XG5cbiAgICBwcml2YXRlIG9uRm9ybVN0YXR1c0NoYW5nZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZm9ybS5zdGF0dXNDaGFuZ2VzXG4gICAgICAgICAgICAucGlwZShjYW5jZWxPbkRlc3Ryb3kodGhpcykpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yTXNnID0gdGhpcy5nZXRFcnJvck1zZygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvck1zZyA9ICcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RXJyb3JNc2coKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFwiXCI7XG4gICAgICAgIGNvbnN0IGZvcm1Db250cm9sID0gdGhpcy5mb3JtLmNvbnRyb2xzW3RoaXMuY29udHJvbC5rZXldO1xuICAgICAgICBpZiAodGhpcy5jb250cm9sLmVycm9ycyAmJiAhZm9ybUNvbnRyb2wudmFsaWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0RXJyb3JLZXkgPSBPYmplY3Qua2V5cyh0aGlzLmNvbnRyb2wuZXJyb3JzKS5maW5kKGVycm9yS2V5ID0+XG4gICAgICAgICAgICAgICAgZm9ybUNvbnRyb2wuaGFzRXJyb3IoZXJyb3JLZXkpKTtcblxuICAgICAgICAgICAgaWYgKGZpcnN0RXJyb3JLZXkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLmNvbnRyb2wuZXJyb3JzW2ZpcnN0RXJyb3JLZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG5cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuQFBpcGUoe1xuICAgIG5hbWU6ICdrUHJpbWVMaXN0T3B0aW9ucydcbn0pXG5leHBvcnQgY2xhc3MgUHJpbWVMaXN0T3B0aW9uc1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICAgIGNvbnN0cnVjdG9yKCl7fVxuXG4gICAgdHJhbnNmb3JtKHZhbHVlcyA6IGFueVtdLCBhZGREZWZhdWx0QnV0dG9uOiBib29sZWFuKTogYW55IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gKHZhbHVlcyB8fCBbXSkubWFwKHZhbHVlID0+IHtcblx0XHQgICAgcmV0dXJuIHtsYWJlbDogdmFsdWUudGV4dCwgdmFsdWU6IHZhbHVlLnZhbHVlfTtcblx0ICAgIH0pO1xuXG4gICAgICAgIGlmIChhZGREZWZhdWx0QnV0dG9uKSB7XG5cdCAgICAgICAgcmVzdWx0LnVuc2hpZnQoe2xhYmVsOiAnU2VsZWN0IGEgdmFsdWUnLCB2YWx1ZTogbnVsbH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG4iLCJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBSZW5kZXJlcjIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgYW5pbWF0ZSwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE11bHRpU2VsZWN0IH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcblxuLyogdHNsaW50OmRpc2FibGUgKi9cbmV4cG9ydCBjb25zdCBLQUxUVVJBX01VTFRJU0VMRUNUX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNdWx0aVNlbGVjdENvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG4vKiB0c2xpbnQ6ZW5hYmxlICovXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2tNdWx0aVNlbGVjdCcsXG4gIHN0eWxlczogW2A6aG9zdCAvZGVlcC8gLnVpLW11bHRpc2VsZWN0LXBhbmVsIC5waS1taW51c3tiYWNrZ3JvdW5kLWNvbG9yOiMwMGE3ODQ7Ym9yZGVyOjFweCBzb2xpZCAjMDBhNzg0O2NvbG9yOiNmZmY7d2lkdGg6MTZweDtoZWlnaHQ6MTZweDtib3JkZXItcmFkaXVzOjNweDt0b3A6LTFweDtwb3NpdGlvbjpyZWxhdGl2ZTtsZWZ0Oi0xcHh9YF0sXG4gIHRlbXBsYXRlOiBgPGRpdiAjY29udGFpbmVyIFtuZ0NsYXNzXT1cInsndWktbXVsdGlzZWxlY3QgdWktd2lkZ2V0IHVpLXN0YXRlLWRlZmF1bHQgdWktY29ybmVyLWFsbCc6dHJ1ZSwndWktbXVsdGlzZWxlY3Qtb3Blbic6b3ZlcmxheVZpc2libGUsJ3VpLXN0YXRlLWZvY3VzJzpmb2N1cywndWktc3RhdGUtZGlzYWJsZWQnOiBkaXNhYmxlZH1cIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCJcbiAgICAgKGNsaWNrKT1cIm9uTW91c2VjbGljaygkZXZlbnQsaW4pXCI+XG4gIDxkaXYgY2xhc3M9XCJ1aS1oZWxwZXItaGlkZGVuLWFjY2Vzc2libGVcIj5cbiAgICA8aW5wdXQgI2luIHR5cGU9XCJ0ZXh0XCIgcmVhZG9ubHk9XCJyZWFkb25seVwiIFthdHRyLmlkXT1cImlucHV0SWRcIiBbYXR0ci5uYW1lXT1cIm5hbWVcIiAoZm9jdXMpPVwib25JbnB1dEZvY3VzKCRldmVudClcIiAoYmx1cik9XCJvbklucHV0Qmx1cigkZXZlbnQpXCJcbiAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgW2F0dHIudGFiaW5kZXhdPVwidGFiaW5kZXhcIiAoa2V5ZG93bik9XCJvbktleWRvd24oJGV2ZW50KVwiPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInVpLW11bHRpc2VsZWN0LWxhYmVsLWNvbnRhaW5lclwiIFt0aXRsZV09XCJ2YWx1ZXNBc1N0cmluZ1wiPlxuICAgIDxsYWJlbCBjbGFzcz1cInVpLW11bHRpc2VsZWN0LWxhYmVsIHVpLWNvcm5lci1hbGxcIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhc2VsZWN0ZWRJdGVtc1RlbXBsYXRlXCI+e3tpc0FsbENoZWNrZWQoKSA/IChhbGxTZWxlY3RlZExhYmVsIHx8IHZhbHVlc0FzU3RyaW5nKSA6IHZhbHVlc0FzU3RyaW5nfX08L25nLWNvbnRhaW5lcj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJzZWxlY3RlZEl0ZW1zVGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IHZhbHVlfVwiPjwvbmctY29udGFpbmVyPlxuICAgIDwvbGFiZWw+XG4gIDwvZGl2PlxuICA8ZGl2IFtuZ0NsYXNzXT1cInsndWktbXVsdGlzZWxlY3QtdHJpZ2dlciB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1yaWdodCc6dHJ1ZX1cIj5cbiAgICA8c3BhbiBjbGFzcz1cInVpLW11bHRpc2VsZWN0LXRyaWdnZXItaWNvbiB1aS1jbGlja2FibGVcIiBbbmdDbGFzc109XCJkcm9wZG93bkljb25cIj48L3NwYW4+XG4gIDwvZGl2PlxuICA8ZGl2ICpuZ0lmPVwib3ZlcmxheVZpc2libGVcIiBbbmdDbGFzc109XCJbJ3VpLW11bHRpc2VsZWN0LXBhbmVsIHVpLXdpZGdldCB1aS13aWRnZXQtY29udGVudCB1aS1jb3JuZXItYWxsIHVpLXNoYWRvdyddXCIgW0BvdmVybGF5QW5pbWF0aW9uXT1cInt2YWx1ZTogJ3Zpc2libGUnLCBwYXJhbXM6IHtzaG93VHJhbnNpdGlvblBhcmFtczogc2hvd1RyYW5zaXRpb25PcHRpb25zLCBoaWRlVHJhbnNpdGlvblBhcmFtczogaGlkZVRyYW5zaXRpb25PcHRpb25zfX1cIiAoQG92ZXJsYXlBbmltYXRpb24uc3RhcnQpPVwib25PdmVybGF5QW5pbWF0aW9uU3RhcnQoJGV2ZW50KVwiXG4gICAgICAgW25nU3R5bGVdPVwicGFuZWxTdHlsZVwiIFtjbGFzc109XCJwYW5lbFN0eWxlQ2xhc3NcIiAoY2xpY2spPVwicGFuZWxDbGljaz10cnVlXCI+XG4gICAgPGRpdiBjbGFzcz1cInVpLXdpZGdldC1oZWFkZXIgdWktY29ybmVyLWFsbCB1aS1tdWx0aXNlbGVjdC1oZWFkZXIgdWktaGVscGVyLWNsZWFyZml4XCIgW25nQ2xhc3NdPVwieyd1aS1tdWx0aXNlbGVjdC1oZWFkZXItbm8tdG9nZ2xlYWxsJzogIXNob3dUb2dnbGVBbGx9XCIgKm5nSWY9XCJzaG93SGVhZGVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwidWktY2hrYm94IHVpLXdpZGdldFwiICpuZ0lmPVwic2hvd1RvZ2dsZUFsbCAmJiAhc2VsZWN0aW9uTGltaXRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInVpLWhlbHBlci1oaWRkZW4tYWNjZXNzaWJsZVwiPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiByZWFkb25seT1cInJlYWRvbmx5XCIgW2NoZWNrZWRdPVwiaXNBbGxDaGVja2VkKClcIiAoZm9jdXMpPVwib25IZWFkZXJDaGVja2JveEZvY3VzKClcIiAoYmx1cik9XCJvbkhlYWRlckNoZWNrYm94Qmx1cigpXCIgKGtleWRvd24uc3BhY2UpPVwidG9nZ2xlQWxsKCRldmVudClcIj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1jaGtib3gtYm94IHVpLXdpZGdldCB1aS1jb3JuZXItYWxsIHVpLXN0YXRlLWRlZmF1bHRcIiBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWFjdGl2ZSc6aXNBbGxDaGVja2VkKCksICd1aS1zdGF0ZS1mb2N1cyc6IGhlYWRlckNoZWNrYm94Rm9jdXN9XCIgKGNsaWNrKT1cInRvZ2dsZUFsbCgkZXZlbnQpXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1jaGtib3gtaWNvbiB1aS1jbGlja2FibGUgcGlcIlxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsncGktY2hlY2snOmlzQWxsQ2hlY2tlZCgpLCAncGktbWludXMnOmlzUGFydGlhbGx5Q2hlY2tlZCgpfVwiPjwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ1aS1tdWx0aXNlbGVjdC1maWx0ZXItY29udGFpbmVyXCIgKm5nSWY9XCJmaWx0ZXJcIj5cbiAgICAgICAgPGlucHV0ICNmaWx0ZXJJbnB1dCB0eXBlPVwidGV4dFwiIHJvbGU9XCJ0ZXh0Ym94XCIgW3ZhbHVlXT1cImZpbHRlclZhbHVlfHwnJ1wiIChpbnB1dCk9XCJvbkZpbHRlcigpXCIgY2xhc3M9XCJ1aS1pbnB1dHRleHQgdWktd2lkZ2V0IHVpLXN0YXRlLWRlZmF1bHQgdWktY29ybmVyLWFsbFwiIFthdHRyLnBsYWNlaG9sZGVyXT1cImZpbHRlclBsYWNlSG9sZGVyXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwidWktbXVsdGlzZWxlY3QtZmlsdGVyLWljb24gcGkgcGktc2VhcmNoXCI+PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8YSBjbGFzcz1cInVpLW11bHRpc2VsZWN0LWNsb3NlIHVpLWNvcm5lci1hbGxcIiB0YWJpbmRleD1cIjBcIiAoY2xpY2spPVwiY2xvc2UoJGV2ZW50KVwiIChrZXlkb3duLmVudGVyKT1cImNsb3NlKCRldmVudClcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJwaSBwaS10aW1lc1wiPjwvc3Bhbj5cbiAgICAgIDwvYT5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInAtaGVhZGVyXCI+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJ1aS1tdWx0aXNlbGVjdC1pdGVtcy13cmFwcGVyXCIgW3N0eWxlLm1heC1oZWlnaHRdPVwidmlydHVhbFNjcm9sbCA/ICdhdXRvJyA6IChzY3JvbGxIZWlnaHR8fCdhdXRvJylcIj5cbiAgICAgIDx1bCBjbGFzcz1cInVpLW11bHRpc2VsZWN0LWl0ZW1zIHVpLW11bHRpc2VsZWN0LWxpc3QgdWktd2lkZ2V0LWNvbnRlbnQgdWktd2lkZ2V0IHVpLWNvcm5lci1hbGwgdWktaGVscGVyLXJlc2V0XCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhdmlydHVhbFNjcm9sbDsgZWxzZSB2aXJ0dWFsU2Nyb2xsTGlzdFwiPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtb3B0aW9uIGxldC1pPVwiaW5kZXhcIiBbbmdGb3JPZl09XCJvcHRpb25zXCI+XG4gICAgICAgICAgICA8cC1tdWx0aVNlbGVjdEl0ZW0gW29wdGlvbl09XCJvcHRpb25cIiBbc2VsZWN0ZWRdPVwiaXNTZWxlY3RlZChvcHRpb24udmFsdWUpXCIgKG9uQ2xpY2spPVwib25PcHRpb25DbGljaygkZXZlbnQpXCIgKG9uS2V5ZG93bik9XCJvbk9wdGlvbktleWRvd24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW21heFNlbGVjdGlvbkxpbWl0UmVhY2hlZF09XCJtYXhTZWxlY3Rpb25MaW1pdFJlYWNoZWRcIiBbdmlzaWJsZV09XCJpc0l0ZW1WaXNpYmxlKG9wdGlvbilcIiBbdGVtcGxhdGVdPVwiaXRlbVRlbXBsYXRlXCI+PC9wLW11bHRpU2VsZWN0SXRlbT5cbiAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLXRlbXBsYXRlICN2aXJ0dWFsU2Nyb2xsTGlzdD5cbiAgICAgICAgICA8Y2RrLXZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0ICN2aWV3cG9ydCBbbmdTdHlsZV09XCJ7J2hlaWdodCc6IHNjcm9sbEhlaWdodH1cIiBbaXRlbVNpemVdPVwiaXRlbVNpemVcIiAqbmdJZj1cInZpcnR1YWxTY3JvbGxcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKmNka1ZpcnR1YWxGb3I9XCJsZXQgb3B0aW9uIG9mIG9wdGlvbnM7IGxldCBpID0gaW5kZXg7IGxldCBjID0gY291bnQ7IGxldCBmID0gZmlyc3Q7IGxldCBsID0gbGFzdDsgbGV0IGUgPSBldmVuOyBsZXQgbyA9IG9kZFwiPlxuICAgICAgICAgICAgICA8cC1tdWx0aVNlbGVjdEl0ZW0gW29wdGlvbl09XCJvcHRpb25cIiBbc2VsZWN0ZWRdPVwiaXNTZWxlY3RlZChvcHRpb24udmFsdWUpXCIgKG9uQ2xpY2spPVwib25PcHRpb25DbGljaygkZXZlbnQpXCIgKG9uS2V5ZG93bik9XCJvbk9wdGlvbktleWRvd24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbWF4U2VsZWN0aW9uTGltaXRSZWFjaGVkXT1cIm1heFNlbGVjdGlvbkxpbWl0UmVhY2hlZFwiIFt2aXNpYmxlXT1cImlzSXRlbVZpc2libGUob3B0aW9uKVwiIFt0ZW1wbGF0ZV09XCJpdGVtVGVtcGxhdGVcIiBbaXRlbVNpemVdPVwiaXRlbVNpemVcIj48L3AtbXVsdGlTZWxlY3RJdGVtPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPC9jZGstdmlydHVhbC1zY3JvbGwtdmlld3BvcnQ+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8L3VsPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJ1aS1tdWx0aXNlbGVjdC1mb290ZXIgdWktd2lkZ2V0LWNvbnRlbnRcIiAqbmdJZj1cImZvb3RlckZhY2V0XCI+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJwLWZvb3RlclwiPjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdvdmVybGF5QW5pbWF0aW9uJywgW1xuICAgICAgc3RhdGUoJ3ZvaWQnLCBzdHlsZSh7XG4gICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoNSUpJyxcbiAgICAgICAgb3BhY2l0eTogMFxuICAgICAgfSkpLFxuICAgICAgc3RhdGUoJ3Zpc2libGUnLCBzdHlsZSh7XG4gICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMCknLFxuICAgICAgICBvcGFjaXR5OiAxXG4gICAgICB9KSksXG4gICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IHZpc2libGUnLCBhbmltYXRlKCd7e3Nob3dUcmFuc2l0aW9uUGFyYW1zfX0nKSksXG4gICAgICB0cmFuc2l0aW9uKCd2aXNpYmxlID0+IHZvaWQnLCBhbmltYXRlKCd7e2hpZGVUcmFuc2l0aW9uUGFyYW1zfX0nKSlcbiAgICBdKVxuICBdLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy51aS1pbnB1dHdyYXBwZXItZmlsbGVkXSc6ICdmaWxsZWQnLFxuICAgICdbY2xhc3MudWktaW5wdXR3cmFwcGVyLWZvY3VzXSc6ICdmb2N1cydcbiAgfSxcbiAgcHJvdmlkZXJzOiBbS0FMVFVSQV9NVUxUSVNFTEVDVF9WQUxVRV9BQ0NFU1NPUl1cbiAgLyogdHNsaW50OmVuYWJsZSAqL1xufSlcbmV4cG9ydCBjbGFzcyBNdWx0aVNlbGVjdENvbXBvbmVudCBleHRlbmRzIE11bHRpU2VsZWN0IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgQElucHV0KCkgZGlzYWJsZWRMYWJlbDogc3RyaW5nO1xuICBASW5wdXQoKSBhbGxTZWxlY3RlZExhYmVsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNlbGVjdEFsbExhYmVsID0gJ1NlbGVjdCBBbGwnO1xuICBASW5wdXQoKSBtZW51SXRlbURpc3BsYXlTdHlsZSA9ICdibG9jayc7XG4gIEBJbnB1dCgpIGhpZGVPblNjcm9sbDogc3RyaW5nIHwgRWxlbWVudDtcblxuICBwcml2YXRlIF9oaWRlT25TY3JvbGxMaXN0ZW5lcjogKCkgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgIHB1YmxpYyByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICAgICAgICBwcml2YXRlIF9jZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICBzdXBlcihlbCwgcmVuZGVyZXIsIF9jZCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuICAgIHRoaXMuX3JlbW92ZUhpZGVPblNjcm9sbEhhbmRsZXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZEhpZGVPblNjcm9sbEhhbmRsZXIoKSB7XG4gICAgaWYgKHRoaXMuaGlkZU9uU2Nyb2xsKSB7XG4gICAgICBjb25zdCBsaXN0ZW5FbGVtZW50ID0gdHlwZW9mIHRoaXMuaGlkZU9uU2Nyb2xsID09PSAnc3RyaW5nJ1xuICAgICAgICA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5oaWRlT25TY3JvbGwpXG4gICAgICAgIDogdGhpcy5oaWRlT25TY3JvbGw7XG5cbiAgICAgIGlmIChsaXN0ZW5FbGVtZW50IGluc3RhbmNlb2YgRWxlbWVudCkge1xuICAgICAgICB0aGlzLl9oaWRlT25TY3JvbGxMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGxpc3RlbkVsZW1lbnQsICdzY3JvbGwnLCAoKSA9PiB0aGlzLmhpZGUoKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlSGlkZU9uU2Nyb2xsSGFuZGxlcigpIHtcbiAgICBpZiAodGhpcy5oaWRlT25TY3JvbGwgJiYgdGhpcy5faGlkZU9uU2Nyb2xsTGlzdGVuZXIpIHtcbiAgICAgIHRoaXMuX2hpZGVPblNjcm9sbExpc3RlbmVyKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNob3coKTogdm9pZCB7XG4gICAgc3VwZXIuc2hvdygpO1xuICAgIHRoaXMuX2FkZEhpZGVPblNjcm9sbEhhbmRsZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBoaWRlKCk6IHZvaWQge1xuICAgIHN1cGVyLmhpZGUoKTtcbiAgICB0aGlzLl9yZW1vdmVIaWRlT25TY3JvbGxIYW5kbGVyKCk7XG4gIH1cblxuICBwdWJsaWMgaXNQYXJ0aWFsbHlDaGVja2VkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5pc0FsbENoZWNrZWQoKSAmJiAodGhpcy52YWx1ZSB8fCBbXSkubGVuZ3RoID4gMDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTZWxlY3RJdGVtIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwLW11bHRpU2VsZWN0SXRlbScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGxpIGNsYXNzPVwidWktbXVsdGlzZWxlY3QtaXRlbSB1aS1jb3JuZXItYWxsXCIgKGNsaWNrKT1cIm9uT3B0aW9uQ2xpY2soJGV2ZW50KVwiIChrZXlkb3duKT1cIm9uT3B0aW9uS2V5ZG93bigkZXZlbnQpXCJcbiAgICAgICAgW3N0eWxlLmRpc3BsYXldPVwidmlzaWJsZSA/ICdibG9jaycgOiAnbm9uZSdcIiBbYXR0ci50YWJpbmRleF09XCJvcHRpb24uZGlzYWJsZWQgPyBudWxsIDogJzAnXCIgW25nU3R5bGVdPVwieydoZWlnaHQnOiBpdGVtU2l6ZSArICdweCd9XCJcbiAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1oaWdobGlnaHQnOiBzZWxlY3RlZCwgJ3VpLXN0YXRlLWRpc2FibGVkJzogKG9wdGlvbi5kaXNhYmxlZCB8fCAobWF4U2VsZWN0aW9uTGltaXRSZWFjaGVkICYmICFzZWxlY3RlZCkpfVwiPlxuICAgICAgPGRpdiBjbGFzcz1cInVpLWNoa2JveCB1aS13aWRnZXRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInVpLWNoa2JveC1ib3ggdWktd2lkZ2V0IHVpLWNvcm5lci1hbGwgdWktc3RhdGUtZGVmYXVsdFwiXG4gICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1hY3RpdmUnOiBzZWxlY3RlZH1cIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLWNoa2JveC1pY29uIHVpLWNsaWNrYWJsZVwiIFtuZ0NsYXNzXT1cInsncGkgcGktY2hlY2snOiBzZWxlY3RlZH1cIj48L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8bGFiZWwgKm5nSWY9XCIhdGVtcGxhdGVcIj57e29wdGlvbi5sYWJlbH19PC9sYWJlbD5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0ZW1wbGF0ZTsgY29udGV4dDogeyRpbXBsaWNpdDogb3B0aW9ufVwiPjwvbmctY29udGFpbmVyPlxuICAgIDwvbGk+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTXVsdGlTZWxlY3RJdGVtIHtcbiAgXG4gIEBJbnB1dCgpIG9wdGlvbjogU2VsZWN0SXRlbTtcbiAgXG4gIEBJbnB1dCgpIHNlbGVjdGVkOiBib29sZWFuO1xuICBcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG4gIFxuICBASW5wdXQoKSB2aXNpYmxlOiBib29sZWFuO1xuICBcbiAgQElucHV0KCkgaXRlbVNpemU6IG51bWJlcjtcbiAgXG4gIEBJbnB1dCgpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBcbiAgQElucHV0KCkgbWF4U2VsZWN0aW9uTGltaXRSZWFjaGVkOiBib29sZWFuO1xuICBcbiAgQE91dHB1dCgpIG9uQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBcbiAgQE91dHB1dCgpIG9uS2V5ZG93bjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIFxuICBvbk9wdGlvbkNsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgIHRoaXMub25DbGljay5lbWl0KHtcbiAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgb3B0aW9uOiB0aGlzLm9wdGlvblxuICAgIH0pO1xuICB9XG4gIFxuICBvbk9wdGlvbktleWRvd24oZXZlbnQ6IEV2ZW50KSB7XG4gICAgdGhpcy5vbktleWRvd24uZW1pdCh7XG4gICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgIG9wdGlvbjogdGhpcy5vcHRpb25cbiAgICB9KTtcbiAgfVxufSIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgVG9vbHRpcE1vZHVsZSB9IGZyb20gJ0BrYWx0dXJhLW5nL2thbHR1cmEtdWknO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9jb21wb25lbnRzL2NvbW1vbi9zaGFyZWQnO1xuaW1wb3J0IHsgTXVsdGlTZWxlY3RDb21wb25lbnQgfSBmcm9tICcuL211bHRpLXNlbGVjdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTXVsdGlTZWxlY3RNb2R1bGUgYXMgUHJpbWVNdWx0aVNlbGVjdE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XG5pbXBvcnQgeyBNdWx0aVNlbGVjdEl0ZW0gfSBmcm9tICcuL211bHRpLXNlbGVjdC1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTY3JvbGxpbmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIFByaW1lTXVsdGlTZWxlY3RNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFNoYXJlZE1vZHVsZSxcbiAgICBUb29sdGlwTW9kdWxlLFxuICAgIFNjcm9sbGluZ01vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtNdWx0aVNlbGVjdENvbXBvbmVudCwgTXVsdGlTZWxlY3RJdGVtXSxcbiAgZXhwb3J0czogW011bHRpU2VsZWN0Q29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgTXVsdGlTZWxlY3RNb2R1bGUge1xufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFByaW1lQ29udHJvbCB9IGZyb20gJy4vcHJpbWUtY29udHJvbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyAgSW5wdXRUZXh0TW9kdWxlLCBJbnB1dFRleHRhcmVhTW9kdWxlLCAgQ2FsZW5kYXJNb2R1bGUsICBEcm9wZG93bk1vZHVsZSwgSW5wdXRTd2l0Y2hNb2R1bGUgfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xuaW1wb3J0IHsgUHJpbWVMaXN0T3B0aW9uc1BpcGUgfSBmcm9tICcuL3ByaW1lLWxpc3Qtb3B0aW9ucy5waXBlJztcbmltcG9ydCB7IE11bHRpU2VsZWN0TW9kdWxlIH0gZnJvbSAnLi4vbXVsdGktc2VsZWN0L211bHRpLXNlbGVjdC5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoXG4gICAge1xuICAgICAgICBpbXBvcnRzIDogW1xuICAgICAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICAgICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgICAgIERyb3Bkb3duTW9kdWxlLFxuXHQgICAgICAgIE11bHRpU2VsZWN0TW9kdWxlLFxuICAgICAgICAgICAgSW5wdXRUZXh0TW9kdWxlLFxuICAgICAgICAgICAgSW5wdXRUZXh0YXJlYU1vZHVsZSxcbiAgICAgICAgICAgIENhbGVuZGFyTW9kdWxlLFxuICAgICAgICAgICAgSW5wdXRTd2l0Y2hNb2R1bGVcblxuICAgICAgICBdLFxuICAgICAgICBkZWNsYXJhdGlvbnMgOiBbXG4gICAgICAgICAgICBQcmltZUNvbnRyb2wsXG4gICAgICAgICAgICBQcmltZUxpc3RPcHRpb25zUGlwZVxuICAgICAgICBdLFxuICAgICAgICBleHBvcnRzIDogW1xuICAgICAgICAgICAgUHJpbWVDb250cm9sXG4gICAgICAgIF1cbiAgICB9XG4pXG5leHBvcnQgY2xhc3MgRHluYW1pY0Zvcm1Nb2R1bGVcbntcblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBmb3J3YXJkUmVmLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gXCJwcmltZW5nL2NvbXBvbmVudHMvZG9tL2RvbWhhbmRsZXJcIjtcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgU2xpZGVyIH0gZnJvbSBcInByaW1lbmcvcHJpbWVuZ1wiO1xuXG4vKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuZXhwb3J0IGNvbnN0IEtBTFRVUkFfU0xJREVSX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBTbGlkZXJDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuLyogdHNsaW50OmVuYWJsZSAqL1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdrU2xpZGVyJyxcbiAgc3R5bGVzOiBbYDpob3N0IC9kZWVwLyAudWktc2xpZGVye2JhY2tncm91bmQtY29sb3I6I2NjYztoZWlnaHQ6NnB4O2JvcmRlcjpub25lfTpob3N0IC9kZWVwLyAudWktc2xpZGVyIC51aS1zbGlkZXItcmFuZ2V7YmFja2dyb3VuZDojMDBhNzg0O2JvcmRlcjoycHggc29saWQgIzAwYTc4NH06aG9zdCAvZGVlcC8gLnVpLXNsaWRlciAudWktc2xpZGVyLWhhbmRsZXt0b3A6LS4zZW07bWFyZ2luLWxlZnQ6LS42ZW07Ym9yZGVyLXJhZGl1czo1MCU7Ym9yZGVyOjJweCBzb2xpZCAjMDBhNzg0O2hlaWdodDoxNnB4O3dpZHRoOjE2cHg7Ym94LXNoYWRvdzowIDJweCA4cHggMCByZ2JhKDAsMCwwLC4yNCl9YF0sXG4gIHRlbXBsYXRlOiBgPGRpdiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCJcbiAgICAgW25nQ2xhc3NdPVwie1xuICAgICAgICAgJ3VpLXNsaWRlciB1aS13aWRnZXQgdWktd2lkZ2V0LWNvbnRlbnQgdWktY29ybmVyLWFsbCc6dHJ1ZSxcbiAgICAgICAgICd1aS1zdGF0ZS1kaXNhYmxlZCc6ZGlzYWJsZWQsXG4gICAgICAgICAndWktc2xpZGVyLWhvcml6b250YWwnOm9yaWVudGF0aW9uID09ICdob3Jpem9udGFsJyxcbiAgICAgICAgICd1aS1zbGlkZXItdmVydGljYWwnOm9yaWVudGF0aW9uID09ICd2ZXJ0aWNhbCcsXG4gICAgICAgICAndWktc2xpZGVyLWFuaW1hdGUnOmFuaW1hdGVcbiAgICAgfVwiXG4gICAgIChjbGljayk9XCJvbkJhckNsaWNrKCRldmVudClcIj5cblxuICAgIDxzcGFuICpuZ0lmPVwicmFuZ2UgJiYgb3JpZW50YXRpb24gPT0gJ2hvcml6b250YWwnXCJcbiAgICAgICAgICBjbGFzcz1cInVpLXNsaWRlci1yYW5nZSB1aS13aWRnZXQtaGVhZGVyIHVpLWNvcm5lci1hbGxcIlxuICAgICAgICAgIFtuZ1N0eWxlXT1cInsnbGVmdCc6aGFuZGxlVmFsdWVzWzBdICsgJyUnLHdpZHRoOiAoaGFuZGxlVmFsdWVzWzFdIC0gaGFuZGxlVmFsdWVzWzBdICsgJyUnKX1cIj48L3NwYW4+XG5cbiAgICA8c3BhbiAqbmdJZj1cInJhbmdlICYmIG9yaWVudGF0aW9uID09ICd2ZXJ0aWNhbCdcIlxuICAgICAgICAgIGNsYXNzPVwidWktc2xpZGVyLXJhbmdlIHVpLXdpZGdldC1oZWFkZXIgdWktY29ybmVyLWFsbFwiXG4gICAgICAgICAgW25nU3R5bGVdPVwieydib3R0b20nOmhhbmRsZVZhbHVlc1swXSArICclJyxoZWlnaHQ6IChoYW5kbGVWYWx1ZXNbMV0gLSBoYW5kbGVWYWx1ZXNbMF0gKyAnJScpfVwiPjwvc3Bhbj5cblxuICAgIDxzcGFuICpuZ0lmPVwiIXJhbmdlICYmIG9yaWVudGF0aW9uPT0ndmVydGljYWwnXCJcbiAgICAgICAgICBjbGFzcz1cInVpLXNsaWRlci1yYW5nZSB1aS1zbGlkZXItcmFuZ2UtbWluIHVpLXdpZGdldC1oZWFkZXIgdWktY29ybmVyLWFsbFwiXG4gICAgICAgICAgW25nU3R5bGVdPVwieydoZWlnaHQnOiBoYW5kbGVWYWx1ZSArICclJ31cIj48L3NwYW4+XG5cbiAgICA8c3BhbiAqbmdJZj1cIiFyYW5nZSAmJiBvcmllbnRhdGlvbj09J2hvcml6b250YWwnXCJcbiAgICAgICAgICBjbGFzcz1cInVpLXNsaWRlci1yYW5nZSB1aS1zbGlkZXItcmFuZ2UtbWluIHVpLXdpZGdldC1oZWFkZXIgdWktY29ybmVyLWFsbFwiXG4gICAgICAgICAgW25nU3R5bGVdPVwieyd3aWR0aCc6IGhhbmRsZVZhbHVlICsgJyUnfVwiPjwvc3Bhbj5cblxuICAgIDxzcGFuICpuZ0lmPVwiIXJhbmdlXCJcbiAgICAgICAgICBjbGFzcz1cInVpLXNsaWRlci1oYW5kbGUgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsIHVpLWNsaWNrYWJsZVwiXG4gICAgICAgICAgKG1vdXNlZG93bik9XCJvbk1vdXNlRG93bigkZXZlbnQpXCJcbiAgICAgICAgICAodG91Y2hzdGFydCk9XCJvblRvdWNoU3RhcnQoJGV2ZW50KVwiXG4gICAgICAgICAgKHRvdWNobW92ZSk9XCJvblRvdWNoTW92ZSgkZXZlbnQpXCJcbiAgICAgICAgICAodG91Y2hlbmQpPVwiZHJhZ2dpbmc9ZmFsc2VcIlxuICAgICAgICAgIFtzdHlsZS50cmFuc2l0aW9uXT1cImRyYWdnaW5nID8gJ25vbmUnOiBudWxsXCJcbiAgICAgICAgICBbbmdTdHlsZV09XCJ7XG4gICAgICAgICAgICAnbGVmdCc6IG9yaWVudGF0aW9uID09ICdob3Jpem9udGFsJyA/IGhhbmRsZVZhbHVlICsgJyUnIDogbnVsbCxcbiAgICAgICAgICAgICdib3R0b20nOiBvcmllbnRhdGlvbiA9PSAndmVydGljYWwnID8gaGFuZGxlVmFsdWUgKyAnJScgOiBudWxsXG4gICAgICAgICAgfVwiXG4gICAgICAgICAgW2tUb29sdGlwXT1cInRvb2x0aXAgPyB2YWx1ZSA6ICcnXCJcbiAgICAgICAgICBbZm9sbG93VGFyZ2V0XT1cInRydWVcIj48L3NwYW4+XG5cbiAgICA8c3BhbiAqbmdJZj1cInJhbmdlXCJcbiAgICAgICAgICAobW91c2Vkb3duKT1cIm9uTW91c2VEb3duKCRldmVudCwwKVwiXG4gICAgICAgICAgKHRvdWNoc3RhcnQpPVwib25Ub3VjaFN0YXJ0KCRldmVudCwwKVwiXG4gICAgICAgICAgKHRvdWNobW92ZSk9XCJvblRvdWNoTW92ZSgkZXZlbnQsMClcIlxuICAgICAgICAgICh0b3VjaGVuZCk9XCJkcmFnZ2luZz1mYWxzZVwiXG4gICAgICAgICAgW3N0eWxlLnRyYW5zaXRpb25dPVwiZHJhZ2dpbmcgPyAnbm9uZSc6IG51bGxcIlxuICAgICAgICAgIGNsYXNzPVwidWktc2xpZGVyLWhhbmRsZSB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGwgdWktY2xpY2thYmxlXCJcbiAgICAgICAgICBbbmdTdHlsZV09XCJ7J2xlZnQnOiByYW5nZVN0YXJ0TGVmdCwgJ2JvdHRvbSc6IHJhbmdlU3RhcnRCb3R0b219XCJcbiAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXNsaWRlci1oYW5kbGUtYWN0aXZlJzpoYW5kbGVJbmRleD09MH1cIlxuICAgICAgICAgIFtrVG9vbHRpcF09XCJ0b29sdGlwID8gdmFsdWVzW2hhbmRsZUluZGV4XSA6ICcnXCJcbiAgICAgICAgICBbZm9sbG93VGFyZ2V0XT1cInRydWVcIj48L3NwYW4+XG5cbiAgICA8c3BhbiAqbmdJZj1cInJhbmdlXCJcbiAgICAgICAgICAobW91c2Vkb3duKT1cIm9uTW91c2VEb3duKCRldmVudCwxKVwiXG4gICAgICAgICAgKHRvdWNoc3RhcnQpPVwib25Ub3VjaFN0YXJ0KCRldmVudCwxKVwiXG4gICAgICAgICAgKHRvdWNobW92ZSk9XCJvblRvdWNoTW92ZSgkZXZlbnQsMSlcIlxuICAgICAgICAgICh0b3VjaGVuZCk9XCJkcmFnZ2luZz1mYWxzZVwiXG4gICAgICAgICAgW3N0eWxlLnRyYW5zaXRpb25dPVwiZHJhZ2dpbmcgPyAnbm9uZSc6IG51bGxcIlxuICAgICAgICAgIGNsYXNzPVwidWktc2xpZGVyLWhhbmRsZSB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGwgdWktY2xpY2thYmxlXCJcbiAgICAgICAgICBbbmdTdHlsZV09XCJ7J2xlZnQnOiByYW5nZUVuZExlZnQsICdib3R0b20nOiByYW5nZUVuZEJvdHRvbX1cIlxuICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktc2xpZGVyLWhhbmRsZS1hY3RpdmUnOmhhbmRsZUluZGV4PT0xfVwiXG4gICAgICAgICAgW2tUb29sdGlwXT1cInRvb2x0aXAgPyB2YWx1ZXNbaGFuZGxlSW5kZXhdIDogJydcIlxuICAgICAgICAgIFtmb2xsb3dUYXJnZXRdPVwidHJ1ZVwiPjwvc3Bhbj5cbjwvZGl2PmAsXG4gIHByb3ZpZGVyczogW0RvbUhhbmRsZXIsIEtBTFRVUkFfU0xJREVSX1ZBTFVFX0FDQ0VTU09SXVxuICAvKiB0c2xpbnQ6ZW5hYmxlICovXG59KVxuLy8gW2ttY25nXSB1cG9uIHVwZ3JhZGU6IGNvbXBhcmUgaW1wbGVtZW50ZWQgaW50ZXJmYWNlcyBpbiB0aGUgb3JpZ2luYWwgY29tcG9uZW50IChubyBuZWVkIHRvIGluY2x1ZGUgQ29udHJvbFZhbHVlQWNjZXNzb3IpXG5leHBvcnQgY2xhc3MgU2xpZGVyQ29tcG9uZW50IGV4dGVuZHMgU2xpZGVyIHtcbiAgQElucHV0KCkgdG9vbHRpcCA9IHRydWU7XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFRvb2x0aXBNb2R1bGUgfSBmcm9tICdAa2FsdHVyYS1uZy9rYWx0dXJhLXVpJztcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvY29tcG9uZW50cy9jb21tb24vc2hhcmVkJztcbmltcG9ydCB7IFNsaWRlckNvbXBvbmVudCB9IGZyb20gXCIuL3NsaWRlci5jb21wb25lbnRcIjtcbmltcG9ydCB7IFNsaWRlck1vZHVsZSBhcyBQcmltZVNsaWRlck1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBQcmltZVNsaWRlck1vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgU2hhcmVkTW9kdWxlLFxuICAgIFRvb2x0aXBNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtTbGlkZXJDb21wb25lbnRdLFxuICBleHBvcnRzOiBbU2xpZGVyQ29tcG9uZW50XSxcbiAgXG59KVxuZXhwb3J0IGNsYXNzIFNsaWRlck1vZHVsZSB7XG59IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIGZvcndhcmRSZWYsIE91dHB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcblxuZXhwb3J0IHR5cGUgSW5wdXRUeXBlID0gJ21pbnV0ZXMnIHwgJ3NlY29uZHMnO1xuXG5leHBvcnQgY29uc3QgU1BJTk5FUl9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gVGltZVNwaW5uZXJDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAna1RpbWVTcGlubmVyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwia1NwaW5uZXJDb250YWluZXJcIiBbY2xhc3MudWktc3RhdGUtZGlzYWJsZWRdPVwiX2Rpc2FibGVkXCI+XG4gICAgPGlucHV0ICNtaW51dGVzXG4gICAgICAgICAgIGNsYXNzPVwia01pbnV0ZXNcIlxuICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgIG1heGxlbmd0aD1cIjJcIlxuICAgICAgICAgICBbZGlzYWJsZWRdPVwiX2Rpc2FibGVkXCJcbiAgICAgICAgICAgW3ZhbHVlXT1cIl9taW51dGVzQXNTdHJpbmdcIlxuICAgICAgICAgICAoY2xpY2spPVwibWludXRlcy5zZWxlY3QoKVwiXG4gICAgICAgICAgIChrZXlkb3duKT1cIl9vbklucHV0S2V5ZG93bigkZXZlbnQpXCJcbiAgICAgICAgICAgKGtleXVwKT1cIl9vbklucHV0S2V5dXAoJGV2ZW50KVwiXG4gICAgICAgICAgIChrZXlwcmVzcyk9XCJfb25JbnB1dEtleVByZXNzKCRldmVudClcIlxuICAgICAgICAgICAoY2hhbmdlKT1cIl9oYW5kbGVDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgIChmb2N1cyk9XCJfb25JbnB1dEZvY3VzKCRldmVudCwgJ21pbnV0ZXMnKVwiXG4gICAgICAgICAgIChibHVyKT1cIl9vbklucHV0Qmx1cigkZXZlbnQpXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJrRGVsaW1pdGVyXCI+Ojwvc3Bhbj5cbiAgICA8aW5wdXQgI3NlY29uZHMgY2xhc3M9XCJrU2Vjb25kc1wiIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgW3ZhbHVlXT1cIl9zZWNvbmRzQXNTdHJpbmdcIlxuICAgICAgICAgICBbZGlzYWJsZWRdPVwiX2Rpc2FibGVkXCJcbiAgICAgICAgICAgKGNsaWNrKT1cInNlY29uZHMuc2VsZWN0KClcIlxuICAgICAgICAgICAoa2V5ZG93bik9XCJfb25JbnB1dEtleWRvd24oJGV2ZW50KVwiXG4gICAgICAgICAgIChrZXl1cCk9XCJfb25JbnB1dEtleXVwKCRldmVudClcIlxuICAgICAgICAgICAoa2V5cHJlc3MpPVwiX29uSW5wdXRLZXlQcmVzcygkZXZlbnQpXCJcbiAgICAgICAgICAgKGNoYW5nZSk9XCJfaGFuZGxlQ2hhbmdlKCRldmVudClcIlxuICAgICAgICAgICAoZm9jdXMpPVwiX29uSW5wdXRGb2N1cygkZXZlbnQsICdzZWNvbmRzJylcIlxuICAgICAgICAgICAoYmx1cik9XCJfb25JbnB1dEJsdXIoJGV2ZW50KVwiPlxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXNwaW5uZXItYnV0dG9uIHVpLXNwaW5uZXItdXAgdWktY29ybmVyLXRyIHVpLWJ1dHRvbiB1aS13aWRnZXQgdWktc3RhdGUtZGVmYXVsdCc6dHJ1ZSwndWktc3RhdGUtZGlzYWJsZWQnOl9kaXNhYmxlZH1cIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cIl9kaXNhYmxlZFwiXG4gICAgICAgICAgICAobW91c2VsZWF2ZSk9XCJfb25CdXR0b25Nb3VzZWxlYXZlKCRldmVudClcIlxuICAgICAgICAgICAgKG1vdXNlZG93bik9XCJfb25CdXR0b25Nb3VzZWRvd24oJGV2ZW50LCAxKVwiXG4gICAgICAgICAgICAobW91c2V1cCk9XCJfb25CdXR0b25Nb3VzZXVwKCRldmVudClcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJrSWNvbmRyb3Bkb3duX2Fycm93X3RvcCBrU3Bpbm5lckJ0blwiPjwvc3Bhbj5cbiAgICA8L2J1dHRvbj5cbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgY2xhc3M9XCJrU3BpbkRvd25cIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1zcGlubmVyLWJ1dHRvbiB1aS1zcGlubmVyLWRvd24gdWktY29ybmVyLWJyIHVpLWJ1dHRvbiB1aS13aWRnZXQgdWktc3RhdGUtZGVmYXVsdCc6dHJ1ZSwndWktc3RhdGUtZGlzYWJsZWQnOl9kaXNhYmxlZH1cIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cIl9kaXNhYmxlZFwiXG4gICAgICAgICAgICAobW91c2VsZWF2ZSk9XCJfb25CdXR0b25Nb3VzZWxlYXZlKCRldmVudClcIlxuICAgICAgICAgICAgKG1vdXNlZG93bik9XCJfb25CdXR0b25Nb3VzZWRvd24oJGV2ZW50LCAtMSlcIlxuICAgICAgICAgICAgKG1vdXNldXApPVwiX29uQnV0dG9uTW91c2V1cCgkZXZlbnQpXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwia0ljb25kcm9wZG93bl9hcnJvd19ib3R0b20ga1NwaW5uZXJCdG5cIj48L3NwYW4+XG4gICAgPC9idXR0b24+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2Aua1NwaW5uZXJDb250YWluZXJ7YmFja2dyb3VuZC1jb2xvcjojZmZmO3dpZHRoOjc4cHg7aGVpZ2h0OjE2cHg7ZGlzcGxheTppbmxpbmUtYmxvY2s7b3ZlcmZsb3c6dmlzaWJsZTtwb3NpdGlvbjpyZWxhdGl2ZTt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7Ym9yZGVyOjFweCBzb2xpZCAjY2NjO2JvcmRlci1yYWRpdXM6M3B4O3BhZGRpbmc6NXB4IDEwcHggMTFweCAwfS5rU3Bpbm5lckNvbnRhaW5lciBpbnB1dHtib3JkZXI6MDt3aWR0aDoyNXB4O2hlaWdodDoxOHB4O2ZvbnQtc2l6ZToxNXB4O2NvbG9yOiM5OTk7Zm9udC13ZWlnaHQ6MTAwfS5rU3Bpbm5lckNvbnRhaW5lciBpbnB1dDpmb2N1c3tvdXRsaW5lOjB9LmtTcGlubmVyQ29udGFpbmVyIC5rRGVsaW1pdGVye2NvbG9yOiM5OTk7Zm9udC13ZWlnaHQ6MTAwfS5rU3Bpbm5lckNvbnRhaW5lciAua01pbnV0ZXN7dGV4dC1hbGlnbjpyaWdodH0ua1NwaW5uZXJDb250YWluZXIgLmtTcGlubmVyQnRue2ZvbnQtc2l6ZToxMHB4O2NvbG9yOiMzMzN9LmtTcGlubmVyQ29udGFpbmVyIC51aS1zdGF0ZS1kaXNhYmxlZHtvcGFjaXR5Oi4zNTtmaWx0ZXI6QWxwaGEoT3BhY2l0eT0zNSk7YmFja2dyb3VuZC1pbWFnZTpub25lO2N1cnNvcjpkZWZhdWx0IWltcG9ydGFudH0ua1NwaW5uZXJDb250YWluZXIgLnVpLXNwaW5uZXItYnV0dG9ue2JvcmRlcjowO21hcmdpbi1yaWdodDoxcHg7aGVpZ2h0OjE0cHg7Y3Vyc29yOnBvaW50ZXJ9LmtTcGlubmVyQ29udGFpbmVyIC51aS1zcGlubmVyLWRvd257bWFyZ2luLWJvdHRvbTo1cHh9YF0sXG4gIHByb3ZpZGVyczogW0RvbUhhbmRsZXIsIFNQSU5ORVJfVkFMVUVfQUNDRVNTT1JdLFxufSlcbmV4cG9ydCBjbGFzcyBUaW1lU3Bpbm5lckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgQFZpZXdDaGlsZCgnbWludXRlcycpIG1pbnV0ZXNJbnB1dEZpZWxkOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdzZWNvbmRzJykgc2Vjb25kc0lucHV0RmllbGQ6IEVsZW1lbnRSZWY7XG4gIFxuICBAT3V0cHV0KCkgb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25Gb2N1czogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvbkJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBcbiAgcHJpdmF0ZSBfYWxsb3dlZEtleXMgPSBbXG4gICAgOSwgIC8vIHRhYlxuICAgIDgsICAvLyBiYWNrc3BhY2VcbiAgICAzNywgLy8gbGVmdEFycm93XG4gICAgMzksIC8vIHJpZ2h0QXJyb3dcbiAgICA0NiAgLy8gZGVsZXRlQnRuXG4gIF07XG4gIHByaXZhdGUgX3NwaW5LZXlzID0ge1xuICAgIHVwQXJyb3c6IDM4LFxuICAgIHJpZ2h0QXJyb3c6IDM5LFxuICAgIGRvd25BcnJvdzogNDAsXG4gICAgbGVmdEFycm93OiAzN1xuICB9O1xuICBwcml2YXRlIF9jdXJyZW50SW5wdXQ6IElucHV0VHlwZSA9ICdtaW51dGVzJztcbiAgcHJpdmF0ZSBfa2V5UGF0dGVybjogUmVnRXhwID0gL1swLTldLztcbiAgcHJpdmF0ZSBfdGltZXI6IGFueTtcbiAgXG4gIHB1YmxpYyBfbWludXRlc0FzU3RyaW5nID0gJzAwJztcbiAgcHVibGljIF9zZWNvbmRzQXNTdHJpbmcgPSAnMDAnO1xuICBcbiAgcHVibGljIF9taW51dGVzID0gMDtcbiAgcHVibGljIF9zZWNvbmRzID0gMDtcbiAgcHVibGljIF9kaXNhYmxlZCA9IGZhbHNlO1xuICBcbiAgcHVibGljIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge1xuICB9O1xuICBcbiAgcHVibGljIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHtcbiAgfTtcbiAgXG4gIHByaXZhdGUgX3NwaW4oZXZlbnQ6IEV2ZW50LCBkaXI6IG51bWJlcikge1xuICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMuX2dldEN1cnJlbnRJbnB1dFZhbHVlKCk7XG4gICAgbGV0IG5leHRWYWx1ZSA9IGN1cnJlbnRWYWx1ZTtcbiAgICBpZiAoY3VycmVudFZhbHVlID09PSAwICYmIGRpciA9PT0gLTEpIHtcbiAgICAgIG5leHRWYWx1ZSA9IDU5O1xuICAgIH0gZWxzZSBpZiAoY3VycmVudFZhbHVlID09PSA1OSAmJiBkaXIgPT09IDEpIHtcbiAgICAgIG5leHRWYWx1ZSA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5leHRWYWx1ZSA9IGN1cnJlbnRWYWx1ZSArIGRpcjtcbiAgICB9XG4gICAgXG4gICAgdGhpcy5fc2V0Q3VycmVudElucHV0VmFsdWUobmV4dFZhbHVlKTtcbiAgICB0aGlzLl9mb3JtYXRWYWx1ZSgpO1xuICAgIFxuICAgIHRoaXMub25Nb2RlbENoYW5nZSgodGhpcy5fbWludXRlcyAqIDYwKSArIHRoaXMuX3NlY29uZHMpO1xuICAgIHRoaXMub25DaGFuZ2UuZW1pdChldmVudCk7XG4gIH1cbiAgXG4gIHByaXZhdGUgX2dldEN1cnJlbnRJbnB1dFZhbHVlKCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRJbnB1dCA9PT0gJ21pbnV0ZXMnKSB7XG4gICAgICByZXR1cm4gdGhpcy5fbWludXRlcztcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2N1cnJlbnRJbnB1dCA9PT0gJ3NlY29uZHMnKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2Vjb25kcztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoJ011c3Qgbm90IHJlYWNoIHRoaXMgcGFydCcpO1xuICAgIH1cbiAgfVxuICBcbiAgcHJpdmF0ZSBfc2V0Q3VycmVudElucHV0VmFsdWUodmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLl9jdXJyZW50SW5wdXQgPT09ICdtaW51dGVzJykge1xuICAgICAgdGhpcy5fbWludXRlcyA9IHZhbHVlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fY3VycmVudElucHV0ID09PSAnc2Vjb25kcycpIHtcbiAgICAgIHRoaXMuX3NlY29uZHMgPSB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoJ011c3Qgbm90IHJlYWNoIHRoaXMgcGFydCcpO1xuICAgIH1cbiAgfVxuICBcbiAgcHJpdmF0ZSBfc2V0VmFsdWUoaW5wdXQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGxldCB2YWx1ZSA9IE51bWJlcihpbnB1dCk7XG4gICAgdmFsdWUgPSBpc05hTih2YWx1ZSkgPyAwIDogdmFsdWU7XG4gICAgXG4gICAgaWYgKHZhbHVlID4gNTkpIHtcbiAgICAgIHRoaXMuX3NldEN1cnJlbnRJbnB1dFZhbHVlKDU5KTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlIDwgMCkge1xuICAgICAgdGhpcy5fc2V0Q3VycmVudElucHV0VmFsdWUoMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3NldEN1cnJlbnRJbnB1dFZhbHVlKHZhbHVlKTtcbiAgICB9XG4gIH1cbiAgXG4gIHByaXZhdGUgX2hpZ2hsaWdodElucHV0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9jdXJyZW50SW5wdXQgPT09ICdtaW51dGVzJykge1xuICAgICAgdGhpcy5taW51dGVzSW5wdXRGaWVsZC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICB0aGlzLm1pbnV0ZXNJbnB1dEZpZWxkLm5hdGl2ZUVsZW1lbnQuc2VsZWN0KCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9jdXJyZW50SW5wdXQgPT09ICdzZWNvbmRzJykge1xuICAgICAgdGhpcy5zZWNvbmRzSW5wdXRGaWVsZC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICB0aGlzLnNlY29uZHNJbnB1dEZpZWxkLm5hdGl2ZUVsZW1lbnQuc2VsZWN0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEVycm9yKCdNdXN0IG5vdCByZWFjaCB0aGlzIHBhcnQnKTtcbiAgICB9XG4gIH1cbiAgXG4gIHByaXZhdGUgX2NsZWFyVGltZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3RpbWVyKSB7XG4gICAgICBjbGVhckludGVydmFsKHRoaXMuX3RpbWVyKTtcbiAgICB9XG4gIH1cbiAgXG4gIHByaXZhdGUgX3JlcGVhdChldmVudDogRXZlbnQsIGludGVydmFsOiBudW1iZXIsIGRpcjogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgaSA9IGludGVydmFsIHx8IDUwMDtcbiAgICBcbiAgICB0aGlzLl9jbGVhclRpbWVyKCk7XG4gICAgdGhpcy5fdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuX3JlcGVhdChldmVudCwgNDAsIGRpcik7XG4gICAgfSwgaSk7XG4gICAgXG4gICAgdGhpcy5fc3BpbihldmVudCwgZGlyKTtcbiAgfVxuICBcbiAgcHJpdmF0ZSBfZm9ybWF0VmFsdWUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRJbnB1dCA9PT0gJ21pbnV0ZXMnKSB7XG4gICAgICB0aGlzLl9taW51dGVzQXNTdHJpbmcgPSB0aGlzLl9taW51dGVzIDwgMTAgPyBgMCR7dGhpcy5fbWludXRlc31gIDogU3RyaW5nKHRoaXMuX21pbnV0ZXMpO1xuICAgICAgdGhpcy5taW51dGVzSW5wdXRGaWVsZC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5fbWludXRlc0FzU3RyaW5nO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fY3VycmVudElucHV0ID09PSAnc2Vjb25kcycpIHtcbiAgICAgIHRoaXMuX3NlY29uZHNBc1N0cmluZyA9IHRoaXMuX3NlY29uZHMgPCAxMCA/IGAwJHt0aGlzLl9zZWNvbmRzfWAgOiBTdHJpbmcodGhpcy5fc2Vjb25kcyk7XG4gICAgICB0aGlzLnNlY29uZHNJbnB1dEZpZWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLl9zZWNvbmRzQXNTdHJpbmc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEVycm9yKCdNdXN0IG5vdCByZWFjaCB0aGlzIHBhcnQnKTtcbiAgICB9XG4gIH1cbiAgXG4gIHByaXZhdGUgX3NldERlZmF1bHRWYWx1ZXMoKTogdm9pZCB7XG4gICAgdGhpcy5fbWludXRlcyA9IDA7XG4gICAgdGhpcy5fc2Vjb25kcyA9IDA7XG4gICAgdGhpcy5fc2Vjb25kc0FzU3RyaW5nID0gJzAwJztcbiAgICB0aGlzLl9taW51dGVzQXNTdHJpbmcgPSAnMDAnO1xuICB9XG4gIFxuICBwcml2YXRlIF9zZXRJbml0aWFsVmFsdWVzKHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9taW51dGVzID0gTWF0aC5mbG9vcih2YWx1ZSAvIDYwKTtcbiAgICB0aGlzLl9zZWNvbmRzID0gdmFsdWUgJSA2MDtcbiAgICB0aGlzLl9taW51dGVzQXNTdHJpbmcgPSB0aGlzLl9taW51dGVzIDwgMTAgPyBgMCR7dGhpcy5fbWludXRlc31gIDogU3RyaW5nKHRoaXMuX21pbnV0ZXMpO1xuICAgIHRoaXMubWludXRlc0lucHV0RmllbGQubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMuX21pbnV0ZXNBc1N0cmluZztcbiAgICB0aGlzLl9zZWNvbmRzQXNTdHJpbmcgPSB0aGlzLl9zZWNvbmRzIDwgMTAgPyBgMCR7dGhpcy5fc2Vjb25kc31gIDogU3RyaW5nKHRoaXMuX3NlY29uZHMpO1xuICAgIHRoaXMuc2Vjb25kc0lucHV0RmllbGQubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMuX3NlY29uZHNBc1N0cmluZztcbiAgfVxuICBcbiAgcHVibGljIF9vbklucHV0S2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmIChldmVudC53aGljaCA9PT0gdGhpcy5fc3BpbktleXMudXBBcnJvdyB8fCBldmVudC53aGljaCA9PT0gdGhpcy5fc3BpbktleXMucmlnaHRBcnJvdykge1xuICAgICAgLy8gaW5jcmVtZW50XG4gICAgICB0aGlzLl9zcGluKGV2ZW50LCAxKTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSBlbHNlIGlmIChldmVudC53aGljaCA9PT0gdGhpcy5fc3BpbktleXMuZG93bkFycm93IHx8IGV2ZW50LndoaWNoID09PSB0aGlzLl9zcGluS2V5cy5sZWZ0QXJyb3cpIHtcbiAgICAgIC8vIGRlY3JlbWVudFxuICAgICAgdGhpcy5fc3BpbihldmVudCwgLTEpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cbiAgXG4gIHB1YmxpYyBfb25JbnB1dEtleVByZXNzKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgaW5wdXRDaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShldmVudC5jaGFyQ29kZSk7XG4gICAgY29uc3Qgbm90QU51bWJlciA9ICF0aGlzLl9rZXlQYXR0ZXJuLnRlc3QoaW5wdXRDaGFyKTtcbiAgICBjb25zdCBub3RBbGxvd2VkS2V5ID0gdGhpcy5fYWxsb3dlZEtleXMuaW5kZXhPZihldmVudC5rZXlDb2RlKSA9PT0gLTE7XG4gICAgaWYgKG5vdEFOdW1iZXIgJiYgbm90QWxsb3dlZEtleSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cbiAgXG4gIHB1YmxpYyBfb25JbnB1dEtleXVwKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgaW5wdXRWYWx1ZSA9ICg8SFRNTElucHV0RWxlbWVudD4gZXZlbnQudGFyZ2V0KS52YWx1ZTtcbiAgICB0aGlzLl9zZXRWYWx1ZShpbnB1dFZhbHVlKTtcbiAgICB0aGlzLl9mb3JtYXRWYWx1ZSgpO1xuICAgIFxuICAgIHRoaXMub25Nb2RlbENoYW5nZSgodGhpcy5fbWludXRlcyAqIDYwKSArIHRoaXMuX3NlY29uZHMpO1xuICB9XG4gIFxuICBwdWJsaWMgX2hhbmRsZUNoYW5nZShldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UuZW1pdChldmVudCk7XG4gIH1cbiAgXG4gIHB1YmxpYyBfb25JbnB1dEZvY3VzKGV2ZW50OiBLZXlib2FyZEV2ZW50LCBpbnB1dDogSW5wdXRUeXBlKTogdm9pZCB7XG4gICAgdGhpcy5fY3VycmVudElucHV0ID0gaW5wdXQ7XG4gICAgdGhpcy5vbkZvY3VzLmVtaXQoZXZlbnQpO1xuICB9XG4gIFxuICBwdWJsaWMgX29uSW5wdXRCbHVyKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xuICAgIHRoaXMub25CbHVyLmVtaXQoZXZlbnQpO1xuICB9XG4gIFxuICBwdWJsaWMgX29uQnV0dG9uTW91c2Vkb3duKGV2ZW50OiBFdmVudCwgZGlyOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2Rpc2FibGVkKSB7XG4gICAgICB0aGlzLl9oaWdobGlnaHRJbnB1dCgpO1xuICAgICAgdGhpcy5fcmVwZWF0KGV2ZW50LCBudWxsLCBkaXIpO1xuICAgIH1cbiAgfVxuICBcbiAgcHVibGljIF9vbkJ1dHRvbk1vdXNldXAoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9kaXNhYmxlZCkge1xuICAgICAgdGhpcy5fY2xlYXJUaW1lcigpO1xuICAgIH1cbiAgfVxuICBcbiAgcHVibGljIF9vbkJ1dHRvbk1vdXNlbGVhdmUoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9kaXNhYmxlZCkge1xuICAgICAgdGhpcy5fY2xlYXJUaW1lcigpO1xuICAgIH1cbiAgfVxuICBcbiAgcHVibGljIHNldERpc2FibGVkU3RhdGUodmFsOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSB2YWw7XG4gIH1cbiAgXG4gIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5fc2V0RGVmYXVsdFZhbHVlcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zZXRJbml0aWFsVmFsdWVzKHZhbHVlKTtcbiAgICB9XG4gIH1cbiAgXG4gIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICB9XG4gIFxuICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICB9XG4gIFxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICdwcmltZW5nL2NvbXBvbmVudHMvY29tbW9uL3NoYXJlZCc7XG5pbXBvcnQgeyBUaW1lU3Bpbm5lckNvbXBvbmVudCB9IGZyb20gXCIuL3RpbWUtc3Bpbm5lci5jb21wb25lbnRcIjtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBTaGFyZWRNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1RpbWVTcGlubmVyQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1RpbWVTcGlubmVyQ29tcG9uZW50XSxcbiAgXG59KVxuZXhwb3J0IGNsYXNzIFRpbWVTcGlubmVyTW9kdWxlIHtcbn0iLCJcbmltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IFRhYmxlIH0gZnJvbSAncHJpbWVuZy90YWJsZSc7XG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1trcFNvcnRhYmxlQ29sdW1uXScsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLnVpLXNvcnRhYmxlLWNvbHVtbl0nOiAnaXNFbmFibGVkJyxcbiAgICAgICAgJ1tjbGFzcy51aS1zdGF0ZS1oaWdobGlnaHRdJzogJ3NvcnRlZCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIEtQU29ydGFibGVDb2x1bW4gaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoXCJrcFNvcnRhYmxlQ29sdW1uXCIpIGZpZWxkOiBzdHJpbmc7XG5cbiAgICBpc0VuYWJsZWQ6IGJvb2xlYW47XG4gICAgc29ydGVkOiBib29sZWFuO1xuXG4gICAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZHQ6IFRhYmxlKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5kdC50YWJsZVNlcnZpY2Uuc29ydFNvdXJjZSQuc3Vic2NyaWJlKHNvcnRNZXRhID0+IHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU29ydFN0YXRlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVNvcnRTdGF0ZSgpO1xuICAgICAgICB0aGlzLmlzRW5hYmxlZCA9ICEhdGhpcy5maWVsZDtcbiAgICB9XG5cbiAgICB1cGRhdGVTb3J0U3RhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5zb3J0ZWQgPSB0aGlzLmR0LmlzU29ydGVkKHRoaXMuZmllbGQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICAgIG9uQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmR0LnNvcnQoe1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgIGZpZWxkOiB0aGlzLmZpZWxkXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgIERvbUhhbmRsZXIuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZih0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEtQU29ydGFibGVDb2x1bW4gfSBmcm9tICcuL2stcC1zb3J0YWJsZS1jb2x1bW4nO1xuXG4vKipcbiAqIEBkZXByZWNhdGVkIHVzZSBzZXBhcmF0ZWQgbW9kdWxlIGZvciBlYWNoIGNvbXBvbmVudFxuICovXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IDxhbnlbXT5bXG5cbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogPGFueVtdPltcbiAgICAgICAgS1BTb3J0YWJsZUNvbHVtblxuICAgIF0sXG4gICAgZXhwb3J0czogPGFueVtdPltcbiAgICAgICAgS1BTb3J0YWJsZUNvbHVtblxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiA8YW55W10+W1xuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgS1BUYWJsZU1vZHVsZSB7fVxuIiwiaW1wb3J0IHtDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgSW5wdXQsIFRlbXBsYXRlUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnay1jb2x1bW4nLFxuICB0ZW1wbGF0ZTogJydcbn0pXG5leHBvcnQgY2xhc3MgQ29sdW1uQ29tcG9uZW50IHtcbiAgQElucHV0KCkgZmllbGQ6IHN0cmluZztcbiAgQElucHV0KCkgc3R5bGU6IHN0cmluZztcbiAgQElucHV0KCkgaGVhZGVyOiBzdHJpbmc7XG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xufVxuIiwiaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LFxuICBRdWVyeUxpc3QsIFJlbmRlcmVyMiwgVGVtcGxhdGVSZWYsIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29sdW1uQ29tcG9uZW50fSBmcm9tICcuL2NvbHVtbi5jb21wb25lbnQnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RlbGF5XCI7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS9mcm9tRXZlbnQnO1xuXG5jb25zdCBzb3J0aW5nRnVuY3Rpb24gPSAoYSwgYikgPT4ge1xuICBpZiAoYSA9PT0gYilcbiAgICByZXR1cm4gMDtcbiAgZWxzZSBpZiAoYSA8IGIpXG4gICAgcmV0dXJuIC0xO1xuICBlbHNlXG4gICAgcmV0dXJuIDE7XG59O1xuXG5jb25zdCBFdmVudHMgPSB7XG4gIE1PVVNFX1VQOiAnbW91c2V1cCcsXG4gIE1PVVNFX01PVkU6ICdtb3VzZW1vdmUnLFxuICBNT1VTRV9ET1dOOiAnbW91c2Vkb3duJyxcbiAgTU9VU0VfT1ZFUjogJ21vdXNlb3ZlcicsXG4gIE1PVVNFX0VOVEVSOiAnbW91c2VlbnRlcicsXG4gIE1PVVNFX0xFQVZFOiAnbW91c2VsZWF2ZSdcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2stZHJhZ2dhYmxlLWRhdGEtdGFibGUnLFxuICB0ZW1wbGF0ZTogYDx0YWJsZSBbbmdDbGFzc109XCJ7ICdvbkRyYWdNb2RlJyA6ICFkcmFnTW9kZU9mZiB9XCI+XG4gIDx0aGVhZD5cbiAgPHRyPlxuICAgIDx0aCBjbGFzcz1cImRyYWdnYWJsZS1yb3ctaWNvbi1wbGFjZWhvbGRlclwiPjwvdGg+XG4gICAgPHRoICpuZ0lmPVwic2VsZWN0YWJsZVwiIGNsYXNzPVwiZHJhZ2dhYmxlLXJvdy1jaGVjay1ib3hcIj5cbiAgICAgIDxwLWNoZWNrYm94IChvbkNoYW5nZSk9XCJzZWxlY3RBbGwoJGV2ZW50KVwiPjwvcC1jaGVja2JveD5cbiAgICA8L3RoPlxuICAgIDx0ZCAqbmdJZj1cInNob3dJbmRleFwiIGNsYXNzPVwiZHJhZ2dhYmxlLXJvdy1pbmRleFwiPjwvdGQ+XG4gICAgPHRoICpuZ0Zvcj1cImxldCBjb2wgb2YgY29sdW1uc1wiIFtuZ1N0eWxlXT1cImNvbC5zdHlsZVwiPnt7Y29sLmhlYWRlcn19PC90aD5cbiAgPC90cj5cbiAgPC90aGVhZD5cbiAgPHRib2R5ICN0YWJsZUJvZHk+XG5cbiAgPHRyICpuZ0Zvcj1cImxldCByb3cgb2YgZHJhZ2dhYmxlSXRlbXM7aW5kZXggYXMgaTtcIiBbY2xhc3NdPVwicm93LmNsYXNzXCIgW25nQ2xhc3NdPVwieyAnZHJhZ2dhYmxlLXJvdycgOiB0cnVlIH1cIlxuICAgICAgKG1vdXNlb3Zlcik9XCJvbk1vdXNlT3ZlcigkZXZlbnQsIGkpXCIgKG1vdXNldXApPVwib25Nb3VzZVVwKClcIj5cblxuICAgIDx0ZCBjbGFzcz1cImRyYWdnYWJsZS1yb3ctaWNvbi1wbGFjZWhvbGRlclwiIChtb3VzZWRvd24pPVwib25Nb3VzZURvd24oJGV2ZW50LCBpKVwiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJkcmFnZ2FibGUtcm93LWljb25cIj48L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImRyYWdnYWJsZS1yb3ctaWNvblwiPjwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZHJhZ2dhYmxlLXJvdy1pY29uXCI+PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJkcmFnZ2FibGUtcm93LWljb25cIj48L3NwYW4+XG4gICAgPC90ZD5cbiAgICA8dGQgKm5nSWY9XCJzZWxlY3RhYmxlXCIgY2xhc3M9XCJkcmFnZ2FibGUtcm93LWNoZWNrLWJveFwiPlxuICAgICAgPHAtY2hlY2tib3ggW3ZhbHVlXT1cImdldEl0ZW1JbmRleChpKVwiIFsobmdNb2RlbCldPVwic2VsZWN0ZWRJbmRleGVzXCIgKG9uQ2hhbmdlKT1cIm9uU2VsZWN0aW9uQ2hhbmdlKClcIj5cbiAgICAgIDwvcC1jaGVja2JveD5cbiAgICA8L3RkPlxuICAgIDx0ZCAqbmdJZj1cInNob3dJbmRleFwiIGNsYXNzPVwiZHJhZ2dhYmxlLXJvdy1pbmRleFwiIChtb3VzZWRvd24pPVwib25Nb3VzZURvd24oJGV2ZW50LCBpKVwiPlxuICAgICAgPHNwYW4+e3tnZXRJdGVtSW5kZXgoaSkgKyAxfX08L3NwYW4+XG4gICAgPC90ZD5cbiAgICA8dGQgKm5nRm9yPVwibGV0IGNvbCBvZiBjb2x1bW5zXCIgW25nU3R5bGVdPVwiY29sLnN0eWxlXCIgKG1vdXNlZG93bik9XCJvbk1vdXNlRG93bigkZXZlbnQsIGkpXCI+XG4gICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29sLnRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogY29sLCByb3dEYXRhOiByb3csIHJvd0luZGV4OiBnZXRJdGVtSW5kZXgoaSl9XCI+PC9uZy1jb250YWluZXI+XG4gICAgPC90ZD5cbiAgPC90cj5cbiAgPC90Ym9keT5cbjwvdGFibGU+XG5cbjxkaXYgKm5nSWY9XCIoISFkcmFnZ2FibGVJdGVtcyAmJiBkcmFnZ2FibGVJdGVtcy5sZW5ndGggPT09IDApIHx8ICFkcmFnZ2FibGVJdGVtc1wiXG4gICAgIGNsYXNzPVwiZW1wdHktc3RhdGUtcGxhY2Vob2xkZXJcIj5cbiAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImVtcHR5U3RhdGVUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuPC9kaXY+XG5cbjxwLXBhZ2luYXRvciAqbmdJZj1cInBhZ2luYXRvclwiIFtyb3dzXT1cInJvd3NcIiBbdG90YWxSZWNvcmRzXT1cInZhbHVlID8gdmFsdWUubGVuZ3RoIDogMFwiXG4gICAgICAgICAgICAgW3Jvd3NQZXJQYWdlT3B0aW9uc109XCJyb3dzUGVyUGFnZU9wdGlvbnNcIiAob25QYWdlQ2hhbmdlKT1cInBhZ2luYXRlKCRldmVudClcIj5cbjwvcC1wYWdpbmF0b3I+XG5cbjxkaXYgI2RyYWdnYWJsZSBbaGlkZGVuXT1cImRyYWdNb2RlT2ZmXCJcbiAgICAgW25nQ2xhc3NdPVwieyAnbXVsdGlwbGUtZHJhZy1hbmQtZHJvcCcgOiAobXVsdGlwbGVEcmFnQW5kRHJvcCAmJiBzZWxlY3RlZEluZGV4ZXMubGVuZ3RoID4gMSkgfVwiXG4gICAgIChtb3VzZXVwKT1cIm9uTW91c2VVcCgpXCIgKG1vdXNlbW92ZSk9XCJvbk1vdXNlTW92ZSgkZXZlbnQpXCI+XG4gIDxzcGFuICpuZ0lmPVwibXVsdGlwbGVEcmFnQW5kRHJvcCAmJiBzZWxlY3RlZEluZGV4ZXMubGVuZ3RoID4gMVwiIGNsYXNzPVwic2VsZWN0ZWQtaXRlbXMtY291bnRlclwiPnt7c2VsZWN0ZWRJbmRleGVzLmxlbmd0aH19PC9zcGFuPlxuICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZHJhZ2dhYmxlVmlld1RlbXBsYXRlOyBjb250ZXh0OiB7Y3VycmVudERyYWdnYWJsZUl0ZW06IGN1cnJlbnREcmFnZ2FibGVJdGVtfVwiPlxuICA8L25nLWNvbnRhaW5lcj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYHRhYmxle3dpZHRoOjEwMCU7dGV4dC1hbGlnbjpsZWZ0O3RhYmxlLWxheW91dDpmaXhlZDtib3JkZXItY29sbGFwc2U6Y29sbGFwc2V9dGFibGUgdGhlYWR7Ym9yZGVyOjFweCBzb2xpZCAjZDlkOWQ5O2JvcmRlci1sZWZ0Om5vbmU7Ym9yZGVyLXJpZ2h0Om5vbmV9dGFibGUgdGhlYWQgdHJ7aGVpZ2h0OjMycHg7Y29sb3I6Izk5OX10YWJsZSB0Ym9keXtvdmVyZmxvdzphdXRvfXRhYmxlIHRib2R5IHRye2hlaWdodDo3MHB4O2JhY2tncm91bmQ6I2ZmZjtjb2xvcjojOTk5fXRhYmxlIHRye2JvcmRlcjoxcHggc29saWQgI2Q5ZDlkOTtjb2xvcjojMzMzO2JvcmRlci1sZWZ0Om5vbmU7Ym9yZGVyLXJpZ2h0Om5vbmV9Lm9wZW57b3BhY2l0eTouNX0uaG92ZXJlZHtiYWNrZ3JvdW5kLWNvbG9yOiNlYmViZWIhaW1wb3J0YW50O3RleHQtaW5kZW50Oi05OTk5cHg7Ym9yZGVyOm5vbmUhaW1wb3J0YW50fS5kcmFnZ2FibGUtcm93LWljb257ZGlzcGxheTpub25lO3dpZHRoOjRweDtoZWlnaHQ6NHB4O2JvcmRlci1yYWRpdXM6MnB4O2JhY2tncm91bmQtY29sb3I6I2NjYzttYXJnaW46NHB4IDAgNHB4IDdweH0uZHJhZ2dhYmxlLXJvdy1jaGVjay1ib3gsLmRyYWdnYWJsZS1yb3ctaWNvbi1wbGFjZWhvbGRlciwuZHJhZ2dhYmxlLXJvdy1pbmRleHt3aWR0aDoxNXB4fS5kcmFnZ2FibGUtcm93LWNoZWNrLWJveHt3aWR0aDo0NHB4fS5kcmFnZ2FibGUtcm93e2N1cnNvcjotd2Via2l0LWdyYWI7Y3Vyc29yOmdyYWJ9Lm9uRHJhZ01vZGUgLmRyYWdnYWJsZS1yb3d7Y3Vyc29yOi13ZWJraXQtZ3JhYmJpbmc7Y3Vyc29yOmdyYWJiaW5nfS5kcmFnZ2FibGUtcm93OmhvdmVyIC5kcmFnZ2FibGUtcm93LWljb257ZGlzcGxheTpibG9ja30ub25EcmFnTW9kZSAuZHJhZ2dhYmxlLXJvdzpob3ZlciAuZHJhZ2dhYmxlLXJvdy1pY29ue2Rpc3BsYXk6bm9uZX0uZmFkZUluey13ZWJraXQtYW5pbWF0aW9uLW5hbWU6ZmFkZUluO2FuaW1hdGlvbi1uYW1lOmZhZGVJbjstd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbjouNXM7YW5pbWF0aW9uLWR1cmF0aW9uOi41czstd2Via2l0LWFuaW1hdGlvbi1maWxsLW1vZGU6Ym90aDthbmltYXRpb24tZmlsbC1tb2RlOmJvdGh9Lm11bHRpcGxlLWRyYWctYW5kLWRyb3B7Ym94LXNoYWRvdzo1cHggNXB4IDAgMCAjZmZmLDdweCA3cHggOHB4IDAgcmdiYSg1MCw1MCw1MCwuMzgpO2JvcmRlci1yYWRpdXM6MnB4fS5zZWxlY3RlZC1pdGVtcy1jb3VudGVye3otaW5kZXg6MTt3aWR0aDoyMHB4O2hlaWdodDoyMHB4O2JhY2tncm91bmQ6IzAwYTc4NDtkaXNwbGF5OmJsb2NrO2JvcmRlci1yYWRpdXM6MTBweDtjb2xvcjojZmZmO3RleHQtYWxpZ246Y2VudGVyO3Bvc2l0aW9uOmFic29sdXRlO3RvcDotMTBweDtyaWdodDotMTBweDtmb250LXNpemU6c21hbGw7bGluZS1oZWlnaHQ6MTUwJTtmb250LXdlaWdodDo3MDB9LmVtcHR5LXN0YXRlLXBsYWNlaG9sZGVye3RleHQtYWxpZ246Y2VudGVyfUAtd2Via2l0LWtleWZyYW1lcyBmYWRlSW57MCV7b3BhY2l0eTowfTEwMCV7b3BhY2l0eToxfX1Aa2V5ZnJhbWVzIGZhZGVJbnswJXtvcGFjaXR5OjB9MTAwJXtvcGFjaXR5OjF9fWBdXG59KVxuZXhwb3J0IGNsYXNzIERyYWdnYWJsZURhdGFUYWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgZW1wdHlTdGF0ZVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBJbnB1dCgpIGRyYWdnYWJsZVZpZXdUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBAT3V0cHV0KCkgdmFsdWVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnlbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueVtdPigpO1xuXG4gIEBWaWV3Q2hpbGQoJ2RyYWdnYWJsZScpIHByaXZhdGUgZHJhZ2dhYmxlRWxlbWVudDogRWxlbWVudFJlZjtcblxuICBAVmlld0NoaWxkKCd0YWJsZUJvZHknKSBwcml2YXRlIHRhYmxlQm9keTogRWxlbWVudFJlZjtcblxuICBAQ29udGVudENoaWxkcmVuKENvbHVtbkNvbXBvbmVudCkgY29sczogUXVlcnlMaXN0PENvbHVtbkNvbXBvbmVudD47XG5cbiAgY3VycmVudERyYWdnYWJsZUl0ZW06IGFueTtcblxuICBkcmFnZ2FibGU6IGFueTtcblxuICB0YWJsZUJvZHlFbGVtZW50OiBhbnk7XG5cbiAgY29sdW1uczogQ29sdW1uQ29tcG9uZW50W107XG5cbiAgZHJhZ01vZGVPZmY6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIHNlbGVjdGVkSW5kZXhlczogbnVtYmVyW10gPSBbXTtcblxuICBtb3VzZU1vdmVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBtb3VzZU1vdmU6IE9ic2VydmFibGU8YW55PjtcblxuICBwcml2YXRlIF92YWx1ZTogYW55W107XG5cbiAgcHVibGljIGRyYWdnYWJsZUl0ZW1zOiBhbnlbXTtcblxuICBwdWJsaWMgdW5EcmFnZ2FibGVJdGVtc0Zyb21Ub3A6IGFueVtdO1xuXG4gIHB1YmxpYyB1bkRyYWdnYWJsZUl0ZW1zRnJvbUJvdHRvbTogYW55W107XG5cbiAgcHJpdmF0ZSBfY3VycmVudERyYWdnZWRJbmRleDogbnVtYmVyO1xuXG4gIHByaXZhdGUgX2N1cnJlbnRQbGFjZUhvbGRlckluZGV4OiBudW1iZXIgPSAtMTtcblxuICBwcml2YXRlIF9jdXJyZW50RHJhZ2dlZEVsZW1lbnQ6IEV2ZW50VGFyZ2V0O1xuXG4gIHByaXZhdGUgX2Ryb3BBdmFpbGFibGUgPSBmYWxzZTtcblxuICBASW5wdXQoKSBzZXQgdmFsdWUodmFsOiBhbnlbXSkge1xuICAgIGlmICh2YWwpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gWy4uLnZhbF07XG4gICAgICB0aGlzLl9vcmRlckl0ZW1zKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBnZXQgdmFsdWUoKTogYW55W10ge1xuICAgIGlmICh0aGlzLmRyYWdNb2RlT2ZmKSB7XG4gICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuICB9XG5cblxuICBASW5wdXQoKSB1bkRyYWdnYWJsZUZyb21Ub3AgPSAwO1xuXG4gIEBJbnB1dCgpIHVuRHJhZ2dhYmxlRnJvbUJvdHRvbSA9IDA7XG5cbiAgQElucHV0KCkgcm93VHJhY2tCeTogRnVuY3Rpb24gPSAoaW5kZXg6IG51bWJlciwgaXRlbTogYW55KSA9PiBpdGVtO1xuXG4gIEBJbnB1dCgpIGNvbHVtblRyYWNrQnk6IEZ1bmN0aW9uID0gKGluZGV4OiBudW1iZXIsIGl0ZW06IGFueSkgPT4gaXRlbTtcblxuICBASW5wdXQoKSBwYWdpbmF0b3I6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASW5wdXQoKSByb3dzOiBudW1iZXI7XG5cbiAgQElucHV0KCkgcm93c1BlclBhZ2VPcHRpb25zOiBudW1iZXJbXTtcblxuICBASW5wdXQoKSBzaG93SW5kZXg6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASW5wdXQoKSBtdWx0aXBsZURyYWdBbmREcm9wOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KCkgc2VsZWN0YWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSBzZWxlY3Rpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnlbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueVtdPigpO1xuXG4gIEBPdXRwdXQoKSBwYWdlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gIH1cblxuICAvLyBjb21wb25lbnQgbGlmZWN5Y2xlIGV2ZW50c1xuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZih0aGlzLnBhZ2luYXRvcikge1xuICAgICAgdGhpcy51bkRyYWdnYWJsZUZyb21Cb3R0b20gPSB0aGlzLnJvd3M7XG4gICAgfVxuXG4gICAgdGhpcy5fb3JkZXJJdGVtcygpO1xuICAgIHRoaXMuZHJhZ2dhYmxlID0gdGhpcy5kcmFnZ2FibGVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy50YWJsZUJvZHlFbGVtZW50ID0gdGhpcy50YWJsZUJvZHkubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLm1vdXNlTW92ZSA9IE9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCBFdmVudHMuTU9VU0VfTU9WRSkuZGVsYXkoNTApO1xuXG4gICAgLy8gY292ZXIgbm9uLXBlcm1pdHRlZCBkcmFnZ2luZy9kcm9wcGluZzpcbiAgICBPYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgRXZlbnRzLk1PVVNFX1VQKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5vbk1vdXNlVXAoKSk7XG4gICAgT2JzZXJ2YWJsZS5mcm9tRXZlbnQodGhpcy50YWJsZUJvZHkubmF0aXZlRWxlbWVudCwgRXZlbnRzLk1PVVNFX0xFQVZFKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fb25Nb3VzZUxlYXZlKCkpO1xuICAgIE9ic2VydmFibGUuZnJvbUV2ZW50KHRoaXMudGFibGVCb2R5Lm5hdGl2ZUVsZW1lbnQsIEV2ZW50cy5NT1VTRV9FTlRFUikuc3Vic2NyaWJlKCgpID0+IHRoaXMuX29uTW91c2VFbnRlcigpKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbHVtbnMgPSB0aGlzLmNvbHMudG9BcnJheSgpO1xuICB9XG5cbiAgLy8gcHVibGljIEFQSSBtZXRob2RzXG4gIG9uTW91c2VNb3ZlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgdGhpcy5fdXBkYXRlRHJhZ2dhYmxlKGV2ZW50KTtcbiAgfVxuXG4gIG9uTW91c2VPdmVyKGV2ZW50OiBhbnksIGluZGV4OiBudW1iZXIpIHtcblxuICAgIC8vIG9ubHkgZm9yIEQmRCBtb2RlOlxuICAgIGlmICghdGhpcy5kcmFnTW9kZU9mZiAmJiBpbmRleCAhPT0gdGhpcy5fY3VycmVudFBsYWNlSG9sZGVySW5kZXgpIHtcblxuICAgICAgLy8gZ2V0IG1vdXNlIGxvY2F0aW9uIHRvIHJlY29nbml6ZSB3aGVyZSB0byBhZGQgdGhlIHBsYWNlaG9sZGVyIChmcm9tIHRvcCBvciBib3R0b20pOlxuICAgICAgY29uc3QgbWlkZGxlOiBudW1iZXIgPSBldmVudC5jdXJyZW50VGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIChldmVudC5jdXJyZW50VGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCAvIDIpO1xuICAgICAgY29uc3QgaG92ZXJlZFJvdyA9IE9iamVjdC5jcmVhdGUoT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMuZHJhZ2dhYmxlSXRlbXNbaW5kZXhdKSk7XG4gICAgICBPYmplY3QuYXNzaWduKGhvdmVyZWRSb3csIHRoaXMuZHJhZ2dhYmxlSXRlbXNbaW5kZXhdKTtcblxuICAgICAgLy8gZGVsZXRlIHByZXZpb3VzOlxuICAgICAgaWYgKHRoaXMuX2N1cnJlbnRQbGFjZUhvbGRlckluZGV4ICE9PSAtMSkge1xuICAgICAgICB0aGlzLmRyYWdnYWJsZUl0ZW1zLnNwbGljZSh0aGlzLl9jdXJyZW50UGxhY2VIb2xkZXJJbmRleCwgMSk7XG4gICAgICB9XG5cbiAgICAgIC8vIGFkZCBwbGFjZWhvbGRlciBmcm9tIHRoZSBib3R0b206XG4gICAgICBpZiAoZXZlbnQuY2xpZW50WSA+IG1pZGRsZSkge1xuICAgICAgICB0aGlzLl9jdXJyZW50UGxhY2VIb2xkZXJJbmRleCA9IGluZGV4ICsgMTtcbiAgICAgICAgdGhpcy5kcmFnZ2FibGVJdGVtcy5zcGxpY2UodGhpcy5fY3VycmVudFBsYWNlSG9sZGVySW5kZXgsIDAsIGhvdmVyZWRSb3cpO1xuICAgICAgICB0aGlzLmRyYWdnYWJsZUl0ZW1zW3RoaXMuX2N1cnJlbnRQbGFjZUhvbGRlckluZGV4XS5jbGFzcyA9ICdob3ZlcmVkJztcbiAgICAgICAgdGhpcy5fdXBkYXRlVmlldygpO1xuICAgICAgfSBlbHNlIHsgLy8gYWRkIHBsYWNlaG9sZGVyIGZyb20gdGhlIHRvcDpcbiAgICAgICAgdGhpcy5fY3VycmVudFBsYWNlSG9sZGVySW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5kcmFnZ2FibGVJdGVtcy5zcGxpY2UodGhpcy5fY3VycmVudFBsYWNlSG9sZGVySW5kZXgsIDAsIGhvdmVyZWRSb3cpO1xuICAgICAgICB0aGlzLmRyYWdnYWJsZUl0ZW1zW3RoaXMuX2N1cnJlbnRQbGFjZUhvbGRlckluZGV4XS5jbGFzcyA9ICdob3ZlcmVkJztcbiAgICAgICAgdGhpcy5fdXBkYXRlVmlldygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uTW91c2VEb3duKGV2ZW50OiBNb3VzZUV2ZW50LCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgLy8gb25seSBsZWZ0IGJ1dHRvbiBtb3VzZSBjbGlja1xuICAgIGlmIChldmVudC53aGljaCA9PT0gMSkge1xuICAgICAgaWYgKHRoaXMubXVsdGlwbGVEcmFnQW5kRHJvcCkge1xuXG4gICAgICAgIC8vIHNpZ24gZHJhZ2dhYmxlIGl0ZW0gYXMgJ2NoZWNrZWQnIGlmIGl0J3Mgbm90OlxuICAgICAgICBjb25zdCBjdXJyZW50Q2xpY2tlZEluZGV4ID0gdGhpcy5nZXRJdGVtSW5kZXgoaW5kZXgpO1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZEluZGV4ZXMuaW5kZXhPZihjdXJyZW50Q2xpY2tlZEluZGV4KSA9PT0gLTEpIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXhlcyA9IFtjdXJyZW50Q2xpY2tlZEluZGV4LCAuLi50aGlzLnNlbGVjdGVkSW5kZXhlc107XG4gICAgICAgIH1cblxuICAgICAgICAvLyBlZGdlLWNhc2Ugd2hlbiBhbGwgaXRlbXMgYXJlIHNlbGVjdGVkIC0gZCZkIHNob3VsZCBiZSBkaXNhYmxlZFxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZEluZGV4ZXMubGVuZ3RoID09PSB0aGlzLl92YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXhlcy5mb3JFYWNoKGluZGV4ID0+IHRoaXMuX3ZhbHVlW2luZGV4XS5jbGFzcyA9ICdvcGVuJyk7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gWy4uLnRoaXMuX3ZhbHVlXTtcbiAgICAgIH1cblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuY3VycmVudERyYWdnYWJsZUl0ZW0gPSB0aGlzLmRyYWdnYWJsZUl0ZW1zW2luZGV4XTtcbiAgICAgIHRoaXMuX3VwZGF0ZURyYWdnYWJsZShldmVudCk7XG4gICAgICB0aGlzLmRyYWdNb2RlT2ZmID0gZmFsc2U7XG4gICAgICB0aGlzLl9jdXJyZW50RHJhZ2dlZEluZGV4ID0gaW5kZXg7XG4gICAgICB0aGlzLl9jdXJyZW50RHJhZ2dlZEVsZW1lbnQgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgICAgdGhpcy5fY3VycmVudERyYWdnZWRFbGVtZW50WydjbGFzc0xpc3QnXS5hZGQoJ29wZW4nKTtcbiAgICAgIHRoaXMubW91c2VNb3ZlU3Vic2NyaXB0aW9uID0gdGhpcy5tb3VzZU1vdmUuc3Vic2NyaWJlKChlOiBNb3VzZUV2ZW50KSA9PiB0aGlzLm9uTW91c2VNb3ZlKGUpKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5kcmFnZ2FibGUsICdmYWRlSW4nKTtcbiAgICB9XG4gIH1cblxuICBvbk1vdXNlVXAoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmRyYWdNb2RlT2ZmKSB7XG4gICAgICB0aGlzLmRyYWdNb2RlT2ZmID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2N1cnJlbnREcmFnZ2VkRWxlbWVudFsnY2xhc3NMaXN0J10ucmVtb3ZlKCdvcGVuJyk7XG4gICAgICB0aGlzLl92YWx1ZS5mb3JFYWNoKGl0ZW0gPT4gZGVsZXRlIGl0ZW1bJ2NsYXNzJ10pO1xuICAgICAgdGhpcy5tb3VzZU1vdmVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZG9jdW1lbnQuYm9keSwgJ2N1cnNvcicsICdkZWZhdWx0Jyk7XG5cbiAgICAgIGlmICh0aGlzLl9kcm9wQXZhaWxhYmxlKSB7XG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50UGxhY2VIb2xkZXJJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICBpZiAodGhpcy5tdWx0aXBsZURyYWdBbmREcm9wKSB7XG5cbiAgICAgICAgICAgIC8vIHNhdmUgaXRlbSBvZiB0aGlzLl9jdXJyZW50UGxhY2VIb2xkZXJJbmRleCAtIHdlJ2xsIG5lZWQgdGhpcyBpdGVtIHRvIGZpbmQgdGhlIGVudHJ5LXBvaW50OlxuICAgICAgICAgICAgbGV0IGluc2VydEluZGV4UmVmZXJlbmNlID0gdGhpcy5kcmFnZ2FibGVJdGVtc1t0aGlzLl9jdXJyZW50UGxhY2VIb2xkZXJJbmRleF07XG5cbiAgICAgICAgICAgIC8vIHNhdmUgYWxsIGRyYWdnZWQgaXRlbXMgYXNpZGU6XG4gICAgICAgICAgICBjb25zdCBkcmFnZ2VkSXRlbXM6IGFueVtdID0gdGhpcy5zZWxlY3RlZEluZGV4ZXMuc29ydChzb3J0aW5nRnVuY3Rpb24pLm1hcDxhbnk+KGluZGV4ID0+IHRoaXMuX3ZhbHVlW2luZGV4ICsgKChpbmRleCA+PSB0aGlzLl9jdXJyZW50UGxhY2VIb2xkZXJJbmRleCkgPyAxIDogMCldKTtcblxuICAgICAgICAgICAgLy8gcmVtb3ZlIGRyYWdnZWQgKHNlbGVjdGVkIGl0ZW1zKSBmcm9tIHRoZSBvcmlnaW5hbCBkYXRhOlxuICAgICAgICAgICAgZHJhZ2dlZEl0ZW1zLmZvckVhY2goaXRlbSA9PiB0aGlzLl92YWx1ZS5zcGxpY2UodGhpcy5fdmFsdWUuaW5kZXhPZihpdGVtKSwgMSkpO1xuXG4gICAgICAgICAgICAvLyBpbnNlcnQgZHJhZ2dhYmxlIGl0ZW1zIGJhY2sgdG8gdGhlIG9yaWdpbmFsIGRhdGEgYnV0IHdpdGggbmV3IG9yZGVyOlxuICAgICAgICAgICAgdGhpcy5fdmFsdWUuc3BsaWNlKHRoaXMuX3ZhbHVlLmluZGV4T2YoaW5zZXJ0SW5kZXhSZWZlcmVuY2UpLCAxLCAuLi5kcmFnZ2VkSXRlbXMpO1xuXG4gICAgICAgICAgICAvLyBpbml0aWF0ZSBzdGF0ZTpcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRQbGFjZUhvbGRlckluZGV4ID0gLTE7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXhlcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fb3JkZXJJdGVtcygpO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlVmlldygpO1xuICAgICAgICAgICAgdGhpcy5vblNlbGVjdGlvbkNoYW5nZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGJ1ZmZlcjogbnVtYmVyID0gKHRoaXMuX2N1cnJlbnREcmFnZ2VkSW5kZXggPj0gdGhpcy5fY3VycmVudFBsYWNlSG9sZGVySW5kZXgpID8gMSA6IDA7XG4gICAgICAgICAgICAvLyBpbnNlcnQgZHJhZ2dlZCBpdGVtIHRvIHRoZSBuZXcgbG9jYXRpb246XG4gICAgICAgICAgICB0aGlzLmRyYWdnYWJsZUl0ZW1zW3RoaXMuX2N1cnJlbnRQbGFjZUhvbGRlckluZGV4XSA9IHRoaXMuZHJhZ2dhYmxlSXRlbXNbdGhpcy5fY3VycmVudERyYWdnZWRJbmRleCArIGJ1ZmZlcl07XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSBkcmFnZ2VkIGl0ZW0gcHJldmlvdXMgbG9jYXRpb24gJiB1cGRhdGUgdmlldzpcbiAgICAgICAgICAgIHRoaXMuZHJhZ2dhYmxlSXRlbXMuc3BsaWNlKHRoaXMuX2N1cnJlbnREcmFnZ2VkSW5kZXggKyBidWZmZXIsIDEpO1xuXG4gICAgICAgICAgICAvLyBpbml0aWF0ZSBzdGF0ZTpcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRQbGFjZUhvbGRlckluZGV4ID0gLTE7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVWaWV3KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyB1bmRyb3BwYWJsZSBhcmVhIC0gaW5pdGlhdGUgc3RhdGU6XG4gICAgICAgIHRoaXMuZHJhZ2dhYmxlSXRlbXMuc3BsaWNlKHRoaXMuX2N1cnJlbnRQbGFjZUhvbGRlckluZGV4LCAxKTtcbiAgICAgICAgdGhpcy5fY3VycmVudFBsYWNlSG9sZGVySW5kZXggPSAtMTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ZXMgPSBbXTtcbiAgICAgICAgdGhpcy5vblNlbGVjdGlvbkNoYW5nZSgpO1xuICAgICAgICB0aGlzLl91cGRhdGVWaWV3KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcGFnaW5hdGUoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMudW5EcmFnZ2FibGVGcm9tVG9wID0gZXZlbnQuZmlyc3Q7XG4gICAgdGhpcy51bkRyYWdnYWJsZUZyb21Cb3R0b20gPSAoZXZlbnQuZmlyc3QgKyBldmVudC5yb3dzKTtcbiAgICB0aGlzLnZhbHVlID0gWy4uLnRoaXMudW5EcmFnZ2FibGVJdGVtc0Zyb21Ub3AsIC4uLnRoaXMuZHJhZ2dhYmxlSXRlbXMsIC4uLnRoaXMudW5EcmFnZ2FibGVJdGVtc0Zyb21Cb3R0b21dO1xuICAgIHRoaXMucGFnZUNoYW5nZS5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIHNlbGVjdEFsbChldmVudDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3RlZEluZGV4ZXMgPSAoZXZlbnQpID8gWy4uLkFycmF5LmZyb20oQXJyYXkodGhpcy5fdmFsdWUubGVuZ3RoKSwgKF8seCkgPT4geCldIDogW107XG4gICAgdGhpcy5vblNlbGVjdGlvbkNoYW5nZSgpO1xuICB9XG5cbiAgb25TZWxlY3Rpb25DaGFuZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGVkSW5kZXhlcy5zb3J0KHNvcnRpbmdGdW5jdGlvbikubWFwKGluZGV4ID0+IHRoaXMuX3ZhbHVlW2luZGV4XSkpO1xuICB9XG5cbiAgZ2V0SXRlbUluZGV4KGluZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZS5pbmRleE9mKHRoaXMuZHJhZ2dhYmxlSXRlbXNbaW5kZXhdKTtcbiAgfVxuXG4gIC8vIHByaXZhdGUgbWV0aG9kc1xuICBwcml2YXRlIF91cGRhdGVWaWV3KCk6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSAodGhpcy5wYWdpbmF0b3IpID8gWy4uLnRoaXMudW5EcmFnZ2FibGVJdGVtc0Zyb21Ub3AsIC4uLnRoaXMuZHJhZ2dhYmxlSXRlbXMsIC4uLnRoaXMudW5EcmFnZ2FibGVJdGVtc0Zyb21Cb3R0b21dIDogWy4uLnRoaXMuZHJhZ2dhYmxlSXRlbXNdO1xuICAgIGlmICh0aGlzLmRyYWdNb2RlT2ZmKSB7IHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh0aGlzLnZhbHVlKTsgfVxuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlRHJhZ2dhYmxlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmRyYWdnYWJsZSwgJ3Bvc2l0aW9uJywgJ2ZpeGVkJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmRyYWdnYWJsZSwgJ2xlZnQnLCBldmVudC5jbGllbnRYICsgMjAgKyAncHgnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZHJhZ2dhYmxlLCAndG9wJywgZXZlbnQuY2xpZW50WSAtIDM1ICsgJ3B4Jyk7XG4gIH1cblxuICBwcml2YXRlIF9vbk1vdXNlTGVhdmUoKTogdm9pZCB7XG4gICAgdGhpcy5fZHJvcEF2YWlsYWJsZSA9IGZhbHNlO1xuICAgIGlmICghdGhpcy5kcmFnTW9kZU9mZikge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShkb2N1bWVudC5ib2R5LCAnY3Vyc29yJywgJ25vLWRyb3AnKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9vbk1vdXNlRW50ZXIoKTogdm9pZCB7XG4gICAgdGhpcy5fZHJvcEF2YWlsYWJsZSA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9vcmRlckl0ZW1zKCkge1xuICAgIGlmICghIXRoaXMudmFsdWUpIHtcbiAgICAgIGlmICh0aGlzLnBhZ2luYXRvcikge1xuICAgICAgICAvLyBvbmNlIHVzaW5nIGQmZCB3aXRoIHBhZ2luYXRpb24gcGFnZS1zaXplIGhhcyB0byBiZSBpbmNyZWFzZWQgYnkgMSBiZWNhdXNlIG9mIHRoZSBhZGRlZCBwbGFjZWhvbGRlclxuICAgICAgICBjb25zdCBidWZmZXIgPSAodGhpcy5fY3VycmVudFBsYWNlSG9sZGVySW5kZXggPT09IC0xKSA/IDAgOiAxO1xuXG4gICAgICAgIHRoaXMudW5EcmFnZ2FibGVJdGVtc0Zyb21Ub3AgPSBbLi4udGhpcy52YWx1ZS5zbGljZSgwLCB0aGlzLnVuRHJhZ2dhYmxlRnJvbVRvcCldO1xuICAgICAgICB0aGlzLnVuRHJhZ2dhYmxlSXRlbXNGcm9tQm90dG9tID0gWy4uLnRoaXMudmFsdWUuc2xpY2UodGhpcy51bkRyYWdnYWJsZUZyb21Cb3R0b20gKyBidWZmZXIpXTtcbiAgICAgICAgdGhpcy5kcmFnZ2FibGVJdGVtcyA9IFsuLi50aGlzLnZhbHVlLnNsaWNlKHRoaXMudW5EcmFnZ2FibGVGcm9tVG9wLCB0aGlzLnVuRHJhZ2dhYmxlRnJvbUJvdHRvbSArIGJ1ZmZlcildO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kcmFnZ2FibGVJdGVtcyA9IFsuLi50aGlzLnZhbHVlXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0RyYWdnYWJsZURhdGFUYWJsZUNvbXBvbmVudH0gZnJvbSBcIi4vZHJhZ2dhYmxlLWRhdGEtdGFibGUuY29tcG9uZW50XCI7XG5pbXBvcnQge0NvbHVtbkNvbXBvbmVudH0gZnJvbSBcIi4vY29sdW1uLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtDaGVja2JveE1vZHVsZX0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcbmltcG9ydCB7UGFnaW5hdG9yTW9kdWxlfSBmcm9tIFwicHJpbWVuZy9wcmltZW5nXCI7XG5cblxuQE5nTW9kdWxlKFxuICB7XG4gICAgaW1wb3J0czogW1xuICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgQ2hlY2tib3hNb2R1bGUsXG4gICAgICBQYWdpbmF0b3JNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgRHJhZ2dhYmxlRGF0YVRhYmxlQ29tcG9uZW50LFxuICAgICAgQ29sdW1uQ29tcG9uZW50XG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICBEcmFnZ2FibGVEYXRhVGFibGVDb21wb25lbnQsXG4gICAgICBDb2x1bW5Db21wb25lbnRcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW11cbiAgfVxuKVxuZXhwb3J0IGNsYXNzIERyYWdnYWJsZURhdGFUYWJsZU1vZHVsZSB7XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEcm9wZG93biB9IGZyb20gJ3ByaW1lbmcvY29tcG9uZW50cy9kcm9wZG93bi9kcm9wZG93bic7XG5pbXBvcnQgeyBhbmltYXRlLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IFNlbGVjdEl0ZW0gfSBmcm9tICdwcmltZW5nL2NvbXBvbmVudHMvY29tbW9uL3NlbGVjdGl0ZW0nO1xuXG5leHBvcnQgY29uc3QgRFJPUERPV05fVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERyb3Bkb3duQ29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAna0Ryb3Bkb3duJyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICNjb250YWluZXIgW25nQ2xhc3NdPVwieyd1aS1kcm9wZG93biB1aS13aWRnZXQgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsIHVpLWhlbHBlci1jbGVhcmZpeCc6dHJ1ZSxcbiAgICAgICAgICAgICd1aS1zdGF0ZS1kaXNhYmxlZCc6ZGlzYWJsZWQsJ3VpLWRyb3Bkb3duLW9wZW4nOm92ZXJsYXlWaXNpYmxlLCd1aS1zdGF0ZS1mb2N1cyc6Zm9jdXNlZCwgJ3VpLWRyb3Bkb3duLWNsZWFyYWJsZSc6IHNob3dDbGVhciAmJiAhZGlzYWJsZWR9XCJcbiAgICAgKGNsaWNrKT1cIm9uTW91c2VjbGljaygkZXZlbnQpXCIgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiPlxuICA8ZGl2IGNsYXNzPVwidWktaGVscGVyLWhpZGRlbi1hY2Nlc3NpYmxlXCIgKm5nSWY9XCJhdXRvV2lkdGhcIj5cbiAgICA8c2VsZWN0IFtyZXF1aXJlZF09XCJyZXF1aXJlZFwiIFthdHRyLm5hbWVdPVwibmFtZVwiIFthdHRyLmFyaWEtbGFiZWxdPVwic2VsZWN0ZWRPcHRpb24gPyBzZWxlY3RlZE9wdGlvbi5sYWJlbCA6ICcgJ1wiIHRhYmluZGV4PVwiLTFcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgIDxvcHRpb24gKm5nSWY9XCJwbGFjZWhvbGRlclwiPnt7cGxhY2Vob2xkZXJ9fTwvb3B0aW9uPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImdyb3VwXCI+XG4gICAgICAgIDxvcHRncm91cCAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIG9wdGlvbnNcIiBbYXR0ci5sYWJlbF09XCJvcHRpb24ubGFiZWxcIj5cbiAgICAgICAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCBvcHRpb24gb2Ygb3B0aW9uLml0ZW1zXCIgW3ZhbHVlXT1cIm9wdGlvbi52YWx1ZVwiIFtzZWxlY3RlZF09XCJzZWxlY3RlZE9wdGlvbiA9PSBvcHRpb25cIj57e29wdGlvbi5sYWJlbH19PC9vcHRpb24+XG4gICAgICAgICAgPG9wdGdyb3VwPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWdyb3VwXCI+XG4gICAgICAgIDxvcHRpb24gKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBvcHRpb25zXCIgW3ZhbHVlXT1cIm9wdGlvbi52YWx1ZVwiIFtzZWxlY3RlZF09XCJzZWxlY3RlZE9wdGlvbiA9PSBvcHRpb25cIj57e29wdGlvbi5sYWJlbH19PC9vcHRpb24+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L3NlbGVjdD5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJ1aS1oZWxwZXItaGlkZGVuLWFjY2Vzc2libGVcIj5cbiAgICA8aW5wdXQgI2luIFthdHRyLmlkXT1cImlucHV0SWRcIiB0eXBlPVwidGV4dFwiIFthdHRyLmFyaWEtbGFiZWxdPVwic2VsZWN0ZWRPcHRpb24gPyBzZWxlY3RlZE9wdGlvbi5sYWJlbCA6ICcgJ1wiIHJlYWRvbmx5IChmb2N1cyk9XCJvbklucHV0Rm9jdXMoJGV2ZW50KVwiIHJvbGU9XCJsaXN0Ym94XCJcbiAgICAgICAgICAgKGJsdXIpPVwib25JbnB1dEJsdXIoJGV2ZW50KVwiIChrZXlkb3duKT1cIm9uS2V5ZG93bigkZXZlbnQsIHRydWUpXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgW2F0dHIudGFiaW5kZXhdPVwidGFiaW5kZXhcIiBbYXR0ci5hdXRvZm9jdXNdPVwiYXV0b2ZvY3VzXCI+XG4gIDwvZGl2PlxuICA8bGFiZWwgW25nQ2xhc3NdPVwieyd1aS1kcm9wZG93bi1sYWJlbCB1aS1pbnB1dHRleHQgdWktY29ybmVyLWFsbCc6dHJ1ZSwndWktZHJvcGRvd24tbGFiZWwtZW1wdHknOihsYWJlbCA9PSBudWxsIHx8IGxhYmVsLmxlbmd0aCA9PT0gMCl9XCIgKm5nSWY9XCIhZWRpdGFibGUgJiYgKGxhYmVsICE9IG51bGwpXCI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFzZWxlY3RlZEl0ZW1UZW1wbGF0ZVwiPnt7bGFiZWx8fCdlbXB0eSd9fTwvbmctY29udGFpbmVyPlxuICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJzZWxlY3RlZEl0ZW1UZW1wbGF0ZTsgY29udGV4dDogeyRpbXBsaWNpdDogc2VsZWN0ZWRPcHRpb259XCI+PC9uZy1jb250YWluZXI+XG4gIDwvbGFiZWw+XG4gIDxsYWJlbCBbbmdDbGFzc109XCJ7J3VpLWRyb3Bkb3duLWxhYmVsIHVpLWlucHV0dGV4dCB1aS1jb3JuZXItYWxsIHVpLXBsYWNlaG9sZGVyJzp0cnVlLCd1aS1kcm9wZG93bi1sYWJlbC1lbXB0eSc6IChwbGFjZWhvbGRlciA9PSBudWxsIHx8IHBsYWNlaG9sZGVyLmxlbmd0aCA9PT0gMCl9XCIgKm5nSWY9XCIhZWRpdGFibGUgJiYgKGxhYmVsID09IG51bGwpXCI+e3twbGFjZWhvbGRlcnx8J2VtcHR5J319PC9sYWJlbD5cbiAgPGlucHV0ICNlZGl0YWJsZUlucHV0IHR5cGU9XCJ0ZXh0XCIgW2F0dHIuYXJpYS1sYWJlbF09XCJzZWxlY3RlZE9wdGlvbiA/IHNlbGVjdGVkT3B0aW9uLmxhYmVsIDogJyAnXCIgY2xhc3M9XCJ1aS1kcm9wZG93bi1sYWJlbCB1aS1pbnB1dHRleHQgdWktY29ybmVyLWFsbFwiICpuZ0lmPVwiZWRpdGFibGVcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBbYXR0ci5wbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gICAgICAgICAoY2xpY2spPVwib25FZGl0YWJsZUlucHV0Q2xpY2soJGV2ZW50KVwiIChpbnB1dCk9XCJvbkVkaXRhYmxlSW5wdXRDaGFuZ2UoJGV2ZW50KVwiIChmb2N1cyk9XCJvbkVkaXRhYmxlSW5wdXRGb2N1cygkZXZlbnQpXCIgKGJsdXIpPVwib25JbnB1dEJsdXIoJGV2ZW50KVwiPlxuICA8aSBjbGFzcz1cInVpLWRyb3Bkb3duLWNsZWFyLWljb24gcGkgcGktdGltZXNcIiAoY2xpY2spPVwiY2xlYXIoJGV2ZW50KVwiICpuZ0lmPVwidmFsdWUgIT0gbnVsbCAmJiBzaG93Q2xlYXIgJiYgIWRpc2FibGVkXCI+PC9pPlxuICA8ZGl2IGNsYXNzPVwidWktZHJvcGRvd24tdHJpZ2dlciB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1yaWdodFwiPlxuICAgIDxzcGFuIGNsYXNzPVwidWktZHJvcGRvd24tdHJpZ2dlci1pY29uIHVpLWNsaWNrYWJsZVwiIFtuZ0NsYXNzXT1cImRyb3Bkb3duSWNvblwiPjwvc3Bhbj5cbiAgPC9kaXY+XG4gIDxkaXYgI3BhbmVsIFtuZ0NsYXNzXT1cIid1aS1kcm9wZG93bi1wYW5lbCB1aS13aWRnZXQtY29udGVudCB1aS1jb3JuZXItYWxsIHVpLXNoYWRvdydcIiBbQHBhbmVsU3RhdGVdPVwib3ZlcmxheVZpc2libGUgPyAndmlzaWJsZScgOiAnaGlkZGVuJ1wiXG4gICAgICAgW3N0eWxlLmRpc3BsYXldPVwib3ZlcmxheVZpc2libGUgPyAnYmxvY2snIDogJ25vbmUnXCIgW25nU3R5bGVdPVwicGFuZWxTdHlsZVwiIFtjbGFzc109XCJwYW5lbFN0eWxlQ2xhc3NcIj5cbiAgICA8ZGl2ICpuZ0lmPVwiZmlsdGVyXCIgY2xhc3M9XCJ1aS1kcm9wZG93bi1maWx0ZXItY29udGFpbmVyXCIgKGlucHV0KT1cIm9uRmlsdGVyKCRldmVudClcIiAoY2xpY2spPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCI+XG4gICAgICA8aW5wdXQgI2ZpbHRlciB0eXBlPVwidGV4dFwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiIGNsYXNzPVwidWktZHJvcGRvd24tZmlsdGVyIHVpLWlucHV0dGV4dCB1aS13aWRnZXQgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsXCIgW2F0dHIucGxhY2Vob2xkZXJdPVwiZmlsdGVyUGxhY2Vob2xkZXJcIlxuICAgICAgICAgICAgIChrZXlkb3duLmVudGVyKT1cIiRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCIgKGtleWRvd24pPVwib25LZXlkb3duKCRldmVudCwgZmFsc2UpXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cInVpLWRyb3Bkb3duLWZpbHRlci1pY29uIHBpIHBpLXNlYXJjaFwiPjwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2ICNpdGVtc3dyYXBwZXIgY2xhc3M9XCJ1aS1kcm9wZG93bi1pdGVtcy13cmFwcGVyXCIgW3N0eWxlLm1heC1oZWlnaHRdPVwic2Nyb2xsSGVpZ2h0fHwnYXV0bydcIj5cbiAgICAgIDx1bCBjbGFzcz1cInVpLWRyb3Bkb3duLWl0ZW1zIHVpLWRyb3Bkb3duLWxpc3QgdWktd2lkZ2V0LWNvbnRlbnQgdWktd2lkZ2V0IHVpLWNvcm5lci1hbGwgdWktaGVscGVyLXJlc2V0XCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJncm91cFwiPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtb3B0Z3JvdXAgW25nRm9yT2ZdPVwib3B0aW9uc1RvRGlzcGxheVwiPlxuICAgICAgICAgICAgPGxpIGNsYXNzPVwidWktZHJvcGRvd24taXRlbS1ncm91cFwiPlxuICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIiFncm91cFRlbXBsYXRlXCI+e3tvcHRncm91cC5sYWJlbHx8J2VtcHR5J319PC9zcGFuPlxuICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZ3JvdXBUZW1wbGF0ZTsgY29udGV4dDogeyRpbXBsaWNpdDogb3B0Z3JvdXB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIml0ZW1zbGlzdDsgY29udGV4dDogeyRpbXBsaWNpdDogb3B0Z3JvdXAuaXRlbXMsIHNlbGVjdGVkT3B0aW9uOiBzZWxlY3RlZE9wdGlvbn1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFncm91cFwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpdGVtc2xpc3Q7IGNvbnRleHQ6IHskaW1wbGljaXQ6IG9wdGlvbnNUb0Rpc3BsYXksIHNlbGVjdGVkT3B0aW9uOiBzZWxlY3RlZE9wdGlvbn1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjaXRlbXNsaXN0IGxldC1vcHRpb25zIGxldC1zZWxlY3RlZE9wdGlvbj1cInNlbGVjdGVkT3B0aW9uXCI+XG4gICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBvcHRpb24gb2Ygb3B0aW9ucztsZXQgaT1pbmRleFwiXG4gICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIntcbiAgICAgICAgICAgICAgICAndWktZHJvcGRvd24taXRlbSB1aS1jb3JuZXItYWxsJzp0cnVlLFxuICAgICAgICAgICAgICAgICd1aS1zdGF0ZS1oaWdobGlnaHQnOihzZWxlY3RlZE9wdGlvbiA9PSBvcHRpb24pLFxuICAgICAgICAgICAgICAgICd1aS1kcm9wZG93bi1pdGVtLWVtcHR5Jzohb3B0aW9uLmxhYmVsfHxvcHRpb24ubGFiZWwubGVuZ3RoID09PSAwLFxuICAgICAgICAgICAgICAgICd1aS1zdGF0ZS1kaXNhYmxlZCc6IG9wdGlvbi5kaXNhYmxlZFxuICAgICAgICAgICAgICB9XCJcbiAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uSXRlbUNsaWNrKCRldmVudCwgb3B0aW9uKVwiPlxuICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCIhaXRlbVRlbXBsYXRlXCI+e3tvcHRpb24ubGFiZWx8fCdlbXB0eSd9fTwvc3Bhbj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpdGVtVGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IG9wdGlvbn1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8bGkgKm5nSWY9XCJmaWx0ZXIgJiYgb3B0aW9uc1RvRGlzcGxheSAmJiBvcHRpb25zVG9EaXNwbGF5Lmxlbmd0aCA9PT0gMFwiPnt7ZW1wdHlGaWx0ZXJNZXNzYWdlfX08L2xpPlxuICAgICAgPC91bD5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AudWktZHJvcGRvd257ZGlzcGxheTppbmxpbmUtYmxvY2s7cG9zaXRpb246cmVsYXRpdmU7Y3Vyc29yOnBvaW50ZXI7dmVydGljYWwtYWxpZ246bWlkZGxlfS51aS1kcm9wZG93biAudWktZHJvcGRvd24tY2xlYXItaWNvbntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6NTAlO2ZvbnQtc2l6ZTouNzVlbTtoZWlnaHQ6MWVtO21hcmdpbi10b3A6LS41ZW07cmlnaHQ6Mi41ZW19LnVpLWRyb3Bkb3duIC51aS1kcm9wZG93bi10cmlnZ2Vye2JvcmRlci1yaWdodDpub25lO2JvcmRlci10b3A6bm9uZTtib3JkZXItYm90dG9tOm5vbmU7Y3Vyc29yOnBvaW50ZXI7d2lkdGg6MS41ZW07aGVpZ2h0OjEwMCU7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MDt0b3A6MDtwYWRkaW5nOjAgLjI1ZW19LnVpLWRyb3Bkb3duIC51aS1kcm9wZG93bi10cmlnZ2VyIC51aS1kcm9wZG93bi10cmlnZ2VyLWljb257dG9wOjUwJTtsZWZ0OjUwJTttYXJnaW4tdG9wOi0uNWVtO21hcmdpbi1sZWZ0Oi0uNWVtO3Bvc2l0aW9uOmFic29sdXRlfS51aS1kcm9wZG93biAudWktZHJvcGRvd24tbGFiZWx7ZGlzcGxheTpibG9jaztib3JkZXI6bm9uZTt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVuO2ZvbnQtd2VpZ2h0OjQwMDt3aWR0aDoxMDAlO3BhZGRpbmctcmlnaHQ6Mi41ZW19LnVpLWRyb3Bkb3duLWl0ZW0tZW1wdHksLnVpLWRyb3Bkb3duLWxhYmVsLWVtcHR5e3RleHQtaW5kZW50Oi05OTk5cHg7b3ZlcmZsb3c6aGlkZGVufS51aS1zdGF0ZS1kaXNhYmxlZHtvcGFjaXR5Oi42O2N1cnNvcjpkZWZhdWx0fS51aS1kcm9wZG93bi51aS1zdGF0ZS1kaXNhYmxlZCAudWktZHJvcGRvd24tbGFiZWwsLnVpLWRyb3Bkb3duLnVpLXN0YXRlLWRpc2FibGVkIC51aS1kcm9wZG93bi10cmlnZ2Vye2N1cnNvcjpkZWZhdWx0fS51aS1kcm9wZG93biBsYWJlbC51aS1kcm9wZG93bi1sYWJlbHtjdXJzb3I6cG9pbnRlcn0udWktZHJvcGRvd24gaW5wdXQudWktZHJvcGRvd24tbGFiZWx7Y3Vyc29yOmRlZmF1bHR9LnVpLWRyb3Bkb3duIC51aS1kcm9wZG93bi1wYW5lbHttaW4td2lkdGg6MTAwJX0udWktZHJvcGRvd24tcGFuZWx7cG9zaXRpb246YWJzb2x1dGU7aGVpZ2h0OmF1dG87ZGlzcGxheTpub25lfS51aS1kcm9wZG93bi1wYW5lbCAudWktZHJvcGRvd24taXRlbXMtd3JhcHBlcntvdmVyZmxvdzphdXRvfS51aS1kcm9wZG93bi1wYW5lbCAudWktZHJvcGRvd24taXRlbXtmb250LXdlaWdodDo0MDA7Ym9yZGVyOjA7Y3Vyc29yOnBvaW50ZXI7bWFyZ2luOjFweCAwO3BhZGRpbmc6LjEyNWVtIC4yNWVtO3RleHQtYWxpZ246bGVmdH0udWktZHJvcGRvd24tcGFuZWwgLnVpLWRyb3Bkb3duLWl0ZW0tZ3JvdXB7Zm9udC13ZWlnaHQ6NzAwO2N1cnNvcjpkZWZhdWx0fS51aS1kcm9wZG93bi1wYW5lbCAudWktZHJvcGRvd24tbGlzdHtwYWRkaW5nOi40ZW07Ym9yZGVyOjB9LnVpLWRyb3Bkb3duLXBhbmVsIC51aS1kcm9wZG93bi1maWx0ZXJ7d2lkdGg6MTAwJTtib3gtc2l6aW5nOmJvcmRlci1ib3g7cGFkZGluZy1yaWdodDoxLjVlbX0udWktZHJvcGRvd24tcGFuZWwgLnVpLWRyb3Bkb3duLWZpbHRlci1jb250YWluZXJ7cG9zaXRpb246cmVsYXRpdmU7bWFyZ2luOjA7cGFkZGluZzouNGVtO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOjEwMCV9LnVpLWRyb3Bkb3duLXBhbmVsIC51aS1kcm9wZG93bi1maWx0ZXItY29udGFpbmVyIC51aS1kcm9wZG93bi1maWx0ZXItaWNvbntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6LjhlbTtyaWdodDoxZW19LnVpLWZsdWlkIC51aS1kcm9wZG93bnt3aWR0aDoxMDAlfWBdLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcigncGFuZWxTdGF0ZScsIFtcbiAgICAgIHN0YXRlKCdoaWRkZW4nLCBzdHlsZSh7XG4gICAgICAgIG9wYWNpdHk6IDBcbiAgICAgIH0pKSxcbiAgICAgIHN0YXRlKCd2aXNpYmxlJywgc3R5bGUoe1xuICAgICAgICBvcGFjaXR5OiAxXG4gICAgICB9KSksXG4gICAgICB0cmFuc2l0aW9uKCd2aXNpYmxlID0+IGhpZGRlbicsIGFuaW1hdGUoJzQwMG1zIGVhc2UtaW4nKSksXG4gICAgICB0cmFuc2l0aW9uKCdoaWRkZW4gPT4gdmlzaWJsZScsIGFuaW1hdGUoJzQwMG1zIGVhc2Utb3V0JykpXG4gICAgXSlcbiAgXSxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MudWktaW5wdXR3cmFwcGVyLWZpbGxlZF0nOiAnZmlsbGVkJyxcbiAgICAnW2NsYXNzLnVpLWlucHV0d3JhcHBlci1mb2N1c10nOiAnZm9jdXNlZCdcbiAgfSxcbiAgcHJvdmlkZXJzOiBbRFJPUERPV05fVkFMVUVfQUNDRVNTT1JdXG59KVxuXG5leHBvcnQgY2xhc3MgRHJvcGRvd25Db21wb25lbnQgZXh0ZW5kcyBEcm9wZG93biB7XG4gIHB1YmxpYyBvbkl0ZW1DbGljayhldmVudDogTW91c2VFdmVudCwgb3B0aW9uOiBTZWxlY3RJdGVtKTogdm9pZCB7XG4gICAgaWYgKCFvcHRpb25bJ2Rpc2FibGVkJ10pIHtcbiAgICAgIHN1cGVyLm9uSXRlbUNsaWNrKGV2ZW50LCBvcHRpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0SXRlbShldmVudDogTW91c2VFdmVudCwgb3B0aW9uOiBTZWxlY3RJdGVtKTogdm9pZCB7XG4gICAgaWYgKCFvcHRpb25bJ2Rpc2FibGVkJ10pIHtcbiAgICAgIHN1cGVyLnNlbGVjdEl0ZW0oZXZlbnQsIG9wdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEcm9wZG93bk1vZHVsZSBhcyBQcmltZURyb3Bkb3duTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcbmltcG9ydCB7IERyb3Bkb3duQ29tcG9uZW50IH0gZnJvbSAnLi9kcm9wZG93bi5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoXG4gIHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICBDb21tb25Nb2R1bGUsXG4gICAgICBQcmltZURyb3Bkb3duTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgIERyb3Bkb3duQ29tcG9uZW50XG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICBEcm9wZG93bkNvbXBvbmVudFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXVxuICB9XG4pXG5leHBvcnQgY2xhc3MgRHJvcGRvd25Nb2R1bGUge1xuXG59XG4iXSwibmFtZXMiOlsidHNsaWJfMS5fX2V4dGVuZHMiLCJBdXRvQ29tcGxldGUiLCJQcmltZUF1dG9Db21wbGV0ZSIsIklucHV0VGV4dE1vZHVsZSIsIlByaW1lTXVsdGlTZWxlY3RNb2R1bGUiLCJNdWx0aVNlbGVjdE1vZHVsZSIsIkRvbUhhbmRsZXIiLCJQcmltZVNsaWRlck1vZHVsZSIsIkRyb3Bkb3duIiwiUHJpbWVEcm9wZG93bk1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBUW9EQSxrREFBZTtJQUcvRCx3Q0FBWSxVQUFzQixFQUFFLFFBQWtCLEVBQUUsb0JBQXlDO1FBQWpHLFlBQ0ksa0JBQU0sVUFBVSxFQUFFLFFBQVEsRUFBRSxvQkFBb0IsQ0FBQyxTQUVwRDtRQURHLEtBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDOztLQUNuQzs7Ozs7O0lBRVMsMERBQWlCOzs7OztJQUEzQixVQUE0QixVQUFzQjs7WUFDeEMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMscUVBQXFFLENBQUM7UUFFaEksSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7O1lBRS9CLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3JCO2FBQU07WUFDSCxPQUFPLENBQUMsSUFBSSxDQUFDLG9HQUFvRyxDQUFDLENBQUM7WUFDbkgsT0FBTyxJQUFJLENBQUM7U0FDZjtLQUNKOzs7OztJQUVTLGtEQUFTOzs7O0lBQW5CO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7S0FDM0I7Ozs7O0lBRVMsdURBQWM7Ozs7SUFBeEI7UUFDSSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQzlDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7S0FDNUM7Ozs7O0lBRVMsaURBQVE7Ozs7SUFBbEI7UUFDSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztLQUMzQjs7Ozs7SUFFTyx5REFBZ0I7Ozs7SUFBeEI7UUFDSSxJQUFJLElBQUksQ0FB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