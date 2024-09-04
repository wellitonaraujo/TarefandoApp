import styled from 'styled-components/native';
import colors from '../../styles/colors';
import { horizontalScale, moderateScale, verticalScale } from '../../utils/metrics';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.white};
  border-radius: 23px;
`;

export const HeaderContainer = styled.View`
  flex: 1;
  background-color: ${colors.white};
`;

export const HeaderDateWrapper = styled.View`
 flex-direction: row;
`;

export const TaskContainer = styled.View`
  background-color: ${colors.white};
  padding: ${horizontalScale(16)}px;
  border-radius: ${verticalScale(16)}px;
  flex: 1; 
`;

export const DateLabel = styled.View<{ isSelected: boolean }>`
  align-items: center;
  justify-content: center;
  margin-top: ${verticalScale(5)}px;
  width: ${moderateScale(30)}px;
  height: ${moderateScale(30)}px;
  border-radius: ${moderateScale(15)}px;
  background-color: ${({ isSelected }) => (isSelected ? colors.white : 'transparent')};
`;

export const ButtonContainer = styled.View`
  bottom: ${moderateScale(25)}px;
  right: ${moderateScale(16)}px;
  position: absolute;
`;
