import {Button, Platform, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {Container} from './styles';
import {useNavigation} from '@react-navigation/native';
import {useTask} from '../../context/TaskContext';
import {formatDate, formatTime} from '../../utils/dateFormat';
import {
  DateInput,
  DateWrapper,
  Line,
  SelectedDateText,
} from '../../components/Task/styles';
import DateTimePicker from '@react-native-community/datetimepicker';

const NewTask: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'average' | 'high'>('low');

  const {addTask} = useTask();
  const navigation = useNavigation();

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<'date' | 'time'>('date');

  const handlePickerChange = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const formattedDate = formatDate(date);
  const formattedTime = formatTime(date);

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 7);

  const handleSave = () => {
    addTask({title, description, priority, date});
    navigation.goBack();
  };
  return (
    <Container>
      <View>
        <TextInput value={title} onChangeText={setTitle} placeholder="Title" />
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Description"
        />
        <TextInput
          value={priority}
          onChangeText={setPriority}
          placeholder="Priority"
        />

        <DateWrapper>
          <DateInput
            onPress={() => {
              setShowPicker(true);
              setPickerMode('date');
            }}>
            {date && <SelectedDateText>{formattedDate}</SelectedDateText>}
          </DateInput>
          <Line />
          <DateInput
            onPress={() => {
              setShowPicker(true);
              setPickerMode('time');
            }}>
            {date && <SelectedDateText>{formattedTime}</SelectedDateText>}
          </DateInput>

          {showPicker && (
            <DateTimePicker
              value={date}
              mode={pickerMode}
              is24Hour={true}
              minimumDate={minDate}
              maximumDate={maxDate}
              display="default"
              onChange={handlePickerChange}
              locale="pt-BR"
            />
          )}
        </DateWrapper>

        <Button title="Salvar" onPress={handleSave} />
      </View>
    </Container>
  );
};

export default NewTask;
