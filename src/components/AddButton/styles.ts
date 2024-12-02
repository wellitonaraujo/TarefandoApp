import { moderateScale, verticalScale } from '@/src/utils/metrics';
import styled from 'styled-components/native';

export const Container = styled.View`
  position: absolute;
  bottom:${verticalScale(20)}px;
  align-self: center;
`;

export const Button = styled.TouchableOpacity`
  background-color: #1A72F3;
  align-items: center;
  justify-content: center;
  width: ${moderateScale(50)}px;
  height: ${moderateScale(50)}px;
  padding: 10px;
  border-radius: ${moderateScale(50)}px;
`;

export const PlusIcon = styled.Image`
 width: ${moderateScale(15)}px;
 height: ${moderateScale(15)}px;
`;
