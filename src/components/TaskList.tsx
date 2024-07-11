import React from 'react';
import { Task } from '../utility/Types';

type TaskListProps = {
    tasks: Task[];
    openModal: (task: Task) => void;
    handleDelete: (taskId: number) => void;
    openViewModal: (task: Task) => void;
}


const TaskList: React.FC<TaskListProps> = ({ tasks, openModal, handleDelete, openViewModal }) => {
    return (
        <div className="w-full">
            {tasks.length === 0 ? (
                <p>No tasks available.</p>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {tasks.map((task) => (
                        <li key={task.id} className="py-4 flex justify-between items-center">
                            <div className="flex-1 min-w-0" onClick={() => openViewModal(task)}>
                                <div className="text-sm font-medium text-gray-900 truncate">{task.title}</div>
                            </div>
                            <div className="ml-4 flex-shrink-0 space-x-2">
                                <button
                                    onClick={() => openModal(task)}
                                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(task.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskList;
