import React, { useState } from "react";
import { ActivityIndicator, Dimensions, View } from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
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
    selectedTab,
    setSelectedTab,
  } = useTaskManager();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "today", title: "Hoje" },
    { key: "next", title: "Próximas" },
    { key: "late", title: "Atrasadas" },
    { key: "completed", title: "Concluídas" },
  ]);

  const renderScene = SceneMap({
    today: () => renderTabContent(0),
    next: () => renderTabContent(1),
    late: () => renderTabContent(2),
    completed: () => renderTabContent(3),
  });

  const renderTabContent = (tabIndex: number) => {
    if (loadingTasks) {
      return (
        <S.LoadingContainer>
          <ActivityIndicator size="large" color={colors.primary} />
        </S.LoadingContainer>
      );
    }
    const tasksToShow = filteredTasks(tabIndex);
    if (tasksToShow.length === 0) {
      return <EmptyState tabIndex={tabIndex} />;
    }
    return (
      <View style={{ marginTop: 15 }}>
        <TaskList
         key={index} 
          tasks={tasksToShow}
          updateKey={updateKey}
          onEditTask={handleEditTask}
          onCompleteTask={handleCompleteTask}
          onDeleteTask={handleDeleteTask}
        />
      </View>
    );
  };
  
  const handleIndexChange = (newIndex: number) => {
    setIndex(newIndex);
    setSelectedTab(newIndex);
  };

  return (
    <S.Container>
      <Header tasks={tasks} />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={handleIndexChange}
        initialLayout={initialLayout}
        lazy
        lazyPreloadDistance={1}
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
