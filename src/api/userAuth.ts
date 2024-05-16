import axios, { AxiosError } from 'axios';
import { ApiForgotPasswordResponse, ApiResponse, ApiResponseError, ApiResponseForgotPasswordError, ForgotPassword, UserDataSignin, UserDataSignup } from '../utility/userAuth';

const BASE_URL = 'http://localhost:3000/api/auth';


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

export const forgotPassword = async (userData: ForgotPassword): Promise<ApiForgotPasswordResponse> => {
    try {
        const response = await axios.post<ApiForgotPasswordResponse>(`${BASE_URL}/forgotpassword`, userData);
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

const handleAxiosForgotPasswordError = (error: AxiosError<ApiResponseForgotPasswordError>): ApiResponseForgotPasswordError => {
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
