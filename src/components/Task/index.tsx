import {
  SelectedDateText,
  DateWrapper,
  CardContainer,
  CardRow,
  CardTitle,
  DateInput,
  Icon,
} from './styles';

import {getColorForPriority} from '../../utils/getColorForPriority';
import {formatDate, formatTime} from '../../utils/dateFormat';
import CheckBox from '@react-native-community/checkbox';
import colors from '../../styles/colors';
import {imgs} from '../../screens/imgs';
import {View} from 'react-native';
import React from 'react';

interface TaskProps {
  title: string;
  description: string;
  priority: 'low' | 'average' | 'high';
  date: Date;
  handleSelect: () => void;
  isSelected: boolean;
}

const Task: React.FC<TaskProps> = ({
  title,
  priority,
  date,
  handleSelect,
  isSelected,
}) => {
  const formattedDate = formatDate(date);
  const formattedTime = formatTime(date);

  const maxDate = new Date();

  maxDate.setDate(maxDate.getDate() + 7);

  const taskStyle = {
    opacity: isSelected ? 0.2 : 1,
    borderColor: isSelected ? 'transparent' : getColorForPriority(priority),
  };

  return (
    <CardContainer priority={priority} style={[taskStyle]}>
      <CardTitle>{title}</CardTitle>
      {/* <CardDescription>{description}</CardDescription> */}
      <CardRow>
        <CheckBox
          value={isSelected}
          onValueChange={handleSelect}
          tintColors={{true: colors.primary.s300, false: colors.grey.s100}}
        />
        <View style={{flex: 1}} />
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
        <View style={{flex: 1}} />
      </CardRow>
    </CardContainer>
  );
};

export default Task;
