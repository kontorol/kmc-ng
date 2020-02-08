import {Injectable} from '@angular/core';
import {CategoryWidget} from '../category-widget';
import {KontorolLogger} from '@kontorol-ng/kontorol-logger';

@Injectable()
export class CategoryDetailsWidget extends CategoryWidget {
  constructor(logger: KontorolLogger) {
    super('categoryDetails', logger);
  }

  /**
   * Do some cleanups if needed once the section is removed
   */
  protected onReset(): void {
  }
}
