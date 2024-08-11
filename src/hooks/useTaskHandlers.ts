import { TaskType } from '../models/TaskType';
import { useCallback } from 'react';

export const useTaskHandlers = (tasksWithSelection: TaskType[], updateTasks: (tasks: TaskType[]) => void) => {
  const handleSelect = useCallback(async (index: number) => {
    const updatedTasks = [...tasksWithSelection];
    updatedTasks[index] = {
      ...updatedTasks[index],
      isSelected: !updatedTasks[index].isSelected,
    };
    updateTasks(updatedTasks);
  }, [tasksWithSelection, updateTasks]);

  const handleDeleteTask = useCallback(async () => {
    const updatedTasks = tasksWithSelection.filter(task => !task.isSelected);
    updateTasks(updatedTasks);
  }, [tasksWithSelection, updateTasks]);

  const handleDeleteSpecificTask = useCallback(async (taskToDelete: TaskType) => {
    const updatedTasks = tasksWithSelection.filter(task => task !== taskToDelete);
    updateTasks(updatedTasks);
  }, [tasksWithSelection, updateTasks]);

  return { handleSelect, handleDeleteTask, handleDeleteSpecificTask };
};
