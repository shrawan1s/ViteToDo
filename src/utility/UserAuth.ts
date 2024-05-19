// Input types of data.
export interface UserDataSignup {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface UserDataSignin {
    email: string;
    password: string;
}

export interface ForgotPassword {
    email: string;
}

// Output types of data and error.
interface ApiResponseSuccess {
    success: true;
    authToken?: string;
    message: string;
}

export interface ApiResponseError {
    success: false;
    error: string;
}

export type ApiResponse = ApiResponseSuccess | ApiResponseError;

interface ApiResponsePasswordSuccess {
    success: true;
    message: string;
}

export interface ApiResponsePasswordError {
    success: false;
    error: string;
}

export type ApiPasswordResponse = ApiResponsePasswordSuccess | ApiResponsePasswordError;
