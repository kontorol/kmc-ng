import { Renderer, ElementRef } from '@angular/core';
import { StickyScrollService } from '@kaltura-ng/kaltura-ui';
import { StickyDirective } from '@kaltura-ng/kaltura-ui';
export declare class StickyDatatableHeaderDirective extends StickyDirective {
    private _dataTableRef;
    constructor(elementRef: ElementRef, renderer: Renderer, _stickyScrollService: StickyScrollService);
    protected _getStickyElement(elementRef: ElementRef): any;
    protected _onSticky(): void;
    protected _onUnsetSticky(): void;
    protected onResize(): void;
    private updateHeaderSize;
}
