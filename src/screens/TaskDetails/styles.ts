import colors from '@/src/themes/colors';
import { TextInput } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${colors.backgound};
  padding: 16px;
`;

export const Title = styled.Text<{ completed: boolean }>`
  color: ${colors.gray_100};;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const NameTextInput = styled(TextInput)`
  color: ${colors.gray_100};
  font-size: 20px;
  font-weight: bold;

`;
export const NameSubTextInput = styled(TextInput)`
  color: ${colors.gray_200};
  font-size: 16px;
  margin-left: 10px;
  font-weight: 500;
`;


export const SubtaskContainer = styled.View`
  flex-direction: row;
  align-items: flex-start; 
  flex-wrap: wrap;
  align-items: center;

`;


export const SubtaskLeft = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1; 
`;

export const AddSubtaskText = styled.Text`
  color:  ${colors.primary};
  font-size: 15px;
  margin-bottom: 24px;
`;


export const SubtaskText = styled.Text`
  color: ${colors.gray_200};
  font-size: 16px;
  margin-left: 10px;
  flex-wrap: wrap;
  max-width: 86%; 
`;

export const DeleteButton = styled.TouchableOpacity`
  flex-shrink: 0; 
  padding: 5px;
  margin-left: 30px;
`;


export const DeleteIcon = styled.Image`
  width: 11px;
  height: 11px;
`;

export const OptionsContainer = styled.View`
  margin-bottom: 24px;
  margin-top: 10px;
  
`;

export const OptionRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const OptionText = styled.Text`
  color: ${colors.gray_200};
  font-size: 16px;
  flex: 1;
  margin-left: 8px;
`;

export const OptionValue = styled.Text`
  color: ${colors.gray_200};;
  font-size: 16px;
`;

export const Separator = styled.View`
  height: 1px;
  background-color: ${colors.cardTask};
  margin-vertical: 16px;
`;

export const ActionsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 16px;
  padding-bottom: 50px;
`;

export const ActionButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${colors.cardTask};
  border-radius: 40px;
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
  color: ${colors.gray_200};
  font-size: 14px;
`;

export const AddSubtaskInput = styled.TextInput`
  margin-right: 8px;
  color:  ${colors.gray_100};
  font-size: 16px;
`;


