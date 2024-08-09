import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import colors from '../../styles/colors';
import { RFValue } from 'react-native-responsive-fontsize';
import { moderateScale, verticalScale } from '@/src/utils/metrics';

export const ButtonContainer = styled(TouchableOpacity)`
  height: ${verticalScale(60)}px;
  width: 100%;
  border-radius: ${moderateScale(18)}px;
  justify-content: center;
  background-color: ${colors.primary.s300};
`;

export const ButtonText = styled.Text<{textColor?: string}>`
  color: ${({textColor}) => textColor || colors.title};
  letter-spacing: 1.2px;
  text-align: center;
  font-size: ${moderateScale(15)}px;
`;
