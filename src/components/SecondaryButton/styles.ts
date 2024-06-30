import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import colors from '../../styles/colors';
import { RFValue } from 'react-native-responsive-fontsize';

export const ButtonContainer = styled(TouchableOpacity)`
  justify-content: center;
  margin:  ${RFValue(20)}px 0 ${RFValue(10)}px 0;
`;

export const ButtonText = styled.Text<{textColor?: string}>`
  color: ${({textColor}) => textColor || colors.title};
  letter-spacing: 1.2px;
  text-align: center;
  font-size: ${RFValue(14)}px;
`;
