import { ExpandableCalendar, CalendarProvider, LocaleConfig } from 'react-native-calendars';
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
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const convertDateFormat = (date: string) => {
  const [day, month, year] = date.split('-');
  return `${year}-${month}-${day}`;
};

interface CalendarSProps {
  onDateChange: (date: string) => void;
  tasks: { date: string; completed: boolean }[];
}

const CalendarS = ({ onDateChange, tasks }: CalendarSProps) => {
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
      const taskDate = convertDateFormat(task.date);
      const taskDateWithoutTime = new Date(taskDate).setHours(0, 0, 0, 0);
      const todayWithoutTime = new Date(currentDate).setHours(0, 0, 0, 0);

      if (taskDateWithoutTime < todayWithoutTime && !task.completed) {
        newMarkedDates[taskDate] = {
          marked: true,
          dotColor: 'red',
        };
      } else if (taskDateWithoutTime >= todayWithoutTime) {
        const allTasksCompleted = tasks
          .filter(t => convertDateFormat(t.date) === taskDate)
          .every(t => t.completed);

        if (!allTasksCompleted) {
          newMarkedDates[taskDate] = {
            marked: true,
            dotColor: colors.primary,
          };
        }
      }
    });

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
        marked: markedDates[selectedDate]?.marked,
        dotColor: markedDates[selectedDate]?.dotColor,
      },
    };

    Object.keys(updatedMarkedDates).forEach(date => {
      if (date !== selectedDate) {
        updatedMarkedDates[date].selected = false;
        updatedMarkedDates[date].selectedColor = undefined;
        updatedMarkedDates[date].selectedTextColor = undefined;
      }
    });

    setMarkedDates(updatedMarkedDates);
    onDateChange(selectedDate);
    console.log(selectedDate)
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
          textDayFontSize: 13,
        }}
        markedDates={markedDates}
        onDayPress={onDayPress}
        closeOnDayPress={true}
        hideArrows
      />
    </CalendarProvider>
  );
};

export default CalendarS;
