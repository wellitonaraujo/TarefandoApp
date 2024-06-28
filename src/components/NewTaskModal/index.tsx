import React, {useState} from 'react';
import {Platform, View, Modal, TouchableWithoutFeedback} from 'react-native';
import {
  ModalContainer,
  ModalContent,
  ModalDateInput,
  ModalDateWrapper,
  ModalIcon,
  ModalSelectedDateText,
  ModalTextInputTitle,
} from './styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import PrioritySelector from '../../components/PriorityButton';
import {formatDate, formatTime} from '../../utils/dateFormat';
import PrimaryButton from '../../components/PrimaryButton';
import {useTask} from '../../context/TaskContext';
import colors from '../../styles/colors';
import {imgs} from '../../screens/imgs';

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
  const formattedTime = formatTime(date);

  const minDate = new Date();
  const maxDate = new Date();
  
  maxDate.setDate(maxDate.getDate() + 365);

  const handlePressPriority = (
    selectedPriority: 'low' | 'average' | 'high' | null,
  ) => {
    if (selectedPriority !== null) {
      setPriority(selectedPriority);
    }
  };

  const resetForm = () => {
    setIsEmpty(false);
    setTitle('');
    setPriority('low');
    setDate(new Date());
    setSelectedDate(null);

  };

  const handleSave = () => {
    if (!title) {
      setIsEmpty(true);
      return;
    }
    addTask({
      title,
      description,
      priority,
      date: selectedDate || new Date(),
      isSelected: false,
    });
    setIsEmpty(true);
    resetForm();
    onClose()
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
                <ModalTextInputTitle
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
              <ModalDateWrapper>
                {/* <PrioritySelector
                  key={priority}
                  onPressPriority={handlePressPriority}
                  priority={priority}
                  priorities={[
                    {type: 'low', color: '#...', label: 'Low'},
                    {type: 'average', color: '#...', label: 'Average'},
                    {type: 'high', color: '#...', label: 'High'},
                  ]}
                /> */}

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

              <PrimaryButton title="Salvar" onPress={handleSave} />
            </ModalContent>
          </TouchableWithoutFeedback>
        </ModalContainer>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default NewTaskModal;
