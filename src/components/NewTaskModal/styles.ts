import { moderateScale, verticalScale } from '@/src/utils/metrics';
import styled from 'styled-components/native';
import colors from '../../styles/colors';

export const ModalContainer = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: flex-end;
  align-items: center;
`;

export const ModalContent = styled.View`
  background-color: ${colors.card};
  border-top-right-radius:${verticalScale(12)}px;
  border-top-left-radius: ${verticalScale(12)}px;
  flex-direction: column;
  justify-content: space-between;
  padding:  ${moderateScale(24)}px;
  width: 100%;
  height: ${verticalScale(250)}px;
`;

export const CloseIconContainer = styled.Pressable`
  position: absolute;
  top: 20px;
  right: 25px;
  z-index: 999;
`;

export const CloseIcon = styled.Image`
  width: 20px;
  height: 20px;
`;