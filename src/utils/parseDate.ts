export const parseDate = (dateString: string): Date => {
    const [day, month, year] = dateString.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    return isNaN(date.getTime()) ? new Date() : date;
  };