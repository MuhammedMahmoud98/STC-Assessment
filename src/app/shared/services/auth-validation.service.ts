import { Injectable } from '@angular/core';
import {User} from "../../models/user.model";
import {setLoggedInUser} from "../../store/actions/Users/user.action";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";

@Injectable({
  providedIn: 'root'
})
export class AuthValidationService {

  constructor(private readonly router: Router, private readonly store: Store) { }

  authValidation() {
    const userToken = JSON.parse(localStorage.getItem('stc-user-token')) as User;
    if (!userToken) {
      return this.router.navigate(['/auth/login']);
    }
    const userRole = userToken?.role;
    this.store.dispatch(setLoggedInUser({ user: userToken, isAdmin: userToken.role === 'admin' }));
    if (userRole === 'admin') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/end-user']);
    }
  }
}
