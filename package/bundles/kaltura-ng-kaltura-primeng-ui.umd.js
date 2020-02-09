(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@kaltura-ng/kaltura-ui'), require('primeng/primeng'), require('@angular/common'), require('@kaltura-ng/kaltura-common'), require('@angular/animations'), require('primeng/components/autocomplete/autocomplete'), require('primeng/components/utils/objectutils'), require('@angular/forms'), require('primeng/components/inputtext/inputtext'), require('primeng/components/button/button'), require('primeng/components/common/shared'), require('@angular/cdk/scrolling'), require('primeng/components/dom/domhandler'), require('primeng/table'), require('primeng/api'), require('rxjs/add/operator/delay'), require('rxjs/Observable'), require('rxjs/add/observable/fromEvent'), require('primeng/components/dropdown/dropdown')) :
    typeof define === 'function' && define.amd ? define('@kaltura-ng/kaltura-primeng-ui', ['exports', '@angular/core', '@kaltura-ng/kaltura-ui', 'primeng/primeng', '@angular/common', '@kaltura-ng/kaltura-common', '@angular/animations', 'primeng/components/autocomplete/autocomplete', 'primeng/components/utils/objectutils', '@angular/forms', 'primeng/components/inputtext/inputtext', 'primeng/components/button/button', 'primeng/components/common/shared', '@angular/cdk/scrolling', 'primeng/components/dom/domhandler', 'primeng/table', 'primeng/api', 'rxjs/add/operator/delay', 'rxjs/Observable', 'rxjs/add/observable/fromEvent', 'primeng/components/dropdown/dropdown'], factory) :
    (factory((global['kaltura-ng'] = global['kaltura-ng'] || {}, global['kaltura-ng']['kaltura-primeng-ui'] = {}),global.ng.core,null,null,global.ng.common,null,global.ng.animations,null,null,global.ng.forms,null,null,null,global.ng.cdk.scrolling,null,null,null,global.rxjs['add/operator/delay'],global.rxjs.Observable,global.rxjs['add/observable/fromEvent'],null));
}(this, (function (exports,core,kalturaUi,primeng,common,kalturaCommon,animations,autocomplete,objectutils,forms,inputtext,button,shared,scrolling,domhandler,table,api,delay,Observable,fromEvent,dropdown) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b)
            if (b.hasOwnProperty(p))
                d[p] = b[p]; };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

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
            { type: core.Directive, args: [{
                        selector: '[kStickyHeader]'
                    },] },
        ];
        /** @nocollapse */
        StickyDatatableHeaderDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: core.Renderer },
                { type: kalturaUi.StickyScrollService }
            ];
        };
        return StickyDatatableHeaderDirective;
    }(kalturaUi.StickyDirective));

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
            { type: core.Directive, args: [{
                        selector: '[kDropdownCloseOnScroll]',
                    },] },
        ];
        /** @nocollapse */
        DropdownCloseOnScroll.ctorParameters = function () { return []; };
        DropdownCloseOnScroll.propDecorators = {
            scrollTarget: [{ type: core.Input }],
            dropdown: [{ type: core.ContentChild, args: [primeng.Dropdown,] }]
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
            { type: core.Directive, args: [{
                        selector: '[kMenuCloseOnScroll]',
                    },] },
        ];
        /** @nocollapse */
        MenuCloseOnScroll.ctorParameters = function () {
            return [
                { type: primeng.Menu, decorators: [{ type: core.Optional }] },
                { type: primeng.TieredMenu, decorators: [{ type: core.Optional }] }
            ];
        };
        MenuCloseOnScroll.propDecorators = {
            onWindowScroll: [{ type: core.HostListener, args: ["window:scroll", [],] }]
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
            { type: core.NgModule, args: [{
                        imports: ( /** @type {?} */([
                            common.CommonModule, primeng.InputTextModule, primeng.MenuModule, kalturaCommon.KalturaCommonModule
                        ])),
                        declarations: ( /** @type {?} */([
                            StickyDatatableHeaderDirective,
                            DropdownCloseOnScroll,
                            MenuCloseOnScroll
                        ])),
                        exports: ( /** @type {?} */([
                            StickyDatatableHeaderDirective,
                            DropdownCloseOnScroll,
                            MenuCloseOnScroll
                        ])),
                        providers: ( /** @type {?} */([]))
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
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return AutoComplete; }),
        multi: true
    };
    /* tslint:enable */
    var AutoComplete = /** @class */ (function (_super) {
        __extends(AutoComplete, _super);
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
            _this.ObjectUtils = objectutils.ObjectUtils;
            _this.overlayHovered = false;
            _this.limitToSuggestions = true;
            _this.suggestionSelectableField = '';
            _this.suggestionItemField = '';
            _this.tooltipResolver = null;
            _this.classField = null;
            _this.suggestionLabelField = '';
            _this.addOnPaste = true;
            _this.itemClick = new core.EventEmitter();
            return _this;
        }
        Object.defineProperty(AutoComplete.prototype, "multiple", {
            get: /**
             * @return {?}
             */ function () {
                // always return true to affect component ui of selected item.
                // internally you should use _allowMultiple
                return true;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._allowMultiple = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AutoComplete.prototype, "suggestions", {
            get: /**
             * @return {?}
             */ function () {
                return this._suggestions;
            },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) {
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
             */ function () {
                return this._placeholder;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                // IE11 bug causing output event to fire upon input field blur event when there is a placeholder. Thus, we remove the placeholder attribute for IE11, single selection mode.
                // Additional details: https://connect.microsoft.com/IE/feedback/details/810538/ie-11-fires-input-event-on-focus
                /** @type {?} */
                var isIE11 = kalturaUi.KalturaBrowserUtils.detectBrowser() === kalturaUi.BrowserNames.IE11;
                this._placeholder = isIE11 && !this._allowMultiple ? '' : value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AutoComplete.prototype, "suggestionsProvider", {
            set: /**
             * @param {?} provider$
             * @return {?}
             */ function (provider$) {
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
             */ function () {
                return this.input ? this.input.value : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AutoComplete.prototype, "input", {
            get: /**
             * @private
             * @return {?}
             */ function () {
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
                if (value === void 0) {
                    value = null;
                }
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
            { type: core.Component, args: [{
                        selector: 'kAutoComplete',
                        /* tslint:disable */
                        // [kmcng] upon upgrade: sync with original component
                        styles: [":host /deep/ .ui-autocomplete-token-label{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:14px}@media screen and (max-width:991px){:host /deep/ .ui-autocomplete-token-label{max-width:270px}}@media screen and (min-width:992px){:host /deep/ .ui-autocomplete-token-label{max-width:270px}}@media screen and (min-width:1280px){:host /deep/ .ui-autocomplete-token-label{max-width:500px}}@media screen and (min-width:1600px){:host /deep/ .ui-autocomplete-token-label{max-width:800px}}:host /deep/ .kHighlightedText{text-decoration:underline}"],
                        template: "<span [ngClass]=\"{'ui-autocomplete ui-widget kOverrideFAIcons':true,'ui-autocomplete-dd':dropdown,'ui-autocomplete-multiple':multiple}\"\n      [ngStyle]=\"style\" [class]=\"styleClass\">\n            <input *ngIf=\"!multiple\" #in [attr.type]=\"type\" [attr.id]=\"inputId\" [ngStyle]=\"inputStyle\"\n                   [class]=\"inputStyleClass\" autocomplete=\"off\" [attr.required]=\"required\"\n                   [ngClass]=\"'ui-inputtext ui-widget ui-state-default ui-corner-all ui-autocomplete-input'\"\n                   [value]=\"inputFieldValue ? (field ? ObjectUtils.resolveFieldData(inputFieldValue, field) || inputFieldValue : value) : null\"\n                   (click)=\"onInputClick($event)\" (input)=\"onInput($event)\" (keydown)=\"onKeydown($event)\"\n                   (keyup)=\"onKeyup($event)\" (focus)=\"onInputFocus($event)\" (blur)=\"onInputBlur($event)\"\n                   (change)=\"onInputChange($event)\"\n                   [attr.placeholder]=\"_placeholder\" [attr.size]=\"size\" [attr.maxlength]=\"maxlength\"\n                   [attr.tabindex]=\"tabindex\" [readonly]=\"readonly\" [disabled]=\"disabled\"\n            ><ul *ngIf=\"multiple\" #multiContainer\n                 class=\"ui-autocomplete-multiple-container ui-widget ui-inputtext ui-state-default ui-corner-all\"\n                 [ngClass]=\"{'ui-state-disabled':disabled,'ui-state-focus':focus}\" (click)=\"multiIn.focus()\">\n                <li #token *ngFor=\"let val of value\" [class]=\"'ui-autocomplete-token ui-state-highlight ui-corner-all ' + (classField && val ? val[classField] : '')\"\n                    [kTooltip]=\"val\" [tooltipResolver]=\"tooltipResolver\">\n                    <span class=\"ui-autocomplete-token-icon pi pi-fw pi-times\" (click)=\"removeItem(token)\"\n                          *ngIf=\"!disabled\"></span>\n                    <span *ngIf=\"!selectedItemTemplate\" class=\"ui-autocomplete-token-label\" (click)=\"onItemClick(val)\">{{field ? ObjectUtils.resolveFieldData(val, field): val}}</span>\n                    <ng-container *ngTemplateOutlet=\"selectedItemTemplate; context: {$implicit: val}\"></ng-container>\n                </li>\n                <li class=\"ui-autocomplete-input-token\">\n                    <input #multiIn [attr.type]=\"type\" [attr.id]=\"inputId\" [disabled]=\"disabled\"\n                           [attr.placeholder]=\"(value&&value.length ? null : _placeholder)\" [attr.tabindex]=\"tabindex\"\n                           (input)=\"onInput($event)\" (click)=\"onInputClick($event)\"\n                           (keydown)=\"onKeydown($event)\" [readonly]=\"readonly\" (keyup)=\"onKeyup($event)\"\n                           (focus)=\"onInputFocus($event)\" (blur)=\"onInputBlur($event)\" (change)=\"onInputChange($event)\"\n                           autocomplete=\"off\" [ngStyle]=\"inputStyle\" [class]=\"inputStyleClass\">\n                </li>\n            </ul\n            ><i *ngIf=\"loading\" class=\"ui-autocomplete-loader pi pi-spinner pi-spin\"></i><button #ddBtn type=\"button\"\n                                                                                                 pButton\n                                                                                                 icon=\"pi pi-fw pi-caret-down\"\n                                                                                                 class=\"ui-autocomplete-dropdown\"\n                                                                                                 [disabled]=\"disabled\"\n                                                                                                 (click)=\"handleDropdownClick($event)\"\n                                                                                                 *ngIf=\"dropdown\"></button>\n            <div #panel class=\"ui-autocomplete-panel ui-widget-content ui-corner-all ui-shadow\"\n                 [style.display]=\"overlayVisible ? 'block' : 'none'\" [style.width]=\"appendTo ? 'auto' : '100%'\"\n                 [style.max-height]=\"scrollHeight\" [@overlayAnimation]=\"'visible'\" (@overlayAnimation.start)=\"onOverlayAnimationStart($event)\" (@overlayAnimation.done)=\"onOverlayAnimationDone($event)\"\n                 (mouseenter)=\"overlayHovered=true\" (mouseleave)=\"overlayHovered=false\">\n                <ul\n                  class=\"ui-autocomplete-items ui-autocomplete-list ui-widget-content ui-widget ui-corner-all ui-helper-reset\"\n                  *ngIf=\"overlayVisible\">\n                <li *ngIf=\"_loading\" class=\"ui-autocomplete-notification-item\">\n                Searching...\n            </li>\n            <li *ngIf=\"_showNoItems\" class=\"ui-autocomplete-notification-item\">\n                No Items Found...\n            </li>\n            <li *ngIf=\"_errorMessage\" class=\"ui-autocomplete-notification-item\">\n                {{ _errorMessage }}\n            </li>\n                    <li *ngFor=\"let option of suggestions; let idx = index\"\n                        [ngClass]=\"{'ui-autocomplete-list-item ui-corner-all':true,'ui-state-highlight':(highlightOption==option)}\"\n                    [class.kIsItemDisabled]=\"option | kIsSuggestionDisabled : suggestionSelectableField\"\n                        (mouseenter)=\"highlightOption=option\" (mouseleave)=\"highlightOption=null\"\n                        (click)=\"selectItem(option)\">\n                        <span *ngIf=\"!itemTemplate\"\n                              [innerHTML]=\"_getSuggestionText(option) | kHighlight : searchText\"></span>\n                        <ng-container\n                          *ngTemplateOutlet=\"itemTemplate; context: {$implicit: option, index: idx}\"></ng-container>\n                    </li>\n                    <li *ngIf=\"noResults && emptyMessage\" class=\"ui-autocomplete-list-item ui-corner-all\">{{emptyMessage}}</li>\n                </ul>\n            </div>\n        </span>\n",
                        providers: [KALTURA_AUTOCOMPLETE_VALUE_ACCESSOR],
                        animations: [
                            animations.trigger('overlayAnimation', [
                                animations.state('void', animations.style({
                                    transform: 'translateY(5%)',
                                    opacity: 0
                                })),
                                animations.state('visible', animations.style({
                                    transform: 'translateY(0)',
                                    opacity: 1
                                })),
                                animations.transition('void => visible', animations.animate('225ms ease-out')),
                                animations.transition('visible => void', animations.animate('195ms ease-in'))
                            ])
                        ],
                        host: {
                            '[class.ui-inputwrapper-filled]': 'filled',
                            '[class.ui-inputwrapper-focus]': 'focus'
                        },
                    },] },
        ];
        /** @nocollapse */
        AutoComplete.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: core.Renderer2 },
                { type: core.ChangeDetectorRef },
                { type: core.IterableDiffers }
            ];
        };
        AutoComplete.propDecorators = {
            onItemAdding: [{ type: core.Input }],
            limitToSuggestions: [{ type: core.Input }],
            suggestionSelectableField: [{ type: core.Input }],
            suggestionItemField: [{ type: core.Input }],
            tooltipResolver: [{ type: core.Input }],
            classField: [{ type: core.Input }],
            suggestionLabelField: [{ type: core.Input }],
            addOnPaste: [{ type: core.Input }],
            suggestions: [{ type: core.Input }],
            itemClick: [{ type: core.Output }],
            panelEL: [{ type: core.ViewChild, args: ['panel',] }],
            onPaste: [{ type: core.HostListener, args: ['paste', ['$event'],] }],
            placeholder: [{ type: core.Input }],
            multiple: [{ type: core.Input }],
            suggestionsProvider: [{ type: core.Input }]
        };
        return AutoComplete;
    }(autocomplete.AutoComplete));

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
            { type: core.Pipe, args: [{
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
            { type: core.Pipe, args: [{
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
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, inputtext.InputTextModule, button.ButtonModule, shared.SharedModule, kalturaUi.TooltipModule],
                        declarations: [AutoComplete, HighlightPipe, IsSuggestionDisabledPipe],
                        exports: [AutoComplete, HighlightPipe],
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
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return ClearableInputComponent; }),
        multi: true
    };
    var ClearableInputComponent = /** @class */ (function () {
        function ClearableInputComponent() {
            this.onChange = new core.EventEmitter();
            this.onFocus = new core.EventEmitter();
            this.onBlur = new core.EventEmitter();
            this.onEnterKeyup = new core.EventEmitter();
            this.onClear = new core.EventEmitter();
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
            { type: core.Component, args: [{
                        selector: 'kClearableInput',
                        template: "<span class=\"k-clearable-input-wrapper\">\n    <input pInputText\n           class=\"k-clearable-input-input\"\n           [disabled]=\"disabled || _disabled\"\n           [placeholder]=\"placeholder\"\n           (change)=\"onChange.emit($event)\"\n           (focus)=\"onFocus.emit($event)\"\n           (blur)=\"onBlur.emit($event)\"\n           (keyup.enter)=\"_enterPressed()\"\n           [(ngModel)]=\"_value\">\n    <i *ngIf=\"_showClearBtn\" class=\"k-clearable-input-clear-btn\" title=\"Clear\" (click)=\"_clearInput()\">&times;</i>\n</span>",
                        styles: [".k-clearable-input-wrapper{position:relative}.k-clearable-input-wrapper .k-clearable-input-clear-btn{cursor:pointer;position:absolute;right:5px;top:-6px;font-weight:700;font-size:1.2em;color:#999;font-style:normal}"],
                        providers: [primeng.DomHandler, CLEARABLE_INPUT_VALUE_ACCESSOR],
                    },] },
        ];
        ClearableInputComponent.propDecorators = {
            disabled: [{ type: core.Input }],
            placeholder: [{ type: core.Input }],
            onChange: [{ type: core.Output }],
            onFocus: [{ type: core.Output }],
            onBlur: [{ type: core.Output }],
            onEnterKeyup: [{ type: core.Output }],
            onClear: [{ type: core.Output }]
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
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            shared.SharedModule,
                            primeng.InputTextModule,
                            forms.FormsModule
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
             */ function () {
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
                return (control instanceof kalturaUi.DatePickerControl) ? control : null;
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
                return (control instanceof kalturaUi.DynamicDropdownControl) ? control : null;
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
                return (control instanceof kalturaUi.ListControl) ? control : null;
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
                    .pipe(kalturaCommon.cancelOnDestroy(this))
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
            { type: core.Component, args: [{
                        selector: 'k-prime-control',
                        template: "<div [formGroup]=\"form\" [ngSwitch]=\"control.controlType\">\n    <textarea  *ngSwitchCase=\"'TextArea'\" [formControlName]=\"control.key\"   [class.hasError]=\"errorMsg && form.controls[control.key].touched\" pInputTextarea ></textarea>\n\n    <input *ngSwitchCase=\"'Textbox'\" [formControlName]=\"control.key\"  [class.hasError]=\"errorMsg && form.controls[control.key].touched\" pInputText/>\n\n    <input *ngSwitchCase=\"'Number'\"  type=\"number\" [formControlName]=\"control.key\"  [class.hasError]=\"errorMsg && form.controls[control.key].touched\" pInputText />\n\n    <p-dropdown *ngSwitchCase=\"'Dropdown'\" [filter]=\"true\" [formControlName]=\"control.key\"  [options]=\"asDynamicDropdownControl(control).values | kPrimeListOptions: true\"></p-dropdown>\n\n    <kMultiSelect *ngSwitchCase=\"'List'\" [resetFilterOnHide]=\"true\" [formControlName]=\"control.key\"  [options]=\"asListControl(control).values | kPrimeListOptions : false\"></kMultiSelect>\n\n    <p-calendar *ngSwitchCase=\"'DatePicker'\" [formControlName]=\"control.key\"   icon=\"kIconcalendar\" [showIcon]=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" [showTime]=\"asDatePickerControl(control).showTime\" yearRange=\"2005:2050\" [dateFormat]=\"asDatePickerControl(control).dateFormat\"></p-calendar>\n\n    <p-inputSwitch  *ngSwitchCase=\"'Switch'\" [formControlName]=\"control.key\"> </p-inputSwitch>\n\n    <span *ngSwitchDefault=\"\">Missing control for {{control.controlType}}</span>\n\n    <p *ngIf=\"errorMsg && form.controls[control.key].touched\"\n       class=\"kFormError\">{{errorMsg}}\n    </p>\n</div>\n",
                        styles: [""]
                    },] },
        ];
        PrimeControl.propDecorators = {
            control: [{ type: core.Input }],
            form: [{ type: core.Input }]
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
            { type: core.Pipe, args: [{
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
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return MultiSelectComponent; }),
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
            { type: core.Component, args: [{
                        selector: 'kMultiSelect',
                        styles: [":host /deep/ .ui-multiselect-panel .pi-minus{background-color:#00a784;border:1px solid #00a784;color:#fff;width:16px;height:16px;border-radius:3px;top:-1px;position:relative;left:-1px}"],
                        template: "<div #container [ngClass]=\"{'ui-multiselect ui-widget ui-state-default ui-corner-all':true,'ui-multiselect-open':overlayVisible,'ui-state-focus':focus,'ui-state-disabled': disabled}\" [ngStyle]=\"style\" [class]=\"styleClass\"\n     (click)=\"onMouseclick($event,in)\">\n  <div class=\"ui-helper-hidden-accessible\">\n    <input #in type=\"text\" readonly=\"readonly\" [attr.id]=\"inputId\" [attr.name]=\"name\" (focus)=\"onInputFocus($event)\" (blur)=\"onInputBlur($event)\"\n           [disabled]=\"disabled\" [attr.tabindex]=\"tabindex\" (keydown)=\"onKeydown($event)\">\n  </div>\n  <div class=\"ui-multiselect-label-container\" [title]=\"valuesAsString\">\n    <label class=\"ui-multiselect-label ui-corner-all\">\n      <ng-container *ngIf=\"!selectedItemsTemplate\">{{isAllChecked() ? (allSelectedLabel || valuesAsString) : valuesAsString}}</ng-container>\n      <ng-container *ngTemplateOutlet=\"selectedItemsTemplate; context: {$implicit: value}\"></ng-container>\n    </label>\n  </div>\n  <div [ngClass]=\"{'ui-multiselect-trigger ui-state-default ui-corner-right':true}\">\n    <span class=\"ui-multiselect-trigger-icon ui-clickable\" [ngClass]=\"dropdownIcon\"></span>\n  </div>\n  <div *ngIf=\"overlayVisible\" [ngClass]=\"['ui-multiselect-panel ui-widget ui-widget-content ui-corner-all ui-shadow']\" [@overlayAnimation]=\"{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\" (@overlayAnimation.start)=\"onOverlayAnimationStart($event)\"\n       [ngStyle]=\"panelStyle\" [class]=\"panelStyleClass\" (click)=\"panelClick=true\">\n    <div class=\"ui-widget-header ui-corner-all ui-multiselect-header ui-helper-clearfix\" [ngClass]=\"{'ui-multiselect-header-no-toggleall': !showToggleAll}\" *ngIf=\"showHeader\">\n      <div class=\"ui-chkbox ui-widget\" *ngIf=\"showToggleAll && !selectionLimit\">\n        <div class=\"ui-helper-hidden-accessible\">\n          <input type=\"checkbox\" readonly=\"readonly\" [checked]=\"isAllChecked()\" (focus)=\"onHeaderCheckboxFocus()\" (blur)=\"onHeaderCheckboxBlur()\" (keydown.space)=\"toggleAll($event)\">\n        </div>\n        <div class=\"ui-chkbox-box ui-widget ui-corner-all ui-state-default\" [ngClass]=\"{'ui-state-active':isAllChecked(), 'ui-state-focus': headerCheckboxFocus}\" (click)=\"toggleAll($event)\">\n          <span class=\"ui-chkbox-icon ui-clickable pi\"\n                [ngClass]=\"{'pi-check':isAllChecked(), 'pi-minus':isPartiallyChecked()}\"></span>\n        </div>\n      </div>\n      <div class=\"ui-multiselect-filter-container\" *ngIf=\"filter\">\n        <input #filterInput type=\"text\" role=\"textbox\" [value]=\"filterValue||''\" (input)=\"onFilter()\" class=\"ui-inputtext ui-widget ui-state-default ui-corner-all\" [attr.placeholder]=\"filterPlaceHolder\">\n        <span class=\"ui-multiselect-filter-icon pi pi-search\"></span>\n      </div>\n      <a class=\"ui-multiselect-close ui-corner-all\" tabindex=\"0\" (click)=\"close($event)\" (keydown.enter)=\"close($event)\">\n        <span class=\"pi pi-times\"></span>\n      </a>\n      <ng-content select=\"p-header\"></ng-content>\n    </div>\n    <div class=\"ui-multiselect-items-wrapper\" [style.max-height]=\"virtualScroll ? 'auto' : (scrollHeight||'auto')\">\n      <ul class=\"ui-multiselect-items ui-multiselect-list ui-widget-content ui-widget ui-corner-all ui-helper-reset\">\n        <ng-container *ngIf=\"!virtualScroll; else virtualScrollList\">\n          <ng-template ngFor let-option let-i=\"index\" [ngForOf]=\"options\">\n            <p-multiSelectItem [option]=\"option\" [selected]=\"isSelected(option.value)\" (onClick)=\"onOptionClick($event)\" (onKeydown)=\"onOptionKeydown($event)\"\n                               [maxSelectionLimitReached]=\"maxSelectionLimitReached\" [visible]=\"isItemVisible(option)\" [template]=\"itemTemplate\"></p-multiSelectItem>\n          </ng-template>\n        </ng-container>\n        <ng-template #virtualScrollList>\n          <cdk-virtual-scroll-viewport #viewport [ngStyle]=\"{'height': scrollHeight}\" [itemSize]=\"itemSize\" *ngIf=\"virtualScroll\">\n            <ng-container *cdkVirtualFor=\"let option of options; let i = index; let c = count; let f = first; let l = last; let e = even; let o = odd\">\n              <p-multiSelectItem [option]=\"option\" [selected]=\"isSelected(option.value)\" (onClick)=\"onOptionClick($event)\" (onKeydown)=\"onOptionKeydown($event)\"\n                                 [maxSelectionLimitReached]=\"maxSelectionLimitReached\" [visible]=\"isItemVisible(option)\" [template]=\"itemTemplate\" [itemSize]=\"itemSize\"></p-multiSelectItem>\n            </ng-container>\n          </cdk-virtual-scroll-viewport>\n        </ng-template>\n      </ul>\n    </div>\n    <div class=\"ui-multiselect-footer ui-widget-content\" *ngIf=\"footerFacet\">\n      <ng-content select=\"p-footer\"></ng-content>\n    </div>\n  </div>\n</div>\n",
                        animations: [
                            animations.trigger('overlayAnimation', [
                                animations.state('void', animations.style({
                                    transform: 'translateY(5%)',
                                    opacity: 0
                                })),
                                animations.state('visible', animations.style({
                                    transform: 'translateY(0)',
                                    opacity: 1
                                })),
                                animations.transition('void => visible', animations.animate('{{showTransitionParams}}')),
                                animations.transition('visible => void', animations.animate('{{hideTransitionParams}}'))
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
        MultiSelectComponent.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: core.Renderer2 },
                { type: core.ChangeDetectorRef }
            ];
        };
        MultiSelectComponent.propDecorators = {
            disabledLabel: [{ type: core.Input }],
            allSelectedLabel: [{ type: core.Input }],
            selectAllLabel: [{ type: core.Input }],
            menuItemDisplayStyle: [{ type: core.Input }],
            hideOnScroll: [{ type: core.Input }]
        };
        return MultiSelectComponent;
    }(primeng.MultiSelect));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var MultiSelectItem = /** @class */ (function () {
        function MultiSelectItem() {
            this.onClick = new core.EventEmitter();
            this.onKeydown = new core.EventEmitter();
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
            { type: core.Component, args: [{
                        selector: 'p-multiSelectItem',
                        template: "\n    <li class=\"ui-multiselect-item ui-corner-all\" (click)=\"onOptionClick($event)\" (keydown)=\"onOptionKeydown($event)\"\n        [style.display]=\"visible ? 'block' : 'none'\" [attr.tabindex]=\"option.disabled ? null : '0'\" [ngStyle]=\"{'height': itemSize + 'px'}\"\n        [ngClass]=\"{'ui-state-highlight': selected, 'ui-state-disabled': (option.disabled || (maxSelectionLimitReached && !selected))}\">\n      <div class=\"ui-chkbox ui-widget\">\n        <div class=\"ui-chkbox-box ui-widget ui-corner-all ui-state-default\"\n             [ngClass]=\"{'ui-state-active': selected}\">\n          <span class=\"ui-chkbox-icon ui-clickable\" [ngClass]=\"{'pi pi-check': selected}\"></span>\n        </div>\n      </div>\n      <label *ngIf=\"!template\">{{option.label}}</label>\n      <ng-container *ngTemplateOutlet=\"template; context: {$implicit: option}\"></ng-container>\n    </li>\n  "
                    },] },
        ];
        MultiSelectItem.propDecorators = {
            option: [{ type: core.Input }],
            selected: [{ type: core.Input }],
            disabled: [{ type: core.Input }],
            visible: [{ type: core.Input }],
            itemSize: [{ type: core.Input }],
            template: [{ type: core.Input }],
            maxSelectionLimitReached: [{ type: core.Input }],
            onClick: [{ type: core.Output }],
            onKeydown: [{ type: core.Output }]
        };
        return MultiSelectItem;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var MultiSelectModule = /** @class */ (function () {
        function MultiSelectModule() {
        }
        MultiSelectModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            primeng.MultiSelectModule,
                            common.CommonModule,
                            shared.SharedModule,
                            kalturaUi.TooltipModule,
                            scrolling.ScrollingModule
                        ],
                        declarations: [MultiSelectComponent, MultiSelectItem],
                        exports: [MultiSelectComponent],
                    },] },
        ];
        return MultiSelectModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DynamicFormModule = /** @class */ (function () {
        function DynamicFormModule() {
        }
        DynamicFormModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            forms.ReactiveFormsModule,
                            common.CommonModule,
                            primeng.DropdownModule,
                            MultiSelectModule,
                            primeng.InputTextModule,
                            primeng.InputTextareaModule,
                            primeng.CalendarModule,
                            primeng.InputSwitchModule
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
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return SliderComponent; }),
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
            { type: core.Component, args: [{
                        selector: 'kSlider',
                        styles: [":host /deep/ .ui-slider{background-color:#ccc;height:6px;border:none}:host /deep/ .ui-slider .ui-slider-range{background:#00a784;border:2px solid #00a784}:host /deep/ .ui-slider .ui-slider-handle{top:-.3em;margin-left:-.6em;border-radius:50%;border:2px solid #00a784;height:16px;width:16px;box-shadow:0 2px 8px 0 rgba(0,0,0,.24)}"],
                        template: "<div [ngStyle]=\"style\" [class]=\"styleClass\"\n     [ngClass]=\"{\n         'ui-slider ui-widget ui-widget-content ui-corner-all':true,\n         'ui-state-disabled':disabled,\n         'ui-slider-horizontal':orientation == 'horizontal',\n         'ui-slider-vertical':orientation == 'vertical',\n         'ui-slider-animate':animate\n     }\"\n     (click)=\"onBarClick($event)\">\n\n    <span *ngIf=\"range && orientation == 'horizontal'\"\n          class=\"ui-slider-range ui-widget-header ui-corner-all\"\n          [ngStyle]=\"{'left':handleValues[0] + '%',width: (handleValues[1] - handleValues[0] + '%')}\"></span>\n\n    <span *ngIf=\"range && orientation == 'vertical'\"\n          class=\"ui-slider-range ui-widget-header ui-corner-all\"\n          [ngStyle]=\"{'bottom':handleValues[0] + '%',height: (handleValues[1] - handleValues[0] + '%')}\"></span>\n\n    <span *ngIf=\"!range && orientation=='vertical'\"\n          class=\"ui-slider-range ui-slider-range-min ui-widget-header ui-corner-all\"\n          [ngStyle]=\"{'height': handleValue + '%'}\"></span>\n\n    <span *ngIf=\"!range && orientation=='horizontal'\"\n          class=\"ui-slider-range ui-slider-range-min ui-widget-header ui-corner-all\"\n          [ngStyle]=\"{'width': handleValue + '%'}\"></span>\n\n    <span *ngIf=\"!range\"\n          class=\"ui-slider-handle ui-state-default ui-corner-all ui-clickable\"\n          (mousedown)=\"onMouseDown($event)\"\n          (touchstart)=\"onTouchStart($event)\"\n          (touchmove)=\"onTouchMove($event)\"\n          (touchend)=\"dragging=false\"\n          [style.transition]=\"dragging ? 'none': null\"\n          [ngStyle]=\"{\n            'left': orientation == 'horizontal' ? handleValue + '%' : null,\n            'bottom': orientation == 'vertical' ? handleValue + '%' : null\n          }\"\n          [kTooltip]=\"tooltip ? value : ''\"\n          [followTarget]=\"true\"></span>\n\n    <span *ngIf=\"range\"\n          (mousedown)=\"onMouseDown($event,0)\"\n          (touchstart)=\"onTouchStart($event,0)\"\n          (touchmove)=\"onTouchMove($event,0)\"\n          (touchend)=\"dragging=false\"\n          [style.transition]=\"dragging ? 'none': null\"\n          class=\"ui-slider-handle ui-state-default ui-corner-all ui-clickable\"\n          [ngStyle]=\"{'left': rangeStartLeft, 'bottom': rangeStartBottom}\"\n          [ngClass]=\"{'ui-slider-handle-active':handleIndex==0}\"\n          [kTooltip]=\"tooltip ? values[handleIndex] : ''\"\n          [followTarget]=\"true\"></span>\n\n    <span *ngIf=\"range\"\n          (mousedown)=\"onMouseDown($event,1)\"\n          (touchstart)=\"onTouchStart($event,1)\"\n          (touchmove)=\"onTouchMove($event,1)\"\n          (touchend)=\"dragging=false\"\n          [style.transition]=\"dragging ? 'none': null\"\n          class=\"ui-slider-handle ui-state-default ui-corner-all ui-clickable\"\n          [ngStyle]=\"{'left': rangeEndLeft, 'bottom': rangeEndBottom}\"\n          [ngClass]=\"{'ui-slider-handle-active':handleIndex==1}\"\n          [kTooltip]=\"tooltip ? values[handleIndex] : ''\"\n          [followTarget]=\"true\"></span>\n</div>",
                        providers: [domhandler.DomHandler, KALTURA_SLIDER_VALUE_ACCESSOR]
                        /* tslint:enable */
                    },] },
        ];
        SliderComponent.propDecorators = {
            tooltip: [{ type: core.Input }]
        };
        return SliderComponent;
    }(primeng.Slider));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SliderModule = /** @class */ (function () {
        function SliderModule() {
        }
        SliderModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            primeng.SliderModule,
                            common.CommonModule,
                            shared.SharedModule,
                            kalturaUi.TooltipModule
                        ],
                        declarations: [SliderComponent],
                        exports: [SliderComponent],
                    },] },
        ];
        return SliderModule;
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
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return TimeSpinnerComponent; }),
        multi: true
    };
    var TimeSpinnerComponent = /** @class */ (function () {
        function TimeSpinnerComponent() {
            this.onChange = new core.EventEmitter();
            this.onFocus = new core.EventEmitter();
            this.onBlur = new core.EventEmitter();
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
                var inputValue = (( /** @type {?} */(event.target))).value;
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
            { type: core.Component, args: [{
                        selector: 'kTimeSpinner',
                        template: "<div class=\"kSpinnerContainer\" [class.ui-state-disabled]=\"_disabled\">\n    <input #minutes\n           class=\"kMinutes\"\n           type=\"text\"\n           maxlength=\"2\"\n           [disabled]=\"_disabled\"\n           [value]=\"_minutesAsString\"\n           (click)=\"minutes.select()\"\n           (keydown)=\"_onInputKeydown($event)\"\n           (keyup)=\"_onInputKeyup($event)\"\n           (keypress)=\"_onInputKeyPress($event)\"\n           (change)=\"_handleChange($event)\"\n           (focus)=\"_onInputFocus($event, 'minutes')\"\n           (blur)=\"_onInputBlur($event)\">\n    <span class=\"kDelimiter\">:</span>\n    <input #seconds class=\"kSeconds\" type=\"text\"\n           [value]=\"_secondsAsString\"\n           [disabled]=\"_disabled\"\n           (click)=\"seconds.select()\"\n           (keydown)=\"_onInputKeydown($event)\"\n           (keyup)=\"_onInputKeyup($event)\"\n           (keypress)=\"_onInputKeyPress($event)\"\n           (change)=\"_handleChange($event)\"\n           (focus)=\"_onInputFocus($event, 'seconds')\"\n           (blur)=\"_onInputBlur($event)\">\n    <button type=\"button\"\n            [ngClass]=\"{'ui-spinner-button ui-spinner-up ui-corner-tr ui-button ui-widget ui-state-default':true,'ui-state-disabled':_disabled}\"\n            [disabled]=\"_disabled\"\n            (mouseleave)=\"_onButtonMouseleave($event)\"\n            (mousedown)=\"_onButtonMousedown($event, 1)\"\n            (mouseup)=\"_onButtonMouseup($event)\">\n        <span class=\"kIcondropdown_arrow_top kSpinnerBtn\"></span>\n    </button>\n    <button type=\"button\"\n            class=\"kSpinDown\"\n            [ngClass]=\"{'ui-spinner-button ui-spinner-down ui-corner-br ui-button ui-widget ui-state-default':true,'ui-state-disabled':_disabled}\"\n            [disabled]=\"_disabled\"\n            (mouseleave)=\"_onButtonMouseleave($event)\"\n            (mousedown)=\"_onButtonMousedown($event, -1)\"\n            (mouseup)=\"_onButtonMouseup($event)\">\n        <span class=\"kIcondropdown_arrow_bottom kSpinnerBtn\"></span>\n    </button>\n</div>\n",
                        styles: [".kSpinnerContainer{background-color:#fff;width:78px;height:16px;display:inline-block;overflow:visible;position:relative;vertical-align:middle;border:1px solid #ccc;border-radius:3px;padding:5px 10px 11px 0}.kSpinnerContainer input{border:0;width:25px;height:18px;font-size:15px;color:#999;font-weight:100}.kSpinnerContainer input:focus{outline:0}.kSpinnerContainer .kDelimiter{color:#999;font-weight:100}.kSpinnerContainer .kMinutes{text-align:right}.kSpinnerContainer .kSpinnerBtn{font-size:10px;color:#333}.kSpinnerContainer .ui-state-disabled{opacity:.35;filter:Alpha(Opacity=35);background-image:none;cursor:default!important}.kSpinnerContainer .ui-spinner-button{border:0;margin-right:1px;height:14px;cursor:pointer}.kSpinnerContainer .ui-spinner-down{margin-bottom:5px}"],
                        providers: [primeng.DomHandler, SPINNER_VALUE_ACCESSOR],
                    },] },
        ];
        TimeSpinnerComponent.propDecorators = {
            minutesInputField: [{ type: core.ViewChild, args: ['minutes',] }],
            secondsInputField: [{ type: core.ViewChild, args: ['seconds',] }],
            onChange: [{ type: core.Output }],
            onFocus: [{ type: core.Output }],
            onBlur: [{ type: core.Output }]
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
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            shared.SharedModule,
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
                    api.DomHandler.clearSelection();
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
            { type: core.Directive, args: [{
                        selector: '[kpSortableColumn]',
                        host: {
                            '[class.ui-sortable-column]': 'isEnabled',
                            '[class.ui-state-highlight]': 'sorted'
                        }
                    },] },
        ];
        /** @nocollapse */
        KPSortableColumn.ctorParameters = function () {
            return [
                { type: table.Table }
            ];
        };
        KPSortableColumn.propDecorators = {
            field: [{ type: core.Input, args: ["kpSortableColumn",] }],
            onClick: [{ type: core.HostListener, args: ['click', ['$event'],] }]
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
            { type: core.NgModule, args: [{
                        imports: ( /** @type {?} */([])),
                        declarations: ( /** @type {?} */([
                            KPSortableColumn
                        ])),
                        exports: ( /** @type {?} */([
                            KPSortableColumn
                        ])),
                        providers: ( /** @type {?} */([]))
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
            { type: core.Component, args: [{
                        selector: 'k-column',
                        template: ''
                    },] },
        ];
        ColumnComponent.propDecorators = {
            field: [{ type: core.Input }],
            style: [{ type: core.Input }],
            header: [{ type: core.Input }],
            template: [{ type: core.ContentChild, args: [core.TemplateRef,] }]
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
            this.valueChange = new core.EventEmitter();
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
            this.selectionChange = new core.EventEmitter();
            this.pageChange = new core.EventEmitter();
        }
        Object.defineProperty(DraggableDataTableComponent.prototype, "value", {
            get: /**
             * @return {?}
             */ function () {
                if (this.dragModeOff) {
                    return this._value;
                }
            },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) {
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
                this.mouseMove = Observable.Observable.fromEvent(document, Events.MOUSE_MOVE).delay(50);
                // cover non-permitted dragging/dropping:
                Observable.Observable.fromEvent(document, Events.MOUSE_UP).subscribe(function () { return _this.onMouseUp(); });
                Observable.Observable.fromEvent(this.tableBody.nativeElement, Events.MOUSE_LEAVE).subscribe(function () { return _this._onMouseLeave(); });
                Observable.Observable.fromEvent(this.tableBody.nativeElement, Events.MOUSE_ENTER).subscribe(function () { return _this._onMouseEnter(); });
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
            { type: core.Component, args: [{
                        selector: 'k-draggable-data-table',
                        template: "<table [ngClass]=\"{ 'onDragMode' : !dragModeOff }\">\n  <thead>\n  <tr>\n    <th class=\"draggable-row-icon-placeholder\"></th>\n    <th *ngIf=\"selectable\" class=\"draggable-row-check-box\">\n      <p-checkbox (onChange)=\"selectAll($event)\"></p-checkbox>\n    </th>\n    <td *ngIf=\"showIndex\" class=\"draggable-row-index\"></td>\n    <th *ngFor=\"let col of columns\" [ngStyle]=\"col.style\">{{col.header}}</th>\n  </tr>\n  </thead>\n  <tbody #tableBody>\n\n  <tr *ngFor=\"let row of draggableItems;index as i;\" [class]=\"row.class\" [ngClass]=\"{ 'draggable-row' : true }\"\n      (mouseover)=\"onMouseOver($event, i)\" (mouseup)=\"onMouseUp()\">\n\n    <td class=\"draggable-row-icon-placeholder\" (mousedown)=\"onMouseDown($event, i)\">\n      <span class=\"draggable-row-icon\"></span>\n      <span class=\"draggable-row-icon\"></span>\n      <span class=\"draggable-row-icon\"></span>\n      <span class=\"draggable-row-icon\"></span>\n    </td>\n    <td *ngIf=\"selectable\" class=\"draggable-row-check-box\">\n      <p-checkbox [value]=\"getItemIndex(i)\" [(ngModel)]=\"selectedIndexes\" (onChange)=\"onSelectionChange()\">\n      </p-checkbox>\n    </td>\n    <td *ngIf=\"showIndex\" class=\"draggable-row-index\" (mousedown)=\"onMouseDown($event, i)\">\n      <span>{{getItemIndex(i) + 1}}</span>\n    </td>\n    <td *ngFor=\"let col of columns\" [ngStyle]=\"col.style\" (mousedown)=\"onMouseDown($event, i)\">\n      <ng-container\n        *ngTemplateOutlet=\"col.template; context: { $implicit: col, rowData: row, rowIndex: getItemIndex(i)}\"></ng-container>\n    </td>\n  </tr>\n  </tbody>\n</table>\n\n<div *ngIf=\"(!!draggableItems && draggableItems.length === 0) || !draggableItems\"\n     class=\"empty-state-placeholder\">\n  <ng-container *ngTemplateOutlet=\"emptyStateTemplate\"></ng-container>\n</div>\n\n<p-paginator *ngIf=\"paginator\" [rows]=\"rows\" [totalRecords]=\"value ? value.length : 0\"\n             [rowsPerPageOptions]=\"rowsPerPageOptions\" (onPageChange)=\"paginate($event)\">\n</p-paginator>\n\n<div #draggable [hidden]=\"dragModeOff\"\n     [ngClass]=\"{ 'multiple-drag-and-drop' : (multipleDragAndDrop && selectedIndexes.length > 1) }\"\n     (mouseup)=\"onMouseUp()\" (mousemove)=\"onMouseMove($event)\">\n  <span *ngIf=\"multipleDragAndDrop && selectedIndexes.length > 1\" class=\"selected-items-counter\">{{selectedIndexes.length}}</span>\n  <ng-container *ngTemplateOutlet=\"draggableViewTemplate; context: {currentDraggableItem: currentDraggableItem}\">\n  </ng-container>\n</div>\n",
                        styles: ["table{width:100%;text-align:left;table-layout:fixed;border-collapse:collapse}table thead{border:1px solid #d9d9d9;border-left:none;border-right:none}table thead tr{height:32px;color:#999}table tbody{overflow:auto}table tbody tr{height:70px;background:#fff;color:#999}table tr{border:1px solid #d9d9d9;color:#333;border-left:none;border-right:none}.open{opacity:.5}.hovered{background-color:#ebebeb!important;text-indent:-9999px;border:none!important}.draggable-row-icon{display:none;width:4px;height:4px;border-radius:2px;background-color:#ccc;margin:4px 0 4px 7px}.draggable-row-check-box,.draggable-row-icon-placeholder,.draggable-row-index{width:15px}.draggable-row-check-box{width:44px}.draggable-row{cursor:-webkit-grab;cursor:grab}.onDragMode .draggable-row{cursor:-webkit-grabbing;cursor:grabbing}.draggable-row:hover .draggable-row-icon{display:block}.onDragMode .draggable-row:hover .draggable-row-icon{display:none}.fadeIn{-webkit-animation-name:fadeIn;animation-name:fadeIn;-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-fill-mode:both;animation-fill-mode:both}.multiple-drag-and-drop{box-shadow:5px 5px 0 0 #fff,7px 7px 8px 0 rgba(50,50,50,.38);border-radius:2px}.selected-items-counter{z-index:1;width:20px;height:20px;background:#00a784;display:block;border-radius:10px;color:#fff;text-align:center;position:absolute;top:-10px;right:-10px;font-size:small;line-height:150%;font-weight:700}.empty-state-placeholder{text-align:center}@-webkit-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@keyframes fadeIn{0%{opacity:0}100%{opacity:1}}"]
                    },] },
        ];
        /** @nocollapse */
        DraggableDataTableComponent.ctorParameters = function () {
            return [
                { type: core.Renderer2 }
            ];
        };
        DraggableDataTableComponent.propDecorators = {
            emptyStateTemplate: [{ type: core.Input }],
            draggableViewTemplate: [{ type: core.Input }],
            valueChange: [{ type: core.Output }],
            draggableElement: [{ type: core.ViewChild, args: ['draggable',] }],
            tableBody: [{ type: core.ViewChild, args: ['tableBody',] }],
            cols: [{ type: core.ContentChildren, args: [ColumnComponent,] }],
            value: [{ type: core.Input }],
            unDraggableFromTop: [{ type: core.Input }],
            unDraggableFromBottom: [{ type: core.Input }],
            rowTrackBy: [{ type: core.Input }],
            columnTrackBy: [{ type: core.Input }],
            paginator: [{ type: core.Input }],
            rows: [{ type: core.Input }],
            rowsPerPageOptions: [{ type: core.Input }],
            showIndex: [{ type: core.Input }],
            multipleDragAndDrop: [{ type: core.Input }],
            selectable: [{ type: core.Input }],
            selectionChange: [{ type: core.Output }],
            pageChange: [{ type: core.Output }]
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
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            primeng.CheckboxModule,
                            primeng.PaginatorModule
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
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return DropdownComponent; }),
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
            { type: core.Component, args: [{
                        selector: 'kDropdown',
                        template: "<div #container [ngClass]=\"{'ui-dropdown ui-widget ui-state-default ui-corner-all ui-helper-clearfix':true,\n            'ui-state-disabled':disabled,'ui-dropdown-open':overlayVisible,'ui-state-focus':focused, 'ui-dropdown-clearable': showClear && !disabled}\"\n     (click)=\"onMouseclick($event)\" [ngStyle]=\"style\" [class]=\"styleClass\">\n  <div class=\"ui-helper-hidden-accessible\" *ngIf=\"autoWidth\">\n    <select [required]=\"required\" [attr.name]=\"name\" [attr.aria-label]=\"selectedOption ? selectedOption.label : ' '\" tabindex=\"-1\" aria-hidden=\"true\">\n      <option *ngIf=\"placeholder\">{{placeholder}}</option>\n      <ng-container *ngIf=\"group\">\n        <optgroup *ngFor=\"let option of options\" [attr.label]=\"option.label\">\n          <option *ngFor=\"let option of option.items\" [value]=\"option.value\" [selected]=\"selectedOption == option\">{{option.label}}</option>\n          <optgroup>\n      </ng-container>\n      <ng-container *ngIf=\"!group\">\n        <option *ngFor=\"let option of options\" [value]=\"option.value\" [selected]=\"selectedOption == option\">{{option.label}}</option>\n      </ng-container>\n    </select>\n  </div>\n  <div class=\"ui-helper-hidden-accessible\">\n    <input #in [attr.id]=\"inputId\" type=\"text\" [attr.aria-label]=\"selectedOption ? selectedOption.label : ' '\" readonly (focus)=\"onInputFocus($event)\" role=\"listbox\"\n           (blur)=\"onInputBlur($event)\" (keydown)=\"onKeydown($event, true)\" [disabled]=\"disabled\" [attr.tabindex]=\"tabindex\" [attr.autofocus]=\"autofocus\">\n  </div>\n  <label [ngClass]=\"{'ui-dropdown-label ui-inputtext ui-corner-all':true,'ui-dropdown-label-empty':(label == null || label.length === 0)}\" *ngIf=\"!editable && (label != null)\">\n    <ng-container *ngIf=\"!selectedItemTemplate\">{{label||'empty'}}</ng-container>\n    <ng-container *ngTemplateOutlet=\"selectedItemTemplate; context: {$implicit: selectedOption}\"></ng-container>\n  </label>\n  <label [ngClass]=\"{'ui-dropdown-label ui-inputtext ui-corner-all ui-placeholder':true,'ui-dropdown-label-empty': (placeholder == null || placeholder.length === 0)}\" *ngIf=\"!editable && (label == null)\">{{placeholder||'empty'}}</label>\n  <input #editableInput type=\"text\" [attr.aria-label]=\"selectedOption ? selectedOption.label : ' '\" class=\"ui-dropdown-label ui-inputtext ui-corner-all\" *ngIf=\"editable\" [disabled]=\"disabled\" [attr.placeholder]=\"placeholder\"\n         (click)=\"onEditableInputClick($event)\" (input)=\"onEditableInputChange($event)\" (focus)=\"onEditableInputFocus($event)\" (blur)=\"onInputBlur($event)\">\n  <i class=\"ui-dropdown-clear-icon pi pi-times\" (click)=\"clear($event)\" *ngIf=\"value != null && showClear && !disabled\"></i>\n  <div class=\"ui-dropdown-trigger ui-state-default ui-corner-right\">\n    <span class=\"ui-dropdown-trigger-icon ui-clickable\" [ngClass]=\"dropdownIcon\"></span>\n  </div>\n  <div #panel [ngClass]=\"'ui-dropdown-panel ui-widget-content ui-corner-all ui-shadow'\" [@panelState]=\"overlayVisible ? 'visible' : 'hidden'\"\n       [style.display]=\"overlayVisible ? 'block' : 'none'\" [ngStyle]=\"panelStyle\" [class]=\"panelStyleClass\">\n    <div *ngIf=\"filter\" class=\"ui-dropdown-filter-container\" (input)=\"onFilter($event)\" (click)=\"$event.stopPropagation()\">\n      <input #filter type=\"text\" autocomplete=\"off\" class=\"ui-dropdown-filter ui-inputtext ui-widget ui-state-default ui-corner-all\" [attr.placeholder]=\"filterPlaceholder\"\n             (keydown.enter)=\"$event.preventDefault()\" (keydown)=\"onKeydown($event, false)\">\n      <span class=\"ui-dropdown-filter-icon pi pi-search\"></span>\n    </div>\n    <div #itemswrapper class=\"ui-dropdown-items-wrapper\" [style.max-height]=\"scrollHeight||'auto'\">\n      <ul class=\"ui-dropdown-items ui-dropdown-list ui-widget-content ui-widget ui-corner-all ui-helper-reset\">\n        <ng-container *ngIf=\"group\">\n          <ng-template ngFor let-optgroup [ngForOf]=\"optionsToDisplay\">\n            <li class=\"ui-dropdown-item-group\">\n              <span *ngIf=\"!groupTemplate\">{{optgroup.label||'empty'}}</span>\n              <ng-container *ngTemplateOutlet=\"groupTemplate; context: {$implicit: optgroup}\"></ng-container>\n            </li>\n            <ng-container *ngTemplateOutlet=\"itemslist; context: {$implicit: optgroup.items, selectedOption: selectedOption}\"></ng-container>\n          </ng-template>\n        </ng-container>\n        <ng-container *ngIf=\"!group\">\n          <ng-container *ngTemplateOutlet=\"itemslist; context: {$implicit: optionsToDisplay, selectedOption: selectedOption}\"></ng-container>\n        </ng-container>\n        <ng-template #itemslist let-options let-selectedOption=\"selectedOption\">\n          <li *ngFor=\"let option of options;let i=index\"\n              [ngClass]=\"{\n                'ui-dropdown-item ui-corner-all':true,\n                'ui-state-highlight':(selectedOption == option),\n                'ui-dropdown-item-empty':!option.label||option.label.length === 0,\n                'ui-state-disabled': option.disabled\n              }\"\n              (click)=\"onItemClick($event, option)\">\n            <span *ngIf=\"!itemTemplate\">{{option.label||'empty'}}</span>\n            <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: option}\"></ng-container>\n          </li>\n        </ng-template>\n        <li *ngIf=\"filter && optionsToDisplay && optionsToDisplay.length === 0\">{{emptyFilterMessage}}</li>\n      </ul>\n    </div>\n  </div>\n</div>\n",
                        styles: [".ui-dropdown{display:inline-block;position:relative;cursor:pointer;vertical-align:middle}.ui-dropdown .ui-dropdown-clear-icon{position:absolute;top:50%;font-size:.75em;height:1em;margin-top:-.5em;right:2.5em}.ui-dropdown .ui-dropdown-trigger{border-right:none;border-top:none;border-bottom:none;cursor:pointer;width:1.5em;height:100%;position:absolute;right:0;top:0;padding:0 .25em}.ui-dropdown .ui-dropdown-trigger .ui-dropdown-trigger-icon{top:50%;left:50%;margin-top:-.5em;margin-left:-.5em;position:absolute}.ui-dropdown .ui-dropdown-label{display:block;border:none;white-space:nowrap;overflow:hidden;font-weight:400;width:100%;padding-right:2.5em}.ui-dropdown-item-empty,.ui-dropdown-label-empty{text-indent:-9999px;overflow:hidden}.ui-state-disabled{opacity:.6;cursor:default}.ui-dropdown.ui-state-disabled .ui-dropdown-label,.ui-dropdown.ui-state-disabled .ui-dropdown-trigger{cursor:default}.ui-dropdown label.ui-dropdown-label{cursor:pointer}.ui-dropdown input.ui-dropdown-label{cursor:default}.ui-dropdown .ui-dropdown-panel{min-width:100%}.ui-dropdown-panel{position:absolute;height:auto;display:none}.ui-dropdown-panel .ui-dropdown-items-wrapper{overflow:auto}.ui-dropdown-panel .ui-dropdown-item{font-weight:400;border:0;cursor:pointer;margin:1px 0;padding:.125em .25em;text-align:left}.ui-dropdown-panel .ui-dropdown-item-group{font-weight:700;cursor:default}.ui-dropdown-panel .ui-dropdown-list{padding:.4em;border:0}.ui-dropdown-panel .ui-dropdown-filter{width:100%;box-sizing:border-box;padding-right:1.5em}.ui-dropdown-panel .ui-dropdown-filter-container{position:relative;margin:0;padding:.4em;display:inline-block;width:100%}.ui-dropdown-panel .ui-dropdown-filter-container .ui-dropdown-filter-icon{position:absolute;top:.8em;right:1em}.ui-fluid .ui-dropdown{width:100%}"],
                        animations: [
                            animations.trigger('panelState', [
                                animations.state('hidden', animations.style({
                                    opacity: 0
                                })),
                                animations.state('visible', animations.style({
                                    opacity: 1
                                })),
                                animations.transition('visible => hidden', animations.animate('400ms ease-in')),
                                animations.transition('hidden => visible', animations.animate('400ms ease-out'))
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
    }(dropdown.Dropdown));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DropdownModule = /** @class */ (function () {
        function DropdownModule() {
        }
        DropdownModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            primeng.DropdownModule
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
        return DropdownModule;
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

    exports.KalturaPrimeNgUIModule = KalturaPrimeNgUIModule;
    exports.KALTURA_AUTOCOMPLETE_VALUE_ACCESSOR = KALTURA_AUTOCOMPLETE_VALUE_ACCESSOR;
    exports.AutoComplete = AutoComplete;
    exports.AutoCompleteModule = AutoCompleteModule;
    exports.DropdownCloseOnScroll = DropdownCloseOnScroll;
    exports.MenuCloseOnScroll = MenuCloseOnScroll;
    exports.StickyDatatableHeaderDirective = StickyDatatableHeaderDirective;
    exports.CLEARABLE_INPUT_VALUE_ACCESSOR = CLEARABLE_INPUT_VALUE_ACCESSOR;
    exports.ClearableInputComponent = ClearableInputComponent;
    exports.ClearableInputModule = ClearableInputModule;
    exports.DynamicFormModule = DynamicFormModule;
    exports.KALTURA_SLIDER_VALUE_ACCESSOR = KALTURA_SLIDER_VALUE_ACCESSOR;
    exports.SliderComponent = SliderComponent;
    exports.SliderModule = SliderModule;
    exports.SPINNER_VALUE_ACCESSOR = SPINNER_VALUE_ACCESSOR;
    exports.TimeSpinnerComponent = TimeSpinnerComponent;
    exports.TimeSpinnerModule = TimeSpinnerModule;
    exports.KPSortableColumn = KPSortableColumn;
    exports.KPTableModule = KPTableModule;
    exports.KALTURA_MULTISELECT_VALUE_ACCESSOR = KALTURA_MULTISELECT_VALUE_ACCESSOR;
    exports.MultiSelectComponent = MultiSelectComponent;
    exports.MultiSelectModule = MultiSelectModule;
    exports.DraggableDataTableComponent = DraggableDataTableComponent;
    exports.DraggableDataTableModule = DraggableDataTableModule;
    exports.DropdownModule = DropdownModule;
    exports.ɵa = HighlightPipe;
    exports.ɵb = IsSuggestionDisabledPipe;
    exports.ɵf = ColumnComponent;
    exports.ɵg = DROPDOWN_VALUE_ACCESSOR;
    exports.ɵh = DropdownComponent;
    exports.ɵd = PrimeControl;
    exports.ɵe = PrimeListOptionsPipe;
    exports.ɵc = MultiSelectItem;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2FsdHVyYS1uZy1rYWx0dXJhLXByaW1lbmctdWkudW1kLmpzLm1hcCIsInNvdXJjZXMiOltudWxsLCJuZzovL0BrYWx0dXJhLW5nL2thbHR1cmEtcHJpbWVuZy11aS9saWIvZGlyZWN0aXZlcy9zdGlja3ktZGF0YXRhYmxlLWhlYWRlci5kaXJlY3RpdmUudHMiLCJuZzovL0BrYWx0dXJhLW5nL2thbHR1cmEtcHJpbWVuZy11aS9saWIvZGlyZWN0aXZlcy9kcm9wZG93bi1jbG9zZS1vbi1zY3JvbGwudHMiLCJuZzovL0BrYWx0dXJhLW5nL2thbHR1cmEtcHJpbWVuZy11aS9saWIvZGlyZWN0aXZlcy9tZW51LWNsb3NlLW9uLXNjcm9sbC50cyIsIm5nOi8vQGthbHR1cmEtbmcva2FsdHVyYS1wcmltZW5nLXVpL2xpYi9rYWx0dXJhLXByaW1lbmctdWkubW9kdWxlLnRzIiwibmc6Ly9Aa2FsdHVyYS1uZy9rYWx0dXJhLXByaW1lbmctdWkvbGliL2F1dG8tY29tcGxldGUvYXV0by1jb21wbGV0ZS5jb21wb25lbnQudHMiLCJuZzovL0BrYWx0dXJhLW5nL2thbHR1cmEtcHJpbWVuZy11aS9saWIvYXV0by1jb21wbGV0ZS9oaWdobGlnaHQucGlwZS50cyIsIm5nOi8vQGthbHR1cmEtbmcva2FsdHVyYS1wcmltZW5nLXVpL2xpYi9hdXRvLWNvbXBsZXRlL2lzLXN1Z2dlc3Rpb24tZGlzYWJsZWQucGlwZS50cyIsIm5nOi8vQGthbHR1cmEtbmcva2FsdHVyYS1wcmltZW5nLXVpL2xpYi9hdXRvLWNvbXBsZXRlL2F1dG8tY29tcGxldGUubW9kdWxlLnRzIiwibmc6Ly9Aa2FsdHVyYS1uZy9rYWx0dXJhLXByaW1lbmctdWkvbGliL2NsZWFyYWJsZS1pbnB1dC9jbGVhcmFibGUtaW5wdXQuY29tcG9uZW50LnRzIiwibmc6Ly9Aa2FsdHVyYS1uZy9rYWx0dXJhLXByaW1lbmctdWkvbGliL2NsZWFyYWJsZS1pbnB1dC9jbGVhcmFibGUtaW5wdXQubW9kdWxlLnRzIiwibmc6Ly9Aa2FsdHVyYS1uZy9rYWx0dXJhLXByaW1lbmctdWkvbGliL2R5bmFtaWMtZm9ybS9wcmltZS1jb250cm9sLmNvbXBvbmVudC50cyIsIm5nOi8vQGthbHR1cmEtbmcva2FsdHVyYS1wcmltZW5nLXVpL2xpYi9keW5hbWljLWZvcm0vcHJpbWUtbGlzdC1vcHRpb25zLnBpcGUudHMiLCJuZzovL0BrYWx0dXJhLW5nL2thbHR1cmEtcHJpbWVuZy11aS9saWIvbXVsdGktc2VsZWN0L211bHRpLXNlbGVjdC5jb21wb25lbnQudHMiLCJuZzovL0BrYWx0dXJhLW5nL2thbHR1cmEtcHJpbWVuZy11aS9saWIvbXVsdGktc2VsZWN0L211bHRpLXNlbGVjdC1pdGVtLmNvbXBvbmVudC50cyIsIm5nOi8vQGthbHR1cmEtbmcva2FsdHVyYS1wcmltZW5nLXVpL2xpYi9tdWx0aS1zZWxlY3QvbXVsdGktc2VsZWN0Lm1vZHVsZS50cyIsIm5nOi8vQGthbHR1cmEtbmcva2FsdHVyYS1wcmltZW5nLXVpL2xpYi9keW5hbWljLWZvcm0vZHluYW1pYy1mb3JtLm1vZHVsZS50cyIsIm5nOi8vQGthbHR1cmEtbmcva2FsdHVyYS1wcmltZW5nLXVpL2xpYi9zbGlkZXIvc2xpZGVyLmNvbXBvbmVudC50cyIsIm5nOi8vQGthbHR1cmEtbmcva2FsdHVyYS1wcmltZW5nLXVpL2xpYi9zbGlkZXIvc2xpZGVyLm1vZHVsZS50cyIsIm5nOi8vQGthbHR1cmEtbmcva2FsdHVyYS1wcmltZW5nLXVpL2xpYi90aW1lLXNwaW5uZXIvdGltZS1zcGlubmVyLmNvbXBvbmVudC50cyIsIm5nOi8vQGthbHR1cmEtbmcva2FsdHVyYS1wcmltZW5nLXVpL2xpYi90aW1lLXNwaW5uZXIvdGltZS1zcGlubmVyLm1vZHVsZS50cyIsIm5nOi8vQGthbHR1cmEtbmcva2FsdHVyYS1wcmltZW5nLXVpL2xpYi9rLXAtdGFibGUvay1wLXNvcnRhYmxlLWNvbHVtbi50cyIsIm5nOi8vQGthbHR1cmEtbmcva2FsdHVyYS1wcmltZW5nLXVpL2xpYi9rLXAtdGFibGUvay1wLXRhYmxlLm1vZHVsZS50cyIsIm5nOi8vQGthbHR1cmEtbmcva2FsdHVyYS1wcmltZW5nLXVpL2xpYi9kcmFnZ2FibGUtZGF0YS10YWJsZS9jb2x1bW4uY29tcG9uZW50LnRzIiwibmc6Ly9Aa2FsdHVyYS1uZy9rYWx0dXJhLXByaW1lbmctdWkvbGliL2RyYWdnYWJsZS1kYXRhLXRhYmxlL2RyYWdnYWJsZS1kYXRhLXRhYmxlLmNvbXBvbmVudC50cyIsIm5nOi8vQGthbHR1cmEtbmcva2FsdHVyYS1wcmltZW5nLXVpL2xpYi9kcmFnZ2FibGUtZGF0YS10YWJsZS9kcmFnZ2FibGUtZGF0YS10YWJsZS5tb2R1bGUudHMiLCJuZzovL0BrYWx0dXJhLW5nL2thbHR1cmEtcHJpbWVuZy11aS9saWIvZHJvcGRvd24vZHJvcGRvd24uY29tcG9uZW50LnRzIiwibmc6Ly9Aa2FsdHVyYS1uZy9rYWx0dXJhLXByaW1lbmctdWkvbGliL2Ryb3Bkb3duL2Ryb3Bkb3duLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBSZW5kZXJlciwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3RpY2t5U2Nyb2xsU2VydmljZSB9IGZyb20gJ0BrYWx0dXJhLW5nL2thbHR1cmEtdWknO1xuaW1wb3J0IHsgU3RpY2t5RGlyZWN0aXZlIH0gZnJvbSAnQGthbHR1cmEtbmcva2FsdHVyYS11aSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2tTdGlja3lIZWFkZXJdJ1xufSlcblxuZXhwb3J0IGNsYXNzIFN0aWNreURhdGF0YWJsZUhlYWRlckRpcmVjdGl2ZSBleHRlbmRzIFN0aWNreURpcmVjdGl2ZSB7XG5cbiAgICBwcml2YXRlIF9kYXRhVGFibGVSZWY6IEVsZW1lbnRSZWY7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcmVuZGVyZXI6IFJlbmRlcmVyLCBfc3RpY2t5U2Nyb2xsU2VydmljZTogU3RpY2t5U2Nyb2xsU2VydmljZSkge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmLCByZW5kZXJlciwgX3N0aWNreVNjcm9sbFNlcnZpY2UpO1xuICAgICAgICB0aGlzLl9kYXRhVGFibGVSZWYgPSBlbGVtZW50UmVmO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfZ2V0U3RpY2t5RWxlbWVudChlbGVtZW50UmVmOiBFbGVtZW50UmVmKSA6YW55e1xuICAgICAgICBjb25zdCBoZWFkZXJzID0gZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy51aS10YWJsZS1zY3JvbGxhYmxlLWhlYWRlci1ib3gsLnVpLWRhdGF0YWJsZS1zY3JvbGxhYmxlLWhlYWRlci1ib3gnKTtcblxuICAgICAgICBpZiAoaGVhZGVycyAmJiBoZWFkZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZ290IHByaW1lbmcgdGFibGUgaGVhZGVyIVwiKTtcbiAgICAgICAgICAgIHJldHVybiBoZWFkZXJzWzBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiZmFpbGVkIHRvIGV4dHJhY3QgdGFibGUgaGVhZGVyIChkaWQgeW91IHNldCB0aGUgcHJpbWUgdGFibGUgd2l0aCBoZWFkZXIgYW5kIHNldCBpdCB0byBzY3JvbGxhYmxlPylcIik7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBfb25TdGlja3koKTp2b2lke1xuICAgICAgICB0aGlzLnVwZGF0ZUhlYWRlclNpemUoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX29uVW5zZXRTdGlja3koKTp2b2lke1xuICAgICAgICB0aGlzLl9zdGlja3lFbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ3N0YXRpYyc7XG4gICAgICAgIHRoaXMuX3N0aWNreUVsZW1lbnQuc3R5bGUud2lkdGggPSAnYXV0byc7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uUmVzaXplKCk6dm9pZHtcbiAgICAgICAgdGhpcy51cGRhdGVIZWFkZXJTaXplKCk7XG4gICAgfTtcblxuICAgIHByaXZhdGUgdXBkYXRlSGVhZGVyU2l6ZSgpe1xuICAgICAgICBpZiAodGhpcy5pc1N0aWNreSkge1xuICAgICAgICAgICAgY29uc3QgYm91bmRpbmdDbGllbnRSZWN0OiBhbnkgPSB0aGlzLl9kYXRhVGFibGVSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIGNvbnN0IHRhYmxlV2lkdGggPSBib3VuZGluZ0NsaWVudFJlY3RbJ3JpZ2h0J10gLSBib3VuZGluZ0NsaWVudFJlY3RbJ2xlZnQnXTtcbiAgICAgICAgICAgIHRoaXMuX3N0aWNreUVsZW1lbnQuc3R5bGUud2lkdGggPSB0YWJsZVdpZHRoICsgJ3B4JztcbiAgICAgICAgfVxuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQsIENvbnRlbnRDaGlsZCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERyb3Bkb3duIH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcbmltcG9ydCB7IElTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5cbkBEaXJlY3RpdmUoe1xuXHRzZWxlY3RvcjogJ1trRHJvcGRvd25DbG9zZU9uU2Nyb2xsXScsXG59KVxuZXhwb3J0IGNsYXNzIERyb3Bkb3duQ2xvc2VPblNjcm9sbCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cblx0QElucHV0KCkgc2Nyb2xsVGFyZ2V0OiBhbnk7XG5cdEBDb250ZW50Q2hpbGQoRHJvcGRvd24pIHB1YmxpYyBkcm9wZG93bjogRHJvcGRvd247XG5cblx0cHJpdmF0ZSBfcmVnaXN0ZXJlZCA9IGZhbHNlO1xuXHRwcml2YXRlIF9kcm9wZG93bkNoYW5nZXNTdWJzY3JpcHRpb246IElTdWJzY3JpcHRpb247XG5cdHByaXZhdGUgX2Nsb3NlRHJvcGRvd25GdW5jID0gdGhpcy5jbG9zZURyb3Bkb3duLmJpbmQodGhpcyk7XG5cdHByaXZhdGUgX2lzRGVzdHJveWVkID0gZmFsc2U7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdH1cblxuXHRuZ0FmdGVyVmlld0luaXQoKSB7XG5cdFx0dGhpcy5kcm9wZG93bi5lbC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9Pntcblx0XHRcdHRoaXMuaGFuZGxlU2Nyb2xsUmVnaXN0cmF0aW9uKCk7XG5cdFx0fSk7XG5cdFx0dGhpcy5fZHJvcGRvd25DaGFuZ2VzU3Vic2NyaXB0aW9uID0gdGhpcy5kcm9wZG93bi5vbkNoYW5nZS5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG5cdFx0XHR0aGlzLmhhbmRsZVNjcm9sbFJlZ2lzdHJhdGlvbigpO1xuXHRcdH0pO1xuXHR9XG5cblx0aGFuZGxlU2Nyb2xsUmVnaXN0cmF0aW9uKCk6dm9pZHtcblx0XHRpZiAodGhpcy5zY3JvbGxUYXJnZXQgJiYgdGhpcy5kcm9wZG93bil7XG5cdFx0XHRzZXRUaW1lb3V0KCgpPT57XG5cdFx0XHRcdGlmICghdGhpcy5faXNEZXN0cm95ZWQpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5kcm9wZG93bi5vdmVybGF5VmlzaWJsZSAmJiAhdGhpcy5fcmVnaXN0ZXJlZCkge1xuXHRcdFx0XHRcdFx0dGhpcy5zY3JvbGxUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5fY2xvc2VEcm9wZG93bkZ1bmMpO1xuXHRcdFx0XHRcdFx0dGhpcy5fcmVnaXN0ZXJlZCA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICghdGhpcy5kcm9wZG93bi5vdmVybGF5VmlzaWJsZSAmJiB0aGlzLl9yZWdpc3RlcmVkKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnNjcm9sbFRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9jbG9zZURyb3Bkb3duRnVuYyk7XG5cdFx0XHRcdFx0XHR0aGlzLl9yZWdpc3RlcmVkID0gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LDApO1xuXHRcdH1cblx0fVxuXG5cdG5nT25EZXN0cm95KCkge1xuXHRcdGlmICh0aGlzLnNjcm9sbFRhcmdldCAmJiB0aGlzLl9yZWdpc3RlcmVkKSB7XG5cdFx0XHR0aGlzLnNjcm9sbFRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9jbG9zZURyb3Bkb3duRnVuYyk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLl9kcm9wZG93bkNoYW5nZXNTdWJzY3JpcHRpb24pe1xuXHRcdFx0dGhpcy5fZHJvcGRvd25DaGFuZ2VzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG5cdFx0XHR0aGlzLl9kcm9wZG93bkNoYW5nZXNTdWJzY3JpcHRpb24gPSBudWxsO1xuXHRcdH1cblx0XHR0aGlzLl9pc0Rlc3Ryb3llZCA9IHRydWU7XG5cdH1cblxuXHRwcml2YXRlIGNsb3NlRHJvcGRvd24oKTp2b2lke1xuXHRcdGlmICh0aGlzLmRyb3Bkb3duICYmIHR5cGVvZiB0aGlzLmRyb3Bkb3duLmhpZGUgIT09IFwidW5kZWZpbmVkXCIpe1xuXHRcdFx0dGhpcy5kcm9wZG93bi5oaWRlKCk7XG5cdFx0XHR0aGlzLnNjcm9sbFRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9jbG9zZURyb3Bkb3duRnVuYyk7XG5cdFx0XHR0aGlzLl9yZWdpc3RlcmVkID0gZmFsc2U7XG5cdFx0fVxuXHR9XG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIENvbnRlbnRDaGlsZCwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1lbnUsIFRpZXJlZE1lbnUgfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xuXG5ARGlyZWN0aXZlKHtcblx0c2VsZWN0b3I6ICdba01lbnVDbG9zZU9uU2Nyb2xsXScsXG59KVxuZXhwb3J0IGNsYXNzIE1lbnVDbG9zZU9uU2Nyb2xsIHtcblx0cHJpdmF0ZSAgX21lbnU6IE1lbnUgfCBUaWVyZWRNZW51O1xuXG5cdGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIG1lbnU6IE1lbnUsIEBPcHRpb25hbCgpIHRpZXJlZE1lbnU6IFRpZXJlZE1lbnUpXG5cdHtcbiAgICAgICAgdGhpcy5fbWVudSA9IG1lbnUgfHwgdGllcmVkTWVudTtcblx0fVxuXG5cdEBIb3N0TGlzdGVuZXIoXCJ3aW5kb3c6c2Nyb2xsXCIsIFtdKVxuXHRvbldpbmRvd1Njcm9sbCgpIHtcblx0XHR0aGlzLmNsb3NlTWVudSgpO1xuXHR9XG5cblx0cHJpdmF0ZSBjbG9zZU1lbnUoKTp2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX21lbnUgJiYgdHlwZW9mIHRoaXMuX21lbnUuaGlkZSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdGhpcy5fbWVudS5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IElucHV0VGV4dE1vZHVsZSwgTWVudU1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XG5pbXBvcnQgeyBTdGlja3lEYXRhdGFibGVIZWFkZXJEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvc3RpY2t5LWRhdGF0YWJsZS1oZWFkZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IERyb3Bkb3duQ2xvc2VPblNjcm9sbCB9IGZyb20gJy4vZGlyZWN0aXZlcy9kcm9wZG93bi1jbG9zZS1vbi1zY3JvbGwnO1xuaW1wb3J0IHsgTWVudUNsb3NlT25TY3JvbGwgfSBmcm9tICcuL2RpcmVjdGl2ZXMvbWVudS1jbG9zZS1vbi1zY3JvbGwnO1xuaW1wb3J0IHsgS2FsdHVyYUNvbW1vbk1vZHVsZSB9IGZyb20gJ0BrYWx0dXJhLW5nL2thbHR1cmEtY29tbW9uJztcblxuLyoqXG4gKiBAZGVwcmVjYXRlZCB1c2Ugc2VwYXJhdGVkIG1vZHVsZSBmb3IgZWFjaCBjb21wb25lbnRcbiAqL1xuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiA8YW55W10+W1xuICAgICAgICBDb21tb25Nb2R1bGUsIElucHV0VGV4dE1vZHVsZSwgTWVudU1vZHVsZSwgS2FsdHVyYUNvbW1vbk1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiA8YW55W10+W1xuXHQgICAgU3RpY2t5RGF0YXRhYmxlSGVhZGVyRGlyZWN0aXZlLFxuICAgICAgICBEcm9wZG93bkNsb3NlT25TY3JvbGwsXG4gICAgICAgIE1lbnVDbG9zZU9uU2Nyb2xsXG4gICAgXSxcbiAgICBleHBvcnRzOiA8YW55W10+W1xuXHQgICAgU3RpY2t5RGF0YXRhYmxlSGVhZGVyRGlyZWN0aXZlLFxuICAgICAgICBEcm9wZG93bkNsb3NlT25TY3JvbGwsXG4gICAgICAgIE1lbnVDbG9zZU9uU2Nyb2xsXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IDxhbnlbXT5bXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBLYWx0dXJhUHJpbWVOZ1VJTW9kdWxlIHt9XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEFmdGVyVmlld0luaXQsXG4gIGZvcndhcmRSZWYsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBBZnRlclZpZXdDaGVja2VkLFxuICBJbnB1dCxcbiAgRWxlbWVudFJlZixcbiAgT25EZXN0cm95LFxuICBSZW5kZXJlcjIsXG4gIEl0ZXJhYmxlRGlmZmVycyxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIFZpZXdDaGlsZCxcbiAgSG9zdExpc3RlbmVyLCBBZnRlckNvbnRlbnRJbml0LCBEb0NoZWNrXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHt0cmlnZ2VyLHN0YXRlLHN0eWxlLHRyYW5zaXRpb24sYW5pbWF0ZSxBbmltYXRpb25FdmVudH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IElTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBBdXRvQ29tcGxldGUgYXMgUHJpbWVBdXRvQ29tcGxldGUsIEFVVE9DT01QTEVURV9WQUxVRV9BQ0NFU1NPUiB9IGZyb20gXCJwcmltZW5nL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZVwiO1xuaW1wb3J0IHsgS2FsdHVyYUJyb3dzZXJVdGlscywgQnJvd3Nlck5hbWVzIH0gZnJvbSAnQGthbHR1cmEtbmcva2FsdHVyYS11aSc7XG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSBcInByaW1lbmcvY29tcG9uZW50cy9kb20vZG9taGFuZGxlclwiO1xuaW1wb3J0IHsgT2JqZWN0VXRpbHMgfSBmcm9tICdwcmltZW5nL2NvbXBvbmVudHMvdXRpbHMvb2JqZWN0dXRpbHMnO1xuaW1wb3J0IHtOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuLy8gW2ttY25nXSB1cG9uIHVwZ3JhZGU6IEJlIHBhdGllbnQgYW5kIGJyaW5nIGEgYmlnIGN1cCBvZiBjb2ZmZWUuLi4uIGdvb2QgbHVjayFcblxuZXhwb3J0IGludGVyZmFjZSBTdWdnZXN0aW9uc1Byb3ZpZGVyRGF0YXtcbiAgICBzdWdnZXN0aW9ucyA6IGFueVtdO1xuICAgIGlzTG9hZGluZyA6IGJvb2xlYW47XG4gICAgZXJyb3JNZXNzYWdlPyA6IHN0cmluZztcbn1cblxuLyogdHNsaW50OmRpc2FibGUgKi9cbmV4cG9ydCBjb25zdCBLQUxUVVJBX0FVVE9DT01QTEVURV9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEF1dG9Db21wbGV0ZSksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbi8qIHRzbGludDplbmFibGUgKi9cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdrQXV0b0NvbXBsZXRlJyxcblxuICAgIC8qIHRzbGludDpkaXNhYmxlICovXG4gICAgLy8gW2ttY25nXSB1cG9uIHVwZ3JhZGU6IHN5bmMgd2l0aCBvcmlnaW5hbCBjb21wb25lbnRcbiAgICBzdHlsZXM6IFtgOmhvc3QgL2RlZXAvIC51aS1hdXRvY29tcGxldGUtdG9rZW4tbGFiZWx7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2ZvbnQtc2l6ZToxNHB4fUBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6OTkxcHgpezpob3N0IC9kZWVwLyAudWktYXV0b2NvbXBsZXRlLXRva2VuLWxhYmVse21heC13aWR0aDoyNzBweH19QG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDo5OTJweCl7Omhvc3QgL2RlZXAvIC51aS1hdXRvY29tcGxldGUtdG9rZW4tbGFiZWx7bWF4LXdpZHRoOjI3MHB4fX1AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOjEyODBweCl7Omhvc3QgL2RlZXAvIC51aS1hdXRvY29tcGxldGUtdG9rZW4tbGFiZWx7bWF4LXdpZHRoOjUwMHB4fX1AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOjE2MDBweCl7Omhvc3QgL2RlZXAvIC51aS1hdXRvY29tcGxldGUtdG9rZW4tbGFiZWx7bWF4LXdpZHRoOjgwMHB4fX06aG9zdCAvZGVlcC8gLmtIaWdobGlnaHRlZFRleHR7dGV4dC1kZWNvcmF0aW9uOnVuZGVybGluZX1gXSxcbiAgICB0ZW1wbGF0ZTogYDxzcGFuIFtuZ0NsYXNzXT1cInsndWktYXV0b2NvbXBsZXRlIHVpLXdpZGdldCBrT3ZlcnJpZGVGQUljb25zJzp0cnVlLCd1aS1hdXRvY29tcGxldGUtZGQnOmRyb3Bkb3duLCd1aS1hdXRvY29tcGxldGUtbXVsdGlwbGUnOm11bHRpcGxlfVwiXG4gICAgICBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCI+XG4gICAgICAgICAgICA8aW5wdXQgKm5nSWY9XCIhbXVsdGlwbGVcIiAjaW4gW2F0dHIudHlwZV09XCJ0eXBlXCIgW2F0dHIuaWRdPVwiaW5wdXRJZFwiIFtuZ1N0eWxlXT1cImlucHV0U3R5bGVcIlxuICAgICAgICAgICAgICAgICAgIFtjbGFzc109XCJpbnB1dFN0eWxlQ2xhc3NcIiBhdXRvY29tcGxldGU9XCJvZmZcIiBbYXR0ci5yZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiJ3VpLWlucHV0dGV4dCB1aS13aWRnZXQgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsIHVpLWF1dG9jb21wbGV0ZS1pbnB1dCdcIlxuICAgICAgICAgICAgICAgICAgIFt2YWx1ZV09XCJpbnB1dEZpZWxkVmFsdWUgPyAoZmllbGQgPyBPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKGlucHV0RmllbGRWYWx1ZSwgZmllbGQpIHx8IGlucHV0RmllbGRWYWx1ZSA6IHZhbHVlKSA6IG51bGxcIlxuICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbklucHV0Q2xpY2soJGV2ZW50KVwiIChpbnB1dCk9XCJvbklucHV0KCRldmVudClcIiAoa2V5ZG93bik9XCJvbktleWRvd24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgKGtleXVwKT1cIm9uS2V5dXAoJGV2ZW50KVwiIChmb2N1cyk9XCJvbklucHV0Rm9jdXMoJGV2ZW50KVwiIChibHVyKT1cIm9uSW5wdXRCbHVyKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgIChjaGFuZ2UpPVwib25JbnB1dENoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICBbYXR0ci5wbGFjZWhvbGRlcl09XCJfcGxhY2Vob2xkZXJcIiBbYXR0ci5zaXplXT1cInNpemVcIiBbYXR0ci5tYXhsZW5ndGhdPVwibWF4bGVuZ3RoXCJcbiAgICAgICAgICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCJ0YWJpbmRleFwiIFtyZWFkb25seV09XCJyZWFkb25seVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICA+PHVsICpuZ0lmPVwibXVsdGlwbGVcIiAjbXVsdGlDb250YWluZXJcbiAgICAgICAgICAgICAgICAgY2xhc3M9XCJ1aS1hdXRvY29tcGxldGUtbXVsdGlwbGUtY29udGFpbmVyIHVpLXdpZGdldCB1aS1pbnB1dHRleHQgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsXCJcbiAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1kaXNhYmxlZCc6ZGlzYWJsZWQsJ3VpLXN0YXRlLWZvY3VzJzpmb2N1c31cIiAoY2xpY2spPVwibXVsdGlJbi5mb2N1cygpXCI+XG4gICAgICAgICAgICAgICAgPGxpICN0b2tlbiAqbmdGb3I9XCJsZXQgdmFsIG9mIHZhbHVlXCIgW2NsYXNzXT1cIid1aS1hdXRvY29tcGxldGUtdG9rZW4gdWktc3RhdGUtaGlnaGxpZ2h0IHVpLWNvcm5lci1hbGwgJyArIChjbGFzc0ZpZWxkICYmIHZhbCA/IHZhbFtjbGFzc0ZpZWxkXSA6ICcnKVwiXG4gICAgICAgICAgICAgICAgICAgIFtrVG9vbHRpcF09XCJ2YWxcIiBbdG9vbHRpcFJlc29sdmVyXT1cInRvb2x0aXBSZXNvbHZlclwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLWF1dG9jb21wbGV0ZS10b2tlbi1pY29uIHBpIHBpLWZ3IHBpLXRpbWVzXCIgKGNsaWNrKT1cInJlbW92ZUl0ZW0odG9rZW4pXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCIhZGlzYWJsZWRcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIXNlbGVjdGVkSXRlbVRlbXBsYXRlXCIgY2xhc3M9XCJ1aS1hdXRvY29tcGxldGUtdG9rZW4tbGFiZWxcIiAoY2xpY2spPVwib25JdGVtQ2xpY2sodmFsKVwiPnt7ZmllbGQgPyBPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKHZhbCwgZmllbGQpOiB2YWx9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInNlbGVjdGVkSXRlbVRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiB2YWx9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJ1aS1hdXRvY29tcGxldGUtaW5wdXQtdG9rZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0ICNtdWx0aUluIFthdHRyLnR5cGVdPVwidHlwZVwiIFthdHRyLmlkXT1cImlucHV0SWRcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIucGxhY2Vob2xkZXJdPVwiKHZhbHVlJiZ2YWx1ZS5sZW5ndGggPyBudWxsIDogX3BsYWNlaG9sZGVyKVwiIFthdHRyLnRhYmluZGV4XT1cInRhYmluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIChpbnB1dCk9XCJvbklucHV0KCRldmVudClcIiAoY2xpY2spPVwib25JbnB1dENsaWNrKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25LZXlkb3duKCRldmVudClcIiBbcmVhZG9ubHldPVwicmVhZG9ubHlcIiAoa2V5dXApPVwib25LZXl1cCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIChmb2N1cyk9XCJvbklucHV0Rm9jdXMoJGV2ZW50KVwiIChibHVyKT1cIm9uSW5wdXRCbHVyKCRldmVudClcIiAoY2hhbmdlKT1cIm9uSW5wdXRDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvY29tcGxldGU9XCJvZmZcIiBbbmdTdHlsZV09XCJpbnB1dFN0eWxlXCIgW2NsYXNzXT1cImlucHV0U3R5bGVDbGFzc1wiPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8L3VsXG4gICAgICAgICAgICA+PGkgKm5nSWY9XCJsb2FkaW5nXCIgY2xhc3M9XCJ1aS1hdXRvY29tcGxldGUtbG9hZGVyIHBpIHBpLXNwaW5uZXIgcGktc3BpblwiPjwvaT48YnV0dG9uICNkZEJ0biB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbj1cInBpIHBpLWZ3IHBpLWNhcmV0LWRvd25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwidWktYXV0b2NvbXBsZXRlLWRyb3Bkb3duXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJoYW5kbGVEcm9wZG93bkNsaWNrKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiZHJvcGRvd25cIj48L2J1dHRvbj5cbiAgICAgICAgICAgIDxkaXYgI3BhbmVsIGNsYXNzPVwidWktYXV0b2NvbXBsZXRlLXBhbmVsIHVpLXdpZGdldC1jb250ZW50IHVpLWNvcm5lci1hbGwgdWktc2hhZG93XCJcbiAgICAgICAgICAgICAgICAgW3N0eWxlLmRpc3BsYXldPVwib3ZlcmxheVZpc2libGUgPyAnYmxvY2snIDogJ25vbmUnXCIgW3N0eWxlLndpZHRoXT1cImFwcGVuZFRvID8gJ2F1dG8nIDogJzEwMCUnXCJcbiAgICAgICAgICAgICAgICAgW3N0eWxlLm1heC1oZWlnaHRdPVwic2Nyb2xsSGVpZ2h0XCIgW0BvdmVybGF5QW5pbWF0aW9uXT1cIid2aXNpYmxlJ1wiIChAb3ZlcmxheUFuaW1hdGlvbi5zdGFydCk9XCJvbk92ZXJsYXlBbmltYXRpb25TdGFydCgkZXZlbnQpXCIgKEBvdmVybGF5QW5pbWF0aW9uLmRvbmUpPVwib25PdmVybGF5QW5pbWF0aW9uRG9uZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgKG1vdXNlZW50ZXIpPVwib3ZlcmxheUhvdmVyZWQ9dHJ1ZVwiIChtb3VzZWxlYXZlKT1cIm92ZXJsYXlIb3ZlcmVkPWZhbHNlXCI+XG4gICAgICAgICAgICAgICAgPHVsXG4gICAgICAgICAgICAgICAgICBjbGFzcz1cInVpLWF1dG9jb21wbGV0ZS1pdGVtcyB1aS1hdXRvY29tcGxldGUtbGlzdCB1aS13aWRnZXQtY29udGVudCB1aS13aWRnZXQgdWktY29ybmVyLWFsbCB1aS1oZWxwZXItcmVzZXRcIlxuICAgICAgICAgICAgICAgICAgKm5nSWY9XCJvdmVybGF5VmlzaWJsZVwiPlxuICAgICAgICAgICAgICAgIDxsaSAqbmdJZj1cIl9sb2FkaW5nXCIgY2xhc3M9XCJ1aS1hdXRvY29tcGxldGUtbm90aWZpY2F0aW9uLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICBTZWFyY2hpbmcuLi5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8bGkgKm5nSWY9XCJfc2hvd05vSXRlbXNcIiBjbGFzcz1cInVpLWF1dG9jb21wbGV0ZS1ub3RpZmljYXRpb24taXRlbVwiPlxuICAgICAgICAgICAgICAgIE5vIEl0ZW1zIEZvdW5kLi4uXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPGxpICpuZ0lmPVwiX2Vycm9yTWVzc2FnZVwiIGNsYXNzPVwidWktYXV0b2NvbXBsZXRlLW5vdGlmaWNhdGlvbi1pdGVtXCI+XG4gICAgICAgICAgICAgICAge3sgX2Vycm9yTWVzc2FnZSB9fVxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBvcHRpb24gb2Ygc3VnZ2VzdGlvbnM7IGxldCBpZHggPSBpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLWF1dG9jb21wbGV0ZS1saXN0LWl0ZW0gdWktY29ybmVyLWFsbCc6dHJ1ZSwndWktc3RhdGUtaGlnaGxpZ2h0JzooaGlnaGxpZ2h0T3B0aW9uPT1vcHRpb24pfVwiXG4gICAgICAgICAgICAgICAgICAgIFtjbGFzcy5rSXNJdGVtRGlzYWJsZWRdPVwib3B0aW9uIHwga0lzU3VnZ2VzdGlvbkRpc2FibGVkIDogc3VnZ2VzdGlvblNlbGVjdGFibGVGaWVsZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAobW91c2VlbnRlcik9XCJoaWdobGlnaHRPcHRpb249b3B0aW9uXCIgKG1vdXNlbGVhdmUpPVwiaGlnaGxpZ2h0T3B0aW9uPW51bGxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdEl0ZW0ob3B0aW9uKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCIhaXRlbVRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpbm5lckhUTUxdPVwiX2dldFN1Z2dlc3Rpb25UZXh0KG9wdGlvbikgfCBrSGlnaGxpZ2h0IDogc2VhcmNoVGV4dFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpdGVtVGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IG9wdGlvbiwgaW5kZXg6IGlkeH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpICpuZ0lmPVwibm9SZXN1bHRzICYmIGVtcHR5TWVzc2FnZVwiIGNsYXNzPVwidWktYXV0b2NvbXBsZXRlLWxpc3QtaXRlbSB1aS1jb3JuZXItYWxsXCI+e3tlbXB0eU1lc3NhZ2V9fTwvbGk+XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3NwYW4+XG5gLFxuICAgIHByb3ZpZGVyczogW0tBTFRVUkFfQVVUT0NPTVBMRVRFX1ZBTFVFX0FDQ0VTU09SXSxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICB0cmlnZ2VyKCdvdmVybGF5QW5pbWF0aW9uJywgW1xuICAgICAgICBzdGF0ZSgndm9pZCcsIHN0eWxlKHtcbiAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDUlKScsXG4gICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICB9KSksXG4gICAgICAgIHN0YXRlKCd2aXNpYmxlJywgc3R5bGUoe1xuICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMCknLFxuICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgfSkpLFxuICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IHZpc2libGUnLCBhbmltYXRlKCcyMjVtcyBlYXNlLW91dCcpKSxcbiAgICAgICAgdHJhbnNpdGlvbigndmlzaWJsZSA9PiB2b2lkJywgYW5pbWF0ZSgnMTk1bXMgZWFzZS1pbicpKVxuICAgICAgXSlcbiAgICBdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy51aS1pbnB1dHdyYXBwZXItZmlsbGVkXSc6ICdmaWxsZWQnLFxuICAgICAgICAnW2NsYXNzLnVpLWlucHV0d3JhcHBlci1mb2N1c10nOiAnZm9jdXMnXG4gICAgfSxcbiAgICAvKiB0c2xpbnQ6ZW5hYmxlICovXG59KVxuLy8gW2ttY25nXSB1cG9uIHVwZ3JhZGU6IGNvbXBhcmUgaW1wbGVtZW50ZWQgaW50ZXJmYWNlcyBpbiB0aGUgb3JpZ2luYWwgY29tcG9uZW50IChubyBuZWVkIHRvIGluY2x1ZGUgQ29udHJvbFZhbHVlQWNjZXNzb3IpXG5leHBvcnQgY2xhc3MgQXV0b0NvbXBsZXRlIGV4dGVuZHMgUHJpbWVBdXRvQ29tcGxldGUgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIEFmdGVyVmlld0NoZWNrZWQsIEFmdGVyQ29udGVudEluaXQsRG9DaGVjayAge1xuICAgIHByaXZhdGUgX3N1Z2dlc3Rpb25zUHJvdmlkZXIkIDogSVN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgcHVibGljIF9sb2FkaW5nID0gZmFsc2U7XG4gICAgcHVibGljIF9zaG93Tm9JdGVtcyA9IGZhbHNlO1xuICAgIHB1YmxpYyBfZXJyb3JNZXNzYWdlID0gJyc7XG4gICAgcHJpdmF0ZSBfYWxsb3dNdWx0aXBsZSA9IGZhbHNlO1xuICAgIHB1YmxpYyBfcGxhY2Vob2xkZXIgPSAnJztcbiAgICBwdWJsaWMgT2JqZWN0VXRpbHMgPSBPYmplY3RVdGlscztcbiAgICBwdWJsaWMgb3ZlcmxheUhvdmVyZWQgPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgb25JdGVtQWRkaW5nIDogKHZhbHVlIDogYW55KSA9PiBhbnk7XG5cbiAgICBASW5wdXQoKVxuICAgIGxpbWl0VG9TdWdnZXN0aW9ucyA6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KClcbiAgICBzdWdnZXN0aW9uU2VsZWN0YWJsZUZpZWxkIDogc3RyaW5nID0gJyc7XG5cbiAgICBASW5wdXQoKVxuICAgIHN1Z2dlc3Rpb25JdGVtRmllbGQgOiBzdHJpbmcgPSAnJztcblxuICAgIEBJbnB1dCgpIHRvb2x0aXBSZXNvbHZlcjogc3RyaW5nIHwgKCh2YWw6IGFueSkgPT4gc3RyaW5nKSA9IG51bGw7XG5cbiAgICBASW5wdXQoKVxuICAgIGNsYXNzRmllbGQ6IHN0cmluZyA9IG51bGw7XG5cbiAgICBASW5wdXQoKVxuICAgIHN1Z2dlc3Rpb25MYWJlbEZpZWxkIDogc3RyaW5nID0gJyc7XG5cbiAgICBASW5wdXQoKVxuICAgIGFkZE9uUGFzdGUgPSB0cnVlO1xuXG4gICAgZ2V0IG11bHRpcGxlKCkgOiBib29sZWFuXG4gICAge1xuICAgICAgICAvLyBhbHdheXMgcmV0dXJuIHRydWUgdG8gYWZmZWN0IGNvbXBvbmVudCB1aSBvZiBzZWxlY3RlZCBpdGVtLlxuICAgICAgICAvLyBpbnRlcm5hbGx5IHlvdSBzaG91bGQgdXNlIF9hbGxvd011bHRpcGxlXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCBzdWdnZXN0aW9ucygpOiBhbnlbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdWdnZXN0aW9ucztcbiAgICB9XG5cbiAgICBAT3V0cHV0KClcbiAgICBpdGVtQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIEBWaWV3Q2hpbGQoJ3BhbmVsJykgcGFuZWxFTDogRWxlbWVudFJlZjtcblxuICAgIEBIb3N0TGlzdGVuZXIoJ3Bhc3RlJywgWyckZXZlbnQnXSkgb25QYXN0ZShldmVudDogQ2xpcGJvYXJkRXZlbnQpIHtcbiAgICAgIGlmICghdGhpcy5hZGRPblBhc3RlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29udGVudCA9IGV2ZW50LmNsaXBib2FyZERhdGEuZ2V0RGF0YSgndGV4dC9wbGFpbicpO1xuXG4gICAgICBpZiAoY29udGVudCAmJiBjb250ZW50LmluZGV4T2YoJywnKSAhPT0gLTEpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29udGVudC5zcGxpdCgnLCcpXG4gICAgICAgICAgLm1hcChpdGVtID0+IGl0ZW0udHJpbSgpKVxuICAgICAgICAgIC5mb3JFYWNoKHRhZyA9PiB0aGlzLl9hZGRWYWx1ZUZyb21JbnB1dCh0YWcpKTtcblxuICAgICAgICBpZiAoIXRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAvLyBwcmltbmcgZml4OiBpZiB0aGUgcGFuZWwgaXMgbm90IHZpc2libGUgKCFvdmVybGF5VmlzaWJsZSkgYW5kIHdlIGN1cnJlbnRseSBsZWF2aW5nIHRoZSBpbnB1dCBmaWVsZCBjbGVhciBpbnB1dCBjb250ZW50XG4gICAgICAgICAgdGhpcy5fY2xlYXJJbnB1dFZhbHVlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XG4gICAgICB9XG4gICAgfVxuXG5cbiAgICBzZXQgc3VnZ2VzdGlvbnModmFsOmFueVtdKSB7XG4gICAgICAgIHRoaXMuX3N1Z2dlc3Rpb25zID0gdmFsO1xuXG4gICAgICAgIGlmKHRoaXMucGFuZWxFTCAmJiB0aGlzLnBhbmVsRUwubmF0aXZlRWxlbWVudCkge1xuXG4gICAgICAgICAgICAvLyBwcmltZW5nIGZpeDogcHJpbWVuZyB1c2VzIGZ1bmN0aW9uIHRvIHNob3cgJ25vUmVzdWx0cycgbWVzc2FnZSBpZiBleGlzdHMgb3IgaGlkZSB0aGUgc3VnZ2VzdGVkIG90aGVyd2lzZS5cbiAgICAgICAgICAgIC8vIHdlIHJlbW92ZWQgdGhpcyBsb2dpYyBzaW5jZSBpdCBjb25mbGljdCB3aXRoIG91ciBpbXByb3ZlZCBsb2dpY1xuICAgICAgICAgICAgaWYodGhpcy5fc3VnZ2VzdGlvbnMgJiYgdGhpcy5fc3VnZ2VzdGlvbnMubGVuZ3RoKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN1Z2dlc3Rpb25zVXBkYXRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICBpZih0aGlzLmF1dG9IaWdobGlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRPcHRpb24gPSB0aGlzLl9zdWdnZXN0aW9uc1swXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoKSBzZXQgcGxhY2Vob2xkZXIodmFsdWUgOiBzdHJpbmcpXG4gICAge1xuICAgICAgICAvLyBJRTExIGJ1ZyBjYXVzaW5nIG91dHB1dCBldmVudCB0byBmaXJlIHVwb24gaW5wdXQgZmllbGQgYmx1ciBldmVudCB3aGVuIHRoZXJlIGlzIGEgcGxhY2Vob2xkZXIuIFRodXMsIHdlIHJlbW92ZSB0aGUgcGxhY2Vob2xkZXIgYXR0cmlidXRlIGZvciBJRTExLCBzaW5nbGUgc2VsZWN0aW9uIG1vZGUuXG4gICAgICAgIC8vIEFkZGl0aW9uYWwgZGV0YWlsczogaHR0cHM6Ly9jb25uZWN0Lm1pY3Jvc29mdC5jb20vSUUvZmVlZGJhY2svZGV0YWlscy84MTA1MzgvaWUtMTEtZmlyZXMtaW5wdXQtZXZlbnQtb24tZm9jdXNcbiAgICAgICAgY29uc3QgaXNJRTExID0gS2FsdHVyYUJyb3dzZXJVdGlscy5kZXRlY3RCcm93c2VyKCkgPT09IEJyb3dzZXJOYW1lcy5JRTExO1xuICAgICAgICB0aGlzLl9wbGFjZWhvbGRlciA9IGlzSUUxMSAmJiAhdGhpcy5fYWxsb3dNdWx0aXBsZSA/ICcnIDogdmFsdWU7XG4gICAgfVxuICAgIGdldCBwbGFjZWhvbGRlcigpOiBzdHJpbmd7XG4gICAgICAgIHJldHVybiB0aGlzLl9wbGFjZWhvbGRlcjtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBzZXQgbXVsdGlwbGUodmFsdWUgOiBib29sZWFuKVxuICAgIHtcbiAgICAgICAgdGhpcy5fYWxsb3dNdWx0aXBsZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHN1Z2dlc3Rpb25zUHJvdmlkZXIocHJvdmlkZXIkIDogT2JzZXJ2YWJsZTxTdWdnZXN0aW9uc1Byb3ZpZGVyRGF0YT4pXG4gICAge1xuICAgICAgICBpZiAodGhpcy5fc3VnZ2VzdGlvbnNQcm92aWRlciQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX3N1Z2dlc3Rpb25zUHJvdmlkZXIkLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLl9zdWdnZXN0aW9uc1Byb3ZpZGVyJCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvdmlkZXIkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9zdWdnZXN0aW9uc1Byb3ZpZGVyJCA9IHByb3ZpZGVyJC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgZGF0YSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWVMZW5ndGhWYWxpZCA9IHRoaXMuaW5wdXQgJiYgKHRoaXMuaW5wdXQudmFsdWUgfHwgJycpLnRyaW0oKS5sZW5ndGggPj0gdGhpcy5taW5MZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdmFsdWVMZW5ndGhWYWxpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHJpbWVuZyBmaXg6IGlmIHVzZXIgdXNlIGJhY2tzcGFjZSB0byBkZWxldGUgc2VhcmNoIHRleHQsIHNob3VsZCBhYm9ydCB0aGUgbGFzdCBxdWVyeS5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmlzTG9hZGluZylcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaG93Tm9JdGVtcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWdnZXN0aW9ucyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXJyb3JNZXNzYWdlID0gJyc7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3VnZ2VzdGlvbnNVcGRhdGVkID0gdHJ1ZTsgLy8gbWFrZSBzdXJlIHRoZSBzdWdnZXN0aW9ucyBwYW5lbCBpcyBhbGlnbmVkIHRvIHRoZSBoZWlnaHQgb2YgdGhlIGNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnN1Z2dlc3Rpb25zICYmIGRhdGEuc3VnZ2VzdGlvbnMubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN1Z2dlc3Rpb25zID0gZGF0YS5zdWdnZXN0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWdnZXN0aW9ucyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xvYWRpbmcgPSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dOb0l0ZW1zID0gIWRhdGEuZXJyb3JNZXNzYWdlOyAvLyBzaG93IG5vIGl0ZW1zIG5vdGlmaWNhdGlvbiBvbmx5IGlmIHJlc3VsdCBpcyB2YWxpZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3VnZ2VzdGlvbnNVcGRhdGVkID0gdHJ1ZTsgLy8gbWFrZSBzdXJlIHRoZSBzdWdnZXN0aW9ucyBwYW5lbCBpcyBhbGlnbmVkIHRvIHRoZSBoZWlnaHQgb2YgdGhlIGNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5lcnJvck1lc3NhZ2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9lcnJvck1lc3NhZ2UgPSBkYXRhLmVycm9yTWVzc2FnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWdnZXN0aW9uc1VwZGF0ZWQgPSB0cnVlOyAvLyBtYWtlIHN1cmUgdGhlIHN1Z2dlc3Rpb25zIHBhbmVsIGlzIGFsaWduZWQgdG8gdGhlIGhlaWdodCBvZiB0aGUgY29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgIHB1YmxpYyBnZXRWYWx1ZSgpIDogYW55IHtcbiAgICAgICAgIGlmICh0aGlzLl9hbGxvd011bHRpcGxlKSB7XG4gICAgICAgICAgICAgaWYgKHRoaXMudmFsdWUgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZSA/IFt0aGlzLnZhbHVlXSA6IFtdO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgaWYgKHRoaXMudmFsdWUgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZS5sZW5ndGggPiAwID8gdGhpcy52YWx1ZVswXSA6IG51bGw7XG4gICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgfVxuICAgICB9XG5cbiAgICAgcHVibGljIGNsZWFyVmFsdWUoKSA6IHZvaWR7XG4gICAgICAgIHRoaXMudmFsdWUgPSBudWxsO1xuICAgICAgICB0aGlzLl9jbGVhcklucHV0VmFsdWUoKVxuICAgICB9XG5cbiAgICAgcHVibGljIGdldCBzZWFyY2hUZXh0KCkgOiBzdHJpbmdcbiAgICAge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnB1dCA/IHRoaXMuaW5wdXQudmFsdWUgOiBudWxsO1xuICAgICB9XG5cbiAgICAgcHJpdmF0ZSBnZXQgaW5wdXQoKSA6IEhUTUxJbnB1dEVsZW1lbnRcbiAgICAge1xuICAgICAgICAgLy8gW2ttY25nXSB3ZSBvdmVycmlkZSBtdWx0aSBtb2RlIHRvIGFsd2F5cyBiZSBtdWx0aXBsZSBzbyB0aGUgaW5wdXQgc2hvdWxkIGFsd2F5cyBodXNlIHRoZSBtdWx0aUlucHV0RWxcbiAgICAgICAgIHJldHVybiB0aGlzLm11bHRpSW5wdXRFTC5uYXRpdmVFbGVtZW50O1xuICAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBpdGVtXG4gICAgICogcmV0dXJucyB7YW55fGJvb2xlYW59XG4gICAgICogcHJpdmF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgX2lzSXRlbVNlbGVjdGVkKGl0ZW0gOiBhbnkpIDogYm9vbGVhblxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlICYmIHRoaXMudmFsdWUgaW5zdGFuY2VvZiBBcnJheSAmJiB0aGlzLnZhbHVlLmluZGV4T2YoaXRlbSkgIT09IC0xO1xuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZSAmJiB0aGlzLnZhbHVlID09PSBpdGVtO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYWRkIHZhbHVlIHByb3ZpZGVkIGJ5IHVzZXIgaWYgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBjb25maXJtZWQ6XG4gICAgICogLSBpbnB1dCBjb21wb25lbnQgaXMgaW4gZm9jdXMgYW5kIGl0cycgY29udGVudCBsZW5ndGggaXMgdmFsaWQuXG4gICAgICogLSBubyBzdWdnZXN0aW9uIGlzIGN1cnJlbnRseSBoaWdobGlnaHRlZFxuICAgICAqIHJldHVybnMgeyB7c3RhdHVzfSB9IHN0YXR1cyAnYWRkZWQnIGlmIHZhbGlkIHZhbHVlLCAnaW52YWxpZCcgaWYgY2Fubm90IGFkZCB0aGUgdmFsdWUgb3IgJ25vdCByZWxldmFudCcgaWYgdGhlIHJlcXVlc3Qgc2hvdWxkIGJlIGlnbm9yZWRcbiAgICAgKiBwcml2YXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSBfYWRkVmFsdWVGcm9tSW5wdXQodmFsdWUgPSBudWxsKSA6IHsgc3RhdHVzIDogJ2FkZGVkJyB8ICdpbnZhbGlkJyB8ICdub3QgcmVsZXZhbnQnIHwgJ2R1cGxpY2F0ZWQnfVxuICAgIHtcbiAgICAgICAgY29uc3QgcmF3SW5wdXRWYWx1ZSA9ICh2YWx1ZSB8fCB0aGlzLnNlYXJjaFRleHQgfHwgJycpLnRyaW0oKTtcblxuICAgICAgICAvLyAxLiBpZiAhYHRoaXMudmFsdWVgIC0+IGZvcm0gaXMgdmFsaWQgKGFzc3VtaW5nIHRoYXQgd2UgYWRkIHZhbHVlIGZvciB0aGUgZmlyc3QgdGltZSlcbiAgICAgICAgLy8gMi4gaWYgZWFjaCB2YWx1ZSBpcyBzdHJpbmcgYW5kIHRoZXJlJ3Mgbm8gc2FtZSB2YWx1ZSBpbiB0aGUgYHRoaXMudmFsdWVgIGFycmF5IC0+IGZvcm0gaXMgdmFsaWRcbiAgICAgICAgY29uc3QgaXNEdXBsaWNhdGVkID0gdGhpcy52YWx1ZSAmJiB0aGlzLnZhbHVlLnNvbWUodmFsdWUgPT4ge1xuICAgICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlLnRvTG93ZXJDYXNlKCkgPT09IHJhd0lucHV0VmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGlzRHVwbGljYXRlZCkge1xuICAgICAgICAgIHJldHVybiB7IHN0YXR1cyA6ICdkdXBsaWNhdGVkJ307XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMubGltaXRUb1N1Z2dlc3Rpb25zICYmIHJhd0lucHV0VmFsdWUgJiYgIXRoaXMuaGlnaGxpZ2h0T3B0aW9uICYmICF0aGlzLm92ZXJsYXlIb3ZlcmVkICYmIHRoaXMuZm9jdXMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICggcmF3SW5wdXRWYWx1ZS5sZW5ndGggPj0gMSAmJiAhdGhpcy5faXNJdGVtU2VsZWN0ZWQocmF3SW5wdXRWYWx1ZSkpIHtcblxuICAgICAgICAgICAgICAgIGxldCBuZXdWYWx1ZSA9IHRoaXMub25JdGVtQWRkaW5nID8gdGhpcy5vbkl0ZW1BZGRpbmcuY2FsbChudWxsLHJhd0lucHV0VmFsdWUpIDogcmF3SW5wdXRWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGlmIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG5ld1ZhbHVlID09PSAnc3RyaW5nJyAmJiB0aGlzLmZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFRoZSBhdXRvLWNvbXBsZXRlIGNvbXBvbmVudCAnZmllbGQnIGF0dHJpYnV0ZSBpcyBzZXQgdG8gdmFsdWUgJyR7dGhpcy5maWVsZH0nIHdoaWNoIGluZGljYXRlcyB0aGF0IHRoZSBhdXRvLWNvbXBsZXRlIHZhbHVlIHR5cGUgaXMgYW4gb2JqZWN0IChkaWQgeW91IGZvcmdldCB0byBhc3NpZ24gdGhlICdvbkl0ZW1BZGRpbmcnIGF0dHJpYnV0ZSB0byBjb252ZXJ0IHRoZSB1c2VyIGlucHV0IHdoaWNoIGlzIG9mIHR5cGUgdHlwZSAnc3RyaW5nJyB0byBhIHZhbGlkIHZhbHVlPylgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHN1cGVyLnNlbGVjdEl0ZW0obmV3VmFsdWUpO1xuICAgICAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXdWYWx1ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmV3VmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgdGhlIGZ1bmN0aW9uIHByb3ZpZGVkIGJ5IGF0dHJpYnV0ZSAnb25JdGVtQWRkaW5nJyByZXN1bHRlZCB3aXRoIG51bGwgdmFsdWUsIGFib3J0IGFkZGluZyB1c2VyIGlucHV0IHRvIGF1dC1jb21wbGV0ZSB2YWx1ZWApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4geyBzdGF0dXMgOiAnYWRkZWQnfTtcbiAgICAgICAgICAgIH1lbHNlXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgc3RhdHVzIDogJ2ludmFsaWQnfTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB7IHN0YXR1cyA6ICdub3QgcmVsZXZhbnQnfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSW5wdXRCbHVyKGV2ZW50KSB7XG5cbiAgICAgICAgdGhpcy5fYWRkVmFsdWVGcm9tSW5wdXQoKTtcblxuICAgICAgICBpZiAoIXRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgIC8vIHByaW1uZyBmaXg6IGlmIHRoZSBwYW5lbCBpcyBub3QgdmlzaWJsZSAoIW92ZXJsYXlWaXNpYmxlKSBhbmQgd2UgY3VycmVudGx5IGxlYXZpbmcgdGhlIGlucHV0IGZpZWxkIGNsZWFyIGlucHV0IGNvbnRlbnRcbiAgICAgICAgICAgIHRoaXMuX2NsZWFySW5wdXRWYWx1ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyLm9uSW5wdXRCbHVyKGV2ZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb25zdW1lIHRoZSBhcmd1bWVudHMgbmVlZGVkIHRvIGNvbnN0cnVjdCAnQXV0b0NvbXBsZXRlJyBhbmQgcGFzcyB0aGVtIHRvIHNlbGYgKHRoZSAnQXV0b0NvbXBsZXRlJyBjb25zdHJ1Y3RvcikuXG4gICAgICpcbiAgICAgKiBUaGlzIGlzIGEgd29ya2Fyb3VuZCBzaW5jZSBhY2NvcmRpbmcgdG8gTkcyIGRvY3VtZW50YXRpb24gdGhlIHBhcmVudCBjb25zdHJ1Y3RvciBzaG91bGQgYmUgY2FsbGVkIGV2ZW4gaWZcbiAgICAgKiB0aGlzIGNvbXBvbmVudCBkb2Vzbid0IG5lZWQgYSBjb25zdHJ1Y3Rvci5cbiAgICAgKiBAcGFyYW0gZWxcbiAgICAgKiBAcGFyYW0gZGlmZmVyc1xuICAgICAqIEBwYXJhbSByZW5kZXJlclxuICAgICAqIEBwYXJhbSBjZFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHB1YmxpYyBkaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMpXG4gICAge1xuICAgICAgICBzdXBlcihlbCwgcmVuZGVyZXIsIGNkLCBkaWZmZXJzKTtcbiAgICB9XG5cblxuICAgIGhpZGUoKVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheVZpc2libGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMucGFuZWxFTC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IDA7IC8vIHByaW1lbmcgZml4OiBzY3JvbGwgc3VnZ2VzdGlvbnMgbGlzdCB0byB0b3AgKG90aGVyd2lzZSB0aGUgc2Nyb2xsIHdpbGwgYmUgcGVyc2lzdClcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0T3B0aW9uID0gbnVsbDsgLy8gcHJpbWVuZyBmaXg6IHRoZSBsYXN0IHNlbGVjdGlvbiB1c2luZyBrZXlib2FyZCBpcyBub3QgYmVpbmcgY2xlYXJlZCB3aGVuIHNlbGVjdGluZyB1c2luZyAnZW50ZXInXG5cbiAgICAgICAgICAgIC8vIGNsZWFyIHVzZXIgbm90aWZpY2F0aW9uc1xuICAgICAgICAgICAgdGhpcy5fbG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fc2hvd05vSXRlbXMgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX2Vycm9yTWVzc2FnZSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuZm9jdXMpIHtcbiAgICAgICAgICAgIC8vIHByaW1uZyBmaXg6IGlmIHVzZXIgbm90IGluIHRoZSBpbnB1dCAoIWZvY3VzKSBhbmQgd2UgY3VycmVudGx5IGNsb3NpbmcgdGhlIHZpc2libGUgcGFuZWwgLSBjbGVhciBpbnB1dCBjb250ZW50IChyZWxldmFudCBvbmx5IGZvciBjb21wb25lbnRzIHdob3NlICdsaW1pdFRvU3VnZ2VzdGlvbnMnIHByb3BlcnR5IGlzIHNldCB0byB0cnVlXG4gICAgICAgICAgICB0aGlzLl9jbGVhcklucHV0VmFsdWUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN1cGVyLmhpZGUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jbGVhcklucHV0VmFsdWUoKSA6IHZvaWR7XG4gICAgICAgIGlmICh0aGlzLmlucHV0ICYmIHRoaXMuaW5wdXQudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQudmFsdWUgPSAnJzsgLy8gY2xlYXIgZXhpc3RpbmcgdmFsdWVcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvbklucHV0KCRldmVudCkgOiB2b2lke1xuICAgICAgICBpZiAoIXRoaXMuX2FsbG93TXVsdGlwbGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcHJpbW5nIGZpeDogaGlkZSBwYW5lbCBvbmNlIHRoZSB2YWx1ZSBsZW5ndGggaXMgbGVzcyB0aGUgbWluTGVuZ3RoLCBwcmltZW5nIGhhbmRsZXMgb25seSBzaXR1YXRpb24gd2hlcmUgaW5wdXQgdmFsdWUgbGVuZ3RoID09IDBcbiAgICAgICAgaWYodGhpcy5pbnB1dC52YWx1ZS5sZW5ndGggPCB0aGlzLm1pbkxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBzdXBlci5vbklucHV0KCRldmVudCk7XG4gICAgfVxuXG4gICAgb25LZXlkb3duKGV2ZW50KSAge1xuICAgICAgICBsZXQgcHJldmVudEtleWRvd24gPSBmYWxzZTtcblxuICAgICAgICBpZiAoKGV2ZW50LndoaWNoID09PSA5IHx8IGV2ZW50LndoaWNoID09PSAxMyB8fCBldmVudC5rZXkgPT09ICcsJykgKVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zdCBzdGF0dXMgPSB0aGlzLl9hZGRWYWx1ZUZyb21JbnB1dCgpLnN0YXR1cztcblxuICAgICAgICAgICAgaWYgKHN0YXR1cyAhPT0gJ25vdCByZWxldmFudCcpIHtcbiAgICAgICAgICAgICAgICBwcmV2ZW50S2V5ZG93biA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnZHVwbGljYXRlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NsZWFySW5wdXRWYWx1ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFwcmV2ZW50S2V5ZG93biAmJiB0aGlzLm92ZXJsYXlWaXNpYmxlKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG4gICAgICAgICAgICAgICAgY2FzZSA5OiAgLy90YWJcbiAgICAgICAgICAgICAgICAgICAgLy8gcHJpbWVuZyBmaXg6IHByZXNzaW5nICd0YWInIG1vdmUgdGhlIGZvY3VzIGZyb20gdGhlIGNvbXBvbmVudCBidXQgZG9lc24ndCBoaWRlIHRoZSBzdWdnZXN0aW9ucy5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxMzogLy9lbnRlclxuICAgICAgICAgICAgICAgICAgICAvLyBwcmV2ZW50IHNlbGVjdGluZyBvZiBkaXNhYmxlZCBpdGVtIHVzaW5nIGtleWJvYXJkICh0aGUgbW91c2Ugc2VsZWN0aW9uIGlzIGhhbmRsZWQgc2VwYXJhdGVseSlcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGlnaGxpZ2h0SXRlbURpc2FibGVkID0gdGhpcy5oaWdobGlnaHRPcHRpb24gJiYgdGhpcy5zdWdnZXN0aW9uU2VsZWN0YWJsZUZpZWxkID9cbiAgICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YgdGhpcy5oaWdobGlnaHRPcHRpb25bdGhpcy5zdWdnZXN0aW9uU2VsZWN0YWJsZUZpZWxkXSAhPT0gdW5kZWZpbmVkICYmICF0aGlzLmhpZ2hsaWdodE9wdGlvblt0aGlzLnN1Z2dlc3Rpb25TZWxlY3RhYmxlRmllbGRdKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaGlnaGxpZ2h0SXRlbURpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2ZW50S2V5ZG93biA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXByZXZlbnRLZXlkb3duKVxuICAgICAgICB7XG4gICAgICAgICAgICBzdXBlci5vbktleWRvd24oZXZlbnQpO1xuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG4gICAgbmdPbkRlc3Ryb3koKVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuX3N1Z2dlc3Rpb25zUHJvdmlkZXIkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9zdWdnZXN0aW9uc1Byb3ZpZGVyJC51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5fc3VnZ2VzdGlvbnNQcm92aWRlciQgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Vc2VyU2VsZWN0SXRlbShldmVudCA6IGFueSwgaXRlbSA6IGFueSkgOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLl9jYW5TZWxlY3RTdWdnZXN0aW9uKGl0ZW0pKSB7XG4gICAgICAgICAgICAvLyBwcmV2ZW50IHNlbGVjdGlvbiBvZiBkaXNhYmxlZCBzdWdnZXN0aW9ucy5cbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQuZm9jdXMoKTsgLy8gbW92ZSB0aGUgZm9jdXMgYmFjayB0byB0aGUgaW5wdXQgYm94IG90aGVyd2lzZSB0aGUgY29tcG1vbmVudCB3aWxsIHN0b3Agd29ya2luZ1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZWxlY3RJdGVtKGl0ZW0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBfZ2V0U3VnZ2VzdGlvblRleHQoc3VnZ2VzdGlvbjogYW55KVxuICAgIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHN1Z2dlc3Rpb247XG4gICAgICAgIGlmIChzdWdnZXN0aW9uKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdWdnZXN0aW9uTGFiZWxGaWVsZClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBzdWdnZXN0aW9uW3RoaXMuc3VnZ2VzdGlvbkxhYmVsRmllbGRdO1xuICAgICAgICAgICAgfWVsc2UgaWYgKHRoaXMuc3VnZ2VzdGlvbkl0ZW1GaWVsZCAmJiB0aGlzLmZpZWxkKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHN1Z2dlc3Rpb25bdGhpcy5zdWdnZXN0aW9uSXRlbUZpZWxkXTtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQgPyByZXN1bHRbdGhpcy5maWVsZF0gOiAnJztcbiAgICAgICAgICAgIH1lbHNlIGlmICh0aGlzLnN1Z2dlc3Rpb25JdGVtRmllbGQpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gc3VnZ2VzdGlvblt0aGlzLnN1Z2dlc3Rpb25JdGVtRmllbGRdO1xuICAgICAgICAgICAgfWVsc2UgaWYgKHRoaXMuZmllbGQpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gc3VnZ2VzdGlvblt0aGlzLmZpZWxkXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY2FuU2VsZWN0U3VnZ2VzdGlvbihpdGVtIDogYW55KSA6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5zdWdnZXN0aW9uU2VsZWN0YWJsZUZpZWxkKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW1bdGhpcy5zdWdnZXN0aW9uU2VsZWN0YWJsZUZpZWxkXSAhPT0gdW5kZWZpbmVkICYmICFpdGVtW3RoaXMuc3VnZ2VzdGlvblNlbGVjdGFibGVGaWVsZF0pXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgc2VsZWN0SXRlbShpdGVtIDogYW55KSB7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0T3B0aW9uID0gbnVsbDsgLy8gcHJpbWVuZyBmaXg6ICB0aGUgbGFzdCBzZWxlY3RlZCBpdGVtIHdoZW4gdXNpbmcga2V5Ym9hcmQgaXMgbm90IGJlaW5nIHJlbW92ZWQgYW5kIHdpbGwgYmUgdXNlZCBsYXRlciB0byBkbyBhIHJhbmRvbSBzZWxlY3Rpb25cblxuICAgICAgICBpZiAodGhpcy5fY2FuU2VsZWN0U3VnZ2VzdGlvbihpdGVtKSkge1xuXG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtVmFsdWUgPSBpdGVtO1xuICAgICAgICAgICAgaWYgKHRoaXMuc3VnZ2VzdGlvbkl0ZW1GaWVsZClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEl0ZW1WYWx1ZSA9IGl0ZW1bdGhpcy5zdWdnZXN0aW9uSXRlbUZpZWxkXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkSXRlbVZhbHVlID09PSBudWxsIHx8IHR5cGVvZiBzZWxlY3RlZEl0ZW1WYWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJba2FsdHVyYV0gLT4gdHJ5aW5nIHRvIHNlbGVjdCBhIHZhbHVlIHRoYXQgaXMgZWl0aGVyIG51bGwgb3IgdW5kZWZpbmVkLiBhY3Rpb24gaWdub3JlZFwiKTsgLy8ga2VlcCB3YXJuaW5nXG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgc3VwZXIuc2VsZWN0SXRlbShzZWxlY3RlZEl0ZW1WYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZm9jdXNJbnB1dCgpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaW5wdXQgJiYgdGhpcy5pbnB1dC5mb2N1cyAmJiAhdGhpcy5pbnB1dC5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlucHV0LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICB9LCAwKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25JdGVtQ2xpY2soaXRlbTogYW55KXtcbiAgICAgICAgdGhpcy5pdGVtQ2xpY2suZW1pdChpdGVtKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmNvbnN0IGVzY2FwZSA9IHMgPT4gcy5yZXBsYWNlKC9bLVxcL1xcXFxeJCorPy4oKXxbXFxde31dL2csICdcXFxcJCYnKTtcblxuQFBpcGUoe1xuICAgIG5hbWU6ICdrSGlnaGxpZ2h0J1xufSlcbmV4cG9ydCBjbGFzcyBIaWdobGlnaHRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgdHJhbnNmb3JtKHZhbHVlOiBzdHJpbmcsIGFyZzogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKCFhcmcudHJpbSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKGAoJHtlc2NhcGUoYXJnKX0pYCwgJ2knKTtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKHJlZ2V4LCAnPHNwYW4gY2xhc3M9XCJrSGlnaGxpZ2h0ZWRUZXh0XCI+JDE8L3NwYW4+Jyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoe1xuICAgIG5hbWU6ICdrSXNTdWdnZXN0aW9uRGlzYWJsZWQnXG59KVxuZXhwb3J0IGNsYXNzIElzU3VnZ2VzdGlvbkRpc2FibGVkUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBhcmc6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIChhcmcgJiYgdHlwZW9mIHZhbHVlW2FyZ10gPT09ICdib29sZWFuJyAmJiB2YWx1ZVthcmddID09PSBmYWxzZSk7XG4gICAgfVxufVxuXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFRvb2x0aXBNb2R1bGUgfSBmcm9tICdAa2FsdHVyYS1uZy9rYWx0dXJhLXVpJztcbmltcG9ydCB7IElucHV0VGV4dE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvY29tcG9uZW50cy9pbnB1dHRleHQvaW5wdXR0ZXh0JztcbmltcG9ydCB7IEJ1dHRvbk1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvY29tcG9uZW50cy9idXR0b24vYnV0dG9uJztcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvY29tcG9uZW50cy9jb21tb24vc2hhcmVkJztcbmltcG9ydCB7IEF1dG9Db21wbGV0ZSB9IGZyb20gXCIuL2F1dG8tY29tcGxldGUuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBIaWdobGlnaHRQaXBlIH0gZnJvbSBcIi4vaGlnaGxpZ2h0LnBpcGVcIjtcbmltcG9ydCB7IElzU3VnZ2VzdGlvbkRpc2FibGVkUGlwZSB9IGZyb20gXCIuL2lzLXN1Z2dlc3Rpb24tZGlzYWJsZWQucGlwZVwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIElucHV0VGV4dE1vZHVsZSwgQnV0dG9uTW9kdWxlLCBTaGFyZWRNb2R1bGUsIFRvb2x0aXBNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW0F1dG9Db21wbGV0ZSwgSGlnaGxpZ2h0UGlwZSwgSXNTdWdnZXN0aW9uRGlzYWJsZWRQaXBlXSxcbiAgICBleHBvcnRzOiBbQXV0b0NvbXBsZXRlLCBIaWdobGlnaHRQaXBlXSxcblxufSlcbmV4cG9ydCBjbGFzcyBBdXRvQ29tcGxldGVNb2R1bGUge1xufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIGZvcndhcmRSZWYsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERvbUhhbmRsZXIgfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xuXG5leHBvcnQgY29uc3QgQ0xFQVJBQkxFX0lOUFVUX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBDbGVhcmFibGVJbnB1dENvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdrQ2xlYXJhYmxlSW5wdXQnLFxuICB0ZW1wbGF0ZTogYDxzcGFuIGNsYXNzPVwiay1jbGVhcmFibGUtaW5wdXQtd3JhcHBlclwiPlxuICAgIDxpbnB1dCBwSW5wdXRUZXh0XG4gICAgICAgICAgIGNsYXNzPVwiay1jbGVhcmFibGUtaW5wdXQtaW5wdXRcIlxuICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWQgfHwgX2Rpc2FibGVkXCJcbiAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICAgICAgICAgKGNoYW5nZSk9XCJvbkNoYW5nZS5lbWl0KCRldmVudClcIlxuICAgICAgICAgICAoZm9jdXMpPVwib25Gb2N1cy5lbWl0KCRldmVudClcIlxuICAgICAgICAgICAoYmx1cik9XCJvbkJsdXIuZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgICAgKGtleXVwLmVudGVyKT1cIl9lbnRlclByZXNzZWQoKVwiXG4gICAgICAgICAgIFsobmdNb2RlbCldPVwiX3ZhbHVlXCI+XG4gICAgPGkgKm5nSWY9XCJfc2hvd0NsZWFyQnRuXCIgY2xhc3M9XCJrLWNsZWFyYWJsZS1pbnB1dC1jbGVhci1idG5cIiB0aXRsZT1cIkNsZWFyXCIgKGNsaWNrKT1cIl9jbGVhcklucHV0KClcIj4mdGltZXM7PC9pPlxuPC9zcGFuPmAsXG4gIHN0eWxlczogW2Auay1jbGVhcmFibGUtaW5wdXQtd3JhcHBlcntwb3NpdGlvbjpyZWxhdGl2ZX0uay1jbGVhcmFibGUtaW5wdXQtd3JhcHBlciAuay1jbGVhcmFibGUtaW5wdXQtY2xlYXItYnRue2N1cnNvcjpwb2ludGVyO3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjVweDt0b3A6LTZweDtmb250LXdlaWdodDo3MDA7Zm9udC1zaXplOjEuMmVtO2NvbG9yOiM5OTk7Zm9udC1zdHlsZTpub3JtYWx9YF0sXG4gIHByb3ZpZGVyczogW0RvbUhhbmRsZXIsIENMRUFSQUJMRV9JTlBVVF9WQUxVRV9BQ0NFU1NPUl0sXG59KVxuZXhwb3J0IGNsYXNzIENsZWFyYWJsZUlucHV0Q29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgXG4gIEBPdXRwdXQoKSBvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvbkZvY3VzOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uQmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvbkVudGVyS2V5dXA6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gIEBPdXRwdXQoKSBvbkNsZWFyOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIFxuICBwdWJsaWMgX2Rpc2FibGVkID0gZmFsc2U7XG4gIHB1YmxpYyBfdmFsdWUgPSAnJztcbiAgcHVibGljIF9zaG93Q2xlYXJCdG4gPSBmYWxzZTtcbiAgXG4gIHB1YmxpYyBfY2xlYXJJbnB1dCgpOiB2b2lkIHtcbiAgICB0aGlzLl92YWx1ZSA9ICcnO1xuICAgIHRoaXMuX3Nob3dDbGVhckJ0biA9IGZhbHNlO1xuICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLl92YWx1ZSk7XG4gICAgdGhpcy5vbkNoYW5nZS5lbWl0KHRoaXMuX3ZhbHVlKTtcbiAgICB0aGlzLm9uQ2xlYXIuZW1pdCgpO1xuICB9XG4gIFxuICBwdWJsaWMgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7XG4gIH07XG4gIFxuICBwdWJsaWMgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge1xuICB9O1xuICBcbiAgcHVibGljIHNldERpc2FibGVkU3RhdGUodmFsOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSB2YWw7XG4gIH1cbiAgXG4gIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICB9XG4gIFxuICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICB9XG4gIFxuICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fdmFsdWUgPSBTdHJpbmcodmFsdWUgfHwgJycpO1xuICAgIFxuICAgIGlmICghdGhpcy5fdmFsdWUudHJpbSgpKSB7XG4gICAgICB0aGlzLl9zaG93Q2xlYXJCdG4gPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgXG4gIHB1YmxpYyBjbGVhclZhbHVlKCk6IHZvaWQge1xuICAgIHRoaXMuX3ZhbHVlID0gJyc7XG4gICAgdGhpcy5fc2hvd0NsZWFyQnRuID0gZmFsc2U7XG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMuX3ZhbHVlKTtcbiAgICB0aGlzLm9uQ2hhbmdlLmVtaXQodGhpcy5fdmFsdWUpO1xuICB9XG4gIFxuICBwdWJsaWMgX2VudGVyUHJlc3NlZCgpOiB2b2lkIHtcbiAgICB0aGlzLm9uRW50ZXJLZXl1cC5lbWl0KHRoaXMuX3ZhbHVlKTtcbiAgICB0aGlzLl9zaG93Q2xlYXJCdG4gPSAhIXRoaXMuX3ZhbHVlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvY29tcG9uZW50cy9jb21tb24vc2hhcmVkJztcbmltcG9ydCB7IENsZWFyYWJsZUlucHV0Q29tcG9uZW50IH0gZnJvbSBcIi4vY2xlYXJhYmxlLWlucHV0LmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgSW5wdXRUZXh0TW9kdWxlIH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFNoYXJlZE1vZHVsZSxcbiAgICBJbnB1dFRleHRNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQ2xlYXJhYmxlSW5wdXRDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQ2xlYXJhYmxlSW5wdXRDb21wb25lbnRdLFxuICBcbn0pXG5leHBvcnQgY2xhc3MgQ2xlYXJhYmxlSW5wdXRNb2R1bGUge1xufSIsImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPbkRlc3Ryb3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtGb3JtR3JvdXB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERhdGVQaWNrZXJDb250cm9sLCBEeW5hbWljRHJvcGRvd25Db250cm9sLCBEeW5hbWljRm9ybUNvbnRyb2xCYXNlLCBMaXN0Q29udHJvbCB9IGZyb20gJ0BrYWx0dXJhLW5nL2thbHR1cmEtdWknO1xuaW1wb3J0IHsgY2FuY2VsT25EZXN0cm95LCB0YWcgfSBmcm9tICdAa2FsdHVyYS1uZy9rYWx0dXJhLWNvbW1vbic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnay1wcmltZS1jb250cm9sJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgW2Zvcm1Hcm91cF09XCJmb3JtXCIgW25nU3dpdGNoXT1cImNvbnRyb2wuY29udHJvbFR5cGVcIj5cbiAgICA8dGV4dGFyZWEgICpuZ1N3aXRjaENhc2U9XCInVGV4dEFyZWEnXCIgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLmtleVwiICAgW2NsYXNzLmhhc0Vycm9yXT1cImVycm9yTXNnICYmIGZvcm0uY29udHJvbHNbY29udHJvbC5rZXldLnRvdWNoZWRcIiBwSW5wdXRUZXh0YXJlYSA+PC90ZXh0YXJlYT5cblxuICAgIDxpbnB1dCAqbmdTd2l0Y2hDYXNlPVwiJ1RleHRib3gnXCIgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLmtleVwiICBbY2xhc3MuaGFzRXJyb3JdPVwiZXJyb3JNc2cgJiYgZm9ybS5jb250cm9sc1tjb250cm9sLmtleV0udG91Y2hlZFwiIHBJbnB1dFRleHQvPlxuXG4gICAgPGlucHV0ICpuZ1N3aXRjaENhc2U9XCInTnVtYmVyJ1wiICB0eXBlPVwibnVtYmVyXCIgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLmtleVwiICBbY2xhc3MuaGFzRXJyb3JdPVwiZXJyb3JNc2cgJiYgZm9ybS5jb250cm9sc1tjb250cm9sLmtleV0udG91Y2hlZFwiIHBJbnB1dFRleHQgLz5cblxuICAgIDxwLWRyb3Bkb3duICpuZ1N3aXRjaENhc2U9XCInRHJvcGRvd24nXCIgW2ZpbHRlcl09XCJ0cnVlXCIgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLmtleVwiICBbb3B0aW9uc109XCJhc0R5bmFtaWNEcm9wZG93bkNvbnRyb2woY29udHJvbCkudmFsdWVzIHwga1ByaW1lTGlzdE9wdGlvbnM6IHRydWVcIj48L3AtZHJvcGRvd24+XG5cbiAgICA8a011bHRpU2VsZWN0ICpuZ1N3aXRjaENhc2U9XCInTGlzdCdcIiBbcmVzZXRGaWx0ZXJPbkhpZGVdPVwidHJ1ZVwiIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5rZXlcIiAgW29wdGlvbnNdPVwiYXNMaXN0Q29udHJvbChjb250cm9sKS52YWx1ZXMgfCBrUHJpbWVMaXN0T3B0aW9ucyA6IGZhbHNlXCI+PC9rTXVsdGlTZWxlY3Q+XG5cbiAgICA8cC1jYWxlbmRhciAqbmdTd2l0Y2hDYXNlPVwiJ0RhdGVQaWNrZXInXCIgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLmtleVwiICAgaWNvbj1cImtJY29uY2FsZW5kYXJcIiBbc2hvd0ljb25dPVwidHJ1ZVwiIFttb250aE5hdmlnYXRvcl09XCJ0cnVlXCIgW3llYXJOYXZpZ2F0b3JdPVwidHJ1ZVwiIFtzaG93VGltZV09XCJhc0RhdGVQaWNrZXJDb250cm9sKGNvbnRyb2wpLnNob3dUaW1lXCIgeWVhclJhbmdlPVwiMjAwNToyMDUwXCIgW2RhdGVGb3JtYXRdPVwiYXNEYXRlUGlja2VyQ29udHJvbChjb250cm9sKS5kYXRlRm9ybWF0XCI+PC9wLWNhbGVuZGFyPlxuXG4gICAgPHAtaW5wdXRTd2l0Y2ggICpuZ1N3aXRjaENhc2U9XCInU3dpdGNoJ1wiIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5rZXlcIj4gPC9wLWlucHV0U3dpdGNoPlxuXG4gICAgPHNwYW4gKm5nU3dpdGNoRGVmYXVsdD1cIlwiPk1pc3NpbmcgY29udHJvbCBmb3Ige3tjb250cm9sLmNvbnRyb2xUeXBlfX08L3NwYW4+XG5cbiAgICA8cCAqbmdJZj1cImVycm9yTXNnICYmIGZvcm0uY29udHJvbHNbY29udHJvbC5rZXldLnRvdWNoZWRcIlxuICAgICAgIGNsYXNzPVwia0Zvcm1FcnJvclwiPnt7ZXJyb3JNc2d9fVxuICAgIDwvcD5cbjwvZGl2PlxuYCxcbiAgICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgUHJpbWVDb250cm9sIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpIGNvbnRyb2w6IER5bmFtaWNGb3JtQ29udHJvbEJhc2U8YW55PjtcbiAgICBASW5wdXQoKSBmb3JtOiBGb3JtR3JvdXA7XG5cbiAgICBwdWJsaWMgZXJyb3JNc2cgPSAnJztcblxuICAgIGdldCBpc1ZhbGlkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3JtLmNvbnRyb2xzW3RoaXMuY29udHJvbC5rZXldLnZhbGlkO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCkge1xuICAgICAgICAgICAgdGhpcy5lcnJvck1zZyA9IHRoaXMuZ2V0RXJyb3JNc2coKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25Gb3JtU3RhdHVzQ2hhbmdlcygpO1xuXG4gICAgfVxuXG4gIGFzRGF0ZVBpY2tlckNvbnRyb2wgKGNvbnRyb2w6IGFueSk6IERhdGVQaWNrZXJDb250cm9sIHtcbiAgICByZXR1cm4gKGNvbnRyb2wgaW5zdGFuY2VvZiBEYXRlUGlja2VyQ29udHJvbCkgPyBjb250cm9sIDogbnVsbDtcbiAgfVxuXG4gIGFzRHluYW1pY0Ryb3Bkb3duQ29udHJvbCAoY29udHJvbDogYW55KTogRHluYW1pY0Ryb3Bkb3duQ29udHJvbCB7XG4gICAgcmV0dXJuIChjb250cm9sIGluc3RhbmNlb2YgRHluYW1pY0Ryb3Bkb3duQ29udHJvbCkgPyBjb250cm9sIDogbnVsbDtcbiAgfVxuXG4gIGFzTGlzdENvbnRyb2wgKGNvbnRyb2w6IGFueSk6IExpc3RDb250cm9sIHtcbiAgICByZXR1cm4gKGNvbnRyb2wgaW5zdGFuY2VvZiBMaXN0Q29udHJvbCkgPyBjb250cm9sIDogbnVsbDtcbiAgfVxuXG4gICAgcHJpdmF0ZSBvbkZvcm1TdGF0dXNDaGFuZ2VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmZvcm0uc3RhdHVzQ2hhbmdlc1xuICAgICAgICAgICAgLnBpcGUoY2FuY2VsT25EZXN0cm95KHRoaXMpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvck1zZyA9IHRoaXMuZ2V0RXJyb3JNc2coKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSAnJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEVycm9yTXNnKCk6IHN0cmluZyB7XG4gICAgICAgIGxldCByZXN1bHQgPSBcIlwiO1xuICAgICAgICBjb25zdCBmb3JtQ29udHJvbCA9IHRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmNvbnRyb2wua2V5XTtcbiAgICAgICAgaWYgKHRoaXMuY29udHJvbC5lcnJvcnMgJiYgIWZvcm1Db250cm9sLnZhbGlkKSB7XG4gICAgICAgICAgICBjb25zdCBmaXJzdEVycm9yS2V5ID0gT2JqZWN0LmtleXModGhpcy5jb250cm9sLmVycm9ycykuZmluZChlcnJvcktleSA9PlxuICAgICAgICAgICAgICAgIGZvcm1Db250cm9sLmhhc0Vycm9yKGVycm9yS2V5KSk7XG5cbiAgICAgICAgICAgIGlmIChmaXJzdEVycm9yS2V5KSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5jb250cm9sLmVycm9yc1tmaXJzdEVycm9yS2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuXG4gICAgfVxufVxuIiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbkBQaXBlKHtcbiAgICBuYW1lOiAna1ByaW1lTGlzdE9wdGlvbnMnXG59KVxuZXhwb3J0IGNsYXNzIFByaW1lTGlzdE9wdGlvbnNQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgICBjb25zdHJ1Y3Rvcigpe31cblxuICAgIHRyYW5zZm9ybSh2YWx1ZXMgOiBhbnlbXSwgYWRkRGVmYXVsdEJ1dHRvbjogYm9vbGVhbik6IGFueSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9ICh2YWx1ZXMgfHwgW10pLm1hcCh2YWx1ZSA9PiB7XG5cdFx0ICAgIHJldHVybiB7bGFiZWw6IHZhbHVlLnRleHQsIHZhbHVlOiB2YWx1ZS52YWx1ZX07XG5cdCAgICB9KTtcblxuICAgICAgICBpZiAoYWRkRGVmYXVsdEJ1dHRvbikge1xuXHQgICAgICAgIHJlc3VsdC51bnNoaWZ0KHtsYWJlbDogJ1NlbGVjdCBhIHZhbHVlJywgdmFsdWU6IG51bGx9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgZm9yd2FyZFJlZixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgUmVuZGVyZXIyLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGFuaW1hdGUsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNdWx0aVNlbGVjdCB9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XG5cbi8qIHRzbGludDpkaXNhYmxlICovXG5leHBvcnQgY29uc3QgS0FMVFVSQV9NVUxUSVNFTEVDVF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTXVsdGlTZWxlY3RDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuLyogdHNsaW50OmVuYWJsZSAqL1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdrTXVsdGlTZWxlY3QnLFxuICBzdHlsZXM6IFtgOmhvc3QgL2RlZXAvIC51aS1tdWx0aXNlbGVjdC1wYW5lbCAucGktbWludXN7YmFja2dyb3VuZC1jb2xvcjojMDBhNzg0O2JvcmRlcjoxcHggc29saWQgIzAwYTc4NDtjb2xvcjojZmZmO3dpZHRoOjE2cHg7aGVpZ2h0OjE2cHg7Ym9yZGVyLXJhZGl1czozcHg7dG9wOi0xcHg7cG9zaXRpb246cmVsYXRpdmU7bGVmdDotMXB4fWBdLFxuICB0ZW1wbGF0ZTogYDxkaXYgI2NvbnRhaW5lciBbbmdDbGFzc109XCJ7J3VpLW11bHRpc2VsZWN0IHVpLXdpZGdldCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGwnOnRydWUsJ3VpLW11bHRpc2VsZWN0LW9wZW4nOm92ZXJsYXlWaXNpYmxlLCd1aS1zdGF0ZS1mb2N1cyc6Zm9jdXMsJ3VpLXN0YXRlLWRpc2FibGVkJzogZGlzYWJsZWR9XCIgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiXG4gICAgIChjbGljayk9XCJvbk1vdXNlY2xpY2soJGV2ZW50LGluKVwiPlxuICA8ZGl2IGNsYXNzPVwidWktaGVscGVyLWhpZGRlbi1hY2Nlc3NpYmxlXCI+XG4gICAgPGlucHV0ICNpbiB0eXBlPVwidGV4dFwiIHJlYWRvbmx5PVwicmVhZG9ubHlcIiBbYXR0ci5pZF09XCJpbnB1dElkXCIgW2F0dHIubmFtZV09XCJuYW1lXCIgKGZvY3VzKT1cIm9uSW5wdXRGb2N1cygkZXZlbnQpXCIgKGJsdXIpPVwib25JbnB1dEJsdXIoJGV2ZW50KVwiXG4gICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIFthdHRyLnRhYmluZGV4XT1cInRhYmluZGV4XCIgKGtleWRvd24pPVwib25LZXlkb3duKCRldmVudClcIj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJ1aS1tdWx0aXNlbGVjdC1sYWJlbC1jb250YWluZXJcIiBbdGl0bGVdPVwidmFsdWVzQXNTdHJpbmdcIj5cbiAgICA8bGFiZWwgY2xhc3M9XCJ1aS1tdWx0aXNlbGVjdC1sYWJlbCB1aS1jb3JuZXItYWxsXCI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXNlbGVjdGVkSXRlbXNUZW1wbGF0ZVwiPnt7aXNBbGxDaGVja2VkKCkgPyAoYWxsU2VsZWN0ZWRMYWJlbCB8fCB2YWx1ZXNBc1N0cmluZykgOiB2YWx1ZXNBc1N0cmluZ319PC9uZy1jb250YWluZXI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwic2VsZWN0ZWRJdGVtc1RlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiB2YWx1ZX1cIj48L25nLWNvbnRhaW5lcj5cbiAgICA8L2xhYmVsPlxuICA8L2Rpdj5cbiAgPGRpdiBbbmdDbGFzc109XCJ7J3VpLW11bHRpc2VsZWN0LXRyaWdnZXIgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItcmlnaHQnOnRydWV9XCI+XG4gICAgPHNwYW4gY2xhc3M9XCJ1aS1tdWx0aXNlbGVjdC10cmlnZ2VyLWljb24gdWktY2xpY2thYmxlXCIgW25nQ2xhc3NdPVwiZHJvcGRvd25JY29uXCI+PC9zcGFuPlxuICA8L2Rpdj5cbiAgPGRpdiAqbmdJZj1cIm92ZXJsYXlWaXNpYmxlXCIgW25nQ2xhc3NdPVwiWyd1aS1tdWx0aXNlbGVjdC1wYW5lbCB1aS13aWRnZXQgdWktd2lkZ2V0LWNvbnRlbnQgdWktY29ybmVyLWFsbCB1aS1zaGFkb3cnXVwiIFtAb3ZlcmxheUFuaW1hdGlvbl09XCJ7dmFsdWU6ICd2aXNpYmxlJywgcGFyYW1zOiB7c2hvd1RyYW5zaXRpb25QYXJhbXM6IHNob3dUcmFuc2l0aW9uT3B0aW9ucywgaGlkZVRyYW5zaXRpb25QYXJhbXM6IGhpZGVUcmFuc2l0aW9uT3B0aW9uc319XCIgKEBvdmVybGF5QW5pbWF0aW9uLnN0YXJ0KT1cIm9uT3ZlcmxheUFuaW1hdGlvblN0YXJ0KCRldmVudClcIlxuICAgICAgIFtuZ1N0eWxlXT1cInBhbmVsU3R5bGVcIiBbY2xhc3NdPVwicGFuZWxTdHlsZUNsYXNzXCIgKGNsaWNrKT1cInBhbmVsQ2xpY2s9dHJ1ZVwiPlxuICAgIDxkaXYgY2xhc3M9XCJ1aS13aWRnZXQtaGVhZGVyIHVpLWNvcm5lci1hbGwgdWktbXVsdGlzZWxlY3QtaGVhZGVyIHVpLWhlbHBlci1jbGVhcmZpeFwiIFtuZ0NsYXNzXT1cInsndWktbXVsdGlzZWxlY3QtaGVhZGVyLW5vLXRvZ2dsZWFsbCc6ICFzaG93VG9nZ2xlQWxsfVwiICpuZ0lmPVwic2hvd0hlYWRlclwiPlxuICAgICAgPGRpdiBjbGFzcz1cInVpLWNoa2JveCB1aS13aWRnZXRcIiAqbmdJZj1cInNob3dUb2dnbGVBbGwgJiYgIXNlbGVjdGlvbkxpbWl0XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1oZWxwZXItaGlkZGVuLWFjY2Vzc2libGVcIj5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgcmVhZG9ubHk9XCJyZWFkb25seVwiIFtjaGVja2VkXT1cImlzQWxsQ2hlY2tlZCgpXCIgKGZvY3VzKT1cIm9uSGVhZGVyQ2hlY2tib3hGb2N1cygpXCIgKGJsdXIpPVwib25IZWFkZXJDaGVja2JveEJsdXIoKVwiIChrZXlkb3duLnNwYWNlKT1cInRvZ2dsZUFsbCgkZXZlbnQpXCI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidWktY2hrYm94LWJveCB1aS13aWRnZXQgdWktY29ybmVyLWFsbCB1aS1zdGF0ZS1kZWZhdWx0XCIgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1hY3RpdmUnOmlzQWxsQ2hlY2tlZCgpLCAndWktc3RhdGUtZm9jdXMnOiBoZWFkZXJDaGVja2JveEZvY3VzfVwiIChjbGljayk9XCJ0b2dnbGVBbGwoJGV2ZW50KVwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktY2hrYm94LWljb24gdWktY2xpY2thYmxlIHBpXCJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3BpLWNoZWNrJzppc0FsbENoZWNrZWQoKSwgJ3BpLW1pbnVzJzppc1BhcnRpYWxseUNoZWNrZWQoKX1cIj48L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwidWktbXVsdGlzZWxlY3QtZmlsdGVyLWNvbnRhaW5lclwiICpuZ0lmPVwiZmlsdGVyXCI+XG4gICAgICAgIDxpbnB1dCAjZmlsdGVySW5wdXQgdHlwZT1cInRleHRcIiByb2xlPVwidGV4dGJveFwiIFt2YWx1ZV09XCJmaWx0ZXJWYWx1ZXx8JydcIiAoaW5wdXQpPVwib25GaWx0ZXIoKVwiIGNsYXNzPVwidWktaW5wdXR0ZXh0IHVpLXdpZGdldCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGxcIiBbYXR0ci5wbGFjZWhvbGRlcl09XCJmaWx0ZXJQbGFjZUhvbGRlclwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInVpLW11bHRpc2VsZWN0LWZpbHRlci1pY29uIHBpIHBpLXNlYXJjaFwiPjwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGEgY2xhc3M9XCJ1aS1tdWx0aXNlbGVjdC1jbG9zZSB1aS1jb3JuZXItYWxsXCIgdGFiaW5kZXg9XCIwXCIgKGNsaWNrKT1cImNsb3NlKCRldmVudClcIiAoa2V5ZG93bi5lbnRlcik9XCJjbG9zZSgkZXZlbnQpXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwicGkgcGktdGltZXNcIj48L3NwYW4+XG4gICAgICA8L2E+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJwLWhlYWRlclwiPjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwidWktbXVsdGlzZWxlY3QtaXRlbXMtd3JhcHBlclwiIFtzdHlsZS5tYXgtaGVpZ2h0XT1cInZpcnR1YWxTY3JvbGwgPyAnYXV0bycgOiAoc2Nyb2xsSGVpZ2h0fHwnYXV0bycpXCI+XG4gICAgICA8dWwgY2xhc3M9XCJ1aS1tdWx0aXNlbGVjdC1pdGVtcyB1aS1tdWx0aXNlbGVjdC1saXN0IHVpLXdpZGdldC1jb250ZW50IHVpLXdpZGdldCB1aS1jb3JuZXItYWxsIHVpLWhlbHBlci1yZXNldFwiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXZpcnR1YWxTY3JvbGw7IGVsc2UgdmlydHVhbFNjcm9sbExpc3RcIj5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LW9wdGlvbiBsZXQtaT1cImluZGV4XCIgW25nRm9yT2ZdPVwib3B0aW9uc1wiPlxuICAgICAgICAgICAgPHAtbXVsdGlTZWxlY3RJdGVtIFtvcHRpb25dPVwib3B0aW9uXCIgW3NlbGVjdGVkXT1cImlzU2VsZWN0ZWQob3B0aW9uLnZhbHVlKVwiIChvbkNsaWNrKT1cIm9uT3B0aW9uQ2xpY2soJGV2ZW50KVwiIChvbktleWRvd24pPVwib25PcHRpb25LZXlkb3duKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFttYXhTZWxlY3Rpb25MaW1pdFJlYWNoZWRdPVwibWF4U2VsZWN0aW9uTGltaXRSZWFjaGVkXCIgW3Zpc2libGVdPVwiaXNJdGVtVmlzaWJsZShvcHRpb24pXCIgW3RlbXBsYXRlXT1cIml0ZW1UZW1wbGF0ZVwiPjwvcC1tdWx0aVNlbGVjdEl0ZW0+XG4gICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjdmlydHVhbFNjcm9sbExpc3Q+XG4gICAgICAgICAgPGNkay12aXJ0dWFsLXNjcm9sbC12aWV3cG9ydCAjdmlld3BvcnQgW25nU3R5bGVdPVwieydoZWlnaHQnOiBzY3JvbGxIZWlnaHR9XCIgW2l0ZW1TaXplXT1cIml0ZW1TaXplXCIgKm5nSWY9XCJ2aXJ0dWFsU2Nyb2xsXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpjZGtWaXJ0dWFsRm9yPVwibGV0IG9wdGlvbiBvZiBvcHRpb25zOyBsZXQgaSA9IGluZGV4OyBsZXQgYyA9IGNvdW50OyBsZXQgZiA9IGZpcnN0OyBsZXQgbCA9IGxhc3Q7IGxldCBlID0gZXZlbjsgbGV0IG8gPSBvZGRcIj5cbiAgICAgICAgICAgICAgPHAtbXVsdGlTZWxlY3RJdGVtIFtvcHRpb25dPVwib3B0aW9uXCIgW3NlbGVjdGVkXT1cImlzU2VsZWN0ZWQob3B0aW9uLnZhbHVlKVwiIChvbkNsaWNrKT1cIm9uT3B0aW9uQ2xpY2soJGV2ZW50KVwiIChvbktleWRvd24pPVwib25PcHRpb25LZXlkb3duKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW21heFNlbGVjdGlvbkxpbWl0UmVhY2hlZF09XCJtYXhTZWxlY3Rpb25MaW1pdFJlYWNoZWRcIiBbdmlzaWJsZV09XCJpc0l0ZW1WaXNpYmxlKG9wdGlvbilcIiBbdGVtcGxhdGVdPVwiaXRlbVRlbXBsYXRlXCIgW2l0ZW1TaXplXT1cIml0ZW1TaXplXCI+PC9wLW11bHRpU2VsZWN0SXRlbT5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDwvY2RrLXZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0PlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgPC91bD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwidWktbXVsdGlzZWxlY3QtZm9vdGVyIHVpLXdpZGdldC1jb250ZW50XCIgKm5nSWY9XCJmb290ZXJGYWNldFwiPlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwicC1mb290ZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignb3ZlcmxheUFuaW1hdGlvbicsIFtcbiAgICAgIHN0YXRlKCd2b2lkJywgc3R5bGUoe1xuICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDUlKScsXG4gICAgICAgIG9wYWNpdHk6IDBcbiAgICAgIH0pKSxcbiAgICAgIHN0YXRlKCd2aXNpYmxlJywgc3R5bGUoe1xuICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDApJyxcbiAgICAgICAgb3BhY2l0eTogMVxuICAgICAgfSkpLFxuICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiB2aXNpYmxlJywgYW5pbWF0ZSgne3tzaG93VHJhbnNpdGlvblBhcmFtc319JykpLFxuICAgICAgdHJhbnNpdGlvbigndmlzaWJsZSA9PiB2b2lkJywgYW5pbWF0ZSgne3toaWRlVHJhbnNpdGlvblBhcmFtc319JykpXG4gICAgXSlcbiAgXSxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MudWktaW5wdXR3cmFwcGVyLWZpbGxlZF0nOiAnZmlsbGVkJyxcbiAgICAnW2NsYXNzLnVpLWlucHV0d3JhcHBlci1mb2N1c10nOiAnZm9jdXMnXG4gIH0sXG4gIHByb3ZpZGVyczogW0tBTFRVUkFfTVVMVElTRUxFQ1RfVkFMVUVfQUNDRVNTT1JdXG4gIC8qIHRzbGludDplbmFibGUgKi9cbn0pXG5leHBvcnQgY2xhc3MgTXVsdGlTZWxlY3RDb21wb25lbnQgZXh0ZW5kcyBNdWx0aVNlbGVjdCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIGRpc2FibGVkTGFiZWw6IHN0cmluZztcbiAgQElucHV0KCkgYWxsU2VsZWN0ZWRMYWJlbDogc3RyaW5nO1xuICBASW5wdXQoKSBzZWxlY3RBbGxMYWJlbCA9ICdTZWxlY3QgQWxsJztcbiAgQElucHV0KCkgbWVudUl0ZW1EaXNwbGF5U3R5bGUgPSAnYmxvY2snO1xuICBASW5wdXQoKSBoaWRlT25TY3JvbGw6IHN0cmluZyB8IEVsZW1lbnQ7XG5cbiAgcHJpdmF0ZSBfaGlkZU9uU2Nyb2xsTGlzdGVuZXI6ICgpID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgc3VwZXIoZWwsIHJlbmRlcmVyLCBfY2QpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcbiAgICB0aGlzLl9yZW1vdmVIaWRlT25TY3JvbGxIYW5kbGVyKCk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRIaWRlT25TY3JvbGxIYW5kbGVyKCkge1xuICAgIGlmICh0aGlzLmhpZGVPblNjcm9sbCkge1xuICAgICAgY29uc3QgbGlzdGVuRWxlbWVudCA9IHR5cGVvZiB0aGlzLmhpZGVPblNjcm9sbCA9PT0gJ3N0cmluZydcbiAgICAgICAgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuaGlkZU9uU2Nyb2xsKVxuICAgICAgICA6IHRoaXMuaGlkZU9uU2Nyb2xsO1xuXG4gICAgICBpZiAobGlzdGVuRWxlbWVudCBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5faGlkZU9uU2Nyb2xsTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbihsaXN0ZW5FbGVtZW50LCAnc2Nyb2xsJywgKCkgPT4gdGhpcy5oaWRlKCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUhpZGVPblNjcm9sbEhhbmRsZXIoKSB7XG4gICAgaWYgKHRoaXMuaGlkZU9uU2Nyb2xsICYmIHRoaXMuX2hpZGVPblNjcm9sbExpc3RlbmVyKSB7XG4gICAgICB0aGlzLl9oaWRlT25TY3JvbGxMaXN0ZW5lcigpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzaG93KCk6IHZvaWQge1xuICAgIHN1cGVyLnNob3coKTtcbiAgICB0aGlzLl9hZGRIaWRlT25TY3JvbGxIYW5kbGVyKCk7XG4gIH1cblxuICBwdWJsaWMgaGlkZSgpOiB2b2lkIHtcbiAgICBzdXBlci5oaWRlKCk7XG4gICAgdGhpcy5fcmVtb3ZlSGlkZU9uU2Nyb2xsSGFuZGxlcigpO1xuICB9XG5cbiAgcHVibGljIGlzUGFydGlhbGx5Q2hlY2tlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMuaXNBbGxDaGVja2VkKCkgJiYgKHRoaXMudmFsdWUgfHwgW10pLmxlbmd0aCA+IDA7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2VsZWN0SXRlbSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncC1tdWx0aVNlbGVjdEl0ZW0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxsaSBjbGFzcz1cInVpLW11bHRpc2VsZWN0LWl0ZW0gdWktY29ybmVyLWFsbFwiIChjbGljayk9XCJvbk9wdGlvbkNsaWNrKCRldmVudClcIiAoa2V5ZG93bik9XCJvbk9wdGlvbktleWRvd24oJGV2ZW50KVwiXG4gICAgICAgIFtzdHlsZS5kaXNwbGF5XT1cInZpc2libGUgPyAnYmxvY2snIDogJ25vbmUnXCIgW2F0dHIudGFiaW5kZXhdPVwib3B0aW9uLmRpc2FibGVkID8gbnVsbCA6ICcwJ1wiIFtuZ1N0eWxlXT1cInsnaGVpZ2h0JzogaXRlbVNpemUgKyAncHgnfVwiXG4gICAgICAgIFtuZ0NsYXNzXT1cInsndWktc3RhdGUtaGlnaGxpZ2h0Jzogc2VsZWN0ZWQsICd1aS1zdGF0ZS1kaXNhYmxlZCc6IChvcHRpb24uZGlzYWJsZWQgfHwgKG1heFNlbGVjdGlvbkxpbWl0UmVhY2hlZCAmJiAhc2VsZWN0ZWQpKX1cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ1aS1jaGtib3ggdWktd2lkZ2V0XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1jaGtib3gtYm94IHVpLXdpZGdldCB1aS1jb3JuZXItYWxsIHVpLXN0YXRlLWRlZmF1bHRcIlxuICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktc3RhdGUtYWN0aXZlJzogc2VsZWN0ZWR9XCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1jaGtib3gtaWNvbiB1aS1jbGlja2FibGVcIiBbbmdDbGFzc109XCJ7J3BpIHBpLWNoZWNrJzogc2VsZWN0ZWR9XCI+PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGxhYmVsICpuZ0lmPVwiIXRlbXBsYXRlXCI+e3tvcHRpb24ubGFiZWx9fTwvbGFiZWw+XG4gICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IG9wdGlvbn1cIj48L25nLWNvbnRhaW5lcj5cbiAgICA8L2xpPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE11bHRpU2VsZWN0SXRlbSB7XG4gIFxuICBASW5wdXQoKSBvcHRpb246IFNlbGVjdEl0ZW07XG4gIFxuICBASW5wdXQoKSBzZWxlY3RlZDogYm9vbGVhbjtcbiAgXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuICBcbiAgQElucHV0KCkgdmlzaWJsZTogYm9vbGVhbjtcbiAgXG4gIEBJbnB1dCgpIGl0ZW1TaXplOiBudW1iZXI7XG4gIFxuICBASW5wdXQoKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgXG4gIEBJbnB1dCgpIG1heFNlbGVjdGlvbkxpbWl0UmVhY2hlZDogYm9vbGVhbjtcbiAgXG4gIEBPdXRwdXQoKSBvbkNsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgXG4gIEBPdXRwdXQoKSBvbktleWRvd246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBcbiAgb25PcHRpb25DbGljayhldmVudDogRXZlbnQpIHtcbiAgICB0aGlzLm9uQ2xpY2suZW1pdCh7XG4gICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgIG9wdGlvbjogdGhpcy5vcHRpb25cbiAgICB9KTtcbiAgfVxuICBcbiAgb25PcHRpb25LZXlkb3duKGV2ZW50OiBFdmVudCkge1xuICAgIHRoaXMub25LZXlkb3duLmVtaXQoe1xuICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICBvcHRpb246IHRoaXMub3B0aW9uXG4gICAgfSk7XG4gIH1cbn0iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFRvb2x0aXBNb2R1bGUgfSBmcm9tICdAa2FsdHVyYS1uZy9rYWx0dXJhLXVpJztcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvY29tcG9uZW50cy9jb21tb24vc2hhcmVkJztcbmltcG9ydCB7IE11bHRpU2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi9tdWx0aS1zZWxlY3QuY29tcG9uZW50JztcbmltcG9ydCB7IE11bHRpU2VsZWN0TW9kdWxlIGFzIFByaW1lTXVsdGlTZWxlY3RNb2R1bGUgfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xuaW1wb3J0IHsgTXVsdGlTZWxlY3RJdGVtIH0gZnJvbSAnLi9tdWx0aS1zZWxlY3QtaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2Nyb2xsaW5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBQcmltZU11bHRpU2VsZWN0TW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBTaGFyZWRNb2R1bGUsXG4gICAgVG9vbHRpcE1vZHVsZSxcbiAgICBTY3JvbGxpbmdNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbTXVsdGlTZWxlY3RDb21wb25lbnQsIE11bHRpU2VsZWN0SXRlbV0sXG4gIGV4cG9ydHM6IFtNdWx0aVNlbGVjdENvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE11bHRpU2VsZWN0TW9kdWxlIHtcbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQcmltZUNvbnRyb2wgfSBmcm9tICcuL3ByaW1lLWNvbnRyb2wuY29tcG9uZW50JztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgIElucHV0VGV4dE1vZHVsZSwgSW5wdXRUZXh0YXJlYU1vZHVsZSwgIENhbGVuZGFyTW9kdWxlLCAgRHJvcGRvd25Nb2R1bGUsIElucHV0U3dpdGNoTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcbmltcG9ydCB7IFByaW1lTGlzdE9wdGlvbnNQaXBlIH0gZnJvbSAnLi9wcmltZS1saXN0LW9wdGlvbnMucGlwZSc7XG5pbXBvcnQgeyBNdWx0aVNlbGVjdE1vZHVsZSB9IGZyb20gJy4uL211bHRpLXNlbGVjdC9tdWx0aS1zZWxlY3QubW9kdWxlJztcblxuQE5nTW9kdWxlKFxuICAgIHtcbiAgICAgICAgaW1wb3J0cyA6IFtcbiAgICAgICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgICAgICBEcm9wZG93bk1vZHVsZSxcblx0ICAgICAgICBNdWx0aVNlbGVjdE1vZHVsZSxcbiAgICAgICAgICAgIElucHV0VGV4dE1vZHVsZSxcbiAgICAgICAgICAgIElucHV0VGV4dGFyZWFNb2R1bGUsXG4gICAgICAgICAgICBDYWxlbmRhck1vZHVsZSxcbiAgICAgICAgICAgIElucHV0U3dpdGNoTW9kdWxlXG5cbiAgICAgICAgXSxcbiAgICAgICAgZGVjbGFyYXRpb25zIDogW1xuICAgICAgICAgICAgUHJpbWVDb250cm9sLFxuICAgICAgICAgICAgUHJpbWVMaXN0T3B0aW9uc1BpcGVcbiAgICAgICAgXSxcbiAgICAgICAgZXhwb3J0cyA6IFtcbiAgICAgICAgICAgIFByaW1lQ29udHJvbFxuICAgICAgICBdXG4gICAgfVxuKVxuZXhwb3J0IGNsYXNzIER5bmFtaWNGb3JtTW9kdWxlXG57XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgZm9yd2FyZFJlZiwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbUhhbmRsZXIgfSBmcm9tIFwicHJpbWVuZy9jb21wb25lbnRzL2RvbS9kb21oYW5kbGVyXCI7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFNsaWRlciB9IGZyb20gXCJwcmltZW5nL3ByaW1lbmdcIjtcblxuLyogdHNsaW50OmRpc2FibGUgKi9cbmV4cG9ydCBjb25zdCBLQUxUVVJBX1NMSURFUl9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gU2xpZGVyQ29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbi8qIHRzbGludDplbmFibGUgKi9cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAna1NsaWRlcicsXG4gIHN0eWxlczogW2A6aG9zdCAvZGVlcC8gLnVpLXNsaWRlcntiYWNrZ3JvdW5kLWNvbG9yOiNjY2M7aGVpZ2h0OjZweDtib3JkZXI6bm9uZX06aG9zdCAvZGVlcC8gLnVpLXNsaWRlciAudWktc2xpZGVyLXJhbmdle2JhY2tncm91bmQ6IzAwYTc4NDtib3JkZXI6MnB4IHNvbGlkICMwMGE3ODR9Omhvc3QgL2RlZXAvIC51aS1zbGlkZXIgLnVpLXNsaWRlci1oYW5kbGV7dG9wOi0uM2VtO21hcmdpbi1sZWZ0Oi0uNmVtO2JvcmRlci1yYWRpdXM6NTAlO2JvcmRlcjoycHggc29saWQgIzAwYTc4NDtoZWlnaHQ6MTZweDt3aWR0aDoxNnB4O2JveC1zaGFkb3c6MCAycHggOHB4IDAgcmdiYSgwLDAsMCwuMjQpfWBdLFxuICB0ZW1wbGF0ZTogYDxkaXYgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiXG4gICAgIFtuZ0NsYXNzXT1cIntcbiAgICAgICAgICd1aS1zbGlkZXIgdWktd2lkZ2V0IHVpLXdpZGdldC1jb250ZW50IHVpLWNvcm5lci1hbGwnOnRydWUsXG4gICAgICAgICAndWktc3RhdGUtZGlzYWJsZWQnOmRpc2FibGVkLFxuICAgICAgICAgJ3VpLXNsaWRlci1ob3Jpem9udGFsJzpvcmllbnRhdGlvbiA9PSAnaG9yaXpvbnRhbCcsXG4gICAgICAgICAndWktc2xpZGVyLXZlcnRpY2FsJzpvcmllbnRhdGlvbiA9PSAndmVydGljYWwnLFxuICAgICAgICAgJ3VpLXNsaWRlci1hbmltYXRlJzphbmltYXRlXG4gICAgIH1cIlxuICAgICAoY2xpY2spPVwib25CYXJDbGljaygkZXZlbnQpXCI+XG5cbiAgICA8c3BhbiAqbmdJZj1cInJhbmdlICYmIG9yaWVudGF0aW9uID09ICdob3Jpem9udGFsJ1wiXG4gICAgICAgICAgY2xhc3M9XCJ1aS1zbGlkZXItcmFuZ2UgdWktd2lkZ2V0LWhlYWRlciB1aS1jb3JuZXItYWxsXCJcbiAgICAgICAgICBbbmdTdHlsZV09XCJ7J2xlZnQnOmhhbmRsZVZhbHVlc1swXSArICclJyx3aWR0aDogKGhhbmRsZVZhbHVlc1sxXSAtIGhhbmRsZVZhbHVlc1swXSArICclJyl9XCI+PC9zcGFuPlxuXG4gICAgPHNwYW4gKm5nSWY9XCJyYW5nZSAmJiBvcmllbnRhdGlvbiA9PSAndmVydGljYWwnXCJcbiAgICAgICAgICBjbGFzcz1cInVpLXNsaWRlci1yYW5nZSB1aS13aWRnZXQtaGVhZGVyIHVpLWNvcm5lci1hbGxcIlxuICAgICAgICAgIFtuZ1N0eWxlXT1cInsnYm90dG9tJzpoYW5kbGVWYWx1ZXNbMF0gKyAnJScsaGVpZ2h0OiAoaGFuZGxlVmFsdWVzWzFdIC0gaGFuZGxlVmFsdWVzWzBdICsgJyUnKX1cIj48L3NwYW4+XG5cbiAgICA8c3BhbiAqbmdJZj1cIiFyYW5nZSAmJiBvcmllbnRhdGlvbj09J3ZlcnRpY2FsJ1wiXG4gICAgICAgICAgY2xhc3M9XCJ1aS1zbGlkZXItcmFuZ2UgdWktc2xpZGVyLXJhbmdlLW1pbiB1aS13aWRnZXQtaGVhZGVyIHVpLWNvcm5lci1hbGxcIlxuICAgICAgICAgIFtuZ1N0eWxlXT1cInsnaGVpZ2h0JzogaGFuZGxlVmFsdWUgKyAnJSd9XCI+PC9zcGFuPlxuXG4gICAgPHNwYW4gKm5nSWY9XCIhcmFuZ2UgJiYgb3JpZW50YXRpb249PSdob3Jpem9udGFsJ1wiXG4gICAgICAgICAgY2xhc3M9XCJ1aS1zbGlkZXItcmFuZ2UgdWktc2xpZGVyLXJhbmdlLW1pbiB1aS13aWRnZXQtaGVhZGVyIHVpLWNvcm5lci1hbGxcIlxuICAgICAgICAgIFtuZ1N0eWxlXT1cInsnd2lkdGgnOiBoYW5kbGVWYWx1ZSArICclJ31cIj48L3NwYW4+XG5cbiAgICA8c3BhbiAqbmdJZj1cIiFyYW5nZVwiXG4gICAgICAgICAgY2xhc3M9XCJ1aS1zbGlkZXItaGFuZGxlIHVpLXN0YXRlLWRlZmF1bHQgdWktY29ybmVyLWFsbCB1aS1jbGlja2FibGVcIlxuICAgICAgICAgIChtb3VzZWRvd24pPVwib25Nb3VzZURvd24oJGV2ZW50KVwiXG4gICAgICAgICAgKHRvdWNoc3RhcnQpPVwib25Ub3VjaFN0YXJ0KCRldmVudClcIlxuICAgICAgICAgICh0b3VjaG1vdmUpPVwib25Ub3VjaE1vdmUoJGV2ZW50KVwiXG4gICAgICAgICAgKHRvdWNoZW5kKT1cImRyYWdnaW5nPWZhbHNlXCJcbiAgICAgICAgICBbc3R5bGUudHJhbnNpdGlvbl09XCJkcmFnZ2luZyA/ICdub25lJzogbnVsbFwiXG4gICAgICAgICAgW25nU3R5bGVdPVwie1xuICAgICAgICAgICAgJ2xlZnQnOiBvcmllbnRhdGlvbiA9PSAnaG9yaXpvbnRhbCcgPyBoYW5kbGVWYWx1ZSArICclJyA6IG51bGwsXG4gICAgICAgICAgICAnYm90dG9tJzogb3JpZW50YXRpb24gPT0gJ3ZlcnRpY2FsJyA/IGhhbmRsZVZhbHVlICsgJyUnIDogbnVsbFxuICAgICAgICAgIH1cIlxuICAgICAgICAgIFtrVG9vbHRpcF09XCJ0b29sdGlwID8gdmFsdWUgOiAnJ1wiXG4gICAgICAgICAgW2ZvbGxvd1RhcmdldF09XCJ0cnVlXCI+PC9zcGFuPlxuXG4gICAgPHNwYW4gKm5nSWY9XCJyYW5nZVwiXG4gICAgICAgICAgKG1vdXNlZG93bik9XCJvbk1vdXNlRG93bigkZXZlbnQsMClcIlxuICAgICAgICAgICh0b3VjaHN0YXJ0KT1cIm9uVG91Y2hTdGFydCgkZXZlbnQsMClcIlxuICAgICAgICAgICh0b3VjaG1vdmUpPVwib25Ub3VjaE1vdmUoJGV2ZW50LDApXCJcbiAgICAgICAgICAodG91Y2hlbmQpPVwiZHJhZ2dpbmc9ZmFsc2VcIlxuICAgICAgICAgIFtzdHlsZS50cmFuc2l0aW9uXT1cImRyYWdnaW5nID8gJ25vbmUnOiBudWxsXCJcbiAgICAgICAgICBjbGFzcz1cInVpLXNsaWRlci1oYW5kbGUgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsIHVpLWNsaWNrYWJsZVwiXG4gICAgICAgICAgW25nU3R5bGVdPVwieydsZWZ0JzogcmFuZ2VTdGFydExlZnQsICdib3R0b20nOiByYW5nZVN0YXJ0Qm90dG9tfVwiXG4gICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1zbGlkZXItaGFuZGxlLWFjdGl2ZSc6aGFuZGxlSW5kZXg9PTB9XCJcbiAgICAgICAgICBba1Rvb2x0aXBdPVwidG9vbHRpcCA/IHZhbHVlc1toYW5kbGVJbmRleF0gOiAnJ1wiXG4gICAgICAgICAgW2ZvbGxvd1RhcmdldF09XCJ0cnVlXCI+PC9zcGFuPlxuXG4gICAgPHNwYW4gKm5nSWY9XCJyYW5nZVwiXG4gICAgICAgICAgKG1vdXNlZG93bik9XCJvbk1vdXNlRG93bigkZXZlbnQsMSlcIlxuICAgICAgICAgICh0b3VjaHN0YXJ0KT1cIm9uVG91Y2hTdGFydCgkZXZlbnQsMSlcIlxuICAgICAgICAgICh0b3VjaG1vdmUpPVwib25Ub3VjaE1vdmUoJGV2ZW50LDEpXCJcbiAgICAgICAgICAodG91Y2hlbmQpPVwiZHJhZ2dpbmc9ZmFsc2VcIlxuICAgICAgICAgIFtzdHlsZS50cmFuc2l0aW9uXT1cImRyYWdnaW5nID8gJ25vbmUnOiBudWxsXCJcbiAgICAgICAgICBjbGFzcz1cInVpLXNsaWRlci1oYW5kbGUgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsIHVpLWNsaWNrYWJsZVwiXG4gICAgICAgICAgW25nU3R5bGVdPVwieydsZWZ0JzogcmFuZ2VFbmRMZWZ0LCAnYm90dG9tJzogcmFuZ2VFbmRCb3R0b219XCJcbiAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXNsaWRlci1oYW5kbGUtYWN0aXZlJzpoYW5kbGVJbmRleD09MX1cIlxuICAgICAgICAgIFtrVG9vbHRpcF09XCJ0b29sdGlwID8gdmFsdWVzW2hhbmRsZUluZGV4XSA6ICcnXCJcbiAgICAgICAgICBbZm9sbG93VGFyZ2V0XT1cInRydWVcIj48L3NwYW4+XG48L2Rpdj5gLFxuICBwcm92aWRlcnM6IFtEb21IYW5kbGVyLCBLQUxUVVJBX1NMSURFUl9WQUxVRV9BQ0NFU1NPUl1cbiAgLyogdHNsaW50OmVuYWJsZSAqL1xufSlcbi8vIFtrbWNuZ10gdXBvbiB1cGdyYWRlOiBjb21wYXJlIGltcGxlbWVudGVkIGludGVyZmFjZXMgaW4gdGhlIG9yaWdpbmFsIGNvbXBvbmVudCAobm8gbmVlZCB0byBpbmNsdWRlIENvbnRyb2xWYWx1ZUFjY2Vzc29yKVxuZXhwb3J0IGNsYXNzIFNsaWRlckNvbXBvbmVudCBleHRlbmRzIFNsaWRlciB7XG4gIEBJbnB1dCgpIHRvb2x0aXAgPSB0cnVlO1xufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBUb29sdGlwTW9kdWxlIH0gZnJvbSAnQGthbHR1cmEtbmcva2FsdHVyYS11aSc7XG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICdwcmltZW5nL2NvbXBvbmVudHMvY29tbW9uL3NoYXJlZCc7XG5pbXBvcnQgeyBTbGlkZXJDb21wb25lbnQgfSBmcm9tIFwiLi9zbGlkZXIuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBTbGlkZXJNb2R1bGUgYXMgUHJpbWVTbGlkZXJNb2R1bGUgfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgUHJpbWVTbGlkZXJNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFNoYXJlZE1vZHVsZSxcbiAgICBUb29sdGlwTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbU2xpZGVyQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1NsaWRlckNvbXBvbmVudF0sXG4gIFxufSlcbmV4cG9ydCBjbGFzcyBTbGlkZXJNb2R1bGUge1xufSIsImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XG5cbmV4cG9ydCB0eXBlIElucHV0VHlwZSA9ICdtaW51dGVzJyB8ICdzZWNvbmRzJztcblxuZXhwb3J0IGNvbnN0IFNQSU5ORVJfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFRpbWVTcGlubmVyQ29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2tUaW1lU3Bpbm5lcicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImtTcGlubmVyQ29udGFpbmVyXCIgW2NsYXNzLnVpLXN0YXRlLWRpc2FibGVkXT1cIl9kaXNhYmxlZFwiPlxuICAgIDxpbnB1dCAjbWludXRlc1xuICAgICAgICAgICBjbGFzcz1cImtNaW51dGVzXCJcbiAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICBtYXhsZW5ndGg9XCIyXCJcbiAgICAgICAgICAgW2Rpc2FibGVkXT1cIl9kaXNhYmxlZFwiXG4gICAgICAgICAgIFt2YWx1ZV09XCJfbWludXRlc0FzU3RyaW5nXCJcbiAgICAgICAgICAgKGNsaWNrKT1cIm1pbnV0ZXMuc2VsZWN0KClcIlxuICAgICAgICAgICAoa2V5ZG93bik9XCJfb25JbnB1dEtleWRvd24oJGV2ZW50KVwiXG4gICAgICAgICAgIChrZXl1cCk9XCJfb25JbnB1dEtleXVwKCRldmVudClcIlxuICAgICAgICAgICAoa2V5cHJlc3MpPVwiX29uSW5wdXRLZXlQcmVzcygkZXZlbnQpXCJcbiAgICAgICAgICAgKGNoYW5nZSk9XCJfaGFuZGxlQ2hhbmdlKCRldmVudClcIlxuICAgICAgICAgICAoZm9jdXMpPVwiX29uSW5wdXRGb2N1cygkZXZlbnQsICdtaW51dGVzJylcIlxuICAgICAgICAgICAoYmx1cik9XCJfb25JbnB1dEJsdXIoJGV2ZW50KVwiPlxuICAgIDxzcGFuIGNsYXNzPVwia0RlbGltaXRlclwiPjo8L3NwYW4+XG4gICAgPGlucHV0ICNzZWNvbmRzIGNsYXNzPVwia1NlY29uZHNcIiB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgIFt2YWx1ZV09XCJfc2Vjb25kc0FzU3RyaW5nXCJcbiAgICAgICAgICAgW2Rpc2FibGVkXT1cIl9kaXNhYmxlZFwiXG4gICAgICAgICAgIChjbGljayk9XCJzZWNvbmRzLnNlbGVjdCgpXCJcbiAgICAgICAgICAgKGtleWRvd24pPVwiX29uSW5wdXRLZXlkb3duKCRldmVudClcIlxuICAgICAgICAgICAoa2V5dXApPVwiX29uSW5wdXRLZXl1cCgkZXZlbnQpXCJcbiAgICAgICAgICAgKGtleXByZXNzKT1cIl9vbklucHV0S2V5UHJlc3MoJGV2ZW50KVwiXG4gICAgICAgICAgIChjaGFuZ2UpPVwiX2hhbmRsZUNoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICAgKGZvY3VzKT1cIl9vbklucHV0Rm9jdXMoJGV2ZW50LCAnc2Vjb25kcycpXCJcbiAgICAgICAgICAgKGJsdXIpPVwiX29uSW5wdXRCbHVyKCRldmVudClcIj5cbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1zcGlubmVyLWJ1dHRvbiB1aS1zcGlubmVyLXVwIHVpLWNvcm5lci10ciB1aS1idXR0b24gdWktd2lkZ2V0IHVpLXN0YXRlLWRlZmF1bHQnOnRydWUsJ3VpLXN0YXRlLWRpc2FibGVkJzpfZGlzYWJsZWR9XCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJfZGlzYWJsZWRcIlxuICAgICAgICAgICAgKG1vdXNlbGVhdmUpPVwiX29uQnV0dG9uTW91c2VsZWF2ZSgkZXZlbnQpXCJcbiAgICAgICAgICAgIChtb3VzZWRvd24pPVwiX29uQnV0dG9uTW91c2Vkb3duKCRldmVudCwgMSlcIlxuICAgICAgICAgICAgKG1vdXNldXApPVwiX29uQnV0dG9uTW91c2V1cCgkZXZlbnQpXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwia0ljb25kcm9wZG93bl9hcnJvd190b3Aga1NwaW5uZXJCdG5cIj48L3NwYW4+XG4gICAgPC9idXR0b24+XG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIGNsYXNzPVwia1NwaW5Eb3duXCJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktc3Bpbm5lci1idXR0b24gdWktc3Bpbm5lci1kb3duIHVpLWNvcm5lci1iciB1aS1idXR0b24gdWktd2lkZ2V0IHVpLXN0YXRlLWRlZmF1bHQnOnRydWUsJ3VpLXN0YXRlLWRpc2FibGVkJzpfZGlzYWJsZWR9XCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJfZGlzYWJsZWRcIlxuICAgICAgICAgICAgKG1vdXNlbGVhdmUpPVwiX29uQnV0dG9uTW91c2VsZWF2ZSgkZXZlbnQpXCJcbiAgICAgICAgICAgIChtb3VzZWRvd24pPVwiX29uQnV0dG9uTW91c2Vkb3duKCRldmVudCwgLTEpXCJcbiAgICAgICAgICAgIChtb3VzZXVwKT1cIl9vbkJ1dHRvbk1vdXNldXAoJGV2ZW50KVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImtJY29uZHJvcGRvd25fYXJyb3dfYm90dG9tIGtTcGlubmVyQnRuXCI+PC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmtTcGlubmVyQ29udGFpbmVye2JhY2tncm91bmQtY29sb3I6I2ZmZjt3aWR0aDo3OHB4O2hlaWdodDoxNnB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrO292ZXJmbG93OnZpc2libGU7cG9zaXRpb246cmVsYXRpdmU7dmVydGljYWwtYWxpZ246bWlkZGxlO2JvcmRlcjoxcHggc29saWQgI2NjYztib3JkZXItcmFkaXVzOjNweDtwYWRkaW5nOjVweCAxMHB4IDExcHggMH0ua1NwaW5uZXJDb250YWluZXIgaW5wdXR7Ym9yZGVyOjA7d2lkdGg6MjVweDtoZWlnaHQ6MThweDtmb250LXNpemU6MTVweDtjb2xvcjojOTk5O2ZvbnQtd2VpZ2h0OjEwMH0ua1NwaW5uZXJDb250YWluZXIgaW5wdXQ6Zm9jdXN7b3V0bGluZTowfS5rU3Bpbm5lckNvbnRhaW5lciAua0RlbGltaXRlcntjb2xvcjojOTk5O2ZvbnQtd2VpZ2h0OjEwMH0ua1NwaW5uZXJDb250YWluZXIgLmtNaW51dGVze3RleHQtYWxpZ246cmlnaHR9LmtTcGlubmVyQ29udGFpbmVyIC5rU3Bpbm5lckJ0bntmb250LXNpemU6MTBweDtjb2xvcjojMzMzfS5rU3Bpbm5lckNvbnRhaW5lciAudWktc3RhdGUtZGlzYWJsZWR7b3BhY2l0eTouMzU7ZmlsdGVyOkFscGhhKE9wYWNpdHk9MzUpO2JhY2tncm91bmQtaW1hZ2U6bm9uZTtjdXJzb3I6ZGVmYXVsdCFpbXBvcnRhbnR9LmtTcGlubmVyQ29udGFpbmVyIC51aS1zcGlubmVyLWJ1dHRvbntib3JkZXI6MDttYXJnaW4tcmlnaHQ6MXB4O2hlaWdodDoxNHB4O2N1cnNvcjpwb2ludGVyfS5rU3Bpbm5lckNvbnRhaW5lciAudWktc3Bpbm5lci1kb3due21hcmdpbi1ib3R0b206NXB4fWBdLFxuICBwcm92aWRlcnM6IFtEb21IYW5kbGVyLCBTUElOTkVSX1ZBTFVFX0FDQ0VTU09SXSxcbn0pXG5leHBvcnQgY2xhc3MgVGltZVNwaW5uZXJDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIEBWaWV3Q2hpbGQoJ21pbnV0ZXMnKSBtaW51dGVzSW5wdXRGaWVsZDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnc2Vjb25kcycpIHNlY29uZHNJbnB1dEZpZWxkOiBFbGVtZW50UmVmO1xuICBcbiAgQE91dHB1dCgpIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uRm9jdXM6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25CbHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgXG4gIHByaXZhdGUgX2FsbG93ZWRLZXlzID0gW1xuICAgIDksICAvLyB0YWJcbiAgICA4LCAgLy8gYmFja3NwYWNlXG4gICAgMzcsIC8vIGxlZnRBcnJvd1xuICAgIDM5LCAvLyByaWdodEFycm93XG4gICAgNDYgIC8vIGRlbGV0ZUJ0blxuICBdO1xuICBwcml2YXRlIF9zcGluS2V5cyA9IHtcbiAgICB1cEFycm93OiAzOCxcbiAgICByaWdodEFycm93OiAzOSxcbiAgICBkb3duQXJyb3c6IDQwLFxuICAgIGxlZnRBcnJvdzogMzdcbiAgfTtcbiAgcHJpdmF0ZSBfY3VycmVudElucHV0OiBJbnB1dFR5cGUgPSAnbWludXRlcyc7XG4gIHByaXZhdGUgX2tleVBhdHRlcm46IFJlZ0V4cCA9IC9bMC05XS87XG4gIHByaXZhdGUgX3RpbWVyOiBhbnk7XG4gIFxuICBwdWJsaWMgX21pbnV0ZXNBc1N0cmluZyA9ICcwMCc7XG4gIHB1YmxpYyBfc2Vjb25kc0FzU3RyaW5nID0gJzAwJztcbiAgXG4gIHB1YmxpYyBfbWludXRlcyA9IDA7XG4gIHB1YmxpYyBfc2Vjb25kcyA9IDA7XG4gIHB1YmxpYyBfZGlzYWJsZWQgPSBmYWxzZTtcbiAgXG4gIHB1YmxpYyBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHtcbiAgfTtcbiAgXG4gIHB1YmxpYyBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7XG4gIH07XG4gIFxuICBwcml2YXRlIF9zcGluKGV2ZW50OiBFdmVudCwgZGlyOiBudW1iZXIpIHtcbiAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLl9nZXRDdXJyZW50SW5wdXRWYWx1ZSgpO1xuICAgIGxldCBuZXh0VmFsdWUgPSBjdXJyZW50VmFsdWU7XG4gICAgaWYgKGN1cnJlbnRWYWx1ZSA9PT0gMCAmJiBkaXIgPT09IC0xKSB7XG4gICAgICBuZXh0VmFsdWUgPSA1OTtcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRWYWx1ZSA9PT0gNTkgJiYgZGlyID09PSAxKSB7XG4gICAgICBuZXh0VmFsdWUgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXh0VmFsdWUgPSBjdXJyZW50VmFsdWUgKyBkaXI7XG4gICAgfVxuICAgIFxuICAgIHRoaXMuX3NldEN1cnJlbnRJbnB1dFZhbHVlKG5leHRWYWx1ZSk7XG4gICAgdGhpcy5fZm9ybWF0VmFsdWUoKTtcbiAgICBcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2UoKHRoaXMuX21pbnV0ZXMgKiA2MCkgKyB0aGlzLl9zZWNvbmRzKTtcbiAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoZXZlbnQpO1xuICB9XG4gIFxuICBwcml2YXRlIF9nZXRDdXJyZW50SW5wdXRWYWx1ZSgpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLl9jdXJyZW50SW5wdXQgPT09ICdtaW51dGVzJykge1xuICAgICAgcmV0dXJuIHRoaXMuX21pbnV0ZXM7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9jdXJyZW50SW5wdXQgPT09ICdzZWNvbmRzJykge1xuICAgICAgcmV0dXJuIHRoaXMuX3NlY29uZHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEVycm9yKCdNdXN0IG5vdCByZWFjaCB0aGlzIHBhcnQnKTtcbiAgICB9XG4gIH1cbiAgXG4gIHByaXZhdGUgX3NldEN1cnJlbnRJbnB1dFZhbHVlKHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fY3VycmVudElucHV0ID09PSAnbWludXRlcycpIHtcbiAgICAgIHRoaXMuX21pbnV0ZXMgPSB2YWx1ZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2N1cnJlbnRJbnB1dCA9PT0gJ3NlY29uZHMnKSB7XG4gICAgICB0aGlzLl9zZWNvbmRzID0gdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEVycm9yKCdNdXN0IG5vdCByZWFjaCB0aGlzIHBhcnQnKTtcbiAgICB9XG4gIH1cbiAgXG4gIHByaXZhdGUgX3NldFZhbHVlKGlucHV0OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBsZXQgdmFsdWUgPSBOdW1iZXIoaW5wdXQpO1xuICAgIHZhbHVlID0gaXNOYU4odmFsdWUpID8gMCA6IHZhbHVlO1xuICAgIFxuICAgIGlmICh2YWx1ZSA+IDU5KSB7XG4gICAgICB0aGlzLl9zZXRDdXJyZW50SW5wdXRWYWx1ZSg1OSk7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSA8IDApIHtcbiAgICAgIHRoaXMuX3NldEN1cnJlbnRJbnB1dFZhbHVlKDApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zZXRDdXJyZW50SW5wdXRWYWx1ZSh2YWx1ZSk7XG4gICAgfVxuICB9XG4gIFxuICBwcml2YXRlIF9oaWdobGlnaHRJbnB1dCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fY3VycmVudElucHV0ID09PSAnbWludXRlcycpIHtcbiAgICAgIHRoaXMubWludXRlc0lucHV0RmllbGQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgdGhpcy5taW51dGVzSW5wdXRGaWVsZC5uYXRpdmVFbGVtZW50LnNlbGVjdCgpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fY3VycmVudElucHV0ID09PSAnc2Vjb25kcycpIHtcbiAgICAgIHRoaXMuc2Vjb25kc0lucHV0RmllbGQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgdGhpcy5zZWNvbmRzSW5wdXRGaWVsZC5uYXRpdmVFbGVtZW50LnNlbGVjdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBFcnJvcignTXVzdCBub3QgcmVhY2ggdGhpcyBwYXJ0Jyk7XG4gICAgfVxuICB9XG4gIFxuICBwcml2YXRlIF9jbGVhclRpbWVyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl90aW1lcikge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl90aW1lcik7XG4gICAgfVxuICB9XG4gIFxuICBwcml2YXRlIF9yZXBlYXQoZXZlbnQ6IEV2ZW50LCBpbnRlcnZhbDogbnVtYmVyLCBkaXI6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGkgPSBpbnRlcnZhbCB8fCA1MDA7XG4gICAgXG4gICAgdGhpcy5fY2xlYXJUaW1lcigpO1xuICAgIHRoaXMuX3RpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLl9yZXBlYXQoZXZlbnQsIDQwLCBkaXIpO1xuICAgIH0sIGkpO1xuICAgIFxuICAgIHRoaXMuX3NwaW4oZXZlbnQsIGRpcik7XG4gIH1cbiAgXG4gIHByaXZhdGUgX2Zvcm1hdFZhbHVlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9jdXJyZW50SW5wdXQgPT09ICdtaW51dGVzJykge1xuICAgICAgdGhpcy5fbWludXRlc0FzU3RyaW5nID0gdGhpcy5fbWludXRlcyA8IDEwID8gYDAke3RoaXMuX21pbnV0ZXN9YCA6IFN0cmluZyh0aGlzLl9taW51dGVzKTtcbiAgICAgIHRoaXMubWludXRlc0lucHV0RmllbGQubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMuX21pbnV0ZXNBc1N0cmluZztcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2N1cnJlbnRJbnB1dCA9PT0gJ3NlY29uZHMnKSB7XG4gICAgICB0aGlzLl9zZWNvbmRzQXNTdHJpbmcgPSB0aGlzLl9zZWNvbmRzIDwgMTAgPyBgMCR7dGhpcy5fc2Vjb25kc31gIDogU3RyaW5nKHRoaXMuX3NlY29uZHMpO1xuICAgICAgdGhpcy5zZWNvbmRzSW5wdXRGaWVsZC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5fc2Vjb25kc0FzU3RyaW5nO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBFcnJvcignTXVzdCBub3QgcmVhY2ggdGhpcyBwYXJ0Jyk7XG4gICAgfVxuICB9XG4gIFxuICBwcml2YXRlIF9zZXREZWZhdWx0VmFsdWVzKCk6IHZvaWQge1xuICAgIHRoaXMuX21pbnV0ZXMgPSAwO1xuICAgIHRoaXMuX3NlY29uZHMgPSAwO1xuICAgIHRoaXMuX3NlY29uZHNBc1N0cmluZyA9ICcwMCc7XG4gICAgdGhpcy5fbWludXRlc0FzU3RyaW5nID0gJzAwJztcbiAgfVxuICBcbiAgcHJpdmF0ZSBfc2V0SW5pdGlhbFZhbHVlcyh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fbWludXRlcyA9IE1hdGguZmxvb3IodmFsdWUgLyA2MCk7XG4gICAgdGhpcy5fc2Vjb25kcyA9IHZhbHVlICUgNjA7XG4gICAgdGhpcy5fbWludXRlc0FzU3RyaW5nID0gdGhpcy5fbWludXRlcyA8IDEwID8gYDAke3RoaXMuX21pbnV0ZXN9YCA6IFN0cmluZyh0aGlzLl9taW51dGVzKTtcbiAgICB0aGlzLm1pbnV0ZXNJbnB1dEZpZWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLl9taW51dGVzQXNTdHJpbmc7XG4gICAgdGhpcy5fc2Vjb25kc0FzU3RyaW5nID0gdGhpcy5fc2Vjb25kcyA8IDEwID8gYDAke3RoaXMuX3NlY29uZHN9YCA6IFN0cmluZyh0aGlzLl9zZWNvbmRzKTtcbiAgICB0aGlzLnNlY29uZHNJbnB1dEZpZWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLl9zZWNvbmRzQXNTdHJpbmc7XG4gIH1cbiAgXG4gIHB1YmxpYyBfb25JbnB1dEtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQud2hpY2ggPT09IHRoaXMuX3NwaW5LZXlzLnVwQXJyb3cgfHwgZXZlbnQud2hpY2ggPT09IHRoaXMuX3NwaW5LZXlzLnJpZ2h0QXJyb3cpIHtcbiAgICAgIC8vIGluY3JlbWVudFxuICAgICAgdGhpcy5fc3BpbihldmVudCwgMSk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQud2hpY2ggPT09IHRoaXMuX3NwaW5LZXlzLmRvd25BcnJvdyB8fCBldmVudC53aGljaCA9PT0gdGhpcy5fc3BpbktleXMubGVmdEFycm93KSB7XG4gICAgICAvLyBkZWNyZW1lbnRcbiAgICAgIHRoaXMuX3NwaW4oZXZlbnQsIC0xKTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG4gIFxuICBwdWJsaWMgX29uSW5wdXRLZXlQcmVzcyhldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGlucHV0Q2hhciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZXZlbnQuY2hhckNvZGUpO1xuICAgIGNvbnN0IG5vdEFOdW1iZXIgPSAhdGhpcy5fa2V5UGF0dGVybi50ZXN0KGlucHV0Q2hhcik7XG4gICAgY29uc3Qgbm90QWxsb3dlZEtleSA9IHRoaXMuX2FsbG93ZWRLZXlzLmluZGV4T2YoZXZlbnQua2V5Q29kZSkgPT09IC0xO1xuICAgIGlmIChub3RBTnVtYmVyICYmIG5vdEFsbG93ZWRLZXkpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG4gIFxuICBwdWJsaWMgX29uSW5wdXRLZXl1cChldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGlucHV0VmFsdWUgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+IGV2ZW50LnRhcmdldCkudmFsdWU7XG4gICAgdGhpcy5fc2V0VmFsdWUoaW5wdXRWYWx1ZSk7XG4gICAgdGhpcy5fZm9ybWF0VmFsdWUoKTtcbiAgICBcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2UoKHRoaXMuX21pbnV0ZXMgKiA2MCkgKyB0aGlzLl9zZWNvbmRzKTtcbiAgfVxuICBcbiAgcHVibGljIF9oYW5kbGVDaGFuZ2UoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoZXZlbnQpO1xuICB9XG4gIFxuICBwdWJsaWMgX29uSW5wdXRGb2N1cyhldmVudDogS2V5Ym9hcmRFdmVudCwgaW5wdXQ6IElucHV0VHlwZSk6IHZvaWQge1xuICAgIHRoaXMuX2N1cnJlbnRJbnB1dCA9IGlucHV0O1xuICAgIHRoaXMub25Gb2N1cy5lbWl0KGV2ZW50KTtcbiAgfVxuICBcbiAgcHVibGljIF9vbklucHV0Qmx1cihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcbiAgICB0aGlzLm9uQmx1ci5lbWl0KGV2ZW50KTtcbiAgfVxuICBcbiAgcHVibGljIF9vbkJ1dHRvbk1vdXNlZG93bihldmVudDogRXZlbnQsIGRpcjogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9kaXNhYmxlZCkge1xuICAgICAgdGhpcy5faGlnaGxpZ2h0SW5wdXQoKTtcbiAgICAgIHRoaXMuX3JlcGVhdChldmVudCwgbnVsbCwgZGlyKTtcbiAgICB9XG4gIH1cbiAgXG4gIHB1YmxpYyBfb25CdXR0b25Nb3VzZXVwKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuX2NsZWFyVGltZXIoKTtcbiAgICB9XG4gIH1cbiAgXG4gIHB1YmxpYyBfb25CdXR0b25Nb3VzZWxlYXZlKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuX2NsZWFyVGltZXIoKTtcbiAgICB9XG4gIH1cbiAgXG4gIHB1YmxpYyBzZXREaXNhYmxlZFN0YXRlKHZhbDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gdmFsO1xuICB9XG4gIFxuICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMuX3NldERlZmF1bHRWYWx1ZXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2V0SW5pdGlhbFZhbHVlcyh2YWx1ZSk7XG4gICAgfVxuICB9XG4gIFxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcbiAgfVxuICBcbiAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcbiAgfVxuICBcbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9jb21wb25lbnRzL2NvbW1vbi9zaGFyZWQnO1xuaW1wb3J0IHsgVGltZVNwaW5uZXJDb21wb25lbnQgfSBmcm9tIFwiLi90aW1lLXNwaW5uZXIuY29tcG9uZW50XCI7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgU2hhcmVkTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtUaW1lU3Bpbm5lckNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtUaW1lU3Bpbm5lckNvbXBvbmVudF0sXG4gIFxufSlcbmV4cG9ydCBjbGFzcyBUaW1lU3Bpbm5lck1vZHVsZSB7XG59IiwiXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBUYWJsZSB9IGZyb20gJ3ByaW1lbmcvdGFibGUnO1xuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvYXBpJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdba3BTb3J0YWJsZUNvbHVtbl0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy51aS1zb3J0YWJsZS1jb2x1bW5dJzogJ2lzRW5hYmxlZCcsXG4gICAgICAgICdbY2xhc3MudWktc3RhdGUtaGlnaGxpZ2h0XSc6ICdzb3J0ZWQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBLUFNvcnRhYmxlQ29sdW1uIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KFwia3BTb3J0YWJsZUNvbHVtblwiKSBmaWVsZDogc3RyaW5nO1xuXG4gICAgaXNFbmFibGVkOiBib29sZWFuO1xuICAgIHNvcnRlZDogYm9vbGVhbjtcblxuICAgIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGR0OiBUYWJsZSkge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuZHQudGFibGVTZXJ2aWNlLnNvcnRTb3VyY2UkLnN1YnNjcmliZShzb3J0TWV0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNvcnRTdGF0ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVTb3J0U3RhdGUoKTtcbiAgICAgICAgdGhpcy5pc0VuYWJsZWQgPSAhIXRoaXMuZmllbGQ7XG4gICAgfVxuXG4gICAgdXBkYXRlU29ydFN0YXRlKCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc29ydGVkID0gdGhpcy5kdC5pc1NvcnRlZCh0aGlzLmZpZWxkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgICBvbkNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5kdC5zb3J0KHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICBmaWVsZDogdGhpcy5maWVsZFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICBEb21IYW5kbGVyLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBLUFNvcnRhYmxlQ29sdW1uIH0gZnJvbSAnLi9rLXAtc29ydGFibGUtY29sdW1uJztcblxuLyoqXG4gKiBAZGVwcmVjYXRlZCB1c2Ugc2VwYXJhdGVkIG1vZHVsZSBmb3IgZWFjaCBjb21wb25lbnRcbiAqL1xuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiA8YW55W10+W1xuXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IDxhbnlbXT5bXG4gICAgICAgIEtQU29ydGFibGVDb2x1bW5cbiAgICBdLFxuICAgIGV4cG9ydHM6IDxhbnlbXT5bXG4gICAgICAgIEtQU29ydGFibGVDb2x1bW5cbiAgICBdLFxuICAgIHByb3ZpZGVyczogPGFueVtdPltcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEtQVGFibGVNb2R1bGUge31cbiIsImltcG9ydCB7Q29tcG9uZW50LCBDb250ZW50Q2hpbGQsIElucHV0LCBUZW1wbGF0ZVJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2stY29sdW1uJyxcbiAgdGVtcGxhdGU6ICcnXG59KVxuZXhwb3J0IGNsYXNzIENvbHVtbkNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGZpZWxkOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHN0eWxlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGhlYWRlcjogc3RyaW5nO1xuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55Pjtcbn1cbiIsImltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsIENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCxcbiAgUXVlcnlMaXN0LCBSZW5kZXJlcjIsIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbHVtbkNvbXBvbmVudH0gZnJvbSAnLi9jb2x1bW4uY29tcG9uZW50JztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kZWxheVwiO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XG5pbXBvcnQgJ3J4anMvYWRkL29ic2VydmFibGUvZnJvbUV2ZW50JztcblxuY29uc3Qgc29ydGluZ0Z1bmN0aW9uID0gKGEsIGIpID0+IHtcbiAgaWYgKGEgPT09IGIpXG4gICAgcmV0dXJuIDA7XG4gIGVsc2UgaWYgKGEgPCBiKVxuICAgIHJldHVybiAtMTtcbiAgZWxzZVxuICAgIHJldHVybiAxO1xufTtcblxuY29uc3QgRXZlbnRzID0ge1xuICBNT1VTRV9VUDogJ21vdXNldXAnLFxuICBNT1VTRV9NT1ZFOiAnbW91c2Vtb3ZlJyxcbiAgTU9VU0VfRE9XTjogJ21vdXNlZG93bicsXG4gIE1PVVNFX09WRVI6ICdtb3VzZW92ZXInLFxuICBNT1VTRV9FTlRFUjogJ21vdXNlZW50ZXInLFxuICBNT1VTRV9MRUFWRTogJ21vdXNlbGVhdmUnXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdrLWRyYWdnYWJsZS1kYXRhLXRhYmxlJyxcbiAgdGVtcGxhdGU6IGA8dGFibGUgW25nQ2xhc3NdPVwieyAnb25EcmFnTW9kZScgOiAhZHJhZ01vZGVPZmYgfVwiPlxuICA8dGhlYWQ+XG4gIDx0cj5cbiAgICA8dGggY2xhc3M9XCJkcmFnZ2FibGUtcm93LWljb24tcGxhY2Vob2xkZXJcIj48L3RoPlxuICAgIDx0aCAqbmdJZj1cInNlbGVjdGFibGVcIiBjbGFzcz1cImRyYWdnYWJsZS1yb3ctY2hlY2stYm94XCI+XG4gICAgICA8cC1jaGVja2JveCAob25DaGFuZ2UpPVwic2VsZWN0QWxsKCRldmVudClcIj48L3AtY2hlY2tib3g+XG4gICAgPC90aD5cbiAgICA8dGQgKm5nSWY9XCJzaG93SW5kZXhcIiBjbGFzcz1cImRyYWdnYWJsZS1yb3ctaW5kZXhcIj48L3RkPlxuICAgIDx0aCAqbmdGb3I9XCJsZXQgY29sIG9mIGNvbHVtbnNcIiBbbmdTdHlsZV09XCJjb2wuc3R5bGVcIj57e2NvbC5oZWFkZXJ9fTwvdGg+XG4gIDwvdHI+XG4gIDwvdGhlYWQ+XG4gIDx0Ym9keSAjdGFibGVCb2R5PlxuXG4gIDx0ciAqbmdGb3I9XCJsZXQgcm93IG9mIGRyYWdnYWJsZUl0ZW1zO2luZGV4IGFzIGk7XCIgW2NsYXNzXT1cInJvdy5jbGFzc1wiIFtuZ0NsYXNzXT1cInsgJ2RyYWdnYWJsZS1yb3cnIDogdHJ1ZSB9XCJcbiAgICAgIChtb3VzZW92ZXIpPVwib25Nb3VzZU92ZXIoJGV2ZW50LCBpKVwiIChtb3VzZXVwKT1cIm9uTW91c2VVcCgpXCI+XG5cbiAgICA8dGQgY2xhc3M9XCJkcmFnZ2FibGUtcm93LWljb24tcGxhY2Vob2xkZXJcIiAobW91c2Vkb3duKT1cIm9uTW91c2VEb3duKCRldmVudCwgaSlcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZHJhZ2dhYmxlLXJvdy1pY29uXCI+PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJkcmFnZ2FibGUtcm93LWljb25cIj48L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImRyYWdnYWJsZS1yb3ctaWNvblwiPjwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZHJhZ2dhYmxlLXJvdy1pY29uXCI+PC9zcGFuPlxuICAgIDwvdGQ+XG4gICAgPHRkICpuZ0lmPVwic2VsZWN0YWJsZVwiIGNsYXNzPVwiZHJhZ2dhYmxlLXJvdy1jaGVjay1ib3hcIj5cbiAgICAgIDxwLWNoZWNrYm94IFt2YWx1ZV09XCJnZXRJdGVtSW5kZXgoaSlcIiBbKG5nTW9kZWwpXT1cInNlbGVjdGVkSW5kZXhlc1wiIChvbkNoYW5nZSk9XCJvblNlbGVjdGlvbkNoYW5nZSgpXCI+XG4gICAgICA8L3AtY2hlY2tib3g+XG4gICAgPC90ZD5cbiAgICA8dGQgKm5nSWY9XCJzaG93SW5kZXhcIiBjbGFzcz1cImRyYWdnYWJsZS1yb3ctaW5kZXhcIiAobW91c2Vkb3duKT1cIm9uTW91c2VEb3duKCRldmVudCwgaSlcIj5cbiAgICAgIDxzcGFuPnt7Z2V0SXRlbUluZGV4KGkpICsgMX19PC9zcGFuPlxuICAgIDwvdGQ+XG4gICAgPHRkICpuZ0Zvcj1cImxldCBjb2wgb2YgY29sdW1uc1wiIFtuZ1N0eWxlXT1cImNvbC5zdHlsZVwiIChtb3VzZWRvd24pPVwib25Nb3VzZURvd24oJGV2ZW50LCBpKVwiPlxuICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAqbmdUZW1wbGF0ZU91dGxldD1cImNvbC50ZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IGNvbCwgcm93RGF0YTogcm93LCByb3dJbmRleDogZ2V0SXRlbUluZGV4KGkpfVwiPjwvbmctY29udGFpbmVyPlxuICAgIDwvdGQ+XG4gIDwvdHI+XG4gIDwvdGJvZHk+XG48L3RhYmxlPlxuXG48ZGl2ICpuZ0lmPVwiKCEhZHJhZ2dhYmxlSXRlbXMgJiYgZHJhZ2dhYmxlSXRlbXMubGVuZ3RoID09PSAwKSB8fCAhZHJhZ2dhYmxlSXRlbXNcIlxuICAgICBjbGFzcz1cImVtcHR5LXN0YXRlLXBsYWNlaG9sZGVyXCI+XG4gIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJlbXB0eVN0YXRlVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbjwvZGl2PlxuXG48cC1wYWdpbmF0b3IgKm5nSWY9XCJwYWdpbmF0b3JcIiBbcm93c109XCJyb3dzXCIgW3RvdGFsUmVjb3Jkc109XCJ2YWx1ZSA/IHZhbHVlLmxlbmd0aCA6IDBcIlxuICAgICAgICAgICAgIFtyb3dzUGVyUGFnZU9wdGlvbnNdPVwicm93c1BlclBhZ2VPcHRpb25zXCIgKG9uUGFnZUNoYW5nZSk9XCJwYWdpbmF0ZSgkZXZlbnQpXCI+XG48L3AtcGFnaW5hdG9yPlxuXG48ZGl2ICNkcmFnZ2FibGUgW2hpZGRlbl09XCJkcmFnTW9kZU9mZlwiXG4gICAgIFtuZ0NsYXNzXT1cInsgJ211bHRpcGxlLWRyYWctYW5kLWRyb3AnIDogKG11bHRpcGxlRHJhZ0FuZERyb3AgJiYgc2VsZWN0ZWRJbmRleGVzLmxlbmd0aCA+IDEpIH1cIlxuICAgICAobW91c2V1cCk9XCJvbk1vdXNlVXAoKVwiIChtb3VzZW1vdmUpPVwib25Nb3VzZU1vdmUoJGV2ZW50KVwiPlxuICA8c3BhbiAqbmdJZj1cIm11bHRpcGxlRHJhZ0FuZERyb3AgJiYgc2VsZWN0ZWRJbmRleGVzLmxlbmd0aCA+IDFcIiBjbGFzcz1cInNlbGVjdGVkLWl0ZW1zLWNvdW50ZXJcIj57e3NlbGVjdGVkSW5kZXhlcy5sZW5ndGh9fTwvc3Bhbj5cbiAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImRyYWdnYWJsZVZpZXdUZW1wbGF0ZTsgY29udGV4dDoge2N1cnJlbnREcmFnZ2FibGVJdGVtOiBjdXJyZW50RHJhZ2dhYmxlSXRlbX1cIj5cbiAgPC9uZy1jb250YWluZXI+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2B0YWJsZXt3aWR0aDoxMDAlO3RleHQtYWxpZ246bGVmdDt0YWJsZS1sYXlvdXQ6Zml4ZWQ7Ym9yZGVyLWNvbGxhcHNlOmNvbGxhcHNlfXRhYmxlIHRoZWFke2JvcmRlcjoxcHggc29saWQgI2Q5ZDlkOTtib3JkZXItbGVmdDpub25lO2JvcmRlci1yaWdodDpub25lfXRhYmxlIHRoZWFkIHRye2hlaWdodDozMnB4O2NvbG9yOiM5OTl9dGFibGUgdGJvZHl7b3ZlcmZsb3c6YXV0b310YWJsZSB0Ym9keSB0cntoZWlnaHQ6NzBweDtiYWNrZ3JvdW5kOiNmZmY7Y29sb3I6Izk5OX10YWJsZSB0cntib3JkZXI6MXB4IHNvbGlkICNkOWQ5ZDk7Y29sb3I6IzMzMztib3JkZXItbGVmdDpub25lO2JvcmRlci1yaWdodDpub25lfS5vcGVue29wYWNpdHk6LjV9LmhvdmVyZWR7YmFja2dyb3VuZC1jb2xvcjojZWJlYmViIWltcG9ydGFudDt0ZXh0LWluZGVudDotOTk5OXB4O2JvcmRlcjpub25lIWltcG9ydGFudH0uZHJhZ2dhYmxlLXJvdy1pY29ue2Rpc3BsYXk6bm9uZTt3aWR0aDo0cHg7aGVpZ2h0OjRweDtib3JkZXItcmFkaXVzOjJweDtiYWNrZ3JvdW5kLWNvbG9yOiNjY2M7bWFyZ2luOjRweCAwIDRweCA3cHh9LmRyYWdnYWJsZS1yb3ctY2hlY2stYm94LC5kcmFnZ2FibGUtcm93LWljb24tcGxhY2Vob2xkZXIsLmRyYWdnYWJsZS1yb3ctaW5kZXh7d2lkdGg6MTVweH0uZHJhZ2dhYmxlLXJvdy1jaGVjay1ib3h7d2lkdGg6NDRweH0uZHJhZ2dhYmxlLXJvd3tjdXJzb3I6LXdlYmtpdC1ncmFiO2N1cnNvcjpncmFifS5vbkRyYWdNb2RlIC5kcmFnZ2FibGUtcm93e2N1cnNvcjotd2Via2l0LWdyYWJiaW5nO2N1cnNvcjpncmFiYmluZ30uZHJhZ2dhYmxlLXJvdzpob3ZlciAuZHJhZ2dhYmxlLXJvdy1pY29ue2Rpc3BsYXk6YmxvY2t9Lm9uRHJhZ01vZGUgLmRyYWdnYWJsZS1yb3c6aG92ZXIgLmRyYWdnYWJsZS1yb3ctaWNvbntkaXNwbGF5Om5vbmV9LmZhZGVJbnstd2Via2l0LWFuaW1hdGlvbi1uYW1lOmZhZGVJbjthbmltYXRpb24tbmFtZTpmYWRlSW47LXdlYmtpdC1hbmltYXRpb24tZHVyYXRpb246LjVzO2FuaW1hdGlvbi1kdXJhdGlvbjouNXM7LXdlYmtpdC1hbmltYXRpb24tZmlsbC1tb2RlOmJvdGg7YW5pbWF0aW9uLWZpbGwtbW9kZTpib3RofS5tdWx0aXBsZS1kcmFnLWFuZC1kcm9we2JveC1zaGFkb3c6NXB4IDVweCAwIDAgI2ZmZiw3cHggN3B4IDhweCAwIHJnYmEoNTAsNTAsNTAsLjM4KTtib3JkZXItcmFkaXVzOjJweH0uc2VsZWN0ZWQtaXRlbXMtY291bnRlcnt6LWluZGV4OjE7d2lkdGg6MjBweDtoZWlnaHQ6MjBweDtiYWNrZ3JvdW5kOiMwMGE3ODQ7ZGlzcGxheTpibG9jaztib3JkZXItcmFkaXVzOjEwcHg7Y29sb3I6I2ZmZjt0ZXh0LWFsaWduOmNlbnRlcjtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6LTEwcHg7cmlnaHQ6LTEwcHg7Zm9udC1zaXplOnNtYWxsO2xpbmUtaGVpZ2h0OjE1MCU7Zm9udC13ZWlnaHQ6NzAwfS5lbXB0eS1zdGF0ZS1wbGFjZWhvbGRlcnt0ZXh0LWFsaWduOmNlbnRlcn1ALXdlYmtpdC1rZXlmcmFtZXMgZmFkZUluezAle29wYWNpdHk6MH0xMDAle29wYWNpdHk6MX19QGtleWZyYW1lcyBmYWRlSW57MCV7b3BhY2l0eTowfTEwMCV7b3BhY2l0eToxfX1gXVxufSlcbmV4cG9ydCBjbGFzcyBEcmFnZ2FibGVEYXRhVGFibGVDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkluaXQge1xuXG4gIEBJbnB1dCgpIGVtcHR5U3RhdGVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBASW5wdXQoKSBkcmFnZ2FibGVWaWV3VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQE91dHB1dCgpIHZhbHVlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55W10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnlbXT4oKTtcblxuICBAVmlld0NoaWxkKCdkcmFnZ2FibGUnKSBwcml2YXRlIGRyYWdnYWJsZUVsZW1lbnQ6IEVsZW1lbnRSZWY7XG5cbiAgQFZpZXdDaGlsZCgndGFibGVCb2R5JykgcHJpdmF0ZSB0YWJsZUJvZHk6IEVsZW1lbnRSZWY7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihDb2x1bW5Db21wb25lbnQpIGNvbHM6IFF1ZXJ5TGlzdDxDb2x1bW5Db21wb25lbnQ+O1xuXG4gIGN1cnJlbnREcmFnZ2FibGVJdGVtOiBhbnk7XG5cbiAgZHJhZ2dhYmxlOiBhbnk7XG5cbiAgdGFibGVCb2R5RWxlbWVudDogYW55O1xuXG4gIGNvbHVtbnM6IENvbHVtbkNvbXBvbmVudFtdO1xuXG4gIGRyYWdNb2RlT2ZmOiBib29sZWFuID0gdHJ1ZTtcblxuICBzZWxlY3RlZEluZGV4ZXM6IG51bWJlcltdID0gW107XG5cbiAgbW91c2VNb3ZlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgbW91c2VNb3ZlOiBPYnNlcnZhYmxlPGFueT47XG5cbiAgcHJpdmF0ZSBfdmFsdWU6IGFueVtdO1xuXG4gIHB1YmxpYyBkcmFnZ2FibGVJdGVtczogYW55W107XG5cbiAgcHVibGljIHVuRHJhZ2dhYmxlSXRlbXNGcm9tVG9wOiBhbnlbXTtcblxuICBwdWJsaWMgdW5EcmFnZ2FibGVJdGVtc0Zyb21Cb3R0b206IGFueVtdO1xuXG4gIHByaXZhdGUgX2N1cnJlbnREcmFnZ2VkSW5kZXg6IG51bWJlcjtcblxuICBwcml2YXRlIF9jdXJyZW50UGxhY2VIb2xkZXJJbmRleDogbnVtYmVyID0gLTE7XG5cbiAgcHJpdmF0ZSBfY3VycmVudERyYWdnZWRFbGVtZW50OiBFdmVudFRhcmdldDtcblxuICBwcml2YXRlIF9kcm9wQXZhaWxhYmxlID0gZmFsc2U7XG5cbiAgQElucHV0KCkgc2V0IHZhbHVlKHZhbDogYW55W10pIHtcbiAgICBpZiAodmFsKSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IFsuLi52YWxdO1xuICAgICAgdGhpcy5fb3JkZXJJdGVtcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHZhbHVlKCk6IGFueVtdIHtcbiAgICBpZiAodGhpcy5kcmFnTW9kZU9mZikge1xuICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cbiAgfVxuXG5cbiAgQElucHV0KCkgdW5EcmFnZ2FibGVGcm9tVG9wID0gMDtcblxuICBASW5wdXQoKSB1bkRyYWdnYWJsZUZyb21Cb3R0b20gPSAwO1xuXG4gIEBJbnB1dCgpIHJvd1RyYWNrQnk6IEZ1bmN0aW9uID0gKGluZGV4OiBudW1iZXIsIGl0ZW06IGFueSkgPT4gaXRlbTtcblxuICBASW5wdXQoKSBjb2x1bW5UcmFja0J5OiBGdW5jdGlvbiA9IChpbmRleDogbnVtYmVyLCBpdGVtOiBhbnkpID0+IGl0ZW07XG5cbiAgQElucHV0KCkgcGFnaW5hdG9yOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KCkgcm93czogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIHJvd3NQZXJQYWdlT3B0aW9uczogbnVtYmVyW107XG5cbiAgQElucHV0KCkgc2hvd0luZGV4OiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KCkgbXVsdGlwbGVEcmFnQW5kRHJvcDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIHNlbGVjdGFibGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBAT3V0cHV0KCkgc2VsZWN0aW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55W10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnlbXT4oKTtcblxuICBAT3V0cHV0KCkgcGFnZUNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICB9XG5cbiAgLy8gY29tcG9uZW50IGxpZmVjeWNsZSBldmVudHNcbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYodGhpcy5wYWdpbmF0b3IpIHtcbiAgICAgIHRoaXMudW5EcmFnZ2FibGVGcm9tQm90dG9tID0gdGhpcy5yb3dzO1xuICAgIH1cblxuICAgIHRoaXMuX29yZGVySXRlbXMoKTtcbiAgICB0aGlzLmRyYWdnYWJsZSA9IHRoaXMuZHJhZ2dhYmxlRWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMudGFibGVCb2R5RWxlbWVudCA9IHRoaXMudGFibGVCb2R5Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5tb3VzZU1vdmUgPSBPYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgRXZlbnRzLk1PVVNFX01PVkUpLmRlbGF5KDUwKTtcblxuICAgIC8vIGNvdmVyIG5vbi1wZXJtaXR0ZWQgZHJhZ2dpbmcvZHJvcHBpbmc6XG4gICAgT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsIEV2ZW50cy5NT1VTRV9VUCkuc3Vic2NyaWJlKCgpID0+IHRoaXMub25Nb3VzZVVwKCkpO1xuICAgIE9ic2VydmFibGUuZnJvbUV2ZW50KHRoaXMudGFibGVCb2R5Lm5hdGl2ZUVsZW1lbnQsIEV2ZW50cy5NT1VTRV9MRUFWRSkuc3Vic2NyaWJlKCgpID0+IHRoaXMuX29uTW91c2VMZWF2ZSgpKTtcbiAgICBPYnNlcnZhYmxlLmZyb21FdmVudCh0aGlzLnRhYmxlQm9keS5uYXRpdmVFbGVtZW50LCBFdmVudHMuTU9VU0VfRU5URVIpLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9vbk1vdXNlRW50ZXIoKSk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5jb2x1bW5zID0gdGhpcy5jb2xzLnRvQXJyYXkoKTtcbiAgfVxuXG4gIC8vIHB1YmxpYyBBUEkgbWV0aG9kc1xuICBvbk1vdXNlTW92ZShldmVudDogTW91c2VFdmVudCkge1xuICAgIHRoaXMuX3VwZGF0ZURyYWdnYWJsZShldmVudCk7XG4gIH1cblxuICBvbk1vdXNlT3ZlcihldmVudDogYW55LCBpbmRleDogbnVtYmVyKSB7XG5cbiAgICAvLyBvbmx5IGZvciBEJkQgbW9kZTpcbiAgICBpZiAoIXRoaXMuZHJhZ01vZGVPZmYgJiYgaW5kZXggIT09IHRoaXMuX2N1cnJlbnRQbGFjZUhvbGRlckluZGV4KSB7XG5cbiAgICAgIC8vIGdldCBtb3VzZSBsb2NhdGlvbiB0byByZWNvZ25pemUgd2hlcmUgdG8gYWRkIHRoZSBwbGFjZWhvbGRlciAoZnJvbSB0b3Agb3IgYm90dG9tKTpcbiAgICAgIGNvbnN0IG1pZGRsZTogbnVtYmVyID0gZXZlbnQuY3VycmVudFRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyAoZXZlbnQuY3VycmVudFRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQgLyAyKTtcbiAgICAgIGNvbnN0IGhvdmVyZWRSb3cgPSBPYmplY3QuY3JlYXRlKE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzLmRyYWdnYWJsZUl0ZW1zW2luZGV4XSkpO1xuICAgICAgT2JqZWN0LmFzc2lnbihob3ZlcmVkUm93LCB0aGlzLmRyYWdnYWJsZUl0ZW1zW2luZGV4XSk7XG5cbiAgICAgIC8vIGRlbGV0ZSBwcmV2aW91czpcbiAgICAgIGlmICh0aGlzLl9jdXJyZW50UGxhY2VIb2xkZXJJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgdGhpcy5kcmFnZ2FibGVJdGVtcy5zcGxpY2UodGhpcy5fY3VycmVudFBsYWNlSG9sZGVySW5kZXgsIDEpO1xuICAgICAgfVxuXG4gICAgICAvLyBhZGQgcGxhY2Vob2xkZXIgZnJvbSB0aGUgYm90dG9tOlxuICAgICAgaWYgKGV2ZW50LmNsaWVudFkgPiBtaWRkbGUpIHtcbiAgICAgICAgdGhpcy5fY3VycmVudFBsYWNlSG9sZGVySW5kZXggPSBpbmRleCArIDE7XG4gICAgICAgIHRoaXMuZHJhZ2dhYmxlSXRlbXMuc3BsaWNlKHRoaXMuX2N1cnJlbnRQbGFjZUhvbGRlckluZGV4LCAwLCBob3ZlcmVkUm93KTtcbiAgICAgICAgdGhpcy5kcmFnZ2FibGVJdGVtc1t0aGlzLl9jdXJyZW50UGxhY2VIb2xkZXJJbmRleF0uY2xhc3MgPSAnaG92ZXJlZCc7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVZpZXcoKTtcbiAgICAgIH0gZWxzZSB7IC8vIGFkZCBwbGFjZWhvbGRlciBmcm9tIHRoZSB0b3A6XG4gICAgICAgIHRoaXMuX2N1cnJlbnRQbGFjZUhvbGRlckluZGV4ID0gaW5kZXg7XG4gICAgICAgIHRoaXMuZHJhZ2dhYmxlSXRlbXMuc3BsaWNlKHRoaXMuX2N1cnJlbnRQbGFjZUhvbGRlckluZGV4LCAwLCBob3ZlcmVkUm93KTtcbiAgICAgICAgdGhpcy5kcmFnZ2FibGVJdGVtc1t0aGlzLl9jdXJyZW50UGxhY2VIb2xkZXJJbmRleF0uY2xhc3MgPSAnaG92ZXJlZCc7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVZpZXcoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbk1vdXNlRG93bihldmVudDogTW91c2VFdmVudCwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIC8vIG9ubHkgbGVmdCBidXR0b24gbW91c2UgY2xpY2tcbiAgICBpZiAoZXZlbnQud2hpY2ggPT09IDEpIHtcbiAgICAgIGlmICh0aGlzLm11bHRpcGxlRHJhZ0FuZERyb3ApIHtcblxuICAgICAgICAvLyBzaWduIGRyYWdnYWJsZSBpdGVtIGFzICdjaGVja2VkJyBpZiBpdCdzIG5vdDpcbiAgICAgICAgY29uc3QgY3VycmVudENsaWNrZWRJbmRleCA9IHRoaXMuZ2V0SXRlbUluZGV4KGluZGV4KTtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRJbmRleGVzLmluZGV4T2YoY3VycmVudENsaWNrZWRJbmRleCkgPT09IC0xKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ZXMgPSBbY3VycmVudENsaWNrZWRJbmRleCwgLi4udGhpcy5zZWxlY3RlZEluZGV4ZXNdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZWRnZS1jYXNlIHdoZW4gYWxsIGl0ZW1zIGFyZSBzZWxlY3RlZCAtIGQmZCBzaG91bGQgYmUgZGlzYWJsZWRcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRJbmRleGVzLmxlbmd0aCA9PT0gdGhpcy5fdmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ZXMuZm9yRWFjaChpbmRleCA9PiB0aGlzLl92YWx1ZVtpbmRleF0uY2xhc3MgPSAnb3BlbicpO1xuICAgICAgICB0aGlzLl92YWx1ZSA9IFsuLi50aGlzLl92YWx1ZV07XG4gICAgICB9XG5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLmN1cnJlbnREcmFnZ2FibGVJdGVtID0gdGhpcy5kcmFnZ2FibGVJdGVtc1tpbmRleF07XG4gICAgICB0aGlzLl91cGRhdGVEcmFnZ2FibGUoZXZlbnQpO1xuICAgICAgdGhpcy5kcmFnTW9kZU9mZiA9IGZhbHNlO1xuICAgICAgdGhpcy5fY3VycmVudERyYWdnZWRJbmRleCA9IGluZGV4O1xuICAgICAgdGhpcy5fY3VycmVudERyYWdnZWRFbGVtZW50ID0gZXZlbnQuY3VycmVudFRhcmdldDtcbiAgICAgIHRoaXMuX2N1cnJlbnREcmFnZ2VkRWxlbWVudFsnY2xhc3NMaXN0J10uYWRkKCdvcGVuJyk7XG4gICAgICB0aGlzLm1vdXNlTW92ZVN1YnNjcmlwdGlvbiA9IHRoaXMubW91c2VNb3ZlLnN1YnNjcmliZSgoZTogTW91c2VFdmVudCkgPT4gdGhpcy5vbk1vdXNlTW92ZShlKSk7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZHJhZ2dhYmxlLCAnZmFkZUluJyk7XG4gICAgfVxuICB9XG5cbiAgb25Nb3VzZVVwKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5kcmFnTW9kZU9mZikge1xuICAgICAgdGhpcy5kcmFnTW9kZU9mZiA9IHRydWU7XG4gICAgICB0aGlzLl9jdXJyZW50RHJhZ2dlZEVsZW1lbnRbJ2NsYXNzTGlzdCddLnJlbW92ZSgnb3BlbicpO1xuICAgICAgdGhpcy5fdmFsdWUuZm9yRWFjaChpdGVtID0+IGRlbGV0ZSBpdGVtWydjbGFzcyddKTtcbiAgICAgIHRoaXMubW91c2VNb3ZlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGRvY3VtZW50LmJvZHksICdjdXJzb3InLCAnZGVmYXVsdCcpO1xuXG4gICAgICBpZiAodGhpcy5fZHJvcEF2YWlsYWJsZSkge1xuICAgICAgICBpZiAodGhpcy5fY3VycmVudFBsYWNlSG9sZGVySW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgaWYgKHRoaXMubXVsdGlwbGVEcmFnQW5kRHJvcCkge1xuXG4gICAgICAgICAgICAvLyBzYXZlIGl0ZW0gb2YgdGhpcy5fY3VycmVudFBsYWNlSG9sZGVySW5kZXggLSB3ZSdsbCBuZWVkIHRoaXMgaXRlbSB0byBmaW5kIHRoZSBlbnRyeS1wb2ludDpcbiAgICAgICAgICAgIGxldCBpbnNlcnRJbmRleFJlZmVyZW5jZSA9IHRoaXMuZHJhZ2dhYmxlSXRlbXNbdGhpcy5fY3VycmVudFBsYWNlSG9sZGVySW5kZXhdO1xuXG4gICAgICAgICAgICAvLyBzYXZlIGFsbCBkcmFnZ2VkIGl0ZW1zIGFzaWRlOlxuICAgICAgICAgICAgY29uc3QgZHJhZ2dlZEl0ZW1zOiBhbnlbXSA9IHRoaXMuc2VsZWN0ZWRJbmRleGVzLnNvcnQoc29ydGluZ0Z1bmN0aW9uKS5tYXA8YW55PihpbmRleCA9PiB0aGlzLl92YWx1ZVtpbmRleCArICgoaW5kZXggPj0gdGhpcy5fY3VycmVudFBsYWNlSG9sZGVySW5kZXgpID8gMSA6IDApXSk7XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSBkcmFnZ2VkIChzZWxlY3RlZCBpdGVtcykgZnJvbSB0aGUgb3JpZ2luYWwgZGF0YTpcbiAgICAgICAgICAgIGRyYWdnZWRJdGVtcy5mb3JFYWNoKGl0ZW0gPT4gdGhpcy5fdmFsdWUuc3BsaWNlKHRoaXMuX3ZhbHVlLmluZGV4T2YoaXRlbSksIDEpKTtcblxuICAgICAgICAgICAgLy8gaW5zZXJ0IGRyYWdnYWJsZSBpdGVtcyBiYWNrIHRvIHRoZSBvcmlnaW5hbCBkYXRhIGJ1dCB3aXRoIG5ldyBvcmRlcjpcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlLnNwbGljZSh0aGlzLl92YWx1ZS5pbmRleE9mKGluc2VydEluZGV4UmVmZXJlbmNlKSwgMSwgLi4uZHJhZ2dlZEl0ZW1zKTtcblxuICAgICAgICAgICAgLy8gaW5pdGlhdGUgc3RhdGU6XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50UGxhY2VIb2xkZXJJbmRleCA9IC0xO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ZXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX29yZGVySXRlbXMoKTtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVZpZXcoKTtcbiAgICAgICAgICAgIHRoaXMub25TZWxlY3Rpb25DaGFuZ2UoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBidWZmZXI6IG51bWJlciA9ICh0aGlzLl9jdXJyZW50RHJhZ2dlZEluZGV4ID49IHRoaXMuX2N1cnJlbnRQbGFjZUhvbGRlckluZGV4KSA/IDEgOiAwO1xuICAgICAgICAgICAgLy8gaW5zZXJ0IGRyYWdnZWQgaXRlbSB0byB0aGUgbmV3IGxvY2F0aW9uOlxuICAgICAgICAgICAgdGhpcy5kcmFnZ2FibGVJdGVtc1t0aGlzLl9jdXJyZW50UGxhY2VIb2xkZXJJbmRleF0gPSB0aGlzLmRyYWdnYWJsZUl0ZW1zW3RoaXMuX2N1cnJlbnREcmFnZ2VkSW5kZXggKyBidWZmZXJdO1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgZHJhZ2dlZCBpdGVtIHByZXZpb3VzIGxvY2F0aW9uICYgdXBkYXRlIHZpZXc6XG4gICAgICAgICAgICB0aGlzLmRyYWdnYWJsZUl0ZW1zLnNwbGljZSh0aGlzLl9jdXJyZW50RHJhZ2dlZEluZGV4ICsgYnVmZmVyLCAxKTtcblxuICAgICAgICAgICAgLy8gaW5pdGlhdGUgc3RhdGU6XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50UGxhY2VIb2xkZXJJbmRleCA9IC0xO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlVmlldygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdW5kcm9wcGFibGUgYXJlYSAtIGluaXRpYXRlIHN0YXRlOlxuICAgICAgICB0aGlzLmRyYWdnYWJsZUl0ZW1zLnNwbGljZSh0aGlzLl9jdXJyZW50UGxhY2VIb2xkZXJJbmRleCwgMSk7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRQbGFjZUhvbGRlckluZGV4ID0gLTE7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleGVzID0gW107XG4gICAgICAgIHRoaXMub25TZWxlY3Rpb25DaGFuZ2UoKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlVmlldygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHBhZ2luYXRlKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLnVuRHJhZ2dhYmxlRnJvbVRvcCA9IGV2ZW50LmZpcnN0O1xuICAgIHRoaXMudW5EcmFnZ2FibGVGcm9tQm90dG9tID0gKGV2ZW50LmZpcnN0ICsgZXZlbnQucm93cyk7XG4gICAgdGhpcy52YWx1ZSA9IFsuLi50aGlzLnVuRHJhZ2dhYmxlSXRlbXNGcm9tVG9wLCAuLi50aGlzLmRyYWdnYWJsZUl0ZW1zLCAuLi50aGlzLnVuRHJhZ2dhYmxlSXRlbXNGcm9tQm90dG9tXTtcbiAgICB0aGlzLnBhZ2VDaGFuZ2UuZW1pdChldmVudCk7XG4gIH1cblxuICBzZWxlY3RBbGwoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0ZWRJbmRleGVzID0gKGV2ZW50KSA/IFsuLi5BcnJheS5mcm9tKEFycmF5KHRoaXMuX3ZhbHVlLmxlbmd0aCksIChfLHgpID0+IHgpXSA6IFtdO1xuICAgIHRoaXMub25TZWxlY3Rpb25DaGFuZ2UoKTtcbiAgfVxuXG4gIG9uU2VsZWN0aW9uQ2hhbmdlKCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3RlZEluZGV4ZXMuc29ydChzb3J0aW5nRnVuY3Rpb24pLm1hcChpbmRleCA9PiB0aGlzLl92YWx1ZVtpbmRleF0pKTtcbiAgfVxuXG4gIGdldEl0ZW1JbmRleChpbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWUuaW5kZXhPZih0aGlzLmRyYWdnYWJsZUl0ZW1zW2luZGV4XSk7XG4gIH1cblxuICAvLyBwcml2YXRlIG1ldGhvZHNcbiAgcHJpdmF0ZSBfdXBkYXRlVmlldygpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gKHRoaXMucGFnaW5hdG9yKSA/IFsuLi50aGlzLnVuRHJhZ2dhYmxlSXRlbXNGcm9tVG9wLCAuLi50aGlzLmRyYWdnYWJsZUl0ZW1zLCAuLi50aGlzLnVuRHJhZ2dhYmxlSXRlbXNGcm9tQm90dG9tXSA6IFsuLi50aGlzLmRyYWdnYWJsZUl0ZW1zXTtcbiAgICBpZiAodGhpcy5kcmFnTW9kZU9mZikgeyB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodGhpcy52YWx1ZSk7IH1cbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZURyYWdnYWJsZShldmVudDogTW91c2VFdmVudCkge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5kcmFnZ2FibGUsICdwb3NpdGlvbicsICdmaXhlZCcpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5kcmFnZ2FibGUsICdsZWZ0JywgZXZlbnQuY2xpZW50WCArIDIwICsgJ3B4Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmRyYWdnYWJsZSwgJ3RvcCcsIGV2ZW50LmNsaWVudFkgLSAzNSArICdweCcpO1xuICB9XG5cbiAgcHJpdmF0ZSBfb25Nb3VzZUxlYXZlKCk6IHZvaWQge1xuICAgIHRoaXMuX2Ryb3BBdmFpbGFibGUgPSBmYWxzZTtcbiAgICBpZiAoIXRoaXMuZHJhZ01vZGVPZmYpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZG9jdW1lbnQuYm9keSwgJ2N1cnNvcicsICduby1kcm9wJyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfb25Nb3VzZUVudGVyKCk6IHZvaWQge1xuICAgIHRoaXMuX2Ryb3BBdmFpbGFibGUgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfb3JkZXJJdGVtcygpIHtcbiAgICBpZiAoISF0aGlzLnZhbHVlKSB7XG4gICAgICBpZiAodGhpcy5wYWdpbmF0b3IpIHtcbiAgICAgICAgLy8gb25jZSB1c2luZyBkJmQgd2l0aCBwYWdpbmF0aW9uIHBhZ2Utc2l6ZSBoYXMgdG8gYmUgaW5jcmVhc2VkIGJ5IDEgYmVjYXVzZSBvZiB0aGUgYWRkZWQgcGxhY2Vob2xkZXJcbiAgICAgICAgY29uc3QgYnVmZmVyID0gKHRoaXMuX2N1cnJlbnRQbGFjZUhvbGRlckluZGV4ID09PSAtMSkgPyAwIDogMTtcblxuICAgICAgICB0aGlzLnVuRHJhZ2dhYmxlSXRlbXNGcm9tVG9wID0gWy4uLnRoaXMudmFsdWUuc2xpY2UoMCwgdGhpcy51bkRyYWdnYWJsZUZyb21Ub3ApXTtcbiAgICAgICAgdGhpcy51bkRyYWdnYWJsZUl0ZW1zRnJvbUJvdHRvbSA9IFsuLi50aGlzLnZhbHVlLnNsaWNlKHRoaXMudW5EcmFnZ2FibGVGcm9tQm90dG9tICsgYnVmZmVyKV07XG4gICAgICAgIHRoaXMuZHJhZ2dhYmxlSXRlbXMgPSBbLi4udGhpcy52YWx1ZS5zbGljZSh0aGlzLnVuRHJhZ2dhYmxlRnJvbVRvcCwgdGhpcy51bkRyYWdnYWJsZUZyb21Cb3R0b20gKyBidWZmZXIpXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZHJhZ2dhYmxlSXRlbXMgPSBbLi4udGhpcy52YWx1ZV07XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtEcmFnZ2FibGVEYXRhVGFibGVDb21wb25lbnR9IGZyb20gXCIuL2RyYWdnYWJsZS1kYXRhLXRhYmxlLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtDb2x1bW5Db21wb25lbnR9IGZyb20gXCIuL2NvbHVtbi5jb21wb25lbnRcIjtcbmltcG9ydCB7Q2hlY2tib3hNb2R1bGV9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XG5pbXBvcnQge1BhZ2luYXRvck1vZHVsZX0gZnJvbSBcInByaW1lbmcvcHJpbWVuZ1wiO1xuXG5cbkBOZ01vZHVsZShcbiAge1xuICAgIGltcG9ydHM6IFtcbiAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgIENoZWNrYm94TW9kdWxlLFxuICAgICAgUGFnaW5hdG9yTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgIERyYWdnYWJsZURhdGFUYWJsZUNvbXBvbmVudCxcbiAgICAgIENvbHVtbkNvbXBvbmVudFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgRHJhZ2dhYmxlRGF0YVRhYmxlQ29tcG9uZW50LFxuICAgICAgQ29sdW1uQ29tcG9uZW50XG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtdXG4gIH1cbilcbmV4cG9ydCBjbGFzcyBEcmFnZ2FibGVEYXRhVGFibGVNb2R1bGUge1xuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRHJvcGRvd24gfSBmcm9tICdwcmltZW5nL2NvbXBvbmVudHMvZHJvcGRvd24vZHJvcGRvd24nO1xuaW1wb3J0IHsgYW5pbWF0ZSwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBTZWxlY3RJdGVtIH0gZnJvbSAncHJpbWVuZy9jb21wb25lbnRzL2NvbW1vbi9zZWxlY3RpdGVtJztcblxuZXhwb3J0IGNvbnN0IERST1BET1dOX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEcm9wZG93bkNvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2tEcm9wZG93bicsXG4gIHRlbXBsYXRlOiBgPGRpdiAjY29udGFpbmVyIFtuZ0NsYXNzXT1cInsndWktZHJvcGRvd24gdWktd2lkZ2V0IHVpLXN0YXRlLWRlZmF1bHQgdWktY29ybmVyLWFsbCB1aS1oZWxwZXItY2xlYXJmaXgnOnRydWUsXG4gICAgICAgICAgICAndWktc3RhdGUtZGlzYWJsZWQnOmRpc2FibGVkLCd1aS1kcm9wZG93bi1vcGVuJzpvdmVybGF5VmlzaWJsZSwndWktc3RhdGUtZm9jdXMnOmZvY3VzZWQsICd1aS1kcm9wZG93bi1jbGVhcmFibGUnOiBzaG93Q2xlYXIgJiYgIWRpc2FibGVkfVwiXG4gICAgIChjbGljayk9XCJvbk1vdXNlY2xpY2soJGV2ZW50KVwiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cbiAgPGRpdiBjbGFzcz1cInVpLWhlbHBlci1oaWRkZW4tYWNjZXNzaWJsZVwiICpuZ0lmPVwiYXV0b1dpZHRoXCI+XG4gICAgPHNlbGVjdCBbcmVxdWlyZWRdPVwicmVxdWlyZWRcIiBbYXR0ci5uYW1lXT1cIm5hbWVcIiBbYXR0ci5hcmlhLWxhYmVsXT1cInNlbGVjdGVkT3B0aW9uID8gc2VsZWN0ZWRPcHRpb24ubGFiZWwgOiAnICdcIiB0YWJpbmRleD1cIi0xXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICA8b3B0aW9uICpuZ0lmPVwicGxhY2Vob2xkZXJcIj57e3BsYWNlaG9sZGVyfX08L29wdGlvbj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJncm91cFwiPlxuICAgICAgICA8b3B0Z3JvdXAgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBvcHRpb25zXCIgW2F0dHIubGFiZWxdPVwib3B0aW9uLmxhYmVsXCI+XG4gICAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIG9wdGlvbi5pdGVtc1wiIFt2YWx1ZV09XCJvcHRpb24udmFsdWVcIiBbc2VsZWN0ZWRdPVwic2VsZWN0ZWRPcHRpb24gPT0gb3B0aW9uXCI+e3tvcHRpb24ubGFiZWx9fTwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRncm91cD5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFncm91cFwiPlxuICAgICAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCBvcHRpb24gb2Ygb3B0aW9uc1wiIFt2YWx1ZV09XCJvcHRpb24udmFsdWVcIiBbc2VsZWN0ZWRdPVwic2VsZWN0ZWRPcHRpb24gPT0gb3B0aW9uXCI+e3tvcHRpb24ubGFiZWx9fTwvb3B0aW9uPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9zZWxlY3Q+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwidWktaGVscGVyLWhpZGRlbi1hY2Nlc3NpYmxlXCI+XG4gICAgPGlucHV0ICNpbiBbYXR0ci5pZF09XCJpbnB1dElkXCIgdHlwZT1cInRleHRcIiBbYXR0ci5hcmlhLWxhYmVsXT1cInNlbGVjdGVkT3B0aW9uID8gc2VsZWN0ZWRPcHRpb24ubGFiZWwgOiAnICdcIiByZWFkb25seSAoZm9jdXMpPVwib25JbnB1dEZvY3VzKCRldmVudClcIiByb2xlPVwibGlzdGJveFwiXG4gICAgICAgICAgIChibHVyKT1cIm9uSW5wdXRCbHVyKCRldmVudClcIiAoa2V5ZG93bik9XCJvbktleWRvd24oJGV2ZW50LCB0cnVlKVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIFthdHRyLnRhYmluZGV4XT1cInRhYmluZGV4XCIgW2F0dHIuYXV0b2ZvY3VzXT1cImF1dG9mb2N1c1wiPlxuICA8L2Rpdj5cbiAgPGxhYmVsIFtuZ0NsYXNzXT1cInsndWktZHJvcGRvd24tbGFiZWwgdWktaW5wdXR0ZXh0IHVpLWNvcm5lci1hbGwnOnRydWUsJ3VpLWRyb3Bkb3duLWxhYmVsLWVtcHR5JzoobGFiZWwgPT0gbnVsbCB8fCBsYWJlbC5sZW5ndGggPT09IDApfVwiICpuZ0lmPVwiIWVkaXRhYmxlICYmIChsYWJlbCAhPSBudWxsKVwiPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhc2VsZWN0ZWRJdGVtVGVtcGxhdGVcIj57e2xhYmVsfHwnZW1wdHknfX08L25nLWNvbnRhaW5lcj5cbiAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwic2VsZWN0ZWRJdGVtVGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IHNlbGVjdGVkT3B0aW9ufVwiPjwvbmctY29udGFpbmVyPlxuICA8L2xhYmVsPlxuICA8bGFiZWwgW25nQ2xhc3NdPVwieyd1aS1kcm9wZG93bi1sYWJlbCB1aS1pbnB1dHRleHQgdWktY29ybmVyLWFsbCB1aS1wbGFjZWhvbGRlcic6dHJ1ZSwndWktZHJvcGRvd24tbGFiZWwtZW1wdHknOiAocGxhY2Vob2xkZXIgPT0gbnVsbCB8fCBwbGFjZWhvbGRlci5sZW5ndGggPT09IDApfVwiICpuZ0lmPVwiIWVkaXRhYmxlICYmIChsYWJlbCA9PSBudWxsKVwiPnt7cGxhY2Vob2xkZXJ8fCdlbXB0eSd9fTwvbGFiZWw+XG4gIDxpbnB1dCAjZWRpdGFibGVJbnB1dCB0eXBlPVwidGV4dFwiIFthdHRyLmFyaWEtbGFiZWxdPVwic2VsZWN0ZWRPcHRpb24gPyBzZWxlY3RlZE9wdGlvbi5sYWJlbCA6ICcgJ1wiIGNsYXNzPVwidWktZHJvcGRvd24tbGFiZWwgdWktaW5wdXR0ZXh0IHVpLWNvcm5lci1hbGxcIiAqbmdJZj1cImVkaXRhYmxlXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgW2F0dHIucGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICAgICAgICAgKGNsaWNrKT1cIm9uRWRpdGFibGVJbnB1dENsaWNrKCRldmVudClcIiAoaW5wdXQpPVwib25FZGl0YWJsZUlucHV0Q2hhbmdlKCRldmVudClcIiAoZm9jdXMpPVwib25FZGl0YWJsZUlucHV0Rm9jdXMoJGV2ZW50KVwiIChibHVyKT1cIm9uSW5wdXRCbHVyKCRldmVudClcIj5cbiAgPGkgY2xhc3M9XCJ1aS1kcm9wZG93bi1jbGVhci1pY29uIHBpIHBpLXRpbWVzXCIgKGNsaWNrKT1cImNsZWFyKCRldmVudClcIiAqbmdJZj1cInZhbHVlICE9IG51bGwgJiYgc2hvd0NsZWFyICYmICFkaXNhYmxlZFwiPjwvaT5cbiAgPGRpdiBjbGFzcz1cInVpLWRyb3Bkb3duLXRyaWdnZXIgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItcmlnaHRcIj5cbiAgICA8c3BhbiBjbGFzcz1cInVpLWRyb3Bkb3duLXRyaWdnZXItaWNvbiB1aS1jbGlja2FibGVcIiBbbmdDbGFzc109XCJkcm9wZG93bkljb25cIj48L3NwYW4+XG4gIDwvZGl2PlxuICA8ZGl2ICNwYW5lbCBbbmdDbGFzc109XCIndWktZHJvcGRvd24tcGFuZWwgdWktd2lkZ2V0LWNvbnRlbnQgdWktY29ybmVyLWFsbCB1aS1zaGFkb3cnXCIgW0BwYW5lbFN0YXRlXT1cIm92ZXJsYXlWaXNpYmxlID8gJ3Zpc2libGUnIDogJ2hpZGRlbidcIlxuICAgICAgIFtzdHlsZS5kaXNwbGF5XT1cIm92ZXJsYXlWaXNpYmxlID8gJ2Jsb2NrJyA6ICdub25lJ1wiIFtuZ1N0eWxlXT1cInBhbmVsU3R5bGVcIiBbY2xhc3NdPVwicGFuZWxTdHlsZUNsYXNzXCI+XG4gICAgPGRpdiAqbmdJZj1cImZpbHRlclwiIGNsYXNzPVwidWktZHJvcGRvd24tZmlsdGVyLWNvbnRhaW5lclwiIChpbnB1dCk9XCJvbkZpbHRlcigkZXZlbnQpXCIgKGNsaWNrKT1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiPlxuICAgICAgPGlucHV0ICNmaWx0ZXIgdHlwZT1cInRleHRcIiBhdXRvY29tcGxldGU9XCJvZmZcIiBjbGFzcz1cInVpLWRyb3Bkb3duLWZpbHRlciB1aS1pbnB1dHRleHQgdWktd2lkZ2V0IHVpLXN0YXRlLWRlZmF1bHQgdWktY29ybmVyLWFsbFwiIFthdHRyLnBsYWNlaG9sZGVyXT1cImZpbHRlclBsYWNlaG9sZGVyXCJcbiAgICAgICAgICAgICAoa2V5ZG93bi5lbnRlcik9XCIkZXZlbnQucHJldmVudERlZmF1bHQoKVwiIChrZXlkb3duKT1cIm9uS2V5ZG93bigkZXZlbnQsIGZhbHNlKVwiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1kcm9wZG93bi1maWx0ZXItaWNvbiBwaSBwaS1zZWFyY2hcIj48L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgPGRpdiAjaXRlbXN3cmFwcGVyIGNsYXNzPVwidWktZHJvcGRvd24taXRlbXMtd3JhcHBlclwiIFtzdHlsZS5tYXgtaGVpZ2h0XT1cInNjcm9sbEhlaWdodHx8J2F1dG8nXCI+XG4gICAgICA8dWwgY2xhc3M9XCJ1aS1kcm9wZG93bi1pdGVtcyB1aS1kcm9wZG93bi1saXN0IHVpLXdpZGdldC1jb250ZW50IHVpLXdpZGdldCB1aS1jb3JuZXItYWxsIHVpLWhlbHBlci1yZXNldFwiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZ3JvdXBcIj5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LW9wdGdyb3VwIFtuZ0Zvck9mXT1cIm9wdGlvbnNUb0Rpc3BsYXlcIj5cbiAgICAgICAgICAgIDxsaSBjbGFzcz1cInVpLWRyb3Bkb3duLWl0ZW0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCIhZ3JvdXBUZW1wbGF0ZVwiPnt7b3B0Z3JvdXAubGFiZWx8fCdlbXB0eSd9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImdyb3VwVGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IG9wdGdyb3VwfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpdGVtc2xpc3Q7IGNvbnRleHQ6IHskaW1wbGljaXQ6IG9wdGdyb3VwLml0ZW1zLCBzZWxlY3RlZE9wdGlvbjogc2VsZWN0ZWRPcHRpb259XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhZ3JvdXBcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbXNsaXN0OyBjb250ZXh0OiB7JGltcGxpY2l0OiBvcHRpb25zVG9EaXNwbGF5LCBzZWxlY3RlZE9wdGlvbjogc2VsZWN0ZWRPcHRpb259XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8bmctdGVtcGxhdGUgI2l0ZW1zbGlzdCBsZXQtb3B0aW9ucyBsZXQtc2VsZWN0ZWRPcHRpb249XCJzZWxlY3RlZE9wdGlvblwiPlxuICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIG9wdGlvbnM7bGV0IGk9aW5kZXhcIlxuICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7XG4gICAgICAgICAgICAgICAgJ3VpLWRyb3Bkb3duLWl0ZW0gdWktY29ybmVyLWFsbCc6dHJ1ZSxcbiAgICAgICAgICAgICAgICAndWktc3RhdGUtaGlnaGxpZ2h0Jzooc2VsZWN0ZWRPcHRpb24gPT0gb3B0aW9uKSxcbiAgICAgICAgICAgICAgICAndWktZHJvcGRvd24taXRlbS1lbXB0eSc6IW9wdGlvbi5sYWJlbHx8b3B0aW9uLmxhYmVsLmxlbmd0aCA9PT0gMCxcbiAgICAgICAgICAgICAgICAndWktc3RhdGUtZGlzYWJsZWQnOiBvcHRpb24uZGlzYWJsZWRcbiAgICAgICAgICAgICAgfVwiXG4gICAgICAgICAgICAgIChjbGljayk9XCJvbkl0ZW1DbGljaygkZXZlbnQsIG9wdGlvbilcIj5cbiAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIWl0ZW1UZW1wbGF0ZVwiPnt7b3B0aW9uLmxhYmVsfHwnZW1wdHknfX08L3NwYW4+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbVRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiBvcHRpb259XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPGxpICpuZ0lmPVwiZmlsdGVyICYmIG9wdGlvbnNUb0Rpc3BsYXkgJiYgb3B0aW9uc1RvRGlzcGxheS5sZW5ndGggPT09IDBcIj57e2VtcHR5RmlsdGVyTWVzc2FnZX19PC9saT5cbiAgICAgIDwvdWw+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLnVpLWRyb3Bkb3due2Rpc3BsYXk6aW5saW5lLWJsb2NrO3Bvc2l0aW9uOnJlbGF0aXZlO2N1cnNvcjpwb2ludGVyO3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0udWktZHJvcGRvd24gLnVpLWRyb3Bkb3duLWNsZWFyLWljb257cG9zaXRpb246YWJzb2x1dGU7dG9wOjUwJTtmb250LXNpemU6Ljc1ZW07aGVpZ2h0OjFlbTttYXJnaW4tdG9wOi0uNWVtO3JpZ2h0OjIuNWVtfS51aS1kcm9wZG93biAudWktZHJvcGRvd24tdHJpZ2dlcntib3JkZXItcmlnaHQ6bm9uZTtib3JkZXItdG9wOm5vbmU7Ym9yZGVyLWJvdHRvbTpub25lO2N1cnNvcjpwb2ludGVyO3dpZHRoOjEuNWVtO2hlaWdodDoxMDAlO3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjA7dG9wOjA7cGFkZGluZzowIC4yNWVtfS51aS1kcm9wZG93biAudWktZHJvcGRvd24tdHJpZ2dlciAudWktZHJvcGRvd24tdHJpZ2dlci1pY29ue3RvcDo1MCU7bGVmdDo1MCU7bWFyZ2luLXRvcDotLjVlbTttYXJnaW4tbGVmdDotLjVlbTtwb3NpdGlvbjphYnNvbHV0ZX0udWktZHJvcGRvd24gLnVpLWRyb3Bkb3duLWxhYmVse2Rpc3BsYXk6YmxvY2s7Ym9yZGVyOm5vbmU7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjtmb250LXdlaWdodDo0MDA7d2lkdGg6MTAwJTtwYWRkaW5nLXJpZ2h0OjIuNWVtfS51aS1kcm9wZG93bi1pdGVtLWVtcHR5LC51aS1kcm9wZG93bi1sYWJlbC1lbXB0eXt0ZXh0LWluZGVudDotOTk5OXB4O292ZXJmbG93OmhpZGRlbn0udWktc3RhdGUtZGlzYWJsZWR7b3BhY2l0eTouNjtjdXJzb3I6ZGVmYXVsdH0udWktZHJvcGRvd24udWktc3RhdGUtZGlzYWJsZWQgLnVpLWRyb3Bkb3duLWxhYmVsLC51aS1kcm9wZG93bi51aS1zdGF0ZS1kaXNhYmxlZCAudWktZHJvcGRvd24tdHJpZ2dlcntjdXJzb3I6ZGVmYXVsdH0udWktZHJvcGRvd24gbGFiZWwudWktZHJvcGRvd24tbGFiZWx7Y3Vyc29yOnBvaW50ZXJ9LnVpLWRyb3Bkb3duIGlucHV0LnVpLWRyb3Bkb3duLWxhYmVse2N1cnNvcjpkZWZhdWx0fS51aS1kcm9wZG93biAudWktZHJvcGRvd24tcGFuZWx7bWluLXdpZHRoOjEwMCV9LnVpLWRyb3Bkb3duLXBhbmVse3Bvc2l0aW9uOmFic29sdXRlO2hlaWdodDphdXRvO2Rpc3BsYXk6bm9uZX0udWktZHJvcGRvd24tcGFuZWwgLnVpLWRyb3Bkb3duLWl0ZW1zLXdyYXBwZXJ7b3ZlcmZsb3c6YXV0b30udWktZHJvcGRvd24tcGFuZWwgLnVpLWRyb3Bkb3duLWl0ZW17Zm9udC13ZWlnaHQ6NDAwO2JvcmRlcjowO2N1cnNvcjpwb2ludGVyO21hcmdpbjoxcHggMDtwYWRkaW5nOi4xMjVlbSAuMjVlbTt0ZXh0LWFsaWduOmxlZnR9LnVpLWRyb3Bkb3duLXBhbmVsIC51aS1kcm9wZG93bi1pdGVtLWdyb3Vwe2ZvbnQtd2VpZ2h0OjcwMDtjdXJzb3I6ZGVmYXVsdH0udWktZHJvcGRvd24tcGFuZWwgLnVpLWRyb3Bkb3duLWxpc3R7cGFkZGluZzouNGVtO2JvcmRlcjowfS51aS1kcm9wZG93bi1wYW5lbCAudWktZHJvcGRvd24tZmlsdGVye3dpZHRoOjEwMCU7Ym94LXNpemluZzpib3JkZXItYm94O3BhZGRpbmctcmlnaHQ6MS41ZW19LnVpLWRyb3Bkb3duLXBhbmVsIC51aS1kcm9wZG93bi1maWx0ZXItY29udGFpbmVye3Bvc2l0aW9uOnJlbGF0aXZlO21hcmdpbjowO3BhZGRpbmc6LjRlbTtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDoxMDAlfS51aS1kcm9wZG93bi1wYW5lbCAudWktZHJvcGRvd24tZmlsdGVyLWNvbnRhaW5lciAudWktZHJvcGRvd24tZmlsdGVyLWljb257cG9zaXRpb246YWJzb2x1dGU7dG9wOi44ZW07cmlnaHQ6MWVtfS51aS1mbHVpZCAudWktZHJvcGRvd257d2lkdGg6MTAwJX1gXSxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ3BhbmVsU3RhdGUnLCBbXG4gICAgICBzdGF0ZSgnaGlkZGVuJywgc3R5bGUoe1xuICAgICAgICBvcGFjaXR5OiAwXG4gICAgICB9KSksXG4gICAgICBzdGF0ZSgndmlzaWJsZScsIHN0eWxlKHtcbiAgICAgICAgb3BhY2l0eTogMVxuICAgICAgfSkpLFxuICAgICAgdHJhbnNpdGlvbigndmlzaWJsZSA9PiBoaWRkZW4nLCBhbmltYXRlKCc0MDBtcyBlYXNlLWluJykpLFxuICAgICAgdHJhbnNpdGlvbignaGlkZGVuID0+IHZpc2libGUnLCBhbmltYXRlKCc0MDBtcyBlYXNlLW91dCcpKVxuICAgIF0pXG4gIF0sXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLnVpLWlucHV0d3JhcHBlci1maWxsZWRdJzogJ2ZpbGxlZCcsXG4gICAgJ1tjbGFzcy51aS1pbnB1dHdyYXBwZXItZm9jdXNdJzogJ2ZvY3VzZWQnXG4gIH0sXG4gIHByb3ZpZGVyczogW0RST1BET1dOX1ZBTFVFX0FDQ0VTU09SXVxufSlcblxuZXhwb3J0IGNsYXNzIERyb3Bkb3duQ29tcG9uZW50IGV4dGVuZHMgRHJvcGRvd24ge1xuICBwdWJsaWMgb25JdGVtQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQsIG9wdGlvbjogU2VsZWN0SXRlbSk6IHZvaWQge1xuICAgIGlmICghb3B0aW9uWydkaXNhYmxlZCddKSB7XG4gICAgICBzdXBlci5vbkl0ZW1DbGljayhldmVudCwgb3B0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNlbGVjdEl0ZW0oZXZlbnQ6IE1vdXNlRXZlbnQsIG9wdGlvbjogU2VsZWN0SXRlbSk6IHZvaWQge1xuICAgIGlmICghb3B0aW9uWydkaXNhYmxlZCddKSB7XG4gICAgICBzdXBlci5zZWxlY3RJdGVtKGV2ZW50LCBvcHRpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRHJvcGRvd25Nb2R1bGUgYXMgUHJpbWVEcm9wZG93bk1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XG5pbXBvcnQgeyBEcm9wZG93bkNvbXBvbmVudCB9IGZyb20gJy4vZHJvcGRvd24uY29tcG9uZW50JztcblxuQE5nTW9kdWxlKFxuICB7XG4gICAgaW1wb3J0czogW1xuICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgUHJpbWVEcm9wZG93bk1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICBEcm9wZG93bkNvbXBvbmVudFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgRHJvcGRvd25Db21wb25lbnRcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW11cbiAgfVxuKVxuZXhwb3J0IGNsYXNzIERyb3Bkb3duTW9kdWxlIHtcblxufVxuIl0sIm5hbWVzIjpbInRzbGliXzEuX19leHRlbmRzIiwiRGlyZWN0aXZlIiwiRWxlbWVudFJlZiIsIlJlbmRlcmVyIiwiU3RpY2t5U2Nyb2xsU2VydmljZSIsIlN0aWNreURpcmVjdGl2ZSIsIklucHV0IiwiQ29udGVudENoaWxkIiwiRHJvcGRvd24iLCJNZW51IiwiT3B0aW9uYWwiLCJUaWVyZWRNZW51IiwiSG9zdExpc3RlbmVyIiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJJbnB1dFRleHRNb2R1bGUiLCJNZW51TW9kdWxlIiwiS2FsdHVyYUNvbW1vbk1vZHVsZSIsIk5HX1ZBTFVFX0FDQ0VTU09SIiwiZm9yd2FyZFJlZiIsIk9iamVjdFV0aWxzIiwiRXZlbnRFbWl0dGVyIiwiS2FsdHVyYUJyb3dzZXJVdGlscyIsIkJyb3dzZXJOYW1lcyIsIkNvbXBvbmVudCIsInRyaWdnZXIiLCJzdGF0ZSIsInN0eWxlIiwidHJhbnNpdGlvbiIsImFuaW1hdGUiLCJSZW5kZXJlcjIiLCJDaGFuZ2VEZXRlY3RvclJlZiIsIkl0ZXJhYmxlRGlmZmVycyIsIk91dHB1dCIsIlZpZXdDaGlsZCIsIlByaW1lQXV0b0NvbXBsZXRlIiwiUGlwZSIsIkJ1dHRvbk1vZHVsZSIsIlNoYXJlZE1vZHVsZSIsIlRvb2x0aXBNb2R1bGUiLCJEb21IYW5kbGVyIiwiRm9ybXNNb2R1bGUiLCJEYXRlUGlja2VyQ29udHJvbCIsIkR5bmFtaWNEcm9wZG93bkNvbnRyb2wiLCJMaXN0Q29udHJvbCIsImNhbmNlbE9uRGVzdHJveSIsIk11bHRpU2VsZWN0IiwiUHJpbWVNdWx0aVNlbGVjdE1vZHVsZSIsIlNjcm9sbGluZ01vZHVsZSIsIlJlYWN0aXZlRm9ybXNNb2R1bGUiLCJEcm9wZG93bk1vZHVsZSIsIklucHV0VGV4dGFyZWFNb2R1bGUiLCJDYWxlbmRhck1vZHVsZSIsIklucHV0U3dpdGNoTW9kdWxlIiwiU2xpZGVyIiwiUHJpbWVTbGlkZXJNb2R1bGUiLCJUYWJsZSIsIlRlbXBsYXRlUmVmIiwiT2JzZXJ2YWJsZSIsIkNvbnRlbnRDaGlsZHJlbiIsIkNoZWNrYm94TW9kdWxlIiwiUGFnaW5hdG9yTW9kdWxlIiwiUHJpbWVEcm9wZG93bk1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBQUE7Ozs7Ozs7Ozs7Ozs7O0lBY0E7SUFFQSxJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYztTQUNwQyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUM1RSxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQUUsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUUvRSxhQUFnQixTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDMUIsYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNwQixTQUFTLEVBQUUsS0FBSyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxFQUFFO1FBQ3ZDLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFNB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