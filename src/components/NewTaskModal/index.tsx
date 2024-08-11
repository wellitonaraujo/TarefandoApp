import React, {useEffect, useState} from 'react';
import {Platform, View, Modal, TouchableWithoutFeedback} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {formatDate} from '../../utils/dateFormat';
import PrimaryButton from '../../components/PrimaryButton';
import {useTask} from '../../context/TaskContext';
import colors from '../../styles/colors';
import {imgs} from '../../screens/imgs';

import * as S from "./styles";

interface NewTaskModalProps {
  visible: boolean;
  onClose: () => void;
}

const NewTaskModal: React.FC<NewTaskModalProps> = ({visible, onClose}) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'low' | 'average' | 'high' | null>(
    'low',
  );

  const {addTask} = useTask();
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<'date' | 'time'>('date');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isEmpty, setIsEmpty] = useState(false);

  const handlePickerChange = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
      setSelectedDate(selectedDate);
    }
  };

  const currentDate = new Date();
  
  const formattedDate =
    selectedDate && selectedDate.toDateString() !== currentDate.toDateString()
      ? formatDate(selectedDate)
      : 'Hoje';

  const minDate = new Date();
  const maxDate = new Date();
  
  maxDate.setDate(maxDate.getDate() + 365);

  const resetForm = () => {
    setIsEmpty(false);
    setTitle('');
    setPriority('low');
    setDate(new Date());
    setSelectedDate(null);
    setIsEmpty(false);
  };

  const handleSave = () => {
    if (!title) {
      setIsEmpty(true);
      return;
    }
    addTask({
      title,
      priority,
      date: selectedDate || new Date(),
      isSelected: false,
    });
    setIsEmpty(true);
    resetForm();
    onClose()
  };

  useEffect(() => {
    if (!visible) {
      resetForm();
    }
  }, [visible])

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <S.ModalContainer>
          <TouchableWithoutFeedback onPress={() => {}}>
            <S.ModalContent>
              <View>
                <S.ModalTextInputTitle
                  placeholder="Insira sua nova tarefa"
                  value={title}
                  onChangeText={text => {
                    setTitle(text);
                    setIsEmpty(false);
                  }}
                  maxLength={320}
                  placeholderTextColor={colors.grey.s100}
                  isEmpty={isEmpty}
                  multiline
                  numberOfLines={6}
                  textAlignVertical="top"
                />
              </View>
              <S.ModalDateWrapper>
                <S.ModalDateInput
                  onPress={() => {
                    setShowPicker(true);
                    setPickerMode('date');
                  }}>
                  <S.ModalIcon source={imgs.calender} />
                  <S.ModalSelectedDateText>{formattedDate}</S.ModalSelectedDateText>
                </S.ModalDateInput>

                {showPicker && (
                  <DateTimePicker
                    value={date}
                    mode={pickerMode}
                    is24Hour={true}
                    minimumDate={minDate}
                    maximumDate={maxDate}
                    display="default"
                    onChange={handlePickerChange}
                    locale="pt-BR"
                  />
                )}
              </S.ModalDateWrapper>

              <PrimaryButton 
                title="Salvar"
                 onPress={handleSave}
                 disabled={!title} 
                />
            </S.ModalContent>
          </TouchableWithoutFeedback>
        </S.ModalContainer>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default NewTaskModal;
