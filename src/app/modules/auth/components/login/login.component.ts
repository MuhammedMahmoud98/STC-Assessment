import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder, FormControl, FormGroup, Validators,
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { takeUntil, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { isLoggedInSelector } from '../../../../store/selectors/login/login.selector';
import { startLogin } from '../../../../store/actions/Login/login.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;

  showPassword = false

  destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public formBuilder: FormBuilder,
    private store: Store,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
    this.isLoggedInListener();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  createLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  login(): void {
    const loginValue = this.loginForm.value;
    this.store.dispatch(startLogin(loginValue));
  }

  isLoggedInListener(): void {
    this.store.pipe(
      select(isLoggedInSelector),
      tap((loginValue) => {
        if (loginValue) {
          // this.router.navigate(['/auth/l'])
        }
      }),
      takeUntil(this.destroyed$),
    ).subscribe();
  }
}
