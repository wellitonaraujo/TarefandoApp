import colors from '@/src/themes/colors';
import * as S from './styles';
import React from 'react';

interface ActionButtonProps {
  icon: any;
  text: string;
  onPress: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, text, onPress }) => {
  return (
    <S.ActionButton onPress={onPress}>
      <S.ActionIcon resizeMode="contain" tintColor={colors.gray_400} source={icon} />
      <S.ActionText>{text}</S.ActionText>
    </S.ActionButton>
  );
};

export default ActionButton;
