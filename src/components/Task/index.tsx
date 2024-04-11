import {
  CardContainer,
  CardDescription,
  CardRow,
  CardTitle,
  DateInput,
  SelectedDateText,
  DateWrapper,
  Icon,
} from './styles';

import {formatDate, formatTime} from '../../utils/dateFormat';
import CheckBox from '@react-native-community/checkbox';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import React from 'react';
import {imgs} from '../../screens/imgs';
import {View} from 'react-native';
import colors from '../../styles/colors';

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
  description,
  priority,
  date,
  handleSelect,
  isSelected,
}) => {
  const formattedDate = formatDate(date);
  const formattedTime = formatTime(date);

  const maxDate = new Date();

  maxDate.setDate(maxDate.getDate() + 7);

  return (
    <CardContainer priority={priority}>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      <CardRow>
        <CheckBox
          value={isSelected}
          onValueChange={handleSelect}
          tintColors={{true: colors.primary.s300, false: colors.grey.s100}}
        />
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
