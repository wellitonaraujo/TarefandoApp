import {getColorForPriority} from '../../utils/getColorForPriority';
import {formatDate} from '../../utils/dateFormat';
import {useMemo, useCallback} from 'react';
import colors from '../../styles/colors';

interface UseTaskProps {
  title: string;
  priority: 'low' | 'average' | 'high';
  date: Date;
  isSelected: boolean;
  dateColor?: string;
  onPress?: () => void;
}

export const useTask = ({
  priority,
  date,
  isSelected,
  dateColor = colors.grey.s100,
  onPress,
}: UseTaskProps) => {
  const formattedDate = useMemo(() => formatDate(date), [date]);
  const taskStyle = useMemo(() => ({
    opacity: isSelected ? 0.2 : 1,
    borderColor: isSelected ? 'transparent' : getColorForPriority(priority),
  }), [isSelected, priority]);

  const handlePress = useCallback(() => {
    if (onPress) {
      onPress();
    }
  }, [onPress]);

  const showFormattedDate = formattedDate !== formatDate(new Date());

  return {
    formattedDate,
    taskStyle,
    handlePress,
    showFormattedDate,
    dateColor,
  };
};
