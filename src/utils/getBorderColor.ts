import colors from '../styles/colors';

export const getBorderColor = (
  p: 'low' | 'average' | 'high' | null,
): string => {
  switch (p) {
    case 'low':
      return colors.priority.low;
    case 'average':
      return colors.priority.average;
    case 'high':
      return colors.priority.high;
    default:
      return '#CCCCCC';
  }
};
