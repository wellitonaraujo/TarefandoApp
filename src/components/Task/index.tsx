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
import {Pressable, View, Animated} from 'react-native';
import React, {useEffect, useState} from 'react';

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
  const [isExpanded, setIsExpanded] = useState(false);
  const maxDate = new Date();

  maxDate.setDate(maxDate.getDate() + 7);

  const taskStyle = {
    opacity: isSelected ? 0.2 : 1,
    borderColor: isSelected ? 'transparent' : getColorForPriority(priority),
  };

  const toggleExpansion = () => {
    if (title.length > 35) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <CardContainer
      priority={priority}
      isExpanded={isExpanded}
      style={[taskStyle]}>
      {/* <CardDescription>{description}</CardDescription> */}

      <CheckBox
        value={isSelected}
        onValueChange={handleSelect}
        tintColors={{true: colors.primary.s300, false: colors.grey.s100}}
      />

      <DateWrapper>
        <Pressable onPress={toggleExpansion}>
          <CardTitle isSelected={isSelected}>
            {isExpanded
              ? title
              : title.length > 30
              ? title.substring(0, 35) + '...'
              : title}
          </CardTitle>
        </Pressable>

        <View style={{flexDirection: 'row'}}>
          <DateInput>
            <SelectedDateText isSelected={isSelected}>
              {formattedDate}
            </SelectedDateText>
          </DateInput>

          <DateInput>
            <SelectedDateText isSelected={isSelected}>
              {formattedTime}
            </SelectedDateText>
          </DateInput>
        </View>
      </DateWrapper>
    </CardContainer>
  );
};

export default Task;
