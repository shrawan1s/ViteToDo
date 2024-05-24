// Input types of data.
export type UserDataSignup = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export type UserDataSignin = {
    email: string;
    password: string;
}

export type ForgotPassword = {
    email: string;
}

export type GetUser = {
    token: string;
}

// Output types of data and error.
type ApiResponseSuccess = {
    success: true;
    authToken?: string;
    message: string;
}

export type ApiResponseError = {
    success: false;
    error: string;
}

export type ApiResponse = ApiResponseSuccess | ApiResponseError;

type ApiResponsePasswordSuccess = {
    success: true;
    message: string;
}

export type ApiResponsePasswordError = {
    success: false;
    error: string;
}

export type UserDocument = {
    firstName: string;
    lastName: string;
    email: string;
    resetToken?: string;
    resetTokenExpiresAt?: Date;
}

export type GetUserResponse = UserDocument | ApiResponseError;

export type ApiPasswordResponse = ApiResponsePasswordSuccess | ApiResponsePasswordError;
