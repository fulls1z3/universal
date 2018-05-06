// angular
import { OnDestroy } from '@angular/core';

// libs
import { Subject } from 'rxjs';

export abstract class BaseComponent implements OnDestroy {
  protected ngUnsubscribe: Subject<void>;

  constructor() {
    this.ngUnsubscribe = new Subject<void>();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
