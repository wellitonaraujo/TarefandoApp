import React from 'react';
import { Modal, TouchableWithoutFeedback } from 'react-native';
import ButtonGroup from '../ButtomGroup';
import DatePicker from '../DatePicker';
import TitleInput from '../TitleInput';
import { useTaskModal } from './useTaskModal';
import * as S from './styles';
import { TaskType } from '@/src/models/TaskType';

interface TaskModalProps {
  visible: boolean;
  onClose: () => void;
  task?: TaskType;
}

const TaskModal: React.FC<TaskModalProps> = ({ visible, onClose, task }) => {
  const {
    title,
    setTitle,
    date,
    showPicker,
    setShowPicker,
    setPickerMode,
    pickerMode,
    isEmpty,
    setIsEmpty,
    handlePickerChange,
    handleSave,
    handleCancel,
    formattedDate,
    minDate,
    maxDate,
  } = useTaskModal({ task, visible, onClose });

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <S.ModalContainer>
        <TouchableWithoutFeedback onPress={handleCancel}>
          <S.ModalContent>
            <TitleInput
              title={title}
              setTitle={setTitle}
              isEmpty={isEmpty}
              setIsEmpty={setIsEmpty}
            />
            <DatePicker
              date={date}
              showPicker={showPicker}
              pickerMode={pickerMode}
              setShowPicker={setShowPicker}
              setPickerMode={setPickerMode}
              minDate={minDate}
              maxDate={maxDate}
              handlePickerChange={handlePickerChange}
              formattedDate={formattedDate}
            />
            <ButtonGroup
              handleSave={handleSave}
              handleCancel={handleCancel}
              title={title}
            />
          </S.ModalContent>
        </TouchableWithoutFeedback>
      </S.ModalContainer>
    </Modal>
  );
};

export default TaskModal;
