import {Dimensions, Image} from 'react-native';
import styled from 'styled-components/native';

interface CreateTaskProps {
  backgroundColor?: string;
}

const screenHeight = Dimensions.get('window').height;
const buttonSize = screenHeight * 0.07;
const marginTop = screenHeight * 0.03;
const iconSize = buttonSize * 0.28;

export const CreateTask = styled.TouchableOpacity<CreateTaskProps>`
  width: ${buttonSize}px;
  height: ${buttonSize}px;
  background-color: ${props => props.backgroundColor};
  border-radius: ${buttonSize}px;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  margin-top: ${marginTop}px;
`;

export const Icon = styled(Image)`
  width: ${iconSize}px;
  height: ${iconSize}px;
`;
