import {
  CardContainer,
  CardDescription,
  CardRow,
  CardTitle,
  Checkbox,
  DateInput,
  SelectedDateText,
  DateWrapper,
  Icon,
} from './styles';

import {formatDate, formatTime} from '../../utils/dateFormat';
import React from 'react';
import {imgs} from '../../screens/imgs';
import {View} from 'react-native';

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
            <Icon source={imgs.calender} />
            <SelectedDateText>{formattedDate}</SelectedDateText>
          </DateInput>
          <View style={{marginRight: 30}} />
          <DateInput>
            <Icon source={imgs.clock} />
            <SelectedDateText>{formattedTime}</SelectedDateText>
          </DateInput>
        </DateWrapper>
      </CardRow>
    </CardContainer>
  );
};

export default Task;
