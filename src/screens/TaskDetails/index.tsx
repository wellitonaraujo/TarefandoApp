import { ActivityIndicator, TextInput, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback, Pressable, Alert, Platform, Share } from 'react-native';
import { NavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RootStackParamList } from '@/src/navigation/AppNavigator';
import CustomCheckBox from '@/src/components/CustomCheckBox';
import { Task, useTaskManager } from '@/src/context/TaskContext';
import { RootParamList } from '@/src/navigation/types';
import { useTaskDates } from './hook/useTaskDates';
import Toast from 'react-native-toast-message';
import * as S from './styles';
import colors from '@/src/themes/colors';

type TaskDetailsRouteProp = RouteProp<RootStackParamList, 'TaskDetails'>;

interface TaskDetailsProps {
  route: TaskDetailsRouteProp;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ route }) => {
  const navigation = useNavigation<NavigationProp<RootParamList>>();
  const { id, name, date } = route.params;

  const { tasks, handleDeleteSubtask, handleDeleteTask, loadingTasks, handleCompleteSubtask, saveTasks } = useTaskManager();
  const { getTaskDate, updateTaskDate } = useTaskDates();

  const task = tasks.find(t => t.id === id);
  const subtasks = task?.subtasks || [];

  const [showDatePicker, setShowDatePicker] = useState(false); 
  const [newSubtask, setNewSubtask] = useState('');
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const inputRefs = useRef<TextInput>(null);

  const [editableName, setEditableName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);
  
  const [localDate, setLocalDate] = useState<string>(() => {
    return getTaskDate(id);
  });

  const [newDate, setNewDate] = useState<Date | null>(() => {
    if (date) {
      const parsedDate = new Date(date);
      return isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
    }
    return new Date();
  });

  const [repetition, setRepetition] = useState<'daily' | 'weekly' | 'monthly' | 'none'>(() => {
    return task?.repetition || 'none';
  });

  const handleAddSubtask = useCallback(async () => {
    if (!newSubtask.trim()) return;
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex < 0) return;
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = {
        ...updatedTasks[taskIndex],
        subtasks: [
            ...(updatedTasks[taskIndex].subtasks || []),
            {
                id: Date.now().toString(),
                name: newSubtask.trim(),
                completed: false
            }
        ],
    };
    await saveTasks(updatedTasks);
}, [id, newSubtask]);


  const calculateNextDate = (currentDate: string, repetition: string): string => {
    const date = parseDate(currentDate);
    const nextDate = new Date(date);
  
    switch (repetition) {
      case 'daily':
        nextDate.setDate(nextDate.getDate() + 1);
        break;
      case 'weekly':
        nextDate.setDate(nextDate.getDate() + 7);
        break;
      case 'monthly':
        nextDate.setMonth(nextDate.getMonth() + 1);
        break;
    }
  
    return formatDate(nextDate);
  };

  const getDateLabel = () => {
    return localDate;
  };
  
  const handleRepetitionChange = async (newRepetition: 'daily' | 'weekly' | 'monthly' | 'none') => {
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex < 0) return;

    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = {
        ...updatedTasks[taskIndex],
        repetition: newRepetition,
    };

    if (newRepetition !== 'none') {
        let nextDate = calculateNextDate(updatedTasks[taskIndex].date, newRepetition);

        while (parseDate(nextDate) < new Date()) {
            nextDate = calculateNextDate(nextDate, newRepetition);
        }

        updatedTasks[taskIndex] = {
            ...updatedTasks[taskIndex],
            date: nextDate,
        };
    }

    await saveTasks(updatedTasks);
    setRepetition(newRepetition);
  };


  useEffect(() => {
    setLocalDate(getTaskDate(id));
  }, [id, getTaskDate]);
  

  const handleShowInput = () => {
    setShowInput(true);
    setTimeout(() => inputRef.current?.focus(), 10);
  };

  const handleBlurSubtask = async () => {
    if (newSubtask.trim()) {
      await handleAddSubtask();
    } else {
      setShowInput(false);
    }
  };

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
    setShowInput(false);
  };
  
  const handleNameBlur = async () => {
    const trimmedName = editableName.trim();
  
    if (trimmedName === "") {
      Toast.show({
        type: "error",
        text1: "O nome não pode ficar vazio",
        position: "bottom",
        visibilityTime: 3000,
        autoHide: true,
      });
      
      return;
    }
  
    if (trimmedName !== name) {
      const taskIndex = tasks.findIndex((t) => t.id === id);
      if (taskIndex < 0) return;
  
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex] = {
        ...updatedTasks[taskIndex],
        name: trimmedName,
      };
  
      await saveTasks(updatedTasks);
    }
    setIsEditing(false);
  };
  
  const handleCompleteAllSubtasks = async () => {
    if (subtasks.length === 0) {
      Toast.show({
        type: 'success',
        text1: 'Não há subtarefas para concluir',
        position: "bottom",
        visibilityTime: 3000,
        autoHide: true,
      });
  
      return;
    }
  
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex < 0) return;
  
    const updatedTasks = [...tasks];
    const updatedSubtasks = updatedTasks[taskIndex].subtasks?.map(subtask => ({
      ...subtask,
      completed: true
    }));
  
    const allSubtasksCompleted = updatedSubtasks?.every(subtask => subtask.completed);
  
    if (allSubtasksCompleted) {
      updatedTasks[taskIndex] = {
        ...updatedTasks[taskIndex],
        completed: true,
        subtasks: updatedSubtasks,
      };
    } else {
      updatedTasks[taskIndex] = {
        ...updatedTasks[taskIndex],
        subtasks: updatedSubtasks,
      };
    }
  
    await saveTasks(updatedTasks);
  };
  
  const handleDeleteAllSubtasks = async () => {
    Alert.alert(
      'Confirmar Exclusão', 
      'Deletar esta tarefa e todas as suas subtarefas? Esta ação não pode ser desfeita.', 
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Exclusão cancelada'),
          style: 'cancel',
        },
        {
          text: 'Deletar',
          onPress: async () => {
            handleDeleteTask(id);
            navigation.navigate("Home")
          },
        },
      ],
      { cancelable: false }
    );
  };

  const parseDate = (dateString: string): Date => {
    const [day, month, year] = dateString.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    return isNaN(date.getTime()) ? new Date() : date;
  };
  
  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = formatDate(selectedDate);
      setLocalDate(formattedDate);
      updateTaskDate(id, formattedDate);
    }
  };

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleShareTask = async () => {
    if (!task) return;
  
    const formattedSubtasks = subtasks
      .map(subtask => `${subtask.completed ? '(x)' : '( )'} ${subtask.name}`)
      .join('\n');
  
    const message = `
  ${task.name}
  Prazo: ${localDate}
  ${subtasks.length > 0 ? `\nSubtarefas:\n${formattedSubtasks}` : '\nSem subtarefas'}
    `;
  
    try {
      await Share.share({
        message,
      });
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
      <S.Container showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => setIsEditing(true)}>
            <S.Title style={{ color: isEditing ? "transparent" : "transparent" }}>
              {editableName}
            </S.Title>
            <S.NameTextInput
              ref={inputRefs}
              value={editableName}
              onChangeText={setEditableName}
              onBlur={handleNameBlur}
              autoFocus={isEditing}
              maxLength={80}
              multiline
              style={{
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
        </Pressable>

        {loadingTasks ? (
          <View>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <S.OptionsContainer>
            {subtasks.map((subtask, index) => (
              <S.SubtaskContainer key={index}>
                <S.SubtaskLeft>
                  <CustomCheckBox
                    value={subtask.completed}
                    onValueChange={() => handleCompleteSubtask(id, subtask.id)}
                  />
                  <S.SubtaskText
                    style={{
                      textDecorationLine: subtask.completed ? 'line-through' : 'none',
                      opacity: subtask.completed ? 0.5 : 1,
                    }}
                  >
                    {subtask.name}
                  </S.SubtaskText>
                </S.SubtaskLeft>
                <S.DeleteButton onPress={() => handleDeleteSubtask(id, subtask.id)}>
                  <S.DeleteIcon tintColor={colors.gray_300} source={require('../../assets/icons/close.png')} />
                </S.DeleteButton>
              </S.SubtaskContainer>
            ))}
          </S.OptionsContainer>
        )}

        {showInput && (
          <S.AddSubtaskInput
            ref={inputRef}
            value={newSubtask}
            placeholder='Insira a subtarefa'
            onChangeText={setNewSubtask}
            onBlur={handleBlurSubtask}
            onSubmitEditing={handleAddSubtask}
            returnKeyType="done"
            placeholderTextColor={colors.gray_300}
          />
        )}

        {!showInput && (
          <>
            <S.AddSubtaskText  onPress={handleShowInput}>+ Adicionar Subtarefa</S.AddSubtaskText>
          </>
        )}

        <S.OptionsContainer>
          <S.OptionRow>
            <S.Icon resizeMode="contain" tintColor={colors.gray_400} source={require('../../assets/icons/calendar-outline.png')} />
            <S.OptionText>Prazo</S.OptionText>
            <S.OptionValue 
            onPress={() => {setShowDatePicker(true)}} 
            style={{ color: repetition ? colors.gray_400 : colors.primary }}>
            {getDateLabel()}
          </S.OptionValue>
          </S.OptionRow>
          <S.Separator />
          <S.OptionRow>
            <S.Icon resizeMode="contain" tintColor={colors.gray_400} source={require('../../assets/icons/repeat-rounded.png')} />
            <S.OptionText>Repetir</S.OptionText>
            <S.OptionValue 
              onPress={() => {
                Alert.alert('Em desenvolvimento')
              }}
            // onPress={() => {
            //   Alert.alert(
            //     'Repetir Tarefa',
            //     'Escolha a frequência de repetição',
            //     [
            //       { text: 'Não', onPress: () => handleRepetitionChange('none') },
            //       { text: 'Diariamente', onPress: () => handleRepetitionChange('daily') },
            //       { text: 'Semanalmente', onPress: () => handleRepetitionChange('weekly') },
            //       { text: 'Mensalmente', onPress: () => handleRepetitionChange('monthly') },
            //     ]
            //   );
            // }}
            > 
            {repetition === 'none' ? 'Não' : repetition === 'daily' ? 'Diariamente' : repetition === 'weekly' ? 'Semanalmente' : repetition === 'monthly' ? 'Mensalmente' : ''}</S.OptionValue>
          </S.OptionRow>
          <S.Separator />
          <S.OptionRow>
            <S.Icon resizeMode="contain" tintColor={colors.gray_400} source={require('../../assets/icons/notification-fill.png')} />
            <S.OptionText>Lembrar</S.OptionText>
            <S.OptionValue onPress={() => {
                Alert.alert('Em desenvolvimento')
              }}>Não</S.OptionValue>
          </S.OptionRow>
        </S.OptionsContainer>

        <S.ActionsContainer>
          <S.ActionButton onPress={handleCompleteAllSubtasks}>
            <S.ActionIcon resizeMode="contain" tintColor={colors.gray_400} source={require('../../assets/icons/check-fill.png')} />
            <S.ActionText>Concluir</S.ActionText>
          </S.ActionButton>
          <S.ActionButton onPress={handleShareTask}>
            <S.ActionIcon resizeMode="contain" tintColor={colors.gray_400} source={require('../../assets/icons/share-filled.png')} />
            <S.ActionText>Compartilhar</S.ActionText>
          </S.ActionButton>
          <S.ActionButton onPress={handleDeleteAllSubtasks}>
          <S.ActionIcon resizeMode="contain" tintColor={colors.gray_400} source={require('../../assets/icons/delete-filled.png')} />
          <S.ActionText>Deletar</S.ActionText>
        </S.ActionButton>
        </S.ActionsContainer>
        {showDatePicker && (
        <DateTimePicker
          value={newDate ?? new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
        )}
      </S.Container>
    </TouchableWithoutFeedback>
  );
};

export default TaskDetails;
