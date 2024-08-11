import { useTask } from '../context/TaskContext';
import { TaskType } from '../models/TaskType';
import { useState, useEffect } from 'react';

export const useTasks = () => {
  const { tasks, updateTasks } = useTask();
  const [tasksWithSelection, setTasksWithSelection] = useState<TaskType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    setTasksWithSelection(tasks);
  }, [tasks]);

  const filteredTasks = tasksWithSelection.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Ordenar as tarefas com base na data
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateA - dateB;
  });

  return {
    tasksWithSelection,
    updateTasks,
    searchTerm,
    setSearchTerm,
    sortedTasks
  };
};
