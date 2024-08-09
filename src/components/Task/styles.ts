import { horizontalScale, moderateScale, verticalScale } from '@/src/utils/metrics';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import colors from '../../styles/colors';

interface CardContainerProps {
  priority: 'low' | 'average' | 'high';
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
  border-left-width: ${RFValue(2)}px;
  border-left-color: ${({priority}) => {
    switch (priority) {
      case 'low':
        return '#FF5701';
      case 'average':
        return '#00C31F';
      case 'high':
        return '#C30000';
      default:
        return '#000000';
    }
  }};
  width: 100%;
  height: ${verticalScale(45)}px;
  transition: max-height 0.3s ease;

`;

export const CardTitle = styled.Text<{
  isSelected: boolean;
}>`
  color: ${colors.title};
  font-size: ${moderateScale(14)}px;
  letter-spacing: 1.4px;
  text-decoration: ${({isSelected}) => (isSelected ? 'line-through' : 'none')};
`;

export const CardRow = styled.View`
  flex-direction: row;
  align-items: center;
  
`;

export const DateWrapper = styled.View`
  flex-direction: column;
  justify-content: space-between;
  margin-left: ${moderateScale(5)}px;
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
