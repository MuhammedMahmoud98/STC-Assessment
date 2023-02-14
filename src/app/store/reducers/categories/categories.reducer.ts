import { createReducer, on } from '@ngrx/store';
import { state } from '@angular/animations';
import {
  getAllCategories,
  getAllCategoriesFailed,
  getAllCategoriesSuccess,
} from '../../actions/categories/categories.action';

export interface CategoriesState {
  categories?: string[],
  hasError?: boolean,
  isCategoriesLoading?: boolean;
  errorMessage?: string;
}

const initialState: CategoriesState = {
  categories: [],
  isCategoriesLoading: false,
  hasError: false,
  errorMessage: '',
};

export const categoriesReducer = createReducer(
  initialState,
  on(getAllCategories, (state, action) => ({
    ...state,
    isCategoriesLoading: true,
    hasError: false,
  })),
  on(getAllCategoriesSuccess, (state, action) => ({
    ...state,
    isCategoriesLoading: false,
    categories: action.categories,
    hasError: false,
  })),
  on(getAllCategoriesFailed, (state, action) => ({
    ...state,
    isCategoriesLoading: false,
    hasError: true,
    errorMessage: action.errorMessage,
  })),
);
