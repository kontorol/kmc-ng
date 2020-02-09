/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ContentChildren, ElementRef, EventEmitter, Input, Output, QueryList, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { ColumnComponent } from './column.component';
import "rxjs/add/operator/delay";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';
/** @type {?} */
const sortingFunction = (a, b) => {
    if (a === b)
        return 0;
    else if (a < b)
        return -1;
    else
        return 1;
};
const ɵ0 = sortingFunction;
/** @type {?} */
const Events = {
    MOUSE_UP: 'mouseup',
    MOUSE_MOVE: 'mousemove',
    MOUSE_DOWN: 'mousedown',
    MOUSE_OVER: 'mouseover',
    MOUSE_ENTER: 'mouseenter',
    MOUSE_LEAVE: 'mouseleave'
};
export class DraggableDataTableComponent {
    /**
     * @param {?} renderer
     */
    constructor(renderer) {
        this.renderer = renderer;
        this.valueChange = new EventEmitter();
        this.dragModeOff = true;
        this.selectedIndexes = [];
        this._currentPlaceHolderIndex = -1;
        this._dropAvailable = false;
        this.unDraggableFromTop = 0;
        this.unDraggableFromBottom = 0;
        this.rowTrackBy = (index, item) => item;
        this.columnTrackBy = (index, item) => item;
        this.paginator = false;
        this.showIndex = false;
        this.multipleDragAndDrop = false;
        this.selectable = false;
        this.selectionChange = new EventEmitter();
        this.pageChange = new EventEmitter();
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set value(val) {
        if (val) {
            this._value = [...val];
            this._orderItems();
        }
        else {
            this._value = null;
        }
    }
    /**
     * @return {?}
     */
    get value() {
        if (this.dragModeOff) {
            return this._value;
        }
    }
    // component lifecycle events
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.paginator) {
            this.unDraggableFromBottom = this.rows;
        }
        this._orderItems();
        this.draggable = this.draggableElement.nativeElement;
        this.tableBodyElement = this.tableBody.nativeElement;
        this.mouseMove = Observable.fromEvent(document, Events.MOUSE_MOVE).delay(50);
        // cover non-permitted dragging/dropping:
        Observable.fromEvent(document, Events.MOUSE_UP).subscribe(() => this.onMouseUp());
        Observable.fromEvent(this.tableBody.nativeElement, Events.MOUSE_LEAVE).subscribe(() => this._onMouseLeave());
        Observable.fromEvent(this.tableBody.nativeElement, Events.MOUSE_ENTER).subscribe(() => this._onMouseEnter());
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.columns = this.cols.toArray();
    }
    // public API methods
    /**
     * @param {?} event
     * @return {?}
     */
    onMouseMove(event) {
        this._updateDraggable(event);
    }
    /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    onMouseOver(event, index) {
        // only for D&D mode:
        if (!this.dragModeOff && index !== this._currentPlaceHolderIndex) {
            // get mouse location to recognize where to add the placeholder (from top or bottom):
            /** @type {?} */
            const middle = event.currentTarget.getBoundingClientRect().top + (event.currentTarget.getBoundingClientRect().height / 2);
            /** @type {?} */
            const hoveredRow = Object.create(Object.getPrototypeOf(this.draggableItems[index]));
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
    }
    /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    onMouseDown(event, index) {
        // only left button mouse click
        if (event.which === 1) {
            if (this.multipleDragAndDrop) {
                // sign draggable item as 'checked' if it's not:
                /** @type {?} */
                const currentClickedIndex = this.getItemIndex(index);
                if (this.selectedIndexes.indexOf(currentClickedIndex) === -1) {
                    this.selectedIndexes = [currentClickedIndex, ...this.selectedIndexes];
                }
                // edge-case when all items are selected - d&d should be disabled
                if (this.selectedIndexes.length === this._value.length) {
                    return;
                }
                this.selectedIndexes.forEach(index => this._value[index].class = 'open');
                this._value = [...this._value];
            }
            event.preventDefault();
            this.currentDraggableItem = this.draggableItems[index];
            this._updateDraggable(event);
            this.dragModeOff = false;
            this._currentDraggedIndex = index;
            this._currentDraggedElement = event.currentTarget;
            this._currentDraggedElement['classList'].add('open');
            this.mouseMoveSubscription = this.mouseMove.subscribe((e) => this.onMouseMove(e));
            this.renderer.addClass(this.draggable, 'fadeIn');
        }
    }
    /**
     * @return {?}
     */
    onMouseUp() {
        if (!this.dragModeOff) {
            this.dragModeOff = true;
            this._currentDraggedElement['classList'].remove('open');
            this._value.forEach(item => delete item['class']);
            this.mouseMoveSubscription.unsubscribe();
            this.renderer.setStyle(document.body, 'cursor', 'default');
            if (this._dropAvailable) {
                if (this._currentPlaceHolderIndex !== -1) {
                    if (this.multipleDragAndDrop) {
                        // save item of this._currentPlaceHolderIndex - we'll need this item to find the entry-point:
                        /** @type {?} */
                        let insertIndexReference = this.draggableItems[this._currentPlaceHolderIndex];
                        // save all dragged items aside:
                        /** @type {?} */
                        const draggedItems = this.selectedIndexes.sort(sortingFunction).map(index => this._value[index + ((index >= this._currentPlaceHolderIndex) ? 1 : 0)]);
                        // remove dragged (selected items) from the original data:
                        draggedItems.forEach(item => this._value.splice(this._value.indexOf(item), 1));
                        // insert draggable items back to the original data but with new order:
                        this._value.splice(this._value.indexOf(insertIndexReference), 1, ...draggedItems);
                        // initiate state:
                        this._currentPlaceHolderIndex = -1;
                        this.selectedIndexes = [];
                        this._orderItems();
                        this._updateView();
                        this.onSelectionChange();
                    }
                    else {
                        /** @type {?} */
                        const buffer = (this._currentDraggedIndex >= this._currentPlaceHolderIndex) ? 1 : 0;
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
    }
    /**
     * @param {?} event
     * @return {?}
     */
    paginate(event) {
        this.unDraggableFromTop = event.first;
        this.unDraggableFromBottom = (event.first + event.rows);
        this.value = [...this.unDraggableItemsFromTop, ...this.draggableItems, ...this.unDraggableItemsFromBottom];
        this.pageChange.emit(event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    selectAll(event) {
        this.selectedIndexes = (event) ? [...Array.from(Array(this._value.length), (_, x) => x)] : [];
        this.onSelectionChange();
    }
    /**
     * @return {?}
     */
    onSelectionChange() {
        this.selectionChange.emit(this.selectedIndexes.sort(sortingFunction).map(index => this._value[index]));
    }
    /**
     * @param {?} index
     * @return {?}
     */
    getItemIndex(index) {
        return this._value.indexOf(this.draggableItems[index]);
    }
    // private methods
    /**
     * @private
     * @return {?}
     */
    _updateView() {
        this.value = (this.paginator) ? [...this.unDraggableItemsFromTop, ...this.draggableItems, ...this.unDraggableItemsFromBottom] : [...this.draggableItems];
        if (this.dragModeOff) {
            this.valueChange.emit(this.value);
        }
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    _updateDraggable(event) {
        this.renderer.setStyle(this.draggable, 'position', 'fixed');
        this.renderer.setStyle(this.draggable, 'left', event.clientX + 20 + 'px');
        this.renderer.setStyle(this.draggable, 'top', event.clientY - 35 + 'px');
    }
    /**
     * @private
     * @return {?}
     */
    _onMouseLeave() {
        this._dropAvailable = false;
        if (!this.dragModeOff) {
            this.renderer.setStyle(document.body, 'cursor', 'no-drop');
        }
    }
    /**
     * @private
     * @return {?}
     */
    _onMouseEnter() {
        this._dropAvailable = true;
    }
    /**
     * @private
     * @return {?}
     */
    _orderItems() {
        if (!!this.value) {
            if (this.paginator) {
                // once using d&d with pagination page-size has to be increased by 1 because of the added placeholder
                /** @type {?} */
                const buffer = (this._currentPlaceHolderIndex === -1) ? 0 : 1;
                this.unDraggableItemsFromTop = [...this.value.slice(0, this.unDraggableFromTop)];
                this.unDraggableItemsFromBottom = [...this.value.slice(this.unDraggableFromBottom + buffer)];
                this.draggableItems = [...this.value.slice(this.unDraggableFromTop, this.unDraggableFromBottom + buffer)];
            }
            else {
                this.draggableItems = [...this.value];
            }
        }
    }
}
DraggableDataTableComponent.decorators = [
    { type: Component, args: [{
                selector: 'k-draggable-data-table',
                template: `<table [ngClass]="{ 'onDragMode' : !dragModeOff }">
  <thead>
  <tr>
    <th class="draggable-row-icon-placeholder"></th>
    <th *ngIf="selectable" class="draggable-row-check-box">
      <p-checkbox (onChange)="selectAll($event)"></p-checkbox>
    </th>
    <td *ngIf="showIndex" class="draggable-row-index"></td>
    <th *ngFor="let col of columns" [ngStyle]="col.style">{{col.header}}</th>
  </tr>
  </thead>
  <tbody #tableBody>

  <tr *ngFor="let row of draggableItems;index as i;" [class]="row.class" [ngClass]="{ 'draggable-row' : true }"
      (mouseover)="onMouseOver($event, i)" (mouseup)="onMouseUp()">

    <td class="draggable-row-icon-placeholder" (mousedown)="onMouseDown($event, i)">
      <span class="draggable-row-icon"></span>
      <span class="draggable-row-icon"></span>
      <span class="draggable-row-icon"></span>
      <span class="draggable-row-icon"></span>
    </td>
    <td *ngIf="selectable" class="draggable-row-check-box">
      <p-checkbox [value]="getItemIndex(i)" [(ngModel)]="selectedIndexes" (onChange)="onSelectionChange()">
      </p-checkbox>
    </td>
    <td *ngIf="showIndex" class="draggable-row-index" (mousedown)="onMouseDown($event, i)">
      <span>{{getItemIndex(i) + 1}}</span>
    </td>
    <td *ngFor="let col of columns" [ngStyle]="col.style" (mousedown)="onMouseDown($event, i)">
      <ng-container
        *ngTemplateOutlet="col.template; context: { $implicit: col, rowData: row, rowIndex: getItemIndex(i)}"></ng-container>
    </td>
  </tr>
  </tbody>
</table>

<div *ngIf="(!!draggableItems && draggableItems.length === 0) || !draggableItems"
     class="empty-state-placeholder">
  <ng-container *ngTemplateOutlet="emptyStateTemplate"></ng-container>
</div>

<p-paginator *ngIf="paginator" [rows]="rows" [totalRecords]="value ? value.length : 0"
             [rowsPerPageOptions]="rowsPerPageOptions" (onPageChange)="paginate($event)">
</p-paginator>

<div #draggable [hidden]="dragModeOff"
     [ngClass]="{ 'multiple-drag-and-drop' : (multipleDragAndDrop && selectedIndexes.length > 1) }"
     (mouseup)="onMouseUp()" (mousemove)="onMouseMove($event)">
  <span *ngIf="multipleDragAndDrop && selectedIndexes.length > 1" class="selected-items-counter">{{selectedIndexes.length}}</span>
  <ng-container *ngTemplateOutlet="draggableViewTemplate; context: {currentDraggableItem: currentDraggableItem}">
  </ng-container>
</div>
`,
                styles: [`table{width:100%;text-align:left;table-layout:fixed;border-collapse:collapse}table thead{border:1px solid #d9d9d9;border-left:none;border-right:none}table thead tr{height:32px;color:#999}table tbody{overflow:auto}table tbody tr{height:70px;background:#fff;color:#999}table tr{border:1px solid #d9d9d9;color:#333;border-left:none;border-right:none}.open{opacity:.5}.hovered{background-color:#ebebeb!important;text-indent:-9999px;border:none!important}.draggable-row-icon{display:none;width:4px;height:4px;border-radius:2px;background-color:#ccc;margin:4px 0 4px 7px}.draggable-row-check-box,.draggable-row-icon-placeholder,.draggable-row-index{width:15px}.draggable-row-check-box{width:44px}.draggable-row{cursor:-webkit-grab;cursor:grab}.onDragMode .draggable-row{cursor:-webkit-grabbing;cursor:grabbing}.draggable-row:hover .draggable-row-icon{display:block}.onDragMode .draggable-row:hover .draggable-row-icon{display:none}.fadeIn{-webkit-animation-name:fadeIn;animation-name:fadeIn;-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-fill-mode:both;animation-fill-mode:both}.multiple-drag-and-drop{box-shadow:5px 5px 0 0 #fff,7px 7px 8px 0 rgba(50,50,50,.38);border-radius:2px}.selected-items-counter{z-index:1;width:20px;height:20px;background:#00a784;display:block;border-radius:10px;color:#fff;text-align:center;position:absolute;top:-10px;right:-10px;font-size:small;line-height:150%;font-weight:700}.empty-state-placeholder{text-align:center}@-webkit-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@keyframes fadeIn{0%{opacity:0}100%{opacity:1}}`]
            },] },
];
/** @nocollapse */
DraggableDataTableComponent.ctorParameters = () => [
    { type: Renderer2 }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ2dhYmxlLWRhdGEtdGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGthbHR1cmEtbmcva2FsdHVyYS1wcmltZW5nLXVpLyIsInNvdXJjZXMiOlsibGliL2RyYWdnYWJsZS1kYXRhLXRhYmxlL2RyYWdnYWJsZS1kYXRhLXRhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNhLFNBQVMsRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUM3RixTQUFTLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQzdDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUVuRCxPQUFPLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLCtCQUErQixDQUFDOztNQUVqQyxlQUFlLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNULE9BQU8sQ0FBQyxDQUFDO1NBQ04sSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNaLE9BQU8sQ0FBQyxDQUFDLENBQUM7O1FBRVYsT0FBTyxDQUFDLENBQUM7QUFDYixDQUFDOzs7TUFFSyxNQUFNLEdBQUc7SUFDYixRQUFRLEVBQUUsU0FBUztJQUNuQixVQUFVLEVBQUUsV0FBVztJQUN2QixVQUFVLEVBQUUsV0FBVztJQUN2QixVQUFVLEVBQUUsV0FBVztJQUN2QixXQUFXLEVBQUUsWUFBWTtJQUN6QixXQUFXLEVBQUUsWUFBWTtDQUMxQjtBQTRERCxNQUFNLE9BQU8sMkJBQTJCOzs7O0lBdUZ0QyxZQUFvQixRQUFtQjtRQUFuQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBakY3QixnQkFBVyxHQUF3QixJQUFJLFlBQVksRUFBUyxD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Qjs7Ozs7SUFFM0IsNkNBQXNCOztJQUV0QixxREFBNkI7O0lBRTdCLDhEQUFzQzs7SUFFdEMsaUVBQXlDOzs7OztJQUV6QywyREFBcUM7Ozs7O0lBRXJDLCtEQUE4Qzs7Ozs7SUFFOUMsNkRBQTRDOzs7OztJQUU1QyxxREFBK0I7O0lBa0IvQix5REFBZ0M7O0lBRWhDLDREQUFtQzs7SUFFbkMsaURBQW1FOztJQUVuRSxvREFBc0U7O0lBRXRFLGdEQUFvQzs7SUFFcEMsMkNBQXNCOztJQUV0Qix5REFBc0M7O0lBRXRDLGdEQUFvQzs7SUFFcEMsMERBQThDOztJQUU5QyxpREFBcUM7O0lBRXJDLHNEQUEyRTs7SUFFM0UsaURBQWtFOzs7OztJQUd0RCwrQ0FBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCwgUmVuZGVyZXIyLCBUZW1wbGF0ZVJlZiwgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb2x1bW5Db21wb25lbnR9IGZyb20gJy4vY29sdW1uLmNvbXBvbmVudCc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZGVsYXlcIjtcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL2Zyb21FdmVudCc7XG5cbmNvbnN0IHNvcnRpbmdGdW5jdGlvbiA9IChhLCBiKSA9PiB7XG4gIGlmIChhID09PSBiKVxuICAgIHJldHVybiAwO1xuICBlbHNlIGlmIChhIDwgYilcbiAgICByZXR1cm4gLTE7XG4gIGVsc2VcbiAgICByZXR1cm4gMTtcbn07XG5cbmNvbnN0IEV2ZW50cyA9IHtcbiAgTU9VU0VfVVA6ICdtb3VzZXVwJyxcbiAgTU9VU0VfTU9WRTogJ21vdXNlbW92ZScsXG4gIE1PVVNFX0RPV046ICdtb3VzZWRvd24nLFxuICBNT1VTRV9PVkVSOiAnbW91c2VvdmVyJyxcbiAgTU9VU0VfRU5URVI6ICdtb3VzZWVudGVyJyxcbiAgTU9VU0VfTEVBVkU6ICdtb3VzZWxlYXZlJ1xufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnay1kcmFnZ2FibGUtZGF0YS10YWJsZScsXG4gIHRlbXBsYXRlOiBgPHRhYmxlIFtuZ0NsYXNzXT1cInsgJ29uRHJhZ01vZGUnIDogIWRyYWdNb2RlT2ZmIH1cIj5cbiAgPHRoZWFkPlxuICA8dHI+XG4gICAgPHRoIGNsYXNzPVwiZHJhZ2dhYmxlLXJvdy1pY29uLXBsYWNlaG9sZGVyXCI+PC90aD5cbiAgICA8dGggKm5nSWY9XCJzZWxlY3RhYmxlXCIgY2xhc3M9XCJkcmFnZ2FibGUtcm93LWNoZWNrLWJveFwiPlxuICAgICAgPHAtY2hlY2tib3ggKG9uQ2hhbmdlKT1cInNlbGVjdEFsbCgkZXZlbnQpXCI+PC9wLWNoZWNrYm94PlxuICAgIDwvdGg+XG4gICAgPHRkICpuZ0lmPVwic2hvd0luZGV4XCIgY2xhc3M9XCJkcmFnZ2FibGUtcm93LWluZGV4XCI+PC90ZD5cbiAgICA8dGggKm5nRm9yPVwibGV0IGNvbCBvZiBjb2x1bW5zXCIgW25nU3R5bGVdPVwiY29sLnN0eWxlXCI+e3tjb2wuaGVhZGVyfX08L3RoPlxuICA8L3RyPlxuICA8L3RoZWFkPlxuICA8dGJvZHkgI3RhYmxlQm9keT5cblxuICA8dHIgKm5nRm9yPVwibGV0IHJvdyBvZiBkcmFnZ2FibGVJdGVtcztpbmRleCBhcyBpO1wiIFtjbGFzc109XCJyb3cuY2xhc3NcIiBbbmdDbGFzc109XCJ7ICdkcmFnZ2FibGUtcm93JyA6IHRydWUgfVwiXG4gICAgICAobW91c2VvdmVyKT1cIm9uTW91c2VPdmVyKCRldmVudCwgaSlcIiAobW91c2V1cCk9XCJvbk1vdXNlVXAoKVwiPlxuXG4gICAgPHRkIGNsYXNzPVwiZHJhZ2dhYmxlLXJvdy1pY29uLXBsYWNlaG9sZGVyXCIgKG1vdXNlZG93bik9XCJvbk1vdXNlRG93bigkZXZlbnQsIGkpXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImRyYWdnYWJsZS1yb3ctaWNvblwiPjwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZHJhZ2dhYmxlLXJvdy1pY29uXCI+PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJkcmFnZ2FibGUtcm93LWljb25cIj48L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImRyYWdnYWJsZS1yb3ctaWNvblwiPjwvc3Bhbj5cbiAgICA8L3RkPlxuICAgIDx0ZCAqbmdJZj1cInNlbGVjdGFibGVcIiBjbGFzcz1cImRyYWdnYWJsZS1yb3ctY2hlY2stYm94XCI+XG4gICAgICA8cC1jaGVja2JveCBbdmFsdWVdPVwiZ2V0SXRlbUluZGV4KGkpXCIgWyhuZ01vZGVsKV09XCJzZWxlY3RlZEluZGV4ZXNcIiAob25DaGFuZ2UpPVwib25TZWxlY3Rpb25DaGFuZ2UoKVwiPlxuICAgICAgPC9wLWNoZWNrYm94PlxuICAgIDwvdGQ+XG4gICAgPHRkICpuZ0lmPVwic2hvd0luZGV4XCIgY2xhc3M9XCJkcmFnZ2FibGUtcm93LWluZGV4XCIgKG1vdXNlZG93bik9XCJvbk1vdXNlRG93bigkZXZlbnQsIGkpXCI+XG4gICAgICA8c3Bhbj57e2dldEl0ZW1JbmRleChpKSArIDF9fTwvc3Bhbj5cbiAgICA8L3RkPlxuICAgIDx0ZCAqbmdGb3I9XCJsZXQgY29sIG9mIGNvbHVtbnNcIiBbbmdTdHlsZV09XCJjb2wuc3R5bGVcIiAobW91c2Vkb3duKT1cIm9uTW91c2VEb3duKCRldmVudCwgaSlcIj5cbiAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb2wudGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBjb2wsIHJvd0RhdGE6IHJvdywgcm93SW5kZXg6IGdldEl0ZW1JbmRleChpKX1cIj48L25nLWNvbnRhaW5lcj5cbiAgICA8L3RkPlxuICA8L3RyPlxuICA8L3Rib2R5PlxuPC90YWJsZT5cblxuPGRpdiAqbmdJZj1cIighIWRyYWdnYWJsZUl0ZW1zICYmIGRyYWdnYWJsZUl0ZW1zLmxlbmd0aCA9PT0gMCkgfHwgIWRyYWdnYWJsZUl0ZW1zXCJcbiAgICAgY2xhc3M9XCJlbXB0eS1zdGF0ZS1wbGFjZWhvbGRlclwiPlxuICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZW1wdHlTdGF0ZVRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG48L2Rpdj5cblxuPHAtcGFnaW5hdG9yICpuZ0lmPVwicGFnaW5hdG9yXCIgW3Jvd3NdPVwicm93c1wiIFt0b3RhbFJlY29yZHNdPVwidmFsdWUgPyB2YWx1ZS5sZW5ndGggOiAwXCJcbiAgICAgICAgICAgICBbcm93c1BlclBhZ2VPcHRpb25zXT1cInJvd3NQZXJQYWdlT3B0aW9uc1wiIChvblBhZ2VDaGFuZ2UpPVwicGFnaW5hdGUoJGV2ZW50KVwiPlxuPC9wLXBhZ2luYXRvcj5cblxuPGRpdiAjZHJhZ2dhYmxlIFtoaWRkZW5dPVwiZHJhZ01vZGVPZmZcIlxuICAgICBbbmdDbGFzc109XCJ7ICdtdWx0aXBsZS1kcmFnLWFuZC1kcm9wJyA6IChtdWx0aXBsZURyYWdBbmREcm9wICYmIHNlbGVjdGVkSW5kZXhlcy5sZW5ndGggPiAxKSB9XCJcbiAgICAgKG1vdXNldXApPVwib25Nb3VzZVVwKClcIiAobW91c2Vtb3ZlKT1cIm9uTW91c2VNb3ZlKCRldmVudClcIj5cbiAgPHNwYW4gKm5nSWY9XCJtdWx0aXBsZURyYWdBbmREcm9wICYmIHNlbGVjdGVkSW5kZXhlcy5sZW5ndGggPiAxXCIgY2xhc3M9XCJzZWxlY3RlZC1pdGVtcy1jb3VudGVyXCI+e3tzZWxlY3RlZEluZGV4ZXMubGVuZ3RofX08L3NwYW4+XG4gIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkcmFnZ2FibGVWaWV3VGVtcGxhdGU7IGNvbnRleHQ6IHtjdXJyZW50RHJhZ2dhYmxlSXRlbTogY3VycmVudERyYWdnYWJsZUl0ZW19XCI+XG4gIDwvbmctY29udGFpbmVyPlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgdGFibGV7d2lkdGg6MTAwJTt0ZXh0LWFsaWduOmxlZnQ7dGFibGUtbGF5b3V0OmZpeGVkO2JvcmRlci1jb2xsYXBzZTpjb2xsYXBzZX10YWJsZSB0aGVhZHtib3JkZXI6MXB4IHNvbGlkICNkOWQ5ZDk7Ym9yZGVyLWxlZnQ6bm9uZTtib3JkZXItcmlnaHQ6bm9uZX10YWJsZSB0aGVhZCB0cntoZWlnaHQ6MzJweDtjb2xvcjojOTk5fXRhYmxlIHRib2R5e292ZXJmbG93OmF1dG99dGFibGUgdGJvZHkgdHJ7aGVpZ2h0OjcwcHg7YmFja2dyb3VuZDojZmZmO2NvbG9yOiM5OTl9dGFibGUgdHJ7Ym9yZGVyOjFweCBzb2xpZCAjZDlkOWQ5O2NvbG9yOiMzMzM7Ym9yZGVyLWxlZnQ6bm9uZTtib3JkZXItcmlnaHQ6bm9uZX0ub3BlbntvcGFjaXR5Oi41fS5ob3ZlcmVke2JhY2tncm91bmQtY29sb3I6I2ViZWJlYiFpbXBvcnRhbnQ7dGV4dC1pbmRlbnQ6LTk5OTlweDtib3JkZXI6bm9uZSFpbXBvcnRhbnR9LmRyYWdnYWJsZS1yb3ctaWNvbntkaXNwbGF5Om5vbmU7d2lkdGg6NHB4O2hlaWdodDo0cHg7Ym9yZGVyLXJhZGl1czoycHg7YmFja2dyb3VuZC1jb2xvcjojY2NjO21hcmdpbjo0cHggMCA0cHggN3B4fS5kcmFnZ2FibGUtcm93LWNoZWNrLWJveCwuZHJhZ2dhYmxlLXJvdy1pY29uLXBsYWNlaG9sZGVyLC5kcmFnZ2FibGUtcm93LWluZGV4e3dpZHRoOjE1cHh9LmRyYWdnYWJsZS1yb3ctY2hlY2stYm94e3dpZHRoOjQ0cHh9LmRyYWdnYWJsZS1yb3d7Y3Vyc29yOi13ZWJraXQtZ3JhYjtjdXJzb3I6Z3JhYn0ub25EcmFnTW9kZSAuZHJhZ2dhYmxlLXJvd3tjdXJzb3I6LXdlYmtpdC1ncmFiYmluZztjdXJzb3I6Z3JhYmJpbmd9LmRyYWdnYWJsZS1yb3c6aG92ZXIgLmRyYWdnYWJsZS1yb3ctaWNvbntkaXNwbGF5OmJsb2NrfS5vbkRyYWdNb2RlIC5kcmFnZ2FibGUtcm93OmhvdmVyIC5kcmFnZ2FibGUtcm93LWljb257ZGlzcGxheTpub25lfS5mYWRlSW57LXdlYmtpdC1hbmltYXRpb24tbmFtZTpmYWRlSW47YW5pbWF0aW9uLW5hbWU6ZmFkZUluOy13ZWJraXQtYW5pbWF0aW9uLWR1cmF0aW9uOi41czthbmltYXRpb24tZHVyYXRpb246LjVzOy13ZWJraXQtYW5pbWF0aW9uLWZpbGwtbW9kZTpib3RoO2FuaW1hdGlvbi1maWxsLW1vZGU6Ym90aH0ubXVsdGlwbGUtZHJhZy1hbmQtZHJvcHtib3gtc2hhZG93OjVweCA1cHggMCAwICNmZmYsN3B4IDdweCA4cHggMCByZ2JhKDUwLDUwLDUwLC4zOCk7Ym9yZGVyLXJhZGl1czoycHh9LnNlbGVjdGVkLWl0ZW1zLWNvdW50ZXJ7ei1pbmRleDoxO3dpZHRoOjIwcHg7aGVpZ2h0OjIwcHg7YmFja2dyb3VuZDojMDBhNzg0O2Rpc3BsYXk6YmxvY2s7Ym9yZGVyLXJhZGl1czoxMHB4O2NvbG9yOiNmZmY7dGV4dC1hbGlnbjpjZW50ZXI7cG9zaXRpb246YWJzb2x1dGU7dG9wOi0xMHB4O3JpZ2h0Oi0xMHB4O2ZvbnQtc2l6ZTpzbWFsbDtsaW5lLWhlaWdodDoxNTAlO2ZvbnQtd2VpZ2h0OjcwMH0uZW1wdHktc3RhdGUtcGxhY2Vob2xkZXJ7dGV4dC1hbGlnbjpjZW50ZXJ9QC13ZWJraXQta2V5ZnJhbWVzIGZhZGVJbnswJXtvcGFjaXR5OjB9MTAwJXtvcGFjaXR5OjF9fUBrZXlmcmFtZXMgZmFkZUluezAle29wYWNpdHk6MH0xMDAle29wYWNpdHk6MX19YF1cbn0pXG5leHBvcnQgY2xhc3MgRHJhZ2dhYmxlRGF0YVRhYmxlQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25Jbml0IHtcblxuICBASW5wdXQoKSBlbXB0eVN0YXRlVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQElucHV0KCkgZHJhZ2dhYmxlVmlld1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBPdXRwdXQoKSB2YWx1ZUNoYW5nZTogRXZlbnRFbWl0dGVyPGFueVtdPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55W10+KCk7XG5cbiAgQFZpZXdDaGlsZCgnZHJhZ2dhYmxlJykgcHJpdmF0ZSBkcmFnZ2FibGVFbGVtZW50OiBFbGVtZW50UmVmO1xuXG4gIEBWaWV3Q2hpbGQoJ3RhYmxlQm9keScpIHByaXZhdGUgdGFibGVCb2R5OiBFbGVtZW50UmVmO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oQ29sdW1uQ29tcG9uZW50KSBjb2xzOiBRdWVyeUxpc3Q8Q29sdW1uQ29tcG9uZW50PjtcblxuICBjdXJyZW50RHJhZ2dhYmxlSXRlbTogYW55O1xuXG4gIGRyYWdnYWJsZTogYW55O1xuXG4gIHRhYmxlQm9keUVsZW1lbnQ6IGFueTtcblxuICBjb2x1bW5zOiBDb2x1bW5Db21wb25lbnRbXTtcblxuICBkcmFnTW9kZU9mZjogYm9vbGVhbiA9IHRydWU7XG5cbiAgc2VsZWN0ZWRJbmRleGVzOiBudW1iZXJbXSA9IFtdO1xuXG4gIG1vdXNlTW92ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIG1vdXNlTW92ZTogT2JzZXJ2YWJsZTxhbnk+O1xuXG4gIHByaXZhdGUgX3ZhbHVlOiBhbnlbXTtcblxuICBwdWJsaWMgZHJhZ2dhYmxlSXRlbXM6IGFueVtdO1xuXG4gIHB1YmxpYyB1bkRyYWdnYWJsZUl0ZW1zRnJvbVRvcDogYW55W107XG5cbiAgcHVibGljIHVuRHJhZ2dhYmxlSXRlbXNGcm9tQm90dG9tOiBhbnlbXTtcblxuICBwcml2YXRlIF9jdXJyZW50RHJhZ2dlZEluZGV4OiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBfY3VycmVudFBsYWNlSG9sZGVySW5kZXg6IG51bWJlciA9IC0xO1xuXG4gIHByaXZhdGUgX2N1cnJlbnREcmFnZ2VkRWxlbWVudDogRXZlbnRUYXJnZXQ7XG5cbiAgcHJpdmF0ZSBfZHJvcEF2YWlsYWJsZSA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIHNldCB2YWx1ZSh2YWw6IGFueVtdKSB7XG4gICAgaWYgKHZhbCkge1xuICAgICAgdGhpcy5fdmFsdWUgPSBbLi4udmFsXTtcbiAgICAgIHRoaXMuX29yZGVySXRlbXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fdmFsdWUgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGdldCB2YWx1ZSgpOiBhbnlbXSB7XG4gICAgaWYgKHRoaXMuZHJhZ01vZGVPZmYpIHtcbiAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG4gIH1cblxuXG4gIEBJbnB1dCgpIHVuRHJhZ2dhYmxlRnJvbVRvcCA9IDA7XG5cbiAgQElucHV0KCkgdW5EcmFnZ2FibGVGcm9tQm90dG9tID0gMDtcblxuICBASW5wdXQoKSByb3dUcmFja0J5OiBGdW5jdGlvbiA9IChpbmRleDogbnVtYmVyLCBpdGVtOiBhbnkpID0+IGl0ZW07XG5cbiAgQElucHV0KCkgY29sdW1uVHJhY2tCeTogRnVuY3Rpb24gPSAoaW5kZXg6IG51bWJlciwgaXRlbTogYW55KSA9PiBpdGVtO1xuXG4gIEBJbnB1dCgpIHBhZ2luYXRvcjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIHJvd3M6IG51bWJlcjtcblxuICBASW5wdXQoKSByb3dzUGVyUGFnZU9wdGlvbnM6IG51bWJlcltdO1xuXG4gIEBJbnB1dCgpIHNob3dJbmRleDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIG11bHRpcGxlRHJhZ0FuZERyb3A6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASW5wdXQoKSBzZWxlY3RhYmxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIHNlbGVjdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueVtdPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55W10+KCk7XG5cbiAgQE91dHB1dCgpIHBhZ2VDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgfVxuXG4gIC8vIGNvbXBvbmVudCBsaWZlY3ljbGUgZXZlbnRzXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmKHRoaXMucGFnaW5hdG9yKSB7XG4gICAgICB0aGlzLnVuRHJhZ2dhYmxlRnJvbUJvdHRvbSA9IHRoaXMucm93cztcbiAgICB9XG5cbiAgICB0aGlzLl9vcmRlckl0ZW1zKCk7XG4gICAgdGhpcy5kcmFnZ2FibGUgPSB0aGlzLmRyYWdnYWJsZUVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLnRhYmxlQm9keUVsZW1lbnQgPSB0aGlzLnRhYmxlQm9keS5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMubW91c2VNb3ZlID0gT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsIEV2ZW50cy5NT1VTRV9NT1ZFKS5kZWxheSg1MCk7XG5cbiAgICAvLyBjb3ZlciBub24tcGVybWl0dGVkIGRyYWdnaW5nL2Ryb3BwaW5nOlxuICAgIE9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCBFdmVudHMuTU9VU0VfVVApLnN1YnNjcmliZSgoKSA9PiB0aGlzLm9uTW91c2VVcCgpKTtcbiAgICBPYnNlcnZhYmxlLmZyb21FdmVudCh0aGlzLnRhYmxlQm9keS5uYXRpdmVFbGVtZW50LCBFdmVudHMuTU9VU0VfTEVBVkUpLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9vbk1vdXNlTGVhdmUoKSk7XG4gICAgT2JzZXJ2YWJsZS5mcm9tRXZlbnQodGhpcy50YWJsZUJvZHkubmF0aXZlRWxlbWVudCwgRXZlbnRzLk1PVVNFX0VOVEVSKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fb25Nb3VzZUVudGVyKCkpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuY29sdW1ucyA9IHRoaXMuY29scy50b0FycmF5KCk7XG4gIH1cblxuICAvLyBwdWJsaWMgQVBJIG1ldGhvZHNcbiAgb25Nb3VzZU1vdmUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICB0aGlzLl91cGRhdGVEcmFnZ2FibGUoZXZlbnQpO1xuICB9XG5cbiAgb25Nb3VzZU92ZXIoZXZlbnQ6IGFueSwgaW5kZXg6IG51bWJlcikge1xuXG4gICAgLy8gb25seSBmb3IgRCZEIG1vZGU6XG4gICAgaWYgKCF0aGlzLmRyYWdNb2RlT2ZmICYmIGluZGV4ICE9PSB0aGlzLl9jdXJyZW50UGxhY2VIb2xkZXJJbmRleCkge1xuXG4gICAgICAvLyBnZXQgbW91c2UgbG9jYXRpb24gdG8gcmVjb2duaXplIHdoZXJlIHRvIGFkZCB0aGUgcGxhY2Vob2xkZXIgKGZyb20gdG9wIG9yIGJvdHRvbSk6XG4gICAgICBjb25zdCBtaWRkbGU6IG51bWJlciA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgKGV2ZW50LmN1cnJlbnRUYXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0IC8gMik7XG4gICAgICBjb25zdCBob3ZlcmVkUm93ID0gT2JqZWN0LmNyZWF0ZShPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcy5kcmFnZ2FibGVJdGVtc1tpbmRleF0pKTtcbiAgICAgIE9iamVjdC5hc3NpZ24oaG92ZXJlZFJvdywgdGhpcy5kcmFnZ2FibGVJdGVtc1tpbmRleF0pO1xuXG4gICAgICAvLyBkZWxldGUgcHJldmlvdXM6XG4gICAgICBpZiAodGhpcy5fY3VycmVudFBsYWNlSG9sZGVySW5kZXggIT09IC0xKSB7XG4gICAgICAgIHRoaXMuZHJhZ2dhYmxlSXRlbXMuc3BsaWNlKHRoaXMuX2N1cnJlbnRQbGFjZUhvbGRlckluZGV4LCAxKTtcbiAgICAgIH1cblxuICAgICAgLy8gYWRkIHBsYWNlaG9sZGVyIGZyb20gdGhlIGJvdHRvbTpcbiAgICAgIGlmIChldmVudC5jbGllbnRZID4gbWlkZGxlKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRQbGFjZUhvbGRlckluZGV4ID0gaW5kZXggKyAxO1xuICAgICAgICB0aGlzLmRyYWdnYWJsZUl0ZW1zLnNwbGljZSh0aGlzLl9jdXJyZW50UGxhY2VIb2xkZXJJbmRleCwgMCwgaG92ZXJlZFJvdyk7XG4gICAgICAgIHRoaXMuZHJhZ2dhYmxlSXRlbXNbdGhpcy5fY3VycmVudFBsYWNlSG9sZGVySW5kZXhdLmNsYXNzID0gJ2hvdmVyZWQnO1xuICAgICAgICB0aGlzLl91cGRhdGVWaWV3KCk7XG4gICAgICB9IGVsc2UgeyAvLyBhZGQgcGxhY2Vob2xkZXIgZnJvbSB0aGUgdG9wOlxuICAgICAgICB0aGlzLl9jdXJyZW50UGxhY2VIb2xkZXJJbmRleCA9IGluZGV4O1xuICAgICAgICB0aGlzLmRyYWdnYWJsZUl0ZW1zLnNwbGljZSh0aGlzLl9jdXJyZW50UGxhY2VIb2xkZXJJbmRleCwgMCwgaG92ZXJlZFJvdyk7XG4gICAgICAgIHRoaXMuZHJhZ2dhYmxlSXRlbXNbdGhpcy5fY3VycmVudFBsYWNlSG9sZGVySW5kZXhdLmNsYXNzID0gJ2hvdmVyZWQnO1xuICAgICAgICB0aGlzLl91cGRhdGVWaWV3KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25Nb3VzZURvd24oZXZlbnQ6IE1vdXNlRXZlbnQsIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAvLyBvbmx5IGxlZnQgYnV0dG9uIG1vdXNlIGNsaWNrXG4gICAgaWYgKGV2ZW50LndoaWNoID09PSAxKSB7XG4gICAgICBpZiAodGhpcy5tdWx0aXBsZURyYWdBbmREcm9wKSB7XG5cbiAgICAgICAgLy8gc2lnbiBkcmFnZ2FibGUgaXRlbSBhcyAnY2hlY2tlZCcgaWYgaXQncyBub3Q6XG4gICAgICAgIGNvbnN0IGN1cnJlbnRDbGlja2VkSW5kZXggPSB0aGlzLmdldEl0ZW1JbmRleChpbmRleCk7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkSW5kZXhlcy5pbmRleE9mKGN1cnJlbnRDbGlja2VkSW5kZXgpID09PSAtMSkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleGVzID0gW2N1cnJlbnRDbGlja2VkSW5kZXgsIC4uLnRoaXMuc2VsZWN0ZWRJbmRleGVzXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGVkZ2UtY2FzZSB3aGVuIGFsbCBpdGVtcyBhcmUgc2VsZWN0ZWQgLSBkJmQgc2hvdWxkIGJlIGRpc2FibGVkXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkSW5kZXhlcy5sZW5ndGggPT09IHRoaXMuX3ZhbHVlLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleGVzLmZvckVhY2goaW5kZXggPT4gdGhpcy5fdmFsdWVbaW5kZXhdLmNsYXNzID0gJ29wZW4nKTtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSBbLi4udGhpcy5fdmFsdWVdO1xuICAgICAgfVxuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5jdXJyZW50RHJhZ2dhYmxlSXRlbSA9IHRoaXMuZHJhZ2dhYmxlSXRlbXNbaW5kZXhdO1xuICAgICAgdGhpcy5fdXBkYXRlRHJhZ2dhYmxlKGV2ZW50KTtcbiAgICAgIHRoaXMuZHJhZ01vZGVPZmYgPSBmYWxzZTtcbiAgICAgIHRoaXMuX2N1cnJlbnREcmFnZ2VkSW5kZXggPSBpbmRleDtcbiAgICAgIHRoaXMuX2N1cnJlbnREcmFnZ2VkRWxlbWVudCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG4gICAgICB0aGlzLl9jdXJyZW50RHJhZ2dlZEVsZW1lbnRbJ2NsYXNzTGlzdCddLmFkZCgnb3BlbicpO1xuICAgICAgdGhpcy5tb3VzZU1vdmVTdWJzY3JpcHRpb24gPSB0aGlzLm1vdXNlTW92ZS5zdWJzY3JpYmUoKGU6IE1vdXNlRXZlbnQpID0+IHRoaXMub25Nb3VzZU1vdmUoZSkpO1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmRyYWdnYWJsZSwgJ2ZhZGVJbicpO1xuICAgIH1cbiAgfVxuXG4gIG9uTW91c2VVcCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZHJhZ01vZGVPZmYpIHtcbiAgICAgIHRoaXMuZHJhZ01vZGVPZmYgPSB0cnVlO1xuICAgICAgdGhpcy5fY3VycmVudERyYWdnZWRFbGVtZW50WydjbGFzc0xpc3QnXS5yZW1vdmUoJ29wZW4nKTtcbiAgICAgIHRoaXMuX3ZhbHVlLmZvckVhY2goaXRlbSA9PiBkZWxldGUgaXRlbVsnY2xhc3MnXSk7XG4gICAgICB0aGlzLm1vdXNlTW92ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShkb2N1bWVudC5ib2R5LCAnY3Vyc29yJywgJ2RlZmF1bHQnKTtcblxuICAgICAgaWYgKHRoaXMuX2Ryb3BBdmFpbGFibGUpIHtcbiAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRQbGFjZUhvbGRlckluZGV4ICE9PSAtMSkge1xuICAgICAgICAgIGlmICh0aGlzLm11bHRpcGxlRHJhZ0FuZERyb3ApIHtcblxuICAgICAgICAgICAgLy8gc2F2ZSBpdGVtIG9mIHRoaXMuX2N1cnJlbnRQbGFjZUhvbGRlckluZGV4IC0gd2UnbGwgbmVlZCB0aGlzIGl0ZW0gdG8gZmluZCB0aGUgZW50cnktcG9pbnQ6XG4gICAgICAgICAgICBsZXQgaW5zZXJ0SW5kZXhSZWZlcmVuY2UgPSB0aGlzLmRyYWdnYWJsZUl0ZW1zW3RoaXMuX2N1cnJlbnRQbGFjZUhvbGRlckluZGV4XTtcblxuICAgICAgICAgICAgLy8gc2F2ZSBhbGwgZHJhZ2dlZCBpdGVtcyBhc2lkZTpcbiAgICAgICAgICAgIGNvbnN0IGRyYWdnZWRJdGVtczogYW55W10gPSB0aGlzLnNlbGVjdGVkSW5kZXhlcy5zb3J0KHNvcnRpbmdGdW5jdGlvbikubWFwPGFueT4oaW5kZXggPT4gdGhpcy5fdmFsdWVbaW5kZXggKyAoKGluZGV4ID49IHRoaXMuX2N1cnJlbnRQbGFjZUhvbGRlckluZGV4KSA/IDEgOiAwKV0pO1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgZHJhZ2dlZCAoc2VsZWN0ZWQgaXRlbXMpIGZyb20gdGhlIG9yaWdpbmFsIGRhdGE6XG4gICAgICAgICAgICBkcmFnZ2VkSXRlbXMuZm9yRWFjaChpdGVtID0+IHRoaXMuX3ZhbHVlLnNwbGljZSh0aGlzLl92YWx1ZS5pbmRleE9mKGl0ZW0pLCAxKSk7XG5cbiAgICAgICAgICAgIC8vIGluc2VydCBkcmFnZ2FibGUgaXRlbXMgYmFjayB0byB0aGUgb3JpZ2luYWwgZGF0YSBidXQgd2l0aCBuZXcgb3JkZXI6XG4gICAgICAgICAgICB0aGlzLl92YWx1ZS5zcGxpY2UodGhpcy5fdmFsdWUuaW5kZXhPZihpbnNlcnRJbmRleFJlZmVyZW5jZSksIDEsIC4uLmRyYWdnZWRJdGVtcyk7XG5cbiAgICAgICAgICAgIC8vIGluaXRpYXRlIHN0YXRlOlxuICAgICAgICAgICAgdGhpcy5fY3VycmVudFBsYWNlSG9sZGVySW5kZXggPSAtMTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleGVzID0gW107XG4gICAgICAgICAgICB0aGlzLl9vcmRlckl0ZW1zKCk7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVWaWV3KCk7XG4gICAgICAgICAgICB0aGlzLm9uU2VsZWN0aW9uQ2hhbmdlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgYnVmZmVyOiBudW1iZXIgPSAodGhpcy5fY3VycmVudERyYWdnZWRJbmRleCA+PSB0aGlzLl9jdXJyZW50UGxhY2VIb2xkZXJJbmRleCkgPyAxIDogMDtcbiAgICAgICAgICAgIC8vIGluc2VydCBkcmFnZ2VkIGl0ZW0gdG8gdGhlIG5ldyBsb2NhdGlvbjpcbiAgICAgICAgICAgIHRoaXMuZHJhZ2dhYmxlSXRlbXNbdGhpcy5fY3VycmVudFBsYWNlSG9sZGVySW5kZXhdID0gdGhpcy5kcmFnZ2FibGVJdGVtc1t0aGlzLl9jdXJyZW50RHJhZ2dlZEluZGV4ICsgYnVmZmVyXTtcblxuICAgICAgICAgICAgLy8gcmVtb3ZlIGRyYWdnZWQgaXRlbSBwcmV2aW91cyBsb2NhdGlvbiAmIHVwZGF0ZSB2aWV3OlxuICAgICAgICAgICAgdGhpcy5kcmFnZ2FibGVJdGVtcy5zcGxpY2UodGhpcy5fY3VycmVudERyYWdnZWRJbmRleCArIGJ1ZmZlciwgMSk7XG5cbiAgICAgICAgICAgIC8vIGluaXRpYXRlIHN0YXRlOlxuICAgICAgICAgICAgdGhpcy5fY3VycmVudFBsYWNlSG9sZGVySW5kZXggPSAtMTtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVZpZXcoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHVuZHJvcHBhYmxlIGFyZWEgLSBpbml0aWF0ZSBzdGF0ZTpcbiAgICAgICAgdGhpcy5kcmFnZ2FibGVJdGVtcy5zcGxpY2UodGhpcy5fY3VycmVudFBsYWNlSG9sZGVySW5kZXgsIDEpO1xuICAgICAgICB0aGlzLl9jdXJyZW50UGxhY2VIb2xkZXJJbmRleCA9IC0xO1xuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXhlcyA9IFtdO1xuICAgICAgICB0aGlzLm9uU2VsZWN0aW9uQ2hhbmdlKCk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVZpZXcoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwYWdpbmF0ZShldmVudDogYW55KSB7XG4gICAgdGhpcy51bkRyYWdnYWJsZUZyb21Ub3AgPSBldmVudC5maXJzdDtcbiAgICB0aGlzLnVuRHJhZ2dhYmxlRnJvbUJvdHRvbSA9IChldmVudC5maXJzdCArIGV2ZW50LnJvd3MpO1xuICAgIHRoaXMudmFsdWUgPSBbLi4udGhpcy51bkRyYWdnYWJsZUl0ZW1zRnJvbVRvcCwgLi4udGhpcy5kcmFnZ2FibGVJdGVtcywgLi4udGhpcy51bkRyYWdnYWJsZUl0ZW1zRnJvbUJvdHRvbV07XG4gICAgdGhpcy5wYWdlQ2hhbmdlLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgc2VsZWN0QWxsKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGVkSW5kZXhlcyA9IChldmVudCkgPyBbLi4uQXJyYXkuZnJvbShBcnJheSh0aGlzLl92YWx1ZS5sZW5ndGgpLCAoXyx4KSA9PiB4KV0gOiBbXTtcbiAgICB0aGlzLm9uU2VsZWN0aW9uQ2hhbmdlKCk7XG4gIH1cblxuICBvblNlbGVjdGlvbkNoYW5nZSgpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWRJbmRleGVzLnNvcnQoc29ydGluZ0Z1bmN0aW9uKS5tYXAoaW5kZXggPT4gdGhpcy5fdmFsdWVbaW5kZXhdKSk7XG4gIH1cblxuICBnZXRJdGVtSW5kZXgoaW5kZXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlLmluZGV4T2YodGhpcy5kcmFnZ2FibGVJdGVtc1tpbmRleF0pO1xuICB9XG5cbiAgLy8gcHJpdmF0ZSBtZXRob2RzXG4gIHByaXZhdGUgX3VwZGF0ZVZpZXcoKTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9ICh0aGlzLnBhZ2luYXRvcikgPyBbLi4udGhpcy51bkRyYWdnYWJsZUl0ZW1zRnJvbVRvcCwgLi4udGhpcy5kcmFnZ2FibGVJdGVtcywgLi4udGhpcy51bkRyYWdnYWJsZUl0ZW1zRnJvbUJvdHRvbV0gOiBbLi4udGhpcy5kcmFnZ2FibGVJdGVtc107XG4gICAgaWYgKHRoaXMuZHJhZ01vZGVPZmYpIHsgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHRoaXMudmFsdWUpOyB9XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVEcmFnZ2FibGUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZHJhZ2dhYmxlLCAncG9zaXRpb24nLCAnZml4ZWQnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZHJhZ2dhYmxlLCAnbGVmdCcsIGV2ZW50LmNsaWVudFggKyAyMCArICdweCcpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5kcmFnZ2FibGUsICd0b3AnLCBldmVudC5jbGllbnRZIC0gMzUgKyAncHgnKTtcbiAgfVxuXG4gIHByaXZhdGUgX29uTW91c2VMZWF2ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9kcm9wQXZhaWxhYmxlID0gZmFsc2U7XG4gICAgaWYgKCF0aGlzLmRyYWdNb2RlT2ZmKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGRvY3VtZW50LmJvZHksICdjdXJzb3InLCAnbm8tZHJvcCcpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX29uTW91c2VFbnRlcigpOiB2b2lkIHtcbiAgICB0aGlzLl9kcm9wQXZhaWxhYmxlID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX29yZGVySXRlbXMoKSB7XG4gICAgaWYgKCEhdGhpcy52YWx1ZSkge1xuICAgICAgaWYgKHRoaXMucGFnaW5hdG9yKSB7XG4gICAgICAgIC8vIG9uY2UgdXNpbmcgZCZkIHdpdGggcGFnaW5hdGlvbiBwYWdlLXNpemUgaGFzIHRvIGJlIGluY3JlYXNlZCBieSAxIGJlY2F1c2Ugb2YgdGhlIGFkZGVkIHBsYWNlaG9sZGVyXG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9ICh0aGlzLl9jdXJyZW50UGxhY2VIb2xkZXJJbmRleCA9PT0gLTEpID8gMCA6IDE7XG5cbiAgICAgICAgdGhpcy51bkRyYWdnYWJsZUl0ZW1zRnJvbVRvcCA9IFsuLi50aGlzLnZhbHVlLnNsaWNlKDAsIHRoaXMudW5EcmFnZ2FibGVGcm9tVG9wKV07XG4gICAgICAgIHRoaXMudW5EcmFnZ2FibGVJdGVtc0Zyb21Cb3R0b20gPSBbLi4udGhpcy52YWx1ZS5zbGljZSh0aGlzLnVuRHJhZ2dhYmxlRnJvbUJvdHRvbSArIGJ1ZmZlcildO1xuICAgICAgICB0aGlzLmRyYWdnYWJsZUl0ZW1zID0gWy4uLnRoaXMudmFsdWUuc2xpY2UodGhpcy51bkRyYWdnYWJsZUZyb21Ub3AsIHRoaXMudW5EcmFnZ2FibGVGcm9tQm90dG9tICsgYnVmZmVyKV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRyYWdnYWJsZUl0ZW1zID0gWy4uLnRoaXMudmFsdWVdO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19