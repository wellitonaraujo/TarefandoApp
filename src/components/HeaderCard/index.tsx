import useHeaderCard from "./hook/useHeaderCard";
import * as S from "./styles";
import React from "react";
interface HeaderCardProps {
  totalTasks: number;
  completedTasks: number;
}

const HeaderCard: React.FC<HeaderCardProps> = ({ totalTasks, completedTasks }) => {
  const { taskProgress, capitalizedDate } = useHeaderCard(totalTasks, completedTasks);

  return (
    <S.Container>
      <S.Wrapper>
        <S.RightWrapper>
          <S.Title>Tarefas concluídas</S.Title>
          <S.CurrentDate>
            <S.Value>{taskProgress}</S.Value>
          </S.CurrentDate>
        </S.RightWrapper>
        <S.DateContainer>
          <S.DateText>{capitalizedDate}</S.DateText>
        </S.DateContainer>
      </S.Wrapper>
    </S.Container>
  );
};

export default HeaderCard;
