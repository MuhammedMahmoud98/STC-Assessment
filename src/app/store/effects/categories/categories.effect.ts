import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductsService } from '../../../shared/services/products.service';
import { CategoriesService } from '../../../shared/services/categories.service';
import {
  getAllCategories,
  getAllCategoriesFailed,
  getAllCategoriesSuccess,
} from '../../actions/categories/categories.action';

@Injectable()
export class CategoriesEffect {
  constructor(
    private readonly action$: Actions,
    private readonly categoriesService: CategoriesService,
  ) {}

  getAllCategories$ = createEffect(() => this.action$.pipe(
    ofType(getAllCategories),
    switchMap(() => this.categoriesService.getAllCategories().pipe(
      map((categories) => getAllCategoriesSuccess({ categories })),
    )),
    catchError((err) => of(getAllCategoriesFailed({ errorMessage: 'Categories failed to be loaded' }))),
  ))
}
