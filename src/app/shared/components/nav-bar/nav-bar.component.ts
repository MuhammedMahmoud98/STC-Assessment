import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';
import { getUserSelector, isAdminSelector } from '../../../store/selectors/login/login.selector';
import { logOut } from '../../../store/actions/Login/login.action';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  user$: Observable<User>;

  isAdmin$: Observable<boolean>;

  constructor(private readonly store: Store, private readonly router: Router) { }

  ngOnInit(): void {
    this.getUserSelectors();
  }

  getUserSelectors(): void {
    this.user$ = this.store.pipe(select(getUserSelector));
    this.isAdmin$ = this.store.pipe(select(isAdminSelector));
  }

  logOut() {
    this.store.dispatch(logOut());
    localStorage.removeItem('stc-user-token');
    this.router.navigate(['/auth/login']);
  }
}
