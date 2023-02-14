import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError, map, switchMap, tap,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductsService } from '../../../shared/services/products.service';
import {
  addNewProduct, addNewProductFailed, addNewProductSuccess,
  getAllProducts,
  getAllProductsFailed,
  getAllProductsSuccess,
} from '../../actions/products/products.action';

@Injectable()
export class ProductsEffect {
  constructor(
    private action$: Actions,
    private readonly productsService: ProductsService,
  ) {}

  loadProducts$ = createEffect(() => this.action$.pipe(
    ofType(getAllProducts),
    switchMap((action) => this.productsService.getProducts().pipe(
      map((products) => getAllProductsSuccess({ products })),
    )),
    catchError((err) => of(getAllProductsFailed({ errorMessage: 'Products failed to be loaded' }))),
  ));

  addProduct$ = createEffect(() => this.action$.pipe(
    ofType(addNewProduct),
    switchMap((action) => this.productsService.addNewProduct(action.product).pipe(
      map((product) => addNewProductSuccess({ product: { ...product, rating: { rate: 4.2, count: 54 } } })),
      tap(() => this.productsService.closeDialog$.next(true)),
    )),
    catchError((err) => of(addNewProductFailed({ errorMessage: 'Product failed to be added' }))),
  ));
}
