import { ExpandableCalendar, CalendarProvider } from 'react-native-calendars';
import { LocaleConfig } from "react-native-calendars";
import { tasks } from '@/src/screens/Home/tasksmock';
import React, { useEffect, useState } from 'react';
import colors from '@/src/styles/colors';

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

const getCurrentDate = () => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const CalendarS = ({ onDateChange }: { onDateChange: (date: string) => void }) => {
  const currentDate = getCurrentDate();

  const [markedDates, setMarkedDates] = useState<any>({
    [currentDate]: {
      selected: true,
      selectedColor: colors.primary,
      selectedTextColor: colors.white,
    },
  });

  useEffect(() => {
    const newMarkedDates: any = {};
  
    tasks.forEach(task => {
      const taskDate = task.date;
      const taskDateWithoutTime = new Date(taskDate).setHours(0, 0, 0, 0);
      const todayWithoutTime = new Date(currentDate).setHours(0, 0, 0, 0);
  
      if (taskDateWithoutTime < todayWithoutTime && !task.completed) {
        // Tarefas passadas e não completadas
        newMarkedDates[taskDate] = {
          marked: true,
          dotColor: 'red',
        };
      } else if (taskDateWithoutTime >= todayWithoutTime) {
        // Verifica se todas as tasks dessa data estão completadas
        const allTasksCompleted = tasks
          .filter(t => t.date === taskDate)
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
  }, [currentDate]);

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
    onDateChange(selectedDate);
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
