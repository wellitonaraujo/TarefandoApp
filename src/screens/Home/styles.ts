import styled from 'styled-components/native';
import colors from '../../styles/colors';
import {Dimensions} from 'react-native';

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
