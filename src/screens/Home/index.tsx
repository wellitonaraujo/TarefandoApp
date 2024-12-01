import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ActivityIndicator, View, Text, TouchableOpacity } from 'react-native';
import CustomModal from "@/src/components/CustomModal";
import EmptyState from "@/src/components/EmptyState";
import useTaskManager from './hooks/useTaskManager';
import AddButton from "@/src/components/AddButton";
import TaskList from "@/src/components/TaskList";
import Header from "@/src/components/Header";
import React, { useState } from "react";
import { styles } from './styles';

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

  const [selectedTab, setSelectedTab] = useState(0);

  const filteredTasks = () => {
    switch (selectedTab) {
      case 0:
        return tasks.filter(task => task.date === new Date().toLocaleDateString('pt-BR'));
      case 1:
        return tasks.filter(task => new Date(task.date) > new Date());
      case 2:
        return tasks.filter(task => new Date(task.date) < new Date());
      case 3:
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <Header tasks={tasks} />
      <View style={styles.tabsContainer}>
        {['Hoje', 'Futuras', 'Atrasadas', 'Concluídas'].map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tab,
              selectedTab === index && styles.selectedTab
            ]}
            onPress={() => setSelectedTab(index)}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === index ? styles.selectedTabText : styles.deselectedTabText
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loadingTasks ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1A72F3" />
        </View>
      ) : filteredTasks().length === 0 ? (
        <EmptyState />
      ) : (
        <TaskList
          tasks={filteredTasks()}
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