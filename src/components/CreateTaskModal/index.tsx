import { Modal, TouchableWithoutFeedback, Platform, TextInput, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useRef, useState } from 'react';
import * as S from './styles';
import { Subtask } from '@/src/context/TaskContext';
import colors from '@/src/themes/colors';

interface CreateTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (taskName: string, taskDate: string, subtasks?: Subtask[]) => void;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [date, setDate] = useState(new Date());
  const [subtasks, setSubtasks] = useState<string[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const inputRef = useRef<TextInput>(null);
  
  const subtasksRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [visible]);

  const saveTask = () => {
    if (inputValue.trim()) {
      const formattedDate = formatDate(date);
  
      const formattedSubtasks = subtasks.map((subtask, index) => ({
        id: String(index),
        name: subtask,
        completed: false,
      }));
  
      onSave(inputValue, formattedDate, formattedSubtasks);
  
      setInputValue('');
      setSubtasks([]);
      setDate(new Date());
    }
  };
  
  const addSubtask = () => {
    setSubtasks((prev) => {
      const newSubtasks = [...prev, ''];
      subtasksRefs.current = [...subtasksRefs.current, null];
      setTimeout(() => {
        const lastSubtaskRef = subtasksRefs.current[newSubtasks.length - 1];
        lastSubtaskRef?.focus();
      }, 100);
      return newSubtasks;
    });
  };

  const updateSubtask = (index: number, value: string) => {
    setSubtasks((prev) =>
      prev.map((subtask, i) => (i === index ? value : subtask))
    );
  };
  const removeSubtask = (index: number) => {
    if (subtasksRefs.current[index + 1]) {
      subtasksRefs.current[index + 1]?.focus();
    } else if (subtasksRefs.current[index - 1]) {
      subtasksRefs.current[index - 1]?.focus();
    } else {
      inputRef.current?.focus();
    }
  
    setSubtasks((prev) => {
      const updatedSubtasks = prev.filter((_, i) => i !== index);
      subtasksRefs.current = subtasksRefs.current.filter((_, i) => i !== index);
      return updatedSubtasks;
    });
  };
  
  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const getDateLabel = () => {
    const today = new Date();
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return 'Hoje';
    }
    return formatDate(date);
  };

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose} accessible={false}>
        <S.Overlay>
          <TouchableWithoutFeedback  onPress={() => {}} accessible={false}>
            <S.ModalContainer>
              <S.InputWrapper>
                <S.StyledTextInput
                  placeholder="O que planeja fazer?"
                  placeholderTextColor={colors.gray_100}
                  value={inputValue}
                  onChangeText={setInputValue}
                  maxLength={80}
                />
              </S.InputWrapper>

              <S.SubtasksContainer>
                <S.SubtasksScrollView showsVerticalScrollIndicator={false}>
                  {subtasks.map((subtask, index) => (
                    <S.SubtaskWrapper key={index}>
                      <S.SubtaskInput
                        ref={(el:any) => (subtasksRefs.current[index] = el)}
                        placeholder="Nome da subtarefa"
                        placeholderTextColor={colors.gray_300}
                        value={subtask}
                        onChangeText={(value: string) => updateSubtask(index, value)}
                        maxLength={35}
                      />
                      <S.RemoveIconWrapper onPress={() => removeSubtask(index)}>
                        <S.RemoveIcon tintColor={colors.gray_300} source={require('../../assets/icons/close.png')} />
                      </S.RemoveIconWrapper>
                    </S.SubtaskWrapper>
                  ))}
                </S.SubtasksScrollView>
              </S.SubtasksContainer>

              <S.SendButton onPress={saveTask} 
                disabled={!inputValue.trim()} 
                style={{ opacity: inputValue.trim() ? 1 : 0.3 }}>
                <S.SendIcon tintColor={colors.white} source={require('../../assets/icons/send.png')} />
              </S.SendButton>

              <S.ActionsContainer>
                <S.DateWrapper onPress={() => setShowDatePicker(true)}>
                  <S.DateIcon
                    resizeMode="contain" 
                    source={require('../../assets/icons/calendar-outline.png')}
                    tintColor={colors.gray_100}
                  />
                  <S.DateText>{getDateLabel()}</S.DateText>
                </S.DateWrapper>

                <S.AddSubtaskButton onPress={addSubtask}>
                  <S.AddSubtaskIcon 
                    tintColor={colors.gray_100}
                    source={require('../../assets/icons/subtask.png')} 
                    resizeMode="contain"/>
                </S.AddSubtaskButton>
              </S.ActionsContainer>

              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={handleDateChange}
                  minimumDate={new Date()}
                />
              )}
            </S.ModalContainer>
          </TouchableWithoutFeedback>
        </S.Overlay>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CreateTaskModal;
