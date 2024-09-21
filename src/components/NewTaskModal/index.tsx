import React from 'react';
import { View, Modal, TouchableWithoutFeedback, TouchableOpacity, Image } from 'react-native';
import { useNewTaskModal } from './useNewTaskModal';
import DatePicker from '../DatePicker';
import TitleInput from '../TitleInput';
import * as S from './styles';
import Button from '../Buttom';
import colors from '@/src/styles/colors';
import { imgs } from '@/src/screens/imgs';

interface NewTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (description: string, startTime: string, endTime: string) => void; // Aceitar três argumentos
}

const NewTaskModal: React.FC<NewTaskModalProps> = ({ 
  visible,
  onClose,
  onSave
}) => {
  const {
    title,
    setTitle,
    date,
    startTime,
    endTime,
    showDatePicker,
    setShowDatePicker,
    showStartTimePicker,
    setShowStartTimePicker,
    showEndTimePicker,
    setShowEndTimePicker,
    pickerMode,
    setPickerMode,
    formattedDate,
    formattedStartTime,
    formattedEndTime,
    handleDateChange,
    handleStartTimeChange,
    handleEndTimeChange,
    handleSave,
    isEmpty,
    setIsEmpty,
  } = useNewTaskModal({ visible, onClose });


  const saveTask = () => {
    if (title && formattedStartTime !== 'Início' && formattedEndTime !== 'Término') {
      onSave(title, formattedStartTime, formattedEndTime);
      handleSave();
    }
  };
  
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

            <S.CloseIconContainer onPress={onClose}>
                <S.CloseIcon source={imgs.close} resizeMode='contain'/>
              </S.CloseIconContainer>
              <View>

                <TitleInput
                  title={title}
                  setTitle={setTitle}
                  isEmpty={isEmpty}
                  setIsEmpty={setIsEmpty}
                />
              </View>
    
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                {/* Date Picker */}
                <DatePicker
                 icon={imgs.calender}
                  date={date}
                  showPicker={showDatePicker}
                  pickerMode={'date'}
                  setShowPicker={setShowDatePicker}
                  setPickerMode={() => setPickerMode('date')}
                  minDate={new Date()} 
                  maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                  handlePickerChange={handleDateChange}
                  formattedDate={formattedDate}
                />

                <View style={{width: 10, height: 3, backgroundColor: colors.card}}/>
                
                {/* Start Time Picker */}
                <DatePicker
                  icon={imgs.clock}
                  date={startTime || new Date()}
                  showPicker={showStartTimePicker}
                  pickerMode={'time'}
                  setShowPicker={setShowStartTimePicker}
                  setPickerMode={() => setPickerMode('time')}
                  minDate={new Date()} 
                  maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                  handlePickerChange={handleStartTimeChange}
                  formattedDate={formattedStartTime}
                />


                {/* End Time Picker */}
                <DatePicker
                  icon={imgs.clock}
                  date={endTime || new Date()}
                  showPicker={showEndTimePicker}
                  pickerMode={'time'}
                  setShowPicker={setShowEndTimePicker}
                  setPickerMode={() => setPickerMode('time')}
                  minDate={new Date()} 
                  maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                  handlePickerChange={handleEndTimeChange}
                  formattedDate={formattedEndTime}
                />
              </View>

              <Button
                title="Salvar"
                onPress={saveTask}
                disabled={!title || !startTime || !endTime} 
              />
            </S.ModalContent>
          </TouchableWithoutFeedback>
        </S.ModalContainer>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default NewTaskModal;
