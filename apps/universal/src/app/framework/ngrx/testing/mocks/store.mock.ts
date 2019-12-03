import { Injectable } from '@angular/core';
import { ActionsSubject, ReducerManager, StateObservable, Store } from '@ngrx/store';
import { flow } from 'lodash/fp';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MockStore<T extends Object> extends Store<T> {
  private readonly subject = flow(
    () => {},
    (cur: T) => new BehaviorSubject<T>(cur)
  )();

  constructor(readonly state$: StateObservable, actionsObserver: ActionsSubject, reducerManager: ReducerManager) {
    super(state$, actionsObserver, reducerManager);

    this.source = this.subject.asObservable();
  }

  setState(nextState: T): void {
    this.subject.next(nextState);
  }
}
