import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #181A20;
  padding: 16px;
`;

export const Title = styled.Text`
  color: #D2D2D2;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

export const SubtaskContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const SubtaskLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const RadioButton = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border-width: 2px;
  border-color: #D2D2D2;
  margin-right: 8px;
`;

export const SubtaskText = styled.Text`
  color: #D2D2D2;
  font-size: 16px;
  margin-left: 10px;
`;

export const DeleteButton = styled.TouchableOpacity`
  padding: 8px;
`;

export const DeleteIcon = styled.Image`
  width: 8px;
  height: 8px;
`;

export const NoSubtasks = styled.Text`
  color: #D2D2D2;
  font-size: 16px;
  font-style: italic;
`;

export const AddSubtaskText = styled.Text`
  color: #5D9CEC;
  font-size: 16px;
  margin-top: 16px;
  margin-bottom: 24px;
`;

export const OptionsContainer = styled.View`
  margin-bottom: 24px;
`;

export const OptionRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const OptionText = styled.Text`
  color: #D2D2D2;
  font-size: 16px;
  flex: 1;
  margin-left: 8px;
`;

export const OptionValue = styled.Text`
  color: #D2D2D2;
  font-size: 16px;
`;

export const Separator = styled.View`
  height: 1px;
  background-color: #313747;
  margin-vertical: 16px;
`;

export const ActionsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 16px;
`;

export const ActionButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: #313747;
  border-radius: 8px;
  padding: 8px;
`;

export const ActionIcon = styled.Image`
  width: 16px;
  height: 16px;
  margin-right: 8px;
`;

export const Icon = styled.Image`
  width: 16px;
  height: 16px;
`;

export const ActionText = styled.Text`
  color: #D2D2D2;
  font-size: 13px;
`;
