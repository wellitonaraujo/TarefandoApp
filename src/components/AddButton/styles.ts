import colors from '@/src/themes/colors';
import { moderateScale, verticalScale } from '@/src/utils/metrics';
import styled from 'styled-components/native';

export const Container = styled.View`
  position: absolute;
  bottom:${verticalScale(20)}px;
  align-self: center;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${colors.primary};
  align-items: center;
  justify-content: center;
  width: ${moderateScale(48)}px;
  height: ${moderateScale(48)}px;
  padding: 10px;
  border-radius: ${moderateScale(48)}px;
  transform: scale(1)
`;

export const PlusIcon = styled.Image`
 width: ${moderateScale(15)}px;
 height: ${moderateScale(15)}px;
`;
