import React from 'react';
import { Task } from '../utility/Types';

type TaskListProps = {
    tasks: Task[];
    openModal: (task: Task) => void;
    handleDelete: (taskId: number) => void;
    openViewModal: (task: Task) => void;
};

const TaskList: React.FC<TaskListProps> = ({ tasks, openModal, handleDelete, openViewModal }) => {
    return (
        <div className="grid grid-cols-1 gap-4">
            {tasks.length === 0 ? (
                <p>No tasks available.</p>
            ) : (
                tasks.map((task) => (
                    <div
                        key={task.id}
                        className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold">{task.title}</h3>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => openModal(task)}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(task.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => openViewModal(task)}
                                    className="text-green-500 hover:text-green-700"
                                >
                                    View
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default TaskList;
