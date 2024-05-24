import axios, { AxiosError } from 'axios';
import { ApiPasswordResponse, ApiResponse, ApiResponseError, ApiResponsePasswordError, ForgotPassword, GetUser, GetUserResponse, UserDataSignin, UserDataSignup } from '../utility/UserAuth'

const BASE_URL = import.meta.env.BASE_URL;

export const signupUser = async (userData: UserDataSignup): Promise<ApiResponse> => {
    try {
        const response = await axios.post<ApiResponse>(`${BASE_URL}/createuser`, userData);
        return response.data;
    } catch (error: any) {
        return handleAxiosError(error);
    }
}

export const signinUser = async (userData: UserDataSignin): Promise<ApiResponse> => {
    try {
        const response = await axios.post<ApiResponse>(`${BASE_URL}/login`, userData);
        return response.data;
    } catch (error: any) {
        return handleAxiosError(error);
    }
}

export const getUser = async (token: GetUser): Promise<GetUserResponse> => {
    try {
        console.log(token);
        const response = await axios.post<GetUserResponse>(`${BASE_URL}/getuser`, token);
        return response.data;
    } catch (error: any) {
        return handleAxiosError(error);
    }
}

export const forgotPassword = async (userData: ForgotPassword): Promise<ApiPasswordResponse> => {
    try {
        const response = await axios.post<ApiPasswordResponse>(`${BASE_URL}/forgotpassword`, userData);
        return response.data;
    } catch (error: any) {
        return handleAxiosForgotPasswordError(error);
    }
}

export const resetPassword = async (resetToken: string, newPassword: string): Promise<ApiPasswordResponse> => {
    try {
        const response = await axios.post<ApiPasswordResponse>(`${BASE_URL}/resetpassword`, { resetToken, newPassword });
        return response.data;
    } catch (error: any) {
        return handleAxiosForgotPasswordError(error);
    }
}

const handleAxiosError = (error: AxiosError<ApiResponseError>): ApiResponseError => {
    if (error.response) {
        // Server responded with an error
        return { success: false, error: JSON.stringify(error.response.data.error) };
    } else if (error.request) {
        // No response received from the server
        console.error('No response received from the server:', error.message);
        return { success: false, error: 'Network error' };
    } else {
        // Error setting up the request
        console.error('Error setting up the request:', error.message);
        return { success: false, error: 'Request error' };
    }
}

const handleAxiosForgotPasswordError = (error: AxiosError<ApiResponsePasswordError>): ApiResponsePasswordError => {
    if (error.response) {
        // Server responded with an error
        return { success: false, error: JSON.stringify(error.response.data.error) };
    } else if (error.request) {
        // No response received from the server
        console.error('No response received from the server:', error.message);
        return { success: false, error: 'Network error' };
    } else {
        // Error setting up the request
        console.error('Error setting up the request:', error.message);
        return { success: false, error: 'Request error' };
    }
}

