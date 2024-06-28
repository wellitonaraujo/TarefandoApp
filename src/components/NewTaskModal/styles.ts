import styled from 'styled-components/native';
import colors from '../../styles/colors';
import {TextInputProps} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

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
  border-top-right-radius:${RFValue(8)}px;
  border-top-left-radius: ${RFValue(8)}px;
  flex-direction: column;
  justify-content: space-between;
  padding:  ${RFValue(16)}px;
  width: 100%;
  height: ${RFValue(300)}px;
`;

export const ModalTextInputTitle = styled.TextInput<ModalTextInputTitleProps>`
  background-color: ${colors.input.s100};
  color: ${colors.title};
  padding-left: ${RFValue(10)}px;
  border-radius: ${RFValue(8)}px;
  height: ${RFValue(60)}px;
  font-size: ${RFValue(15)}px;
  border-color: ${({isEmpty}: any) =>
    isEmpty ? colors.priority.high : colors.input.s100};
  border-width: 1px;
  height: ${RFValue(120)}px;
`;

export const ModalTitle = styled.Text`
  color: ${colors.title};
  margin: 0 0 ${RFValue(5)}px ${RFValue(10)}px;;
  letter-spacing: 1.3px;
  font-size:  ${RFValue(15)}px;
`;

export const ModalIcon = styled.Image`
  width: ${RFValue(15)}px;
  height: ${RFValue(15)}px;
  opacity: 0.5;
`;

export const ModalDateWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ModalDateInput = styled.Pressable`
  border-radius: ${RFValue(40)}px;
  z-index: 1;
  flex-direction: row;
  justify-content: space-around;
  padding: 0 ${RFValue(5)}px;
  align-items: center;
  text-align: center;
  background-color: ${colors.input.s200};
  width: ${RFValue(80)}px;
  height: ${RFValue(35)}px;
`;

export const ModalSelectedDateText = styled.Text`
  color: ${colors.title};
  font-size: ${RFValue(14)}px;
`;
