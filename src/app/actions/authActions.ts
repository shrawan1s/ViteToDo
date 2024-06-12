import { Dispatch } from 'redux';
import { signinUser, signupUser } from '../../api/userAuth';
import { ApiResponse } from '../../utility/UserAuth';

// Define action types
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

// Define action creators for authentication-related actions
export const signin = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const userData = { email, password };
      const response: ApiResponse = await signinUser(userData);
      if (response.success && response.authToken) {
        dispatch({ type: SIGNIN_SUCCESS, authToken: response.authToken });
      } else if ('error' in response && response.error) {
        dispatch({ type: SIGNIN_FAILURE, error: response.error });
      }
    } catch (error: any) {
      dispatch({ type: SIGNIN_FAILURE, error: error.message || 'Signin failed' });
    }
  };
};

export const signup = (firstName: string, lastName: string, email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const userData = { firstName, lastName, email, password };
      const response: ApiResponse = await signupUser(userData);
      if (response.success && response.authToken) {
        dispatch({ type: SIGNIN_SUCCESS, authToken: response.authToken });
      } else if ('error' in response && response.error) {
        dispatch({ type: SIGNIN_FAILURE, error: response.error });
      }
    } catch (error: any) {
      dispatch({ type: SIGNUP_FAILURE, error: error.message || 'Signup failed' });
    }
  };
};
