import { Modal, TouchableWithoutFeedback, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as S from './styles';

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (title: string, date: string) => void;
  taskName?: string;
  isEditing?: boolean;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  onSave,
  taskName = '',
  isEditing = false,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    setInputValue(taskName);
  }, [taskName]);

  const saveTask = () => {
    if (inputValue.trim()) {
      const formattedDate = formatDate(date);
      onSave(inputValue, formattedDate);
      setInputValue('');
      setDate(new Date());
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
              <S.DateButton onPress={() => setShowDatePicker(true)}>
                <S.DateButtonText>{getDateLabel()}</S.DateButtonText>
              </S.DateButton>
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
                <S.CreateButtonText>
                  {isEditing ? 'Editar tarefa' : 'Criar tarefa'}
                </S.CreateButtonText>
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

export default CustomModal;
