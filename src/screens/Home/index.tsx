import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ButtonContainer, Container, HeaderWrapper} from './styles';
import SearchInput from '../../components/SearchInput';
import {useTask} from '../../context/TaskContext';
import TrashButton from '../../components/TrashButton';
import Task from '../../components/Task';
import AddButton from '../../components/AddButton';
import {imgs} from '../imgs';
import colors from '../../styles/colors';

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

  const search = () => {};

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

  const handleDeleteTask = () => {
    const updatedTasks = tasksWithSelection.filter(task => !task.isSelected);
    updateTasks(updatedTasks);
    setTasksWithSelection(updatedTasks);
  };

  const handleSelect = (index: number) => {
    const updatedTasks = [...tasksWithSelection];
    updatedTasks[index].isSelected = !updatedTasks[index].isSelected;
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
            key={index.toString()}
            title={task.title}
            description={task.description}
            priority={task.priority}
            date={task.date}
            handleSelect={() => handleSelect(index)}
            isSelected={task.isSelected}
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
