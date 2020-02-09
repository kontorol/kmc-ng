/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { PrimeControl } from './prime-control.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule, InputTextareaModule, CalendarModule, DropdownModule, InputSwitchModule } from 'primeng/primeng';
import { PrimeListOptionsPipe } from './prime-list-options.pipe';
import { MultiSelectModule } from '../multi-select/multi-select.module';
export class DynamicFormModule {
}
DynamicFormModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    ReactiveFormsModule,
                    CommonModule,
                    DropdownModule,
                    MultiSelectModule,
                    InputTextModule,
                    InputTextareaModule,
                    CalendarModule,
                    InputSwitchModule
                ],
                declarations: [
                    PrimeControl,
                    PrimeListOptionsPipe
                ],
                exports: [
                    PrimeControl
                ]
            },] },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1mb3JtLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrYWx0dXJhLW5nL2thbHR1cmEtcHJpbWVuZy11aS8iLCJzb3VyY2VzIjpbImxpYi9keW5hbWljLWZvcm0vZHluYW1pYy1mb3JtLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRyxlQUFlLEVBQUUsbUJBQW1CLEVBQUcsY0FBYyxFQUFHLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzdILE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBd0J4RSxNQUFNLE9BQU8saUJBQWlCOzs7WUF0QjdCLFFBQVEsU0FDTDtnQkFDSSxPQUFPLEVBQUc7b0JBQ04sbUJBQW1CO29CQUNuQixZQUFZO29CQUNaLGNBQWM7b0JBQ2pCLGlCQUFpQjtvQkFDZCxlQUFlO29CQUNmLG1CQUFtQjtvQkFDbkIsY0FBYztvQkFDZCxpQkFBaUI7aUJBRXBCO2dCQUNELFlBQVksRUFBRztvQkFDWCxZQUFZO29CQUNaLG9CQUFvQjtpQkFDdkI7Z0JBQ0QsT0FBTyxFQUFHO29CQUNOLFlBQVk7aUJBQ2Y7YUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQcmltZUNvbnRyb2wgfSBmcm9tICcuL3ByaW1lLWNvbnRyb2wuY29tcG9uZW50JztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgIElucHV0VGV4dE1vZHVsZSwgSW5wdXRUZXh0YXJlYU1vZHVsZSwgIENhbGVuZGFyTW9kdWxlLCAgRHJvcGRvd25Nb2R1bGUsIElucHV0U3dpdGNoTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcbmltcG9ydCB7IFByaW1lTGlzdE9wdGlvbnNQaXBlIH0gZnJvbSAnLi9wcmltZS1saXN0LW9wdGlvbnMucGlwZSc7XG5pbXBvcnQgeyBNdWx0aVNlbGVjdE1vZHVsZSB9IGZyb20gJy4uL211bHRpLXNlbGVjdC9tdWx0aS1zZWxlY3QubW9kdWxlJztcblxuQE5nTW9kdWxlKFxuICAgIHtcbiAgICAgICAgaW1wb3J0cyA6IFtcbiAgICAgICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgICAgICBEcm9wZG93bk1vZHVsZSxcblx0ICAgICAgICBNdWx0aVNlbGVjdE1vZHVsZSxcbiAgICAgICAgICAgIElucHV0VGV4dE1vZHVsZSxcbiAgICAgICAgICAgIElucHV0VGV4dGFyZWFNb2R1bGUsXG4gICAgICAgICAgICBDYWxlbmRhck1vZHVsZSxcbiAgICAgICAgICAgIElucHV0U3dpdGNoTW9kdWxlXG5cbiAgICAgICAgXSxcbiAgICAgICAgZGVjbGFyYXRpb25zIDogW1xuICAgICAgICAgICAgUHJpbWVDb250cm9sLFxuICAgICAgICAgICAgUHJpbWVMaXN0T3B0aW9uc1BpcGVcbiAgICAgICAgXSxcbiAgICAgICAgZXhwb3J0cyA6IFtcbiAgICAgICAgICAgIFByaW1lQ29udHJvbFxuICAgICAgICBdXG4gICAgfVxuKVxuZXhwb3J0IGNsYXNzIER5bmFtaWNGb3JtTW9kdWxlXG57XG5cbn1cbiJdfQ==