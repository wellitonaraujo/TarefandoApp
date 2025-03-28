import { Modal, TouchableWithoutFeedback, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useCreateTaskModal } from './hook/useCreateTaskModal';
import { Subtask } from '@/src/context/TaskContext';
import colors from '@/src/themes/colors';
import * as S from './styles';
import React from 'react';

interface CreateTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (taskName: string, taskDate: string, subtasks?: Subtask[]) => void;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ visible, onClose, onSave }) => {
  const {
    inputValue,
    setInputValue,
    date,
    subtasks,
    showDatePicker,
    setShowDatePicker,
    saveTask,
    addSubtask,
    updateSubtask,
    removeSubtask,
    handleDateChange,
    getDateLabel,
    subtasksRefs,
  } = useCreateTaskModal(visible, onSave);

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose} accessible={false}>
        <S.Overlay>
          <TouchableWithoutFeedback onPress={() => {}} accessible={false}>
            <S.ModalContainer>
              <S.InputWrapper>
                <S.StyledTextInput
                  placeholder="O que planeja fazer?"
                  placeholderTextColor={colors.gray_100}
                  value={inputValue}
                  onChangeText={setInputValue}
                  maxLength={80}
                />
              </S.InputWrapper>

              <S.SubtasksContainer>
                <S.SubtasksScrollView showsVerticalScrollIndicator={false}>
                  {subtasks.map((subtask, index) => (
                    <S.SubtaskWrapper key={index}>
                      <S.SubtaskInput
                        ref={(el: any) => (subtasksRefs.current[index] = el)}
                        placeholder="Nome da subtarefa"
                        placeholderTextColor={colors.gray_300}
                        value={subtask}
                        onChangeText={(value) => updateSubtask(index, value)}
                        maxLength={35}
                      />
                      <S.RemoveIconWrapper onPress={() => removeSubtask(index)}>
                        <S.RemoveIcon tintColor={colors.gray_300} source={require('../../assets/icons/close.png')} />
                      </S.RemoveIconWrapper>
                    </S.SubtaskWrapper>
                  ))}
                </S.SubtasksScrollView>
              </S.SubtasksContainer>

              <S.SendButton 
                onPress={saveTask} 
                disabled={!inputValue.trim()} 
                style={{ opacity: inputValue.trim() ? 1 : 0.3 }}
              >
                <S.SendIcon 
                  tintColor={colors.white} 
                  source={require('../../assets/icons/send.png')} 
                />
              </S.SendButton>

              <S.ActionsContainer>
                <S.DateWrapper onPress={() => setShowDatePicker(true)}>
                  <S.DateIcon
                    resizeMode="contain"
                    source={require('../../assets/icons/calendar-outline.png')}
                    tintColor={colors.gray_100}
                  />
                  <S.DateText>{getDateLabel()}</S.DateText>
                </S.DateWrapper>

                <S.AddSubtaskButton onPress={addSubtask}>
                  <S.AddSubtaskIcon
                    tintColor={colors.gray_100}
                    source={require('../../assets/icons/subtask.png')}
                    resizeMode="contain"
                  />
                </S.AddSubtaskButton>
              </S.ActionsContainer>

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

export default CreateTaskModal;
