import { useTaskManager } from "@/src/context/TaskContext";
import { useCallback } from "react";

export const useTaskDetails = () => {
  const { tasks, saveTasks } = useTaskManager();

  const getTaskDate = useCallback((taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    return task?.date || '';
  }, [tasks]);
  
  const updateTaskDate = (taskId: string, newDate: string) => {
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex >= 0) {
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex] = {
        ...updatedTasks[taskIndex],
        date: newDate
      };
      saveTasks(updatedTasks);
    }
  };
  

  return { getTaskDate, updateTaskDate };
};