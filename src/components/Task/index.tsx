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
  const formattedTime = formatTime(date);
  const [isExpanded, setIsExpanded] = useState(false);
  const maxDate = new Date();

  maxDate.setDate(maxDate.getDate() + 365);

  const taskStyle = {
    opacity: isSelected ? 0.3 : 1,
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

  return  (
    <Pressable onPress={handlePress}>
      <TaskContainer>
        <CardContainer priority={priority} style={[taskStyle]}>
        <CustomCheckBox
          value={isSelected}
          onValueChange={handleSelect}
          tintColors={{ true: colors.primary.s300, false: colors.grey.s100 }}
        />
          <View style={{ opacity: isSelected ? 1 : 1 }}>
          </View>
          <DateWrapper>
            <Pressable onPress={handlePress}>
            <CardTitle isSelected={isSelected}>
              {title.length <= 30 ? title : title.substring(0, 30) + '...'}
            </CardTitle>
            </Pressable>

            {/* Renderiza a data apenas se a tarefa não for para "Hoje" */}
            {formattedDate !== formatDate(new Date()) && (
              <View style={{ flexDirection: 'row' }}>
                <DateInput>
                  <SelectedDateText style={{ color: dateColor }} isSelected={isSelected}>
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
   
        <TouchableOpacity onPress={onDelete}>
            <Icon source={imgs.delete}/>
        </TouchableOpacity>

      </TaskContainer>
    </Pressable>
  );
};

export default Task;
