import React, { useState, useEffect } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';
import styles from './styles';
import Header from "@/src/components/Header";
import EmptyState from "@/src/components/EmptyState";
import TaskList from "@/src/components/TaskList";
import CustomModal from "@/src/components/CustomModal";
import AddButton from "@/src/components/AddButton";

const TASKS_KEY = '@tasks_key';

type Task = {
    id: string;
    name: string;
    completed: boolean;
};

const Home: React.FC = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [updateKey, setUpdateKey] = useState<number>(0); 
    const [editingTask, setEditingTask] = useState<Task | null>(null);
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

    const openModal = () => {
        setModalVisible(true);
        setEditingTask(null); 
    };

    const closeModal = () => {
        setModalVisible(false);
        setEditingTask(null); 
    };

    const handleEditTask = (id: string) => {
        const taskToEdit = tasks.find(task => task.id === id);
        if (taskToEdit) {
            setEditingTask(taskToEdit);
            setModalVisible(true); 
        }
    };

    const handleSaveTask = (taskName: string) => {
        let updatedTasks: Task[];

        if (editingTask) {
            updatedTasks = tasks.map(task =>
                task.id === editingTask.id ? { ...task, name: taskName } : task
            );
        } else if (taskName) {
            updatedTasks = [...tasks, { id: Date.now().toString(), name: taskName, completed: false }];
        } else {
            return;
        }

        saveTasks(updatedTasks);
        setEditingTask(null);

        if (editingTask) {
            closeModal();
        }

        setUpdateKey(prevKey => prevKey + 1);
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

    return (
        <GestureHandlerRootView style={styles.container}>
            <Header tasks={tasks} />
            {loadingTasks ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#1A72F3" />
                </View>
            ) : tasks.length === 0 ? (
                <EmptyState />
            ) : (
                <TaskList
                    tasks={tasks}
                    updateKey={updateKey}
                    onEditTask={handleEditTask}
                    onCompleteTask={handleCompleteTask}
                    onDeleteTask={handleDeleteTask}
                />
            )}
            <CustomModal
                visible={modalVisible}
                onClose={closeModal}
                onSave={handleSaveTask}
                taskName={editingTask ? editingTask.name : ''}
                isEditing={!!editingTask}
            />
            <AddButton onPress={openModal} />
        </GestureHandlerRootView>
    );
};

export default Home;
