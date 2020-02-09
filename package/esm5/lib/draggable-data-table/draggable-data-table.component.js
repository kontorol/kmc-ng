/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ContentChildren, ElementRef, EventEmitter, Input, Output, QueryList, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { ColumnComponent } from './column.component';
import "rxjs/add/operator/delay";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';
/** @type {?} */
var sortingFunction = function (a, b) {
    if (a === b)
        return 0;
    else if (a < b)
        return -1;
    else
        return 1;
};
var ɵ0 = sortingFunction;
/** @type {?} */
var Events = {
    MOUSE_UP: 'mouseup',
    MOUSE_MOVE: 'mousemove',
    MOUSE_DOWN: 'mousedown',
    MOUSE_OVER: 'mouseover',
    MOUSE_ENTER: 'mouseenter',
    MOUSE_LEAVE: 'mouseleave'
};
var DraggableDataTableComponent = /** @class */ (function () {
    function DraggableDataTableComponent(renderer) {
        this.renderer = renderer;
        this.valueChange = new EventEmitter();
        this.dragModeOff = true;
        this.selectedIndexes = [];
        this._currentPlaceHolderIndex = -1;
        this._dropAvailable = false;
        this.unDraggableFromTop = 0;
        this.unDraggableFromBottom = 0;
        this.rowTrackBy = function (index, item) { return item; };
        this.columnTrackBy = function (index, item) { return item; };
        this.paginator = false;
        this.showIndex = false;
        this.multipleDragAndDrop = false;
        this.selectable = false;
        this.selectionChange = new EventEmitter();
        this.pageChange = new EventEmitter();
    }
    Object.defineProperty(DraggableDataTableComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.dragModeOff) {
                return this._value;
            }
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            if (val) {
                this._value = tslib_1.__spread(val);
                this._orderItems();
            }
            else {
                this._value = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    // component lifecycle events
    // component lifecycle events
    /**
     * @return {?}
     */
    DraggableDataTableComponent.prototype.ngOnInit = 
    // component lifecycle events
    /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.paginator) {
            this.unDraggableFromBottom = this.rows;
        }
        this._orderItems();
        this.draggable = this.draggableElement.nativeElement;
        this.tableBodyElement = this.tableBody.nativeElement;
        this.mouseMove = Observable.fromEvent(document, Events.MOUSE_MOVE).delay(50);
        // cover non-permitted dragging/dropping:
        Observable.fromEvent(document, Events.MOUSE_UP).subscribe(function () { return _this.onMouseUp(); });
        Observable.fromEvent(this.tableBody.nativeElement, Events.MOUSE_LEAVE).subscribe(function () { return _this._onMouseLeave(); });
        Observable.fromEvent(this.tableBody.nativeElement, Events.MOUSE_ENTER).subscribe(function () { return _this._onMouseEnter(); });
    };
    /**
     * @return {?}
     */
    DraggableDataTableComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.columns = this.cols.toArray();
    };
    // public API methods
    // public API methods
    /**
     * @param {?} event
     * @return {?}
     */
    DraggableDataTableComponent.prototype.onMouseMove = 
    // public API methods
    /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._updateDraggable(event);
    };
    /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    DraggableDataTableComponent.prototype.onMouseOver = /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    function (event, index) {
        // only for D&D mode:
        if (!this.dragModeOff && index !== this._currentPlaceHolderIndex) {
            // get mouse location to recognize where to add the placeholder (from top or bottom):
            /** @type {?} */
            var middle = event.currentTarget.getBoundingClientRect().top + (event.currentTarget.getBoundingClientRect().height / 2);
            /** @type {?} */
            var hoveredRow = Object.create(Object.getPrototypeOf(this.draggableItems[index]));
            Object.assign(hoveredRow, this.draggableItems[index]);
            // delete previous:
            if (this._currentPlaceHolderIndex !== -1) {
                this.draggableItems.splice(this._currentPlaceHolderIndex, 1);
            }
            // add placeholder from the bottom:
            if (event.clientY > middle) {
                this._currentPlaceHolderIndex = index + 1;
                this.draggableItems.splice(this._currentPlaceHolderIndex, 0, hoveredRow);
                this.draggableItems[this._currentPlaceHolderIndex].class = 'hovered';
                this._updateView();
            }
            else { // add placeholder from the top:
                this._currentPlaceHolderIndex = index;
                this.draggableItems.splice(this._currentPlaceHolderIndex, 0, hoveredRow);
                this.draggableItems[this._currentPlaceHolderIndex].class = 'hovered';
                this._updateView();
            }
        }
    };
    /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    DraggableDataTableComponent.prototype.onMouseDown = /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    function (event, index) {
        var _this = this;
        // only left button mouse click
        if (event.which === 1) {
            if (this.multipleDragAndDrop) {
                // sign draggable item as 'checked' if it's not:
                /** @type {?} */
                var currentClickedIndex = this.getItemIndex(index);
                if (this.selectedIndexes.indexOf(currentClickedIndex) === -1) {
                    this.selectedIndexes = tslib_1.__spread([currentClickedIndex], this.selectedIndexes);
                }
                // edge-case when all items are selected - d&d should be disabled
                if (this.selectedIndexes.length === this._value.length) {
                    return;
                }
                this.selectedIndexes.forEach(function (index) { return _this._value[index].class = 'open'; });
                this._value = tslib_1.__spread(this._value);
            }
            event.preventDefault();
            this.currentDraggableItem = this.draggableItems[index];
            this._updateDraggable(event);
            this.dragModeOff = false;
            this._currentDraggedIndex = index;
            this._currentDraggedElement = event.currentTarget;
            this._currentDraggedElement['classList'].add('open');
            this.mouseMoveSubscription = this.mouseMove.subscribe(function (e) { return _this.onMouseMove(e); });
            this.renderer.addClass(this.draggable, 'fadeIn');
        }
    };
    /**
     * @return {?}
     */
    DraggableDataTableComponent.prototype.onMouseUp = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var _a;
        if (!this.dragModeOff) {
            this.dragModeOff = true;
            this._currentDraggedElement['classList'].remove('open');
            this._value.forEach(function (item) { return delete item['class']; });
            this.mouseMoveSubscription.unsubscribe();
            this.renderer.setStyle(document.body, 'cursor', 'default');
            if (this._dropAvailable) {
                if (this._currentPlaceHolderIndex !== -1) {
                    if (this.multipleDragAndDrop) {
                        // save item of this._currentPlaceHolderIndex - we'll need this item to find the entry-point:
                        /** @type {?} */
                        var insertIndexReference = this.draggableItems[this._currentPlaceHolderIndex];
                        // save all dragged items aside:
                        /** @type {?} */
                        var draggedItems = this.selectedIndexes.sort(sortingFunction).map(function (index) { return _this._value[index + ((index >= _this._currentPlaceHolderIndex) ? 1 : 0)]; });
                        // remove dragged (selected items) from the original data:
                        draggedItems.forEach(function (item) { return _this._value.splice(_this._value.indexOf(item), 1); });
                        // insert draggable items back to the original data but with new order:
                        (_a = this._value).splice.apply(_a, tslib_1.__spread([this._value.indexOf(insertIndexReference), 1], draggedItems));
                        // initiate state:
                        this._currentPlaceHolderIndex = -1;
                        this.selectedIndexes = [];
                        this._orderItems();
                        this._updateView();
                        this.onSelectionChange();
                    }
                    else {
                        /** @type {?} */
                        var buffer = (this._currentDraggedIndex >= this._currentPlaceHolderIndex) ? 1 : 0;
                        // insert dragged item to the new location:
                        this.draggableItems[this._currentPlaceHolderIndex] = this.draggableItems[this._currentDraggedIndex + buffer];
                        // remove dragged item previous location & update view:
                        this.draggableItems.splice(this._currentDraggedIndex + buffer, 1);
                        // initiate state:
                        this._currentPlaceHolderIndex = -1;
                        this._updateView();
                    }
                }
            }
            else {
                // undroppable area - initiate state:
                this.draggableItems.splice(this._currentPlaceHolderIndex, 1);
                this._currentPlaceHolderIndex = -1;
                this.selectedIndexes = [];
                this.onSelectionChange();
                this._updateView();
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DraggableDataTableComponent.prototype.paginate = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.unDraggableFromTop = event.first;
        this.unDraggableFromBottom = (event.first + event.rows);
        this.value = tslib_1.__spread(this.unDraggableItemsFromTop, this.draggableItems, this.unDraggableItemsFromBottom);
        this.pageChange.emit(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DraggableDataTableComponent.prototype.selectAll = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.selectedIndexes = (event) ? tslib_1.__spread(Array.from(Array(this._value.length), function (_, x) { return x; })) : [];
        this.onSelectionChange();
    };
    /**
     * @return {?}
     */
    DraggableDataTableComponent.prototype.onSelectionChange = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.selectionChange.emit(this.selectedIndexes.sort(sortingFunction).map(function (index) { return _this._value[index]; }));
    };
    /**
     * @param {?} index
     * @return {?}
     */
    DraggableDataTableComponent.prototype.getItemIndex = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        return this._value.indexOf(this.draggableItems[index]);
    };
    // private methods
    // private methods
    /**
     * @private
     * @return {?}
     */
    DraggableDataTableComponent.prototype._updateView = 
    // private methods
    /**
     * @private
     * @return {?}
     */
    function () {
        this.value = (this.paginator) ? tslib_1.__spread(this.unDraggableItemsFromTop, this.draggableItems, this.unDraggableItemsFromBottom) : tslib_1.__spread(this.draggableItems);
        if (this.dragModeOff) {
            this.valueChange.emit(this.value);
        }
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    DraggableDataTableComponent.prototype._updateDraggable = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.renderer.setStyle(this.draggable, 'position', 'fixed');
        this.renderer.setStyle(this.draggable, 'left', event.clientX + 20 + 'px');
        this.renderer.setStyle(this.draggable, 'top', event.clientY - 35 + 'px');
    };
    /**
     * @private
     * @return {?}
     */
    DraggableDataTableComponent.prototype._onMouseLeave = /**
     * @private
     * @return {?}
     */
    function () {
        this._dropAvailable = false;
        if (!this.dragModeOff) {
            this.renderer.setStyle(document.body, 'cursor', 'no-drop');
        }
    };
    /**
     * @private
     * @return {?}
     */
    DraggableDataTableComponent.prototype._onMouseEnter = /**
     * @private
     * @return {?}
     */
    function () {
        this._dropAvailable = true;
    };
    /**
     * @private
     * @return {?}
     */
    DraggableDataTableComponent.prototype._orderItems = /**
     * @private
     * @return {?}
     */
    function () {
        if (!!this.value) {
            if (this.paginator) {
                // once using d&d with pagination page-size has to be increased by 1 because of the added placeholder
                /** @type {?} */
                var buffer = (this._currentPlaceHolderIndex === -1) ? 0 : 1;
                this.unDraggableItemsFromTop = tslib_1.__spread(this.value.slice(0, this.unDraggableFromTop));
                this.unDraggableItemsFromBottom = tslib_1.__spread(this.value.slice(this.unDraggableFromBottom + buffer));
                this.draggableItems = tslib_1.__spread(this.value.slice(this.unDraggableFromTop, this.unDraggableFromBottom + buffer));
            }
            else {
                this.draggableItems = tslib_1.__spread(this.value);
            }
        }
    };
    DraggableDataTableComponent.decorators = [
        { type: Component, args: [{
                    selector: 'k-draggable-data-table',
                    template: "<table [ngClass]=\"{ 'onDragMode' : !dragModeOff }\">\n  <thead>\n  <tr>\n    <th class=\"draggable-row-icon-placeholder\"></th>\n    <th *ngIf=\"selectable\" class=\"draggable-row-check-box\">\n      <p-checkbox (onChange)=\"selectAll($event)\"></p-checkbox>\n    </th>\n    <td *ngIf=\"showIndex\" class=\"draggable-row-index\"></td>\n    <th *ngFor=\"let col of columns\" [ngStyle]=\"col.style\">{{col.header}}</th>\n  </tr>\n  </thead>\n  <tbody #tableBody>\n\n  <tr *ngFor=\"let row of draggableItems;index as i;\" [class]=\"row.class\" [ngClass]=\"{ 'draggable-row' : true }\"\n      (mouseover)=\"onMouseOver($event, i)\" (mouseup)=\"onMouseUp()\">\n\n    <td class=\"draggable-row-icon-placeholder\" (mousedown)=\"onMouseDown($event, i)\">\n      <span class=\"draggable-row-icon\"></span>\n      <span class=\"draggable-row-icon\"></span>\n      <span class=\"draggable-row-icon\"></span>\n      <span class=\"draggable-row-icon\"></span>\n    </td>\n    <td *ngIf=\"selectable\" class=\"draggable-row-check-box\">\n      <p-checkbox [value]=\"getItemIndex(i)\" [(ngModel)]=\"selectedIndexes\" (onChange)=\"onSelectionChange()\">\n      </p-checkbox>\n    </td>\n    <td *ngIf=\"showIndex\" class=\"draggable-row-index\" (mousedown)=\"onMouseDown($event, i)\">\n      <span>{{getItemIndex(i) + 1}}</span>\n    </td>\n    <td *ngFor=\"let col of columns\" [ngStyle]=\"col.style\" (mousedown)=\"onMouseDown($event, i)\">\n      <ng-container\n        *ngTemplateOutlet=\"col.template; context: { $implicit: col, rowData: row, rowIndex: getItemIndex(i)}\"></ng-container>\n    </td>\n  </tr>\n  </tbody>\n</table>\n\n<div *ngIf=\"(!!draggableItems && draggableItems.length === 0) || !draggableItems\"\n     class=\"empty-state-placeholder\">\n  <ng-container *ngTemplateOutlet=\"emptyStateTemplate\"></ng-container>\n</div>\n\n<p-paginator *ngIf=\"paginator\" [rows]=\"rows\" [totalRecords]=\"value ? value.length : 0\"\n             [rowsPerPageOptions]=\"rowsPerPageOptions\" (onPageChange)=\"paginate($event)\">\n</p-paginator>\n\n<div #draggable [hidden]=\"dragModeOff\"\n     [ngClass]=\"{ 'multiple-drag-and-drop' : (multipleDragAndDrop && selectedIndexes.length > 1) }\"\n     (mouseup)=\"onMouseUp()\" (mousemove)=\"onMouseMove($event)\">\n  <span *ngIf=\"multipleDragAndDrop && selectedIndexes.length > 1\" class=\"selected-items-counter\">{{selectedIndexes.length}}</span>\n  <ng-container *ngTemplateOutlet=\"draggableViewTemplate; context: {currentDraggableItem: currentDraggableItem}\">\n  </ng-container>\n</div>\n",
                    styles: ["table{width:100%;text-align:left;table-layout:fixed;border-collapse:collapse}table thead{border:1px solid #d9d9d9;border-left:none;border-right:none}table thead tr{height:32px;color:#999}table tbody{overflow:auto}table tbody tr{height:70px;background:#fff;color:#999}table tr{border:1px solid #d9d9d9;color:#333;border-left:none;border-right:none}.open{opacity:.5}.hovered{background-color:#ebebeb!important;text-indent:-9999px;border:none!important}.draggable-row-icon{display:none;width:4px;height:4px;border-radius:2px;background-color:#ccc;margin:4px 0 4px 7px}.draggable-row-check-box,.draggable-row-icon-placeholder,.draggable-row-index{width:15px}.draggable-row-check-box{width:44px}.draggable-row{cursor:-webkit-grab;cursor:grab}.onDragMode .draggable-row{cursor:-webkit-grabbing;cursor:grabbing}.draggable-row:hover .draggable-row-icon{display:block}.onDragMode .draggable-row:hover .draggable-row-icon{display:none}.fadeIn{-webkit-animation-name:fadeIn;animation-name:fadeIn;-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-fill-mode:both;animation-fill-mode:both}.multiple-drag-and-drop{box-shadow:5px 5px 0 0 #fff,7px 7px 8px 0 rgba(50,50,50,.38);border-radius:2px}.selected-items-counter{z-index:1;width:20px;height:20px;background:#00a784;display:block;border-radius:10px;color:#fff;text-align:center;position:absolute;top:-10px;right:-10px;font-size:small;line-height:150%;font-weight:700}.empty-state-placeholder{text-align:center}@-webkit-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@keyframes fadeIn{0%{opacity:0}100%{opacity:1}}"]
                },] },
    ];
    /** @nocollapse */
    DraggableDataTableComponent.ctorParameters = function () { return [
        { type: Renderer2 }
    ]; };
    DraggableDataTableComponent.propDecorators = {
        emptyStateTemplate: [{ type: Input }],
        draggableViewTemplate: [{ type: Input }],
        valueChange: [{ type: Output }],
        draggableElement: [{ type: ViewChild, args: ['draggable',] }],
        tableBody: [{ type: ViewChild, args: ['tableBody',] }],
        cols: [{ type: ContentChildren, args: [ColumnComponent,] }],
        value: [{ type: Input }],
        unDraggableFromTop: [{ type: Input }],
        unDraggableFromBottom: [{ type: Input }],
        rowTrackBy: [{ type: Input }],
        columnTrackBy: [{ type: Input }],
        paginator: [{ type: Input }],
        rows: [{ type: Input }],
        rowsPerPageOptions: [{ type: Input }],
        showIndex: [{ type: Input }],
        multipleDragAndDrop: [{ type: Input }],
        selectable: [{ type: Input }],
        selectionChange: [{ type: Output }],
        pageChange: [{ type: Output }]
    };
    return DraggableDataTableComponent;
}());
export { DraggableDataTableComponent };
if (false) {
    /** @type {?} */
    DraggableDataTableComponent.prototype.emptyStateTemplate;
    /** @type {?} */
    DraggableDataTableComponent.prototype.draggableViewTemplate;
    /** @type {?} */
    DraggableDataTableComponent.prototype.valueChange;
    /**
     * @type {?}
     * @private
     */
    DraggableDataTableComponent.prototype.draggableElement;
    /**
     * @type {?}
     * @private
     */
    DraggableDataTableComponent.prototype.tableBody;
    /** @type {?} */
    DraggableDataTableComponent.prototype.cols;
    /** @type {?} */
    DraggableDataTableComponent.prototype.currentDraggableItem;
    /** @type {?} */
    DraggableDataTableComponent.prototype.draggable;
    /** @type {?} */
    DraggableDataTableComponent.prototype.tableBodyElement;
    /** @type {?} */
    DraggableDataTableComponent.prototype.columns;
    /** @type {?} */
    DraggableDataTableComponent.prototype.dragModeOff;
    /** @type {?} */
    DraggableDataTableComponent.prototype.selectedIndexes;
    /** @type {?} */
    DraggableDataTableComponent.prototype.mouseMoveSubscription;
    /** @type {?} */
    DraggableDataTableComponent.prototype.mouseMove;
    /**
     * @type {?}
     * @private
     */
    DraggableDataTableComponent.prototype._value;
    /** @type {?} */
    DraggableDataTableComponent.prototype.draggableItems;
    /** @type {?} */
    DraggableDataTableComponent.prototype.unDraggableItemsFromTop;
    /** @type {?} */
    DraggableDataTableComponent.prototype.unDraggableItemsFromBottom;
    /**
     * @type {?}
     * @private
     */
    DraggableDataTableComponent.prototype._currentDraggedIndex;
    /**
     * @type {?}
     * @private
     */
    DraggableDataTableComponent.prototype._currentPlaceHolderIndex;
    /**
     * @type {?}
     * @private
     */
    DraggableDataTableComponent.prototype._currentDraggedElement;
    /**
     * @type {?}
     * @private
     */
    DraggableDataTableComponent.prototype._dropAvailable;
    /** @type {?} */
    DraggableDataTableComponent.prototype.unDraggableFromTop;
    /** @type {?} */
    DraggableDataTableComponent.prototype.unDraggableFromBottom;
    /** @type {?} */
    DraggableDataTableComponent.prototype.rowTrackBy;
    /** @type {?} */
    DraggableDataTableComponent.prototype.columnTrackBy;
    /** @type {?} */
    DraggableDataTableComponent.prototype.paginator;
    /** @type {?} */
    DraggableDataTableComponent.prototype.rows;
    /** @type {?} */
    DraggableDataTableComponent.prototype.rowsPerPageOptions;
    /** @type {?} */
    DraggableDataTableComponent.prototype.showIndex;
    /** @type {?} */
    DraggableDataTableComponent.prototype.multipleDragAndDrop;
    /** @type {?} */
    DraggableDataTableComponent.prototype.selectable;
    /** @type {?} */
    DraggableDataTableComponent.prototype.selectionChange;
    /** @type {?} */
    DraggableDataTableComponent.prototype.pageChange;
    /**
     * @type {?}
     * @private
     */
    DraggableDataTableComponent.prototype.renderer;
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ2dhYmxlLWRhdGEtdGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGthbHR1cmEtbmcva2FsdHVyYS1wcmltZW5nLXVpLyIsInNvdXJjZXMiOlsibGliL2RyYWdnYWJsZS1kYXRhLXRhYmxlL2RyYWdnYWJsZS1kYXRhLXRhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDYSxTQUFTLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFDN0YsU0FBUyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUM3QyxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFFbkQsT0FBTyx5QkFBeUIsQ0FBQztBQUNqQyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTywrQkFBK0IsQ0FBQzs7SUFFakMsZUFBZSxHQUFHLFVBQUMsQ0FBQyxFQUFFLENBQUM7SUFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNULE9BQU8sQ0FBQyxDQUFDO1NBQ04sSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNaLE9BQU8sQ0FBQyxDQUFDLENBQUM7O1FBRVYsT0FBTyxDQUFDLENBQUM7QUFDYixDQUFDOzs7SUFFSyxNQUFNLEdBQUc7SUFDYixRQUFRLEVBQUUsU0FBUztJQUNuQixVQUFVLEVBQUUsV0FBVztJQUN2QixVQUFVLEVBQUUsV0FBVztJQUN2QixVQUFVLEVBQUUsV0FBVztJQUN2QixXQUFXLEVBQUUsWUFBWTtJQUN6QixXQUFXLEVBQUUsWUFBWTtDQUMxQjtBQUVEO0lBaUpFLHFDQUFvQixRQUFtQjtRQUFuQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBakY3QixnQkFBVyxHQUF3QixJQUFJLFlBQVksRUFBUyxDQUFDO1FBZ0J2RSxnQkFBVyxHQUFZLElBQUksQ0FBQztRQUU1QixvQkFBZSxHQUFhLEVBQUUsQ0FBQztRQWdCdkIsNkJBQXdCLEdBQVcsQ0FBQyxDQUFDLENBQUM7UUFJdEMsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFrQnRCLHVCQUFrQixHQUFHLENBQUMsQ0FBQztRQUV2QiwwQkFBcUIsR0FBRyxDQUFDLENBQUM7UUFFMUIsZUFBVSxHQUFhLFVBQUMsS0FBYSxFQUFFLElBQVMsSUFBSyxPQUFBLElBQUksRUFBSixDQUFJLENBQUM7UUFFMUQsa0JBQWEsR0FBYSxVQUFDLEtBQWEsRUFBRSxJQUFTLElBQUssT0FBQSxJQUFJLEVBQUosQ0FBSSxDQUFDO1FBRTdELGNBQVMsR0FBWSxLQUFLLENBQUM7UUFNM0IsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUUzQix3QkFBbUIsR0FBWSxLQUFLLENBQUM7UUFFckMsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUUzQixvQkFBZSxHQUF3QixJQUFJLFlBQVksRUFBUyxDQUFDO1FBRWpFLGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztJQUlsRSxDQUFDO0lBMUNELHNCQUFhLDhDQUFLOzs7O1FBU2xCO1lBQ0UsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNwQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7YUFDcEI7UUFDSCxDQUFDOzs7OztRQWJELFVBQW1CLEdBQVU7WUFDM0IsSUFBSSxHQUFHLEVBQUU7Z0JBQ1AsSUFBSSxDQUFDLE1BQU0sb0JBQU8sR0FBRyxDQUFDLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUNwQjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzthQUNwQjtRQUNILENBQUM7OztPQUFBO0lBcUNELDZCQUE2Qjs7Ozs7SUFDN0IsOENBQVE7Ozs7O0lBQVI7UUFBQSxpQkFjQztRQWJDLElBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNqQixJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztTQUN4QztRQUVELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUM7UUFDckQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO1FBQ3JELElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUU3RSx5Q0FBeUM7UUFDekMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFNBQVMsRUFBRSxFQUFoQixDQUFnQixDQUFDLENBQUM7UUFDbEYsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsU0FBUyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsYUFBYSxFQUFFLEVBQXBCLENBQW9CLENBQUMsQ0FBQztRQUM3RyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxTQUFTLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxhQUFhLEVBQUUsRUFBcEIsQ0FBb0IsQ0FBQyxDQUFDO0lBQy9HLENBQUM7Ozs7SUFFRCx3REFBa0I7OztJQUFsQjtRQUNFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQscUJBQXFCOzs7Ozs7SUFDckIsaURBQVc7Ozs7OztJQUFYLFVBQVksS0FBaUI7UUFDM0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUM7Ozs7OztJQUVELGlEQUFXOzs7OztJQUFYLFVBQVksS0FBVSxFQUFFLEtBQWE7UUFFbkMscUJBQXFCO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsd0JBQXdCLEVBQUU7OztnQkFHMUQsTUFBTSxHQUFXLEtBQUssQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzs7Z0JBQzNILFVBQVUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ25GLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUV0RCxtQkFBbUI7WUFDbkIsSUFBSSxJQUFJLENBQUMsd0JBQXdCLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQ3hDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUM5RDtZQUVELG1DQUFtQztZQUNuQyxJQUFJLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxFQUFFO2dCQUMxQixJQUFJLENBQUMsd0JBQXdCLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDMUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDekUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO2dCQUNyRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDcEI7aUJBQU0sRUFBRSxnQ0FBZ0M7Z0JBQ3ZDLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxLQUFLLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQ3pFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztnQkFDckUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3BCO1NBQ0Y7SUFDSCxDQUFDOzs7Ozs7SUFFRCxpREFBVzs7Ozs7SUFBWCxVQUFZLEtBQWlCLEVBQUUsS0FBYTtRQUE1QyxpQkE4QkM7UUE3QkMsK0JBQStCO1FBQy9CLElBQUksS0FBSyxDQUFDLEtBQUssS0FBSyxDQUFDLEVBQUU7WUFDckIsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7OztvQkFHdEIsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7Z0JBQ3BELElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtvQkFDNUQsSUFBSSxDQUFDLGVBQWUscUJBQUksbUJBQW1CLEdBQUssSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2lCQUN2RTtnQkFFRCxpRUFBaUU7Z0JBQ2pFLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7b0JBQ3RELE9BQU87aUJBQ1I7Z0JBRUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssR0FBRyxNQUFNLEVBQWpDLENBQWlDLENBQUMsQ0FBQztnQkFDekUsSUFBSSxDQUFDLE1BQU0sb0JBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ2hDO1lBRUQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUN6QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDO1lBQ2xELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFVBQUMsQ0FBYSxJQUFLLE9BQUEsS0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDO1lBQzlGLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDbEQ7SUFDSCxDQUFDOzs7O0lBRUQsK0NBQVM7OztJQUFUO1FBQUEsaUJBcURDOztRQXBEQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUN4QixJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQXBCLENBQW9CLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFFM0QsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUN2QixJQUFJLElBQUksQ0FBQyx3QkFBd0IsS0FBSyxDQUFDLENBQUMsRUFBRTtvQkFDeEMsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7Ozs0QkFHeEIsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUM7Ozs0QkFHdkUsWUFBWSxHQUFVLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsQ0FBTSxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBdkUsQ0FBdUUsQ0FBQzt3QkFFakssMERBQTBEO3dCQUMxRCxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQWhELENBQWdELENBQUMsQ0FBQzt3QkFFL0UsdUVBQXVFO3dCQUN2RSxDQUFBLEtBQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQSxDQUFDLE1BQU0sNkJBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsRUFBRSxDQUFDLEdBQUssWUFBWSxHQUFFO3dCQUVsRixrQkFBa0I7d0JBQ2xCLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDbkMsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7d0JBQzFCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzt3QkFDbkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO3dCQUNuQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztxQkFDMUI7eUJBQ0k7OzRCQUNHLE1BQU0sR0FBVyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMzRiwyQ0FBMkM7d0JBQzNDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsTUFBTSxDQUFDLENBQUM7d0JBRTdHLHVEQUF1RDt3QkFDdkQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFFbEUsa0JBQWtCO3dCQUNsQixJQUFJLENBQUMsd0JBQXdCLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQ25DLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztxQkFDcEI7aUJBQ0Y7YUFDRjtpQkFBTTtnQkFDTCxxQ0FBcUM7Z0JBQ3JDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDN0QsSUFBSSxDQUFDLHdCQUF3QixHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUNwQjtTQUNGO0lBQ0gsQ0FBQzs7Ozs7SUFFRCw4Q0FBUTs7OztJQUFSLFVBQVMsS0FBVTtRQUNqQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUN0QyxJQUFJLENBQUMscUJBQXFCLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsS0FBSyxvQkFBTyxJQUFJLENBQUMsdUJBQXVCLEVBQUssSUFBSSxDQUFDLGNBQWMsRUFBSyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUMzRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDOzs7OztJQUVELCtDQUFTOzs7O0lBQVQsVUFBVSxLQUFVO1FBQ2xCLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGtCQUFLLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsVUFBQyxDQUFDLEVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxFQUFELENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDN0YsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDM0IsQ0FBQzs7OztJQUVELHVEQUFpQjs7O0lBQWpCO1FBQUEsaUJBRUM7UUFEQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFsQixDQUFrQixDQUFDLENBQUMsQ0FBQztJQUN6RyxDQUFDOzs7OztJQUVELGtEQUFZOzs7O0lBQVosVUFBYSxLQUFhO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRCxrQkFBa0I7Ozs7OztJQUNWLGlEQUFXOzs7Ozs7SUFBbkI7UUFDRSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsa0JBQUssSUFBSSxDQUFDLHVCQUF1QixFQUFLLElBQUksQ0FBQyxjQUFjLEVBQUssSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUMsa0JBQUssSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3pKLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUFFO0lBQzlELENBQUM7Ozs7OztJQUVPLHNEQUFnQjs7Ozs7SUFBeEIsVUFBeUIsS0FBaUI7UUFDeEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLE9BQU8sR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLE9BQU8sR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDM0UsQ0FBQzs7Ozs7SUFFTyxtREFBYTs7OztJQUFyQjtRQUNFLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQzVEO0lBQ0gsQ0FBQzs7Ozs7SUFFTyxtREFBYTs7OztJQUFyQjtRQUNFLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO0lBQzdCLENBQUM7Ozs7O0lBRU8saURBQVc7Ozs7SUFBbkI7UUFDRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2hCLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTs7O29CQUVaLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTdELElBQUksQ0FBQyx1QkFBdUIsb0JBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pGLElBQUksQ0FBQywwQkFBMEIsb0JBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzdGLElBQUksQ0FBQyxjQUFjLG9CQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMscUJBQXFCLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQzthQUMzRztpQkFBTTtnQkFDTCxJQUFJLENBQUMsY0FBYyxvQkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdkM7U0FDRjtJQUNILENBQUM7O2dCQTNWRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtvQkFDbEMsUUFBUSxFQUFFLHcrRUFxRFg7b0JBQ0MsTUFBTSxFQUFFLENBQUMsc2lEQUFzaUQsQ0FBQztpQkFDampEOzs7O2dCQW5GWSxTQUFTOzs7cUNBc0ZuQixLQUFLO3dDQUVMLEtBQUs7OEJBRUwsTUFBTTttQ0FFTixTQUFTLFNBQUMsV0FBVzs0QkFFckIsU0FBUyxTQUFDLFdBQVc7dUJBRXJCLGVBQWUsU0FBQyxlQUFlO3dCQWtDL0IsS0FBSztxQ0FnQkwsS0FBSzt3Q0FFTCxLQUFLOzZCQUVMLEtBQUs7Z0NBRUwsS0FBSzs0QkFFTCxLQUFLO3VCQUVMLEtBQUs7cUNBRUwsS0FBSzs0QkFFTCxLQUFLO3NDQUVMLEtBQUs7NkJBRUwsS0FBSztrQ0FFTCxNQUFNOzZCQUVOLE1BQU07O0lBOE1ULGtDQUFDO0NBQUEsQUE1VkQsSUE0VkM7U0FsU1ksMkJBQTJCOzs7SUFFdEMseURBQThDOztJQUU5Qyw0REFBaUQ7O0lBRWpELGtEQUF1RTs7Ozs7SUFFdkUsdURBQTZEOzs7OztJQUU3RCxnREFBc0Q7O0lBRXRELDJDQUFtRTs7SUFFbkUsMkRBQTBCOztJQUUxQixnREFBZTs7SUFFZix1REFBc0I7O0lBRXRCLDhDQUEyQjs7SUFFM0Isa0RBQTRCOztJQUU1QixzREFBK0I7O0lBRS9CLDREQUFvQzs7SUFFcEMsZ0RBQTJCOzs7OztJQUUzQiw2Q0FBc0I7O0lBRXRCLHFEQUE2Qjs7SUFFN0IsOERBQXNDOztJQUV0QyxpRUFBeUM7Ozs7O0lBRXpDLDJEQUFxQzs7Ozs7SUFFckMsK0RBQThDOzs7OztJQUU5Qyw2REFBNEM7Ozs7O0lBRTVDLHFEQUErQjs7SUFrQi9CLHlEQUFnQzs7SUFFaEMsNERBQW1DOztJQUVuQyxpREFBbUU7O0lBRW5FLG9EQUFzRTs7SUFFdEUsZ0RBQW9DOztJQUVwQywyQ0FBc0I7O0lBRXRCLHlEQUFzQzs7SUFFdEMsZ0RBQW9DOztJQUVwQywwREFBOEM7O0lBRTlDLGlEQUFxQzs7SUFFckMsc0RBQTJFOztJQUUzRSxpREFBa0U7Ozs7O0lBR3RELCtDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsIENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCxcbiAgUXVlcnlMaXN0LCBSZW5kZXJlcjIsIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbHVtbkNvbXBvbmVudH0gZnJvbSAnLi9jb2x1bW4uY29tcG9uZW50JztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kZWxheVwiO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XG5pbXBvcnQgJ3J4anMvYWRkL29ic2VydmFibGUvZnJvbUV2ZW50JztcblxuY29uc3Qgc29ydGluZ0Z1bmN0aW9uID0gKGEsIGIpID0+IHtcbiAgaWYgKGEgPT09IGIpXG4gICAgcmV0dXJuIDA7XG4gIGVsc2UgaWYgKGEgPCBiKVxuICAgIHJldHVybiAtMTtcbiAgZWxzZVxuICAgIHJldHVybiAxO1xufTtcblxuY29uc3QgRXZlbnRzID0ge1xuICBNT1VTRV9VUDogJ21vdXNldXAnLFxuICBNT1VTRV9NT1ZFOiAnbW91c2Vtb3ZlJyxcbiAgTU9VU0VfRE9XTjogJ21vdXNlZG93bicsXG4gIE1PVVNFX09WRVI6ICdtb3VzZW92ZXInLFxuICBNT1VTRV9FTlRFUjogJ21vdXNlZW50ZXInLFxuICBNT1VTRV9MRUFWRTogJ21vdXNlbGVhdmUnXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdrLWRyYWdnYWJsZS1kYXRhLXRhYmxlJyxcbiAgdGVtcGxhdGU6IGA8dGFibGUgW25nQ2xhc3NdPVwieyAnb25EcmFnTW9kZScgOiAhZHJhZ01vZGVPZmYgfVwiPlxuICA8dGhlYWQ+XG4gIDx0cj5cbiAgICA8dGggY2xhc3M9XCJkcmFnZ2FibGUtcm93LWljb24tcGxhY2Vob2xkZXJcIj48L3RoPlxuICAgIDx0aCAqbmdJZj1cInNlbGVjdGFibGVcIiBjbGFzcz1cImRyYWdnYWJsZS1yb3ctY2hlY2stYm94XCI+XG4gICAgICA8cC1jaGVja2JveCAob25DaGFuZ2UpPVwic2VsZWN0QWxsKCRldmVudClcIj48L3AtY2hlY2tib3g+XG4gICAgPC90aD5cbiAgICA8dGQgKm5nSWY9XCJzaG93SW5kZXhcIiBjbGFzcz1cImRyYWdnYWJsZS1yb3ctaW5kZXhcIj48L3RkPlxuICAgIDx0aCAqbmdGb3I9XCJsZXQgY29sIG9mIGNvbHVtbnNcIiBbbmdTdHlsZV09XCJjb2wuc3R5bGVcIj57e2NvbC5oZWFkZXJ9fTwvdGg+XG4gIDwvdHI+XG4gIDwvdGhlYWQ+XG4gIDx0Ym9keSAjdGFibGVCb2R5PlxuXG4gIDx0ciAqbmdGb3I9XCJsZXQgcm93IG9mIGRyYWdnYWJsZUl0ZW1zO2luZGV4IGFzIGk7XCIgW2NsYXNzXT1cInJvdy5jbGFzc1wiIFtuZ0NsYXNzXT1cInsgJ2RyYWdnYWJsZS1yb3cnIDogdHJ1ZSB9XCJcbiAgICAgIChtb3VzZW92ZXIpPVwib25Nb3VzZU92ZXIoJGV2ZW50LCBpKVwiIChtb3VzZXVwKT1cIm9uTW91c2VVcCgpXCI+XG5cbiAgICA8dGQgY2xhc3M9XCJkcmFnZ2FibGUtcm93LWljb24tcGxhY2Vob2xkZXJcIiAobW91c2Vkb3duKT1cIm9uTW91c2VEb3duKCRldmVudCwgaSlcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZHJhZ2dhYmxlLXJvdy1pY29uXCI+PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJkcmFnZ2FibGUtcm93LWljb25cIj48L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImRyYWdnYWJsZS1yb3ctaWNvblwiPjwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZHJhZ2dhYmxlLXJvdy1pY29uXCI+PC9zcGFuPlxuICAgIDwvdGQ+XG4gICAgPHRkICpuZ0lmPVwic2VsZWN0YWJsZVwiIGNsYXNzPVwiZHJhZ2dhYmxlLXJvdy1jaGVjay1ib3hcIj5cbiAgICAgIDxwLWNoZWNrYm94IFt2YWx1ZV09XCJnZXRJdGVtSW5kZXgoaSlcIiBbKG5nTW9kZWwpXT1cInNlbGVjdGVkSW5kZXhlc1wiIChvbkNoYW5nZSk9XCJvblNlbGVjdGlvbkNoYW5nZSgpXCI+XG4gICAgICA8L3AtY2hlY2tib3g+XG4gICAgPC90ZD5cbiAgICA8dGQgKm5nSWY9XCJzaG93SW5kZXhcIiBjbGFzcz1cImRyYWdnYWJsZS1yb3ctaW5kZXhcIiAobW91c2Vkb3duKT1cIm9uTW91c2VEb3duKCRldmVudCwgaSlcIj5cbiAgICAgIDxzcGFuPnt7Z2V0SXRlbUluZGV4KGkpICsgMX19PC9zcGFuPlxuICAgIDwvdGQ+XG4gICAgPHRkICpuZ0Zvcj1cImxldCBjb2wgb2YgY29sdW1uc1wiIFtuZ1N0eWxlXT1cImNvbC5zdHlsZVwiIChtb3VzZWRvd24pPVwib25Nb3VzZURvd24oJGV2ZW50LCBpKVwiPlxuICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAqbmdUZW1wbGF0ZU91dGxldD1cImNvbC50ZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IGNvbCwgcm93RGF0YTogcm93LCByb3dJbmRleDogZ2V0SXRlbUluZGV4KGkpfVwiPjwvbmctY29udGFpbmVyPlxuICAgIDwvdGQ+XG4gIDwvdHI+XG4gIDwvdGJvZHk+XG48L3RhYmxlPlxuXG48ZGl2ICpuZ0lmPVwiKCEhZHJhZ2dhYmxlSXRlbXMgJiYgZHJhZ2dhYmxlSXRlbXMubGVuZ3RoID09PSAwKSB8fCAhZHJhZ2dhYmxlSXRlbXNcIlxuICAgICBjbGFzcz1cImVtcHR5LXN0YXRlLXBsYWNlaG9sZGVyXCI+XG4gIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJlbXB0eVN0YXRlVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbjwvZGl2PlxuXG48cC1wYWdpbmF0b3IgKm5nSWY9XCJwYWdpbmF0b3JcIiBbcm93c109XCJyb3dzXCIgW3RvdGFsUmVjb3Jkc109XCJ2YWx1ZSA/IHZhbHVlLmxlbmd0aCA6IDBcIlxuICAgICAgICAgICAgIFtyb3dzUGVyUGFnZU9wdGlvbnNdPVwicm93c1BlclBhZ2VPcHRpb25zXCIgKG9uUGFnZUNoYW5nZSk9XCJwYWdpbmF0ZSgkZXZlbnQpXCI+XG48L3AtcGFnaW5hdG9yPlxuXG48ZGl2ICNkcmFnZ2FibGUgW2hpZGRlbl09XCJkcmFnTW9kZU9mZlwiXG4gICAgIFtuZ0NsYXNzXT1cInsgJ211bHRpcGxlLWRyYWctYW5kLWRyb3AnIDogKG11bHRpcGxlRHJhZ0FuZERyb3AgJiYgc2VsZWN0ZWRJbmRleGVzLmxlbmd0aCA+IDEpIH1cIlxuICAgICAobW91c2V1cCk9XCJvbk1vdXNlVXAoKVwiIChtb3VzZW1vdmUpPVwib25Nb3VzZU1vdmUoJGV2ZW50KVwiPlxuICA8c3BhbiAqbmdJZj1cIm11bHRpcGxlRHJhZ0FuZERyb3AgJiYgc2VsZWN0ZWRJbmRleGVzLmxlbmd0aCA+IDFcIiBjbGFzcz1cInNlbGVjdGVkLWl0ZW1zLWNvdW50ZXJcIj57e3NlbGVjdGVkSW5kZXhlcy5sZW5ndGh9fTwvc3Bhbj5cbiAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImRyYWdnYWJsZVZpZXdUZW1wbGF0ZTsgY29udGV4dDoge2N1cnJlbnREcmFnZ2FibGVJdGVtOiBjdXJyZW50RHJhZ2dhYmxlSXRlbX1cIj5cbiAgPC9uZy1jb250YWluZXI+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2B0YWJsZXt3aWR0aDoxMDAlO3RleHQtYWxpZ246bGVmdDt0YWJsZS1sYXlvdXQ6Zml4ZWQ7Ym9yZGVyLWNvbGxhcHNlOmNvbGxhcHNlfXRhYmxlIHRoZWFke2JvcmRlcjoxcHggc29saWQgI2Q5ZDlkOTtib3JkZXItbGVmdDpub25lO2JvcmRlci1yaWdodDpub25lfXRhYmxlIHRoZWFkIHRye2hlaWdodDozMnB4O2NvbG9yOiM5OTl9dGFibGUgdGJvZHl7b3ZlcmZsb3c6YXV0b310YWJsZSB0Ym9keSB0cntoZWlnaHQ6NzBweDtiYWNrZ3JvdW5kOiNmZmY7Y29sb3I6Izk5OX10YWJsZSB0cntib3JkZXI6MXB4IHNvbGlkICNkOWQ5ZDk7Y29sb3I6IzMzMztib3JkZXItbGVmdDpub25lO2JvcmRlci1yaWdodDpub25lfS5vcGVue29wYWNpdHk6LjV9LmhvdmVyZWR7YmFja2dyb3VuZC1jb2xvcjojZWJlYmViIWltcG9ydGFudDt0ZXh0LWluZGVudDotOTk5OXB4O2JvcmRlcjpub25lIWltcG9ydGFudH0uZHJhZ2dhYmxlLXJvdy1pY29ue2Rpc3BsYXk6bm9uZTt3aWR0aDo0cHg7aGVpZ2h0OjRweDtib3JkZXItcmFkaXVzOjJweDtiYWNrZ3JvdW5kLWNvbG9yOiNjY2M7bWFyZ2luOjRweCAwIDRweCA3cHh9LmRyYWdnYWJsZS1yb3ctY2hlY2stYm94LC5kcmFnZ2FibGUtcm93LWljb24tcGxhY2Vob2xkZXIsLmRyYWdnYWJsZS1yb3ctaW5kZXh7d2lkdGg6MTVweH0uZHJhZ2dhYmxlLXJvdy1jaGVjay1ib3h7d2lkdGg6NDRweH0uZHJhZ2dhYmxlLXJvd3tjdXJzb3I6LXdlYmtpdC1ncmFiO2N1cnNvcjpncmFifS5vbkRyYWdNb2RlIC5kcmFnZ2FibGUtcm93e2N1cnNvcjotd2Via2l0LWdyYWJiaW5nO2N1cnNvcjpncmFiYmluZ30uZHJhZ2dhYmxlLXJvdzpob3ZlciAuZHJhZ2dhYmxlLXJvdy1pY29ue2Rpc3BsYXk6YmxvY2t9Lm9uRHJhZ01vZGUgLmRyYWdnYWJsZS1yb3c6aG92ZXIgLmRyYWdnYWJsZS1yb3ctaWNvbntkaXNwbGF5Om5vbmV9LmZhZGVJbnstd2Via2l0LWFuaW1hdGlvbi1uYW1lOmZhZGVJbjthbmltYXRpb24tbmFtZTpmYWRlSW47LXdlYmtpdC1hbmltYXRpb24tZHVyYXRpb246LjVzO2FuaW1hdGlvbi1kdXJhdGlvbjouNXM7LXdlYmtpdC1hbmltYXRpb24tZmlsbC1tb2RlOmJvdGg7YW5pbWF0aW9uLWZpbGwtbW9kZTpib3RofS5tdWx0aXBsZS1kcmFnLWFuZC1kcm9we2JveC1zaGFkb3c6NXB4IDVweCAwIDAgI2ZmZiw3cHggN3B4IDhweCAwIHJnYmEoNTAsNTAsNTAsLjM4KTtib3JkZXItcmFkaXVzOjJweH0uc2VsZWN0ZWQtaXRlbXMtY291bnRlcnt6LWluZGV4OjE7d2lkdGg6MjBweDtoZWlnaHQ6MjBweDtiYWNrZ3JvdW5kOiMwMGE3ODQ7ZGlzcGxheTpibG9jaztib3JkZXItcmFkaXVzOjEwcHg7Y29sb3I6I2ZmZjt0ZXh0LWFsaWduOmNlbnRlcjtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6LTEwcHg7cmlnaHQ6LTEwcHg7Zm9udC1zaXplOnNtYWxsO2xpbmUtaGVpZ2h0OjE1MCU7Zm9udC13ZWlnaHQ6NzAwfS5lbXB0eS1zdGF0ZS1wbGFjZWhvbGRlcnt0ZXh0LWFsaWduOmNlbnRlcn1ALXdlYmtpdC1rZXlmcmFtZXMgZmFkZUluezAle29wYWNpdHk6MH0xMDAle29wYWNpdHk6MX19QGtleWZyYW1lcyBmYWRlSW57MCV7b3BhY2l0eTowfTEwMCV7b3BhY2l0eToxfX1gXVxufSlcbmV4cG9ydCBjbGFzcyBEcmFnZ2FibGVEYXRhVGFibGVDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkluaXQge1xuXG4gIEBJbnB1dCgpIGVtcHR5U3RhdGVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBASW5wdXQoKSBkcmFnZ2FibGVWaWV3VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQE91dHB1dCgpIHZhbHVlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55W10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnlbXT4oKTtcblxuICBAVmlld0NoaWxkKCdkcmFnZ2FibGUnKSBwcml2YXRlIGRyYWdnYWJsZUVsZW1lbnQ6IEVsZW1lbnRSZWY7XG5cbiAgQFZpZXdDaGlsZCgndGFibGVCb2R5JykgcHJpdmF0ZSB0YWJsZUJvZHk6IEVsZW1lbnRSZWY7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihDb2x1bW5Db21wb25lbnQpIGNvbHM6IFF1ZXJ5TGlzdDxDb2x1bW5Db21wb25lbnQ+O1xuXG4gIGN1cnJlbnREcmFnZ2FibGVJdGVtOiBhbnk7XG5cbiAgZHJhZ2dhYmxlOiBhbnk7XG5cbiAgdGFibGVCb2R5RWxlbWVudDogYW55O1xuXG4gIGNvbHVtbnM6IENvbHVtbkNvbXBvbmVudFtdO1xuXG4gIGRyYWdNb2RlT2ZmOiBib29sZWFuID0gdHJ1ZTtcblxuICBzZWxlY3RlZEluZGV4ZXM6IG51bWJlcltdID0gW107XG5cbiAgbW91c2VNb3ZlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgbW91c2VNb3ZlOiBPYnNlcnZhYmxlPGFueT47XG5cbiAgcHJpdmF0ZSBfdmFsdWU6IGFueVtdO1xuXG4gIHB1YmxpYyBkcmFnZ2FibGVJdGVtczogYW55W107XG5cbiAgcHVibGljIHVuRHJhZ2dhYmxlSXRlbXNGcm9tVG9wOiBhbnlbXTtcblxuICBwdWJsaWMgdW5EcmFnZ2FibGVJdGVtc0Zyb21Cb3R0b206IGFueVtdO1xuXG4gIHByaXZhdGUgX2N1cnJlbnREcmFnZ2VkSW5kZXg6IG51bWJlcjtcblxuICBwcml2YXRlIF9jdXJyZW50UGxhY2VIb2xkZXJJbmRleDogbnVtYmVyID0gLTE7XG5cbiAgcHJpdmF0ZSBfY3VycmVudERyYWdnZWRFbGVtZW50OiBFdmVudFRhcmdldDtcblxuICBwcml2YXRlIF9kcm9wQXZhaWxhYmxlID0gZmFsc2U7XG5cbiAgQElucHV0KCkgc2V0IHZhbHVlKHZhbDogYW55W10pIHtcbiAgICBpZiAodmFsKSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IFsuLi52YWxdO1xuICAgICAgdGhpcy5fb3JkZXJJdGVtcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHZhbHVlKCk6IGFueVtdIHtcbiAgICBpZiAodGhpcy5kcmFnTW9kZU9mZikge1xuICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cbiAgfVxuXG5cbiAgQElucHV0KCkgdW5EcmFnZ2FibGVGcm9tVG9wID0gMDtcblxuICBASW5wdXQoKSB1bkRyYWdnYWJsZUZyb21Cb3R0b20gPSAwO1xuXG4gIEBJbnB1dCgpIHJvd1RyYWNrQnk6IEZ1bmN0aW9uID0gKGluZGV4OiBudW1iZXIsIGl0ZW06IGFueSkgPT4gaXRlbTtcblxuICBASW5wdXQoKSBjb2x1bW5UcmFja0J5OiBGdW5jdGlvbiA9IChpbmRleDogbnVtYmVyLCBpdGVtOiBhbnkpID0+IGl0ZW07XG5cbiAgQElucHV0KCkgcGFnaW5hdG9yOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KCkgcm93czogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIHJvd3NQZXJQYWdlT3B0aW9uczogbnVtYmVyW107XG5cbiAgQElucHV0KCkgc2hvd0luZGV4OiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KCkgbXVsdGlwbGVEcmFnQW5kRHJvcDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIHNlbGVjdGFibGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBAT3V0cHV0KCkgc2VsZWN0aW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55W10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnlbXT4oKTtcblxuICBAT3V0cHV0KCkgcGFnZUNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICB9XG5cbiAgLy8gY29tcG9uZW50IGxpZmVjeWNsZSBldmVudHNcbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYodGhpcy5wYWdpbmF0b3IpIHtcbiAgICAgIHRoaXMudW5EcmFnZ2FibGVGcm9tQm90dG9tID0gdGhpcy5yb3dzO1xuICAgIH1cblxuICAgIHRoaXMuX29yZGVySXRlbXMoKTtcbiAgICB0aGlzLmRyYWdnYWJsZSA9IHRoaXMuZHJhZ2dhYmxlRWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMudGFibGVCb2R5RWxlbWVudCA9IHRoaXMudGFibGVCb2R5Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5tb3VzZU1vdmUgPSBPYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgRXZlbnRzLk1PVVNFX01PVkUpLmRlbGF5KDUwKTtcblxuICAgIC8vIGNvdmVyIG5vbi1wZXJtaXR0ZWQgZHJhZ2dpbmcvZHJvcHBpbmc6XG4gICAgT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsIEV2ZW50cy5NT1VTRV9VUCkuc3Vic2NyaWJlKCgpID0+IHRoaXMub25Nb3VzZVVwKCkpO1xuICAgIE9ic2VydmFibGUuZnJvbUV2ZW50KHRoaXMudGFibGVCb2R5Lm5hdGl2ZUVsZW1lbnQsIEV2ZW50cy5NT1VTRV9MRUFWRSkuc3Vic2NyaWJlKCgpID0+IHRoaXMuX29uTW91c2VMZWF2ZSgpKTtcbiAgICBPYnNlcnZhYmxlLmZyb21FdmVudCh0aGlzLnRhYmxlQm9keS5uYXRpdmVFbGVtZW50LCBFdmVudHMuTU9VU0VfRU5URVIpLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9vbk1vdXNlRW50ZXIoKSk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5jb2x1bW5zID0gdGhpcy5jb2xzLnRvQXJyYXkoKTtcbiAgfVxuXG4gIC8vIHB1YmxpYyBBUEkgbWV0aG9kc1xuICBvbk1vdXNlTW92ZShldmVudDogTW91c2VFdmVudCkge1xuICAgIHRoaXMuX3VwZGF0ZURyYWdnYWJsZShldmVudCk7XG4gIH1cblxuICBvbk1vdXNlT3ZlcihldmVudDogYW55LCBpbmRleDogbnVtYmVyKSB7XG5cbiAgICAvLyBvbmx5IGZvciBEJkQgbW9kZTpcbiAgICBpZiAoIXRoaXMuZHJhZ01vZGVPZmYgJiYgaW5kZXggIT09IHRoaXMuX2N1cnJlbnRQbGFjZUhvbGRlckluZGV4KSB7XG5cbiAgICAgIC8vIGdldCBtb3VzZSBsb2NhdGlvbiB0byByZWNvZ25pemUgd2hlcmUgdG8gYWRkIHRoZSBwbGFjZWhvbGRlciAoZnJvbSB0b3Agb3IgYm90dG9tKTpcbiAgICAgIGNvbnN0IG1pZGRsZTogbnVtYmVyID0gZXZlbnQuY3VycmVudFRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyAoZXZlbnQuY3VycmVudFRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQgLyAyKTtcbiAgICAgIGNvbnN0IGhvdmVyZWRSb3cgPSBPYmplY3QuY3JlYXRlKE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzLmRyYWdnYWJsZUl0ZW1zW2luZGV4XSkpO1xuICAgICAgT2JqZWN0LmFzc2lnbihob3ZlcmVkUm93LCB0aGlzLmRyYWdnYWJsZUl0ZW1zW2luZGV4XSk7XG5cbiAgICAgIC8vIGRlbGV0ZSBwcmV2aW91czpcbiAgICAgIGlmICh0aGlzLl9jdXJyZW50UGxhY2VIb2xkZXJJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgdGhpcy5kcmFnZ2FibGVJdGVtcy5zcGxpY2UodGhpcy5fY3VycmVudFBsYWNlSG9sZGVySW5kZXgsIDEpO1xuICAgICAgfVxuXG4gICAgICAvLyBhZGQgcGxhY2Vob2xkZXIgZnJvbSB0aGUgYm90dG9tOlxuICAgICAgaWYgKGV2ZW50LmNsaWVudFkgPiBtaWRkbGUpIHtcbiAgICAgICAgdGhpcy5fY3VycmVudFBsYWNlSG9sZGVySW5kZXggPSBpbmRleCArIDE7XG4gICAgICAgIHRoaXMuZHJhZ2dhYmxlSXRlbXMuc3BsaWNlKHRoaXMuX2N1cnJlbnRQbGFjZUhvbGRlckluZGV4LCAwLCBob3ZlcmVkUm93KTtcbiAgICAgICAgdGhpcy5kcmFnZ2FibGVJdGVtc1t0aGlzLl9jdXJyZW50UGxhY2VIb2xkZXJJbmRleF0uY2xhc3MgPSAnaG92ZXJlZCc7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVZpZXcoKTtcbiAgICAgIH0gZWxzZSB7IC8vIGFkZCBwbGFjZWhvbGRlciBmcm9tIHRoZSB0b3A6XG4gICAgICAgIHRoaXMuX2N1cnJlbnRQbGFjZUhvbGRlckluZGV4ID0gaW5kZXg7XG4gICAgICAgIHRoaXMuZHJhZ2dhYmxlSXRlbXMuc3BsaWNlKHRoaXMuX2N1cnJlbnRQbGFjZUhvbGRlckluZGV4LCAwLCBob3ZlcmVkUm93KTtcbiAgICAgICAgdGhpcy5kcmFnZ2FibGVJdGVtc1t0aGlzLl9jdXJyZW50UGxhY2VIb2xkZXJJbmRleF0uY2xhc3MgPSAnaG92ZXJlZCc7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVZpZXcoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbk1vdXNlRG93bihldmVudDogTW91c2VFdmVudCwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIC8vIG9ubHkgbGVmdCBidXR0b24gbW91c2UgY2xpY2tcbiAgICBpZiAoZXZlbnQud2hpY2ggPT09IDEpIHtcbiAgICAgIGlmICh0aGlzLm11bHRpcGxlRHJhZ0FuZERyb3ApIHtcblxuICAgICAgICAvLyBzaWduIGRyYWdnYWJsZSBpdGVtIGFzICdjaGVja2VkJyBpZiBpdCdzIG5vdDpcbiAgICAgICAgY29uc3QgY3VycmVudENsaWNrZWRJbmRleCA9IHRoaXMuZ2V0SXRlbUluZGV4KGluZGV4KTtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRJbmRleGVzLmluZGV4T2YoY3VycmVudENsaWNrZWRJbmRleCkgPT09IC0xKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ZXMgPSBbY3VycmVudENsaWNrZWRJbmRleCwgLi4udGhpcy5zZWxlY3RlZEluZGV4ZXNdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZWRnZS1jYXNlIHdoZW4gYWxsIGl0ZW1zIGFyZSBzZWxlY3RlZCAtIGQmZCBzaG91bGQgYmUgZGlzYWJsZWRcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRJbmRleGVzLmxlbmd0aCA9PT0gdGhpcy5fdmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ZXMuZm9yRWFjaChpbmRleCA9PiB0aGlzLl92YWx1ZVtpbmRleF0uY2xhc3MgPSAnb3BlbicpO1xuICAgICAgICB0aGlzLl92YWx1ZSA9IFsuLi50aGlzLl92YWx1ZV07XG4gICAgICB9XG5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLmN1cnJlbnREcmFnZ2FibGVJdGVtID0gdGhpcy5kcmFnZ2FibGVJdGVtc1tpbmRleF07XG4gICAgICB0aGlzLl91cGRhdGVEcmFnZ2FibGUoZXZlbnQpO1xuICAgICAgdGhpcy5kcmFnTW9kZU9mZiA9IGZhbHNlO1xuICAgICAgdGhpcy5fY3VycmVudERyYWdnZWRJbmRleCA9IGluZGV4O1xuICAgICAgdGhpcy5fY3VycmVudERyYWdnZWRFbGVtZW50ID0gZXZlbnQuY3VycmVudFRhcmdldDtcbiAgICAgIHRoaXMuX2N1cnJlbnREcmFnZ2VkRWxlbWVudFsnY2xhc3NMaXN0J10uYWRkKCdvcGVuJyk7XG4gICAgICB0aGlzLm1vdXNlTW92ZVN1YnNjcmlwdGlvbiA9IHRoaXMubW91c2VNb3ZlLnN1YnNjcmliZSgoZTogTW91c2VFdmVudCkgPT4gdGhpcy5vbk1vdXNlTW92ZShlKSk7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZHJhZ2dhYmxlLCAnZmFkZUluJyk7XG4gICAgfVxuICB9XG5cbiAgb25Nb3VzZVVwKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5kcmFnTW9kZU9mZikge1xuICAgICAgdGhpcy5kcmFnTW9kZU9mZiA9IHRydWU7XG4gICAgICB0aGlzLl9jdXJyZW50RHJhZ2dlZEVsZW1lbnRbJ2NsYXNzTGlzdCddLnJlbW92ZSgnb3BlbicpO1xuICAgICAgdGhpcy5fdmFsdWUuZm9yRWFjaChpdGVtID0+IGRlbGV0ZSBpdGVtWydjbGFzcyddKTtcbiAgICAgIHRoaXMubW91c2VNb3ZlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGRvY3VtZW50LmJvZHksICdjdXJzb3InLCAnZGVmYXVsdCcpO1xuXG4gICAgICBpZiAodGhpcy5fZHJvcEF2YWlsYWJsZSkge1xuICAgICAgICBpZiAodGhpcy5fY3VycmVudFBsYWNlSG9sZGVySW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgaWYgKHRoaXMubXVsdGlwbGVEcmFnQW5kRHJvcCkge1xuXG4gICAgICAgICAgICAvLyBzYXZlIGl0ZW0gb2YgdGhpcy5fY3VycmVudFBsYWNlSG9sZGVySW5kZXggLSB3ZSdsbCBuZWVkIHRoaXMgaXRlbSB0byBmaW5kIHRoZSBlbnRyeS1wb2ludDpcbiAgICAgICAgICAgIGxldCBpbnNlcnRJbmRleFJlZmVyZW5jZSA9IHRoaXMuZHJhZ2dhYmxlSXRlbXNbdGhpcy5fY3VycmVudFBsYWNlSG9sZGVySW5kZXhdO1xuXG4gICAgICAgICAgICAvLyBzYXZlIGFsbCBkcmFnZ2VkIGl0ZW1zIGFzaWRlOlxuICAgICAgICAgICAgY29uc3QgZHJhZ2dlZEl0ZW1zOiBhbnlbXSA9IHRoaXMuc2VsZWN0ZWRJbmRleGVzLnNvcnQoc29ydGluZ0Z1bmN0aW9uKS5tYXA8YW55PihpbmRleCA9PiB0aGlzLl92YWx1ZVtpbmRleCArICgoaW5kZXggPj0gdGhpcy5fY3VycmVudFBsYWNlSG9sZGVySW5kZXgpID8gMSA6IDApXSk7XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSBkcmFnZ2VkIChzZWxlY3RlZCBpdGVtcykgZnJvbSB0aGUgb3JpZ2luYWwgZGF0YTpcbiAgICAgICAgICAgIGRyYWdnZWRJdGVtcy5mb3JFYWNoKGl0ZW0gPT4gdGhpcy5fdmFsdWUuc3BsaWNlKHRoaXMuX3ZhbHVlLmluZGV4T2YoaXRlbSksIDEpKTtcblxuICAgICAgICAgICAgLy8gaW5zZXJ0IGRyYWdnYWJsZSBpdGVtcyBiYWNrIHRvIHRoZSBvcmlnaW5hbCBkYXRhIGJ1dCB3aXRoIG5ldyBvcmRlcjpcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlLnNwbGljZSh0aGlzLl92YWx1ZS5pbmRleE9mKGluc2VydEluZGV4UmVmZXJlbmNlKSwgMSwgLi4uZHJhZ2dlZEl0ZW1zKTtcblxuICAgICAgICAgICAgLy8gaW5pdGlhdGUgc3RhdGU6XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50UGxhY2VIb2xkZXJJbmRleCA9IC0xO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ZXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX29yZGVySXRlbXMoKTtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVZpZXcoKTtcbiAgICAgICAgICAgIHRoaXMub25TZWxlY3Rpb25DaGFuZ2UoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBidWZmZXI6IG51bWJlciA9ICh0aGlzLl9jdXJyZW50RHJhZ2dlZEluZGV4ID49IHRoaXMuX2N1cnJlbnRQbGFjZUhvbGRlckluZGV4KSA/IDEgOiAwO1xuICAgICAgICAgICAgLy8gaW5zZXJ0IGRyYWdnZWQgaXRlbSB0byB0aGUgbmV3IGxvY2F0aW9uOlxuICAgICAgICAgICAgdGhpcy5kcmFnZ2FibGVJdGVtc1t0aGlzLl9jdXJyZW50UGxhY2VIb2xkZXJJbmRleF0gPSB0aGlzLmRyYWdnYWJsZUl0ZW1zW3RoaXMuX2N1cnJlbnREcmFnZ2VkSW5kZXggKyBidWZmZXJdO1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgZHJhZ2dlZCBpdGVtIHByZXZpb3VzIGxvY2F0aW9uICYgdXBkYXRlIHZpZXc6XG4gICAgICAgICAgICB0aGlzLmRyYWdnYWJsZUl0ZW1zLnNwbGljZSh0aGlzLl9jdXJyZW50RHJhZ2dlZEluZGV4ICsgYnVmZmVyLCAxKTtcblxuICAgICAgICAgICAgLy8gaW5pdGlhdGUgc3RhdGU6XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50UGxhY2VIb2xkZXJJbmRleCA9IC0xO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlVmlldygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdW5kcm9wcGFibGUgYXJlYSAtIGluaXRpYXRlIHN0YXRlOlxuICAgICAgICB0aGlzLmRyYWdnYWJsZUl0ZW1zLnNwbGljZSh0aGlzLl9jdXJyZW50UGxhY2VIb2xkZXJJbmRleCwgMSk7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRQbGFjZUhvbGRlckluZGV4ID0gLTE7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleGVzID0gW107XG4gICAgICAgIHRoaXMub25TZWxlY3Rpb25DaGFuZ2UoKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlVmlldygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHBhZ2luYXRlKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLnVuRHJhZ2dhYmxlRnJvbVRvcCA9IGV2ZW50LmZpcnN0O1xuICAgIHRoaXMudW5EcmFnZ2FibGVGcm9tQm90dG9tID0gKGV2ZW50LmZpcnN0ICsgZXZlbnQucm93cyk7XG4gICAgdGhpcy52YWx1ZSA9IFsuLi50aGlzLnVuRHJhZ2dhYmxlSXRlbXNGcm9tVG9wLCAuLi50aGlzLmRyYWdnYWJsZUl0ZW1zLCAuLi50aGlzLnVuRHJhZ2dhYmxlSXRlbXNGcm9tQm90dG9tXTtcbiAgICB0aGlzLnBhZ2VDaGFuZ2UuZW1pdChldmVudCk7XG4gIH1cblxuICBzZWxlY3RBbGwoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0ZWRJbmRleGVzID0gKGV2ZW50KSA/IFsuLi5BcnJheS5mcm9tKEFycmF5KHRoaXMuX3ZhbHVlLmxlbmd0aCksIChfLHgpID0+IHgpXSA6IFtdO1xuICAgIHRoaXMub25TZWxlY3Rpb25DaGFuZ2UoKTtcbiAgfVxuXG4gIG9uU2VsZWN0aW9uQ2hhbmdlKCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3RlZEluZGV4ZXMuc29ydChzb3J0aW5nRnVuY3Rpb24pLm1hcChpbmRleCA9PiB0aGlzLl92YWx1ZVtpbmRleF0pKTtcbiAgfVxuXG4gIGdldEl0ZW1JbmRleChpbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWUuaW5kZXhPZih0aGlzLmRyYWdnYWJsZUl0ZW1zW2luZGV4XSk7XG4gIH1cblxuICAvLyBwcml2YXRlIG1ldGhvZHNcbiAgcHJpdmF0ZSBfdXBkYXRlVmlldygpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gKHRoaXMucGFnaW5hdG9yKSA/IFsuLi50aGlzLnVuRHJhZ2dhYmxlSXRlbXNGcm9tVG9wLCAuLi50aGlzLmRyYWdnYWJsZUl0ZW1zLCAuLi50aGlzLnVuRHJhZ2dhYmxlSXRlbXNGcm9tQm90dG9tXSA6IFsuLi50aGlzLmRyYWdnYWJsZUl0ZW1zXTtcbiAgICBpZiAodGhpcy5kcmFnTW9kZU9mZikgeyB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodGhpcy52YWx1ZSk7IH1cbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZURyYWdnYWJsZShldmVudDogTW91c2VFdmVudCkge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5kcmFnZ2FibGUsICdwb3NpdGlvbicsICdmaXhlZCcpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5kcmFnZ2FibGUsICdsZWZ0JywgZXZlbnQuY2xpZW50WCArIDIwICsgJ3B4Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmRyYWdnYWJsZSwgJ3RvcCcsIGV2ZW50LmNsaWVudFkgLSAzNSArICdweCcpO1xuICB9XG5cbiAgcHJpdmF0ZSBfb25Nb3VzZUxlYXZlKCk6IHZvaWQge1xuICAgIHRoaXMuX2Ryb3BBdmFpbGFibGUgPSBmYWxzZTtcbiAgICBpZiAoIXRoaXMuZHJhZ01vZGVPZmYpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZG9jdW1lbnQuYm9keSwgJ2N1cnNvcicsICduby1kcm9wJyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfb25Nb3VzZUVudGVyKCk6IHZvaWQge1xuICAgIHRoaXMuX2Ryb3BBdmFpbGFibGUgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfb3JkZXJJdGVtcygpIHtcbiAgICBpZiAoISF0aGlzLnZhbHVlKSB7XG4gICAgICBpZiAodGhpcy5wYWdpbmF0b3IpIHtcbiAgICAgICAgLy8gb25jZSB1c2luZyBkJmQgd2l0aCBwYWdpbmF0aW9uIHBhZ2Utc2l6ZSBoYXMgdG8gYmUgaW5jcmVhc2VkIGJ5IDEgYmVjYXVzZSBvZiB0aGUgYWRkZWQgcGxhY2Vob2xkZXJcbiAgICAgICAgY29uc3QgYnVmZmVyID0gKHRoaXMuX2N1cnJlbnRQbGFjZUhvbGRlckluZGV4ID09PSAtMSkgPyAwIDogMTtcblxuICAgICAgICB0aGlzLnVuRHJhZ2dhYmxlSXRlbXNGcm9tVG9wID0gWy4uLnRoaXMudmFsdWUuc2xpY2UoMCwgdGhpcy51bkRyYWdnYWJsZUZyb21Ub3ApXTtcbiAgICAgICAgdGhpcy51bkRyYWdnYWJsZUl0ZW1zRnJvbUJvdHRvbSA9IFsuLi50aGlzLnZhbHVlLnNsaWNlKHRoaXMudW5EcmFnZ2FibGVGcm9tQm90dG9tICsgYnVmZmVyKV07XG4gICAgICAgIHRoaXMuZHJhZ2dhYmxlSXRlbXMgPSBbLi4udGhpcy52YWx1ZS5zbGljZSh0aGlzLnVuRHJhZ2dhYmxlRnJvbVRvcCwgdGhpcy51bkRyYWdnYWJsZUZyb21Cb3R0b20gKyBidWZmZXIpXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZHJhZ2dhYmxlSXRlbXMgPSBbLi4udGhpcy52YWx1ZV07XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=