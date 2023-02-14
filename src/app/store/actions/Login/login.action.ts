import { createAction, props } from '@ngrx/store';

export const startLogin = createAction(
  '[LOGIN] START LOGIN',
  props<{userName?: string; password?: string}>(),
);

export const loginFailed = createAction(
  '[LOGIN] LOGIN FAILED',
);
