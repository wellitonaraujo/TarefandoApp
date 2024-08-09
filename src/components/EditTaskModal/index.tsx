import React, {useState, useEffect} from 'react';
import {Platform, View, Modal, TouchableWithoutFeedback} from 'react-native';
import {
  ModalContainer,
  ModalContent,
  ModalDateInput,
  ModalDateWrapper,
  ModalIcon,
  ModalSelectedDateText,
  ModalTextInputTitle,
  Title,
} from './styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import PrioritySelector from '../PriorityButton';
import {formatDate, formatTime} from '../../utils/dateFormat';
import PrimaryButton from '../PrimaryButton';
import colors from '../../styles/colors';
import {imgs} from '../../screens/imgs';
import SecondaryButton from '../SecondaryButton';
import {TaskType} from '../../models/TaskType';
import { HeaderTitle } from '@/src/screens/Home/styles';

interface EditTaskModalProps {
  visible: boolean;
  onClose: () => void;
  task: TaskType;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  visible,
  onClose,
  task,
}) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'low' | 'average' | 'high' | null>(
    'low',
  );
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<'date' | 'time'>('date');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setPriority(task.priority || 'low');
      setDate(new Date(task.date));
      setSelectedDate(new Date(task.date));
    }
  }, [task]);

  const handlePickerChange = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
      setSelectedDate(selectedDate);
    }
  };

  const handleSave = () => {
    if (!title) {
      setIsEmpty(true);
      return;
    }
    const priorityToSave = priority || 'low';
    task.title = title;
    task.priority = priorityToSave;
    task.date = selectedDate || new Date();
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const resetForm = () => {
    if (task) {
      setTitle(task.title || '');
      setPriority(task.priority || 'low');
      const taskDate = new Date(task.date);
      setDate(taskDate);
      setSelectedDate(taskDate);
      setIsEmpty(false);
    }
  };

  useEffect(() => {
    if (!visible) {
      resetForm();
    }
  }, [visible])

  const currentDate = new Date();
  const formattedDate =
    selectedDate && selectedDate.toDateString() !== currentDate.toDateString()
      ? formatDate(selectedDate)
      : 'Hoje';

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 365);

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

              <ModalTextInputTitle
                placeholder="Insira o novo nome da tarefa"
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

              <ModalDateWrapper>
                <ModalDateInput
                  onPress={() => {
                    setShowPicker(true);
                    setPickerMode('date');
                  }}>
                  <ModalIcon source={imgs.calender} />
                  <ModalSelectedDateText>{formattedDate}</ModalSelectedDateText>
                </ModalDateInput>
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
              <View>
                <PrimaryButton 
                  title="Salvar alterações" 
                  onPress={handleSave} 
                  disabled={!title}
                />
                <SecondaryButton title="Cancelar" onPress={handleCancel} />
              </View>
            </ModalContent>
          </TouchableWithoutFeedback>
        </ModalContainer>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default EditTaskModal;
