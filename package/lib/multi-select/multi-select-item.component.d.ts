import { EventEmitter, TemplateRef } from '@angular/core';
import { SelectItem } from 'primeng/api';
export declare class MultiSelectItem {
    option: SelectItem;
    selected: boolean;
    disabled: boolean;
    visible: boolean;
    itemSize: number;
    template: TemplateRef<any>;
    maxSelectionLimitReached: boolean;
    onClick: EventEmitter<any>;
    onKeydown: EventEmitter<any>;
    onOptionClick(event: Event): void;
    onOptionKeydown(event: Event): void;
}
