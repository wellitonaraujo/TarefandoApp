import React, {createContext, useContext, useState} from 'react';

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
  updateTasks: (updatedTasks: Task[]) => void; // Método para atualizar as tarefas
}

const TaskContext = createContext<TaskContextType>({
  tasks: [],
  addTask: () => {},
  deleteTask: () => {},
  updateTasks: () => {}, // Inicializa como uma função vazia
});

export const TaskProvider: React.FC = ({children}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const updateTasks = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
  };

  return (
    <TaskContext.Provider value={{tasks, addTask, deleteTask, updateTasks}}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);
