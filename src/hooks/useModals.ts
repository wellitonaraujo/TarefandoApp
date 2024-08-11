import { TaskType } from '../models/TaskType';
import { useState } from 'react';

export function useModals() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<TaskType[]>([]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return {
    modalVisible,
    toggleModal,
    editModalVisible,
    setEditModalVisible,
    selectedTask,
    setSelectedTask
  };
}
