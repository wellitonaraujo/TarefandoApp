import styled from 'styled-components/native';
import colors from '../../styles/colors';
import {Animated, Dimensions} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { moderateScale, verticalScale } from '../../utils/metrics';

const {width, height} = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
  padding: ${moderateScale(16)}px;
`;

export const FilterContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ButtonContainer = styled.View`
  bottom: ${moderateScale(25)}px;
  right: ${moderateScale(16)}px;
  position: absolute;
`;

export const HeaderWrapper = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  margin: ${verticalScale(20)}px 0;
`;

export const Logo = styled.Image`
  opacity: 0.2;
  width: ${moderateScale(150)}px;
  height: ${moderateScale(150)}px;
  align-self: center;
  margin-top: ${verticalScale(250)}px;
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

export const HeaderTitle = styled.Text`
 font-size: ${RFValue(18)}px;
  font-weight: bold;
  margin-right: 10px;
  color: ${colors.white};
`;
