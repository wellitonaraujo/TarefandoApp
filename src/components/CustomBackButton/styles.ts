import {Dimensions, Image} from 'react-native';
import styled from 'styled-components/native';
import colors from '../../styles/colors';

const screenHeight = Dimensions.get('window').height;
const buttonSize = screenHeight * 0.07;
const iconSize = buttonSize * 0.35;

export const BackWrapper = styled.Pressable`
  width: ${buttonSize}px;
  height: ${buttonSize}px;
  background-color: ${colors.grey.s300};
  border-radius: 60px;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-left: 16px;
  margin-top: 30px;
`;

export const ArrowBackIcon = styled(Image)`
  width: ${iconSize}px;
  height: ${iconSize}px;
`;
