import React from 'react';
import { ActivityIndicator, Image, TouchableOpacity, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/AppNavigator';
import useTaskManager from '../Home/hooks/useTaskManager';
import * as S from './styles';

type TaskDetailsRouteProp = RouteProp<RootStackParamList, 'TaskDetails'>;

interface TaskDetailsProps {
  route: TaskDetailsRouteProp;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ route }) => {
  const { id, name, date, subtasks: initialSubtasks } = route.params;
  const { tasks, handleDeleteSubtask, loadingTasks  } = useTaskManager();

  const task = tasks.find(t => t.id === id);
  const subtasks = task?.subtasks || [];

  const handleDelete = async (subtaskId: string) => {
    if (!subtaskId) {
      console.error("ID da subtarefa não encontrado!");
      return;
    }
    await handleDeleteSubtask(id, subtaskId);
  };
  
  const isEmptyStateVisible = subtasks.length === 0;

  return (
    <S.Container>
      <S.Title>{name}</S.Title>

      {loadingTasks ? (
        <View>
          <ActivityIndicator size="large" color="#1A72F3" />
        </View>
      ) : isEmptyStateVisible ? (
       <></>
      ) : (
        <S.OptionsContainer>
          {subtasks.map((subtask, index) => (
            <S.SubtaskContainer key={index}>
              <S.SubtaskLeft>
                <S.RadioButton />
                <S.SubtaskText>{subtask.name}</S.SubtaskText>
              </S.SubtaskLeft>
              <S.DeleteButton onPress={() => handleDelete(subtask.id)}>
                <S.DeleteIcon tintColor={'#D2D2D2'} source={require('../../assets/icons/close.png')} />
              </S.DeleteButton>
            </S.SubtaskContainer>
          ))}
        </S.OptionsContainer>
      )}

      <TouchableOpacity>
        <S.AddSubtaskText>Adicionar subtarefa</S.AddSubtaskText>
      </TouchableOpacity>

      <S.OptionsContainer>
        <S.OptionRow>
          <S.Icon tintColor={'#D2D2D2'} source={require('../../assets/icons/date-solid.png')} />
          <S.OptionText>Finaliza em</S.OptionText>
          <S.OptionValue>{date}</S.OptionValue>
        </S.OptionRow>
        <S.Separator />
        <S.OptionRow>
          <S.Icon tintColor={'#D2D2D2'} source={require('../../assets/icons/repeat-rounded.png')} />
          <S.OptionText>Repetir</S.OptionText>
          <S.OptionValue>Não</S.OptionValue>
        </S.OptionRow>
        <S.Separator />
        <S.OptionRow>
          <S.Icon tintColor={'#D2D2D2'} source={require('../../assets/icons/notification-fill.png')} />
          <S.OptionText>Lembrar</S.OptionText>
          <S.OptionValue>Não</S.OptionValue>
        </S.OptionRow>
      </S.OptionsContainer>

      <S.ActionsContainer>
        <S.ActionButton>
          <S.ActionIcon tintColor={'#D2D2D2'} source={require('../../assets/icons/check-fill.png')} />
          <S.ActionText>Concluir</S.ActionText>
        </S.ActionButton>
        <S.ActionButton>
          <S.ActionIcon tintColor={'#D2D2D2'} source={require('../../assets/icons/share-filled.png')} />
          <S.ActionText>Compartilhar</S.ActionText>
        </S.ActionButton>
        <S.ActionButton>
          <S.ActionIcon tintColor={'#D2D2D2'} source={require('../../assets/icons/delete-filled.png')} />
          <S.ActionText>Deletar</S.ActionText>
        </S.ActionButton>
      </S.ActionsContainer>
    </S.Container>
  );
};

export default TaskDetails;
