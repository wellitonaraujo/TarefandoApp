import React from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import * as S from './styles';
import { Image, View } from 'react-native';
import { useTaskItem } from './hook/useTaskItem';

interface Subtask {
  id: string;
  name: string;
}

interface Task {
  id: string;
  name: string;
  date: string;
  subtasks?: Subtask[];
}

interface TaskItemProps {
  task: Task;
  onEdit: (id: string) => void;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  completed?: boolean;
  onPress: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete, completed = false, onPress }) => {
  const { formatDate, isToday, renderRightActions, taskOpacity, textDecoration } = useTaskItem({
    task,
    onEdit,
    onDelete,
    completed,
  });

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <S.TaskItemContainer style={{ opacity: taskOpacity }} onPress={onPress}>
        <S.TaskWraper>
          <S.TaskText style={{ textDecorationLine: textDecoration }}>{task.name}</S.TaskText>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
            <S.Date>
              {!isToday(task.date) && <S.TaskDate>{formatDate(task.date)}</S.TaskDate>}
            </S.Date>

            {task.subtasks && task.subtasks.length > 0 ? (
              <Image
                source={require('../../assets/icons/subtask.png')}
                style={{ width: 10, height: 10 }}
                tintColor={'#888888'}
                resizeMode="contain"
              />
            ) : null}

          </View>
        </S.TaskWraper>
      </S.TaskItemContainer>
    </Swipeable>
  );
};

export default TaskItem;
