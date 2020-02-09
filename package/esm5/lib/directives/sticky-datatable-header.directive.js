/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Renderer, ElementRef } from '@angular/core';
import { StickyScrollService } from '@kaltura-ng/kaltura-ui';
import { StickyDirective } from '@kaltura-ng/kaltura-ui';
var StickyDatatableHeaderDirective = /** @class */ (function (_super) {
    tslib_1.__extends(StickyDatatableHeaderDirective, _super);
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
    ;
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
export { StickyDatatableHeaderDirective };
if (false) {
    /**
     * @type {?}
     * @private
     */
    StickyDatatableHeaderDirective.prototype._dataTableRef;
    /* Skipping unhandled member: ;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RpY2t5LWRhdGF0YWJsZS1oZWFkZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGthbHR1cmEtbmcva2FsdHVyYS1wcmltZW5nLXVpLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvc3RpY2t5LWRhdGF0YWJsZS1oZWFkZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzdELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV6RDtJQUlvRCwwREFBZTtJQUcvRCx3Q0FBWSxVQUFzQixFQUFFLFFBQWtCLEVBQUUsb0JBQXlDO1FBQWpHLFlBQ0ksa0JBQU0sVUFBVSxFQUFFLFFBQVEsRUFBRSxvQkFBb0IsQ0FBQyxTQUVwRDtRQURHLEtBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDOztJQUNwQyxDQUFDOzs7Ozs7SUFFUywwREFBaUI7Ozs7O0lBQTNCLFVBQTRCLFVBQXNCOztZQUN4QyxPQUFPLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxxRUFBcUUsQ0FBQztRQUVoSSxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUMvQiw0Q0FBNEM7WUFDNUMsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDckI7YUFBTTtZQUNILE9BQU8sQ0FBQyxJQUFJLENBQUMsb0dBQW9HLENBQUMsQ0FBQztZQUNuSCxPQUFPLElBQUksQ0FBQztTQUNmO0lBQ0wsQ0FBQzs7Ozs7SUFFUyxrREFBUzs7OztJQUFuQjtRQUNJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7Ozs7O0lBRVMsdURBQWM7Ozs7SUFBeEI7UUFDSSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQzlDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7SUFDN0MsQ0FBQzs7Ozs7SUFFUyxpREFBUTs7OztJQUFsQjtRQUNJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFBQSxDQUFDOzs7OztJQUVNLHlEQUFnQjs7OztJQUF4QjtRQUNJLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTs7Z0JBQ1Qsa0JBQWtCLEdBQVEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUU7O2dCQUNsRixVQUFVLEdBQUcsa0JBQWtCLENBQUMsT0FBTyxDQUFDLEdBQUcsa0JBQWtCLENBQUMsTUFBTSxDQUFDO1lBQzNFLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxVQUFVLEdBQUcsSUFBSSxDQUFDO1NBQ3ZEO0lBQ0wsQ0FBQzs7Z0JBM0NKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsaUJBQWlCO2lCQUM5Qjs7OztnQkFONkIsVUFBVTtnQkFBcEIsUUFBUTtnQkFDbkIsbUJBQW1COztJQWdENUIscUNBQUM7Q0FBQSxBQTdDRCxDQUlvRCxlQUFlLEdBeUNsRTtTQXpDWSw4QkFBOEI7Ozs7OztJQUV2Qyx1REFBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFJlbmRlcmVyLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdGlja3lTY3JvbGxTZXJ2aWNlIH0gZnJvbSAnQGthbHR1cmEtbmcva2FsdHVyYS11aSc7XG5pbXBvcnQgeyBTdGlja3lEaXJlY3RpdmUgfSBmcm9tICdAa2FsdHVyYS1uZy9rYWx0dXJhLXVpJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdba1N0aWNreUhlYWRlcl0nXG59KVxuXG5leHBvcnQgY2xhc3MgU3RpY2t5RGF0YXRhYmxlSGVhZGVyRGlyZWN0aXZlIGV4dGVuZHMgU3RpY2t5RGlyZWN0aXZlIHtcblxuICAgIHByaXZhdGUgX2RhdGFUYWJsZVJlZjogRWxlbWVudFJlZjtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmLCByZW5kZXJlcjogUmVuZGVyZXIsIF9zdGlja3lTY3JvbGxTZXJ2aWNlOiBTdGlja3lTY3JvbGxTZXJ2aWNlKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYsIHJlbmRlcmVyLCBfc3RpY2t5U2Nyb2xsU2VydmljZSk7XG4gICAgICAgIHRoaXMuX2RhdGFUYWJsZVJlZiA9IGVsZW1lbnRSZWY7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9nZXRTdGlja3lFbGVtZW50KGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIDphbnl7XG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnVpLXRhYmxlLXNjcm9sbGFibGUtaGVhZGVyLWJveCwudWktZGF0YXRhYmxlLXNjcm9sbGFibGUtaGVhZGVyLWJveCcpO1xuXG4gICAgICAgIGlmIChoZWFkZXJzICYmIGhlYWRlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJnb3QgcHJpbWVuZyB0YWJsZSBoZWFkZXIhXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGhlYWRlcnNbMF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJmYWlsZWQgdG8gZXh0cmFjdCB0YWJsZSBoZWFkZXIgKGRpZCB5b3Ugc2V0IHRoZSBwcmltZSB0YWJsZSB3aXRoIGhlYWRlciBhbmQgc2V0IGl0IHRvIHNjcm9sbGFibGU/KVwiKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9vblN0aWNreSgpOnZvaWR7XG4gICAgICAgIHRoaXMudXBkYXRlSGVhZGVyU2l6ZSgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfb25VbnNldFN0aWNreSgpOnZvaWR7XG4gICAgICAgIHRoaXMuX3N0aWNreUVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnc3RhdGljJztcbiAgICAgICAgdGhpcy5fc3RpY2t5RWxlbWVudC5zdHlsZS53aWR0aCA9ICdhdXRvJztcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25SZXNpemUoKTp2b2lke1xuICAgICAgICB0aGlzLnVwZGF0ZUhlYWRlclNpemUoKTtcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSB1cGRhdGVIZWFkZXJTaXplKCl7XG4gICAgICAgIGlmICh0aGlzLmlzU3RpY2t5KSB7XG4gICAgICAgICAgICBjb25zdCBib3VuZGluZ0NsaWVudFJlY3Q6IGFueSA9IHRoaXMuX2RhdGFUYWJsZVJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgY29uc3QgdGFibGVXaWR0aCA9IGJvdW5kaW5nQ2xpZW50UmVjdFsncmlnaHQnXSAtIGJvdW5kaW5nQ2xpZW50UmVjdFsnbGVmdCddO1xuICAgICAgICAgICAgdGhpcy5fc3RpY2t5RWxlbWVudC5zdHlsZS53aWR0aCA9IHRhYmxlV2lkdGggKyAncHgnO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=