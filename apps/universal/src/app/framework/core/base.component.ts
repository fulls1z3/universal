import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { BaseDocument, UniqueId } from '../ngrx';

@Component({
  template: ''
})
export class BaseComponent implements OnDestroy {
  protected readonly ngUnsubscribe = new Subject();

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  trackByFn(index: number): number {
    return index;
  }

  trackByIdFn(index: number, item: BaseDocument): UniqueId {
    return item._id;
  }
}
