import { moderateScale, verticalScale } from '@/src/utils/metrics';
import styled from 'styled-components/native';
import {TextInputProps} from 'react-native';
import colors from '../../styles/colors';

interface ModalTextInputTitleProps extends TextInputProps {
  isEmpty: boolean;
}

export const ModalContainer = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: flex-end;
  align-items: center;
`;

export const ModalContent = styled.View`
  background-color: ${colors.background};
  border-top-right-radius: ${moderateScale(18)}px;
  border-top-left-radius: ${moderateScale(18)}px;
  flex-direction: column;
  justify-content: space-between;
  padding: ${moderateScale(24)}px;;
  width: 100%;
  height: ${verticalScale(350)}px;
`;

export const ModalTextInputTitle = styled.TextInput<ModalTextInputTitleProps>`
  background-color: ${colors.input.s200};
  color: ${colors.title};
  padding: ${moderateScale(12)}px;
  border-radius: ${moderateScale(12)}px;
  font-size: ${moderateScale(15)}px;
  height: ${verticalScale(100)}px;
`;


