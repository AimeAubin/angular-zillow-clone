import { ActionReducer, createReducer, on } from '@ngrx/store';
import { AuthResponse } from '../model/auth';
import { AuthActions } from '../store/action-types';

export const authFeatureKey = 'auth';

export interface AuthState {
  loading: boolean;
  res: Partial<AuthResponse> | null;
  error: string | null;
}
