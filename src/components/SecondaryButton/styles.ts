import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import colors from '../../styles/colors';
import { moderateScale, verticalScale } from '@/src/utils/metrics';

export const ButtonContainer = styled(TouchableOpacity)`
  justify-content: center;
  margin:  ${verticalScale(20)}px 0;
`;

export const ButtonText = styled.Text<{textColor?: string}>`
  color: ${({textColor}) => textColor || colors.title};
  letter-spacing: 1.2px;
  text-align: center;
  font-size: ${moderateScale(15)}px;
`;
