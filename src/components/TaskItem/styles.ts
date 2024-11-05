import { moderateScale } from '@/src/utils/metrics';
import styled from 'styled-components/native';

export const TaskItemContainer = styled.View`
  background-color: #313747;
  padding: ${moderateScale(14)}px;
  border-top-left-radius: 0px;
  border-top-right-radius: ${moderateScale(16)}px;
  border-bottom-right-radius:${moderateScale(16)}px;
  border-bottom-left-radius: ${moderateScale(16)}px;
  margin-vertical: ${moderateScale(5)}px;
  margin-horizontal: ${moderateScale(16)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TaskText = styled.Text`
    color: #fff; 
    font-size: ${moderateScale(14)}px;
    font-weight: 800;
    flex: 1; 
    margin-right: 16px;
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
  margin: 5px;
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
  width: ${moderateScale(18)}px;
  height: ${moderateScale(18)}px;
  resize-mode: contain;
`;