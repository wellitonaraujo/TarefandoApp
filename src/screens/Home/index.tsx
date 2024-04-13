import React, {useEffect, useRef, useState} from 'react';
import {Animated, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ButtonContainer, Container, HeaderWrapper} from './styles';
import SearchInput from '../../components/SearchInput';
import {useTask} from '../../context/TaskContext';
import TrashButton from '../../components/TrashButton';
import Task from '../../components/Task';
import AddButton from '../../components/AddButton';
import {imgs} from '../imgs';
import colors from '../../styles/colors';
import NewTaskModal from '../../components/NewTaskModal';

interface TaskType {
  title: string;
  description: string;
  priority: 'low' | 'average' | 'high';
  date: Date;
  isSelected: boolean;
}

export default function Home() {
  const navigation = useNavigation();
  const {tasks, updateTasks} = useTask();
  const [tasksWithSelection, setTasksWithSelection] = useState<TaskType[]>([]);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [animations, setAnimations] = useState<{[key: number]: Animated.Value}>(
    {},
  );

  const handleSearch = (text: string) => {
    setSearchTerm(text);
  };

  const filteredTasks = tasksWithSelection.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddTask = () => {
    navigation.navigate('NewTask');
  };

  useEffect(() => {
    const updatedTasks = tasks.map(task => ({
      ...task,
      isSelected: false,
    }));
    setTasksWithSelection(updatedTasks);
  }, [tasks]);

  const isAnyTaskSelected = tasksWithSelection.some(task => task.isSelected);
  const isTask = tasksWithSelection.length > 0;

  useEffect(() => {
    const newAnimations: {[key: number]: Animated.Value} = {};
    tasksWithSelection.forEach((task, index) => {
      if (task.isSelected) {
        newAnimations[index] = new Animated.Value(0);
      }
    });
    setAnimations(newAnimations);
  }, [tasksWithSelection]);

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

  const handleSelect = (index: number) => {
    const updatedTasks = [...tasksWithSelection];
    updatedTasks[index].isSelected = !updatedTasks[index].isSelected;
    setTasksWithSelection(updatedTasks);
  };

  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
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
        {filteredTasks.map((task, index) => (
          <Animated.View
            key={index.toString()}
            style={{transform: [{translateX: animations[index] || 0}]}}>
            <Task
              title={task.title}
              description={task.description}
              priority={task.priority}
              date={task.date}
              handleSelect={() => handleSelect(index)}
              isSelected={task.isSelected}
            />
          </Animated.View>
        ))}
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
