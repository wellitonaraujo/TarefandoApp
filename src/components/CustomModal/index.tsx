import { Modal, TouchableWithoutFeedback } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as S from './styles';

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (title: string) => void;
  taskName?: string; 
  isEditing?: boolean;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  onSave,
  taskName = '',
  isEditing = false,
}) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(taskName);
  }, [taskName]);

  const saveTask = () => {
    if (inputValue.trim()) {
      onSave(inputValue);
      setInputValue('');
    }
  };

  return (
    <Modal 
      animationType="slide" 
      transparent={true} 
      visible={visible} 
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <S.Overlay>
          <TouchableWithoutFeedback>
            <S.ModalContainer>
              <S.ModalBar />
              <S.StyledTextInput
                placeholder="Nome da tarefa"
                placeholderTextColor="#888"
                value={inputValue}
                onChangeText={setInputValue}
                maxLength={100}
              />
              <S.CreateButton onPress={saveTask}>
                <S.CreateButtonText>
                  {isEditing ? 'Editar tarefa' : 'Criar tarefa'}
                </S.CreateButtonText>
              </S.CreateButton>
            </S.ModalContainer>
          </TouchableWithoutFeedback>
        </S.Overlay>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomModal;
