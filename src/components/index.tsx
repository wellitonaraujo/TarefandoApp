import React, { useState } from "react";
import { ActivityIndicator, Dimensions, View } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import { useTaskManager } from "../../context/TaskContext";
import CreateTaskModal from "@/src/components/CreateTaskModal";
import EmptyState from "@/src/components/EmptyState";
import AddButton from "@/src/components/AddButton";
import TaskList from "@/src/components/TaskList";
import Header from "@/src/components/Header";
import colors from "@/src/themes/colors";
import * as S from "./styles";

const initialLayout = { width: Dimensions.get("window").width };

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
    filteredTasks,
  } = useTaskManager();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "today", title: "Hoje" },
    { key: "next", title: "Próximas" },
    { key: "late", title: "Atrasadas" },
    { key: "completed", title: "Concluidas" },
  ]);

  const renderScene = ({ route }: { route: { key: string } }) => {
    if (loadingTasks) {
      return (
        <S.LoadingContainer>
          <ActivityIndicator size="large" color={colors.primary} />
        </S.LoadingContainer>
      );
    }

    const tasksToShow = filteredTasks();
    if (tasksToShow.length === 0) {
      return <EmptyState tabIndex={index} />;
    }

    return (
      <View style={{ marginTop: 15 }}>
      <TaskList
        tasks={tasksToShow}
        updateKey={updateKey}
        onEditTask={handleEditTask}
        onCompleteTask={handleCompleteTask}
        onDeleteTask={handleDeleteTask}
      />
      </View>
    );
  };

  return (
    <S.Container >
      <Header tasks={tasks} />

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: colors.primary }}
            style={{ backgroundColor: colors.backgound }}
            activeColor={colors.primary}
            inactiveColor={colors.gray_100}
            tabStyle={{
              width: 'auto',
              paddingHorizontal: 16,
            }}
          />
        )}
      />
      <CreateTaskModal visible={modalVisible} onClose={closeModal} onSave={handleSaveTask} />
      <AddButton onPress={openModal} />
    </S.Container>
  );
};

export default Home;
