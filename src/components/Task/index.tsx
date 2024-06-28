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
import colors from '../../styles/colors';
import {Pressable, View} from 'react-native';
import React, {useState} from 'react';
import CustomCheckBox from '../CustomCheckBox';

interface TaskProps {
  title: string;
  description: string;
  priority: 'low' | 'average' | 'high';
  date: Date;
  handleSelect: () => Promise<void>;
  isSelected: boolean;
  onPress?: () => void;
}

const Task: React.FC<TaskProps> = ({
  title,
  priority,
  date,
  handleSelect,
  isSelected,
  onPress,
}) => {
  const formattedDate = formatDate(date);
  const formattedTime = formatTime(date);
  const [isExpanded, setIsExpanded] = useState(false);
  const maxDate = new Date();

  maxDate.setDate(maxDate.getDate() + 365);

  const taskStyle = {
    opacity: isSelected ? 0.2 : 1,
    borderColor: isSelected ? 'transparent' : getColorForPriority(priority),
  };

  const toggleExpansion = () => {
    if (title.length > 35) {
      setIsExpanded(!isExpanded);
    }
  };

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <Pressable onPress={handlePress}>
      <CardContainer priority={priority} style={[taskStyle]}>
        <View style={{opacity: isSelected? 1 : 1}}>
        
          <CustomCheckBox
              value={isSelected}
              onValueChange={handleSelect}
              tintColors={{ true: colors.primary.s300, false: colors.grey.s100 }}
            />

        </View>
        <DateWrapper>
              <Pressable onPress={handlePress}>
                <CardTitle isSelected={isSelected}>
                  {isExpanded
                    ? title
                    : title.length > 30
                    ? title.substring(0, 40) + '...'
                    : title}
                </CardTitle>
              </Pressable>

              {/* Renderiza a data apenas se a tarefa não for para "Hoje" */}
              {formattedDate !== formatDate(new Date()) && (
                <View style={{flexDirection: 'row'}}>
                  <DateInput>
                    <SelectedDateText isSelected={isSelected}>
                      {formattedDate}
                    </SelectedDateText>
                  </DateInput>

                  {/* <DateInput>
                  <SelectedDateText isSelected={isSelected}>
                    {formattedTime}
                  </SelectedDateText>
                </DateInput> */}
                </View>
              )}
        </DateWrapper>
      </CardContainer>
    </Pressable>
  );
};

export default Task;
