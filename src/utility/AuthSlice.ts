// Define the types for user authentication data and API responses
export type UserDataSignup = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

export type UserDataSignin = {
    email: string;
    password: string;
};

export type ForgotPassword = {
    email: string;
};

export type GetUser = {
    token: string;
};

// Define the types for API responses
export type ApiResponseSuccess = {
    success: true;
    authToken: string;
    message: string;
};

export type ApiResponseError = {
    success: false;
    error: string;
};

export type ApiResponse = ApiResponseSuccess | ApiResponseError;

export type ApiPasswordResponseSuccess = {
    success: true;
    message: string;
};

export type ApiPasswordResponseError = {
    success: false;
    error: string;
};

export type ApiPasswordResponse = ApiPasswordResponseSuccess | ApiPasswordResponseError;

export type GetUserResponse = {
    user?: {
        firstName: string;
        lastName: string;
        email: string;
    };
    error?: string;
};

export type ResetPasswordParams = {
    resetToken: string;
    newPassword: string;
};

// AuthState type
export type AuthState = {
    message: string | null;
    isLoggedIn: boolean;
    token: string | null;
    error: string | null;
    success: boolean;
    user?: {
        firstName: string;
        lastName: string;
        email: string;
    } | null;
};

// Initial state
export const initialState: AuthState = {
    message: null,
    isLoggedIn: false,
    token: null,
    error: null,
    success: false,
    user: null,
};

// Utility function to reset state values
export const resetState = (state: AuthState) => {
    state.error = null;
    state.message = null;
    state.success = false;
    state.user = null;
};