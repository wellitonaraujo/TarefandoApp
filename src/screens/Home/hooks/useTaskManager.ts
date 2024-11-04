import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from "react";

const TASKS_KEY = '@tasks_key';

type Task = {
    id: string;
    name: string;
    completed: boolean;
};

const useTaskManager = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [loadingTasks, setLoadingTasks] = useState<boolean>(true);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [updateKey, setUpdateKey] = useState<number>(0);
    const [tasks, setTasks] = useState<Task[]>([]);

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

    const handleSaveTask = (taskName: string) => {
        let updatedTasks: Task[];

        if (editingTask) {
            updatedTasks = tasks.map(task =>
                task.id === editingTask.id ? { ...task, name: taskName } : task
            );
            closeModal(); // Fecha o modal ao salvar uma tarefa editada
        } else if (taskName) {
            updatedTasks = [...tasks, { id: Date.now().toString(), name: taskName, completed: false }];
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
            task.id === id ? { ...task, completed: true } : task
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
        closeModal
    };
};

export default useTaskManager;
