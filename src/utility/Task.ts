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
    user: string;
    date: Date;
};

export type TaskResponse = {
    message: string;
    note: Task;
};

export type DeleteTaskResponse = {
    message: string;
    note?: Task | null;
};

export type DeleteAllTasksResponse = {
    message: string;
    deletedNotes: {
        acknowledged: boolean;
        deletedCount: number;
    };
};

export type ErrorResponse = {
    success: boolean;
    error: string;
}
