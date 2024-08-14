import { createAction, props } from '@ngrx/store';
import { AuthResponse, User, UserLogin } from '../model/auth';

export const login = createAction(
  '[Login Page] User Login',
  props<{ user: UserLogin }>()
);

export const loginSuccess = createAction(
  '[Login Page] User Login Success',
  props<{ res: Partial<AuthResponse> }>()
);

export const loginFailure = createAction(
  '[Login Page] User Login Failure',
  props<{ error:string }>()
);

export const logout = createAction(
  '[Top Menu] User Logout',
);
