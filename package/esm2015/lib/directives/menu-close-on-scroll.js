/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, HostListener, Optional } from '@angular/core';
import { Menu, TieredMenu } from 'primeng/primeng';
export class MenuCloseOnScroll {
    /**
     * @param {?} menu
     * @param {?} tieredMenu
     */
    constructor(menu, tieredMenu) {
        this._menu = menu || tieredMenu;
    }
    /**
     * @return {?}
     */
    onWindowScroll() {
        this.closeMenu();
    }
    /**
     * @private
     * @return {?}
     */
    closeMenu() {
        if (this._menu && typeof this._menu.hide !== "undefined") {
            this._menu.hide();
        }
    }
}
MenuCloseOnScroll.decorators = [
    { type: Directive, args: [{
                selector: '[kMenuCloseOnScroll]',
            },] },
];
/** @nocollapse */
MenuCloseOnScroll.ctorParameters = () => [
    { type: Menu, decorators: [{ type: Optional }] },
    { type: TieredMenu, decorators: [{ type: Optional }] }
];
MenuCloseOnScroll.propDecorators = {
    onWindowScroll: [{ type: HostListener, args: ["window:scroll", [],] }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    MenuCloseOnScroll.prototype._menu;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1jbG9zZS1vbi1zY3JvbGwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2FsdHVyYS1uZy9rYWx0dXJhLXByaW1lbmctdWkvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9tZW51LWNsb3NlLW9uLXNjcm9sbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBZ0IsWUFBWSxFQUFTLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RixPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBS25ELE1BQU0sT0FBTyxpQkFBaUI7Ozs7O0lBRzdCLFlBQXdCLElBQVUsRUFBYyxVQUFzQjtRQUUvRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksSUFBSSxVQUFVLENBQUM7SUFDdkMsQ0FBQzs7OztJQUdELGNBQWM7UUFDYixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbEIsQ0FBQzs7Ozs7SUFFTyxTQUFTO1FBQ1YsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssV0FBVyxFQUFFO1lBQ3RELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDckI7SUFDTCxDQUFDOzs7WUFwQkosU0FBUyxTQUFDO2dCQUNWLFFBQVEsRUFBRSxzQkFBc0I7YUFDaEM7Ozs7WUFKUSxJQUFJLHVCQVFDLFFBQVE7WUFSUCxVQUFVLHVCQVFhLFFBQVE7Ozs2QkFLNUMsWUFBWSxTQUFDLGVBQWUsRUFBRSxFQUFFOzs7Ozs7O0lBUGpDLGtDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgQ29udGVudENoaWxkLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWVudSwgVGllcmVkTWVudSB9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XG5cbkBEaXJlY3RpdmUoe1xuXHRzZWxlY3RvcjogJ1trTWVudUNsb3NlT25TY3JvbGxdJyxcbn0pXG5leHBvcnQgY2xhc3MgTWVudUNsb3NlT25TY3JvbGwge1xuXHRwcml2YXRlICBfbWVudTogTWVudSB8IFRpZXJlZE1lbnU7XG5cblx0Y29uc3RydWN0b3IoQE9wdGlvbmFsKCkgbWVudTogTWVudSwgQE9wdGlvbmFsKCkgdGllcmVkTWVudTogVGllcmVkTWVudSlcblx0e1xuICAgICAgICB0aGlzLl9tZW51ID0gbWVudSB8fCB0aWVyZWRNZW51O1xuXHR9XG5cblx0QEhvc3RMaXN0ZW5lcihcIndpbmRvdzpzY3JvbGxcIiwgW10pXG5cdG9uV2luZG93U2Nyb2xsKCkge1xuXHRcdHRoaXMuY2xvc2VNZW51KCk7XG5cdH1cblxuXHRwcml2YXRlIGNsb3NlTWVudSgpOnZvaWQge1xuICAgICAgICBpZiAodGhpcy5fbWVudSAmJiB0eXBlb2YgdGhpcy5fbWVudS5oaWRlICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB0aGlzLl9tZW51LmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==