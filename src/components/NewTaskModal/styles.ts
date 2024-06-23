import styled from 'styled-components/native';
import colors from '../../styles/colors';
import {TextInputProps} from 'react-native';

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
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  width: 100%;
  height: 300px;
`;

export const ModalTextInputTitle = styled.TextInput<ModalTextInputTitleProps>`
  background-color: ${colors.input.s100};
  color: ${colors.title};
  padding-left: 10px;
  border-radius: 15px;
  height: 60px;
  font-size: 18px;
  border-color: ${({isEmpty}: any) =>
    isEmpty ? colors.priority.high : colors.input.s100};
  border-width: 1px;
  height: 120px;
`;

export const ModalTitle = styled.Text`
  color: ${colors.title};
  margin: 0 0 5px 10px;
  letter-spacing: 1.3px;
  font-size: 16px;
`;

export const ModalIcon = styled.Image`
  width: 16px;
  height: 16px;
  opacity: 0.5;
`;

export const ModalDateWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ModalDateInput = styled.Pressable`
  border-radius: 40px;
  z-index: 1;
  flex-direction: row;
  justify-content: space-around;
  padding: 0 5px;
  align-items: center;
  text-align: center;

  background-color: ${colors.input.s200};
  width: 80px;
  height: 35px;
`;

export const ModalSelectedDateText = styled.Text`
  color: ${colors.title};
  font-size: 14px;
`;
