import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { signinUser, signupUser, forgotPassword, resetPassword, getUser } from '../../api/userAuth';
import { SigninFormValues } from '../../utility/SigninUtility';
import { SignupFormValues } from '../../utility/SignupUtility';
import { ForgotPasswordFormValues } from '../../utility/ForgotPasswordUtility';
import { ApiPasswordResponse, GetUserResponse } from '../../utility/UserAuth';
import { AuthState, initialState, ResetPasswordParams, resetState } from '../../utility/AuthSlice';

// Define the async thunk for signing in
export const login = createAsyncThunk(
    'auth/login',
    async (userData: SigninFormValues, { rejectWithValue }) => {
        try {
            const response = await signinUser(userData);
            if (response.success) {
                return response; // Return the success response including authToken
            } else {
                return rejectWithValue(response.error); // Return the error message
            }
        } catch (error: any) {
            // Distinguish between network error and server error
            if (!error.response) {
                // Network error
                return rejectWithValue('Network error: Please check your connection.');
            } else {
                // Server responded with an error
                return rejectWithValue(error.message || 'Failed to Login');
            }
        }
    }
);

// Define the async thunk for signing up
export const signup = createAsyncThunk(
    'auth/signup',
    async (userData: SignupFormValues, { rejectWithValue }) => {
        try {
            const response = await signupUser(userData);
            if (response.success) {
                return response; // Return the success response including authToken
            } else {
                return rejectWithValue(response.error); // Return the error message
            }
        } catch (error: any) {
            // Distinguish between network error and server error
            if (!error.response) {
                // Network error
                return rejectWithValue('Network error: Please check your connection.');
            } else {
                // Server responded with an error
                return rejectWithValue(error.message || 'Failed to Signup');
            }
        }
    }
);

// Define the async thunk for get reset link
export const forgotpassword = createAsyncThunk(
    'auth/forgotpassword',
    async (userData: ForgotPasswordFormValues, { rejectWithValue }) => {
        try {
            const response = await forgotPassword(userData);
            if (response.success) {
                return response; // Return the success response including authToken
            } else {
                return rejectWithValue(response.error); // Return the error message
            }
        } catch (error: any) {
            // Distinguish between network error and server error
            if (!error.response) {
                // Network error
                return rejectWithValue('Network error: Please check your connection.');
            } else {
                // Server responded with an error
                return rejectWithValue(error.message || 'Failed to send reset token');
            }
        }
    }
);

// Define the async thunk for reset password
export const resetpassword = createAsyncThunk<ApiPasswordResponse, ResetPasswordParams>(
    'auth/resetpassword',
    async ({ resetToken, newPassword }, { rejectWithValue }: any) => {
        try {
            const response = await resetPassword(resetToken, newPassword);
            if (response.success) {
                return response; // Return the success response including authToken
            } else {
                return rejectWithValue(response.error); // Return the error message
            }
        } catch (error: any) {
            // Distinguish between network error and server error
            if (!error.response) {
                // Network error
                return rejectWithValue('Network error: Please check your connection.');
            } else {
                // Server responded with an error
                return rejectWithValue(error.message || 'Failed to send reset token');
            }
        }
    }
);

// Define the async thunk for fetch user information
export const fetchUserData = createAsyncThunk<GetUserResponse, string>(
    'auth/fetchUserData',
    async (token: string, { rejectWithValue }) => {
        try {
            const response = await getUser({ token });
            if (!response.error) {
                return response; // Return the success response
            } else {
                return rejectWithValue(response.error); // Return the error message
            }
        } catch (error: any) {
            if (!error.response) {
                return rejectWithValue('Network error: Please check your connection.');
            } else {
                return rejectWithValue(error.message || 'Failed to fetch user data');
            }
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.token = null;
            state.isLoggedIn = false;
            state.message = null;
            state.error = null;
            state.success = false;
            localStorage.removeItem('authToken');
        },
        clearState(state: AuthState) {
            resetState(state);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            resetState(state)
        });
        builder.addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
            state.message = action.payload.message;
            state.token = action.payload.authToken;
            state.success = true;
            state.isLoggedIn = true;
            localStorage.setItem('authToken', action.payload.authToken);
        });
        builder.addCase(login.rejected, (state, action) => {
            state.error = action.payload as string;
            state.success = false;
        });

        builder.addCase(signup.pending, (state) => {
            resetState(state)
        });
        builder.addCase(signup.fulfilled, (state, action: PayloadAction<any>) => {
            state.message = action.payload.message;
            state.token = action.payload.authToken;
            state.success = true;
            state.isLoggedIn = true;
            localStorage.setItem('authToken', action.payload.authToken);
        });
        builder.addCase(signup.rejected, (state, action) => {
            state.error = action.payload as string;
            state.success = false;
        });

        builder.addCase(forgotpassword.pending, (state) => {
            resetState(state)
        });
        builder.addCase(forgotpassword.fulfilled, (state, action: PayloadAction<any>) => {
            state.message = action.payload.message;
            // state.token = action.payload.resetToken;
            state.success = true;
        });
        builder.addCase(forgotpassword.rejected, (state, action) => {
            state.error = action.payload as string;
            state.success = false;
        });

        builder.addCase(resetpassword.pending, (state) => {
            resetState(state)
        });
        builder.addCase(resetpassword.fulfilled, (state, action: PayloadAction<any>) => {
            state.message = action.payload.message;
            // state.token = action.payload.resetToken;
            state.success = true;
        });
        builder.addCase(resetpassword.rejected, (state, action) => {
            state.error = action.payload as string;
            state.success = false;
        });
    },
});

export const { logout, clearState } = authSlice.actions;

export default authSlice.reducer;
