import { ChangeDetectorRef, AfterViewChecked, ElementRef, OnDestroy, Renderer2, IterableDiffers, EventEmitter, AfterContentInit, DoCheck } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AutoComplete as PrimeAutoComplete } from "primeng/components/autocomplete/autocomplete";
import { ObjectUtils } from 'primeng/components/utils/objectutils';
export interface SuggestionsProviderData {
    suggestions: any[];
    isLoading: boolean;
    errorMessage?: string;
}
export declare const KALTURA_AUTOCOMPLETE_VALUE_ACCESSOR: any;
export declare class AutoComplete extends PrimeAutoComplete implements OnDestroy, AfterViewChecked, AfterContentInit, DoCheck {
    el: ElementRef;
    renderer: Renderer2;
    cd: ChangeDetectorRef;
    differs: IterableDiffers;
    private _suggestionsProvider$;
    _loading: boolean;
    _showNoItems: boolean;
    _errorMessage: string;
    private _allowMultiple;
    _placeholder: string;
    ObjectUtils: typeof ObjectUtils;
    overlayHovered: boolean;
    onItemAdding: (value: any) => any;
    limitToSuggestions: boolean;
    suggestionSelectableField: string;
    suggestionItemField: string;
    tooltipResolver: string | ((val: any) => string);
    classField: string;
    suggestionLabelField: string;
    addOnPaste: boolean;
    multiple: boolean;
    suggestions: any[];
    itemClick: EventEmitter<any>;
    panelEL: ElementRef;
    onPaste(event: ClipboardEvent): void;
    placeholder: string;
    suggestionsProvider: Observable<SuggestionsProviderData>;
    getValue(): any;
    clearValue(): void;
    readonly searchText: string;
    private readonly input;
    /**
     *
     * @param item
     * returns {any|boolean}
     * private
     */
    private _isItemSelected;
    /**
     * add value provided by user if the following conditions are confirmed:
     * - input component is in focus and its' content length is valid.
     * - no suggestion is currently highlighted
     * returns { {status} } status 'added' if valid value, 'invalid' if cannot add the value or 'not relevant' if the request should be ignored
     * private
     */
    private _addValueFromInput;
    onInputBlur(event: any): void;
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
    constructor(el: ElementRef, renderer: Renderer2, cd: ChangeDetectorRef, differs: IterableDiffers);
    hide(): void;
    private _clearInputValue;
    onInput($event: any): void;
    onKeydown(event: any): void;
    ngOnDestroy(): void;
    onUserSelectItem(event: any, item: any): void;
    _getSuggestionText(suggestion: any): any;
    private _canSelectSuggestion;
    selectItem(item: any): void;
    focusInput(): void;
    onItemClick(item: any): void;
}
