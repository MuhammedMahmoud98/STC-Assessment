import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginState } from '../../reducers/Users/users.reducer';

const getUsersFeatureSelector = createFeatureSelector<LoginState>('usersReducer');

export const isLoggedInSelector = createSelector(
  getUsersFeatureSelector,
  (state) => state.isLoggedIn,
);

export const getUserSelector = createSelector(
  getUsersFeatureSelector,
  (state) => state.loggedInUser,
);

export const isAdminSelector = createSelector(
  getUsersFeatureSelector,
  (state) => state.isAdmin,
);
