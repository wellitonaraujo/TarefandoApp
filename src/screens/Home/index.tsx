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

  const handleDeleteTask = async () => {
    try {
      const updatedTasks = tasksWithSelection.filter(task => !task.isSelected);
      setTasksWithSelection(updatedTasks);
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Salvar tarefas atualizadas no AsyncStorage
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const deleteTask = async (index: number) => {
    try {
      const updatedTasks = [...tasksWithSelection];
      updatedTasks.splice(index, 1);
      setTasksWithSelection(updatedTasks);
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Salvar tarefas atualizadas no AsyncStorage
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Função para selecionar uma tarefa
  const handleSelect = (index: number) => {
    const updatedTasks = [...tasksWithSelection];
    updatedTasks[index].isSelected = !updatedTasks[index].isSelected;
    setTasksWithSelection(updatedTasks);
  };

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks);
        const tasksWithDates = parsedTasks.map(task => ({
          ...task,
          date: new Date(task.date), // Convertendo a data para uma instância de Date
        }));
        setTasksWithSelection(tasksWithDates);
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

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
            key={task.title}
            title={task.title}
            description={task.description}
            priority={task.priority}
            date={task.date}
            handleSelect={() => handleSelect(index)}
            isSelected={task.isSelected}
            onDelete={() => deleteTask(index)}
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
