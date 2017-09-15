// angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// libs
import { Observable } from 'rxjs/Observable';
import { AuthService } from '@ngx-auth/core';
import { TranslateService } from '@ngx-translate/core';

// app
import { routeAnimation } from '../../app.animations';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routeAnimation]
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  isProcessing: boolean;
  note$: Observable<string>;
  warn$: Observable<string>;

  constructor(private readonly auth: AuthService,
              private readonly translate: TranslateService,
              private readonly router: Router) {
  }

  ngOnInit(): void {
    if (this.auth.isAuthenticated)
      this.router.navigateByUrl(this.auth.defaultUrl);
  }

  login(): void {
    this.isProcessing = true;
    this.note$ = this.translate.get('PUBLIC.LOGIN.NOTE');

    this.auth.authenticate(this.username, this.password)
      .subscribe(() => {
        this.isProcessing = false;

        if (!this.auth.isAuthenticated)
          this.warn$ = this.translate.get('PUBLIC.LOGIN.WARN');
      });
  }
}
