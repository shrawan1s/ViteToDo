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

// Output types of data and error.
export type User = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    _v: number
}

type ApiResponseSuccess = {
    success: true;
    authToken: string;
    message: string;
    user: User
}

export type ApiResponseError = {
    success: false;
    error: string;
}

export type ApiResponse = ApiResponseSuccess | ApiResponseError;

export type UserDocument = {
    firstName: string;
    lastName: string;
    email: string;
    resetToken?: string;
    resetTokenExpiresAt?: Date;
}

type ApiResponsePasswordSuccess = {
    success: true;
    message: string;
}

export type ApiResponsePasswordError = {
    success: false;
    error: string;
}

export type GetUserResponse = {
    success?: boolean;
    token?: string;
    user?: User
    error?: string;
};

export type ApiPasswordResponse = ApiResponsePasswordSuccess | ApiResponsePasswordError;
