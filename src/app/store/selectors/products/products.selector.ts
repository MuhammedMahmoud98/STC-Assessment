import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from '../../reducers/procucts/products.reducer';

const getProductsFeaturedSelector = createFeatureSelector<ProductsState>('productsReducer');

export const getAllProductsSelector = createSelector(
  getProductsFeaturedSelector,
  (state) => state.products,
);

export const isProductsLoadingSelector = createSelector(
  getProductsFeaturedSelector,
  (state) => state.isProductsLoading,
);

export const isDialogLoadingSelector = createSelector(
  getProductsFeaturedSelector,
  (state) => state.isModalLoading,
);
