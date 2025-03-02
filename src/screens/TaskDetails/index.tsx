import React, { useState, useRef } from 'react';
import { ActivityIndicator, TextInput, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback, Pressable, Alert, Platform } from 'react-native';
import { NavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RootStackParamList } from '@/src/navigation/AppNavigator';
import * as S from './styles';
import CustomCheckBox from '@/src/components/CustomCheckBox';
import Toast from 'react-native-toast-message';
import { RootParamList } from '@/src/navigation/types';
import { useTaskManager } from '@/src/context/TaskContext';

type TaskDetailsRouteProp = RouteProp<RootStackParamList, 'TaskDetails'>;

interface TaskDetailsProps {
  route: TaskDetailsRouteProp;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ route }) => {
  const { id, name, date } = route.params;
  const { tasks, handleDeleteSubtask, handleDeleteTask, loadingTasks, handleCompleteSubtask, saveTasks } = useTaskManager();
  const navigation = useNavigation<NavigationProp<RootParamList>>();
  const task = tasks.find(t => t.id === id);
  const subtasks = task?.subtasks || [];

  const [newSubtask, setNewSubtask] = useState('');
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const [editableName, setEditableName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);
  const inputRefs = useRef<TextInput>(null);

 const [newDate, setNewDate] = useState(() => {
  if (date) {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return new Date();
    }
    return dateObj;
  }
  return new Date();
});
  const [showDatePicker, setShowDatePicker] = useState(false); 


  const handleAddSubtask = async () => {
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
      ]
    };
  
    await saveTasks(updatedTasks);
    setNewSubtask('');
    setTimeout(() => inputRef.current?.focus(), 10);
  };
  
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
    if (editableName.trim() !== name) {
      const taskIndex = tasks.findIndex(t => t.id === id);
      if (taskIndex < 0) return;

      const updatedTasks = [...tasks];
      updatedTasks[taskIndex] = {
        ...updatedTasks[taskIndex],
        name: editableName.trim(),
      };

      await saveTasks(updatedTasks);
    }
    setIsEditing(false);
  };

  const handleCompleteAllSubtasks = async () => {
    if (subtasks.length === 0) {
      // Exibe o Toast informando que não há subtarefas para concluir
      Toast.show({
        type: 'info', // Tipo de mensagem
        position: 'bottom', // Posição na tela
        text1: 'Nenhuma Subtarefa', // Título
        text2: 'Não há subtarefas para concluir.', // Texto informativo
        visibilityTime: 3000, // Tempo de exibição em milissegundos
      });
      return;
    }
  
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex < 0) return;
  
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = {
      ...updatedTasks[taskIndex],
      subtasks: updatedTasks[taskIndex].subtasks?.map(subtask => ({
        ...subtask,
        completed: true
      }))
    };
  
    await saveTasks(updatedTasks);
  };

  const handleDeleteAllSubtasks = async () => {
    Alert.alert(
      'Excluir tarefa?',
      '',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Deletar',
          onPress: async () => {
            handleDeleteTask(id);
            navigation.navigate("Home");
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const updatedDate = selectedDate;
      setNewDate(updatedDate);
      
      const taskIndex = tasks.findIndex(t => t.id === id);
      if (taskIndex >= 0) {
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex] = {
          ...updatedTasks[taskIndex],
          date: formatDate(updatedDate),
        };
        saveTasks(updatedTasks);
      }
    }
  };
  

  const getDateLabel = () => {
    return formatDate(newDate);
  };

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  

  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
      <S.Container showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => setIsEditing(true)}>
          <View>
            <S.Title style={{ color: isEditing ? "transparent" : "transparent" }}>
              {editableName}
            </S.Title>
        
            <S.NameTextInput
              ref={inputRefs}
              value={editableName}
              onChangeText={setEditableName}
              onBlur={handleNameBlur}
              autoFocus={isEditing}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
          </View>
        </Pressable>

        {loadingTasks ? (
          <View>
            <ActivityIndicator size="large" color="#1A72F3" />
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
                  <S.DeleteIcon tintColor={'#D2D2D2'} source={require('../../assets/icons/close.png')} />
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
            placeholderTextColor={'#D2D2D2'}
          />
        )}

        {!showInput && (
          <TouchableOpacity onPress={handleShowInput}>
            <S.AddSubtaskText>Adicionar subtarefa</S.AddSubtaskText>
          </TouchableOpacity>
        )}

        <S.OptionsContainer>
          <S.OptionRow>
            <S.Icon tintColor={'#A4A4A4'} source={require('../../assets/icons/date-solid.png')} />
            <S.OptionText>Finaliza em</S.OptionText>
            <S.OptionValue onPress={() => setShowDatePicker(true)}>
            {getDateLabel()}
            </S.OptionValue>

          </S.OptionRow>
          <S.Separator />
          <S.OptionRow>
            <S.Icon tintColor={'#A4A4A4'} source={require('../../assets/icons/repeat-rounded.png')} />
            <S.OptionText>Repetir</S.OptionText>
            <S.OptionValue>Não</S.OptionValue>
          </S.OptionRow>
          <S.Separator />
          <S.OptionRow>
            <S.Icon tintColor={'#A4A4A4'} source={require('../../assets/icons/notification-fill.png')} />
            <S.OptionText>Lembrar</S.OptionText>
            <S.OptionValue>Não</S.OptionValue>
          </S.OptionRow>
        </S.OptionsContainer>

        <S.ActionsContainer>
          <S.ActionButton onPress={handleCompleteAllSubtasks}>
            <S.ActionIcon tintColor={'#D2D2D2'} source={require('../../assets/icons/check-fill.png')} />
            <S.ActionText>Concluir</S.ActionText>
          </S.ActionButton>
          <S.ActionButton>
            <S.ActionIcon tintColor={'#D2D2D2'} source={require('../../assets/icons/share-filled.png')} />
            <S.ActionText>Compartilhar</S.ActionText>
          </S.ActionButton>
          <S.ActionButton onPress={handleDeleteAllSubtasks}>
          <S.ActionIcon tintColor={'#D2D2D2'} source={require('../../assets/icons/delete-filled.png')} />
          <S.ActionText>Deletar</S.ActionText>
        </S.ActionButton>
        </S.ActionsContainer>
        {showDatePicker && (
        <DateTimePicker
          value={newDate}
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
