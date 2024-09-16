import axios, { AxiosError } from 'axios';
import { Task, TaskResponse, DeleteTaskResponse, DeleteAllTasksResponse, ErrorResponse, FetchResponse, UpdateResponse } from '../utility/Task';

// Define the base URL for tasks API
const BASE_TASK_URL = import.meta.env.VITE_BASE_TASK_URL;

// Create an instance of Axios with a base URL configured
const axiosInstance = axios.create({
    baseURL: BASE_TASK_URL,
});

// Fetch all tasks
export const fetchAllTasks = async (token: string): Promise<Task[]> => {
    try {
        const response = await axiosInstance.get<{ tasks: Task[] }>('/fetchalltasks', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data.tasks;
    } catch (error: any) {
        throw handleAxiosError(error);
    }
};

// Add a new task
export const addTask = async (taskData: { task: string }, token: string): Promise<TaskResponse> => {
    try {
        const response = await axiosInstance.post<TaskResponse>('/addtask', taskData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error: any) {
        throw handleAxiosError(error);
    }
};

// Update an existing task
export const updateTask = async (id: string, taskData: { task?: string }, token: string): Promise<UpdateResponse> => {
    try {
        const response = await axiosInstance.put<UpdateResponse>(`/updatetask/${id}`, taskData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error: any) {
        throw handleAxiosError(error);
    }
};

// Delete a single task
export const deleteTask = async (id: string, token: string): Promise<DeleteTaskResponse> => {
    try {
        const response = await axiosInstance.delete<DeleteTaskResponse>(`/deletetask/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error: any) {
        throw handleAxiosError(error);
    }
};

// Delete all tasks
export const deleteAllTasks = async (token: string): Promise<DeleteAllTasksResponse> => {
    try {
        const response = await axiosInstance.delete<DeleteAllTasksResponse>('/deletealltasks', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error: any) {
        throw handleAxiosError(error);
    }
};

// Handle Axios errors
const handleAxiosError = (error: AxiosError): ErrorResponse => {
    if (error.response) {
        // Extract error message from response if available
        const errorMessage = (error.response.data as { error?: string }).error || 'Server error';
        console.error('Error response from server:', errorMessage);
        return { success: false, error: errorMessage };
    } else if (error.request) {
        // No response received from the server
        console.error('No response received from the server:', error.message);
        return { success: false, error: 'Network error' };
    } else {
        // Error setting up the request
        console.error('Error setting up the request:', error.message);
        return { success: false, error: 'Request error' };
    }
};
