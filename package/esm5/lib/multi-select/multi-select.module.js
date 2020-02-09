/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from '@kaltura-ng/kaltura-ui';
import { SharedModule } from 'primeng/components/common/shared';
import { MultiSelectComponent } from './multi-select.component';
import { MultiSelectModule as PrimeMultiSelectModule } from 'primeng/primeng';
import { MultiSelectItem } from './multi-select-item.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
var MultiSelectModule = /** @class */ (function () {
    function MultiSelectModule() {
    }
    MultiSelectModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        PrimeMultiSelectModule,
                        CommonModule,
                        SharedModule,
                        TooltipModule,
                        ScrollingModule
                    ],
                    declarations: [MultiSelectComponent, MultiSelectItem],
                    exports: [MultiSelectComponent],
                },] },
    ];
    return MultiSelectModule;
}());
export { MultiSelectModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktc2VsZWN0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrYWx0dXJhLW5nL2thbHR1cmEtcHJpbWVuZy11aS8iLCJzb3VyY2VzIjpbImxpYi9tdWx0aS1zZWxlY3QvbXVsdGktc2VsZWN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsaUJBQWlCLElBQUksc0JBQXNCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXpEO0lBQUE7SUFZQSxDQUFDOztnQkFaQSxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLHNCQUFzQjt3QkFDdEIsWUFBWTt3QkFDWixZQUFZO3dCQUNaLGFBQWE7d0JBQ2IsZUFBZTtxQkFDaEI7b0JBQ0QsWUFBWSxFQUFFLENBQUMsb0JBQW9CLEVBQUUsZUFBZSxDQUFDO29CQUNyRCxPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztpQkFDaEM7O0lBRUQsd0JBQUM7Q0FBQSxBQVpELElBWUM7U0FEWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFRvb2x0aXBNb2R1bGUgfSBmcm9tICdAa2FsdHVyYS1uZy9rYWx0dXJhLXVpJztcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvY29tcG9uZW50cy9jb21tb24vc2hhcmVkJztcbmltcG9ydCB7IE11bHRpU2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi9tdWx0aS1zZWxlY3QuY29tcG9uZW50JztcbmltcG9ydCB7IE11bHRpU2VsZWN0TW9kdWxlIGFzIFByaW1lTXVsdGlTZWxlY3RNb2R1bGUgfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xuaW1wb3J0IHsgTXVsdGlTZWxlY3RJdGVtIH0gZnJvbSAnLi9tdWx0aS1zZWxlY3QtaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2Nyb2xsaW5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBQcmltZU11bHRpU2VsZWN0TW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBTaGFyZWRNb2R1bGUsXG4gICAgVG9vbHRpcE1vZHVsZSxcbiAgICBTY3JvbGxpbmdNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbTXVsdGlTZWxlY3RDb21wb25lbnQsIE11bHRpU2VsZWN0SXRlbV0sXG4gIGV4cG9ydHM6IFtNdWx0aVNlbGVjdENvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE11bHRpU2VsZWN0TW9kdWxlIHtcbn1cbiJdfQ==