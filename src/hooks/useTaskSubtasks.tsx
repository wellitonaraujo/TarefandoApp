import { useTaskManager } from "@/src/context/TaskContext";
import { useCallback } from 'react';

export const useTaskSubtasks = () => {
  const { tasks, saveTasks, handleDeleteSubtask, handleCompleteSubtask } = useTaskManager();

  const addSubtask = useCallback(async (taskId: string, subtaskName: string) => {
    if (!subtaskName.trim()) return;
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex < 0) return;

    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = {
      ...updatedTasks[taskIndex],
      subtasks: [
        ...(updatedTasks[taskIndex].subtasks || []),
        {
          id: Date.now().toString(),
          name: subtaskName.trim(),
          completed: false
        }
      ],
    };
    
    await saveTasks(updatedTasks);
  }, [tasks, saveTasks]);

  const completeAllSubtasks = useCallback(async (taskId: string) => {
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex < 0) return;

    const updatedTasks = [...tasks];
    const updatedSubtasks = updatedTasks[taskIndex].subtasks?.map(subtask => ({
      ...subtask,
      completed: true
    }));
    
    const allSubtasksCompleted = updatedSubtasks?.every(subtask => subtask.completed);
    if (allSubtasksCompleted) {
      updatedTasks[taskIndex] = {
        ...updatedTasks[taskIndex],
        completed: true,
        subtasks: updatedSubtasks,
      };
    } else {
      updatedTasks[taskIndex] = {
        ...updatedTasks[taskIndex],
        subtasks: updatedSubtasks,
      };
    }
    
    await saveTasks(updatedTasks);
  }, [tasks, saveTasks]);

  return { addSubtask, completeAllSubtasks, handleDeleteSubtask, handleCompleteSubtask };
};