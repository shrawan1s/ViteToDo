import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Task, TaskResponse, UpdateResponse, FetchResponse, DeleteTaskResponse, DeleteAllTasksResponse, ErrorResponse, TaskState } from '../../utility/Task';
import { fetchAllTasks as fetchAllTasksApi, fetchTask as fetchTaskApi, addTask as addTaskApi, updateTask as updateTaskApi, deleteTask as deleteTaskApi, deleteAllTasks as deleteAllTasksApi } from '../../api/task';

// Async thunks for API requests
export const fetchAllTasks = createAsyncThunk<Task[], string, { rejectValue: ErrorResponse }>(
    'tasks/fetchAllTasks',
    async (token, { rejectWithValue }) => {
        try {
            return await fetchAllTasksApi(token);
        } catch (error) {
            return rejectWithValue(error as ErrorResponse);
        }
    }
);

export const fetchTask = createAsyncThunk<FetchResponse, { id: string, token: string }, { rejectValue: ErrorResponse }>(
    'tasks/fetchTask',
    async ({ id, token }, { rejectWithValue }) => {
        try {
            const response = await fetchTaskApi(id, token);

            // Ensure the response is in the format of FetchResponse
            return {
                success: response.success,
                task: response.task // Ensure this matches FetchResponse.task
            };
        } catch (error) {
            return rejectWithValue(error as ErrorResponse);
        }
    }
);

export const addTask = createAsyncThunk<TaskResponse, { task: string, token: string }, { rejectValue: ErrorResponse }>(
    'tasks/addTask',
    async ({ task, token }, { rejectWithValue }) => {
        try {
            const response = await addTaskApi({ task }, token); // Call the API
            return {
                success: response.success,
                message: response.message,
                savedTask: response.savedTask,
            };
        } catch (error) {
            return rejectWithValue(error as ErrorResponse);
        }
    }
);

export const updateTask = createAsyncThunk<UpdateResponse, { id: string, taskData: { task?: string }, token: string }, { rejectValue: ErrorResponse }>(
    'tasks/updateTask',
    async ({ id, taskData, token }, { rejectWithValue }) => {
        try {
            const response = await updateTaskApi(id, taskData, token);
            return {
                success: response.success,
                message: response.message,
                updatedTask: response.updatedTask,
            }
        } catch (error) {
            return rejectWithValue(error as ErrorResponse);
        }
    }
);

export const deleteTask = createAsyncThunk<DeleteTaskResponse & { id: string }, { id: string, token: string }, { rejectValue: ErrorResponse }>(
    'tasks/deleteTask',
    async ({ id, token }, { rejectWithValue }) => {
        try {
            const response = await deleteTaskApi(id, token);
            return {
                success: response.success,
                message: response.message,
                id
            };
        } catch (error) {
            return rejectWithValue(error as ErrorResponse);
        }
    }
);

export const deleteAllTasks = createAsyncThunk<DeleteAllTasksResponse, string, { rejectValue: ErrorResponse }>(
    'tasks/deleteAllTasks',
    async (token, { rejectWithValue }) => {
        try {
            return await deleteAllTasksApi(token);
        } catch (error) {
            return rejectWithValue(error as ErrorResponse);
        }
    }
);

// Create slice
const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        currentTask: null,
        loading: false,
        error: null,
        message: null
    } as TaskState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(fetchAllTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchAllTasks.rejected, (state, action: PayloadAction<ErrorResponse | undefined>) => {
                state.loading = false;
                state.error = action.payload?.error || 'Failed to fetch tasks';
                state.message = null;
            })

            .addCase(fetchTask.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(fetchTask.fulfilled, (state, action: PayloadAction<FetchResponse>) => {
                state.loading = false;
                state.currentTask = action.payload.task
            })
            .addCase(fetchTask.rejected, (state, action: PayloadAction<ErrorResponse | undefined>) => {
                state.loading = false;
                state.error = action.payload?.error || 'Failed to fetch task';
                state.message = null;
            })

            .addCase(addTask.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(addTask.fulfilled, (state, action: PayloadAction<TaskResponse>) => {
                state.loading = false;
                if (action.payload.savedTask) {
                    state.tasks.push(action.payload.savedTask);
                }
                state.message = action.payload.message;
            })
            .addCase(addTask.rejected, (state, action: PayloadAction<ErrorResponse | undefined>) => {
                state.loading = false;
                state.error = action.payload?.error || 'Failed to add task';
                state.message = null;
            })

            .addCase(updateTask.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(updateTask.fulfilled, (state, action: PayloadAction<UpdateResponse>) => {
                state.loading = false;

                console.log('Action Payload:', action.payload.updatedTask);

                const updatedTask = action.payload.updatedTask;

                if (updatedTask) {
                    console.log('Updated Task:', updatedTask);
                    state.tasks = state.tasks.map(task =>
                        task._id === updatedTask._id ? updatedTask : task
                    );
                }

                state.message = action.payload.message || null;
            })
            .addCase(updateTask.rejected, (state, action: PayloadAction<ErrorResponse | undefined>) => {
                state.loading = false;
                state.error = action.payload?.error || 'Failed to update task';
                state.message = null;
            })

            .addCase(deleteTask.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(deleteTask.fulfilled, (state, action: PayloadAction<DeleteTaskResponse & { id: string }>) => {
                state.loading = false;
                if (action.payload) {
                    state.tasks = state.tasks.filter(task => task._id !== action.payload.id);
                }
                state.message = action.payload.message || null;
            })
            .addCase(deleteTask.rejected, (state, action: PayloadAction<ErrorResponse | undefined>) => {
                state.loading = false;
                state.error = action.payload?.error || 'Failed to delete task';
                state.message = null;
            })

            .addCase(deleteAllTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(deleteAllTasks.fulfilled, (state, action: PayloadAction<DeleteAllTasksResponse>) => {
                state.loading = false;
                state.tasks = [];
                state.message = action.payload.message || null; // Update message
            })
            .addCase(deleteAllTasks.rejected, (state, action: PayloadAction<ErrorResponse | undefined>) => {
                state.loading = false;
                state.error = action.payload?.error || 'Failed to delete all tasks';
                state.message = null;
            });
    }
});

export default taskSlice.reducer;
