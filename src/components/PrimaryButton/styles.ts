import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import colors from '../../styles/colors';
import { RFValue } from 'react-native-responsive-fontsize';
import { moderateScale, verticalScale } from '@/src/utils/metrics';

export const ButtonContainer = styled(TouchableOpacity)`
  height: ${verticalScale(56)}px;
  width: 100%;
  border-radius: ${moderateScale(18)}px;
  justify-content: center;
  background-color: ${colors.priority.average};
`;

export const ButtonText = styled.Text<{textColor?: string}>`
  color: ${({textColor}) => textColor || colors.white};
  line-height: ${verticalScale(24)}px;
  text-align: center;
  font-size: ${moderateScale(16)}px;
  font-weight: 800;
`;
