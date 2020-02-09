/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
/** @type {?} */
const escape = s => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
const ɵ0 = escape;
export class HighlightPipe {
    /**
     * @param {?} value
     * @param {?} arg
     * @return {?}
     */
    transform(value, arg) {
        if (!arg.trim()) {
            return value;
        }
        try {
            /** @type {?} */
            const regex = new RegExp(`(${escape(arg)})`, 'i');
            return value.replace(regex, '<span class="kHighlightedText">$1</span>');
        }
        catch (e) {
            return value;
        }
    }
}
HighlightPipe.decorators = [
    { type: Pipe, args: [{
                name: 'kHighlight'
            },] },
];
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0LnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2FsdHVyYS1uZy9rYWx0dXJhLXByaW1lbmctdWkvIiwic291cmNlcyI6WyJsaWIvYXV0by1jb21wbGV0ZS9oaWdobGlnaHQucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7O01BRTlDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsd0JBQXdCLEVBQUUsTUFBTSxDQUFDOztBQUsvRCxNQUFNLE9BQU8sYUFBYTs7Ozs7O0lBQ3RCLFNBQVMsQ0FBQyxLQUFhLEVBQUUsR0FBVztRQUNoQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ2IsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxJQUFJOztrQkFDTSxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7WUFDakQsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSwwQ0FBMEMsQ0FBQyxDQUFDO1NBQzNFO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixPQUFPLEtBQUssQ0FBQztTQUNoQjtJQUNMLENBQUM7OztZQWZKLElBQUksU0FBQztnQkFDRixJQUFJLEVBQUUsWUFBWTthQUNyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuY29uc3QgZXNjYXBlID0gcyA9PiBzLnJlcGxhY2UoL1stXFwvXFxcXF4kKis/LigpfFtcXF17fV0vZywgJ1xcXFwkJicpO1xuXG5AUGlwZSh7XG4gICAgbmFtZTogJ2tIaWdobGlnaHQnXG59KVxuZXhwb3J0IGNsYXNzIEhpZ2hsaWdodFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgICB0cmFuc2Zvcm0odmFsdWU6IHN0cmluZywgYXJnOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIWFyZy50cmltKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoYCgke2VzY2FwZShhcmcpfSlgLCAnaScpO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UocmVnZXgsICc8c3BhbiBjbGFzcz1cImtIaWdobGlnaHRlZFRleHRcIj4kMTwvc3Bhbj4nKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19