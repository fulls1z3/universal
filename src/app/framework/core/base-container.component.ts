// angular
import { Component } from '@angular/core';

// libs
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

// module
import { BaseComponent } from './base.component';
import { State } from '~/app/store';

@Component({
  template: ''
})
export class BaseContainerComponent extends BaseComponent {
  error$: Observable<string>;
  isProcessing$: Observable<boolean>;

  constructor(protected readonly store$: Store<State>) {
    super();
  }
}
