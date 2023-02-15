import {
  AfterViewInit, ChangeDetectorRef, Component, OnInit,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from './models/user.model';
import { setLoggedInUser } from './store/actions/Users/user.action';
import { isProductsLoadingSelector } from './store/selectors/products/products.selector';
import { getAllCategories } from './store/actions/categories/categories.action';
import {isAdminSelector, isLoggedInSelector} from "./store/selectors/login/login.selector";
import {tap} from "rxjs/operators";
import {AuthValidationService} from "./shared/services/auth-validation.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  lang = 'en';

  isProductsLoading$: Observable<boolean> = new Observable<boolean>();

  isLoggedIn$: Observable<boolean>;

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
    },
  ];

  constructor(
    public translate: TranslateService,
    private readonly store: Store,
    private readonly router: Router,
    private readonly authValidationService: AuthValidationService,
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
    this.setDefaultLang();
    this.productsLoaderSelector();
    this.loadAllCategories();
    this.authValidationService.authValidation();
  }

  ngAfterViewInit(): void {
    if (localStorage.getItem('stc-lang') === 'ar') {
      window.document.body.classList.add('rtl');
    } else {
      window.document.body.classList.add('ltr');
    }
  }

  productsLoaderSelector(): void {
    this.isProductsLoading$ = this.store.pipe(select(isProductsLoadingSelector));
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
    this.isAdmin$ = this.store.pipe(select(isAdminSelector));
  }

  loadAllCategories(): void {
    this.store.dispatch(getAllCategories());
  }

  setLanguage(lang: string): void {
    this.translate.use(lang);
  }

  setDefaultLang(): void {
    if (!!localStorage.getItem('stc-lang')) {
      const lang = localStorage.getItem('stc-lang');
      this.setLanguage(lang as string);
    } else {
      localStorage.setItem('stc-lang', 'en');
      this.setLanguage('en');
    }
  }

  get isMobile() {
    return window.innerWidth < 992;
  }
}

interface NavRoutes {
  path?: string;
  activeClass?: string;
  name?: string
}
