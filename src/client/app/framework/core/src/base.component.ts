// angular
import { Component, OnDestroy } from '@angular/core';

// libs
import { Subject } from 'rxjs';

@Component({
  template: ''
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
}
