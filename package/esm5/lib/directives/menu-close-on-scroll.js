/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, HostListener, Optional } from '@angular/core';
import { Menu, TieredMenu } from 'primeng/primeng';
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
export { MenuCloseOnScroll };
if (false) {
    /**
     * @type {?}
     * @private
     */
    MenuCloseOnScroll.prototype._menu;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1jbG9zZS1vbi1zY3JvbGwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2FsdHVyYS1uZy9rYWx0dXJhLXByaW1lbmctdWkvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9tZW51LWNsb3NlLW9uLXNjcm9sbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBZ0IsWUFBWSxFQUFTLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RixPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRW5EO0lBTUMsMkJBQXdCLElBQVUsRUFBYyxVQUFzQjtRQUUvRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksSUFBSSxVQUFVLENBQUM7SUFDdkMsQ0FBQzs7OztJQUdELDBDQUFjOzs7SUFEZDtRQUVDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNsQixDQUFDOzs7OztJQUVPLHFDQUFTOzs7O0lBQWpCO1FBQ08sSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssV0FBVyxFQUFFO1lBQ3RELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDckI7SUFDTCxDQUFDOztnQkFwQkosU0FBUyxTQUFDO29CQUNWLFFBQVEsRUFBRSxzQkFBc0I7aUJBQ2hDOzs7O2dCQUpRLElBQUksdUJBUUMsUUFBUTtnQkFSUCxVQUFVLHVCQVFhLFFBQVE7OztpQ0FLNUMsWUFBWSxTQUFDLGVBQWUsRUFBRSxFQUFFOztJQVVsQyx3QkFBQztDQUFBLEFBckJELElBcUJDO1NBbEJZLGlCQUFpQjs7Ozs7O0lBQzdCLGtDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgQ29udGVudENoaWxkLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWVudSwgVGllcmVkTWVudSB9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XG5cbkBEaXJlY3RpdmUoe1xuXHRzZWxlY3RvcjogJ1trTWVudUNsb3NlT25TY3JvbGxdJyxcbn0pXG5leHBvcnQgY2xhc3MgTWVudUNsb3NlT25TY3JvbGwge1xuXHRwcml2YXRlICBfbWVudTogTWVudSB8IFRpZXJlZE1lbnU7XG5cblx0Y29uc3RydWN0b3IoQE9wdGlvbmFsKCkgbWVudTogTWVudSwgQE9wdGlvbmFsKCkgdGllcmVkTWVudTogVGllcmVkTWVudSlcblx0e1xuICAgICAgICB0aGlzLl9tZW51ID0gbWVudSB8fCB0aWVyZWRNZW51O1xuXHR9XG5cblx0QEhvc3RMaXN0ZW5lcihcIndpbmRvdzpzY3JvbGxcIiwgW10pXG5cdG9uV2luZG93U2Nyb2xsKCkge1xuXHRcdHRoaXMuY2xvc2VNZW51KCk7XG5cdH1cblxuXHRwcml2YXRlIGNsb3NlTWVudSgpOnZvaWQge1xuICAgICAgICBpZiAodGhpcy5fbWVudSAmJiB0eXBlb2YgdGhpcy5fbWVudS5oaWRlICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB0aGlzLl9tZW51LmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==