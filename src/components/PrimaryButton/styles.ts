import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import colors from '../../styles/colors';
import { RFValue } from 'react-native-responsive-fontsize';

export const ButtonContainer = styled(TouchableOpacity)`
  height: ${RFValue(55)}px;
  width: 100%;
  border-radius: ${RFValue(55)}px;
  justify-content: center;
  border-width: 1px;
  background-color: ${colors.primary.s300};
`;

export const ButtonText = styled.Text<{textColor?: string}>`
  color: ${({textColor}) => textColor || colors.title};
  letter-spacing: 1.2px;
  text-align: center;
  font-size: ${RFValue(15)}px;
`;
