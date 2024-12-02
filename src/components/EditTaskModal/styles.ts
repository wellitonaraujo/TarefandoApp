import styled from 'styled-components/native';
import { TouchableOpacity, TextInput } from 'react-native';

export const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`;

export const ModalContainer = styled.View`
  background-color: #2d3341;
  padding: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  align-items: flex-start;
`;

/* Input */
export const InputWrapper = styled.View`
  width: 100%;
  margin-bottom: 20px;
`;

export const StyledTextInput = styled(TextInput)`
  font-size: 16px;
  font-weight: 700;
  border-bottom-width: 1px;
  border-color: #424A5F;
  color: #fff;
`;

export const Underline = styled.View`
  width: 100%;
  height: 1px;
  background-color: #424A5F;
`;

export const DateWrapper = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const DateText = styled.Text`
  font-size: 13px;
  color: #888;
`;

export const SendButton = styled(TouchableOpacity)`
  position: absolute;
  right: 16px;
  bottom: 16px;
  width: 40px;
  height: 40px;
  background-color: #1A72F3;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
`;

export const SendIcon = styled.Image`
  width: 16px;
  height: 16px;
`;

export const DateIcon = styled.Image`
  width: 12px;
  height: 12px;
`;
