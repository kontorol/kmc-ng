/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from '@kaltura-ng/kaltura-ui';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { SharedModule } from 'primeng/components/common/shared';
import { AutoComplete } from "./auto-complete.component";
import { HighlightPipe } from "./highlight.pipe";
import { IsSuggestionDisabledPipe } from "./is-suggestion-disabled.pipe";
var AutoCompleteModule = /** @class */ (function () {
    function AutoCompleteModule() {
    }
    AutoCompleteModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, InputTextModule, ButtonModule, SharedModule, TooltipModule],
                    declarations: [AutoComplete, HighlightPipe, IsSuggestionDisabledPipe],
                    exports: [AutoComplete, HighlightPipe],
                },] },
    ];
    return AutoCompleteModule;
}());
export { AutoCompleteModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by1jb21wbGV0ZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2FsdHVyYS1uZy9rYWx0dXJhLXByaW1lbmctdWkvIiwic291cmNlcyI6WyJsaWIvYXV0by1jb21wbGV0ZS9hdXRvLWNvbXBsZXRlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDaEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFekU7SUFBQTtJQU9BLENBQUM7O2dCQVBBLFFBQVEsU0FBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsYUFBYSxDQUFDO29CQUNuRixZQUFZLEVBQUUsQ0FBQyxZQUFZLEVBQUUsYUFBYSxFQUFFLHdCQUF3QixDQUFDO29CQUNyRSxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDO2lCQUV6Qzs7SUFFRCx5QkFBQztDQUFBLEFBUEQsSUFPQztTQURZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgVG9vbHRpcE1vZHVsZSB9IGZyb20gJ0BrYWx0dXJhLW5nL2thbHR1cmEtdWknO1xuaW1wb3J0IHsgSW5wdXRUZXh0TW9kdWxlIH0gZnJvbSAncHJpbWVuZy9jb21wb25lbnRzL2lucHV0dGV4dC9pbnB1dHRleHQnO1xuaW1wb3J0IHsgQnV0dG9uTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9jb21wb25lbnRzL2J1dHRvbi9idXR0b24nO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9jb21wb25lbnRzL2NvbW1vbi9zaGFyZWQnO1xuaW1wb3J0IHsgQXV0b0NvbXBsZXRlIH0gZnJvbSBcIi4vYXV0by1jb21wbGV0ZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IEhpZ2hsaWdodFBpcGUgfSBmcm9tIFwiLi9oaWdobGlnaHQucGlwZVwiO1xuaW1wb3J0IHsgSXNTdWdnZXN0aW9uRGlzYWJsZWRQaXBlIH0gZnJvbSBcIi4vaXMtc3VnZ2VzdGlvbi1kaXNhYmxlZC5waXBlXCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgSW5wdXRUZXh0TW9kdWxlLCBCdXR0b25Nb2R1bGUsIFNoYXJlZE1vZHVsZSwgVG9vbHRpcE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbQXV0b0NvbXBsZXRlLCBIaWdobGlnaHRQaXBlLCBJc1N1Z2dlc3Rpb25EaXNhYmxlZFBpcGVdLFxuICAgIGV4cG9ydHM6IFtBdXRvQ29tcGxldGUsIEhpZ2hsaWdodFBpcGVdLFxuXG59KVxuZXhwb3J0IGNsYXNzIEF1dG9Db21wbGV0ZU1vZHVsZSB7XG59XG4iXX0=