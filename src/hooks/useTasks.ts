import { useState } from 'react';
import { Task } from '../types/Task';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (title: string, category: Task['category']) => {
    const newTask: Task = {
      id: tasks.length + 1,
      title,
      isCompleted: false,
      category,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  return { tasks, addTask, toggleTaskCompletion };
};
