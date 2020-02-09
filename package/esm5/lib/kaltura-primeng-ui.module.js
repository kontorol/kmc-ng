/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule, MenuModule } from 'primeng/primeng';
import { StickyDatatableHeaderDirective } from './directives/sticky-datatable-header.directive';
import { DropdownCloseOnScroll } from './directives/dropdown-close-on-scroll';
import { MenuCloseOnScroll } from './directives/menu-close-on-scroll';
import { KalturaCommonModule } from '@kaltura-ng/kaltura-common';
/**
 * @deprecated use separated module for each component
 */
var KalturaPrimeNgUIModule = /** @class */ (function () {
    function KalturaPrimeNgUIModule() {
    }
    KalturaPrimeNgUIModule.decorators = [
        { type: NgModule, args: [{
                    imports: (/** @type {?} */ ([
                        CommonModule, InputTextModule, MenuModule, KalturaCommonModule
                    ])),
                    declarations: (/** @type {?} */ ([
                        StickyDatatableHeaderDirective,
                        DropdownCloseOnScroll,
                        MenuCloseOnScroll
                    ])),
                    exports: (/** @type {?} */ ([
                        StickyDatatableHeaderDirective,
                        DropdownCloseOnScroll,
                        MenuCloseOnScroll
                    ])),
                    providers: (/** @type {?} */ ([]))
                },] },
    ];
    return KalturaPrimeNgUIModule;
}());
export { KalturaPrimeNgUIModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2FsdHVyYS1wcmltZW5nLXVpLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrYWx0dXJhLW5nL2thbHR1cmEtcHJpbWVuZy11aS8iLCJzb3VyY2VzIjpbImxpYi9rYWx0dXJhLXByaW1lbmctdWkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlELE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBQ2hHLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7O0FBS2pFO0lBQUE7SUFpQnFDLENBQUM7O2dCQWpCckMsUUFBUSxTQUFDO29CQUNOLE9BQU8sRUFBRSxtQkFBTzt3QkFDWixZQUFZLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxtQkFBbUI7cUJBQ2pFLEVBQUE7b0JBQ0QsWUFBWSxFQUFFLG1CQUFPO3dCQUNwQiw4QkFBOEI7d0JBQzNCLHFCQUFxQjt3QkFDckIsaUJBQWlCO3FCQUNwQixFQUFBO29CQUNELE9BQU8sRUFBRSxtQkFBTzt3QkFDZiw4QkFBOEI7d0JBQzNCLHFCQUFxQjt3QkFDckIsaUJBQWlCO3FCQUNwQixFQUFBO29CQUNELFNBQVMsRUFBRSxtQkFBTyxFQUNqQixFQUFBO2lCQUNKOztJQUNvQyw2QkFBQztDQUFBLEFBakJ0QyxJQWlCc0M7U0FBekIsc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJbnB1dFRleHRNb2R1bGUsIE1lbnVNb2R1bGUgfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xuaW1wb3J0IHsgU3RpY2t5RGF0YXRhYmxlSGVhZGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3N0aWNreS1kYXRhdGFibGUtaGVhZGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEcm9wZG93bkNsb3NlT25TY3JvbGwgfSBmcm9tICcuL2RpcmVjdGl2ZXMvZHJvcGRvd24tY2xvc2Utb24tc2Nyb2xsJztcbmltcG9ydCB7IE1lbnVDbG9zZU9uU2Nyb2xsIH0gZnJvbSAnLi9kaXJlY3RpdmVzL21lbnUtY2xvc2Utb24tc2Nyb2xsJztcbmltcG9ydCB7IEthbHR1cmFDb21tb25Nb2R1bGUgfSBmcm9tICdAa2FsdHVyYS1uZy9rYWx0dXJhLWNvbW1vbic7XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgdXNlIHNlcGFyYXRlZCBtb2R1bGUgZm9yIGVhY2ggY29tcG9uZW50XG4gKi9cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogPGFueVtdPltcbiAgICAgICAgQ29tbW9uTW9kdWxlLCBJbnB1dFRleHRNb2R1bGUsIE1lbnVNb2R1bGUsIEthbHR1cmFDb21tb25Nb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogPGFueVtdPltcblx0ICAgIFN0aWNreURhdGF0YWJsZUhlYWRlckRpcmVjdGl2ZSxcbiAgICAgICAgRHJvcGRvd25DbG9zZU9uU2Nyb2xsLFxuICAgICAgICBNZW51Q2xvc2VPblNjcm9sbFxuICAgIF0sXG4gICAgZXhwb3J0czogPGFueVtdPltcblx0ICAgIFN0aWNreURhdGF0YWJsZUhlYWRlckRpcmVjdGl2ZSxcbiAgICAgICAgRHJvcGRvd25DbG9zZU9uU2Nyb2xsLFxuICAgICAgICBNZW51Q2xvc2VPblNjcm9sbFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiA8YW55W10+W1xuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgS2FsdHVyYVByaW1lTmdVSU1vZHVsZSB7fVxuIl19