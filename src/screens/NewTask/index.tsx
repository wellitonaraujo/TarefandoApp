import {Button, Platform, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {
  Container,
  DateInput,
  DateWrapper,
  ErrorLength,
  Icon,
  SelectedDateText,
  TextAreaWithBorder,
  TextInputTitle,
  Title,
} from './styles';
import {useNavigation} from '@react-navigation/native';
import {useTask} from '../../context/TaskContext';
import {formatDate, formatTime} from '../../utils/dateFormat';

import DateTimePicker from '@react-native-community/datetimepicker';
import PrimaryButton from '../../components/PrimaryButton';
import colors from '../../styles/colors';
import {imgs} from '../imgs';

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

  const [isEmpty, setIsEmpty] = useState(false);

  const handleSave = () => {
    if (!title) {
      setIsEmpty(true);
      return;
    }
    addTask({title, description, priority, date});
    navigation.goBack();
  };
  return (
    <Container>
      <View>
        <TextInputTitle
          placeholder="Titulo"
          value={title}
          onChangeText={text => {
            setTitle(text);
            setIsEmpty(false);
          }}
          maxLength={28}
          placeholderTextColor={colors.grey.s300}
          style={
            isEmpty
              ? {borderColor: colors.priority.high, borderWidth: 1}
              : {borderColor: colors.grey.s200, borderWidth: 1}
          }
        />
        {title.length > 27 ? (
          <ErrorLength>Nome muito grande</ErrorLength>
        ) : (
          <Text>{''}</Text>
        )}

        <TextAreaWithBorder
          placeholder="Descrição"
          multiline={false}
          value={description}
          onChangeText={setDescription}
          placeholderTextColor={colors.grey.s300}
        />
        <TextInput
          value={priority}
          onChangeText={setPriority}
          placeholder="Priority"
        />

        <DateWrapper>
          <View>
            <Title>Data</Title>
            <DateInput
              onPress={() => {
                setShowPicker(true);
                setPickerMode('date');
              }}>
              <Icon source={imgs.clock} />
              {date && <SelectedDateText>{formattedDate}</SelectedDateText>}
            </DateInput>
          </View>

          <View>
            <Title>Horário</Title>
            <DateInput
              onPress={() => {
                setShowPicker(true);
                setPickerMode('time');
              }}>
              <Icon source={imgs.calender} />
              {date && <SelectedDateText>{formattedTime}</SelectedDateText>}
            </DateInput>
          </View>
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
        <PrimaryButton title="Salvar" onPress={handleSave} />
      </View>
    </Container>
  );
};

export default NewTask;
