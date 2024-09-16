import React, { useState, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks/hook';
import TaskModal from './TaskModal';
import TaskList from './TaskList';
import TaskViewModal from './TaskViewModal';
import { Task } from '../utility/Task';
import { deleteAllTasks, fetchAllTasks } from '../app/slices/taskSlice';
import { isToken } from '../utility/AuthUtility';
import { RootState } from '../app/store';
import Modal from './Modal';

const Home: React.FC = () => {
  const [isTaskViewModalOpen, setIsTaskViewModalOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { tasks } = useAppSelector((state: RootState) => state.tasks);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    setShowModal(true);
  };

  const handleConfirm = async () => {
    setShowModal(false);
    if (token) {
      await dispatch(deleteAllTasks(token));
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  // Function to get token and fetch tasks
  const fetchTasks = useCallback(async () => {
    const storedToken = isToken();
    setToken(storedToken);

    if (storedToken) {
      await dispatch(fetchAllTasks(storedToken));
    }
  }, [dispatch]);

  // useEffect to trigger the fetch on component mount
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Open and close modals
  const openModal = (task: Task | null = null) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTask(null);
  };

  const openTaskViewModal = (task: Task) => {
    setCurrentTask(task);
    setIsTaskViewModalOpen(true);
  };

  const closeTaskViewModal = () => {
    setIsTaskViewModalOpen(false);
    setCurrentTask(null);
  };

  return (
    <>
      <div className="p-6 flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between mb-6">
            <button
              onClick={() => openModal()}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Task
            </button>
            <button
              onClick={handleClick}
              className={`text-white px-4 py-2 rounded ${tasks.length <= 0 ? 'cursor-not-allowed bg-gray-300' : 'bg-red-500 hover:bg-red-600'}`}
              disabled={tasks.length <= 0 ? true : false}
            >
              Remove All
            </button>
          </div>

          <div className="overflow-y-auto max-h-96 no-scrollbar">
            <TaskList
              token={token as string}
              openModal={openModal}
              openViewModal={openTaskViewModal}
            />
          </div>
        </div>

        {isModalOpen && (
          <TaskModal
            task={currentTask}
            closeModal={closeModal}
          />
        )}

        {isTaskViewModalOpen && (
          <TaskViewModal
            task={currentTask}
            closeModal={closeTaskViewModal}
          />
        )}
      </div>

      {
        showModal && (
          <Modal
            title="Confirm Delete Task"
            content="Are you sure you want delete all tasks?"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )
      }
    </>
  );
};

export default Home;
