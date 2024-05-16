import axios, { AxiosError } from 'axios';

const BASE_URL = 'http://localhost:3000/api/auth';

type UserDataSignup = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

type UserDataSignin = {
    email: string;
    password: string;
};

type ForgotPassword = {
    email: string;
};

type ApiResponseSuccess = {
    success: true;
    authToken: string;
}

type ApiResponseError = {
    success: false;
    error: string;
}

type ApiResponse = ApiResponseSuccess | ApiResponseError;

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

export const forgotPassword = async (userData: ForgotPassword): Promise<ApiResponse> => {
    try {
        const response = await axios.post<ApiResponse>(`${BASE_URL}/forgotpassword`, userData);
        return response.data;
    } catch (error: any) {
        return handleAxiosError(error);
    }
}

const handleAxiosError = (error: AxiosError<ApiResponse>): ApiResponse => {
    if (error.response) {
        // Server responded with an error
        return { success: false, error: JSON.stringify(error.response.data) };
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
