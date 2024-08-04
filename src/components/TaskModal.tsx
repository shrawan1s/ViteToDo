import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Task } from '../utility/Types';
import { Tasks } from '../schema/Task';

type TaskModalProps = {
    task: Task | null;
    closeModal: () => void;
    handleAddTask: (task: Task) => void;
    handleUpdateTask: (updatedTask: Task) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, closeModal, handleAddTask, handleUpdateTask }) => {
    const [title, setTitle] = useState('');

    useEffect(() => {
        if (task) {
            setTitle(task.title);
        }
    }, [task]);

    const initialValues = {
        title: task ? task.title : ''
    };

    const onSubmit = (values: any) => {
        if (task) {
            console.log("Submiting task");
            handleUpdateTask({ ...task, ...values });
        } else {
            handleAddTask(values);
        }
        closeModal();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40"></div>
            <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full mx-auto p-6 z-50 relative">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">{task ? "Update Task" : "Add Task"}</h2>
                <Formik initialValues={initialValues} validationSchema={Tasks} onSubmit={onSubmit}>
                    <Form className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
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
                            >
                                {task ? "Update" : "Add"}
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default TaskModal;
