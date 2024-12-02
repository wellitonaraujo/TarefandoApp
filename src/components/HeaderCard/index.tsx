import useHeaderCard from "./hook/useHeaderCard";
import * as S from "./styles";
import React from "react";
import { Image, View } from "react-native"; // Importando o componente Image

interface HeaderCardProps {
  totalTasks: number;
  completedTasks: number;
}

const HeaderCard: React.FC<HeaderCardProps> = ({ totalTasks, completedTasks }) => {
  const { taskProgress } = useHeaderCard(totalTasks, completedTasks);

  return (
    <S.Container>
      <S.Wrapper>
       <View>
        <S.Title>Tarefas concluídas</S.Title>
            <S.CurrentDate>
            <S.Value>{taskProgress}</S.Value>
            </S.CurrentDate>
       </View>
        <S.IconBell
            resizeMode="contain"
            source={require('../../assets/icons/bell.png')}
        />
      </S.Wrapper>
    </S.Container>
  );
};

export default HeaderCard;
