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

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (title: string) => void;
  taskName?: string; // Nova propriedade
  isEditing?: boolean; // Nova propriedade
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  onSave,
  taskName = '',
  isEditing = false, // Valor padrão
}) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(taskName); // Atualiza o valor do input quando o modal é aberto
  }, [taskName, visible]);

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
                  {isEditing ? 'Editar tarefa' : 'Criar tarefa'} {/* Muda o texto do botão */}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#313747',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    alignItems: 'center',
  },
  modalBar: {
    width: 40,
    height: 5,
    backgroundColor: '#666',
    borderRadius: 2.5,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 55,
    backgroundColor: '#4b536a',
    borderRadius: 50,
    paddingHorizontal: 16,
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 20,
  },
  createButton: {
    width: '100%',
    height: 55,
    backgroundColor: '#1E90FF',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomModal;
