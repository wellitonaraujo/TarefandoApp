import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TASKS_KEY = '@tasks_key';

export type Subtask = {
  id: string;
  name: string;
  completed: boolean;
};

export type Task = {
  id: string;
  name: string;
  completed: boolean;
  date: string;
  subtasks?: Subtask[];
};

type TaskContextType = {
  tasks: Task[];
  loadingTasks: boolean;
  saveTasks: (updatedTasks: Task[]) => Promise<void>;
  handleSaveTask: (taskName: string, taskDate: string, subtasks?: Subtask[]) => void;
  handleEditTask: (id: string) => void;
  handleCompleteTask: (id: string) => void;
  handleDeleteTask: (id: string) => void;
  handleDeleteSubtask: (taskId: string, subtaskId: string) => void;
  handleCompleteSubtask: (taskId: string, subtaskId: string) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loadingTasks, setLoadingTasks] = useState<boolean>(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem(TASKS_KEY);
        if (savedTasks) {
          setTasks(JSON.parse(savedTasks));
        }
      } catch (error) {
        console.error("Erro ao carregar as tarefas", error);
      } finally {
        setLoadingTasks(false);
      }
    };
    loadTasks();
  }, []);

  const saveTasks = async (updatedTasks: Task[]) => {
    try {
      await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Erro ao salvar as tarefas", error);
    }
  };

  const handleSaveTask = (taskName: string, taskDate: string, subtasks: Subtask[] = []) => {
    const newTask: Task = {
      id: Date.now().toString(),
      name: taskName,
      completed: false,
      date: taskDate,
      subtasks,
    };
    saveTasks([...tasks, newTask]);
  };

  const handleEditTask = (id: string, newName: string) => {
    const taskToEdit = tasks.find(task => task.id === id);
    if (taskToEdit) {
      const updatedTasks = tasks.map(task =>
        task.id === id ? { ...task, name: newName } : task
      );
      saveTasks(updatedTasks);
    }
  };
  
  

  const handleCompleteTask = (id: string) => {
    saveTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const handleDeleteTask = (id: string) => {
    saveTasks(tasks.filter(task => task.id !== id));
  };

  const handleDeleteSubtask = (taskId: string, subtaskId: string) => {
    saveTasks(tasks.map(task => task.id === taskId ? { ...task, subtasks: task.subtasks?.filter(subtask => subtask.id !== subtaskId) } : task));
  };

  const handleCompleteSubtask = (taskId: string, subtaskId: string) => {
    saveTasks(tasks.map(task => task.id === taskId ? { ...task, subtasks: task.subtasks?.map(subtask => subtask.id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask) } : task));
  };

  return (
    <TaskContext.Provider value={{ tasks, loadingTasks, saveTasks, handleSaveTask, handleEditTask, handleCompleteTask, handleDeleteTask, handleDeleteSubtask, handleCompleteSubtask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext deve ser usado dentro de um TaskProvider');
  }
  return context;
};
