import {
  ButtonContainer,
  FilterContainer,
  HeaderWrapper,
  Container,
} from './styles';
import {useNavigation} from '@react-navigation/native';
import SearchInput from '../../components/SearchInput';
import FilterTask from '../../components/FilterTask';
import AddButton from '../../components/AddButton';
import {useTask} from '../../context/TaskContext';
import TrashButton from '../../components/TrashButton';
import React, {useEffect, useState} from 'react';
import colors from '../../styles/colors';
import Task from '../../components/Task';
import {ScrollView} from 'react-native';
import {imgs} from '../imgs';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface TaskType {
  title: string;
  description: string;
  priority: 'low' | 'average' | 'high';
  date: Date;
  isSelected: boolean;
}

export default function Home() {
  const navigation = useNavigation();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [tasksWithSelection, setTasksWithSelection] = useState<TaskType[]>([]);

  const search = () => {};

  const handleAddTask = () => {
    navigation.navigate('NewTask');
  };

  const {tasks} = useTask();

  useEffect(() => {
    const updatedTasks = tasks.map(task => ({
      ...task,
      isSelected: false,
    }));
    setTasksWithSelection(updatedTasks);
  }, [tasks]);

  const isAnyTaskSelected = tasksWithSelection.some(task => task.isSelected);
  const isTask = tasksWithSelection.length > 0;

  const handleSelect = (index: number) => {
    const updatedTasks = [...tasksWithSelection];
    updatedTasks[index].isSelected = !updatedTasks[index].isSelected;
    setTasksWithSelection(updatedTasks);
  };

  const handleDeleteTask = () => {
    const updatedTasks = tasksWithSelection.filter(task => !task.isSelected);
    setTasksWithSelection(updatedTasks);
  };

  return (
    <Container>
      <HeaderWrapper>
        <SearchInput placeholder="Buscar tarefa..." onSearch={search} />

        <TrashButton
          rightImageSource={imgs.trash}
          isTask={isTask}
          isAnyTaskSelected={isAnyTaskSelected}
          onDelete={handleDeleteTask}
        />
      </HeaderWrapper>

      <ScrollView showsVerticalScrollIndicator={false}>
        {tasksWithSelection.map((task, index) => (
          <Task
            key={index}
            title={task.title}
            description={task.description}
            priority={task.priority}
            date={task.date}
            handleSelect={() => handleSelect(index)}
            isSelected={task.isSelected}
            onDelete={() => handleDeleteTask()}
          />
        ))}
      </ScrollView>
      <ButtonContainer>
        <AddButton
          icon={imgs.plus}
          onPress={handleAddTask}
          backgroundColor={colors.primary.s300}
        />
      </ButtonContainer>
    </Container>
  );
}
