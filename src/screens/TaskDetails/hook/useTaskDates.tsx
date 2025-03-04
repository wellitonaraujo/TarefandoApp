import { useTaskManager } from "@/src/context/TaskContext";

export const useTaskDates = () => {
  const { tasks, saveTasks } = useTaskManager();

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };  
    
  
  const getTaskDate = (taskId: string): string => {
    const task = tasks.find(t => t.id === taskId);
    return task?.date || formatDate(new Date());
  };

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