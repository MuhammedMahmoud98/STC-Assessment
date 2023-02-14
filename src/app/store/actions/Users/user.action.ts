import { createAction, props } from '@ngrx/store';
import { User } from '../../../models/user.model';

export const setLoggedInUser = createAction(
  '[USER] SET LOGGED IN USER',
  props<{user: User, isAdmin?: boolean}>(),
);
