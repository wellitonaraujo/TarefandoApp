export interface TaskCardProps {
  id: string;
  title: string;
  startTime: string | Date;
  endTime: string | Date;
  completed: boolean;
  onToggleComplete: () => void;
}
