import { Pressable, TouchableOpacity } from 'react-native';
import CustomCheckBox from '../CustomCheckBox';
import {imgs} from '../../screens/imgs';;
import {useTask} from './useTask';
import * as S from './styles';

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
  dateColor,
}) => {
  const {
    formattedDate,
    taskStyle,
    handlePress,
    showFormattedDate,
  } = useTask({
    title,
    priority,
    date,
    isSelected,
    dateColor,
    onPress,
  });

  return (
    <Pressable onPress={handlePress}>
      <S.TaskContainer>
        <S.CardContainer>
          <CustomCheckBox 
            value={isSelected} 
            onValueChange={handleSelect} 
          />
          <S.DateWrapper style={[taskStyle]}>
            <Pressable onPress={handlePress}>
              <S.CardTitle isSelected={isSelected}>
                {
                  title.length <= 25 
                  ? title 
                  : title.substring(0, 27) + '...'
                }
              </S.CardTitle>
            </Pressable>

            {showFormattedDate && (
              <S.DateRow>
                <S.DateInput>
                  <S.SelectedDateText 
                    style={{color: dateColor}} 
                    isSelected={isSelected}
                  >
                    {formattedDate}
                  </S.SelectedDateText>
                </S.DateInput>
              </S.DateRow>
            )}
          </S.DateWrapper>
        </S.CardContainer>
        <TouchableOpacity onPress={onDelete}>
          <S.Icon source={imgs.delete} />
        </TouchableOpacity>
      </S.TaskContainer>
    </Pressable>
  );
};

export default Task;
