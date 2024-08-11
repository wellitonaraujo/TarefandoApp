import { moderateScale, verticalScale } from '@/src/utils/metrics';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import colors from '@/src/styles/colors';
import {Animated } from 'react-native';

export const HeaderWrapper = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  margin: ${verticalScale(20)}px 0;
`;

export const SeparatorView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${RFValue(8)}px;
  margin-top: ${RFValue(8)}px;
`;

export const SeparatorText = styled.Text`
  font-size: ${moderateScale(14)}px;
  font-weight: bold;
  margin-right: 10px;
  color: ${colors.white};
`;

export const AnimatedSeparatorIcon = styled(Animated.Image)`
  width: 13px;
  height: 13px;
  opacity: 0.5;
  margin-top: 2px;
`;