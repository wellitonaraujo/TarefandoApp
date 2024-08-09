import styled from 'styled-components/native';
import colors from '../../styles/colors';
import {TextInputProps} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { horizontalScale, moderateScale, verticalScale } from '@/src/utils/metrics';

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
  border-top-right-radius:${verticalScale(18)}px;
  border-top-left-radius: ${verticalScale(18)}px;
  flex-direction: column;
  justify-content: space-between;
  padding:  ${moderateScale(24)}px;
  width: 100%;
  height: ${verticalScale(280)}px;
`;

export const ModalTextInputTitle = styled.TextInput<ModalTextInputTitleProps>`
  background-color: ${colors.input.s200};
  color: ${colors.title};
  padding: ${moderateScale(12)}px;
  border-radius: ${moderateScale(12)}px;
  font-size: ${moderateScale(14)}px;
  height: ${verticalScale(90)}px;
`;


export const ModalIcon = styled.Image`
  width: ${RFValue(14)}px;
  height: ${RFValue(14)}px;
  opacity: 0.5;
`;

export const ModalDateWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

export const ModalDateInput = styled.Pressable`
  border-radius: ${moderateScale(12)}px;
  z-index: 1;
  flex-direction: row;
  justify-content: space-around;
  padding: 0 ${horizontalScale(5)}px;
  align-items: center;
  text-align: center;
  background-color: ${colors.input.s200};
  width: ${verticalScale(90)}px;
  height: ${horizontalScale(35)}px;
`;

export const ModalSelectedDateText = styled.Text`
  color: ${colors.title};
  font-size: ${moderateScale(13)}px;
`;
