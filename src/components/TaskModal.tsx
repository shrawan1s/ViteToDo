import React, { useEffect, useState, useMemo } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useAppDispatch } from '../app/hooks/hook';
import { Task } from '../utility/Task';
import { Tasks } from '../schema/Task';
import { addTask, updateTask } from '../app/slices/taskSlice';
import { isToken } from '../utility/AuthUtility';

type TaskModalProps = {
    closeModal: () => void;
    task: Task | null;
};

const TaskModal: React.FC<TaskModalProps> = ({ closeModal, task }) => {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const storedToken = isToken();
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const initialValues = useMemo(() => ({
        title: task ? task.task : '',
    }), [task]);

    const onSubmit = async (values: { title: string }) => {
        setLoading(true);
        try {
            if (token) {
                if (task) {
                    await dispatch(updateTask({
                        id: task._id.toString(),
                        taskData: { task: values.title },
                        token: token,
                    }));
                } else {
                    await dispatch(addTask({
                        task: values.title,
                        token: token,
                    }));
                }
                closeModal();
            } else {
                console.error('No token available');
            }
        } catch (error) {
            console.error('Error submitting task:', error);
            // Optionally show an error message to the user
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40"></div>
            <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full mx-auto p-6 z-50 relative">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                    {task ? "Update Task" : "Add Task"}
                </h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={Tasks}
                    onSubmit={onSubmit}
                >
                    <Form className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                Title
                            </label>
                            <Field
                                type="text"
                                id="title"
                                name="title"
                                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter title"
                            />
                            <ErrorMessage name="title" component="p" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                disabled={loading} // Disable button while loading
                            >
                                {loading ? "Saving..." : task ? "Update" : "Add"}
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default TaskModal;
