export interface TaskType {
  title: string;
  description: string;
  priority: 'low' | 'average' | 'high';
  date: Date;
  isSelected: boolean;
}
