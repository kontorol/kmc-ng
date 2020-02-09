/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Renderer, ElementRef } from '@angular/core';
import { StickyScrollService } from '@kaltura-ng/kaltura-ui';
import { StickyDirective } from '@kaltura-ng/kaltura-ui';
export class StickyDatatableHeaderDirective extends StickyDirective {
    /**
     * @param {?} elementRef
     * @param {?} renderer
     * @param {?} _stickyScrollService
     */
    constructor(elementRef, renderer, _stickyScrollService) {
        super(elementRef, renderer, _stickyScrollService);
        this._dataTableRef = elementRef;
    }
    /**
     * @protected
     * @param {?} elementRef
     * @return {?}
     */
    _getStickyElement(elementRef) {
        /** @type {?} */
        const headers = elementRef.nativeElement.querySelectorAll('.ui-table-scrollable-header-box,.ui-datatable-scrollable-header-box');
        if (headers && headers.length > 0) {
            // console.log("got primeng table header!");
            return headers[0];
        }
        else {
            console.warn("failed to extract table header (did you set the prime table with header and set it to scrollable?)");
            return null;
        }
    }
    /**
     * @protected
     * @return {?}
     */
    _onSticky() {
        this.updateHeaderSize();
    }
    /**
     * @protected
     * @return {?}
     */
    _onUnsetSticky() {
        this._stickyElement.style.position = 'static';
        this._stickyElement.style.width = 'auto';
    }
    /**
     * @protected
     * @return {?}
     */
    onResize() {
        this.updateHeaderSize();
    }
    ;
    /**
     * @private
     * @return {?}
     */
    updateHeaderSize() {
        if (this.isSticky) {
            /** @type {?} */
            const boundingClientRect = this._dataTableRef.nativeElement.getBoundingClientRect();
            /** @type {?} */
            const tableWidth = boundingClientRect['right'] - boundingClientRect['left'];
            this._stickyElement.style.width = tableWidth + 'px';
        }
    }
}
StickyDatatableHeaderDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kStickyHeader]'
            },] },
];
/** @nocollapse */
StickyDatatableHeaderDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer },
    { type: StickyScrollService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    StickyDatatableHeaderDirective.prototype._dataTableRef;
    /* Skipping unhandled member: ;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RpY2t5LWRhdGF0YWJsZS1oZWFkZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGthbHR1cmEtbmcva2FsdHVyYS1wcmltZW5nLXVpLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvc3RpY2t5LWRhdGF0YWJsZS1oZWFkZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBTXpELE1BQU0sT0FBTyw4QkFBK0IsU0FBUSxlQUFlOzs7Ozs7SUFHL0QsWUFBWSxVQUFzQixFQUFFLFFBQWtCLEVBQUUsb0JBQXlDO1FBQzdGLEtBQUssQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUM7SUFDcEMsQ0FBQzs7Ozs7O0lBRVMsaUJBQWlCLENBQUMsVUFBc0I7O2NBQ3hDLE9BQU8sR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLHFFQUFxRSxDQUFDO1FBRWhJLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQy9CLDRDQUE0QztZQUM1QyxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNyQjthQUFNO1lBQ0gsT0FBTyxDQUFDLElBQUksQ0FBQyxvR0FBb0csQ0FBQyxDQUFDO1lBQ25ILE9BQU8sSUFBSSxDQUFDO1NBQ2Y7SUFDTCxDQUFDOzs7OztJQUVTLFNBQVM7UUFDZixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUM1QixDQUFDOzs7OztJQUVTLGNBQWM7UUFDcEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUM5QyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO0lBQzdDLENBQUM7Ozs7O0lBRVMsUUFBUTtRQUNkLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFBQSxDQUFDOzs7OztJQUVNLGdCQUFnQjtRQUNwQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7O2tCQUNULGtCQUFrQixHQUFRLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFOztrQkFDbEYsVUFBVSxHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxHQUFHLGtCQUFrQixDQUFDLE1BQU0sQ0FBQztZQUMzRSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsVUFBVSxHQUFHLElBQUksQ0FBQztTQUN2RDtJQUNMLENBQUM7OztZQTNDSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjthQUM5Qjs7OztZQU42QixVQUFVO1lBQXBCLFFBQVE7WUFDbkIsbUJBQW1COzs7Ozs7O0lBU3hCLHVEQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgUmVuZGVyZXIsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN0aWNreVNjcm9sbFNlcnZpY2UgfSBmcm9tICdAa2FsdHVyYS1uZy9rYWx0dXJhLXVpJztcbmltcG9ydCB7IFN0aWNreURpcmVjdGl2ZSB9IGZyb20gJ0BrYWx0dXJhLW5nL2thbHR1cmEtdWknO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1trU3RpY2t5SGVhZGVyXSdcbn0pXG5cbmV4cG9ydCBjbGFzcyBTdGlja3lEYXRhdGFibGVIZWFkZXJEaXJlY3RpdmUgZXh0ZW5kcyBTdGlja3lEaXJlY3RpdmUge1xuXG4gICAgcHJpdmF0ZSBfZGF0YVRhYmxlUmVmOiBFbGVtZW50UmVmO1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHJlbmRlcmVyOiBSZW5kZXJlciwgX3N0aWNreVNjcm9sbFNlcnZpY2U6IFN0aWNreVNjcm9sbFNlcnZpY2UpIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZiwgcmVuZGVyZXIsIF9zdGlja3lTY3JvbGxTZXJ2aWNlKTtcbiAgICAgICAgdGhpcy5fZGF0YVRhYmxlUmVmID0gZWxlbWVudFJlZjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX2dldFN0aWNreUVsZW1lbnQoZWxlbWVudFJlZjogRWxlbWVudFJlZikgOmFueXtcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudWktdGFibGUtc2Nyb2xsYWJsZS1oZWFkZXItYm94LC51aS1kYXRhdGFibGUtc2Nyb2xsYWJsZS1oZWFkZXItYm94Jyk7XG5cbiAgICAgICAgaWYgKGhlYWRlcnMgJiYgaGVhZGVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImdvdCBwcmltZW5nIHRhYmxlIGhlYWRlciFcIik7XG4gICAgICAgICAgICByZXR1cm4gaGVhZGVyc1swXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcImZhaWxlZCB0byBleHRyYWN0IHRhYmxlIGhlYWRlciAoZGlkIHlvdSBzZXQgdGhlIHByaW1lIHRhYmxlIHdpdGggaGVhZGVyIGFuZCBzZXQgaXQgdG8gc2Nyb2xsYWJsZT8pXCIpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX29uU3RpY2t5KCk6dm9pZHtcbiAgICAgICAgdGhpcy51cGRhdGVIZWFkZXJTaXplKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9vblVuc2V0U3RpY2t5KCk6dm9pZHtcbiAgICAgICAgdGhpcy5fc3RpY2t5RWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdzdGF0aWMnO1xuICAgICAgICB0aGlzLl9zdGlja3lFbGVtZW50LnN0eWxlLndpZHRoID0gJ2F1dG8nO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblJlc2l6ZSgpOnZvaWR7XG4gICAgICAgIHRoaXMudXBkYXRlSGVhZGVyU2l6ZSgpO1xuICAgIH07XG5cbiAgICBwcml2YXRlIHVwZGF0ZUhlYWRlclNpemUoKXtcbiAgICAgICAgaWYgKHRoaXMuaXNTdGlja3kpIHtcbiAgICAgICAgICAgIGNvbnN0IGJvdW5kaW5nQ2xpZW50UmVjdDogYW55ID0gdGhpcy5fZGF0YVRhYmxlUmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBjb25zdCB0YWJsZVdpZHRoID0gYm91bmRpbmdDbGllbnRSZWN0WydyaWdodCddIC0gYm91bmRpbmdDbGllbnRSZWN0WydsZWZ0J107XG4gICAgICAgICAgICB0aGlzLl9zdGlja3lFbGVtZW50LnN0eWxlLndpZHRoID0gdGFibGVXaWR0aCArICdweCc7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==