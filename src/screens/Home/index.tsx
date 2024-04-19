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
import {
  AnimatedSeparatorIcon,
  ButtonContainer,
  Container,
  HeaderWrapper,
  Logo,
  SeparatorIcon,
  SeparatorText,
  SeparatorView,
} from './styles';
import NewTaskModal from '../../components/NewTaskModal';
import SearchInput from '../../components/SearchInput';
import TrashButton from '../../components/TrashButton';
import AddButton from '../../components/AddButton';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function Home() {
  const {tasks, updateTasks} = useTask();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [tasksWithSelection, setTasksWithSelection] = useState<TaskType[]>([]);
  const [animations, setAnimations] = useState<{[key: number]: Animated.Value}>(
    {},
  );
  const [isTodayExpanded, setIsTodayExpanded] = useState<boolean>(true);
  const [isUpcomingExpanded, setIsUpcomingExpanded] = useState<boolean>(true);
  const [todayIconRotation, setTodayIconRotation] = useState(
    new Animated.Value(0),
  );
  const [upcomingIconRotation, setUpcomingIconRotation] = useState(
    new Animated.Value(0),
  );

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
    Object.keys(animations).forEach(key => {
      const index = parseInt(key, 10);
      Animated.timing(animations[index], {
        toValue: -100,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        const updatedTasks = tasksWithSelection.filter(
          task => !task.isSelected,
        );
        updateTasks(updatedTasks);
        setTasksWithSelection(updatedTasks);
      });
    });
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
    const newAnimations: {[key: number]: Animated.Value} = {};
    tasksWithSelection.forEach((task, index) => {
      if (task.isSelected) {
        newAnimations[index] = new Animated.Value(0);
      }
    });
    setAnimations(newAnimations);
  }, [tasksWithSelection]);

  useEffect(() => {
    const checkScheduledTask = task => {
      const now = new Date();
      const taskDate = new Date(task.date);

      if (
        now.getFullYear() === taskDate.getFullYear() &&
        now.getMonth() === taskDate.getMonth() &&
        now.getDate() === taskDate.getDate() &&
        now.getHours() === taskDate.getHours() &&
        now.getMinutes() === taskDate.getMinutes()
      ) {
        console.log(`Task "${task.title}" is scheduled for now.`);
        Alert.alert(
          'Tarefa Agendada',
          `A tarefa "${task.title}" está agendada para agora`,
        );
      }
    };

    const interval = setInterval(() => {
      console.log('Checking scheduled tasks...');
      filteredTasks.forEach(task => {
        checkScheduledTask(task);
      });
    }, 60000); // Verifica a cada minuto

    return () => clearInterval(interval);
  }, [filteredTasks]);

  // Separar as tarefas em tarefas de hoje e tarefas futuras
  const todayTasks = filteredTasks.filter(task => {
    const taskDate = new Date(task.date);
    const currentDate = new Date();
    return (
      taskDate.getDate() === currentDate.getDate() &&
      taskDate.getMonth() === currentDate.getMonth() &&
      taskDate.getFullYear() === currentDate.getFullYear()
    );
  });

  const upcomingTasks = filteredTasks.filter(task => {
    const taskDate = new Date(task.date);
    const currentDate = new Date();
    return (
      taskDate > currentDate ||
      (taskDate.getDate() !== currentDate.getDate() &&
        taskDate.getMonth() !== currentDate.getMonth() &&
        taskDate.getFullYear() !== currentDate.getFullYear())
    );
  });

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

  return (
    <Container>
      <HeaderWrapper>
        <SearchInput placeholder="Buscar tarefa..." onSearch={handleSearch} />
        <TrashButton
          rightImageSource={imgs.trash}
          isTask={isTask}
          isAnyTaskSelected={isAnyTaskSelected}
          onDelete={handleDeleteTask}
        />
      </HeaderWrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredTasks.length === 0 ? (
          <Logo source={imgs.logo} />
        ) : (
          <>
            {todayTasks.length > 0 && (
              <TouchableOpacity onPress={toggleTodaySection}>
                <SeparatorView>
                  <SeparatorText>Hoje</SeparatorText>
                  <AnimatedSeparatorIcon
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
                </SeparatorView>
              </TouchableOpacity>
            )}
            {isTodayExpanded && todayTasks.length > 0 && (
              <>
                {todayTasks.map((task, index) => (
                  <Animated.View
                    key={index.toString()}
                    style={{transform: [{translateX: animations[index] || 0}]}}>
                    <Task
                      title={task.title}
                      description={task.description}
                      priority={task.priority}
                      date={new Date(task.date)}
                      handleSelect={() =>
                        handleSelect(tasks.findIndex(t => t === task))
                      }
                      isSelected={task.isSelected}
                    />
                  </Animated.View>
                ))}
              </>
            )}

            {upcomingTasks.length > 0 && (
              <TouchableOpacity onPress={toggleUpcomingSection}>
                <SeparatorView>
                  <SeparatorText>Próximas</SeparatorText>
                  <AnimatedSeparatorIcon
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
                </SeparatorView>
              </TouchableOpacity>
            )}
            {isUpcomingExpanded && upcomingTasks.length > 0 && (
              <>
                {upcomingTasks.map((task, index) => (
                  <Animated.View
                    key={index.toString()}
                    style={{transform: [{translateX: animations[index] || 0}]}}>
                    <Task
                      title={task.title}
                      description={task.description}
                      priority={task.priority}
                      date={new Date(task.date)}
                      handleSelect={() =>
                        handleSelect(tasks.findIndex(t => t === task))
                      }
                      isSelected={task.isSelected}
                    />
                  </Animated.View>
                ))}
              </>
            )}
          </>
        )}
      </ScrollView>

      <NewTaskModal visible={modalVisible} onClose={toggleModal} />
      <ButtonContainer>
        <AddButton
          icon={imgs.plus}
          onPress={toggleModal}
          backgroundColor={colors.primary.s300}
        />
      </ButtonContainer>
    </Container>
  );
}
