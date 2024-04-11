export const getColorForPriority = (priority: 'low' | 'average' | 'high') => {
  switch (priority) {
    case 'low':
      return '#CCFE03';
    case 'average':
      return '#00C31F';
    case 'high':
      return '#C30000';
    default:
      return '#000000';
  }
};
