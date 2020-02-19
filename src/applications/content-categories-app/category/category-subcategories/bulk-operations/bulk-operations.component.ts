import {Component, EventEmitter, Input, Output} from '@angular/core';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import {KontorolCategory} from 'kontorol-ngx-client';
import { KMCPermissions } from 'app-shared/kmc-shared/kmc-permissions';

@Component({
  selector: 'kSubcategoriesListBulkOperationsContent',
  templateUrl: './bulk-operations.component.html',
  styleUrls: ['./bulk-operations.component.scss'],
})
export class BulkOperationsComponent {
  @Input() selectedItems: KontorolCategory[] = [];
  @Input() itemsTotalCount = 0;

  @Output() addItem = new EventEmitter<void>();
  @Output() clearSelection = new EventEmitter<void>();
  @Output() deleteItems = new EventEmitter<KontorolCategory[]>();
  @Output() moveItems = new EventEmitter<{ items: KontorolCategory[], direction: 'up' | 'down' }>();

  public _kmcPermissions = KMCPermissions;

  constructor(private _appLocalization: AppLocalization) {
  }

  public _moveItems(direction: 'up' | 'down'): void {
    this.moveItems.emit({ items: this.selectedItems, direction });
  }

  public _deleteItems(): void {
    this.deleteItems.emit(this.selectedItems);
    this.clearSelection.emit();
  }

  public _getTranslation(key: string, params: string): string {
    return this._appLocalization.get(key, { 0: params });
  }
}

