import { createReducer, on } from '@ngrx/store';
import { log } from 'util';
import { User } from '../../../models/user.model';
import { loginFailed, startLogin } from '../../actions/Login/login.action';
import { setLoggedInUser } from '../../actions/Users/user.action';

export interface LoginState {
  users?: User[],
  loggedInUser?: User;
  hasLoginError?: boolean;
  isLoggedIn?: boolean;
  isAdmin?: boolean;
}

const initialState: LoginState = {
  users: [
    {
      name: 'Muhammed Mahmoud',
      userName: 'muhammed@test.com',
      password: 'stcadmin',
      role: 'admin',
      id: 1,
    },
    {
      name: 'Jhon Doe',
      userName: 'user@test.com',
      password: 'stcuser',
      role: 'user',
      id: 2,
    },
  ],
  loggedInUser: {},
  hasLoginError: false,
  isLoggedIn: false,
  isAdmin: false,
};

export const usersReducer = createReducer(
  initialState,
  on(startLogin, (state, action) => {
    const loginUser = state.users.find((user) => user.userName === action.userName);
    const { userName, password } = loginUser;
    if (!loginUser || (password !== action.password || userName !== action.userName)) {
      return { ...state, hasLoginError: true, isLoggedIn: false };
    }
    // SET USER TO LOCAL STORAGE
    localStorage.setItem('stc-user-token', JSON.stringify(loginUser));
    return {
      ...state,
      isLoggedIn: true,
      hasLoginError: false,
      loggedInUser: loginUser,
      isAdmin: loginUser.role === 'admin',
    };
  }),
  on(setLoggedInUser, (state, action) => ({
    ...state,
    loggedInUser: action.user,
    isAdmin: action.isAdmin,
    isLoggedIn: true,
  })),
  on(loginFailed, (state) => {
    localStorage.removeItem('stc-user-token');
    return {
      ...state,
      isLoggedIn: false,
      loggedInUser: {},
    };
  }),
);
