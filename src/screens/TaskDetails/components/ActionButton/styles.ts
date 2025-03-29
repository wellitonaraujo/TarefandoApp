import colors from '@/src/themes/colors';
import styled from 'styled-components/native';


export const ActionButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${colors.cardTask};
  border-radius: 40px;
  padding: 8px 10px;
`;

export const ActionIcon = styled.Image`
  width: 16px;
  height: 16px;
  margin-right: 8px;
`;

export const ActionText = styled.Text`
  color: ${colors.gray_200};
  font-size: 14px;
`;

