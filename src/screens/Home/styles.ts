import styled from 'styled-components/native';
import colors from '../../styles/colors';
import {Animated, Dimensions} from 'react-native';

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
  margin: 30px 0;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.Image`
  opacity: 0.2;
  width: 150px;
  height: 150px;
  align-self: center;
  margin-top: 250px;
`;

export const SeparatorView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

export const SeparatorText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
  opacity: 0.5;
`;

export const AnimatedSeparatorIcon = styled(Animated.Image)`
  width: 15px;
  height: 15px;
  opacity: 0.5;
`;
