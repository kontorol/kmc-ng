/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ContentChild, Input } from '@angular/core';
import { Dropdown } from 'primeng/primeng';
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
export { DropdownCloseOnScroll };
if (false) {
    /** @type {?} */
    DropdownCloseOnScroll.prototype.scrollTarget;
    /** @type {?} */
    DropdownCloseOnScroll.prototype.dropdown;
    /**
     * @type {?}
     * @private
     */
    DropdownCloseOnScroll.prototype._registered;
    /**
     * @type {?}
     * @private
     */
    DropdownCloseOnScroll.prototype._dropdownChangesSubscription;
    /**
     * @type {?}
     * @private
     */
    DropdownCloseOnScroll.prototype._closeDropdownFunc;
    /**
     * @type {?}
     * @private
     */
    DropdownCloseOnScroll.prototype._isDestroyed;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tY2xvc2Utb24tc2Nyb2xsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGthbHR1cmEtbmcva2FsdHVyYS1wcmltZW5nLXVpLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvZHJvcGRvd24tY2xvc2Utb24tc2Nyb2xsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUE0QixZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUczQztJQWFDO1FBTFEsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFFcEIsdUJBQWtCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsaUJBQVksR0FBRyxLQUFLLENBQUM7SUFHN0IsQ0FBQzs7OztJQUVELCtDQUFlOzs7SUFBZjtRQUFBLGlCQU9DO1FBTkEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtZQUN4RCxLQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyw0QkFBNEIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsVUFBQyxLQUFLO1lBQzFFLEtBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQzs7OztJQUVELHdEQUF3Qjs7O0lBQXhCO1FBQUEsaUJBZUM7UUFkQSxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBQztZQUN0QyxVQUFVLENBQUM7Z0JBQ1YsSUFBSSxDQUFDLEtBQUksQ0FBQyxZQUFZLEVBQUU7b0JBQ3ZCLElBQUksS0FBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLElBQUksQ0FBQyxLQUFJLENBQUMsV0FBVyxFQUFFO3dCQUN0RCxLQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxLQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQzt3QkFDdEUsS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7cUJBQ3hCO29CQUNELElBQUksQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsSUFBSSxLQUFJLENBQUMsV0FBVyxFQUFFO3dCQUN0RCxLQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxLQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQzt3QkFDekUsS0FBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7cUJBQ3pCO2lCQUNEO1lBQ0YsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ0w7SUFDRixDQUFDOzs7O0lBRUQsMkNBQVc7OztJQUFYO1FBQ0MsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7U0FDekU7UUFDRCxJQUFJLElBQUksQ0FBQyw0QkFBNEIsRUFBQztZQUNyQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDaEQsSUFBSSxDQUFDLDRCQUE0QixHQUFHLElBQUksQ0FBQztTQUN6QztRQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0lBQzFCLENBQUM7Ozs7O0lBRU8sNkNBQWE7Ozs7SUFBckI7UUFDQyxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxXQUFXLEVBQUM7WUFDOUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUN6RSxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztTQUN6QjtJQUNGLENBQUM7O2dCQTNERCxTQUFTLFNBQUM7b0JBQ1YsUUFBUSxFQUFFLDBCQUEwQjtpQkFDcEM7Ozs7OytCQUdDLEtBQUs7MkJBQ0wsWUFBWSxTQUFDLFFBQVE7O0lBc0R2Qiw0QkFBQztDQUFBLEFBNURELElBNERDO1NBekRZLHFCQUFxQjs7O0lBRWpDLDZDQUEyQjs7SUFDM0IseUNBQWtEOzs7OztJQUVsRCw0Q0FBNEI7Ozs7O0lBQzVCLDZEQUFvRDs7Ozs7SUFDcEQsbURBQTJEOzs7OztJQUMzRCw2Q0FBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgQ29udGVudENoaWxkLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRHJvcGRvd24gfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xuaW1wb3J0IHsgSVN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcblxuQERpcmVjdGl2ZSh7XG5cdHNlbGVjdG9yOiAnW2tEcm9wZG93bkNsb3NlT25TY3JvbGxdJyxcbn0pXG5leHBvcnQgY2xhc3MgRHJvcGRvd25DbG9zZU9uU2Nyb2xsIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuXHRASW5wdXQoKSBzY3JvbGxUYXJnZXQ6IGFueTtcblx0QENvbnRlbnRDaGlsZChEcm9wZG93bikgcHVibGljIGRyb3Bkb3duOiBEcm9wZG93bjtcblxuXHRwcml2YXRlIF9yZWdpc3RlcmVkID0gZmFsc2U7XG5cdHByaXZhdGUgX2Ryb3Bkb3duQ2hhbmdlc1N1YnNjcmlwdGlvbjogSVN1YnNjcmlwdGlvbjtcblx0cHJpdmF0ZSBfY2xvc2VEcm9wZG93bkZ1bmMgPSB0aGlzLmNsb3NlRHJvcGRvd24uYmluZCh0aGlzKTtcblx0cHJpdmF0ZSBfaXNEZXN0cm95ZWQgPSBmYWxzZTtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0fVxuXG5cdG5nQWZ0ZXJWaWV3SW5pdCgpIHtcblx0XHR0aGlzLmRyb3Bkb3duLmVsLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xuXHRcdFx0dGhpcy5oYW5kbGVTY3JvbGxSZWdpc3RyYXRpb24oKTtcblx0XHR9KTtcblx0XHR0aGlzLl9kcm9wZG93bkNoYW5nZXNTdWJzY3JpcHRpb24gPSB0aGlzLmRyb3Bkb3duLm9uQ2hhbmdlLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcblx0XHRcdHRoaXMuaGFuZGxlU2Nyb2xsUmVnaXN0cmF0aW9uKCk7XG5cdFx0fSk7XG5cdH1cblxuXHRoYW5kbGVTY3JvbGxSZWdpc3RyYXRpb24oKTp2b2lke1xuXHRcdGlmICh0aGlzLnNjcm9sbFRhcmdldCAmJiB0aGlzLmRyb3Bkb3duKXtcblx0XHRcdHNldFRpbWVvdXQoKCk9Pntcblx0XHRcdFx0aWYgKCF0aGlzLl9pc0Rlc3Ryb3llZCkge1xuXHRcdFx0XHRcdGlmICh0aGlzLmRyb3Bkb3duLm92ZXJsYXlWaXNpYmxlICYmICF0aGlzLl9yZWdpc3RlcmVkKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnNjcm9sbFRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9jbG9zZURyb3Bkb3duRnVuYyk7XG5cdFx0XHRcdFx0XHR0aGlzLl9yZWdpc3RlcmVkID0gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKCF0aGlzLmRyb3Bkb3duLm92ZXJsYXlWaXNpYmxlICYmIHRoaXMuX3JlZ2lzdGVyZWQpIHtcblx0XHRcdFx0XHRcdHRoaXMuc2Nyb2xsVGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuX2Nsb3NlRHJvcGRvd25GdW5jKTtcblx0XHRcdFx0XHRcdHRoaXMuX3JlZ2lzdGVyZWQgPSBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sMCk7XG5cdFx0fVxuXHR9XG5cblx0bmdPbkRlc3Ryb3koKSB7XG5cdFx0aWYgKHRoaXMuc2Nyb2xsVGFyZ2V0ICYmIHRoaXMuX3JlZ2lzdGVyZWQpIHtcblx0XHRcdHRoaXMuc2Nyb2xsVGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuX2Nsb3NlRHJvcGRvd25GdW5jKTtcblx0XHR9XG5cdFx0aWYgKHRoaXMuX2Ryb3Bkb3duQ2hhbmdlc1N1YnNjcmlwdGlvbil7XG5cdFx0XHR0aGlzLl9kcm9wZG93bkNoYW5nZXNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcblx0XHRcdHRoaXMuX2Ryb3Bkb3duQ2hhbmdlc1N1YnNjcmlwdGlvbiA9IG51bGw7XG5cdFx0fVxuXHRcdHRoaXMuX2lzRGVzdHJveWVkID0gdHJ1ZTtcblx0fVxuXG5cdHByaXZhdGUgY2xvc2VEcm9wZG93bigpOnZvaWR7XG5cdFx0aWYgKHRoaXMuZHJvcGRvd24gJiYgdHlwZW9mIHRoaXMuZHJvcGRvd24uaGlkZSAhPT0gXCJ1bmRlZmluZWRcIil7XG5cdFx0XHR0aGlzLmRyb3Bkb3duLmhpZGUoKTtcblx0XHRcdHRoaXMuc2Nyb2xsVGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuX2Nsb3NlRHJvcGRvd25GdW5jKTtcblx0XHRcdHRoaXMuX3JlZ2lzdGVyZWQgPSBmYWxzZTtcblx0XHR9XG5cdH1cbn1cbiJdfQ==