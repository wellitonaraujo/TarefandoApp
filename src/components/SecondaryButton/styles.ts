import { moderateScale, verticalScale } from '@/src/utils/metrics';
import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import colors from '../../styles/colors';

export const ButtonContainer = styled(TouchableOpacity)`
  justify-content: center;
  margin:  ${verticalScale(20)}px 0;
`;

export const ButtonText = styled.Text<{textColor?: string}>`
  color: ${({textColor}) => textColor || colors.white};
  line-height: ${verticalScale(24)}px;
  text-align: center;
  font-size: ${moderateScale(16)}px;
  font-weight: 800;
`;
