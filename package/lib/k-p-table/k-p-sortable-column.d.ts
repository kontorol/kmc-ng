import { OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Table } from 'primeng/table';
export declare class KPSortableColumn implements OnInit, OnDestroy {
    dt: Table;
    field: string;
    isEnabled: boolean;
    sorted: boolean;
    subscription: Subscription;
    constructor(dt: Table);
    ngOnInit(): void;
    updateSortState(): void;
    onClick(event: MouseEvent): void;
    ngOnDestroy(): void;
}
