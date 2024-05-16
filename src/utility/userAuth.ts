// Input types of data.
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


// Output types of data and error.
type ApiResponseSuccess = {
    success: true;
    authToken: string;
    message: string;
}

export type ApiResponseError = {
    success: false;
    error: string;
}

export type ApiResponse = ApiResponseSuccess | ApiResponseError;

type ApiResponseForgotPasswordSuccess = {
    success: true;
    message: string;
}

export type ApiResponseForgotPasswordError = {
    success: false;
    error: string;
}

export type ApiForgotPasswordResponse = ApiResponseForgotPasswordSuccess | ApiResponseForgotPasswordError;
