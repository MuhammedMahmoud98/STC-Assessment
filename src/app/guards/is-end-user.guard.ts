import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class IsEndUserGuard implements CanLoad {
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const getUserRole = JSON.parse(localStorage.getItem('stc-user-token')) as User || {};
    const validRoutes = ['user', 'admin'];
    return validRoutes.includes(getUserRole?.role);
  }
}
