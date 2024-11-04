import { Swipeable } from 'react-native-gesture-handler';
import * as S from './styles';
import React from 'react';

interface Task {
  id: string;
  name: string;
}

interface TaskItemProps {
  task: Task;
  onEdit: (id: string) => void;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  completed?: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onComplete, onDelete, completed = false }) => {
  const renderRightActions = (): JSX.Element => (
    <S.RightActionsContainer>
      {completed ? (
        <S.ActionButton backgroundColor="#FF0000" onPress={() => onDelete(task.id)}>
          <S.ActionText>Deletar</S.ActionText>
        </S.ActionButton>
      ) : (
        <>
          <S.ActionButton backgroundColor="#4CAF50" onPress={() => onComplete(task.id)}>
            <S.ActionText>Concluir</S.ActionText>
          </S.ActionButton>
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
      <S.TaskItemContainer style={{ opacity: completed ? 0.5 : 1 }}>
        <S.TaskText style={{ textDecorationLine: completed ? 'line-through' : 'none' }}>
          {task.name}
        </S.TaskText>
        <S.DragIcon source={require('../../assets/icons/drag.png')} />
      </S.TaskItemContainer>
    </Swipeable>
  );
};

export default TaskItem;
