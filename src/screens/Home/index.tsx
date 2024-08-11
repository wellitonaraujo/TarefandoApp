import { useAnimations } from '@/src/hooks/useAnimations';
import EditTaskModal from '../../components/EditTaskModal';
import NewTaskModal from '../../components/NewTaskModal';
import { Animated, ScrollView } from 'react-native';
import AddButton from '../../components/AddButton';
import TaskSection from './components/TaskSection';
import { useModals } from '@/src/hooks/useModals';
import { TaskType } from '@/src/models/TaskType'
import { useTasks } from '@/src/hooks/useTasks';
import colors from '@/src/styles/colors';
import { imgs } from '../imgs';
import * as S from "./styles";
import React from 'react';

export default function Home() {
  const {
    tasksWithSelection,
    todayIconRotation,
    upcomingIconRotation,
    pastIconRotation,
    completedIconRotation,
    isTodayExpanded,
    setIsTodayExpanded,
    isUpcomingExpanded,
    setIsUpcomingExpanded,
    isPastExpanded,
    setIsPastExpanded,
    isCompletedExpanded,
    setIsCompletedExpanded,
    editModalVisible,
    setEditModalVisible,
    selectedTask,
    setSelectedTask,
    filteredTasks,
    todayTasks,
    upcomingTasks,
    pastTasks,
    completedTasks,
    handleSelect,
    handleDeleteSpecificTask,
  } = useTasks();

  const { animations } = useAnimations(tasksWithSelection);
  const { modalVisible, toggleModal } = useModals();

  const openEditModal = (task: TaskType) => {
    const isTaskCompleted = completedTasks.includes(task);
  
    if (!isTaskCompleted) {
      setSelectedTask(task);
      setEditModalVisible(true);
    }
  };
  
  const animationsArray = Object.values(animations);

  return (
    <S.Container>
      <S.HeaderWrapper>
        <S.HeaderTitle>Minhas Tarefas</S.HeaderTitle>
      </S.HeaderWrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredTasks.length === 0 ? (
          <S.Logo source={imgs.logo} tintColor={colors.title} />
        ) : (
          <>
            <TaskSection
              title="Atrasadas"
              tasks={pastTasks}
              isExpanded={isPastExpanded}
              toggleSection={() => {
                setIsPastExpanded(!isPastExpanded);
                Animated.timing(pastIconRotation, {
                  toValue: isPastExpanded ? 1 : 0,
                  duration: 300,
                  useNativeDriver: true,
                }).start();
              }}
              iconRotation={pastIconRotation}
              handleSelect={(index) => handleSelect(
                tasksWithSelection.findIndex(t => t === pastTasks[index]))}
              openEditModal={openEditModal}
              handleDeleteSpecificTask={handleDeleteSpecificTask}
              animations={animationsArray}
            />
            <TaskSection
              title="Hoje"
              tasks={todayTasks}
              isExpanded={isTodayExpanded}
              toggleSection={() => {
                setIsTodayExpanded(!isTodayExpanded);
                Animated.timing(todayIconRotation, {
                  toValue: isTodayExpanded ? 1 : 0,
                  duration: 300,
                  useNativeDriver: true,
                }).start();
              }}
              iconRotation={todayIconRotation}
              handleSelect={(index) => handleSelect(
                tasksWithSelection.findIndex(t => t === todayTasks[index]))}
              openEditModal={openEditModal}
              handleDeleteSpecificTask={handleDeleteSpecificTask}
              animations={animationsArray}
            />
            <TaskSection
              title="Próximas"
              tasks={upcomingTasks}
              isExpanded={isUpcomingExpanded}
              toggleSection={() => {
                setIsUpcomingExpanded(!isUpcomingExpanded);
                Animated.timing(upcomingIconRotation, {
                  toValue: isUpcomingExpanded ? 1 : 0,
                  duration: 300,
                  useNativeDriver: true,
                }).start();
              }}
              iconRotation={upcomingIconRotation}
              handleSelect={(index) => handleSelect(
                tasksWithSelection.findIndex(t => t === upcomingTasks[index]))}
              openEditModal={openEditModal}
              handleDeleteSpecificTask={handleDeleteSpecificTask}
              animations={animationsArray}
            />
            <TaskSection
              title="Concluídas"
              tasks={completedTasks}
              isExpanded={isCompletedExpanded}
              toggleSection={() => {
                setIsCompletedExpanded(!isCompletedExpanded);
                Animated.timing(completedIconRotation, {
                  toValue: isCompletedExpanded ? 1 : 0,
                  duration: 300,
                  useNativeDriver: true,
                }).start();
              }}
              iconRotation={completedIconRotation}
              handleSelect={(index) => handleSelect(
                tasksWithSelection.findIndex(t => t === completedTasks[index]))}
              openEditModal={openEditModal}
              handleDeleteSpecificTask={handleDeleteSpecificTask}
              animations={animationsArray}
            />
          </>
        )}
      </ScrollView>

      <S.ButtonContainer>
        <AddButton
          icon={imgs.plus}
          onPress={toggleModal}
          backgroundColor={colors.priority.average}
        />
      </S.ButtonContainer>

      <NewTaskModal visible={modalVisible} onClose={toggleModal} />
      <EditTaskModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        task={selectedTask}
      />
    </S.Container>
  );
}