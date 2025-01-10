import { Modal, TouchableWithoutFeedback, Platform, TextInput, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as S from './styles';

interface CreateTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (title: string, date: string, subtasks: string[]) => void;
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
  const subtasksRefs = useRef<Array<TextInput | null>>([]);

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
      onSave(inputValue, formattedDate, subtasks);
      setInputValue('');
      setSubtasks([]);
      setDate(new Date());
    }
  };

  const addSubtask = () => {
    setSubtasks((prev) => [...prev, '']);

    // Aguarde a renderização do novo input antes de aplicar o foco
    setTimeout(() => {
      const lastIndex = subtasksRefs.current.length - 1;
      subtasksRefs.current[lastIndex]?.focus();
    }, 100);
  };

  const updateSubtask = (index: number, value: string) => {
    setSubtasks((prev) =>
      prev.map((subtask, i) => (i === index ? value : subtask))
    );
  };

  const removeSubtask = (index: number) => {
    setSubtasks((prev) => prev.filter((_, i) => i !== index));

    // Atualize as referências de subtasks
    subtasksRefs.current.splice(index, 1);
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
      <TouchableWithoutFeedback onPress={onClose}>
        <S.Overlay>
          <TouchableWithoutFeedback>
            <S.ModalContainer>
              <S.InputWrapper>
                <S.StyledTextInput
                  ref={inputRef}
                  placeholder="Eu vou..."
                  placeholderTextColor="#CCD7E5"
                  value={inputValue}
                  onChangeText={setInputValue}
                  maxLength={100}
                />
              </S.InputWrapper>

              {/* Subtasks */}
              {subtasks.map((subtask, index) => (
                <S.SubtaskWrapper key={index}>
                  <S.SubtaskInput
                    ref={(input) => {
                      subtasksRefs.current[index] = input;
                    }}
                    placeholder="Insira a subtarefa"
                    placeholderTextColor="#CCD7E5"
                    value={subtask}
                    onChangeText={(value) => updateSubtask(index, value)}
                  />
                  <S.RemoveIconWrapper onPress={() => removeSubtask(index)}>
                    <S.RemoveIcon source={require('../../assets/icons/close.png')} />
                  </S.RemoveIconWrapper>
                </S.SubtaskWrapper>
              ))}

              <S.SendButton onPress={saveTask}>
                <S.SendIcon source={require('../../assets/icons/send.png')} />
              </S.SendButton>

              <S.ActionsContainer>
                <S.DateWrapper onPress={() => setShowDatePicker(true)}>
                  <S.DateIcon
                    source={require('../../assets/icons/date.png')}
                    style={{ marginRight: 8 }}
                    tintColor={'#86B7F3'}
                  />
                  <S.DateText>{getDateLabel()}</S.DateText>
                </S.DateWrapper>

                <S.AddSubtaskButton onPress={addSubtask}>
                  <S.AddSubtaskIcon source={require('../../assets/icons/subtask.png')} />
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
