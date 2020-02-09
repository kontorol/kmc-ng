import { OnDestroy, AfterViewInit } from '@angular/core';
import { Dropdown } from 'primeng/primeng';
export declare class DropdownCloseOnScroll implements AfterViewInit, OnDestroy {
    scrollTarget: any;
    dropdown: Dropdown;
    private _registered;
    private _dropdownChangesSubscription;
    private _closeDropdownFunc;
    private _isDestroyed;
    constructor();
    ngAfterViewInit(): void;
    handleScrollRegistration(): void;
    ngOnDestroy(): void;
    private closeDropdown;
}
