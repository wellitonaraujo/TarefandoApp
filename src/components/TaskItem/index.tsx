import { Swipeable } from 'react-native-gesture-handler';
import * as S from './styles';
import React from 'react';
import { Image, View } from 'react-native'; // Para importar o ícone de subtarefas

interface Subtask {
  id: string;
  name: string;
}

interface Task {
  id: string;
  name: string;
  date: string;
  subtasks?: Subtask[]; // Adiciona subtarefas
}

interface TaskItemProps {
  task: Task;
  onEdit: (id: string) => void;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  completed?: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete, completed = false }) => {

  const formatDate = (dateString: string): string => {
    const [day, month, year] = dateString.split('/').map((part) => parseInt(part, 10));
    const date = new Date(year, month - 1, day);
  
    if (isNaN(date.getTime())) {
      return 'Data inválida';
    }
  
    const formatter = new Intl.DateTimeFormat('pt-BR', {
      weekday: 'short',
      day: '2-digit',
      month: 'short', 
    });
  
    let formattedDate = formatter.format(date);
  
    formattedDate = formattedDate
      .replace(/(\d{2}), (.+)/, (_, day, month) => `${day}, de ${month.charAt(0).toUpperCase()}${month.slice(1)}`)
      .replace(/\b\w/g, (match) => match.toUpperCase())
      .replace('De ', 'de ');
  
    return formattedDate;
  };

  const isToday = (taskDate: string): boolean => {
    const [day, month, year] = taskDate.split('/').map((part) => parseInt(part, 10));
    const taskDateObj = new Date(year, month - 1, day);
    const today = new Date();

    return (
      taskDateObj.getDate() === today.getDate() &&
      taskDateObj.getMonth() === today.getMonth() &&
      taskDateObj.getFullYear() === today.getFullYear()
    );
  };

  const renderRightActions = (): JSX.Element => (
    <S.RightActionsContainer>
      {completed ? (
        <S.ActionButton backgroundColor="#E15659" onPress={() => onDelete(task.id)}>
          <S.ActionText>Deletar</S.ActionText>
        </S.ActionButton>
      ) : (
        <>
          <S.ActionButton backgroundColor="#ddaf58" onPress={() => onEdit(task.id)}>
            <S.ActionText>Editar</S.ActionText>
          </S.ActionButton>
          <S.ActionButton backgroundColor="#E15659" onPress={() => onDelete(task.id)}>
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
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
            <S.Date>
              {!isToday(task.date) && <S.TaskDate>{formatDate(task.date)}</S.TaskDate>}
            </S.Date>

            {task.subtasks && task.subtasks.length > 0 && (
              <Image
                source={require('../../assets/icons/subtask.png')}
                style={{ width: 10, height: 10}}
                tintColor={'#888888'}
                resizeMode="contain"
              />
            )}
          </View>
        </S.TaskWraper>
        <S.DragIcon source={require('../../assets/icons/drag.png')} resizeMode="contain" />
      </S.TaskItemContainer>
    </Swipeable>
  );
};

export default TaskItem;
