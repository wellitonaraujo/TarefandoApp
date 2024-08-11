import {useState, useEffect, useCallback, useMemo} from 'react';
import {formatDate} from '../../utils/dateFormat';
import {TaskType} from '../../models/TaskType';
import {Platform} from 'react-native';

interface UseEditTaskModalProps {
  task: TaskType | null;
  visible: boolean;
  onClose: () => void;
}
  
export const useEditTaskModal = ({
    task, 
    visible, 
    onClose}: UseEditTaskModalProps) => {
const [title, setTitle] = useState('');
const [priority, setPriority] = useState<'low' | 'average' | 'high' | null>(
    'low',
  );
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<'date' | 'time'>('date');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setPriority(task.priority || 'low');
      setDate(new Date(task.date));
      setSelectedDate(new Date(task.date));
    }
  }, [task]);

  const handlePickerChange = useCallback((event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
      setSelectedDate(selectedDate);
    }
  }, []);

  const handleSave = useCallback(() => {
    if (!title) {
      setIsEmpty(true);
      return;
    }
    if (task) {
      const priorityToSave = priority || 'low';
      task.title = title;
      task.priority = priorityToSave;
      task.date = selectedDate || new Date();
    }
    onClose();
  }, [title, priority, selectedDate, task, onClose]);

  const handleCancel = useCallback(() => {
    onClose();
  }, [onClose]);

  const resetForm = useCallback(() => {
    if (task) {
      setTitle(task.title || '');
      setPriority(task.priority || 'low');
      const taskDate = new Date(task.date);
      setDate(taskDate);
      setSelectedDate(taskDate);
      setIsEmpty(false);
    }
  }, [task]);

  useEffect(() => {
    if (!visible) {
      resetForm();
    }
  }, [visible, resetForm]);

  const currentDate = useMemo(() => new Date(), []);
  const formattedDate = useMemo(
    () =>
      selectedDate && selectedDate.toDateString() !== currentDate.toDateString()
        ? formatDate(selectedDate)
        : 'Hoje',
    [selectedDate, currentDate],
  );

  const minDate = useMemo(() => new Date(), []);
  const maxDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 365);
    return date;
  }, []);
  

  return {
    title,
    setTitle,
    priority,
    setPriority,
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
};
