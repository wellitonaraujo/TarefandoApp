import * as S from './styles';
import React from 'react';

const EmptyState = () => (
  <S.EmptyContainer>
    <S.EmptyTitle>
      Você não possui tarefas <S.HighlightedText>hoje</S.HighlightedText>
    </S.EmptyTitle>
    <S.EmptyDescription>Clique no botão (+) para criar</S.EmptyDescription>
  </S.EmptyContainer>
);

export default EmptyState;
