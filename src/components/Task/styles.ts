import styled from 'styled-components/native';
import colors from '../../styles/colors';

interface CardContainerProps {
  priority: 'low' | 'average' | 'high';
}

export const CardContainer = styled.View<CardContainerProps>`
  background-color: ${colors.grey.s300};
  border-radius: 8px;
  padding: 16px;
  margin: 15px 0;
  max-height: 174px;
  border-bottom-width: 10px;
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
`;

export const CardTitle = styled.Text`
  color: ${colors.title};
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  letter-spacing: 1.3px;
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

export const Checkbox = styled.Pressable<{isSelected: boolean}>`
  width: 24px;
  height: 24px;
  border: 1px solid
    ${({isSelected}) => (isSelected ? colors.primary.s300 : colors.grey.s100)};
  border-radius: 3px;
  margin-right: 8px;
  justify-content: center;
  align-items: center;
`;

export const DateWrapper = styled.View`
  flex-direction: row;
`;

export const DateInput = styled.Pressable`
  border-radius: 40px;
  padding: 0 5px;
  z-index: 1;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  border: solid 1px ${colors.grey.s200};
  width: 85px;
  height: 45px;
`;

export const SelectedDateText = styled.Text`
  color: ${colors.title};
  font-size: 17px;
`;

export const Icon = styled.Image`
  width: 18px;
  height: 18px;
  margin: 5px;
`;
