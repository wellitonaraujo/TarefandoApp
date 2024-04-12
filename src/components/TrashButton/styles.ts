import styled from 'styled-components/native';
import colors from '../../styles/colors';
import {Dimensions} from 'react-native';

const screenHeight = Dimensions.get('window').height;
const buttonSize = screenHeight * 0.06;
const iconSize = buttonSize * 0.4;

export const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderText = styled.Text`
  font-size: 17px;
  color: ${colors.grey.s200};
  letter-spacing: 2px;
`;

export const UserNameText = styled.Text`
  font-size: 17px;
  letter-spacing: 2px;
  color: ${colors.grey.s100};
`;

export const TrashIcon = styled.TouchableOpacity<{opacity?: number}>`
  width: ${buttonSize}px;
  height: ${buttonSize}px;
  background-color: ${colors.grey.s300};
  border-radius: 60px;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  opacity: ${({opacity}) => (opacity !== undefined ? opacity : 1)};
`;

export const Icon = styled.Image`
  width: ${iconSize}px;
  height: ${iconSize}px;
`;

export const WelcomeWapper = styled.View`
  flex-direction: column;
  align-items: center;
`;
