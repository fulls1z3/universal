// angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// libs
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '@ngx-auth/core';
import { TranslateService } from '@ngx-translate/core';

// framework
import { BaseComponent } from '~/app/framework/core/core.module';

// app
import { routeAnimation } from '~/app/app.animations';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routeAnimation]
})
export class LoginComponent extends BaseComponent implements OnInit {
  username: string;
  password: string;
  isProcessing: boolean;
  note$: Observable<string>;
  warn$: Observable<string>;

  constructor(private readonly auth: AuthService,
              private readonly translate: TranslateService,
              private readonly router: Router) {
    super();
  }

  ngOnInit(): void {
    if (this.auth.isAuthenticated)
      this.router.navigateByUrl(this.auth.defaultUrl);
  }

  login(): void {
    this.isProcessing = true;
    this.note$ = this.translate.get('PUBLIC.LOGIN.NOTE');

    this.auth.authenticate(this.username, this.password)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.isProcessing = false;

        if (!this.auth.isAuthenticated)
          this.warn$ = this.translate.get('PUBLIC.LOGIN.WARN');
      });
  }
}
