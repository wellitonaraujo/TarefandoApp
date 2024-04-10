import styled from 'styled-components/native';
import colors from '../../styles/colors';

interface CardContainerProps {
  priority: 'low' | 'average' | 'high';
}

export const CardContainer = styled.View<CardContainerProps>`
  background-color: ${colors.grey.s200};
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

export const Checkbox = styled.View`
  width: 24px;
  height: 24px;
  border: 1px solid ${colors.grey.s100};
  border-radius: 3px;
  margin-right: 8px;
`;

export const DateWrapper = styled.View`
  width: 120px;
  height: 36px;
  border-radius: 40px;
  background-color: ${colors.grey.s300};
  flex-direction: row;
  justify-content: space-around;
`;

export const DateInput = styled.Pressable`
  border-radius: 40px;
  z-index: 1;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const SelectedDateText = styled.Text`
  color: ${colors.title};
  font-size: 15px;
`;

export const Line = styled.View`
  width: 7px;
  height: 2px;
  border-radius: 2px;
  background-color: ${colors.grey.s100};
  justify-content: center;
  align-items: center;
  align-self: center;
`;
