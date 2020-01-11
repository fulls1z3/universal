import { Component } from '@angular/core';
import { State } from '@fulls1z3/shared/store';
import { BaseComponent } from '@fulls1z3/shared/ui-base';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  template: ''
})
export class BaseContainerComponent extends BaseComponent {
  get error$(): Observable<string> {
    // NOTE: override by inheriting class
    return undefined;
  }

  get isProcessing$(): Observable<boolean> {
    // NOTE: override by inheriting class
    return undefined;
  }

  constructor(protected readonly store$: Store<State>) {
    super();
  }
}
