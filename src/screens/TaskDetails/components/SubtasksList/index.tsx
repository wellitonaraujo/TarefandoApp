import { View } from 'react-native';
import CustomCheckBox from '@/src/components/CustomCheckBox';
import * as S from './styles';
import colors from '@/src/themes/colors';

interface SubtaskItemProps {
  id: string;
  text: string;
  completed: boolean;
  onDelete: () => void;
  onComplete: () => void;
}

export const SubtaskItem = ({ id, text, completed, onDelete, onComplete }: SubtaskItemProps) => {
  return (
    <S.SubtaskContainer>
      <S.SubtaskLeft>
        <CustomCheckBox
          value={completed}
          onValueChange={() => onComplete()}
        />
        <S.SubtaskText style={{
          textDecorationLine: completed ? 'line-through' : 'none',
          opacity: completed ? 0.5 : 1,
        }}>
          {text}
        </S.SubtaskText>
      </S.SubtaskLeft>
      <S.DeleteButton onPress={onDelete}>
        <S.DeleteIcon tintColor={colors.gray_300} source={require('../../assets/icons/close.png')} />
      </S.DeleteButton>
    </S.SubtaskContainer>
  );
};

export const SubtasksList = ({ 
  subtasks,
  onDeleteSubtask,
  onCompleteSubtask
}: {
  subtasks: Array<{ id: string; text: string; completed: boolean }>;
  onDeleteSubtask: (subtaskId: string) => void;
  onCompleteSubtask: (subtaskId: string) => void;
}) => {
  return (
    <View>
      {subtasks.map((subtask) => (
        <SubtaskItem
          key={subtask.id}
          {...subtask}
          onDelete={() => onDeleteSubtask(subtask.id)}
          onComplete={() => onCompleteSubtask(subtask.id)}
        />
      ))}
    </View>
  );
};