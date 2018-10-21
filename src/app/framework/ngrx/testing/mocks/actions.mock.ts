// angular
import { Injectable } from '@angular/core';

// libs
import { EMPTY, Observable } from 'rxjs';
import { Actions } from '@ngrx/effects';

@Injectable()
export class MockActions extends Actions {
  constructor() {
    super(EMPTY);
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}
