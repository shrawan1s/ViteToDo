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
type ApiResponseSuccess = {
    success: true;
    authToken?: string;
    message: string;
}

export type ApiResponseError = {
    success: false;
    error: string;
    status?: number; // Optional: To handle HTTP status codes.
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
    status?: number; // Optional: To handle HTTP status codes.
}

export type GetUserResponse = {
    user?: {
        firstName: string;
        lastName: string;
        email: string;
    };
    error?: string;
};

export type ApiPasswordResponse = ApiResponsePasswordSuccess | ApiResponsePasswordError;
