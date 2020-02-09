import { ChangeDetectorRef, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { MultiSelect } from 'primeng/primeng';
export declare const KALTURA_MULTISELECT_VALUE_ACCESSOR: any;
export declare class MultiSelectComponent extends MultiSelect implements OnDestroy {
    el: ElementRef;
    renderer: Renderer2;
    private _cd;
    disabledLabel: string;
    allSelectedLabel: string;
    selectAllLabel: string;
    menuItemDisplayStyle: string;
    hideOnScroll: string | Element;
    private _hideOnScrollListener;
    constructor(el: ElementRef, renderer: Renderer2, _cd: ChangeDetectorRef);
    ngOnDestroy(): void;
    private _addHideOnScrollHandler;
    private _removeHideOnScrollHandler;
    show(): void;
    hide(): void;
    isPartiallyChecked(): boolean;
}
