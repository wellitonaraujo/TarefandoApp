export const getColorForPriority = (priority: 'low' | 'average' | 'high' | null) => {
  switch (priority) {
    case 'low':
      return '#33B9A5';
    case 'average':
      return '#00C31F';
    case 'high':
      return '#C30000';
    default:
      return '#000000';
  }
};
