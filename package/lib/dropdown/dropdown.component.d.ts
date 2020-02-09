import { Dropdown } from 'primeng/components/dropdown/dropdown';
import { SelectItem } from 'primeng/components/common/selectitem';
export declare const DROPDOWN_VALUE_ACCESSOR: any;
export declare class DropdownComponent extends Dropdown {
    onItemClick(event: MouseEvent, option: SelectItem): void;
    selectItem(event: MouseEvent, option: SelectItem): void;
}
