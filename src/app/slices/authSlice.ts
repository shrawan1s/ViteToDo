import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { signinUser, signupUser, forgotPassword, resetPassword, getUser } from '../../api/userAuth';
import { SigninFormValues } from '../../utility/SigninUtility';
import { SignupFormValues } from '../../utility/SignupUtility';
import { ForgotPasswordFormValues } from '../../utility/ForgotPasswordUtility';
import { ApiPasswordResponse, ApiPasswordResponseSuccess, ApiResponseSuccess, GetUserResponse, initialState, ResetPasswordParams, resetState } from '../../utility/AuthSlice';
import { toast } from 'react-toastify';

// Define the async thunk for signing in
export const login = createAsyncThunk(
    'auth/login',
    async (userData: SigninFormValues, { rejectWithValue }) => {
        try {
            const response = await signinUser(userData);
            if (response.success) {
                return response;
            } else {
                return rejectWithValue(response.error);
            }
        } catch (error: any) {
            if (!error.response) {
                return rejectWithValue('Network error: Please check your connection.');
            } else {
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
                return response;
            } else {
                return rejectWithValue(response.error);
            }
        } catch (error: any) {
            if (!error.response) {
                return rejectWithValue('Network error: Please check your connection.');
            } else {
                return rejectWithValue(error.message || 'Failed to Signup');
            }
        }
    }
);

// Define the async thunk for forgot password
export const forgotpassword = createAsyncThunk(
    'auth/forgotpassword',
    async (userData: ForgotPasswordFormValues, { rejectWithValue }) => {
        try {
            const response = await forgotPassword(userData);
            if (response.success) {
                return response;
            } else {
                return rejectWithValue(response.error);
            }
        } catch (error: any) {
            if (!error.response) {
                return rejectWithValue('Network error: Please check your connection.');
            } else {
                return rejectWithValue(error.message || 'Failed to send reset token');
            }
        }
    }
);

// Define the async thunk for reset password
export const resetpassword = createAsyncThunk<ApiPasswordResponse, ResetPasswordParams>(
    'auth/resetpassword',
    async ({ resetToken, newPassword }, { rejectWithValue }) => {
        try {
            const response = await resetPassword(resetToken, newPassword);
            if (response.success) {
                return response;
            } else {
                return rejectWithValue(response.error);
            }
        } catch (error: any) {
            if (!error.response) {
                return rejectWithValue('Network error: Please check your connection.');
            } else {
                return rejectWithValue(error.message || 'Failed to reset password');
            }
        }
    }
);

// Define the async thunk for fetch user information
export const fetchUserData = createAsyncThunk<GetUserResponse, string>(
    'auth/fetchUserData',
    async (token: string, { rejectWithValue }) => {
        try {
            const response = await getUser(token);
            if (!response.error) {
                return response;
            } else {
                return rejectWithValue(response.error);
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
            state.user = null;
            localStorage.removeItem('authToken');
            toast.success('Logged Out Successfully');
        },
        clearState(state) {
            resetState(state);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action: PayloadAction<ApiResponseSuccess>) => {
            state.message = action.payload.message;
            state.token = action.payload.authToken;
            state.user = action.payload.user;
            state.success = true;
            state.isLoggedIn = true;
            localStorage.setItem('authToken', state.token);
            toast.success(action.payload.message);
        });
        builder.addCase(login.rejected, (state, action) => {
            state.error = action.payload as string;
            state.success = false;
            toast.error(action.payload as string);
        });

        builder.addCase(signup.fulfilled, (state, action: PayloadAction<ApiResponseSuccess>) => {
            state.message = action.payload.message;
            state.token = action.payload.authToken;
            state.user = action.payload.user;
            state.success = true;
            state.isLoggedIn = true;
            localStorage.setItem('authToken', state.token);
            toast.success(action.payload.message);
        });
        builder.addCase(signup.rejected, (state, action) => {
            state.error = action.payload as string;
            state.success = false;
            toast.error(action.payload as string);
        });

        builder.addCase(forgotpassword.fulfilled, (state, action: PayloadAction<ApiPasswordResponseSuccess>) => {
            state.message = action.payload.message;
            state.success = true;
            toast.success(action.payload.message);
        });
        builder.addCase(forgotpassword.rejected, (state, action) => {
            state.error = action.payload as string;
            state.success = false;
            toast.error(action.payload as string);
        });

        builder.addCase(resetpassword.fulfilled, (state, action: PayloadAction<ApiPasswordResponse>) => {
            if (action.payload.success) {
                state.message = action.payload.message;
                state.success = true;
                toast.success(action.payload.message);
            }
        });
        builder.addCase(resetpassword.rejected, (state, action) => {
            state.error = action.payload as string;
            state.success = false;
            toast.error(action.payload as string);
        });

        builder.addCase(fetchUserData.fulfilled, (state, action: PayloadAction<GetUserResponse>) => {
            state.user = action.payload.user;
            state.isLoggedIn = true;
            state.token = action.payload.token as string;
        });
        builder.addCase(fetchUserData.rejected, (state, action) => {
            state.error = action.payload as string;
            state.success = false;
        });
    },
});

export const { logout, clearState } = authSlice.actions;

export default authSlice.reducer;
