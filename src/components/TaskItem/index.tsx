import { Swipeable } from 'react-native-gesture-handler';
import * as S from './styles';
import React from 'react';
import { View } from 'react-native';

interface Task {
  id: string;
  name: string;
  date: string;
}

interface TaskItemProps {
  task: Task;
  onEdit: (id: string) => void;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  completed?: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete, completed = false }) => {
  const renderRightActions = (): JSX.Element => (
    <S.RightActionsContainer>
      {completed ? (
        <S.ActionButton backgroundColor="#FF0000" onPress={() => onDelete(task.id)}>
          <S.ActionText>Deletar</S.ActionText>
        </S.ActionButton>
      ) : (
        <>
          <S.ActionButton backgroundColor="#FFA500" onPress={() => onEdit(task.id)}>
            <S.ActionText>Editar</S.ActionText>
          </S.ActionButton>
          <S.ActionButton backgroundColor="#FF0000" onPress={() => onDelete(task.id)}>
            <S.ActionText>Deletar</S.ActionText>
          </S.ActionButton>
        </>
      )}
    </S.RightActionsContainer>
  );

   return (
    <Swipeable renderRightActions={renderRightActions}>
      <S.TaskItemContainer style={{ opacity: completed ? 0.4 : 1 }}>
        <S.TaskWraper>
          <S.TaskText style={{ textDecorationLine: completed ? 'line-through' : 'none' }}>
            {task.name}
          </S.TaskText>
         <S.Date>
          <S.DateIcon source={require('../../assets/icons/date-light.png')} />
          <S.TaskDate>{task.date}</S.TaskDate>
         </S.Date>
        </S.TaskWraper>
        <S.DragIcon source={require('../../assets/icons/drag.png')} />
      </S.TaskItemContainer>
    </Swipeable>
  );
};

export default TaskItem;
