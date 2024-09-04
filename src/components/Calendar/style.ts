import styled from 'styled-components/native';
import { View, TouchableOpacity } from 'react-native';

export const CalendarContainer = styled(View)`
`;

export const DaysOfWeekContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;

  padding: 16px;
`;

export const DaysContainer = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
`;

interface DayItemProps {
  isCurrentMonth: boolean;
  isToday: boolean;
}

export const DayItem = styled(TouchableOpacity)<DayItemProps>`
  width: 14.28%;
  aspect-ratio: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ isToday }) => (isToday ? '#6E95A9' : 'transparent')};
  opacity: ${({ isCurrentMonth }) => (isCurrentMonth ? 1 : 0.5)};
  border-radius: ${({ isToday }) => (isToday ? "90px" : '0')};
  margin-bottom: 5px;
`;

export const Highlight = styled(View)`
  height: 5px;
  width: 60px;
  background-color: "#FFFFFF";
`;