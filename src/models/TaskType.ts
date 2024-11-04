export interface TaskType {
  title: string;
  priority: 'low' | 'average' | 'high' | null; 
  date: Date;
  isSelected: boolean;
}
