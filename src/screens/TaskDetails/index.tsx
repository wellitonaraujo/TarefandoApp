import { ActivityIndicator, TextInput, View, Keyboard, TouchableWithoutFeedback, Pressable, Alert, Platform, Share, UIManager, LayoutAnimation } from 'react-native';
import { NavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RootStackParamList } from '@/src/navigation/AppNavigator';
import CustomCheckBox from '@/src/components/CustomCheckBox';
import { useTaskManager } from '@/src/context/TaskContext';
import { RootParamList } from '@/src/navigation/types';
import { useTaskDetails } from './hook/useTaskDetails';
import ActionButton from './components/ActionButton';
import { formatDate } from '@/src/utils/formatDate';
import { OptionRow } from './components/OptionRow';
import { parseDate } from '@/src/utils/parseDate';
import Toast from 'react-native-toast-message';
import colors from '@/src/themes/colors';
import * as S from './styles';

type TaskDetailsRouteProp = RouteProp<RootStackParamList, 'TaskDetails'>;

interface TaskDetailsProps {
  route: TaskDetailsRouteProp;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ route }) => {
  const navigation = useNavigation<NavigationProp<RootParamList>>();
  const { id, name, date } = route.params;

  const { tasks, handleDeleteSubtask, handleDeleteTask, loadingTasks, handleCompleteSubtask, saveTasks } = useTaskManager();
  const { getTaskDate, updateTaskDate } = useTaskDetails();

  const task = tasks.find(t => t.id === id);
  const subtasks = task?.subtasks || [];

  const [showDatePicker, setShowDatePicker] = useState(false); 
  const [newSubtask, setNewSubtask] = useState('');
  const [showInput, setShowInput] = useState(false);
  
  const inputRef = useRef<TextInput>(null);
  const inputRefs = useRef<TextInput>(null);
  const subtaskRefs = useRef<{ [key: number]: TextInput }>({});

  const [editableName, setEditableName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  const [editingSubtaskId, setEditingSubtaskId] = useState<number | null>(null);
  const [editableSubtaskName, setEditableSubtaskName] = useState<string>('');
  
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

  const getDateLabel = () => {
    return localDate;
  };
  
  const ensureCorrectDate = useCallback(() => {
    const labelDate = getDateLabel();
    const parsedDate = parseDate(labelDate);
    if (!newDate || parsedDate.getTime() !== newDate.getTime()) {
      setNewDate(parsedDate);
    }
  }, [newDate, getDateLabel]);
  
  useEffect(() => {
    ensureCorrectDate();
  }, [ensureCorrectDate, newDate]);


  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = formatDate(selectedDate);
      setLocalDate(formattedDate);
      updateTaskDate(id, formattedDate);
    }
  };
  
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  
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
          completed: false,
        },
      ],
    };
  
    setNewSubtask('');
    await saveTasks(updatedTasks);
  
    setShowInput(false);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  
    setShowInput(true);
    setTimeout(() => inputRef.current?.focus(), 10); 
  }, [id, newSubtask, tasks, saveTasks, showInput]);
  
  const handleBlurSubtask = async () => {
    if (newSubtask.trim()) {
      await handleAddSubtask();
    } else {
      setShowInput(false);
    }
  };
  

  const handleShowInput = () => {
    setShowInput(true);
    // Adiciona foco assim que o input for exibido
    setTimeout(() => inputRef.current?.focus(), 10);
  };


  const handleNameBlur = async () => {
    const trimmedName = editableName.trim();

    if (trimmedName === "") {
      Toast.show({
        type: "error",
        text1: "O nome não pode ficar vazio",
        position: "bottom",
        visibilityTime: 3000,
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

  const handleEditSubtask = useCallback((index: number) => {
    setEditingSubtaskId(index);
    setEditableSubtaskName(subtasks[index].name);
  
    requestAnimationFrame(() => {
      subtaskRefs.current[index]?.focus();
    });
  }, [subtasks]);
  
  const handleSubtaskBlur = async (subtaskId: string, index: number): Promise<void> => {
    const trimmedName = editableSubtaskName.trim();
    
    if (trimmedName === "") {
      Toast.show({
        type: "error",
        text1: "O nome da subtarefa não pode ficar vazio",
        position: "bottom",
        visibilityTime: 3000,
      });
      return;
    }
    
    const updatedTasks = [...tasks];

    const taskIndex = updatedTasks.findIndex(task => task.id === id);
    if (taskIndex < 0) return;
    
    const updatedSubtasks = [...updatedTasks[taskIndex].subtasks!];
    updatedSubtasks[index] = { ...updatedSubtasks[index], name: trimmedName };
    
    updatedTasks[taskIndex] = {
      ...updatedTasks[taskIndex],
      subtasks: updatedSubtasks,
    };
    
    await saveTasks(updatedTasks);
    
    setEditingSubtaskId(null);
  };
  

  return (
    <TouchableWithoutFeedback>
      <S.Container showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => setIsEditing(true)}>
            <S.NameTextInput
              ref={inputRefs}
              value={editableName}
              onChangeText={setEditableName}
              onBlur={handleNameBlur}
              autoFocus={isEditing}
              maxLength={150}
              multiline
              style={{
               textDecorationLine: task?.completed ? "line-through" : "none"
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
                  <Pressable onPress={() => handleEditSubtask(index)}>
                    <S.NameSubTextInput
                      ref={(ref: TextInput) => {
                        if (ref) subtaskRefs.current[index] = ref;
                      }}
                      defaultValue={subtask.name}
                      onChangeText={editingSubtaskId === index ? setEditableSubtaskName : undefined}
                      onFocus={() => setEditingSubtaskId(index)}
                      onBlur={() => handleSubtaskBlur(subtask.id, index)}
                      autoFocus={editingSubtaskId === index}
                      maxLength={150}
                      multiline
                      editable={editingSubtaskId === index}
                      style={{
                        textDecorationLine: subtask.completed ? "line-through" : "none",
                        opacity: subtask.completed ? 0.5 : 1,
                      }}
                    />
                  </Pressable>
                </S.SubtaskLeft>
                <S.DeleteButton onPress={() => handleDeleteSubtask(id, subtask.id)}>
                  <S.DeleteIcon tintColor={colors.gray_300} source={require('../../assets/icons/close.png')} />
                </S.DeleteButton>
              </S.SubtaskContainer>
            ))}

            {showInput && (
              <S.AddSubtaskInput
                ref={inputRef}
                value={newSubtask}
                placeholder="Insira a subtarefa"
                onChangeText={setNewSubtask}
                onBlur={handleBlurSubtask}
                onSubmitEditing={handleAddSubtask}
                returnKeyType="done"
                placeholderTextColor={colors.gray_300}
                maxLength={150}
                multiline
              />
            )}

          </S.OptionsContainer>
        )}
        <S.AddSubtaskText onPress={handleShowInput}>Adicionar Subtarefa</S.AddSubtaskText>
        <S.OptionsContainer>
          <OptionRow
            icon={require('../../assets/icons/calendar-outline.png')}
            text="Agendado para"
            value={getDateLabel()}
            onPress={() => setShowDatePicker(true)}
          />
          {/* 
          <OptionRow
            icon={require('../../assets/icons/repeat-rounded.png')}
            text="Repetir"
            value="Não"
            onPress={() => Alert.alert('Em desenvolvimento')}
          />
          <OptionRow
            icon={require('../../assets/icons/notification-fill.png')}
            text="Lembrar"
            value="Não"
            onPress={() => Alert.alert('Em desenvolvimento')}
          /> */}

        </S.OptionsContainer>

        <S.ActionsContainer>
        <ActionButton
          icon={require('../../assets/icons/check-fill.png')}
          text="Concluir"
          onPress={handleCompleteAllSubtasks}
        />
        <ActionButton
          icon={require('../../assets/icons/share-filled.png')}
          text="Compartilhar"
          onPress={handleShareTask}
        />
        <ActionButton
          icon={require('../../assets/icons/delete-filled.png')}
          text="Deletar"
          onPress={handleDeleteAllSubtasks}
        />
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
