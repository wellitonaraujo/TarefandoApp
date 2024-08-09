import { horizontalScale, moderateScale, verticalScale } from '@/src/utils/metrics';
import styled from 'styled-components/native';
import colors from '../../styles/colors';

interface CardContainerProps {
  isSelected?: boolean;
}

export const TaskContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CardContainer = styled.View<CardContainerProps>`
  flex: 1;
  background-color: ${colors.grey.s300};
  border-radius: ${moderateScale(12)}px;;
  padding: 0 ${horizontalScale(5)}px;
  margin:  ${verticalScale(5)}px  0;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-left-width: ${horizontalScale(2)}px;
  width: 100%;
  height: ${verticalScale(45)}px;
  transition: max-height 0.3s ease;

`;

export const CardTitle = styled.Text<{
  isSelected: boolean;
}>`
  color: ${colors.white};
  font-size: ${moderateScale(14)}px;
  letter-spacing: 1.4px;
  font-weight: 800;
  text-decoration: ${({isSelected}) => (isSelected ? 'line-through' : 'none')};
`;

export const CardRow = styled.View`
  flex-direction: row;
  align-items: center;
  
`;

export const DateWrapper = styled.View`
  flex-direction: column;
  justify-content: space-between;
  margin-left: ${moderateScale(10)}px;
`;

export const DateInput = styled.Pressable`
 
`;

export const SelectedDateText = styled.Text<{isSelected: boolean}>`
  color: ${colors.title};
  font-size: ${moderateScale(10)}px;
  letter-spacing: 1.8px;
  text-decoration: ${({isSelected}) => (isSelected ? 'line-through' : 'none')};
  color: ${colors.grey.s100};
`;

export const Icon = styled.Image`
  width: ${moderateScale(18)}px;
  height: ${moderateScale(18)}px;
  margin-left: ${moderateScale(10)}px;
`;
