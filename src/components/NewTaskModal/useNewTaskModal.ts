import { useTask } from "@/src/context/TaskContext";
import { formatDate } from "@/src/utils/dateFormat";
import { Platform } from "react-native"
import { useState } from "react";

const useNewTaskModal = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<'low' | 'average' | 'high' | null>(
      'low',
    );
  
    const {addTask} = useTask();
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [pickerMode, setPickerMode] = useState<'date' | 'time'>('date');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isEmpty, setIsEmpty] = useState(false);
  
    const handlePickerChange = (event: any, selectedDate?: Date) => {
      setShowPicker(Platform.OS === 'ios');
      if (selectedDate) {
        setDate(selectedDate);
        setSelectedDate(selectedDate);
      }
    };
  
    const currentDate = new Date();
    
    const formattedDate =
      selectedDate && selectedDate.toDateString() !== currentDate.toDateString()
        ? formatDate(selectedDate)
        : 'Hoje';
  
    const minDate = new Date();
    const maxDate = new Date();
    
    maxDate.setDate(maxDate.getDate() + 365);
  
    const handlePressPriority = (
      selectedPriority: 'low' | 'average' | 'high' | null,
    ) => {
      if (selectedPriority !== null) {
        setPriority(selectedPriority);
      }
    };
  
    const resetForm = () => {
      setIsEmpty(false);
      setTitle('');
      setPriority('low');
      setDate(new Date());
      setSelectedDate(null);
  
    };
  
    const handleSave = () => {
      if (!title) {
        setIsEmpty(true);
        return;
      }
      addTask({
        title,
        description,
        priority,
        date: selectedDate || new Date(),
        isSelected: false,
      });
      setIsEmpty(true);
      resetForm();
      onClose()
    };
}

export default useNewTaskModal;