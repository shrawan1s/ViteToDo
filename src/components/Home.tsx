import React, { useState } from 'react';
import TaskModal from './TaskModal';
import TaskList from './TaskList';
import { Task } from '../utility/Types';
import TaskViewModal from './TaskViewModal';

const Home: React.FC = () => {
  const [isTaskViewModalOpen, setIsTaskViewModalOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Task 1" },
    { id: 2, title: "Task 2" },
    { id: 3, title: "Task 3" },
    { id: 4, title: "Task 4" },
    { id: 5, title: "Task 5" },
  ]);

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

  const handleAddTask = (task: Task) => {
    setTasks([...tasks, task]);
    closeModal();
  };

  const handleUpdateTask = (updatedTask: Task) => {
    const updatedTasks = tasks.map(task =>
      task.id === updatedTask.id ? { ...task, title: updatedTask.title } : task
    );
    setTasks(updatedTasks);
    closeModal();
  };

  const handleDeleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleRemoveAll = () => {
    setTasks([]);
    console.log("All tasks removed");
  };

  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-screen mt-20 bg-gray-100">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between mb-6">
          <button
            onClick={() => openModal()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Task
          </button>
          <button
            onClick={handleRemoveAll}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Remove All
          </button>
        </div>

        <div className="overflow-y-auto max-h-96 no-scrollbar">
          <TaskList tasks={tasks} openModal={openModal} handleDelete={handleDeleteTask} openViewModal={openTaskViewModal} />
        </div>
      </div>

      {isModalOpen && (
        <TaskModal
          task={currentTask}
          closeModal={closeModal}
          handleAddTask={handleAddTask}
          handleUpdateTask={handleUpdateTask}
        />
      )}

      {isTaskViewModalOpen && (
        <TaskViewModal
          task={currentTask}
          closeModal={closeTaskViewModal}
        />
      )}
    </div>
  );
};

export default Home;
