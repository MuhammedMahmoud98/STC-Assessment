import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../../models/user.model';
import { getUserSelector, isAdminSelector } from '../../../store/selectors/login/login.selector';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  user$: Observable<User>;

  isAdmin$: Observable<boolean>;

  navRoutes: NavRoutes[] = [
    {
      path: '/admin',
      name: 'admin',
      activeClass: 'active-route',
    },
    {
      path: '/end-user',
      name: 'user view',
      activeClass: 'active-route',
    }
  ];
  constructor(private readonly store: Store) { }

  ngOnInit(): void {
    this.getUserSelectors();
  }

  getUserSelectors(): void {
    this.user$ = this.store.pipe(select(getUserSelector));
    this.isAdmin$ = this.store.pipe(select(isAdminSelector));
  }
}


interface NavRoutes {
  path?: string;
  activeClass?: string;
  name?: string
}
