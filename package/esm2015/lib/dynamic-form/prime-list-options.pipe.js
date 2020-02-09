/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
export class PrimeListOptionsPipe {
    constructor() { }
    /**
     * @param {?} values
     * @param {?} addDefaultButton
     * @return {?}
     */
    transform(values, addDefaultButton) {
        /** @type {?} */
        const result = (values || []).map(value => {
            return { label: value.text, value: value.value };
        });
        if (addDefaultButton) {
            result.unshift({ label: 'Select a value', value: null });
        }
        return result;
    }
}
PrimeListOptionsPipe.decorators = [
    { type: Pipe, args: [{
                name: 'kPrimeListOptions'
            },] },
];
/** @nocollapse */
PrimeListOptionsPipe.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbWUtbGlzdC1vcHRpb25zLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2FsdHVyYS1uZy9rYWx0dXJhLXByaW1lbmctdWkvIiwic291cmNlcyI6WyJsaWIvZHluYW1pYy1mb3JtL3ByaW1lLWxpc3Qtb3B0aW9ucy5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQU1wRCxNQUFNLE9BQU8sb0JBQW9CO0lBRTdCLGdCQUFjLENBQUM7Ozs7OztJQUVmLFNBQVMsQ0FBQyxNQUFjLEVBQUUsZ0JBQXlCOztjQUN6QyxNQUFNLEdBQUcsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzVDLE9BQU8sRUFBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBQyxDQUFDO1FBQ2hELENBQUMsQ0FBQztRQUVDLElBQUksZ0JBQWdCLEVBQUU7WUFDckIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFDLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztTQUN2RDtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7OztZQWpCSixJQUFJLFNBQUM7Z0JBQ0YsSUFBSSxFQUFFLG1CQUFtQjthQUM1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG5AUGlwZSh7XG4gICAgbmFtZTogJ2tQcmltZUxpc3RPcHRpb25zJ1xufSlcbmV4cG9ydCBjbGFzcyBQcmltZUxpc3RPcHRpb25zUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gICAgY29uc3RydWN0b3IoKXt9XG5cbiAgICB0cmFuc2Zvcm0odmFsdWVzIDogYW55W10sIGFkZERlZmF1bHRCdXR0b246IGJvb2xlYW4pOiBhbnkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSAodmFsdWVzIHx8IFtdKS5tYXAodmFsdWUgPT4ge1xuXHRcdCAgICByZXR1cm4ge2xhYmVsOiB2YWx1ZS50ZXh0LCB2YWx1ZTogdmFsdWUudmFsdWV9O1xuXHQgICAgfSk7XG5cbiAgICAgICAgaWYgKGFkZERlZmF1bHRCdXR0b24pIHtcblx0ICAgICAgICByZXN1bHQudW5zaGlmdCh7bGFiZWw6ICdTZWxlY3QgYSB2YWx1ZScsIHZhbHVlOiBudWxsfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cbiJdfQ==