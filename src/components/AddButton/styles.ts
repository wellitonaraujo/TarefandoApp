import { horizontalScale, moderateScale, verticalScale } from '@/src/utils/metrics';
import styled from 'styled-components/native';
import {Image} from 'react-native';

interface CreateTaskProps {
  backgroundColor?: string;
}

export const CreateTask = styled.TouchableOpacity<CreateTaskProps>`
  width: ${moderateScale(55)}px;
  height: ${moderateScale(55)}px;
  background-color: ${props => props.backgroundColor};
  border-radius: ${moderateScale(55)}px;
  justify-content: center;
  align-items: center;
`;

export const Icon = styled(Image)`
  width: ${moderateScale(18)}px;
  height: ${moderateScale(18)}px;
`;
