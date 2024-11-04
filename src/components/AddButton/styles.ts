import { moderateScale, verticalScale } from '@/src/utils/metrics';
import styled from 'styled-components/native';

export const Container = styled.View`
  position: absolute;
  bottom:${verticalScale(20)}px;
  align-self: center;
`;

export const Button = styled.TouchableOpacity`
  background-color: #1E90FF;
  align-items: center;
  justify-content: center;
  width: ${moderateScale(50)}px;
  height: ${moderateScale(50)}px;
  padding: 10px;
  border-radius: ${moderateScale(50)}px;
`;

export const PlusIcon = styled.Image`
 width: ${moderateScale(18)}px;
 height: ${moderateScale(18)}px;
  resize-mode: contain;
`;
