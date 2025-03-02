import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ActivityIndicator, View, Text, TouchableOpacity } from "react-native";
import CreateTaskModal from "@/src/components/CreateTaskModal";
import EditTaskModal from "@/src/components/EditTaskModal";
import EmptyState from "@/src/components/EmptyState";
import AddButton from "@/src/components/AddButton";
import TaskList from "@/src/components/TaskList";
import Header from "@/src/components/Header";
import React from "react";
import { styles } from './styles';
import useTaskManager from './hooks/useTaskManager';


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
    closeModal,
    selectedTab,
    setSelectedTab,
    filteredTasks,
  } = useTaskManager();
 
  const isEmptyStateVisible = selectedTab === 0 && filteredTasks().length === 0;

  return (
    <GestureHandlerRootView style={styles.container}>
      <Header tasks={tasks} />
      <View style={styles.tabsContainer}>
        {['Hoje', 'Próximas', 'Atrasadas', 'Concluídas'].map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tab, selectedTab === index && styles.selectedTab]}
            onPress={() => setSelectedTab(index)}
          >
            <Text
              style={[styles.tabText, selectedTab === index ? styles.selectedTabText : styles.deselectedTabText]}
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
      ) : isEmptyStateVisible ? (
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

      <CreateTaskModal
        visible={modalVisible && !editingTask}
        onClose={closeModal}
        onSave={handleSaveTask}
      />

      {editingTask && (
        <EditTaskModal
          visible={modalVisible && !!editingTask}
          onClose={closeModal}
          onSave={handleSaveTask}
          taskName={editingTask.name}
          taskDate={editingTask.date}
        />
      )}

      <AddButton onPress={openModal} />
    </GestureHandlerRootView>
  );
};

export default Home;
