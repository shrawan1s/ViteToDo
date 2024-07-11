import React from 'react';
import { Task } from '../utility/Types';

type TaskModalProps = {
    task: Task | null;
    closeModal: () => void;
}

const TaskViewModal: React.FC<TaskModalProps> = ({ task, closeModal }) => {
    if (!task) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40"></div>
            <div className="bg-white p-6 max-w-md rounded-lg shadow-lg z-50">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">{task.title}</h2>
                <div className="flex justify-end">
                    <button
                        onClick={closeModal}
                        className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskViewModal;
