import { Task } from '../context/TaskContext';
import { Share } from 'react-native';
import { useCallback } from 'react';

export const useTaskActions = () => {
  const shareTask = useCallback(async (task: Task) => {
    if (!task) return;
    
    const formattedSubtasks = task.subtasks.map(subtask => 
      `${subtask.completed ? '(x)' : '( )'} ${subtask.name}`
    ).join('\n');
    
    const message = `
${task.name}
Prazo: ${task.date}
${task.subtasks.length > 0 ? `\nSubtarefas:\n${formattedSubtasks}` : '\nSem subtarefas'}
`;
    
    try {
      await Share.share({
        message,
      });
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
    }
  }, []);
  

  return { shareTask };
};