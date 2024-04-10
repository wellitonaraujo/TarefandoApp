// TaskContext.tsx
import React, {createContext, useState, useContext} from 'react';

interface TaskProps {
  title: string;
  description: string;
  priority: 'low' | 'average' | 'high';
  date: Date;
}

interface TaskContextData {
  tasks: TaskProps[];
  addTask: (task: TaskProps) => void;
}

const TaskContext = createContext<TaskContextData>({} as TaskContextData);

export const TaskProvider: React.FC = ({children}) => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  const addTask = (task: TaskProps) => {
    setTasks([...tasks, task]);
  };

  return (
    <TaskContext.Provider value={{tasks, addTask}}>
      {children}
    </TaskContext.Provider>
  );
};

export function useTask(): TaskContextData {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }

  return context;
}
