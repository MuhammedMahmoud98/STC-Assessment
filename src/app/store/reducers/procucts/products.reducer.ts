import { createReducer, on } from '@ngrx/store';
import { Product } from '../../../models/products.model';
import {
  addNewProduct, addNewProductFailed, addNewProductSuccess,
  getAllProducts,
  getAllProductsFailed,
  getAllProductsSuccess,
} from '../../actions/products/products.action';

export interface ProductsState {
  products: Product[],
  isProductsLoading?: boolean;
  isModalLoading?: boolean;
  hasError?: boolean;
  errorMessage?: string;
}

export const initialState: ProductsState = {
  products: [],
  isProductsLoading: false,
  isModalLoading: false,
  hasError: false,
  errorMessage: '',
};

export const productsReducer = createReducer(
  initialState,
  on(getAllProducts, (state) => ({ ...state, isProductsLoading: true, hasError: false })),
  on(getAllProductsSuccess, (state, action) => ({
    ...state,
    products: action.products,
    isProductsLoading: false,
    hasError: false,
  })),
  on(getAllProductsFailed, (state, action) => ({
    ...state,
    isProductsLoading: false,
    hasError: true,
    errorMessage: action.errorMessage,
  })),
  on(addNewProduct, (state, action) => ({
    ...state,
    isModalLoading: true,
  })),
  on(addNewProductSuccess, (state, action) => {
    const newStateProducts = [...state.products];
    newStateProducts.unshift({ ...action.product });
    return {
      ...state,
      products: newStateProducts,
      isModalLoading: false,
    };
  }),
  on(addNewProductFailed, (state, action) => ({
    ...state,
    isModalLoading: false,
    hasError: true,
    errorMessage: action.errorMessage,
  })),
);
