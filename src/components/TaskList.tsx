import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks/hook';
import { deleteTask } from '../app/slices/taskSlice';
import { Task } from '../utility/Task';
import { RootState } from '../app/store';
import Modal from './Modal';

type TaskListProps = {
    token: string;
    openModal: (task: Task) => void;
    openViewModal: (task: Task) => void;
};

const TaskList: React.FC<TaskListProps> = ({ openModal, token, openViewModal }) => {
    const dispatch = useAppDispatch();
    const { tasks } = useAppSelector((state: RootState) => state.tasks);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

    const handleClick = (taskId: string) => {
        setSelectedTaskId(taskId);
        setShowModal(true);
    };

    const handleConfirm = async () => {
        if (selectedTaskId && token) {
            await dispatch(deleteTask({ id: selectedTaskId, token }));
        }
        setShowModal(false);
    };

    const handleCancel = () => {
        setSelectedTaskId(null);
        setShowModal(false);
    };

    return (
        <>
            <div className="grid grid-cols-1 gap-4">
                {tasks.length === 0 ? (
                    <p>No tasks available.</p>
                ) : (
                    tasks.map((task) => (
                        <div
                            key={task._id}
                            className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold">{task.task}</h3>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => openModal(task)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleClick(task._id)}
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
            {
                showModal && (
                    <Modal
                        title="Confirm Delete Task"
                        content="Are you sure you want delete this task?"
                        onConfirm={handleConfirm}
                        onCancel={handleCancel}
                    />
                )
            }
        </>
    );
};

export default TaskList;
