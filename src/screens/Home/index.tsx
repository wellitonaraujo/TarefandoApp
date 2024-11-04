import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ActivityIndicator, View } from 'react-native';
import CustomModal from "@/src/components/CustomModal";
import EmptyState from "@/src/components/EmptyState";
import useTaskManager from './hooks/useTaskManager';
import AddButton from "@/src/components/AddButton";
import TaskList from "@/src/components/TaskList";
import Header from "@/src/components/Header";
import styles from './styles';
import React  from "react";

const Home: React.FC = () => {

    const {
        tasks,
        loadingTasks,
        editingTask,
        updateKey,
        handleSaveTask,
        handleEditTask,
        handleCompleteTask,
        handleDeleteTask,
        modalVisible,
        openModal,
        closeModal
    } = useTaskManager();

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
