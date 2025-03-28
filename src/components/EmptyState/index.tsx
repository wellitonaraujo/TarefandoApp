import * as S from "./styles";
import React from "react";
import { Image, View } from "react-native";

interface EmptyStateProps {
  tabIndex: number;
}

const EmptyState: React.FC<EmptyStateProps> = ({ tabIndex }) => {
  return (
    <S.EmptyContainer>
      <Image source={require('../../assets/icons/logomarca.png')} style={{ width: 200, height: 200 }} />
      
      {tabIndex === 0 ? (
        <>
          <S.EmptyTitle>O que você quer fazer hoje?</S.EmptyTitle>
          <S.EmptyDescription>Toque em + para adicionar suas tarefas</S.EmptyDescription>
        </>
      ) : (
        <View>
          <S.EmptyTitle>Nada por aqui</S.EmptyTitle>
          <S.EmptyDescription>Relaxe um pouco ou crie uma nova tarefa :)</S.EmptyDescription>
        </View>
      )}
    </S.EmptyContainer>
  );
};

export default EmptyState;



