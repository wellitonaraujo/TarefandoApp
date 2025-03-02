import { horizontalScale, moderateScale, verticalScale } from '@/src/utils/metrics';
import styled from 'styled-components/native';

export const TaskItemContainer = styled.Pressable`
  width: ${horizontalScale(305)}px;
  padding: ${moderateScale(7)}px;
  background-color: #313747;
  border-radius: ${moderateScale(4)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const TaskText = styled.Text`
  color: #fff; 
  font-size: ${moderateScale(13)}px;
  flex-shrink: 1;
  flex-basis: 0;
  margin-right:${horizontalScale(13)}px;
`;

export const RightActionsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-self: center;
`;

export const ActionButton = styled.TouchableOpacity<{ backgroundColor?: string }>`
  justify-content: center;
  align-items: center;
  width:  ${moderateScale(60)}px;
  margin-left: ${moderateScale(3)}px;
  background-color: ${({ backgroundColor }) => backgroundColor || '#ccc'};
  border-radius: ${moderateScale(2)}px;
  height: ${moderateScale(35)}px;
`;

export const ActionText = styled.Text`
  color: #ffffff;
  font-size: ${moderateScale(10)}px;
  font-weight: 400;
`;

export const DragIcon = styled.Image`
  width: ${moderateScale(9)}px;
  height: ${moderateScale(13)}px;
  margin-right: ${horizontalScale(8)}px;
  flex-shrink: 0;
`;

export const TaskDate = styled.Text`
  color: #888888;
  font-size: ${moderateScale(10)}px;
  margin-right: 5px;
`;

export const TaskWraper = styled.View`
  flex-direction: column;
  justify-content: space-between;
  margin-left: ${verticalScale(8)}px;
  flex: 1;
`;

export const Date = styled.View`
  flex-direction: row;
  align-items: center;

`;