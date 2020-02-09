/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ContentChild, Input } from '@angular/core';
import { Dropdown } from 'primeng/primeng';
export class DropdownCloseOnScroll {
    constructor() {
        this._registered = false;
        this._closeDropdownFunc = this.closeDropdown.bind(this);
        this._isDestroyed = false;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.dropdown.el.nativeElement.addEventListener('click', () => {
            this.handleScrollRegistration();
        });
        this._dropdownChangesSubscription = this.dropdown.onChange.subscribe((event) => {
            this.handleScrollRegistration();
        });
    }
    /**
     * @return {?}
     */
    handleScrollRegistration() {
        if (this.scrollTarget && this.dropdown) {
            setTimeout(() => {
                if (!this._isDestroyed) {
                    if (this.dropdown.overlayVisible && !this._registered) {
                        this.scrollTarget.addEventListener('scroll', this._closeDropdownFunc);
                        this._registered = true;
                    }
                    if (!this.dropdown.overlayVisible && this._registered) {
                        this.scrollTarget.removeEventListener('scroll', this._closeDropdownFunc);
                        this._registered = false;
                    }
                }
            }, 0);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.scrollTarget && this._registered) {
            this.scrollTarget.removeEventListener('scroll', this._closeDropdownFunc);
        }
        if (this._dropdownChangesSubscription) {
            this._dropdownChangesSubscription.unsubscribe();
            this._dropdownChangesSubscription = null;
        }
        this._isDestroyed = true;
    }
    /**
     * @private
     * @return {?}
     */
    closeDropdown() {
        if (this.dropdown && typeof this.dropdown.hide !== "undefined") {
            this.dropdown.hide();
            this.scrollTarget.removeEventListener('scroll', this._closeDropdownFunc);
            this._registered = false;
        }
    }
}
DropdownCloseOnScroll.decorators = [
    { type: Directive, args: [{
                selector: '[kDropdownCloseOnScroll]',
            },] },
];
/** @nocollapse */
DropdownCloseOnScroll.ctorParameters = () => [];
DropdownCloseOnScroll.propDecorators = {
    scrollTarget: [{ type: Input }],
    dropdown: [{ type: ContentChild, args: [Dropdown,] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tY2xvc2Utb24tc2Nyb2xsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGthbHR1cmEtbmcva2FsdHVyYS1wcmltZW5nLXVpLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvZHJvcGRvd24tY2xvc2Utb24tc2Nyb2xsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUE0QixZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQU0zQyxNQUFNLE9BQU8scUJBQXFCO0lBVWpDO1FBTFEsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFFcEIsdUJBQWtCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsaUJBQVksR0FBRyxLQUFLLENBQUM7SUFHN0IsQ0FBQzs7OztJQUVELGVBQWU7UUFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQUUsRUFBRTtZQUM1RCxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyw0QkFBNEIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUM5RSxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7Ozs7SUFFRCx3QkFBd0I7UUFDdkIsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUM7WUFDdEMsVUFBVSxDQUFDLEdBQUUsRUFBRTtnQkFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtvQkFDdkIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7d0JBQ3RELElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO3dCQUN0RSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztxQkFDeEI7b0JBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7d0JBQ3RELElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO3dCQUN6RSxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztxQkFDekI7aUJBQ0Q7WUFDRixDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7U0FDTDtJQUNGLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1YsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7U0FDekU7UUFDRCxJQUFJLElBQUksQ0FBQyw0QkFBNEIsRUFBQztZQUNyQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDaEQsSUFBSSxDQUFDLDRCQUE0QixHQUFHLElBQUksQ0FBQztTQUN6QztRQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0lBQzFCLENBQUM7Ozs7O0lBRU8sYUFBYTtRQUNwQixJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxXQUFXLEVBQUM7WUFDOUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUN6RSxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztTQUN6QjtJQUNGLENBQUM7OztZQTNERCxTQUFTLFNBQUM7Z0JBQ1YsUUFBUSxFQUFFLDBCQUEwQjthQUNwQzs7Ozs7MkJBR0MsS0FBSzt1QkFDTCxZQUFZLFNBQUMsUUFBUTs7OztJQUR0Qiw2Q0FBMkI7O0lBQzNCLHlDQUFrRDs7Ozs7SUFFbEQsNENBQTRCOzs7OztJQUM1Qiw2REFBb0Q7Ozs7O0lBQ3BELG1EQUEyRDs7Ozs7SUFDM0QsNkNBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQsIENvbnRlbnRDaGlsZCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERyb3Bkb3duIH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcbmltcG9ydCB7IElTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5cbkBEaXJlY3RpdmUoe1xuXHRzZWxlY3RvcjogJ1trRHJvcGRvd25DbG9zZU9uU2Nyb2xsXScsXG59KVxuZXhwb3J0IGNsYXNzIERyb3Bkb3duQ2xvc2VPblNjcm9sbCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cblx0QElucHV0KCkgc2Nyb2xsVGFyZ2V0OiBhbnk7XG5cdEBDb250ZW50Q2hpbGQoRHJvcGRvd24pIHB1YmxpYyBkcm9wZG93bjogRHJvcGRvd247XG5cblx0cHJpdmF0ZSBfcmVnaXN0ZXJlZCA9IGZhbHNlO1xuXHRwcml2YXRlIF9kcm9wZG93bkNoYW5nZXNTdWJzY3JpcHRpb246IElTdWJzY3JpcHRpb247XG5cdHByaXZhdGUgX2Nsb3NlRHJvcGRvd25GdW5jID0gdGhpcy5jbG9zZURyb3Bkb3duLmJpbmQodGhpcyk7XG5cdHByaXZhdGUgX2lzRGVzdHJveWVkID0gZmFsc2U7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdH1cblxuXHRuZ0FmdGVyVmlld0luaXQoKSB7XG5cdFx0dGhpcy5kcm9wZG93bi5lbC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9Pntcblx0XHRcdHRoaXMuaGFuZGxlU2Nyb2xsUmVnaXN0cmF0aW9uKCk7XG5cdFx0fSk7XG5cdFx0dGhpcy5fZHJvcGRvd25DaGFuZ2VzU3Vic2NyaXB0aW9uID0gdGhpcy5kcm9wZG93bi5vbkNoYW5nZS5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG5cdFx0XHR0aGlzLmhhbmRsZVNjcm9sbFJlZ2lzdHJhdGlvbigpO1xuXHRcdH0pO1xuXHR9XG5cblx0aGFuZGxlU2Nyb2xsUmVnaXN0cmF0aW9uKCk6dm9pZHtcblx0XHRpZiAodGhpcy5zY3JvbGxUYXJnZXQgJiYgdGhpcy5kcm9wZG93bil7XG5cdFx0XHRzZXRUaW1lb3V0KCgpPT57XG5cdFx0XHRcdGlmICghdGhpcy5faXNEZXN0cm95ZWQpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5kcm9wZG93bi5vdmVybGF5VmlzaWJsZSAmJiAhdGhpcy5fcmVnaXN0ZXJlZCkge1xuXHRcdFx0XHRcdFx0dGhpcy5zY3JvbGxUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5fY2xvc2VEcm9wZG93bkZ1bmMpO1xuXHRcdFx0XHRcdFx0dGhpcy5fcmVnaXN0ZXJlZCA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICghdGhpcy5kcm9wZG93bi5vdmVybGF5VmlzaWJsZSAmJiB0aGlzLl9yZWdpc3RlcmVkKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnNjcm9sbFRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9jbG9zZURyb3Bkb3duRnVuYyk7XG5cdFx0XHRcdFx0XHR0aGlzLl9yZWdpc3RlcmVkID0gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LDApO1xuXHRcdH1cblx0fVxuXG5cdG5nT25EZXN0cm95KCkge1xuXHRcdGlmICh0aGlzLnNjcm9sbFRhcmdldCAmJiB0aGlzLl9yZWdpc3RlcmVkKSB7XG5cdFx0XHR0aGlzLnNjcm9sbFRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9jbG9zZURyb3Bkb3duRnVuYyk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLl9kcm9wZG93bkNoYW5nZXNTdWJzY3JpcHRpb24pe1xuXHRcdFx0dGhpcy5fZHJvcGRvd25DaGFuZ2VzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG5cdFx0XHR0aGlzLl9kcm9wZG93bkNoYW5nZXNTdWJzY3JpcHRpb24gPSBudWxsO1xuXHRcdH1cblx0XHR0aGlzLl9pc0Rlc3Ryb3llZCA9IHRydWU7XG5cdH1cblxuXHRwcml2YXRlIGNsb3NlRHJvcGRvd24oKTp2b2lke1xuXHRcdGlmICh0aGlzLmRyb3Bkb3duICYmIHR5cGVvZiB0aGlzLmRyb3Bkb3duLmhpZGUgIT09IFwidW5kZWZpbmVkXCIpe1xuXHRcdFx0dGhpcy5kcm9wZG93bi5oaWRlKCk7XG5cdFx0XHR0aGlzLnNjcm9sbFRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9jbG9zZURyb3Bkb3duRnVuYyk7XG5cdFx0XHR0aGlzLl9yZWdpc3RlcmVkID0gZmFsc2U7XG5cdFx0fVxuXHR9XG59XG4iXX0=