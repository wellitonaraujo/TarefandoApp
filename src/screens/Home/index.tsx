import {
  ButtonContainer,
  FilterContainer,
  HeaderWrapper,
  Container,
} from './styles';
import {useNavigation, useRoute} from '@react-navigation/native';
import SearchInput from '../../components/SearchInput';
import FilterTask from '../../components/FilterTask';
import AddButton from '../../components/AddButton';
import Header from '../../components/Header';
import colors from '../../styles/colors';
import React, {useState} from 'react';
import {imgs} from '../imgs';
import Task from '../../components/Task';
import {ScrollView} from 'react-native';
import {useTask} from '../../context/TaskContext';

export default function Home() {
  const navigation = useNavigation();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handlePress = (title: string) => {
    setActiveFilter(prevTitle => (prevTitle === title ? null : title));
  };

  const search = () => {};

  const isTask = true;

  const handleAddTask = () => {
    navigation.navigate('NewTask');
  };

  const {tasks} = useTask();

  return (
    <Container>
      <HeaderWrapper>
        <SearchInput placeholder="Buscar tarefa..." onSearch={search} />

        <Header rightImageSource={imgs.trash} isTask={isTask} />
      </HeaderWrapper>

      <FilterContainer>
        <FilterTask
          title="Prioridade"
          onPress={() => handlePress('Prioridade')}
          hasBorder={activeFilter === 'Prioridade'}
          isTask={isTask}
        />
        <FilterTask
          title="Cronograma"
          onPress={() => handlePress('Cronograma')}
          hasBorder={activeFilter === 'Cronograma'}
          isTask={isTask}
        />
        <FilterTask
          title="Atrasada"
          onPress={() => handlePress('Atrasada')}
          hasBorder={activeFilter === 'Atrasada'}
          isTask={isTask}
        />
        <FilterTask
          title="Concluída"
          onPress={() => handlePress('Concluída')}
          hasBorder={activeFilter === 'Concluída'}
          isTask={isTask}
        />
      </FilterContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        {tasks.map((task, index) => (
          <Task
            key={index}
            title={task.title}
            description={task.description}
            priority={task.priority}
            date={task.date}
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
