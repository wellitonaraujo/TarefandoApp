import React, {useEffect, useState} from 'react';
import {Animated, ScrollView} from 'react-native';
import {TaskType} from '../../models/TaskType';
import {useTask} from '../../context/TaskContext';
import colors from '../../styles/colors';
import Task from '../../components/Task';
import {imgs} from '../imgs';
import {ButtonContainer, Container, HeaderWrapper} from './styles';
import NewTaskModal from '../../components/NewTaskModal';
import SearchInput from '../../components/SearchInput';
import TrashButton from '../../components/TrashButton';
import AddButton from '../../components/AddButton';

export default function Home() {
  const {tasks, updateTasks} = useTask();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [tasksWithSelection, setTasksWithSelection] = useState<TaskType[]>([]);
  const [animations, setAnimations] = useState<{[key: number]: Animated.Value}>(
    {},
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
              date={new Date(task.date)}
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
