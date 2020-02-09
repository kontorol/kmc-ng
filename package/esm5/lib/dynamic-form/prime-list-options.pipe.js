/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
var PrimeListOptionsPipe = /** @class */ (function () {
    function PrimeListOptionsPipe() {
    }
    /**
     * @param {?} values
     * @param {?} addDefaultButton
     * @return {?}
     */
    PrimeListOptionsPipe.prototype.transform = /**
     * @param {?} values
     * @param {?} addDefaultButton
     * @return {?}
     */
    function (values, addDefaultButton) {
        /** @type {?} */
        var result = (values || []).map(function (value) {
            return { label: value.text, value: value.value };
        });
        if (addDefaultButton) {
            result.unshift({ label: 'Select a value', value: null });
        }
        return result;
    };
    PrimeListOptionsPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'kPrimeListOptions'
                },] },
    ];
    /** @nocollapse */
    PrimeListOptionsPipe.ctorParameters = function () { return []; };
    return PrimeListOptionsPipe;
}());
export { PrimeListOptionsPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbWUtbGlzdC1vcHRpb25zLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2FsdHVyYS1uZy9rYWx0dXJhLXByaW1lbmctdWkvIiwic291cmNlcyI6WyJsaWIvZHluYW1pYy1mb3JtL3ByaW1lLWxpc3Qtb3B0aW9ucy5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUdwRDtJQUtJO0lBQWMsQ0FBQzs7Ozs7O0lBRWYsd0NBQVM7Ozs7O0lBQVQsVUFBVSxNQUFjLEVBQUUsZ0JBQXlCOztZQUN6QyxNQUFNLEdBQUcsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsS0FBSztZQUN6QyxPQUFPLEVBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUM7UUFFQyxJQUFJLGdCQUFnQixFQUFFO1lBQ3JCLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBQyxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7U0FDdkQ7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDOztnQkFqQkosSUFBSSxTQUFDO29CQUNGLElBQUksRUFBRSxtQkFBbUI7aUJBQzVCOzs7O0lBZ0JELDJCQUFDO0NBQUEsQUFsQkQsSUFrQkM7U0FmWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuQFBpcGUoe1xuICAgIG5hbWU6ICdrUHJpbWVMaXN0T3B0aW9ucydcbn0pXG5leHBvcnQgY2xhc3MgUHJpbWVMaXN0T3B0aW9uc1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICAgIGNvbnN0cnVjdG9yKCl7fVxuXG4gICAgdHJhbnNmb3JtKHZhbHVlcyA6IGFueVtdLCBhZGREZWZhdWx0QnV0dG9uOiBib29sZWFuKTogYW55IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gKHZhbHVlcyB8fCBbXSkubWFwKHZhbHVlID0+IHtcblx0XHQgICAgcmV0dXJuIHtsYWJlbDogdmFsdWUudGV4dCwgdmFsdWU6IHZhbHVlLnZhbHVlfTtcblx0ICAgIH0pO1xuXG4gICAgICAgIGlmIChhZGREZWZhdWx0QnV0dG9uKSB7XG5cdCAgICAgICAgcmVzdWx0LnVuc2hpZnQoe2xhYmVsOiAnU2VsZWN0IGEgdmFsdWUnLCB2YWx1ZTogbnVsbH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG4iXX0=