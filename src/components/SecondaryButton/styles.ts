import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import colors from '../../styles/colors';

export const ButtonContainer = styled(TouchableOpacity)`
  height: 60px;
  width: 100%;
  border-radius: 15px;
  justify-content: center;
`;

export const ButtonText = styled.Text<{textColor?: string}>`
  color: ${({textColor}) => textColor || colors.title};
  letter-spacing: 1.2px;
  text-align: center;
  font-size: 16px;
`;
