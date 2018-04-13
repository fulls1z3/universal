// angular
import { Injectable } from '@angular/core';

// libs
import { EMPTY, Observable } from 'rxjs';
import { Actions } from '@ngrx/effects';

export function getMockActions(): Actions {
  return new MockActions();
}

@Injectable()
export class MockActions extends Actions {
  constructor() {
    /* istanbul ignore next */
    super(EMPTY);
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}
