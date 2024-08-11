import React, {useEffect, useState} from 'react';
import {
  Alert,
  Animated,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {TaskType} from '../../models/TaskType';
import {useTask} from '../../context/TaskContext';
import colors from '../../styles/colors';
import Task from '../../components/Task';
import {imgs} from '../imgs';

import * as S from "./styles"

import NewTaskModal from '../../components/NewTaskModal';

import TrashButton from '../../components/TrashButton';
import AddButton from '../../components/AddButton';
import EditTaskModal from '../../components/EditTaskModal';

export default function Home() {
  const { tasks, updateTasks } = useTask();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [tasksWithSelection, setTasksWithSelection] = useState<TaskType[]>([]);
  const [animations, setAnimations] = useState<{ [key: number]: Animated.Value }>({});

  const [todayIconRotation, setTodayIconRotation] = useState(new Animated.Value(0));
  const [upcomingIconRotation, setUpcomingIconRotation] = useState(new Animated.Value(0));
  const [pastIconRotation] = useState(new Animated.Value(1));
  const [completedIconRotation] = useState(new Animated.Value(1));

  const [isTodayExpanded, setIsTodayExpanded] = useState<boolean>(true);
  const [isUpcomingExpanded, setIsUpcomingExpanded] = useState<boolean>(true);
  const [isPastExpanded, setIsPastExpanded] = useState<boolean>(false);
  const [isCompletedExpanded, setIsCompletedExpanded] = useState<boolean>(false);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);

  const isAnyTaskSelected = tasksWithSelection.some(task => task.isSelected);
  const isTask = tasksWithSelection.length > 0;

  const filteredTasks = tasksWithSelection.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleSearch = (text: string) => {
    setSearchTerm(text);
  };

  const handleDeleteTask = () => {
    const updatedTasks = tasksWithSelection.filter(task => !task.isSelected);
    const updatedAnimations: { [key: number]: Animated.Value } = {};

    // Atualiza as animações apenas para as tarefas que permanecem
    updatedTasks.forEach((task, index) => {
      updatedAnimations[index] = animations[index] || new Animated.Value(0);
    });

    // Animação para as tarefas que foram excluídas
    Object.keys(animations).forEach(key => {
      const index = parseInt(key, 10);
      if (!updatedAnimations[index]) {
        Animated.timing(animations[index], {
          toValue: -10,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }
    });

    // Atualiza o estado das tarefas e das animações
    updateTasks(updatedTasks);
    setTasksWithSelection(updatedTasks);
    setAnimations(updatedAnimations);
  };

  const handleSelect = async (index: number) => {
    const updatedTasks = [...tasksWithSelection];
    updatedTasks[index] = {
      ...updatedTasks[index],
      isSelected: !updatedTasks[index].isSelected,
    };
    setTasksWithSelection(updatedTasks);
    updateTasks(updatedTasks);
  };

  useEffect(() => {
    setTasksWithSelection(tasks);
  }, [tasks]);

  useEffect(() => {
    const newAnimations: { [key: number]: Animated.Value } = {};
    tasksWithSelection.forEach((task, index) => {
      if (task.isSelected) {
        newAnimations[index] = new Animated.Value(0);
      }
    });
    setAnimations(newAnimations);
  }, [tasksWithSelection]);

  // Ordenar as tarefas com base na data
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateA - dateB;
  });

  // Separar as tarefas em tarefas de hoje, futuras, passadas e concluídas
  const todayTasks = sortedTasks.filter(task => {
    const taskDate = new Date(task.date);
    const currentDate = new Date();
    return (
      taskDate.getDate() === currentDate.getDate() &&
      taskDate.getMonth() === currentDate.getMonth() &&
      taskDate.getFullYear() === currentDate.getFullYear() &&
      !task.isSelected
    );
  });

  const upcomingTasks = sortedTasks.filter(task => {
    const taskDate = new Date(task.date);
    const currentDate = new Date();
    return (
      taskDate > currentDate &&
      (taskDate.getDate() !== currentDate.getDate() ||
        taskDate.getMonth() !== currentDate.getMonth() ||
        taskDate.getFullYear() !== currentDate.getFullYear()) &&
      !task.isSelected
    );
  });

  const pastTasks = sortedTasks.filter(task => {
    const taskDate = new Date(task.date);
    const currentDate = new Date();
    return (
      taskDate < currentDate &&
      (taskDate.getDate() !== currentDate.getDate() ||
        taskDate.getMonth() !== currentDate.getMonth() ||
        taskDate.getFullYear() !== currentDate.getFullYear()) &&
      !task.isSelected
    );
  });

  const completedTasks = sortedTasks.filter(task => task.isSelected);

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


  const handleTaskPress = (task: TaskType) => {
    if (!task.isSelected) {
      setSelectedTask(task);
      setEditModalVisible(true);
    }
  };

  const handleDeleteSpecificTask = (taskToDelete: TaskType) => {
    const updatedTasks = tasksWithSelection.filter(task => task !== taskToDelete);
    const updatedAnimations: { [key: number]: Animated.Value } = {};
  
    updatedTasks.forEach((task, index) => {
      updatedAnimations[index] = animations[tasksWithSelection.indexOf(task)] || new Animated.Value(0);
    });
  
    const taskIndex = tasksWithSelection.indexOf(taskToDelete);
    if (taskIndex !== -1 && animations[taskIndex]) {
      Animated.timing(animations[taskIndex], {
        toValue: -10,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        delete animations[taskIndex];
      });
    }
  

    updateTasks(updatedTasks);
    setTasksWithSelection(updatedTasks);
    setAnimations(updatedAnimations);
  };
  
  return (
    <S.Container>
      <S.HeaderWrapper>
        <S.HeaderTitle>Minhas Tarefas</S.HeaderTitle>
        {/* <TrashButton
          rightImageSource={imgs.trash}
          isTask={isTask}
          isAnyTaskSelected={isAnyTaskSelected}
          onDelete={handleDeleteTask}
        /> */}
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
                      description={task.description}
                      priority={task.priority}
                      date={new Date(task.date)}
                      handleSelect={() =>
                        handleSelect(tasks.findIndex(t => t === task))
                      }
                      isSelected={task.isSelected}
                      onPress={() => handleTaskPress(task)}
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
                      description={task.description}
                      priority={task.priority}
                      date={new Date(task.date)}
                      handleSelect={() =>
                        handleSelect(tasks.findIndex(t => t === task))
                      }
                      isSelected={task.isSelected}
                      onPress={() => handleTaskPress(task)}
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
                      description={task.description}
                      priority={task.priority}
                      date={new Date(task.date)}
                      handleSelect={() =>
                        handleSelect(tasks.findIndex(t => t === task))
                      }
                      isSelected={task.isSelected}
                      onPress={() => handleTaskPress(task)}
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
                      description={task.description}
                      priority={task.priority}
                      date={new Date(task.date)}
                      handleSelect={() =>
                        handleSelect(tasks.findIndex(t => t === task))
                      }
                      isSelected={task.isSelected}
                      onPress={() => handleTaskPress(task)}
                      onDelete={() => handleDeleteSpecificTask(task)}
                    />
                  </Animated.View>
                ))}
              </>
            )}
          </>
        )}
      </ScrollView>

      <NewTaskModal visible={modalVisible} onClose={toggleModal} />

      <EditTaskModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        task={selectedTask}
      />

      <S.ButtonContainer>
        <AddButton
          icon={imgs.plus}
          onPress={toggleModal}
          backgroundColor={colors.priority.average}
        />
      </S.ButtonContainer>
    </S.Container>
  );
}
