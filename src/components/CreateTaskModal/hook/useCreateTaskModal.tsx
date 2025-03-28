import { useEffect, useRef, useState } from 'react';
import { TextInput, Platform } from 'react-native';
import { Subtask } from '@/src/context/TaskContext';
import { formatDate } from '@/src/utils/formatDate';

export const useCreateTaskModal = (visible: boolean, onSave: (taskName: string, taskDate: string, subtasks?: Subtask[]) => void) => {
  const [inputValue, setInputValue] = useState('');
  const [date, setDate] = useState(new Date());
  const [subtasks, setSubtasks] = useState<string[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const inputRef = useRef<TextInput>(null);
  const subtasksRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [visible]);

  const saveTask = () => {
    if (inputValue.trim()) {
      const formattedDate = formatDate(date);
  
      const formattedSubtasks = subtasks.map((subtask, index) => ({
        id: String(index),
        name: subtask,
        completed: false,
      }));
  
      onSave(inputValue, formattedDate, formattedSubtasks);
  
      setInputValue('');
      setSubtasks([]);
      setDate(new Date());
    }
  };

  const addSubtask = () => {
    setSubtasks((prev) => {
      const newSubtasks = [...prev, ''];
      subtasksRefs.current = [...subtasksRefs.current, null];
      setTimeout(() => {
        subtasksRefs.current[newSubtasks.length - 1]?.focus();
      }, 100);
      return newSubtasks;
    });
  };

  const updateSubtask = (index: number, value: string) => {
    setSubtasks((prev) => prev.map((subtask, i) => (i === index ? value : subtask)));
  };

  const removeSubtask = (index: number) => {
    if (subtasksRefs.current[index + 1]) {
      subtasksRefs.current[index + 1]?.focus();
    } else if (subtasksRefs.current[index - 1]) {
      subtasksRefs.current[index - 1]?.focus();
    } else {
      inputRef.current?.focus();
    }
  
    setSubtasks((prev) => {
      const updatedSubtasks = prev.filter((_, i) => i !== index);
      subtasksRefs.current = subtasksRefs.current.filter((_, i) => i !== index);
      return updatedSubtasks;
    });
  };

  const handleDateChange = (_event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const getDateLabel = () => {
    const today = new Date();
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return 'Hoje';
    }
    return formatDate(date);
  };

  return {
    inputValue,
    setInputValue,
    date,
    setDate,
    subtasks,
    setSubtasks,
    showDatePicker,
    setShowDatePicker,
    inputRef,
    subtasksRefs,
    saveTask,
    addSubtask,
    updateSubtask,
    removeSubtask,
    handleDateChange,
    getDateLabel,
  };
};
