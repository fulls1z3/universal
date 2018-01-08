// angular
import { Component, OnInit } from '@angular/core';

// libs
import { Store } from '@ngrx/store';
import { ConfigService } from '@ngx-config/core';
// TODO: ngx-i18n-router
// import { I18NRouterService } from '@ngx-i18n-router/core';

// framework
import { I18NState, LANGUAGE_ACTIONS } from './framework/i18n/i18n.module';

// styles
import '../assets/sass/lib.scss';
import '../assets/sass/layout.scss';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private readonly i18nStore: Store<I18NState>,
              private readonly config: ConfigService) {
    // TODO: ngx-i18n-router
    // private readonly i18nRouter: I18NRouterService) {
  }

  ngOnInit(): void {
    this.i18nStore.dispatch(new LANGUAGE_ACTIONS.Init(this.config.getSettings('i18n')));
  }
}
