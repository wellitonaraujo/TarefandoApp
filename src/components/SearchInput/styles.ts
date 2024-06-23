import {RFValue} from 'react-native-responsive-fontsize';
import {Dimensions, Image, TextInput} from 'react-native';
import styled from 'styled-components/native';
import colors from '../../styles/colors';

const screenHeight = Dimensions.get('window').height;
const buttonSize = screenHeight * 0.055;

export const Container = styled.View`
  background-color: ${colors.input.s100};
  height: ${buttonSize}px;
  flex-direction: row;
  align-items: center;
  border-radius: 50px;
  font-size: 30px;
  padding: 0 8px;
  width: 80%;
  height: ${buttonSize}px;
`;

export const StyledInput = styled(TextInput)`
  font-size: ${RFValue(14)}px;
  color: ${colors.grey.s100};
  height: 55px;
  flex: 1;
`;

export const PlaceholderText = styled.Text`
  position: absolute;
  left: 12px;
  top: 10px;
`;

export const SearchIcon = styled(Image)`
  height: 28px;
  width: 28px;
`;

export const CloseIcon = styled(Image)`
  height: 24px;
  width: 24px;
  margin-right: 5px;
`;
