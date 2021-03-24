import { Injectable } from '@angular/core';
import { ActionsSubject, ReducerManager, StateObservable, Store } from '@ngrx/store';
import { flow } from 'lodash/fp';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MockStore<T extends unknown> extends Store<T> {
  private readonly subject = flow(
    () => {
      return;
    },
    (cur: T) => new BehaviorSubject<T>(cur)
  )();

  constructor(readonly state$: StateObservable, actionsObserver: ActionsSubject, reducerManager: ReducerManager) {
    super(state$, actionsObserver, reducerManager);

    this.source = this.subject.asObservable();
  }

  setState(nextState: T) {
    this.subject.next(nextState);
  }
}
