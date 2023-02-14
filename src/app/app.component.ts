import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from './models/user.model';
import { setLoggedInUser } from './store/actions/Users/user.action';
import { isProductsLoadingSelector } from './store/selectors/products/products.selector';
import {getAllCategories} from "./store/actions/categories/categories.action";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  lang = 'en';

  isProductsLoading$: Observable<boolean> = new Observable<boolean>();

  constructor(
    public translate: TranslateService,
    private readonly store: Store,
    private readonly router: Router,
  ) {
    translate.use(this.lang);
  }

  switchLang(): void {
    if (this.lang === 'ar') {
      this.translate.use('en');
      this.lang = 'en';
    } else {
      this.translate.use('ar');
      this.lang = 'ar';
    }
  }

  ngOnInit() {
    this.productsLoaderSelector();
    this.authValidation();
    this.loadAllCategories();
  }

  productsLoaderSelector(): void {
    this.isProductsLoading$ = this.store.pipe(select(isProductsLoadingSelector));
  }

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

  loadAllCategories(): void {
    this.store.dispatch(getAllCategories());
  }
}
