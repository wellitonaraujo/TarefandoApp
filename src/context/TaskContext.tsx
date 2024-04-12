import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Task {
  title: string;
  description: string;
  priority: 'low' | 'average' | 'high';
  date: Date;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (index: number) => void;
  updateTasks: (updatedTasks: Task[]) => void;
}

const TaskContext = createContext<TaskContextType>({
  tasks: [],
  addTask: () => {},
  deleteTask: () => {},
  updateTasks: () => {},
});

export const TaskProvider: React.FC = ({children}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  // Ao recuperar tarefas do AsyncStorage
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
          const parsedTasks: Task[] = JSON.parse(storedTasks).map(
            (task: any) => ({
              ...task,
              date: new Date(task.date),
            }),
          );
          setTasks(parsedTasks);
        }
      } catch (error) {
        console.error('Error fetching tasks from AsyncStorage:', error);
      }
    };

    fetchTasks();
  }, []);
  const deleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const updateTasks = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <TaskContext.Provider value={{tasks, addTask, deleteTask, updateTasks}}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);
