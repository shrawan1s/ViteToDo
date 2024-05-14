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

type ApiResponseSuccess = {
    success: true;
    authToken: string;
}

type ApiResponseError = {
    success: true;
    authToken: string;
}

type ApiResponse = ApiResponseSuccess | ApiResponseError

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

const handleAxiosError = (error: AxiosError): never => {
    if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Server responded with an error:', error.response.data);
        console.error('Status code:', error.response.status);
        throw new Error('Server error');
    } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from the server:', error.request);
        throw new Error('Network error');
    } else {
        // Something happened in setting up the request that triggered an error
        console.error('Error setting up the request:', error.message);
        throw new Error('Request error');
    }
}
