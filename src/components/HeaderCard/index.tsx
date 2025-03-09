import * as S from "./styles";
import React from "react";
import { View } from "react-native";
import useHeaderCard from "./hook/useHeaderCard";

interface HeaderCardProps {
  totalTasks: number;
  completedTasks: number;
}

const HeaderCard: React.FC<HeaderCardProps> = ({ totalTasks, completedTasks }) => {
  const { taskProgress, capitalizedDate } = useHeaderCard(totalTasks, completedTasks);


  return (
    <S.Container>
      <S.Wrapper>
        <View>
          <S.Title>Tarefas concluídas</S.Title>
          <S.CurrentDate>
            <S.Value>{taskProgress}</S.Value>
          </S.CurrentDate>
        </View>
        <S.DateContainer>
          <S.DateText>{capitalizedDate}</S.DateText>
        </S.DateContainer>
      </S.Wrapper>
    </S.Container>
  );
};

export default HeaderCard;
