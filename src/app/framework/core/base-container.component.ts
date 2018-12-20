import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FrameworkState } from '~/app/framework/store';

import { BaseComponent } from './base.component';

@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseContainerComponent extends BaseComponent {
  error$: Observable<string>;
  isProcessing$: Observable<boolean>;

  constructor(protected readonly store$: Store<FrameworkState>) {
    super();
  }
}
