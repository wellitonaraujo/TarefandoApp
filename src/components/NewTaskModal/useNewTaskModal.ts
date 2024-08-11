import { formatDate } from '../../utils/dateFormat';
import { useTask } from '../../context/TaskContext';
import { useState, useEffect } from 'react';
import { Platform } from 'react-native';

interface UseNewTaskModalProps {
  visible: boolean;
  onClose: () => void;
}

export const useNewTaskModal = ({ visible, onClose }: UseNewTaskModalProps) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'low' | 'average' | 'high' | null>('low');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<'date' | 'time'>('date');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const { addTask } = useTask();

  const handlePickerChange = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
      setSelectedDate(selectedDate);
    }
  };

  const resetForm = () => {
    setIsEmpty(false);
    setTitle('');
    setPriority('low');
    setDate(new Date());
    setSelectedDate(null);
    setIsEmpty(false);
  };

  const handleSave = () => {
    if (!title) {
      setIsEmpty(true);
      return;
    }

    addTask({
      title,
      priority,
      date: selectedDate || new Date(),
      isSelected: false,
    });

    resetForm();
    onClose();
  };

  const formattedDate = selectedDate 
  && selectedDate.toDateString() 
  !== new Date().toDateString()
  
    ? formatDate(selectedDate)
    : 'Hoje';

  useEffect(() => {
    if (!visible) {
      resetForm();
    }
  }, [visible]);

  return {
    title,
    setTitle,
    priority,
    setPriority,
    date,
    setDate,
    showPicker,
    setShowPicker,
    pickerMode,
    setPickerMode,
    selectedDate,
    setSelectedDate,
    isEmpty,
    setIsEmpty,
    handlePickerChange,
    formattedDate,
    handleSave,
  };
};
