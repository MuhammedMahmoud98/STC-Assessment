import { createAction, props } from '@ngrx/store';

export const getAllCategories = createAction(
  '[CATEGORY] GET ALL CATEGORIES',
);

export const getAllCategoriesSuccess = createAction(
  '[CATEGORY] GET ALL CATEGORIES SUCCESS',
  props<{categories: string[]}>(),
);

export const getAllCategoriesFailed = createAction(
  '[CATEGORY] GET ALL CATEGORIES FAILED',
  props<{errorMessage?: string}>(),
);
