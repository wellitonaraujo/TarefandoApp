import { useState, useEffect } from 'react';
import { formatDate } from '../../utils/dateFormat';
import { TaskType } from '@/src/models/TaskType';
import { useTask } from '../../context/TaskContext';
import { Platform } from 'react-native';

interface UseTaskModalProps {
  task?: TaskType;
  visible: boolean;
  onClose: () => void;
}

export function useTaskModal({ task, visible, onClose }: UseTaskModalProps) {
  const [title, setTitle] = useState(task?.title || '');
  const [date, setDate] = useState(task?.date || new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<'date' | 'time'>('date');
  const [isEmpty, setIsEmpty] = useState(false);

  const { addTask, updateTask } = useTask();

  const formattedDate =
    date.toDateString() !== new Date().toDateString()
      ? formatDate(date)
      : 'Hoje';

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const handlePickerChange = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSave = () => {
    if (!title) {
      setIsEmpty(true);
      return;
    }

    const taskData = {
      title,
      date,
      isSelected: false,
    };

    if (task) {
      updateTask({ ...task, ...taskData });
    } else {
      addTask(taskData);
    }

    setTitle('');
    setDate(new Date());
    setIsEmpty(false);
    onClose();
  };

  const handleCancel = () => {
    setTitle('');
    setDate(new Date());
    setIsEmpty(false);
    onClose();
  };

  useEffect(() => {
    if (!visible) {
      setTitle('');
      setDate(new Date());
      setIsEmpty(false);
    } else if (task) {
      setTitle(task.title);
      setDate(task.date);
    }
  }, [visible, task]);

  return {
    title,
    setTitle,
    date,
    showPicker,
    setShowPicker,
    pickerMode,
    setPickerMode,
    isEmpty,
    setIsEmpty,
    handlePickerChange,
    handleSave,
    handleCancel,
    formattedDate,
    minDate,
    maxDate,
  };
}
