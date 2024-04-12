// TaskContext.tsx

import React, {createContext, useContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface TaskType {
  title: string;
  description: string;
  priority: 'low' | 'average' | 'high';
  date: Date;
  isSelected: boolean;
}

interface TaskContextType {
  tasks: TaskType[];
  addTask: (task: TaskType) => void;
}

const TaskContext = createContext<TaskContextType>({
  tasks: [],
  addTask: () => {},
});

export const TaskProvider: React.FC = ({children}) => {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const addTask = async (task: TaskType) => {
    try {
      const updatedTasks = [...tasks, task];
      setTasks(updatedTasks);
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <TaskContext.Provider value={{tasks, addTask}}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);
