import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoriesState } from '../../reducers/categories/categories.reducer';

const getCategoriesFeaturedSelector = createFeatureSelector<CategoriesState>('categoriesReducer');

export const getAllCategoriesSelector = createSelector(
  getCategoriesFeaturedSelector,
  (state) => state.categories,
);
