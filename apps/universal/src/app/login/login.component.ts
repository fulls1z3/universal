import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { State } from '@fulls1z3/shared/store';
import { authActions, AuthSelectors } from '@fulls1z3/shared/store-account';
import { routeAnimation } from '@fulls1z3/shared/ui-base';
import { BaseContainerComponent } from '@fulls1z3/shared/ui-store';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routeAnimation]
})
export class LoginComponent extends BaseContainerComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder, private readonly router: Router, protected readonly store$: Store<State>) {
    super(store$);
  }

  get isProcessing$(): Observable<boolean> {
    return this.store$.pipe(select(AuthSelectors.getIsProcessing));
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLoginClick(): void {
    this.store$.dispatch(
      authActions.accountLogin({
        resource: {
          email: this.loginForm.get('email').value,
          password: this.loginForm.get('password').value
        }
      })
    );
  }
}
