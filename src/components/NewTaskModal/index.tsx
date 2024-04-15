import React, {useState} from 'react';
import {
  Platform,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import styled from 'styled-components/native'; // Importação do styled-components

import {useNavigation} from '@react-navigation/native';
import {useTask} from '../../context/TaskContext';
import {formatDate, formatTime} from '../../utils/dateFormat';

import DateTimePicker from '@react-native-community/datetimepicker';
import PrimaryButton from '../../components/PrimaryButton';
import colors from '../../styles/colors';
import {imgs} from '../../screens/imgs';
import PrioritySelector from '../../components/PriorityButton';
import {
  ModalContainer,
  ModalContent,
  ModalDateInput,
  ModalDateWrapper,
  ModalIcon,
  ModalSelectedDateText,
  ModalTextInputTitle,
  ModalTitle,
} from './styles';

interface NewTaskModalProps {
  visible: boolean;
  onClose: () => void;
}

const NewTaskModal: React.FC<NewTaskModalProps> = ({visible, onClose}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'average' | 'high' | null>(
    'low',
  );

  const {addTask} = useTask();
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<'date' | 'time'>('date');

  const handlePickerChange = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const formattedDate = formatDate(date);
  const formattedTime = formatTime(date);

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 7);

  const [isEmpty, setIsEmpty] = useState(false);

  const handlePressPriority = (
    selectedPriority: 'low' | 'average' | 'high' | null,
  ) => {
    setPriority(selectedPriority);
  };

  const resetForm = () => {
    setTitle('');
    setPriority('low');
    setDate(new Date());
    setIsEmpty(false);
  };

  const handleSave = () => {
    if (!title) {
      setIsEmpty(true);
      return;
    }
    addTask({title, description, priority, date});
    onClose();
    resetForm();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <ModalContainer>
          <TouchableWithoutFeedback onPress={() => {}}>
            <ModalContent>
              <View>
                <ModalTitle>Tarefa</ModalTitle>
                <ModalTextInputTitle
                  placeholder="Nome da tarefa"
                  value={title}
                  onChangeText={text => {
                    setTitle(text);
                    setIsEmpty(false);
                  }}
                  maxLength={80}
                  placeholderTextColor={colors.grey.s100}
                  isEmpty={isEmpty}
                />
              </View>
              <ModalDateWrapper>
                <View>
                  <ModalTitle>Data</ModalTitle>
                  <ModalDateInput
                    onPress={() => {
                      setShowPicker(true);
                      setPickerMode('date');
                    }}>
                    <ModalIcon source={imgs.calender} />
                    {date && (
                      <ModalSelectedDateText>
                        {formattedDate}
                      </ModalSelectedDateText>
                    )}
                  </ModalDateInput>
                </View>

                <View>
                  <ModalTitle>Horário</ModalTitle>
                  <ModalDateInput
                    onPress={() => {
                      setShowPicker(true);
                      setPickerMode('time');
                    }}>
                    <ModalIcon source={imgs.clock} />
                    {date && (
                      <ModalSelectedDateText>
                        {formattedTime}
                      </ModalSelectedDateText>
                    )}
                  </ModalDateInput>
                </View>

                {/* <View style={{opacity: 0.2}}>
                  <ModalTitle />
                  <ModalDateInput
                    disabled
                    onPress={() => {
                      setShowPicker(true);
                      setPickerMode('time');
                    }}>
                    <ModalIcon source={imgs.bell} />
                    {date && (
                      <ModalSelectedDateText>00:15</ModalSelectedDateText>
                    )}
                  </ModalDateInput>
                </View> */}
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
              </ModalDateWrapper>

              <PrioritySelector
                key={priority}
                onPressPriority={handlePressPriority}
                priority={priority}
              />

              <PrimaryButton title="Salvar" onPress={handleSave} />
            </ModalContent>
          </TouchableWithoutFeedback>
        </ModalContainer>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default NewTaskModal;
