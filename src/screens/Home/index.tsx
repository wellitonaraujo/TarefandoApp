import { Animated, Pressable, ScrollView } from 'react-native';
import { useAnimations } from '@/src/hooks/useAnimations';
import EditTaskModal from '../../components/EditTaskModal';
import NewTaskModal from '../../components/NewTaskModal';
import AddButton from '../../components/AddButton';
import { useModals } from '@/src/hooks/useModals';
import { TaskType } from '@/src/models/TaskType';
import { useTasks } from '@/src/hooks/useTasks';
import Task from '../../components/Task';
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

  const toggleTodaySection = () => {
    setIsTodayExpanded(!isTodayExpanded);
    Animated.timing(todayIconRotation, {
      toValue: isTodayExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const toggleUpcomingSection = () => {
    setIsUpcomingExpanded(!isUpcomingExpanded);
    Animated.timing(upcomingIconRotation, {
      toValue: isUpcomingExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const togglePastSection = () => {
    setIsPastExpanded(!isPastExpanded);
    Animated.timing(pastIconRotation, {
      toValue: isPastExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const toggleCompletedSection = () => {
    setIsCompletedExpanded(!isCompletedExpanded);
    Animated.timing(completedIconRotation, {
      toValue: isCompletedExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const openEditModal = (task: TaskType) => {
    setSelectedTask(task);
    setEditModalVisible(true);
  };

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
            {pastTasks.length > 0 && (
              <Pressable onPress={togglePastSection}>
                <S.SeparatorView>
                  <S.SeparatorText>Atrasadas</S.SeparatorText>
                  <S.AnimatedSeparatorIcon
                    resizeMode="contain"
                    source={imgs.arrowbottom}
                    style={{
                      transform: [
                        {
                          rotate: pastIconRotation.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '180deg'],
                          }),
                        },
                      ],
                    }}
                  />
                </S.SeparatorView>
              </Pressable>
            )}
            {isPastExpanded && pastTasks.length > 0 && (
              <>
                {pastTasks.map((task, index) => (
                  <Animated.View
                    key={index.toString()}
                    style={{ transform: [{ translateX: animations[index] || 0 }] }}
                  >
                    <Task
                      title={task.title}
                      priority={task.priority}
                      date={new Date(task.date)}
                      handleSelect={() =>
                        handleSelect(tasksWithSelection.findIndex(t => t === task))
                      }
                      isSelected={task.isSelected}
                      onPress={() => openEditModal(task)}
                      onDelete={() => handleDeleteSpecificTask(task)}
                      dateColor={colors.priority.high}
                    />
                  </Animated.View>
                ))}
              </>
            )}

            {todayTasks.length > 0 && (
              <Pressable onPress={toggleTodaySection}>
                <S.SeparatorView>
                  <S.SeparatorText>Hoje</S.SeparatorText>
                  <S.AnimatedSeparatorIcon
                    source={imgs.arrowbottom}
                    resizeMode="contain"
                    style={{
                      transform: [
                        {
                          rotate: todayIconRotation.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '180deg'],
                          }),
                        },
                      ],
                    }}
                  />
                </S.SeparatorView>
              </Pressable>
            )}
            {isTodayExpanded && todayTasks.length > 0 && (
              <>
                {todayTasks.map((task, index) => (
                  <Animated.View
                    key={index.toString()}
                    style={{ transform: [{ translateX: animations[index] || 0 }] }}
                  >
                    <Task
                      title={task.title}
                      priority={task.priority}
                      date={new Date(task.date)}
                      handleSelect={() =>
                        handleSelect(tasksWithSelection.findIndex(t => t === task))
                      }
                      isSelected={task.isSelected}
                      onPress={() => openEditModal(task)}
                      onDelete={() => handleDeleteSpecificTask(task)}
                    />
                  </Animated.View>
                ))}
              </>
            )}

            {upcomingTasks.length > 0 && (
              <Pressable onPress={toggleUpcomingSection}>
                <S.SeparatorView>
                  <S.SeparatorText>Próximas</S.SeparatorText>
                  <S.AnimatedSeparatorIcon
                    resizeMode="contain"
                    source={imgs.arrowbottom}
                    style={{
                      transform: [
                        {
                          rotate: upcomingIconRotation.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '180deg'],
                          }),
                        },
                      ],
                    }}
                  />
                </S.SeparatorView>
              </Pressable>
            )}
            {isUpcomingExpanded && upcomingTasks.length > 0 && (
              <>
                {upcomingTasks.map((task, index) => (
                  <Animated.View
                    key={index.toString()}
                    style={{ transform: [{ translateX: animations[index] || 0 }] }}
                  >
                    <Task
                      title={task.title}
                      priority={task.priority}
                      date={new Date(task.date)}
                      handleSelect={() =>
                        handleSelect(tasksWithSelection.findIndex(t => t === task))
                      }
                      isSelected={task.isSelected}
                      onPress={() => openEditModal(task)}
                      onDelete={() => handleDeleteSpecificTask(task)}
                    />
                  </Animated.View>
                ))}
              </>
            )}

            {completedTasks.length > 0 && (
              <Pressable onPress={toggleCompletedSection}>
                <S.SeparatorView>
                  <S.SeparatorText>Concluídas</S.SeparatorText>
                  <S.AnimatedSeparatorIcon
                    resizeMode="contain"
                    source={imgs.arrowbottom}
                    style={{
                      transform: [
                        {
                          rotate: completedIconRotation.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '180deg'],
                          }),
                        },
                      ],
                    }}
                  />
                </S.SeparatorView>
              </Pressable>
            )}
            {isCompletedExpanded && completedTasks.length > 0 && (
              <>
                {completedTasks.map((task, index) => (
                  <Animated.View
                    key={index.toString()}
                    style={{ transform: [{ translateX: animations[index] || 0 }] }}
                  >
                    <Task
                      title={task.title}
                      priority={task.priority}
                      date={new Date(task.date)}
                      handleSelect={() =>
                        handleSelect(tasksWithSelection.findIndex(t => t === task))
                      }
                      isSelected={task.isSelected}
                      onPress={() => openEditModal(task)}
                      onDelete={() => handleDeleteSpecificTask(task)}
                    />
                  </Animated.View>
                ))}
              </>
            )}
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
