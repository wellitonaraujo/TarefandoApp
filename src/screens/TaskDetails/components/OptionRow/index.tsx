
import { ImageSourcePropType } from 'react-native';
import colors from '@/src/themes/colors';
import * as S from './styles';
import React from 'react';

interface OptionRowProps {
  icon: ImageSourcePropType;
  text: string;
  value: string;
  onPress: () => void;
}

export const OptionRow = ({ icon, text, value, onPress }: OptionRowProps) => {
  return (
    <>
      <S.OptionRow>
        <S.Icon resizeMode="contain" tintColor={colors.gray_400} source={icon} />
        <S.OptionText>{text}</S.OptionText>
        <S.OptionValue onPress={onPress}>{value}</S.OptionValue>
      </S.OptionRow>
      <S.Separator />
    </>
  );
};
