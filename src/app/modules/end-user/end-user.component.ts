import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  animate, style, transition, trigger,
} from '@angular/animations';
import { Product } from '../../models/products.model';
import { getAllCategoriesSelector } from '../../store/selectors/categories/categories.selector';
import { getAllProductsSelector, isProductsLoadingSelector } from '../../store/selectors/products/products.selector';
import { getAllProducts } from '../../store/actions/products/products.action';

@Component({
  selector: 'app-end-user',
  templateUrl: './end-user.component.html',
  styleUrls: ['./end-user.component.scss'],
  animations: [
    trigger('showWithOpacity', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class EndUserComponent implements OnInit {
  categories$: Observable<string[]>;

  products$: Observable<Product[]>;

  isProductsLoading$: Observable<boolean>;

  selectedCategory = 'All';

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
    this.loadProducts();
    this.storeSelectors();
  }

  loadProducts(): void {
    this.store.dispatch(getAllProducts());
  }

  storeSelectors(): void {
    this.categories$ = this.store.pipe(select(getAllCategoriesSelector));
    this.products$ = this.store.pipe(select(getAllProductsSelector));
    this.isProductsLoading$ = this.store.pipe(select(isProductsLoadingSelector));
  }

  selectedTabCategory($event) {
    this.selectedCategory = $event.tab.textLabel.toLowerCase();
  }
}
