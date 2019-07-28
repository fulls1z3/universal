import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { FrameworkState } from '../store';

import { BaseComponent } from './base.component';

@Component({
  template: ''
})
export class BaseContainerComponent extends BaseComponent {
  error$: Observable<string>;
  isProcessing$: Observable<boolean>;

  constructor(protected readonly store$: Store<FrameworkState>) {
    super();
  }
}
