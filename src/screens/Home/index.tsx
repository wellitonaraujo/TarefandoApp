import { useTaskManager } from "../../context/TaskContext";
import CreateTaskModal from "@/src/components/CreateTaskModal";
import EmptyState from "@/src/components/EmptyState";
import AddButton from "@/src/components/AddButton";
import { ActivityIndicator } from "react-native";
import TaskList from "@/src/components/TaskList";
import Header from "@/src/components/Header";
import React from "react";
import * as S from "./styles";
import colors from "@/src/themes/colors";

const Home: React.FC = () => {
  const {
    tasks,
    loadingTasks,
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

  return (
    <S.Container>
      <Header tasks={tasks} />
      <S.TabsContainer>
        {["Hoje", "Próximas", "Atrasadas", "Concluídas"].map((tab, index) => (
          <S.Tab
            key={index}
            selected={selectedTab === index}
            onPress={() => setSelectedTab(index)}
          >
            <S.TabText selected={selectedTab === index}>{tab}</S.TabText>
          </S.Tab>
        ))}
      </S.TabsContainer>
      {loadingTasks ? (
    <S.LoadingContainer>
      <ActivityIndicator size="large" color={colors.primary} />
    </S.LoadingContainer>
    ) : (

      (selectedTab === 0 && filteredTasks().length === 0) ? (
        <EmptyState tabIndex={selectedTab} />
      ) : (
        (filteredTasks().length === 0) ? (
          <EmptyState tabIndex={selectedTab} />
        ) : (
          <TaskList
            tasks={filteredTasks()}
            updateKey={updateKey}
            onEditTask={handleEditTask}
            onCompleteTask={handleCompleteTask}
            onDeleteTask={handleDeleteTask}
          />
        )
      )
    )}

      <CreateTaskModal
        visible={modalVisible}
        onClose={closeModal}
        onSave={handleSaveTask}
      />
      <AddButton onPress={openModal} />
    </S.Container>
  );
};

export default Home;
