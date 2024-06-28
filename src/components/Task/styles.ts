import styled from 'styled-components/native';
import colors from '../../styles/colors';
import { RFValue } from 'react-native-responsive-fontsize';

interface CardContainerProps {
  priority: 'low' | 'average' | 'high';
  // isExpanded: boolean;
  isSelected?: boolean;
}

export const TaskContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CardContainer = styled.View<CardContainerProps>`
  flex: 1;
  background-color: ${colors.grey.s300};
  border-radius: ${RFValue(5)}px;;
  padding: ${RFValue(10)}px;
  margin: 10px 0;
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
  height: ${RFValue(45)}px;
  transition: max-height 0.3s ease;

`;

export const CardTitle = styled.Text<{
  isSelected: boolean;
}>`
  color: ${colors.title};
  font-size: ${RFValue(13)}px;
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
  margin-left: 10px;
`;

export const DateInput = styled.Pressable`
  width: 50px;
`;

export const SelectedDateText = styled.Text<{isSelected: boolean}>`
  color: ${colors.title};
  font-size: 10px;
  margin-top: 4px;
  letter-spacing: 1.8px;
  text-decoration: ${({isSelected}) => (isSelected ? 'line-through' : 'none')};
  color: ${colors.grey.s100};
`;

export const Icon = styled.Image`
  width: 15px;
  height: 15px;
  opacity: 0.6;
`;
