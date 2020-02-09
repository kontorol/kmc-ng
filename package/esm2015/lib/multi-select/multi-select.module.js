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
export class MultiSelectModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktc2VsZWN0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrYWx0dXJhLW5nL2thbHR1cmEtcHJpbWVuZy11aS8iLCJzb3VyY2VzIjpbImxpYi9tdWx0aS1zZWxlY3QvbXVsdGktc2VsZWN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsaUJBQWlCLElBQUksc0JBQXNCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBYXpELE1BQU0sT0FBTyxpQkFBaUI7OztZQVg3QixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLHNCQUFzQjtvQkFDdEIsWUFBWTtvQkFDWixZQUFZO29CQUNaLGFBQWE7b0JBQ2IsZUFBZTtpQkFDaEI7Z0JBQ0QsWUFBWSxFQUFFLENBQUMsb0JBQW9CLEVBQUUsZUFBZSxDQUFDO2dCQUNyRCxPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQzthQUNoQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgVG9vbHRpcE1vZHVsZSB9IGZyb20gJ0BrYWx0dXJhLW5nL2thbHR1cmEtdWknO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9jb21wb25lbnRzL2NvbW1vbi9zaGFyZWQnO1xuaW1wb3J0IHsgTXVsdGlTZWxlY3RDb21wb25lbnQgfSBmcm9tICcuL211bHRpLXNlbGVjdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTXVsdGlTZWxlY3RNb2R1bGUgYXMgUHJpbWVNdWx0aVNlbGVjdE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XG5pbXBvcnQgeyBNdWx0aVNlbGVjdEl0ZW0gfSBmcm9tICcuL211bHRpLXNlbGVjdC1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTY3JvbGxpbmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIFByaW1lTXVsdGlTZWxlY3RNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFNoYXJlZE1vZHVsZSxcbiAgICBUb29sdGlwTW9kdWxlLFxuICAgIFNjcm9sbGluZ01vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtNdWx0aVNlbGVjdENvbXBvbmVudCwgTXVsdGlTZWxlY3RJdGVtXSxcbiAgZXhwb3J0czogW011bHRpU2VsZWN0Q29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgTXVsdGlTZWxlY3RNb2R1bGUge1xufVxuIl19