// angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// libs
import { Store } from '@ngrx/store';

// module
import { Language } from './models/language';
import * as language from './language.actions';

@Component({
  selector: 'i18n-change-language',
  template: ''
})
export class ChangeLanguageComponent implements OnInit {
  constructor(private readonly store: Store<Language>,
              private readonly route: ActivatedRoute,
              private readonly router: Router) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: {languageCode: string}) => {
        if (params.languageCode)
          this.store.dispatch(new language.UseLanguage(params.languageCode));

        this.router.navigate(['']);
      });
  }
}
