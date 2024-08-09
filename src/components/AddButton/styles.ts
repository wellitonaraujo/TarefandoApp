import { horizontalScale, moderateScale, verticalScale } from '@/src/utils/metrics';
import styled from 'styled-components/native';
import {Image} from 'react-native';

interface CreateTaskProps {
  backgroundColor?: string;
}

export const CreateTask = styled.TouchableOpacity<CreateTaskProps>`
  width: ${moderateScale(60)}px;
  height: ${moderateScale(60)}px;
  background-color: ${props => props.backgroundColor};
  border-radius: ${moderateScale(60)}px;
  justify-content: center;
  align-items: center;
`;

export const Icon = styled(Image)`
  width: ${moderateScale(18)}px;
  height: ${moderateScale(18)}px;
`;
