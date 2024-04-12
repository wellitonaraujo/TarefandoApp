import {Platform, Text, View} from 'react-native';
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
import PrioritySelector from '../../components/PriorityButton';

const NewTask: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'average' | 'high' | null>(
    'low',
  );

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

  const handlePressPriority = (
    selectedPriority: 'low' | 'average' | 'high' | null,
  ) => {
    setPriority(selectedPriority);
  };

  return (
    <Container>
      <View style={{marginTop: 50}}>
        <Title>Título</Title>
        <TextInputTitle
          placeholder=""
          value={title}
          onChangeText={text => {
            setTitle(text);
            setIsEmpty(false);
          }}
          maxLength={30}
          placeholderTextColor={colors.grey.s300}
          isEmpty={isEmpty}
        />
        {title.length > 29 ? (
          <ErrorLength>Nome muito grande</ErrorLength>
        ) : (
          <Text>{''}</Text>
        )}
        <Title>Descrição</Title>
        <TextAreaWithBorder
          placeholder=""
          multiline={false}
          value={description}
          onChangeText={setDescription}
          placeholderTextColor={colors.title}
          maxLength={80}
        />
        <View>
          <DateWrapper>
            <View>
              <Title>Data</Title>
              <DateInput
                onPress={() => {
                  setShowPicker(true);
                  setPickerMode('date');
                }}>
                <Icon source={imgs.calender} />
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
                <Icon source={imgs.clock} />
                {date && <SelectedDateText>{formattedTime}</SelectedDateText>}
              </DateInput>
            </View>

            <View style={{opacity: 0.2}}>
              <Title />
              <DateInput
                disabled
                onPress={() => {
                  setShowPicker(true);
                  setPickerMode('time');
                }}>
                <Icon source={imgs.bell} />
                {date && <SelectedDateText>00:15</SelectedDateText>}
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

          <PrioritySelector
            key={priority}
            onPressPriority={handlePressPriority}
            priority={priority}
          />
        </View>
      </View>

      <PrimaryButton title="Salvar" onPress={handleSave} />
    </Container>
  );
};

export default NewTask;
