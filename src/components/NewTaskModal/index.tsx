import { View, Modal, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import PrimaryButton from '../../components/PrimaryButton';
import { useNewTaskModal } from './useNewTaskModal';
import { imgs } from '../../screens/imgs';
import colors from '@/src/styles/colors';
import * as S from "./styles";
import React from 'react';

interface NewTaskModalProps {
  visible: boolean;
  onClose: () => void;
}

const NewTaskModal: React.FC<NewTaskModalProps> = ({ visible, onClose }) => {
  const {
    title,
    setTitle,
    priority,
    date,
    showPicker,
    setShowPicker,
    pickerMode,
    formattedDate,
    handlePickerChange,
    handleSave,
    isEmpty,
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
                <S.ModalTextInputTitle
                  placeholder="Insira sua nova tarefa"
                  value={title}
                  onChangeText={text => {
                    setTitle(text);
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
                    minimumDate={new Date()}
                    maximumDate={new Date(
                      new Date().setFullYear(
                        new Date().getFullYear() + 1)
                      )}
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