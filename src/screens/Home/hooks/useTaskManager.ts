import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from "react";

const TASKS_KEY = '@tasks_key';

type Task = {
    id: string;
    name: string;
    completed: boolean;
    date: string;
};

const useTaskManager = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [loadingTasks, setLoadingTasks] = useState<boolean>(true);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [updateKey, setUpdateKey] = useState<number>(0);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const savedTasks = await AsyncStorage.getItem(TASKS_KEY);
                if (savedTasks) {
                    const parsedTasks: Task[] = JSON.parse(savedTasks).map(task => ({
                        ...task,
                        date: task.date || new Date().toLocaleDateString(),
                    }));
                    setTasks(parsedTasks);
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

    const formatDate = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const convertToComparableDate = (date: string): string => {
        const [day, month, year] = date.split('/');
        return `${year}-${month}-${day}`; 
    };

    // Função para filtrar as tarefas
    const filteredTasks = () => {
        const currentDate = formatDate(new Date());
        const currentDateComparable = convertToComparableDate(currentDate);

        switch (selectedTab) {
            case 0:
                return tasks.filter(task => convertToComparableDate(task.date) === currentDateComparable && !task.completed);
            case 1:
                return tasks.filter(task => convertToComparableDate(task.date) > currentDateComparable && !task.completed);
            case 2:
                return tasks.filter(task => convertToComparableDate(task.date) < currentDateComparable && !task.completed);
            case 3:
                return tasks.filter(task => task.completed);
            default:
                return tasks;
        }
    };

    const handleSaveTask = (taskName: string, taskDate: string) => {
        let updatedTasks: Task[];

        if (editingTask) {
            updatedTasks = tasks.map(task =>
                task.id === editingTask.id ? { ...task, name: taskName, date: taskDate } : task
            );
            closeModal();
        } else if (taskName) {
            updatedTasks = [
                ...tasks,
                {
                    id: Date.now().toString(),
                    name: taskName,
                    completed: false,
                    date: taskDate,
                },
            ];
        } else {
            return;
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
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        saveTasks(updatedTasks);
    };

    const handleDeleteTask = (id: string) => {
        const updatedTasks = tasks.filter(task => task.id !== id);
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

    return {
        tasks,
        loadingTasks,
        editingTask,
        updateKey,
        handleSaveTask,
        handleEditTask,
        handleCompleteTask,
        handleDeleteTask,
        setEditingTask,
        modalVisible,
        openModal,
        closeModal,
        selectedTab,
        setSelectedTab,
        filteredTasks,
    };
};

export default useTaskManager;
