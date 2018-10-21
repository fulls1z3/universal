// angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// libs
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';

// framework
import { BaseComponent } from '~/app/framework/core';
import { languageActions, State } from '~/app/framework/store';

@Component({
  selector: 'i18n-change-language',
  template: ''
})
export class ChangeLanguageComponent extends BaseComponent implements OnInit {
  constructor(private readonly store$: Store<State>,
              private readonly route: ActivatedRoute,
              private readonly router: Router) {
    super();
  }

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        if (res.languageCode)
          this.store$.dispatch(languageActions.use(res.languageCode));

        this.router.navigate(['']);
      });
  }
}
