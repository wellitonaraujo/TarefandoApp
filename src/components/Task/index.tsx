import {
  SelectedDateText,
  DateWrapper,
  CardContainer,
  CardRow,
  CardTitle,
  DateInput,
  Icon,
  TaskContainer,
} from './styles';

import {getColorForPriority} from '../../utils/getColorForPriority';
import {formatDate, formatTime} from '../../utils/dateFormat';
import colors from '../../styles/colors';
import {Image, Pressable, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomCheckBox from '../CustomCheckBox';
import { imgs } from '../../screens/imgs';

interface TaskProps {
  title: string;
  description: string;
  priority: 'low' | 'average' | 'high';
  date: Date;
  handleSelect: () => Promise<void>;
  isSelected: boolean;
  onPress?: () => void;
  onDelete: () => void;
  dateColor?: string; 
}

const Task: React.FC<TaskProps> = ({
  title,
  priority,
  date,
  handleSelect,
  isSelected,
  onPress,
  onDelete,
  dateColor = colors.grey.s100
}) => {
  const formattedDate = formatDate(date);
  const maxDate = new Date();

  maxDate.setDate(maxDate.getDate() + 365);

  const taskStyle = {
    opacity: isSelected ? 0.3 : 1,
    borderColor: isSelected ? 'transparent' : getColorForPriority(priority),
  };

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  return  (
    <Pressable onPress={handlePress}>
      <TaskContainer>
      <CustomCheckBox
          value={isSelected}
          onValueChange={handleSelect}
          tintColors={{ 
            true: colors.priority.average, 
            false: colors.grey.s100 }}
        />
        <CardContainer style={[taskStyle]}>
       
          <View style={{ opacity: isSelected ? 1 : 1 }}>
          </View>
          <DateWrapper>
            <Pressable onPress={handlePress}>
            <CardTitle isSelected={isSelected}>
              {title.length <= 25 ? title : title.substring(0, 25) + '...'}
            </CardTitle>
            </Pressable>

            {formattedDate !== formatDate(new Date()) && (
              <View style={{ flexDirection: 'row' }}>
                <DateInput>
                  <SelectedDateText style={{ color: dateColor }} isSelected={isSelected}>
                    {formattedDate}
                  </SelectedDateText>
                </DateInput>
              </View>
            )}
          </DateWrapper>
        </CardContainer>
   
        <TouchableOpacity onPress={onDelete}>
            <Icon source={imgs.delete}/>
        </TouchableOpacity>

      </TaskContainer>
    </Pressable>
  );
};

export default Task;
