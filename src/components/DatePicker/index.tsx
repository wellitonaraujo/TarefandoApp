import DateTimePicker from '@react-native-community/datetimepicker';
import { imgs } from '@/src/screens/imgs';
import colors from '@/src/styles/colors';
import * as S from './styles';

interface DatePickerProps {
    date: Date;
    showPicker: boolean;
    pickerMode: 'date' | 'time';
    setShowPicker: (show: boolean) => void;
    setPickerMode: (mode: 'date' | 'time') => void;
    minDate: Date;
    maxDate: Date;
    handlePickerChange: (event: any, selectedDate?: Date) => void;
    formattedDate: string;
    icon: any
  }
  
  const DatePicker: React.FC<DatePickerProps> = ({
    date,
    showPicker,
    pickerMode,
    setShowPicker,
    setPickerMode,
    minDate,
    maxDate,
    handlePickerChange,
    formattedDate,
    icon,
  }) => (
    <S.ModalDateWrapper>
      <S.ModalDateInput
        onPress={() => {
          setShowPicker(true);
          setPickerMode('date');
        }}>
        <S.ModalIcon
          resizeMode='contain'
          source={icon} 
          tintColor={colors.title}
        />
        <S.ModalSelectedDateText>{formattedDate}</S.ModalSelectedDateText>
      </S.ModalDateInput>
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
    </S.ModalDateWrapper>
  );
  
  export default DatePicker;