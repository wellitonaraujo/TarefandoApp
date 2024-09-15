import { ExpandableCalendar, CalendarProvider, LocaleConfig } from 'react-native-calendars';
import React, { useEffect, useState } from 'react';
import colors from '@/src/styles/colors';

// Configuração de Locale para o calendário
LocaleConfig.locales.fr = {
  monthNames: [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ],
  monthNamesShort: [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul.", "Ago", "Set", "Out", "Nov", "Dez."
  ],
  dayNames: [
    "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"
  ],
  dayNamesShort: ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."]
};
LocaleConfig.defaultLocale = "fr";

// Função para obter a data atual no formato yyyy-mm-dd
const getCurrentDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  return `${year}-${month}-${day}`;
};

// Função para converter uma data no formato dd-mm-yyyy para yyyy-mm-dd
const convertDateFormat = (date: string) => {
  const [day, month, year] = date.split('-');
  return `${year}-${month}-${day}`;
};

// Propriedades esperadas pelo componente CalendarS
interface CalendarSProps {
  onDateChange: (date: string) => void;
  tasks: { date: string; completed: boolean }[]; // Recebe as tarefas como prop
}

const CalendarS = ({ onDateChange, tasks }: CalendarSProps) => {
  const currentDate = getCurrentDate();

  // Estado para armazenar as datas marcadas no calendário
  const [markedDates, setMarkedDates] = useState<any>({
    [currentDate]: {
      selected: true,
      selectedColor: colors.primary,
      selectedTextColor: colors.white,
    },
  });

  // Atualiza as datas marcadas sempre que tasks ou currentDate mudarem
  useEffect(() => {
    const newMarkedDates: any = {};

    tasks.forEach(task => {
      const taskDate = convertDateFormat(task.date);
      const taskDateWithoutTime = new Date(taskDate).setHours(0, 0, 0, 0);
      const todayWithoutTime = new Date(currentDate).setHours(0, 0, 0, 0);

      if (taskDateWithoutTime < todayWithoutTime && !task.completed) {
        // Tarefas passadas e não completadas
        newMarkedDates[taskDate] = {
          marked: true,
          dotColor: 'red',
        };
      } else if (taskDateWithoutTime >= todayWithoutTime) {
        // Verifica se todas as tarefas dessa data estão completadas
        const allTasksCompleted = tasks
          .filter(t => convertDateFormat(t.date) === taskDate)
          .every(t => t.completed);

        if (!allTasksCompleted) {
          // Tarefas futuras com algumas incompletas
          newMarkedDates[taskDate] = {
            marked: true,
            dotColor: colors.primary,
          };
        }
      }
    });

    // Marcar a data atual como selecionada
    newMarkedDates[currentDate] = {
      selected: true,
      selectedColor: colors.primary,
      selectedTextColor: colors.white,
    };

    setMarkedDates(newMarkedDates);
  }, [tasks, currentDate]);

  const onDayPress = (day: any) => {
    const selectedDate = day.dateString;

    const updatedMarkedDates: any = {
      ...markedDates,
      [selectedDate]: {
        selected: true,
        selectedColor: colors.primary,
        selectedTextColor: colors.white,
        marked: markedDates[selectedDate]?.marked, // Preserva a marcação existente (dotColor) se houver
        dotColor: markedDates[selectedDate]?.dotColor,
      },
    };

    // Desmarcar qualquer outra data selecionada
    Object.keys(updatedMarkedDates).forEach(date => {
      if (date !== selectedDate) {
        updatedMarkedDates[date].selected = false;
        updatedMarkedDates[date].selectedColor = undefined;
        updatedMarkedDates[date].selectedTextColor = undefined;
      }
    });

    setMarkedDates(updatedMarkedDates);
    onDateChange(selectedDate.split('-').reverse().join('-')); // Converte de yyyy-mm-dd para dd-mm-yyyy
  };

  return (
    <CalendarProvider date={currentDate}>
      <ExpandableCalendar
        initialPosition={ExpandableCalendar.positions.CLOSED}
        disablePan={false}
        disableWeekScroll={false}
        animateScroll
        theme={{
          calendarBackground: colors.card,
          dayTextColor: colors.white,
          monthTextColor: colors.white,
          selectedDayBackgroundColor: colors.primary,
          selectedDayTextColor: colors.white,
          textDayFontSize: 14,
        }}
        firstDay={0}
        markedDates={markedDates}
        onDayPress={onDayPress}
        closeOnDayPress={true}
        hideArrows
      />
    </CalendarProvider>
  );
};

export default CalendarS;
