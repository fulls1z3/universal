// angular
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

// libs
import { Store } from '@ngrx/store';
import { ConfigService } from '@ngx-config/core';
// TODO: ngx-i18n-router
// import { I18NRouterService } from '@ngx-i18n-router/core';

// app
import { BaseComponent } from '~/app/framework/core';
import { languageActions, State } from '~/app/store';

@Component({selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent extends BaseComponent implements OnInit {
  constructor(private readonly store$: Store<State>,
              private readonly config: ConfigService
              // TODO: ngx-i18n-router
              // private readonly i18nRouter: I18NRouterService
  ) {
    super();
  }

  ngOnInit(): void {
    const settings = this.config.getSettings('i18n');
    this.store$.dispatch(languageActions.i18nInitLanguage(settings));
  }
}
