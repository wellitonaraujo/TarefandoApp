import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

export const TASKS_KEY = "@tasks_key";

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

type TaskContextData = {
  tasks: Task[];
  loadingTasks: boolean;
  modalVisible: boolean;
  editingTask: Task | null;
  selectedTab: number;
  setSelectedTab: (tab: number) => void;
  handleSaveTask: (taskName: string, taskDate: string, subtasks?: Subtask[]) => void;
  handleEditTask: (id: string) => void;
  handleCompleteTask: (id: string) => void;
  handleDeleteTask: (id: string) => void;
  handleDeleteSubtask: (taskId: string, subtaskId: string) => void;
  handleCompleteSubtask: (taskId: string, subtaskId: string) => void;
  openModal: () => void;
  closeModal: () => void;
  filteredTasks: () => Task[];
  updateKey: number;
  setUpdateKey: React.Dispatch<React.SetStateAction<number>>;
  saveTasks: (updatedTasks: Task[]) => void;
};

const TaskContext = createContext<TaskContextData | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [updateKey, setUpdateKey] = useState<number>(0);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem(TASKS_KEY);
        if (savedTasks) {
          const parsedTasks = JSON.parse(savedTasks);
          console.log("Tarefas carregadas:", parsedTasks);
          setTasks(parsedTasks);
        }
      } catch (error) {
        console.error("Erro ao carregar as tarefas", error);
      } finally {
        setLoadingTasks(false);
      }
    };
    loadTasks();
  }, [updateKey]);
  

  const saveTasks = async (updatedTasks: Task[]) => {
    try {
        console.log("Tarefas a serem salvas:", JSON.stringify(updatedTasks, null, 2));
        await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
    } catch (error) {
        console.error("Erro ao salvar as tarefas", error);
    }
};

  const handleSaveTask = (taskName: string, taskDate: string, subtasks: Subtask[] = []) => {
    let updatedTasks: Task[];
  
    if (editingTask) {
      updatedTasks = tasks.map(task =>
        task.id === editingTask.id
          ? { ...task, name: taskName, date: taskDate, subtasks }
          : task
      );
    } else {
      updatedTasks = [...tasks, { id: Date.now().toString(), name: taskName, completed: false, date: taskDate, subtasks }];
    }
  
    saveTasks(updatedTasks);
    setEditingTask(null);
    setUpdateKey(prevKey => prevKey + 1); // Incrementando o updateKey
    console.log('updateKey:', updateKey); // Verifique o valor de updateKey
  };
  

  const handleEditTask = (id: string) => {
    const taskToEdit = tasks.find(task => task.id === id);
    if (taskToEdit) {
      setEditingTask(taskToEdit);
      setModalVisible(true);
    }
  };

  const handleCompleteTask = (id: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks(updatedTasks);
  };

  const handleDeleteTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    saveTasks(updatedTasks);
  };

  const handleDeleteSubtask = (taskId: string, subtaskId: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, subtasks: task.subtasks?.filter(sub => sub.id !== subtaskId) || [] } : task
    );
    saveTasks(updatedTasks);
  };

  const handleCompleteSubtask = (taskId: string, subtaskId: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId
        ? {
            ...task,
            subtasks: task.subtasks?.map(sub => (sub.id === subtaskId ? { ...sub, completed: !sub.completed } : sub)),
          }
        : task
    );
    saveTasks(updatedTasks);
  };

  const openModal = () => {
    setModalVisible(true);
    setEditingTask(null);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditingTask(null);
  };

  const convertToComparableDate = (date: string): string => {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`; 
};

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

  const filteredTasks = () => {
    const currentDate = formatDate(new Date());
    const currentDateComparable = convertToComparableDate(currentDate);

    switch (selectedTab) {
        case 0:
            return tasks.filter(task => convertToComparableDate(task.date) === currentDateComparable && !task.completed);
        case 1:
            return tasks
                .filter(task => convertToComparableDate(task.date) > currentDateComparable && !task.completed)
                .sort((a, b) => {
                    return convertToComparableDate(a.date) < convertToComparableDate(b.date) ? -1 : 1;
                });
        case 2:
            return tasks
                .filter(task => convertToComparableDate(task.date) < currentDateComparable && !task.completed)
                .sort((a, b) => { 
                    return convertToComparableDate(a.date) > convertToComparableDate(b.date) ? -1 : 1;
                });
        case 3:
            return tasks
                .filter(task => task.completed)
                .sort((a, b) => {
                    return convertToComparableDate(a.date) < convertToComparableDate(b.date) ? -1 : 1;
                });
        default:
            return tasks;
    }
};

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loadingTasks,
        modalVisible,
        editingTask,
        selectedTab,
        setSelectedTab,
        handleSaveTask,
        handleEditTask,
        handleCompleteTask,
        handleDeleteTask,
        handleDeleteSubtask,
        handleCompleteSubtask,
        openModal,
        closeModal,
        filteredTasks,
        updateKey,
        setUpdateKey,
        saveTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskManager = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskManager deve ser usado dentro de um TaskProvider");
  }
  return context;
};
