import { View, Modal, TouchableWithoutFeedback } from 'react-native';
import { useNewTaskModal } from './useNewTaskModal';
import DatePicker from '../DatePicker';
import TitleInput from '../TitleInput';
import Button from '../Buttom';
import * as S from "./styles";
import React from 'react';

interface NewTaskModalProps {
  visible: boolean;
  onClose: () => void;
}

const NewTaskModal: React.FC<NewTaskModalProps> = ({ 
  visible,
  onClose 
}) => {
  const {
    title,
    setTitle,
    date,
    showPicker,
    setShowPicker,
    pickerMode,
    formattedDate,
    handlePickerChange,
    handleSave,
    isEmpty,
    setIsEmpty,
    setPickerMode
  } = useNewTaskModal({ visible, onClose });

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
                <TitleInput
                  title={title}
                  setTitle={setTitle}
                  isEmpty={isEmpty}
                  setIsEmpty={setIsEmpty}
                />
              </View>
              <DatePicker
                date={date}
                showPicker={showPicker}
                pickerMode={pickerMode}
                setShowPicker={setShowPicker}
                setPickerMode={setPickerMode}
                minDate={new Date()} 
                maxDate={
                  new Date(
                  new Date().setFullYear(
                  new Date().getFullYear() + 1
                ))}
                handlePickerChange={handlePickerChange}
                formattedDate={formattedDate}
              />
              
              <Button
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
