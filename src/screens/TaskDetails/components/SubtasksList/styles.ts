import colors from '@/src/themes/colors';
import styled from 'styled-components/native';


export const SubtaskContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
`;

export const SubtaskLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const AddSubtaskText = styled.Text`
  color:  ${colors.primary};
  font-size: 15px;
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
`;


export const DeleteIcon = styled.Image`
  width: 11px;
  height: 11px;
`;

