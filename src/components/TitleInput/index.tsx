import colors from '../../styles/colors';
import * as S from './styles';
import React from "react";

interface TitleInputProps {
    title: string;
    setTitle: (text: string) => void;
    isEmpty: boolean;
    setIsEmpty: (empty: boolean) => void;
  }
  
  const TitleInput: React.FC<TitleInputProps> = ({title, setTitle, isEmpty, setIsEmpty}) => (
    <S.ModalTextInputTitle
      placeholder="Insira o novo nome da tarefa"
      value={title}
      onChangeText={text => {
        setTitle(text);
        setIsEmpty(false);
      }}
      maxLength={320}
      placeholderTextColor={colors.grey.s100}
      isEmpty={isEmpty}
      multiline
      numberOfLines={6}
      textAlignVertical="top"
    />
  );

  export default TitleInput;
  