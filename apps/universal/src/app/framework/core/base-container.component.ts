import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { FrameworkState } from '../store';

import { BaseComponent } from './base.component';

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

  constructor(protected readonly store$: Store<FrameworkState>) {
    super();
  }
}
