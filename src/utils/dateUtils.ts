import { startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek } from 'date-fns';

export const getDaysInMonth = (date: Date) => {
  const startMonth = startOfMonth(date);
  const endMonth = endOfMonth(date);
  return eachDayOfInterval({
    start: startOfWeek(startMonth, { weekStartsOn: 0 }),
    end: endMonth,
  });
};
