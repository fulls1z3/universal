// angular
import { Injectable } from '@angular/core';

// libs
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import { Actions } from '@ngrx/effects';

export function getMockActions(): Actions {
  return new MockActions();
}

@Injectable()
export class MockActions extends Actions {
  constructor() {
    /* istanbul ignore next */
    super(Observable.empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}
