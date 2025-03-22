import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PushNotification from "react-native-push-notification";
import BackgroundFetch from "react-native-background-fetch";

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
  checkAndScheduleNotification: (tasks: any[]) => void;
  checkAndScheduleOverdueNotification: (tasks: any[]) => void;
};

export const TaskContext = createContext<TaskContextData | undefined>(undefined);

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
          const normalizedTasks = parsedTasks.map((task: Task) => ({
            ...task,
            date: formatDate(parseDate(task.date))
          }));
          setTasks(normalizedTasks);
        }
      } catch (error) {
        console.error("Erro ao carregar as tarefas", error);
      } finally {
        setLoadingTasks(false);
      }
    };
  
    loadTasks();
  }, [updateKey]);
  
  const NOTIFICATION_SCHEDULED_KEY = "notificationScheduled";
  
  const checkAndScheduleNotification = async (tasks: Task[]) => {
    const currentDate = formatDate(new Date());
    const currentDateComparable = convertToComparableDate(currentDate);
  
    const tasksForToday = tasks.filter(
      (task) => convertToComparableDate(task.date) === currentDateComparable && !task.completed
    );
  
    if (tasksForToday.length === 0) {
      console.log("Nenhuma tarefa pendente para hoje. Cancelando notificações...");
      await AsyncStorage.removeItem(NOTIFICATION_SCHEDULED_KEY);
      return;
    }
  
    const notificationScheduled = await AsyncStorage.getItem(NOTIFICATION_SCHEDULED_KEY);
    if (notificationScheduled === currentDate) {
      console.log("Notificações já agendadas para hoje. Nenhuma nova notificação será enviada.");
      return;
    }
  
    const notifyTimes = [5];
  
    notifyTimes.forEach((minutes, index) => {
      const notifyDate = new Date();
      notifyDate.setHours(notifyDate.getUTCHours() + minutes);
      notifyDate.setSeconds(0);

      PushNotification.localNotificationSchedule({
        channelId: "task-reminders",
        title: "Tarefa do Dia!",
        message: `Verifique suas tarefas de hoje`,
        date: notifyDate,
        playSound: true,
        soundName: "default",
        vibrate: true,
      });
    });
  
    await AsyncStorage.setItem(NOTIFICATION_SCHEDULED_KEY, currentDate);
  };
  
  useEffect(() => {
    const configureBackgroundFetch = async () => {
      try {
        await BackgroundFetch.configure(
          {
            minimumFetchInterval: 15,
            stopOnTerminate: false,
            enableHeadless: true,
            startOnBoot: true
          },
          async taskId => {
            console.log('[BackgroundFetch] Verificando tarefas atrasadas...');
            
            const savedTasks = await AsyncStorage.getItem(TASKS_KEY);
            const tasks = savedTasks ? JSON.parse(savedTasks) : [];
            
            await checkAndScheduleNotification(tasks);
            
            BackgroundFetch.finish(taskId);
          },
          error => {
            console.error('[BackgroundFetch] Erro:', error);
          }
        );
      } catch (err) {
        console.error('[BackgroundFetch] Falha na configuração:', err);
      }
    };
  
    configureBackgroundFetch();
    return () => {
      BackgroundFetch.stop();
    };
  }, []);
  
  const saveTasks = async (updatedTasks: Task[]) => {
    try {
      console.log("Tarefas a serem salvas:", JSON.stringify(updatedTasks, null, 2));
      await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
  
      const currentDate = formatDate(new Date());
      const currentDateComparable = convertToComparableDate(currentDate);
      const tasksForToday = updatedTasks.filter(
        (task) => convertToComparableDate(task.date) === currentDateComparable && !task.completed
      );
  
      if (tasksForToday.length === 0) {
        console.log("Todas as tarefas do dia foram concluídas ou removidas. Resetando notificação...");
        await AsyncStorage.removeItem(NOTIFICATION_SCHEDULED_KEY);
      }
  
    } catch (error) {
      console.error("Erro ao salvar as tarefas", error);
    }
  };
  
  const parseDate = (dateString: string): Date => {
    const [day, month, year] = dateString.split('/');
    return new Date(Number(year), Number(month) - 1, Number(day));
  };

  const handleSaveTask = (taskName: string, taskDate: string, subtasks: Subtask[] = []) => {

    const normalizedDate = formatDate(parseDate(taskDate));
    
    let updatedTasks: Task[];
    if (editingTask) {
      updatedTasks = tasks.map(task =>
        task.id === editingTask.id
          ? { ...task, name: taskName, date: normalizedDate, subtasks }
          : task
      );
    } else {
      updatedTasks = [...tasks, { 
        id: Date.now().toString(), 
        name: taskName, 
        completed: false, 
        date: normalizedDate, 
        subtasks 
      }];
    }
    saveTasks(updatedTasks);
    setEditingTask(null);
    setUpdateKey(prevKey => prevKey + 1);
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
      task.id === id
        ? {
            ...task,
            completed: !task.completed,
            subtasks: task.subtasks?.map(subtask => ({ ...subtask, completed: !task.completed }))
          }
        : task
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
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        const updatedSubtasks = task.subtasks?.map(subtask =>
          subtask.id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask
        );
  
        const allSubtasksCompleted = updatedSubtasks?.every(subtask => subtask.completed);
  
        return {
          ...task,
          subtasks: updatedSubtasks,
          completed: allSubtasksCompleted ?? false,
        };
      }
      return task;
    });
  
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
        checkAndScheduleNotification,
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
