import styled from 'styled-components/native';
import colors from '../../styles/colors';

interface CardContainerProps {
  priority: 'low' | 'average' | 'high';
  isExpanded: boolean;
}

export const CardContainer = styled.View<CardContainerProps>`
  background-color: ${colors.grey.s300};
  border-radius: 8px;
  padding: 6px;
  margin: 7px 0;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-bottom-width: 5px;
  border-bottom-color: ${({priority}) => {
    switch (priority) {
      case 'low':
        return '#CCFE03';
      case 'average':
        return '#00C31F';
      case 'high':
        return '#C30000';
      default:
        return '#000000';
    }
  }};
  max-height: ${({isExpanded}) => (isExpanded ? 'none' : '70px')};

  transition: max-height 0.3s ease;
  padding-bottom: 10px;
`;

export const CardTitle = styled.Text<{
  isSelected: boolean;
}>`
  color: ${colors.title};
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 1.4px;
  padding-right: 50px;
  text-decoration: ${({isSelected}) => (isSelected ? 'line-through' : 'none')};
`;

export const CardDescription = styled.Text`
  color: ${colors.grey.s100};
  font-size: 14px;
  margin-bottom: 16px;
  letter-spacing: 1.3px;
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
  font-size: 12px;
  margin-top: 4px;
  letter-spacing: 1.8px;
  text-decoration: ${({isSelected}) => (isSelected ? 'line-through' : 'none')};
`;

export const Icon = styled.Image`
  width: 15px;
  height: 15px;
  opacity: 0.6;
`;
