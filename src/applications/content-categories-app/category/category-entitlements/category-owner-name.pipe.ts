import {Pipe, PipeTransform} from '@angular/core';
import {KontorolUser} from 'kontorol-ngx-client';

@Pipe({ name: 'kCategoryOwnerName' })
export class CategoryOwnerNamePipe implements PipeTransform {
  constructor() {
  }

  transform(value: KontorolUser): string {
    return value.email || value.id;
  }
}
