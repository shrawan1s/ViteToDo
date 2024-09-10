// Input types of data.
export type AddTaskInput = {
    task: string;
};

export type UpdateTaskInput = {
    task?: string;
};

// Output types of data and error.
export type Task = {
    _id: string;
    task: string;
    date: string;
    user: string;
    __v: number;
}

export type TaskResponse = {
    success: boolean;
    message: string;
    savedTask: Task;
};

export type UpdateResponse = {
    success: boolean;
    message: string;
    updatedTask: Task;
};

export type FetchAllResponse = {
    success: boolean;
    tasks: Task[];
};

export type FetchResponse = {
    success: boolean;
    task: Task;
};

export type DeleteTaskResponse = {
    success: boolean;
    message: string;
};

export type DeleteAllTasksResponse = {
    success: boolean;
    message: string;
    deletedCount: number;
};

export type ErrorResponse = {
    success: boolean;
    error: string;
}

// Define the initial state and types for tasks
export type TaskState = {
    tasks: Task[];
    currentTask: Task | null;
    loading: boolean;
    error: string | null;
    message: string | null;  // Add this line
}
