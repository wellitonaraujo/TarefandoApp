import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`;

export const ModalContainer = styled.View`
  background-color: #313747;
  padding: 20px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  align-items: center;
`;

export const ModalBar = styled.View`
  width: 40px;
  height: 5px;
  background-color: #666;
  border-radius: 2.5px;
  margin-bottom: 20px;
`;

export const StyledTextInput = styled.TextInput`
  width: 100%;
  height: 55px;
  background-color: #4b536a;
  border-radius: 50px;
  padding-horizontal: 16px;
  color: #ffffff;
  font-size: 16px;
  margin-bottom: 20px;
`;

export const CreateButton = styled(TouchableOpacity)`
  width: 100%;
  height: 55px;
  background-color: #1e90ff;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
`;

export const CreateButtonText = styled.Text`
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
`;

export const DateButton = styled.TouchableOpacity`
  width: 100%;
  height: 55px;
  background-color: #4b536a;
  border-radius: 50px;
  justify-content: center;
  padding-horizontal: 16px;
  margin-bottom: 20px;
`;

export const DateButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
`;
export const DateTextContainer = styled.View`
  align-self: flex-start;
  margin-bottom: 20px;
`;

export const DateText = styled.Text`
  font-size: 16px;
  color: white;
`;

