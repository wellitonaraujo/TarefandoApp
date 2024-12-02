import { horizontalScale, moderateScale, verticalScale } from '@/src/utils/metrics';
import styled from 'styled-components/native';

export const TaskItemContainer = styled.View`
  width: ${horizontalScale(305)}px;
  background-color: #2d3341;
  padding: ${moderateScale(6)}px;
  border-top-left-radius: 0px;
  border-top-right-radius: ${moderateScale(16)}px;
  border-bottom-right-radius:${moderateScale(16)}px;
  border-bottom-left-radius: ${moderateScale(16)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TaskText = styled.Text`
    color: #fff; 
    font-size:  ${moderateScale(13)}px;
    letter-spacing: 1.2px;
    flex: 1; 
    margin-right: ${moderateScale(16)}px;
    max-width: 90%; 
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
  width:  ${moderateScale(70)}px;
  margin-left: ${moderateScale(8)}px;
  background-color: ${({ backgroundColor }) => backgroundColor || '#ccc'};
  border-radius: ${moderateScale(10)}px;
  height: ${moderateScale(35)}px;
`;

export const ActionText = styled.Text`
  color: #ffffff;
  font-size: ${moderateScale(10)}px;
  font-weight: 500;
`;

export const DragIcon = styled.Image`
  width: ${moderateScale(9)}px;
  height: ${moderateScale(13)}px;
  margin-right: ${horizontalScale(8)}px;
`;

export const TaskDate = styled.Text`
  color: #888888;
  font-size: ${moderateScale(10)}px;
 
`;

export const TaskWraper = styled.View`
  flex-direction: column;
  justify-content: space-between;
  margin-left: ${verticalScale(8)}px;
`;

export const Date = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
`;