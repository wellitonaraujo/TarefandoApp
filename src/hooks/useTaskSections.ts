import { TaskType } from '../models/TaskType';
import { useMemo } from 'react';

export const useTaskSections = (sortedTasks: TaskType[]) => {
  const todayTasks = useMemo(() => {
    const currentDate = new Date();
    return sortedTasks.filter(task => {
      const taskDate = new Date(task.date);
      return (
        taskDate.getDate() === currentDate.getDate() &&
        taskDate.getMonth() === currentDate.getMonth() &&
        taskDate.getFullYear() === currentDate.getFullYear() &&
        !task.isSelected
      );
    });
  }, [sortedTasks]);

  const upcomingTasks = useMemo(() => {
    const currentDate = new Date();
    return sortedTasks.filter(task => {
      const taskDate = new Date(task.date);
      return (
        taskDate > currentDate &&
        (taskDate.getDate() !== currentDate.getDate() ||
          taskDate.getMonth() !== currentDate.getMonth() ||
          taskDate.getFullYear() !== currentDate.getFullYear()) &&
        !task.isSelected
      );
    });
  }, [sortedTasks]);

  const pastTasks = useMemo(() => {
    const currentDate = new Date();
    return sortedTasks.filter(task => {
      const taskDate = new Date(task.date);
      return (
        taskDate < currentDate &&
        (taskDate.getDate() !== currentDate.getDate() ||
          taskDate.getMonth() !== currentDate.getMonth() ||
          taskDate.getFullYear() !== currentDate.getFullYear()) &&
        !task.isSelected
      );
    });
  }, [sortedTasks]);

  const completedTasks = useMemo(() => {
    return sortedTasks.filter(task => task.isSelected);
  }, [sortedTasks]);

  return { todayTasks, upcomingTasks, pastTasks, completedTasks };
};
