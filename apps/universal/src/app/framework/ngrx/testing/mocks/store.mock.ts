import { Injectable } from '@angular/core';
import { ActionsSubject, ReducerManager, StateObservable, Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MockStore<T extends Object> extends Store<T> {
  private readonly subject: BehaviorSubject<T>;

  constructor(readonly state$: StateObservable, actionsObserver: ActionsSubject, reducerManager: ReducerManager) {
    super(state$, actionsObserver, reducerManager);

    const val: any = {};
    this.subject = new BehaviorSubject<T>(val);
    this.source = this.subject.asObservable();
  }

  setState(nextState: T): void {
    this.subject.next(nextState);
  }
}
