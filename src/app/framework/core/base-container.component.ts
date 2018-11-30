// angular
import { ChangeDetectionStrategy, Component } from '@angular/core';

// libs
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

// app
import { FrameworkState } from '~/app/framework/store';

// module
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
