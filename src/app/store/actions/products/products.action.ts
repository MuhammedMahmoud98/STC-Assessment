import { createAction, props } from '@ngrx/store';
import { Product } from '../../../models/products.model';

export const getAllProducts = createAction(
  '[PRODUCTS] LOAD ALL PRODUCTS',
);

export const getAllProductsSuccess = createAction(
  '[PRODUCTS] LOAD ALL PRODUCTS SUCCESS',
  props<{products: Product[]}>(),
);

export const getAllProductsFailed = createAction(
  '[PRODUCTS] LOAD ALL PRODUCTS FAILED',
  props<{errorMessage?: string}>(),
);

export const addNewProduct = createAction(
  '[PRODUCTS] ADD NEW PRODUCT',
  props<{product: Omit<Product, 'id' | 'rating'>}>(),
);

export const addNewProductSuccess = createAction(
  '[PRODUCTS] ADD NEW PRODUCT SUCCESS',
  props<{product: Product}>(),
);

export const addNewProductFailed = createAction(
  '[PRODUCTS] ADD NEW PRODUCT FAILED',
  props<{errorMessage: string}>(),
);

export const updateProduct = createAction(
  '[PRODUCTS] UPDATE PRODUCT',
  props<{product?: Product}>(),
);

export const updateProductSuccess = createAction(
  '[PRODUCTS] UPDATE PRODUCT SUCCESS',
  props<{product?: Product}>(),
);

export const updateProductFailed = createAction(
  '[PRODUCTS] UPDATE PRODUCT SUCCESS',
  props<{errorMessage?: string}>(),
);
