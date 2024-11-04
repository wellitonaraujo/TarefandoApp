import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { styles } from './styles';

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
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <View style={styles.modalBar} />

              <TextInput
                style={styles.input}
                placeholder="Nome da tarefa"
                placeholderTextColor="#888"
                value={inputValue}
                onChangeText={setInputValue}
              />

              <TouchableOpacity style={styles.createButton} onPress={saveTask}>
                <Text style={styles.createButtonText}>
                  {isEditing ? 'Editar tarefa' : 'Criar tarefa'}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomModal;
