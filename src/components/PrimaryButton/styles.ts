import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import colors from '../../styles/colors';

export const ButtonContainer = styled(TouchableOpacity)`
  height: 60px;
  width: 100%;
  border-radius: 15px;

  justify-content: center;

  border-width: 1px;
  background-color: ${colors.primary.s300};
`;

export const ButtonText = styled.Text<{textColor?: string}>`
  color: ${({textColor}) => textColor || colors.background};
  letter-spacing: 1.2px;
  text-align: center;
  font-size: 16px;
`;
