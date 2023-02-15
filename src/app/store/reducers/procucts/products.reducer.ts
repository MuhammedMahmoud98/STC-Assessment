import { createReducer, on } from '@ngrx/store';
import { Product } from '../../../models/products.model';
import {
  addNewProduct, addNewProductFailed, addNewProductSuccess, deleteProduct, deleteProductFailed, deleteProductSuccess,
  getAllProducts,
  getAllProductsFailed,
  getAllProductsSuccess, updateProduct, updateProductFailed, updateProductSuccess,
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
      hasError: false,
    };
  }),
  on(addNewProductFailed, (state, action) => ({
    ...state,
    isModalLoading: false,
    hasError: true,
    errorMessage: action.errorMessage,
  })),
  on(updateProduct, (state) => ({
    ...state,
    isModalLoading: true,
  })),
  on(updateProductSuccess, (state, action) => {
    const productsClone = [...state.products];
    const updatedProducts = productsClone.map((product) => {
      if (product?.id === action?.product?.id) {
        product = action.product;
        return product;
      }
      return product;
    });
    return {
      ...state,
      products: updatedProducts,
      isModalLoading: false,
      hasError: false,
    };
  }),
  on(updateProductFailed, (state, action) => ({
    ...state,
    hasError: true,
    isModalLoading: false,
    errorMessage: action.errorMessage,
  })),
  on(deleteProduct, (state) => ({
    ...state,
    isModalLoading: true,
    hasError: false,
  })),
  on(deleteProductSuccess, (state, action) => {
    const products = [...state.products];
    const filteredProducts = products.filter((product) => product.id !== action.productId);
    return {
      ...state,
      products: [...filteredProducts],
      hasError: false,
      isModalLoading: false,
    };
  }),
  on(deleteProductFailed, (state, action) => ({
    ...state,
    isModalLoading: false,
    hasError: true,
    errorMessage: action.errorMessage,
  })),
);
