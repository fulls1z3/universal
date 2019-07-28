import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfigService } from '@ngx-config/core';

import { BaseComponent } from './framework/core';
import { languageActions, State } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent extends BaseComponent implements OnInit {
  constructor(private readonly store$: Store<State>, private readonly config: ConfigService) {
    super();
  }

  ngOnInit(): void {
    const settings = this.config.getSettings('i18n');
    this.store$.dispatch(languageActions.i18nInitLanguage(settings));
  }
}
