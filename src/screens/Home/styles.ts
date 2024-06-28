import styled from 'styled-components/native';
import colors from '../../styles/colors';
import {Animated, Dimensions} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { verticalScale } from '../../utils/metrics';

const {width, height} = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
  padding: 16px;
`;

export const FilterContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

export const ButtonContainer = styled.View`
  bottom: ${height * 0.03}px;
  right: ${width * 0.05}px;
  position: absolute;
`;

export const HeaderWrapper = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end
`;

export const Logo = styled.Image`
  opacity: 0.2;
  width: ${RFValue(150)}px;
  height: ${RFValue(150)}px;
  align-self: center;
  margin-top: ${verticalScale(90)}px;
`;

export const SeparatorView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${RFValue(8)}px;
`;

export const SeparatorText = styled.Text`
 font-size: ${RFValue(14)}px;
  font-weight: bold;
  margin-right: 10px;
  opacity: 0.5;
  color: white;
`;

export const AnimatedSeparatorIcon = styled(Animated.Image)`
  width: 13px;
  height: 13px;
  opacity: 0.5;
  margin-top: 2px;
`;
