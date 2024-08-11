import { moderateScale, verticalScale } from '@/src/utils/metrics';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import colors from '@/src/styles/colors';

interface ButtonContainerProps {
  variant: 'primary' | 'secondary';
}

export const ButtonContainer = styled(TouchableOpacity)<ButtonContainerProps>`
  background-color: ${({ variant }) => (variant === 'primary' ? colors.priority.average : colors.background)};
  height: ${verticalScale(56)}px;
  width: 100%;
  border-radius: ${moderateScale(18)}px;
  justify-content: center;
`;
export const ButtonText = styled.Text<{textColor?: string}>`
  color: ${({textColor}) => textColor || colors.white};
  line-height: ${verticalScale(24)}px;
  text-align: center;
  font-size: ${moderateScale(16)}px;
  font-weight: 800;
`;