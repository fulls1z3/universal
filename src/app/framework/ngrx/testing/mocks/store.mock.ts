// angular
import { Injectable } from '@angular/core';

// libs
import { BehaviorSubject } from 'rxjs';
import { ActionsSubject, ReducerManager, StateObservable, Store } from '@ngrx/store';

@Injectable()
export class MockStore<T> extends Store<T> {
  private subject: BehaviorSubject<T>;

  constructor(
    state$: StateObservable,
    actionsObserver: ActionsSubject,
    reducerManager: ReducerManager
  ) {
    super(state$, actionsObserver, reducerManager);

    this.subject = new BehaviorSubject<T>({} as T);
    this.source = this.subject.asObservable();
  }

  setState(nextState: T): void {
    this.subject.next(nextState);
  }
}
