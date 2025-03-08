import colors from '@/src/themes/colors';
import { TextInput } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${colors.backgound};
  padding: 16px;
`;

export const Title = styled.Text`
  color: ${colors.black};;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const SubtaskContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const SubtaskLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const AddSubTaskButton = styled.TouchableOpacity`
  background-color: ${colors.primary};
  width: 160px;
  height: 41px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`;

export const AddSubtaskText = styled.Text`
  color:  ${colors.white};
  align-items: center;
  align-self: center;
  justify-content: center;
  text-align: center;
  font-size: 12px;
`;


export const SubtaskText = styled.Text`
  color: ${colors.gray_300};
  font-size: 16px;
  margin-left: 10px;
  flex-wrap: wrap;
  max-width: 85%; 
`;

export const DeleteButton = styled.TouchableOpacity`
  flex-shrink: 0; 
  padding: 4px;
`;


export const DeleteIcon = styled.Image`
  width: 8px;
  height: 8px;
`;

export const OptionsContainer = styled.View`
  margin-bottom: 24px;
  margin-top: 20px;
`;

export const OptionRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const OptionText = styled.Text`
  color: ${colors.gray_500};
  font-size: 14px;
  flex: 1;
  margin-left: 8px;
`;

export const OptionValue = styled.Text`
  color: ${colors.black};;
  font-size: 14px;
`;

export const Separator = styled.View`
  height: 1px;
  background-color: ${colors.gray_100};
  margin-vertical: 10px;
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
  border-width: 1px;
  border-color: ${colors.gray_400};
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
  color: ${colors.gray_400};
  font-size: 12px;
`;

export const AddSubtaskInput = styled.TextInput`
  margin-right: 8px;
  margin-bottom: 10px;
  color:  ${colors.black};
  font-size: 16px;
`;

export const NameTextInput = styled(TextInput)`
  color: ${colors.black};
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

