// src/redux/reducers/authReducer.ts

import { SIGNIN_SUCCESS, SIGNIN_FAILURE, SIGNUP_SUCCESS, SIGNUP_FAILURE } from '../actions/authActions';

// Define type for state
type AuthState = {
  authToken: string | null;
  error: string | null;
}

// Define initial state
const initialState: AuthState = {
  authToken: null,
  error: null,
};

// Define authentication reducer function
const authReducer = (state = initialState, action: { type: string; authToken?: string | null; error?: string | null }): AuthState => {
  switch (action.type) {
    case SIGNIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return { ...state, authToken: action.authToken || null, error: null };
    case SIGNIN_FAILURE:
    case SIGNUP_FAILURE:
      return { ...state, error: action.error || null, authToken: null };
    default:
      return state;
  }
};

export default authReducer;
