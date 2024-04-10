import {
  CardContainer,
  CardDescription,
  CardRow,
  CardTitle,
  Checkbox,
  DateInput,
  Line,
  SelectedDateText,
  DateWrapper,
} from './styles';

import {formatDate, formatTime} from '../../utils/dateFormat';
import React from 'react';

interface TaskProps {
  title: string;
  description: string;
  priority: 'low' | 'average' | 'high';
  date: Date;
}

const Task: React.FC<TaskProps> = ({title, description, priority, date}) => {
  const formattedDate = formatDate(date);
  const formattedTime = formatTime(date);

  const maxDate = new Date();

  maxDate.setDate(maxDate.getDate() + 7);

  return (
    <CardContainer priority={priority}>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      <CardRow>
        <Checkbox />
        <DateWrapper>
          <DateInput>
            <SelectedDateText>{formattedDate}</SelectedDateText>
          </DateInput>
          <Line />
          <DateInput>
            <SelectedDateText>{formattedTime}</SelectedDateText>
          </DateInput>
        </DateWrapper>
      </CardRow>
    </CardContainer>
  );
};

export default Task;
