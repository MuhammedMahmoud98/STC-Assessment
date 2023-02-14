import { Injectable } from '@angular/core';
import {
  CanLoad, Route, Router, UrlSegment, UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private readonly router: Router) {
  }

  canLoad(
    route: Route,
    segments: UrlSegment[],
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userToken = JSON.parse(localStorage.getItem('stc-user-token')) as User || {};
    return !!userToken;
  }
}
