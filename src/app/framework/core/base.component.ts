import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { BaseDocument, UniqueId } from '~/app/framework/ngrx';

@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseComponent implements OnDestroy {
  protected ngUnsubscribe: Subject<void>;

  constructor() {
    this.ngUnsubscribe = new Subject<void>();
  }

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
