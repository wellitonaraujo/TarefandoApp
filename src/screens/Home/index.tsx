import {
  ButtonContainer,
  FilterContainer,
  HeaderWrapper,
  Container,
} from './styles';
import SearchInput from '../../components/SearchInput';
import FilterTask from '../../components/FilterTask';
import AddButton from '../../components/AddButton';
import Header from '../../components/Header';
import colors from '../../styles/colors';
import React, {useState} from 'react';
import {imgs} from '../imgs';

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handlePress = (title: string) => {
    setActiveFilter(prevTitle => (prevTitle === title ? null : title));
  };

  const search = () => {};

  const isTask = false;

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

      <ButtonContainer>
        <AddButton
          icon={imgs.plus}
          onPress={search}
          backgroundColor={colors.primary.s300}
        />
      </ButtonContainer>
    </Container>
  );
}
