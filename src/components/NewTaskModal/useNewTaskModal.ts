import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { formatDate } from '../../utils/dateFormat';
import { useTask } from '../../context/TaskContext';

interface UseNewTaskModalProps {
  visible: boolean;
  onClose: () => void;
}

export const useNewTaskModal = ({ visible, onClose }: UseNewTaskModalProps) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<'date' | 'time'>('date');
  const [formattedDate, setFormattedDate] = useState('Hoje');
  const [formattedStartTime, setFormattedStartTime] = useState('Início');
  const [formattedEndTime, setFormattedEndTime] = useState('Término');
  const [isEmpty, setIsEmpty] = useState(false);
  const { addTask } = useTask();

  useEffect(() => {
    if (visible) {
      setFormattedDate(formatDate(date));
      setFormattedStartTime(startTime ? startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Início');
      setFormattedEndTime(endTime ? endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Término');
    }
  }, [visible, date, startTime, endTime]);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleStartTimeChange = (event: any, selectedDate?: Date) => {
    setShowStartTimePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setStartTime(selectedDate);
    }
  };

  const handleEndTimeChange = (event: any, selectedDate?: Date) => {
    setShowEndTimePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setEndTime(selectedDate);
    }
  };

  const resetForm = () => {
    setIsEmpty(false);
    setTitle('');
    setDate(new Date());
    setStartTime(null);
    setEndTime(null);
  };

  const handleSave = () => {
    if (!title || !startTime || !endTime) {
      setIsEmpty(true);
      return;
    }

    addTask({
      title,
      date: date,
      startTime: startTime,
      endTime: endTime,
      isSelected: false,
    });

    resetForm();
    onClose();
  };

  return {
    title,
    setTitle,
    date,
    setDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    showDatePicker,
    setShowDatePicker,
    showStartTimePicker,
    setShowStartTimePicker,
    showEndTimePicker,
    setShowEndTimePicker,
    pickerMode,
    setPickerMode,
    formattedDate,
    formattedStartTime,
    formattedEndTime,
    handleDateChange,
    handleStartTimeChange,
    handleEndTimeChange,
    handleSave,
    isEmpty,
    setIsEmpty,
  };
};
