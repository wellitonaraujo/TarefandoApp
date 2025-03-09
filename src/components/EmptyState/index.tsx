import * as S from "./styles";
import React from "react";
import { Image, View } from "react-native";


interface EmptyStateProps {
  tabIndex: number;
}

const EmptyState: React.FC<EmptyStateProps> = ({ tabIndex }) => {
  return (
    <S.EmptyContainer>
      {tabIndex !== 0 && <Image source={require('../../assets/icons/empty-icon.png')} style={{ width: 200, height: 200 }} />}
      <S.EmptyTitle>
        {tabIndex === 0 ? (
          <>
            Você não possui tarefas <S.HighlightedText>hoje</S.HighlightedText>
          </>
        ) : (
         <View>
          <S.EmptyTitle>Nada por aqui</S.EmptyTitle>
          <S.EmptyDescription>Relaxe um pouco ou crie uma nova :) </S.EmptyDescription>
         </View>
        )}
      </S.EmptyTitle>
      {tabIndex === 0 && <S.EmptyDescription>Clique no botão abaixo para criar</S.EmptyDescription>}
    </S.EmptyContainer>
  );
};

export default EmptyState;


