import { Modal, TouchableWithoutFeedback, Platform } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as S from './styles';

interface CreateTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (title: string, date: string) => void;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const saveTask = () => {
    if (inputValue.trim()) {
      const formattedDate = formatDate(date);
      onSave(inputValue, formattedDate);
      setInputValue('');
      setDate(new Date()); // Reset the date after saving
    }
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
              <S.StyledTextInput
                placeholder="Nome da tarefa"
                placeholderTextColor="#888"
                value={inputValue}
                onChangeText={setInputValue}
                maxLength={100}
              />
               <S.DateTextContainer>
                <S.DateText onPress={() => setShowDatePicker(true)}>
                  {getDateLabel()}
                </S.DateText>
              </S.DateTextContainer>
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={handleDateChange}
                  minimumDate={new Date()}
                />
              )}
              <S.CreateButton onPress={saveTask}>
                <S.CreateButtonText>Criar tarefa</S.CreateButtonText>
              </S.CreateButton>
            </S.ModalContainer>
          </TouchableWithoutFeedback>
        </S.Overlay>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default CreateTaskModal;
