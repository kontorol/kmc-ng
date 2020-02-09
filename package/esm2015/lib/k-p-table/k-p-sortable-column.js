/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, HostListener, Input } from '@angular/core';
import { Table } from 'primeng/table';
import { DomHandler } from 'primeng/api';
export class KPSortableColumn {
    /**
     * @param {?} dt
     */
    constructor(dt) {
        this.dt = dt;
        this.subscription = this.dt.tableService.sortSource$.subscribe(sortMeta => {
            this.updateSortState();
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.updateSortState();
        this.isEnabled = !!this.field;
    }
    /**
     * @return {?}
     */
    updateSortState() {
        if (this.isEnabled) {
            this.sorted = this.dt.isSorted(this.field);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onClick(event) {
        if (this.isEnabled) {
            this.dt.sort({
                originalEvent: event,
                field: this.field
            });
            DomHandler.clearSelection();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
KPSortableColumn.decorators = [
    { type: Directive, args: [{
                selector: '[kpSortableColumn]',
                host: {
                    '[class.ui-sortable-column]': 'isEnabled',
                    '[class.ui-state-highlight]': 'sorted'
                }
            },] },
];
/** @nocollapse */
KPSortableColumn.ctorParameters = () => [
    { type: Table }
];
KPSortableColumn.propDecorators = {
    field: [{ type: Input, args: ["kpSortableColumn",] }],
    onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    KPSortableColumn.prototype.field;
    /** @type {?} */
    KPSortableColumn.prototype.isEnabled;
    /** @type {?} */
    KPSortableColumn.prototype.sorted;
    /** @type {?} */
    KPSortableColumn.prototype.subscription;
    /** @type {?} */
    KPSortableColumn.prototype.dt;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiay1wLXNvcnRhYmxlLWNvbHVtbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrYWx0dXJhLW5nL2thbHR1cmEtcHJpbWVuZy11aS8iLCJzb3VyY2VzIjpbImxpYi9rLXAtdGFibGUvay1wLXNvcnRhYmxlLWNvbHVtbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUVsRixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFTekMsTUFBTSxPQUFPLGdCQUFnQjs7OztJQVN6QixZQUFtQixFQUFTO1FBQVQsT0FBRSxHQUFGLEVBQUUsQ0FBTztRQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDdEUsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7OztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNsQyxDQUFDOzs7O0lBRUQsZUFBZTtRQUNYLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM5QztJQUNMLENBQUM7Ozs7O0lBR0QsT0FBTyxDQUFDLEtBQWlCO1FBQ3JCLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNoQixJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztnQkFDVCxhQUFhLEVBQUUsS0FBSztnQkFDcEIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2FBQ3BCLENBQUMsQ0FBQztZQUVMLFVBQVUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUM3QjtJQUNMLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1AsSUFBRyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDbkM7SUFDTCxDQUFDOzs7WUFqREosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLElBQUksRUFBRTtvQkFDRiw0QkFBNEIsRUFBRSxXQUFXO29CQUN6Qyw0QkFBNEIsRUFBRSxRQUFRO2lCQUN6QzthQUNKOzs7O1lBVFEsS0FBSzs7O29CQVlULEtBQUssU0FBQyxrQkFBa0I7c0JBd0J4QixZQUFZLFNBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDOzs7O0lBeEJqQyxpQ0FBeUM7O0lBRXpDLHFDQUFtQjs7SUFDbkIsa0NBQWdCOztJQUVoQix3Q0FBMkI7O0lBRWYsOEJBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBUYWJsZSB9IGZyb20gJ3ByaW1lbmcvdGFibGUnO1xuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvYXBpJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdba3BTb3J0YWJsZUNvbHVtbl0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy51aS1zb3J0YWJsZS1jb2x1bW5dJzogJ2lzRW5hYmxlZCcsXG4gICAgICAgICdbY2xhc3MudWktc3RhdGUtaGlnaGxpZ2h0XSc6ICdzb3J0ZWQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBLUFNvcnRhYmxlQ29sdW1uIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KFwia3BTb3J0YWJsZUNvbHVtblwiKSBmaWVsZDogc3RyaW5nO1xuXG4gICAgaXNFbmFibGVkOiBib29sZWFuO1xuICAgIHNvcnRlZDogYm9vbGVhbjtcblxuICAgIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGR0OiBUYWJsZSkge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuZHQudGFibGVTZXJ2aWNlLnNvcnRTb3VyY2UkLnN1YnNjcmliZShzb3J0TWV0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNvcnRTdGF0ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVTb3J0U3RhdGUoKTtcbiAgICAgICAgdGhpcy5pc0VuYWJsZWQgPSAhIXRoaXMuZmllbGQ7XG4gICAgfVxuXG4gICAgdXBkYXRlU29ydFN0YXRlKCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc29ydGVkID0gdGhpcy5kdC5pc1NvcnRlZCh0aGlzLmZpZWxkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgICBvbkNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5kdC5zb3J0KHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICBmaWVsZDogdGhpcy5maWVsZFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICBEb21IYW5kbGVyLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==