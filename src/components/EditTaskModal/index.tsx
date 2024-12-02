import { Modal, TouchableWithoutFeedback, Platform } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as S from './styles';

interface EditTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (title: string, date: string) => void;
  taskName: string;
  taskDate: string;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  visible,
  onClose,
  onSave,
  taskName,
  taskDate,
}) => {
  const [inputValue, setInputValue] = useState(taskName);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (taskDate) {
      const [day, month, year] = taskDate.split('/').map((part) => parseInt(part, 10));
      setDate(new Date(year, month - 1, day));
    }
  }, [taskDate]);


  const saveTask = () => {
    if (inputValue.trim()) {
      const formattedDate = formatDate(date);
      onSave(inputValue, formattedDate);
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
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <S.Overlay>
          <TouchableWithoutFeedback>
            <S.ModalContainer>
              <S.InputWrapper>
                <S.StyledTextInput
                  ref={inputRef}
                  placeholder="Eu vou..."
                  placeholderTextColor="#fff"
                  value={inputValue}
                  onChangeText={setInputValue}
                  maxLength={50}
                />
              </S.InputWrapper>    
              <S.SendButton onPress={saveTask}>
                <S.SendIcon source={require('../../assets/icons/send.png')} />
              </S.SendButton>

              <S.DateWrapper onPress={() => setShowDatePicker(true)}>
                <S.DateIcon
                  source={require('../../assets/icons/date.png')}
                  style={{ marginRight: 8 }}
                />
                <S.DateText>{getDateLabel()}</S.DateText>
              </S.DateWrapper>

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

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default EditTaskModal;
