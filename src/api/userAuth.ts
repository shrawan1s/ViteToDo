import axios, { AxiosError } from 'axios';
import { ApiPasswordResponse, ApiResponse, ApiResponseError, ApiResponsePasswordError, ForgotPassword, GetUserResponse, UserDataSignin, UserDataSignup } from '../utility/UserAuth';

const BASE_AUTH_URL = import.meta.env.VITE_BASE_AUTH_URL;

// Create an instance of Axios with a base URL configured
const axiosInstance = axios.create({
    baseURL: BASE_AUTH_URL,
});

// Signup User
export const signupUser = async (userData: UserDataSignup): Promise<ApiResponse> => {
    try {
        const response = await axiosInstance.post<ApiResponse>('/createuser', userData);
        return response.data;
    } catch (error: any) {
        return handleAxiosError(error);
    }
};

// Signin User
export const signinUser = async (userData: UserDataSignin): Promise<ApiResponse> => {
    try {
        const response = await axiosInstance.post<ApiResponse>('/login', userData);
        return response.data;
    } catch (error: any) {
        return handleAxiosError(error);
    }
};

// Get User Details (with token in header)
export const getUser = async (token: string): Promise<GetUserResponse> => {
    try {
        const response = await axiosInstance.get<GetUserResponse>('/getuser', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        return handleAxiosError(error);
    }
};

// Forgot Password
export const forgotPassword = async (userData: ForgotPassword): Promise<ApiPasswordResponse> => {
    try {
        const response = await axiosInstance.post<ApiPasswordResponse>('/forgotpassword', userData);
        return response.data;
    } catch (error: any) {
        return handleAxiosForgotPasswordError(error);
    }
};

// Reset Password
export const resetPassword = async (resetToken: string, newPassword: string): Promise<ApiPasswordResponse> => {
    try {
        const response = await axiosInstance.post<ApiPasswordResponse>('/resetpassword', { resetToken, newPassword });
        return response.data;
    } catch (error: any) {
        return handleAxiosForgotPasswordError(error);
    }
};

// Error Handling
const handleAxiosError = (error: AxiosError<ApiResponseError>): ApiResponseError => {
    if (error.response) {
        return { success: false, error: error.response.data.error };
    } else if (error.request) {
        console.error('No response received from the server:', error.message);
        return { success: false, error: 'Network error' };
    } else {
        console.error('Error setting up the request:', error.message);
        return { success: false, error: 'Request error' };
    }
};

const handleAxiosForgotPasswordError = (error: AxiosError<ApiResponsePasswordError>): ApiResponsePasswordError => {
    if (error.response) {
        return { success: false, error: error.response.data.error };
    } else if (error.request) {
        console.error('No response received from the server:', error.message);
        return { success: false, error: 'Network error' };
    } else {
        console.error('Error setting up the request:', error.message);
        return { success: false, error: 'Request error' };
    }
};
