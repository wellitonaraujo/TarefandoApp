export const formatDate = (date: Date): string => {
  if (!date || typeof date.getDate !== 'function') {
    return ''; // Retorna uma string vazia se a data for inválida
  }
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}`;
};

export const formatTime = (date: Date): string => {
  if (
    !date ||
    typeof date.getHours !== 'function' ||
    typeof date.getMinutes !== 'function'
  ) {
    return ''; // Retorna uma string vazia se a data for inválida
  }
  return `${date.getHours().toString().padStart(2, '0')}:${date
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;
};
