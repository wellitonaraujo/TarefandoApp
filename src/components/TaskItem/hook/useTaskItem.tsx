import { useCallback, useMemo } from 'react';
import * as S from '../styles';
import React from 'react';

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

interface UseTaskItemProps {
  task: Task;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  completed?: boolean;
}

export const useTaskItem = ({ task, onEdit, onDelete, completed }: UseTaskItemProps) => {
  const formatDate = useCallback((dateString: string): string => {
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
  }, []);

  const isToday = useCallback((taskDate: string): boolean => {
    const [day, month, year] = taskDate.split('/').map((part) => parseInt(part, 10));
    const taskDateObj = new Date(year, month - 1, day);
    const today = new Date();

    return (
      taskDateObj.getDate() === today.getDate() &&
      taskDateObj.getMonth() === today.getMonth() &&
      taskDateObj.getFullYear() === today.getFullYear()
    );
  }, []);

  const renderRightActions = useCallback(() => (
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
  ), [completed, onDelete, onEdit, task.id]);

  const taskOpacity = useMemo(() => (completed ? 0.4 : 1), [completed]);

  const textDecoration = useMemo(() => (completed ? 'line-through' : 'none'), [completed]);

  return {
    formatDate,
    isToday,
    renderRightActions,
    taskOpacity,
    textDecoration,
  };
};
