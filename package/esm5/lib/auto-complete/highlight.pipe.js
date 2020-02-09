/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
/** @type {?} */
var escape = function (s) { return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'); };
var ɵ0 = escape;
var HighlightPipe = /** @class */ (function () {
    function HighlightPipe() {
    }
    /**
     * @param {?} value
     * @param {?} arg
     * @return {?}
     */
    HighlightPipe.prototype.transform = /**
     * @param {?} value
     * @param {?} arg
     * @return {?}
     */
    function (value, arg) {
        if (!arg.trim()) {
            return value;
        }
        try {
            /** @type {?} */
            var regex = new RegExp("(" + escape(arg) + ")", 'i');
            return value.replace(regex, '<span class="kHighlightedText">$1</span>');
        }
        catch (e) {
            return value;
        }
    };
    HighlightPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'kHighlight'
                },] },
    ];
    return HighlightPipe;
}());
export { HighlightPipe };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0LnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2FsdHVyYS1uZy9rYWx0dXJhLXByaW1lbmctdWkvIiwic291cmNlcyI6WyJsaWIvYXV0by1jb21wbGV0ZS9oaWdobGlnaHQucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7O0lBRTlDLE1BQU0sR0FBRyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsd0JBQXdCLEVBQUUsTUFBTSxDQUFDLEVBQTNDLENBQTJDOztBQUUvRDtJQUFBO0lBZ0JBLENBQUM7Ozs7OztJQVpHLGlDQUFTOzs7OztJQUFULFVBQVUsS0FBYSxFQUFFLEdBQVc7UUFDaEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNiLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBRUQsSUFBSTs7Z0JBQ00sS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLE1BQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFHLEVBQUUsR0FBRyxDQUFDO1lBQ2pELE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsMENBQTBDLENBQUMsQ0FBQztTQUMzRTtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsT0FBTyxLQUFLLENBQUM7U0FDaEI7SUFDTCxDQUFDOztnQkFmSixJQUFJLFNBQUM7b0JBQ0YsSUFBSSxFQUFFLFlBQVk7aUJBQ3JCOztJQWNELG9CQUFDO0NBQUEsQUFoQkQsSUFnQkM7U0FiWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5jb25zdCBlc2NhcGUgPSBzID0+IHMucmVwbGFjZSgvWy1cXC9cXFxcXiQqKz8uKCl8W1xcXXt9XS9nLCAnXFxcXCQmJyk7XG5cbkBQaXBlKHtcbiAgICBuYW1lOiAna0hpZ2hsaWdodCdcbn0pXG5leHBvcnQgY2xhc3MgSGlnaGxpZ2h0UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIHRyYW5zZm9ybSh2YWx1ZTogc3RyaW5nLCBhcmc6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGlmICghYXJnLnRyaW0oKSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cChgKCR7ZXNjYXBlKGFyZyl9KWAsICdpJyk7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUucmVwbGFjZShyZWdleCwgJzxzcGFuIGNsYXNzPVwia0hpZ2hsaWdodGVkVGV4dFwiPiQxPC9zcGFuPicpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=